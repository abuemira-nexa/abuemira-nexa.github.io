/* ── Certificates: collapsed to 8 until expanded ── */
(function () {
  const grid = document.getElementById('certsGrid'), btn = document.getElementById('certsMore');
  if (!grid || !btn) return;
  const total = grid.querySelectorAll('.cert-card').length;
  const label = () => {
    const AR = document.documentElement.getAttribute('data-lang') === 'ar';
    const open = !grid.classList.contains('collapsed');
    btn.textContent = open ? (AR ? 'عرض أقل' : 'Show fewer')
                           : (AR ? `عرض كل الشهادات (${total})` : `Show all ${total} certificates`);
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', () => { grid.classList.toggle('collapsed'); label(); });
  new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
  label();
})();
/* ── TESTIMONIALS DATA ── */
const TESTIMONIALS = [
  {name:"Mohammad Nasab",role:"Regional Partner Manager @Odoo | ERP Growth Strategist",img:"./assets/img/recommendations/MohammadNasab.jpeg",linkedin:"https://www.linkedin.com/in/mohammad-nasab97/",q:"One of the most dedicated technical guys that I worked with before, your deep understanding of what you're doing, reflects in the success of your projects."},
  {name:"Faical Hafiane",role:"CEO @ FAMFOOD | Expert in International Trade & Market Expansion",img:"./assets/img/recommendations/Faical.jpeg",linkedin:"https://www.linkedin.com/in/faical-hafiane/",q:"Excellent and professional."},
  {name:"Ahmed Malik",role:"CFO",img:"./assets/img/recommendations/ahmed_malik.jpeg",linkedin:"https://www.linkedin.com/in/ahmed-malik-a4462a143/",q:"Mohamed Essam is one of the hardworking individuals. I worked with him personally, and he knows what he is doing according to professional principles. I wish you success, my friend."},
  {name:"Mohamed Khalil",role:"Founder & CEO @PlatFarm | Digitizing Agriculture Sector in MENA",img:"./assets/img/recommendations/MohamedKhalil.jpeg",linkedin:"https://www.linkedin.com/in/mohamed-khalil-a0ba2515/",q:"We had a great experience working with Mohamed on the implementation of our company's ERP system. His strong technical expertise combined with solid accounting knowledge allowed him to deliver a seamless and tailored Odoo solution that fully met our requirements. We highly recommend Mohamed for any organization seeking a smooth and professional Odoo implementation."},
  {name:"Hesham Elmahdy",role:"Co-Founder @OdooTec",img:"./assets/img/recommendations/hesham.jpeg",linkedin:"https://www.linkedin.com/in/hesham-elmahdy/",q:"Mohammad was my go-to colleague when I wanted finance and accounting related consulting. He's precise, professional, time sensitive and dependable. Most importantly, I fully trust him. I'd love to work with him again anytime."},
  {name:"Ahmed Hassan Algammal",role:"Vice President of Sales @ Absolute ERP | Market Knowledge, Business Transformation",img:"./assets/img/recommendations/ahmedhassan.jpeg",linkedin:"#",q:"Mohamed has been an integral part of my team as a senior Odoo Implementer for the past five years. He has consistently demonstrated a deep technical understanding of the Odoo ecosystem and a unique ability to translate complex business requirements into functional, scalable solutions. His dedication and consistency over the years make him a rare find in the ERP space."},
  {name:"Aya Mohsen",role:"Strategy & Corporate Development Senior Manager",img:"./assets/img/recommendations/aya.jpeg",linkedin:"https://www.linkedin.com/in/aya-mohsen-cma-fmva-3919a875/",q:"Essam is a very hard-working person, he is also very dedicated and ambitious. I enjoyed teaching him."},
  {name:"Yasser A. AL Samhouri",role:"Finance Manager | Budgeting & Forecasting",img:"./assets/img/recommendations/Yasser.jpg",linkedin:"https://www.linkedin.com/in/yasser-arafat-al-samhouri/",q:"Mohamed Essam Abu Emira is a very dedicated person to his work and his customers. His professionalism and expertise were evident throughout our collaboration."},
  {name:"Ahmed Galal, PMP®, PBA®",role:"Business Consultant & Project Manager | Expert in Odoo ERP Implementations",img:"./assets/img/recommendations/galal.jpeg",linkedin:"https://www.linkedin.com/in/ahmed-galal-pmp%C2%AE-pba%C2%AE-29b170169/",q:"I was consistently impressed by his strong technical skills and deep understanding of ERP systems, particularly Odoo. Mohamed's expertise in financial accounting and supply chain management was invaluable to our team. His strong problem-solving skills and attention to detail ensured that projects were completed on time and within budget."},
  {name:"Ahmed Abdelhak",role:"SAP FI/CO/SD | Admin Odoo ERP Consultant | Business Analyst | Odoo Project Manager",img:"./assets/img/recommendations/abdelhak.jpeg",linkedin:"https://www.linkedin.com/in/ahmed-abdelhak-23855566/",q:"Mohamed demonstrated an exceptional ability to analyze business processes, design effective solutions, and successfully implement Odoo ERP projects. He stands out with his strong analytical skills, deep understanding of business needs, and ability to optimize operations using Odoo systems. I highly recommend working with Mohamed for anyone seeking an ERP expert with experience in process optimization and efficient Odoo solutions implementation."},
  {name:"Mohsen DIFALLAH",role:"Python / Odoo Developer",img:"./assets/img/recommendations/difallah.jpeg",linkedin:"https://www.linkedin.com/in/mohsen-difallah-496b35a4/",q:"He has exceptional analytical skills, a talent for solving complex challenges, and profound expertise in ERP systems, especially Odoo, with a focus on accounting and financial implementation. Mohamed is not only technically brilliant but also a great team player who consistently delivers results. He would be an invaluable asset to any organization."},
  {name:"Muhammad Mahmoud",role:"Sr. Accountant | Sr. Odoo Functional Consultant | Certified v15,v16 | Project Manager",img:"./assets/img/recommendations/muhammad_mahmoud.jpeg",linkedin:"https://www.linkedin.com/in/muhammad-m-abod/",q:"I have worked with Muhammad Abu Amira for nearly two years, and I recommend him to any company that needs a reliable person who has experience as a functional consultant, systems analyst, problem solver, multi-skilled, works under pressure, and also an expert in accounting."},
  {name:"Abdulrahman Gwida",role:"DipIFR | FMVA | CMA P2 Candidate | Odoo Specialist | Financial Modeling & Reporting",img:"./assets/img/recommendations/gwida.jpeg",linkedin:"https://www.linkedin.com/in/abdelrahman-gwida/",q:"Muhamad is a hardworking, skilled, and dedicated professional whose eagerness to learn is limitless. His expertise and determination make him a remarkable asset to any team."},
  {name:"Ahmed Elsayed",role:"Senior Python | Odoo Developer",img:"./assets/img/recommendations/ahmed.jpeg",linkedin:"https://www.linkedin.com/in/damhogy/",q:"Mohamed is one of the best Odoo Consultants I worked with. He has the ability to simplify any complex requirements and make sure it will be done with the best way and quality. Also, Mohammed is a kind and helpful man and on a personal level you would love to have someone like him in your work environment."},
  {name:"Nourhan Hazim",role:"Software Testing Engineer at Celfocus | Advansys",img:"./assets/img/recommendations/nourhan_hazim.jpeg",linkedin:"https://www.linkedin.com/in/nourhan-hazim/",q:"One of the best functional consultants I've ever worked with. Great co-worker and mentor."},
  {name:"Ayman Tobbala",role:"Senior Odoo Functional Consultant",img:"./assets/img/recommendations/ayman_tobbala.jpeg",linkedin:"https://www.linkedin.com/in/aymantobbala/",q:"Abu Emira is specialized in Accounting, performed Odoo implementation, support, and training for end users. He worked for clients in Egypt, Saudi Arabia, and Canada."},
  {name:"Ahmed Rashad",role:"ERP / Odoo Project Manager",img:"./assets/img/recommendations/rashed.jpeg",linkedin:"https://www.linkedin.com/in/ahmedrashad11/",q:"Mohamed is very talented — he is a professional accountant & Odoo implementer, has the ability to handle customers well by building great relationships with them that will help the project. He is eager to learn and develop multiple skills."},
  {name:"Ahmed Saeed",role:"Python Developer | Backend | AWS Cloud | Odoo Technical Consultant",img:"./assets/img/recommendations/ahmed_saeed.jpeg",linkedin:"https://www.linkedin.com/in/ahmed-saeed-75a2938b/",q:"Mohamed was one of the colleagues who helped me understand Odoo and business practices in general, and he is also one of the most dedicated coworkers."},
  {name:"Bassant Hossam",role:"SAI and Automation Engineer",img:"./assets/img/recommendations/bassant_hossam.jpeg",linkedin:"https://www.linkedin.com/in/bassant-hossam-366403208/",q:"I highly recommend Mohamed Essam Abu Emira as an exceptional Odoo Functional Consultant. His expertise in Odoo, ability to analyze complex requirements, and bridge the gap between functional and technical aspects make him a valuable asset."},
  {name:"Muhammed Abdelfatah",role:"AI Track Supervisor at ITI",img:"./assets/img/recommendations/muhammed_abdelfatah.jpeg",linkedin:"https://www.linkedin.com/in/muhammed-abdelfatah-a45ab9104/",q:"During the time we worked together, Mohamed was highly professional, efficient, and an excellent Odoo consultant. He always aspired to improve himself in all aspects and went beyond expectations."},
  {name:"Mohamed Salah Helal",role:"Odoo Developer | Data Scientist | Session Lead",img:"./assets/img/recommendations/mohamed_salah_helal.jpeg",linkedin:"https://www.linkedin.com/in/mohamed-salah-helal/",q:"Mohamed and I worked together on several projects at Odootec, and I was lucky to call him my coworker. He consistently gave 100 percent effort to the team and played a significant role in ensuring we completed all tasks on time."},
  {name:"Mohamed Nayel",role:"Software Test Engineer @ Transflo",img:"./assets/img/recommendations/mohamed_nayel.jpeg",linkedin:"https://www.linkedin.com/in/momagdinayel/",q:"I'm thrilled that I had worked with Mohamed on several projects. He is one of the best people I had as a coworker. I highly recommend his expertise; he is a person who can tackle any problem remarkably with hard and smart work."},
  {name:"Mostafa Rohaim",role:"JDE Specialist at Exact Fabrication Services",img:"./assets/img/recommendations/avatar-1.png",linkedin:"#",q:"بشمهندس محمد واحد من أكثر الناس اللي قابلتهم تركيزا و تفانيا في الشغل و رغبة في تعلم الجديد و تطوير الذات دا بجانب خبرته الكبيرة في الحسابات و أودو طبعا. إنسان محترم و خلوق و أتمنى له التوفيق دائما."},
  {name:"Heba Allam",role:"HR & Administration Manager at Nutriti Pharma",img:"./assets/img/recommendations/heba_allam.jpeg",linkedin:"https://www.linkedin.com/in/heba-allam-2194231b/",q:"Mohamed is a very dedicated, loyal person. He is always ready to take over all the work responsibility."},
  {name:"Yousef Ashraf",role:"Odoo Developer at Intalio-Everteam GS",img:"./assets/img/recommendations/yousef_ashraf.jpeg",linkedin:"https://www.linkedin.com/in/yousef-a-luka/",q:"I have worked with Mohamed for a while, he is so helpful in teamwork, and has never hesitated to share his knowledge with others."},
  {name:"Caroline Farid",role:"EX Dentist, A Marketer",img:"./assets/img/recommendations/caroline_farid.jpeg",linkedin:"https://www.linkedin.com/in/caroline-farid-a39546221/",q:"Professional and can handle clients very well."},
  {name:"Mohamed Eldabbas",role:"Marketing and Technical Writer",img:"./assets/img/recommendations/avatar-1.png",linkedin:"https://www.linkedin.com/in/mohamed-eldabbas-6a1679151/",q:"I wholeheartedly recommend Mohamed Essam Abu Emira for any Odoo-related project. His expertise and dedication make him an asset to any team."},
  {name:"Amr Farouk",role:"ERP Technical Support Manager",img:"./assets/img/recommendations/amr_farouk.jpeg",linkedin:"#",q:"Mr. Mohamed is one of the best colleagues I've worked with."},
  {name:"Ashif TK",role:"Experienced Accounting Professional | Audit Assistant",img:"./assets/img/recommendations/Ashif.jpeg",linkedin:"#",q:"Excellent."},
  {name:"Ahmed Ezzat Embaby",role:"Financial Analyst at Ebny Real Estate Development",img:"./assets/img/recommendations/ahmed_ezzat_embaby.jpeg",linkedin:"https://www.linkedin.com/in/ahmed-ezzat-embaby-11607645/",q:"He is a hard worker."},
];

/* ── RECOMMENDATIONS MODAL ── */
const REC_CATEGORIES = {
  all:     { label: "All",              icon: "👥" },
  odoo:    { label: "Odoo / ERP",       icon: "🟣" },
  finance: { label: "Finance",          icon: "💰" },
  pm:      { label: "PM / Management",  icon: "📋" },
  client:  { label: "Clients",          icon: "🤝" }
};

let REC_ANNOTATED = null;
function buildRecAnnotated() {
  const cats = [
    "odoo","client","finance","client","odoo","odoo","pm","client",
    "pm","odoo","odoo","odoo","finance","odoo","odoo","odoo",
    "pm","odoo","odoo","odoo","odoo","odoo","finance","pm",
    "odoo","client","odoo","odoo","finance","finance"
  ];
  return TESTIMONIALS.map((t, i) => ({ cat: cats[i] || "odoo", ...t }));
}

let recsLoaded = false;
let recsActiveFilter = 'all';

function openRecModal() {
  document.getElementById('recModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!recsLoaded) {
    recsLoaded = true;
    REC_ANNOTATED = buildRecAnnotated();
    const filterRow = document.getElementById('recsFilterRow');
    if(filterRow) {
      Object.entries(REC_CATEGORIES).forEach(([key, val]) => {
        const btn = document.createElement('button');
        btn.dataset.cat = key;
        btn.className = 'recs-filter-btn' + (key === 'all' ? ' active' : '');
        btn.innerHTML = `${val.icon} ${val.label}`;
        btn.addEventListener('click', () => {
          recsActiveFilter = key;
          filterRow.querySelectorAll('.recs-filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.cat === key);
          });
          renderRecsGrid();
        });
        filterRow.appendChild(btn);
      });
    }
    renderRecsGrid();
  }
}

function renderRecsGrid() {
  const grid = document.getElementById('recsGrid');
  if(!grid) return;
  const list = recsActiveFilter === 'all'
    ? REC_ANNOTATED
    : REC_ANNOTATED.filter(r => r.cat === recsActiveFilter);

  grid.style.opacity = '0';
  setTimeout(() => {
    grid.innerHTML = list.map((r, i) => `
      <div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--rl);padding:22px;display:flex;flex-direction:column;gap:14px;opacity:0;transform:translateY(16px);transition:opacity .35s ${i*30}ms ease, transform .35s ${i*30}ms ease;" class="rec-card-anim">
        <p style="font-size:.84rem;color:var(--gray-600);line-height:1.7;font-style:italic;flex:1;">"${r.q}"</p>
        <div style="display:flex;align-items:center;gap:12px;padding-top:10px;border-top:1px solid var(--gray-200);">
          <img src="${r.img}" alt="${r.name}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid rgba(1,126,132,.2);" onerror="this.style.opacity='0'">
          <div style="min-width:0;">
            <div style="font-size:.85rem;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.name}</div>
            <div style="font-size:.72rem;color:var(--gray-400);line-height:1.4;margin-top:1px;">${r.role}</div>
            ${r.linkedin && r.linkedin !== '#' ? `<a href="${r.linkedin}" target="_blank" style="font-size:.72rem;color:var(--teal);font-weight:700;margin-top:3px;display:inline-block;">LinkedIn ↗</a>` : ''}
          </div>
        </div>
      </div>`).join('');

    requestAnimationFrame(() => {
      grid.style.opacity = '1';
      grid.querySelectorAll('.rec-card-anim').forEach(card => {
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  }, 120);
}

function closeRecModal() {
  document.getElementById('recModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeRecModal(); });

/* ══════════════════════════════════════════
   EMAIL ROI REPORT — Modal Functions
   ══════════════════════════════════════════ */

function openRoiEmailModal() {
  const modal = document.getElementById('roiEmailModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Reset to form view
  const success = document.getElementById('roiEmailSuccess');
  const body    = document.getElementById('roiEmailModalBody');
  if (success) success.style.display = 'none';
  if (body)    body.style.display    = '';
  // Reset button state
  const btn = document.getElementById('roiEmailSendBtn');
  if (btn) { btn.disabled = false; btn.textContent = '📧 Send ROI Report'; }

  // ── Auto-sync Industry from active ROI pill ──
  const indEl = document.getElementById('emailIndustry');
  if (indEl) {
    const activeBtn = document.querySelector('#roiIndustryPills .roi-ind-btn.active');
    if (activeBtn) {
      const ind = activeBtn.getAttribute('data-ind') || '';
      const indMap = {
        manufacturing: 'Manufacturing',
        construction:  'Construction & Real Estate',
        retail_fnb:    'Food & Beverage',
        logistics:     'Logistics & Transport',
        services:      'Services & Consulting',
        real_estate:   'Construction & Real Estate',
        trading:       'Trading & Distribution',
        healthcare:    'Healthcare & Pharma',
      };
      const mapped = indMap[ind] || 'General Business';
      for (let i = 0; i < indEl.options.length; i++) {
        if (indEl.options[i].value === mapped) { indEl.selectedIndex = i; break; }
      }
    }
  }
}

function closeRoiEmailModal() {
  const modal = document.getElementById('roiEmailModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleEmailPreview(btn) {
  const box = document.getElementById('roiEmailPreviewBox');
  if (!box) return;
  const isOpen = box.style.display === 'block';
  if (isOpen) {
    box.style.display = 'none';
    btn.textContent = '👁 Preview Email Content';
  } else {
    box.style.display = 'block';
    btn.textContent = '🔼 Hide Preview';
    const name    = (document.getElementById('emailCustomerName')  || {}).value || '(Customer Name)';
    const company = (document.getElementById('emailCompanyName')   || {}).value || '';
    const industry= (document.getElementById('emailIndustry')      || {}).value || 'General Business';
    const note    = (document.getElementById('emailNote')          || {}).value || '';
    const roiEl   = document.getElementById('roiResultNum') || document.querySelector('.roi-result-num');
    const roiVal  = roiEl ? roiEl.textContent.trim() : 'N/A';

    box.innerHTML = `
      <div style="font-size:13px;line-height:1.8;color:var(--gray-600);background:#f8fafc;border:1px solid var(--gray-200);border-radius:10px;padding:18px;margin-top:8px;">
        <strong>To:</strong> ${name}${company ? ' — ' + company : ''}<br>
        <strong>Subject:</strong> Your Personalised Odoo ERP ROI Report — Nexa Solutions<br><br>
        Dear ${name},<br><br>
        ${note ? note + '<br><br>' : ''}
        Based on your <strong>${industry}</strong> profile, we have prepared a tailored ROI analysis for your Odoo ERP implementation.<br><br>
        📊 <strong>Estimated ROI: ${roiVal}%</strong><br><br>
        This analysis is based on 79+ real implementations across Egypt &amp; GCC.<br><br>
        Best regards,<br>
        <strong>Mohamed Essam Abu Emira</strong><br>
        COO &amp; Co-Founder — Nexa Solutions<br>
        <!-- TODO: ROI report uses +20 1111 282 228; the rest of the site uses +20 100 506 1349. Confirm which number belongs here. -->
        📞 +20 1111 282 228
      </div>`;
  }
}

async function sendRoiEmail() {
  const nameEl    = document.getElementById('emailCustomerName');
  const emailEl   = document.getElementById('emailCustomerEmail');
  const companyEl = document.getElementById('emailCompanyName');
  const indEl     = document.getElementById('emailIndustry');
  const noteEl    = document.getElementById('emailNote');
  const btn       = document.getElementById('roiEmailSendBtn');

  const custName  = nameEl    ? nameEl.value.trim()    : '';
  const custEmail = emailEl   ? emailEl.value.trim()   : '';
  const company   = companyEl ? companyEl.value.trim() : '';
  const formInd   = indEl     ? indEl.value            : 'General Business';
  const note      = noteEl    ? noteEl.value.trim()    : '';

  if (!custName)  { alert('Please enter the customer name.');  return; }
  if (!custEmail) { alert('Please enter the customer email.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(custEmail)) {
    alert('Please enter a valid email address.'); return;
  }

  if (btn) { btn.disabled = true; btn.textContent = '⏳ Sending...'; }

  // ── BUILD RICH HTML EMAIL BODY (mirrors the PDF) ──────────────────────────
  const d = (typeof roiLiveData !== 'undefined' && roiLiveData && roiLiveData.emp) ? roiLiveData : null;

  const fmtU = (n) => {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 1e6) return (n < 0 ? '-' : '') + '$' + (abs/1e6).toFixed(1) + 'M';
    if (abs >= 1e3) return (n < 0 ? '-' : '') + '$' + Math.round(abs/1e3) + 'K';
    return (n < 0 ? '-$' : '$') + abs.toLocaleString();
  };

  const deptRowsHtml = d ? (d.deptSavings || [])
    .sort((a,b) => b.savings - a.savings)
    .map(dept => `
      <tr>
        <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;">${dept.icon || ''} ${dept.name}</td>
        <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;color:#475569;">
          ${Math.round((dept.eff||0)*100)}% efficiency · ${Math.round(dept.scaledFTE||0)} FTEs
        </td>
        <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#017E84;font-size:13px;">${fmtU(dept.savings)}/yr</td>
      </tr>`).join('') : '';

  const swRowHtml = (d && d.swSavings > 0) ? `
    <tr style="background:#fffbeb;">
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;">💾 Software Replacement</td>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;color:#475569;">~50% of legacy software costs eliminated</td>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#d97706;font-size:13px;">${fmtU(d.swSavings)}/yr</td>
    </tr>` : '';

  const yr5Html = d ? (d.cashFlows || []).map((cf, i) => {
    const cum = d.cumulative[i];
    return `<tr>
      <td style="padding:8px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:600;">Year ${i+1}</td>
      <td style="padding:8px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;">${fmtU(cf)}</td>
      <td style="padding:8px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;font-weight:700;color:${cum>=0?'#059669':'#dc2626'}">${fmtU(cum)}</td>
    </tr>`;
  }).join('') : '';

  const maxCost = 350000;
  const odooPct = d ? Math.max(5, Math.round((d.impl / maxCost) * 100)) : 10;

  const today = new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'});
  const industry = d ? d.industry : formInd;

  const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Odoo ROI Report</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<div style="max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10);">

  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#0d1b2e 0%,#1a2f4a 100%);padding:36px 40px 28px;">
    <div style="font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.62);margin-bottom:10px;">
      📊 Odoo ERP ROI Analysis · Prepared by Nexa Solutions · Mohamed Abu Emira
    </div>
    <h1 style="margin:0 0 6px;font-size:26px;font-weight:800;color:#fff;line-height:1.2;">
      Odoo ERP <span style="color:#d4a843;">Return on Investment</span> Analysis
    </h1>
    <p style="margin:0 0 18px;font-size:12px;color:rgba(255,255,255,.55);">
      Industry: <strong style="color:#fff;">${industry}</strong>${d ? ` · ${d.emp} Employees · Annual Revenue ${d.fRev} · Industry Multiplier ×${d.industryMult.toFixed(2)}` : ''}
    </p>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <span style="font-size:10px;font-weight:700;padding:3px 11px;border-radius:20px;background:rgba(212,168,67,.15);border:1px solid rgba(212,168,67,.4);color:#d4a843;">📅 ${today}</span>
      <span style="font-size:10px;font-weight:700;padding:3px 11px;border-radius:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.75);">🏢 Based on 79+ Live Implementations</span>
      <span style="font-size:10px;font-weight:700;padding:3px 11px;border-radius:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.75);">✅ Odoo Official Methodology</span>
      <span style="font-size:10px;font-weight:700;padding:3px 11px;border-radius:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.75);">🌍 Egypt &amp; GCC</span>
    </div>
  </div>

  <div style="padding:32px 40px;">

    ${note ? `<!-- PERSONAL NOTE -->
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
      <div style="font-size:11px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;">📝 Personal Note</div>
      <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.7;">${note}</p>
    </div>` : ''}

    <!-- KPI SUMMARY -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td width="25%" style="padding-right:8px;">
          <div style="background:#fffbeb;border:1px solid #fde68a;border-top:3px solid #d4a843;border-radius:10px;padding:16px 12px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#d4a843;line-height:1;margin-bottom:4px;">${d ? d.fSavings : '—'}</div>
            <div style="font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Annual Savings</div>
          </div>
        </td>
        <td width="25%" style="padding-right:8px;">
          <div style="background:#fffbeb;border:1px solid #fde68a;border-top:3px solid #d4a843;border-radius:10px;padding:16px 12px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#d4a843;line-height:1;margin-bottom:4px;">${d ? d.fPayback : '—'}</div>
            <div style="font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">⏱ Payback Period</div>
          </div>
        </td>
        <td width="25%" style="padding-right:8px;">
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-top:3px solid #017E84;border-radius:10px;padding:16px 12px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#017E84;line-height:1;margin-bottom:4px;">${d ? d.fRoi3 : '—'}</div>
            <div style="font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">3-Year ROI</div>
          </div>
        </td>
        <td width="25%">
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-top:3px solid #017E84;border-radius:10px;padding:16px 12px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#017E84;line-height:1;margin-bottom:4px;">${d ? d.fNet3 : '—'}</div>
            <div style="font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Net Value Y1–Y3</div>
          </div>
        </td>
      </tr>
    </table>

    <!-- BUSINESS PROFILE -->
    <div style="font-size:11px;font-weight:800;color:#0f172a;margin:0 0 12px;padding-bottom:6px;border-bottom:2px solid #017E84;text-transform:uppercase;letter-spacing:.05em;">👤 Business Profile</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td width="33%" style="padding:0 8px 8px 0;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:3px;">Industry</div>
            <div style="font-size:14px;font-weight:700;color:#0f172a;">${industry}</div>
          </div>
        </td>
        <td width="33%" style="padding:0 8px 8px 0;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:3px;">Employees</div>
            <div style="font-size:14px;font-weight:700;color:#0f172a;">${d ? d.emp : '—'}</div>
          </div>
        </td>
        <td width="33%" style="padding:0 0 8px 0;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:3px;">Annual Revenue</div>
            <div style="font-size:14px;font-weight:700;color:#0f172a;">${d ? d.fRev : '—'}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td width="33%" style="padding:0 8px 0 0;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:3px;">Avg. Salary / Employee</div>
            <div style="font-size:14px;font-weight:700;color:#0f172a;">${d ? d.fSal : '—'}</div>
          </div>
        </td>
        <td width="33%" style="padding:0 8px 0 0;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:3px;">Current Software Cost</div>
            <div style="font-size:14px;font-weight:700;color:#0f172a;">${d ? d.fSw + '/yr' : '—'}</div>
          </div>
        </td>
        <td width="33%">
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 14px;">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:3px;">Software Cost Saved</div>
            <div style="font-size:14px;font-weight:700;color:#059669;">${d ? d.fSwSave : '—'}</div>
          </div>
        </td>
      </tr>
    </table>

    <!-- SUBSCRIPTION DETAILS (from Tab 4) -->
    ${window.subLiveData ? `
    <div style="font-size:11px;font-weight:800;color:#0f172a;margin:0 0 10px;padding-bottom:6px;border-bottom:2px solid #d4a843;text-transform:uppercase;letter-spacing:.05em;">📦 Odoo Subscription & Implementation</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;border:1px solid #fde68a;border-radius:10px;overflow:hidden;background:#fffbeb;">
      <tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">🌍 Country</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:700;">${window.subLiveData.countryName} (${window.subLiveData.currency})</td></tr>
      <tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">📱 Odoo Plan</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:700;">${window.subLiveData.planLabel} · ${window.subLiveData.users} users</td></tr>
      <tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">☁️ Hosting</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:700;">${window.subLiveData.hostLabel} · ${window.subLiveData.hostCost > 0 ? '$' + window.subLiveData.hostCost + '/mo' : 'Included'}</td></tr>
      <tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">💳 Monthly Total</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:800;color:#d97706;font-size:14px;">$${Math.round(window.subLiveData.totalMonthly).toLocaleString()}/mo</td></tr>
      <tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">📅 Annual Subscription (Y2–Y5)</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:800;color:#d97706;">$${Math.round(window.subLiveData.annualSub).toLocaleString()}/yr</td></tr>
      ${window.subLiveData.discountPct > 0 ? `<tr style="background:rgba(5,150,105,.08);"><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">🎁 Year 1 Discount (${window.subLiveData.discountPct.toFixed(0)}% off subscription)</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:700;color:#059669;">$${window.subLiveData.annualSubY1.toLocaleString()}/yr (save $${window.subLiveData.discountAmount.toLocaleString()})</td></tr>` : ''}
      ${window.subLiveData.implMode === 'pack'
        ? `<tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">🎯 Success Pack · ${window.subLiveData.packLabel} (${window.subLiveData.packHours} hrs${window.subLiveData.isNew ? ' · 15% off' : ''})</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:700;">$${window.subLiveData.packCost.toLocaleString()}</td></tr>`
        : `<tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">🤝 Local Partner Implementation${window.subLiveData.rate !== 1 ? ' (' + window.subLiveData.symbol + Math.round(window.subLiveData.localImpl).toLocaleString() + ' ' + window.subLiveData.currency + ')' : ''}</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:700;">$${Math.round(window.subLiveData.implCost).toLocaleString()}</td></tr>`}
      ${window.subLiveData.extraHrs > 0 ? `<tr><td style="padding:8px 14px;border-bottom:1px solid #fde68a;font-size:12px;">⏱️ Extra Hours · ${window.subLiveData.extraHrs.toLocaleString()} hrs × $${window.subLiveData.hourlyRate}/hr</td><td style="padding:8px 14px;border-bottom:1px solid #fde68a;text-align:right;font-weight:700;">$${Math.round(window.subLiveData.extraCost).toLocaleString()}</td></tr>` : ''}
      <tr style="background:#fef3c7;"><td style="padding:9px 14px;font-weight:800;font-size:13px;">🏆 Year 1 Total</td><td style="padding:9px 14px;text-align:right;font-weight:800;color:#d97706;font-size:15px;">$${Math.round(window.subLiveData.year1).toLocaleString()}</td></tr>
    </table>
    ${window.subLiveData.rate !== 1 ? `<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:9px 14px;margin-bottom:12px;font-size:11px;color:#0369a1;">🔄 <strong>${window.subLiveData.currency} Equivalent:</strong> Monthly ${window.subLiveData.symbol}${window.subLiveData.localMonthly.toLocaleString()} · Annual ${window.subLiveData.symbol}${window.subLiveData.localAnnual.toLocaleString()} · Year 1 ${window.subLiveData.symbol}${window.subLiveData.localYear1.toLocaleString()} · Rate: 1 USD = ${window.subLiveData.rate} ${window.subLiveData.currency}</div>` : ''}
    ` : ''}

    <!-- INVESTMENT SUMMARY -->
    <div style="font-size:11px;font-weight:800;color:#0f172a;margin:0 0 12px;padding-bottom:6px;border-bottom:2px solid #017E84;text-transform:uppercase;letter-spacing:.05em;">💰 Investment & Cost Breakdown</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <tr style="background:#f8fafc;">
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#64748b;text-align:left;border-bottom:2px solid #e2e8f0;">Item</th>
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#64748b;text-align:right;border-bottom:2px solid #e2e8f0;">Amount</th>
      </tr>
      <tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;">🔧 Implementation Budget</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;font-size:13px;">${d ? d.fImpl : '—'}</td></tr>
      <tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;">📱 Annual Odoo Subscription${window.subLiveData ? ' (' + window.subLiveData.users + ' users · ' + window.subLiveData.planLabel + ')' : ''}</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;font-size:13px;">${d ? d.fSub + '/yr' : '—'}</td></tr>
      ${window.subLiveData && window.subLiveData.hostCost > 0 ? `<tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;">☁️ Hosting (${window.subLiveData.hostLabel})</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;font-size:13px;">$${window.subLiveData.hostCost}/mo</td></tr>` : ''}
      <tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;">🛠️ Annual Support / Consulting</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;font-size:13px;">${d ? d.fSupp + '/yr' : '—'}</td></tr>
      <tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;">🧑‍💼 Internal Staff Time</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;font-size:13px;">${d ? d.fStaff : '—'}</td></tr>
      <tr style="background:#f0fdf4;"><td style="padding:9px 14px;font-weight:700;font-size:13px;">💰 Total 3-Year Investment</td><td style="padding:9px 14px;text-align:right;font-weight:800;color:#059669;font-size:14px;">${d ? d.fInvest3 : '—'}</td></tr>
    </table>

    ${deptRowsHtml ? `<!-- DEPT SAVINGS -->
    <div style="font-size:11px;font-weight:800;color:#0f172a;margin:0 0 12px;padding-bottom:6px;border-bottom:2px solid #017E84;text-transform:uppercase;letter-spacing:.05em;">🏢 Savings by Department</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <tr style="background:#f8fafc;">
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;text-align:left;border-bottom:2px solid #e2e8f0;">Department</th>
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;text-align:left;border-bottom:2px solid #e2e8f0;">Details</th>
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;text-align:right;border-bottom:2px solid #e2e8f0;">Annual Saving</th>
      </tr>
      ${deptRowsHtml}
      ${swRowHtml}
      <tr style="background:#f0fdf4;"><td colspan="2" style="padding:9px 14px;font-weight:700;font-size:13px;">Total Annual Savings</td><td style="padding:9px 14px;text-align:right;font-weight:800;color:#059669;font-size:14px;">${d ? d.fSavings : '—'}</td></tr>
    </table>` : ''}

    <!-- 5-YEAR PROJECTION -->
    <div style="font-size:11px;font-weight:800;color:#0f172a;margin:0 0 12px;padding-bottom:6px;border-bottom:2px solid #017E84;text-transform:uppercase;letter-spacing:.05em;">📈 5-Year Cash Flow Projection</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <tr style="background:#f8fafc;">
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;text-align:left;border-bottom:2px solid #e2e8f0;">Year</th>
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;text-align:right;border-bottom:2px solid #e2e8f0;">Annual Net Cash Flow</th>
        <th style="padding:9px 14px;font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;text-align:right;border-bottom:2px solid #e2e8f0;">Cumulative</th>
      </tr>
      ${yr5Html}
    </table>

    <!-- ERP COMPARISON -->
    <div style="font-size:11px;font-weight:800;color:#0f172a;margin:0 0 14px;padding-bottom:6px;border-bottom:2px solid #017E84;text-transform:uppercase;letter-spacing:.05em;">💡 Why Odoo vs Alternatives</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr><td style="width:130px;padding:5px 10px 5px 0;font-size:11px;font-weight:600;color:#64748b;">SAP S/4HANA</td><td style="padding:5px 10px 5px 0;"><div style="background:#f1f5f9;border-radius:3px;height:16px;overflow:hidden;"><div style="width:100%;height:100%;background:#3b82f6;opacity:.5;border-radius:3px;"></div></div></td><td style="width:60px;text-align:right;font-size:11px;font-weight:700;color:#64748b;padding:5px 0;">$350K+</td></tr>
      <tr><td style="width:130px;padding:5px 10px 5px 0;font-size:11px;font-weight:600;color:#64748b;">Oracle NetSuite</td><td style="padding:5px 10px 5px 0;"><div style="background:#f1f5f9;border-radius:3px;height:16px;overflow:hidden;"><div style="width:51%;height:100%;background:#8b5cf6;opacity:.5;border-radius:3px;"></div></div></td><td style="width:60px;text-align:right;font-size:11px;font-weight:700;color:#64748b;padding:5px 0;">$180K+</td></tr>
      <tr><td style="width:130px;padding:5px 10px 5px 0;font-size:11px;font-weight:600;color:#64748b;">MS Dynamics 365</td><td style="padding:5px 10px 5px 0;"><div style="background:#f1f5f9;border-radius:3px;height:16px;overflow:hidden;"><div style="width:34%;height:100%;background:#06b6d4;opacity:.5;border-radius:3px;"></div></div></td><td style="width:60px;text-align:right;font-size:11px;font-weight:700;color:#64748b;padding:5px 0;">$120K+</td></tr>
      <tr><td style="width:130px;padding:5px 10px 5px 0;font-size:12px;font-weight:800;color:#d4a843;">⭐ Odoo (Your Plan)</td><td style="padding:5px 10px 5px 0;"><div style="background:#f1f5f9;border-radius:3px;height:16px;overflow:hidden;"><div style="width:${odooPct}%;height:100%;background:#d4a843;border-radius:3px;"></div></div></td><td style="width:60px;text-align:right;font-size:12px;font-weight:800;color:#d4a843;padding:5px 0;">${d ? d.fImpl : '—'}</td></tr>
    </table>

    <!-- DISCLAIMER -->
    <p style="font-size:10px;color:#94a3b8;text-align:center;margin:20px 0 0;line-height:1.6;padding:0 10px;">
      * Methodology based on Odoo's official ROI Analysis Template. Efficiency rates benchmarked across 79+ real implementations by Nexa Solutions (Egypt &amp; GCC). Results are indicative — contact Nexa Solutions for a precise assessment tailored to your business.
    </p>

  </div><!-- /body padding -->

  <!-- FOOTER -->
  <div style="background:#0d1b2e;padding:22px 40px;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:11px;color:rgba(255,255,255,.5);line-height:1.8;">
      <strong style="color:rgba(255,255,255,.85);display:block;font-size:12px;">Mohamed Essam Abu Emira — COO &amp; Co-Founder, Nexa Solutions</strong>
      Odoo 16·17·18 Certified · Google PM Certified · LinkedIn Top ERP Voice · 79+ Projects<br>
      abuemira@nexa-solutions.com · +20 100 506 1349
    </div>
    <div style="font-size:10px;color:rgba(255,255,255,.62);text-align:right;line-height:1.6;">
      ${today}<br>Confidential<br>Nexa Solutions
    </div>
  </div>

</div><!-- /page -->
</body></html>`;

  // ── EMAILJS — إرسال للعميل + نسخة لك ──────────────────────────────────────
  // ⚠️ استبدل القيم دي بـ credentials بتاعتك من emailjs.com
  const EMAILJS_SERVICE_ID  = 'service_y8ugz7e';
  const EMAILJS_TEMPLATE_ID = 'template_ws1g0p2';
  const MY_EMAIL            = 'abuemira.nexa@gmail.com';

  // نسخة CC للمدير (أنت)
  const ccSummary = `
    <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:0 auto;">
      <div style="background:#017E84;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0;">
        <strong style="font-size:15px;">✅ ROI Report Sent to Customer</strong>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
        <table style="width:100%;font-size:13px;line-height:2;">
          <tr><td style="color:#64748b;width:140px;">Customer Name</td><td><strong>${custName}</strong></td></tr>
          <tr><td style="color:#64748b;">Customer Email</td><td>${custEmail}</td></tr>
          <tr><td style="color:#64748b;">Company</td><td>${company || '—'}</td></tr>
          <tr><td style="color:#64748b;">Industry</td><td>${industry}</td></tr>
          <tr><td style="color:#64748b;">Annual Savings</td><td><strong style="color:#017E84;">${d ? d.fSavings : '—'}</strong></td></tr>
          <tr><td style="color:#64748b;">3-Year ROI</td><td><strong style="color:#017E84;">${d ? d.fRoi3 : '—'}</strong></td></tr>
          <tr><td style="color:#64748b;">Net Value Y1–Y3</td><td><strong>${d ? d.fNet3 : '—'}</strong></td></tr>
          <tr><td style="color:#64748b;">Payback Period</td><td>${d ? d.fPayback : '—'}</td></tr>
          ${note ? `<tr><td style="color:#64748b;">Personal Note</td><td style="font-style:italic;">"${note}"</td></tr>` : ''}
          <tr><td style="color:#64748b;">Sent At</td><td>${today}</td></tr>
        </table>
      </div>
    </div>`;

  try {
    // إرسال 1: للعميل — الريبورت الكامل
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email    : custEmail,
      to_name     : custName,
      from_name   : 'Mohamed Abu Emira — Nexa Solutions',
      reply_to    : MY_EMAIL,
      subject     : `Your Personalised Odoo ERP ROI Report — Nexa Solutions`,
      html_body   : htmlBody,
      // Plain text fallback
      message     : `Dear ${custName},\n\nPlease find your personalised Odoo ERP ROI Analysis below.\n\nIndustry: ${industry}\nAnnual Savings: ${d ? d.fSavings : '—'}\nPayback Period: ${d ? d.fPayback : '—'}\n3-Year ROI: ${d ? d.fRoi3 : '—'}\nNet Value Y1–Y3: ${d ? d.fNet3 : '—'}\n\nBest regards,\nMohamed Essam Abu Emira\nCOO & Co-Founder — Nexa Solutions\n+20 100 506 1349`,
    });

    // إرسال 2: نسخة لك (CC)
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email    : MY_EMAIL,
      to_name     : 'Mohamed Abu Emira',
      from_name   : 'Nexa Solutions — ROI Tracker',
      reply_to    : custEmail,
      subject     : `[ROI Sent] ${custName}${company ? ' — ' + company : ''} · ${industry}`,
      html_body   : ccSummary,
      message     : `ROI Report sent to ${custName} (${custEmail}) — ${industry} — Savings: ${d ? d.fSavings : '—'} — ROI: ${d ? d.fRoi3 : '—'}`,
    });

    // Show success
    const bodyEl  = document.getElementById('roiEmailModalBody');
    const success = document.getElementById('roiEmailSuccess');
    const msg     = document.getElementById('roiEmailSuccessMsg');
    if (bodyEl)  bodyEl.style.display   = 'none';
    if (success) success.style.display  = 'flex';
    if (msg)     msg.textContent        = `✅ The ROI report has been emailed to ${custEmail}. A copy was sent to abuemira.nexa@gmail.com.`;

  } catch (err) {
    console.error('sendRoiEmail — EmailJS error:', err);
    if (btn) { btn.disabled = false; btn.textContent = '📧 Send ROI Report'; }
    alert('Failed to send the report. Please try again.\n\nError: ' + (err.text || err.message || JSON.stringify(err)));
  }
}

// Close email modal on overlay click or Escape
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('roiEmailModal');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeRoiEmailModal();
    });
  }
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') closeRoiEmailModal();
});

// ══════════════════════════════════════════════════════════════════════════
// ODOO SUBSCRIPTION CALCULATOR — Tab 4
// ══════════════════════════════════════════════════════════════════════════

const SUB_COUNTRIES = {
  EG: { name:'Egypt',         nameAr:'مصر',           currency:'EGP', symbol:'EGP', rate:50.5,   salaryNote:'Average IT salary ~EGP 25–60K/mo',        salaryNoteAr:'متوسط راتب IT ~25–60 ألف جنيه/شهر',  taxNote:'No VAT on SaaS services (may apply)',              taxNoteAr:'لا ضريبة VAT على خدمات SaaS (قد تُطبق)', color:'#017E84' },
  SA: { name:'Saudi Arabia',  nameAr:'السعودية',      currency:'SAR', symbol:'SAR', rate:3.75,  salaryNote:'Average IT salary ~SAR 8–18K/mo',          salaryNoteAr:'متوسط راتب IT ~8–18 ألف ريال/شهر',   taxNote:'15% VAT applies on Odoo subscription',             taxNoteAr:'ضريبة VAT 15% على اشتراك أودو',          color:'#1d5091' },
  AE: { name:'UAE',           nameAr:'الإمارات',      currency:'AED', symbol:'AED', rate:3.67,  salaryNote:'Average IT salary ~AED 8–20K/mo',          salaryNoteAr:'متوسط راتب IT ~8–20 ألف درهم/شهر',   taxNote:'5% VAT may apply',                                 taxNoteAr:'ضريبة VAT 5% قد تُطبق',                  color:'#714B67' },
  KW: { name:'Kuwait',        nameAr:'الكويت',        currency:'KWD', symbol:'KWD', rate:0.31,  salaryNote:'Average IT salary ~KWD 700–1,800/mo',      salaryNoteAr:'متوسط راتب IT ~700–1800 دينار/شهر',  taxNote:'No VAT currently',                                 taxNoteAr:'لا ضريبة VAT حالياً',                    color:'#d4a843' },
  QA: { name:'Qatar',         nameAr:'قطر',           currency:'QAR', symbol:'QAR', rate:3.64,  salaryNote:'Average IT salary ~QAR 6–18K/mo',          salaryNoteAr:'متوسط راتب IT ~6–18 ألف ريال/شهر',   taxNote:'No VAT currently',                                 taxNoteAr:'لا ضريبة VAT حالياً',                    color:'#017E84' },
  BH: { name:'Bahrain',       nameAr:'البحرين',       currency:'BHD', symbol:'BHD', rate:0.376, salaryNote:'Average IT salary ~BHD 400–900/mo',        salaryNoteAr:'متوسط راتب IT ~400–900 دينار/شهر',   taxNote:'10% VAT applies',                                  taxNoteAr:'ضريبة VAT 10% مطبقة',                    color:'#1d5091' },
  OM: { name:'Oman',          nameAr:'عُمان',          currency:'OMR', symbol:'OMR', rate:0.384, salaryNote:'Average IT salary ~OMR 400–1,000/mo',      salaryNoteAr:'متوسط راتب IT ~400–1000 ريال/شهر',   taxNote:'5% VAT applies',                                   taxNoteAr:'ضريبة VAT 5% مطبقة',                     color:'#017E84' },
  JO: { name:'Jordan',        nameAr:'الأردن',         currency:'JOD', symbol:'JOD', rate:0.709, salaryNote:'Average IT salary ~JOD 500–1,200/mo',      salaryNoteAr:'متوسط راتب IT ~500–1200 دينار/شهر',  taxNote:'16% GST may apply',                                taxNoteAr:'ضريبة مبيعات 16% قد تُطبق',              color:'#714B67' },
  MA: { name:'Morocco',       nameAr:'المغرب',         currency:'MAD', symbol:'MAD', rate:10.2,  salaryNote:'Average IT salary ~MAD 6–15K/mo',          salaryNoteAr:'متوسط راتب IT ~6–15 ألف درهم/شهر',   taxNote:'20% VAT applies',                                  taxNoteAr:'ضريبة VAT 20% مطبقة',                    color:'#d4a843' },
  US: { name:'United States', nameAr:'الولايات المتحدة', currency:'USD', symbol:'$', rate:1,   salaryNote:'Average IT salary ~$70–130K/yr',           salaryNoteAr:'متوسط راتب IT ~70–130 ألف دولار/سنة',taxNote:'State sales tax may apply',                        taxNoteAr:'ضريبة مبيعات حسب الولاية',               color:'#1d5091' },
  GB: { name:'United Kingdom',nameAr:'المملكة المتحدة', currency:'GBP', symbol:'£',  rate:0.79,  salaryNote:'Average IT salary ~£35–80K/yr',            salaryNoteAr:'متوسط راتب IT ~35–80 ألف جنيه/سنة',  taxNote:'20% VAT applies',                                  taxNoteAr:'ضريبة VAT 20% مطبقة',                    color:'#017E84' },
  EU: { name:'Europe',        nameAr:'أوروبا',         currency:'EUR', symbol:'€',   rate:0.92,  salaryNote:'Average IT salary ~€35–75K/yr',            salaryNoteAr:'متوسط راتب IT ~35–75 ألف يورو/سنة',  taxNote:'VAT varies by country (19–25%)',                    taxNoteAr:'الضريبة تتفاوت حسب الدولة (19–25%)',      color:'#714B67' },
  OTHER: { name:'Other Region',nameAr:'منطقة أخرى',   currency:'USD', symbol:'$',   rate:1,      salaryNote:'Consult local Odoo partner for pricing',   salaryNoteAr:'تواصل مع شريك أودو المحلي للتسعير',  taxNote:'Local taxes may apply',                            taxNoteAr:'قد تُطبق ضرائب محلية',                   color:'#017E84' },
};

const SUB_PACKS = {
  starter:      { label:'Starter',  hours:4,   returning:580,   newPrice:493 },
  basic:        { label:'Basic',    hours:25,  returning:3600,  newPrice:3060 },
  standard_pack:{ label:'Standard', hours:50,  returning:7000,  newPrice:5950 },
  custom_pack:  { label:'Custom',   hours:100, returning:12500, newPrice:10625 },
  pro:          { label:'Pro',      hours:200, returning:25000, newPrice:21250 },
};

// ── Odoo Official Pricing Per Country (source: oec.sh, verified May 2026) ──
const ODOO_PRICES = {
  // Middle East cheapest pricelist
  EG: { std: 8.95,  cus: 13.60, label: 'Middle East pricelist' },
  JO: { std: 8.95,  cus: 13.60, label: 'Middle East pricelist' },
  MA: { std: 8.95,  cus: 13.60, label: 'Middle East / Africa pricelist' },
  // GCC (SE Asia / Africa USD tier)
  SA: { std: 16.90, cus: 25.50, label: 'GCC pricelist' },
  AE: { std: 16.90, cus: 25.50, label: 'GCC pricelist' },
  KW: { std: 16.90, cus: 25.50, label: 'GCC pricelist' },
  QA: { std: 16.90, cus: 25.50, label: 'GCC pricelist' },
  BH: { std: 16.90, cus: 25.50, label: 'GCC pricelist' },
  OM: { std: 16.90, cus: 25.50, label: 'GCC pricelist' },
  // Western
  US:    { std: 31.10, cus: 61.00, label: 'USA pricelist' },
  GB:    { std: 27.32, cus: 41.04, label: 'Europe W/N pricelist (€24.90/€37.40)' },
  EU:    { std: 27.32, cus: 41.04, label: 'Europe W/N pricelist (€24.90/€37.40)' },
  OTHER: { std: 31.10, cus: 61.00, label: 'Default (US pricelist)' },
};

function getOdooPrices(cc) {
  return ODOO_PRICES[cc] || ODOO_PRICES['OTHER'];
}

function refreshPlanButtons() {
  const p = getOdooPrices(subCountryCode);
  const stdBtn = document.getElementById('subPlanStd');
  const cusBtn = document.getElementById('subPlanCustom');
  if (stdBtn) stdBtn.innerHTML = '⭐ Standard<br><span style="font-size:9px;opacity:.8">$' + p.std + '/user/mo · All apps</span>';
  if (cusBtn) cusBtn.innerHTML = '🔧 Custom<br><span style="font-size:9px;opacity:.6">$' + p.cus + '/user/mo · Studio + API</span>';
  // update price in state if plan already selected
  if (subPlanKey === 'standard') subPlanPrice = p.std;
  else if (subPlanKey === 'custom') subPlanPrice = p.cus;
  // Show pricelist note
  const noteEl = document.getElementById('subPricelistNote');
  const AR7pl = document.documentElement.getAttribute('data-lang') === 'ar';
  if (noteEl) noteEl.textContent = '📌 ' + p.label + (AR7pl ? ' · المصدر: oec.sh' : ' · source: oec.sh');
}

// State
let subCountryCode = 'EG';
let subPlanKey     = 'custom';
let subPlanPrice   = 13.60;  // EG default = Custom plan
let subHostKey     = 'saas';
let subHostCost    = 0;
let subPackKey     = 'standard_pack';
let subImplMode    = 'partner';  // 'pack' | 'partner'
let subPremiseMode = 'monthly'; // 'monthly' | 'purchase'

function subSetPremiseMode(mode) {
  subPremiseMode = mode;
  const mBtn = document.getElementById('premMonthlyBtn');
  const pBtn = document.getElementById('premPurchaseBtn');
  const mSec = document.getElementById('premMonthlySection');
  const pSec = document.getElementById('premPurchaseSection');
  if (mode === 'monthly') {
    if (mBtn) { mBtn.style.borderColor='rgba(1,126,132,.5)'; mBtn.style.background='rgba(1,126,132,.18)'; mBtn.style.color='var(--teal-mid)'; mBtn.style.fontWeight='700'; }
    if (pBtn) { pBtn.style.borderColor='rgba(255,255,255,.18)'; pBtn.style.background='rgba(255,255,255,.06)'; pBtn.style.color='rgba(255,255,255,.7)'; pBtn.style.fontWeight='600'; }
    if (mSec) mSec.style.display = '';
    if (pSec) pSec.style.display = 'none';
  } else {
    if (pBtn) { pBtn.style.borderColor='rgba(212,168,67,.5)'; pBtn.style.background='rgba(212,168,67,.15)'; pBtn.style.color='var(--gold)'; pBtn.style.fontWeight='700'; }
    if (mBtn) { mBtn.style.borderColor='rgba(255,255,255,.18)'; mBtn.style.background='rgba(255,255,255,.06)'; mBtn.style.color='rgba(255,255,255,.7)'; mBtn.style.fontWeight='600'; }
    if (pSec) pSec.style.display = '';
    if (mSec) mSec.style.display = 'none';
    // Show/hide installments
    const ic = document.getElementById('premInstallCheck');
    const iFields = document.getElementById('premInstallFields');
    if (ic && iFields) iFields.style.display = ic.checked ? 'flex' : 'none';
  }
  subCalc();
}

// Show/hide installment fields when checkbox toggled
document.addEventListener('change', function(e) {
  if (e.target.id === 'premInstallCheck') {
    const iFields = document.getElementById('premInstallFields');
    if (iFields) iFields.style.display = e.target.checked ? 'flex' : 'none';
    subCalc();
  }
});

function subSelectImplMode(mode) {
  subImplMode = mode;
  const packBtn    = document.getElementById('implModePackBtn');
  const partnerBtn = document.getElementById('implModePartnerBtn');
  const packSec    = document.getElementById('implPackSection');
  const partnerSec = document.getElementById('implPartnerSection');
  if (mode === 'pack') {
    packBtn.style.borderColor  = 'rgba(1,126,132,.55)';
    packBtn.style.background   = 'rgba(1,126,132,.2)';
    packBtn.style.color        = 'var(--teal-mid)';
    packBtn.style.fontWeight   = '700';
    partnerBtn.style.borderColor = 'rgba(255,255,255,.18)';
    partnerBtn.style.background  = 'rgba(255,255,255,.06)';
    partnerBtn.style.color       = 'rgba(255,255,255,.7)';
    partnerBtn.style.fontWeight  = '600';
    packSec.style.display    = '';
    partnerSec.style.display = 'none';
  } else {
    partnerBtn.style.borderColor = 'rgba(212,168,67,.55)';
    partnerBtn.style.background  = 'rgba(212,168,67,.15)';
    partnerBtn.style.color       = 'var(--gold)';
    partnerBtn.style.fontWeight  = '700';
    packBtn.style.borderColor  = 'rgba(255,255,255,.18)';
    packBtn.style.background   = 'rgba(255,255,255,.06)';
    packBtn.style.color        = 'rgba(255,255,255,.7)';
    packBtn.style.fontWeight   = '600';
    partnerSec.style.display = '';
    packSec.style.display    = 'none';
  }
  subCalc();
}

function fmtLocal(usd, country) {
  const c = SUB_COUNTRIES[country];
  const local = usd * c.rate;
  if (c.currency === 'USD') return '$' + Math.round(usd).toLocaleString();
  // Show both
  return c.symbol + ' ' + Math.round(local).toLocaleString() + ' (' + '$' + Math.round(usd).toLocaleString() + ')';
}

function fmtUsdOnly(v) {
  if (!v && v !== 0) return '—';
  return '$' + Math.round(v).toLocaleString();
}

function subSelectPlan(key, price) {
  subPlanKey = key;
  // Always resolve price from country pricelist (ignore passed price for std/custom)
  const p = getOdooPrices(subCountryCode);
  if (key === 'free')     subPlanPrice = 0;
  else if (key === 'standard') subPlanPrice = p.std;
  else if (key === 'custom')   subPlanPrice = p.cus;
  else subPlanPrice = price || 0;

  ['Free','Std','Custom'].forEach(id => {
    const el = document.getElementById('subPlan' + id);
    if (!el) return;
    el.style.borderColor = 'rgba(255,255,255,.18)';
    el.style.background  = 'rgba(255,255,255,.06)';
    el.style.color       = 'rgba(255,255,255,.7)';
    el.style.fontWeight  = '600';
  });
  const map = {free:'Free', standard:'Std', custom:'Custom'};
  const active = document.getElementById('subPlan' + map[key]);
  if (active) {
    active.style.borderColor = 'rgba(1,126,132,.55)';
    active.style.background  = 'rgba(1,126,132,.2)';
    active.style.color       = 'var(--teal-mid)';
    active.style.fontWeight  = '700';
  }
  subCalc();
}

function calcShCost() {
  const workers = parseInt(document.getElementById('shWorkers')?.value) || 1;
  const storagGB = parseInt(document.getElementById('shStorage')?.value) || 50;
  const staging = parseInt(document.getElementById('shStaging')?.value) || 1;
  const wCost   = workers * 57.60;
  const sCost   = storagGB * 0.20;
  const stCost  = staging * 14.40;
  const total   = wCost + sCost + stCost;

  const fmt = v => '$' + v.toFixed(2);
  const el = id => document.getElementById(id);
  if (el('shWorkerCost'))  el('shWorkerCost').textContent  = fmt(wCost);
  if (el('shStorageCost')) el('shStorageCost').textContent = fmt(sCost);
  if (el('shStagingCost')) el('shStagingCost').textContent = fmt(stCost);
  if (el('shTotalCost'))   el('shTotalCost').textContent   = fmt(total);
  if (el('subShTotalBadge')) el('subShTotalBadge').textContent = '$' + Math.round(total) + '/mo';

  // Update subHostCost and re-run calc
  if (subHostKey === 'sh') {
    subHostCost = total;
    subCalc();
  }
}

function subSelectHost(key, cost) {
  subHostKey = key;
  // For sh, compute from panel inputs; for others, use passed cost
  if (key === 'sh') {
    const w = parseFloat(document.getElementById('shWorkers')?.value) || 1;
    const s = parseFloat(document.getElementById('shStorage')?.value) || 50;
    const st= parseFloat(document.getElementById('shStaging')?.value) || 1;
    subHostCost = w * 57.60 + s * 0.20 + st * 14.40;
  } else {
    subHostCost = cost;
  }
  ['Saas','Sh','Premise'].forEach(id => {
    const el = document.getElementById('subHost' + id);
    if (!el) return;
    el.style.borderColor = 'rgba(255,255,255,.18)';
    el.style.background  = 'rgba(255,255,255,.06)';
    el.style.color       = 'rgba(255,255,255,.75)';
    el.style.fontWeight  = '600';
  });
  const map = {saas:'Saas', sh:'Sh', premise:'Premise'};
  const active = document.getElementById('subHost' + map[key]);
  if (active) {
    active.style.borderColor = 'rgba(212,168,67,.45)';
    active.style.background  = 'rgba(212,168,67,.12)';
    active.style.color       = 'var(--gold)';
    active.style.fontWeight  = '700';
  }
  // Show/hide premise panel & sh panel
  const premPanel = document.getElementById('subPremisePanel');
  if (premPanel) premPanel.style.display = key === 'premise' ? '' : 'none';
  const shPanel = document.getElementById('subShPanel');
  if (shPanel) shPanel.style.display = key === 'sh' ? '' : 'none';
  subCalc();
}

function subSelectPack(key, ret, newP, hrs) {
  subPackKey = key;
  // reset all
  ['Starter','Basic','Std','Custom','Pro'].forEach(id => {
    const el = document.getElementById('subPack' + id);
    if (!el) return;
    el.style.borderColor = 'rgba(255,255,255,.15)';
    el.style.background  = 'rgba(255,255,255,.05)';
    el.style.color       = 'rgba(255,255,255,.75)';
  });
  const map = {starter:'Starter', basic:'Basic', standard_pack:'Std', custom_pack:'Custom', pro:'Pro'};
  const active = document.getElementById('subPack' + map[key]);
  if (active) {
    active.style.borderColor = 'rgba(1,126,132,.5)';
    active.style.background  = 'rgba(1,126,132,.18)';
    active.style.color       = 'var(--teal-mid)';
  }
  subCalc();
}

function subCalc() {
  const countryEl = document.getElementById('subCountry');
  if (!countryEl) return;
  subCountryCode = countryEl.value;
  const country  = SUB_COUNTRIES[subCountryCode] || SUB_COUNTRIES['OTHER'];
  // Refresh plan button prices + update current plan price for this country
  refreshPlanButtons();

  const users      = parseInt(document.getElementById('subUsers').value) || 10;
  const extraHrs   = parseInt(document.getElementById('subExtraHrs').value) || 0;
  const hourlyRate = parseFloat(document.getElementById('subHourlyRate').value) || 175;
  const isNew      = document.getElementById('subNewCustomer').checked;

  // Update display labels
  document.getElementById('subUsersVal').textContent = users;
  document.getElementById('subExtraHrsVal').textContent = extraHrs + ' hrs';
  document.getElementById('subCurrencyBadge').textContent = country.currency;
  const AR7 = document.documentElement.getAttribute('data-lang') === 'ar';
  document.getElementById('subPlanBadge').textContent = AR7
    ? (subPlanKey === 'free' ? 'مجانية' : subPlanKey === 'standard' ? 'ستاندرد' : 'مخصص')
    : (subPlanKey === 'free' ? 'Free' : subPlanKey === 'standard' ? 'Standard' : 'Custom');
  document.getElementById('subHostBadge').textContent = subHostKey === 'saas'
    ? (AR7 ? 'Odoo.com SaaS' : 'Odoo.com SaaS')
    : subHostKey === 'sh'
    ? 'Odoo.sh'
    : (AR7 ? 'محلي' : 'On-Premise');

  // Country info box
  const infoEl = document.getElementById('subCountryInfo');
  infoEl.innerHTML = '🏦 <strong style="color:var(--teal-mid)">' + (AR7 && country.nameAr ? country.nameAr : country.name) + '</strong> · ' + (AR7 && country.taxNoteAr ? country.taxNoteAr : country.taxNote) + '<br>💼 ' + (AR7 && country.salaryNoteAr ? country.salaryNoteAr : country.salaryNote);

  // On-Premise cost resolution
  let hostingMonthly = subHostCost;
  let premisePurchaseCost = 0;
  let premiseIsMonthly = true;
  let premiseInstallNote = '';
  if (subHostKey === 'premise') {
    premiseIsMonthly = (subPremiseMode === 'monthly');
    if (premiseIsMonthly) {
      hostingMonthly = parseFloat(document.getElementById('subPremMonthly')?.value) || 0;
    } else {
      hostingMonthly = 0;
      premisePurchaseCost = parseFloat(document.getElementById('subPremPurchase')?.value) || 0;
      // Installments
      const installCheck = document.getElementById('premInstallCheck');
      const installMonths = parseInt(document.getElementById('premInstallMonths')?.value) || 12;
      if (installCheck && installCheck.checked && premisePurchaseCost > 0) {
        const perMonth = premisePurchaseCost / installMonths;
        premiseInstallNote = installMonths + ' installments × $' + Math.round(perMonth).toLocaleString() + '/mo';
        const pmEl = document.getElementById('premInstallPerMonth');
        if (pmEl) pmEl.textContent = '= $' + Math.round(perMonth).toLocaleString() + '/mo';
      } else {
        const pmEl = document.getElementById('premInstallPerMonth');
        if (pmEl) pmEl.textContent = '';
      }
      // Local equiv for purchase
      const plEl = document.getElementById('premPurchaseLocalEquiv');
      if (plEl) {
        plEl.textContent = premisePurchaseCost > 0 && country.rate !== 1
          ? '≈ ' + country.symbol + ' ' + Math.round(premisePurchaseCost * country.rate).toLocaleString() + ' ' + country.currency
          : '';
      }
    }
  }

  // Costs (USD)
  const licenseMonthly  = subPlanPrice * users;
  const totalMonthlyUSD = licenseMonthly + hostingMonthly;
  const annualSubUSD    = totalMonthlyUSD * 12;

  // First Year Initial Discount (applies to subscription only, Y1)
  const discountPct     = parseFloat(document.getElementById('subDiscount')?.value) || 0;
  const discountFactor  = 1 - discountPct / 100;
  const annualSubY1     = Math.round(annualSubUSD * discountFactor); // discounted Year 1
  const discountAmount  = Math.round(annualSubUSD - annualSubY1);

  // Update discount badge & card
  const discBadge = document.getElementById('subDiscountBadge');
  if (discBadge) discBadge.textContent = discountPct.toFixed(0) + '%';
  const discCard = document.getElementById('subDiscountCard');
  if (discCard) discCard.style.display = discountPct > 0 ? '' : 'none';
  const discFull  = document.getElementById('subDiscountFullPrice');
  const discSave  = document.getElementById('subDiscountSaving');
  const discY1    = document.getElementById('subDiscountY1Price');
  if (discFull) discFull.textContent = '$' + Math.round(annualSubUSD).toLocaleString() + '/yr';
  if (discSave) discSave.textContent = '− $' + discountAmount.toLocaleString() + ' (' + discountPct.toFixed(0) + '%)';
  if (discY1)   discY1.textContent   = '$' + annualSubY1.toLocaleString() + '/yr';

  // Implementation cost: Pack OR Partner (mutually exclusive)
  let implCostUSD = 0;
  let implLabel   = '';
  let implIsPartner = (subImplMode === 'partner');
  let pack = SUB_PACKS[subPackKey] || SUB_PACKS['standard_pack'];
  let packCostUSD = 0;
  let includedHrs = 0;
  let partnerAmountUSD = 0;

  if (subImplMode === 'pack') {
    packCostUSD  = isNew ? pack.newPrice : pack.returning;
    includedHrs  = pack.hours;
    implCostUSD  = packCostUSD;
    implLabel    = '🎯 Success Pack · ' + pack.label + ' (' + includedHrs + ' hrs)';
  } else {
    partnerAmountUSD = parseFloat(document.getElementById('subPartnerAmount')?.value) || 0;
    implCostUSD = partnerAmountUSD;
    implLabel   = '🤝 Local Partner Implementation';
    // Show local equiv inside partner input
    const plEl = document.getElementById('subPartnerLocalEquiv');
    if (plEl) {
      if (partnerAmountUSD > 0 && country.rate !== 1) {
        plEl.style.display = '';
        plEl.innerHTML = '≈ ' + country.symbol + ' ' + Math.round(partnerAmountUSD * country.rate).toLocaleString() + ' ' + country.currency;
      } else {
        plEl.style.display = 'none';
      }
    }
  }

  // Extra hours (works with BOTH modes)
  const extraCostUSD = extraHrs * hourlyRate;

  // Year 1 total — uses DISCOUNTED subscription for Y1
  const year1USD = annualSubY1 + implCostUSD + extraCostUSD + premisePurchaseCost;

  // Format
  const fmtU = v => '$' + Math.round(v).toLocaleString();

  // Update impl label in result box
  const implLabelEl = document.getElementById('subImplLabel');
  if (implLabelEl) implLabelEl.textContent = AR7
    ? (subImplMode === 'pack' ? 'التطبيق · باقة النجاح (مرة واحدة)' : 'التطبيق · شريك محلي (مرة واحدة)')
    : (subImplMode === 'pack' ? 'Implementation · Success Pack (one-time)' : 'Implementation · Local Partner (one-time)');

  // Result rows
  const rows = [
    { label: AR7
        ? ('📱 الترخيص (' + users + ' مستخدم × $' + subPlanPrice.toFixed(2) + ')')
        : ('📱 License (' + users + ' users × $' + subPlanPrice.toFixed(2) + ')'),
      value: licenseMonthly > 0 ? fmtU(licenseMonthly) + '/mo' : '$0 (Free)', color: 'var(--teal-mid)' },
    { label: AR7
        ? ('☁️ الاستضافة (' + (subHostKey === 'saas' ? 'مشمولة في الخطة' : subHostKey === 'sh' ? 'Odoo.sh' : premiseIsMonthly ? 'محلي شهري' : 'محلي · شراء') + ')')
        : ('☁️ Hosting (' + (subHostKey === 'saas' ? 'Included in plan' : subHostKey === 'sh' ? 'Odoo.sh' : premiseIsMonthly ? 'On-Premise monthly' : 'On-Premise · Purchase=True') + ')'),
      value: subHostKey === 'premise' && !premiseIsMonthly
        ? (premisePurchaseCost > 0 ? fmtU(premisePurchaseCost) + (premiseInstallNote ? ' (' + premiseInstallNote + ')' : (AR7 ? ' لمرة واحدة' : ' one-time')) : '$0')
        : (hostingMonthly > 0 ? fmtU(hostingMonthly) + '/mo' : '$0/mo'),
      color: (subHostKey === 'premise' && !premiseIsMonthly) ? 'var(--gold)' : hostingMonthly > 0 ? 'var(--gold)' : 'var(--teal-mid)' },
    { label: implLabel + (subImplMode === 'pack' && extraHrs > 0 ? ' + ' + extraHrs.toLocaleString() + (AR7 ? ' ساعة إضافية' : ' extra hrs') : ''),
      value: implCostUSD > 0 ? fmtU(implCostUSD) + (AR7 ? ' لمرة واحدة' : ' one-time') : '$0',
      color: 'rgba(255,255,255,.75)' },
  ];
  if (extraHrs > 0) {
    rows.push({ label: AR7
      ? ('⏱️ ساعات إضافية · ' + extraHrs.toLocaleString() + ' × $' + hourlyRate + '/ساعة')
      : ('⏱️ Extra Hours · ' + extraHrs.toLocaleString() + ' × $' + hourlyRate + '/hr'),
      value: fmtU(extraCostUSD) + (AR7 ? ' لمرة واحدة' : ' one-time'), color: 'rgba(255,255,255,.75)' });
  }

  const rowsEl = document.getElementById('subResultRows');
  rowsEl.innerHTML = rows.map(r => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.05);">
      <span style="font-size:11px;color:rgba(255,255,255,.55);">${r.label}</span>
      <span style="font-size:12px;font-weight:700;color:${r.color};">${r.value}</span>
    </div>`).join('');

  // Totals
  document.getElementById('subMonthlyTotal').textContent = fmtU(totalMonthlyUSD) + '/mo';
  document.getElementById('subAnnualTotal').textContent  = fmtU(annualSubUSD) + '/yr';
  document.getElementById('subPackCost').textContent     = fmtU(implCostUSD);
  document.getElementById('subExtraCost').textContent    = extraHrs > 0 ? fmtU(extraCostUSD) : '$0';
  document.getElementById('subYear1Total').textContent   = fmtU(year1USD);

  // Local currency equivalent
  const localEl = document.getElementById('subLocalEquiv');
  if (country.rate !== 1) {
    localEl.style.display = '';
    localEl.innerHTML = AR7
      ? ('🔄 <strong style="color:var(--teal-mid)">المكافئ المحلي (' + country.currency + ')</strong><br>' +
         'الشهري: <strong>' + country.symbol + ' ' + Math.round(totalMonthlyUSD * country.rate).toLocaleString() + '</strong> · ' +
         'الاشتراك السنوي: <strong>' + country.symbol + ' ' + Math.round(annualSubUSD * country.rate).toLocaleString() + '</strong> · ' +
         'إجمالي السنة الأولى: <strong>' + country.symbol + ' ' + Math.round(year1USD * country.rate).toLocaleString() + '</strong><br>' +
         '<span style="opacity:.6;font-size:10px;">السعر التقريبي: 1 USD = ' + country.rate + ' ' + country.currency + ' · تحقق مع بنكك</span>')
      : ('🔄 <strong style="color:var(--teal-mid)">Local Equivalent (' + country.currency + ')</strong><br>' +
         'Monthly: <strong>' + country.symbol + ' ' + Math.round(totalMonthlyUSD * country.rate).toLocaleString() + '</strong> · ' +
         'Annual subscription: <strong>' + country.symbol + ' ' + Math.round(annualSubUSD * country.rate).toLocaleString() + '</strong> · ' +
         'Year 1 total: <strong>' + country.symbol + ' ' + Math.round(year1USD * country.rate).toLocaleString() + '</strong><br>' +
         '<span style="opacity:.6;font-size:10px;">Approx. rate: 1 USD = ' + country.rate + ' ' + country.currency + ' · Verify with your bank</span>');
  } else {
    localEl.style.display = 'none';
  }

  // ROI hint — sync with main ROI calculator
  const hintEl = document.getElementById('subRoiHint');
  const roiSavingsEl = document.getElementById('roiSavings');
  if (roiSavingsEl) {
    hintEl.style.display = '';
    hintEl.innerHTML = AR7
      ? ('💡 <strong style="color:var(--gold)">نظرة ROI:</strong> استثمارك في السنة الأولى <strong>' + fmtU(year1USD) + '</strong> · ' +
         'أضف حسابات ROI في التبويبات 1–3 لمعرفة فترة الاسترداد الدقيقة. الاسترداد المعتاد لهذا الإعداد: <strong>' +
         (year1USD < 30000 ? '6–14 شهراً' : year1USD < 80000 ? '12–24 شهراً' : '18–36 شهراً') + '</strong>.')
      : ('💡 <strong style="color:var(--gold)">ROI Insight:</strong> Your Year 1 investment of <strong>' + fmtU(year1USD) + '</strong> · ' +
         'Add your ROI calculation in Tab 1–3 to see exact payback period. Typical payback for this setup: <strong>' +
         (year1USD < 30000 ? '6–14 months' : year1USD < 80000 ? '12–24 months' : '18–36 months') + '</strong>.');
  }

  // Sync subscription annual cost → roiSub (Y2+ original) + roiSubY1 (Y1 discounted)
  const roiSubEl = document.getElementById('roiSub');
  if (roiSubEl) roiSubEl.value = Math.round(annualSubUSD);  // Y2+ full price
  const roiSubY1El = document.getElementById('roiSubY1');
  if (roiSubY1El) roiSubY1El.value = Math.round(annualSubY1);  // Y1 discounted
  // Update sync badge
  const syncBadge = document.getElementById('roiSubSyncBadge');
  if (syncBadge) {
    const planName = subPlanKey === 'free' ? 'Free' : subPlanKey === 'standard' ? 'Standard' : 'Custom';
    const hostLabel = subHostKey === 'saas' ? 'SaaS' : subHostKey === 'sh' ? 'Odoo.sh' : 'On-Premise';
    syncBadge.textContent = users + ' users · ' + planName + ' · ' + hostLabel + ' · $' + Math.round(annualSubUSD).toLocaleString() + '/yr' + (discountPct > 0 ? ' · Y1: $' + annualSubY1.toLocaleString() + ' (' + discountPct.toFixed(0) + '% off)' : '') + ' ✓';
  }
  // Sync implementation cost → roiImpl
  const implEl = document.getElementById('roiImpl');
  if (implEl && !implEl.dataset.manualOverride) {
    implEl.value = Math.round(implCostUSD + extraCostUSD);
    const implValEl = document.getElementById('roiImplVal');
    if (implValEl) {
      const total = implCostUSD + extraCostUSD;
      implValEl.textContent = total >= 1000 ? '$' + Math.round(total/1000).toFixed(0) + 'K' : '$' + Math.round(total);
    }
  }
  // Store sub data globally for PDF/Email
  window.subLiveData = {
    country: subCountryCode,
    countryName: country.name,
    currency: country.currency,
    symbol: country.symbol,
    rate: country.rate,
    planKey: subPlanKey,
    planLabel: subPlanKey === 'free' ? 'One App Free' : subPlanKey === 'standard' ? 'Standard' : 'Custom',
    planPrice: subPlanPrice,
    users,
    hostKey: subHostKey,
    hostLabel: subHostKey === 'saas' ? 'Odoo.com SaaS' : subHostKey === 'sh' ? 'Odoo.sh' : 'On-Premise',
    hostCost: hostingMonthly,
    shWorkers: parseInt(document.getElementById('shWorkers')?.value) || 1,
    shStorage: parseInt(document.getElementById('shStorage')?.value) || 50,
    shStaging: parseInt(document.getElementById('shStaging')?.value) || 1,
    premiseMode: subPremiseMode,
    premisePurchase: premisePurchaseCost,
    premiseInstallNote,
    premiseIsMonthly,
    // Implementation mode
    implMode: subImplMode,
    implLabel: subImplMode === 'pack' ? 'Odoo Success Pack' : 'Local Partner',
    implCost: implCostUSD,
    // Pack details (if mode = pack)
    packKey: subPackKey,
    packLabel: pack.label,
    packHours: includedHrs,
    packCost: packCostUSD,
    isNew,
    // Partner details (if mode = partner)
    partnerAmount: partnerAmountUSD,
    // Discount
    discountPct,
    discountAmount,
    annualSubY1,
    // Extra hours (both modes)
    extraHrs,
    hourlyRate,
    extraCost: extraCostUSD,
    licenseMonthly,
    hostingMonthly,
    totalMonthly: totalMonthlyUSD,
    annualSub: annualSubUSD,
    year1: year1USD,
    localMonthly: Math.round(totalMonthlyUSD * country.rate),
    localAnnual: Math.round(annualSubUSD * country.rate),
    localYear1: Math.round(year1USD * country.rate),
    localImpl: Math.round(implCostUSD * country.rate),
    taxNote: country.taxNote,
  };
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  refreshPlanButtons();
  calcShCost();

  // ── DEFAULT VALUES ──────────────────────────────────────────
  // 1. Odoo Plan = Custom
  subSelectPlan('custom', 0);

  // 2. Hosting = Odoo.com SaaS (no extra hosting cost)
  subSelectHost('saas', 0);

  // 3. Implementation Service = Local Partner
  subSelectImplMode('partner');

  // 4. Success Pack stays selected for when user switches to Pack mode
  subSelectPack('standard_pack', 7000, 5950, 50);

  // 5. On-Premise mode = Purchase = True
  subSetPremiseMode('purchase');

  // 6. Discount = 19% (already set in HTML value="19")
  // 7. Implementation Budget = $0 (already set in slider value="0")
  // ────────────────────────────────────────────────────────────
  subCalc();
});
