window.__FHQ_BUILD__="V88.36";
console.log("Football HQ build V83.6 — approved card preview style + unique collection banners active");

/* TURF auth handoff 89.70
   Surgical live-app fix: once the existing TURF auth bridge has succeeded,
   keep that authenticated profile/token authoritative and prevent the obsolete
   Football HQ recovery veil from blocking the already-loaded TURF UI.
   Does not initiate or alter Google/Guest sign-in. */
(function(){
'use strict';
if(window.__TURF_AUTH_RECOVERY_HANDOFF_8970__)return;
window.__TURF_AUTH_RECOVERY_HANDOFF_8970__=true;

var armed=false,profile=null,observer=null,stopTimer=null;
var TARGETS=[
  'recovering your football hq account',
  'restoring your football hq account',
  'restoring your turf account'
];
function norm(v){return String(v||'').toLowerCase().replace(/\u2026/g,'...').replace(/\s+/g,' ').trim()}
function hasTarget(el){
  if(!el||el.nodeType!==1)return false;
  var t=norm(el.textContent);
  for(var i=0;i<TARGETS.length;i++)if(t.indexOf(TARGETS[i])!==-1)return true;
  return false;
}
function currentProfile(candidate){
  var p=candidate&&candidate.profile?candidate.profile:candidate;
  if(p&&p.token)return p;
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__}catch(e){}
  try{
    var saved=JSON.parse(localStorage.getItem('turfAuthenticatedProfileV8921')||'null');
    if(saved&&saved.token)return saved;
  }catch(e){}
  return null;
}
function preserve(p){
  if(!p||!p.token)return;
  profile=p;
  try{window.__TURF_AUTH_PROFILE__=p;window.__TURF_AUTH_TOKEN__=String(p.token)}catch(e){}
  try{localStorage.setItem('turfAuthAccountTokenV1',String(p.token))}catch(e){}
  try{localStorage.setItem('turfAuthenticatedTokenV8921',String(p.token))}catch(e){}
  try{localStorage.setItem('turfAuthenticatedProfileV8921',JSON.stringify(p))}catch(e){}
  try{
    var get=function(){return String((profile&&profile.token)||window.__TURF_AUTH_TOKEN__||'')};
    get.__turf8970=true;window.fhqGetToken=get;
  }catch(e){}
  try{window.__fhqIdentityResolving=false}catch(e){}
}
function releaseClasses(){
  var lists=[document.documentElement,document.body];
  lists.forEach(function(el){if(!el)return;['fhq-identity-recovering','account-loading','recovering','fhq-loading','is-loading'].forEach(function(c){el.classList.remove(c)})});
  try{document.documentElement.style.removeProperty('overflow');document.body.style.removeProperty('overflow')}catch(e){}
}
function releaseVeil(){
  if(!armed||!document.body)return false;
  var all=document.body.querySelectorAll('*'),hit=null;
  for(var i=0;i<all.length;i++){
    if(!hasTarget(all[i]))continue;
    var childHit=false,children=all[i].children||[];
    for(var j=0;j<children.length;j++){if(hasTarget(children[j])){childHit=true;break}}
    if(!childHit){hit=all[i];break}
  }
  if(!hit){releaseClasses();return false}
  var p=hit,best=hit;
  for(var depth=0;depth<12&&p&&p!==document.body;depth++,p=p.parentElement){
    var r,cs;try{r=p.getBoundingClientRect();cs=getComputedStyle(p)}catch(e){continue}
    var large=r.width>innerWidth*.42&&r.height>innerHeight*.28;
    var overlay=cs&&(cs.position==='fixed'||cs.position==='absolute'||Number(cs.zIndex||0)>=5);
    if(large&&overlay){best=p;break}
  }
  try{
    best.style.setProperty('display','none','important');
    best.style.setProperty('visibility','hidden','important');
    best.style.setProperty('opacity','0','important');
    best.style.setProperty('pointer-events','none','important');
    best.setAttribute('aria-hidden','true');
  }catch(e){}
  releaseClasses();
  return true;
}
function repaint(){
  var p=profile;if(!p)return;
  try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(p)}catch(e){}
  try{if(typeof window.fhqWriteLastConfirmedAccount==='function')window.fhqWriteLastConfirmedAccount(p)}catch(e){}
  try{if(typeof window.fhqSyncLocalProfileFromServer==='function')window.fhqSyncLocalProfileFromServer(p)}catch(e){}
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(p)}catch(e){}
  try{if(typeof window.refreshFootballHQScoreDisplays==='function')window.refreshFootballHQScoreDisplays()}catch(e){}
  try{if(typeof window.refreshFootballHQDashboard==='function')window.refreshFootballHQDashboard()}catch(e){}
}
function sweep(){if(!armed)return;preserve(profile);releaseVeil();repaint()}
function arm(p){
  p=currentProfile(p);if(!p||!p.token)return;
  preserve(p);armed=true;
  [0,30,80,160,300,550,900,1400,2200,3500,5500,8000].forEach(function(ms){setTimeout(sweep,ms)});
  if(!observer&&window.MutationObserver){
    var timer=null;observer=new MutationObserver(function(){if(!armed)return;clearTimeout(timer);timer=setTimeout(sweep,18)});
    try{observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']})}catch(e){}
  }
  clearTimeout(stopTimer);stopTimer=setTimeout(function(){try{observer&&observer.disconnect()}catch(e){}observer=null},12000);
}
window.addEventListener('turf:auth-ready',function(e){arm(e&&e.detail)},true);
try{document.addEventListener('turf:auth-ready',function(e){arm(e&&e.detail)},true)}catch(e){}
/* Catch auth that completed before this listener was installed. */
[0,120,350,800,1600].forEach(function(ms){setTimeout(function(){var p=currentProfile();if(p)arm(p)},ms)});
})();
