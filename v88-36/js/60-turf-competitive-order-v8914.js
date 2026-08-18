/* ============================================================
   TURF V89.14 — COMPETITIVE SUBNAV ORDER FIX
   - Keep Cases / Trivia Tic-Tac-Toe / 4 in a Row directly below Trials
   - Respect the sidebar's existing CSS flex-order category system
   - Prevent narrow wrapping / stacked labels
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8914__) return; window.__TURF_V8914__=true;
function qs(s,r){return (r||document).querySelector(s)}
function addCss(){
  if(qs('#turfV8914Css')) return;
  var s=document.createElement('style');s.id='turfV8914Css';
  s.textContent=`
    /* Existing sidebar uses flex-order: competitive label=20, Trials=21, casual=30. */
    #fhqSidebar .fhq-nav #turfTrialsCompetitiveLinks{
      order:22!important;
      flex:0 0 auto!important;
      width:auto!important;
      min-width:0!important;
      box-sizing:border-box!important;
      margin:0 10px 8px 22px!important;
      padding:3px 0 3px 12px!important;
      display:flex!important;
      flex-direction:column!important;
      gap:2px!important;
    }
    #fhqSidebar .fhq-nav #turfTrialsCompetitiveLinks .turf-comp-nav{
      width:100%!important;
      min-width:0!important;
      max-width:none!important;
      white-space:nowrap!important;
      overflow:hidden!important;
      text-overflow:ellipsis!important;
      min-height:36px!important;
      padding:6px 8px!important;
      font-size:11px!important;
      line-height:1!important;
    }
    #fhqSidebar .fhq-nav #turfTrialsCompetitiveLinks .turf-comp-nav > span:last-child{
      min-width:0!important;
      white-space:nowrap!important;
      overflow:hidden!important;
      text-overflow:ellipsis!important;
      display:block!important;
    }
  `;
  document.head.appendChild(s);
}
function place(){
  addCss();
  var wrap=qs('#turfTrialsCompetitiveLinks'),trials=qs('#turfTrialsNav'),nav=qs('#fhqSidebar .fhq-nav');
  if(!wrap||!trials||!nav) return;
  /* Keep the submenu in the same flex container as Trials. Order 22 handles visual placement. */
  if(wrap.parentElement!==nav) nav.appendChild(wrap);
}
function run(){place()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[100,300,700,1400,2600,4500].forEach(function(ms){setTimeout(run,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8914Obs);window.__turf8914Obs=setTimeout(run,80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
