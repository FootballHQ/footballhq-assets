/* ============================================================
   TURF V89.19 — HOME 2.0 CLEANUP PASS (ROOT-CONFLICT FIX)
   Presentation only. No account/game/card logic changes.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8919_HOME2B__)return;
window.__TURF_V8919_HOME2B__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var WORD=ROOT+'turf-wordmark.svg?v=8933';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  var old=q('#turfV8919Home2bCss');if(old)old.remove();
  var st=document.createElement('style');st.id='turfV8919Home2bCss';
  st.textContent=`
    /* HERO — exactly one TURF lockup */
    #turfV8918Brand{display:block!important;width:min(470px,82%)!important;margin:0 0 18px!important}
    #turfV8918Brand .turf-v8918-mark{display:none!important}
    #turfV8918Brand .turf-v8918-word{display:block!important;width:100%!important;max-width:470px!important;height:auto!important;object-fit:contain!important;object-position:left center!important;filter:drop-shadow(0 8px 24px rgba(0,0,0,.25))!important}
    #turfV8918Tag{display:none!important}

    /* ROOT FIX: old v89.19 image was re-injected by its MutationObserver and beat later patches. */
    #fhqSidebar .fhq-brand{gap:13px!important;padding:18px 20px!important;min-height:100px!important}
    #fhqSidebar .fhq-brand-mark{position:relative!important;width:56px!important;height:56px!important;min-width:56px!important;flex:0 0 56px!important;border-radius:13px!important;background:linear-gradient(145deg,#0a1b28,#06111a)!important;background-image:none!important;border:1px solid rgba(44,170,229,.32)!important;box-shadow:inset 0 0 14px rgba(35,153,209,.10),0 7px 18px rgba(0,0,0,.30)!important;filter:none!important;overflow:hidden!important}
    #fhqSidebar .fhq-brand-mark>svg,#fhqSidebar .fhq-brand-mark>img,#fhqSidebar .fhq-brand-mark .turf-v8919-side-mark{display:none!important}
    #fhqSidebar .fhq-brand-mark:before{display:none!important;content:none!important}
    #fhqSidebar .fhq-brand-mark:after{content:'T'!important;position:absolute!important;inset:0!important;display:grid!important;place-items:center!important;font-family:Arial Black,Arial,sans-serif!important;font-size:37px!important;font-style:italic!important;font-weight:950!important;line-height:1!important;color:#aeb7bf!important;transform:skewX(-14deg) rotate(-4deg)!important;-webkit-text-stroke:2px #05090d!important;text-shadow:-2px 0 #159fe7,2px 0 #159fe7,0 -2px #159fe7,0 2px #159fe7,0 0 8px rgba(48,190,255,.70),4px 5px 2px rgba(0,0,0,.72)!important}
    #fhqSidebar .fhq-brand-copy{font-size:25px!important;line-height:1!important;letter-spacing:.035em!important}
    #fhqSidebar .fhq-brand-copy small{font-size:7px!important;line-height:1.2!important;margin-top:7px!important;letter-spacing:.14em!important}

    /* Same slanted T in the top-right profile button. */
    #turfTopbar .turf-top-profile{position:relative!important;overflow:hidden!important;background:linear-gradient(145deg,#0a1b28,#06111a)!important}
    #turfTopbar .turf-top-profile img,#turfTopbar .turf-top-profile svg{display:none!important}
    #turfTopbar .turf-top-profile:before{content:'T'!important;position:absolute!important;inset:0!important;display:grid!important;place-items:center!important;font-family:Arial Black,Arial,sans-serif!important;font-size:26px!important;font-style:italic!important;font-weight:950!important;color:#aeb7bf!important;transform:skewX(-14deg) rotate(-4deg)!important;-webkit-text-stroke:1.5px #05090d!important;text-shadow:-1px 0 #159fe7,1px 0 #159fe7,0 -1px #159fe7,0 1px #159fe7,0 0 7px rgba(48,190,255,.70),3px 3px 1px rgba(0,0,0,.68)!important}

    /* ROOT FIX: these are ONLY the duplicate Shop/Locker balance cards. Top bar uses turf-top-wallet. */
    .fhq-shop-wallet{display:none!important;visibility:hidden!important;width:0!important;height:0!important;min-width:0!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;overflow:hidden!important;pointer-events:none!important}
    #fhqShopCoins,#fhqLockerCoins{display:none!important}

    /* COMPETITIVE SUBMENU */
    #turfTrialsCompetitiveLinks{box-sizing:border-box!important;width:auto!important;max-width:none!important;margin:4px 10px 10px 10px!important;padding:3px 0 3px 6px!important;overflow:visible!important}
    #turfTrialsCompetitiveLinks .turf-comp-nav{box-sizing:border-box!important;width:100%!important;max-width:none!important;min-width:0!important;padding:7px 8px!important;gap:9px!important;overflow:visible!important;white-space:nowrap!important;text-overflow:clip!important;font-size:11px!important}
    #turfTrialsCompetitiveLinks .turf-comp-nav>span:last-child{display:block!important;min-width:0!important;max-width:none!important;overflow:visible!important;white-space:nowrap!important;text-overflow:clip!important}
    #turfTrialsCompetitiveLinks .turf-comp-icon{width:25px!important;height:25px!important;flex:0 0 25px!important}

    /* DAILY REWARDS */
    #fhqHome .fhq-daily-reward{grid-template-columns:136px minmax(0,1fr) 126px!important;gap:20px!important;min-height:176px!important;padding:18px 20px!important}
    #fhqHome .fhq-daily-reward .icon{display:none!important}
    #fhqHome .fhq-daily-reward>img{grid-column:1!important;width:122px!important;height:122px!important;max-width:122px!important;max-height:122px!important;object-fit:contain!important;align-self:center!important;justify-self:center!important;border-radius:14px!important;background:transparent!important;filter:none!important}
    #fhqHome .fhq-daily-reward button{grid-column:3!important;align-self:center!important}

    /* Safari broken image label */
    #fhqHome .turf-v8919-broken-image,#fhqHome img[alt='TURF']:not(.turf-v8918-word),#fhqHome img[title='TURF']{display:none!important;width:0!important;height:0!important;position:absolute!important;pointer-events:none!important}

    #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"] .turf-v8918-stat-icon{display:grid!important}
    #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"]>img,#fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"] .fhq-coin-icon,#fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"] .turf-stat-art,#fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"]>.icon{display:none!important}
  `;
  (document.body||document.documentElement).appendChild(st);
}
function fixHero(){var brand=q('#turfV8918Brand');if(!brand)return;var word=q('.turf-v8918-word',brand);if(word){word.src=WORD;word.alt='TURF'}qa('.turf-v8918-mark',brand).forEach(function(x){x.style.display='none'})}
function fixSidebarBrand(){
  var box=q('#fhqSidebar .fhq-brand-mark');if(box)qa('.turf-v8919-side-mark,img,svg',box).forEach(function(x){x.remove()});
  var copy=q('#fhqSidebar .fhq-brand-copy');if(copy){var small=q('small',copy);Array.prototype.slice.call(copy.childNodes).forEach(function(n){if(n.nodeType===3&&String(n.nodeValue||'').trim())n.nodeValue='TURF'});if(small)small.textContent='COMPETE • COLLECT • CLIMB'}
}
function fixCompLabels(){var wrap=q('#turfTrialsCompetitiveLinks');if(!wrap)return;var names={deal:'Cases',ttt:'Trivia Tac Toe',connect4:'4 in a Row'};Object.keys(names).forEach(function(k){var b=q('[data-comp-game="'+k+'"]',wrap);if(!b)return;var spans=qa('span',b);if(spans.length)spans[spans.length-1].textContent=names[k]})}
function fixRewardImages(){qa('#fhqHome .fhq-daily-reward').forEach(function(card){qa('.icon',card).forEach(function(x){x.style.display='none'});qa('img',card).forEach(function(img){function inspect(){var alt=String(img.getAttribute('alt')||'').trim().toLowerCase();if((img.complete&&img.naturalWidth===0)||(alt==='turf'&&img.complete&&img.naturalWidth<2))img.classList.add('turf-v8919-broken-image')}img.addEventListener('error',function(){img.classList.add('turf-v8919-broken-image')},{once:true});inspect()})})}
function run(){addCss();fixHero();fixSidebarBrand();fixCompLabels();fixRewardImages()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[100,300,700,1400,2800,5000].forEach(function(ms){setTimeout(run,ms)});
var timer=null;if(window.MutationObserver)new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,90)}).observe(document.documentElement,{childList:true,subtree:true});
})();
