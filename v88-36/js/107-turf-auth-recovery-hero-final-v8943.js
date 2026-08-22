/* TURF v89.43 — stale recovery cleanup + exact home hero width */
(function(){
'use strict';
if(window.__TURF_V8943_FINAL__)return;
window.__TURF_V8943_FINAL__=true;

function cleanupRecovery(){
  var nodes=document.querySelectorAll('body *');
  for(var i=0;i<nodes.length;i++){
    var el=nodes[i];
    if(!el||!el.textContent)continue;
    var t=String(el.textContent).replace(/\s+/g,' ').trim();
    if(t==='Recovering your Football HQ account…'||t==='Recovering your Football HQ account...'||t==='Restoring your TURF account…'||t==='Restoring your TURF account...'){
      var p=el;
      while(p&&p!==document.body){
        var cs;
        try{cs=getComputedStyle(p)}catch(e){cs=null}
        if(cs&&(cs.position==='fixed'||cs.position==='absolute')&&p.getBoundingClientRect().width>window.innerWidth*.5){
          p.style.setProperty('display','none','important');
          p.setAttribute('aria-hidden','true');
          break;
        }
        p=p.parentElement;
      }
    }
  }
}

function alignHero(){
  var home=document.getElementById('fhqHome');
  if(!home)return;
  var inner=home.querySelector('.fhq-home-inner');
  var hero=home.querySelector('.fhq-hero');
  if(!inner||!hero)return;
  inner.style.setProperty('max-width','none','important');
  inner.style.setProperty('width','100%','important');
  inner.style.setProperty('box-sizing','border-box','important');
  hero.style.setProperty('width','100%','important');
  hero.style.setProperty('max-width','none','important');
  hero.style.setProperty('box-sizing','border-box','important');
  hero.style.setProperty('margin-left','0','important');
  hero.style.setProperty('margin-right','0','important');
}

function apply(){cleanupRecovery();alignHero();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,300,700,1200,2000,3500,6000].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('resize',alignHero);
window.addEventListener('turf:auth-ready',function(){setTimeout(apply,0);setTimeout(apply,250)});
try{document.addEventListener('turf:auth-ready',function(){setTimeout(apply,0)})}catch(e){}
})();
