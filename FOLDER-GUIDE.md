# 📁 Folder Guide — Mohamed Essam Abu Emira Portfolio

Complete explanation of every file and folder in this project.

---

## 🗂 Project Structure

```
abuemira-portfolio/
│
├── index.html                  ← Main HTML page (entry point)
│
├── assets/
│   ├── css/
│   │   ├── variables.css       ← Design tokens (colors, spacing, fonts)
│   │   ├── style.css           ← Main stylesheet (all component styles)
│   │   └── responsive.css      ← Media queries (mobile, tablet, desktop)
│   │
│   ├── js/
│   │   ├── main.js             ← Core interactions (filter, nav, counters)
│   │   └── animations.js       ← Scroll animations, fade-in, skill bars
│   │
│   ├── images/                 ← (optional) Place local images here
│   │   └── .gitkeep
│   │
│   └── fonts/                  ← (optional) Self-hosted fonts
│       └── .gitkeep
│
├── vercel.json                 ← Vercel deployment configuration
├── .gitignore                  ← Git ignore rules
├── README.md                   ← GitHub + Vercel deploy guide
└── FOLDER-GUIDE.md             ← This file
```

---

## 📄 File Descriptions

### `index.html`
The **main entry point** of the entire website. Contains the full HTML structure including:

| Section | HTML ID | Description |
|---|---|---|
| Navigation | `.nav` | Sticky top navbar with smooth scroll links |
| Hero | `.hero` | Photo, name, roles, phone, CTA buttons |
| Stats Bar | `.stats-bar` | 5 key numbers (years, projects, certs, etc.) |
| About | `#about` | Bio, skill bars, Odoo modules, tools |
| Nexa Solutions | `#nexa` | Company section — logo, offices, COO role |
| Services | `#services` | 9 service cards with Calendly links |
| Experience | `#experience` | Full 7-role career timeline |
| Projects | `#projects` | 31 filterable ERP projects |
| Certifications | `#certifications` | 14 clickable cert cards + award cards |
| Testimonials | `#testimonials` | 6 real client/colleague recommendations |
| Education | `#education` | Degrees and internships |
| Contact | `#contact` | Phone, email, social links, booking CTA |
| Footer | `.footer` | Copyright + quick links |

**Links to:**
- `assets/css/variables.css`
- `assets/css/style.css`
- `assets/css/responsive.css`
- `assets/js/main.js`
- `assets/js/animations.js`
- Google Fonts (Plus Jakarta Sans + Sora) via CDN

---

### `assets/css/variables.css`
**Design tokens** — all CSS custom properties (`--var`) in one place.

Change a color here and it updates everywhere on the site.

```css
:root {
  --teal:       #017E84;   /* primary brand color */
  --gold:       #d4a843;   /* CTA / highlight color */
  --navy:       #0d1b2e;   /* dark section background */
  --r:          12px;      /* border radius */
  --sh:         0 4px 24px rgba(...);  /* shadow */
}
```

**How to change the primary color:**
1. Open `variables.css`
2. Change `--teal: #017E84;` to any hex color
3. Save → the entire site updates instantly

---

### `assets/css/style.css`
**Main stylesheet** — all component-level styles including:

- Navbar (`.nav`, `.nav-links`, `.nav-cta`)
- Hero section (`.hero`, `.hero-photo`, `.hero-badges`)
- Stats bar (`.stats-bar`, `.stat-n`)
- About grid (`.about-grid`, `.skills-card`, `.sk-bar`)
- Nexa section (`.nexa-section`, `.nx-card`, `.nx-offices`)
- Service cards (`.svc-card`, `.svc-icon`, `.svc-link`)
- Experience timeline (`.exp-line`, `.exp-dot`, `.exp-card`)
- Project cards (`.proj-card`, `.proj-cat`, filter buttons)
- Certification cards (`.cert-hl`, `.cert-card`, `.award-card`)
- Testimonials (`.test-card`, `.test-qmark`)
- Contact section (`.contact-wrap`, `.phone-hl`)
- Footer (`.footer`)

> **Note:** Media queries are intentionally separated into `responsive.css` for clarity.

---

### `assets/css/responsive.css`
**All media queries** in a dedicated file.

| Breakpoint | Width | Changes |
|---|---|---|
| Desktop | > 900px | Default — 3-column grids, full nav |
| Tablet | ≤ 900px | 2-column grids, no nav links |
| Mobile | ≤ 600px | 1-column, smaller fonts, stacked layout |
| Large | ≥ 1280px | Wider container, larger headings |
| Print | `@media print` | Hides nav, buttons, CTAs |

**How to add a custom breakpoint:**
```css
@media (max-width: 480px) {
  .hero-name { font-size: 22px; }
}
```

---

### `assets/js/main.js`
**Core JavaScript** — interactions that run on page load:

| Function | What it does |
|---|---|
| Project filter | Click category buttons → shows/hides `.proj-card` by `data-cat` |
| Skill bar animation | Animates `.sk-fill` width from 0 to % on scroll |
| Cert hover | Shows `↗` arrow on `.cert-card` hover |

---

### `assets/js/animations.js`
**Scroll-triggered animations** and UI enhancements:

| Function | What it does |
|---|---|
| `initSkillBars()` | Animates skill % bars when the skills card enters viewport |
| `initFadeUp()` | Fades cards up from `translateY(18px)` as they scroll into view |
| `initNavHighlight()` | Highlights the active nav link based on scroll position |
| Smooth scroll | Intercepts `<a href="#...">` clicks for smooth scrolling |
| `initCounters()` | Animates stat numbers from 0 to their final value |

---

### `vercel.json`
Tells Vercel how to deploy this static site:

```json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
```

- **`@vercel/static`** — serves all files as a static site (no server needed)
- **routes** — redirects all URLs to `index.html` (single-page behavior)
- **headers** — adds caching and security headers automatically

---

### `.gitignore`
Tells Git which files **not** to track:

```
.DS_Store       ← macOS system files
Thumbs.db       ← Windows system files
*.log           ← Log files
.env            ← Environment variables (never commit!)
.vercel         ← Vercel local config
node_modules/   ← If you add npm packages later
```

---

### `assets/images/` (optional)
Place any local images here if you want to host them in the repo instead of using base64-embedded images.

**Current setup:** The profile photo and Nexa logo are embedded as base64 directly in `index.html` — this means **zero external image requests** and the site works completely offline.

**To switch to a file-based image:**
```html
<!-- Before (base64) -->
<img src="data:image/jpeg;base64,/9j/4AA..." alt="...">

<!-- After (file-based) -->
<img src="assets/images/photo.jpg" alt="...">
```

---

### `assets/fonts/` (optional)
If you want to self-host fonts instead of using Google Fonts CDN, place the `.woff2` files here and add to `variables.css`:

```css
@font-face {
  font-family: 'Sora';
  src: url('../fonts/Sora-Bold.woff2') format('woff2');
  font-weight: 700;
}
```

---

## 🎨 How to Customize

### Change primary color
```css
/* variables.css */
--teal: #017E84;   /* change this to any color */
```

### Add a new project card
```html
<!-- In index.html, inside #projects .proj-grid -->
<div class="proj-card" data-cat="c-ret">
  <span class="proj-cat c-ret">Retail</span>
  <div class="proj-ver">Odoo 18 EE</div>
  <div class="proj-name">Your Client Name</div>
  <div class="proj-mods">Accounting, Sales, CRM, Inventory</div>
</div>
```

**Available `data-cat` values:**
`c-con` · `c-mfg` · `c-food` · `c-log` · `c-ret` · `c-hot` · `c-gov` · `c-npo` · `c-re`

### Add a new certification
```html
<!-- In index.html, inside .certs-grid -->
<a href="https://your-cert-link.com" target="_blank" class="cert-card">
  <div class="cert-logo ci-teal">NEW</div>
  <div style="flex:1">
    <div class="cert-name">Your Certification Name</div>
    <div class="cert-iss">Issuer · <span class="cert-yr">2025</span></div>
  </div>
  <div class="cert-arrow">↗</div>
</a>
```

---

## 🚀 Deployment Summary

| Platform | URL | Deploy time |
|---|---|---|
| GitHub Pages | `https://abuemiraerp.github.io` | ~60–90 sec |
| Vercel | `https://abuemira-portfolio.vercel.app` | ~30 sec |

See `README.md` for full step-by-step deployment instructions.

---

*Last updated: 2025 · Mohamed Essam Abu Emira*
