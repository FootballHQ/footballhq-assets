/* TURF static proof: load presentation-only visual authorities used by current .com.
   IMPORTANT: no auth entrypoint, no storage writes, no page-routing code. */
(function(){
'use strict';
if(window.__TURF_STATIC_CURRENT_VISUAL_AUTHORITY_V2__)return;
window.__TURF_STATIC_CURRENT_VISUAL_AUTHORITY_V2__=true;
var base='https://footballhq.github.io/footballhq-assets/v88-36/js/';
var files=[
 ['48-turf-shell-v8898.js?v=8898','48'],
 ['49-turf-hi-fi-v8899.js?v=8899','49'],
 ['100-turf-final-logo-v8934.js?v=8934','100'],
 ['101-turf-brand-authority-v8936.js?v=8936','101']
];
function load(i){
 if(i>=files.length)return;
 var f=files[i],sel='script[data-turf-current-authority="'+f[1]+'"]';
 if(document.querySelector(sel)){load(i+1);return}
 var s=document.createElement('script');s.async=false;s.src=base+f[0];s.setAttribute('data-turf-current-authority',f[1]);
 s.onload=function(){load(i+1)};s.onerror=function(){try{console.error('TURF visual authority '+f[1]+' failed')}catch(e){}load(i+1)};
 (document.head||document.documentElement).appendChild(s);
}
load(0);
})();
