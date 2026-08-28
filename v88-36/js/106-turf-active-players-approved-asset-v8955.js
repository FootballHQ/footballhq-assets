/* TURF v89.55 — Active Players approved artwork asset fix */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_APPROVED_ASSET_V8955__)return;
window.__TURF_ACTIVE_PLAYERS_APPROVED_ASSET_V8955__=true;
var ART='https://footballhq.github.io/footballhq-assets/v88-36/brand/active-players-approved-v8955.webp?v=8955';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function apply(){
  if(!document.body.classList.contains('turf8954-players'))return;
  var bg=q('#turf8954ExactBg');
  if(bg){
    bg.style.setProperty('display','block','important');
    bg.style.setProperty('opacity','1','important');
    bg.style.setProperty('background-image','url("'+ART+'")','important');
    bg.style.setProperty('background-size','100% 100%','important');
    bg.style.setProperty('background-position','center','important');
    bg.style.setProperty('background-repeat','no-repeat','important');
  }
  var o=q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay');
  if(!o)return;
  qa('*',o).forEach(function(el){
    if(el.id==='turf8954ExactBg'||el.id==='turf8954RankLive'||el.id==='turf8954CoinsLive'||el.id==='turf8954Back')return;
    if(el.closest&&el.closest('#turf8954RankLive,#turf8954CoinsLive,#turf8954Back'))return;
    var t=txt(el);
    if(t==='Guess the current NFL fantasy player.'||t==='Guess the current NFL player in eight guesses.'){
      el.style.setProperty('visibility','hidden','important');
    }
  });
}
function schedule(){[0,40,120,300,700,1400].forEach(function(ms){setTimeout(apply,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',schedule,true);
window.addEventListener('resize',apply);
var z;new MutationObserver(function(){clearTimeout(z);z=setTimeout(apply,40)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
})();
