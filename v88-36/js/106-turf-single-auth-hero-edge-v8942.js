/* ============================================================
   TURF v89.47 — AUTH GATE / HERO EDGE COMPATIBILITY
   Worker auth is authoritative when the parent has already authenticated.
   Native Apps Script auth is restored only when Worker auth is NOT active.
   Home hero alignment behavior is preserved.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_NATIVE_AUTH_8947__)return;
window.__TURF_NATIVE_AUTH_8947__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function workerAuthenticated(){
  try{
    return document.documentElement.classList.contains('turf-parent-auth') ||
      !!window.__TURF_AUTH_TOKEN__ ||
      !!localStorage.getItem('turfAuthenticatedTokenV8921') ||
      !!localStorage.getItem('turfAuthAccountTokenV1');
  }catch(e){return !!window.__TURF_AUTH_TOKEN__}
}
function hideNativeAuth(){
  var gate=q('#turfAuthGate');
  if(gate){
    gate.classList.add('turf-auth-hidden');
    gate.setAttribute('aria-hidden','true');
    gate.style.setProperty('display','none','important');
    gate.style.setProperty('visibility','hidden','important');
    gate.style.setProperty('opacity','0','important');
    gate.style.setProperty('pointer-events','none','important');
  }
  var btn=q('#turfGoogleButton');
  if(btn){
    btn.setAttribute('aria-hidden','true');
    btn.style.setProperty('display','none','important');
    btn.style.setProperty('visibility','hidden','important');
    btn.style.setProperty('opacity','0','important');
    btn.style.setProperty('pointer-events','none','important');
  }
}
function restoreNativeAuth(){
  if(workerAuthenticated()){hideNativeAuth();return}
  var gate=q('#turfAuthGate');
  if(gate){
    gate.classList.remove('turf-auth-hidden');
    gate.removeAttribute('aria-hidden');
    ['display','visibility','opacity','pointer-events'].forEach(function(p){gate.style.removeProperty(p)});
  }
  var btn=q('#turfGoogleButton');
  if(btn){
    ['position','left','top','width','height','overflow','opacity','pointer-events','display','visibility'].forEach(function(p){btn.style.removeProperty(p)});
    btn.removeAttribute('aria-hidden');
  }
}
function alignHero(){
  var home=q('#fhqHome');
  var inner=q('#fhqHome .fhq-home-inner');
  var hero=q('#fhqHome .fhq-hero');
  if(!home||!inner||!hero)return;
  try{
    var ir=inner.getBoundingClientRect();
    var hr=hero.getBoundingClientRect();
    if(ir.width<200||hr.width<200)return;
    var exact=Math.round(ir.right-hr.left);
    if(exact<300)return;
    hero.style.setProperty('width',exact+'px','important');
    hero.style.setProperty('max-width','none','important');
    hero.style.setProperty('min-width','0','important');
    hero.style.setProperty('margin-right','0','important');
    hero.style.setProperty('box-sizing','border-box','important');
  }catch(e){}
}
function run(){restoreNativeAuth();alignHero()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,50,120,250,500,900,1500,2500,4000].forEach(function(ms){setTimeout(run,ms)});
window.addEventListener('resize',function(){setTimeout(alignHero,30);setTimeout(alignHero,180)});
window.addEventListener('turf:auth-ready',function(){hideNativeAuth();setTimeout(alignHero,0);setTimeout(alignHero,250)});
})();
