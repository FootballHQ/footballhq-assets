/* TURF V89.67 — legacy Active Players compatibility cleanup only.
   The exact Active Players screen is owned by 105-turf-active-players-cinematic-v8951.js.
   Do not mount a second background or duplicate controls here. */
(function(){
'use strict';
if(window.__TURF_AP_LEGACY_CLEANUP_8967__)return;
window.__TURF_AP_LEGACY_CLEANUP_8967__=true;
function q(s){try{return document.querySelector(s)}catch(e){return null}}
function qa(s){try{return Array.prototype.slice.call(document.querySelectorAll(s))}catch(e){return []}}
function cleanup(){
  ['ap8966screen','ap8966back','ap8966rank','ap8966coins','ap8957img','ap8958canvas','ap8959canvas','ap8962screen','ap8963screen','ap8964screen','ap8965screen','ap8963back','ap8964back','ap8965back','ap8963rank','ap8964rank','ap8965rank','ap8963coins','ap8964coins','ap8965coins'].forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
  document.body.classList.remove('ap8957','ap8963','ap8963rows','ap8964','ap8964rows','ap8965','ap8965rows','ap8966','ap8966rows');
  var s=q('#ap8966css');if(s)try{s.remove()}catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',cleanup,{once:true});else cleanup();
setTimeout(cleanup,100);setTimeout(cleanup,500);
})();
