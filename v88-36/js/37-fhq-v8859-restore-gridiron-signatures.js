/* ============================================================
   FOOTBALL HQ V88.59 — RESTORE ORIGINAL GRIDIRON SIGNATURE ART
   GitHub path:
   v88-36/js/37-fhq-v8859-restore-gridiron-signatures.js

   Scope: ONLY tg021–tg024 image selection.
   It does not touch packs, odds, coins, animations, Set 002, or card data.

   The original exact Signature registration script still loads earlier.
   This patch simply makes newer collection/card renderers respect those
   registered exact images before falling back to generic character art.
   ============================================================ */
(function(){
  'use strict';
  if(window.__FHQ_V8859_RESTORE_GRIDIRON_SIGNATURES__) return;
  window.__FHQ_V8859_RESTORE_GRIDIRON_SIGNATURES__=true;

  var IDS={tg021:1,tg022:1,tg023:1,tg024:1};

  function idOf(x){
    return String(x && (x.value || x.id || x.cardId) || '');
  }

  function exactRegisteredArt(id){
    /* V85 exact image registry — populated by the existing
       19-fhq-v883-signature-exact-art-registration.js file. */
    try{
      if(window.FHQ_V85_CARD_IMAGES && window.FHQ_V85_CARD_IMAGES[id]){
        return window.FHQ_V85_CARD_IMAGES[id];
      }
    }catch(e){}

    /* Support alternate exact-art registry names used by older builds
       without replacing or mutating them. */
    var registries=[
      'FHQ_SIGNATURE_EXACT_ART',
      'FHQ_SIGNATURE_ART',
      'FHQ_EXACT_CARD_IMAGES',
      'FHQ_CARD_IMAGES'
    ];
    for(var i=0;i<registries.length;i++){
      try{
        var r=window[registries[i]];
        if(r && r[id]) return r[id];
      }catch(e){}
    }
    return '';
  }

  var prior = typeof window.fhqV85ImageForCard==='function'
    ? window.fhqV85ImageForCard : null;

  function restoredImageForCard(card){
    var id=idOf(card);
    if(IDS[id]){
      var exact=exactRegisteredArt(id);
      if(exact) return exact;
    }
    if(prior){
      try{return prior.apply(this,arguments)||'';}catch(e){}
    }
    return '';
  }

  window.fhqV85ImageForCard=restoredImageForCard;
  try{fhqV85ImageForCard=restoredImageForCard}catch(e){}

  /* Reassert after delayed legacy boot code, but do not alter registries. */
  setTimeout(function(){
    window.fhqV85ImageForCard=restoredImageForCard;
    try{fhqV85ImageForCard=restoredImageForCard}catch(e){}
  },700);

  setTimeout(function(){
    window.fhqV85ImageForCard=restoredImageForCard;
    try{fhqV85ImageForCard=restoredImageForCard}catch(e){}
  },1800);

  console.log('[FootballHQ] V88.59 original tg021–tg024 Signature art priority active');
})();
