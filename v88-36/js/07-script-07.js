
(function(){
  try{
    var n=Number(localStorage.getItem('footballHQCoinDisplayV2'))||0;
    var e=document.getElementById('fhqGlobalCoins'); if(e)e.textContent=String(n);
  }catch(err){}
})();

/* TURF Worker auth handoff.
   Worker auth is authoritative. The existing TURF runtime stays visually intact;
   this receiver only injects the verified account and prevents obsolete identity
   recovery from ever becoming part of the post-login user flow. */
(function(){
  'use strict';
  if(window.__TURF_WORKER_PROFILE_RECEIVER_V3__)return;
  window.__TURF_WORKER_PROFILE_RECEIVER_V3__=true;

  var PARENT_ORIGIN='https://turftrials.com';
  var TOKEN_KEY='turfAuthAccountTokenV1';
  var recoveryObserver=null,recoveryStopTimer=null;

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

  function installRecoveryKillCss(){
    if(document.getElementById('turfWorkerRecoveryKillCss'))return;
    var s=document.createElement('style');s.id='turfWorkerRecoveryKillCss';
    s.textContent=`
      html.turf-parent-auth.fhq-identity-recovering:before,
      html.turf-parent-auth.fhq-identity-recovering:after,
      html.turf-parent-auth body:before,
      html.turf-parent-auth body:after{display:none!important;content:none!important;opacity:0!important;pointer-events:none!important}
      html.turf-parent-auth body{filter:none!important;opacity:1!important}
    `;
    (document.head||document.documentElement).appendChild(s);
  }

  function recoveryText(el){
    if(!el||el.nodeType!==1)return false;
    var t=String(el.textContent||'').toLowerCase().replace(/\u2026/g,'...').replace(/\s+/g,' ').trim();
    return t.indexOf('recovering your football hq account')>=0||
           t.indexOf('restoring your football hq account')>=0||
           t.indexOf('restoring your turf account')>=0;
  }

  function releaseLegacyRecovery(){
    try{window.__fhqIdentityResolving=false}catch(e){}
    [document.documentElement,document.body].forEach(function(el){
      if(!el)return;
      ['fhq-identity-recovering','rankings-loading','account-loading','recovering','fhq-loading','is-loading','modal-open'].forEach(function(c){el.classList.remove(c)});
      try{el.style.removeProperty('overflow');el.style.removeProperty('filter');el.style.removeProperty('opacity')}catch(e){}
    });
    if(!document.body)return;
    var nodes=document.body.querySelectorAll('*');
    for(var i=0;i<nodes.length;i++){
      var hit=nodes[i];if(!recoveryText(hit))continue;
      var childMatch=false,children=hit.children||[];
      for(var c=0;c<children.length;c++){if(recoveryText(children[c])){childMatch=true;break}}
      if(childMatch)continue;
      var p=hit,best=hit;
      for(var depth=0;depth<14&&p&&p!==document.body;depth++,p=p.parentElement){
        var r,cs;try{r=p.getBoundingClientRect();cs=getComputedStyle(p)}catch(err){continue}
        var large=r.width>window.innerWidth*.40&&r.height>window.innerHeight*.24;
        var overlay=cs.position==='fixed'||cs.position==='absolute'||Number(cs.zIndex||0)>=5;
        if(large&&overlay){best=p;break}
      }
      try{
        best.style.setProperty('display','none','important');
        best.style.setProperty('visibility','hidden','important');
        best.style.setProperty('opacity','0','important');
        best.style.setProperty('pointer-events','none','important');
        best.setAttribute('aria-hidden','true');
      }catch(err){}
    }
  }

  function forceHome(){
    try{
      document.body.classList.remove('rankings-page','rankings-loading','draft-page','games-page','loading','account-loading','recovering','is-loading','modal-open');
      document.documentElement.classList.remove('fhq-identity-recovering','rankings-loading','loading','account-loading','recovering','is-loading');
    }catch(e){}
    try{
      var rankings=document.getElementById('rankingsStandalone');if(rankings)rankings.style.setProperty('display','none','important');
      var home=document.getElementById('fhqHome');
      if(home){home.classList.remove('hidden');home.style.removeProperty('display');home.style.setProperty('visibility','visible','important');home.style.setProperty('opacity','1','important')}
      var homeBtn=document.querySelector('#fhqSidebar [data-fhq-nav="home"],.fhq-nav [data-fhq-nav="home"]');
      if(homeBtn&&!homeBtn.classList.contains('active'))homeBtn.click();
    }catch(e){}
  }

  function guardReady(profile){
    installRecoveryKillCss();releaseLegacyRecovery();forceHome();
    [20,60,120,220,400,700,1100,1800,2800,4500,7000].forEach(function(ms){
      setTimeout(function(){
        releaseLegacyRecovery();forceHome();
        try{window.__fhqIdentityResolving=false}catch(e){}
        call('fhqUpdateAccountUI',[profile]);
      },ms);
    });
    if(!recoveryObserver&&window.MutationObserver){
      var timer=null;
      recoveryObserver=new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(function(){releaseLegacyRecovery();forceHome()},12)});
      try{recoveryObserver.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']})}catch(e){}
    }
    clearTimeout(recoveryStopTimer);
    recoveryStopTimer=setTimeout(function(){try{if(recoveryObserver)recoveryObserver.disconnect()}catch(e){}recoveryObserver=null},12000);
  }

  function applyProfile(profile){
    if(!profile||typeof profile!=='object')return false;
    var token=saveToken(profile.token);if(!token)return false;

    try{window.__TURF_AUTH_PROFILE__=profile}catch(e){}
    try{localStorage.setItem('turfAuthenticatedProfileV8921',JSON.stringify(profile))}catch(e){}
    try{document.documentElement.classList.add('turf-parent-auth');document.documentElement.classList.remove('turf-auth-locked')}catch(e){}
    try{var gate=document.getElementById('turfAuthGate');if(gate){gate.classList.add('turf-auth-hidden');gate.setAttribute('aria-hidden','true');gate.style.setProperty('display','none','important')}}catch(e){}

    installRecoveryKillCss();
    try{window.__fhqIdentityResolving=false}catch(e){}
    releaseLegacyRecovery();

    call('fhqSetRuntimeIdentity',[profile]);
    call('fhqWriteLastConfirmedAccount',[profile]);
    call('fhqSyncLocalProfileFromServer',[profile]);
    call('fhqRememberLifetimePoints',[Number(profile.points)||0]);
    call('fhqRememberCoins',[Number(profile.hqCoins||profile.coins)||0]);
    call('fhqUpdateAccountUI',[profile]);
    call('refreshFootballHQScoreDisplays');
    call('refreshFootballHQDashboard');

    guardReady(profile);

    try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile,source:'worker'}}))}
    catch(e){try{window.dispatchEvent(new Event('turf:auth-ready'))}catch(_){}}

    /* Delay acknowledgement just enough for Home/recovery cleanup to settle.
       Parent keeps this iframe invisible until this message arrives. */
    setTimeout(function(){
      releaseLegacyRecovery();forceHome();
      post({type:'turf-auth-ready',version:'worker-profile-v3',token:token,username:String(profile.username||''),page:'home'});
    },120);
    return true;
  }

  window.addEventListener('message',function(e){
    if(e.origin!==PARENT_ORIGIN||e.source!==window.top)return;
    var d=e&&e.data;if(!d||typeof d!=='object'||d.type!=='turf-auth-worker-profile')return;
    if(applyProfile(d.profile||{})){try{e.stopImmediatePropagation();e.stopPropagation()}catch(_){}}
  },true);

  function ready(){post({type:'turf-worker-profile-receiver-ready',version:'worker-profile-v3'})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){installRecoveryKillCss();ready()},{once:true});
  else{installRecoveryKillCss();ready()}
  [80,180,350,700,1400,2600,5000,8000].forEach(function(ms){setTimeout(ready,ms)});
})();
