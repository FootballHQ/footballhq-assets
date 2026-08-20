/* TURF V89.20 — authoritative favicon bridge */
(function(){
'use strict';
if(window.__TURF_V8920_FAVICON__)return;
window.__TURF_V8920_FAVICON__=true;
var ICON='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-mark.svg?v=8920';
function apply(){
  try{
    Array.prototype.slice.call(document.querySelectorAll('link[rel~="icon"],link[rel="shortcut icon"]')).forEach(function(x){x.remove()});
    var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=ICON;document.head.appendChild(l);
    document.title='TURF';
  }catch(e){}
  try{window.top.postMessage({type:'turf-favicon',href:ICON,title:'TURF',version:'8920'},'*')}catch(e){}
}
apply();
[250,800,1800,4000].forEach(function(ms){setTimeout(apply,ms)});
})();
