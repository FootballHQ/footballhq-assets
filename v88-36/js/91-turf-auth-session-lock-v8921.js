/* ============================================================
   TURF V89.21 — AUTHENTICATED SESSION LOCK
   Keeps the signed-in TURF account authoritative across navigation.
   Prevents stale guest/local bootstrap state from replacing coins/pass.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_AUTH_SESSION_LOCK_8921__)return;
window.__TURF_AUTH_SESSION_LOCK_8921__=true;

var PROFILE_KEY='turfAuthenticatedProfileV8921';
var TOKEN_KEY='turfAuthenticatedTokenV8921';
var lastServerRefresh=0;
var refreshBusy=false;

function readJSON(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch(e){return null}}
function writeJSON(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch(e){}}
function getLockedToken(){try{return String(localStorage.getItem(TOKEN_KEY)||'').trim()}catch(e){return ''}}
function setLockedToken(token){token=String(token||'').trim();if(!token)return;try{localStorage.setItem(TOKEN_KEY,token)}catch(e){}}
function isNamedProfile(p){
  var name=String(p&&p.username||'').trim();
  return !!(p&&p.token&&name&&!/^Guest(?:-|$)/i.test(name));
}
function rememberProfile(p){
  if(!isNamedProfile(p))return;
  var copy={};
  try{Object.keys(p).forEach(function(k){copy[k]=p[k]})}catch(e){copy=p}
  copy.savedAt=Date.now();
  setLockedToken(copy.token);
  writeJSON(PROFILE_KEY,copy);
}
function savedProfile(){var p=readJSON(PROFILE_KEY);return isNamedProfile(p)?p:null}
function paintCoins(p){
  if(!p)return;
  var n=Math.max(0,Number(p.hqCoins)||0);
  ['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.textContent=String(n);
  });
  try{localStorage.setItem('footballHQCoinDisplayV2',String(n))}catch(e){}
}
function applyProfile(p){
  if(!isNamedProfile(p))return;
  paintCoins(p);
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(p)}catch(e){}
  try{if(typeof window.fhqRenderPass==='function')window.fhqRenderPass(p)}catch(e){}
}
function fetchAuthoritative(force){
  var token=getLockedToken();
  if(!token||refreshBusy||!window.google||!google.script||!google.script.run)return;
  if(!force&&Date.now()-lastServerRefresh<1200)return;
  refreshBusy=true;lastServerRefresh=Date.now();
  try{
    google.script.run
      .withSuccessHandler(function(p){
        refreshBusy=false;
        if(isNamedProfile(p)){
          rememberProfile(p);
          try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(p)}catch(e){}
          applyProfile(p);
        }else{
          applyProfile(savedProfile());
        }
      })
      .withFailureHandler(function(){refreshBusy=false;applyProfile(savedProfile())})
      .getFootballHQAccount(token);
  }catch(e){refreshBusy=false;applyProfile(savedProfile())}
}

function patchFunctions(){
  if(typeof window.fhqSetRuntimeIdentity==='function'&&!window.fhqSetRuntimeIdentity.__turf8921){
    var originalSet=window.fhqSetRuntimeIdentity;
    var wrappedSet=function(profile){
      var out=originalSet.apply(this,arguments);
      if(isNamedProfile(profile))rememberProfile(profile);
      if(isNamedProfile(profile))applyProfile(profile);
      return out;
    };
    wrappedSet.__turf8921=true;window.fhqSetRuntimeIdentity=wrappedSet;
  }

  if(typeof window.fhqGetToken==='function'&&!window.fhqGetToken.__turf8921){
    var originalGet=window.fhqGetToken;
    var wrappedGet=function(){
      var locked=getLockedToken();
      if(locked)return locked;
      return originalGet.apply(this,arguments);
    };
    wrappedGet.__turf8921=true;window.fhqGetToken=wrappedGet;
  }

  if(typeof window.fhqRememberCoins==='function'&&!window.fhqRememberCoins.__turf8921){
    var originalCoins=window.fhqRememberCoins;
    var wrappedCoins=function(value){
      var p=savedProfile();
      var n=Math.max(0,Number(value)||0);
      if(p&&Number(p.hqCoins)>0&&n===0){paintCoins(p);return Number(p.hqCoins)||0}
      var out=originalCoins.apply(this,arguments);
      if(p&&n===Number(p.hqCoins))paintCoins(p);
      return out;
    };
    wrappedCoins.__turf8921=true;window.fhqRememberCoins=wrappedCoins;
  }

  if(typeof window.openFootballHQSection==='function'&&!window.openFootballHQSection.__turf8921){
    var originalOpen=window.openFootballHQSection;
    var wrappedOpen=function(){
      var out=originalOpen.apply(this,arguments);
      var p=savedProfile();
      if(p)applyProfile(p);
      setTimeout(function(){fetchAuthoritative(true)},80);
      setTimeout(function(){applyProfile(savedProfile())},400);
      return out;
    };
    wrappedOpen.__turf8921=true;window.openFootballHQSection=wrappedOpen;
  }
}

function boot(){
  patchFunctions();
  var p=savedProfile();if(p)applyProfile(p);
  fetchAuthoritative(false);
}

/* Auth may complete after this asset loads, so keep hooks installed and UI sane. */
setInterval(function(){
  patchFunctions();
  var p=savedProfile();
  if(p){
    var coin=document.getElementById('fhqGlobalCoins');
    if(coin&&String(coin.textContent||'').trim()==='0'&&Number(p.hqCoins)>0)paintCoins(p);
  }
},500);

document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest?e.target.closest('button,a,[data-section],[data-page]'):null;
  if(!t)return;
  setTimeout(function(){var p=savedProfile();if(p)applyProfile(p);fetchAuthoritative(true)},60);
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
