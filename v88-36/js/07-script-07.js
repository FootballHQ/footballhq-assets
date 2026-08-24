
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
  if(window.__TURF_WORKER_PROFILE_RECEIVER_V1__)return;
  window.__TURF_WORKER_PROFILE_RECEIVER_V1__=true;

  var PARENT_ORIGIN='https://turftrials.com';
  var TOKEN_KEY='turfAuthAccountTokenV1';

  function post(data){
    try{window.top.postMessage(data,PARENT_ORIGIN)}catch(e){}
  }

  function saveToken(token){
    token=String(token||'').trim();
    if(!token)return '';
    try{localStorage.setItem(TOKEN_KEY,token)}catch(e){}
    try{sessionStorage.setItem(TOKEN_KEY,token)}catch(e){}
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

  function applyProfile(profile){
    if(!profile||typeof profile!=='object')return false;
    var token=saveToken(profile.token);
    if(!token)return false;

    try{window.__TURF_AUTH_PROFILE__=profile}catch(e){}
    try{document.documentElement.classList.add('turf-parent-auth')}catch(e){}
    try{document.documentElement.classList.remove('turf-auth-locked')}catch(e){}
    try{
      var gate=document.getElementById('turfAuthGate');
      if(gate){gate.classList.add('turf-auth-hidden');gate.setAttribute('aria-hidden','true')}
    }catch(e){}

    call('fhqSetRuntimeIdentity',[profile]);
    call('fhqWriteLastConfirmedAccount',[profile]);
    call('fhqSyncLocalProfileFromServer',[profile]);
    call('fhqRememberLifetimePoints',[Number(profile.points)||0]);
    call('fhqRememberCoins',[Number(profile.hqCoins||profile.coins)||0]);
    call('fhqUpdateAccountUI',[profile]);
    call('refreshFootballHQScoreDisplays');
    call('refreshFootballHQDashboard');

    try{
      window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile,source:'worker'}}));
    }catch(e){
      try{window.dispatchEvent(new Event('turf:auth-ready'))}catch(_){}
    }

    post({
      type:'turf-auth-ready',
      version:'worker-profile-v1',
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

  function ready(){post({type:'turf-worker-profile-receiver-ready',version:'worker-profile-v1'})}
  ready();
  [80,180,350,700,1400,2600,5000,8000].forEach(function(ms){setTimeout(ready,ms)});
})();
