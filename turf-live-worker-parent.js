/* TURF production login bridge v46.
   Worker authenticates. Existing Apps Script TURF remains the visual/runtime source of truth. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT_V46__)return;
window.__TURF_LIVE_WORKER_PARENT_V46__=true;

var VERSION='worker-auth-46';
var APP_SRC='https://script.google.com/macros/s/AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ/exec?turfv=89.50&bridge=8967';
var GOOGLE_CLIENT_ID='981412579361-ebftqmubklnd2pk5k88s8kcbh27cj7i8.apps.googleusercontent.com';
var activeProfile=null,bridgeWindow=null,bridgeOrigin='',appStarted=false,busy=false,googleRendered=false,revealed=false,revealTimer=null;
var TOKEN_KEY='turfAuthAccountTokenV1',PROFILE_KEY='turfAuthCachedProfileV1';

function q(id){return document.getElementById(id)}
function status(message,isError){var el=q('authStatus');if(!el)return;el.textContent=message||'';el.classList.toggle('error',!!isError)}
function app(){return q('turfApp')}
function guestButton(){return q('guestButton')}
function setBusy(v){busy=!!v;var g=guestButton();if(g)g.disabled=busy}
function trustedOrigin(origin){try{var u=new URL(String(origin||''));var h=u.hostname.toLowerCase();return u.protocol==='https:'&&(h==='script.google.com'||h==='script.googleusercontent.com'||h.endsWith('.googleusercontent.com'))}catch(e){return false}}
function loadScript(src){return new Promise(function(resolve,reject){var s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=function(){reject(new Error('Could not load TURF account services.'))};document.head.appendChild(s)})}
async function ensureAuthStack(){if(!window.TurfApi)await loadScript('/turf-static/js/turf-api.js?v='+VERSION);if(!window.TURF_STATIC_CONFIG)await loadScript('/turf-static/js/turf-config.js?v='+VERSION);if(!window.TurfAuth)await loadScript('/turf-static/js/turf-auth.js?v='+VERSION);if(!(window.TurfApi&&window.TurfAuth&&window.TURF_STATIC_CONFIG))throw new Error('TURF account services did not initialize.')}
function saveProfile(p){if(!p||!p.token)throw new Error('TURF did not return an account token.');activeProfile=p;try{localStorage.setItem(TOKEN_KEY,String(p.token));localStorage.setItem(PROFILE_KEY,JSON.stringify(p))}catch(e){}}
function clearSaved(){try{localStorage.removeItem(TOKEN_KEY);localStorage.removeItem(PROFILE_KEY)}catch(e){}}
function savedToken(){var t='';try{t=String(localStorage.getItem(TOKEN_KEY)||'').trim()}catch(e){}if(!t){try{var p=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null');if(p&&p.token)t=String(p.token).trim()}catch(e){}}return t}
function cancelReveal(){if(revealTimer){clearTimeout(revealTimer);revealTimer=null}}
function reveal(){if(revealed||!activeProfile||!activeProfile.token)return;cancelReveal();revealed=true;document.body.classList.add('turf-authenticated');status('',false);setBusy(false);try{app().focus()}catch(e){}}
function scheduleReveal(ms){cancelReveal();revealTimer=setTimeout(function(){handoff();reveal()},ms||1400)}
function showChooser(message,isError){cancelReveal();revealed=false;document.body.classList.remove('turf-authenticated');var c=q('authChoices');if(c)c.style.display='grid';var pulse=q('authPulse');if(pulse)pulse.style.display='none';status(message||'Choose how you want to continue.',!!isError);setBusy(false);renderGoogle()}
function showLoading(message){var c=q('authChoices');if(c)c.style.display='none';var pulse=q('authPulse');if(pulse)pulse.style.display='block';status(message||'Opening TURF…',false)}
function handoff(){if(!activeProfile||!activeProfile.token)return false;var a=app(),targetWindow=bridgeWindow||(a&&a.contentWindow);if(!targetWindow)return false;var target=bridgeWindow&&bridgeOrigin?bridgeOrigin:'*';try{targetWindow.postMessage({type:'turf-auth-resume',token:String(activeProfile.token),profile:activeProfile,version:VERSION},target);targetWindow.postMessage({type:'turf-auth-worker-profile',profile:activeProfile,version:VERSION},target);return true}catch(e){return false}}
function queueHandoff(){[0,50,120,250,500,900,1500,2400,3800,6000,9000].forEach(function(ms){setTimeout(handoff,ms)})}
function startExistingTurf(profile){
  saveProfile(profile);showLoading('Opening TURF…');
  var a=app();if(!a)throw new Error('TURF app frame is unavailable.');
  if(appStarted){handoff();queueHandoff();scheduleReveal(900);return}
  appStarted=true;
  a.addEventListener('load',function(){status('Opening TURF…',false);handoff();queueHandoff();scheduleReveal(1400)});
  a.src=APP_SRC+(APP_SRC.indexOf('?')>=0?'&':'?')+'parentauth='+encodeURIComponent(VERSION)+'&accountToken='+encodeURIComponent(String(profile.token))+'&ts='+Date.now();
  handoff();queueHandoff();
}
function profileFromResult(res){if(res&&res.profile&&res.profile.token)return res.profile;if(res&&res.result&&res.result.profile&&res.result.profile.token)return res.result.profile;if(res&&res.data&&res.data.profile&&res.data.profile.token)return res.data.profile;if(res&&res.token)return res;return null}
async function googleLogin(response){if(busy)return;var credential=response&&response.credential?String(response.credential):'';if(!credential){showChooser('Google did not return an account. Please try again.',true);return}setBusy(true);showLoading('Checking your Google account…');try{var res=await TurfAuth.googleSignIn(credential);var p=profileFromResult(res)||res;if(!p||!p.token)throw new Error('TURF did not return your account.');startExistingTurf(p)}catch(e){showChooser(String(e&&e.message||e||'Google sign-in failed.'),true)}}
async function guestLogin(){if(busy)return;setBusy(true);showLoading('Opening your guest account…');try{var res=await TurfAuth.guestSignIn();var p=profileFromResult(res)||res;if(!p||!p.token)throw new Error('TURF did not return a guest account.');startExistingTurf(p)}catch(e){showChooser(String(e&&e.message||e||'Guest sign-in failed.'),true)}}
function renderGoogle(){if(googleRendered)return true;var host=q('googleButton');if(!host||!(window.google&&google.accounts&&google.accounts.id))return false;try{google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:googleLogin,auto_select:false,cancel_on_tap_outside:true});google.accounts.id.renderButton(host,{type:'standard',theme:'filled_black',size:'large',text:'continue_with',shape:'rectangular',logo_alignment:'left',width:360});googleRendered=true;return true}catch(e){return false}}
async function resumeSaved(){var t=savedToken();if(!t)return false;showLoading('Restoring your TURF account…');try{var res=await TurfApi.resolveAccountToken(t);var p=profileFromResult(res);if(!p)throw new Error('Saved account is no longer valid.');if(!p.token)p.token=t;startExistingTurf(p);return true}catch(e){clearSaved();return false}}
window.addEventListener('message',function(e){var d=e&&e.data;if(!d||typeof d!=='object')return;var a=app();if(!a||e.source!==a.contentWindow||!trustedOrigin(e.origin))return;if(d.type==='turf-auth-bridge-ready'){bridgeWindow=e.source;bridgeOrigin=e.origin;handoff();queueHandoff();return}if(d.type==='turf-auth-ready'||d.type==='turf-worker-profile-request'){handoff();reveal();return}if(d.type==='turf-auth-resume-invalid'){clearSaved();showChooser('That saved TURF session expired. Choose an account to continue.',false);return}if(d.type==='turf-auth-error'||d.type==='turf-auth-needs-link'){showChooser(String(d.message||'TURF could not open that account.'),true);return}},true);
async function boot(){try{await ensureAuthStack();var g=guestButton();if(g)g.addEventListener('click',guestLogin);var tries=0,t=setInterval(function(){tries++;if(renderGoogle()||tries>80)clearInterval(t)},100);if(!(await resumeSaved()))showChooser('Choose how you want to continue.',false)}catch(e){showChooser(String(e&&e.message||e||'TURF login could not initialize.'),true)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
