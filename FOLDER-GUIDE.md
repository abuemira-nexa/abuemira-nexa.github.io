# Folder Guide — Mohamed Essam Abu Emira Portfolio

Static site served by GitHub Pages from `main`. No build step.

```
index.html                  Page markup (all sections, case-study cards, contact form)
assets/
  css/site.css              All styles (design tokens in :root at the top)
  js/roi.js                 ROI calculator maths and Odoo pricing data
  js/main.js                Language/theme toggles, Arabic copy, projects filter,
                            case-study data and modal, counters, reveal, mobile drawer
  js/recommendations.js     LinkedIn recommendations data, marquee and modal,
                            certificates "show all" toggle
  img/                      Photo, logos, favicons, og-image.jpg (1200×630 share card)
  img/projects/             Client logos (client strip and case studies)
  img/recommendations/      Recommender photos
robots.txt, sitemap.xml     Search engine files
site.webmanifest            Icons for "add to home screen"
```

## Editing content

- **English text** lives in `index.html`.
- **Arabic text** lives in `assets/js/main.js` (`applyLang` / `applyLangExtended`): each
  `t(element, 'English', 'Arabic')` call sets one element. When you change English copy in
  `index.html`, change the matching English string in `main.js` too, or switching back from
  Arabic will restore the old text.
- **Case studies:** cards are in `index.html` (`#pg .cs-card`), the modal content is the
  `csData` object in `main.js` (same `data-cs` key). Add `role` / `roleAr` to show "My role".
- **Recommendations:** `TESTIMONIALS` in `recommendations.js` (order = display order) and the
  `cats` array right below it (same order).
- After changing CSS or JS, bump `?v=` on the `<link>` / `<script>` tags in `index.html` so
  visitors get the new file.
