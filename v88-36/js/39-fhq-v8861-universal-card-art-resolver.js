/* ============================================================
   FOOTBALL HQ V88.61 — UNIVERSAL CARD ART RESOLVER
   GitHub path:
   v88-36/js/39-fhq-v8861-universal-card-art-resolver.js

   WHY THIS EXISTS
   Older FootballHQ builds registered exact card images manually in
   FHQ_V85_CARD_IMAGES. That made new sets fragile: if a registration script
   loaded late, failed, or a placeholder was registered first, packs showed
   generic placeholder cards.

   V88.61 makes artwork deterministic by ID + folder convention.

   NEW SET CONVENTION
   Card ID: ts002-001
   Asset:   v88-36/cards/002/ts002-001.png

   Future example:
   Card ID: ts003-017
   Asset:   v88-36/cards/003/ts003-017.png

   New set artwork therefore needs NO per-card JavaScript registration.
   Upload correctly named PNGs and the runtime resolves them automatically.

   Existing Set 001 artwork remains untouched and continues using the
   existing exact-image registry.
   ============================================================ */
(function(){
  'use strict';
  if(window.__FHQ_V8861_UNIVERSAL_CARD_ART__) return;
  window.__FHQ_V8861_UNIVERSAL_CARD_ART__ = true;

  var RAW_ROOT =
    'https://raw.githubusercontent.com/FootballHQ/footballhq-assets/main/v88-36/cards/';

  function cardId(card){
    return String(card && (card.value || card.id || card.cardId) || '');
  }

  function futureSetParts(id){
    var m = String(id||'').match(/^ts(\d{3})-(\d{3})$/i);
    if(!m) return null;
    return { setCode:m[1], number:m[2] };
  }

  function futureSetUrl(id){
    var p = futureSetParts(id);
    if(!p) return '';
    return RAW_ROOT + p.setCode + '/' + id + '.png?v=8861';
  }

  function registeredExact(id){
    try{
      var map = window.FHQ_V85_CARD_IMAGES;
      if(map && map[id]) return map[id];
    }catch(e){}
    return '';
  }

  /* Source of truth:
     - ts###-### IDs always use convention-based PNG paths.
     - all legacy cards use the existing registry exactly as before. */
  function resolve(card){
    var id = cardId(card);
    var auto = futureSetUrl(id);
    if(auto) return auto;
    return registeredExact(id);
  }

  /* Keep a stable legacy placeholder reference for true missing art. */
  var fallback = '';
  try{
    if(typeof FHQ_V85_PLACEHOLDER !== 'undefined') fallback = FHQ_V85_PLACEHOLDER;
  }catch(e){}
  if(!fallback){
    fallback =
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1040">'+
        '<rect width="720" height="1040" fill="#071017"/>'+
        '<rect x="20" y="20" width="680" height="1000" rx="30" fill="#0c1820" stroke="#35566a" stroke-width="6"/>'+
        '<text x="360" y="500" text-anchor="middle" fill="#dff7ff" font-family="Arial" font-size="90" font-weight="900">HQ</text>'+
        '<text x="360" y="590" text-anchor="middle" fill="#7893a0" font-family="Arial" font-size="26" font-weight="800">ARTWORK NOT FOUND</text>'+
        '</svg>'
      );
  }

  function escAttr(s){
    return String(s==null?'':s)
      .replace(/&/g,'&amp;').replace(/"/g,'&quot;')
      .replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function markup(card){
    card = card || {};
    var id = cardId(card);
    var src = resolve(card) || fallback;
    var nm = escAttr(card.name || 'Football HQ Card');

    /* data-card-id lets future debugging identify exactly what failed.
       onerror falls back only after the deterministic asset URL itself fails. */
    return '<div class="fhq-v85-card-img-wrap fhq-universal-card-art" data-card-id="'+escAttr(id)+'">'+
      '<img class="fhq-v85-card-img" src="'+escAttr(src)+'" alt="'+nm+'" '+
      'loading="eager" decoding="async" draggable="false" '+
      'onerror="if(!this.dataset.fhqFallback){this.dataset.fhqFallback=\'1\';this.src=\''+
      String(fallback).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+
      '\';}">'+
      '</div>';
  }

  /* IMPORTANT:
     Override BOTH the image resolver and the actual markup renderer.
     The old site has multiple rendering layers; replacing only one was the
     reason earlier patches could still display placeholder cards. */
  window.fhqV85ImageForCard = resolve;
  window.fhqV85CardMarkup = markup;
  window.fhqCardArtHTML = markup;

  try{ fhqV85ImageForCard = resolve; }catch(e){}
  try{ fhqV85CardMarkup = markup; }catch(e){}
  try{ fhqCardArtHTML = markup; }catch(e){}

  /* Populate the shared map too, for any legacy code that still reads it
     directly. Set 002 now points to real PNGs, never generated placeholders. */
  window.FHQ_V85_CARD_IMAGES = window.FHQ_V85_CARD_IMAGES || {};
  for(var i=1;i<=40;i++){
    var id = 'ts002-' + String(i).padStart(3,'0');
    window.FHQ_V85_CARD_IMAGES[id] = futureSetUrl(id);
  }

  function reassert(){
    window.fhqV85ImageForCard = resolve;
    window.fhqV85CardMarkup = markup;
    window.fhqCardArtHTML = markup;
    try{ fhqV85ImageForCard = resolve; }catch(e){}
    try{ fhqV85CardMarkup = markup; }catch(e){}
    try{ fhqCardArtHTML = markup; }catch(e){}
    window.FHQ_V85_CARD_IMAGES = window.FHQ_V85_CARD_IMAGES || {};
    for(var i=1;i<=40;i++){
      var id = 'ts002-' + String(i).padStart(3,'0');
      window.FHQ_V85_CARD_IMAGES[id] = futureSetUrl(id);
    }
  }

  /* Older scripts initialize at several delayed points. Reasserting here
     makes the central resolver the final owner without polling forever. */
  [0,300,900,1800,3500].forEach(function(ms){ setTimeout(reassert,ms); });

  /* Uniform card dimensions everywhere. */
  if(!document.getElementById('fhqV8861UniversalArtCss')){
    var style = document.createElement('style');
    style.id = 'fhqV8861UniversalArtCss';
    style.textContent = `
      .fhq-universal-card-art,
      .fhq-v85-card-img-wrap{
        width:100%!important;
        aspect-ratio:720/1040!important;
        overflow:hidden!important;
      }
      .fhq-universal-card-art .fhq-v85-card-img,
      .fhq-v85-card-img-wrap .fhq-v85-card-img{
        display:block!important;
        width:100%!important;
        height:100%!important;
        object-fit:contain!important;
        object-position:center!important;
      }
    `;
    document.head.appendChild(style);
  }

  /* Public debug helpers. */
  window.FHQ_CARD_ART_URL = function(id){ return futureSetUrl(String(id||'')) || registeredExact(String(id||'')); };
  window.FHQ_CARD_ART_RESOLVE = resolve;

  console.log('[FootballHQ] V88.61 universal card-art resolver active');
})();
