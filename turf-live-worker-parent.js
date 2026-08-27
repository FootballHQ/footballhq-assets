/* TURF production auth orchestrator.
   Uses the proven TurfAuth/TurfApi stack.
   AUTH ONLY: does not alter TURF presentation, layout, logos, games or navigation.
   The Worker verifies the account; the existing TURF frontend receives that
   verified profile directly. No legacy Apps Script auth/resume call is used. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT_V27__)return;
window.__TURF_LIVE_WORKER_PARENT_V27__=true;

var VERSION='worker-auth-27';
var PROXY_APP='https://turftest-api.turftrials.workers.dev/app?authFallback=worker-auth-27';
var activeProfile=null,busy=false,appStarted=false,appLoaded=false,bridgeWindow=null,googleRendered=false,lastProfileSentAt=0,confirmTimer=null,profileConfirmed=false,fallbackUsed=false;
function status(message,isError){var el=document.getElementById('authStatus');if(!el)return;el.textContent=message||'';el.classList.toggle('error',!!isError)}
function app(){return document.getElementById('turfApp')}
function guestButton(){return document.getElementById('guestButton')}
function setBusy(v){busy=!!v;var g=guestButton();if(g)g.disabled=busy}
function saveActive(profile){activeProfile=profile||null;profileConfirmed=false;fallbackUsed=false;try{if(profile&&profile.token)localStorage.setItem('turfAuthAccountTokenV1',String(profile.token))}catch(e){}}
function clearConfirm(){if(confirmTimer){clearTimeout(confirmTimer);confirmTimer=null}}
function trustedAppOrigin(origin){try{var u=new URL(String(origin||''));if(u.protocol!=='https:')return false;var h=String(u.hostname||'').toLowerCase();return h==='script.google.com'||h==='script.googleusercontent.com'||h.endsWith('.googleusercontent.com')||h==='turftest-api.turftrials.workers.dev'}catch(e){return false}}
function loadProxyFallback(){var a=app();if(!a||fallbackUsed)return false;fallbackUsed=true;appLoaded=false;bridgeWindow=null;lastProfileSentAt=0;status('Account verified. Finishing TURF sign-in…',false);a.src=PROXY_APP+'&ts='+Date.now();armConfirm();return true}
function armConfirm(){clearConfirm();confirmTimer=setTimeout(function(){if(profileConfirmed||document.body.classList.contains('turf-authenticated'))return;if(activeProfile&&!fallbackUsed&&loadProxyFallback())return;status('Your account is verified, but TURF did not confirm the profile handoff. Refresh once and try again.',true);setBusy(false)},14000)}
function targetWindow(target){var a=app();return target||bridgeWindow||(a&&a.contentWindow)||null}
function sendProfile(target,force){var w=targetWindow(target);if(!w||!activeProfile)return false;var now=Date.now();if(!force&&now-lastProfileSentAt<200)return false;lastProfileSentAt=now;try{w.postMessage({type:'turf-auth-worker-profile',profile:activeProfile,version:VERSION},'*');return true}catch(e){return false}}
function revealExistingTurf(){profileConfirmed=true;clearConfirm();document.body.classList.add('turf-authenticated');status('',false);setBusy(false);setTimeout(function(){try{var a=app();if(a&&a.contentWindow)a.contentWindow.postMessage({type:'turf-go-home',version:VERSION},'*')}catch(e){}},80)}
function queueHandoffs(){[0,80,180,350,650,1100,1800,3000,5000,8000,11000].forEach(function(ms){setTimeout(function(){if(!profileConfirmed)sendProfile(null,true)},ms)})}
function startExistingTurf(profile){if(!profile||!profile.token)throw new Error('TURF did not return a verified account profile.');saveActive(profile);var a=app();if(!a)throw new Error('TURF app frame is unavailable.');status('Account verified. Loading TURF…',false);armConfirm();if(appLoaded){sendProfile(null,true);queueHandoffs();return}if(appStarted)return;var src=String(window.__TURF_EXISTING_APP_SRC__||'');if(!src)throw new Error('TURF app source is not configured.');appStarted=true;a.src=src}
function fail(e){clearConfirm();setBusy(false);status(String(e&&e.message||e||'TURF sign-in failed.'),true)}
async function directGoogle(response){if(busy)return;var credential=response&&response.credential?String(response.credential):'';if(!credential){status('Google sign-in did not return an account. Please try again.',true);return}setBusy(true);status('Checking your TURF account…',false);try{startExistingTurf(await window.TurfAuth.googleSignIn(credential))}catch(e){fail(e)}}
async function directGuest(){if(busy)return;setBusy(true);status('Checking your TURF account…',false);try{startExistingTurf(await window.TurfAuth.guestSignIn())}catch(e){fail(e)}}
function renderGoogle(){if(googleRendered)return true;var host=document.getElementById('googleButton');if(!host||!(window.google&&google.accounts&&google.accounts.id)||!window.TURF_STATIC_CONFIG)return false;try{google.accounts.id.initialize({client_id:window.TURF_STATIC_CONFIG.googleClientId,callback:directGoogle,auto_select:false,cancel_on_tap_outside:false});google.accounts.id.renderButton(host,{type:'standard',theme:'filled_black',size:'large',text:'continue_with',shape:'rectangular',logo_alignment:'left',width:360});googleRendered=true;return true}catch(e){status('Google sign-in could not initialize. Please refresh and try again.',true);return false}}
function bindGuest(){var g=guestButton();if(!g||g.dataset.workerAuthBound==='1')return;g.dataset.workerAuthBound='1';g.addEventListener('click',directGuest)}
window.addEventListener('message',function(e){var d=e&&e.data;if(!d||typeof d!=='object'||!trustedAppOrigin(e.origin))return;if(d.type==='turf-auth-bridge-ready'||d.type==='turf-worker-profile-request'||d.type==='turf-worker-profile-receiver-ready'||d.type==='turf-worker-profile-bridge-ready'||d.type==='turf-auth-worker-receiver-ready'){bridgeWindow=e.source;if(activeProfile&&!profileConfirmed)sendProfile(e.source,true);return}if(d.type==='turf-auth-worker-profile-applied'){bridgeWindow=e.source;if(activeProfile&&d.token&&String(d.token)!==String(activeProfile.token))return;revealExistingTurf();return}if(d.type==='turf-auth-ready'){bridgeWindow=e.source;if(String(d.version||'').indexOf('worker-profile-')!==0&&String(d.version||'').indexOf('worker-8968')!==0)return;if(activeProfile&&d.token&&String(d.token)!==String(activeProfile.token))return;revealExistingTurf();return}if(d.type==='turf-auth-resume-invalid'){return}if(d.type==='turf-auth-error'&&(String(d.version||'').indexOf('worker-profile-')===0||String(d.version||'').indexOf('worker-8968')===0)){if(!fallbackUsed&&loadProxyFallback())return;fail(new Error(String(d.message||'TURF could not apply the verified account.')))}},true);
document.addEventListener('DOMContentLoaded',function(){if(!window.TurfAuth||!window.TurfApi||!window.TURF_STATIC_CONFIG){status('TURF authentication failed to load. Refresh once.',true);return}var a=app();if(a)a.addEventListener('load',function(){appLoaded=true;if(activeProfile&&!profileConfirmed){status('Account verified. Applying your TURF profile…',false);sendProfile(null,true);queueHandoffs()}});bindGuest();var tries=0,timer=setInterval(function(){tries++;if(renderGoogle()||tries>80)clearInterval(timer)},125)},{once:true});
})();
