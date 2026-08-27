/* TURF production auth orchestrator — Worker login into the EXISTING TURF app.
   AUTH ONLY. No presentation/layout/logo/game/navigation changes.
   The Worker authenticates Google/Guest, then serves the exact current V89.90
   Apps Script TURF HTML through /app with the profile receiver injected. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT_V34__)return;
window.__TURF_LIVE_WORKER_PARENT_V34__=true;

var VERSION='worker-auth-34';
var PROXY_APP='https://turftest-api.turftrials.workers.dev/app?v='+VERSION;
var activeProfile=null,busy=false,appLoaded=false,googleRendered=false,profileConfirmed=false,confirmTimer=null,lastProfileSentAt=0;

function status(message,isError){var el=document.getElementById('authStatus');if(!el)return;el.textContent=message||'';el.classList.toggle('error',!!isError)}
function app(){return document.getElementById('turfApp')}
function guestButton(){return document.getElementById('guestButton')}
function setBusy(v){busy=!!v;var g=guestButton();if(g)g.disabled=busy}
function clearConfirm(){if(confirmTimer){clearTimeout(confirmTimer);confirmTimer=null}}
function trustedAppOrigin(origin){try{var u=new URL(String(origin||''));if(u.protocol!=='https:')return false;var h=String(u.hostname||'').toLowerCase();return h==='turftest-api.turftrials.workers.dev'||h==='script.google.com'||h==='script.googleusercontent.com'||h.endsWith('.googleusercontent.com')}catch(e){return false}}

function loadScript(src){return new Promise(function(resolve,reject){var s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=function(){reject(new Error('Could not load TURF authentication.'))};document.head.appendChild(s)})}
async function ensureAuthStack(){
  if(window.TurfApi&&window.TurfAuth&&window.TURF_STATIC_CONFIG)return;
  if(!window.TurfApi)await loadScript('/turf-static/js/turf-api.js?v='+VERSION);
  if(!window.TURF_STATIC_CONFIG)await loadScript('/turf-static/js/turf-config.js?v='+VERSION);
  if(!window.TurfAuth)await loadScript('/turf-static/js/turf-auth.js?v='+VERSION);
  if(!(window.TurfApi&&window.TurfAuth&&window.TURF_STATIC_CONFIG))throw new Error('TURF authentication failed to initialize.');
}

function saveActive(profile){
  activeProfile=profile||null;profileConfirmed=false;lastProfileSentAt=0;
  try{if(profile&&profile.token)localStorage.setItem('turfAuthAccountTokenV1',String(profile.token))}catch(e){}
  try{if(profile)localStorage.setItem('turfAuthCachedProfileV1',JSON.stringify(profile))}catch(e){}
}
function targetWindow(){var a=app();return a&&a.contentWindow?a.contentWindow:null}
function sendProfile(force){
  var w=targetWindow();if(!w||!activeProfile)return false;
  var now=Date.now();if(!force&&now-lastProfileSentAt<160)return false;lastProfileSentAt=now;
  try{w.postMessage({type:'turf-auth-worker-profile',profile:activeProfile,version:VERSION},'*');return true}catch(e){return false}
}
function queueHandoffs(){[0,60,140,260,450,700,1100,1700,2600,4000,6500,9000,12000].forEach(function(ms){setTimeout(function(){if(!profileConfirmed)sendProfile(true)},ms)})}
function revealExistingTurf(){
  profileConfirmed=true;clearConfirm();document.body.classList.add('turf-authenticated');status('',false);setBusy(false);
  setTimeout(function(){try{var a=app();if(a&&a.contentWindow)a.contentWindow.postMessage({type:'turf-go-home',version:VERSION},'*')}catch(e){}},100);
}
function armConfirm(){
  clearConfirm();confirmTimer=setTimeout(function(){
    if(profileConfirmed||document.body.classList.contains('turf-authenticated'))return;
    status('Your account is verified, but TURF did not confirm the profile handoff. Refresh once and try again.',true);setBusy(false);
  },18000);
}
function startExistingTurf(profile){
  if(!profile||!profile.token)throw new Error('TURF did not return a verified account profile.');
  saveActive(profile);var a=app();if(!a)throw new Error('TURF app frame is unavailable.');
  status('Account verified. Loading TURF…',false);armConfirm();appLoaded=false;
  a.src=PROXY_APP+'&ts='+Date.now();
}
function fail(e){clearConfirm();setBusy(false);status(String(e&&e.message||e||'TURF sign-in failed.'),true)}

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
function bindGuest(){var g=guestButton();if(!g||g.dataset.workerAuthBound==='1')return;g.dataset.workerAuthBound='1';g.addEventListener('click',directGuest)}

window.addEventListener('message',function(e){
  var d=e&&e.data;if(!d||typeof d!=='object'||!trustedAppOrigin(e.origin))return;
  if(d.type==='turf-worker-profile-request'||d.type==='turf-worker-profile-receiver-ready'||d.type==='turf-worker-profile-bridge-ready'||d.type==='turf-auth-worker-receiver-ready'||d.type==='turf-auth-bridge-ready'){
    if(activeProfile&&!profileConfirmed)sendProfile(true);return;
  }
  if(d.type==='turf-auth-worker-profile-applied'){
    if(activeProfile&&d.token&&String(d.token)!==String(activeProfile.token))return;revealExistingTurf();return;
  }
  if(d.type==='turf-auth-ready'){
    var v=String(d.version||'');if(v.indexOf('worker-profile-')!==0&&v.indexOf('worker-8968')!==0)return;
    if(activeProfile&&d.token&&String(d.token)!==String(activeProfile.token))return;revealExistingTurf();return;
  }
  if(d.type==='turf-auth-error'&&(String(d.version||'').indexOf('worker-profile-')===0||String(d.version||'').indexOf('worker-8968')===0))fail(new Error(String(d.message||'TURF could not apply the verified account.')));
},true);

async function boot(){
  try{await ensureAuthStack()}catch(e){status(e.message||String(e),true);return}
  var a=app();if(a)a.addEventListener('load',function(){appLoaded=true;if(activeProfile&&!profileConfirmed){status('Account verified. Applying your TURF profile…',false);sendProfile(true);queueHandoffs()}});
  bindGuest();var tries=0,timer=setInterval(function(){tries++;if(renderGoogle()||tries>80)clearInterval(timer)},125);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
