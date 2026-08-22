/* ============================================================
   TURF v89.42 — SINGLE AUTH AUTHORITY + EXACT HERO EDGE
   - The top-level turftrials.com wrapper owns Google sign-in.
   - Disables the older Google button/gate inside the Apps Script iframe.
   - Keeps the iframe auth bridge/backend handlers intact.
   - Forces Home hero right edge to the exact Home content right edge.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_SINGLE_AUTH_HERO_8942__)return;
window.__TURF_SINGLE_AUTH_HERO_8942__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}

function hideLegacyInnerGate(){
  try{document.documentElement.classList.remove('turf-auth-locked')}catch(e){}
  var gate=q('#turfAuthGate');
  if(gate){
    gate.classList.add('turf-auth-hidden');
    gate.setAttribute('aria-hidden','true');
    gate.style.setProperty('display','none','important');
    gate.style.setProperty('pointer-events','none','important');
  }
  var btn=q('#turfGoogleButton');
  if(btn){
    btn.innerHTML='';
    btn.style.setProperty('display','none','important');
    btn.setAttribute('aria-hidden','true');
  }
}

/* This runs only inside the Apps Script iframe. The outer turftrials.com
   page has its own separate window and keeps its Google button normally. */
function disableInnerGoogleUI(){
  try{
    if(!window.google||!google.accounts||!google.accounts.id)return false;
    var id=google.accounts.id;
    if(id.__turf8942Disabled)return true;
    id.__turf8942Disabled=true;
    id.initialize=function(){};
    id.renderButton=function(el){
      try{if(el){el.innerHTML='';el.style.display='none';}}catch(e){}
    };
    id.prompt=function(){};
    return true;
  }catch(e){return false}
}

function armGoogleScript(){
  try{
    document.querySelectorAll('script[src*="accounts.google.com/gsi/client"]').forEach(function(s){
      if(s.dataset.turf8942Armed==='1')return;
      s.dataset.turf8942Armed='1';
      s.addEventListener('load',function(){disableInnerGoogleUI();hideLegacyInnerGate()},{once:true});
    });
  }catch(e){}
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

function run(){hideLegacyInnerGate();armGoogleScript();disableInnerGoogleUI();alignHero()}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,50,120,250,500,900,1500,2500,4000,6500].forEach(function(ms){setTimeout(run,ms)});
window.addEventListener('resize',function(){setTimeout(alignHero,30);setTimeout(alignHero,180)});

try{
  var timer=null;
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,25)}).observe(document.documentElement,{childList:true,subtree:true});
}catch(e){}
})();
