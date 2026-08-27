/* TURF LIVE WORKER AUTH v7
 * Authentication/transport only.
 * The existing Apps Script TURF app remains the complete visual/runtime source of truth.
 */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_AUTH_V7__)return;
window.__TURF_LIVE_WORKER_AUTH_V7__=true;

var APP_SRC='https://script.google.com/macros/s/AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ/exec?turfv=89.50&workerauth=7';
var EXACT_T='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-app-icon-v8953.png?v=8967';
var app=document.getElementById('turfApp');
var guestButton=document.getElementById('guestButton');
var googleButton=document.getElementById('googleButton');
var status=document.getElementById('authStatus');
var layer=document.getElementById('turfTrialsLayer');
var trialsFrame=document.getElementById('turfTrialsFrame');
var currentProfile=null;
var busy=false;
var googleRendered=false;
var childReady=false;
var childWaitTimer=null;
var profilePushTimers=[];

function setStatus(message,isError){
  if(!status)return;
  status.textContent=message||'';
  status.classList.toggle('error',!!isError);
}
function normTrialPath(p){p=String(p||'/trials/');return p.indexOf('/trials/')===0?p:'/trials/';}
function openTrials(p){
  var t=normTrialPath(p);
  if(trialsFrame&&trialsFrame.getAttribute('src')!==t)trialsFrame.setAttribute('src',t);
  if(layer){layer.classList.add('open');layer.setAttribute('aria-hidden','false');}
  document.title='TURF — Trials';
}
function closeTrials(){
  if(layer){layer.classList.remove('open');layer.setAttribute('aria-hidden','true');}
  document.title='TURF';
  try{app.contentWindow.postMessage({type:'turf-go-home',version:'worker-auth-7'},'*');}catch(e){}
}
function setFavicon(){
  var links=document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]');
  for(var i=0;i<links.length;i++)links[i].href=EXACT_T;
}
function clearChildWait(){if(childWaitTimer){clearTimeout(childWaitTimer);childWaitTimer=null;}}
function clearProfilePushes(){profilePushTimers.forEach(clearTimeout);profilePushTimers=[];}
function sendProfile(target){
  if(!currentProfile||!currentProfile.token)return false;
  try{
    (target||app.contentWindow).postMessage({
      type:'turf-auth-worker-profile',
      version:'live-worker-auth-7',
      profile:currentProfile
    },'*');
    return true;
  }catch(e){return false;}
}
function scheduleProfilePushes(){
  clearProfilePushes();
  [0,40,100,180,300,500,800,1200,1800,2600,4000,6000].forEach(function(ms){
    profilePushTimers.push(setTimeout(function(){sendProfile();},ms));
  });
}
function unlockExistingTurf(){
  if(!currentProfile||!currentProfile.token)return;
  clearChildWait();
  document.body.classList.add('turf-authenticated');
  setStatus('',false);
  busy=false;
  if(guestButton)guestButton.disabled=false;
  try{app.focus();}catch(e){}
}
function waitForExistingTurf(){
  clearChildWait();
  childWaitTimer=setTimeout(function(){
    if(childReady)return;
    document.body.classList.remove('turf-authenticated');
    setStatus('TURF loaded, but the existing app did not accept the Worker sign-in yet.',true);
    busy=false;
    if(guestButton)guestButton.disabled=false;
  },12000);
}
function openExistingTurf(profile){
  if(!profile||!profile.token)throw new Error('TURF did not return a valid account profile.');
  currentProfile=profile;
  childReady=false;
  setStatus('Opening your TURF account…',false);
  if(!app.getAttribute('src')){
    app.addEventListener('load',function(){scheduleProfilePushes();},{once:true});
    app.setAttribute('src',APP_SRC);
  }else{
    scheduleProfilePushes();
  }
  waitForExistingTurf();
}
async function chooseGuest(){
  if(busy)return;
  busy=true;
  if(guestButton)guestButton.disabled=true;
  try{
    setStatus('Opening guest account…',false);
    var profile=await TurfAuth.guestSignIn();
    openExistingTurf(profile);
  }catch(e){
    busy=false;
    if(guestButton)guestButton.disabled=false;
    setStatus((e&&e.message)||String(e||'Guest sign-in failed.'),true);
  }
}
async function onGoogleCredential(response){
  if(busy)return;
  var credential=response&&response.credential?String(response.credential):'';
  if(!credential){setStatus('Google sign-in did not return an account. Please try again.',true);return;}
  busy=true;
  if(guestButton)guestButton.disabled=true;
  try{
    setStatus('Google verified. Opening TURF…',false);
    var profile=await TurfAuth.googleSignIn(credential);
    openExistingTurf(profile);
  }catch(e){
    busy=false;
    if(guestButton)guestButton.disabled=false;
    setStatus((e&&e.message)||String(e||'Google sign-in failed.'),true);
  }
}
function renderGoogle(){
  if(googleRendered)return true;
  if(!(window.google&&google.accounts&&google.accounts.id))return false;
  try{
    google.accounts.id.initialize({
      client_id:TURF_STATIC_CONFIG.googleClientId,
      callback:onGoogleCredential,
      auto_select:false,
      cancel_on_tap_outside:true
    });
    google.accounts.id.renderButton(googleButton,{
      type:'standard',theme:'filled_black',size:'large',text:'continue_with',shape:'rectangular',logo_alignment:'left',width:360
    });
    googleRendered=true;
    return true;
  }catch(e){
    setStatus('Google sign-in could not initialize. Please refresh and try again.',true);
    return false;
  }
}
async function checkWorker(){
  try{
    var r=await fetch(TURF_STATIC_CONFIG.apiBaseUrl+'/health',{cache:'no-store'});
    if(!r.ok)throw new Error('HTTP '+r.status);
  }catch(e){
    setStatus('TURF sign-in service is temporarily unavailable.',true);
  }
}

window.addEventListener('message',function(e){
  var d=e&&e.data;
  if(typeof d==='string'){
    if(d==='turf-open-trials')openTrials('/trials/');
    if(d==='turf-close-trials')closeTrials();
    return;
  }
  if(!d||typeof d!=='object')return;

  /* The existing Apps Script app asks the parent for the Worker-authenticated profile. */
  if(d.type==='turf-worker-profile-request'&&e.source===app.contentWindow){
    childReady=true;
    sendProfile(e.source);
    setTimeout(unlockExistingTurf,30);
    return;
  }

  /* Ignore the old Apps Script auth bridge. Worker auth is authoritative now. */
  if(d.type==='turf-auth-bridge-ready'||d.type==='turf-auth-ready'||d.type==='turf-auth-error'||d.type==='turf-auth-needs-link'||d.type==='turf-auth-resume'||d.type==='turf-auth-resume-invalid')return;

  if(d.type==='turf-open-trials')openTrials(d.path||'/trials/');
  if(d.type==='turf-close-trials')closeTrials();
  if(d.type==='turf-page-title'&&(!layer||!layer.classList.contains('open')))document.title=String(d.title||'TURF').slice(0,80);
  if(d.type==='turf-favicon'){
    setFavicon();
    if(d.title&&(!layer||!layer.classList.contains('open')))document.title=String(d.title).slice(0,80);
  }
},true);

if(guestButton)guestButton.addEventListener('click',chooseGuest);
var attempts=0,googleTimer=setInterval(function(){attempts++;if(renderGoogle()||attempts>50)clearInterval(googleTimer);},120);
setFavicon();
checkWorker();
})();
