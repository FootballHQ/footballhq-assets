/* TURF live parent-side Worker auth bridge.
   AUTH ONLY: does not alter TURF presentation, layout, logos, games or navigation.
   Google/Guest authenticate directly with the Worker, then the verified profile
   is handed to the existing TURF app via turf-auth-worker-profile. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT__)return;
window.__TURF_LIVE_WORKER_PARENT__=true;

var API='https://turftest-api.turftrials.workers.dev';
var ALLOWED={turfBatch1GoogleSignIn:1,turfBatch1BContinueAsGuest:1,turfBatch1BResolveAccountToken:1};
var PROFILE_KEY='turfAuthCachedProfileV1';
var TOKEN_KEY='turfAuthAccountTokenV1';
var GUEST_KEY='turfGuestTokenV1';
var activeProfile=null,busy=false,gsiPatched=false;

async function rpc(method,args){
  if(!ALLOWED[method])throw new Error('Unsupported TURF auth method.');
  var controller=new AbortController();
  var timer=setTimeout(function(){controller.abort()},15000);
  try{
    var res=await fetch(API+'/rpc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({method:method,args:Array.isArray(args)?args:[]}),signal:controller.signal,cache:'no-store'});
    var body=null;try{body=await res.json()}catch(e){}
    if(!res.ok)throw new Error(body&&body.error?body.error:'TURF backend returned HTTP '+res.status);
    if(body&&body.ok===false)throw new Error(body.error||'TURF sign-in failed.');
    return body&&Object.prototype.hasOwnProperty.call(body,'result')?body.result:body;
  }catch(e){if(e&&e.name==='AbortError')throw new Error('TURF sign-in request timed out.');throw e}
  finally{clearTimeout(timer)}
}

function status(message,isError){
  var el=document.getElementById('authStatus');if(!el)return;
  el.textContent=message||'';el.classList.toggle('error',!!isError);
}
function app(){return document.getElementById('turfApp')}
function saveProfile(p){
  if(!p||!p.token)return;
  activeProfile=p;
  try{localStorage.setItem(TOKEN_KEY,String(p.token))}catch(e){}
  try{localStorage.setItem(PROFILE_KEY,JSON.stringify(p))}catch(e){}
}
function sendProfile(){
  var a=app();if(!a||!a.contentWindow||!activeProfile)return;
  try{a.contentWindow.postMessage({type:'turf-auth-worker-profile',profile:activeProfile,version:'live-worker-auth-2'},'*')}catch(e){}
}
function reveal(p){
  if(!p||!p.token)throw new Error('TURF did not return an account profile.');
  saveProfile(p);
  document.body.classList.add('turf-authenticated');
  status('',false);
  var guest=document.getElementById('guestButton');if(guest)guest.disabled=false;
  busy=false;
  [0,40,100,220,450,850,1500,2600,4200,7000].forEach(function(ms){setTimeout(sendProfile,ms)});
}
function fail(e){
  busy=false;
  var guest=document.getElementById('guestButton');if(guest)guest.disabled=false;
  status(String(e&&e.message||e||'TURF sign-in failed.'),true);
}
function makeGuestToken(){
  var token='';try{token=String(localStorage.getItem(GUEST_KEY)||'')}catch(e){}
  if(token)return token;
  try{var bytes=new Uint8Array(18);crypto.getRandomValues(bytes);token='turf-guest-'+Array.prototype.map.call(bytes,function(b){return b.toString(16).padStart(2,'0')}).join('')}
  catch(e){token='turf-guest-'+Date.now()+'-'+Math.random().toString(36).slice(2)}
  try{localStorage.setItem(GUEST_KEY,token)}catch(e){}return token;
}
async function directGoogle(response){
  if(busy)return;
  var credential=response&&response.credential?String(response.credential):'';
  if(!credential){status('Google sign-in did not return an account. Please try again.',true);return}
  busy=true;var guest=document.getElementById('guestButton');if(guest)guest.disabled=true;
  status('Opening your TURF account…',false);
  try{reveal(await rpc('turfBatch1GoogleSignIn',[credential]))}catch(e){fail(e)}
}
async function directGuest(){
  if(busy)return;busy=true;
  var guest=document.getElementById('guestButton');if(guest)guest.disabled=true;
  status('Opening your TURF account…',false);
  try{reveal(await rpc('turfBatch1BContinueAsGuest',[makeGuestToken()]))}catch(e){fail(e)}
}
function patchGsi(){
  try{
    if(gsiPatched||!(window.google&&google.accounts&&google.accounts.id&&typeof google.accounts.id.initialize==='function'))return false;
    var nativeInit=google.accounts.id.initialize.bind(google.accounts.id);
    google.accounts.id.initialize=function(config){var c=Object.assign({},config||{});c.callback=directGoogle;c.auto_select=false;return nativeInit(c)};
    gsiPatched=true;return true;
  }catch(e){return false}
}
function installGuestCapture(){
  document.addEventListener('click',function(e){
    var t=e.target&&e.target.closest?e.target.closest('#guestButton'):null;if(!t)return;
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();directGuest();
  },true);
}
async function resume(){
  var token='';try{token=String(localStorage.getItem(TOKEN_KEY)||'')}catch(e){}
  if(!token)return;
  try{var p=await rpc('turfBatch1BResolveAccountToken',[token]);if(p&&p.token)reveal(p)}catch(e){try{localStorage.removeItem(TOKEN_KEY);localStorage.removeItem(PROFILE_KEY)}catch(_e){}}
}

/* Keep child-frame auth RPC forwarding for existing TURF code paths. */
window.addEventListener('message',function(e){
  var d=e&&e.data;if(!d||d.type!=='turf-worker-rpc-request'||!d.id)return;
  var a=app();if(!a||e.source!==a.contentWindow)return;
  var method=String(d.method||'');
  if(!ALLOWED[method]){try{e.source.postMessage({type:'turf-worker-rpc-response',id:String(d.id),ok:false,error:'Unsupported TURF auth method.'},'*')}catch(_e){}return}
  rpc(method,d.args).then(function(result){try{e.source.postMessage({type:'turf-worker-rpc-response',id:String(d.id),ok:true,result:result},'*')}catch(_e){}}).catch(function(err){try{e.source.postMessage({type:'turf-worker-rpc-response',id:String(d.id),ok:false,error:String(err&&err.message||err||'TURF sign-in failed.')},'*')}catch(_e){}});
},true);

installGuestCapture();
var tries=0,timer=setInterval(function(){tries++;if(patchGsi()||tries>500)clearInterval(timer)},10);
document.addEventListener('DOMContentLoaded',function(){var a=app();if(a)a.addEventListener('load',function(){if(activeProfile)[0,60,180,420,900,1800].forEach(function(ms){setTimeout(sendProfile,ms)})});resume()},{once:true});
})();
