/* ============================================================
   FOOTBALL HQ V88.71 — FINAL OVERTIME TEST PACK INJECTOR
   Runs after legacy shop renderers and re-adds Overtime Pack.
   TEMPORARY: remove after Signature 040 QA.
   ============================================================ */
(function(){
'use strict';
if(window.__FHQ_V8871_OVERTIME_FINAL__)return;
window.__FHQ_V8871_OVERTIME_FINAL__=true;

var ART='https://footballhq.github.io/footballhq-assets/v88-48/packs/pack-primetime-v8848.png?v=8871';

function inject(){
  var g=document.getElementById('fhqShopGrid');
  if(!g)return;
  if(g.querySelector('[data-shop-pack-card="overtime_pack"],[data-fhq-v8871-overtime]'))return;

  var prime=g.querySelector('[data-shop-pack-card="primetime_pack"],article[data-fhq-v8853-pack="primetime_pack"]');
  if(!prime){
    var arts=g.querySelectorAll('article');
    for(var i=0;i<arts.length;i++){
      if(/Primetime Pack/i.test(arts[i].textContent||'')){prime=arts[i];break;}
    }
  }
  if(!prime)return;

  var card=prime.cloneNode(true);
  card.setAttribute('data-shop-pack-card','overtime_pack');
  card.setAttribute('data-fhq-v8871-overtime','1');

  var h=card.querySelector('h3'); if(h)h.textContent='Overtime Pack';
  var meta=card.querySelector('.fhq-v8831-pack-meta'); if(meta)meta.textContent='2 RARE+ • 3 EPIC+';
  var p=card.querySelector('p'); if(p)p.textContent='TEMP TEST PACK • 5 cards with 2 Rare+ and 3 Epic+ guaranteed. Built for high-end card testing.';
  var img=card.querySelector('img'); if(img){img.src=ART;img.alt='Overtime Pack';}

  var buy=card.querySelector('[data-pack-buy],button[data-pack-buy]');
  if(buy){
    buy.setAttribute('data-pack-buy','overtime_pack');
    buy.onclick=function(e){
      if(e){e.preventDefault();e.stopPropagation();}
      try{if(typeof fhqV8831UnlockAudio==='function')fhqV8831UnlockAudio();}catch(_e){}
      if(typeof fhqBuyPack==='function')fhqBuyPack('overtime_pack');
    };
  }

  var odds=card.querySelector('[data-pack-odds]');
  if(odds){
    odds.setAttribute('data-pack-odds','overtime_pack');
    odds.onclick=function(e){if(e)e.stopPropagation();if(typeof fhqOpenPackOdds==='function')fhqOpenPackOdds('primetime_pack');};
  }

  var spans=card.querySelectorAll('span');
  for(var j=0;j<spans.length;j++){
    if(/^\s*850\s*$/.test(spans[j].textContent||'')){spans[j].textContent='1000';break;}
  }
  // Fallback if price is embedded with the coin icon in a larger span.
  var html=card.innerHTML;
  html=html.replace(/>\s*850\s*</g,'>1000<');
  card.innerHTML=html;
  // Rebind purchase after innerHTML normalization.
  buy=card.querySelector('[data-pack-buy]');
  if(buy){
    buy.setAttribute('data-pack-buy','overtime_pack');
    buy.onclick=function(e){if(e){e.preventDefault();e.stopPropagation();}try{if(typeof fhqV8831UnlockAudio==='function')fhqV8831UnlockAudio();}catch(_e){}if(typeof fhqBuyPack==='function')fhqBuyPack('overtime_pack');};
  }
  odds=card.querySelector('[data-pack-odds]');
  if(odds){odds.setAttribute('data-pack-odds','overtime_pack');odds.onclick=function(e){if(e)e.stopPropagation();if(typeof fhqOpenPackOdds==='function')fhqOpenPackOdds('primetime_pack');};}

  prime.insertAdjacentElement('afterend',card);
  console.log('[FootballHQ] V88.71 Overtime Pack injected');
}

var queued=false;
function queue(){if(queued)return;queued=true;setTimeout(function(){queued=false;inject();},40);}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){inject();});
else inject();

var obs=new MutationObserver(queue);
obs.observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('click',function(){setTimeout(inject,80);},true);
[200,600,1200,2500,5000].forEach(function(ms){setTimeout(inject,ms);});
})();