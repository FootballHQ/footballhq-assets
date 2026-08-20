/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   V89.18 Home 2.0 is now the authoritative presentation layer.
   This file remains at the original URL so the existing Apps Script
   Index does not need another manual script-tag change.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8918__)return;
window.__TURF_V8897_ENTRY_8918__=true;

var src='https://footballhq.github.io/footballhq-assets/v88-36/js/88-turf-home2-v8918.js?v=8918';
var existing=document.querySelector('script[data-turf-home2="8918"]');
if(existing)return;
var s=document.createElement('script');
s.src=src;
s.async=false;
s.dataset.turfHome2='8918';
s.onload=function(){try{console.log('TURF Home 2.0 v89.18 loaded')}catch(e){}};
s.onerror=function(){try{console.error('TURF Home 2.0 failed to load')}catch(e){}};
(document.head||document.documentElement).appendChild(s);
})();
