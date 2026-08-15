/* ============================================================
   FOOTBALL HQ V88.60 — SET 002 FINAL ART LOCK
   GitHub path:
   v88-36/js/38-fhq-v8860-set002-final-art-lock.js

   Requires the 40 standardized approved Set 002 PNGs uploaded to:
   v88-36/cards/002/ts002-001.png ... ts002-040.png

   Scope:
   - Forces ALL Set 002 cards to the exact approved 720x1040 assets.
   - Keeps Set 001 art untouched.
   - Keeps rarity animation routing untouched.
   - Keeps current pack logic / odds / coins / duplicates untouched.
   ============================================================ */
(function(){
  'use strict';
  if(window.__FHQ_V8860_SET002_FINAL_ART_LOCK__) return;
  window.__FHQ_V8860_SET002_FINAL_ART_LOCK__=true;

  var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/cards/002/';
  var SET002='The Sideline';

  function idOf(x){
    return String(x && (x.value || x.id || x.cardId) || '');
  }
  function isSet002Id(id){
    return /^ts002-\d{3}$/.test(String(id||''));
  }
  function urlFor(id){
    return ROOT + String(id) + '.png?v=8860';
  }

  window.FHQ_SET002_ART_URLS = window.FHQ_SET002_ART_URLS || {};
  for(var i=1;i<=40;i++){
    var id='ts002-'+String(i).padStart(3,'0');
    window.FHQ_SET002_ART_URLS[id]=urlFor(id);
  }

  /* Preserve whatever was already working for Set 001. */
  var prior = typeof window.fhqV85ImageForCard==='function'
    ? window.fhqV85ImageForCard
    : null;

  function imageForCard(card){
    var id=idOf(card);
    if(isSet002Id(id)) return urlFor(id);
    if(prior){
      try{return prior.apply(this,arguments)||'';}catch(e){}
    }
    return '';
  }

  window.fhqV85ImageForCard=imageForCard;
  try{fhqV85ImageForCard=imageForCard}catch(e){}

  /* Older renderers also consult FHQ_V85_CARD_IMAGES directly. */
  window.FHQ_V85_CARD_IMAGES = window.FHQ_V85_CARD_IMAGES || {};
  for(var j=1;j<=40;j++){
    var jid='ts002-'+String(j).padStart(3,'0');
    window.FHQ_V85_CARD_IMAGES[jid]=urlFor(jid);
  }

  /* Reassert after delayed legacy initialization. */
  [600,1600,3000].forEach(function(ms){
    setTimeout(function(){
      window.fhqV85ImageForCard=imageForCard;
      try{fhqV85ImageForCard=imageForCard}catch(e){}
      window.FHQ_V85_CARD_IMAGES = window.FHQ_V85_CARD_IMAGES || {};
      for(var k=1;k<=40;k++){
        var kid='ts002-'+String(k).padStart(3,'0');
        window.FHQ_V85_CARD_IMAGES[kid]=urlFor(kid);
      }
    },ms);
  });

  /* Standard card shape wherever pack/collection cards are rendered. */
  if(!document.getElementById('fhqV8860Set002CardShapeCss')){
    var s=document.createElement('style');
    s.id='fhqV8860Set002CardShapeCss';
    s.textContent=`
      .fhq-pack-reward img,
      .fhq-card-art img,
      #fhqAlbumGrid img[src*="/cards/002/ts002-"]{
        object-fit:contain!important;
        object-position:center!important;
      }
      #fhqAlbumGrid .v8858-card,
      #fhqAlbumGrid .fhq-v8855-card{
        aspect-ratio:720/1040!important;
      }
    `;
    document.head.appendChild(s);
  }

  console.log('[FootballHQ] V88.60 Set 002 final 720x1040 art lock active');
})();
