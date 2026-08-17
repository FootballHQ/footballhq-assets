/* TURF V89.04 — EXACT UPDATED SET 001 CARD RESTORE
   Set 001 tg001-tg020 uses the finished PNGs in /v88-36/cards/001/.
   Existing Signature tg021-tg024 art stays unchanged.
   Set 002+ is deliberately untouched.
*/
(function(){
  'use strict';
  if(window.__TURF_V8904_SET001_EXACT__) return;
  window.__TURF_V8904_SET001_EXACT__=true;

  var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/cards/';
  var EXACT={};
  for(var i=1;i<=20;i++){
    var id='tg'+String(i).padStart(3,'0');
    EXACT[id]=ROOT+'001/'+id+'.png?v=8904';
  }
  EXACT.tg021=ROOT+'021-pylonix-signature-exact.png?v=8904';
  EXACT.tg022=ROOT+'022-visorcore-signature-exact.png?v=8904';
  EXACT.tg023=ROOT+'023-stadion-signature-exact.png?v=8904';
  EXACT.tg024=ROOT+'024-footsu-signature-exact.png?v=8904';

  function idOf(card){
    return String(card&&(card.id||card.value||card.cardId||card.cardID||card.card_id)||'').trim().toLowerCase();
  }
  function is001(id){return /^tg0(?:0[1-9]|1[0-9]|2[0-4])$/.test(id)}
  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}

  function exactMarkup(card){
    var id=idOf(card);
    if(!is001(id) || !EXACT[id]) return '';
    var rarity=String(card&&card.rarity||'common').toLowerCase();
    var name=String(card&&card.name||id);
    return '<article class="fhq-fix5-card rarity-'+esc(rarity)+' fhq-v8866-full-card turf-v8904-set001-exact" data-fix5-card="'+esc(id)+'" data-card-id="'+esc(id)+'" data-rarity="'+esc(rarity)+'">'+
      '<div class="f5-frame fhq-v8866-full-frame">'+
        '<img class="fhq-v8866-full-img" src="'+esc(EXACT[id])+'" alt="'+esc(name)+'" draggable="false" loading="eager" decoding="async">'+
      '</div></article>';
  }

  var oldFix5=window.FHQFix5CardMarkup;
  var oldV85=window.fhqV85CardMarkup;
  var oldArt=window.fhqCardArtHTML;

  function render(card){
    var id=idOf(card);
    if(is001(id) && EXACT[id]) return exactMarkup(card);
    var fn=oldFix5||oldV85||oldArt;
    return typeof fn==='function'?fn(card):'';
  }

  function install(){
    window.FHQ_V85_CARD_IMAGES=window.FHQ_V85_CARD_IMAGES||{};
    Object.keys(EXACT).forEach(function(id){window.FHQ_V85_CARD_IMAGES[id]=EXACT[id]});
    window.FHQFix5CardMarkup=render;
    window.fhqV85CardMarkup=render;
    window.fhqCardArtHTML=render;
    window.FHQ_CARD_ART_URL=(function(old){
      return function(id){id=String(id||'').toLowerCase();if(EXACT[id])return EXACT[id];return typeof old==='function'?old(id):''};
    })(window.FHQ_CARD_ART_URL);
  }

  install();
  [120,400,900,1800,3500].forEach(function(ms){setTimeout(install,ms)});
  console.log('[TURF] V89.04 exact Set 001 full-card artwork active');
})();