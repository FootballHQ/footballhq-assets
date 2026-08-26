/* TURF V89.20 — authoritative favicon bridge + Worker-auth handoff */
(function(){
'use strict';
if(window.__TURF_V8920_FAVICON_WORKER3__)return;
window.__TURF_V8920_FAVICON_WORKER3__=true;
var ICON='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-mark.svg?v=8920';
var TRUSTED_TOP='https://turftrials.com';
var appliedToken='';
var appliedProfile=null;

function apply(){
  try{
    Array.prototype.slice.call(document.querySelectorAll('link[rel~="icon"],link[rel="shortcut icon"]')).forEach(function(x){x.remove()});
    var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=ICON;document.head.appendChild(l);
    document.title='TURF';
  }catch(e){}
  try{window.top.postMessage({type:'turf-favicon',href:ICON,title:'TURF',version:'8920-worker3'},TRUSTED_TOP)}catch(e){}
}

function announceReady(){
  try{window.top.postMessage({type:'turf-worker-profile-receiver-ready',version:'worker-profile-3'},TRUSTED_TOP)}catch(e){}
}

function goHome(){
  try{
    var b=document.querySelector('#fhqSidebar [data-fhq-nav="home"],.fhq-nav [data-fhq-nav="home"]');
    if(b&&typeof b.click==='function'){b.click();return true}
  }catch(e){}
  try{
    document.body&&document.body.classList.remove('rankings-page','rankings-loading','draft-page','games-page');
    var h=document.getElementById('fhqHome');
    if(h){h.classList.remove('hidden');h.style.removeProperty('display');h.style.removeProperty('visibility');h.style.removeProperty('opacity');return true}
  }catch(e){}
  return false;
}

function clearLegacyAuthState(){
  try{window.__fhqIdentityResolving=false}catch(e){}
  try{
    document.documentElement.classList.add('turf-parent-auth');
    document.documentElement.classList.remove('turf-auth-locked','fhq-identity-recovering','rankings-loading','loading','recovering','is-loading','modal-open');
    if(document.body)document.body.classList.remove('fhq-identity-recovering','rankings-loading','loading','recovering','is-loading','modal-open');
    var gate=document.getElementById('turfAuthGate');
    if(gate){gate.classList.add('turf-auth-hidden');gate.setAttribute('aria-hidden','true');gate.style.setProperty('display','none','important');gate.style.setProperty('visibility','hidden','important');gate.style.setProperty('pointer-events','none','important')}
  }catch(e){}
}

function assertWorkerSession(){
  if(!appliedToken||!appliedProfile)return;
  try{localStorage.setItem('turfAuthAccountTokenV1',appliedToken)}catch(e){}
  try{sessionStorage.setItem('turfAuthAccountTokenV1',appliedToken)}catch(e){}
  try{localStorage.setItem('footballHQAccountTokenV80',appliedToken)}catch(e){}
  try{localStorage.setItem('turfAuthCachedProfileV1',JSON.stringify(appliedProfile))}catch(e){}
  window.__TURF_AUTH_TOKEN__=appliedToken;
  window.__TURF_AUTH_PROFILE__=appliedProfile;
  try{window.fhqGetToken=function(){return String(window.__TURF_AUTH_TOKEN__||'')}}catch(e){}
  clearLegacyAuthState();
}

function applyWorkerProfile(profile){
  if(!profile||typeof profile!=='object')return false;
  var token=String(profile.token||'').trim();
  if(!token)return false;
  appliedToken=token;
  appliedProfile=profile;
  assertWorkerSession();

  function sync(){
    assertWorkerSession();
    try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(profile)}catch(e){}
    try{if(typeof window.fhqWriteLastConfirmedAccount==='function')window.fhqWriteLastConfirmedAccount(profile)}catch(e){}
    try{if(typeof window.fhqSyncLocalProfileFromServer==='function')window.fhqSyncLocalProfileFromServer(profile)}catch(e){}
    try{if(typeof window.fhqRememberLifetimePoints==='function')window.fhqRememberLifetimePoints(Number(profile.points)||0)}catch(e){}
    try{if(typeof window.fhqRememberCoins==='function')window.fhqRememberCoins(Number(profile.hqCoins||profile.coins)||0)}catch(e){}
    try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(profile)}catch(e){}
    try{if(typeof window.refreshFootballHQScoreDisplays==='function')window.refreshFootballHQScoreDisplays()}catch(e){}
    try{if(typeof window.refreshFootballHQDashboard==='function')window.refreshFootballHQDashboard()}catch(e){}
    try{
      var coins=String(Number(profile.hqCoins||profile.coins)||0),pts=String(Number(profile.points)||0),streak=String(Number(profile.streakDays)||0);
      [['fhqGlobalCoins',coins],['turfTopCoins',coins],['fhqPoints',pts],['fhqDashLifetime',pts],['fhqDashStreak',streak]].forEach(function(x){var n=document.getElementById(x[0]);if(n)n.textContent=x[1]});
    }catch(e){}
  }

  sync();
  [60,150,320,650,1100,1800,3000,5000,8000,12000,16000,20000].forEach(function(ms){setTimeout(sync,ms)});
  [100,280,650,1200].forEach(function(ms){setTimeout(goHome,ms)});
  try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile}}))}catch(e){}
  try{window.top.postMessage({type:'turf-auth-ready',version:'worker-profile-3',token:token,username:String(profile.username||'')},TRUSTED_TOP)}catch(e){}
  return true;
}

window.addEventListener('message',function(e){
  if(e.source!==window.top||e.origin!==TRUSTED_TOP)return;
  var d=e&&e.data;
  if(!d||typeof d!=='object'||d.type!=='turf-auth-worker-profile'||!d.profile)return;
  try{e.stopImmediatePropagation();e.stopPropagation()}catch(_){ }
  applyWorkerProfile(d.profile);
},true);

announceReady();
[80,180,350,700,1200,2200,4000,7000,11000].forEach(function(ms){setTimeout(function(){if(!appliedToken)announceReady()},ms)});
apply();
[250,800,1800,4000].forEach(function(ms){setTimeout(apply,ms)});
})();
