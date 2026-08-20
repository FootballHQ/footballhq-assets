/* ============================================================
   TURF v89.29 — BATCH 2 VISUAL POLISH
   Presentation only — no auth/account/game mutations.
   - fully removes duplicate Shop/Locker balance cards
   - restores full Competitive submenu labels
   - replaces small fuzzy TURF marks with a crisp sideways-T treatment
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_VISUAL_POLISH_8929__)return;
window.__TURF_VISUAL_POLISH_8929__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  var old=q('#turfV8929Css');if(old)old.remove();
  var st=document.createElement('style');st.id='turfV8929Css';
  st.textContent=`
    /* Sidebar submenu labels must never collapse to C.. / T.. / 4.. */
    #turfTrialsCompetitiveLinks{width:calc(100% - 20px)!important;max-width:none!important;overflow:visible!important}
    #turfTrialsCompetitiveLinks .turf-comp-nav{width:100%!important;max-width:none!important;overflow:visible!important;white-space:nowrap!important;text-overflow:clip!important;font-size:10.5px!important;letter-spacing:0!important;padding-right:4px!important}
    #turfTrialsCompetitiveLinks .turf-comp-nav>span:last-child{display:block!important;max-width:none!important;width:auto!important;overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important}

    /* New crisp sideways-T mark */
    .turf-v8929-tmark{position:relative!important;display:grid!important;place-items:center!important;width:100%!important;height:100%!important;overflow:visible!important;background:linear-gradient(145deg,#0c2130,#07131e)!important;border:1px solid rgba(66,183,237,.32)!important;border-radius:15px!important;box-shadow:inset 0 0 18px rgba(20,100,145,.12),0 8px 20px rgba(0,0,0,.28)!important}
    .turf-v8929-tmark>i{display:block!important;font-style:italic!important;font-family:Arial Black,Arial,sans-serif!important;font-size:32px!important;line-height:1!important;font-weight:950!important;color:#b9c2c9!important;transform:skewX(-13deg) rotate(-2deg)!important;-webkit-text-stroke:2px #071019!important;text-shadow:-2px 0 #169ee8,2px 0 #169ee8,0 -2px #169ee8,0 2px #169ee8,0 0 9px rgba(43,188,255,.82),4px 5px 1px rgba(0,0,0,.62)!important}
    #fhqSidebar .fhq-brand-mark .turf-v8929-tmark>i{font-size:34px!important}
    .turf-v8929-smallmark{width:48px!important;height:48px!important;min-width:48px!important}
    .turf-v8929-smallmark>i{font-size:28px!important}
  `;
  (document.head||document.documentElement).appendChild(st);
}

function fullCompLabels(){
  var wrap=q('#turfTrialsCompetitiveLinks');if(!wrap)return;
  var names={deal:'Cases',ttt:'Trivia Tic-Tac-Toe',connect4:'4 in a Row'};
  Object.keys(names).forEach(function(k){
    var b=q('[data-comp-game="'+k+'"]',wrap);if(!b)return;
    var spans=qa('span',b);if(spans.length)spans[spans.length-1].textContent=names[k];
  });
}

function makeMark(extra){
  var s=document.createElement('span');s.className='turf-v8929-tmark'+(extra?' '+extra:'');s.setAttribute('aria-hidden','true');
  var i=document.createElement('i');i.textContent='T';s.appendChild(i);return s;
}
function fixSidebarMark(){
  var box=q('#fhqSidebar .fhq-brand-mark');if(!box)return;
  qa('svg,img,.turf-v8919-side-mark',box).forEach(function(x){x.style.display='none'});
  if(!q('.turf-v8929-tmark',box))box.appendChild(makeMark(''));
}
function fixTopMark(){
  /* Replace only small TURF logo images/buttons in the header area, never hero/card art. */
  qa('img').forEach(function(img){
    var src=String(img.currentSrc||img.src||'').toLowerCase();
    if(src.indexOf('turf-mark')<0&&src.indexOf('/brand/')<0)return;
    var r;try{r=img.getBoundingClientRect()}catch(e){return}
    if(!r||r.top>210||r.width>100||r.height>100)return;
    if(img.closest&&img.closest('#fhqSidebar'))return;
    var p=img.parentElement;if(!p||q('.turf-v8929-smallmark',p))return;
    img.style.display='none';p.appendChild(makeMark('turf-v8929-smallmark'));
  });
}

function hideBalanceCard(id){
  var el=document.getElementById(id);if(!el)return;
  /* Hide the compact card containing the duplicate balance, not merely the number/icon. */
  var node=el;
  var candidate=null;
  for(var i=0;i<7&&node&&node!==document.body;i++,node=node.parentElement){
    var r;try{r=node.getBoundingClientRect()}catch(e){r=null}
    if(r&&r.width>=150&&r.width<=520&&r.height>=55&&r.height<=190)candidate=node;
  }
  if(candidate){candidate.style.setProperty('display','none','important');candidate.setAttribute('data-turf-hidden-duplicate-balance','1')}
  else if(el.parentElement)el.parentElement.style.setProperty('display','none','important');
}
function cleanDuplicateBalances(){hideBalanceCard('fhqShopCoins');hideBalanceCard('fhqLockerCoins')}

function run(){addCss();fullCompLabels();fixSidebarMark();fixTopMark();cleanDuplicateBalances()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[80,220,500,1000,2000,4000].forEach(function(ms){setTimeout(run,ms)});
var timer=null;
if(window.MutationObserver)new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
