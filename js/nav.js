/* =========================================
   NAV — Waqashi Global Consulting
   Handles: mobile menu, scroll background
   ========================================= */

(function () {
  'use strict';

  const mainNav      = document.getElementById('mainNav');
  const mobileNav    = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileClose  = document.getElementById('mobileClose');
  const mobileLinks  = document.querySelectorAll('.mobile-link, .mobile-phone');

  /* ---- Open mobile nav ---- */
  function openMobile() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('visible');
    hamburgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  }

  /* ---- Close mobile nav ---- */
  function closeMobile() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('visible');
    hamburgerBtn.classList.remove('open');
    document.body.style.overflow = '';
    hamburgerBtn.focus();
  }

  /* ---- Event listeners ---- */
  hamburgerBtn.addEventListener('click', openMobile);
  hamburgerBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMobile();
    }
  });

  mobileClose.addEventListener('click', closeMobile);
  mobileOverlay.addEventListener('click', closeMobile);

  // Close when any mobile link is clicked
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobile);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobile();
    }
  });

  /* ---- Scroll: darken nav ---- */
  function onScroll() {
    if (window.scrollY > 60) {
      mainNav.style.background = '#111';
    } else {
      mainNav.style.background = 'var(--dark)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();
