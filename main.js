/* =========================================================
   FLALU Inc. — Interactions
   ========================================================= */

(() => {
  'use strict';

  // ---- Loader ----
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('is-done');
    }, 900);
  });

  // ---- Header scroll state ----
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
    updateTimelineFill();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Mobile menu ----
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('is-open');
      nav.classList.remove('is-open');
    }));
  }

  // ---- Reveal on view ----
  const reveals = document.querySelectorAll('[data-reveal]');
  reveals.forEach(el => {
    const delay = el.getAttribute('data-delay');
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  reveals.forEach(el => io.observe(el));

  // ---- Timeline items reveal ----
  const tItems = document.querySelectorAll('.t-item');
  const tio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        tio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
  tItems.forEach(el => tio.observe(el));

  // ---- Timeline line fill (scroll progress) ----
  const timeline = document.getElementById('timeline');
  const timelineFill = document.getElementById('timelineFill');
  function updateTimelineFill(){
    if (!timeline || !timelineFill) return;
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.7;             // 開始: タイムラインの上端が画面下から70%地点に来た時
    const end   = vh * 0.3;             // 終了: 下端が画面上から30%地点
    const total = rect.height + (start - end);
    const progressed = Math.min(Math.max(start - rect.top, 0), total);
    const pct = Math.min((progressed / total) * 100, 100);
    timelineFill.style.height = `${pct}%`;
  }
  updateTimelineFill();

  // ---- Hero parallax orbs ----
  const orbs = document.querySelectorAll('.orb');
  let raf = null;
  window.addEventListener('mousemove', (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbs.forEach((orb, i) => {
        const f = (i + 1) * 0.4;
        orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    });
  });

})();
