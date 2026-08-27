/* TURF production auth orchestrator — Worker login into the EXISTING TURF app.
   AUTH ONLY. No presentation/layout/logo/game/navigation changes. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT_V41__)return;
window.__TURF_LIVE_WORKER_PARENT_V41__=true;

var VERSION='worker-auth-41';
var EXISTING_TURF_APP='https://turftest-api.turftrials.workers.dev/app?production=1&v=worker-auth-41';
var activeProfile=null,busy=false,googleRendered=false,confirmed=false,loaded=false,lastSend=0,receiverWindow=null,receiverOrigin='',ackTimer=null;

function status(message,isError){var el=document.getElementById('authStatus');if(!el)return;el.textContent=message||'';el.classList.toggle('error',!!isError)}
function app(){return document.getElementById('turfApp')}
function guestButton(){return document.getElementById('guestButton')}
function setBusy(v){busy=!!v;var g=guestButton();if(g)g.disabled=busy}
function existingAppSrc(){return String(window.__TURF_EXISTING_APP_SRC__||EXISTING_TURF_APP)}
function trustedAppOrigin(origin){
  try{
    var u=new URL(String(origin||''));if(u.protocol!=='https:')return false;
    var h=String(u.hostname||'').toLowerCase();
    return h==='turftest-api.turftrials.workers.dev'||h==='turftrials.com'||h==='script.google.com'||h==='script.googleusercontent.com'||h.endsWith('.googleusercontent.com');
  }catch(e){return false}
}
function loadScript(src){return new Promise(function(resolve,reject){var s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=function(){reject(new Error('Could not load TURF authentication.'))};document.head.appendChild(s)})}
async function ensureAuthStack(){
  if(window.TurfApi&&window.TurfAuth&&window.TURF_STATIC_CONFIG)return;
  if(!window.TurfApi)await loadScript('/turf-static/js/turf-api.js?v='+VERSION);
  if(!window.TURF_STATIC_CONFIG)await loadScript('/turf-static/js/turf-config.js?v='+VERSION);
  if(!window.TurfAuth)await loadScript('/turf-static/js/turf-auth.js?v='+VERSION);
  if(!(window.TurfApi&&window.TurfAuth&&window.TURF_STATIC_CONFIG))throw new Error('TURF authentication failed to initialize.');
}
function saveActive(profile){
  if(!profile||!profile.token)throw new Error('TURF did not return a verified account profile.');
  activeProfile=profile;confirmed=false;loaded=false;lastSend=0;receiverWindow=null;receiverOrigin='';
  if(ackTimer){clearTimeout(ackTimer);ackTimer=null}
  try{localStorage.setItem('turfAuthAccountTokenV1',String(profile.token))}catch(e){}
  try{localStorage.setItem('turfAuthCachedProfileV1',JSON.stringify(profile))}catch(e){}
}
function sendProfile(force){
  if(!receiverWindow||!receiverOrigin||!activeProfile)return false;
  var now=Date.now();if(!force&&now-lastSend<120)return false;lastSend=now;
  try{receiverWindow.postMessage({type:'turf-auth-worker-profile',profile:activeProfile,version:VERSION},receiverOrigin);return true}catch(e){return false}
}
function sendLegacyResume(){
  if(!receiverWindow||!receiverOrigin||!activeProfile||!activeProfile.token)return false;
  try{receiverWindow.postMessage({type:'turf-auth-resume',token:String(activeProfile.token),version:VERSION},receiverOrigin);return true}catch(e){return false}
}
function queueHandoffs(){[0,40,100,220,450,800,1400,2400,4000,6500].forEach(function(ms){setTimeout(function(){if(activeProfile&&!confirmed)sendProfile(true)},ms)})}
function queueLegacyResume(){[0,80,200,450,900,1600,2800,4500,7000].forEach(function(ms){setTimeout(function(){if(activeProfile&&!confirmed)sendLegacyResume()},ms)})}
function reveal(){
  if(!activeProfile||confirmed)return;confirmed=true;if(ackTimer){clearTimeout(ackTimer);ackTimer=null}
  document.body.classList.add('turf-authenticated');status('',false);setBusy(false);
  setTimeout(function(){try{if(receiverWindow&&receiverOrigin)receiverWindow.postMessage({type:'turf-go-home',version:VERSION},receiverOrigin)}catch(e){}},100);
}
function armAckTimeout(){
  if(ackTimer)clearTimeout(ackTimer);
  ackTimer=setTimeout(function(){
    if(!activeProfile||confirmed)return;
    status('TURF verified your account, but the existing app did not finish the handoff. Refresh once and try again.',true);
    setBusy(false);
  },15000);
}
function startExistingTurf(profile){
  saveActive(profile);var a=app();if(!a)throw new Error('TURF app frame is unavailable.');
  status('Account verified. Loading TURF…',false);
  var src=existingAppSrc();src+=(src.indexOf('?')>=0?'&':'?')+'parentauth='+encodeURIComponent(VERSION)+'&ts='+Date.now();
  a.src=src;armAckTimeout();
}
function fail(e){if(ackTimer){clearTimeout(ackTimer);ackTimer=null}setBusy(false);status(String(e&&e.message||e||'TURF sign-in failed.'),true)}
async function directGoogle(response){
  if(busy)return;var credential=response&&response.credential?String(response.credential):'';
  if(!credential){status('Google sign-in did not return an account. Please try again.',true);return}
  setBusy(true);status('Checking your TURF account…',false);
  try{await ensureAuthStack();startExistingTurf(await window.TurfAuth.googleSignIn(credential))}catch(e){fail(e)}
}
async function directGuest(){
  if(busy)return;setBusy(true);status('Checking your TURF account…',false);
  try{await ensureAuthStack();startExistingTurf(await window.TurfAuth.guestSignIn())}catch(e){fail(e)}
}
function renderGoogle(){
  if(googleRendered)return true;var host=document.getElementById('googleButton');
  if(!host||!(window.google&&google.accounts&&google.accounts.id)||!window.TURF_STATIC_CONFIG)return false;
  try{google.accounts.id.initialize({client_id:window.TURF_STATIC_CONFIG.googleClientId,callback:directGoogle,auto_select:false,cancel_on_tap_outside:false});google.accounts.id.renderButton(host,{type:'standard',theme:'filled_black',size:'large',text:'continue_with',shape:'rectangular',logo_alignment:'left',width:360});googleRendered=true;return true}catch(e){status('Google sign-in could not initialize. Please refresh and try again.',true);return false}
}
window.addEventListener('message',function(e){
  var d=e&&e.data;if(!d||typeof d!=='object'||!trustedAppOrigin(e.origin))return;
  var a=app();if(!a||e.source!==a.contentWindow)return;

  if(d.type==='turf-worker-profile-request'||d.type==='turf-worker-profile-receiver-ready'||d.type==='turf-worker-profile-bridge-ready'||d.type==='turf-auth-worker-receiver-ready'){
    receiverWindow=e.source;receiverOrigin=e.origin;
    if(activeProfile){status('Account verified. Applying your TURF profile…',false);sendProfile(true);queueHandoffs();setTimeout(function(){if(activeProfile&&!confirmed)reveal()},120)}
    return;
  }

  if(d.type==='turf-auth-bridge-ready'){
    receiverWindow=e.source;receiverOrigin=e.origin;
    if(activeProfile){status('Account verified. Opening TURF…',false);sendLegacyResume();queueLegacyResume()}
    return;
  }

  if(d.type==='turf-auth-worker-profile-applied'){
    if(activeProfile&&d.token&&String(d.token)!==String(activeProfile.token))return;reveal();return;
  }
  if(d.type==='turf-auth-ready'){
    if(!activeProfile)return;
    if(d.token&&String(d.token)!==String(activeProfile.token))return;
    reveal();return;
  }
  if(d.type==='turf-auth-error'&&activeProfile){fail(new Error(String(d.message||'TURF could not open the verified account.')));return}
},true);
async function boot(){
  try{await ensureAuthStack()}catch(e){status(e.message||String(e),true);return}
  var a=app();if(a)a.addEventListener('load',function(){if(!activeProfile)return;loaded=true;status('Account verified. Waiting for TURF…',false)});
  bindGuest();var tries=0,timer=setInterval(function(){tries++;if(renderGoogle()||tries>80)clearInterval(timer)},125);
}
function bindGuest(){var g=guestButton();if(!g||g.dataset.workerAuthBound==='1')return;g.dataset.workerAuthBound='1';g.addEventListener('click',directGuest)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
