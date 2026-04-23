# Mohamed Essam Abu Emira — Professional Portfolio

**Live Demo (GitHub Pages):** https://abuemiraerp.github.io  
**Live Demo (Vercel):** https://abuemira-nexa.vercel.app *(after deploy)*

> **COO & Co-Founder @ Nexa Solutions** · Odoo Project Manager · ERP Operations Manager · Financial Manager  
> Egypt & Saudi Arabia · 8+ Years · 60+ Projects · 40+ Certifications · LinkedIn Top ERP Voice

---

## 📋 About This Project

A fully self-contained, single-file professional portfolio website with **zero dependencies** — no npm, no build tools, no frameworks. Just pure HTML, CSS, and vanilla JavaScript.

### ✨ Features

| Section | Details |
|---|---|
| 🧑 Hero | Real photo, phone number, badges, Calendly CTA |
| 📊 Stats bar | 8+ years · 60+ projects · 40+ certs · 28+ recommendations |
| 🏢 Nexa Solutions | Full company profile, offices (Riyadh + New Cairo), COO role |
| 🛠 Services | 9 service cards with booking links |
| 💼 Experience | 7 roles — full timeline from 2013 to present |
| 🗂 Projects | 31 filterable ERP projects (Construction, Food, Retail, Gov, etc.) |
| 🎓 Certifications | 14 clickable certs with live verification URLs |
| 💬 Testimonials | 6 real recommendations |
| 🎓 Education | Cairo University + Missouri State University |
| 📞 Contact | Phone, Email, LinkedIn, Upwork, Mostaql, Calendly |

---

## 📁 File Structure

```
abuemira-portfolio/
├── index.html      ← Complete site (self-contained, ~200KB)
├── vercel.json     ← Vercel deployment configuration
├── .gitignore      ← Git ignore rules
└── README.md       ← This file
```

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create GitHub Repository

1. Go to [github.com](https://github.com) → sign in
2. Click **"New repository"** (top right **+** button)
3. Repository name: **`abuemiraerp.github.io`**
   > ⚠️ Must match your GitHub username exactly
4. Visibility: **Public**
5. Click **"Create repository"**

### Step 2 — Upload Files

**Option A — Web Upload (easiest, no Git needed):**
1. On your new empty repo page, click **"uploading an existing file"**
2. Drag and drop: `index.html`, `vercel.json`, `.gitignore`, `README.md`
3. Scroll down → add commit message: `"Initial portfolio deployment"`
4. Click **"Commit changes"**

**Option B — Git CLI:**
```bash
# Clone your new empty repo
git clone https://github.com/abuemiraerp/abuemiraerp.github.io
cd abuemiraerp.github.io

# Copy all 4 files from this zip into the folder, then:
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** tab (top menu)
2. Left sidebar → **Pages**
3. Under **"Source"** → select **"Deploy from a branch"**
4. Branch: **`main`** · Folder: **`/ (root)`**
5. Click **Save**

### Step 4 — Go Live ✅

Wait **60–90 seconds**, then visit:

```
https://abuemiraerp.github.io
```

---

## ⚡ Deploy to Vercel

Vercel gives you a faster CDN, better performance, and a custom `.vercel.app` URL in addition to GitHub Pages.

### Step 1 — Push to GitHub first

Complete the GitHub steps above before Vercel deployment.

### Step 2 — Connect Vercel

1. Go to [vercel.com](https://vercel.com) → **Sign up / Log in** with your GitHub account
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Find and select **`abuemiraerp.github.io`**
5. Click **"Import"**

### Step 3 — Configure Project

In the Vercel project setup screen:

| Setting | Value |
|---|---|
| **Framework Preset** | Other |
| **Root Directory** | `.` (leave empty / default) |
| **Build Command** | *(leave empty)* |
| **Output Directory** | `.` (leave empty / default) |
| **Install Command** | *(leave empty)* |

Click **"Deploy"**

### Step 4 — Go Live ✅

Vercel deploys in ~30 seconds. Your site will be live at:

```
https://abuemira-portfolio.vercel.app
```

You can also add a **custom domain** (e.g., `abuemira.com`) in:  
Vercel Dashboard → Your Project → **Settings → Domains**

---

## 🔄 Auto-Deploy on Every Update

Once connected, **every time you push to GitHub, Vercel auto-deploys** within seconds. No manual steps needed.

```bash
# Edit index.html, then:
git add index.html
git commit -m "Updated certifications"
git push origin main
# → Vercel auto-deploys within ~30 seconds ✅
```

---

## ✏️ How to Update Content

Open `index.html` in any text editor (VS Code recommended). Search for:

| What to update | Search for |
|---|---|
| Phone number | `+20 100 506 1349` |
| Email | `abuemira91@gmail.com` |
| Calendly booking link | `calendly.com/abuemira` |
| Nexa office details | `<!-- NEXA SECTION -->` |
| Add new project | Find `<!-- PROJECTS -->` → copy a `.proj-card` div |
| Add new certificate | Find `<!-- CERTIFICATIONS -->` section |
| Change teal color | `--teal:#017E84` in `:root` CSS |
| Change gold color | `--gold:#d4a843` in `:root` CSS |

---

## 🌐 Useful Links

| Resource | URL |
|---|---|
| LinkedIn | https://linkedin.com/in/abuemira |
| GitHub Portfolio | https://abuemiraerp.github.io |
| Calendly | https://calendly.com/abuemira/30min |
| Upwork | https://www.upwork.com/freelancers/~01670332eb77159714 |
| Mostaql | https://mostaql.com/u/m_abuemira |
| Nexa Solutions | https://www.nexa-solutions.com |

---

## 📞 Contact

**Mohamed Essam Abu Emira**  
📍 Kirdasa, Giza, Egypt  
📞 +20 100 506 1349  
✉️ abuemira91@gmail.com
