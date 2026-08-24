
(function(){
  try{
    var n=Number(localStorage.getItem('footballHQCoinDisplayV2'))||0;
    var e=document.getElementById('fhqGlobalCoins'); if(e)e.textContent=String(n);
  }catch(err){}
})();

/* TURF Worker auth handoff.
   Worker auth is authoritative. The existing TURF runtime stays visually intact.
   IMPORTANT: auth only supplies identity/account state and releases stale auth locks.
   It NEVER changes TURF navigation or forces a page after login. */
(function(){
  'use strict';
  if(window.__TURF_WORKER_PROFILE_RECEIVER_V5__)return;
  window.__TURF_WORKER_PROFILE_RECEIVER_V5__=true;

  var PARENT_ORIGIN='https://turftrials.com';
  var TOKEN_KEY='turfAuthAccountTokenV1';

  function post(data){try{window.top.postMessage(data,PARENT_ORIGIN)}catch(e){}}

  function saveToken(token){
    token=String(token||'').trim();
    if(!token)return '';
    try{localStorage.setItem(TOKEN_KEY,token)}catch(e){}
    try{sessionStorage.setItem(TOKEN_KEY,token)}catch(e){}
    try{localStorage.setItem('turfAuthenticatedTokenV8921',token)}catch(e){}
    try{window.__TURF_AUTH_TOKEN__=token}catch(e){}
    try{window.fhqGetToken=function(){return token}}catch(e){}
    return token;
  }

  function call(name,args){
    try{var fn=window[name];if(typeof fn==='function')return fn.apply(window,args||[])}catch(e){}
  }

  function installRecoveryCss(){
    if(document.getElementById('turfWorkerRecoveryKillCss'))return;
    var s=document.createElement('style');s.id='turfWorkerRecoveryKillCss';
    s.textContent=`
      html.turf-parent-auth.fhq-identity-recovering:before,
      html.turf-parent-auth.fhq-identity-recovering:after,
      html.turf-parent-auth body:before,
      html.turf-parent-auth body:after{display:none!important;content:none!important;opacity:0!important;pointer-events:none!important}
      html.turf-parent-auth #turfAuthGate,
      html.turf-parent-auth #turfGoogleButton{
        display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;
      }
    `;
    (document.head||document.documentElement).appendChild(s);
  }

  function hideKnownLegacyAuth(){
    if(!document.documentElement.classList.contains('turf-parent-auth'))return;
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
  }

  function unlockElement(el){
    if(!el)return;
    try{el.removeAttribute('inert')}catch(e){}
    try{el.style.removeProperty('pointer-events')}catch(e){}
  }

  function releaseInteraction(){
    try{window.__fhqIdentityResolving=false}catch(e){}
    [document.documentElement,document.body].forEach(function(el){
      if(!el)return;
      ['fhq-identity-recovering','rankings-loading','account-loading','recovering','fhq-loading','is-loading','modal-open','turf-auth-locked'].forEach(function(c){el.classList.remove(c)});
      try{el.removeAttribute('inert')}catch(e){}
      try{
        el.style.removeProperty('pointer-events');
        el.style.removeProperty('overflow');
        el.style.removeProperty('filter');
        el.style.removeProperty('opacity');
      }catch(e){}
    });

    [
      '#fhqSidebar','#fhqMain','#fhqHome','#turfTopbar','.fhq-main','.fhq-main-content','.fhq-nav',
      '#rankingsStandalone','#footballGameOverlay','#fhqShopOverlay','#fhqLockerOverlay','#fhqAlbumOverlay'
    ].forEach(function(sel){
      try{Array.prototype.forEach.call(document.querySelectorAll(sel),unlockElement)}catch(e){}
    });

    /* Remove stale invisible blockers left by old loading/recovery states, but only
       when they are explicitly marked as loading/recovery/auth UI. Never inspect or
       hide normal TURF containers by size/text. */
    [
      '#turfAuthGate','.fhq-identity-recovery','.fhq-recovery-overlay','.account-loading-overlay',
      '.fhq-loading-overlay','.turf-loading-overlay','[data-auth-overlay="true"]'
    ].forEach(function(sel){
      try{Array.prototype.forEach.call(document.querySelectorAll(sel),function(el){
        if(el.id==='turfAuthGate'){hideKnownLegacyAuth();return}
        var cs=getComputedStyle(el);
        if(cs.position==='fixed'||cs.position==='absolute'){
          el.style.setProperty('display','none','important');
          el.style.setProperty('pointer-events','none','important');
          el.setAttribute('aria-hidden','true');
        }
      })}catch(e){}
    });

    hideKnownLegacyAuth();
  }

  function settle(profile){
    installRecoveryCss();
    hideKnownLegacyAuth();
    releaseInteraction();
    [80,220,500,1000,1800].forEach(function(ms){setTimeout(function(){
      hideKnownLegacyAuth();releaseInteraction();call('fhqUpdateAccountUI',[profile]);
    },ms)});
  }

  function applyProfile(profile){
    if(!profile||typeof profile!=='object')return false;
    var token=saveToken(profile.token);if(!token)return false;

    try{window.__TURF_AUTH_PROFILE__=profile}catch(e){}
    try{localStorage.setItem('turfAuthenticatedProfileV8921',JSON.stringify(profile))}catch(e){}
    try{document.documentElement.classList.add('turf-parent-auth');document.documentElement.classList.remove('turf-auth-locked')}catch(e){}

    installRecoveryCss();
    hideKnownLegacyAuth();
    releaseInteraction();

    call('fhqSetRuntimeIdentity',[profile]);
    call('fhqWriteLastConfirmedAccount',[profile]);
    call('fhqSyncLocalProfileFromServer',[profile]);
    call('fhqRememberLifetimePoints',[Number(profile.points)||0]);
    call('fhqRememberCoins',[Number(profile.hqCoins||profile.coins)||0]);
    call('fhqUpdateAccountUI',[profile]);
    call('refreshFootballHQScoreDisplays');
    call('refreshFootballHQDashboard');

    /* Critical: do NOT click Home, hide Rankings, or alter the current page here.
       Let TURF's own navigation state remain authoritative. */
    settle(profile);

    try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile,source:'worker'}}))}
    catch(e){try{window.dispatchEvent(new Event('turf:auth-ready'))}catch(_){}}

    setTimeout(function(){
      releaseInteraction();
      post({type:'turf-auth-ready',version:'worker-profile-v5',token:token,username:String(profile.username||''),page:'current'});
    },120);
    return true;
  }

  window.addEventListener('message',function(e){
    if(e.origin!==PARENT_ORIGIN||e.source!==window.top)return;
    var d=e&&e.data;if(!d||typeof d!=='object'||d.type!=='turf-auth-worker-profile')return;
    if(applyProfile(d.profile||{})){try{e.stopImmediatePropagation();e.stopPropagation()}catch(_){}}
  },true);

  function ready(){post({type:'turf-worker-profile-receiver-ready',version:'worker-profile-v5'})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){installRecoveryCss();ready()},{once:true});
  else{installRecoveryCss();ready()}
  [80,220,600,1400,3000].forEach(function(ms){setTimeout(ready,ms)});
})();
