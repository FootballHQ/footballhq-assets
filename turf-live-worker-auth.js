(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_AUTH_WRAPPER__) return;
window.__TURF_LIVE_WORKER_AUTH_WRAPPER__=true;

var GOOGLE_CLIENT_ID='981412579361-ebftqmubklnd2pk5k88s8kcbh27cj7i8.apps.googleusercontent.com';
var API_BASE='https://turftest-api.turftrials.workers.dev';
var APP_SRC='https://script.google.com/macros/s/AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ/exec?turfv=89.50&bridge=8967';
var EXACT_T='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-app-icon-v8953.png?v=8967';
var PROFILE_KEY='turfAuthCachedProfileV1';
var TOKEN_KEY='turfAuthAccountTokenV1';

var app=document.getElementById('turfApp');
var guestButton=document.getElementById('guestButton');
var googleButton=document.getElementById('googleButton');
var status=document.getElementById('authStatus');
var layer=document.getElementById('turfTrialsLayer');
var frame=document.getElementById('turfTrialsFrame');
var authStarted=false;
var googleRendered=false;
var currentProfile=null;

function setStatus(message,isError){if(!status)return;status.textContent=message||'';status.classList.toggle('error',!!isError)}
function norm(p){p=String(p||'/trials/');return p.indexOf('/trials/')===0?p:'/trials/'}
function openTrials(p){var t=norm(p);if(frame.getAttribute('src')!==t)frame.setAttribute('src',t);layer.classList.add('open');layer.setAttribute('aria-hidden','false');document.title='TURF — Trials'}
function closeTrials(){layer.classList.remove('open');layer.setAttribute('aria-hidden','true');document.title='TURF';try{app.contentWindow.postMessage({type:'turf-go-home',version:'worker-login-1'},'*')}catch(e){}}
function setFavicon(){var links=document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]');for(var i=0;i<links.length;i++)links[i].href=EXACT_T}
function timeout(p,ms,label){return Promise.race([p,new Promise(function(_,rej){setTimeout(function(){rej(new Error(label||'Request timed out'))},ms)})])}
async function rpc(method){
  var args=Array.prototype.slice.call(arguments,1);
  var r=await timeout(fetch(API_BASE+'/rpc',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({method:method,args:args}),cache:'no-store'}),15000,'TURF backend did not answer.');
  var data=null;try{data=await r.json()}catch(e){}
  if(!r.ok)throw new Error(data&&data.error?data.error:'TURF backend returned HTTP '+r.status);
  if(data&&data.error)throw new Error(data.error);
  return data&&Object.prototype.hasOwnProperty.call(data,'result')?data.result:data;
}
function makeGuestToken(){
  var key='turfGuestTokenV1',token='';
  try{token=String(localStorage.getItem(key)||'')}catch(e){}
  if(token)return token;
  try{var bytes=new Uint8Array(18);crypto.getRandomValues(bytes);token='turf-guest-'+Array.prototype.map.call(bytes,function(b){return b.toString(16).padStart(2,'0')}).join('')}
  catch(e){token='turf-guest-'+Date.now()+'-'+Math.random().toString(36).slice(2)}
  try{localStorage.setItem(key,token)}catch(e){}
  return token;
}
function extractProfile(res){
  if(!res)return null;
  if(res.profile&&typeof res.profile==='object')return res.profile;
  if(res.token||res.accountToken||res.authToken)return res;
  return null;
}
function saveProfile(profile){
  currentProfile=profile||null;
  if(!profile)return;
  var token=String(profile.token||profile.accountToken||profile.authToken||'').trim();
  try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))}catch(e){}
  try{if(token)localStorage.setItem(TOKEN_KEY,token)}catch(e){}
}
function sendProfile(target){
  if(!currentProfile||!target)return false;
  try{target.postMessage({type:'turf-auth-worker-profile',profile:currentProfile,version:'live-worker-auth-1'},'*');return true}catch(e){return false}
}
function unlock(profile){
  saveProfile(profile);
  document.body.classList.add('turf-authenticated');
  setStatus('',false);
  authStarted=false;
  if(guestButton)guestButton.disabled=false;
  try{sendProfile(app.contentWindow)}catch(e){}
  [0,50,150,350,700,1200,2200,4000,7000].forEach(function(ms){setTimeout(function(){try{sendProfile(app.contentWindow)}catch(e){}},ms)});
}
async function chooseGuest(){
  if(authStarted)return;authStarted=true;if(guestButton)guestButton.disabled=true;setStatus('Opening your TURF account…',false);
  try{var res=await rpc('turfBatch1BContinueAsGuest',makeGuestToken());var p=extractProfile(res);if(!p)throw new Error('Guest account could not be opened.');unlock(p)}
  catch(e){authStarted=false;if(guestButton)guestButton.disabled=false;setStatus(e&&e.message?e.message:String(e),true)}
}
async function onGoogleCredential(response){
  var credential=response&&response.credential?String(response.credential):'';if(!credential){setStatus('Google sign-in did not return an account. Please try again.',true);return}
  if(authStarted)return;authStarted=true;if(guestButton)guestButton.disabled=true;setStatus('Signing in with Google…',false);
  try{var res=await rpc('turfBatch1GoogleSignIn',credential);var p=extractProfile(res);if(!p){if(res&&(res.needsLink||res.needsAccount||res.needsCreate))throw new Error('Google verified. This Google account still needs to be linked to a TURF profile.');throw new Error((res&&res.error)||'Google account is not linked to TURF yet.')}unlock(p)}
  catch(e){authStarted=false;if(guestButton)guestButton.disabled=false;setStatus(e&&e.message?e.message:String(e),true)}
}
function renderGoogle(){
  if(googleRendered)return true;if(!(window.google&&google.accounts&&google.accounts.id))return false;
  try{google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:onGoogleCredential,auto_select:false,cancel_on_tap_outside:true});google.accounts.id.renderButton(googleButton,{type:'standard',theme:'filled_black',size:'large',text:'continue_with',shape:'rectangular',logo_alignment:'left',width:360});googleRendered=true;return true}catch(e){setStatus('Google sign-in could not initialize. Please refresh and try again.',true);return false}
}
window.addEventListener('message',function(e){
  var d=e&&e.data;
  if(typeof d==='string'){if(d==='turf-open-trials')openTrials('/trials/');if(d==='turf-close-trials')closeTrials();return}
  if(!d||typeof d!=='object')return;
  if(d.type==='turf-worker-profile-request'){if(currentProfile)sendProfile(e.source);return}
  if(d.type==='turf-auth-ready'&&currentProfile){document.body.classList.add('turf-authenticated');return}
  if(d.type==='turf-open-trials')openTrials(d.path||'/trials/');
  if(d.type==='turf-close-trials')closeTrials();
  if(d.type==='turf-page-title'&&!layer.classList.contains('open'))document.title=String(d.title||'TURF').slice(0,80);
  if(d.type==='turf-favicon'){setFavicon();if(d.title&&!layer.classList.contains('open'))document.title=String(d.title).slice(0,80)}
},true);

if(guestButton)guestButton.addEventListener('click',chooseGuest);
if(app){app.onload=function(){if(currentProfile){sendProfile(app.contentWindow);[50,150,400,900,1800,3500].forEach(function(ms){setTimeout(function(){sendProfile(app.contentWindow)},ms)})}};app.src=APP_SRC}
var googleAttempts=0,googleTimer=setInterval(function(){googleAttempts++;if(renderGoogle()||googleAttempts>40)clearInterval(googleTimer)},125);
setFavicon();
})();
