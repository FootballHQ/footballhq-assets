/* TURF static proof: load the exact current visual authorities used by .com.
   Captures/restores auth token because v89.62 visual entrypoint clears its legacy storage key. */
(function(){
'use strict';
if(window.__TURF_STATIC_CURRENT_VISUAL_AUTHORITY__)return;
window.__TURF_STATIC_CURRENT_VISUAL_AUTHORITY__=true;
var token='';
try{token=String(window.__TURF_AUTH_TOKEN__||localStorage.getItem('turfAuthAccountTokenV1')||'')}catch(e){}
var base='https://footballhq.github.io/footballhq-assets/v88-36/js/';
var files=[
 ['47-turf-batch2-visual-v8897.js?v=8962','47'],
 ['48-turf-shell-v8898.js?v=8898','48'],
 ['49-turf-hi-fi-v8899.js?v=8899','49'],
 ['100-turf-final-logo-v8934.js?v=8934','100'],
 ['101-turf-brand-authority-v8936.js?v=8936','101']
];
function restore(){
 try{if(token){window.__TURF_AUTH_TOKEN__=token;localStorage.setItem('turfAuthAccountTokenV1',token)}}catch(e){}
 try{if(window.__TURF_AUTH_PROFILE__&&token)window.__TURF_AUTH_PROFILE__.token=token}catch(e){}
}
function load(i){
 if(i>=files.length){restore();[0,100,300,700,1400,2600].forEach(function(ms){setTimeout(restore,ms)});return}
 var f=files[i],sel='script[data-turf-current-authority="'+f[1]+'"]';
 if(document.querySelector(sel)){restore();load(i+1);return}
 var s=document.createElement('script');s.async=false;s.src=base+f[0];s.setAttribute('data-turf-current-authority',f[1]);
 s.onload=function(){restore();load(i+1)};s.onerror=function(){restore();load(i+1)};(document.head||document.documentElement).appendChild(s);
}
restore();load(0);
})();
