/* TURF V89.15 — competitive submenu placement + nowrap */
(function(){
'use strict';
if(window.__TURF_V8915_COMP_PLACEMENT__)return;window.__TURF_V8915_COMP_PLACEMENT__=true;
function boot(){
 var nav=document.querySelector('#fhqSidebar .fhq-nav'); if(!nav)return;
 var trials=nav.querySelector('#turfTrialsNav'); if(!trials)return;
 var box=nav.querySelector('#turfCompetitiveGames,#turfCompetitiveSubnav,[data-turf-competitive-games]');
 if(!box){
   var candidates=[].slice.call(nav.children).filter(function(el){return /Cases/i.test(el.textContent||'')&&/Tic-Tac-Toe/i.test(el.textContent||'')&&/4 in a Row/i.test(el.textContent||'')});
   box=candidates[0];
 }
 if(!box)return;
 box.id=box.id||'turfCompetitiveGames';
 box.style.setProperty('order','22','important');
 box.style.setProperty('width','100%','important');
 box.style.setProperty('box-sizing','border-box','important');
 box.style.setProperty('margin','0 0 4px 0','important');
 box.style.setProperty('padding','0 8px 0 34px','important');
 box.querySelectorAll('button,a,[role="button"]').forEach(function(b){
   b.style.setProperty('width','100%','important'); b.style.setProperty('min-width','0','important');
   b.style.setProperty('white-space','nowrap','important'); b.style.setProperty('word-break','normal','important');
   b.style.setProperty('overflow-wrap','normal','important'); b.style.setProperty('text-align','left','important');
   b.style.setProperty('display','flex','important'); b.style.setProperty('align-items','center','important');
   b.style.setProperty('gap','9px','important');
   [].slice.call(b.children).forEach(function(c){c.style.setProperty('white-space','nowrap','important');c.style.setProperty('word-break','normal','important')});
 });
}
function run(){boot();setTimeout(boot,250);setTimeout(boot,800);setTimeout(boot,1800)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
new MutationObserver(function(){boot()}).observe(document.documentElement,{childList:true,subtree:true});
})();
