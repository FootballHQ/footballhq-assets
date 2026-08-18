/* TURF V89.17 — competitive nav icon cleanup */
(function(){
'use strict';
if(window.__TURF_V8917_COMP_ICONS__)return;window.__TURF_V8917_COMP_ICONS__=true;
function apply(){
 var box=document.querySelector('#turfTrialsCompetitiveLinks,#turfCompetitiveGames,#turfCompetitiveSubnav,[data-turf-competitive-games]');
 if(!box)return;
 box.style.setProperty('padding','0','important');
 box.style.setProperty('margin','0','important');
 box.style.setProperty('border-left','0','important');
 box.querySelectorAll('.turf-comp-nav,button,a,[role="button"]').forEach(function(b){
   b.style.setProperty('background','transparent','important');
   b.style.setProperty('border','0','important');
   b.style.setProperty('border-radius','0','important');
   b.style.setProperty('box-shadow','none','important');
   b.style.setProperty('min-height','48px','important');
   b.style.setProperty('padding','8px 10px','important');
   b.style.setProperty('font-size','14px','important');
   b.style.setProperty('font-weight','800','important');
   b.style.setProperty('color','#f4f8fb','important');
   b.style.setProperty('gap','12px','important');
   b.style.setProperty('justify-content','flex-start','important');
   b.style.setProperty('white-space','nowrap','important');
 });
 box.querySelectorAll('.turf-comp-icon').forEach(function(i){
   i.style.setProperty('width','34px','important');
   i.style.setProperty('height','34px','important');
   i.style.setProperty('flex','0 0 34px','important');
   i.style.setProperty('background','transparent','important');
   i.style.setProperty('border','0','important');
   i.style.setProperty('border-radius','0','important');
   i.style.setProperty('box-shadow','none','important');
 });
 box.querySelectorAll('.turf-comp-icon svg').forEach(function(svg){
   svg.style.setProperty('width','26px','important');
   svg.style.setProperty('height','26px','important');
   svg.style.setProperty('stroke-width','1.9','important');
 });
}
function run(){apply();[200,600,1400,2600].forEach(function(ms){setTimeout(apply,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true});
})();
