/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   v89.32 LOGIN-SAFE + INLINE CRITICAL VISUAL FIX
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8932__)return;
window.__TURF_V8897_ENTRY_8932__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

/* Critical fixes live INSIDE the entrypoint so child-script/cache timing cannot beat them. */
function installCriticalFix(){
  var old=q('#turfV8932CriticalCss');if(old)old.remove();
  var st=document.createElement('style');st.id='turfV8932CriticalCss';
  st.textContent=`
    /* Exact duplicate balances from the native markup. */
    #fhqShopPage .fhq-shop-hero > .fhq-shop-wallet,
    #fhqLockerPage .fhq-locker-head > .fhq-shop-wallet{
      display:none!important;visibility:hidden!important;width:0!important;height:0!important;
      min-width:0!important;min-height:0!important;padding:0!important;margin:0!important;
      border:0!important;overflow:hidden!important;pointer-events:none!important;
    }
    #fhqShopCoins,#fhqLockerCoins{display:none!important}

    /* Sidebar mark: never allow old turf-mark.svg / old img / svg to show. */
    #fhqSidebar .fhq-brand-mark,
    #fhqSidebar .fhq-brand-mark[style]{
      position:relative!important;width:58px!important;height:58px!important;min-width:58px!important;
      flex:0 0 58px!important;border-radius:14px!important;
      background:linear-gradient(145deg,#0b1d2b,#07131e)!important;
      background-image:none!important;border:1px solid rgba(61,184,236,.30)!important;
      box-shadow:inset 0 0 18px rgba(28,119,170,.12),0 7px 20px rgba(0,0,0,.28)!important;
      filter:none!important;overflow:hidden!important;
    }
    #fhqSidebar .fhq-brand-mark *{display:none!important}
    #fhqSidebar .fhq-brand-mark:before{display:none!important;content:none!important}
    #fhqSidebar .fhq-brand-mark:after{
      content:'T'!important;position:absolute!important;inset:0!important;display:grid!important;
      place-items:center!important;font-family:Arial Black,Arial,sans-serif!important;font-size:39px!important;
      font-style:italic!important;font-weight:950!important;line-height:1!important;color:#aeb8c1!important;
      transform:skewX(-15deg) rotate(-4deg)!important;-webkit-text-stroke:2px #050a0f!important;
      text-shadow:-2px 0 #159fe7,2px 0 #159fe7,0 -2px #159fe7,0 2px #159fe7,
                  0 0 9px rgba(48,190,255,.72),4px 5px 2px rgba(0,0,0,.72)!important;
    }

    /* Top-right profile/T button: same mark, no old image. */
    #turfTopbar .turf-top-profile{position:relative!important;overflow:hidden!important;background:linear-gradient(145deg,#0b1d2b,#07131e)!important}
    #turfTopbar .turf-top-profile *{visibility:hidden!important}
    #turfTopbar .turf-top-profile:before{
      content:'T'!important;visibility:visible!important;position:absolute!important;inset:0!important;display:grid!important;
      place-items:center!important;font-family:Arial Black,Arial,sans-serif!important;font-size:27px!important;
      font-style:italic!important;font-weight:950!important;color:#aeb8c1!important;transform:skewX(-15deg) rotate(-4deg)!important;
      -webkit-text-stroke:1.5px #050a0f!important;
      text-shadow:-1px 0 #159fe7,1px 0 #159fe7,0 -1px #159fe7,0 1px #159fe7,
                  0 0 7px rgba(48,190,255,.72),3px 3px 1px rgba(0,0,0,.68)!important;
    }
    #turfTopbar .turf-top-profile:after{display:none!important}

    /* Safari broken-image fallback chips must never appear on Home. */
    #fhqHome img[alt='TURF']:not(.turf-v8918-word),
    #fhqHome img[title='TURF'],#fhqHome .turf-v8919-broken-image{display:none!important}
  `;
  (document.head||document.documentElement).appendChild(st);
}

function normalizeCompetitiveLabels(){
  var names={deal:'Cases',ttt:'Trivia Tac Toe',connect4:'4 in a Row'};
  Object.keys(names).forEach(function(k){
    var b=q('#turfTrialsCompetitiveLinks [data-comp-game="'+k+'"]');if(!b)return;
    /* Remove stray text nodes like the extra "Trivi" while preserving the icon. */
    Array.prototype.slice.call(b.childNodes).forEach(function(n){if(n.nodeType===3)n.nodeValue=''});
    var spans=qa('span',b).filter(function(s){return !s.classList.contains('turf-comp-icon')});
    if(spans.length){spans.forEach(function(s,i){if(i<spans.length-1)s.style.display='none';});spans[spans.length-1].textContent=names[k];spans[spans.length-1].style.display='block'}
    else{var s=document.createElement('span');s.textContent=names[k];b.appendChild(s)}
    b.setAttribute('aria-label',names[k]);
  });
}

function killFallbackText(){
  qa('#fhqHome *').forEach(function(n){
    if(String(n.textContent||'').trim()!=='TURF')return;
    if(n.closest&&n.closest('#turfV8918Brand'))return;
    var r;try{r=n.getBoundingClientRect()}catch(e){return}
    if(r&&r.width<120&&r.height<50)n.style.setProperty('display','none','important');
  });
}

function critical(){installCriticalFix();normalizeCompetitiveLabels();killFallbackText()}
critical();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',critical,{once:true});
[50,150,350,700,1200,2200,4000,7000].forEach(function(ms){setTimeout(critical,ms)});
var ct=null;if(window.MutationObserver)new MutationObserver(function(){clearTimeout(ct);ct=setTimeout(critical,35)}).observe(document.documentElement,{childList:true,subtree:true});

function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){critical();if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){}};
  (document.head||document.documentElement).appendChild(s);
}
load('https://footballhq.github.io/footballhq-assets/v88-36/js/88-turf-home2-v8918.js?v=8932','8918',function(){
  load('https://footballhq.github.io/footballhq-assets/v88-36/js/89-turf-home2b-v8919.js?v=8932','8919',function(){
    load('https://footballhq.github.io/footballhq-assets/v88-36/js/90-turf-favicon-v8920.js?v=8932','8920',function(){
      load('https://footballhq.github.io/footballhq-assets/v88-36/js/91-turf-auth-session-lock-v8921.js?v=8932','8921',function(){
        load('https://footballhq.github.io/footballhq-assets/v88-36/js/92-turf-auth-profile-authority-v8922.js?v=8932','8922',function(){
          load('https://footballhq.github.io/footballhq-assets/v88-36/js/93-turf-pass-authority-v8923.js?v=8932','8923',function(){
            load('https://footballhq.github.io/footballhq-assets/v88-36/js/96-turf-coin-ui-cleanup-v8928.js?v=8932','8928',function(){
              load('https://footballhq.github.io/footballhq-assets/v88-36/js/97-turf-visual-polish-v8929.js?v=8932','8929',function(){
                load('https://footballhq.github.io/footballhq-assets/v88-36/js/98-turf-visual-polish-v8930.js?v=8932','8930',function(){
                  load('https://footballhq.github.io/footballhq-assets/v88-36/js/99-turf-visual-cleanup-v8931.js?v=8932','8931',critical);
                });
              });
            });
          });
        });
      });
    });
  });
});
})();
