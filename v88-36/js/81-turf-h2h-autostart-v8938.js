/* TURF V89.38 — H2H MATCH FOUND -> GAMEPLAY AUTOSTART
   Fixes the Match Found / Preparing match screen getting stuck.
   v89.30 creates match.start(), while v89.37 gameplay listens for
   turf:h2h:matched. This bridge actually calls match.start().
*/
(function(){
'use strict';
if(window.__TURF_V8938_H2H_AUTOSTART__) return;
window.__TURF_V8938_H2H_AUTOSTART__=true;

function install(){
  var original=window.turfH2HFindMatch;
  if(typeof original!=='function'){
    setTimeout(install,250);
    return;
  }
  if(original.__turf8938Wrapped) return;

  function wrapped(gameId,onMatch){
    return original.call(this,gameId,function(match){
      var started=false;
      function startOnce(){
        if(started) return;
        started=true;
        try{
          if(match&&typeof match.start==='function') match.start();
          else if(match) window.dispatchEvent(new CustomEvent('turf:h2h:matched',{detail:match}));
        }catch(e){
          try{window.dispatchEvent(new CustomEvent('turf:h2h:matched',{detail:match||{}}));}catch(_e){}
        }
      }

      /* Let the existing Match Found UI paint first, then enter gameplay. */
      if(typeof onMatch==='function'){
        try{onMatch(match);}catch(e){}
      }
      setTimeout(startOnce,700);
    });
  }

  wrapped.__turf8938Wrapped=true;
  wrapped.__turf8938Original=original;
  window.turfH2HFindMatch=wrapped;
}

install();
})();

/* ============================================================
   TURF WORKER AUTH PROFILE RECEIVER
   Login plumbing only. The outer turftrials.com wrapper authenticates
   against the Worker and hands this already-authenticated profile into
   the existing Apps Script TURF runtime. No presentation changes.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_WORKER_PROFILE_RECEIVER__)return;
window.__TURF_WORKER_PROFILE_RECEIVER__=true;
var TRUSTED_PARENT='https://turftrials.com';

function post(data){try{window.parent.postMessage(data,TRUSTED_PARENT)}catch(e){}}
function release(){
  try{window.__fhqIdentityResolving=false}catch(e){}
  try{document.documentElement.classList.remove('turf-auth-locked','fhq-identity-recovering','rankings-loading')}catch(e){}
  try{document.body.classList.remove('turf-auth-locked','fhq-identity-recovering','rankings-loading')}catch(e){}
  try{var gate=document.getElementById('turfAuthGate');if(gate)gate.classList.add('turf-auth-hidden')}catch(e){}
}
function apply(profile){
  if(!profile||!profile.token)return false;
  var token=String(profile.token);
  window.__TURF_AUTH_TOKEN__=token;
  window.__TURF_AUTH_PROFILE__=profile;
  try{localStorage.setItem('turfAuthAccountTokenV1',token)}catch(e){}
  try{window.fhqGetToken=function(){return String(window.__TURF_AUTH_TOKEN__||'')}}catch(e){}
  try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(profile)}catch(e){}
  try{if(typeof window.fhqWriteLastConfirmedAccount==='function')window.fhqWriteLastConfirmedAccount(profile)}catch(e){}
  try{if(typeof window.fhqSyncLocalProfileFromServer==='function')window.fhqSyncLocalProfileFromServer(profile)}catch(e){}
  try{if(typeof window.fhqRememberLifetimePoints==='function')window.fhqRememberLifetimePoints(Number(profile.points)||0)}catch(e){}
  try{if(typeof window.fhqRememberCoins==='function')window.fhqRememberCoins(Number(profile.hqCoins||profile.coins)||0)}catch(e){}
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(profile)}catch(e){}
  release();
  try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile}}))}catch(e){}
  [80,250,650,1400,2600].forEach(function(ms){setTimeout(function(){
    try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(profile)}catch(e){}
    try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(profile)}catch(e){}
    try{if(typeof window.refreshFootballHQScoreDisplays==='function')window.refreshFootballHQScoreDisplays()}catch(e){}
    try{if(typeof window.refreshFootballHQDashboard==='function')window.refreshFootballHQDashboard()}catch(e){}
    release();
  },ms)});
  post({type:'turf-auth-worker-profile-applied',token:token,username:String(profile.username||''),version:'worker-profile-1'});
  post({type:'turf-auth-ready',token:token,username:String(profile.username||''),version:'worker-profile-1'});
  return true;
}

window.addEventListener('message',function(e){
  if(e.origin!==TRUSTED_PARENT)return;
  var d=e&&e.data;if(!d||typeof d!=='object')return;
  if(d.type==='turf-auth-worker-profile'&&d.profile){
    try{e.stopImmediatePropagation();e.stopPropagation()}catch(_e){}
    apply(d.profile);
  }
},true);

post({type:'turf-auth-worker-receiver-ready',version:'worker-profile-1'});
[300,900,1800,3500,6500].forEach(function(ms){setTimeout(function(){post({type:'turf-auth-worker-receiver-ready',version:'worker-profile-1'})},ms)});
})();
