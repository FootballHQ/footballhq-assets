/* TURF v89.68 — immutable approved visual loader + Worker auth handoff.
   The visual implementation is loaded byte-for-byte from the approved 8962
   checkpoint. This file adds no presentation changes. */
(function(){
'use strict';
if(window.__TURF_8962_IMMUTABLE_LOADER__)return;
window.__TURF_8962_IMMUTABLE_LOADER__=true;
var ROOT='https://raw.githubusercontent.com/FootballHQ/footballhq-assets/2f2c62c8818edcb389e9e652a3be10f59e3a4ca4/';
function load(src,id,next){
  if(document.querySelector('script[data-turf-8962-loader="'+id+'"]')){if(next)next();return}
  var s=document.createElement('script');s.src=src;s.async=false;s.setAttribute('data-turf-8962-loader',id);
  s.onload=function(){if(next)next()};s.onerror=function(){try{console.error('TURF loader failed: '+id)}catch(e){}if(next)next()};
  (document.head||document.documentElement).appendChild(s);
}
load(ROOT+'v88-36/js/47-turf-batch2-visual-v8897.js?v=8962-immutable','approved-8962',function(){
  load('https://footballhq.github.io/footballhq-assets/v88-36/js/110-turf-worker-auth-profile-v8968.js?v=8968','worker-auth-8968');
});
})();
