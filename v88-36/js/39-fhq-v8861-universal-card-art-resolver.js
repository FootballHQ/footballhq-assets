/* ============================================================
   FOOTBALL HQ V88.68 — UNIVERSAL CARD ART RESOLVER
   GitHub path: v88-36/js/39-fhq-v8861-universal-card-art-resolver.js

   LOCKED ASSET CONTRACT
   Legacy Set 001 keeps the existing exact-image registry.
   Set 002+ uses deterministic portrait assets:
     ts002-001 -> v88-36/cards/002/ts002-001.png
     ts003-017 -> v88-36/cards/003/ts003-017.png

   Every new set card asset must be a finished 720x1040 portrait card.
   No black bars, sheet crops, neighboring-card slices, or runtime reframing.
   ============================================================ */
(function(){
  'use strict';
  if(window.__FHQ_V8868_UNIVERSAL_CARD_ART__) return;
  window.__FHQ_V8868_UNIVERSAL_CARD_ART__ = true;

  var RAW_ROOT='https://raw.githubusercontent.com/FootballHQ/footballhq-assets/main/v88-36/cards/';

  function cardId(card){
    return String(card && (card.value || card.id || card.cardId) || '');
  }

  function setParts(id){
    var m=String(id||'').match(/^ts(\d{3})-(\d{3})$/i);
    if(!m) return null;
    return {setCode:m[1],number:m[2],setNumber:parseInt(m[1],10)};
  }

  function registeredExact(id){
    try{
      var map=window.FHQ_V85_CARD_IMAGES;
      if(map && map[id]) return map[id];
    }catch(e){}
    return '';
  }

  function conventionUrl(id){
    var p=setParts(id);
    if(!p || p.setNumber<2) return '';
    return RAW_ROOT+p.setCode+'/'+String(id).toLowerCase()+'.png?v=8868';
  }

  function resolve(card){
    var id=cardId(card);
    var p=setParts(id);
    if(p && p.setNumber>=2) return conventionUrl(id);
    return registeredExact(id);
  }

  var fallback='';
  try{ if(typeof FHQ_V85_PLACEHOLDER!=='undefined') fallback=FHQ_V85_PLACEHOLDER; }catch(e){}
  if(!fallback){
    fallback='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1040">'+
      '<rect width="720" height="1040" fill="#071017"/>'+
      '<rect x="20" y="20" width="680" height="1000" rx="30" fill="#0c1820" stroke="#35566a" stroke-width="6"/>'+
      '<text x="360" y="500" text-anchor="middle" fill="#dff7ff" font-family="Arial" font-size="90" font-weight="900">HQ</text>'+
      '<text x="360" y="590" text-anchor="middle" fill="#7893a0" font-family="Arial" font-size="26" font-weight="800">ARTWORK NOT FOUND</text>'+
      '</svg>'
    );
  }

  function escAttr(s){
    return String(s==null?'':s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function markup(card){
    card=card||{};
    var id=cardId(card);
    var src=resolve(card)||fallback;
    var nm=escAttr(card.name||'Football HQ Card');
    return '<div class="fhq-v85-card-img-wrap fhq-universal-card-art" data-card-id="'+escAttr(id)+'">'+
      '<img class="fhq-v85-card-img" src="'+escAttr(src)+'" alt="'+nm+'" loading="eager" decoding="async" draggable="false" '+
      'onerror="if(!this.dataset.fhqFallback){this.dataset.fhqFallback=\'1\';this.src=\''+
      String(fallback).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+'\';}">'+
      '</div>';
  }

  function installSet002Map(){
    window.FHQ_V85_CARD_IMAGES=window.FHQ_V85_CARD_IMAGES||{};
    for(var i=1;i<=40;i++){
      var id='ts002-'+String(i).padStart(3,'0');
      window.FHQ_V85_CARD_IMAGES[id]=conventionUrl(id);
    }
  }

  function reassert(){
    window.fhqV85ImageForCard=resolve;
    window.fhqV85CardMarkup=markup;
    window.fhqCardArtHTML=markup;
    try{fhqV85ImageForCard=resolve}catch(e){}
    try{fhqV85CardMarkup=markup}catch(e){}
    try{fhqCardArtHTML=markup}catch(e){}
    installSet002Map();
  }

  reassert();
  [0,300,900,1800,3500].forEach(function(ms){setTimeout(reassert,ms)});

  if(!document.getElementById('fhqV8868UniversalArtCss')){
    var style=document.createElement('style');
    style.id='fhqV8868UniversalArtCss';
    style.textContent=`
      .fhq-universal-card-art,.fhq-v85-card-img-wrap{
        width:100%!important;
        aspect-ratio:720/1040!important;
        overflow:hidden!important;
      }
      .fhq-universal-card-art .fhq-v85-card-img,.fhq-v85-card-img-wrap .fhq-v85-card-img{
        display:block!important;
        width:100%!important;
        height:100%!important;
        object-fit:contain!important;
        object-position:center center!important;
        image-rendering:auto!important;
        filter:none!important;
        transform:none!important;
      }
    `;
    document.head.appendChild(style);
  }

  window.FHQ_CARD_ART_URL=function(id){
    id=String(id||'');
    var p=setParts(id);
    return p&&p.setNumber>=2?conventionUrl(id):registeredExact(id);
  };
  window.FHQ_CARD_ART_RESOLVE=resolve;
  window.FHQ_CARD_ASSET_SPEC={width:720,height:1040,aspect:'9:13',format:'png',setConvention:'v88-36/cards/{setCode}/ts{setCode}-{number}.png'};

  console.log('[FootballHQ] V88.68 universal card-art resolver active');
})();
