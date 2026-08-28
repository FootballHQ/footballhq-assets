/* TURF V89.79 — Active Players hard cleanup + exact-screen authority.
   This file is already part of the legacy games load chain, so it is used as a
   guaranteed kill-switch for the obsolete V89.72 reconstructed screen.
   It never mounts anything on Home. */
(function(){
'use strict';
if(window.__TURF_AP_HARD_CLEANUP_8979__)return;
window.__TURF_AP_HARD_CLEANUP_8979__=true;
function q(s){try{return document.querySelector(s)}catch(e){return null}}
function qa(s){try{return Array.prototype.slice.call(document.querySelectorAll(s))}catch(e){return []}}
function kill(){
  var ids=['turf8972Screen','turf8972Css','turf8954ExactBg','turf8969ExactBg','turf8953Hud','turf8953Stage','turf8953Cards','turf8953Ball','turf8953Empty','turf8953Legend','turf8952Brand','turf8952Hero','turf8951Brand','turf8951Back','turf8951Atmosphere','ap8966screen','ap8966back','ap8966rank','ap8966coins','ap8957img','ap8958canvas','ap8959canvas','ap8962screen','ap8963screen','ap8964screen','ap8965screen','ap8963back','ap8964back','ap8965back','ap8963rank','ap8964rank','ap8965rank','ap8963coins','ap8964coins','ap8965coins'];
  ids.forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
  if(document.body){
    ['turf8951-players','turf8952-players','turf8953-players','turf8954-players','turf8967-players','turf8968-players','turf8969-players','turf8972-players','turf8972-has-rows','turf8954-has-rows','turf8969-has-rows','ap8957','ap8963','ap8963rows','ap8964','ap8964rows','ap8965','ap8965rows','ap8966','ap8966rows'].forEach(function(c){document.body.classList.remove(c)});
  }
  /* If an old V89.72 script tries to recreate its DOM later, delete it again. */
  qa('style').forEach(function(s){var t=String(s.textContent||'');if(t.indexOf('t8972-player')>=0||t.indexOf('#turf8972Screen')>=0){try{s.remove()}catch(e){}}});
}
function loadExact(){
  if(window.__TURF_ACTIVE_PLAYERS_APPROVED_EXACT_8978__)return;
  if(q('script[data-turf-exact-authority="8979"]'))return;
  var s=document.createElement('script');
  s.setAttribute('data-turf-exact-authority','8979');
  s.async=false;
  s.src='https://footballhq.github.io/footballhq-assets/v88-36/js/106-turf-active-players-approved-exact-v8978.js?v=8979-'+Date.now();
  (document.head||document.documentElement).appendChild(s);
}
function run(){kill();loadExact();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,50,120,250,500,900,1500,2500,4000].forEach(function(ms){setTimeout(run,ms)});
var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(kill,20)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
