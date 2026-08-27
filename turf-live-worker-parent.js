/* TURF production auth orchestrator — AUTO-RESUME one saved account per browser.
   AUTH ONLY. The EXISTING TURF app remains the visual/runtime source of truth.
   No Google/Guest chooser is shown in this temporary phase. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT_V42__)return;
window.__TURF_LIVE_WORKER_PARENT_V42__=true;

var VERSION='worker-auth-42';
var EXISTING_TURF_APP='https://turftest-api.turftrials.workers.dev/app?production=1&v='+VERSION;
var activeProfile=null,confirmed=false,receiverWindow=null,receiverOrigin='',lastSend=0,ackTimer=null;

function status(message,isError){var el=document.getElementById('authStatus');if(!el)return;el.textContent=message||'';el.classList.toggle('error',!!isError)}
function app(){return document.getElementById('turfApp')}
function existingAppSrc(){return String(window.__TURF_EXISTING_APP_SRC__||EXISTING_TURF_APP)}
function stored(k){try{return String(localStorage.getItem(k)||'').trim()}catch(e){return ''}}
function trustedAppOrigin(origin){
  try{var u=new URL(String(origin||''));if(u.protocol!=='https:')return false;var h=String(u.hostname||'').toLowerCase();return h==='turftest-api.turftrials.workers.dev'||h==='turftrials.com'||h==='script.google.com'||h==='script.googleusercontent.com'||h.endsWith('.googleusercontent.com')}catch(e){return false}
}
function loadScript(src){return new Promise(function(resolve,reject){var s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=function(){reject(new Error('Could not load TURF account services.'))};document.head.appendChild(s)})}
async function ensureAuthStack(){
  if(window.TurfApi&&window.TurfAuth&&window.TURF_STATIC_CONFIG)return;
  if(!window.TurfApi)await loadScript('/turf-static/js/turf-api.js?v='+VERSION);
  if(!window.TURF_STATIC_CONFIG)await loadScript('/turf-static/js/turf-config.js?v='+VERSION);
  if(!window.TurfAuth)await loadScript('/turf-static/js/turf-auth.js?v='+VERSION);
  if(!(window.TurfApi&&window.TurfAuth&&window.TURF_STATIC_CONFIG))throw new Error('TURF account services did not initialize.');
}
function adoptSavedBrowserToken(){
  var token=stored('turfAuthAccountTokenV1');
  if(!token){
    try{var p=JSON.parse(localStorage.getItem('turfAuthCachedProfileV1')||'null');if(p&&p.token)token=String(p.token).trim()}catch(e){}
  }
  if(!token)token=stored('footballHQAccountTokenV80');
  if(!token)token=stored('footballHQAccountTokenV1');
  if(token){try{localStorage.setItem('turfAuthAccountTokenV1',token)}catch(e){}}
  return token;
}
function saveActive(profile){
  if(!profile||!profile.token)throw new Error('TURF did not return a saved account profile.');
  activeProfile=profile;confirmed=false;receiverWindow=null;receiverOrigin='';lastSend=0;
  if(ackTimer){clearTimeout(ackTimer);ackTimer=null}
  try{localStorage.setItem('turfAuthAccountTokenV1',String(profile.token));localStorage.setItem('turfAuthCachedProfileV1',JSON.stringify(profile))}catch(e){}
}
function targetFromFrame(){
  var a=app();if(!a||!a.contentWindow)return false;
  receiverWindow=a.contentWindow;
  try{receiverOrigin=new URL(a.src||existingAppSrc()).origin}catch(e){receiverOrigin='https://turftest-api.turftrials.workers.dev'}
  return true;
}
function sendProfile(force){
  if(!activeProfile)return false;
  if(!receiverWindow||!receiverOrigin)targetFromFrame();
  if(!receiverWindow||!receiverOrigin)return false;
  var now=Date.now();if(!force&&now-lastSend<100)return false;lastSend=now;
  try{receiverWindow.postMessage({type:'turf-auth-worker-profile',profile:activeProfile,version:VERSION},receiverOrigin);return true}catch(e){return false}
}
function sendLegacyResume(){
  if(!activeProfile||!activeProfile.token)return false;if(!receiverWindow||!receiverOrigin)targetFromFrame();if(!receiverWindow||!receiverOrigin)return false;
  try{receiverWindow.postMessage({type:'turf-auth-resume',token:String(activeProfile.token),version:VERSION},receiverOrigin);return true}catch(e){return false}
}
function queueHandoffs(){
  [0,40,100,180,300,500,800,1200,1800,2600,3800,5200,7000,9500,12500,16000,21000,27000].forEach(function(ms){setTimeout(function(){if(activeProfile&&!confirmed){sendProfile(true);sendLegacyResume()}},ms)})
}
function reveal(){
  if(!activeProfile||confirmed)return;confirmed=true;if(ackTimer){clearTimeout(ackTimer);ackTimer=null}
  document.body.classList.add('turf-authenticated');status('',false);
  setTimeout(function(){try{if(receiverWindow&&receiverOrigin)receiverWindow.postMessage({type:'turf-go-home',version:VERSION},receiverOrigin)}catch(e){}},100)
}
function armAckTimeout(){
  if(ackTimer)clearTimeout(ackTimer);
  ackTimer=setTimeout(function(){if(!activeProfile||confirmed)return;status('Still opening TURF…',false);sendProfile(true);sendLegacyResume();queueHandoffs()},15000)
}
function startExistingTurf(profile){
  saveActive(profile);var a=app();if(!a)throw new Error('TURF app frame is unavailable.');
  status('Loading your TURF account…',false);
  var src=existingAppSrc();src+=(src.indexOf('?')>=0?'&':'?')+'parentauth='+encodeURIComponent(VERSION)+'&ts='+Date.now();
  a.addEventListener('load',function(){targetFromFrame();status('Opening TURF…',false);sendProfile(true);sendLegacyResume();queueHandoffs()},{once:true});
  a.src=src;armAckTimeout();
}
function fail(e){if(ackTimer){clearTimeout(ackTimer);ackTimer=null}status(String(e&&e.message||e||'TURF could not load this browser account.'),true)}

window.addEventListener('message',function(e){
  var d=e&&e.data;if(!d||typeof d!=='object'||!trustedAppOrigin(e.origin))return;
  var a=app();if(!a||e.source!==a.contentWindow)return;
  if(d.type==='turf-worker-profile-request'||d.type==='turf-worker-profile-receiver-ready'||d.type==='turf-worker-profile-bridge-ready'||d.type==='turf-auth-worker-receiver-ready'){
    receiverWindow=e.source;receiverOrigin=e.origin;if(activeProfile){status('Opening TURF…',false);sendProfile(true);queueHandoffs()}return;
  }
  if(d.type==='turf-auth-bridge-ready'){
    receiverWindow=e.source;receiverOrigin=e.origin;if(activeProfile){sendLegacyResume();sendProfile(true);queueHandoffs()}return;
  }
  if(d.type==='turf-auth-worker-profile-applied'||d.type==='turf-auth-ready'){
    if(activeProfile&&d.token&&String(d.token)!==String(activeProfile.token))return;reveal();return;
  }
  if(d.type==='turf-auth-error'&&activeProfile){status('Retrying TURF account handoff…',false);sendProfile(true);sendLegacyResume();queueHandoffs()}
},true);

async function boot(){
  status('Loading your TURF account…',false);
  try{
    await ensureAuthStack();
    var token=adoptSavedBrowserToken();
    if(!token)throw new Error('No TURF account is saved to this browser yet.');
    /* Always verify with the Worker instead of trusting stale cached UI data. */
    var res=await window.TurfApi.resolveAccountToken(token);
    if(!(res&&res.authenticated&&res.profile))throw new Error('The TURF account saved to this browser could not be restored.');
    var profile=res.profile;if(!profile.token)profile.token=token;
    startExistingTurf(profile);
  }catch(e){fail(e)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
