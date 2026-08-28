/* ============================================================
   TURF ACTIVE PLAYERS — RETIRED PROTOTYPE SHIM
   This filename is retained because the live Apps Script already requests it.
   It MUST NOT draw a prototype. It now launches the authoritative exact
   approved Active Players implementation instead.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_EXACT_SHIM_8979__)return;
window.__TURF_ACTIVE_PLAYERS_EXACT_SHIM_8979__=true;
try{
  ['turf8972Screen','turf8954ExactBg','turf8969ExactBg','turf8953Hud','turf8953Stage','turf8953Cards','turf8953Ball','turf8953Empty','turf8953Legend','turf8952Brand','turf8952Hero','turf8951Brand','turf8951Back','turf8951Atmosphere','turf8954Back','turf8954RankLive','turf8954CoinsLive','turf8954ResultsCover'].forEach(function(id){var n=document.getElementById(id);if(n)n.remove()});
  ['turf8972Css','turf8954Css','turf8969Css','turf8953Css','turf8952Css','turf8951Css'].forEach(function(id){var n=document.getElementById(id);if(n)n.remove()});
  if(document.body){['turf8972-players','turf8972-has-rows','turf8954-players','turf8954-has-rows','turf8969-players','turf8969-has-rows','turf8953-players','turf8952-players','turf8951-players'].forEach(function(c){document.body.classList.remove(c)})}
}catch(e){}
var old=document.querySelector('script[data-turf-active-exact-authority]');
if(old)try{old.remove()}catch(e){}
var s=document.createElement('script');
s.setAttribute('data-turf-active-exact-authority','8979');
s.src='https://footballhq.github.io/footballhq-assets/v88-36/js/106-turf-active-players-approved-exact-v8978.js?v=8979-'+Date.now();
s.async=false;
(document.head||document.documentElement).appendChild(s);
})();
