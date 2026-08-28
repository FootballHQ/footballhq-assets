/* TURF v89.56 — exact approved Active Players artwork, full source */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_EXACT_ART_V8956__)return;
window.__TURF_ACTIVE_PLAYERS_EXACT_ART_V8956__=true;
var DATA='https://footballhq.github.io/footballhq-assets/v88-36/brand/active-players-exact-v8956.webp.b64?v=8956';
var cached='';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function isOn(){return document.body&&document.body.classList.contains('turf8954-players')}
function apply(src){
  if(!isOn())return;
  var bg=q('#turf8954ExactBg');
  if(!bg)return;
  bg.style.setProperty('display','block','important');
  bg.style.setProperty('visibility','visible','important');
  bg.style.setProperty('opacity','1','important');
  bg.style.setProperty('position','fixed','important');
  bg.style.setProperty('inset','0','important');
  bg.style.setProperty('width','100vw','important');
  bg.style.setProperty('height','100vh','important');
  bg.style.setProperty('z-index','2','important');
  bg.style.setProperty('pointer-events','none','important');
  bg.style.setProperty('background-image','url("'+src+'")','important');
  bg.style.setProperty('background-size','100% 100%','important');
  bg.style.setProperty('background-position','center','important');
  bg.style.setProperty('background-repeat','no-repeat','important');
  var shell=q('#footballGameOverlay .football-game-shell')||q('.football-game-shell');
  if(shell){shell.style.setProperty('background','transparent','important');shell.style.setProperty('z-index','1','important')}
}
function load(){
  if(cached){apply(cached);return}
  fetch(DATA,{cache:'no-store',mode:'cors'}).then(function(r){if(!r.ok)throw Error(r.status);return r.text()}).then(function(t){
    t=t.replace(/\s+/g,'');
    if(!/^UklGR/.test(t))throw Error('bad art data');
    cached='data:image/webp;base64,'+t;
    apply(cached);
  }).catch(function(e){console.error('TURF exact Active Players art failed',e)});
}
function run(){if(isOn())load()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,80,200,500,1000,1800,3000].forEach(function(ms){setTimeout(run,ms)});
document.addEventListener('click',function(){setTimeout(run,50)},true);
var z;new MutationObserver(function(){clearTimeout(z);z=setTimeout(run,50)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
})();
