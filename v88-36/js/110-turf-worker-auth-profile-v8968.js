/* TURF v89.68 — Worker auth profile handoff.
   AUTH ONLY. No visual/layout changes.
   Lets turftrials.com authenticate with the Worker and inject the verified
   profile into the existing Apps Script TURF frontend. */
(function(){
'use strict';
if(window.__TURF_WORKER_AUTH_PROFILE_8968__)return;
window.__TURF_WORKER_AUTH_PROFILE_8968__=true;
var TRUSTED='https://turftrials.com';
var SESSION_KEY='turfAuthAccountTokenV1';

function post(data){try{window.top.postMessage(data,TRUSTED)}catch(e){}}
function save(profile){
  if(!profile||!profile.token)return false;
  var token=String(profile.token||'').trim();
  if(!token)return false;
  window.__TURF_AUTH_TOKEN__=token;
  window.__TURF_AUTH_PROFILE__=profile;
  try{localStorage.setItem(SESSION_KEY,token)}catch(e){}
  try{window.fhqGetToken=function(){return String(window.__TURF_AUTH_TOKEN__||'')}}catch(e){}
  return true;
}
function apply(profile){
  if(!save(profile))return false;
  document.documentElement.classList.remove('turf-auth-locked');
  var gate=document.getElementById('turfAuthGate');
  if(gate)gate.classList.add('turf-auth-hidden');
  try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(profile)}catch(e){}
  try{if(typeof window.fhqWriteLastConfirmedAccount==='function')window.fhqWriteLastConfirmedAccount(profile)}catch(e){}
  try{if(typeof window.fhqSyncLocalProfileFromServer==='function')window.fhqSyncLocalProfileFromServer(profile)}catch(e){}
  try{if(typeof window.fhqRememberLifetimePoints==='function')window.fhqRememberLifetimePoints(Number(profile.points)||0)}catch(e){}
  try{if(typeof window.fhqRememberCoins==='function')window.fhqRememberCoins(Number(profile.hqCoins||profile.coins)||0)}catch(e){}
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(profile)}catch(e){}
  try{if(typeof window.refreshFootballHQScoreDisplays==='function')window.refreshFootballHQScoreDisplays()}catch(e){}
  try{if(typeof window.refreshFootballHQDashboard==='function')window.refreshFootballHQDashboard()}catch(e){}
  try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile}}))}catch(e){}
  [100,300,700,1400,2600].forEach(function(ms){setTimeout(function(){
    try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(profile)}catch(e){}
    try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(profile)}catch(e){}
    var c=document.getElementById('fhqGlobalCoins'),t=document.getElementById('turfTopCoins');
    var coins=String(Number(profile.hqCoins||profile.coins)||0);
    if(c)c.textContent=coins;if(t)t.textContent=coins;
  },ms)});
  post({type:'turf-auth-ready',token:String(profile.token||''),username:String(profile.username||''),version:'worker-8968'});
  return true;
}
window.addEventListener('message',function(e){
  if(e.origin!==TRUSTED)return;
  if(e.source!==window.top)return;
  var d=e&&e.data;if(!d||typeof d!=='object')return;
  if(d.type==='turf-worker-auth-profile'&&d.profile){apply(d.profile)}
},true);
post({type:'turf-worker-profile-bridge-ready',version:'8968'});
})();
