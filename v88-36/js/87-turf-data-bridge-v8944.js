/* TURF V89.44 — DATA BRIDGE + FINAL ATOMIC GUARDS */
(function(){
'use strict';
if(window.__TURF_V8944_BRIDGE__)return;window.__TURF_V8944_BRIDGE__=true;
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function t(e){return String(e&&e.textContent||'').replace(/\s+/g,' ').trim()}
function v(e){if(!e)return false;var s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getClientRects().length>0}
function root(){return qa('#fgSpecialGame,#fgGridGame,#footballGameOverlay,[role="dialog"]').find(v)||document.body}
function game(){var x=t(root()).toUpperCase();if(x.indexOf('HIGHER / LOWER')>=0||x.indexOf('HIGHER/LOWER')>=0)return'hl';if(x.indexOf('WHO AM I?')>=0)return'who';if(/\bGRID\b/.test(x))return'grid';return''}

function atomic(){var g=game(),r=root();if(g==='hl'){qa('button,[role="button"]',r).forEach(function(b){if(t(b).replace(/✓/g,'').trim().toUpperCase()==='PLAY')b.remove()})}
 if(g==='who'){qa('button,[role="button"]',r).forEach(function(b){if(/^GIVE UP$/i.test(t(b)))b.remove()});var rev=qa('button,[role="button"]',r).filter(function(b){return /REVEAL NEXT HINT/i.test(t(b))});rev.slice(1).forEach(function(b){b.remove()})}}

/* Restore the shared Daily / Unlimited controls if a late renderer hides them. */
function restoreModeTabs(){
 var r=root();if(r===document.body)return;
 var d=q('#fgDailyBtn',r)||q('#fgDailyBtn'),u=q('#fgUnlimitedBtn',r)||q('#fgUnlimitedBtn');
 if(!d||!u){
  qa('button,[role="button"]',r).forEach(function(b){
   var x=t(b).replace(/✓/g,'').trim().toUpperCase();
   if(!d&&x==='DAILY'){d=b;d.id='fgDailyBtn'}
   if(!u&&x==='UNLIMITED'){u=b;u.id='fgUnlimitedBtn'}
  });
 }
 if(!d||!u)return;
 [d,u].forEach(function(b){
  b.hidden=false;b.removeAttribute('hidden');b.removeAttribute('aria-hidden');
  b.style.setProperty('display','inline-flex','important');
  b.style.setProperty('visibility','visible','important');
  b.style.setProperty('opacity','1','important');
  b.style.setProperty('pointer-events','auto','important');
 });
 var p=d.parentElement;if(p&&p===u.parentElement){
  p.hidden=false;p.removeAttribute('hidden');p.removeAttribute('aria-hidden');
  p.style.setProperty('display','flex','important');
  p.style.setProperty('visibility','visible','important');
  p.style.setProperty('opacity','1','important');
 }
}

var lastQuery='',lastAt=0;
function historicalGrid(){if(game()!=='grid'||!window.google||!google.script||!google.script.run)return;var input=q('#fgInput'),box=q('#fgSuggestions');if(!input||!box)return;var query=String(input.value||'').trim();if(query.length<2||query===lastQuery&&Date.now()-lastAt<600)return;lastQuery=query;lastAt=Date.now();
 google.script.run.withSuccessHandler(function(res){if(!res||!res.ok||!Array.isArray(res.players))return;var existing={};qa('.fg-suggestion,[data-name]',box).forEach(function(e){existing[String(e.getAttribute('data-name')||t(e).split(' • ')[0]).toLowerCase()]=1});res.players.forEach(function(p){var k=String(p.name||'').toLowerCase();if(!p.name||existing[k])return;existing[k]=1;var d=document.createElement('div');d.className='fg-suggestion turf8944-historical';d.setAttribute('data-name',p.name);d.textContent=p.name+(p.teams&&p.teams.length?' • '+p.teams.join('/'):'')+(p.positions&&p.positions.length?' • '+p.positions.join('/'):'');d.onmousedown=function(e){e.preventDefault()};d.onclick=function(){input.value=p.name;box.innerHTML='';box.classList.remove('show','open');input.dispatchEvent(new Event('change',{bubbles:true}))};box.appendChild(d)});if(box.children.length)box.classList.add('show')}).turfV8944GridSearch(query)}

function run(){atomic();restoreModeTabs();historicalGrid()}
document.addEventListener('input',function(e){if(e.target&&e.target.id==='fgInput')setTimeout(historicalGrid,50)},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
var z=0;new MutationObserver(function(m){if(!m.some(function(x){return x.addedNodes&&x.addedNodes.length||x.removedNodes&&x.removedNodes.length}))return;clearTimeout(z);z=setTimeout(run,25)}).observe(document.documentElement,{childList:true,subtree:true});
setInterval(function(){atomic();restoreModeTabs()},500);
})();
