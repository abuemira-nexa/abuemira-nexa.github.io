/* ============================================================
   Mohamed Essam Abu Emira — Portfolio Animations & Enhancements
   Author  : Mohamed Essam Abu Emira
   Version : 4.0
   ============================================================ */

'use strict';

/* ── Skill bar scroll animation ── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.sk-fill');
  const targets = [];

  fills.forEach(el => {
    targets.push(el.style.width || el.getAttribute('data-width') || '0%');
    el.style.width = '0';
    el.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
  });

  const skillCard = document.querySelector('.skills-card');
  if (!skillCard) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        fills.forEach((el, i) => {
          setTimeout(() => { el.style.width = targets[i]; }, i * 60);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(skillCard);
})();

/* ── Fade-up on scroll for cards ── */
(function initFadeUp() {
  const items = document.querySelectorAll(
    '.exp-card, .svc-card, .proj-card, .cert-card, .test-card, .edu-card'
  );

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
})();

/* ── Active nav link on scroll ── */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? '#fff'
        : 'rgba(255,255,255,.6)';
    });
  }, { passive: true });
})();

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Stat counter animation ── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-n');

  const parseNum = str => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const suffix = el.textContent.replace(/\d/g, '');
      const target = parseNum(el.textContent);
      if (!target) return;

      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 35);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
})();
