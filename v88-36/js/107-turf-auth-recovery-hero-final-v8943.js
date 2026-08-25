/* TURF v89.43 — stale recovery cleanup + exact home hero width
   Worker-auth safety revision: recovery cleanup is intentionally narrow.
   It must never hide arbitrary positioned TURF containers. */
(function(){
'use strict';
if(window.__TURF_V8943_FINAL__)return;
window.__TURF_V8943_FINAL__=true;

function unlockElement(el){
  if(!el)return;
  try{
    el.removeAttribute('inert');
    el.style.removeProperty('pointer-events');
    el.style.removeProperty('filter');
    el.style.removeProperty('opacity');
  }catch(e){}
}

function cleanupRecovery(){
  try{window.__fhqIdentityResolving=false}catch(e){}
  try{
    ['turf-auth-locked','fhq-identity-recovering','recovering','account-loading','is-loading','fhq-loading'].forEach(function(c){
      document.documentElement.classList.remove(c);
      document.body.classList.remove(c);
    });
  }catch(e){}

  /* Hide only known legacy auth controls. */
  ['turfAuthGate','turfGoogleButton'].forEach(function(id){
    var el=document.getElementById(id);if(!el)return;
    try{
      el.setAttribute('aria-hidden','true');
      el.setAttribute('inert','');
      el.style.setProperty('display','none','important');
      el.style.setProperty('visibility','hidden','important');
      el.style.setProperty('opacity','0','important');
      el.style.setProperty('pointer-events','none','important');
    }catch(e){}
  });

  /* Return interaction to the real TURF app after Worker auth. */
  [document.documentElement,document.body].forEach(function(el){
    unlockElement(el);
    if(el)try{el.style.removeProperty('overflow')}catch(e){}
  });
  ['fhqSidebar','fhqMain','fhqHome','turfTopbar'].forEach(function(id){
    var el=document.getElementById(id);unlockElement(el);
    if(el){
      try{el.querySelectorAll('[inert]').forEach(function(x){x.removeAttribute('inert')})}catch(e){}
      try{el.querySelectorAll('button,a,[role="button"]').forEach(function(x){x.style.removeProperty('pointer-events')})}catch(e){}
    }
  });

  /* A stale full-screen recovery/loading blocker can remain visually transparent.
     Disable hit-testing only on known recovery/loading nodes, never app sections. */
  try{
    document.querySelectorAll('[id*="recover" i],[class*="recover" i],[id*="auth-loading" i],[class*="auth-loading" i]').forEach(function(el){
      if(el.id==='fhqSidebar'||el.id==='fhqMain'||el.id==='fhqHome'||el.id==='turfTopbar')return;
      var t=String(el.textContent||'').toLowerCase();
      if(t.indexOf('recovering your football hq account')>=0||t.indexOf('restoring your turf account')>=0){
        el.setAttribute('aria-hidden','true');
        el.style.setProperty('pointer-events','none','important');
        el.style.setProperty('display','none','important');
      }
    });
  }catch(e){}
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
[80,220,500,1000,1800,3200,5200].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('resize',alignHero);
window.addEventListener('message',function(e){var d=e&&e.data;if(d&&typeof d==='object'&&d.type==='turf-auth-worker-profile'){apply();[60,180,500,1200].forEach(function(ms){setTimeout(apply,ms)})}},true);
window.addEventListener('turf:auth-ready',function(){apply();[60,180,500,1200].forEach(function(ms){setTimeout(apply,ms)})});
})();
