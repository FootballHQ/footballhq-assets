/* ============================================================
   TURF TRIALS / FOOTBALL HQ V88.76 — RESTORE GRIDIRON SIGNATURE ART
   GitHub path:
   v88-36/js/37-fhq-v8859-restore-gridiron-signatures.js

   Scope: ONLY tg021–tg024 Signature image selection.
   Does not touch packs, odds, coins, animations, Set 002, or card data.
   ============================================================ */
(function(){
  'use strict';
  if(window.__FHQ_V8876_RESTORE_GRIDIRON_SIGNATURES__) return;
  window.__FHQ_V8876_RESTORE_GRIDIRON_SIGNATURES__=true;

  var IDS={tg021:1,tg022:1,tg023:1,tg024:1};
  var BASE='https://footballhq.github.io/footballhq-assets/v88-36/cards/';
  var DIRECT={
    tg021:BASE+'021-pylonix-signature-exact.png',
    tg022:BASE+'022-visorcore-signature-exact.png',
    tg023:BASE+'023-stadion-signature-exact.png',
    tg024:BASE+'024-footsu-signature-exact.png'
  };

  function idOf(x){
    return String(x && (x.value || x.id || x.cardId) || '');
  }

  function exactRegisteredArt(id){
    /* Current exact-art registry written by file 19. */
    try{
      var v88=window.FHQ_V88_RARITY_VARIANTS;
      var key=id+'::signature';
      if(v88 && v88[key]) return v88[key];
    }catch(e){}

    /* Older image registries kept for compatibility. */
    try{
      if(window.FHQ_V85_CARD_IMAGES && window.FHQ_V85_CARD_IMAGES[id]){
        return window.FHQ_V85_CARD_IMAGES[id];
      }
    }catch(e){}

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

    /* Permanent fallback: exact PNGs that already exist in GitHub. */
    return DIRECT[id] || '';
  }

  /* Register the direct exact images into the current registry as well. */
  window.FHQ_V88_RARITY_VARIANTS=window.FHQ_V88_RARITY_VARIANTS||{};
  Object.keys(DIRECT).forEach(function(id){
    var key=id+'::signature';
    if(!window.FHQ_V88_RARITY_VARIANTS[key]){
      window.FHQ_V88_RARITY_VARIANTS[key]=DIRECT[id];
    }
    /* Warm browser cache and expose load errors in console. */
    try{
      var img=new Image();
      img.onerror=function(){console.warn('[TurfTrials] Signature art failed to load:',DIRECT[id]);};
      img.src=DIRECT[id];
    }catch(e){}
  });

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

  function install(){
    window.fhqV85ImageForCard=restoredImageForCard;
    try{fhqV85ImageForCard=restoredImageForCard}catch(e){}
  }

  install();
  setTimeout(install,700);
  setTimeout(install,1800);
  setTimeout(install,3500);

  console.log('[TurfTrials] V88.76 tg021–tg024 exact Signature art fix active');
})();
