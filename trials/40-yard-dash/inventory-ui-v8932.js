/* TURF 40-YARD DASH V89.32 — owned-card selector cleanup */
(function(){
'use strict';
if(window.__TURF_40YD_INV_8932__)return;window.__TURF_40YD_INV_8932__=true;
function clean(){
  var strip=document.getElementById('owned-card-strip');if(!strip)return;
  var seen=new Set(),unique=0;
  Array.prototype.slice.call(strip.querySelectorAll('[data-card]')).forEach(function(btn){
    var id=String(btn.getAttribute('data-card')||'').trim().toLowerCase();
    if(!id)return;
    if(seen.has(id)){btn.remove();return}
    seen.add(id);unique++;
  });
  var status=document.getElementById('owned-status');if(status&&unique)status.textContent=unique+' unique owned';
}
function boot(){clean();var strip=document.getElementById('owned-card-strip');if(strip)new MutationObserver(function(){clean()}).observe(strip,{childList:true,subtree:false})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
[100,350,800,1600].forEach(function(ms){setTimeout(clean,ms)});
})();