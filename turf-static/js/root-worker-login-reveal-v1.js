/* TURF production root: Worker-auth reveal fallback.
   Keeps the existing TURF iframe/app untouched. The root wrapper already authenticates
   with TurfAuth and posts the Worker profile into the existing app. This layer only
   prevents the sign-in shell from hanging forever when the legacy iframe acknowledgement
   is delayed/missed. */
(function(){
'use strict';
if(window.__TURF_ROOT_WORKER_REVEAL_V1__)return;
window.__TURF_ROOT_WORKER_REVEAL_V1__=true;
var frame=document.getElementById('turfApp');
var status=document.getElementById('authStatus');
if(!frame||!status)return;
var loaded=false,timer=null;
function signedIn(){return /^Signed in\. Opening TURF/i.test(String(status.textContent||'').trim())}
function hasWorkerProfile(){
  try{var p=JSON.parse(localStorage.getItem('turfAuthCachedProfileV1')||'null');return !!(p&&p.token)}catch(e){return false}
}
function revealSoon(){
  if(!loaded||!signedIn()||!hasWorkerProfile()||document.body.classList.contains('turf-authenticated'))return;
  clearTimeout(timer);timer=setTimeout(function(){
    if(!loaded||!signedIn()||!hasWorkerProfile())return;
    document.body.classList.add('turf-authenticated');
    try{status.textContent=''}catch(e){}
  },900);
}
frame.addEventListener('load',function(){loaded=true;revealSoon()});
var observer=new MutationObserver(revealSoon);observer.observe(status,{childList:true,subtree:true,characterData:true});
[500,1000,1800,3000,5000,8000,12000].forEach(function(ms){setTimeout(revealSoon,ms)});
})();
