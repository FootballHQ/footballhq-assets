/* TURF Worker profile receiver v25
   AUTH ONLY. Load near the top of the EXISTING Apps Script Index, before legacy auth/recovery.
   Does not alter presentation, navigation, games, collections, logos, or layout. */
(function(){
'use strict';
if(window.__TURF_WORKER_PROFILE_CHILD_V25__)return;
window.__TURF_WORKER_PROFILE_CHILD_V25__=true;
if(window.parent===window)return;

var TRUSTED_PARENT='https://turftrials.com';
var TOKEN_KEY='turfAuthAccountTokenV1';
var PROFILE_KEY='turfAuthCachedProfileV1';
var profileReady=false;

/* Tell legacy embedded auth that the parent owns sign-in. */
window.__TURF_WORKER_AUTH_OWNS_SESSION__=true;
try{document.documentElement.classList.add('turf-parent-auth','turf-auth-locked')}catch(e){}

function post(data){try{window.parent.postMessage(data,TRUSTED_PARENT)}catch(e){}}
function tokenOf(p){return String(p&& (p.token||p.accountToken||p.authToken)||'').trim()}
function paint(profile){
  try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(profile)}catch(e){}
  try{if(typeof window.fhqWriteLastConfirmedAccount==='function')window.fhqWriteLastConfirmedAccount(profile)}catch(e){}
  try{if(typeof window.fhqSyncLocalProfileFromServer==='function')window.fhqSyncLocalProfileFromServer(profile)}catch(e){}
  try{if(typeof window.fhqRememberLifetimePoints==='function')window.fhqRememberLifetimePoints(Number(profile.points)||0)}catch(e){}
  try{if(typeof window.fhqRememberCoins==='function')window.fhqRememberCoins(Number(profile.hqCoins||profile.coins)||0)}catch(e){}
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(profile)}catch(e){}
  try{if(typeof window.refreshFootballHQScoreDisplays==='function')window.refreshFootballHQScoreDisplays()}catch(e){}
  try{if(typeof window.refreshFootballHQDashboard==='function')window.refreshFootballHQDashboard()}catch(e){}
}
function apply(profile){
  var token=tokenOf(profile);if(!token)throw new Error('Verified TURF profile did not include an account token.');
  profileReady=true;
  window.__TURF_WORKER_PROFILE_READY__=true;
  window.__TURF_AUTH_TOKEN__=token;
  window.__TURF_AUTH_PROFILE__=profile;
  window.fhqGetToken=function(){return String(window.__TURF_AUTH_TOKEN__||'')};
  try{localStorage.setItem(TOKEN_KEY,token);localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))}catch(e){}
  try{document.documentElement.classList.remove('turf-auth-locked','fhq-identity-recovering');document.documentElement.classList.add('turf-parent-auth')}catch(e){}
  try{var gate=document.getElementById('turfAuthGate');if(gate)gate.classList.add('turf-auth-hidden')}catch(e){}
  paint(profile);[50,150,350,700,1300,2400,4200,7000].forEach(function(ms){setTimeout(function(){paint(profile)},ms)});
  try{window.dispatchEvent(new CustomEvent('turf:worker-profile-ready',{detail:{profile:profile}}));window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile}}))}catch(e){}
  post({type:'turf-auth-ready',token:token,username:profile.username||'',version:'worker-child-25'});
}
window.addEventListener('message',function(e){
  if(e.origin!==TRUSTED_PARENT||e.source!==window.parent)return;
  var d=e&&e.data;if(!d||typeof d!=='object')return;
  if(d.type==='turf-auth-worker-profile'&&d.profile){try{apply(d.profile)}catch(err){post({type:'turf-auth-error',message:String(err&&err.message||err),version:'worker-child-25'})}}
},true);
function request(){if(profileReady)return;post({type:'turf-worker-profile-request',version:'worker-child-25'})}
request();[40,100,200,400,800,1400,2400,4000,6500,10000].forEach(function(ms){setTimeout(request,ms)});
})();
