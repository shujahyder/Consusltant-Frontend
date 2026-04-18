/* =========================================
   FEATURES — Waqashi Global Consulting
   Handles: feature list active-item toggle
   ========================================= */

(function () {
  'use strict';

  /* Each feature list operates independently.
     Clicking any item makes it active within its
     own list, deactivating the previously active one. */

  document.querySelectorAll('.feature-list').forEach(function (list) {
    const items = list.querySelectorAll('.feature-item');

    items.forEach(function (item) {
      // Click
      item.addEventListener('click', function () {
        items.forEach(function (i) { i.classList.remove('active'); });
        item.classList.add('active');
      });

      // Keyboard: Enter or Space activates the item
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          items.forEach(function (i) { i.classList.remove('active'); });
          item.classList.add('active');
        }
      });
    });
  });
})();
