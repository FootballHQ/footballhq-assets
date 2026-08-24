
(function(){
  try{
    var n=Number(localStorage.getItem('footballHQCoinDisplayV2'))||0;
    var e=document.getElementById('fhqGlobalCoins'); if(e)e.textContent=String(n);
  }catch(err){}
})();

/* TURF Worker auth handoff.
   Auth plumbing only: accepts an already-verified profile from turftrials.com
   and applies it to the existing TURF runtime without changing page visuals. */
(function(){
  'use strict';
  if(window.__TURF_WORKER_PROFILE_RECEIVER_V2__)return;
  window.__TURF_WORKER_PROFILE_RECEIVER_V2__=true;

  var PARENT_ORIGIN='https://turftrials.com';
  var TOKEN_KEY='turfAuthAccountTokenV1';
  var recoveryObserver=null,recoveryStopTimer=null;

  function post(data){
    try{window.top.postMessage(data,PARENT_ORIGIN)}catch(e){}
  }

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
    try{
      var fn=window[name];
      if(typeof fn==='function')return fn.apply(window,args||[]);
    }catch(e){}
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
      ['fhq-identity-recovering','account-loading','recovering','fhq-loading','is-loading'].forEach(function(c){el.classList.remove(c)});
    });
    try{
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
    }catch(e){}

    if(!document.body)return;
    var nodes=document.body.querySelectorAll('*');
    for(var i=0;i<nodes.length;i++){
      var hit=nodes[i];
      if(!recoveryText(hit))continue;
      var childMatch=false,children=hit.children||[];
      for(var c=0;c<children.length;c++){if(recoveryText(children[c])){childMatch=true;break}}
      if(childMatch)continue;

      var p=hit,best=hit;
      for(var depth=0;depth<12&&p&&p!==document.body;depth++,p=p.parentElement){
        var r,cs;
        try{r=p.getBoundingClientRect();cs=getComputedStyle(p)}catch(err){continue}
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

  function guardRecovery(profile){
    releaseLegacyRecovery();
    [30,80,160,300,550,900,1400,2200,3500,5500,8000].forEach(function(ms){
      setTimeout(function(){
        releaseLegacyRecovery();
        try{window.__fhqIdentityResolving=false}catch(e){}
        call('fhqUpdateAccountUI',[profile]);
      },ms);
    });
    if(!recoveryObserver&&window.MutationObserver){
      var timer=null;
      recoveryObserver=new MutationObserver(function(){
        clearTimeout(timer);timer=setTimeout(releaseLegacyRecovery,16);
      });
      try{recoveryObserver.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']})}catch(e){}
    }
    clearTimeout(recoveryStopTimer);
    recoveryStopTimer=setTimeout(function(){
      try{if(recoveryObserver)recoveryObserver.disconnect()}catch(e){}
      recoveryObserver=null;
    },12000);
  }

  function applyProfile(profile){
    if(!profile||typeof profile!=='object')return false;
    var token=saveToken(profile.token);
    if(!token)return false;

    try{window.__TURF_AUTH_PROFILE__=profile}catch(e){}
    try{localStorage.setItem('turfAuthenticatedProfileV8921',JSON.stringify(profile))}catch(e){}
    try{document.documentElement.classList.add('turf-parent-auth')}catch(e){}
    try{document.documentElement.classList.remove('turf-auth-locked')}catch(e){}
    try{
      var gate=document.getElementById('turfAuthGate');
      if(gate){gate.classList.add('turf-auth-hidden');gate.setAttribute('aria-hidden','true')}
    }catch(e){}

    /* Worker profile is now authoritative. Cancel the obsolete legacy account
       recovery state before any later account renderer can block the real app. */
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

    guardRecovery(profile);

    try{
      window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile,source:'worker'}}));
    }catch(e){
      try{window.dispatchEvent(new Event('turf:auth-ready'))}catch(_){}
    }

    post({
      type:'turf-auth-ready',
      version:'worker-profile-v2',
      token:token,
      username:String(profile.username||'')
    });
    return true;
  }

  window.addEventListener('message',function(e){
    if(e.origin!==PARENT_ORIGIN||e.source!==window.top)return;
    var d=e&&e.data;
    if(!d||typeof d!=='object'||d.type!=='turf-auth-worker-profile')return;
    if(applyProfile(d.profile||{})){
      try{e.stopImmediatePropagation();e.stopPropagation()}catch(_){}
    }
  },true);

  function ready(){post({type:'turf-worker-profile-receiver-ready',version:'worker-profile-v2'})}
  ready();
  [80,180,350,700,1400,2600,5000,8000].forEach(function(ms){setTimeout(ready,ms)});
})();
