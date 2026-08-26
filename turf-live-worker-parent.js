/* TURF production auth orchestrator.
   Uses the proven TurfAuth/TurfApi stack from the isolated auth test.
   AUTH ONLY: does not alter TURF presentation, layout, logos, games or navigation. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT_V9__)return;
window.__TURF_LIVE_WORKER_PARENT_V9__=true;

var activeProfile=null,busy=false,appStarted=false,appLoaded=false,googleRendered=false,lastProfileSentAt=0;

function status(message,isError){var el=document.getElementById('authStatus');if(!el)return;el.textContent=message||'';el.classList.toggle('error',!!isError)}
function app(){return document.getElementById('turfApp')}
function guestButton(){return document.getElementById('guestButton')}
function setBusy(v){busy=!!v;var g=guestButton();if(g)g.disabled=busy}
function saveActive(profile){activeProfile=profile||null}
function sendProfile(target,force){
  var a=app(),w=target||(a&&a.contentWindow);if(!w||!activeProfile)return;
  var now=Date.now();if(!force&&now-lastProfileSentAt<250)return;lastProfileSentAt=now;
  try{w.postMessage({type:'turf-auth-worker-profile',profile:activeProfile,version:'worker-auth-9'},'*')}catch(e){}
}
function showExistingTurf(){document.body.classList.add('turf-authenticated');status('',false);setBusy(false);sendProfile(null,true);[100,350,800,1600,3000,6000].forEach(function(ms){setTimeout(function(){sendProfile(null,true)},ms)})}
function startExistingTurf(profile){
  saveActive(profile);var a=app();if(!a)throw new Error('TURF app frame is unavailable.');
  if(appLoaded){showExistingTurf();return}
  if(appStarted)return;
  var src=String(window.__TURF_EXISTING_APP_SRC__||'');if(!src)throw new Error('TURF app source is not configured.');
  appStarted=true;status('Account verified. Loading TURF…',false);a.src=src;
}
function fail(e){setBusy(false);status(String(e&&e.message||e||'TURF sign-in failed.'),true)}

async function directGoogle(response){
  if(busy)return;var credential=response&&response.credential?String(response.credential):'';
  if(!credential){status('Google sign-in did not return an account. Please try again.',true);return}
  setBusy(true);status('Checking your TURF account…',false);
  try{startExistingTurf(await window.TurfAuth.googleSignIn(credential))}catch(e){fail(e)}
}
async function directGuest(){
  if(busy)return;setBusy(true);status('Checking your TURF account…',false);
  try{startExistingTurf(await window.TurfAuth.guestSignIn())}catch(e){fail(e)}
}
async function resume(){
  try{var p=await window.TurfAuth.resume();if(p){status('Restoring your TURF account…',false);startExistingTurf(p)}}catch(e){/* invalid session falls back to explicit choice */}
}
function renderGoogle(){
  if(googleRendered)return true;var host=document.getElementById('googleButton');
  if(!host||!(window.google&&google.accounts&&google.accounts.id)||!window.TURF_STATIC_CONFIG)return false;
  try{
    google.accounts.id.initialize({client_id:window.TURF_STATIC_CONFIG.googleClientId,callback:directGoogle,auto_select:false,cancel_on_tap_outside:false});
    google.accounts.id.renderButton(host,{type:'standard',theme:'filled_black',size:'large',text:'continue_with',shape:'rectangular',logo_alignment:'left',width:360});
    googleRendered=true;return true;
  }catch(e){status('Google sign-in could not initialize. Please refresh and try again.',true);return false}
}
function bindGuest(){var g=guestButton();if(!g||g.dataset.workerAuthBound==='1')return;g.dataset.workerAuthBound='1';g.addEventListener('click',directGuest)}

window.addEventListener('message',function(e){
  var d=e&&e.data,a=app();if(!d||typeof d!=='object'||!a||e.source!==a.contentWindow)return;
  if(d.type==='turf-worker-profile-request'){sendProfile(e.source,true);return}
},true);

document.addEventListener('DOMContentLoaded',function(){
  if(!window.TurfAuth||!window.TurfApi){status('TURF authentication failed to load. Refresh once.',true);return}
  var a=app();if(a)a.addEventListener('load',function(){appLoaded=true;sendProfile(null,true);showExistingTurf()});
  bindGuest();var tries=0,timer=setInterval(function(){tries++;if(renderGoogle()||tries>80)clearInterval(timer)},125);resume();
},{once:true});
})();
