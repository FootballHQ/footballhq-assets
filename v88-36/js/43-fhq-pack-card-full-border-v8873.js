/* ============================================================
   FOOTBALL HQ V88.73 — PACK CARD FULL-BORDER FIT FIX

   PURPOSE
   - Fix Set 002 exact PNGs appearing with the right border clipped
     in the finished pack-results carousel.
   - Keep the active card centered.
   - Do NOT touch pack odds, purchase logic, rarity cinematics,
     duplicate logic, collections, or the permanent art resolver.

   This is intentionally CSS-only and scoped to #fhqPackRewards.
   ============================================================ */
(function(){
  'use strict';

  if(window.__FHQ_V8873_PACK_FULL_BORDER__) return;
  window.__FHQ_V8873_PACK_FULL_BORDER__ = true;

  var style = document.createElement('style');
  style.id = 'fhq-v8873-pack-full-border-style';
  style.textContent = `
    /* Exact Set 002+ PNG overlay inside pack-result cards only. */
    #fhqPackRewards .fhq-v8863-exact-overlay {
      position: absolute !important;
      inset: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-sizing: border-box !important;
      overflow: visible !important;
      padding: 2px !important;
    }

    /* Give the PNG a tiny safety margin so BOTH left and right borders show. */
    #fhqPackRewards .fhq-v8863-exact-overlay > img {
      display: block !important;
      width: 98.5% !important;
      height: 98.5% !important;
      max-width: 98.5% !important;
      max-height: 98.5% !important;
      object-fit: contain !important;
      object-position: 50% 50% !important;
      margin: auto !important;
      transform: none !important;
      clip-path: none !important;
      border-radius: inherit !important;
    }

    /* Do not let an intermediate exact-art wrapper crop one side. */
    #fhqPackRewards .fhq-v8863-exact-overlay,
    #fhqPackRewards .fhq-v8863-exact-overlay > img {
      left: auto !important;
      right: auto !important;
    }
  `;

  (document.head || document.documentElement).appendChild(style);
  console.log('[FootballHQ] V88.73 pack full-border fit active');
})();
