/* TURF v89.43 — stale recovery cleanup + exact home hero width
   Worker-auth safety revision: recovery cleanup is intentionally narrow.
   It must never hide arbitrary positioned TURF containers. */
(function(){
'use strict';
if(window.__TURF_V8943_FINAL__)return;
window.__TURF_V8943_FINAL__=true;

function cleanupRecovery(){
  try{window.__fhqIdentityResolving=false}catch(e){}
  try{
    document.documentElement.classList.remove('fhq-identity-recovering','recovering','account-loading','is-loading','fhq-loading');
    document.body.classList.remove('fhq-identity-recovering','recovering','account-loading','is-loading','fhq-loading');
  }catch(e){}
  /* Hide only the known legacy auth controls. Do not inspect/hide ancestors by
     text, size, position or z-index; those may be the real TURF app shell. */
  ['turfAuthGate','turfGoogleButton'].forEach(function(id){
    var el=document.getElementById(id);if(!el)return;
    try{
      el.setAttribute('aria-hidden','true');
      el.style.setProperty('display','none','important');
      el.style.setProperty('visibility','hidden','important');
      el.style.setProperty('opacity','0','important');
      el.style.setProperty('pointer-events','none','important');
    }catch(e){}
  });
  /* Return interaction to the real app after auth. */
  [document.documentElement,document.body].forEach(function(el){
    if(!el)return;
    try{el.style.removeProperty('pointer-events');el.style.removeProperty('overflow');el.style.removeProperty('filter');el.style.removeProperty('opacity')}catch(e){}
  });
  ['fhqSidebar','fhqMain','fhqHome','turfTopbar'].forEach(function(id){
    var el=document.getElementById(id);if(el)try{el.style.removeProperty('pointer-events')}catch(e){}
  });
}

function alignHero(){
  var home=document.getElementById('fhqHome');
  if(!home)return;
  var inner=home.querySelector('.fhq-home-inner');
  var hero=home.querySelector('.fhq-hero');
  if(!inner||!hero)return;
  inner.style.setProperty('max-width','none','important');
  inner.style.setProperty('width','100%','important');
  inner.style.setProperty('box-sizing','border-box','important');
  hero.style.setProperty('width','100%','important');
  hero.style.setProperty('max-width','none','important');
  hero.style.setProperty('box-sizing','border-box','important');
  hero.style.setProperty('margin-left','0','important');
  hero.style.setProperty('margin-right','0','important');
}

function apply(){cleanupRecovery();alignHero();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[80,220,500,1000].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('resize',alignHero);
window.addEventListener('message',function(e){var d=e&&e.data;if(d&&typeof d==='object'&&d.type==='turf-auth-worker-profile'){apply();setTimeout(apply,180)}},true);
window.addEventListener('turf:auth-ready',function(){apply();setTimeout(apply,180)});
})();
