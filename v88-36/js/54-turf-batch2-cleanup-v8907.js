/* ============================================================
   TURF V89.07 — BATCH 2 VISUAL / ASSET CLEANUP
   Goals:
   - Use crisp TURF mark/wordmark assets on Home + sidebar/top profile.
   - Remove leftover dark/boxed logo presentation.
   - Clean Daily Gift / Free Daily Pack visual wrappers.
   - Remove leftover legacy glyphs from sidebar labels.
   - Presentation-only: no account/game/card/backend changes.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8907_BATCH2__)return;
window.__TURF_V8907_BATCH2__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var MARK=ROOT+'turf-mark-exact-v8901.svg?v=8907';
var WORDMARK=ROOT+'turf-wordmark.svg?v=8907';
function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

function addCss(){
  if(qs('#turfV8907Css'))return;
  var s=document.createElement('style');s.id='turfV8907Css';s.textContent=`
    /* crisp / transparent brand presentation */
    #fhqSidebar .fhq-brand-mark{
      background:transparent url("${MARK}") center/contain no-repeat!important;
      border:0!important;box-shadow:none!important;filter:drop-shadow(0 0 9px rgba(39,188,255,.36))!important;
    }
    #fhqSidebar .fhq-brand-mark svg,#fhqSidebar .fhq-brand-mark img,#fhqSidebar .fhq-brand-mark:after{display:none!important;content:none!important}
    .turf-top-profile{
      background:transparent url("${MARK}") center/contain no-repeat!important;
      box-shadow:0 0 16px rgba(34,191,255,.18)!important;
    }
    .turf-top-profile img{display:none!important}

    #fhqHome .fhq-home-brandline{display:block!important;min-height:118px!important;margin-bottom:4px!important}
    #fhqHome .fhq-home-brandline .fhq-home-shield,#fhqHome .fhq-home-brandline h1,#fhqHome .fhq-home-brandline:after{display:none!important;content:none!important}
    #turfV8907Wordmark{display:block!important;width:min(620px,72vw)!important;height:auto!important;max-height:126px!important;object-fit:contain!important;object-position:left center!important;margin:0!important;filter:drop-shadow(0 0 13px rgba(30,177,255,.20))!important;background:transparent!important}

    /* Daily rewards: remove square/black-box presentation around art */
    #fhqDailyGiftCard .icon,#fhqFreePackCard .icon{
      background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important;
    }
    #fhqDailyGiftCard .icon img,#fhqFreePackCard .icon img{
      display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;background:transparent!important;border:0!important;box-shadow:none!important;
    }
    #fhqDailyGiftCard,#fhqFreePackCard{overflow:hidden!important}

    /* eliminate old glyph text left beside new TURF icons */
    #fhqSidebar .fhq-nav button{white-space:nowrap!important}
  `;document.head.appendChild(s);
}

function ensureWordmark(){
  var line=qs('#fhqHome .fhq-home-brandline');if(!line)return;
  var img=qs('#turfV8907Wordmark',line);
  if(!img){img=document.createElement('img');img.id='turfV8907Wordmark';img.alt='TURF — Compete • Collect • Climb';img.src=WORDMARK;line.insertBefore(img,line.firstChild)}
}

function cleanNavText(){
  qsa('#fhqSidebar .fhq-nav button,#turfTrialsNav').forEach(function(b){
    Array.prototype.slice.call(b.childNodes).forEach(function(n){
      if(n.nodeType!==3)return;
      var v=n.nodeValue||'';
      v=v.replace(/^\s*[▣◉▤▦★◇◈⚡⌂◫⊞＋+◆□■]+\s*/,' ');
      n.nodeValue=v;
    });
  });
}

function cleanRewardImages(){
  ['#fhqDailyGiftCard .icon','#fhqFreePackCard .icon'].forEach(function(sel){
    var el=qs(sel);if(!el)return;
    el.removeAttribute('title');
    qsa('img',el).forEach(function(img){img.removeAttribute('title');img.style.background='transparent'});
  });
}

function apply(){addCss();ensureWordmark();cleanNavText();cleanRewardImages()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[120,400,900,1800,3500].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8907Timer);window.__turf8907Timer=setTimeout(apply,80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
