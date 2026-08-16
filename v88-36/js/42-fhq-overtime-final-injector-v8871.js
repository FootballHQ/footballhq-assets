/* ============================================================
   FOOTBALL HQ V88.72 — TEMP OVERTIME FORCE SLOT
   Converts the already-visible Primetime shop card into Overtime.
   No extra shop card required; avoids legacy renderer conflicts.
   TEMPORARY: remove after Signature 040 QA.
   ============================================================ */
(function(){
'use strict';
if(window.__FHQ_V8872_OVERTIME_FORCE__)return;
window.__FHQ_V8872_OVERTIME_FORCE__=true;

function findPrime(){
  var g=document.getElementById('fhqShopGrid');
  if(!g)return null;
  var cards=g.querySelectorAll('article,.fhq-shop-item');
  for(var i=0;i<cards.length;i++){
    if(/Primetime Pack|Overtime Pack/i.test(cards[i].textContent||'')) return cards[i];
  }
  return null;
}

function forceOvertime(){
  var card=findPrime();
  if(!card)return;

  card.setAttribute('data-fhq-overtime-forced','1');

  var h=card.querySelector('h3');
  if(h)h.textContent='Overtime Pack';

  var meta=card.querySelector('.fhq-v8831-pack-meta');
  if(meta)meta.textContent='2 RARE+ • 3 EPIC+';

  var ps=card.querySelectorAll('p');
  for(var i=0;i<ps.length;i++){
    if(/marquee|card|Rare|Epic|chase/i.test(ps[i].textContent||'')){
      ps[i].textContent='TEMP TEST PACK • 5 cards with 2 Rare+ and 3 Epic+ guaranteed. Built for Signature testing.';
      break;
    }
  }

  var buy=card.querySelector('[data-pack-buy]');
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
    odds.onclick=function(e){
      if(e)e.stopPropagation();
      if(typeof fhqOpenPackOdds==='function')fhqOpenPackOdds('primetime_pack');
    };
  }

  /* Change only visible Primetime price text from 850 to 1000. */
  var all=card.querySelectorAll('*');
  for(var j=0;j<all.length;j++){
    if(all[j].children.length===0 && /^\s*850\s*$/.test(all[j].textContent||'')){
      all[j].textContent='1000';
    }
  }

  /* Fallback for text nodes where 850 is beside the coin icon. */
  var walker=document.createTreeWalker(card,NodeFilter.SHOW_TEXT,null);
  var n;
  while((n=walker.nextNode())){
    if(/\b850\b/.test(n.nodeValue||'')) n.nodeValue=n.nodeValue.replace(/\b850\b/g,'1000');
  }

  console.log('[FootballHQ] V88.72 Primetime slot forced to Overtime test pack');
}

var timer=null;
function schedule(){
  clearTimeout(timer);
  timer=setTimeout(forceOvertime,60);
}

function boot(){
  forceOvertime();
  var g=document.getElementById('fhqShopGrid');
  if(g && window.MutationObserver){
    new MutationObserver(schedule).observe(g,{childList:true,subtree:true,characterData:true});
  }
  document.addEventListener('click',function(){setTimeout(forceOvertime,100);},true);
  [200,500,1000,2000,4000,7000].forEach(function(ms){setTimeout(forceOvertime,ms);});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();