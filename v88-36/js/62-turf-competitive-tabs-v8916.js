/* TURF V89.16 — make competitive games peer tabs, not nested Trials links */
(function(){
'use strict';
if(window.__TURF_V8916_COMP_TABS__)return;window.__TURF_V8916_COMP_TABS__=true;
function apply(){
 var nav=document.querySelector('#fhqSidebar .fhq-nav'); if(!nav)return;
 var box=nav.querySelector('#turfTrialsCompetitiveLinks,#turfCompetitiveGames,#turfCompetitiveSubnav,[data-turf-competitive-games]');
 if(!box)return;
 box.style.setProperty('order','22','important');
 box.style.setProperty('margin','0','important');
 box.style.setProperty('padding','0','important');
 box.style.setProperty('border-left','0','important');
 box.style.setProperty('display','contents','important');
 var items=[].slice.call(box.querySelectorAll('.turf-comp-nav,button,a,[role="button"]'));
 items.forEach(function(b,i){
   b.style.setProperty('order',String(22+i),'important');
   b.style.setProperty('width','100%','important');
   b.style.setProperty('min-height','52px','important');
   b.style.setProperty('margin','0','important');
   b.style.setProperty('padding','0 12px','important');
   b.style.setProperty('border','0','important');
   b.style.setProperty('border-radius','0','important');
   b.style.setProperty('background','transparent','important');
   b.style.setProperty('color','#f4f8fb','important');
   b.style.setProperty('font-size','16px','important');
   b.style.setProperty('font-weight','800','important');
   b.style.setProperty('line-height','1','important');
   b.style.setProperty('letter-spacing','0','important');
   b.style.setProperty('text-transform','none','important');
   b.style.setProperty('display','flex','important');
   b.style.setProperty('align-items','center','important');
   b.style.setProperty('gap','12px','important');
   b.style.setProperty('white-space','nowrap','important');
   b.style.setProperty('text-align','left','important');
   b.style.setProperty('box-shadow','none','important');
   var icon=b.querySelector('.turf-comp-icon,span:first-child');
   if(icon){
     icon.style.setProperty('width','34px','important');
     icon.style.setProperty('height','34px','important');
     icon.style.setProperty('flex','0 0 34px','important');
     icon.style.setProperty('border-radius','9px','important');
     icon.style.setProperty('display','grid','important');
     icon.style.setProperty('place-items','center','important');
   }
   var label=b.querySelector('span:last-child');
   if(label){label.style.setProperty('color','#f4f8fb','important');label.style.setProperty('font-size','16px','important');label.style.setProperty('font-weight','800','important');label.style.setProperty('white-space','nowrap','important')}
 });
}
function run(){apply();setTimeout(apply,250);setTimeout(apply,800);setTimeout(apply,1600)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true});
})();
