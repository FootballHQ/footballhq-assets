/* TURF V89.71 — full-screen native game result/effect authority.
   Loaded after the existing TURF game engine and V89.70 destination layer. */
(function(){
'use strict';
if(window.__TURF_GAME_EFFECTS_FULLSCREEN_8971__)return;
window.__TURF_GAME_EFFECTS_FULLSCREEN_8971__=true;
function q(s){return document.querySelector(s)}
function gameOpen(){var o=q('#footballGameOverlay');if(!o)return false;var c=getComputedStyle(o);return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||(c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0')}
function resultOpen(){var r=q('#fgResultOverlay');if(!r)return false;var c=getComputedStyle(r);return r.getAttribute('aria-hidden')==='false'||r.classList.contains('open')||r.classList.contains('active')||(c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0')}
function sizeCanvas(){
  if(!gameOpen())return;
  var c=q('#fgConfettiCanvas');if(!c)return;
  var w=Math.max(1,Math.round(window.innerWidth)),h=Math.max(1,Math.round(window.innerHeight));
  if(c.width!==w)c.width=w;if(c.height!==h)c.height=h;
  c.style.setProperty('width','100vw','important');c.style.setProperty('height','100vh','important');
  c.style.setProperty('left','0','important');c.style.setProperty('top','0','important');c.style.setProperty('transform','none','important');
}
function forceResult(){
  if(!gameOpen()||!resultOpen())return;
  var r=q('#fgResultOverlay');if(!r)return;
  r.style.setProperty('display','flex','important');r.style.setProperty('position','fixed','important');r.style.setProperty('inset','0','important');
  r.style.setProperty('width','100vw','important');r.style.setProperty('height','100vh','important');r.style.setProperty('z-index','2147483200','important');
}
function forceEffects(){
  if(!gameOpen())return;
  var d=q('#fgDamageFlash');if(d){d.style.setProperty('position','fixed','important');d.style.setProperty('inset','0','important');d.style.setProperty('width','100vw','important');d.style.setProperty('height','100vh','important');d.style.setProperty('transform','none','important');}
  var p=q('#fgFeedbackPop');if(p){p.style.setProperty('position','fixed','important');p.style.setProperty('z-index','2147483100','important');}
}
function run(){sizeCanvas();forceEffects();forceResult()}
window.addEventListener('resize',run);
document.addEventListener('click',function(){[0,30,90,180,350].forEach(function(ms){setTimeout(run,ms)})},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[80,180,400,800,1500,2600,5000].forEach(function(ms){setTimeout(run,ms)});
if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,25)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']})}
})();
