/* ============================================================
   FOOTBALL HQ V88.74 — PACK CARD FULL-BORDER GEOMETRY FIX

   PURPOSE
   - Fix Set 002 exact PNGs appearing with the RIGHT border clipped
     in the finished pack-results carousel.
   - Correct the V88.73 overlay geometry mistake where left/right
     were unintentionally reset to auto.
   - Keep the featured card centered and preserve its full artwork.
   - Do NOT touch pack odds, purchase logic, rarity cinematics,
     duplicate logic, collections, or the permanent art resolver.

   Scoped ONLY to exact-art overlays inside #fhqPackRewards.
   ============================================================ */
(function(){
  'use strict';

  window.__FHQ_V8873_PACK_FULL_BORDER__ = true;
  window.__FHQ_V8874_PACK_FULL_BORDER__ = true;

  var old = document.getElementById('fhq-v8873-pack-full-border-style');
  if(old) old.remove();

  var style = document.createElement('style');
  style.id = 'fhq-v8874-pack-full-border-style';
  style.textContent = `
    /*
      The exact PNG overlay must occupy the ENTIRE detected card face.
      Do not use left:auto/right:auto here — that was the V88.73 bug.
    */
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
    }

    /*
      Fit the WHOLE 720x1040 PNG inside the card face.
      A tiny uniform inset gives both outside frame rails room to render.
    */
    #fhqPackRewards .fhq-v8863-exact-overlay > img {
      position: relative !important;
      top: auto !important;
      right: auto !important;
      bottom: auto !important;
      left: auto !important;
      display: block !important;
      width: 97.5% !important;
      height: 97.5% !important;
      min-width: 0 !important;
      max-width: 97.5% !important;
      min-height: 0 !important;
      max-height: 97.5% !important;
      object-fit: contain !important;
      object-position: center center !important;
      margin: auto !important;
      padding: 0 !important;
      transform: none !important;
      clip-path: none !important;
      box-sizing: border-box !important;
    }

    /*
      The overlay itself may extend to the exact edges of the card face.
      Never allow an overlay-level border radius or mask to shave one side.
    */
    #fhqPackRewards .fhq-v8863-exact-overlay {
      border-radius: 0 !important;
      mask: none !important;
      -webkit-mask: none !important;
    }
  `;

  (document.head || document.documentElement).appendChild(style);
  console.log('[FootballHQ] V88.74 pack full-border geometry fix active');
})();
