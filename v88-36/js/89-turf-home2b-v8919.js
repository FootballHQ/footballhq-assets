/* ============================================================
   TURF V89.19 — HOME 2.0 CLEANUP PASS
   Presentation only. No account/game/card logic changes.
   Fixes:
   - single hero wordmark (removes duplicate T)
   - crisp sidebar brand mark
   - full competitive submenu labels
   - one image per Daily Reward card
   - broken-image TURF fallback labels
   - keeps Lifetime Points green achievement icon
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8919_HOME2B__)return;
window.__TURF_V8919_HOME2B__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var MARK=ROOT+'turf-mark.svg?v=8919';
var WORD=ROOT+'turf-wordmark.svg?v=8919';

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()}

function addCss(){
  var old=q('#turfV8919Home2bCss');if(old)old.remove();
  var st=document.createElement('style');st.id='turfV8919Home2bCss';
  st.textContent=`
    /* HERO — exactly one TURF lockup */
    #turfV8918Brand{display:block!important;width:min(470px,82%)!important;margin:0 0 18px!important}
    #turfV8918Brand .turf-v8918-mark{display:none!important}
    #turfV8918Brand .turf-v8918-word{display:block!important;width:100%!important;max-width:470px!important;height:auto!important;object-fit:contain!important;object-position:left center!important;filter:drop-shadow(0 8px 24px rgba(0,0,0,.25))!important}
    #turfV8918Tag{display:none!important}

    /* SIDEBAR BRAND — true vector mark, not the old fuzzy tile */
    #fhqSidebar .fhq-brand{gap:13px!important;padding:18px 20px!important;min-height:100px!important}
    #fhqSidebar .fhq-brand-mark{width:56px!important;height:56px!important;min-width:56px!important;flex:0 0 56px!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}
    #fhqSidebar .fhq-brand-mark:before,#fhqSidebar .fhq-brand-mark:after{display:none!important;content:none!important}
    #fhqSidebar .fhq-brand-mark>svg,#fhqSidebar .fhq-brand-mark>img{display:none!important}
    #fhqSidebar .fhq-brand-mark .turf-v8919-side-mark{display:block!important;width:56px!important;height:56px!important;object-fit:contain!important;filter:drop-shadow(0 0 10px rgba(42,187,255,.30))!important}
    #fhqSidebar .fhq-brand-copy{font-size:25px!important;line-height:1!important;letter-spacing:.035em!important}
    #fhqSidebar .fhq-brand-copy small{font-size:7px!important;line-height:1.2!important;margin-top:7px!important;letter-spacing:.14em!important}

    /* COMPETITIVE SUBMENU — stop C… / T… / 4… clipping */
    #turfTrialsCompetitiveLinks{box-sizing:border-box!important;width:auto!important;max-width:none!important;margin:4px 10px 10px 10px!important;padding:3px 0 3px 6px!important;overflow:visible!important}
    #turfTrialsCompetitiveLinks .turf-comp-nav{box-sizing:border-box!important;width:100%!important;max-width:none!important;min-width:0!important;padding:7px 8px!important;gap:9px!important;overflow:visible!important;white-space:nowrap!important;text-overflow:clip!important;font-size:11px!important}
    #turfTrialsCompetitiveLinks .turf-comp-nav>span:last-child{display:block!important;min-width:0!important;max-width:none!important;overflow:visible!important;white-space:nowrap!important;text-overflow:clip!important}
    #turfTrialsCompetitiveLinks .turf-comp-icon{width:25px!important;height:25px!important;flex:0 0 25px!important}

    /* DAILY REWARDS — one art well, no duplicate legacy icon */
    #fhqHome .fhq-daily-reward{grid-template-columns:136px minmax(0,1fr) 126px!important;gap:20px!important;min-height:176px!important;padding:18px 20px!important}
    #fhqHome .fhq-daily-reward .icon{display:none!important}
    #fhqHome .fhq-daily-reward>img{grid-column:1!important;width:122px!important;height:122px!important;max-width:122px!important;max-height:122px!important;object-fit:contain!important;align-self:center!important;justify-self:center!important;border-radius:14px!important;background:transparent!important;filter:none!important}
    #fhqHome .fhq-daily-reward button{grid-column:3!important;align-self:center!important}
    #fhqHome .fhq-daily-reward h3,#fhqHome .fhq-daily-reward p{grid-column:2!important}

    /* A broken legacy image must never render Safari's little gray TURF label. */
    #fhqHome .turf-v8919-broken-image{display:none!important;width:0!important;height:0!important;position:absolute!important;pointer-events:none!important}

    /* Keep Lifetime Points visually distinct from coins. */
    #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"] .turf-v8918-stat-icon{display:grid!important}
    #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"]>img,
    #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"] .fhq-coin-icon,
    #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"] .turf-stat-art,
    #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"]>.icon{display:none!important}

    @media(max-width:760px){
      #turfV8918Brand{width:min(400px,94%)!important}
      #fhqHome .fhq-daily-reward{grid-template-columns:92px minmax(0,1fr)!important}
      #fhqHome .fhq-daily-reward>img{width:86px!important;height:86px!important;max-width:86px!important;max-height:86px!important}
      #fhqHome .fhq-daily-reward button{grid-column:1/3!important}
    }
  `;
  (document.body||document.documentElement).appendChild(st);
}

function fixHero(){
  var brand=q('#turfV8918Brand');if(!brand)return;
  var word=q('.turf-v8918-word',brand);
  if(word){word.src=WORD;word.alt='TURF'}
  qa('.turf-v8918-mark',brand).forEach(function(x){x.style.display='none'});
}

function fixSidebarBrand(){
  var box=q('#fhqSidebar .fhq-brand-mark');if(!box)return;
  var img=q('.turf-v8919-side-mark',box);
  if(!img){
    img=document.createElement('img');
    img.className='turf-v8919-side-mark';
    img.src=MARK;img.alt='';img.setAttribute('aria-hidden','true');
    box.appendChild(img);
  }
  var copy=q('#fhqSidebar .fhq-brand-copy');
  if(copy){
    var small=q('small',copy);
    Array.prototype.slice.call(copy.childNodes).forEach(function(n){if(n.nodeType===3&&String(n.nodeValue||'').trim())n.nodeValue='TURF'});
    if(small)small.textContent='COMPETE • COLLECT • CLIMB';
  }
}

function fixCompLabels(){
  var wrap=q('#turfTrialsCompetitiveLinks');if(!wrap)return;
  var names={deal:'Cases',ttt:'Trivia Tic-Tac-Toe',connect4:'4 in a Row'};
  Object.keys(names).forEach(function(k){
    var b=q('[data-comp-game="'+k+'"]',wrap);if(!b)return;
    var spans=qa('span',b);if(spans.length)spans[spans.length-1].textContent=names[k];
  });
}

function fixRewardImages(){
  qa('#fhqHome .fhq-daily-reward').forEach(function(card){
    /* Hide the legacy secondary icon container. The direct reward art remains. */
    qa('.icon',card).forEach(function(x){x.style.display='none'});
    qa('img',card).forEach(function(img){
      function inspect(){
        var alt=String(img.getAttribute('alt')||'').trim().toLowerCase();
        if((img.complete&&img.naturalWidth===0)||(alt==='turf'&&img.complete&&img.naturalWidth<2))img.classList.add('turf-v8919-broken-image');
      }
      img.addEventListener('error',function(){img.classList.add('turf-v8919-broken-image')},{once:true});
      inspect();
    });
  });
}

function run(){addCss();fixHero();fixSidebarBrand();fixCompLabels();fixRewardImages()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[100,300,700,1400,2800,5000].forEach(function(ms){setTimeout(run,ms)});
var timer=null;
if(window.MutationObserver)new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,90)}).observe(document.documentElement,{childList:true,subtree:true});
})();
