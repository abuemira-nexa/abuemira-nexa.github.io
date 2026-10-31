window.REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.addEventListener("DOMContentLoaded", () => {

  /* ══ INIT THEME & LANG ══ */
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedLang  = localStorage.getItem('lang')  || 'en';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-lang',  savedLang);
  document.documentElement.setAttribute('lang', savedLang === 'ar' ? 'ar' : 'en');

  /* ══ 3. LAZY LOADING ══ */
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });
  const heroPic = document.querySelector('.hero-photo img');
  if (heroPic) heroPic.setAttribute('loading', 'eager');

  /* ══ 5 & 8. NAV CONTROLS (Dark Mode + Language) ══ */
  const navEl = document.querySelector('.nav');
  const ctrls = document.createElement('div');
  ctrls.className = 'nav-controls';
  ctrls.innerHTML = `
    <button id="themeToggle" class="ntb" title="Toggle Dark/Light">${savedTheme==='dark'?'☀️':'🌙'}</button>
    <button id="langToggle"  class="ntb" title="Switch Language">${savedLang==='ar'?'EN':'عربي'}</button>`;
  navEl.appendChild(ctrls);

  /* Add nav links for new sections */
  const navLinksDiv = document.querySelector('.nav-links');
  const ctaLink = navLinksDiv.querySelector('.nav-cta');
  ['#roi:ROI Calc','#blog:Blog'].forEach(pair => {
    const [href, txt] = pair.split(':');
    const a = document.createElement('a'); a.href = href; a.textContent = txt;
    navLinksDiv.insertBefore(a, ctaLink);
  });

  /* ══ 5. DARK MODE TOGGLE ══ */
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    document.getElementById('themeToggle').textContent = next === 'dark' ? '☀️' : '🌙';
  });

  /* ══ 8. MULTILINGUAL TOGGLE ══ */
  const i18n = {
    nav: [
      ['#about','About','عنّي'],['#nexa','Nexa','نيكسا'],
      ['#services','Services','الخدمات'],['#experience','Experience','الخبرة'],
      ['#projects','Projects','المشاريع'],['#clients','Clients','عملاؤنا'],
      ['#testimonials','Reviews','آراء العملاء'],['#contact','Contact','تواصل'],
    ],
    secs: [
      ['about',        'About Me',           'عنّي',           'Turning Business Complexity into <span>ERP Clarity</span>',       'أحوّل تحديات أعمالك إلى <span>نتائج قابلة للقياس</span>'],
      ['industries',   'Coverage',           'النطاق',         'Industries <span>Served</span>',                                   'القطاعات <span>المخدومة</span>'],
      ['services',     'What I Do',          'ماذا أفعل',      'Professional <span>Services</span>',                               'الخدمات <span>المهنية</span>'],
      ['experience',   'Career Path',        'المسار المهني',  'Professional <span>Experience</span>',                             'الخبرة <span>المهنية</span>'],
      ['projects',     'Portfolio',          'الأعمال',        'ERP Projects <span>Delivered</span>',                              'مشاريع ERP <span>المنجزة</span>'],
      ['certifications','Credentials',       'المؤهلات',       'Certifications & <span>Recognition</span>',                        'الشهادات <span>والتقدير</span>'],
      ['testimonials', '30+ Recommendations','30+ توصية',      'What Clients & Colleagues <span>Say</span>',                       'ماذا يقول عملاؤنا <span>وشركاؤنا</span>'],
      ['education',    'Education',          'التعليم',        'Academic <span>Background</span>',                                 'الخلفية <span>الأكاديمية</span>'],
      ['contact',      'Get in Touch',       'تواصل معي',      "Let's Work <span>Together</span>",                                 'هل أنت مستعد؟ — <span>تحدث معي اليوم</span>'],
      ['case-studies', 'Deep Dives',         'دراسات معمقة',   'Featured <span>Case Studies</span>',                               'دراسات حالة <span>مختارة</span>'],
      ['blog',         'Thought Leadership', 'مقالات مهنية',   'Latest <span>Articles</span>',                                     'أحدث <span>المقالات</span>'],
    ]
  };
  function applyLang(lang) {
    const AR = lang === 'ar';
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', AR ? 'ar' : 'en');
    localStorage.setItem('lang', lang);
    document.getElementById('langToggle').textContent = AR ? 'EN' : 'عربي';

    /* helpers */
    const t   = (el, en, ar) => { if (el) el.textContent = AR ? ar : en; };
    const tH  = (el, en, ar) => { if (el) el.innerHTML   = AR ? ar : en; };
    const tp  = (el, en, ar) => { if (el) el.placeholder = AR ? ar : en; };

    /* ── NAV ── */
    i18n.nav.forEach(([href, en, ar]) => {
      const el = navLinksDiv.querySelector(`a[href="${href}"]`);
      if (el && !el.classList.contains('nav-cta')) el.textContent = AR ? ar : en;
    });
    t(navLinksDiv.querySelector('.nav-cta'), 'Book a call', 'احجز مكالمة');

    /* ── SECTION TAGS + TITLES ── */
    i18n.secs.forEach(([id, tEn, tAr, hEn, hAr]) => {
      const sec = document.getElementById(id); if (!sec) return;
      const tag = sec.querySelector('.sec-tag'), ttl = sec.querySelector('.sec-title');
      if (tag) tag.textContent = AR ? tAr : tEn;
      if (ttl) ttl.innerHTML   = AR ? hAr : hEn;
    });

    /* ── HERO NAME + NAV BRAND NAME ── */
    const heroName = document.querySelector('.hero-name');
    if (heroName) heroName.innerHTML = AR
      ? 'محمد عصام <span>أبوعميرة</span>'
      : 'Mohamed Essam <span>Abu Emira</span>';
    const navBrandEl = document.querySelector('.nav-brand');
    if (navBrandEl) {
      const dot = navBrandEl.querySelector('.nav-brand-dot');
      const span = navBrandEl.querySelector('span');
      navBrandEl.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = ''; });
      if (AR) {
        if (span) { span.textContent = 'أبوعميرة'; span.style.marginLeft = '0'; span.style.marginRight = '4px'; }
        navBrandEl.setAttribute('dir', 'rtl');
        if (dot) dot.insertAdjacentText('beforebegin', ' محمد');
      } else {
        if (span) { span.textContent = 'Abu Emira'; span.style.marginLeft = '4px'; span.style.marginRight = ''; }
        navBrandEl.removeAttribute('dir');
        if (span) span.insertAdjacentText('beforebegin', 'Mohamed ');
      }
    }

    /* ── HERO ── */
    t(document.querySelector('.hero-subtitle'),
      'COO & Co-Founder, Nexa Solutions · Odoo Project Manager',
      'الرئيس التنفيذي للعمليات ومؤسس مشارك، نيكسا تكنولوجي · مدير مشاريع أودو');
    const hBtns = document.querySelectorAll('.hero-btns a');
    t(hBtns[0], 'Book a free 30-min call', 'احجز مكالمة مجانية لمدة 30 دقيقة');
    t(hBtns[1], 'See client projects',     'شاهد مشاريع العملاء');
    t(document.querySelector('.hero-headline'), 'Odoo ERP your finance and operations teams can trust', 'نظام أودو تثق به إدارتك المالية والتشغيلية');
    t(document.querySelector('.hero-lede'),
      'I started my career in accounting, so I build Odoo around how your numbers, stock and people actually work: 79+ ERP projects across Egypt, Saudi Arabia and the GCC. Today I am COO of Nexa Solutions, an Odoo Official Partner.',
      'بدأتُ مسيرتي في المحاسبة، لذلك أبني أودو على طريقة عمل أرقامك ومخزونك وفريقك فعلاً: أكثر من 79 مشروع ERP في مصر والسعودية والخليج. وأعمل اليوم الرئيس التنفيذي للعمليات في نيكسا تكنولوجي، شريك أودو الرسمي.');
    const proofEls = document.querySelectorAll('.proof-line span');
    [['Odoo Official Partner (Nexa Solutions)','شريك أودو الرسمي (نيكسا تكنولوجي)'],
     ['Odoo 16 · 17 · 18 Certified','معتمد أودو 16 · 17 · 18'],
     ['Google Project Management','إدارة المشاريع من جوجل'],
     ['IBM IT Project Manager','مدير مشاريع تقنية المعلومات من IBM'],
     ['LinkedIn Top ERP Voice','أفضل صوت ERP على لينكد إن']]
      .forEach(([en,ar],i) => t(proofEls[i], en, ar));

    /* ── ABOUT — paragraphs ── */
    const aboutPs = document.querySelectorAll('.about-text p');
    t(document.querySelector('.about-more summary'), 'Read the full story', 'اقرأ القصة كاملة');
    [['I started as an accountant, closing the books and preparing financial statements for a manufacturer. Since 2019 I have implemented ERP systems, and in 2024 I co-founded <strong>Nexa Solutions</strong>, an Odoo Official Partner, where I am COO. Why it matters to you: I design Odoo from the general ledger outward, so finance, inventory, manufacturing and HR agree from day one. <strong>79+ projects</strong> across Egypt, Saudi Arabia, UAE and the GCC, in Arabic and English.',
      'بدأتُ محاسباً، أُقفل الدفاتر وأُعدّ القوائم المالية لشركة صناعية. ومنذ 2019 أعمل في تطبيق أنظمة ERP، وفي 2024 شاركتُ في تأسيس <strong>نيكسا تكنولوجي</strong>، شريك أودو الرسمي، وأتولى فيها منصب الرئيس التنفيذي للعمليات. ما يعنيه ذلك لك: أصمّم أودو انطلاقاً من دفتر الأستاذ العام، فتتطابق أرقام المالية والمخزون والتصنيع والموارد البشرية من اليوم الأول. <strong>أكثر من 79 مشروعاً</strong> في مصر والسعودية والإمارات والخليج، بالعربية والإنجليزية.'],
     ['Odoo Project Manager with <strong>12+ years</strong> of experience: a start in finance and accounting, then <strong>7+ years</strong> in end-to-end ERP deployment, configuration, and optimization. Co-Founded <strong>Nexa Solutions</strong> as COO, building it into a recognized Odoo Official Partner with a growing presence across Egypt, Saudi Arabia, and the GCC region.',
      'مدير مشاريع أودو بخبرة تتجاوز <strong>12 عاماً</strong>: بدأتُ في المالية والمحاسبة، ثم <strong>أكثر من 7 سنوات</strong> في تطبيق أنظمة ERP وتهيئتها وتحسينها. أحد مؤسسي <strong>نيكسا تكنولوجي</strong> بصفة الرئيس التنفيذي للعمليات، وطوّرتها لتصبح شريكاً رسمياً معتمداً لأودو بحضور متنامٍ في مصر والمملكة العربية السعودية ومنطقة الخليج.'],
     ['Proven ability to translate complex business and financial objectives into scalable Odoo solutions. Successfully led <strong>79+ ERP engagements</strong> across Construction, Manufacturing, Food &amp; Beverage, Retail, Government, and Real Estate sectors — with deep expertise in business requirements gathering, GAP analysis, process reengineering, data migration, multi-company/multi-currency configuration, and post-go-live support.',
      'قدرة مثبتة على ترجمة الأهداف التجارية والمالية المعقدة إلى حلول أودو قابلة للتطوير. قدت بنجاح <strong>79+ مشروع ERP</strong> في قطاعات المقاولات والتصنيع والغذاء والمشروبات والتجزئة والحكومة والعقارات — بخبرة عميقة في جمع المتطلبات وتحليل الفجوات وإعادة هندسة العمليات وترحيل البيانات وإعداد بيئات متعددة الشركات والعملات والدعم بعد التشغيل.'],
     ['Fluent in Arabic and English. Based in Egypt — actively serving clients across Egypt, Saudi Arabia, UAE and the wider GCC market.',
      'أتقن العربية والإنجليزية. مقيم في مصر — أخدم عملاء في مصر والمملكة العربية السعودية والإمارات وسائر دول الخليج.']]
      .forEach(([en, ar], i) => { if (aboutPs[i]) aboutPs[i].innerHTML = AR ? ar : en; });

    /* ── ABOUT — highlights descriptions ── */
    const hlS = document.querySelectorAll('.hl-body span');
    [['Scaled an Official Odoo Partner from inception — defining strategy, service portfolio, and go-to-market positioning. Led 30+ projects across Egypt and Saudi Arabia since 2024.',
      'بنيت نيكسا من الصفر وطوّرتها إلى شريك أودو رسمي معترف به — وضعت الاستراتيجية وحقيبة الخدمات وخطط التوسع. قدت 30+ مشروعاً في مصر والسعودية منذ 2024.'],
     ['Improved system performance by 70% through codebase optimization. Reduced operational costs by up to 25% across multiple client implementations.',
      'حققت تحسيناً في أداء الأنظمة بنسبة 70% عبر تحسين الكود. وفّرت ما يصل إلى 25% من التكاليف التشغيلية في مشاريع متعددة.'],
     ['Active across Egypt, Saudi Arabia, UAE and GCC — with clients from government, manufacturing, logistics, hospitality, and non-profit sectors.',
      'نشط في مصر والسعودية والإمارات ومنطقة الخليج — عملاء من الحكومة والتصنيع واللوجستيات والضيافة والقطاعات غير الربحية.']]
      .forEach(([en, ar], i) => { if (hlS[i]) hlS[i].textContent = AR ? ar : en; });

    /* ── ABOUT — KPIs ── */
    const kpiL = document.querySelectorAll('.kpi-l');
    [['Avg. Performance Gain','متوسط تحسين الأداء'],['Functional Specs','مواصفات وظيفية'],['ERP Platforms','منصات ERP']]
      .forEach(([en,ar],i) => t(kpiL[i], en, ar));

    /* ── ABOUT — highlights ── */
    const hlT = document.querySelectorAll('.hl-body strong');
    [['COO & Co-Founder — Nexa Solutions','الرئيس التنفيذي للعمليات ومؤسس مشارك — نيكسا تكنولوجي'],
     ['Measurable ERP Operations Impact','تأثير ERP ملموس وقابل للقياس'],
     ['Multi-Market Delivery','تسليم متعدد الأسواق']]
      .forEach(([en,ar],i) => t(hlT[i], en, ar));

    /* ── ABOUT — labels ── */
    t(document.querySelector('.mod-label'), 'Core Odoo Modules', 'وحدات أودو الأساسية');
    t(document.querySelector('.skills-card h4'), 'Skills & Expertise', 'المهارات والخبرات');
    t(document.querySelector('.skills-card + div > div:first-child'), 'Tools & Platforms', 'الأدوات والمنصات');

    /* ── SKILLS BAR LABELS ── */
    const skL = document.querySelectorAll('.sk-label > span:first-child');
    [['Odoo ERP','أودو ERP'],['ERP Project Management','إدارة مشاريع ERP'],
     ['Business Analysis & GAP','تحليل الأعمال والفجوات'],['Financial Reporting','التقارير المالية'],
     ['Budgeting & Forecasting','الميزانية والتوقعات'],['Data Migration','ترحيل البيانات'],
     ['Leadership & COO','القيادة والإدارة التنفيذية'],['Stakeholder Management','إدارة أصحاب المصلحة'],
     ['System Integration','تكامل الأنظمة']]
      .forEach(([en,ar],i) => t(skL[i], en, ar));

    /* ── INDUSTRIES ── */
    const indD = [
      ['Construction & Engineering','البناء والهندسة','Multi-company, project costing, oil & gas','متعدد الشركات، تكاليف مشاريع، نفط وغاز'],
      ['Manufacturing & Industrial','التصنيع والصناعة','MRP, BOM, quality control, planning','MRP، BOM، ضبط الجودة، التخطيط'],
      ['Food & Beverage','الغذاء والمشروبات','Restaurants, coffee chains, FMCG','مطاعم، سلاسل قهوة، FMCG'],
      ['Retail & eCommerce','التجزئة والتجارة الإلكترونية','POS, Shopify, multi-branch, loyalty','POS، شوبيفاي، متعدد الفروع، ولاء'],
      ['Logistics & Supply Chain','اللوجستيات وسلسلة التوريد','Air/ocean freight, warehousing, fleet','شحن جوي وبحري، تخزين، أسطول'],
      ['Real Estate','العقارات','Property sales, receivables, asset mgmt','مبيعات عقارية، ذمم مدينة، إدارة أصول'],
      ['Government & Public Sector','الحكومة والقطاع العام','Ministries, libraries, public orgs','وزارات، مكتبات، مؤسسات عامة'],
      ['Hospitality & Hotels','الضيافة والفنادق','PMS integration, reservations, POS','تكامل PMS، حجوزات، نقاط بيع'],
      ['Non-Profit & Associations','منظمات غير ربحية','NGOs, charities, prisoner care','جمعيات خيرية، رعاية المحتاجين'],
      ['Healthcare & Clinics','الرعاية الصحية والعيادات','Patient management, billing, HR','إدارة المرضى، فواتير، موارد بشرية'],
      ['Oil & Gas','النفط والغاز','Operations, maintenance, contract mgmt','عمليات، صيانة، إدارة عقود'],
      ['Professional Services','الخدمات المهنية','Consulting, security, tech firms','استشارات، أمن، شركات تقنية'],
    ];
    document.querySelectorAll('.ind-card').forEach((card,i) => {
      if (!indD[i]) return;
      t(card.querySelector('.ind-name'), indD[i][0], indD[i][1]);
      t(card.querySelector('.ind-sub'),  indD[i][2], indD[i][3]);
    });

    /* ── SERVICES ── */
    const svcD = [
      ['Odoo live on schedule','تشغيل أودو في موعده',
       'End-to-end implementation, from requirements and GAP analysis to configuration, UAT and go-live, on Odoo v12–v19 with one accountable project lead.',
       'تطبيق متكامل من جمع المتطلبات وتحليل الفجوات إلى التهيئة واختبارات القبول والتشغيل، على إصدارات أودو من 12 إلى 19، بقيادة مدير مشروع واحد مسؤول عن النتيجة.'],
      ['Finance you can close and audit','حسابات تُقفَل وتُراجَع بثقة',
       'Chart of accounts, VAT, Zakat and e-invoicing set-up, budgets, P&L and cash-flow reports, KPI dashboards, audit support, and ongoing bookkeeping if you need it, all in Odoo Accounting.',
       'دليل الحسابات، وإعداد ضريبة القيمة المضافة والزكاة والفوترة الإلكترونية، والموازنات، وتقارير الأرباح والخسائر والتدفقات النقدية، ولوحات المؤشرات، ودعم المراجعة، ومسك الدفاتر عند الحاجة، كلها داخل محاسبة أودو.'],
      ['Odoo connected to the tools you use','أودو مرتبط بالأدوات التي تعمل بها',
       'Shopify, eZee PMS, payment gateways and online stores integrated with Odoo, plus Studio changes and custom modules where configuration is not enough.',
       'ربط شوبيفاي وeZee PMS وبوابات الدفع والمتاجر الإلكترونية بأودو، مع تعديلات ستوديو ووحدات مخصّصة حين لا تكفي التهيئة.'],
      ['Your data moved over intact','بياناتك تنتقل كاملة وسليمة',
       'Migration from SAP, ONYX PRO, OpenCart and legacy systems, and upgrades between Odoo versions, reconciled before go-live.',
       'ترحيل البيانات من SAP وONYX PRO وOpenCart والأنظمة القديمة، وترقية إصدارات أودو، مع مطابقة كل شيء قبل التشغيل.'],
      ['Simpler processes, fewer manual steps','عمليات أبسط وخطوات يدوية أقل',
       'Process mapping and redesign built on Odoo best practices, so approvals, stock moves and reporting stop depending on spreadsheets.',
       'رسم العمليات وإعادة تصميمها وفق أفضل ممارسات أودو، لتتوقف الموافقات وحركات المخزون والتقارير عن الاعتماد على جداول Excel.'],
      ['A team that uses the system from day one','فريق يعمل على النظام من اليوم الأول',
       'Hands-on training for users and admins in Arabic and English, clear documentation, and support after go-live.',
       'تدريب عملي للمستخدمين ومديري النظام بالعربية والإنجليزية، وتوثيق واضح، ودعم بعد التشغيل.'],
    ];
    document.querySelectorAll('.svc-card').forEach((card,i) => {
      if (!svcD[i]) return;
      t(card.querySelector('.svc-title'), svcD[i][0], svcD[i][1]);
      t(card.querySelector('.svc-desc'),  svcD[i][2], svcD[i][3]);
    });
    t(document.querySelector('.svc-cta a'), 'Book a free 30-min call', 'احجز مكالمة مجانية لمدة 30 دقيقة');

    /* ── CONTACT INFO ── */
    t(document.querySelector('.contact-info > div:first-child'), 'Contact Information', 'وسائل التواصل معي');
    t(document.querySelector('.phone-hl > div > div:first-child'), 'Phone / WhatsApp', 'الهاتف / واتساب');
    const cLbl = document.querySelectorAll('.c-lbl');
    [['Email (Personal)','البريد الشخصي'],['Email (Nexa)','بريد نيكسا'],['Location','الموقع'],
     ['LinkedIn','لينكد إن'],['Portfolio','الملف المهني'],['CV','السيرة الذاتية'],
     ['Upwork','Upwork'],['Mostaql — مستقل','مستقل'],['خمسات — Khamsat','خمسات']]
      .forEach(([en,ar],i) => t(cLbl[i], en, ar));

    /* ── CONTACT CTA ── */
    t(document.querySelector('.contact-cta h3'), "Let's talk about your Odoo project", 'لنتحدث عن مشروع أودو الخاص بك');
    t(document.querySelector('.contact-cta > div > p'),
      'Planning a rollout, rescuing one that stalled, or moving from another ERP? Book a free 30-minute call and leave with a clear next step, whether or not we work together.',
      'تخطط لتطبيق أودو، أو تريد إنقاذ مشروع متعثر، أو الانتقال من نظام ERP آخر؟ احجز مكالمة مجانية مدتها 30 دقيقة واخرج منها بخطوة تالية واضحة، سواء عملنا معاً أم لا.');
    t(document.querySelector('.contact-note'),
      'Also open to full-time ERP leadership roles across Egypt, Saudi Arabia and the GCC.',
      'متاح أيضاً لأدوار قيادية بدوام كامل في مجال ERP في مصر والسعودية والخليج.');
    t(document.querySelector('.contact-cta .btn-gold'), 'Book a free 30-min call', 'احجز مكالمة مجانية لمدة 30 دقيقة');

    /* ── CONTACT FORM ── */
    t(document.getElementById('cf-title'), 'Send a Message', 'أرسل رسالة');
    t(document.getElementById('cf-sub'),
      "Fill the form below and I'll respond within 24 hours",
      'أخبرني عن تحدياتك — سأرد عليك خلال 24 ساعة بحل مناسب');
    [['cf-name','Full Name','الاسم الكامل'],['cf-email','Email','البريد الإلكتروني'],
     ['cf-phone','Phone / WhatsApp','الهاتف / واتساب'],['cf-service','Service','الخدمة المطلوبة'],
     ['cf-msg','Message','الرسالة']]
      .forEach(([id,en,ar]) => t(document.querySelector(`label[for="${id}"]`), en, ar));
    tp(document.getElementById('cf-name'),  'Your full name',                                     'الاسم الكامل');
    tp(document.getElementById('cf-email'), 'your@email.com',                                     'بريدك@الإلكتروني');
    tp(document.getElementById('cf-msg'),   'Tell me about your project, timeline, and requirements...', 'أخبرني عن مشروعك ومتطلباتك وجدولك الزمني...');
    t(document.getElementById('cf-svc-ph'), 'Select a service...', 'اختر الخدمة...');
    const cfBtn = document.getElementById('cfSubmit');
    if (cfBtn && !cfBtn.disabled) t(cfBtn, '✉️ Send Message', '✉️ أرسل طلبك الآن');
    t(document.getElementById('formSuccess'),
      "✅ Message sent successfully! I'll be in touch soon.",
      '✅ تم الإرسال بنجاح! سأتواصل معك خلال 24 ساعة.');

    /* ── FOOTER ── */
    t(document.querySelector('.footer-text'),
      '© 2026 Mohamed Essam Abu Emira · COO & Co-Founder, Nexa Solutions · Odoo Project Manager',
      '© 2026 محمد عصام أبو عميرة · الرئيس التنفيذي للعمليات ومؤسس مشارك، نيكسا تكنولوجي · مدير مشاريع أودو');
  }
  /* ── EXTENDED i18n: all missing sections ── */
  function applyLangExtended(lang) {
    const AR = lang === 'ar';
    const t  = (el, en, ar) => { if (el) el.textContent = AR ? ar : en; };
    const tH = (el, en, ar) => { if (el) el.innerHTML   = AR ? ar : en; };
    const tp = (el, en, ar) => { if (el) el.placeholder = AR ? ar : en; };

    /* ── PAGE TITLE & META ── */
    document.title = AR
      ? 'محمد عصام أبو عميرة | الرئيس التنفيذي للعمليات ومؤسس مشارك، نيكسا تكنولوجي'
      : 'Mohamed Essam Abu Emira | COO & Co-Founder, Nexa Solutions';
    const langToggleEl = document.getElementById('langToggle');
    if (langToggleEl) langToggleEl.textContent = AR ? 'EN' : 'عربي';

    /* ── STATS BAR ── */
    const statLbls = document.querySelectorAll('.stat-l');
    [['Years in ERP','سنوات في ERP'],['Projects Delivered','مشروعاً مُنجزاً'],
     ['Industries Served','قطاعاً مخدوماً'],['Certifications','شهادة معتمدة'],
     ['Recommendations','توصية مهنية']]
      .forEach(([en,ar],i) => t(statLbls[i], en, ar));

    /* ── WHY WORK WITH ME ── */
    const whySec = document.getElementById('why-work');
    if (whySec) {
      const whyTag = whySec.querySelector('.sec-tag');
      const whyTitle = whySec.querySelector('.sec-title');
      const whySub = whySec.querySelector('p[style]');
      if (whyTag) whyTag.textContent = AR ? 'مميزاتي' : 'Differentiators';
      if (whyTitle) whyTitle.innerHTML = AR ? 'لماذا <span>أنا؟</span>' : 'Why Work <span>With Me</span>';
      if (whySub) whySub.textContent = AR
        ? 'ما يميّز أسلوب عملي — بعيداً عن الشهادات وعدد المشاريع.'
        : 'What sets my approach apart — beyond the certifications and the project count.';
      const whyCards = whySec.querySelectorAll('.why-card');
      [
        ['Deep Regional Expertise','خبرة إقليمية عميقة',
         '7+ years of ERP delivery across Egypt, Saudi Arabia, UAE, and the GCC — understanding local business cultures, regulatory environments (VAT, Zakat, e-invoicing), and operational realities that generic ERP firms miss.',
         'أكثر من 7 سنوات في تطبيق ERP في مصر والسعودية والإمارات والخليج — فهم عميق لثقافات الأعمال المحلية والبيئات التنظيمية (ضريبة القيمة المضافة، الزكاة، الفوترة الإلكترونية) والواقع التشغيلي الذي تفتقده شركات ERP الدولية.'],
        ['Bilingual Delivery','تسليم ثنائي اللغة',
         'Fully fluent in Arabic and English — conducting discovery workshops, writing functional specs, and training end-users in either language without any loss of precision or context.',
         'طلاقة تامة في العربية والإنجليزية — أُجري ورش استكشاف وأكتب مواصفات وظيفية وأُدرّب مستخدمين بكلتا اللغتين دون أي فقد في الدقة أو السياق.'],
        ['Certified Technical Depth','عمق تقني معتمد',
         'Odoo certified across v16, v17 & v18 with hands-on mastery of accounting, manufacturing, supply chain, HR, CRM, POS, and Studio customization — backed by 40+ professional credentials.',
         'معتمد من أودو عبر الإصدارات 16 و17 و18 مع إتقان عملي للمحاسبة والتصنيع وسلسلة التوريد والموارد البشرية وإدارة العلاقات ونقاط البيع وتخصيصات ستوديو — بدعم 40+ شهادة مهنية.'],
        ['Business-First Approach','منهج يضع الأعمال أولاً',
         'Every ERP decision anchored in financial impact and operational efficiency — not just technical correctness. Your ROI and business outcome is always the metric that matters most.',
         'كل قرار في ERP مرتكز على الأثر المالي والكفاءة التشغيلية — لا على الصحة التقنية فحسب. عائدك على الاستثمار ونتيجة أعمالك هي المقياس الأهم دائماً.'],
        ['Post-Go-Live Commitment','التزام ما بعد التشغيل',
         "I don't disappear after delivery. Extended hypercare, user adoption support, and system health checks are a standard part of every engagement — not an upsell.",
         'أنا لا أختفي بعد التسليم. الرعاية الموسّعة ودعم تبني المستخدمين وفحوصات صحة النظام جزء أساسي من كل مشروع — وليس خدمة إضافية مدفوعة.'],
        ['COO-Level Business Lens','رؤية الرئيس التنفيذي للعمليات',
         'As COO of Nexa Solutions, I bridge the gap between C-suite strategy and technical execution — translating boardroom priorities into ERP configurations your team will actually use.',
         'بصفتي الرئيس التنفيذي للعمليات في نيكسا تكنولوجي، أربط بين استراتيجية C-suite والتنفيذ التقني — أحوّل أولويات مجلس الإدارة إلى تهيئات ERP يستخدمها فريقك فعلاً.'],
      ].forEach(([enT, arT, enD, arD], i) => {
        if (!whyCards[i]) return;
        const title = whyCards[i].querySelector('.why-title');
        const desc  = whyCards[i].querySelector('.why-desc');
        if (title) title.textContent = AR ? arT : enT;
        if (desc)  desc.textContent  = AR ? arD : enD;
      });
    }

    /* ── ABOUT SECTION SUBTITLE ── */
    const hlSpans = document.querySelectorAll('.hl-body span');
    [['Scaled an Official Odoo Partner from inception — defining strategy, service portfolio, and go-to-market positioning. Led 30+ projects across Egypt and Saudi Arabia since 2024.',
      'بناء شراكة أودو الرسمية من الصفر — تحديد الاستراتيجية وحقيبة الخدمات والتموضع في السوق. قيادة 30+ مشروعاً في مصر والسعودية منذ 2024.'],
     ['Improved system performance by 70% through codebase optimization. Reduced operational costs by up to 25% across multiple client implementations.',
      'تحسين أداء النظام بنسبة 70% عبر تحسين الكود. تخفيض التكاليف التشغيلية بنسبة تصل إلى 25% في تطبيقات متعددة.'],
     ['Active across Egypt, Saudi Arabia, UAE and GCC — with clients from government, manufacturing, logistics, hospitality, and non-profit sectors.',
      'نشاط فعّال في مصر والسعودية والإمارات والخليج — مع عملاء من قطاعات الحكومة والتصنيع واللوجستيات والضيافة والمنظمات غير الربحية.']]
      .forEach(([en,ar],i) => t(hlSpans[i], en, ar));

    /* ── NEXA SECTION ── */
    const nexaSub = document.querySelector('.nexa-brand-sub');
    if (nexaSub) tH(nexaSub,
      '🥈 Silver Official Odoo ERP Partner &nbsp;·&nbsp; <a href="https://www.nexa-solutions.com" target="_blank" style="color:var(--teal-mid);text-decoration:underline;">nexa-solutions.com</a>',
      AR ? '🥈 شريك فضي رسمي لأودو ERP &nbsp;·&nbsp; <a href="https://www.nexa-solutions.com" target="_blank" style="color:var(--teal-mid);text-decoration:underline;">nexa-solutions.com</a>'
         : '🥈 Silver Official Odoo ERP Partner &nbsp;·&nbsp; <a href="https://www.nexa-solutions.com" target="_blank" style="color:var(--teal-mid);text-decoration:underline;">nexa-solutions.com</a>');
    const nexaQuote = document.querySelector('.nexa-section > .container > p[style]');
    if (nexaQuote) t(nexaQuote,
      '"At NEXA, we transform potential into performance. With deep expertise and proven success, we deliver ERP solutions that drive businesses forward — Your future starts with NEXA."',
      AR ? '"نيكسا تكنولوجي لا تبيع برنامجاً — تبني معك نظاماً يحل مشاكل اليوم ويستوعب نمو الغد. شركاؤنا يرون الفرق من أول 90 يوماً."'
         : '"At NEXA, we transform potential into performance. With deep expertise and proven success, we deliver ERP solutions that drive businesses forward — Your future starts with NEXA."');
    const nexaBadges = document.querySelectorAll('.nx-badge');
    [['COO & Co-Founder','الرئيس التنفيذي للعمليات ومؤسس مشارك'],
     ['🥈 Silver Official Odoo Partner','🥈 شريك فضي رسمي من أودو'],
     ['15+ Years Combined Experience','15+ سنة خبرة مشتركة'],
     ['Egypt · Saudi Arabia · GCC','مصر · السعودية · الخليج']]
      .forEach(([en,ar],i) => { if(nexaBadges[i]) t(nexaBadges[i], en, ar); });
    const nxCards = document.querySelectorAll('.nx-card');
    if (nxCards[0]) {
      t(nxCards[0].querySelector('h4'), 'About Nexa Solutions', 'عن نيكسا تكنولوجي');
      const nxP = nxCards[0].querySelector('p');
      t(nxP, 'A forward-thinking software company specializing in Odoo ERP. Founded by seasoned professionals with deep expertise across MENA industries.',
        AR ? 'نيكسا تكنولوجي شركة متخصصة في تطبيق وتطوير أودو ERP — أسسها فريق من المحترفين الذين نفّذوا بأنفسهم أكثر من 79 مشروعاً عبر 15 قطاعاً في مصر والخليج.' : 'A forward-thinking software company specializing in Odoo ERP.');
      const nxLi = nxCards[0].querySelectorAll('li');
      [['Tailored ERP solutions for client efficiency','حلول ERP مُخصصة لتعظيم كفاءة العملاء'],
       ['Digital transformation leadership','قيادة مسيرة التحول الرقمي'],
       ['Process optimization & cost reduction','تحسين العمليات وتخفيض التكاليف'],
       ['High-quality, innovative delivery','تسليم عالي الجودة ومبتكر'],
       ['Lasting partnerships & continuous support','شراكات راسخة ودعم مستمر']]
        .forEach(([en,ar],i) => { if(nxLi[i]) t(nxLi[i], en, ar); });
    }
    if (nxCards[1]) {
      t(nxCards[1].querySelector('h4'), 'My Role — COO & Co-Founder', 'دوري — مدير العمليات ومؤسس مشارك');
      const nxRoleLi = nxCards[1].querySelectorAll('li');
      [['Co-founded and scaled Nexa into a recognised Odoo Partner','شاركت في تأسيس نيكسا وتطويرها إلى شريك أودو معترف به'],
       ['Defined corporate strategy, service portfolio & go-to-market','وضعت الاستراتيجية المؤسسية وحقيبة الخدمات وخطط دخول السوق'],
       ['Directed end-to-end ERP project lifecycles & internal SOPs','أشرفت على دورة حياة مشاريع ERP كاملةً والإجراءات التشغيلية الداخلية'],
       ['Led functional discovery, solution design & configuration','قدت مرحلة الاستكشاف الوظيفي وتصميم الحلول والتهيئة'],
       ['Primary Odoo liaison — partner compliance & standards','المسؤول الرئيسي عن الامتثال لمعايير الشراكة مع أودو'],
       ['Owned P&L, pricing models & workforce allocation','إدارة الأرباح والخسائر ونماذج التسعير وتخصيص الكوادر'],
       ['Oversaw change management & user training programs','الإشراف على إدارة التغيير وبرامج تدريب المستخدمين'],
       ['Executive-level account management & client retention','إدارة الحسابات على المستوى التنفيذي والحفاظ على العملاء']]
        .forEach(([en,ar],i) => { if(nxRoleLi[i]) t(nxRoleLi[i], en, ar); });
      const nxStatLbls = nxCards[1].querySelectorAll('.nx-stat-l');
      [['Projects','مشروعاً'],['Markets','أسواق'],['Founded','تأسيس']]
        .forEach(([en,ar],i) => { if(nxStatLbls[i]) t(nxStatLbls[i], en, ar); });
    }
    if (nxCards[2]) {
      t(nxCards[2].querySelector('h4'), 'Nexa Offices', 'مكاتب نيكسا تكنولوجي');
      const officeNames = nxCards[2].querySelectorAll('.nx-office-name');
      t(officeNames[0], 'Saudi Arabia — Riyadh', 'المملكة العربية السعودية — الرياض');
      t(officeNames[1], 'Egypt — New Cairo', 'مصر — القاهرة الجديدة');
    }

    /* ── EXPERIENCE ── */
    const expRoles = document.querySelectorAll('.exp-role');
    const expCos   = document.querySelectorAll('.exp-co');
    const expDescs = document.querySelectorAll('.exp-desc');
    const expDates = document.querySelectorAll('.exp-date');
    [['Mar 2024 – Present','مارس 2024 – حتى الآن'],
     ['Jan 2023 – Sep 2024','يناير 2023 – سبتمبر 2024'],
     ['Feb 2021 – Jan 2023','فبراير 2021 – يناير 2023'],
     ['May 2019 – Feb 2021','مايو 2019 – فبراير 2021'],
     ['Feb 2019 – May 2019','فبراير 2019 – مايو 2019'],
     ['Aug 2015 – Feb 2019','أغسطس 2015 – فبراير 2019'],
     ['Nov 2013 – Aug 2015','نوفمبر 2013 – أغسطس 2015']]
      .forEach(([en,ar],i) => { if(expDates[i]) t(expDates[i], en, ar); });
    [['COO (Chief Operating Officer) & Co-Founder','الرئيس التنفيذي للعمليات ومؤسس مشارك'],
     ['ERP Consultant | Product Owner','استشاري ERP | مدير المنتج'],
     ['Odoo Functional Consultant','استشاري تنفيذ أودو'],
     ['ERP Implementation Consultant','استشاري تطبيق ERP'],
     ['Accountant Manager','مدير الحسابات'],
     ['Chief Accountant','رئيس الحسابات'],
     ['General Accountant','محاسب عام']]
      .forEach(([en,ar],i) => { if(expRoles[i]) t(expRoles[i], en, ar); });
    const exp1Bullets = document.querySelectorAll('.exp-item:first-child .exp-bullets li');
    [['Co-founded and scaled Nexa into a recognised Official Odoo Partner, defining corporate strategy, service portfolio, and go-to-market positioning for expansion across MENA',
      'شاركت في تأسيس نيكسا وتطويرها إلى شريك أودو رسمي معترف به، مع تحديد الاستراتيجية المؤسسية وحقيبة الخدمات وخطط التوسع في الشرق الأوسط وشمال أفريقيا'],
     ['Directed end-to-end Odoo ERP project lifecycles and internal SOPs, ensuring on-time, on-scope, and on-budget delivery across all client engagements',
      'أشرفت على دورات حياة مشاريع أودو ERP كاملةً والإجراءات الداخلية، مع ضمان التسليم في الوقت المحدد وضمن النطاق والميزانية'],
     ['Led functional discovery, solution design, and configuration across Accounting, Sales, CRM, Purchasing, Inventory, Manufacturing, and Operations modules',
      'قدت مرحلة الاستكشاف الوظيفي وتصميم الحلول والتهيئة عبر وحدات المحاسبة والمبيعات وإدارة العلاقات والمشتريات والمخزون والتصنيع والعمليات'],
     ['Acted as primary liaison with Odoo — ensuring compliance with partner requirements and maintaining partner status and performance standards',
      'العمل كمسؤول رئيسي للتواصل مع أودو — ضمان الامتثال لمتطلبات الشراكة والحفاظ على معايير الأداء'],
     ['Owned P&L, pricing models, and workforce allocation — optimising developer utilisation and project margins for sustainable profitability',
      'إدارة الأرباح والخسائر ونماذج التسعير وتخصيص الكوادر — تحسين استغلال المطورين وهوامش المشاريع لتحقيق ربحية مستدامة'],
     ['Led executive-level account management and delivery quality assurance, driving high user adoption and strong client retention',
      'قيادة إدارة الحسابات التنفيذية وضمان جودة التسليم، بما يدفع تبني المستخدمين ويعزز الاحتفاظ بالعملاء'],
     ['Oversaw change management and user training, personally delivering key sessions to ensure operational continuity and ROI',
      'الإشراف على إدارة التغيير وتدريب المستخدمين مع تقديم جلسات رئيسية شخصياً لضمان استمرارية العمل وتحقيق العائد على الاستثمار']]
      .forEach(([en,ar],i) => { if(exp1Bullets[i]) t(exp1Bullets[i], en, ar); });
    const exp2Bullets = document.querySelectorAll('.exp-item:nth-child(2) .exp-bullets li');
    [['Gathered and documented business requirements; translated them into 50+ functional specifications for Odoo implementations',
      'جمع وتوثيق متطلبات الأعمال وترجمتها إلى أكثر من 50 مواصفة وظيفية لتطبيقات أودو'],
     ['Performed advanced configuration, Studio customizations, and data migration across 30+ client engagements',
      'إجراء تهيئة متقدمة وتخصيصات أودو ستوديو وترحيل بيانات في أكثر من 30 مشروع'],
     ['Improved system performance by 70% through ERP codebase optimization and database restructuring',
      'تحسين أداء النظام بنسبة 70% من خلال تحسين الكود وإعادة هيكلة قاعدة البيانات'],
     ['Managed UAT cycles, user training, product backlog, and post-go-live support across diverse industries',
      'إدارة دورات اختبار القبول والتدريب وقائمة المنتج ودعم ما بعد التشغيل في قطاعات متنوعة']]
      .forEach(([en,ar],i) => { if(exp2Bullets[i]) t(exp2Bullets[i], en, ar); });
    if (expDescs[0]) t(expDescs[0],
      'Designed and optimized Odoo modules across 3+ large projects. Presented customized demos, analyzed client business flows, defined implementation plans, and delivered comprehensive user training. Proficient across Odoo v14, v15, v16, and v17.',
      AR ? 'تصميم وتحسين وحدات أودو في أكثر من 3 مشاريع ضخمة. تقديم عروض مخصصة وتحليل تدفقات أعمال العملاء ووضع خطط التطبيق وتقديم تدريب شامل للمستخدمين. إتقان تام لإصدارات أودو v14 و v15 و v16 و v17.' : expDescs[0].textContent);
    if (expDescs[1]) t(expDescs[1],
      'Provided functional ERP support, system administration, process mapping, testing, and training. Developed project plans, coordinated development teams, and delivered client demos and POCs.',
      AR ? 'تقديم الدعم الوظيفي لنظام ERP وإدارة النظام ورسم العمليات والاختبار والتدريب. وضع خطط المشاريع وتنسيق فرق التطوير وتقديم العروض التوضيحية.' : expDescs[1].textContent);
    if (expDescs[2]) t(expDescs[2],
      'Managed the full accounting team. Prepared and reviewed financial statements, handled tax authority dealings (VAT, Withholding, Stamp, Income Tax), performed budget vs. actual variance analysis, and coordinated with internal and external auditors.',
      AR ? 'إدارة فريق المحاسبة بالكامل. إعداد ومراجعة القوائم المالية والتعامل مع هيئة الضرائب (ضريبة القيمة المضافة والخصم والدمغة وضريبة الدخل) وإجراء تحليل الانحراف بين الميزانية والفعلي والتنسيق مع المراجعين الداخليين والخارجيين.' : expDescs[2].textContent);
    if (expDescs[3]) t(expDescs[3],
      'Prepared Balance Sheet, Income Statement, Cash Flow, and Equity statements. Analyzed business trends, costs, and revenues. Managed payroll, customs clearance, cost variance analysis, and cash flow estimation for the full fiscal year.',
      AR ? 'إعداد الميزانية العمومية وقائمة الدخل والتدفق النقدي وحقوق الملكية. تحليل الاتجاهات التجارية والتكاليف والإيرادات. إدارة الرواتب والتخليص الجمركي وتحليل انحراف التكلفة وتقدير التدفق النقدي للسنة المالية.' : expDescs[3].textContent);
    if (expDescs[4]) t(expDescs[4],
      'Daily journal entries for customers, suppliers, banks, cash, and salaries. Bank reconciliation, monthly/quarterly/annual financial data reporting under American Accounting Methods.',
      AR ? 'قيود يومية للعملاء والموردين والبنوك والنقد والرواتب. مطابقة بنكية وتقارير بيانات مالية شهرية وربع سنوية وسنوية وفق المعايير المحاسبية الأمريكية.' : expDescs[4].textContent);

    /* ── CURRENT BADGE ── */
    const currBadge = document.querySelector('.current-badge');
    if (currBadge) t(currBadge, '● Current Position', '● الوظيفة الحالية');

    /* ── NEXA TAG in experience ── */
    const expNexaLabel = document.querySelector('.exp-nexa-label');
    if (expNexaLabel) tH(expNexaLabel,
      '<span class="silver-badge">🥈 Silver</span> Nexa Solutions — Official Odoo Partner',
      AR ? '<span class="silver-badge">🥈 فضي</span> نيكسا تكنولوجي — شريك أودو الرسمي'
         : '<span class="silver-badge">🥈 Silver</span> Nexa Solutions — Official Odoo Partner');

    /* ── PROJECTS FILTER ── */
    const filterBtnsEl = document.querySelectorAll('.fbtn');
    [['All (79+)','الكل (79+)'],['Construction','البناء والمقاولات'],
     ['Manufacturing','التصنيع'],['Food & Beverage','الأغذية والمشروبات'],
     ['Logistics','اللوجستيات'],['Retail & eCommerce','التجزئة والتجارة الإلكترونية'],
     ['Hospitality','الضيافة والفنادق'],['Government','الحكومة'],
     ['Non-profit','غير ربحي'],['Real Estate','العقارات'],['Services','الخدمات']]
      .forEach(([en,ar],i) => { if(filterBtnsEl[i]) t(filterBtnsEl[i], en, ar); });

    /* ── CERTIFICATIONS ── */
    const certHlNames = document.querySelectorAll('.cert-hl-name');
    [['Odoo 16 · 17 · 18 Certified','معتمد أودو 16 · 17 · 18'],
     ['LinkedIn Top ERP Voice','أفضل صوت ERP على لينكد إن'],
     ['Google Project Management','إدارة المشاريع — جوجل'],
     ['IBM IT Project Manager','مدير مشاريع تقنية المعلومات — IBM'],
     ['McKinsey Forward Program','برنامج ماكنزي Forward'],
     ['500+ LinkedIn Connections','500+ اتصال على لينكد إن'],
     ['SAP Technology Consultant','استشاري تقنية SAP'],
     ['Certified Financial Analyst','محلل مالي معتمد']]
      .forEach(([en,ar],i) => { if(certHlNames[i]) t(certHlNames[i], en, ar); });
    const certCardNames = document.querySelectorAll('.cert-name');
    [['Claude 101','Claude 101 — أساسيات Claude'],
     ['Enterprise Systems','أنظمة المؤسسات'],
     ['Odoo 18 Functional Certification','شهادة أودو 18 الوظيفية'],
     ['Odoo 17 Functional Certification','شهادة أودو 17 الوظيفية'],
     ['Odoo 16 Functional Certification','شهادة أودو 16 الوظيفية'],
     ['Google Project Management','إدارة المشاريع — جوجل'],
     ['IBM IT Project Manager','مدير مشاريع تقنية المعلومات — IBM'],
     ['McKinsey Forward Program','برنامج ماكنزي Forward'],
     ['Gen AI for Project Managers','الذكاء الاصطناعي التوليدي لمديري المشاريع'],
     ['Strategic Leadership: Impact & Decision-Making','القيادة الاستراتيجية: التأثير واتخاذ القرار'],
     ['AI Fundamentals — IBM SkillsBuild','أساسيات الذكاء الاصطناعي — IBM'],
     ['International Diploma in Entrepreneurship','الدبلوم الدولي في ريادة الأعمال'],
     ['Financial Management Specialization','تخصص الإدارة المالية'],
     ['Scrum Fundamentals Certified','شهادة أساسيات سكرم'],
     ['Digital Egypt Pioneers Program','برنامج رواد مصر الرقمية'],
     ['Cost Accounting Specialization','تخصص محاسبة التكاليف'],
     ['Certified Entrepreneurship Mastery','إتقان ريادة الأعمال المعتمد'],
     ['IT Fundamentals for Everyone','أساسيات تقنية المعلومات للجميع'],
     ['Sprint Up — Product Management','Sprint Up — إدارة المنتجات']]
      .forEach(([en,ar],i) => { if(certCardNames[i]) t(certCardNames[i], en, ar); });
    const awardCards = document.querySelectorAll('.award-card');
    if (awardCards[0]) {
      t(awardCards[0].querySelector('h4'), 'LinkedIn Top ERP Voice', 'أفضل صوت ERP على لينكد إن');
      t(awardCards[0].querySelector('p'), 'Recognized for thought leadership and ERP insights shared with thousands of followers. In-depth posts on ERP challenges, innovations, and deployment best practices across the MENA region.',
        AR ? 'تقدير للقيادة الفكرية ورؤى ERP المشاركة مع آلاف المتابعين. منشورات معمّقة حول تحديات ERP والابتكارات وأفضل ممارسات التطبيق في منطقة الشرق الأوسط وشمال أفريقيا.' : '');
      t(awardCards[0].querySelector('.award-year'), 'LinkedIn · 2024', 'لينكد إن · 2024');
    }
    if (awardCards[1]) {
      t(awardCards[1].querySelector('h4'), 'Odoo Community — Apprentice Rank', 'مجتمع أودو — رتبة متدرب');
      t(awardCards[1].querySelector('p'), 'Active contributor to the Odoo Community through knowledge sharing, answering questions, and promoting ERP best practices. Actively progressing toward the Hero rank.',
        AR ? 'مساهم نشط في مجتمع أودو من خلال مشاركة المعرفة والإجابة على الأسئلة وترويج أفضل ممارسات ERP. يسعى نحو الارتقاء لرتبة Hero.' : '');
      t(awardCards[1].querySelector('.award-year'), 'Odoo Community · 2024', 'مجتمع أودو · 2024');
    }

    /* ── TESTIMONIALS ── */
    const testTexts = document.querySelectorAll('.test-text');
    [['Mohammad was my go-to colleague when I wanted finance and accounting related consulting. He\'s precise, professional, time sensitive and dependable. Most importantly, I fully trust him. I\'d love to work with him again anytime.',
      'كان محمد مرجعي الأول دائماً حين أحتاج استشارة في المالية والمحاسبة. دقيق واحترافي وملتزم بالمواعيد ويمكن الاعتماد عليه. والأهم أنني أثق به تماماً. يسعدني العمل معه في أي وقت.'],
     ['We had a great experience working with Mohamed on our ERP. His strong technical expertise combined with solid accounting knowledge allowed him to deliver a seamless and tailored Odoo solution that fully met our requirements. Highly recommended.',
      'كانت تجربتنا مع محمد في مشروع ERP ممتازة. خبرته التقنية القوية مقرونة بمعرفته المحاسبية الراسخة مكّنته من تسليم حل أودو سلس ومخصص يلبي متطلباتنا بالكامل. أوصي به بشدة.'],
     ['Mohamed is one of the best Odoo Consultants I\'ve worked with. He has the ability to simplify complex requirements and ensure they\'re done with the best quality. A kind and helpful professional you\'d love on your team.',
      'محمد من أفضل استشاريي أودو الذين تعاملت معهم. يمتلك قدرة فائقة على تبسيط المتطلبات المعقدة وضمان تنفيذها بأعلى جودة. محترف رائع تتمنى وجوده في فريقك.'],
     ['Mohamed demonstrated exceptional ability to analyze business processes and successfully implement Odoo ERP. His professional approach to project management and communication with stakeholders makes him invaluable to any project.',
      'أظهر محمد قدرة استثنائية على تحليل العمليات التجارية وتطبيق أودو ERP بنجاح. أسلوبه الاحترافي في إدارة المشاريع والتواصل مع أصحاب المصلحة يجعله لا غنى عنه في أي مشروع.'],
     ['I had the pleasure of working with Mohamed and highly recommend him. He has exceptional analytical skills, profound expertise in Odoo with a strong focus on financial implementation, and consistently delivers results as a great team player.',
      'أتشرف بالتوصية بمحمد. يمتلك مهارات تحليلية استثنائية وخبرة عميقة في أودو مع تركيز قوي على التطبيق المالي، وهو دائماً ينجز نتائج ملموسة كلاعب فريق متميز.'],
     ['Muhamad is a hardworking, skilled, and dedicated professional whose eagerness to learn is limitless. His expertise and determination make him a remarkable asset to any team he joins.',
      'محمد مهني مجتهد وماهر ومتفانٍ، وشغفه بالتعلم لا حدود له. خبرته وعزيمته تجعله إضافة قيّمة لأي فريق ينضم إليه.'],
     ['I am pleased to provide this recommendation for Mohamed Essam, who is one of the most skilled and experienced professionals in ERP Consulting, Business Analysis, and Odoo Project Management.',
      'يسعدني تقديم هذه التوصية لمحمد عصام، أحد أكثر المهنيين مهارةً وخبرةً في استشارات ERP وتحليل الأعمال وإدارة مشاريع أودو.'],
     ['Mohamed has been an integral part of my team as a senior Odoo Implementer for the past five years. Throughout this time, he has consistently demonstrated a deep technical understanding of the Odoo ecosystem.',
      'كان محمد ركيزة أساسية في فريقي بصفته مطبّق أودو أول على مدى السنوات الخمس الماضية. أثبت باستمرار فهماً تقنياً عميقاً لمنظومة أودو.'],
     ['Mohamed is highly professional, always available, and deeply knowledgeable in Odoo. He listens carefully to business needs and translates them into practical, efficient solutions.',
      'محمد محترف بامتياز، دائم الاستجابة وعارف عميق بأودو. يصغي باهتمام لاحتياجات العمل ويترجمها إلى حلول عملية وفعّالة.'],
     ['Mohamed delivered our full Odoo 17 implementation on time and exceeded our expectations on every module. His knowledge of the construction industry and financial control requirements allowed us to go live with confidence.',
      'سلّم محمد مشروع أودو 17 الكامل في الموعد المحدد وتخطّى توقعاتنا في كل وحدة. معرفته العميقة بقطاع المقاولات ومتطلبات الضبط المالي أتاحت لنا التشغيل بثقة تامة.']]
      .forEach(([en,ar],i) => { if(testTexts[i]) t(testTexts[i], en, ar); });

    /* ── EDUCATION ── */
    const eduDegs = document.querySelectorAll('.edu-deg');
    const eduSchs = document.querySelectorAll('.edu-sch');
    const eduYrs  = document.querySelectorAll('.edu-yr');
    [['Bachelor of Commerce — Accounting & Finance','بكالوريوس تجارة — محاسبة ومالية'],
     ['International Professional Diploma in Entrepreneurship (IPDE)','الدبلوم المهني الدولي في ريادة الأعمال (IPDE)'],
     ['Accountant — Financial Management Level 2','محاسب — الإدارة المالية المستوى الثاني'],
     ['Summer Internship — Banking Operations','تدريب صيفي — العمليات المصرفية']]
      .forEach(([en,ar],i) => { if(eduDegs[i]) t(eduDegs[i], en, ar); });
    [['Faculty of Commerce, Cairo University','كلية التجارة، جامعة القاهرة'],
     ['Missouri State University, USA','جامعة ميزوري الولايات المتحدة الأمريكية'],
     ['Professional Certification Program','برنامج التدريب المهني'],
     ['Alexandria Bank','بنك الإسكندرية']]
      .forEach(([en,ar],i) => { if(eduSchs[i]) t(eduSchs[i], en, ar); });
    [['2008–2012 · Grade: Good (77%) · Final Year: Very Good','2008–2012 · التقدير: جيد (77%) · السنة النهائية: جيد جداً'],
     ['May 2025 · Grade: Good','مايو 2025 · التقدير: جيد'],
     ['2023–2024','2023–2024'],
     ['Summer 2012','صيف 2012']]
      .forEach(([en,ar],i) => { if(eduYrs[i]) t(eduYrs[i], en, ar); });
    const eduTagTexts = [
      [['Financial Accounting','محاسبة مالية'],['Managerial Accounting','محاسبة إدارية'],['Auditing','تدقيق'],['Business Law','قانون تجاري'],['Supply Chain','سلسلة توريد'],['ERP Systems','أنظمة ERP']],
      [['Entrepreneurship','ريادة الأعمال'],['Business Strategy','استراتيجية الأعمال'],['Startup Management','إدارة الشركات الناشئة']],
      [['Advanced Financial Accounting','محاسبة مالية متقدمة'],['Management Accounting','محاسبة إدارية']],
      [['Banking Operations','العمليات المصرفية'],['Customer Service','خدمة العملاء'],['Financial Transactions','المعاملات المالية']],
    ];
    document.querySelectorAll('.edu-card').forEach((card,ci) => {
      card.querySelectorAll('.edu-tag').forEach((tag,ti) => {
        if(eduTagTexts[ci] && eduTagTexts[ci][ti]) t(tag, eduTagTexts[ci][ti][0], eduTagTexts[ci][ti][1]);
      });
    });

        /* ── BLOG ── */
    t(document.querySelector('#blogLoading') || document.querySelector('.blog-ph'),
      '⏳ Loading latest articles from Medium...', AR ? '⏳ جارٍ تحميل أحدث المقالات...' : '⏳ Loading latest articles from Medium...');
    const blogViewAll = document.querySelector('#blog .btn-gold');
    t(blogViewAll, '✍️ View All Articles on Medium →', AR ? '✍️ عرض جميع المقالات على Medium ←' : '✍️ View All Articles on Medium →');

    /* ── FOOTER ── */
    const footerLinks = document.querySelectorAll('.footer-links a');
    [['LinkedIn','لينكد إن'],['Nexa Solutions','نيكسا تكنولوجي'],
     ['Portfolio','الملف المهني'],['Blog','المدونة'],['Book Meeting','احجز استشارة مجانية']]
      .forEach(([en,ar],i) => { if(footerLinks[i]) t(footerLinks[i], en, ar); });

    /* ── NAV CONTROLS (dynamically added) ── */
    const newNavLinks = document.querySelectorAll('.nav-links a');
    newNavLinks.forEach(a => {

      if (a.href.endsWith('#blog'))         t(a, 'Blog',  AR ? 'مقالات' : 'Blog');
    });

    /* ── HERO BADGE ── */
    t(document.querySelector('.hero-nexa-text'), 'COO @ Nexa Solutions', AR ? 'الرئيس التنفيذي للعمليات @ نيكسا تكنولوجي' : 'COO @ Nexa Solutions');
    t(document.querySelector('.hero-nexa-sub'), 'Odoo Official Partner', AR ? 'شريك أودو الرسمي' : 'Odoo Official Partner');

    /* ── HERO META ── */
    const heroMetas = document.querySelectorAll('.hm');
    heroMetas.forEach(m => {
      const txt = m.textContent.trim();
      const hmT = m.querySelector('.hm-t');
      if (hmT) t(hmT, 'Giza, Egypt', AR ? 'الجيزة، مصر' : 'Giza, Egypt');
    });

    /* ── CONTACT INFO UPWORK/MOSTAQL VALS ── */
    const upworkEl = document.querySelector('.c-val a[href*="upwork"]');
    if (upworkEl) t(upworkEl, 'Hire on Upwork ↗', AR ? 'تعاقد معي عبر Upwork ←' : 'Hire on Upwork ↗');

    /* ── TAGS in experience ── */
    document.querySelectorAll('.exp-item').forEach(item => {
      item.querySelectorAll('.etag').forEach(tag => {
        const map = {
          'COO':'الرئيس التنفيذي للعمليات','Co-Founder':'مؤسس مشارك','Odoo Partner':'شريك أودو',
          'P&L Ownership':'إدارة الأرباح والخسائر','ERP Strategy':'استراتيجية ERP',
          'Team Leadership':'قيادة الفريق','Go-to-Market':'دخول السوق',
          'Odoo Studio':'أودو ستوديو','Data Migration':'ترحيل البيانات',
          'Multi-Company':'متعدد الشركات','UAT':'اختبار القبول','JIRA':'JIRA',
          'Functional Consulting':'استشارات وظيفية','Training':'تدريب',
          'Odoo v14–v17':'أودو v14–v17','ONYX PRO ERP':'ONYX PRO ERP',
          'MOTAKAMEL PLUS':'MOTAKAMEL PLUS','Process Mapping':'رسم العمليات',
          'POC Demos':'عروض إثبات المفهوم','Financial Statements':'قوائم مالية',
          'Tax Management':'إدارة الضرائب','Team Management':'إدارة الفريق',
          'Audit':'تدقيق','Financial Reporting':'تقارير مالية',
          'Cost Analysis':'تحليل التكاليف','Payroll':'كشوف الرواتب',
          'Budget Variance':'انحراف الميزانية','Customs':'الجمارك',
          'Journal Entries':'القيود اليومية','Bank Reconciliation':'المطابقة البنكية',
        };
        if (AR && map[tag.textContent.trim()]) tag.textContent = map[tag.textContent.trim()];
        else if (!AR) {
          const revMap = Object.fromEntries(Object.entries(map).map(([k,v])=>[v,k]));
          if (revMap[tag.textContent.trim()]) tag.textContent = revMap[tag.textContent.trim()];
        }
      });
    });

    /* ── PROJ CARD categories ── */
    const catMap = {
      'Construction':'مقاولات وبناء','Manufacturing':'تصنيع',
      'Food & Beverage':'أغذية ومشروبات','Logistics':'لوجستيات',
      'Retail & eCommerce':'تجزئة وتجارة إلكترونية','Hospitality':'ضيافة وفنادق',
      'Government':'حكومة وقطاع عام','Non-profit':'منظمات غير ربحية',
      'Real Estate':'عقارات','Services':'خدمات',
    };
    document.querySelectorAll('.proj-cat').forEach(el => {
      const orig = el.textContent.trim();
      if (AR && catMap[orig]) el.textContent = catMap[orig];
      else if (!AR) {
        const rev = Object.fromEntries(Object.entries(catMap).map(([k,v])=>[v,k]));
        if (rev[orig]) el.textContent = rev[orig];
      }
    });

    /* ── NEXA OFFICES ADDR ── */
    const officeAddrs = document.querySelectorAll('.nx-office-addr');
    if (officeAddrs[0]) tH(officeAddrs[0],
      'Level 28, Kingdom Centre<br>King Fahd Road, Al Olaya<br>+966 11 503 0255',
      AR ? 'الطابق 28، مركز المملكة<br>طريق الملك فهد، العليا<br>+966 11 503 0255'
         : 'Level 28, Kingdom Centre<br>King Fahd Road, Al Olaya<br>+966 11 503 0255');
    if (officeAddrs[1]) tH(officeAddrs[1],
      '33 Capital Mall, 2nd Floor<br>5th Settlement, New Cairo<br>+20 104 049 6174',
      AR ? '33 كابيتال مول، الدور الثاني<br>التجمع الخامس، القاهرة الجديدة<br>+20 104 049 6174'
         : '33 Capital Mall, 2nd Floor<br>5th Settlement, New Cairo<br>+20 104 049 6174');

    /* ── CONTACT location val ── */
    const cVals = document.querySelectorAll('.c-val');
    cVals.forEach(v => {
      if(v.textContent.trim() === 'Kirdasa, Giza, Egypt') t(v,'Kirdasa, Giza, Egypt',AR?'كرداسة، الجيزة، مصر':'Kirdasa, Giza, Egypt');
    });

    /* ── FORM SELECT OPTIONS ── */
    const svcOpts = document.querySelectorAll('#cf-service option');
    [['Select a service...','اختر الخدمة...'],
     ['Odoo ERP Full Implementation','تطبيق أودو ERP كامل'],
     ['ERP Consulting & GAP Analysis','استشارات ERP وتحليل الفجوات'],
     ['Financial Management Consulting','استشارات الإدارة المالية'],
     ['ERP Customization & Integration','تخصيص وتكامل ERP'],
     ['Data Migration & Upgrade','ترحيل وترقية البيانات'],
     ['Training & Post-Go-Live Support','التدريب والدعم بعد التشغيل'],
     ['Business Process Optimization','تحسين العمليات التجارية'],
     ['Other','أخرى']]
      .forEach(([en,ar],i) => { if(svcOpts[i]) t(svcOpts[i], en, ar); });

    /* ── NEXA INDUSTRIES ── */
    const nxIndSpans = document.querySelectorAll('.nx-ind span');
    const nxIndMap = {
      'Manufacturing':'تصنيع','Construction':'بناء ومقاولات',
      'Real Estate':'عقارات','E-commerce':'تجارة إلكترونية',
      'Retail':'تجزئة','Restaurants':'مطاعم','Healthcare':'رعاية صحية',
      'Logistics':'لوجستيات','HR Services':'خدمات موارد بشرية',
    };
    nxIndSpans.forEach(sp => {
      if (AR && nxIndMap[sp.textContent.trim()]) sp.textContent = nxIndMap[sp.textContent.trim()];
      else if (!AR) {
        const rev = Object.fromEntries(Object.entries(nxIndMap).map(([k,v])=>[v,k]));
        if (rev[sp.textContent.trim()]) sp.textContent = rev[sp.textContent.trim()];
      }
    });

    /* ── ROI CALCULATOR ── */
    // Header
    const roiTag = document.querySelector('.roi-tag');
    if (roiTag) roiTag.textContent = AR
      ? '💰 حاسبة العائد على الاستثمار · مبنية على بيانات 79+ مشروع حقيقي'
      : '💰 Odoo ROI Calculator · مبني على بيانات 79+ مشروع حقيقي';
    const roiTitle = document.querySelector('.roi-title');
    if (roiTitle) roiTitle.innerHTML = AR
      ? 'احسب <span>عائدك الحقيقي</span> من أودو'
      : 'Calculate Your <span>Real Odoo ROI</span>';
    const roiSub = document.querySelector('.roi-sub');
    if (roiSub) roiSub.textContent = AR
      ? 'مبنية على منهجية تحليل ROI الرسمية من أودو — نفس الأداة المستخدمة مع العملاء الحقيقيين. اختر أقسامك وملفك التجاري للحصول على تقدير دقيق.'
      : 'Based on Odoo\'s official ROI Analysis methodology — the same tool used with real clients. Select your departments and business profile to get an accurate projection.';

    // Step tabs
    const roiTab1 = document.getElementById('roiTab1');
    const roiTab2 = document.getElementById('roiTab2');
    const roiTab3 = document.getElementById('roiTab3');
    if (roiTab1) roiTab1.innerHTML = AR ? '<span>👤</span>الملف' : '<span>👤</span>Profile';
    if (roiTab2) roiTab2.innerHTML = AR ? '<span>🏢</span>الأقسام' : '<span>🏢</span>Departments';
    if (roiTab3) roiTab3.innerHTML = AR ? '<span>📊</span>الاستثمار' : '<span>📊</span>Investment';
    const roiTab4 = document.getElementById('roiTab4');
    if (roiTab4) roiTab4.innerHTML = AR ? '<span>🌍</span>اشتراك أودو' : '<span>🌍</span>Odoo Subscription';
    // Apply data-en / data-ar to all new Tab 4 elements
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.textContent = AR ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
    // Update specific Tab 4 labels
    const countryInfo = document.getElementById('subCountryInfo');
    if (countryInfo && AR) countryInfo.setAttribute('dir','rtl');

    // Industry sector label
    const roiIndustryLbl = document.querySelector('#roiPanel1 .roi-input-group:first-child .roi-lbl');
    if (roiIndustryLbl) roiIndustryLbl.textContent = AR ? '🏭 القطاع الصناعي' : '🏭 Industry Sector';
    const roiIndustrySubLbl = document.querySelector('#roiPanel1 .roi-input-group:first-child .roi-label-row span:last-child');
    if (roiIndustrySubLbl && roiIndustrySubLbl.textContent.includes('affects')) {
      roiIndustrySubLbl.textContent = AR ? 'يؤثر على معامل الكفاءة' : 'affects efficiency multiplier';
    }

    // Industry pills
    const indPillMap = {
      '🏢 General Business':'🏢 أعمال عامة',
      '🏭 Manufacturing':'🏭 التصنيع',
      '🏗️ Construction':'🏗️ البناء',
      '🛍️ Retail & F&B':'🛍️ التجزئة والمطاعم',
      '🚛 Logistics':'🚛 اللوجستيات',
      '💼 Services':'💼 الخدمات',
      '🏢 Real Estate':'🏢 العقارات',
      '📦 Trading & Dist.':'📦 التجارة والتوزيع',
      '🏥 Healthcare':'🏥 الرعاية الصحية',
    };
    document.querySelectorAll('.roi-ind-btn').forEach(btn => {
      const txt = btn.textContent.trim();
      if (AR && indPillMap[txt]) btn.textContent = indPillMap[txt];
      else if (!AR) {
        const rev = Object.fromEntries(Object.entries(indPillMap).map(([k,v])=>[v,k]));
        if (rev[txt]) btn.textContent = rev[txt];
      }
    });

    // Efficiency multiplier label
    const effSpan = document.querySelector('#roiIndustryBadge span:first-child');
    if (effSpan) effSpan.textContent = AR ? 'معامل الكفاءة:' : 'Efficiency multiplier:';
    const effDesc = document.getElementById('roiIndustryDesc');
    if (effDesc) effDesc.textContent = AR ? 'خط الأساس القياسي لعائد الاستثمار من أودو' : 'Standard Odoo ROI baseline';

    // Profile input labels
    const roiLbls = document.querySelectorAll('.roi-lbl');
    [['👥 Total Employees','👥 إجمالي الموظفين'],
     ['💵 Avg. Annual Salary / Employee (USD)','💵 متوسط الراتب السنوي / موظف (USD)'],
     ['📦 Annual Revenue (USD)','📦 الإيرادات السنوية (USD)'],
     ['💾 Current Software Annual Cost','💾 التكلفة السنوية للبرمجيات الحالية'],
     ['🔧 Implementation Budget (USD)','🔧 ميزانية التطبيق (USD)'],
     ['📱 Odoo Plan (Auto-Calculated)','📱 خطة أودو (محسوبة تلقائياً)'],
     ['🛠️ Annual Support / Consulting','🛠️ الدعم والاستشارة السنوية'],
     ['🧑‍💼 Internal Staff Time (USD equiv.)','🧑‍💼 وقت الفريق الداخلي (مكافئ USD)'],
    ].forEach(([en,ar]) => {
      roiLbls.forEach(lbl => {
        if (lbl.textContent.trim() === (AR ? en : ar)) lbl.textContent = AR ? ar : en;
        else if (lbl.textContent.trim() === en && AR) lbl.textContent = ar;
        else if (lbl.textContent.trim() === ar && !AR) lbl.textContent = en;
      });
    });

    // Tab navigation buttons (Next/Back)
    document.querySelectorAll('#roiPanel1 button, #roiPanel2 button, #roiPanel3 button').forEach(btn => {
      const txt = btn.textContent.trim();
      if (txt === 'Next: Select Departments →') btn.textContent = AR ? 'التالي: اختر الأقسام ←' : 'Next: Select Departments →';
      else if (txt === 'Next: Set Investment →') btn.textContent = AR ? 'التالي: حدد الاستثمار ←' : 'Next: Set Investment →';
      else if (txt === '← Back to Profile') btn.textContent = AR ? 'رجوع إلى الملف →' : '← Back to Profile';
      else if (txt.includes('التالي: اختر') && !AR) btn.textContent = 'Next: Select Departments →';
      else if (txt.includes('التالي: حدد') && !AR) btn.textContent = 'Next: Set Investment →';
      else if (txt.includes('رجوع إلى') && !AR) btn.textContent = '← Back to Profile';
    });

    // Departments panel description
    const deptDesc = document.querySelector('#roiPanel2 > p');
    if (deptDesc) deptDesc.textContent = AR
      ? 'اختر الأقسام التي سيغطيها أودو. معدلات الكفاءة مستخرجة من قياسات حقيقية لعملاء أودو.'
      : 'Select the departments Odoo will cover. Efficiency rates are from real Odoo client benchmarks.';

    // Results section
    const roiSavLbl = document.querySelector('.roi-result-lbl');
    if (roiSavLbl) roiSavLbl.textContent = AR ? 'التوفير السنوي المتوقع' : 'Estimated Annual Savings';

    const roiSublineEl = document.getElementById('roiSubline');
    if (roiSublineEl) {
      const txt = roiSublineEl.textContent.trim();
      if (txt === 'Select departments to calculate' || txt === 'اختر الأقسام للحساب')
        roiSublineEl.textContent = AR ? 'اختر الأقسام للحساب' : 'Select departments to calculate';
    }
    const roiDeptPlaceholder = document.getElementById('roiDeptSavingsPlaceholder');
    if (roiDeptPlaceholder) roiDeptPlaceholder.textContent = AR ? 'اختر الأقسام في التبويب 2' : 'Select departments in Tab 2';

    // Savings by department label
    document.querySelectorAll('.roi-result-card [style*="uppercase"]').forEach(el => {
      if (el.textContent.includes('Savings by') || el.textContent.includes('التوفير حسب'))
        el.textContent = AR ? 'التوفير حسب القسم' : 'Savings by Department';
    });

    // Key metrics labels — rebuild innerHTML cleanly to avoid partial-text matching bugs
    const bkPaybackRow = document.querySelector('.roi-bk-row:nth-child(1) .roi-bk-lbl');
    const bkRoi3Row    = document.querySelector('.roi-bk-row:nth-child(2) .roi-bk-lbl');
    const bkNet3Row    = document.querySelector('.roi-bk-row:nth-child(3) .roi-bk-lbl');
    const bkSwRow      = document.querySelector('.roi-bk-row:nth-child(4) .roi-bk-lbl');
    if (bkPaybackRow) bkPaybackRow.innerHTML = AR
      ? '<span class="roi-bk-icon">⏱️</span>فترة الاسترداد <span style="font-size:10px;color:rgba(255,255,255,.62);font-weight:400;">(سؤال المدير المالي الأول)</span>'
      : '<span class="roi-bk-icon">⏱️</span>Payback Period <span style="font-size:10px;color:rgba(255,255,255,.62);font-weight:400;">(CFO #1 question)</span>';
    if (bkRoi3Row)    bkRoi3Row.innerHTML    = AR ? '<span class="roi-bk-icon">📈</span>عائد الاستثمار 3 سنوات' : '<span class="roi-bk-icon">📈</span>3-Year ROI';
    if (bkNet3Row)    bkNet3Row.innerHTML    = AR ? '<span class="roi-bk-icon">💰</span>صافي القيمة (س1–س3)' : '<span class="roi-bk-icon">💰</span>Net Value (Y1–Y3)';
    if (bkSwRow)      bkSwRow.innerHTML      = AR ? '<span class="roi-bk-icon">🔄</span>توفير تكلفة البرمجيات' : '<span class="roi-bk-icon">🔄</span>Software Cost Savings';

    // 5-year chart label
    const chart5yrLbl = document.querySelector('.roi-result-card > div:nth-child(4) > div:first-child');
    if (chart5yrLbl && (chart5yrLbl.textContent.includes('5-Year') || chart5yrLbl.textContent.includes('5 سنوات')))
      chart5yrLbl.textContent = AR ? 'صافي التدفق النقدي التراكمي — 5 سنوات' : '5-Year Cumulative Net Cash Flow';

    // ROI CTA buttons
    const roiCtaMain = document.querySelectorAll('.roi-cta-main');
    roiCtaMain.forEach(btn => {
      if (btn.textContent.includes('Get My Free ERP ROI Assessment') || btn.textContent.includes('تقييم مجاني')) {
        btn.textContent = AR ? '📅 احصل على تقييم ROI مجاني لـ ERP' : '📅 Get My Free ERP ROI Assessment';
      } else if (btn.textContent.includes('Email Full ROI Report') || btn.textContent.includes('إرسال تقرير')) {
        btn.textContent = AR ? '📧 إرسال تقرير ROI الكامل للعميل' : '📧 Email Full ROI Report to Customer';
      }
    });
    const roiCtaSec = document.querySelector('.roi-cta-sec');
    if (roiCtaSec) roiCtaSec.textContent = AR
      ? '💬 ناقش التحليل الكامل على واتساب'
      : '💬 Discuss Full Analysis on WhatsApp';
    const roiDisclaimer = document.querySelector('.roi-disclaimer');
    if (roiDisclaimer) roiDisclaimer.textContent = AR
      ? '* المنهجية مستندة إلى قالب تحليل ROI الرسمي من أودو. معدلات الكفاءة مقاسة عبر 79+ تطبيق حقيقي من نيكسا تكنولوجي. النتائج تتفاوت بحسب النطاق والتعقيد.'
      : '* Methodology from Odoo\'s official ROI Analysis Template. Efficiency rates benchmarked across 79+ real implementations by Nexa Solutions. Results vary by scope and complexity.';

    /* ── ROI DEPARTMENT GRID — rebuild with correct language ── */
    if (typeof roiBuildDeptGrid === 'function') roiBuildDeptGrid();
    if (typeof roiCalc === 'function') roiCalc();

    /* ── RECOMMENDATIONS MODAL ── */
    const recModalTitle = document.querySelector('#recModal .full-modal-title');
    if (recModalTitle) recModalTitle.innerHTML = AR
      ? '30+ <span>توصية مهنية</span>'
      : '30+ <span>Professional Recommendations</span>';
    const recModalTag = document.querySelector('#recModal .full-modal-tag');
    if (recModalTag) recModalTag.textContent = AR ? 'توصيات LinkedIn' : 'LinkedIn Recommendations';

    // Recommendations categories filter
    if (typeof REC_CATEGORIES !== 'undefined') {
      const catLabelsAr = { all:'الكل', odoo:'أودو / ERP', finance:'المالية', pm:'إدارة المشاريع', client:'العملاء' };
      document.querySelectorAll('.recs-filter-btn').forEach(btn => {
        const cat = btn.dataset.cat;
        if (cat && catLabelsAr[cat]) {
          const icon = btn.textContent.trim().split(' ')[0];
          btn.innerHTML = AR
            ? `${icon} ${catLabelsAr[cat]}`
            : `${REC_CATEGORIES[cat]?.icon || icon} ${REC_CATEGORIES[cat]?.label || catLabelsAr[cat]}`;
        }
      });
    }

    /* ── MOBILE DRAWER (dynamically built) ── */
    const mobDrawerBrand = document.querySelector('#mobDrawer .mob-drawer-brand > div > div:first-child');
    if (mobDrawerBrand) mobDrawerBrand.textContent = AR ? 'محمد أبوعميرة' : 'Mohamed Abu Emira';
    const mobDrawerSub = document.querySelector('#mobDrawer .mob-drawer-brand > div > div:last-child');
    if (mobDrawerSub) mobDrawerSub.textContent = AR ? 'الرئيس التنفيذي للعمليات @ نيكسا تكنولوجي' : 'COO @ Nexa Solutions';

    const mobNavLabelMap = {
      'ROI Calc':'حاسبة ROI','About':'عنّي','Nexa':'نيكسا',
      'Services':'الخدمات','Experience':'الخبرة','Projects':'المشاريع',
      'Clients':'عملاؤنا','Reviews':'آراء العملاء','Certifications':'الشهادات','Contact':'تواصل',
      // Reverse
      'حاسبة ROI':'ROI Calc','عنّي':'About','نيكسا':'Nexa',
      'الخدمات':'Services','الخبرة':'Experience','المشاريع':'Projects',
      'عملاؤنا':'Clients','آراء العملاء':'Reviews','الشهادات':'Certifications','تواصل':'Contact',
    };
    document.querySelectorAll('#mobDrawer .mob-drawer-nav a').forEach(a => {
      const icon = a.querySelector('.mob-nav-icon');
      if (!icon) return;
      const labelNode = [...a.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (labelNode) {
        const cur = labelNode.textContent.trim();
        if (AR && mobNavLabelMap[cur]) labelNode.textContent = mobNavLabelMap[cur];
        else if (!AR && mobNavLabelMap[cur]) labelNode.textContent = mobNavLabelMap[cur];
      }
    });

    const mobCta = document.querySelector('#mobDrawer .mob-drawer-cta');
    if (mobCta) mobCta.textContent = AR ? '📅 احجز استشارة مجانية' : '📅 Book Free Consultation';

    /* ── FOOTER V2 ── */
    const fv2ColTitles = document.querySelectorAll('.fv2-col-title');
    [['Quick Links','روابط سريعة'],['Navigate','تصفح'],['Services','الخدمات'],['Get In Touch','تواصل معنا']]
      .forEach(([en,ar],i) => { if(fv2ColTitles[i]) t(fv2ColTitles[i], en, ar); });

    // Footer navigation links
    const fv2Links = document.querySelectorAll('.fv2-links a');
    const fv2LinkMap = {
      'About Me':'عنّي','Nexa Solutions Section':'قسم نيكسا','Services':'الخدمات',
      'Experience':'الخبرة','Projects':'المشاريع','Clients':'عملاؤنا',
      'Testimonials':'التوصيات','Contact':'تواصل','Certifications':'الشهادات',
      'ROI Calculator':'حاسبة ROI','Blog':'المقالات',
      'Odoo Implementation':'تطبيق أودو ERP','ERP Project Management':'إدارة مشاريع ERP',
      'Business Analysis & GAP':'تحليل الأعمال والفجوات','Data Migration':'ترحيل البيانات',
      'Financial Module Setup':'إعداد الوحدة المالية','Post Go-Live Support':'الدعم بعد التشغيل',
      'Odoo Training':'تدريب أودو',
    };
    fv2Links.forEach(a => {
      const txt = a.textContent.trim().replace(' ↗','');
      if (AR && fv2LinkMap[txt]) a.textContent = fv2LinkMap[txt] + (a.textContent.includes('↗') ? ' ↗' : '');
    });

    // Footer contact labels
    const fv2ContactLbls = document.querySelectorAll('.fv2-contact-lbl');
    [['Phone / WhatsApp','الهاتف / واتساب'],['Email','البريد الإلكتروني'],
     ['Location','الموقع'],['Portfolio','الملف المهني']]
      .forEach(([en,ar],i) => { if(fv2ContactLbls[i]) t(fv2ContactLbls[i], en, ar); });

    const fv2LocationVal = document.querySelector('.fv2-contact-val');
    const fv2Vals = document.querySelectorAll('.fv2-contact-val');
    fv2Vals.forEach(v => {
      if (v.textContent.trim() === 'Giza, Egypt · Serving Egypt & GCC')
        t(v, 'Giza, Egypt · Serving Egypt & GCC', AR ? 'الجيزة، مصر · أخدم مصر والخليج' : 'Giza, Egypt · Serving Egypt & GCC');
    });

    // Footer CTA button
    const fv2Cta = document.querySelector('.fv2-footer-top .btn-gold, footer .btn-gold');
    if (fv2Cta) t(fv2Cta, '📅 Book Free Consultation', AR ? '📅 احجز استشارة مجانية' : '📅 Book Free Consultation');

    // Footer copyright
    const fv2Copyright = document.querySelector('.fv2-copyright');
    if (fv2Copyright) fv2Copyright.textContent = AR
      ? '© 2026 محمد عصام أبو عميرة · الرئيس التنفيذي للعمليات ومؤسس مشارك، نيكسا تكنولوجي · جميع الحقوق محفوظة'
      : '© 2026 Mohamed Essam Abu Emira · COO & Co-Founder, Nexa Solutions · All rights reserved';

    // Footer bottom links
    const fv2BottomLinks = document.querySelectorAll('.fv2-bottom-links a');
    [['LinkedIn','لينكد إن'],['Nexa Solutions','نيكسا تكنولوجي'],['ROI Calculator','حاسبة ROI'],['Contact','تواصل']]
      .forEach(([en,ar],i) => { if(fv2BottomLinks[i]) t(fv2BottomLinks[i], en, ar); });

    /* ── SCROLL INDICATOR ── */
    const scrollInd = document.querySelector('.scroll-indicator');
    if (scrollInd) {
      const scrollTxt = [...scrollInd.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (scrollTxt) scrollTxt.textContent = AR ? 'مرر للأسفل' : 'SCROLL';
    }

    /* ── AVAILABILITY BADGE ── */
    const availBadge = document.querySelector('.avail-badge');
    if (availBadge) {
      const dot = availBadge.querySelector('.avail-dot');
      if (dot) {
        const textNode = [...availBadge.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
        if (textNode) textNode.textContent = AR ? ' متاح للمشاريع الجديدة' : ' Available for New Projects';
      }
    }

    /* ── CLIENTS SECTION ── */
    // TODO: "Trusted by 50+ organizations" here vs "Trusted by 79+ Businesses" in the section title — confirm one client count.
    const clientsSub = document.querySelector('#clients .container > p');
    if (clientsSub) t(clientsSub,
      'Trusted by 50+ organizations across Egypt, Saudi Arabia, UAE, Kuwait, Lebanon and Qatar — from SMEs to government institutions and enterprise groups.',
      AR ? 'موثوق به من قِبَل 50+ مؤسسة في مصر والمملكة العربية السعودية والإمارات والكويت ولبنان وقطر — من الشركات الصغيرة إلى المؤسسات الحكومية والمجموعات الكبرى.'
         : 'Trusted by 50+ organizations across Egypt, Saudi Arabia, UAE, Kuwait, Lebanon and Qatar — from SMEs to government institutions and enterprise groups.');

    /* ── ROI EMAIL MODAL ── */
    const roiEmailTitle = document.getElementById('roiEmailModalTitle');
    if (roiEmailTitle) roiEmailTitle.textContent = AR ? '📧 إرسال تقرير ROI للعميل' : '📧 Send ROI Report to Client';

    /* ── ROI REPORT SECTION ── */
    // Section tag & title
    const roiRptTag = document.querySelector('#roi-report .sec-tag');
    if (roiRptTag) roiRptTag.textContent = AR ? '📄 تقرير تحليل العائد على الاستثمار' : '📄 ROI Analysis Report';
    const roiRptTitle = document.querySelector('#roi-report .sec-title');
    if (roiRptTitle) roiRptTitle.innerHTML = AR ? 'تقرير <span>ROI</span> أودو ERP' : 'Odoo ERP <span>ROI Report</span>';
    const roiRptIntro = document.querySelector('#roi-report .container > p');
    if (roiRptIntro) roiRptIntro.textContent = AR
      ? 'تحليل شامل ومبني على بيانات حقيقية لعائد الاستثمار من أودو ERP — مستخرج من 79+ تطبيق في مصر والخليج. استخدم الحاسبة أعلاه لتخصيص هذا التقرير ثم أرسله مباشرة لعميلك.'
      : 'A comprehensive, data-backed Return on Investment analysis for Odoo ERP — based on 79+ real implementations across Egypt & GCC. Use the calculator above to personalise this report, then email it directly to your customer.';

    // Report card header
    const roiRptH3 = document.querySelector('.roi-report-title-box h3');
    if (roiRptH3) roiRptH3.textContent = AR
      ? 'أودو ERP — تحليل العائد على الاستثمار'
      : 'Odoo ERP — Return on Investment Analysis';
    const roiRptSubP = document.querySelector('.roi-report-title-box p');
    if (roiRptSubP) roiRptSubP.textContent = AR
      ? 'أُعِدَّ بواسطة نيكسا تكنولوجي · محمد عصام أبو عميرة، الرئيس التنفيذي للعمليات ومدير مشاريع أودو'
      : 'Prepared by Nexa Solutions · Mohamed Essam Abu Emira, COO & Odoo Project Manager';

    // Meta pills
    const metaPills = document.querySelectorAll('.roi-report-meta-pill');
    metaPills.forEach(pill => {
      const txt = pill.textContent.trim();
      if (txt.includes('Based on 79')) pill.innerHTML = AR ? '🏢 مبني على 79+ مشروع حقيقي' : '🏢 Based on 79+ Live Projects';
      else if (txt.includes('Egypt') && txt.includes('GCC')) pill.innerHTML = AR ? '🌍 مصر ومنطقة الخليج' : '🌍 Egypt & GCC Region';
      else if (txt.includes('Odoo Official')) pill.innerHTML = AR ? '✅ المنهجية الرسمية لأودو' : '✅ Odoo Official Methodology';
    });

    // Executive summary — use IDs for reliability
    const execH4 = document.getElementById('execSummaryH4');
    if (execH4) execH4.textContent = AR ? '📋 الملخص التنفيذي' : '📋 Executive Summary';
    const execP = document.getElementById('execSummaryP');
    if (execP) execP.innerHTML = AR
      ? 'يحقق أودو ERP عائداً متراكماً وقابلاً للقياس بتوحيد الأنظمة المتفرقة في منصة واحدة متكاملة. عبر 79+ تطبيقاً أدارتها نيكسا تكنولوجي، حقق العملاء في التصنيع والتجارة والتجزئة والمقاولات والخدمات <strong>مكاسب كفاءة بين 15%–60%</strong> لكل قسم خلال السنة الأولى. متوسط فترة الاسترداد <strong>12–18 شهراً</strong>، مع عائد استثمار لثلاث سنوات يتراوح بين <strong>180% و420%</strong> تبعاً لحجم الشركة وعدد المستخدمين والوحدات المُطبَّقة. الطبيعة مفتوحة المصدر لأودو تُلغي رسوم الترخيص لكل وحدة، مما يُقلّص تكلفة الملكية الإجمالية بشكل جذري مقارنة بمنصات ERP التقليدية.'
      : 'Odoo ERP delivers measurable, compounding ROI by consolidating fragmented systems into a single integrated platform. Across 79+ implementations managed by Nexa Solutions, clients in manufacturing, trading, retail, construction, and services have achieved <strong>15%–60% efficiency gains</strong> per department within the first year. The average payback period is <strong>12–18 months</strong>, with a 3-year ROI ranging from <strong>180% to 420%</strong> depending on company size, number of users, and modules deployed. Odoo\'s open-source foundation eliminates per-module licensing fees, drastically reducing total cost of ownership versus legacy ERP platforms.';

    // KPI snapshot title
    const kpiSnapTitle = document.querySelector('.roi-report-section-title');
    if (kpiSnapTitle && (kpiSnapTitle.textContent.includes('Estimated ROI') || kpiSnapTitle.textContent.includes('لمحة عن')))
      kpiSnapTitle.textContent = AR ? '📈 لمحة عن عائد استثمارك المتوقع' : '📈 Your Estimated ROI Snapshot';

    // KPI labels
    const rptKpiLbls = document.querySelectorAll('.roi-report-kpi-l');
    [['Est. Annual Savings','التوفير السنوي المتوقع'],
     ['Payback Period','فترة الاسترداد'],
     ['3-Year ROI','عائد 3 سنوات'],
     ['Net Value Y1–Y3','صافي القيمة س1–س3']]
      .forEach(([en,ar],i) => { if(rptKpiLbls[i]) t(rptKpiLbls[i], en, ar); });

    // Calculator update note
    const calcNote = document.querySelector('#roi-report p[style*="gray-400"]');
    if (calcNote) calcNote.textContent = AR
      ? '↑ استخدم حاسبة ROI أعلاه وستتحدث هذه الأرقام تلقائياً.'
      : '↑ Use the ROI Calculator above and these figures will update automatically.';

    // Benefits section title
    const benefitsTitles = document.querySelectorAll('.roi-report-section-title');
    benefitsTitles.forEach(t2 => {
      if (t2.textContent.includes('Key Quantifiable') || t2.textContent.includes('الفوائد الرئيسية'))
        t2.textContent = AR ? '💡 الفوائد الرئيسية القابلة للقياس' : '💡 Key Quantifiable Benefits';
      if (t2.textContent.includes('5-Year Financial') || t2.textContent.includes('التوقعات المالية'))
        t2.textContent = AR ? '📅 التوقعات المالية لـ 5 سنوات (المتوسط الصناعي)' : '📅 5-Year Financial Projection (Industry Benchmark)';
      if (t2.textContent.includes('Key Success') || t2.textContent.includes('عوامل النجاح'))
        t2.textContent = AR ? '⚠️ عوامل النجاح الرئيسية والاعتبارات المهمة' : '⚠️ Key Success Factors & Considerations';
    });

    // Benefits cards
    const benefitData = [
      ['Inventory Optimisation',
       'Real-time stock visibility eliminates manual counts, reduces dead stock, and cuts warehouse labour. Automated replenishment prevents both stockouts and overstocking.',
       '↓ 21% FTE Time · ↓ 15–30% Inventory Cost',
       'تحسين إدارة المخزون',
       'الرؤية الفورية للمخزون تُلغي الجرد اليدوي وتُقلّل البضاعة الراكدة وتخفض تكلفة عمالة المستودعات. التجديد الآلي يمنع نفاد المخزون والتخزين الزائد.',
       '↓ 21% وقت الموظفين · ↓ 15–30% تكلفة المخزون'],
      ['Finance & Accounting Automation',
       'Automated bank reconciliation, e-invoicing (compliant with Egypt ITDA & KSA ZATCA), and real-time P&L eliminate month-end backlogs and manual errors.',
       '↓ 18.3% FTE Time · Month-close in <3 Days',
       'أتمتة المالية والمحاسبة',
       'المطابقة البنكية الآلية والفوترة الإلكترونية (متوافقة مع هيئة الضرائب في مصر وهيئة الزكاة في السعودية) والأرباح والخسائر الفورية تُنهي التراكمات الشهرية والأخطاء اليدوية.',
       '↓ 18.3% وقت الموظفين · إغلاق الشهر في أقل من 3 أيام'],
      ['Sales & CRM Acceleration',
       'Integrated CRM-to-invoice pipeline eliminates re-keying. Automated follow-ups and quotation templates shorten sales cycles and increase win rates.',
       '↓ 41% FTE Time · ↑ Lead Conversion Rate',
       'تسريع المبيعات وإدارة العملاء',
       'خط أنابيب متكامل من إدارة العملاء حتى الفاتورة يُلغي إعادة الإدخال. المتابعة الآلية وقوالب عروض الأسعار تُقصّر دورات البيع وترفع نسب الإغلاق.',
       '↓ 41% وقت الموظفين · ↑ معدل تحويل العملاء'],
      ['Purchase & Procurement Control',
       '3-way matching (PO, receipt, invoice), automated vendor RfQ, and approval workflows eliminate maverick spending and reduce procurement cycle time by up to 40%.',
       '↓ 27% FTE Time · ↓ 10–20% Procurement Cost',
       'ضبط المشتريات والتدبير',
       'المطابقة الثلاثية (أمر شراء، استلام، فاتورة) وطلبات العروض الآلية وسير موافقات يُلغيان الإنفاق غير المصرّح وخفضا وقت دورة المشتريات 40%.',
       '↓ 27% وقت الموظفين · ↓ 10–20% تكلفة المشتريات'],
      ['Manufacturing & Production',
       'BOM-driven production orders, real-time WIP tracking, and quality checkpoints reduce material waste, rework, and scrap rates significantly.',
       '↓ 11.8% FTE Time · ↓ 60% Waste (F&B)',
       'التصنيع والإنتاج',
       'أوامر إنتاج مستندة إلى قائمة المواد وتتبع مرحلة الإنتاج فورياً ونقاط مراقبة الجودة تُقلّل هدر المواد وإعادة التصنيع والخردة بشكل ملحوظ.',
       '↓ 11.8% وقت الموظفين · ↓ 60% هدر (غذاء ومشروبات)'],
      ['HR & Payroll Automation',
       'Integrated attendance, leave, and payroll processing eliminates manual salary computation, reduces payroll errors, and ensures statutory compliance across GCC jurisdictions.',
       '↓ 6% FTE Time · 100% Payroll Automation',
       'أتمتة الموارد البشرية والرواتب',
       'الحضور والإجازات ومعالجة الرواتب المتكاملة تُلغي احتساب الرواتب اليدوي وتُقلّل الأخطاء وتضمن الامتثال القانوني عبر دول الخليج.',
       '↓ 6% وقت الموظفين · 100% أتمتة الرواتب'],
      ['IT Consolidation & Cost Reduction',
       'Replacing 5–10 point solutions with one platform eliminates redundant SaaS licences, integration maintenance, and inter-system data errors — freeing IT budget for value-add work.',
       '↓ 40–70% Software Licence Spend',
       'توحيد تقنية المعلومات وخفض التكاليف',
       'استبدال 5–10 برامج منفصلة بمنصة واحدة يُلغي تراخيص SaaS المتكررة وتكلفة التكاملات والأخطاء بين الأنظمة — ويُحرّر ميزانية تقنية المعلومات لأعمال ذات قيمة.',
       '↓ 40–70% تكلفة تراخيص البرمجيات'],
      ['Real-Time Business Intelligence',
       'Live dashboards, scheduled reports, and drill-down analytics give management instant visibility into KPIs — enabling faster, data-driven decisions without waiting for manual reporting cycles.',
       'Reporting Time ↓ 45–80% · Live KPIs',
       'ذكاء الأعمال في الوقت الفعلي',
       'لوحات مؤشرات حية وتقارير مجدولة وتحليلات تفصيلية تمنح الإدارة رؤية فورية لمؤشرات الأداء — تُمكّن من قرارات أسرع مبنية على البيانات دون انتظار دورات التقارير اليدوية.',
       'وقت التقارير ↓ 45–80% · مؤشرات حية'],
    ];
    document.querySelectorAll('.roi-report-benefit').forEach((card, i) => {
      if (!benefitData[i]) return;
      const [enT,,enS,arT,arDesc,arS] = benefitData[i];
      const titleEl = card.querySelector('.roi-report-benefit-title');
      const descEl  = card.querySelector('.roi-report-benefit-desc');
      const statEl  = card.querySelector('.roi-report-benefit-stat');
      if (AR) {
        if (titleEl) titleEl.textContent = arT;
        if (descEl)  descEl.textContent  = arDesc;
        if (statEl)  statEl.textContent  = arS;
      } else {
        if (titleEl) titleEl.textContent = enT;
        if (descEl)  descEl.innerHTML    = benefitData[i][1];
        if (statEl)  statEl.textContent  = enS;
      }
    });

    // Timeline years
    const yrData = [
      ['Year 0','– Investment','Implementation + Licensing','السنة 0','– الاستثمار','التطبيق + الاشتراك'],
      ['Year 1','Break-Even','Savings offset costs','السنة 1','نقطة التعادل','التوفير يُعوّض التكاليف'],
      ['Year 2','+180%','Avg. cumulative ROI','السنة 2','+180%','متوسط العائد التراكمي'],
      ['Year 3','+300%','Compounding gains','السنة 3','+300%','مكاسب متراكمة'],
      ['Year 5','+500%','Full optimisation','السنة 5','+500%','تحسين مكتمل'],
    ];
    document.querySelectorAll('.roi-report-yr').forEach((yr, i) => {
      if (!yrData[i]) return;
      const lbl = yr.querySelector('.roi-report-yr-label');
      const val = yr.querySelector('.roi-report-yr-val');
      const sub = yr.querySelector('.roi-report-yr-sub');
      if (AR) {
        if (lbl) lbl.textContent = yrData[i][3];
        if (val) val.textContent = yrData[i][4];
        if (sub) sub.textContent = yrData[i][5];
      } else {
        if (lbl) lbl.textContent = yrData[i][0];
        if (val) val.textContent = yrData[i][1];
        if (sub) sub.textContent = yrData[i][2];
      }
    });

    // Challenges/Success factors
    const challengeData = [
      ['<strong>Scope Definition:</strong> A clear GAP/ROI Analysis before implementation reduces scope creep and protects ROI. This is why Nexa Solutions runs a structured ROI workshop as the first project phase — 80% of clients who complete it convert to full projects.',
       '<strong>تحديد النطاق:</strong> تحليل واضح للفجوات والعائد قبل التطبيق يُقلّل الزحف في النطاق ويحمي عائد الاستثمار. لذا تبدأ نيكسا تكنولوجي كل مشروع بورشة ROI منهجية — 80% من العملاء الذين يُكملونها يتحولون إلى مشاريع كاملة.'],
      ['<strong>Change Management:</strong> User adoption is the #1 ROI killer. Dedicated training, key-user programs, and post-go-live hypercare ensure the system is actually used — translating theoretical savings into real results.',
       '<strong>إدارة التغيير:</strong> تبني المستخدمين هو القاتل الأول لعائد الاستثمار. التدريب المتخصص وبرامج المستخدمين الرئيسيين والرعاية المكثفة بعد التشغيل تضمن استخدام النظام فعلياً — وتُحوّل التوفير النظري إلى نتائج حقيقية.'],
      ['<strong>Data Migration Quality:</strong> Clean historical data migration is critical. Budget adequate time for cleansing master data (customers, vendors, products) before go-live to avoid operational disruption.',
       '<strong>جودة ترحيل البيانات:</strong> ترحيل البيانات التاريخية بشكل نظيف أمر بالغ الأهمية. خصص وقتاً كافياً لتنظيف البيانات الرئيسية (العملاء، الموردون، المنتجات) قبل التشغيل تجنباً لأي اضطراب تشغيلي.'],
      ['<strong>Customisation Balance:</strong> Minimise custom development. Odoo\'s out-of-the-box functionality covers 80%+ of standard business processes. Excessive customisation inflates costs and complicates future upgrades.',
       '<strong>توازن التخصيص:</strong> قلّل التطوير المخصص. الوظائف الجاهزة في أودو تغطي 80%+ من العمليات التجارية القياسية. التخصيص المفرط يُضخّم التكاليف ويُعقّد الترقيات المستقبلية.'],
    ];
    document.querySelectorAll('.roi-report-challenge').forEach((ch, i) => {
      if (!challengeData[i]) return;
      const div = ch.querySelector('div');
      if (div) div.innerHTML = AR ? challengeData[i][1] : challengeData[i][0];
    });

    // Conclusion box
    const concBoxes = document.querySelectorAll('.roi-report-exec');
    if (concBoxes[1]) {
      const concH4 = concBoxes[1].querySelector('h4');
      const concP  = concBoxes[1].querySelector('p');
      if (concH4) concH4.textContent = AR ? '✅ الخلاصة والخطوة التالية' : '✅ Conclusion & Next Step';
      if (concP)  concP.textContent  = AR
        ? 'يُمثّل أودو ERP أحد أعلى استثمارات التكنولوجيا عائداً للشركات متوسطة الحجم اليوم. بتكاليف تطبيق أقل بـ 60–80% من SAP أو Oracle ومنصة موحّدة تحلّ محل عشرات البرامج المنفصلة، تبدو الحالة المالية مقنعة عبر كل القطاعات. قدّمت نيكسا تكنولوجي 79+ تطبيقاً ناجحاً بمعدل تحويل 80% من تحليل ROI إلى مشروع موقّع. نوصي بجدولة تقييم ROI مجاني لمدة 30 دقيقة لنُصمّم الأرقام المحددة لأعمالك.'
        : 'Odoo ERP represents one of the highest-ROI technology investments available to mid-market businesses today. With implementation costs 60–80% lower than SAP or Oracle, and a unified platform replacing dozens of point solutions, the financial case is compelling across every industry vertical. The Nexa Solutions team has delivered 79+ successful implementations with an 80% project conversion rate from ROI Analysis to signed project. We recommend scheduling a complimentary 30-minute ROI assessment to model the specific numbers for your business.';
    }

    // Email CTA below conclusion
    const emailCtaP = document.querySelector('#roi-report .roi-report-body > div:last-of-type > p');
    if (emailCtaP) t(emailCtaP,
      'Ready to share this analysis with your customer or management team?',
      AR ? 'هل أنت مستعد لمشاركة هذا التحليل مع عميلك أو فريق الإدارة؟' : 'Ready to share this analysis with your customer or management team?');
    const emailCtaBtn = document.querySelector('#roi-report .roi-report-body .btn-gold');
    if (emailCtaBtn) t(emailCtaBtn, '📧 Email Full ROI Report to Customer', AR ? '📧 إرسال تقرير ROI الكامل للعميل' : '📧 Email Full ROI Report to Customer');

    // Report footer
    const rptFtrStrong = document.querySelector('.roi-report-footer-text strong');
    if (rptFtrStrong) rptFtrStrong.textContent = AR
      ? 'محمد عصام أبو عميرة · الرئيس التنفيذي للعمليات ومؤسس مشارك، نيكسا تكنولوجي'
      : 'Mohamed Essam Abu Emira · COO & Co-Founder, Nexa Solutions';
    const rptFtrText = document.querySelector('.roi-report-footer-text');
    if (rptFtrText) {
      const textNode = [...rptFtrText.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (textNode) textNode.textContent = AR
        ? 'معتمد أودو 16·17·18 · معتمد إدارة المشاريع من جوجل · أفضل صوت ERP على لينكد إن · 79+ مشروع مُنجز'
        : 'Odoo 16·17·18 Certified · Google PM Certified · LinkedIn Top ERP Voice · 79+ Projects Delivered';
    }
    const rptFtrBtns = document.querySelectorAll('.roi-report-footer-btns a');
    if (rptFtrBtns[0]) t(rptFtrBtns[0], '📅 Book Free Consultation', AR ? '📅 احجز استشارة مجانية' : '📅 Book Free Consultation');
    if (rptFtrBtns[1]) t(rptFtrBtns[1], 'WhatsApp', AR ? 'واتساب' : 'WhatsApp');

    /* ── ROI EMAIL MODAL CONTENT ── */
    const emailModalH3 = document.querySelector('.roi-email-modal-hdr h3');
    if (emailModalH3) emailModalH3.textContent = AR ? '📧 إرسال تقرير ROI للعميل' : '📧 Email ROI Report to Customer';
    const emailModalSubP = document.querySelector('.roi-email-modal-hdr p');
    if (emailModalSubP) emailModalSubP.textContent = AR
      ? 'أنشئ وأرسل تقرير ROI مخصصاً لأودو ERP عبر البريد الإلكتروني'
      : 'Generate and send a personalised Odoo ERP ROI report via email';

    const emailFields = document.querySelectorAll('.roi-email-field label');
    [['Customer Name','اسم العميل'],['Customer Email','بريد العميل'],
     ['Company Name','اسم الشركة'],['Industry / Sector','القطاع الصناعي'],
     ['Personal Note (optional)','ملاحظة شخصية (اختيارية)']]
      .forEach(([en,ar],i) => { if(emailFields[i]) t(emailFields[i], en, ar); });

    const emailInputs = document.querySelectorAll('.roi-email-field input, .roi-email-field textarea');
    [['e.g. Ahmed Al-Rashidi','مثال: أحمد الراشدي'],
     ['customer@company.com','عميل@شركة.com'],
     ['e.g. Al-Rashidi Trading LLC','مثال: شركة الراشدي للتجارة'],
     ["e.g. 'Following our meeting today...'","مثال: 'بناءً على اجتماعنا اليوم...'"]]
      .forEach(([en,ar],i) => { if(emailInputs[i]) tp(emailInputs[i], en, ar); });

    const emailIndustrySel = document.getElementById('emailIndustry');
    if (emailIndustrySel) {
      const opts = emailIndustrySel.options;
      [['General Business','أعمال عامة'],['Manufacturing','تصنيع'],
       ['Trading & Distribution','تجارة وتوزيع'],['Food & Beverage','أغذية ومشروبات'],
       ['Retail & E-Commerce','تجزئة وتجارة إلكترونية'],['Construction & Real Estate','مقاولات وعقارات'],
       ['Healthcare & Pharma','رعاية صحية وصيدلة'],['Logistics & Transport','لوجستيات ونقل'],
       ['Services & Consulting','خدمات واستشارات']]
        .forEach(([en,ar],i) => { if(opts[i]) opts[i].text = AR ? ar : en; });
    }

    const previewToggle = document.querySelector('.roi-email-preview-toggle');
    if (previewToggle) previewToggle.textContent = AR ? '👁 معاينة محتوى البريد' : '👁 Preview Email Content';
    const emailSendBtn = document.getElementById('roiEmailSendBtn');
    if (emailSendBtn && !emailSendBtn.disabled) t(emailSendBtn, '📧 Send ROI Report', AR ? '📧 إرسال تقرير ROI' : '📧 Send ROI Report');
    const emailNote = document.querySelector('.roi-email-note');
    if (emailNote) emailNote.textContent = AR
      ? 'سيُرسَل التقرير عبر Formspree إلى عنوان بريد العميل. نسخة تُرسَل إلى abuemira@nexa-solutions.com.'
      : 'The report will be sent via Formspree to the customer email address. A copy is forwarded to abuemira@nexa-solutions.com.';

    const emailSuccessH4 = document.querySelector('.roi-email-success h4');
    if (emailSuccessH4) emailSuccessH4.textContent = AR ? 'تم الإرسال بنجاح!' : 'Report Sent Successfully!';
    const emailSuccessP = document.getElementById('roiEmailSuccessMsg');
    if (emailSuccessP) emailSuccessP.textContent = AR ? 'تم إرسال تقرير ROI بالبريد الإلكتروني إلى عميلك.' : 'The ROI report has been emailed to your customer.';
    const emailCloseBtn = document.querySelector('.roi-email-success button');
    if (emailCloseBtn) emailCloseBtn.textContent = AR ? 'إغلاق' : 'Close';

    /* ── TAB 4: ODOO SUBSCRIPTION ── */
    // Panel header
    const subPanelHeader = document.querySelector('#roiPanel4 > div:first-child div:first-child');
    if (subPanelHeader && (subPanelHeader.textContent.includes('Odoo Subscription') || subPanelHeader.textContent.includes('اشتراك أودو')))
      subPanelHeader.textContent = AR ? '🌍 اشتراك أودو وتكلفة التطبيق' : '🌍 Odoo Subscription & Implementation Cost';
    const subPanelSub = document.querySelector('#roiPanel4 > div:first-child div:last-child');
    if (subPanelSub && (subPanelSub.textContent.includes('Official') || subPanelSub.textContent.includes('رسمي')))
      subPanelSub.textContent = AR ? 'تسعير Odoo.com الرسمي · حسب الدولة · الاستضافة مشمولة · باقات النجاح' : 'Official Odoo.com pricing · Country-adjusted · Hosting included · Success Packs';

    // Country / Region label
    const subCountryLbl = document.querySelector('#subCountry')?.closest('.roi-input-group')?.querySelector('.roi-lbl');
    if (subCountryLbl) subCountryLbl.textContent = AR ? '🌐 الدولة / المنطقة' : '🌐 Country / Region';

    // Country dropdown options
    const subCountryEl = document.getElementById('subCountry');
    if (subCountryEl) {
      const countryMap = [
        ['EG','🇪🇬 Egypt (EGP)','🇪🇬 مصر (جنيه مصري)'],
        ['SA','🇸🇦 Saudi Arabia (SAR)','🇸🇦 السعودية (ريال)'],
        ['AE','🇦🇪 UAE (AED)','🇦🇪 الإمارات (درهم)'],
        ['KW','🇰🇼 Kuwait (KWD)','🇰🇼 الكويت (دينار)'],
        ['QA','🇶🇦 Qatar (QAR)','🇶🇦 قطر (ريال)'],
        ['BH','🇧🇭 Bahrain (BHD)','🇧🇭 البحرين (دينار)'],
        ['OM','🇴🇲 Oman (OMR)','🇴🇲 عُمان (ريال)'],
        ['JO','🇯🇴 Jordan (JOD)','🇯🇴 الأردن (دينار)'],
        ['MA','🇲🇦 Morocco (MAD)','🇲🇦 المغرب (درهم)'],
        ['US','🇺🇸 United States (USD)','🇺🇸 الولايات المتحدة (دولار)'],
        ['GB','🇬🇧 United Kingdom (GBP)','🇬🇧 المملكة المتحدة (جنيه)'],
        ['EU','🇪🇺 Europe (EUR)','🇪🇺 أوروبا (يورو)'],
        ['OTHER','🌐 Other (USD)','🌐 منطقة أخرى (دولار)'],
      ];
      Array.from(subCountryEl.options).forEach(opt => {
        const row = countryMap.find(r => r[0] === opt.value);
        if (row) opt.text = AR ? row[2] : row[1];
      });
    }

    // Odoo Plan label
    const subPlanLbl = document.querySelector('#subPlanBtns')?.closest('.roi-input-group')?.querySelector('.roi-lbl');
    if (subPlanLbl) subPlanLbl.textContent = AR ? '📦 خطة أودو' : '📦 Odoo Plan';

    // Plan buttons
    const subPlanFreeBtn = document.getElementById('subPlanFree');
    if (subPlanFreeBtn) subPlanFreeBtn.innerHTML = AR ? '🆓 مجانية<br><span style="font-size:9px;opacity:.6">تطبيق واحد · غير محدود</span>' : '🆓 Free<br><span style="font-size:9px;opacity:.6">1 App · Unlimited</span>';
    const subPlanStdBtn = document.getElementById('subPlanStd');
    if (subPlanStdBtn) { const priceSpan = subPlanStdBtn.querySelector('span'); if (priceSpan) { subPlanStdBtn.childNodes[0].textContent = AR ? '⭐ ستاندرد' : '⭐ Standard'; } }
    const subPlanCusBtn = document.getElementById('subPlanCustom');
    if (subPlanCusBtn) { const priceSpan = subPlanCusBtn.querySelector('span'); if (priceSpan) { subPlanCusBtn.childNodes[0].textContent = AR ? '🔧 مخصص' : '🔧 Custom'; } }

    // Middle East pricelist note
    const subPricelistNote = document.getElementById('subPricelistNote');
    if (subPricelistNote) subPricelistNote.textContent = AR ? '📌 قائمة أسعار الشرق الأوسط · المصدر: oec.sh' : '📌 Middle East pricelist · source: oec.sh';

    // Backend Users label
    const subUsersLbl = document.querySelector('#subUsers')?.closest('.roi-input-group')?.querySelector('.roi-lbl');
    if (subUsersLbl) subUsersLbl.textContent = AR ? '👥 المستخدمون' : '👥 Backend Users';

    // Nexa impl hint (Tab 3)
    const roiImplHint = document.getElementById('roiImplHint');
    if (roiImplHint) roiImplHint.innerHTML = AR
      ? '💡 <strong style="color:var(--teal-mid)">تطبيق نيكسا أودو:</strong> عادةً <strong style="color:var(--gold)">8K–45K دولار</strong> حسب النطاق والوحدات — مقابل SAP بـ 150K–500K دولار+'
      : '💡 <strong style="color:var(--teal-mid)">Nexa Odoo Implementation:</strong> Typically <strong style="color:var(--gold)">$8K–$45K</strong> depending on scope &amp; modules — vs SAP $150K–$500K+';

    // Subscription sync box (Tab 3)
    const roiSubSyncInfo = document.getElementById('roiSubSyncInfo');
    if (roiSubSyncInfo) {
      const syncBadge = document.getElementById('roiSubSyncBadge');
      const syncText = roiSubSyncInfo.childNodes[0];
      if (syncText && syncText.nodeType === 3)
        roiSubSyncInfo.childNodes[0].textContent = AR
          ? 'اضبط الخطة والمستخدمين والاستضافة في '
          : 'Configure plan, users & hosting in ';
      const syncStrong = roiSubSyncInfo.querySelector('strong');
      if (syncStrong) syncStrong.textContent = AR ? 'التبويب 4 ← اشتراك أودو' : 'Tab 4 → Odoo Subscription';
      if (syncBadge) syncBadge.textContent = AR ? 'تكلفة الاشتراك محدَّثة تلقائياً ✓' : 'Subscription cost auto-synced ✓';
    }
    const roiSubLabel = document.querySelector('#roiPanel3 div[style*="gold"] div:first-child');
    if (roiSubLabel && (roiSubLabel.textContent.includes('Odoo Subscription') || roiSubLabel.textContent.includes('اشتراك أودو')))
      roiSubLabel.textContent = AR ? '📱 اشتراك أودو' : '📱 Odoo Subscription';

    // Hosting Type label
    const subHostLbl = document.querySelector('#subHostBtns')?.closest('.roi-input-group')?.querySelector('.roi-lbl');
    if (subHostLbl) subHostLbl.textContent = AR ? '☁️ نوع الاستضافة' : '☁️ Hosting Type';

    // SaaS button
    const subHostSaas = document.getElementById('subHostSaas');
    if (subHostSaas) {
      const saasSpan = subHostSaas.querySelector('span:first-child');
      if (saasSpan) saasSpan.innerHTML = AR ? '🌐 Odoo.com SaaS — <em>مشمول في الخطة</em>' : '🌐 Odoo.com SaaS — <em>Included in plan</em>';
      const saasBadge = subHostSaas.querySelector('span:last-child');
      if (saasBadge) saasBadge.textContent = AR ? 'إضافي $/0/شهر' : '$0/mo extra';
    }

    // Odoo.sh button
    const subHostSh = document.getElementById('subHostSh');
    if (subHostSh) {
      const shSpan = subHostSh.querySelector('[data-en]') || subHostSh.querySelector('span:first-child');
      if (shSpan) shSpan.textContent = AR ? '⚡ Odoo.sh — المنصة السحابية' : '⚡ Odoo.sh — Cloud Platform';
    }

    // On-Premise button
    const subHostPremise = document.getElementById('subHostPremise');
    if (subHostPremise) {
      const premSpan = subHostPremise.querySelector('span:first-child');
      if (premSpan) premSpan.textContent = AR ? '🖥️ محلي — خادمك الخاص' : '🖥️ On-Premise — Your own server';
      const premBadge = subHostPremise.querySelector('span:last-child');
      if (premBadge) premBadge.textContent = AR ? 'مبلغ مخصص' : 'Custom amount';
    }

    // Implementation Service label
    const implServiceLbl = document.querySelector('#implModePackBtn')?.closest('.roi-input-group')?.querySelector('div[style*="font-size:12px"]');
    if (implServiceLbl) implServiceLbl.innerHTML = AR
      ? '🛠️ خدمة التطبيق <span style="font-size:10px;color:rgba(255,255,255,.62);font-weight:500;">اختر واحدة</span>'
      : '🛠️ Implementation Service <span style="font-size:10px;color:rgba(255,255,255,.62);font-weight:500;">Choose one</span>';

    // Pack / Partner toggle buttons
    const implPackBtn = document.getElementById('implModePackBtn');
    if (implPackBtn) implPackBtn.innerHTML = AR
      ? '🎯 باقة أودو<br><span style="font-size:9px;opacity:.75;">تطبيق رسمي من أودو</span>'
      : '🎯 Odoo Success Pack<br><span style="font-size:9px;opacity:.75;">Official Odoo implementation</span>';
    const implPartnerBtn = document.getElementById('implModePartnerBtn');
    if (implPartnerBtn) implPartnerBtn.innerHTML = AR
      ? '🤝 مع شريك محلي<br><span style="font-size:9px;opacity:.65;">مبلغ إجمالي ثابت</span>'
      : '🤝 With a Local Partner<br><span style="font-size:9px;opacity:.65;">Fixed lump-sum amount</span>';

    // Partner section labels
    const partnerTitle = document.querySelector('#implPartnerSection .roi-input-group, #implPartnerSection')?.querySelector('div[style*="gold"]');
    const partnerTitleEl = document.querySelector('#implPartnerSection div[style*="color:var(--gold)"]');
    if (partnerTitleEl) partnerTitleEl.textContent = AR ? '🤝 تكلفة تطبيق الشريك المحلي' : '🤝 Local Partner Implementation Cost';
    const partnerDesc = document.querySelector('#implPartnerSection div[style*="rgba(255,255,255,.5)"]');
    if (partnerDesc) partnerDesc.textContent = AR
      ? 'أدخل المبلغ الثابت المتفق عليه مع شريك أودو. لا حد أقصى. يمكن إضافة ساعات استشارية إضافية أدناه.'
      : 'Enter the agreed fixed amount with your Odoo partner. No maximum limit. Extra consulting hours can be added below.';
    const partnerUsdLabel = document.querySelector('#implPartnerSection span[style*="white-space:nowrap"]');
    if (partnerUsdLabel) partnerUsdLabel.textContent = AR ? 'دولار لمرة واحدة' : 'USD one-time';
    const partnerHint = document.querySelector('#implPartnerSection div[style*="rgba(255,255,255,.04)"]');
    if (partnerHint) partnerHint.textContent = AR
      ? '💡 يمكنك الدمج مع ساعات استشارية إضافية أدناه. باقة النجاح غير متاحة في هذا الوضع.'
      : '💡 You can still combine with Extra Consulting Hours below. Success Pack is not available in this mode.';

    // Extra Consulting Hours
    const subExtraLbl = document.querySelector('#subExtraHrs')?.closest('.roi-input-group')?.querySelector('.roi-lbl');
    if (subExtraLbl) subExtraLbl.textContent = AR ? '⏱️ ساعات استشارية إضافية' : '⏱️ Extra Consulting Hours';
    const subHourlyLbl = document.querySelector('span[style*="rgba(255,255,255,.55)"]');
    if (subHourlyLbl && (subHourlyLbl.textContent.includes('Hourly') || subHourlyLbl.textContent.includes('ساعة')))
      subHourlyLbl.textContent = AR ? '💵 سعر الساعة (USD)' : '💵 Hourly rate (USD)';

    // Cost Breakdown box
    const subCostBreakdownLbl = document.querySelector('#subResultBox div[style*="letter-spacing"]');
    if (subCostBreakdownLbl) subCostBreakdownLbl.textContent = AR ? '📋 تفاصيل التكلفة' : '📋 Cost Breakdown';
    const subMonthlyLbl = document.querySelector('#subResultBox span[style*="font-size:13px"]');
    if (subMonthlyLbl && (subMonthlyLbl.textContent.includes('Monthly') || subMonthlyLbl.textContent.includes('الشهري')))
      subMonthlyLbl.textContent = AR ? 'الإجمالي الشهري' : 'Monthly Total';
    const subAnnualLbl = document.querySelector('#subResultBox span[style*="rgba(255,255,255,.45)"]:first-of-type');
    if (subAnnualLbl && (subAnnualLbl.textContent.includes('Annual') || subAnnualLbl.textContent.includes('سنوي')))
      subAnnualLbl.textContent = AR ? 'الاشتراك السنوي (شامل الاستضافة)' : 'Annual (subscription + hosting)';
    // Extra hours label
    const subExtraCostLbl = document.querySelector('span[id="subExtraCost"]')?.previousElementSibling;
    if (subExtraCostLbl && (subExtraCostLbl.textContent.includes('Extra hours') || subExtraCostLbl.textContent.includes('ساعات إضافية')))
      subExtraCostLbl.textContent = AR ? 'تكلفة ساعات إضافية (مرة واحدة)' : 'Extra hours cost (one-time)';
    // Total Year 1
    const subY1Lbl = document.querySelector('span[style*="font-size:12px;font-weight:800;color:rgba(255,255,255,.9)"]');
    if (subY1Lbl && (subY1Lbl.textContent.includes('Total Year') || subY1Lbl.textContent.includes('إجمالي السنة')))
      subY1Lbl.textContent = AR ? 'إجمالي الاستثمار في السنة الأولى' : 'Total Year 1 Investment';

    // Action buttons
    const subViewPricingBtn = document.querySelector('a[href*="odoo.com/pricing"]:not([href*="packs"])');
    if (subViewPricingBtn && subViewPricingBtn.closest('#subResultBox') === null)
      subViewPricingBtn.textContent = AR ? '📊 عرض تسعير أودو الرسمي ↗' : '📊 View Official Odoo Pricing ↗';
    const subExplorePacksBtn = document.querySelector('a[href*="pricing-packs"]');
    if (subExplorePacksBtn) subExplorePacksBtn.textContent = AR ? '🎯 استعراض باقات النجاح ↗' : '🎯 Explore Success Packs ↗';
    const subBackBtn = document.querySelector('button[onclick*="roiSwitchTab(3)"]');
    if (subBackBtn) subBackBtn.textContent = AR ? '→ العودة للاستثمار' : '← Back to Investment';

    // Pack section labels
    const subNewCustLabel = document.querySelector('#subNewCustomer')?.closest('label');
    if (subNewCustLabel) {
      const txt = subNewCustLabel.childNodes[subNewCustLabel.childNodes.length - 1];
      if (txt && txt.nodeType === 3) txt.textContent = AR ? ' عميل جديد (خصم 15% على باقة النجاح)' : ' New customer (15% off on Success Pack)';
    }
    const subSelectPackLbl = document.querySelector('#implPackSection span[style*="rgba(255,255,255,.55)"]');
    if (subSelectPackLbl) subSelectPackLbl.textContent = AR ? 'اختر باقة النجاح' : 'Select your Success Pack';

  }

  if (savedLang !== 'en') { applyLang(savedLang); applyLangExtended(savedLang); }
  document.getElementById('langToggle').addEventListener('click', () => {
    const newLang = document.documentElement.getAttribute('data-lang') === 'ar' ? 'en' : 'ar';
    applyLang(newLang);
    applyLangExtended(newLang);
    applyProjLang(newLang === 'ar');
    if (typeof updateFixedBtnPos === 'function') updateFixedBtnPos();
  });

  /* ══ PROJECT FILTER ══ */
  /* ══ PROJECTS: FILTER + PAGINATION + i18n ══ */
  const PAGE_SIZE = 9;
  let projPage   = 0;
  let projFilter = 'all';
  let projLangAR = document.documentElement.getAttribute('data-lang') === 'ar';

  /* --- translate all cards to current lang --- */
  function applyProjLang(AR) {
    projLangAR = AR;
    const pg = document.getElementById('pg'); if (!pg) return;

    /* filter btn labels */
    document.querySelectorAll('#fb .fbtn').forEach(btn => {
      btn.textContent = AR ? (btn.dataset.ar || btn.dataset.en) : btn.dataset.en;
    });
    /* section tag + title */
    const tag  = document.getElementById('proj-sec-tag');
    const ttl  = document.getElementById('proj-sec-title');
    if (tag) tag.textContent  = AR ? 'الأعمال' : 'Portfolio';
    if (ttl) ttl.innerHTML    = AR ? 'مشاريع ERP <span>المنجزة</span>' : 'ERP Projects <span>Delivered</span>';

    /* lbl labels */
    pg.querySelectorAll('.cs-lbl-ch').forEach(el  => el.textContent = AR ? 'التحدي'  : 'Challenge');
    pg.querySelectorAll('.cs-lbl-sol').forEach(el => el.textContent = AR ? 'الحل'    : 'Solution');
    pg.querySelectorAll('.cs-lbl-res').forEach(el => el.textContent = AR ? 'النتائج' : 'Key Results');
    pg.querySelectorAll('.cs-lbl-scope').forEach(el => el.textContent = AR ? 'النطاق' : 'Scope');

    /* all data-en/data-ar elements */
    pg.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.textContent = AR ? el.dataset.ar : el.dataset.en;
    });
    /* load-more label */
    const lml = document.getElementById('loadMoreLabel');
    if (lml) lml.textContent = AR ? 'عرض مزيد من المشاريع' : 'Show More Projects';
    /* cs-read-more links on all cards */
    pg.querySelectorAll('.cs-read-more').forEach(el => {
      el.textContent = AR ? '← قراءة دراسة الحالة كاملة' : 'Read Full Case Study →';
    });
  }

  /* --- render visible cards (filter + pagination) --- */
  function renderProjects(filter, page) {
    const pg = document.getElementById('pg'); if (!pg) return;
    const all = Array.from(pg.querySelectorAll('.cs-card'));
    const isFiltered = filter !== 'all';
    const matching   = all.filter(c => filter === 'all' || c.dataset.cat === filter);

    all.forEach(card => {
      const matches = filter === 'all' || card.dataset.cat === filter;
      if (!matches) { card.style.display = 'none'; return; }
      const idx = matching.indexOf(card);
      card.style.display = (isFiltered || idx < PAGE_SIZE * (page + 1)) ? '' : 'none';
      if (card.style.display !== 'none') card.style.animation = 'fadeIn .3s ease';
    });

    /* counter */
    const AR    = projLangAR;
    const shown = isFiltered ? matching.length : Math.min(PAGE_SIZE * (page + 1), matching.length);
    const total = matching.length;
    const ctr   = document.getElementById('projCounter');
    if (ctr) {
      ctr.textContent = AR
        ? (isFiltered ? `عرض جميع ${total} مشروع` : `عرض ${shown} من أصل ${total} مشروع`)
        : (isFiltered ? `Showing all ${total} project${total!==1?'s':''}` : `Showing ${shown} of ${total} project${total!==1?'s':''}`);
      ctr.style.direction = AR ? 'rtl' : 'ltr';
      ctr.style.textAlign = 'center';
    }
    /* load-more btn */
    const btn  = document.getElementById('loadMoreBtn');
    const lml  = document.getElementById('loadMoreLabel');
    if (btn) {
      const hasMore = !isFiltered && total > PAGE_SIZE * (page + 1);
      btn.style.display = hasMore ? 'inline-flex' : 'none'; btn.style.cssText = '';
      if (hasMore && lml) {
        const rem = Math.min(PAGE_SIZE, total - PAGE_SIZE * (page + 1));
        lml.textContent = AR ? `عرض ${rem} مشروعاً إضافياً` : `Show ${rem} More Projects`;
      }
    }
  }

  /* --- filter buttons --- */
  document.querySelectorAll('#fb .fbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#fb .fbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projFilter = btn.dataset.filter;
      projPage   = 0;
      renderProjects(projFilter, projPage);
    });
  });

  /* --- load more --- */
  const lmBtn = document.getElementById('loadMoreBtn');
  if (lmBtn) lmBtn.addEventListener('click', () => { projPage++; renderProjects(projFilter, projPage); });

  /* --- modal triggers (all cs-cards) --- */
  document.querySelectorAll('#pg .cs-card[data-cs]').forEach(card => {
    card.addEventListener('click', () => openCsModal(card.dataset.cs));
    card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();openCsModal(card.dataset.cs);}});
  });

  /* --- initial render & lang --- */
  renderProjects('all', 0);
  applyProjLang(projLangAR);
  /* sync lang toggle state if lang was saved */
  if (savedLang !== 'en') applyProjLang(savedLang === 'ar');

  /* ══ SKILL BAR ANIMATION ══ */
  const fills = document.querySelectorAll(".sk-fill");
  const widths = []; fills.forEach(el => { widths.push(el.style.width); el.style.width = "0"; });
  const skObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { fills.forEach((el,i) => setTimeout(() => el.style.width = widths[i], i*55)); skObserver.disconnect(); }});
  }, {threshold:.2});
  const skCard = document.querySelector(".skills-card"); if (skCard) skObserver.observe(skCard);

  /* ══ ACTIVE NAV LINK ══ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active-link"));
      const act = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (act) act.classList.add("active-link");
    }});
  }, {rootMargin:"-50% 0px -50% 0px"});
  sections.forEach(s => navObs.observe(s));

  /* ══ SCROLL-TO-TOP ══ */
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑"; scrollBtn.title = "Back to top";
  Object.assign(scrollBtn.style, {position:"fixed",bottom:"28px",right:"28px",width:"44px",height:"44px",borderRadius:"50%",background:"var(--teal)",color:"#fff",border:"none",fontSize:"18px",fontWeight:"700",cursor:"pointer",boxShadow:"0 4px 16px rgba(1,126,132,.4)",opacity:"0",transform:"translateY(12px)",transition:"all .25s",zIndex:"999"});
  document.body.appendChild(scrollBtn);
  function updateFixedBtnPos() {
    const isAR = document.documentElement.getAttribute('data-lang') === 'ar';
    scrollBtn.style.right = isAR ? 'auto' : '28px';
    scrollBtn.style.left  = isAR ? '28px' : 'auto';
    waBtn.style.right = isAR ? 'auto' : '24px';
    waBtn.style.left  = isAR ? '24px' : 'auto';
  }
  window.addEventListener("scroll", () => { const s = window.scrollY>400; scrollBtn.style.opacity=s?"1":"0"; scrollBtn.style.transform=s?"translateY(0)":"translateY(12px)"; });
  scrollBtn.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

  /* ══ WHATSAPP BUTTON ══ */
  const waBtn = document.createElement("a");
  waBtn.href="https://wa.me/201005061349"; waBtn.target="_blank"; waBtn.title="WhatsApp";
  waBtn.innerHTML=`<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  Object.assign(waBtn.style, {position:"fixed",bottom:"80px",right:"24px",width:"50px",height:"50px",borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37,211,102,.4)",zIndex:"999",transition:"transform .2s"});
  waBtn.addEventListener("mouseenter",()=>waBtn.style.transform="scale(1.1)");
  waBtn.addEventListener("mouseleave",()=>waBtn.style.transform="scale(1)");
  document.body.appendChild(waBtn);
  updateFixedBtnPos();

  /* ══ SCROLL REVEAL (enhanced with stagger) ══ */
  const revealEls = document.querySelectorAll(".cs-card,.svc-card,.test-card,.exp-card,.nx-card,.blog-card,.proj-card,.cert-card");
  const revObs = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }, (Array.from(revealEls).indexOf(e.target) % 4) * 80);
        revObs.unobserve(e.target);
      }
    });
  }, {threshold: .07});
  if (!window.REDUCED_MOTION) revealEls.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    revObs.observe(el);
  });

  /* ══ STAT COUNTER ══ */
  const statNums = document.querySelectorAll(".stat-n");
  const countUp = el => { const t=parseInt(el.textContent.replace(/\D/g,""),10),s=el.textContent.replace(/[0-9]/g,""); if(isNaN(t))return; let c=0; const step=Math.max(1,Math.floor(t/40)),tim=setInterval(()=>{c=Math.min(c+step,t);el.textContent=c+s;if(c>=t)clearInterval(tim);},30); };
  const stObs = new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){statNums.forEach(countUp);stObs.disconnect();}});},{threshold:.5});
  const statsBar=document.querySelector(".stats-bar"); if(statsBar && !window.REDUCED_MOTION)stObs.observe(statsBar);

  /* ══ MOBILE NAV — Professional Slide-in Drawer ══ */
  const navLinksEl = document.querySelector(".nav-links");
  const mq = window.matchMedia("(max-width:900px)");

  /* Inject drawer styles */
  const drawerStyle = document.createElement('style');
  drawerStyle.textContent = `
    #mobDrawerOverlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:998;opacity:0;pointer-events:none;transition:opacity .3s}
    #mobDrawerOverlay.open{opacity:1;pointer-events:all}
    #mobDrawer{position:fixed;top:0;left:0;bottom:0;width:min(320px,85vw);background:linear-gradient(160deg,#0d1b2e 0%,#0d2a40 100%);z-index:999;transform:translateX(-100%);transition:transform .35s cubic-bezier(.4,0,.2,1);overflow-y:auto;border-right:1px solid rgba(255,255,255,.07)}
    #mobDrawer.open{transform:translateX(0)}
    .mob-drawer-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08)}
    .mob-drawer-brand{display:flex;align-items:center;gap:10px;font-family:"Sora",sans-serif;font-size:14px;font-weight:700;color:#fff}
    .mob-drawer-photo{width:36px;height:36px;border-radius:50%;overflow:hidden;border:2px solid rgba(212,168,67,.5);flex-shrink:0}
    .mob-drawer-photo img{width:100%;height:100%;object-fit:cover}
    .mob-close-btn{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.1);border:none;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}
    .mob-close-btn:hover{background:rgba(255,255,255,.2)}
    .mob-drawer-nav{padding:12px 0}
    .mob-drawer-nav a{display:flex;align-items:center;gap:12px;padding:13px 22px;font-size:15px;font-weight:600;color:rgba(255,255,255,.75);border-left:3px solid transparent;transition:all .2s;text-decoration:none}
    .mob-drawer-nav a:hover,.mob-drawer-nav a.active-link{color:#fff;background:rgba(255,255,255,.06);border-left-color:var(--teal)}
    .mob-drawer-nav a .mob-nav-icon{font-size:16px;width:20px;text-align:center;flex-shrink:0}
    .mob-drawer-cta{margin:16px 20px 0;background:var(--gold);color:var(--navy);font-weight:700;border-radius:10px;padding:13px;text-align:center;display:block;font-size:14px;text-decoration:none;transition:all .2s}
    .mob-drawer-cta:hover{background:var(--gold-lt)}
    .mob-drawer-footer{padding:20px 22px;border-top:1px solid rgba(255,255,255,.08);margin-top:12px}
    .mob-drawer-contact a{display:block;font-size:12px;color:rgba(255,255,255,.5);margin-bottom:5px;text-decoration:none}
    .mob-drawer-contact a:hover{color:var(--teal-mid)}
    .hamburger-btn{display:none;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#fff;font-size:18px;cursor:pointer;padding:6px 10px;transition:background .2s;line-height:1;flex-shrink:0}
    .hamburger-btn:hover{background:rgba(255,255,255,.18)}
    @media(max-width:900px){.hamburger-btn{display:flex;align-items:center;justify-content:center}}
  `;
  document.head.appendChild(drawerStyle);

  /* Build overlay */
  const overlay = document.createElement('div');
  overlay.id = 'mobDrawerOverlay';
  document.body.appendChild(overlay);

  /* Build drawer */
  const drawer = document.createElement('div');
  drawer.id = 'mobDrawer';
  const navItems = [
    {href:'#roi',icon:'💰',label:'ROI Calc'},
    {href:'#about',icon:'👤',label:'About'},
    {href:'#nexa',icon:'🏢',label:'Nexa'},
    {href:'#services',icon:'⚙️',label:'Services'},
    {href:'#experience',icon:'💼',label:'Experience'},
    {href:'#projects',icon:'📁',label:'Projects'},
    {href:'#clients',icon:'🤝',label:'Clients'},
    {href:'#testimonials',icon:'⭐',label:'Reviews'},
    {href:'#certifications',icon:'🎓',label:'Certifications'},
    {href:'#contact',icon:'✉️',label:'Contact'},
  ];
  drawer.innerHTML = `
    <div class="mob-drawer-header">
      <div class="mob-drawer-brand">
        <div class="mob-drawer-photo"><img src="./assets/img/abu-emira.jpg" alt="Mohamed Abu Emira"></div>
        <div><div style="font-size:13px;font-weight:700;color:#fff">Mohamed Abu Emira</div><div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:1px">COO @ Nexa Solutions</div></div>
      </div>
      <button class="mob-close-btn" id="mobCloseBtn">✕</button>
    </div>
    <nav class="mob-drawer-nav">
      ${navItems.map(n=>`<a href="${n.href}"><span class="mob-nav-icon">${n.icon}</span>${n.label}</a>`).join('')}
    </nav>
    <a href="https://calendly.com/abuemira/30min" target="_blank" class="mob-drawer-cta">Book a free call</a>
    <div class="mob-drawer-footer">
      <div class="mob-drawer-contact">
        <a href="tel:+201005061349">📞 +20 100 506 1349</a>
        <a href="mailto:abuemira@nexa-solutions.com">✉️ abuemira@nexa-solutions.com</a>
        <a href="https://linkedin.com/in/abuemira" target="_blank">🔗 linkedin.com/in/abuemira</a>
      </div>
    </div>`;
  document.body.appendChild(drawer);

  /* Build hamburger button */
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-btn';
  hamburger.innerHTML = '☰';
  hamburger.setAttribute('aria-label', 'Open menu');
  navEl.insertBefore(hamburger, ctrls);

  /* Open/close functions */
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.innerHTML = '✕';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.innerHTML = '☰';
  }

  hamburger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
  overlay.addEventListener('click', closeDrawer);
  document.getElementById('mobCloseBtn').addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => setTimeout(closeDrawer, 120)));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeDrawer(); });

  /* Handle resize */
  const handleMQ = e => { if (!e.matches) closeDrawer(); };
  mq.addEventListener('change', handleMQ);

  /* ══ SCROLL PROGRESS BAR ══ */
  const progressBar = document.createElement('div');
  progressBar.id = 'scrollProgress';
  const pbStyle = document.createElement('style');
  pbStyle.textContent = `
    #scrollProgress{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--teal),var(--gold));z-index:9999;width:0%;transition:width .1s linear;border-radius:0 2px 2px 0}
    /* ── GLASSMORPHISM NAV on scroll ── */
    .nav.scrolled{background:rgba(13,27,46,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom-color:rgba(255,255,255,.12);box-shadow:0 4px 30px rgba(0,0,0,.3)}
    /* ── AVAILABILITY BADGE ── */
    .avail-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.35);border-radius:30px;padding:6px 14px;font-size:12px;font-weight:700;color:#22c55e;margin-bottom:16px;animation:badge-pulse 3s ease-in-out infinite}
    .avail-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:dot-blink 1.4s ease-in-out infinite}
    @keyframes badge-pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.15)}60%{box-shadow:0 0 0 6px rgba(34,197,94,0)}}
    @keyframes dot-blink{0%,100%{opacity:1}50%{opacity:.3}}
    /* ── TYPING CURSOR ── */
    .typing-cursor{display:inline-block;width:3px;height:.85em;background:var(--gold);border-radius:2px;margin-left:2px;vertical-align:middle;animation:cur-blink .85s steps(1) infinite}
    @keyframes cur-blink{0%,100%{opacity:1}50%{opacity:0}}
    /* ── SCROLL INDICATOR ── */
    .scroll-indicator{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;color:rgba(255,255,255,.62);font-size:10px;font-weight:600;letter-spacing:.08em;animation:scroll-bob 2.2s ease-in-out infinite}
    .scroll-indicator svg{animation:scroll-arrow 1.6s ease-in-out infinite}
    @keyframes scroll-bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}
    @keyframes scroll-arrow{0%,100%{opacity:.35}50%{opacity:.9}}
    @media(max-width:900px){.scroll-indicator{display:none}}
    /* ── ENHANCED HOVER on stat cards ── */
    .stat{transition:background .2s,box-shadow .2s;cursor:default}
    .stat:hover{background:var(--teal-light);box-shadow:inset 0 -3px 0 var(--teal)}
    /* ── SECTION REVEAL (broader) ── */
    .section-reveal{opacity:0;transform:translateY(22px);transition:opacity .55s ease,transform .55s ease}
    .section-reveal.visible{opacity:1;transform:translateY(0)}
  `;
  document.head.appendChild(pbStyle);
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const s = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (s / h * 100) + '%';
    navEl.classList.toggle('scrolled', s > 60);
  }, {passive: true});

  /* ══ AVAILABILITY BADGE + TYPING ANIMATION ══ */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    /* Insert availability badge above name */
    const badge = document.createElement('div');
    badge.className = 'avail-badge';
    badge.innerHTML = '<span class="avail-dot"></span>Available for New Projects · متاح لمشاريع جديدة';
    heroName.parentElement.insertBefore(badge, heroName);
  }

  /* ══ SCROLL INDICATOR IN HERO ══ */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.style.position = 'relative';
    const scrollInd = document.createElement('div');
    scrollInd.className = 'scroll-indicator';
    scrollInd.innerHTML = `SCROLL<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`;
    heroSection.appendChild(scrollInd);
  }

  /* ══ SECTION REVEAL OBSERVER (expanded elements) ══ */
  const broadReveal = document.querySelectorAll('.sec-title,.sec-tag,.kpi,.hl-item,.why-card,.ind-card,.edu-card,.cert-hl,.award-card,.nx-stat');
  const broadObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); broadObs.unobserve(e.target); }});
  }, {threshold: 0.12});
  if (!window.REDUCED_MOTION) broadReveal.forEach(el => { el.classList.add('section-reveal'); broadObs.observe(el); });

  /* ══ CASE STUDY MODAL ══ */
  // TODO: add role:'…' / roleAr:'…' (my role on the project) to each case study; the modal shows it when present.
  // TODO: these case studies show adjective results ("Live", "Full", "Real-time"…) instead of a measurable figure: konafa, shahbandar, villamisk, batec, shararco, kinglib, tarahem, arabian, makkiyoon, officers, onevision.
  // TODO: the generic p01–p49 entries reuse one templated challenge/solution per sector; replace with each client's real story or trim them.
  const csData = {
    visionplast: {
      cat: 'Manufacturing · Saudi Arabia',
      catAr: 'التصنيع · المملكة العربية السعودية',
      title: 'One Integrated Platform for a Plastic Products Manufacturer',
      titleAr: 'منصة متكاملة واحدة لمصنع منتجات بلاستيكية',
      sub: 'Vision Plast for Plastic Products · Odoo 19 Enterprise Edition · Saudi Arabia',
      subAr: 'رؤية للمنتجات البلاستيكية · أودو 19 المؤسسي · السعودية',
      challenge: 'Vision Plast manufactures plastic products in Saudi Arabia. Purchasing, sales, warehouse stock, production, and HR were handled on separate tools, so there was no live link between raw-material buying, production orders, and customer deliveries.',
      challengeAr: 'فيجن بلاست تصنّع المنتجات البلاستيكية في السعودية. كانت المشتريات والمبيعات والمخزون والإنتاج والموارد البشرية تُدار على أدوات منفصلة، دون ربط فوري بين شراء الخامات وأوامر الإنتاج وتسليمات العملاء.',
      solution: 'Implemented Odoo 19 Enterprise across Purchase, Sales, Inventory, Manufacturing, and HR — so raw materials, production orders, finished goods, and the people running them are managed in one system.',
      solutionAr: 'تطبيق أودو 19 المؤسسي عبر المشتريات والمبيعات والمخزون والتصنيع والموارد البشرية — لإدارة الخامات وأوامر الإنتاج والمنتج التام والعاملين في نظام واحد.',
      scope: ['Purchase','Sales','Inventory & Warehouses','Manufacturing','HR'],
      scopeAr: ['المشتريات','المبيعات','المخزون والمستودعات','التصنيع','الموارد البشرية'],
      highlights: [
        {icon:'🏭',title:'Production Planning',titleAr:'تخطيط الإنتاج',desc:'Manufacturing orders driven by bills of materials, consuming raw materials from stock and producing finished goods into the warehouse.',descAr:'أوامر تصنيع قائمة على قوائم المواد، تستهلك الخامات من المخزون وتُدخل المنتج التام إلى المستودع.'},
        {icon:'🔄',title:'Purchase to Production',titleAr:'من الشراء إلى الإنتاج',desc:'Raw-material purchasing connected to stock levels and production needs.',descAr:'شراء الخامات مرتبط بمستويات المخزون واحتياجات الإنتاج.'},
        {icon:'🚚',title:'Order to Delivery',titleAr:'من الطلب إلى التسليم',desc:'Sales orders, warehouse picking, and deliveries handled in one flow.',descAr:'أوامر البيع والتجهيز من المستودع والتسليم في مسار واحد.'},
        {icon:'👥',title:'HR on the Same Platform',titleAr:'الموارد البشرية على نفس المنصة',desc:'Employee records and HR processes managed alongside operations.',descAr:'سجلات الموظفين وعمليات الموارد البشرية تُدار بجانب العمليات.'},
      ],
      kpis: [['5','Core Apps Live'],['v19','Odoo Enterprise'],['1','Unified Platform']],
      kpisAr: [['5','تطبيقات أساسية'],['v19','أودو المؤسسي'],['1','منصة موحّدة']],
      outcome: 'Vision Plast now runs purchasing, production, stock, sales, and HR on a single Odoo 19 Enterprise platform.',
      outcomeAr: 'فيجن بلاست تدير الآن المشتريات والإنتاج والمخزون والمبيعات والموارد البشرية على منصة أودو 19 المؤسسي واحدة.',
    },
    konafa: {
      cat: 'Food & Beverage · UAE',
      catAr: 'الأغذية والمشروبات · الإمارات',
      title: 'Connecting Coffee Production, Stock, and Sales in Odoo 19',
      titleAr: 'ربط إنتاج القهوة والمخزون والمبيعات في أودو 19',
      sub: 'Konafa Coffee · Odoo 19 Enterprise Edition · UAE',
      subAr: 'كنافة كوفي · أودو 19 المؤسسي · الإمارات',
      challenge: 'Konafa Coffee tracked ingredient purchasing, production, and sales separately, so product costs and stock levels had to be reconciled by hand.',
      challengeAr: 'كنافة كوفي كانت تتابع شراء المكونات والإنتاج والمبيعات بشكل منفصل، فكانت تكاليف المنتجات ومستويات المخزون تُطابق يدوياً.',
      solution: 'Implemented Odoo 19 Enterprise across Purchase, Sales, Inventory, and Manufacturing, with bills of materials so production consumes ingredients automatically and stock stays current.',
      solutionAr: 'تطبيق أودو 19 المؤسسي عبر المشتريات والمبيعات والمخزون والتصنيع، مع قوائم مواد تجعل الإنتاج يستهلك المكونات تلقائياً ويُبقي المخزون محدّثاً.',
      scope: ['Purchase','Sales','Inventory','Manufacturing (BOM)'],
      scopeAr: ['المشتريات','المبيعات','المخزون','التصنيع (قوائم المواد)'],
      highlights: [
        {icon:'☕',title:'BOM-Based Production',titleAr:'إنتاج قائم على قوائم المواد',desc:'Each product has a bill of materials, so production deducts ingredients and builds product cost.',descAr:'لكل منتج قائمة مواد، فيخصم الإنتاج المكونات ويحتسب تكلفة المنتج.'},
        {icon:'📦',title:'Live Stock',titleAr:'مخزون محدّث',desc:'Purchases, production, and sales update inventory in real time.',descAr:'المشتريات والإنتاج والمبيعات تحدّث المخزون فوراً.'},
        {icon:'🛒',title:'Purchase to Sale',titleAr:'من الشراء إلى البيع',desc:'Supplier purchasing and customer sales connected in one system.',descAr:'المشتريات من الموردين والمبيعات للعملاء مرتبطة في نظام واحد.'},
      ],
      kpis: [['4','Core Apps Live'],['v19','Odoo Enterprise'],['BOM','Product Costing']],
      kpisAr: [['4','تطبيقات أساسية'],['v19','أودو المؤسسي'],['BOM','تكلفة المنتج']],
      outcome: 'Konafa Coffee manages purchasing, production, stock, and sales on Odoo 19 Enterprise, with product costs coming straight from production.',
      outcomeAr: 'كنافة كوفي تدير المشتريات والإنتاج والمخزون والمبيعات على أودو 19 المؤسسي، مع تكاليف منتجات تأتي مباشرة من الإنتاج.',
    },
    shahbandar: {
      cat: 'Trading & Industry · Libya',
      catAr: 'التجارة والصناعة · ليبيا',
      title: 'Import, Multi-Currency Trade, and eCommerce for a Libyan Trading Group',
      titleAr: 'الاستيراد والتجارة متعددة العملات والتجارة الإلكترونية لمجموعة تجارية ليبية',
      sub: 'Shahbandar Group for Trade & Industry · Odoo 19 Enterprise Edition · Libya',
      subAr: 'مجموعة شهبندر للتجارة والصناعة · أودو 19 المؤسسي · ليبيا',
      challenge: 'Shahbandar Group works in import, industry, and distribution across Libya. Foreign purchasing in multiple currencies, local sales, and the online store ran apart, making landed costs and currency differences hard to track.',
      challengeAr: 'مجموعة شهبندر تعمل في الاستيراد والصناعة والتوزيع في ليبيا. كانت المشتريات الخارجية بعملات متعددة والمبيعات المحلية والمتجر الإلكتروني تعمل بشكل منفصل، مما صعّب تتبّع تكاليف الاستيراد وفروق العملة.',
      solution: 'Implemented Odoo 19 Enterprise across Purchase, Sales, and Inventory, with foreign purchasing and currency handling, plus eCommerce integrated with the group\'s online store.',
      solutionAr: 'تطبيق أودو 19 المؤسسي عبر المشتريات والمبيعات والمخزون، مع المشتريات الخارجية ومعالجة العملات، وتجارة إلكترونية مرتبطة بمتجر المجموعة.',
      scope: ['Purchase','Foreign Purchasing (Import)','Multi-Currency Handling','Sales','Inventory & Warehouses','eCommerce','Online Store Integration'],
      scopeAr: ['المشتريات','المشتريات الخارجية (الاستيراد)','معالجة العملات','المبيعات','المخزون والمستودعات','التجارة الإلكترونية','الربط مع المتجر'],
      highlights: [
        {icon:'🌍',title:'Foreign Purchasing',titleAr:'المشتريات الخارجية',desc:'Import purchases recorded in supplier currencies and converted for local costing.',descAr:'مشتريات الاستيراد تُسجّل بعملة المورد وتُحوَّل لحساب التكلفة محلياً.'},
        {icon:'💱',title:'Currency Handling',titleAr:'معالجة العملات',desc:'Exchange rates and currency differences handled inside Odoo instead of spreadsheets.',descAr:'أسعار الصرف وفروق العملة تُعالج داخل أودو بدلاً من جداول البيانات.'},
        {icon:'🛍️',title:'eCommerce + Store Integration',titleAr:'تجارة إلكترونية وربط المتجر',desc:'Online store connected to Odoo so products, stock, and orders stay in sync.',descAr:'المتجر الإلكتروني مرتبط بأودو لتبقى المنتجات والمخزون والطلبات متزامنة.'},
        {icon:'📦',title:'Distribution Stock',titleAr:'مخزون التوزيع',desc:'Inventory managed across warehouses for wholesale and online sales.',descAr:'إدارة المخزون عبر المستودعات لمبيعات الجملة والمبيعات الإلكترونية.'},
      ],
      kpis: [['v19','Odoo Enterprise'],['Multi','Currency Handling'],['Live','Store Integration']],
      kpisAr: [['v19','أودو المؤسسي'],['متعدد','معالجة العملات'],['فوري','ربط المتجر']],
      outcome: 'Shahbandar Group runs import purchasing, multi-currency trade, distribution, and its online store on a single Odoo 19 Enterprise platform.',
      outcomeAr: 'مجموعة شهبندر تدير المشتريات الخارجية والتجارة متعددة العملات والتوزيع ومتجرها الإلكتروني على منصة أودو 19 المؤسسي واحدة.',
    },
    ffl: {
      cat: 'Logistics & Supply Chain · Egypt',
      title: 'From Disconnected Warehouses to a Unified Freight Command Center',
      sub: 'Fast Forward Logistics · Odoo 17 Enterprise Edition',
      challenge: 'Fast Forward Logistics managed air and ocean freight across 3 independent warehouses, each running its own tracking system. Accounting, HR, and field operations functioned on entirely disconnected platforms — creating recurring billing errors, complete absence of real-time shipment visibility, and financial reports that arrived too late to support management decisions.',
      solution: 'Deployed a full Odoo 17 Enterprise stack purpose-built for freight operations: a unified Air & Ocean Freight management layer, multi-warehouse inventory control, and Field Services integration for on-ground teams. Accounting and HR/Payroll were fully integrated into the same platform, and a custom C-level shipment dashboard was developed to surface live freight status, billing, and performance metrics in a single view.',
      scope: ['Inventory (Multi-Warehouse)','Air Freight Management','Ocean Freight Management','Field Services','Accounting & Finance','HR & Payroll','Custom KPI Dashboard'],
      highlights: [
        {icon:'⚡',title:'Unified Operations',desc:'3 previously isolated warehouses consolidated into a single Odoo instance — eliminating data silos and enabling cross-warehouse visibility.'},
        {icon:'📡',title:'Live Shipment Tracking',desc:'Real-time freight status dashboard replaced manual status calls, giving management instant visibility across all air and ocean shipments.'},
        {icon:'🧾',title:'Billing Accuracy',desc:'Automated billing workflows tied to shipment milestones eliminated manual invoice errors and accelerated revenue recognition.'},
        {icon:'🏗️',title:'Field Team Integration',desc:'On-ground field teams connected to the system via Odoo Field Services, enabling direct job assignment, time logging, and status updates from site.'},
      ],
      kpis: [['40%','Faster Order Processing'],['100%','Shipment Visibility'],['3','Warehouses Unified']],
      outcome: 'Management gained a live freight command center — the first time leadership could see shipment status, billing accuracy, and warehouse performance from a single screen. Billing errors dropped to near zero, and operational reporting went from days to real time.',
    },
    '12cups': {
      cat: 'Food & Beverage · Saudi Arabia',
      title: 'Scaling an 8-Branch Coffee Chain Without Losing Financial Control',
      sub: '12 Cups Coffee · Odoo 17 Enterprise Edition · Riyadh, KSA',
      challenge: '12 Cups operated 8 branches across Riyadh with POS systems running in complete isolation — no central inventory, no standardized recipe costing, and HR/payroll managed branch-by-branch through spreadsheets. Inventory shrinkage and raw material waste were entirely undetected, eroding margins without visibility. Management had no consolidated P&L per branch.',
      solution: 'Designed and deployed a centralized Odoo 17 EE multi-branch architecture: a unified POS system directly linked to real-time inventory across all locations, Manufacturing BOMs built per recipe to automatically calculate ingredient consumption and flag waste. HR & Payroll were centralized and automated across all 8 branches. A live KPI dashboard with branch-level P&L and waste analytics was delivered to ownership.',
      scope: ['Multi-Branch POS','Manufacturing (BOM & Recipe Costing)','Inventory Management','Purchase & Supply Chain','HR & Payroll (Automated)','Branch-Level P&L Dashboard'],
      highlights: [
        {icon:'🏪',title:'Multi-Branch POS Unification',desc:'All 8 POS terminals centralized — sales data, stock depletion, and cash reconciliation now flow into one system in real time.'},
        {icon:'🧪',title:'Recipe-Based Cost Control',desc:'Manufacturing BOMs built per menu item automatically deduct raw ingredients per sale, turning every order into a live costing event.'},
        {icon:'📉',title:'Waste Reduction',desc:'Inventory shrinkage surfaced for the first time through automated variance tracking between theoretical and actual consumption per branch.'},
        {icon:'💼',title:'Payroll Automation',desc:'Branch-by-branch manual payroll replaced with a fully automated HR & Payroll cycle covering all staff across all locations.'},
      ],
      kpis: [['60%','Reduction in Waste'],['8','Branches Live on Day 1'],['100%','Payroll Automated']],
      outcome: 'For the first time, ownership could see profitability per branch, identify high-waste locations, and make data-driven staffing and supply decisions. The system paid for itself within the first quarter through waste reduction alone.',
    },
    ornina: {
      cat: 'Construction & Engineering · Egypt',
      title: 'Eliminating Blind Spots in Project Cost Control for a Contracting Firm',
      sub: 'Ornina Building Contracting · Odoo 17 Enterprise Edition',
      challenge: 'Ornina tracked all project costs in Excel with no real-time variance analysis. Petty cash disbursements across multiple sites were uncontrolled and unrecorded until month-end — by which point discrepancies were too large to resolve. Procurement operated with no formal purchase-to-pay workflow, and financial reports required 2+ weeks to compile.',
      solution: 'Implemented Odoo 17 EE with project-based cost accounting at its core: each project mapped to dedicated cost centers, with budget vs. actual variance surfaced automatically. A structured petty cash management system replaced manual disbursements. The procurement cycle was rebuilt end-to-end using Odoo Purchase with approval workflows. HR integration enabled payroll-to-project allocation, and custom management reports were configured to deliver executive-level financial summaries on demand.',
      scope: ['Project-Based Accounting','Petty Cash Management','Purchase to Pay (P2P)','Inventory & Supply Chain','HR & Payroll','Custom Financial Reports (Budget vs Actual)'],
      highlights: [
        {icon:'📊',title:'Real-Time Budget Variance',desc:'Every project now carries a live budget vs. actual dashboard — cost overruns are visible the moment they occur, not weeks later.'},
        {icon:'💵',title:'Petty Cash Control',desc:'Multi-site petty cash replaced with a structured disbursement system: each expense logged, approved, and reconciled within Odoo.'},
        {icon:'🔄',title:'Procurement Workflow',desc:'Purchase-to-pay cycle formalized with three-way matching (PO → receipt → invoice), eliminating unauthorized spending.'},
        {icon:'⚡',title:'Faster Month-End Close',desc:'Financial month-end reduced from 2+ weeks to under 3 days through automated posting, reconciliation, and report generation.'},
      ],
      kpis: [['45%','Faster Reporting'],['100%','Project Cost Visibility'],['EGP 0','Untracked Disbursements']],
      outcome: 'Management gained full financial clarity across all active construction projects — the first time they could assess project profitability in real time. The finance team reclaimed two weeks per month previously lost to manual reporting.',
    },
    villamisk: {
      cat: 'Hospitality · Saudi Arabia',
      title: 'Replacing a Paper-Based Hotel Operation with a Fully Integrated Smart Property System',
      sub: 'Villa Misk Hotel · Odoo 18 Enterprise Edition',
      challenge: 'Villa Misk ran on eZee PMS as a standalone property management system — completely disconnected from accounting, HR, and POS. Every guest checkout required manual revenue entry into a separate accounting tool. Housekeeping schedules lived on paper, maintenance requests were tracked via WhatsApp, and management had no single view of operational or financial performance.',
      solution: 'Built a custom API connector between eZee PMS and Odoo 18 EE — enabling real-time sync of reservations, room charges, and folio data directly into Odoo Accounting. POS, Housekeeping task management, Preventive Maintenance, HR & Payroll, and CRM (for corporate accounts) were all deployed and unified on the same platform. A consolidated hotel operations dashboard was delivered to the general manager.',
      scope: ['eZee PMS Integration (Custom API)','Accounting & Revenue Recognition','POS (F&B and Ancillary Services)','Housekeeping Management','Maintenance (Preventive & Reactive)','HR & Payroll','CRM (Corporate Accounts)'],
      highlights: [
        {icon:'🔌',title:'PMS-to-ERP Integration',desc:'Custom API connector built to sync eZee PMS data into Odoo in real time — eliminating all manual revenue entry at checkout.'},
        {icon:'🏨',title:'Live Revenue Posting',desc:'Room charges, F&B, and ancillary revenue recognized automatically as guest transactions occur — zero lag between operations and books.'},
        {icon:'🧹',title:'Housekeeping Digitized',desc:'Paper-based housekeeping replaced with Odoo task management: room status, cleaning assignments, and inspection checklists all tracked digitally.'},
        {icon:'⚙️',title:'Maintenance Workflow',desc:'Reactive and preventive maintenance requests managed end-to-end within Odoo — no more WhatsApp coordination, full audit trail maintained.'},
      ],
      kpis: [['1','Unified Platform'],['Live','Revenue Posting'],['50%','Admin Time Saved']],
      outcome: 'Villa Misk transformed from a fragmented, paper-dependent operation into a fully connected hotel system. The general manager now opens a single dashboard each morning — reservations, revenue, staff, housekeeping status, and maintenance all visible in one place.',
    },
    batec: {
      cat: 'Construction · UAE',
      title: 'Consolidating a Multi-Entity Construction Group into a Single Financial Truth',
      sub: 'BATEC Batiment Technique · Odoo 18 Enterprise Edition · UAE',
      challenge: 'BATEC operated as a multi-entity construction group with no unified financial view. Project costs were tracked per entity on spreadsheets, intercompany transactions required manual journal entries — creating 5+ day delays at every month-end. Management had no consolidated view of group profitability, and project budget performance was invisible across entities.',
      solution: 'Configured a multi-company Odoo 18 EE environment with a shared Chart of Accounts and cost center structure aligned to project delivery. Project-based accounting was implemented across all entities, with intercompany auto journal entries eliminating manual reconciliation. Accounting, Sales, Inventory, HR, CRM, and Projects were deployed across all companies. A unified management dashboard was built to surface consolidated financial data and project profitability in real time.',
      scope: ['Multi-Company Configuration','Shared Chart of Accounts','Cost Centers & Project Accounting','Intercompany Auto Journal Entries','Sales & CRM','Inventory & Purchase','HR & Payroll','Projects & Timesheets'],
      highlights: [
        {icon:'🏢',title:'Multi-Company Architecture',desc:'All group entities consolidated under a single Odoo 18 EE instance with isolated books but shared master data and reporting.'},
        {icon:'🔄',title:'Automated Intercompany Entries',desc:'Intercompany transactions now generate bilateral journal entries automatically — zero manual reconciliation at month-end.'},
        {icon:'📐',title:'Project Cost Control',desc:'Every project mapped to dedicated cost centers with real-time budget vs. actual tracking across all active entities simultaneously.'},
        {icon:'📊',title:'Group Financial Dashboard',desc:'Consolidated P&L, balance sheet, and project profitability delivered to management in real time — first-ever unified group financial view.'},
      ],
      kpis: [['100%','Financial Consolidation'],['5→1','Month-End Close Days'],['Real-time','Cost vs Budget']],
      outcome: 'Management gained a unified dashboard across all entities — enabling data-driven decisions on project profitability for the first time in the company\'s history. Month-end close compressed from 5 days to 1.',
    },

    p01:{cat:'Construction · Odoo EE',catAr:'Construction · أودو المؤسسي',title:'Construction &amp; Engineering Systems Co.',titleAr:'Construction &amp; Engineering Systems Co.',sub:'Construction &amp; Engineering Systems Co. · Odoo EE',subAr:'Construction &amp; Engineering Systems Co. · أودو المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Deployed Odoo EE covering "Project-based Accounting,Cost Tracking,Supply Chain,HR" for Construction &amp; Engineering Systems Co. — unified financial control and operational visibility.',solutionAr:'تطبيق أودو المؤسسي يغطي احتياجات Construction &amp; Engineering Systems Co. — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Project-based Accounting", "Cost Tracking", "Supply Chain", "HR"],scopeAr:["\u0645\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639", "\u062a\u062a\u0628\u0639 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641", "\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f", "\u0627\u0644\u0645\u0648\u0627\u0631\u062f \u0627\u0644\u0628\u0634\u0631\u064a\u0629"],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p02:{cat:'Construction · Odoo 17 EE',catAr:'Construction · أودو 17 المؤسسي',title:'ALAQ AL-EZDEHAR CO. (AECOM)',titleAr:'ALAQ AL-EZDEHAR CO. (AECOM)',sub:'ALAQ AL-EZDEHAR CO. (AECOM) · Odoo 17 EE',subAr:'ALAQ AL-EZDEHAR CO. (AECOM) · أودو 17 المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Deployed Odoo 17 EE covering "Construction,Oil &amp; Gas,Accounting,Maintenance,Operations" for ALAQ AL-EZDEHAR CO. (AECOM) — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات ALAQ AL-EZDEHAR CO. (AECOM) — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Construction", "Oil &amp; Gas", "Accounting", "Maintenance", "Operations"],scopeAr:["Construction", "\u0627\u0644\u0646\u0641\u0637 \u0648\u0627\u0644\u063a\u0627\u0632", "\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0627\u0644\u0635\u064a\u0627\u0646\u0629", "\u0627\u0644\u0639\u0645\u0644\u064a\u0627\u062a"],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p03:{cat:'Construction · Odoo 13 EE',catAr:'Construction · أودو 13 المؤسسي',title:'Abdurahman Albader Sons',titleAr:'Abdurahman Albader Sons',sub:'Abdurahman Albader Sons · Odoo 13 EE',subAr:'Abdurahman Albader Sons · أودو 13 المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Deployed Odoo 13 EE covering "Construction,Oil &amp; Gas,Accounting,Maintenance &amp; Operations" for Abdurahman Albader Sons — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 13 المؤسسي يغطي احتياجات Abdurahman Albader Sons — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Construction", "Oil &amp; Gas", "Accounting", "Maintenance &amp; Operations"],scopeAr:["Construction", "\u0627\u0644\u0646\u0641\u0637 \u0648\u0627\u0644\u063a\u0627\u0632", "\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0627\u0644\u0635\u064a\u0627\u0646\u0629 \u0648\u0627\u0644\u0639\u0645\u0644\u064a\u0627\u062a"],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p04:{cat:'Construction · Odex ERP',catAr:'Construction · أوديكس ERP',title:'Zuhair Fayez Partnership Consultants',titleAr:'Zuhair Fayez Partnership Consultants',sub:'Zuhair Fayez Partnership Consultants · Odex ERP',subAr:'Zuhair Fayez Partnership Consultants · أوديكس ERP',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Deployed Odex ERP covering "Accounting,HR,Inventory,Sales,CRM" for Zuhair Fayez Partnership Consultants — unified financial control and operational visibility.',solutionAr:'تطبيق أوديكس ERP يغطي احتياجات Zuhair Fayez Partnership Consultants — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Accounting", "HR", "Inventory", "Sales", "CRM"],scopeAr:["\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0627\u0644\u0645\u0648\u0627\u0631\u062f \u0627\u0644\u0628\u0634\u0631\u064a\u0629", "\u0627\u0644\u0645\u062e\u0632\u0648\u0646", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a"],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p05:{cat:'Manufacturing · Odoo 17 EE',catAr:'Manufacturing · أودو 17 المؤسسي',title:'Ambiance Furniture',titleAr:'Ambiance Furniture',sub:'Ambiance Furniture · Odoo 17 EE',subAr:'Ambiance Furniture · أودو 17 المؤسسي',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Deployed Odoo 17 EE covering "Multi-Company,Accounting,Manufacturing,Sales,CRM,HR,Projects" for Ambiance Furniture — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات Ambiance Furniture — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Multi-Company", "Accounting", "Manufacturing", "Sales", "CRM", "HR", "Projects"],scopeAr:["\u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a", "\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0627\u0644\u062a\u0635\u0646\u064a\u0639", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a", "\u0627\u0644\u0645\u0648\u0627\u0631\u062f \u0627\u0644\u0628\u0634\u0631\u064a\u0629", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p06:{cat:'Manufacturing · Odoo 17 EE',catAr:'Manufacturing · أودو 17 المؤسسي',title:'Silver Tex',titleAr:'Silver Tex',sub:'Silver Tex · Odoo 17 EE',subAr:'Silver Tex · أودو 17 المؤسسي',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Deployed Odoo 17 EE covering "Multi-Company,Accounting,Supply Chain,Inventory,Sales,CRM,HR" for Silver Tex — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات Silver Tex — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Multi-Company", "Accounting", "Supply Chain", "Inventory", "Sales", "CRM", "HR"],scopeAr:["\u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a", "\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f", "\u0627\u0644\u0645\u062e\u0632\u0648\u0646", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a", "\u0627\u0644\u0645\u0648\u0627\u0631\u062f \u0627\u0644\u0628\u0634\u0631\u064a\u0629"],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p07:{cat:'Manufacturing · Odoo 17 EE',catAr:'Manufacturing · أودو 17 المؤسسي',title:'Caryoka — Automotive Workshop',titleAr:'Caryoka — Automotive Workshop',sub:'Caryoka — Automotive Workshop · Odoo 17 EE',subAr:'Caryoka — Automotive Workshop · أودو 17 المؤسسي',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Deployed Odoo 17 EE covering "Workshop Mgmt,Multi-Company,Inventory,Manufacturing,Sales,HR" for Caryoka — Automotive Workshop — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات Caryoka — Automotive Workshop — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Workshop Mgmt", "Multi-Company", "Inventory", "Manufacturing", "Sales", "HR"],scopeAr:["\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0648\u0631\u0634\u0629", "\u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a", "\u0627\u0644\u0645\u062e\u0632\u0648\u0646", "\u0627\u0644\u062a\u0635\u0646\u064a\u0639", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a", "\u0627\u0644\u0645\u0648\u0627\u0631\u062f \u0627\u0644\u0628\u0634\u0631\u064a\u0629"],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p08:{cat:'Manufacturing · Odoo v13→v16',catAr:'Manufacturing · ترقية v13→v16',title:'IYA Investment Co. (ERP Upgrade)',titleAr:'IYA Investment Co. (ERP Upgrade)',sub:'IYA Investment Co. (ERP Upgrade) · Odoo v13→v16',subAr:'IYA Investment Co. (ERP Upgrade) · ترقية v13→v16',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Deployed Odoo v13→v16 covering "Feed &amp; Poultry Manufacturing,Accounting,Supply Chain" for IYA Investment Co. (ERP Upgrade) — unified financial control and operational visibility.',solutionAr:'تطبيق ترقية v13→v16 يغطي احتياجات IYA Investment Co. (ERP Upgrade) — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Feed &amp; Poultry Manufacturing", "Accounting", "Supply Chain"],scopeAr:["\u062a\u0635\u0646\u064a\u0639 \u0627\u0644\u0623\u0639\u0644\u0627\u0641 \u0648\u0627\u0644\u062f\u0648\u0627\u062c\u0646", "\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f"],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p09:{cat:'Food &amp; Beverage · Odoo 17 EE',catAr:'Food &amp; Beverage · أودو 17 المؤسسي',title:'Jedoudna Restaurant &amp; Café',titleAr:'Jedoudna Restaurant &amp; Café',sub:'Jedoudna Restaurant &amp; Café · Odoo 17 EE',subAr:'Jedoudna Restaurant &amp; Café · أودو 17 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Deployed Odoo 17 EE covering "Accounting,Manufacturing,Inventory,POS,Sales &amp; CRM" for Jedoudna Restaurant &amp; Café — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات Jedoudna Restaurant &amp; Café — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Accounting", "Manufacturing", "Inventory", "POS", "Sales &amp; CRM"],scopeAr:["\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0627\u0644\u062a\u0635\u0646\u064a\u0639", "\u0627\u0644\u0645\u062e\u0632\u0648\u0646", "\u0646\u0642\u0627\u0637 \u0627\u0644\u0628\u064a\u0639", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a \u0648\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a"],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p10:{cat:'Food &amp; Beverage · Odoo 17 EE',catAr:'Food &amp; Beverage · أودو 17 المؤسسي',title:'Anasir Alghidha for Food Products',titleAr:'Anasir Alghidha for Food Products',sub:'Anasir Alghidha for Food Products · Odoo 17 EE',subAr:'Anasir Alghidha for Food Products · أودو 17 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Deployed Odoo 17 EE covering "Accounting,Supply Chain,Inventory,Manufacturing,Sales,CRM,POS" for Anasir Alghidha for Food Products — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات Anasir Alghidha for Food Products — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Accounting", "Supply Chain", "Inventory", "Manufacturing", "Sales", "CRM", "POS"],scopeAr:["\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f", "\u0627\u0644\u0645\u062e\u0632\u0648\u0646", "\u0627\u0644\u062a\u0635\u0646\u064a\u0639", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a", "\u0646\u0642\u0627\u0637 \u0627\u0644\u0628\u064a\u0639"],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p11:{cat:'Food &amp; Beverage · Odoo 17 EE',catAr:'Food &amp; Beverage · أودو 17 المؤسسي',title:'FAM FOOD Trading L.L.C',titleAr:'FAM FOOD Trading L.L.C',sub:'FAM FOOD Trading L.L.C · Odoo 17 EE',subAr:'FAM FOOD Trading L.L.C · أودو 17 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Deployed Odoo 17 EE covering "Accounting,Supply Chain,Inventory,Manufacturing,Sales,CRM,HR" for FAM FOOD Trading L.L.C — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات FAM FOOD Trading L.L.C — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Accounting", "Supply Chain", "Inventory", "Manufacturing", "Sales", "CRM", "HR"],scopeAr:["\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f", "\u0627\u0644\u0645\u062e\u0632\u0648\u0646", "\u0627\u0644\u062a\u0635\u0646\u064a\u0639", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a", "\u0627\u0644\u0645\u0648\u0627\u0631\u062f \u0627\u0644\u0628\u0634\u0631\u064a\u0629"],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p12:{cat:'Food &amp; Beverage · Odoo 17 EE',catAr:'Food &amp; Beverage · أودو 17 المؤسسي',title:'Reuof Alsham — Dessert Shop',titleAr:'Reuof Alsham — Dessert Shop',sub:'Reuof Alsham — Dessert Shop · Odoo 17 EE',subAr:'Reuof Alsham — Dessert Shop · أودو 17 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Deployed Odoo 17 EE covering "Accounting,Supply Chain,Inventory,Sales,POS,Branches" for Reuof Alsham — Dessert Shop — unified financial control and operational visibility.',solutionAr:'تطبيق أودو 17 المؤسسي يغطي احتياجات Reuof Alsham — Dessert Shop — توحيد الرقابة المالية والرؤية التشغيلية على منصة واحدة.',scope:["Accounting", "Supply Chain", "Inventory", "Sales", "POS", "Branches"],scopeAr:["\u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629", "\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f", "\u0627\u0644\u0645\u062e\u0632\u0648\u0646", "\u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a", "\u0646\u0642\u0627\u0637 \u0627\u0644\u0628\u064a\u0639", "\u0627\u0644\u0641\u0631\u0648\u0639"],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p13:{cat:'Construction · Odoo 18 EE',catAr:'Construction · أودو 18 المؤسسي',title:'JEF Egypt',titleAr:'JEF Egypt',sub:'JEF Egypt · Odoo 18 EE',subAr:'JEF Egypt · أودو 18 المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p14:{cat:'Construction · Odoo 18 EE',catAr:'Construction · أودو 18 المؤسسي',title:'Advanced Energy Industries',titleAr:'Advanced Energy Industries',sub:'Advanced Energy Industries · Odoo 18 EE',subAr:'Advanced Energy Industries · أودو 18 المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p15:{cat:'Construction · Odoo 15 EE',catAr:'Construction · أودو 15 المؤسسي',title:'Tarek Al-Qahtani &amp; Sons',titleAr:'Tarek Al-Qahtani &amp; Sons',sub:'Tarek Al-Qahtani &amp; Sons · Odoo 15 EE',subAr:'Tarek Al-Qahtani &amp; Sons · أودو 15 المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p16:{cat:'Construction · Odoo 15 EE',catAr:'Construction · أودو 15 المؤسسي',title:'Sulb Al Jazeera',titleAr:'Sulb Al Jazeera',sub:'Sulb Al Jazeera · Odoo 15 EE',subAr:'Sulb Al Jazeera · أودو 15 المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p17:{cat:'Construction · Odoo 12 EE',catAr:'Construction · أودو 12 المؤسسي',title:'MSJ Security Systems',titleAr:'MSJ Security Systems',sub:'MSJ Security Systems · Odoo 12 EE',subAr:'MSJ Security Systems · أودو 12 المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p18:{cat:'Construction · Odex ERP',catAr:'Construction · أوديكس ERP',title:'Mohammed Bin Laden Company',titleAr:'Mohammed Bin Laden Company',sub:'Mohammed Bin Laden Company · Odex ERP',subAr:'Mohammed Bin Laden Company · أوديكس ERP',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p19:{cat:'Construction · Odoo EE',catAr:'Construction · أودو المؤسسي',title:'Process (Const. &amp; Eng. Systems)',titleAr:'Process (Const. &amp; Eng. Systems)',sub:'Process (Const. &amp; Eng. Systems) · Odoo EE',subAr:'Process (Const. &amp; Eng. Systems) · أودو المؤسسي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p20:{cat:'Construction · Odoo 15 CE',catAr:'Construction · أودو 15 المجتمعي',title:'بازار للتصميم الداخلي والديكور',titleAr:'بازار للتصميم الداخلي والديكور',sub:'بازار للتصميم الداخلي والديكور · Odoo 15 CE',subAr:'بازار للتصميم الداخلي والديكور · أودو 15 المجتمعي',challenge:'Project costs tracked in Excel, procurement without formal workflows, petty cash uncontrolled, and month-end reporting requiring 2+ weeks — management had no real-time project performance view.',challengeAr:'تكاليف المشاريع في Excel بلا رؤية فورية، مشتريات بدون سير عمل رسمي، عهد نثرية غير منضبطة، وإعداد تقارير شهرية يستغرق أسبوعين.',solution:'Full Odoo ERP with project-based cost accounting, structured purchase-to-pay workflows, petty cash control, and automated budget vs. actual reporting — a live financial dashboard per project.',solutionAr:'أودو ERP الكامل مع محاسبة تكاليف المشاريع وسير عمل مشتريات منظّم وضبط العهد النثرية وتقارير الميزانية مقابل الفعلي الآلية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📊',title:'Budget vs Actual',titleAr:'الميزانية مقابل الفعلي',desc:'Real-time cost variance per project — overruns visible the moment they occur.',descAr:'تباين التكاليف الفوري لكل مشروع — التجاوزات مرئية فوراً.'},{icon:'🔄',title:'P2P Procurement',titleAr:'ضبط المشتريات',desc:'Purchase-to-pay cycle with three-way matching — unauthorized spending eliminated.',descAr:'دورة المشتريات مع المطابقة الثلاثية — الإنفاق غير المصرح به انتهى.'},{icon:'💵',title:'Petty Cash Control',titleAr:'ضبط العهد النثرية',desc:'Multi-site petty cash digitalized — every expense logged and reconciled.',descAr:'العهد النثرية رُقمنت — كل مصروف مُسجَّل ومُسوَّى.'},{icon:'⚡',title:'3-Day Month-End',titleAr:'إغلاق شهري سريع',desc:'Financial close compressed from 2+ weeks to under 3 days.',descAr:'الإغلاق المالي انخفض من أسبوعين إلى 3 أيام.'}],kpis:[["45%", "Faster Reporting"], ["100%", "Cost Visibility"], ["Live", "Project Dashboard"]],kpisAr:[["45%", "\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"]],outcome:'Management gained full financial clarity across all projects — cost overruns visible instantly, procurement controlled, reporting reduced from weeks to days.',outcomeAr:'حصلت الإدارة على رؤية مالية كاملة لجميع المشاريع — تجاوزات التكلفة مرئية فوراً والتقارير أسرع بكثير.'},
    p21:{cat:'Manufacturing · Odoo 18 EE',catAr:'Manufacturing · أودو 18 المؤسسي',title:'Wahat Alahsa Industrial Factory',titleAr:'Wahat Alahsa Industrial Factory',sub:'Wahat Alahsa Industrial Factory · Odoo 18 EE',subAr:'Wahat Alahsa Industrial Factory · أودو 18 المؤسسي',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Odoo ERP with Manufacturing, Inventory, Purchase, and Accounting — production orders linked to BOMs, real-time stock, and automated procurement from manufacturing demand.',solutionAr:'أودو ERP مع التصنيع والمخزون والمشتريات والمحاسبة — أوامر إنتاج مرتبطة بقوائم المواد ومخزون فوري.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p22:{cat:'Manufacturing · Odoo 17 EE',catAr:'Manufacturing · أودو 17 المؤسسي',title:'Filter Pure Company',titleAr:'Filter Pure Company',sub:'Filter Pure Company · Odoo 17 EE',subAr:'Filter Pure Company · أودو 17 المؤسسي',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Odoo ERP with Manufacturing, Inventory, Purchase, and Accounting — production orders linked to BOMs, real-time stock, and automated procurement from manufacturing demand.',solutionAr:'أودو ERP مع التصنيع والمخزون والمشتريات والمحاسبة — أوامر إنتاج مرتبطة بقوائم المواد ومخزون فوري.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p23:{cat:'Manufacturing · Odoo 17 EE',catAr:'Manufacturing · أودو 17 المؤسسي',title:'Sir Albina Foundation (KSA)',titleAr:'Sir Albina Foundation (KSA)',sub:'Sir Albina Foundation (KSA) · Odoo 17 EE',subAr:'Sir Albina Foundation (KSA) · أودو 17 المؤسسي',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Odoo ERP with Manufacturing, Inventory, Purchase, and Accounting — production orders linked to BOMs, real-time stock, and automated procurement from manufacturing demand.',solutionAr:'أودو ERP مع التصنيع والمخزون والمشتريات والمحاسبة — أوامر إنتاج مرتبطة بقوائم المواد ومخزون فوري.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p24:{cat:'Manufacturing · Odex ERP',catAr:'Manufacturing · أوديكس ERP',title:'عبدالمحسن سعد السهلي',titleAr:'عبدالمحسن سعد السهلي',sub:'عبدالمحسن سعد السهلي · Odex ERP',subAr:'عبدالمحسن سعد السهلي · أوديكس ERP',challenge:'Production planning manual per work order, inventory levels unknown in real time, procurement disconnected from manufacturing demand, no financial view linking costs to profitability.',challengeAr:'تخطيط إنتاج يدوي، مستويات مخزون مجهولة، مشتريات منفصلة عن طلب التصنيع، ولا رؤية مالية تربط التكاليف بالربحية.',solution:'Odoo ERP with Manufacturing, Inventory, Purchase, and Accounting — production orders linked to BOMs, real-time stock, and automated procurement from manufacturing demand.',solutionAr:'أودو ERP مع التصنيع والمخزون والمشتريات والمحاسبة — أوامر إنتاج مرتبطة بقوائم المواد ومخزون فوري.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🏭',title:'Live Production',titleAr:'رؤية الإنتاج الفورية',desc:'Manufacturing orders and work centers unified — real-time production progress.',descAr:'أوامر التصنيع ومراكز العمل موحّدة — تقدم إنتاج فوري.'},{icon:'📦',title:'Inventory Control',titleAr:'مراقبة المخزون',desc:'Raw materials and finished goods tracked in real time — stockouts eliminated.',descAr:'المواد الأولية والبضائع الجاهزة مُتتبّعة فورياً.'},{icon:'🔄',title:'MRP Procurement',titleAr:'مشتريات MRP',desc:'Reorder rules automatically trigger POs from manufacturing demand.',descAr:'قواعد إعادة الطلب تُولِّد أوامر شراء آلياً من طلب التصنيع.'},{icon:'💹',title:'Cost per Product',titleAr:'تكلفة المنتج',desc:'Material, labor, and overhead allocated per production order automatically.',descAr:'المواد والعمالة والتكاليف الإضافية مخصصة لكل أمر إنتاج آلياً.'}],kpis:[["Live", "Production Tracking"], ["100%", "Inventory Visibility"], ["Auto", "Procurement"]],kpisAr:[["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0625\u0646\u062a\u0627\u062c"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u062e\u0632\u0648\u0646"], ["\u0622\u0644\u064a", "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a"]],outcome:'Management sees production status, inventory, and costs in real time — faster decisions and no more planning bottlenecks.',outcomeAr:'الإدارة ترى الإنتاج والمخزون والتكاليف فورياً — قرارات أسرع وإنهاء اختناقات التخطيط.'},
    p25:{cat:'Food &amp; Beverage · Odoo 17 EE',catAr:'Food &amp; Beverage · أودو 17 المؤسسي',title:'Emirol Group',titleAr:'Emirol Group',sub:'Emirol Group · Odoo 17 EE',subAr:'Emirol Group · أودو 17 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p26:{cat:'Food &amp; Beverage · Odoo 18 EE',catAr:'Food &amp; Beverage · أودو 18 المؤسسي',title:'Almarai Alarabia',titleAr:'Almarai Alarabia',sub:'Almarai Alarabia · Odoo 18 EE',subAr:'Almarai Alarabia · أودو 18 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p27:{cat:'Food &amp; Beverage · Odoo 18 EE',catAr:'Food &amp; Beverage · أودو 18 المؤسسي',title:'Hemi Coffee',titleAr:'Hemi Coffee',sub:'Hemi Coffee · Odoo 18 EE',subAr:'Hemi Coffee · أودو 18 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p28:{cat:'Food &amp; Beverage · Odoo 18 EE',catAr:'Food &amp; Beverage · أودو 18 المؤسسي',title:'KRMH كرمة',titleAr:'KRMH كرمة',sub:'KRMH كرمة · Odoo 18 EE',subAr:'KRMH كرمة · أودو 18 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p29:{cat:'Food &amp; Beverage · Odoo 16 EE',catAr:'Food &amp; Beverage · أودو 16 المؤسسي',title:'Cuisine Art Trading',titleAr:'Cuisine Art Trading',sub:'Cuisine Art Trading · Odoo 16 EE',subAr:'Cuisine Art Trading · أودو 16 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p30:{cat:'Food &amp; Beverage · Odoo v13→v15',catAr:'Food &amp; Beverage · ترقية v13→v15',title:'Al-Amoudi Group &amp; Partners',titleAr:'Al-Amoudi Group &amp; Partners',sub:'Al-Amoudi Group &amp; Partners · Odoo v13→v15',subAr:'Al-Amoudi Group &amp; Partners · ترقية v13→v15',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p31:{cat:'Food &amp; Beverage · Odoo 14 EE',catAr:'Food &amp; Beverage · أودو 14 المؤسسي',title:'Eastern Yields',titleAr:'Eastern Yields',sub:'Eastern Yields · Odoo 14 EE',subAr:'Eastern Yields · أودو 14 المؤسسي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p32:{cat:'Food &amp; Beverage · Odoo 16 CE',catAr:'Food &amp; Beverage · أودو 16 المجتمعي',title:'شركة مصنف للتجارة',titleAr:'شركة مصنف للتجارة',sub:'شركة مصنف للتجارة · Odoo 16 CE',subAr:'شركة مصنف للتجارة · أودو 16 المجتمعي',challenge:'Recipe costing manual, POS isolated per branch, inventory shrinkage untracked, and HR/payroll on spreadsheets — no branch-level P&L visibility.',challengeAr:'تكاليف الوصفات يدوية، نقاط البيع معزولة، الهدر غير مرصود، والموارد البشرية على جداول بيانات بدون رؤية أرباح وخسائر.',solution:'Centralized Odoo ERP with multi-branch POS, Manufacturing BOMs for waste control, automated payroll, and live branch-level P&L dashboard.',solutionAr:'أودو ERP المركزي مع نقاط بيع متعددة الفروع وقوائم مواد لضبط الهدر ورواتب آلية ولوحة أرباح وخسائر حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🧪',title:'Recipe Cost Control',titleAr:'ضبط تكاليف الوصفات',desc:'BOMs per menu item — every sale deducts ingredients and calculates real cost automatically.',descAr:'قوائم مواد لكل عنصر — كل بيع يخصم المكونات ويحسب التكلفة آلياً.'},{icon:'🏪',title:'Multi-Branch POS',titleAr:'نقاط بيع متعددة الفروع',desc:'All POS terminals centralized — sales, cash, and stock flow into one system in real time.',descAr:'جميع طرفيات نقاط البيع مركزية — مبيعات ونقد ومخزون في نظام واحد.'},{icon:'📉',title:'Waste Tracking',titleAr:'تتبع الهدر',desc:'Automated variance between theoretical and actual consumption — waste surfaced per branch.',descAr:'التباين الآلي بين الاستهلاك النظري والفعلي — الهدر مرئي لكل فرع.'},{icon:'💼',title:'Payroll Automation',titleAr:'أتمتة الرواتب',desc:'Branch payroll automated end-to-end — no more manual spreadsheet calculations.',descAr:'رواتب الفروع مؤتمتة من البداية للنهاية.'}],kpis:[["60%", "Waste Reduced"], ["Live", "Branch P&L"], ["100%", "Payroll Auto"]],kpisAr:[["60%", "\u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0647\u062f\u0631"], ["\u0641\u0648\u0631\u064a", "\u0623\u0631\u0628\u0627\u062d \u0648\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u0641\u0631\u0639"], ["100%", "\u0623\u062a\u0645\u062a\u0629 \u0627\u0644\u0631\u0648\u0627\u062a\u0628"]],outcome:'Management gained full visibility over each branch profitability — waste controlled, payroll automated, recipe costing accurate.',outcomeAr:'الإدارة حصلت على رؤية كاملة لربحية كل فرع — الهدر مضبوط والرواتب مؤتمتة.'},
    p33:{cat:'Retail &amp; eCommerce · Odoo 17 EE',catAr:'Retail &amp; eCommerce · أودو 17 المؤسسي',title:'Aroma Sense',titleAr:'Aroma Sense',sub:'Aroma Sense · Odoo 17 EE',subAr:'Aroma Sense · أودو 17 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p34:{cat:'Retail &amp; eCommerce · Odoo 17 EE',catAr:'Retail &amp; eCommerce · أودو 17 المؤسسي',title:'Abdul Hameed Khoory',titleAr:'Abdul Hameed Khoory',sub:'Abdul Hameed Khoory · Odoo 17 EE',subAr:'Abdul Hameed Khoory · أودو 17 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p35:{cat:'Retail &amp; eCommerce · Odoo 18 EE',catAr:'Retail &amp; eCommerce · أودو 18 المؤسسي',title:'Sammakieh Timbers',titleAr:'Sammakieh Timbers',sub:'Sammakieh Timbers · Odoo 18 EE',subAr:'Sammakieh Timbers · أودو 18 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p36:{cat:'Retail &amp; eCommerce · Odoo 17 EE',catAr:'Retail &amp; eCommerce · أودو 17 المؤسسي',title:'Sogac International',titleAr:'Sogac International',sub:'Sogac International · Odoo 17 EE',subAr:'Sogac International · أودو 17 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p37:{cat:'Retail &amp; eCommerce · Odoo 18 EE',catAr:'Retail &amp; eCommerce · أودو 18 المؤسسي',title:'SLIM&amp;FIT NUTRITION',titleAr:'SLIM&amp;FIT NUTRITION',sub:'SLIM&amp;FIT NUTRITION · Odoo 18 EE',subAr:'SLIM&amp;FIT NUTRITION · أودو 18 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p38:{cat:'Retail &amp; eCommerce · Odoo 18 EE',catAr:'Retail &amp; eCommerce · أودو 18 المؤسسي',title:'CashPrime Co. Ltd.',titleAr:'CashPrime Co. Ltd.',sub:'CashPrime Co. Ltd. · Odoo 18 EE',subAr:'CashPrime Co. Ltd. · أودو 18 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p39:{cat:'Retail &amp; eCommerce · Odoo 18 EE',catAr:'Retail &amp; eCommerce · أودو 18 المؤسسي',title:'Smart Shelf',titleAr:'Smart Shelf',sub:'Smart Shelf · Odoo 18 EE',subAr:'Smart Shelf · أودو 18 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p40:{cat:'Retail &amp; eCommerce · Odoo 18 EE',catAr:'Retail &amp; eCommerce · أودو 18 المؤسسي',title:'ERA Lighting Co.',titleAr:'ERA Lighting Co.',sub:'ERA Lighting Co. · Odoo 18 EE',subAr:'ERA Lighting Co. · أودو 18 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p41:{cat:'Retail &amp; eCommerce · Odoo 15 EE',catAr:'Retail &amp; eCommerce · أودو 15 المؤسسي',title:'Sabtrd',titleAr:'Sabtrd',sub:'Sabtrd · Odoo 15 EE',subAr:'Sabtrd · أودو 15 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p42:{cat:'Retail &amp; eCommerce · Odoo v12→v15',catAr:'Retail &amp; eCommerce · ترقية v12→v15',title:'My Little Home',titleAr:'My Little Home',sub:'My Little Home · Odoo v12→v15',subAr:'My Little Home · ترقية v12→v15',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p43:{cat:'Retail &amp; eCommerce · Odoo 17 EE',catAr:'Retail &amp; eCommerce · أودو 17 المؤسسي',title:'Etqan Installation Trading',titleAr:'Etqan Installation Trading',sub:'Etqan Installation Trading · Odoo 17 EE',subAr:'Etqan Installation Trading · أودو 17 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p44:{cat:'Retail &amp; eCommerce · Odoo 17 EE',catAr:'Retail &amp; eCommerce · أودو 17 المؤسسي',title:'Selaty AlMuhaseel Trading',titleAr:'Selaty AlMuhaseel Trading',sub:'Selaty AlMuhaseel Trading · Odoo 17 EE',subAr:'Selaty AlMuhaseel Trading · أودو 17 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p45:{cat:'Retail &amp; eCommerce · Odoo EE',catAr:'Retail &amp; eCommerce · أودو المؤسسي',title:'RicRac Shop',titleAr:'RicRac Shop',sub:'RicRac Shop · Odoo EE',subAr:'RicRac Shop · أودو المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p46:{cat:'Retail &amp; eCommerce · Odoo 16 EE',catAr:'Retail &amp; eCommerce · أودو 16 المؤسسي',title:'Qafa Arabia',titleAr:'Qafa Arabia',sub:'Qafa Arabia · Odoo 16 EE',subAr:'Qafa Arabia · أودو 16 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p47:{cat:'Retail &amp; eCommerce · Odoo 17 EE',catAr:'Retail &amp; eCommerce · أودو 17 المؤسسي',title:'INmart Store',titleAr:'INmart Store',sub:'INmart Store · Odoo 17 EE',subAr:'INmart Store · أودو 17 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p48:{cat:'Retail &amp; eCommerce · Odoo 17 EE',catAr:'Retail &amp; eCommerce · أودو 17 المؤسسي',title:'UltraMade Nutrition',titleAr:'UltraMade Nutrition',sub:'UltraMade Nutrition · Odoo 17 EE',subAr:'UltraMade Nutrition · أودو 17 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p49:{cat:'Retail &amp; eCommerce · Odoo EE',catAr:'Retail &amp; eCommerce · أودو المؤسسي',title:'Rosekid Kids Products',titleAr:'Rosekid Kids Products',sub:'Rosekid Kids Products · Odoo EE',subAr:'Rosekid Kids Products · أودو المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p50:{cat:'Retail &amp; eCommerce · Odoo EE',catAr:'Retail &amp; eCommerce · أودو المؤسسي',title:'شخصية الرجل Men\'s Fashion',titleAr:'شخصية الرجل Men\'s Fashion',sub:'شخصية الرجل Men\'s Fashion · Odoo EE',subAr:'شخصية الرجل Men\'s Fashion · أودو المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p51:{cat:'Retail &amp; eCommerce · Odoo 15 EE',catAr:'Retail &amp; eCommerce · أودو 15 المؤسسي',title:'متجر الجمال الشامل – Sindam',titleAr:'متجر الجمال الشامل – Sindam',sub:'متجر الجمال الشامل – Sindam · Odoo 15 EE',subAr:'متجر الجمال الشامل – Sindam · أودو 15 المؤسسي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p52:{cat:'Retail &amp; eCommerce · Odoo 14 CE',catAr:'Retail &amp; eCommerce · أودو 14 المجتمعي',title:'كتوبيا للنشر والتوزيع',titleAr:'كتوبيا للنشر والتوزيع',sub:'كتوبيا للنشر والتوزيع · Odoo 14 CE',subAr:'كتوبيا للنشر والتوزيع · أودو 14 المجتمعي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p53:{cat:'Retail &amp; eCommerce · Odoo 15 CE',catAr:'Retail &amp; eCommerce · أودو 15 المجتمعي',title:'Greena',titleAr:'Greena',sub:'Greena · Odoo 15 CE',subAr:'Greena · أودو 15 المجتمعي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p54:{cat:'Retail &amp; eCommerce · Odoo Support',catAr:'Retail &amp; eCommerce · دعم أودو',title:'Zinati',titleAr:'Zinati',sub:'Zinati · Odoo Support',subAr:'Zinati · دعم أودو',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p55:{cat:'Retail &amp; eCommerce · Odoo 15 CE',catAr:'Retail &amp; eCommerce · أودو 15 المجتمعي',title:'رؤية المستقبل للأجهزة الأمنية',titleAr:'رؤية المستقبل للأجهزة الأمنية',sub:'رؤية المستقبل للأجهزة الأمنية · Odoo 15 CE',subAr:'رؤية المستقبل للأجهزة الأمنية · أودو 15 المجتمعي',challenge:'Physical and online channels siloed — stock mismatched daily, orders duplicated, reconciliation manual, no unified customer view.',challengeAr:'القنوات المادية والإلكترونية معزولة — مخزون غير متطابق، طلبات مكرّرة، تسوية يدوية، ولا رؤية موحّدة للعملاء.',solution:'Odoo ERP with unified POS, inventory, e-commerce integration, CRM, and Accounting — one source of truth for all channels.',solutionAr:'أودو ERP مع توحيد نقاط البيع والمخزون وتكامل التجارة الإلكترونية وإدارة العلاقات والمحاسبة.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📦',title:'Zero Stock Errors',titleAr:'صفر أخطاء مخزون',desc:'Real-time stock sync across all channels — every sale updates inventory instantly.',descAr:'مزامنة مخزون فورية عبر جميع القنوات.'},{icon:'💳',title:'Unified Customer',titleAr:'عميل موحّد',desc:'Purchase history and loyalty merged across all touchpoints.',descAr:'تاريخ المشتريات والولاء مدمج عبر جميع نقاط التواصل.'},{icon:'📊',title:'Live Reconciliation',titleAr:'تسوية فورية',desc:'All channel sales post to Accounting automatically — no nightly manual work.',descAr:'مبيعات جميع القنوات تُرحَّل آلياً بدون عمل يدوي.'},{icon:'🔗',title:'Channel Sync',titleAr:'تزامن القنوات',desc:'POS and online platform synchronized — consistent pricing and availability.',descAr:'نقاط البيع والمنصة الإلكترونية متزامنة فورياً.'}],kpis:[["0", "Stock Discrepancies"], ["Live", "Channel Sync"], ["100%", "Order Accuracy"]],kpisAr:[["0", "\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0645\u062e\u0632\u0648\u0646"], ["\u0641\u0648\u0631\u064a", "\u062a\u0632\u0627\u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a"], ["100%", "\u062f\u0642\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a"]],outcome:'A single operational reality across all retail channels — inventory accurate, revenue reconciled, customer data unified.',outcomeAr:'واقع تشغيلي موحّد عبر جميع قنوات التجزئة — مخزون دقيق وإيرادات مسوّاة.'},
    p56:{cat:'Logistics · Odoo 17 EE',catAr:'Logistics · أودو 17 المؤسسي',title:'TIBA 2000 Security Solutions',titleAr:'TIBA 2000 Security Solutions',sub:'TIBA 2000 Security Solutions · Odoo 17 EE',subAr:'TIBA 2000 Security Solutions · أودو 17 المؤسسي',challenge:'Shipment tracking manual, billing errors frequent, field operations unlinked from management, and no consolidated freight dashboard.',challengeAr:'تتبع الشحنات يدوي، أخطاء فواتير متكررة، عمليات ميدانية غير مرتبطة، ولا لوحة أداء شحن موحّدة.',solution:'Full Odoo ERP with multi-warehouse inventory, integrated accounting, field services, and live shipment tracking — all freight unified on one platform.',solutionAr:'أودو ERP الكامل مع مخزون متعدد المستودعات ومحاسبة متكاملة وخدمات ميدانية ولوحة تتبع شحنات حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📡',title:'Live Freight Tracking',titleAr:'تتبع شحنات فوري',desc:'Real-time shipment status replaced manual calls — full visibility at all times.',descAr:'حالة الشحنات الفورية استبدلت المكالمات اليدوية.'},{icon:'🏗️',title:'Multi-Warehouse Unified',titleAr:'توحيد المستودعات',desc:'All warehouses and stock movements consolidated — zero data silos.',descAr:'جميع المستودعات وحركات المخزون موحّدة.'},{icon:'🧾',title:'Auto Billing',titleAr:'فوترة آلية',desc:'Billing tied to shipment milestones — invoice errors eliminated.',descAr:'الفوترة مرتبطة بمراحل الشحن — أخطاء الفواتير انتهت.'},{icon:'🔧',title:'Field Integration',titleAr:'تكامل الفريق الميداني',desc:'Field teams connected via Odoo — job assignment and status updates from site.',descAr:'الفرق الميدانية متصلة عبر أودو — تعيين مهام وتحديثات من الموقع.'}],kpis:[["40%", "Faster Processing"], ["100%", "Shipment Visibility"], ["Live", "Billing Accuracy"]],kpisAr:[["40%", "\u0623\u0633\u0631\u0639 \u0645\u0639\u0627\u0644\u062c\u0629"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0634\u062d\u0646\u0627\u062a"], ["\u0641\u0648\u0631\u064a", "\u062f\u0642\u0629 \u0627\u0644\u0641\u0648\u0627\u062a\u064a\u0631"]],outcome:'A live freight command center — shipment status, billing, and warehouse performance from a single screen.',outcomeAr:'مركز قيادة شحن حي — حالة الشحنات والفواتير وأداء المستودعات من شاشة واحدة.'},
    p57:{cat:'Logistics · Odex ERP',catAr:'Logistics · أوديكس ERP',title:'Ensan',titleAr:'Ensan',sub:'Ensan · Odex ERP',subAr:'Ensan · أوديكس ERP',challenge:'Shipment tracking manual, billing errors frequent, field operations unlinked from management, and no consolidated freight dashboard.',challengeAr:'تتبع الشحنات يدوي، أخطاء فواتير متكررة، عمليات ميدانية غير مرتبطة، ولا لوحة أداء شحن موحّدة.',solution:'Full Odoo ERP with multi-warehouse inventory, integrated accounting, field services, and live shipment tracking — all freight unified on one platform.',solutionAr:'أودو ERP الكامل مع مخزون متعدد المستودعات ومحاسبة متكاملة وخدمات ميدانية ولوحة تتبع شحنات حية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📡',title:'Live Freight Tracking',titleAr:'تتبع شحنات فوري',desc:'Real-time shipment status replaced manual calls — full visibility at all times.',descAr:'حالة الشحنات الفورية استبدلت المكالمات اليدوية.'},{icon:'🏗️',title:'Multi-Warehouse Unified',titleAr:'توحيد المستودعات',desc:'All warehouses and stock movements consolidated — zero data silos.',descAr:'جميع المستودعات وحركات المخزون موحّدة.'},{icon:'🧾',title:'Auto Billing',titleAr:'فوترة آلية',desc:'Billing tied to shipment milestones — invoice errors eliminated.',descAr:'الفوترة مرتبطة بمراحل الشحن — أخطاء الفواتير انتهت.'},{icon:'🔧',title:'Field Integration',titleAr:'تكامل الفريق الميداني',desc:'Field teams connected via Odoo — job assignment and status updates from site.',descAr:'الفرق الميدانية متصلة عبر أودو — تعيين مهام وتحديثات من الموقع.'}],kpis:[["40%", "Faster Processing"], ["100%", "Shipment Visibility"], ["Live", "Billing Accuracy"]],kpisAr:[["40%", "\u0623\u0633\u0631\u0639 \u0645\u0639\u0627\u0644\u062c\u0629"], ["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0634\u062d\u0646\u0627\u062a"], ["\u0641\u0648\u0631\u064a", "\u062f\u0642\u0629 \u0627\u0644\u0641\u0648\u0627\u062a\u064a\u0631"]],outcome:'A live freight command center — shipment status, billing, and warehouse performance from a single screen.',outcomeAr:'مركز قيادة شحن حي — حالة الشحنات والفواتير وأداء المستودعات من شاشة واحدة.'},
    p58:{cat:'Real Estate · Odoo 17 EE',catAr:'Real Estate · أودو 17 المؤسسي',title:'Hittin Union Real Estate',titleAr:'Hittin Union Real Estate',sub:'Hittin Union Real Estate · Odoo 17 EE',subAr:'Hittin Union Real Estate · أودو 17 المؤسسي',challenge:'Property sales, construction tracking, and asset management in separate systems — no unified profitability view or receivables aging.',challengeAr:'مبيعات عقارات وتتبع بناء وإدارة أصول في أنظمة منفصلة — بدون رؤية ربحية موحّدة أو أعمار مستحقات.',solution:'Odoo ERP: Real Estate, Construction, Projects, Accounting, HR — live pipeline, cost vs. budget, and receivables aging in one dashboard.',solutionAr:'أودو ERP: عقارات وبناء ومشاريع ومحاسبة وموارد بشرية — خط أنابيب حي والتكاليف مقابل الميزانية وأعمار المستحقات.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🏗️',title:'Cost per Project',titleAr:'تكلفة المشروع',desc:'Each project phase mapped to cost centers — budget vs. actual per unit in real time.',descAr:'كل مرحلة مشروع مرتبطة بمراكز تكلفة — الميزانية مقابل الفعلي فوراً.'},{icon:'💰',title:'Receivables Aging',titleAr:'أعمار المستحقات',desc:'Live receivables by unit and buyer — collections team has full picture.',descAr:'مستحقات حية بالوحدة والمشتري — فريق التحصيل برؤية كاملة.'},{icon:'📈',title:'Unit Profitability',titleAr:'ربحية الوحدات',desc:'Revenue, cost, and overhead per unit — most profitable projects identified.',descAr:'إيرادات وتكاليف لكل وحدة — المشاريع الأكثر ربحية محدّدة.'},{icon:'🏢',title:'Asset Registry',titleAr:'سجل الأصول',desc:'All properties registered — depreciation, maintenance, and rental tracked.',descAr:'جميع العقارات مسجّلة — استهلاك وصيانة وإيجار مُتتبَّع.'}],kpis:[["1", "Unified Platform"], ["Live", "Receivables"], ["Full", "Cost Visibility"]],kpisAr:[["1", "\u0645\u0646\u0635\u0629 \u0645\u0648\u062d\u0651\u062f\u0629"], ["\u0641\u0648\u0631\u064a", "\u0627\u0644\u0645\u0633\u062a\u062d\u0642\u0627\u062a"], ["\u0643\u0627\u0645\u0644", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"]],outcome:'Complete view from sales contract through construction to handover — every project and receivable in one platform.',outcomeAr:'رؤية كاملة من عقد البيع حتى التسليم — كل مشروع ومستحق في منصة واحدة.'},
    p59:{cat:'Real Estate · Odoo 18 EE',catAr:'Real Estate · أودو 18 المؤسسي',title:'Trans Emirates Property L.L.C',titleAr:'Trans Emirates Property L.L.C',sub:'Trans Emirates Property L.L.C · Odoo 18 EE',subAr:'Trans Emirates Property L.L.C · أودو 18 المؤسسي',challenge:'Property sales, construction tracking, and asset management in separate systems — no unified profitability view or receivables aging.',challengeAr:'مبيعات عقارات وتتبع بناء وإدارة أصول في أنظمة منفصلة — بدون رؤية ربحية موحّدة أو أعمار مستحقات.',solution:'Odoo ERP: Real Estate, Construction, Projects, Accounting, HR — live pipeline, cost vs. budget, and receivables aging in one dashboard.',solutionAr:'أودو ERP: عقارات وبناء ومشاريع ومحاسبة وموارد بشرية — خط أنابيب حي والتكاليف مقابل الميزانية وأعمار المستحقات.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🏗️',title:'Cost per Project',titleAr:'تكلفة المشروع',desc:'Each project phase mapped to cost centers — budget vs. actual per unit in real time.',descAr:'كل مرحلة مشروع مرتبطة بمراكز تكلفة — الميزانية مقابل الفعلي فوراً.'},{icon:'💰',title:'Receivables Aging',titleAr:'أعمار المستحقات',desc:'Live receivables by unit and buyer — collections team has full picture.',descAr:'مستحقات حية بالوحدة والمشتري — فريق التحصيل برؤية كاملة.'},{icon:'📈',title:'Unit Profitability',titleAr:'ربحية الوحدات',desc:'Revenue, cost, and overhead per unit — most profitable projects identified.',descAr:'إيرادات وتكاليف لكل وحدة — المشاريع الأكثر ربحية محدّدة.'},{icon:'🏢',title:'Asset Registry',titleAr:'سجل الأصول',desc:'All properties registered — depreciation, maintenance, and rental tracked.',descAr:'جميع العقارات مسجّلة — استهلاك وصيانة وإيجار مُتتبَّع.'}],kpis:[["1", "Unified Platform"], ["Live", "Receivables"], ["Full", "Cost Visibility"]],kpisAr:[["1", "\u0645\u0646\u0635\u0629 \u0645\u0648\u062d\u0651\u062f\u0629"], ["\u0641\u0648\u0631\u064a", "\u0627\u0644\u0645\u0633\u062a\u062d\u0642\u0627\u062a"], ["\u0643\u0627\u0645\u0644", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"]],outcome:'Complete view from sales contract through construction to handover — every project and receivable in one platform.',outcomeAr:'رؤية كاملة من عقد البيع حتى التسليم — كل مشروع ومستحق في منصة واحدة.'},
    p60:{cat:'Real Estate · Odoo 14 EE',catAr:'Real Estate · أودو 14 المؤسسي',title:'Al Rajhi Ekhwan',titleAr:'Al Rajhi Ekhwan',sub:'Al Rajhi Ekhwan · Odoo 14 EE',subAr:'Al Rajhi Ekhwan · أودو 14 المؤسسي',challenge:'Property sales, construction tracking, and asset management in separate systems — no unified profitability view or receivables aging.',challengeAr:'مبيعات عقارات وتتبع بناء وإدارة أصول في أنظمة منفصلة — بدون رؤية ربحية موحّدة أو أعمار مستحقات.',solution:'Odoo ERP: Real Estate, Construction, Projects, Accounting, HR — live pipeline, cost vs. budget, and receivables aging in one dashboard.',solutionAr:'أودو ERP: عقارات وبناء ومشاريع ومحاسبة وموارد بشرية — خط أنابيب حي والتكاليف مقابل الميزانية وأعمار المستحقات.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'🏗️',title:'Cost per Project',titleAr:'تكلفة المشروع',desc:'Each project phase mapped to cost centers — budget vs. actual per unit in real time.',descAr:'كل مرحلة مشروع مرتبطة بمراكز تكلفة — الميزانية مقابل الفعلي فوراً.'},{icon:'💰',title:'Receivables Aging',titleAr:'أعمار المستحقات',desc:'Live receivables by unit and buyer — collections team has full picture.',descAr:'مستحقات حية بالوحدة والمشتري — فريق التحصيل برؤية كاملة.'},{icon:'📈',title:'Unit Profitability',titleAr:'ربحية الوحدات',desc:'Revenue, cost, and overhead per unit — most profitable projects identified.',descAr:'إيرادات وتكاليف لكل وحدة — المشاريع الأكثر ربحية محدّدة.'},{icon:'🏢',title:'Asset Registry',titleAr:'سجل الأصول',desc:'All properties registered — depreciation, maintenance, and rental tracked.',descAr:'جميع العقارات مسجّلة — استهلاك وصيانة وإيجار مُتتبَّع.'}],kpis:[["1", "Unified Platform"], ["Live", "Receivables"], ["Full", "Cost Visibility"]],kpisAr:[["1", "\u0645\u0646\u0635\u0629 \u0645\u0648\u062d\u0651\u062f\u0629"], ["\u0641\u0648\u0631\u064a", "\u0627\u0644\u0645\u0633\u062a\u062d\u0642\u0627\u062a"], ["\u0643\u0627\u0645\u0644", "\u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641"]],outcome:'Complete view from sales contract through construction to handover — every project and receivable in one platform.',outcomeAr:'رؤية كاملة من عقد البيع حتى التسليم — كل مشروع ومستحق في منصة واحدة.'},
    p61:{cat:'Government · Odex ERP',catAr:'Government · أوديكس ERP',title:'Tamakkon Association',titleAr:'Tamakkon Association',sub:'Tamakkon Association · Odex ERP',subAr:'Tamakkon Association · أوديكس ERP',challenge:'Paper-based finance and HR in a public institution — no BI, no KPI dashboards, inventory and projects disconnected.',challengeAr:'مالية وموارد بشرية ورقية في مؤسسة حكومية — بلا ذكاء أعمال ولا لوحات KPI.',solution:'Full Odex/Odoo ERP: Finance, HR, Inventory, CRM, Projects — complete data migration and executive BI dashboard.',solutionAr:'Odex/أودو ERP الكامل: مالية وموارد بشرية ومخزون وإدارة علاقات ومشاريع — ترحيل بيانات كامل ولوحة BI تنفيذية.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'📚',title:'Data Migration',titleAr:'ترحيل البيانات',desc:'All historical records migrated — zero data loss, full audit trail.',descAr:'جميع السجلات التاريخية رُحِّلت بدون فقدان بيانات.'},{icon:'📊',title:'Executive KPIs',titleAr:'مؤشرات تنفيذية',desc:'Live institutional KPIs replace manual weekly reports.',descAr:'مؤشرات مؤسسية حية تستبدل التقارير الأسبوعية.'},{icon:'🏛️',title:'HR Digitalized',titleAr:'موارد بشرية رقمية',desc:'Employee records, leave, attendance, payroll fully paperless.',descAr:'سجلات الموظفين والإجازات والرواتب بلا ورق.'},{icon:'🔄',title:'Auto Workflows',titleAr:'سير عمل آلي',desc:'Budget control, procurement, and reporting automated end-to-end.',descAr:'الميزانية والمشتريات والتقارير مؤتمتة كلياً.'}],kpis:[["100%", "Data Migrated"], ["Live", "KPI Dashboard"], ["0", "Manual Reports"]],kpisAr:[["100%", "\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u064f\u0631\u062d\u064e\u0651\u0644\u0629"], ["\u0641\u0648\u0631\u064a", "\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062a"], ["0", "\u062a\u0642\u0627\u0631\u064a\u0631 \u064a\u062f\u0648\u064a\u0629"]],outcome:'Institution transformed to fully digital — leadership accessing real-time performance for the first time.',outcomeAr:'المؤسسة تحوّلت إلى رقمية كاملة — القيادة تصل إلى الأداء فورياً للمرة الأولى.'},
    p62:{cat:'Services · Odoo 17 EE',catAr:'Services · أودو 17 المؤسسي',title:'Infinity Medicals',titleAr:'Infinity Medicals',sub:'Infinity Medicals · Odoo 17 EE',subAr:'Infinity Medicals · أودو 17 المؤسسي',challenge:'Service delivery, billing, and HR on disconnected platforms — no unified client history, manual invoicing after completion, no resource capacity visibility.',challengeAr:'تقديم خدمات وفوترة وموارد بشرية على منصات منفصلة — بلا تاريخ عملاء موحّد وفواتير يدوية وبلا رؤية طاقة موارد.',solution:'Odoo ERP: CRM, Projects, Accounting, HR, Field Services — client acquisition through delivery to invoicing in one automated workflow.',solutionAr:'أودو ERP: إدارة علاقات ومشاريع ومحاسبة وموارد بشرية وخدمات ميدانية — من العميل إلى التسليم إلى الفاتورة في سير عمل آلي واحد.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'👤',title:'Client 360',titleAr:'رؤية 360 للعميل',desc:'Full client history — proposals, projects, invoices, support all in one view.',descAr:'تاريخ العميل الكامل — عروض ومشاريع وفواتير ودعم في رؤية واحدة.'},{icon:'⚡',title:'Auto Invoicing',titleAr:'فوترة آلية',desc:'Project milestones trigger invoices — billing cycle from days to minutes.',descAr:'مراحل المشروع تُولِّد فواتير آلياً.'},{icon:'📊',title:'Capacity Planning',titleAr:'تخطيط الطاقة',desc:'Team utilization and availability visible — no more overcommitment.',descAr:'استخدام الفريق والتوافر مرئي — لا إرهاق في التزامات.'},{icon:'🔄',title:'End-to-End Workflow',titleAr:'سير عمل متكامل',desc:'Lead to invoice managed in one platform without manual handoffs.',descAr:'من العميل المحتمل إلى الفاتورة في منصة واحدة.'}],kpis:[["100%", "Client Visibility"], ["Live", "Project Tracking"], ["Auto", "Invoicing"]],kpisAr:[["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621"], ["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"], ["\u0622\u0644\u064a", "\u0627\u0644\u0641\u0648\u062a\u0631\u0629"]],outcome:'Unified view from client acquisition through delivery — billing automated, team capacity visible.',outcomeAr:'رؤية موحّدة من استقطاب العميل حتى التسليم — فوترة آلية وطاقة الفريق مرئية.'},
    p63:{cat:'Services · Odoo 18 EE',catAr:'Services · أودو 18 المؤسسي',title:'Seet Marketing Solutions',titleAr:'Seet Marketing Solutions',sub:'Seet Marketing Solutions · Odoo 18 EE',subAr:'Seet Marketing Solutions · أودو 18 المؤسسي',challenge:'Service delivery, billing, and HR on disconnected platforms — no unified client history, manual invoicing after completion, no resource capacity visibility.',challengeAr:'تقديم خدمات وفوترة وموارد بشرية على منصات منفصلة — بلا تاريخ عملاء موحّد وفواتير يدوية وبلا رؤية طاقة موارد.',solution:'Odoo ERP: CRM, Projects, Accounting, HR, Field Services — client acquisition through delivery to invoicing in one automated workflow.',solutionAr:'أودو ERP: إدارة علاقات ومشاريع ومحاسبة وموارد بشرية وخدمات ميدانية — من العميل إلى التسليم إلى الفاتورة في سير عمل آلي واحد.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'👤',title:'Client 360',titleAr:'رؤية 360 للعميل',desc:'Full client history — proposals, projects, invoices, support all in one view.',descAr:'تاريخ العميل الكامل — عروض ومشاريع وفواتير ودعم في رؤية واحدة.'},{icon:'⚡',title:'Auto Invoicing',titleAr:'فوترة آلية',desc:'Project milestones trigger invoices — billing cycle from days to minutes.',descAr:'مراحل المشروع تُولِّد فواتير آلياً.'},{icon:'📊',title:'Capacity Planning',titleAr:'تخطيط الطاقة',desc:'Team utilization and availability visible — no more overcommitment.',descAr:'استخدام الفريق والتوافر مرئي — لا إرهاق في التزامات.'},{icon:'🔄',title:'End-to-End Workflow',titleAr:'سير عمل متكامل',desc:'Lead to invoice managed in one platform without manual handoffs.',descAr:'من العميل المحتمل إلى الفاتورة في منصة واحدة.'}],kpis:[["100%", "Client Visibility"], ["Live", "Project Tracking"], ["Auto", "Invoicing"]],kpisAr:[["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621"], ["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"], ["\u0622\u0644\u064a", "\u0627\u0644\u0641\u0648\u062a\u0631\u0629"]],outcome:'Unified view from client acquisition through delivery — billing automated, team capacity visible.',outcomeAr:'رؤية موحّدة من استقطاب العميل حتى التسليم — فوترة آلية وطاقة الفريق مرئية.'},
    p64:{cat:'Services · Odoo 17 EE',catAr:'Services · أودو 17 المؤسسي',title:'Cavalero Salon FZ LLC',titleAr:'Cavalero Salon FZ LLC',sub:'Cavalero Salon FZ LLC · Odoo 17 EE',subAr:'Cavalero Salon FZ LLC · أودو 17 المؤسسي',challenge:'Service delivery, billing, and HR on disconnected platforms — no unified client history, manual invoicing after completion, no resource capacity visibility.',challengeAr:'تقديم خدمات وفوترة وموارد بشرية على منصات منفصلة — بلا تاريخ عملاء موحّد وفواتير يدوية وبلا رؤية طاقة موارد.',solution:'Odoo ERP: CRM, Projects, Accounting, HR, Field Services — client acquisition through delivery to invoicing in one automated workflow.',solutionAr:'أودو ERP: إدارة علاقات ومشاريع ومحاسبة وموارد بشرية وخدمات ميدانية — من العميل إلى التسليم إلى الفاتورة في سير عمل آلي واحد.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'👤',title:'Client 360',titleAr:'رؤية 360 للعميل',desc:'Full client history — proposals, projects, invoices, support all in one view.',descAr:'تاريخ العميل الكامل — عروض ومشاريع وفواتير ودعم في رؤية واحدة.'},{icon:'⚡',title:'Auto Invoicing',titleAr:'فوترة آلية',desc:'Project milestones trigger invoices — billing cycle from days to minutes.',descAr:'مراحل المشروع تُولِّد فواتير آلياً.'},{icon:'📊',title:'Capacity Planning',titleAr:'تخطيط الطاقة',desc:'Team utilization and availability visible — no more overcommitment.',descAr:'استخدام الفريق والتوافر مرئي — لا إرهاق في التزامات.'},{icon:'🔄',title:'End-to-End Workflow',titleAr:'سير عمل متكامل',desc:'Lead to invoice managed in one platform without manual handoffs.',descAr:'من العميل المحتمل إلى الفاتورة في منصة واحدة.'}],kpis:[["100%", "Client Visibility"], ["Live", "Project Tracking"], ["Auto", "Invoicing"]],kpisAr:[["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621"], ["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"], ["\u0622\u0644\u064a", "\u0627\u0644\u0641\u0648\u062a\u0631\u0629"]],outcome:'Unified view from client acquisition through delivery — billing automated, team capacity visible.',outcomeAr:'رؤية موحّدة من استقطاب العميل حتى التسليم — فوترة آلية وطاقة الفريق مرئية.'},
    p65:{cat:'Services · Odoo 15 EE',catAr:'Services · أودو 15 المؤسسي',title:'AbdulAziz Almodhy Law Firm',titleAr:'AbdulAziz Almodhy Law Firm',sub:'AbdulAziz Almodhy Law Firm · Odoo 15 EE',subAr:'AbdulAziz Almodhy Law Firm · أودو 15 المؤسسي',challenge:'Service delivery, billing, and HR on disconnected platforms — no unified client history, manual invoicing after completion, no resource capacity visibility.',challengeAr:'تقديم خدمات وفوترة وموارد بشرية على منصات منفصلة — بلا تاريخ عملاء موحّد وفواتير يدوية وبلا رؤية طاقة موارد.',solution:'Odoo ERP: CRM, Projects, Accounting, HR, Field Services — client acquisition through delivery to invoicing in one automated workflow.',solutionAr:'أودو ERP: إدارة علاقات ومشاريع ومحاسبة وموارد بشرية وخدمات ميدانية — من العميل إلى التسليم إلى الفاتورة في سير عمل آلي واحد.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'👤',title:'Client 360',titleAr:'رؤية 360 للعميل',desc:'Full client history — proposals, projects, invoices, support all in one view.',descAr:'تاريخ العميل الكامل — عروض ومشاريع وفواتير ودعم في رؤية واحدة.'},{icon:'⚡',title:'Auto Invoicing',titleAr:'فوترة آلية',desc:'Project milestones trigger invoices — billing cycle from days to minutes.',descAr:'مراحل المشروع تُولِّد فواتير آلياً.'},{icon:'📊',title:'Capacity Planning',titleAr:'تخطيط الطاقة',desc:'Team utilization and availability visible — no more overcommitment.',descAr:'استخدام الفريق والتوافر مرئي — لا إرهاق في التزامات.'},{icon:'🔄',title:'End-to-End Workflow',titleAr:'سير عمل متكامل',desc:'Lead to invoice managed in one platform without manual handoffs.',descAr:'من العميل المحتمل إلى الفاتورة في منصة واحدة.'}],kpis:[["100%", "Client Visibility"], ["Live", "Project Tracking"], ["Auto", "Invoicing"]],kpisAr:[["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621"], ["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"], ["\u0622\u0644\u064a", "\u0627\u0644\u0641\u0648\u062a\u0631\u0629"]],outcome:'Unified view from client acquisition through delivery — billing automated, team capacity visible.',outcomeAr:'رؤية موحّدة من استقطاب العميل حتى التسليم — فوترة آلية وطاقة الفريق مرئية.'},
    p66:{cat:'Services · Odoo 18 EE',catAr:'Services · أودو 18 المؤسسي',title:'شركة سمر نافع العبيد للتزيين',titleAr:'شركة سمر نافع العبيد للتزيين',sub:'شركة سمر نافع العبيد للتزيين · Odoo 18 EE',subAr:'شركة سمر نافع العبيد للتزيين · أودو 18 المؤسسي',challenge:'Service delivery, billing, and HR on disconnected platforms — no unified client history, manual invoicing after completion, no resource capacity visibility.',challengeAr:'تقديم خدمات وفوترة وموارد بشرية على منصات منفصلة — بلا تاريخ عملاء موحّد وفواتير يدوية وبلا رؤية طاقة موارد.',solution:'Odoo ERP: CRM, Projects, Accounting, HR, Field Services — client acquisition through delivery to invoicing in one automated workflow.',solutionAr:'أودو ERP: إدارة علاقات ومشاريع ومحاسبة وموارد بشرية وخدمات ميدانية — من العميل إلى التسليم إلى الفاتورة في سير عمل آلي واحد.',scope:['Accounting & Finance','Inventory & Supply Chain','HR & Payroll','Operations','CRM & Sales'],scopeAr:['المحاسبة والمالية','المخزون وسلسلة التوريد','الموارد البشرية والرواتب','العمليات','إدارة العلاقات'],highlights:[{icon:'👤',title:'Client 360',titleAr:'رؤية 360 للعميل',desc:'Full client history — proposals, projects, invoices, support all in one view.',descAr:'تاريخ العميل الكامل — عروض ومشاريع وفواتير ودعم في رؤية واحدة.'},{icon:'⚡',title:'Auto Invoicing',titleAr:'فوترة آلية',desc:'Project milestones trigger invoices — billing cycle from days to minutes.',descAr:'مراحل المشروع تُولِّد فواتير آلياً.'},{icon:'📊',title:'Capacity Planning',titleAr:'تخطيط الطاقة',desc:'Team utilization and availability visible — no more overcommitment.',descAr:'استخدام الفريق والتوافر مرئي — لا إرهاق في التزامات.'},{icon:'🔄',title:'End-to-End Workflow',titleAr:'سير عمل متكامل',desc:'Lead to invoice managed in one platform without manual handoffs.',descAr:'من العميل المحتمل إلى الفاتورة في منصة واحدة.'}],kpis:[["100%", "Client Visibility"], ["Live", "Project Tracking"], ["Auto", "Invoicing"]],kpisAr:[["100%", "\u0631\u0624\u064a\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621"], ["\u0641\u0648\u0631\u064a", "\u062a\u062a\u0628\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639"], ["\u0622\u0644\u064a", "\u0627\u0644\u0641\u0648\u062a\u0631\u0629"]],outcome:'Unified view from client acquisition through delivery — billing automated, team capacity visible.',outcomeAr:'رؤية موحّدة من استقطاب العميل حتى التسليم — فوترة آلية وطاقة الفريق مرئية.'},
    shararco: {
      cat: 'Retail & eCommerce · Saudi Arabia',
      catAr: 'التجزئة والتجارة الإلكترونية · المملكة العربية السعودية',
      title: 'Bridging Physical Retail and Online Commerce on a Single Real-Time Platform',
      titleAr: 'ربط التجزئة المادية والتجارة الإلكترونية على منصة واحدة في الوقت الفعلي',
      sub: 'ShararCo – Retail & E-Commerce · Odoo 18 Enterprise Edition · KSA',
      subAr: 'شرارCo للتجزئة والتجارة الإلكترونية · أودو 18 المؤسسي',
      challenge: 'ShararCo operated a physical retail store and a Shopify webstore as completely separate systems. Stock levels were mismatched daily, orders were duplicated between channels, and financial reconciliation required a full manual exercise every evening. There was no single view of revenue, inventory, or customer data.',
      challengeAr: 'كانت شرارCo تشغّل متجراً مادياً ومتجر Shopify إلكترونياً كنظامين منفصلين تماماً. مستويات المخزون كانت غير متطابقة يومياً، والطلبات مكرّرة بين القناتين، والتسوية المالية تستلزم عملاً يدوياً كاملاً كل مساء.',
      solution: 'Deployed Odoo 18 EE with native Shopify connector, unifying inventory, POS, CRM, and Accounting in a single platform. All stock movements, online orders, and POS transactions now flow into one real-time source of truth. Customer loyalty data and purchase history consolidated across both channels.',
      solutionAr: 'تطبيق أودو 18 المؤسسي مع موصّل Shopify الأصلي، يوحّد المخزون ونقاط البيع وإدارة العلاقات والمحاسبة على منصة واحدة. جميع حركات المخزون والطلبات الإلكترونية وعمليات نقاط البيع تتدفق في مصدر حقيقة واحد.',
      scope: ['Shopify Integration (Native)', 'Inventory Management', 'Point of Sale (POS)', 'Accounting & Finance', 'CRM & Customer Loyalty', 'E-Commerce Backend'],
      scopeAr: ['تكامل Shopify الأصلي', 'إدارة المخزون', 'نقاط البيع', 'المحاسبة والمالية', 'إدارة العلاقات والولاء', 'خلفية التجارة الإلكترونية'],
      highlights: [
        {icon:'🔗',title:'Shopify-Odoo Sync',titleAr:'مزامنة Shopify مع أودو',desc:'Real-time inventory sync between Shopify and Odoo ensures stock levels are identical across both channels at all times.',descAr:'مزامنة فورية للمخزون بين Shopify وأودو تضمن تطابق مستويات المخزون عبر القناتين في جميع الأوقات.'},
        {icon:'📦',title:'Zero Stock Discrepancies',titleAr:'صفر تناقضات في المخزون',desc:'Automated stock reconciliation eliminated daily manual counting — every sale, return, and transfer updates inventory in real time.',descAr:'تسوية المخزون الآلية أنهت العدّ اليدوي اليومي — كل عملية بيع وإرجاع ونقل تُحدّث المخزون فوراً.'},
        {icon:'💳',title:'Unified Customer View',titleAr:'رؤية موحّدة للعميل',desc:'Purchase history and loyalty points merged across in-store and online — enabling personalized marketing and accurate segmentation.',descAr:'تاريخ المشتريات ونقاط الولاء مدمجة عبر المتجر المادي والإلكتروني — تمكّن من التسويق الشخصي والتصنيف الدقيق.'},
        {icon:'📊',title:'Live Financial Reconciliation',titleAr:'تسوية مالية فورية',desc:'Sales from both channels post to Odoo Accounting automatically — eliminating the nightly manual reconciliation exercise entirely.',descAr:'مبيعات القناتين تُرحَّل إلى محاسبة أودو تلقائياً — تُنهي التسوية اليدوية الليلية نهائياً.'},
      ],
      kpis: [['0','Stock Discrepancies'],['Live','Omnichannel Sync'],['100%','Order Accuracy']],
      kpisAr: [['0','تناقضات في المخزون'],['فوري','مزامنة متعددة القنوات'],['100%','دقة الطلبات']],
      outcome: 'ShararCo achieved a single operational reality across physical and digital retail — inventory is always accurate, revenue is always reconciled, and customer data is always unified. Management can now make restocking and promotional decisions with complete confidence in the numbers.',
      outcomeAr: 'حققت شرارCo واقعاً تشغيلياً موحّداً عبر التجزئة المادية والرقمية — المخزون دائماً دقيق، الإيرادات دائماً مسوّاة، وبيانات العملاء دائماً موحّدة.',
    },
    kinglib: {
      cat: 'Government · Saudi Arabia',
      catAr: 'الحكومة والقطاع العام · المملكة العربية السعودية',
      title: "Digitalizing a National Public Library's Operations with an Integrated ERP Platform",
      titleAr: 'رقمنة عمليات مكتبة وطنية عامة بمنصة ERP متكاملة',
      sub: 'King Abdulaziz Public Library · Odex ERP · KSA',
      subAr: 'مكتبة الملك عبدالعزيز العامة · أوديكس ERP · المملكة',
      challenge: 'King Abdulaziz Public Library operated a large national institution entirely on paper-based financial and HR processes. There were no BI capabilities, no consolidated KPI dashboards for leadership, and inventory and project tracking were completely disconnected. Historical data existed only in physical records with no digital backbone.',
      challengeAr: 'مكتبة الملك عبدالعزيز العامة كانت تشغّل مؤسسة وطنية كبيرة بعمليات مالية وموارد بشرية ورقية بالكامل. لا قدرات ذكاء أعمال، ولا لوحات KPI موحّدة للقيادة، والمخزون والمشاريع منفصلة تماماً.',
      solution: 'Deployed full Odex ERP covering Finance, HR, Inventory, CRM, and Project Management with complete historical data migration. Built an executive BI dashboard surfacing institutional KPIs in real time. All financial and operational workflows digitalized end-to-end.',
      solutionAr: 'تطبيق Odex ERP الكامل يغطي المالية والموارد البشرية والمخزون وإدارة العلاقات والمشاريع مع ترحيل كامل للبيانات التاريخية. بناء لوحة ذكاء أعمال تنفيذية تعرض مؤشرات المؤسسة فورياً.',
      scope: ['Finance & Accounting', 'HR & Payroll', 'Inventory Management', 'CRM', 'Project Management', 'Data Migration (Full Historical)', 'Executive BI Dashboard'],
      scopeAr: ['المالية والمحاسبة', 'الموارد البشرية والرواتب', 'إدارة المخزون', 'إدارة العلاقات', 'إدارة المشاريع', 'ترحيل البيانات الكامل', 'لوحة ذكاء الأعمال التنفيذية'],
      highlights: [
        {icon:'📚',title:'Full Data Migration',titleAr:'ترحيل بيانات كامل',desc:'All historical financial records, HR data, and inventory information migrated from physical records into Odex ERP with zero data loss.',descAr:'جميع السجلات المالية التاريخية وبيانات الموارد البشرية والمخزون رُحِّلت من السجلات الورقية إلى Odex ERP بدون أي فقدان بيانات.'},
        {icon:'📊',title:'Executive KPI Dashboard',titleAr:'لوحة المؤشرات التنفيذية',desc:'Leadership now accesses live operational and financial KPIs from a single screen — replacing manual weekly reports.',descAr:'القيادة تصل الآن إلى مؤشرات تشغيلية ومالية فورية من شاشة واحدة — تستبدل التقارير الأسبوعية اليدوية.'},
        {icon:'🏛️',title:'Institutional HR Digitalization',titleAr:'رقمنة الموارد البشرية المؤسسية',desc:'Employee records, attendance, leave, and payroll fully digitalized — HR department operating paperlessly for the first time.',descAr:'سجلات الموظفين والحضور والإجازات والرواتب رُقمنت كلياً — قسم الموارد البشرية يعمل بدون ورق للمرة الأولى.'},
        {icon:'🔄',title:'Automated Financial Workflows',titleAr:'سير عمل مالي آلي',desc:'Budget control, procurement approvals, and financial reporting automated end-to-end — manual data entry reduced by over 80%.',descAr:'التحكم في الميزانية وموافقات المشتريات والتقارير المالية أُتمتت من البداية للنهاية — الإدخال اليدوي انخفض بأكثر من 80%.'},
      ],
      kpis: [['100%','Data Migrated'],['Live','Executive KPIs'],['0','Manual Reports']],
      kpisAr: [['100%','البيانات مُرحَّلة'],['فوري','مؤشرات تنفيذية'],['0','تقارير يدوية']],
      outcome: "The library transformed from a paper-dependent national institution into a fully digitalized operation. Leadership accesses real-time institutional performance for the first time in the organization's history.",
      outcomeAr: 'تحوّلت المكتبة من مؤسسة وطنية تعتمد على الورق إلى عملية رقمية بالكامل. القيادة تصل إلى أداء المؤسسة في الوقت الفعلي للمرة الأولى في تاريخ المنظمة.',
    },
    tarahem: {
      cat: 'Non-profit · Saudi Arabia',
      catAr: 'المنظمات غير الربحية · المملكة العربية السعودية',
      title: 'Building a Transparent Financial & Operational Backbone for a Humanitarian Organization',
      titleAr: 'بناء عمود مالي وتشغيلي شفاف لمنظمة إنسانية',
      sub: 'Tarahem — Prisoner Care Committee · Odex ERP · KSA',
      subAr: 'تراحم — لجنة رعاية السجناء · أوديكس ERP · المملكة',
      challenge: 'Tarahem operated without a unified financial system — donor funds were untraceable by program or beneficiary, HR and payroll were managed manually, and leadership had no operational reporting or program-level accountability. Financial audits were conducted manually with limited visibility into fund utilization.',
      challengeAr: 'تراحم كانت تعمل بدون نظام مالي موحّد — أموال المانحين غير قابلة للتتبع بالبرنامج أو المستفيد، والموارد البشرية والرواتب تُدار يدوياً، والقيادة بدون تقارير تشغيلية أو مساءلة على مستوى البرامج.',
      solution: 'Deployed Odex ERP with Finance, HR, Inventory, and Project Management at its core. Full historical data migration completed. KPI dashboards built to provide program-level financial accountability and operational reporting. Every donor fund now traceable to its allocated program and expenditure.',
      solutionAr: 'تطبيق Odex ERP مع المالية والموارد البشرية والمخزون وإدارة المشاريع كأساس. ترحيل كامل للبيانات التاريخية. بناء لوحات KPI للمساءلة المالية على مستوى البرامج. كل أموال المانحين قابلة للتتبع حتى البرنامج المخصص والإنفاق.',
      scope: ['Finance & Fund Accounting', 'HR & Payroll', 'Project Management (Program Tracking)', 'Inventory Management', 'Data Migration', 'KPI & Operational Dashboards'],
      scopeAr: ['المالية ومحاسبة الصناديق', 'الموارد البشرية والرواتب', 'إدارة المشاريع والبرامج', 'إدارة المخزون', 'ترحيل البيانات', 'لوحات KPI التشغيلية'],
      highlights: [
        {icon:'💰',title:'Full Fund Traceability',titleAr:'تتبع كامل للأموال',desc:'Every donor contribution now mapped to a specific program and cost center — real-time visibility into fund utilization and remaining balances.',descAr:'كل مساهمة مانح مرتبطة ببرنامج ومركز تكلفة محدد — رؤية فورية لاستخدام الأموال والأرصدة المتبقية.'},
        {icon:'📋',title:'Program-Level Accountability',titleAr:'مساءلة على مستوى البرامج',desc:'Management dashboards show program performance, fund burn rates, and beneficiary KPIs — enabling data-driven humanitarian decisions.',descAr:'لوحات الإدارة تُظهر أداء البرامج ومعدلات إنفاق الأموال ومؤشرات المستفيدين — تمكّن من قرارات إنسانية مبنية على البيانات.'},
        {icon:'✅',title:'Audit-Ready at All Times',titleAr:'جاهز للتدقيق في جميع الأوقات',desc:'Full audit trail maintained automatically — financial statements, fund movements, and approvals accessible with one click for any audit.',descAr:'مسار تدقيق كامل يُحفظ تلقائياً — البيانات المالية وحركات الأموال والموافقات متاحة بنقرة واحدة لأي تدقيق.'},
        {icon:'👥',title:'HR Digitalization',titleAr:'رقمنة الموارد البشرية',desc:'Employee records, volunteer management, and payroll fully automated — HR department freed from manual spreadsheet management.',descAr:'سجلات الموظفين وإدارة المتطوعين والرواتب مؤتمتة بالكامل — قسم الموارد البشرية محرّر من إدارة الجداول اليدوية.'},
      ],
      kpis: [['100%','Fund Traceability'],['Live','Program KPIs'],['Full','Audit Trail']],
      kpisAr: [['100%','تتبع الأموال'],['فوري','مؤشرات البرامج'],['كامل','مسار التدقيق']],
      outcome: 'Tarahem achieved the financial transparency required for donor confidence and institutional credibility. Leadership now makes program decisions backed by real data — and every riyal can be traced from donation to delivery.',
      outcomeAr: 'حققت تراحم الشفافية المالية المطلوبة لثقة المانحين والمصداقية المؤسسية. القيادة تتخذ قرارات البرامج مدعومة بالبيانات الفعلية — وكل ريال قابل للتتبع من التبرع حتى التسليم.',
    },
    arabian: {
      cat: 'Manufacturing · Saudi Arabia',
      catAr: 'التصنيع · المملكة العربية السعودية',
      title: 'Unifying a Multi-Company Industrial Group Under One Manufacturing ERP',
      titleAr: 'توحيد مجموعة صناعية متعددة الشركات تحت نظام ERP تصنيع واحد',
      sub: 'Arabian Pioneer Company Ltd · Odoo 18 Enterprise Edition · KSA',
      subAr: 'الشركة العربية الرائدة للصناعة · أودو 18 المؤسسي · المملكة',
      challenge: 'Arabian Pioneer operated as a multi-company industrial group with completely fragmented inventory — each entity managed its own stock with no visibility into group-wide availability. Procurement had no centralized control, production planning was done manually per entity, and there was no shared financial reporting across the group.',
      challengeAr: 'الشركة العربية الرائدة كانت تعمل كمجموعة صناعية متعددة الشركات بمخزون مشتّت تماماً — كل كيان يدير مخزونه الخاص بدون رؤية للتوافر على مستوى المجموعة. لا رقابة مركزية على المشتريات، وتخطيط الإنتاج يدوي لكل كيان.',
      solution: 'Deployed Odoo 18 EE in a multi-company configuration covering Accounting, Manufacturing, Inventory, Purchase, Sales, CRM, HR, and Expenses across all entities. Shared master data, centralized procurement, and a group-level financial dashboard delivered to the executive team.',
      solutionAr: 'تطبيق أودو 18 المؤسسي بتهيئة متعددة الشركات يغطي المحاسبة والتصنيع والمخزون والمشتريات والمبيعات وإدارة العلاقات والموارد البشرية والمصروفات عبر جميع الكيانات. بيانات رئيسية مشتركة ومشتريات مركزية ولوحة مالية على مستوى المجموعة.',
      scope: ['Multi-Company Configuration', 'Manufacturing & BOMs', 'Inventory (Centralized)', 'Purchase & Procurement', 'Sales & CRM', 'Accounting & Finance', 'HR & Payroll', 'Expenses Management'],
      scopeAr: ['تهيئة متعددة الشركات', 'التصنيع وقوائم المواد', 'المخزون المركزي', 'المشتريات والتوريد', 'المبيعات وإدارة العلاقات', 'المحاسبة والمالية', 'الموارد البشرية والرواتب', 'إدارة المصروفات'],
      highlights: [
        {icon:'🏭',title:'Unified Production Visibility',titleAr:'رؤية موحّدة للإنتاج',desc:'All manufacturing orders, work orders, and production schedules visible in one system — enabling cross-entity resource allocation for the first time.',descAr:'جميع أوامر التصنيع والعمل وجداول الإنتاج مرئية في نظام واحد — تمكّن من تخصيص الموارد عبر الكيانات للمرة الأولى.'},
        {icon:'📦',title:'Centralized Procurement',titleAr:'مشتريات مركزية',desc:'Group-wide procurement consolidated — eliminating duplicate supplier contracts, enabling volume negotiation, and reducing procurement costs.',descAr:'توحيد المشتريات على مستوى المجموعة — تُلغي عقود الموردين المكرّرة وتمكّن من التفاوض على الكميات وتخفيض التكاليف.'},
        {icon:'💹',title:'Group Financial Consolidation',titleAr:'توحيد مالي على مستوى المجموعة',desc:'Consolidated P&L and balance sheet across all entities — management sees group performance in real time without waiting for manual roll-ups.',descAr:'أرباح وخسائر وميزانية موحّدة عبر جميع الكيانات — الإدارة ترى أداء المجموعة فورياً دون انتظار التجميع اليدوي.'},
        {icon:'⚙️',title:'Shared Master Data',titleAr:'بيانات رئيسية مشتركة',desc:'Products, suppliers, customers, and chart of accounts shared across entities — eliminating duplicate records and ensuring consistent pricing.',descAr:'المنتجات والموردون والعملاء ومخطط الحسابات مشتركة عبر الكيانات — تُلغي السجلات المكرّرة وتضمن اتساق التسعير.'},
      ],
      kpis: [['Multi','Companies Unified'],['Live','Production Visibility'],['100%','Procurement Control']],
      kpisAr: [['متعدد','شركات موحّدة'],['فوري','رؤية الإنتاج'],['100%','ضبط المشتريات']],
      outcome: 'Arabian Pioneer transformed from a fragmented collection of entities into a cohesive industrial group with shared visibility, centralized control, and unified financial reporting. Executive decisions are now based on group-level data rather than entity-by-entity reporting.',
      outcomeAr: 'تحوّلت الشركة العربية الرائدة من مجموعة كيانات متشتّتة إلى مجموعة صناعية متماسكة برؤية مشتركة ورقابة مركزية وتقارير مالية موحّدة.',
    },
    makkiyoon: {
      cat: 'Real Estate · Saudi Arabia',
      catAr: 'العقارات · المملكة العربية السعودية',
      title: 'Integrating Property Sales, Construction Costs, and Asset Management for a Real Estate Developer',
      titleAr: 'دمج مبيعات العقارات وتكاليف البناء وإدارة الأصول لمطوّر عقاري',
      sub: 'Makkiyoon Real Estate Development · Odoo EE · KSA',
      subAr: 'مكيون للتطوير العقاري · أودو المؤسسي · المملكة',
      challenge: 'Makkiyoon managed property sales, construction project tracking, and asset management in completely separate systems. There was no unified view of unit profitability, receivables aging, or project cost performance. Revenue recognition was manual and construction budgets were tracked in Excel.',
      challengeAr: 'مكيون كانت تدير مبيعات العقارات ومتابعة مشاريع البناء وإدارة الأصول في أنظمة منفصلة تماماً. لا رؤية موحّدة لربحية الوحدات أو أعمار المستحقات أو أداء تكاليف المشاريع.',
      solution: 'Deployed Odoo EE with Real Estate, Construction Management, Projects, Accounting, and HR integrated on a single platform. A developer dashboard delivering live pipeline visibility, construction cost vs. budget, and receivables aging was delivered to management.',
      solutionAr: 'تطبيق أودو المؤسسي مع إدارة العقارات وإدارة البناء والمشاريع والمحاسبة والموارد البشرية متكاملة على منصة واحدة. لوحة مطوّر تُقدّم رؤية فورية لخط الأنابيب وتكاليف البناء مقابل الميزانية وأعمار المستحقات.',
      scope: ['Real Estate Management', 'Construction Project Accounting', 'Asset Management', 'Accounting & Finance', 'HR & Payroll', 'Projects & Timesheets', 'Developer KPI Dashboard'],
      scopeAr: ['إدارة العقارات', 'محاسبة مشاريع البناء', 'إدارة الأصول', 'المحاسبة والمالية', 'الموارد البشرية والرواتب', 'المشاريع وكشوف الوقت', 'لوحة مؤشرات المطوّر'],
      highlights: [
        {icon:'🏗️',title:'Construction Cost Control',titleAr:'ضبط تكاليف البناء',desc:'Every construction project mapped to Odoo Projects with dedicated cost centers — budget vs. actual visible in real time per phase and per unit.',descAr:'كل مشروع بناء مرتبط بمشاريع أودو مع مراكز تكلفة مخصصة — الميزانية مقابل الفعلي مرئية فورياً لكل مرحلة وكل وحدة.'},
        {icon:'💰',title:'Receivables Aging Dashboard',titleAr:'لوحة أعمار المستحقات',desc:'Live receivables aging by unit, phase, and buyer — collections team now has a single view of all outstanding installments and due dates.',descAr:'أعمار المستحقات حية بالوحدة والمرحلة والمشتري — فريق التحصيل لديه الآن رؤية واحدة لجميع الأقساط المستحقة وتواريخ الاستحقاق.'},
        {icon:'📈',title:'Unit Profitability Analysis',titleAr:'تحليل ربحية الوحدات',desc:'Revenue, construction cost, and overhead allocated per unit — management can now identify the most and least profitable projects in the portfolio.',descAr:'الإيرادات وتكاليف البناء والمصاريف العامة مخصصة لكل وحدة — الإدارة تستطيع الآن تحديد المشاريع الأكثر والأقل ربحية في المحفظة.'},
        {icon:'🏢',title:'Asset Management',titleAr:'إدارة الأصول',desc:'All developed and retained properties registered as assets in Odoo — depreciation, maintenance, and rental income tracked systematically.',descAr:'جميع العقارات المطوّرة والمحتجزة مسجّلة كأصول في أودو — الاستهلاك والصيانة وإيرادات الإيجار مُتتبّعة بشكل منهجي.'},
      ],
      kpis: [['1','Unified Platform'],['Live','Receivables Aging'],['Full','Project Cost Visibility']],
      kpisAr: [['1','منصة موحّدة'],['فوري','متابعة المستحقات'],['كامل','رؤية تكاليف المشاريع']],
      outcome: 'Makkiyoon achieved a complete operational view of the development business — from initial sales contract through construction completion to final handover. Every project, unit, and receivable is now visible in a single platform.',
      outcomeAr: 'حققت مكيون رؤية تشغيلية كاملة للأعمال العقارية — من عقد البيع الأولي حتى اكتمال البناء إلى التسليم النهائي. كل مشروع ووحدة ومستحق مرئي الآن في منصة واحدة.',
    },
    officers: {
      cat: 'Government · Saudi Arabia',
      catAr: 'الحكومة والقطاع العام · المملكة العربية السعودية',
      title: 'End-to-End ERP Rollout Across Ministry of Interior Officers Clubs Network',
      titleAr: 'تطوير ERP شامل عبر شبكة أندية ضباط وزارة الداخلية',
      sub: "Officers Clubs — Ministry of Interior (KSA) · Odex ERP",
      subAr: 'أندية الضباط — وزارة الداخلية السعودية · أوديكس ERP',
      challenge: "The Officers Clubs network operated as a large public institution with no integrated management system. HRMS, Finance, POS, Fleet, and Asset Management were all running in isolation with no BI reporting, no consolidated KPIs, and management decisions made without reliable data.",
      challengeAr: 'شبكة أندية الضباط كانت تعمل كمؤسسة حكومية كبيرة بدون نظام إدارة متكامل. الموارد البشرية والمالية ونقاط البيع والأسطول وإدارة الأصول تعمل بمعزل تام بدون BI ولا مؤشرات KPI موحّدة.',
      solution: 'Delivered a full Odex ERP deployment covering 9 modules: HRMS, Finance, Supply Chain, Asset Management, CRM, POS, Ticketing, Fleet Management, and a comprehensive BI layer with executive KPI dashboards for ministerial reporting.',
      solutionAr: 'تسليم تطبيق Odex ERP الكامل يغطي 9 وحدات: نظام الموارد البشرية والمالية وسلسلة التوريد وإدارة الأصول وإدارة العلاقات ونقاط البيع والتذاكر وإدارة الأسطول وطبقة BI شاملة مع لوحات KPI للتقارير الوزارية.',
      scope: ['HRMS (Full)', 'Finance & Accounting', 'Supply Chain & Inventory', 'Asset Management', 'CRM', 'Point of Sale (POS)', 'Ticketing System', 'Fleet Management', 'Executive BI & KPI Dashboards'],
      scopeAr: ['نظام الموارد البشرية الكامل', 'المالية والمحاسبة', 'سلسلة التوريد والمخزون', 'إدارة الأصول', 'إدارة العلاقات', 'نقاط البيع', 'نظام التذاكر', 'إدارة الأسطول', 'لوحات BI وKPI التنفيذية'],
      highlights: [
        {icon:'🏛️',title:'9-Module Government ERP',titleAr:'ERP حكومي بـ 9 وحدات',desc:'One of the most comprehensive Odex ERP deployments — 9 modules unified under a single platform serving a national government institution.',descAr:'من أشمل تطبيقات Odex ERP — 9 وحدات موحّدة تحت منصة واحدة تخدم مؤسسة حكومية وطنية.'},
        {icon:'🚗',title:'Fleet Management',titleAr:'إدارة الأسطول',desc:'Full fleet lifecycle management deployed — vehicle maintenance schedules, fuel tracking, driver assignments, and utilization KPIs all centralized.',descAr:'إدارة دورة حياة الأسطول الكاملة — جداول صيانة المركبات وتتبع الوقود وتعيينات السائقين ومؤشرات الاستخدام مركزية.'},
        {icon:'📊',title:'Ministerial KPI Dashboards',titleAr:'لوحات المؤشرات الوزارية',desc:'Executive dashboards configured for ministerial reporting — real-time operational and financial KPIs replacing manual weekly government reports.',descAr:'لوحات تنفيذية مهيأة للتقارير الوزارية — مؤشرات تشغيلية ومالية فورية تستبدل التقارير الحكومية الأسبوعية اليدوية.'},
        {icon:'🏋️',title:'Multi-Facility Operations',titleAr:'عمليات متعددة المرافق',desc:'POS and operations managed across all Officers Club facilities — unified revenue reporting, membership management, and inventory across all locations.',descAr:'نقاط البيع والعمليات تُدار عبر جميع مرافق أندية الضباط — تقارير إيرادات موحّدة وإدارة عضوية ومخزون عبر جميع المواقع.'},
      ],
      kpis: [['9','Modules Deployed'],['Live','Ministerial KPIs'],['Full','Asset Visibility']],
      kpisAr: [['9','وحدات مُطوَّرة'],['فوري','مؤشرات وزارية'],['كامل','رؤية الأصول']],
      outcome: "The Officers Clubs transitioned from a paper-dependent government operation to a fully integrated digital institution. Leadership has real-time visibility across all facilities, and ministerial reports are generated automatically rather than compiled manually.",
      outcomeAr: 'أندية الضباط انتقلت من عملية حكومية تعتمد على الورق إلى مؤسسة رقمية متكاملة بالكامل. القيادة لديها رؤية فورية عبر جميع المرافق والتقارير الوزارية تُولَّد تلقائياً.',
    },
    onevision: {
      cat: 'Construction · Egypt',
      catAr: 'المقاولات · مصر',
      title: 'Full-Scope Operations Digitalization for a Multi-Service Contracting Company',
      titleAr: 'رقمنة عمليات شاملة لشركة مقاولات متعددة الخدمات',
      sub: 'One Vision Co. · Odoo 17 Enterprise Edition · Egypt',
      subAr: 'وان فيجن للمقاولات · أودو 17 المؤسسي · مصر',
      challenge: 'One Vision managed construction, light manufacturing, and field maintenance services with no unified operations system. Project tracking was in Excel, supply chain had no formal workflow, HR was manual, and there was zero financial visibility per project or service line.',
      challengeAr: 'وان فيجن كانت تدير خدمات البناء والتصنيع الخفيف والصيانة الميدانية بدون نظام عمليات موحّد. متابعة المشاريع في Excel، وسلسلة التوريد بدون سير عمل رسمي، والموارد البشرية يدوية، وصفر رؤية مالية لكل مشروع.',
      solution: 'Deployed Odoo 17 EE across 10+ modules: Accounting, Manufacturing, Supply Chain, Projects, Field Services, Maintenance, POS, HR, CRM, and Sales — delivering full operational digitalization across all three business lines in a single unified platform.',
      solutionAr: 'تطبيق أودو 17 المؤسسي عبر أكثر من 10 وحدات: المحاسبة والتصنيع وسلسلة التوريد والمشاريع والخدمات الميدانية والصيانة ونقاط البيع والموارد البشرية وإدارة العلاقات والمبيعات — رقمنة تشغيلية كاملة عبر خطوط الأعمال الثلاثة.',
      scope: ['Accounting & Project Finance', 'Manufacturing', 'Supply Chain & Inventory', 'Projects & Cost Control', 'Field Services', 'Maintenance (Preventive & Reactive)', 'HR & Payroll', 'CRM & Sales', 'Point of Sale (POS)'],
      scopeAr: ['المحاسبة ومالية المشاريع', 'التصنيع', 'سلسلة التوريد والمخزون', 'المشاريع وضبط التكاليف', 'الخدمات الميدانية', 'الصيانة الوقائية والتفاعلية', 'الموارد البشرية والرواتب', 'إدارة العلاقات والمبيعات', 'نقاط البيع'],
      highlights: [
        {icon:'🔧',title:'Field Services Integration',titleAr:'تكامل الخدمات الميدانية',desc:'On-site field teams connected to Odoo Field Services — job assignments, site check-ins, and completion reports all managed digitally from the field.',descAr:'الفرق الميدانية في الموقع مرتبطة بأودو للخدمات الميدانية — تعيينات الوظائف وتسجيل الحضور وتقارير الإنجاز تُدار رقمياً من الميدان.'},
        {icon:'🏗️',title:'Multi-Line Cost Control',titleAr:'ضبط التكاليف متعدد الخطوط',desc:'Construction, manufacturing, and maintenance costs tracked per project and service line — first-time visibility into profitability per business line.',descAr:'تكاليف البناء والتصنيع والصيانة مُتتبّعة لكل مشروع وخط خدمة — رؤية للمرة الأولى لربحية كل خط أعمال.'},
        {icon:'🔄',title:'Integrated Supply Chain',titleAr:'سلسلة توريد متكاملة',desc:'Purchase-to-pay workflow formalized end-to-end — procurement, receiving, quality control, and supplier payments all in one system.',descAr:'سير عمل المشتريات حتى الدفع مُعرَّف من البداية للنهاية — المشتريات والاستلام ومراقبة الجودة ومدفوعات الموردين في نظام واحد.'},
        {icon:'📊',title:'10+ Modules, Day One',titleAr:'أكثر من 10 وحدات من اليوم الأول',desc:'Full deployment across all service lines completed in a single go-live — no phased rollout, complete digitalization from day one.',descAr:'تطبيق كامل عبر جميع خطوط الخدمة في تشغيل واحد — بدون طرح مرحلي، رقمنة كاملة من اليوم الأول.'},
      ],
      kpis: [['10+','Modules Deployed'],['Live','Field Operations'],['Full','Supply Chain Control']],
      kpisAr: [['10+','وحدات مُطوَّرة'],['فوري','عمليات ميدانية'],['كامل','ضبط سلسلة التوريد']],
      outcome: 'One Vision went from three disconnected business lines to a single integrated operation. All projects, field teams, manufacturing orders, and financial data are now visible and managed through one platform.',
      outcomeAr: 'وان فيجن انتقلت من ثلاثة خطوط أعمال منفصلة إلى عملية متكاملة واحدة. جميع المشاريع والفرق الميدانية وأوامر التصنيع والبيانات المالية مرئية ومُدارة عبر منصة واحدة.',
    },
  };

  const modalOverlay = document.getElementById('csModal');
  const modalClose = document.getElementById('csModalClose');

  function openCsModal(key) {
    const d = csData[key]; if (!d) return;
    const AR = typeof projLangAR !== 'undefined' ? projLangAR : (document.documentElement.getAttribute('data-lang') === 'ar');
    const cat   = AR && d.catAr   ? d.catAr   : d.cat;
    const title = AR && d.titleAr ? d.titleAr : d.title;
    const sub   = AR && d.subAr   ? d.subAr   : d.sub;
    const ch    = AR && d.challengeAr ? d.challengeAr : d.challenge;
    const sol   = AR && d.solutionAr  ? d.solutionAr  : d.solution;
    const out   = AR && d.outcomeAr   ? d.outcomeAr   : d.outcome;
    const role  = AR && d.roleAr ? d.roleAr : d.role;
    const scope = AR && d.scopeAr  ? d.scopeAr  : d.scope;
    const kpis  = AR && d.kpisAr   ? d.kpisAr   : d.kpis;
    const scopeChips = scope.map(s => `<span class="cs-scope-chip">${s}</span>`).join('');
    const hlItems = d.highlights.map(h => {
      const htitle = AR && h.titleAr ? h.titleAr : h.title;
      const hdesc  = AR && h.descAr  ? h.descAr  : h.desc;
      return `<div class="cs-hl-item"><div class="cs-hl-icon">${h.icon}</div><div class="cs-hl-text"><strong>${htitle}</strong><span>${hdesc}</span></div></div>`;
    }).join('');
    const kpiCards = kpis.map(k => `<div class="cs-modal-kpi"><div class="cs-modal-kpi-n">${k[0]}</div><div class="cs-modal-kpi-l">${k[1]}</div></div>`).join('');
    const labels = AR
      ? {role:'دوري', ch:'التحدي', sol:'الحل', scope:'نطاق العمل', hl:'أبرز التطبيق', res:'النتائج والأثر', out:'الخلاصة', discuss:'ناقش مشروعاً مماثلاً', wa:'واتساب'}
      : {role:'My Role', ch:'The Challenge', sol:'The Solution', scope:'Scope of Work', hl:'Implementation Highlights', res:'Results & Impact', out:'Outcome', discuss:'Discuss a Similar Project', wa:'WhatsApp'};
    document.getElementById('csModalCat').textContent   = cat;
    document.getElementById('csModalTitle').textContent = title;
    document.getElementById('csModalSub').textContent   = sub;
    const modal = document.getElementById('csModal');
    if (AR) { modal.setAttribute('dir','rtl'); } else { modal.removeAttribute('dir'); }
    document.getElementById('csModalBody').innerHTML = `
      ${role ? `<div class="cs-section"><div class="cs-section-title">${labels.role}</div><p>${role}</p></div>` : ''}
      <div class="cs-section"><div class="cs-section-title">${labels.ch}</div><p>${ch}</p></div>
      <div class="cs-section"><div class="cs-section-title">${labels.sol}</div><p>${sol}</p></div>
      <div class="cs-section"><div class="cs-section-title">${labels.scope}</div><div class="cs-scope-list">${scopeChips}</div></div>
      <div class="cs-section"><div class="cs-section-title">${labels.hl}</div><div class="cs-highlights">${hlItems}</div></div>
      <div class="cs-section"><div class="cs-section-title">${labels.res}</div><div class="cs-modal-kpis">${kpiCards}</div></div>
      <div class="cs-section"><div class="cs-section-title">${labels.out}</div><div class="cs-outcome">${out}</div></div>
      <div class="cs-modal-btns">
        <a href="https://calendly.com/abuemira/30min" target="_blank" class="btn-gold" style="flex:1;justify-content:center;">${labels.discuss}</a>
        <a href="https://wa.me/201005061349" target="_blank" class="btn-ghost" style="flex:1;justify-content:center;">${labels.wa}</a>
      </div>`;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* modal triggers now handled inside renderProjects JS above */

  function closeCsModal() { modalOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  modalClose.addEventListener('click', closeCsModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeCsModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCsModal(); });


  const form=document.getElementById("contactForm"),submitBtn=document.getElementById("cfSubmit"),successEl=document.getElementById("formSuccess");
  if(form){form.addEventListener("submit",async e=>{e.preventDefault();submitBtn.disabled=true;submitBtn.textContent="⏳ Sending...";
    try{const res=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{"Accept":"application/json"}});
      if(res.ok){form.style.display="none";successEl.style.display="block";}
      else{submitBtn.disabled=false;submitBtn.textContent="✉️ Send Message · إرسال";alert("Something went wrong. Please try again or contact via WhatsApp.");}
    }catch{submitBtn.disabled=false;submitBtn.textContent="✉️ Send Message · إرسال";alert("Network error. Please check your connection and try again.");}
  });}

  /* ══ 2. TESTIMONIAL LINKEDIN BUTTONS ══ */
  document.querySelectorAll('.test-card').forEach(card => {
    const btn = document.createElement('a');
    btn.href = 'https://www.linkedin.com/in/abuemira/details/recommendations/';
    btn.target = '_blank'; btn.className = 'test-li-btn';
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> View on LinkedIn`;
    const row = card.querySelector('.test-row'); if (row) card.insertBefore(btn, row);
  });

  /* ══ 3. BUILD MARQUEE TRACK ══ */
  (function(){
    const track = document.getElementById('marqueeTrack');
    if(!track) return;
    const all = [...TESTIMONIALS, ...TESTIMONIALS];
    track.innerHTML = all.map(t=>`
      <div class="test-card-mq">
        <p class="test-q-mq">"${t.q}"</p>
        <div class="test-author-mq">
          <img src="${t.img}" alt="${t.name}" class="test-av-mq" loading="lazy" onerror="this.style.opacity='0'">
          <div>
            <div class="test-name-mq">${t.name}</div>
            <div class="test-role-mq">${t.role}</div>
            ${t.linkedin && t.linkedin !== '#' ? `<a href="${t.linkedin}" target="_blank" class="test-li-mq">LinkedIn ↗</a>` : ''}
          </div>
        </div>
      </div>`).join('');
    const countEl = document.getElementById('testCount');
    if(countEl) countEl.textContent = `${TESTIMONIALS.length}+ LinkedIn Recommendations`;
  })();

  /* ══ 6. MEDIUM BLOG PREVIEW (RSS via rss2json) ══ */
  const blogGrid = document.getElementById('blogGrid');
  const blogIcons = ['📊','⚙️','💡','🔧','📈','🌐'];
  const fallbackPosts = [
    {title:'How to Choose the Right Odoo Edition for Your Business',tag:'ERP Strategy',icon:'💡',date:'Apr 2025',time:'5'},
    {title:'Top 10 Mistakes to Avoid in Odoo ERP Implementations',tag:'Implementation',icon:'⚙️',date:'Mar 2025',time:'7'},
    {title:'Odoo Accounting vs. SAP Finance: A Practical Comparison',tag:'Finance & ERP',icon:'📊',date:'Feb 2025',time:'6'},
  ];
  const renderBlogCards = posts => {
    document.getElementById('blogLoading')?.remove();
    posts.forEach((p, i) => {
      const card = document.createElement('a');
      card.href = p.link || 'https://medium.com/@abuemira';
      card.target = '_blank'; card.className = 'blog-card';
      const date = p.pubDate ? new Date(p.pubDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : p.date;
      const time = p.content ? Math.max(3,Math.ceil(p.content.replace(/<[^>]+>/g,'').split(' ').length/200)) : p.time;
      card.innerHTML = `<div class="blog-thumb">${blogIcons[i%blogIcons.length]}</div>
        <div class="blog-body">
          <div class="blog-tag">${p.tag||'ERP Insights'}</div>
          <div class="blog-ttl">${p.title}</div>
          <div class="blog-meta"><span>📅 ${date}</span><span>⏱ ${time} min read</span></div>
        </div>`;
      blogGrid.appendChild(card);
    });
  };
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abuemira')
    .then(r => r.json())
    .then(d => { if(d.status==='ok' && d.items?.length) renderBlogCards(d.items.slice(0,3)); else renderBlogCards(fallbackPosts); })
    .catch(() => renderBlogCards(fallbackPosts));

});
