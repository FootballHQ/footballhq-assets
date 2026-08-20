/* ============================================================
   TURF V89.23 — AUTHENTICATED PASS AUTHORITY
   Fixes TURF Pass still rendering Guest / Level 1 after Google auth.
   Uses the authenticated profile saved by v89.21 as the source of truth.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_PASS_AUTHORITY_8923__)return;
window.__TURF_PASS_AUTHORITY_8923__=true;

var PROFILE_KEY='turfAuthenticatedProfileV8921';
var TOKEN_KEY='turfAuthenticatedTokenV8921';

function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function profile(){
  var p=readJSON(PROFILE_KEY),t='';
  try{t=String(localStorage.getItem(TOKEN_KEY)||'').trim()}catch(e){}
  if(p&&p.token&&t&&String(p.token)===t&&!/^Guest(?:-|$)/i.test(String(p.username||'')))return p;
  if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__;
  return null;
}
function req(level){level=Math.max(1,Number(level)||1);return 40+level*10+Math.floor(level/5)*15}
function pointsFor(level){level=Math.max(1,Math.floor(Number(level)||1));var n=0;for(var l=1;l<level;l++)n+=req(l);return n}
function levelFrom(points){points=Math.max(0,Number(points)||0);var level=1;while(level<100&&points>=pointsFor(level+1))level++;return level}
function text(id,v){var e=document.getElementById(id);if(e)e.textContent=String(v)}

function paintIdentity(p){
  if(!p)return;
  var pts=Math.max(0,Number(p.points)||0);
  var level=Number(p.level)||levelFrom(pts);
  var floor=pointsFor(level);
  var need=req(level);
  var into=Math.max(0,pts-floor);
  var pct=Math.max(0,Math.min(100,(into/need)*100));

  text('fhqPassUsername',p.username||'PLAYER');
  text('fhqPassLevelTitle','Level '+level);
  text('fhqPassLevelBadge',level);
  text('fhqPassPoints',pts);
  text('fhqPassCoins',Math.max(0,Number(p.hqCoins)||0));
  text('fhqPassEquippedTitle',p.equippedTitle||'No title equipped');
  text('fhqPassProgressCopy',into+' / '+need+' XP');
  text('fhqPassNextLevel',level<100?'LEVEL '+(level+1):'MAX LEVEL');

  var bar=document.getElementById('fhqPassProgressBar');
  if(bar)bar.style.width=pct+'%';

  var avatar=document.getElementById('fhqPassAvatar');
  if(avatar){
    if(p.avatarUrl){avatar.innerHTML='<img src="'+String(p.avatarUrl).replace(/"/g,'&quot;')+'" alt="">'}
    else avatar.textContent=p.avatarEmoji||'🏈';
  }

  // Correct the reward-track state produced by the legacy Guest renderer.
  var track=document.getElementById('fhqPassTrack');
  if(track){
    var cards=Array.prototype.slice.call(track.children||[]);
    cards.forEach(function(card,index){
      var cardLevel=Number(card.getAttribute('data-level')||card.dataset&&card.dataset.level)||index+1;
      card.classList.toggle('unlocked',cardLevel<=level);
      card.classList.toggle('current',cardLevel===level);
      card.classList.toggle('locked',cardLevel>level);
    });
    var current=track.querySelector('.current');
    if(current&&track.offsetParent!==null){
      setTimeout(function(){try{track.scrollLeft=Math.max(0,current.offsetLeft-(track.clientWidth-current.offsetWidth)/2)}catch(e){}},20);
    }
  }
}

function forcePass(){
  var p=profile();if(!p)return;
  // Call legacy renderer first so reward cards/locker stay intact, then overwrite stale Guest identity.
  try{if(typeof window.fhqRenderPass==='function')window.fhqRenderPass(p)}catch(e){}
  [0,40,120,300,700].forEach(function(ms){setTimeout(function(){paintIdentity(profile()||p)},ms)});
}

function patchGetProfile(){
  if(typeof window.getAccountProfile!=='function'||window.getAccountProfile.__turf8923)return;
  var old=window.getAccountProfile;
  var wrap=function(){return profile()||old.apply(this,arguments)};
  wrap.__turf8923=true;window.getAccountProfile=wrap;
}

function patchPassRenderer(){
  if(typeof window.fhqRenderPass!=='function'||window.fhqRenderPass.__turf8923)return;
  var old=window.fhqRenderPass;
  var wrap=function(p){var a=profile()||p;var out=old.call(this,a);[0,40,120].forEach(function(ms){setTimeout(function(){paintIdentity(profile()||a)},ms)});return out};
  wrap.__turf8923=true;window.fhqRenderPass=wrap;
}

function boot(){patchGetProfile();patchPassRenderer();forcePass()}
setInterval(function(){patchGetProfile();patchPassRenderer();var page=document.getElementById('fhqPassPage');if(page&&page.offsetParent!==null)paintIdentity(profile())},250);
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('[data-fhq-nav="pass"],[data-pass-tab]'):null;if(!t)return;[0,80,220,500].forEach(function(ms){setTimeout(forcePass,ms)})},true);
window.addEventListener('turf:auth-ready',function(){[0,80,250].forEach(function(ms){setTimeout(forcePass,ms)})});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
