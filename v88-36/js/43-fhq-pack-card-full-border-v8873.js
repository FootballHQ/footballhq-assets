/* ============================================================
   FOOTBALL HQ V88.75 — PACK CARD RIGHT-BORDER ALIGNMENT FIX

   PURPOSE
   - The full Set 002 PNG is present, but the exact-art overlay sits
     a little too far right inside the detected pack-result card face.
   - Shift ONLY the exact PNG slightly left and add a small safety inset
     so the left and right outer frame rails appear balanced.
   - Do NOT touch pack odds, purchases, animations, duplicates,
     collections, or the permanent card-art resolver.

   Scoped ONLY to exact-art overlays inside #fhqPackRewards.
   ============================================================ */
(function(){
  'use strict';

  window.__FHQ_V8873_PACK_FULL_BORDER__ = true;
  window.__FHQ_V8874_PACK_FULL_BORDER__ = true;
  window.__FHQ_V8875_PACK_FULL_BORDER__ = true;

  var old73 = document.getElementById('fhq-v8873-pack-full-border-style');
  if(old73) old73.remove();
  var old74 = document.getElementById('fhq-v8874-pack-full-border-style');
  if(old74) old74.remove();

  var style = document.createElement('style');
  style.id = 'fhq-v8875-pack-full-border-style';
  style.textContent = `
    #fhqPackRewards .fhq-v8863-exact-overlay {
      position: absolute !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-width: 100% !important;
      max-width: none !important;
      box-sizing: border-box !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: visible !important;
      margin: 0 !important;
      padding: 3px !important;
      transform: none !important;
      clip-path: none !important;
      border-radius: 0 !important;
      mask: none !important;
      -webkit-mask: none !important;
    }

    /*
      96.8% preserves the full card rails while keeping the card visually large.
      The slight negative X shift corrects the right-heavy placement visible
      in the pack-result carousel without moving the actual carousel slide.
    */
    #fhqPackRewards .fhq-v8863-exact-overlay > img {
      position: relative !important;
      top: auto !important;
      right: auto !important;
      bottom: auto !important;
      left: auto !important;
      display: block !important;
      width: 96.8% !important;
      height: 96.8% !important;
      min-width: 0 !important;
      max-width: 96.8% !important;
      min-height: 0 !important;
      max-height: 96.8% !important;
      object-fit: contain !important;
      object-position: 50% 50% !important;
      margin: auto !important;
      padding: 0 !important;
      transform: translateX(-1.1%) !important;
      transform-origin: center center !important;
      clip-path: none !important;
      box-sizing: border-box !important;
    }
  `;

  (document.head || document.documentElement).appendChild(style);
  console.log('[FootballHQ] V88.75 pack right-border alignment fix active');
})();
