/* ============================================================
   TURF V89.29 — NAV CLEANUP + H2H BACKEND BRIDGE
   Live safety update:
   - Keep existing sign-in/auth logic untouched
   - Release stale post-auth interaction locks
   - Restore Cases / Trivia Tac Toe / 4 in a Row under Trials if removed
   - Preserve existing H2H bridge
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8929__) return; window.__TURF_V8929__=true;
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function txt(e){return String(e&&e.textContent||'').replace(/\s+/g,' ').trim()}
function norm(e){return txt(e).toLowerCase()}
function svgTac(){return '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5v22M21 5v22M5 11h22M5 21h22" stroke="#55D6FF" stroke-width="2.2" stroke-linecap="round"/><circle cx="8" cy="8" r="2" fill="#55D6FF"/><path d="M23.5 23.5l3 3m0-3l-3 3" stroke="#55D6FF" stroke-width="2" stroke-linecap="round"/></svg>'}
function svgCases(){return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4 11h16M10 13h4"/></svg>'}
function svgFour(){return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="2.4"/><circle cx="12" cy="10" r="2.4"/><circle cx="16" cy="14" r="2.4"/><circle cx="12" cy="18" r="2.4"/></svg>'}

function releaseInteraction(){
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
  ['turfAuthGate','turfGoogleButton'].forEach(function(id){var el=document.getElementById(id);if(el)try{el.classList.add('turf-auth-hidden');el.setAttribute('aria-hidden','true');el.style.setProperty('display','none','important');el.style.setProperty('pointer-events','none','important')}catch(e){}});
}

function trialsButton(){
  var direct=q('#turfTrialsNav');if(direct)return direct;
  var sidebar=q('#fhqSidebar')||document;
  var all=qa('button,a,[role="button"]',sidebar).filter(function(el){return /(^|\s)trials(\s|$)/i.test(txt(el))});
  return all[0]||null;
}
function launch(id){
  var b=q('#turfV8911Root [data-turf-new="'+id+'"]')||q('[data-turf-new="'+id+'"]');
  if(b){b.click();return true}
  return false;
}
function ensureCompetitiveNav(){
  var trials=trialsButton();if(!trials)return;
  var wrap=q('#turfTrialsCompetitiveLinks');
  if(!wrap){wrap=document.createElement('div');wrap.id='turfTrialsCompetitiveLinks';trials.insertAdjacentElement('afterend',wrap)}
  wrap.style.setProperty('display','flex','important');
  wrap.style.setProperty('flex-direction','column','important');
  wrap.style.setProperty('width','100%','important');
  wrap.style.setProperty('margin','0','important');
  wrap.style.setProperty('padding','0','important');
  var spec=[
    ['deal','Cases',svgCases(),'#f4c95f'],
    ['ttt','Trivia Tac Toe',svgTac(),'#55D6FF'],
    ['connect4','4 in a Row',svgFour(),'#ff6b72']
  ];
  spec.forEach(function(s){
    var b=q('[data-comp-game="'+s[0]+'"]',wrap);
    if(!b){b=document.createElement('button');b.type='button';b.className='turf-comp-nav';b.setAttribute('data-comp-game',s[0]);wrap.appendChild(b)}
    b.innerHTML='<span class="turf-comp-icon" aria-hidden="true">'+s[2]+'</span><span>'+s[1]+'</span>';
    b.style.setProperty('display','flex','important');
    b.style.setProperty('align-items','center','important');
    b.style.setProperty('gap','10px','important');
    b.style.setProperty('width','100%','important');
    b.style.setProperty('min-height','45px','important');
    b.style.setProperty('padding','6px 14px','important');
    b.style.setProperty('border','0','important');
    b.style.setProperty('background','transparent','important');
    b.style.setProperty('color','#dce8ef','important');
    b.style.setProperty('font','800 12px/1.1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif','important');
    b.style.setProperty('text-align','left','important');
    b.style.setProperty('cursor','pointer','important');
    var icon=q('.turf-comp-icon',b);if(icon){icon.style.setProperty('display','grid','important');icon.style.setProperty('place-items','center','important');icon.style.setProperty('width','30px','important');icon.style.setProperty('height','30px','important');icon.style.setProperty('flex','0 0 30px','important');icon.style.setProperty('color',s[3],'important')}
    b.onclick=function(e){e.preventDefault();e.stopPropagation();releaseInteraction();launch(s[0])};
  });
  if(wrap.previousElementSibling!==trials)trials.insertAdjacentElement('afterend',wrap);
}
function navFix(){
  ensureCompetitiveNav();
  var box=q('#turfTrialsCompetitiveLinks,#turfCompetitiveGames,#turfCompetitiveSubnav,[data-turf-competitive-games]');
  if(box){var ttt=q('[data-comp-game="ttt"]',box);if(ttt){var icon=q('.turf-comp-icon',ttt);if(icon&&!q('svg',icon))icon.innerHTML=svgTac()}}
  var pass=qa('button,a,[role="button"],div').find(function(el){return /^TURF Pass(?:\s*PASS)?$/i.test(txt(el))&&el.children.length<8});
  if(pass){
    var imgs=qa('img,svg',pass).filter(function(el){var r=el.getBoundingClientRect();return r.width>=16&&r.width<=64&&r.height>=16&&r.height<=64});if(imgs.length>1)imgs.slice(0,-1).forEach(function(el){el.style.setProperty('display','none','important')});
    var iconWraps=qa('span,div',pass).filter(function(el){return el.children.length===1&&(q('img',el)||q('svg',el))&&el.getBoundingClientRect().width<70});if(iconWraps.length>1)iconWraps.slice(0,-1).forEach(function(el){el.style.setProperty('display','none','important')});
  }
}

/* Real H2H bridge. The launcher in v89.24/v89.25 already calls this hook when present. */
if(typeof window.turfH2HFindMatch!=='function'){
  window.turfH2HFindMatch=function(gameId,onMatch){
    if(!(window.google&&google.script&&google.script.run)) return false;
    var token='h2h_'+Date.now()+'_'+Math.random().toString(36).slice(2,10);window.__TURF_H2H_TOKEN__=token;
    function poll(){
      if(window.__TURF_H2H_TOKEN__!==token)return;
      try{google.script.run.withSuccessHandler(function(res){if(window.__TURF_H2H_TOKEN__!==token)return;if(res&&res.matched){var match={matchId:res.matchId,opponentName:res.opponentName||'Opponent',opponentId:res.opponentId||'',gameId:gameId};match.start=function(){window.dispatchEvent(new CustomEvent('turf:h2h:matched',{detail:match}))};onMatch(match);return}setTimeout(poll,1600)}).withFailureHandler(function(){setTimeout(poll,2200)}).turfH2HJoinOrPoll(String(gameId||''),token)}catch(e){setTimeout(poll,2200)}
    }
    poll();return true;
  };
  window.turfH2HCancel=function(){var token=window.__TURF_H2H_TOKEN__;window.__TURF_H2H_TOKEN__='';try{if(token&&window.google&&google.script&&google.script.run)google.script.run.turfH2HCancel(token)}catch(e){}};
}
function run(){releaseInteraction();navFix()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
window.addEventListener('turf:auth-ready',function(){run();[80,220,600,1400].forEach(function(ms){setTimeout(run,ms)})});
[100,300,700,1400,2600,5000,8000].forEach(function(ms){setTimeout(run,ms)});
new MutationObserver(function(){clearTimeout(window.__v8929mo);window.__v8929mo=setTimeout(run,70)}).observe(document.documentElement,{childList:true,subtree:true});
})();
