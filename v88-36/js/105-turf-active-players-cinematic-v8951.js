/* ============================================================
   TURF v89.52 — ACTIVE PLAYERS SINGLE CINEMATIC PAGE
   Presentation only. Uses the existing game overlay and native controls.
   Prevents the old destination shell + cinematic inner game from stacking.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_SINGLE_V8952__)return;
window.__TURF_ACTIVE_PLAYERS_SINGLE_V8952__=true;

var BRAND='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-app-icon-v8953.png?v=8952';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function visible(el){if(!el)return false;var s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'&&el.getClientRects().length>0}
function isOpen(){var o=overlay();if(!o)return false;return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||visible(o)}
function isPlayers(){
  var o=overlay();if(!o||!isOpen())return false;
  var active=q('.fg-mode.active[data-fg-mode]',o);if(active&&active.dataset&&active.dataset.fgMode)return active.dataset.fgMode==='players';
  var t=tx(o).toUpperCase();return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/.test(t);
}
function addCss(){
  if(q('#turf8952ActiveCss'))return;
  var s=document.createElement('style');s.id='turf8952ActiveCss';s.textContent=`
body.turf8952-players{overflow:hidden!important;background:#020812!important}
body.turf8952-players #fhqSidebar,body.turf8952-players .fhq-sidebar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8952-players #turfTopbar,body.turf8952-players #fhqMobileTopbar,body.turf8952-players #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8952-players #fhqMain,body.turf8952-players .fhq-main,body.turf8952-players .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}

body.turf8952-players #footballGameOverlay,body.turf8952-players .football-game-overlay,body.turf8952-players .fg-game-overlay{
 position:fixed!important;inset:0!important;left:0!important;right:0!important;top:0!important;bottom:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;z-index:2147482000!important;overflow:auto!important;display:block!important;
 background:
 radial-gradient(circle at 50% 24%,rgba(0,151,255,.28),transparent 31%),
 radial-gradient(circle at 13% 22%,rgba(0,110,220,.18),transparent 28%),
 radial-gradient(circle at 88% 24%,rgba(0,110,220,.15),transparent 28%),
 repeating-linear-gradient(165deg,rgba(37,168,255,.035) 0 1px,transparent 1px 40px),
 linear-gradient(180deg,#020a15 0%,#04182a 43%,#020911 100%)!important;
}
body.turf8952-players #footballGameOverlay:before,body.turf8952-players .fg-game-overlay:before{display:none!important}
body.turf8952-players #footballGameOverlay .football-game-shell{position:relative!important;inset:auto!important;transform:none!important;width:100%!important;max-width:none!important;min-height:100vh!important;margin:0!important;padding:0 0 54px!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}

/* Remove the old destination chrome so only one game page remains. */
body.turf8952-players #footballGameOverlay .fg-modes{display:none!important}
body.turf8952-players #footballGameOverlay .fg-head{position:relative!important;top:auto!important;z-index:50!important;height:76px!important;min-height:76px!important;padding:0!important;background:transparent!important;border:0!important;backdrop-filter:none!important}
body.turf8952-players #footballGameOverlay .fg-head .fg-kicker,body.turf8952-players #footballGameOverlay .fg-head .fg-title,body.turf8952-players #footballGameOverlay .fg-head .fg-subtitle{display:none!important}
body.turf8952-players #footballGameOverlay .fg-close{position:fixed!important;left:28px!important;top:22px!important;z-index:80!important;width:auto!important;min-width:144px!important;height:42px!important;margin:0!important;padding:0 17px!important;border-radius:11px!important;border:1px solid rgba(73,190,255,.5)!important;background:rgba(3,20,33,.86)!important;color:#fff!important;font-size:0!important;box-shadow:0 8px 26px rgba(0,0,0,.24)!important;backdrop-filter:blur(10px)!important}
body.turf8952-players #footballGameOverlay .fg-close:after{content:'←  BACK TO GAMES'!important;font:950 10px/1 system-ui!important;letter-spacing:.08em!important}

#turf8952Brand{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:85;display:flex;align-items:center;gap:11px;color:#fff;font:500 20px/1 system-ui;letter-spacing:.22em;pointer-events:none}
#turf8952Brand img{width:34px;height:34px;border-radius:5px;object-fit:cover;filter:drop-shadow(0 0 12px rgba(34,171,255,.42))}
#turf8952Hero{position:relative;z-index:5;min-height:285px;padding:38px 24px 4px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none}
#turf8952Hero:before,#turf8952Hero:after{content:'';position:absolute;top:8px;width:min(25vw,330px);height:300px;border-radius:46% 46% 34% 34%;background:radial-gradient(circle at 50% 17%,#071724 0 17%,transparent 17.5%),linear-gradient(108deg,transparent 12%,#06131f 13% 39%,#020810 40% 73%,transparent 74%);filter:drop-shadow(0 0 20px rgba(0,136,255,.36));opacity:.68;z-index:-1}
#turf8952Hero:before{left:8%;transform:scale(1.06) rotate(-4deg)}#turf8952Hero:after{right:8%;transform:scale(.96) rotate(5deg);opacity:.5}
#turf8952Hero .a{font:1000 clamp(54px,6.4vw,104px)/.72 Impact,'Arial Black',system-ui,sans-serif;font-style:italic;letter-spacing:-.025em;color:#f5f8fb;text-shadow:0 5px 0 #607f98,0 0 25px rgba(169,227,255,.45)}
#turf8952Hero .p{font:1000 clamp(50px,6vw,96px)/.72 Impact,'Arial Black',system-ui,sans-serif;font-style:italic;letter-spacing:-.03em;color:#18b8ff;text-shadow:0 4px 0 #0074bd,0 0 24px #00a8ff,0 0 58px rgba(0,160,255,.62)}
#turf8952Hero .s{margin-top:24px;color:#c5d2dc;font:750 15px/1.3 system-ui}

body.turf8952-players #footballGameOverlay .fg-toolbar{position:relative!important;z-index:20!important;display:flex!important;justify-content:center!important;gap:10px!important;padding:4px 20px 16px!important;margin:0!important;background:transparent!important;border:0!important}
body.turf8952-players #footballGameOverlay .fg-playtype{min-height:46px!important;padding:0 24px!important;border-radius:11px!important;background:#0a1c28!important;border:1px solid #294e61!important;color:#a8bac6!important;font-weight:900!important}
body.turf8952-players #footballGameOverlay .fg-playtype.active{background:linear-gradient(180deg,#31c8ff,#0c81c4)!important;border-color:#68dcff!important;color:#fff!important;box-shadow:0 0 24px rgba(0,176,255,.35)!important}

body.turf8952-players #footballGameOverlay .fg-body{position:relative!important;z-index:15!important;width:min(1120px,calc(100% - 48px))!important;max-width:1120px!important;margin:0 auto!important;padding:4px 0 56px!important;background:transparent!important}
body.turf8952-players #footballGameOverlay #fgSpecialGame,body.turf8952-players #footballGameOverlay .fg-special-game{position:relative!important;inset:auto!important;transform:none!important;width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:14px 0 0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
body.turf8952-players #footballGameOverlay .fg-special-title,body.turf8952-players #footballGameOverlay .fg-game-title{display:none!important}
body.turf8952-players #footballGameOverlay .fg-special-sub,body.turf8952-players #footballGameOverlay .fg-game-sub{display:none!important}
body.turf8952-players #footballGameOverlay .fg-input-row,body.turf8952-players #footballGameOverlay .fg-guess-row{width:min(860px,100%)!important;margin:8px auto 28px!important}
body.turf8952-players #footballGameOverlay #fgInput{height:60px!important;border-radius:13px 0 0 13px!important;border:1px solid #168fd0!important;background:rgba(3,20,32,.94)!important;color:#fff!important;font-size:18px!important;box-shadow:0 0 24px rgba(0,137,220,.14)!important}
body.turf8952-players #footballGameOverlay #fgGuessBtn{min-width:150px!important;height:60px!important;border-radius:0 13px 13px 0!important;border:1px solid #70ddff!important;background:linear-gradient(180deg,#31c8ff,#0876c8)!important;color:#fff!important;font-size:18px!important;font-weight:1000!important;box-shadow:0 0 26px rgba(0,178,255,.45)!important}
body.turf8952-players #footballGameOverlay table{width:100%!important;margin:0 auto!important;background:rgba(3,14,24,.85)!important;border:1px solid rgba(83,155,196,.24)!important;border-radius:14px!important;overflow:hidden!important}
body.turf8952-players #footballGameOverlay th{height:48px!important;background:rgba(9,26,37,.93)!important;color:#aebdca!important;font-size:11px!important;letter-spacing:.08em!important;text-transform:uppercase!important}
body.turf8952-players #footballGameOverlay td{border-color:rgba(94,151,184,.14)!important}

/* Remove remnants from the previous cinematic patch if a cached copy ran first. */
body.turf8952-players #turf8951Brand,body.turf8952-players #turf8951Back,body.turf8952-players #turf8951Atmosphere{display:none!important}
body.turf8952-players .turf8951-active-page{position:relative!important;inset:auto!important;z-index:auto!important;padding:14px 0 0!important;background:transparent!important;isolation:auto!important}
body.turf8952-players .turf8951-active-page:before,body.turf8952-players .turf8951-active-page:after{display:none!important}

@media(max-width:800px){#turf8952Hero:before,#turf8952Hero:after{opacity:.28}#turf8952Brand span{display:none}body.turf8952-players #footballGameOverlay .fg-close{left:14px!important;top:18px!important;min-width:118px!important;height:38px!important;padding:0 10px!important}#turf8952Brand{top:19px}#turf8952Hero{min-height:245px;padding-top:28px}body.turf8952-players #footballGameOverlay .fg-body{width:calc(100% - 24px)!important}body.turf8952-players #footballGameOverlay #fgGuessBtn{min-width:108px!important}}
`;(document.head||document.documentElement).appendChild(s);
}
function ensure(){
  addCss();var o=overlay(),on=isPlayers();document.body.classList.toggle('turf8952-players',on);if(!o)return;
  if(!on){var b=q('#turf8952Brand');if(b)b.remove();var h=q('#turf8952Hero');if(h)h.remove();return}
  if(!q('#turf8952Brand')){var b=document.createElement('div');b.id='turf8952Brand';b.innerHTML='<img src="'+BRAND+'" alt=""><span>TURF</span>';document.body.appendChild(b)}
  var shell=q('.football-game-shell',o)||o;
  if(!q('#turf8952Hero',shell)){
    var h=document.createElement('section');h.id='turf8952Hero';h.innerHTML='<div class="a">ACTIVE</div><div class="p">PLAYERS</div><div class="s">Guess the current NFL player in eight guesses.</div>';
    var toolbar=q('.fg-toolbar',shell);if(toolbar&&toolbar.parentNode)toolbar.parentNode.insertBefore(h,toolbar);else shell.insertBefore(h,shell.firstChild);
  }
  var close=q('.fg-close',o);if(close){close.setAttribute('aria-label','Back to Games');close.title='Back to Games'}
}
function schedule(){[0,40,100,220,500,900].forEach(function(ms){setTimeout(ensure,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-game-open],#footballGameOverlay,.fg-game-overlay,.fg-mode,.fg-playtype'))schedule()},true);
window.addEventListener('resize',ensure);
var z;new MutationObserver(function(){clearTimeout(z);z=setTimeout(ensure,35)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','style']});
})();
