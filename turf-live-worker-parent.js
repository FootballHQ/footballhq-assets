/* TURF production auth orchestrator.
   Uses the proven TurfAuth/TurfApi stack from the isolated auth test.
   AUTH ONLY: does not alter TURF presentation, layout, logos, games or navigation. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT_V17__)return;
window.__TURF_LIVE_WORKER_PARENT_V17__=true;

var activeProfile=null,busy=false,appStarted=false,appLoaded=false,bridgeWindow=null,googleRendered=false,lastProfileSentAt=0,confirmTimer=null,profileConfirmed=false,retryCount=0;
var PROFILE_ORIGINS=['https://script.google.com','https://script.googleusercontent.com'];
var VISUAL_ENTRY='https://footballhq.github.io/footballhq-assets/v88-36/js/47-turf-batch2-visual-v8897.js?v=8937';

function status(message,isError){var el=document.getElementById('authStatus');if(!el)return;el.textContent=message||'';el.classList.toggle('error',!!isError)}
function app(){return document.getElementById('turfApp')}
function guestButton(){return document.getElementById('guestButton')}
function setBusy(v){busy=!!v;var g=guestButton();if(g)g.disabled=busy}
function saveActive(profile){activeProfile=profile||null;profileConfirmed=false;retryCount=0}
function clearConfirm(){if(confirmTimer){clearTimeout(confirmTimer);confirmTimer=null}}
function freshSrc(){var src=String(window.__TURF_EXISTING_APP_SRC__||'');if(!src)return '';return src+(src.indexOf('?')>=0?'&':'?')+'authRetry='+Date.now()}
function retryExistingTurf(){
  var a=app(),src=freshSrc();if(!a||!src)return false;
  retryCount++;appLoaded=false;bridgeWindow=null;lastProfileSentAt=0;
  status('Account verified. Retrying TURF once…',false);
  launchExisting(src,a);armConfirm();return true;
}
function armConfirm(){
  clearConfirm();
  confirmTimer=setTimeout(function(){
    if(profileConfirmed||document.body.classList.contains('turf-authenticated'))return;
    if(activeProfile&&retryCount<1&&retryExistingTurf())return;
    status('Your account is verified, but TURF did not finish applying it. Refresh once and try again.',true);
    setBusy(false);
  },18000);
}
function sendProfile(target,force){
  var a=app(),w=target||bridgeWindow||(a&&a.contentWindow);if(!w||!activeProfile)return false;
  var now=Date.now();if(!force&&now-lastProfileSentAt<200)return false;lastProfileSentAt=now;
  var msg={type:'turf-worker-auth-profile',profile:activeProfile,version:'worker-auth-17'},sent=false;
  PROFILE_ORIGINS.forEach(function(origin){try{w.postMessage(msg,origin);sent=true}catch(e){}});
  return sent;
}
function revealExistingTurf(){profileConfirmed=true;clearConfirm();document.body.classList.add('turf-authenticated');status('',false);setBusy(false)}
function queueProfileSends(){[0,80,180,350,650,1100,1800,3000,5000,8000,12000,16000].forEach(function(ms){setTimeout(function(){if(!profileConfirmed)sendProfile(null,true)},ms)})}
function launchExisting(src,a){try{fetch(VISUAL_ENTRY,{mode:'no-cors',cache:'reload'}).catch(function(){}).finally(function(){a.src=src})}catch(e){a.src=src}}
function startExistingTurf(profile){
  if(!profile||!profile.token)throw new Error('TURF did not return a verified account profile.');
  saveActive(profile);var a=app();if(!a)throw new Error('TURF app frame is unavailable.');
  status('Account verified. Loading TURF…',false);armConfirm();
  if(appLoaded){sendProfile(null,true);queueProfileSends();return}
  if(appStarted)return;
  var src=String(window.__TURF_EXISTING_APP_SRC__||'');if(!src)throw new Error('TURF app source is not configured.');
  appStarted=true;launchExisting(src,a);
}
function fail(e){clearConfirm();setBusy(false);status(String(e&&e.message||e||'TURF sign-in failed.'),true)}

async function directGoogle(response){
  if(busy)return;var credential=response&&response.credential?String(response.credential):'';
  if(!credential){status('Google sign-in did not return an account. Please try again.',true);return}
  setBusy(true);status('Checking your TURF account…',false);
  try{startExistingTurf(await window.TurfAuth.googleSignIn(credential))}catch(e){fail(e)}
}
async function directGuest(){if(busy)return;setBusy(true);status('Checking your TURF account…',false);try{startExistingTurf(await window.TurfAuth.guestSignIn())}catch(e){fail(e)}}
function renderGoogle(){
  if(googleRendered)return true;var host=document.getElementById('googleButton');
  if(!host||!(window.google&&google.accounts&&google.accounts.id)||!window.TURF_STATIC_CONFIG)return false;
  try{google.accounts.id.initialize({client_id:window.TURF_STATIC_CONFIG.googleClientId,callback:directGoogle,auto_select:false,cancel_on_tap_outside:false});google.accounts.id.renderButton(host,{type:'standard',theme:'filled_black',size:'large',text:'continue_with',shape:'rectangular',logo_alignment:'left',width:360});googleRendered=true;return true}catch(e){status('Google sign-in could not initialize. Please refresh and try again.',true);return false}
}
function bindGuest(){var g=guestButton();if(!g||g.dataset.workerAuthBound==='1')return;g.dataset.workerAuthBound='1';g.addEventListener('click',directGuest)}

window.addEventListener('message',function(e){
  var d=e&&e.data,a=app();if(!d||typeof d!=='object'||!a||e.source!==a.contentWindow)return;
  if(d.type==='turf-auth-bridge-ready'||d.type==='turf-worker-profile-request'||d.type==='turf-worker-profile-receiver-ready'||d.type==='turf-worker-profile-bridge-ready'){
    bridgeWindow=e.source;if(activeProfile&&!profileConfirmed)sendProfile(e.source,true);return;
  }
  if(d.type==='turf-auth-ready'){
    bridgeWindow=e.source;if(activeProfile&&d.token&&String(d.token)!==String(activeProfile.token))return;revealExistingTurf();return;
  }
  if(d.type==='turf-auth-error'){fail(new Error(String(d.message||'TURF could not apply the verified account.')));return}
},true);

document.addEventListener('DOMContentLoaded',function(){
  if(!window.TurfAuth||!window.TurfApi||!window.TURF_STATIC_CONFIG){status('TURF authentication failed to load. Refresh once.',true);return}
  var a=app();if(a)a.addEventListener('load',function(){appLoaded=true;if(activeProfile&&!profileConfirmed){status('Account verified. Applying your TURF profile…',false);sendProfile(null,true);queueProfileSends()}});
  bindGuest();var tries=0,timer=setInterval(function(){tries++;if(renderGoogle()||tries>80)clearInterval(timer)},125);
  /* Choice-first by design: no silent session restore. */
},{once:true});
})();
