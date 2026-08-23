/* TURF static migration — keep Editor pointed at the known working editor URL. */
(function(){
'use strict';
if(window.__TURF_STATIC_EDITOR_LINK__) return;
window.__TURF_STATIC_EDITOR_LINK__=true;

var EDITOR_URL='https://script.google.com/macros/s/AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ/exec?key=6I17pf3uZo9DMMqlGTA2FhbbS-4Lk78E';

function norm(s){return String(s||'').replace(/\s+/g,' ').trim().toLowerCase()}
function isEditor(el){
  if(!el) return false;
  var txt=norm(el.textContent||el.getAttribute&&el.getAttribute('aria-label')||'');
  var id=norm(el.id||'');
  var cls=norm(el.className||'');
  return txt==='editor'||txt.indexOf('editor')>=0||id.indexOf('editor')>=0||cls.indexOf('editor')>=0;
}
function wire(){
  var all=document.querySelectorAll('a,button,[role="button"]');
  for(var i=0;i<all.length;i++){
    var el=all[i]; if(!isEditor(el)) continue;
    if(el.tagName==='A'){
      el.href=EDITOR_URL;
      el.target='_blank';
      el.rel='noopener noreferrer';
    }
    if(el.dataset.turfEditorWired==='1') continue;
    el.dataset.turfEditorWired='1';
    el.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      window.open(EDITOR_URL,'_blank','noopener,noreferrer');
    },true);
  }
}
function boot(){wire();[100,300,700,1400,2600,5000].forEach(function(ms){setTimeout(wire,ms)});if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(wire,80)}).observe(document.documentElement,{childList:true,subtree:true})}}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
