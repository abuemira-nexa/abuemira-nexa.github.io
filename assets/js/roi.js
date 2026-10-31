/* Software subscription savings basis */
const SW_SAVINGS_RATIO = 0.50; // Odoo replaces ~50% of current software costs on average (realistic benchmark)

/* ══ DEPARTMENT DATA — Odoo benchmark efficiency rates ══ */
const ROI_DEPTS = [
  { id:'inventory',   icon:'📦', name:'Inventory',        nameAr:'المخزون',                  eff:0.21, fte:8,  desc:'Stock control, valuation & reordering',         descAr:'مراقبة المخزون والتقييم وإعادة الطلب' },
  { id:'manufacturing',icon:'🏭',name:'Manufacturing',     nameAr:'التصنيع',                  eff:0.18, fte:12, desc:'Production planning, BOM & work orders',         descAr:'تخطيط الإنتاج وقوائم المواد وأوامر العمل' },
  { id:'purchase',    icon:'🛒', name:'Purchase',          nameAr:'المشتريات',                eff:0.16, fte:4,  desc:'Purchase orders, vendor management & RFQ',       descAr:'أوامر الشراء وإدارة الموردين والطلبات' },
  { id:'finance',     icon:'💰', name:'Finance',           nameAr:'المالية',                  eff:0.24, fte:6,  desc:'Accounting, AP/AR, reporting & compliance',      descAr:'المحاسبة والذمم والتقارير والامتثال' },
  { id:'sales',       icon:'📈', name:'Sales & CRM',       nameAr:'المبيعات وإدارة العلاقات', eff:0.17, fte:10, desc:'CRM, pipeline, quotations & invoicing',           descAr:'إدارة العلاقات والعروض والفواتير' },
  { id:'hr',          icon:'👥', name:'Human Resources',   nameAr:'الموارد البشرية',          eff:0.15, fte:4,  desc:'Payroll, leave, recruitment & attendance',       descAr:'الرواتب والإجازات والتوظيف والحضور' },
  { id:'services',    icon:'🔧', name:'Services',          nameAr:'الخدمات',                  eff:0.14, fte:6,  desc:'Field service, timesheets & project billing',    descAr:'الخدمات الميدانية والجداول الزمنية والفوترة' },
  { id:'marketing',   icon:'📣', name:'Marketing',         nameAr:'التسويق',                  eff:0.12, fte:3,  desc:'Campaigns, email automation & lead generation',  descAr:'الحملات وأتمتة البريد وتوليد العملاء' },
];

let roiActiveTab = 1;
let roiDeptSelection = { inventory: true, finance: true, sales: true, hr: true }; // defaults

/* ══ ERP COMPARISON CHART ══ */
function renderErpCompare(odooCost) {
  const chart = document.getElementById('erpCompareChart');
  if (!chart) return;
  const erps = [
    { name: 'SAP S/4HANA', cost: 350000, color: '#3b82f6' },
    { name: 'Oracle NetSuite', cost: 180000, color: '#8b5cf6' },
    { name: 'MS Dynamics', cost: 120000, color: '#06b6d4' },
    { name: '⭐ Odoo ERP', cost: odooCost || 35000, color: '#d4a843', highlight: true },
  ];
  const max = Math.max(...erps.map(e => e.cost));
  chart.innerHTML = erps.map(e => {
    const pct = Math.max(6, Math.round((e.cost / max) * 100));
    const fmt = e.cost >= 1000000 ? '$'+(e.cost/1000000).toFixed(1)+'M' : '$'+Math.round(e.cost/1000)+'K';
    return `<div style="display:flex;align-items:center;gap:8px;">
      <div style="width:115px;font-size:10px;font-weight:${e.highlight?'800':'500'};color:${e.highlight?'var(--gold)':'rgba(255,255,255,.55)'};flex-shrink:0;">${e.name}</div>
      <div style="flex:1;background:rgba(255,255,255,.06);border-radius:4px;height:16px;overflow:hidden;">
        <div style="width:${pct}%;height:100%;background:${e.color};opacity:${e.highlight?1:.5};border-radius:4px;transition:width .6s ease;"></div>
      </div>
      <div style="width:50px;text-align:right;font-size:10px;font-weight:700;color:${e.highlight?'var(--gold)':'rgba(255,255,255,.45)'};">${fmt}+</div>
    </div>`;
  }).join('');
}

/* ══ PDF DOWNLOAD — reads from roiLiveData (live calculated values) ══ */
function downloadRoiPdf() {
  const btn = document.getElementById('roiPdfBtn');
  if (btn) { btn.innerHTML = '⏳ Generating...'; btn.disabled = true; }

  const d = roiLiveData;
  if (!d || !d.emp) {
    alert('Please configure the ROI calculator first (Tab 1–3).');
    if (btn) { btn.innerHTML = '📄 Download PDF'; btn.disabled = false; }
    return;
  }
  const s = window.subLiveData || null;  // Tab 4 subscription data

  // Dept savings rows
  const deptRows = (d.deptSavings || [])
    .sort((a,b) => b.savings - a.savings)
    .map(dept => `
      <tr>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;">${dept.icon} ${dept.name}</td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:11px;color:#475569;">
          ${Math.round(dept.eff*100)}% efficiency · ${Math.round(dept.scaledFTE)} FTEs
        </td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#017E84;font-size:12px;">${fmtUSD(dept.savings)}/yr</td>
      </tr>`).join('');

  // Software row
  const swRow = d.swSavings > 0 ? `
    <tr style="background:#fffbeb;">
      <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;">💾 Software Replacement</td>
      <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:11px;color:#475569;">~50% of legacy software costs eliminated</td>
      <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#d97706;font-size:12px;">${fmtUSD(d.swSavings)}/yr</td>
    </tr>` : '';

  // 5-year table rows
  const yr5Rows = (d.cashFlows || []).map((cf, i) => {
    const cum = d.cumulative[i];
    const isPos = cum >= 0;
    return `<tr>
      <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;font-size:11px;font-weight:600;">Year ${i+1}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;font-size:11px;text-align:right;">${fmtUSD(cf)}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;font-size:11px;text-align:right;font-weight:700;color:${isPos?'#059669':'#dc2626'}">${fmtUSD(cum)}</td>
    </tr>`;
  }).join('');

  // ERP comparison — Odoo bar based on real impl cost
  const maxCost = 350000;
  const erpPct = (cost) => Math.max(5, Math.round((cost / maxCost) * 100));
  const odooPct = erpPct(d.impl);

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>Odoo ROI Report — ${d.industry} · ${d.date}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;background:#fff;font-size:13px;}
    .page{max-width:820px;margin:0 auto;background:#fff;}

    /* HEADER */
    .hdr{background:linear-gradient(135deg,#0d1b2e 0%,#1a2f4a 100%);padding:36px 48px 32px;color:#fff;}
    .hdr-logo{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.62);margin-bottom:12px;}
    .hdr h1{font-size:26px;font-weight:800;margin:0 0 6px;letter-spacing:-.3px;color:#fff;line-height:1.15;}
    .hdr h1 span{color:#d4a843;}
    .hdr-sub{font-size:11px;color:rgba(255,255,255,.55);margin-bottom:18px;line-height:1.6;}
    .pills{display:flex;gap:6px;flex-wrap:wrap;}
    .pill{font-size:9px;font-weight:700;padding:3px 10px;border-radius:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.75);}
    .pill.gold{background:rgba(212,168,67,.15);border-color:rgba(212,168,67,.4);color:#d4a843;}

    /* BODY */
    .body{padding:32px 48px 24px;}

    /* KPI GRID */
    .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;}
    .kpi{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 12px;text-align:center;border-top:3px solid #017E84;}
    .kpi.gold{border-top-color:#d4a843;background:#fffbeb;}
    .kpi.red{border-top-color:#ef4444;}
    .kpi-n{font-size:20px;font-weight:800;color:#017E84;line-height:1;margin-bottom:4px;}
    .kpi.gold .kpi-n{color:#d4a843;}
    .kpi.red .kpi-n{color:#ef4444;}
    .kpi-l{font-size:9px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;line-height:1.3;}

    /* PROFILE GRID */
    .profile-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px;}
    .profile-item{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;}
    .profile-lbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:3px;}
    .profile-val{font-size:13px;font-weight:700;color:#0f172a;}

    /* SECTION TITLE */
    .sec-title{font-size:11px;font-weight:800;color:#0f172a;margin:22px 0 10px;padding-bottom:6px;border-bottom:2px solid #017E84;text-transform:uppercase;letter-spacing:.05em;}

    /* TABLES */
    table{width:100%;border-collapse:collapse;}
    th{padding:7px 14px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#64748b;background:#f8fafc;text-align:left;border-bottom:2px solid #e2e8f0;}
    th:last-child{text-align:right;}

    /* ERP COMPARE */
    .compare{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
    .cr{display:flex;align-items:center;gap:10px;}
    .cn{width:130px;font-size:10px;font-weight:600;color:#64748b;flex-shrink:0;}
    .cn.odoo{color:#d4a843;font-weight:800;}
    .cb{flex:1;background:#f1f5f9;border-radius:3px;height:16px;overflow:hidden;}
    .cbf{height:100%;border-radius:3px;}
    .cv{width:55px;text-align:right;font-size:10px;font-weight:700;color:#64748b;}
    .cv.odoo{color:#d4a843;}

    /* FOOTER */
    .footer{background:#0d1b2e;padding:22px 48px;display:flex;justify-content:space-between;align-items:center;margin-top:4px;}
    .fl{font-size:10px;color:rgba(255,255,255,.5);line-height:1.7;}
    .fl strong{color:rgba(255,255,255,.85);display:block;font-size:11px;}
    .fr{font-size:9px;color:rgba(255,255,255,.62);text-align:right;line-height:1.6;}
    .disc{font-size:9px;color:#94a3b8;text-align:center;margin:16px 0 0;line-height:1.6;padding:0 20px;}

    @media print{
      @page{margin:0}
      body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    }
  </style></head><body><div class="page">

  <!-- HEADER -->
  <div class="hdr">
    <div class="hdr-logo">📊 Odoo ERP ROI Analysis · Prepared by Nexa Solutions · Mohamed Abu Emira</div>
    <h1>Odoo ERP <span>Return on Investment</span> Analysis</h1>
    <div class="hdr-sub">
      Industry: <strong style="color:#fff;">${d.industry}</strong> · 
      ${d.emp} Employees · Annual Revenue ${d.fRev} · 
      Industry Multiplier ×${d.industryMult.toFixed(2)}
    </div>
    <div class="pills">
      <div class="pill gold">📅 ${d.date}</div>
      <div class="pill">🏢 Based on 79+ Live Implementations</div>
      <div class="pill">✅ Odoo Official Methodology</div>
      <div class="pill">🌍 Egypt &amp; GCC</div>
    </div>
  </div>

  <div class="body">

    <!-- KPI SUMMARY -->
    <div class="kpi-grid">
      <div class="kpi gold">
        <div class="kpi-n">${d.fSavings}</div>
        <div class="kpi-l">Annual Savings</div>
      </div>
      <div class="kpi gold">
        <div class="kpi-n">${d.fPayback}</div>
        <div class="kpi-l">⏱ Payback Period</div>
      </div>
      <div class="kpi">
        <div class="kpi-n">${d.fRoi3}</div>
        <div class="kpi-l">3-Year ROI</div>
      </div>
      <div class="kpi">
        <div class="kpi-n">${d.fNet3}</div>
        <div class="kpi-l">Net Value Y1–Y3</div>
      </div>
    </div>

    <!-- BUSINESS PROFILE -->
    <div class="sec-title">👤 Business Profile</div>
    <div class="profile-grid">
      <div class="profile-item"><div class="profile-lbl">Industry</div><div class="profile-val">${d.industry}</div></div>
      <div class="profile-item"><div class="profile-lbl">Employees</div><div class="profile-val">${d.emp}</div></div>
      <div class="profile-item"><div class="profile-lbl">Annual Revenue</div><div class="profile-val">${d.fRev}</div></div>
      <div class="profile-item"><div class="profile-lbl">Avg. Salary / Employee</div><div class="profile-val">${d.fSal}</div></div>
      <div class="profile-item"><div class="profile-lbl">Current Software Cost</div><div class="profile-val">${d.fSw}/yr</div></div>
      <div class="profile-item"><div class="profile-lbl">Software Cost Saved</div><div class="profile-val" style="color:#059669;">${d.fSwSave}</div></div>
    </div>

    <!-- ODOO SUBSCRIPTION DETAILS -->
    ${s ? `
    <div class="sec-title" style="border-bottom-color:#d4a843;">📦 Odoo Subscription & Implementation Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px;">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#92400e;margin-bottom:8px;">📱 Subscription Plan</div>
        <table style="width:100%;font-size:11px;">
          <tr><td style="color:#64748b;padding:3px 0;">Country</td><td style="font-weight:700;text-align:right;">${s.countryName} (${s.currency})</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">Odoo Plan</td><td style="font-weight:700;text-align:right;">${s.planLabel}</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">Backend Users</td><td style="font-weight:700;text-align:right;">${s.users} users</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">License (monthly)</td><td style="font-weight:700;text-align:right;color:#d97706;">$${Math.round(s.licenseMonthly).toLocaleString()}/mo</td></tr>
        </table>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#065f46;margin-bottom:8px;">☁️ Hosting & Infrastructure</div>
        <table style="width:100%;font-size:11px;">
          <tr><td style="color:#64748b;padding:3px 0;">Hosting Type</td><td style="font-weight:700;text-align:right;">${s.hostLabel}</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">Hosting Cost</td><td style="font-weight:700;text-align:right;color:#059669;">$${s.hostCost > 0 ? s.hostCost.toLocaleString() + '/mo' : '0 (Included)'}</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">Total Monthly</td><td style="font-weight:800;text-align:right;color:#059669;font-size:13px;">$${Math.round(s.totalMonthly).toLocaleString()}/mo</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">Annual Cost</td><td style="font-weight:800;text-align:right;color:#d97706;">$${Math.round(s.annualSub).toLocaleString()}/yr</td></tr>
        </table>
      </div>
    </div>

    <table style="margin-bottom:16px;">
      <tr><th colspan="3">🎯 Odoo Success Pack & Consulting Hours</th></tr>
      ${s.implMode === 'pack' ? `
      <tr>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;">🎯 Success Pack — ${s.packLabel}</td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:11px;color:#475569;">${s.packHours} consultant hours · ${s.isNew ? 'New customer (15% off)' : 'Returning customer'}</td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#d97706;">$${s.packCost.toLocaleString()}</td>
      </tr>` : `
      <tr>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;">🤝 Local Partner Implementation</td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:11px;color:#475569;">Fixed lump-sum amount${s.rate !== 1 ? ' · ' + s.symbol + Math.round(s.localImpl).toLocaleString() + ' ' + s.currency : ''}</td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#d97706;">$${Math.round(s.implCost).toLocaleString()}</td>
      </tr>`}
      ${s.extraHrs > 0 ? `<tr>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;">⏱️ Extra Consulting Hours</td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:11px;color:#475569;">${s.extraHrs.toLocaleString()} hrs × $${s.hourlyRate}/hr</td>
        <td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#d97706;">$${Math.round(s.extraCost).toLocaleString()}</td>
      </tr>` : ''}
      <tr style="background:#fffbeb;">
        <td colspan="2" style="padding:8px 14px;font-weight:800;font-size:12px;">💳 Year 1 Total (Subscription + Hosting + Implementation + Extra)</td>
        <td style="padding:8px 14px;text-align:right;font-weight:800;color:#d97706;font-size:14px;">$${Math.round(s.year1).toLocaleString()}</td>
      </tr>
    </table>

    ${s.rate !== 1 ? `<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:11px;color:#0369a1;">
      🔄 <strong>Local Currency Equivalent (${s.currency}):</strong> Monthly ${s.symbol}${s.localMonthly.toLocaleString()} · Annual ${s.symbol}${s.localAnnual.toLocaleString()} · Year 1 Total ${s.symbol}${s.localYear1.toLocaleString()}<br>
      <span style="opacity:.7;font-size:10px;">Rate: 1 USD = ${s.rate} ${s.currency} · ${s.taxNote}</span>
    </div>` : ''}
    ` : ''}

    <!-- INVESTMENT SUMMARY -->
    <div class="sec-title">💰 Investment Summary</div>
    <table>
      <tr><th>Item</th><th style="text-align:right;">Amount</th></tr>
      <tr><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;">🔧 Implementation Budget</td><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;">${d.fImpl}</td></tr>
      <tr><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;">📱 Annual Subscription Y2–Y5${s ? ' (' + s.users + ' users · ' + s.planLabel + ')' : ''}</td><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;">${d.fSub}/yr</td></tr>
      ${s && s.discountPct > 0 ? '<tr style="background:#f0fdf4;"><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;">🎁 Year 1 Discount (' + s.discountPct.toFixed(0) + '% off subscription)</td><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#059669;">$' + s.annualSubY1.toLocaleString() + '/yr · save $' + s.discountAmount.toLocaleString() + '</td></tr>' : ''}
      ${s ? '<tr><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;">☁️ Hosting (' + s.hostLabel + ')</td><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;">$' + (s.hostCost > 0 ? s.hostCost + '/mo' : '0') + '</td></tr>' : ''}
      <tr><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;">🛠️ Annual Support / Consulting</td><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;">${d.fSupp}/yr</td></tr>
      <tr><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;">🧑‍💼 Internal Staff Time</td><td style="padding:7px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;">${d.fStaff}</td></tr>
      <tr style="background:#f0fdf4;"><td style="padding:7px 14px;font-weight:700;">💰 Total 3-Year Investment</td><td style="padding:7px 14px;text-align:right;font-weight:800;color:#059669;">${d.fInvest3}</td></tr>
    </table>

    <!-- DEPT SAVINGS -->
    ${deptRows ? `<div class="sec-title">🏢 Savings by Department</div>
    <table>
      <tr><th>Department</th><th>Details</th><th style="text-align:right;">Annual Saving</th></tr>
      ${deptRows}
      ${swRow}
      <tr style="background:#f0fdf4;"><td colspan="2" style="padding:7px 14px;font-weight:700;">Total Annual Savings</td><td style="padding:7px 14px;text-align:right;font-weight:800;color:#059669;font-size:13px;">${d.fSavings}</td></tr>
    </table>` : ''}

    <!-- 5-YEAR PROJECTION -->
    <div class="sec-title">📈 5-Year Cash Flow Projection</div>
    <table>
      <tr><th>Year</th><th style="text-align:right;">Annual Net Cash Flow</th><th style="text-align:right;">Cumulative</th></tr>
      ${yr5Rows}
    </table>

    <!-- ERP COMPARISON -->
    <div class="sec-title">💡 Why Odoo vs Alternatives</div>
    <div class="compare">
      <div class="cr"><div class="cn">SAP S/4HANA</div><div class="cb"><div class="cbf" style="width:100%;background:#3b82f6;opacity:.5;"></div></div><div class="cv">$350K+</div></div>
      <div class="cr"><div class="cn">Oracle NetSuite</div><div class="cb"><div class="cbf" style="width:51%;background:#8b5cf6;opacity:.5;"></div></div><div class="cv">$180K+</div></div>
      <div class="cr"><div class="cn">MS Dynamics 365</div><div class="cb"><div class="cbf" style="width:34%;background:#06b6d4;opacity:.5;"></div></div><div class="cv">$120K+</div></div>
      <div class="cr"><div class="cn odoo">⭐ Odoo ERP (Your Plan)</div><div class="cb"><div class="cbf" style="width:${odooPct}%;background:#d4a843;"></div></div><div class="cv odoo">${d.fImpl}</div></div>
    </div>

    <div class="disc">* Methodology based on Odoo's official ROI Analysis Template. Efficiency rates benchmarked across 79+ real implementations by Nexa Solutions (Egypt &amp; GCC). Results are indicative — contact Nexa Solutions for a precise assessment tailored to your business.</div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="fl">
      <strong>Mohamed Essam Abu Emira — COO &amp; Co-Founder, Nexa Solutions</strong>
      Odoo 16·17·18 Certified · Google PM Certified · LinkedIn Top ERP Voice · 79+ Projects<br>
      📧 abuemira@nexa-solutions.com · 📱 +20 100 506 1349 · 🌐 nexa-solutions.com
    </div>
    <div class="fr">${d.date}<br>Confidential<br>Nexa Solutions</div>
  </div>

  </div>
  <script>window.onload = function(){ window.print(); };<\/script>
  </body></html>`;

  const blob = new Blob([html], {type:'text/html'});
  const url  = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 20000);
  if (btn) { btn.innerHTML = '📄 Download PDF'; btn.disabled = false; }
}


function roiSwitchTab(n) {
  roiActiveTab = n;
  [1,2,3,4].forEach(i => {
    const p = document.getElementById('roiPanel' + i);
    const t = document.getElementById('roiTab' + i);
    if (p) p.style.display = i === n ? '' : 'none';
    if (t) t.classList.toggle('active', i === n);
  });
  if (n !== 4) roiCalc();
  else subCalc();
}

function roiBuildDeptGrid() {
  const grid = document.getElementById('roiDeptGrid');
  const AR = document.documentElement.getAttribute('data-lang') === 'ar';
  grid.innerHTML = ROI_DEPTS.map(d => `
    <div class="roi-dept-card ${roiDeptSelection[d.id] ? 'active' : ''}" id="dc_${d.id}" onclick="roiToggleDept('${d.id}')">
      <input type="checkbox" ${roiDeptSelection[d.id] ? 'checked' : ''} onclick="event.stopPropagation();roiToggleDept('${d.id}')">
      <div class="roi-dept-name">${d.icon} ${AR ? d.nameAr : d.name}</div>
      <div class="roi-dept-eff">${AR ? 'كفاءة أعلى:' : 'Efficiency gain:'} <strong>${Math.round(d.eff*100)}%</strong></div>
      <div style="font-size:9px;color:rgba(255,255,255,.62);margin-top:2px;line-height:1.3">${AR ? d.descAr : d.desc}</div>
    </div>`).join('');
}

function roiToggleDept(id) {
  roiDeptSelection[id] = !roiDeptSelection[id];
  const card = document.getElementById('dc_' + id);
  if (card) {
    card.classList.toggle('active', roiDeptSelection[id]);
    const cb = card.querySelector('input');
    if (cb) cb.checked = roiDeptSelection[id];
  }
  roiCalc();
}

function fmtUSD(n) {
  if (Math.abs(n) >= 1000000) return '$' + (n/1000000).toFixed(1) + 'M';
  if (Math.abs(n) >= 1000) return (n < 0 ? '-$' : '$') + (Math.abs(n)/1000).toFixed(0) + 'K';
  return '$' + Math.round(n).toLocaleString();
}

// ── INDUSTRY MULTIPLIER ──
const ROI_INDUSTRY_META = {
  general_business: { mult: 1.00, desc: 'Standard Odoo ROI baseline',                  descAr: 'خط الأساس القياسي لعائد الاستثمار من أودو' },
  manufacturing: { mult: 1.15, desc: 'Complex ops → higher Odoo gains',                descAr: 'عمليات معقدة → مكاسب أكبر من أودو' },
  construction:  { mult: 1.10, desc: 'Project tracking & cost control gains',           descAr: 'مكاسب تتبع المشاريع والتحكم بالتكاليف' },
  retail_fnb:    { mult: 1.12, desc: 'POS + inventory + waste reduction',               descAr: 'نقاط البيع + المخزون + تقليل الهدر' },
  logistics:     { mult: 1.08, desc: 'Route & delivery optimisation gains',             descAr: 'مكاسب تحسين المسارات والتوصيل' },
  services:      { mult: 1.05, desc: 'Billing & project automation gains',              descAr: 'مكاسب أتمتة الفواتير والمشاريع' },
  real_estate:   { mult: 1.07, desc: 'Property & contract management gains',            descAr: 'مكاسب إدارة العقارات والعقود' },
  trading:       { mult: 1.09, desc: 'Purchase-to-sale cycle compression',              descAr: 'تسريع دورة الشراء والبيع' },
  healthcare:    { mult: 1.06, desc: 'Compliance & scheduling automation',              descAr: 'أتمتة الامتثال والجدولة' },
};
let roiIndustryMult = 1.00; // default: General Business

function roiSelectIndustry(btn) {
  document.querySelectorAll('#roiIndustryPills .roi-ind-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const ind = btn.dataset.ind;
  const meta = ROI_INDUSTRY_META[ind] || { mult: 1.0, desc: '', descAr: '' };
  roiIndustryMult = meta.mult;
  const multBadge = document.getElementById('roiIndustryMultBadge');
  const descEl = document.getElementById('roiIndustryDesc');
  if (multBadge) multBadge.textContent = '×' + meta.mult.toFixed(2);
  const AR = document.documentElement.getAttribute('data-lang') === 'ar';
  if (descEl) descEl.textContent = AR && meta.descAr ? meta.descAr : meta.desc;
  // Flash the multiplier badge
  if (multBadge) { multBadge.style.transform = 'scale(1.25)'; setTimeout(() => { multBadge.style.transform = 'scale(1)'; }, 200); }
  roiCalc();
}


// ── PLAN SELECTOR — Odoo Official Pricing ──────────────────────────────────
let roiPlanPrice = 24.90; // default: Standard

function roiSelectPlan(btn) {
  // Update button styles
  document.querySelectorAll('#roiPlanBtns .roi-plan-btn').forEach(b => {
    b.style.border = '1px solid rgba(255,255,255,.18)';
    b.style.background = 'rgba(255,255,255,.06)';
    b.style.color = 'rgba(255,255,255,.7)';
    b.style.fontWeight = '600';
  });
  btn.style.border = '1px solid rgba(1,126,132,.5)';
  btn.style.background = 'rgba(1,126,132,.18)';
  btn.style.color = 'var(--teal-mid)';
  btn.style.fontWeight = '700';
  roiPlanPrice = parseFloat(btn.dataset.price);
  roiCalc();
}

// ══ LIVE ROI STATE — updated on every calc, read by PDF & Email ══
let roiLiveData = {};

function roiCalc() {
  const emp    = parseInt(document.getElementById('roiEmp').value);
  const sal    = parseInt(document.getElementById('roiSal').value);       // annual salary per emp
  const rev    = parseInt(document.getElementById('roiRev').value);
  const sw     = parseInt(document.getElementById('roiSw').value);        // current software cost
  const impl   = parseInt(document.getElementById('roiImpl').value);
  // Subscription: full price for Y2+ (recurring), discounted for Y1
  const subHidden  = document.getElementById('roiSub');
  const sub        = subHidden ? (parseInt(subHidden.value) || 0) : 0;   // Y2+ recurring
  const subY1Hidden = document.getElementById('roiSubY1');
  const subY1      = subY1Hidden ? (parseInt(subY1Hidden.value) || sub) : sub;  // Y1 (may be discounted)
  const supp   = parseInt(document.getElementById('roiSupp').value);
  const staff  = parseInt(document.getElementById('roiStaff').value);

  // Update display labels
  document.getElementById('roiEmpVal').textContent  = emp;
  document.getElementById('roiSalVal').textContent  = sal >= 1000 ? '$' + (sal/1000).toFixed(0) + 'K' : '$' + sal;
  document.getElementById('roiRevVal').textContent  = fmtUSD(rev);
  document.getElementById('roiSwVal').textContent   = fmtUSD(sw);
  document.getElementById('roiImplVal').textContent = fmtUSD(impl);
  // roiSubVal display now managed by Tab 4 subCalc()
  document.getElementById('roiSuppVal').textContent = fmtUSD(supp) + '/yr';
  document.getElementById('roiStaffVal').textContent= fmtUSD(staff);

  // Total annual FTE cost pool (all employees)
  const totalFTEcost = emp * sal;

  // Calculate savings per selected department using Odoo benchmark efficiency rates
  const selectedDepts = ROI_DEPTS.filter(d => roiDeptSelection[d.id]);
  let totalSavings = 0;
  const deptSavings = [];

  selectedDepts.forEach(d => {
    // Scale FTE proportionally to company size (template uses 50 FTE baseline)
    const scaledFTE = (d.fte / 50) * emp;
    const deptFTEcost = scaledFTE * sal;
    // Apply industry efficiency multiplier
    const savings = Math.round(deptFTEcost * d.eff * (roiIndustryMult || 1.0));
    totalSavings += savings;
    deptSavings.push({ ...d, savings, scaledFTE: Math.round(scaledFTE * 10) / 10 });
  });

  // Software replacement savings (Odoo replaces legacy tools)
  const swSavings = Math.round(sw * SW_SAVINGS_RATIO);
  totalSavings += swSavings;

  // Year 1 cost — uses DISCOUNTED subscription for Year 1
  const y1cost = impl + subY1 + supp + staff;
  // Recurring annual cost (years 2+) — full price
  const recurringCost = sub + supp;
  // Year 1 net (savings ramp up to 75% in Y1)
  const y1savings = Math.round(totalSavings * 0.75);

  // 5-year cash flows (Odoo template pattern: Y1 ramp, Y2-5 full)
  const cashFlows = [
    y1savings - y1cost,
    totalSavings - recurringCost,
    totalSavings - recurringCost,
    totalSavings - recurringCost,
    totalSavings - recurringCost,
  ];

  // Cumulative
  const cumulative = [];
  let cum = 0;
  cashFlows.forEach(cf => { cum += cf; cumulative.push(cum); });

  // Payback
  const totalInvest = impl + staff;
  let paybackMonths = null;
  if (totalSavings > 0) {
    const annualNet = totalSavings - recurringCost;
    if (y1savings > y1cost) {
      paybackMonths = Math.max(6, Math.round((y1cost / y1savings) * 12));
    } else {
      paybackMonths = 12 + Math.round(((y1cost - y1savings) / annualNet) * 12);
    }
  }

  // 3-yr ROI
  const net3 = cumulative[2];
  const invest3 = y1cost + recurringCost * 2;
  const roi3 = invest3 > 0 ? Math.round((net3 / invest3) * 100) : 0;

  // ── UPDATE DOM ──
  const AR = document.documentElement.getAttribute('data-lang') === 'ar';
  document.getElementById('roiSavings').innerHTML = fmtUSD(totalSavings) + '<span class="roi-result-unit">/yr</span>';
  if (selectedDepts.length === 0) {
    document.getElementById('roiSubline').textContent = AR ? 'اختر الأقسام للحساب' : 'Select departments to calculate';
  } else {
    document.getElementById('roiSubline').textContent = AR
      ? selectedDepts.length + ' قسم · ' + emp + ' موظف · ' + Math.round(totalSavings / Math.max(emp * sal, 1) * 100) + '% كفاءة' +
        (roiIndustryMult && roiIndustryMult !== 1 ? ' · ×' + roiIndustryMult.toFixed(2) + ' دفعة قطاع' : '')
      : selectedDepts.length + ' dept' + (selectedDepts.length !== 1 ? 's' : '') + ' · ' +
        emp + ' employees · ' + Math.round(totalSavings / Math.max(emp * sal, 1) * 100) + '% FTE efficiency gain' +
        (roiIndustryMult && roiIndustryMult !== 1 ? ' · ×' + roiIndustryMult.toFixed(2) + ' industry boost' : '');
  }

  document.getElementById('bkPayback').textContent = paybackMonths
    ? AR
      ? (paybackMonths < 12 ? paybackMonths + ' شهر' : (paybackMonths/12).toFixed(1) + ' سنوات')
      : (paybackMonths < 12 ? paybackMonths + ' months' : (paybackMonths/12).toFixed(1) + ' years')
    : '—';
  document.getElementById('bkRoi3').textContent = roi3 > 0 ? roi3 + '%' : '—';
  document.getElementById('bkNet3').textContent = fmtUSD(net3);
  document.getElementById('bkSwSave').textContent = swSavings > 0 ? fmtUSD(swSavings) + '/yr' : '$0/yr';

  // ── DEPT SAVINGS LIST ──
  const list = document.getElementById('roiDeptSavingsList');
  if (deptSavings.length === 0) {
    list.innerHTML = '<div style="font-size:11px;color:rgba(255,255,255,.62);text-align:center;padding:16px;">' + (AR ? 'اختر الأقسام في التبويب 2' : 'Select departments in Tab 2') + '</div>';
  } else {
    const maxS = Math.max(...deptSavings.map(d => d.savings));
    list.innerHTML = [...deptSavings]
      .sort((a,b) => b.savings - a.savings)
      .map(d => `
        <div class="roi-dept-savings-row">
          <span class="roi-dept-savings-name">${d.icon} ${AR ? d.nameAr : d.name}
            <span class="roi-dept-eff-badge">${Math.round(d.eff*100)}% ${AR ? 'كفاءة' : 'eff.'}</span>
          </span>
          <span class="roi-dept-savings-val">${fmtUSD(d.savings)}</span>
        </div>
        <div style="padding:0 6px 4px"><div class="roi-bar-track"><div class="roi-bar-fill" style="width:${Math.round((d.savings/maxS)*100)}%"></div></div></div>
      `).join('') +
      (swSavings > 0 ? `
        <div class="roi-dept-savings-row" style="border-color:rgba(212,168,67,.2)">
          <span class="roi-dept-savings-name">💾 ${AR ? 'توفير البرمجيات' : 'Software Replacement'}</span>
          <span class="roi-dept-savings-val" style="color:var(--gold)">${fmtUSD(swSavings)}</span>
        </div>` : '');
  }

  // ── 5-YEAR CHART ──
  const chart = document.getElementById('roi5yrChart');
  const maxAbs = Math.max(...cumulative.map(Math.abs), 1);
  chart.innerHTML = cumulative.map((val, i) => {
    const isNeg = val < 0;
    const pct = Math.round((Math.abs(val) / maxAbs) * 100);
    return `<div class="roi-yr-bar-wrap">
      <div class="roi-yr-val" style="color:${isNeg ? '#f87171' : 'var(--teal-mid)'}">${fmtUSD(val)}</div>
      <div class="roi-yr-bar-outer">
        <div class="${isNeg ? 'roi-yr-bar-neg' : 'roi-yr-bar-pos'}" style="height:${pct}%"></div>
      </div>
      <div class="roi-yr-label">${AR ? 'س' + (i+1) : 'Year ' + (i+1)}</div>
    </div>`;
  }).join('');

  // ── SYNC TO ROI REPORT SECTION ──
  const paybackText = paybackMonths
    ? (paybackMonths < 12 ? paybackMonths + ' months' : (paybackMonths/12).toFixed(1) + ' yrs')
    : null;
  // ── STORE ALL LIVE VALUES ──
  roiLiveData = {
    // Inputs
    emp, sal, rev, sw, impl, sub, supp, staff,
    industry: document.querySelector('#roiIndustryPills .roi-ind-btn.active')?.textContent.trim() || '—',
    industryMult: roiIndustryMult,
    // Computed
    totalSavings,
    swSavings,
    y1cost,
    y1savings,
    recurringCost,
    net3,
    roi3,
    paybackMonths,
    cashFlows,
    cumulative,
    deptSavings: [...deptSavings],
    selectedDepts: [...selectedDepts],
    // Formatted strings
    fSavings:  totalSavings > 0 ? fmtUSD(totalSavings) + '/yr' : '—',
    fPayback:  paybackMonths ? (paybackMonths < 12 ? paybackMonths + ' months' : (paybackMonths/12).toFixed(1) + ' years') : '—',
    fRoi3:     roi3 > 0 ? roi3 + '%' : '—',
    fNet3:     fmtUSD(net3),
    fSwSave:   swSavings > 0 ? fmtUSD(swSavings) + '/yr' : '$0/yr',
    fImpl:     fmtUSD(impl),
    fSub:      fmtUSD(sub),
    fSupp:     fmtUSD(supp),
    fStaff:    fmtUSD(staff),
    fRev:      fmtUSD(rev),
    fSal:      '$' + (sal/1000).toFixed(0) + 'K',
    fSw:       fmtUSD(sw),
    fInvest3:  fmtUSD(impl + staff + (sub + supp) * 3),
    date:      new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}),
  };

  if (typeof syncReportKpis === 'function') {
    syncReportKpis(totalSavings > 0 ? totalSavings : null, paybackText, roi3 > 0 ? roi3 : null, net3 !== 0 ? net3 : null);
  }
  // Render ERP comparison chart with live Odoo cost
  const implCost = parseInt(document.getElementById('roiImpl')?.value) || 35000;
  if (typeof renderErpCompare === 'function') renderErpCompare(implCost);
}

// Init
roiBuildDeptGrid();
document.addEventListener('DOMContentLoaded', () => { roiBuildDeptGrid(); roiCalc(); });
