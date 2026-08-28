/* TURF V89.80 — Active Players hard cleanup + exact-screen authority.
   Fixes the hidden Home-active state that prevented the exact renderer from
   mounting while Current Players was visibly open. */
(function(){
'use strict';
if(window.__TURF_AP_HARD_CLEANUP_8980__)return;
window.__TURF_AP_HARD_CLEANUP_8980__=true;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function overlayOpen(o){if(!o)return false;if(o.getAttribute('aria-hidden')==='true')return false;return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||o.classList.contains('show')}
function playersOpen(){var o=overlay();if(!overlayOpen(o))return false;var m=q('.fg-mode.active[data-fg-mode]',o);if(m&&m.dataset&&m.dataset.fgMode)return String(m.dataset.fgMode)==='players';return !!q('[data-fg-mode="players"].active',o)||/CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(tx(o))}
var savedHome=[];
function findHomeNodes(){var out=[];[q('#fhqSidebar'),q('.fhq-sidebar'),q('nav')].filter(Boolean).forEach(function(root){qa('.active,.selected,[aria-current="page"],[data-active="true"]',root).forEach(function(n){if(/^HOME$/i.test(tx(n).replace(/^🏠\s*/,'')))out.push(n)})});return out}
function suspendHiddenHome(){
  if(!playersOpen())return;
  findHomeNodes().forEach(function(n){
    if(savedHome.some(function(x){return x.n===n}))return;
    savedHome.push({n:n,active:n.classList.contains('active'),selected:n.classList.contains('selected'),aria:n.getAttribute('aria-current'),data:n.getAttribute('data-active')});
    n.classList.remove('active','selected');n.removeAttribute('aria-current');n.removeAttribute('data-active');
  });
}
function restoreHome(){
  if(playersOpen())return;
  savedHome.splice(0).forEach(function(x){var n=x.n;if(!n||!n.isConnected)return;if(x.active)n.classList.add('active');if(x.selected)n.classList.add('selected');if(x.aria!==null)n.setAttribute('aria-current',x.aria);if(x.data!==null)n.setAttribute('data-active',x.data)});
}
function killOld(){
  var ids=['turf8972Screen','turf8972Css','turf8954ExactBg','turf8969ExactBg','turf8953Hud','turf8953Stage','turf8953Cards','turf8953Ball','turf8953Empty','turf8953Legend','turf8952Brand','turf8952Hero','turf8951Brand','turf8951Back','turf8951Atmosphere','ap8966screen','ap8966back','ap8966rank','ap8966coins','ap8957img','ap8958canvas','ap8959canvas','ap8962screen','ap8963screen','ap8964screen','ap8965screen','ap8963back','ap8964back','ap8965back','ap8963rank','ap8964rank','ap8965rank','ap8963coins','ap8964coins','ap8965coins'];
  ids.forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
  if(document.body)['turf8951-players','turf8952-players','turf8953-players','turf8954-players','turf8967-players','turf8968-players','turf8969-players','turf8972-players','turf8972-has-rows','turf8954-has-rows','turf8969-has-rows','ap8957','ap8963','ap8963rows','ap8964','ap8964rows','ap8965','ap8965rows','ap8966','ap8966rows'].forEach(function(c){document.body.classList.remove(c)});
  qa('style').forEach(function(s){var t=String(s.textContent||'');if(t.indexOf('t8972-player')>=0||t.indexOf('#turf8972Screen')>=0){try{s.remove()}catch(e){}}});
}
function loadExact(){
  if(window.__TURF_ACTIVE_PLAYERS_APPROVED_EXACT_8978__)return;
  if(q('script[data-turf-exact-authority="8980"]'))return;
  var s=document.createElement('script');s.setAttribute('data-turf-exact-authority','8980');s.async=false;
  s.src='https://footballhq.github.io/footballhq-assets/v88-36/js/106-turf-active-players-approved-exact-v8978.js?v=8980-'+Date.now();
  (document.head||document.documentElement).appendChild(s);
}
function run(){if(playersOpen())suspendHiddenHome();else restoreHome();killOld();loadExact();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,30,80,160,320,650,1200,2200,4000].forEach(function(ms){setTimeout(run,ms)});
var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,25)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','aria-current','data-active']});
})();
