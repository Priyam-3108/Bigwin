// ═══════════════════════════════════════
// BIGWIN BUILDSYS — Shared JS
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── Mobile menu ──
  const openBtn  = document.getElementById('mobile-open');
  const closeBtn = document.getElementById('mobile-close');
  const overlay  = document.getElementById('mobile-overlay');
  if (openBtn && overlay) {
    openBtn.addEventListener('click',  () => overlay.classList.add('open'));
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => overlay.classList.remove('open')));
  }

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  // ── Counter animation ──
  const counters = document.querySelectorAll('[data-counter]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el    = e.target;
      const end   = parseFloat(el.dataset.counter);
      const dur   = 1800;
      const start = performance.now();
      const isInt = Number.isInteger(end);
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = end * ease;
        el.textContent = isInt ? Math.round(val).toLocaleString() : val.toFixed(1);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = isInt ? end.toLocaleString() : end.toFixed(1);
      }
      requestAnimationFrame(step);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Smooth parallax hero bg ──
  const heroBg = document.querySelector('.hero-parallax');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.4;
      heroBg.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }

});
