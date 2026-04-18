/* =========================================
   ANIMATIONS — Waqashi Global Consulting
   Handles: scroll reveal, counter animation
   ========================================= */

(function () {
  'use strict';

  /* ================================================
     SCROLL REVEAL
     Observes elements with class .reveal and adds
     .visible when they enter the viewport.
  ================================================ */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Small stagger delay for visual polish
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately for older browsers
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ================================================
     COUNTER ANIMATION
     Animates .stat-num elements from 0 to their
     data-target value when the stats bar scrolls in.
  ================================================ */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1500; // ms
    const steps    = 60;
    const interval = duration / steps;
    let current    = 0;
    const increment = target / steps;

    // Clear any existing text so it doesn't flash
    el.textContent = '0' + suffix;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, interval);
  }

  function animateAllCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
      animateCounter(el);
    });
  }

  const statsBar = document.querySelector('.stats-bar');

  if (statsBar && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          animateAllCounters();
          statsObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statsBar);
  } else if (statsBar) {
    // Fallback
    animateAllCounters();
  }
})();
