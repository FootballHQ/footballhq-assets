/* TURF V89.20 — authoritative favicon bridge + Worker-auth handoff */
(function(){
'use strict';
if(window.__TURF_V8920_FAVICON__)return;
window.__TURF_V8920_FAVICON__=true;
var ICON='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-mark.svg?v=8920';
var TRUSTED_TOP='https://turftrials.com';

function apply(){
  try{
    Array.prototype.slice.call(document.querySelectorAll('link[rel~="icon"],link[rel="shortcut icon"]')).forEach(function(x){x.remove()});
    var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=ICON;document.head.appendChild(l);
    document.title='TURF';
  }catch(e){}
  try{window.top.postMessage({type:'turf-favicon',href:ICON,title:'TURF',version:'8920'},'*')}catch(e){}
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

function applyWorkerProfile(profile){
  if(!profile||typeof profile!=='object')return false;
  var token=String(profile.token||'').trim();
  if(!token)return false;

  try{localStorage.setItem('turfAuthAccountTokenV1',token)}catch(e){}
  try{sessionStorage.setItem('turfAuthAccountTokenV1',token)}catch(e){}
  try{localStorage.setItem('turfAuthCachedProfileV1',JSON.stringify(profile))}catch(e){}

  window.__TURF_AUTH_TOKEN__=token;
  window.__TURF_AUTH_PROFILE__=profile;
  try{window.fhqGetToken=function(){return String(window.__TURF_AUTH_TOKEN__||'')}}catch(e){}
  try{window.__fhqIdentityResolving=false}catch(e){}

  try{
    document.documentElement.classList.add('turf-parent-auth');
    document.documentElement.classList.remove('turf-auth-locked','fhq-identity-recovering','rankings-loading','loading','recovering','is-loading');
    if(document.body)document.body.classList.remove('fhq-identity-recovering','rankings-loading','loading','recovering','is-loading');
    var gate=document.getElementById('turfAuthGate');
    if(gate){gate.classList.add('turf-auth-hidden');gate.style.setProperty('display','none','important')}
  }catch(e){}

  function sync(){
    try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(profile)}catch(e){}
    try{if(typeof window.fhqWriteLastConfirmedAccount==='function')window.fhqWriteLastConfirmedAccount(profile)}catch(e){}
    try{if(typeof window.fhqSyncLocalProfileFromServer==='function')window.fhqSyncLocalProfileFromServer(profile)}catch(e){}
    try{if(typeof window.fhqRememberLifetimePoints==='function')window.fhqRememberLifetimePoints(Number(profile.points)||0)}catch(e){}
    try{if(typeof window.fhqRememberCoins==='function')window.fhqRememberCoins(Number(profile.hqCoins||profile.coins)||0)}catch(e){}
    try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(profile)}catch(e){}
    try{if(typeof window.refreshFootballHQScoreDisplays==='function')window.refreshFootballHQScoreDisplays()}catch(e){}
    try{if(typeof window.refreshFootballHQDashboard==='function')window.refreshFootballHQDashboard()}catch(e){}
    try{
      var coins=String(Number(profile.hqCoins||profile.coins)||0);
      var pts=String(Number(profile.points)||0);
      var streak=String(Number(profile.streakDays)||0);
      [['fhqGlobalCoins',coins],['turfTopCoins',coins],['fhqPoints',pts],['fhqDashLifetime',pts],['fhqDashStreak',streak]].forEach(function(x){var n=document.getElementById(x[0]);if(n)n.textContent=x[1]});
    }catch(e){}
  }

  sync();
  [80,220,500,1000,1800,3000,5000].forEach(function(ms){setTimeout(sync,ms)});
  [120,420,900].forEach(function(ms){setTimeout(goHome,ms)});
  try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile}}))}catch(e){}
  try{window.top.postMessage({type:'turf-auth-ready',version:'worker-profile-1',token:token,username:String(profile.username||'')},TRUSTED_TOP)}catch(e){}
  return true;
}

window.addEventListener('message',function(e){
  if(e.source!==window.top)return;
  if(e.origin!==TRUSTED_TOP)return;
  var d=e&&e.data;
  if(!d||typeof d!=='object'||d.type!=='turf-auth-worker-profile'||!d.profile)return;
  try{e.stopImmediatePropagation();e.stopPropagation()}catch(_){ }
  applyWorkerProfile(d.profile);
},true);

try{window.top.postMessage({type:'turf-worker-profile-receiver-ready',version:'worker-profile-1'},TRUSTED_TOP)}catch(e){}
apply();
[250,800,1800,4000].forEach(function(ms){setTimeout(apply,ms)});
})();
