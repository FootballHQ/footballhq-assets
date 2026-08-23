/* TURF static migration regression guard.
   Restores GitHub-hosted brand assets and guarantees both collection sets appear. */
(function(){
'use strict';
if(window.__TURF_STATIC_REGRESSION_FIXES__)return;
window.__TURF_STATIC_REGRESSION_FIXES__=true;
var WORDMARK='/v88-36/brand/turf-wordmark.svg?v=static-brand-2';
var MARK='/v88-36/brand/turf-mark.svg?v=static-brand-2';
var SET2='The Sideline';
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function addCss(){if(q('#turfStaticRegressionCss'))return;var s=document.createElement('style');s.id='turfStaticRegressionCss';s.textContent=`
#fhqBrandHome{padding:8px 12px!important}#fhqBrandHome #turfStaticSidebarBrand{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important}
#fhqHome .fhq-hero{background-color:#03101a!important;background-image:radial-gradient(circle at 50% 45%,rgba(18,126,184,.18),transparent 46%)!important;display:block!important;position:relative!important}
#fhqHome .fhq-hero #turfStaticHeroBrand{position:absolute!important;inset:12px 28px 12px 28px!important;width:calc(100% - 56px)!important;height:calc(100% - 24px)!important;object-fit:contain!important;object-position:center!important;display:block!important;z-index:1!important;opacity:.98!important}
#fhqHome .fhq-hero .fhq-scorecard{position:absolute!important;right:34px!important;top:30px!important;z-index:3!important}
#turfStaticSidelineCover{min-height:320px!important;border:1px solid rgba(79,190,222,.35)!important;border-radius:18px!important;padding:24px!important;box-sizing:border-box!important;background:radial-gradient(circle at 75% 25%,rgba(37,166,186,.24),transparent 38%),linear-gradient(145deg,#103249,#08222f 55%,#07161f)!important;cursor:pointer!important;position:relative!important;overflow:hidden!important;color:#f3fbff!important}
#turfStaticSidelineCover:before{content:'002';position:absolute;top:22px;left:24px;font-size:18px;font-weight:950;letter-spacing:.22em}#turfStaticSidelineCover h3{font-size:30px!important;margin:62px 0 8px!important}#turfStaticSidelineCover p{max-width:420px;color:#8fb1bf!important}#turfStaticSidelineCover button{position:absolute;left:24px;right:24px;bottom:22px;min-height:42px;border:1px solid rgba(208,238,248,.5);border-radius:10px;background:#07131a;color:#f4fbff;font-weight:950;letter-spacing:.08em}
#fhqAlbumGrid.turf-static-two-sets{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;align-items:stretch!important}
#fhqAlbumGrid.turf-static-two-sets>*{min-width:0!important}
@media(max-width:780px){#fhqAlbumGrid.turf-static-two-sets{grid-template-columns:1fr!important}#fhqHome .fhq-hero .fhq-scorecard{position:relative!important;right:auto!important;top:auto!important;margin:180px 16px 16px!important}}
`;document.head.appendChild(s)}
function brand(){addCss();var b=q('#fhqBrandHome');if(b){var img=q('#turfStaticSidebarBrand',b);if(!img){img=document.createElement('img');img.id='turfStaticSidebarBrand';img.alt='TURF';b.replaceChildren(img)}img.src=WORDMARK}var h=q('#fhqHome .fhq-hero');if(h){var hi=q('#turfStaticHeroBrand',h);if(!hi){hi=document.createElement('img');hi.id='turfStaticHeroBrand';hi.alt='TURF — Compete Collect Climb';h.insertBefore(hi,h.firstChild)}hi.src=WORDMARK}}
function token(){try{return String(typeof window.fhqGetToken==='function'?window.fhqGetToken():window.__TURF_AUTH_TOKEN__||'')}catch(e){return ''}}
function cached(){return window.__fhqLastCollectionsState||window.__fhqV8858State||null}
function hasSet2(state){return !!(state&&state.sets&&Array.isArray(state.sets[SET2])&&state.sets[SET2].length)}
function openSet2(){try{if(typeof window.FHQ_OPEN_SIDELINE_COLLECTION==='function'){window.FHQ_OPEN_SIDELINE_COLLECTION();return}}catch(e){}try{if(typeof window.fhqLoadCollections==='function')window.fhqLoadCollections()}catch(e){}}
function appendSet2(state){var root=q('#fhqAlbumGrid');if(!root||!hasSet2(state))return;var text=(root.textContent||'').toLowerCase();if(text.indexOf('the sideline')>=0)return;var card=document.createElement('article');card.id='turfStaticSidelineCover';card.setAttribute('data-open-set',SET2);card.setAttribute('data-v8855-open-set',SET2);var owned=(state.owned||[]).map(String),cards=state.sets[SET2]||[],have=cards.filter(function(c){return owned.indexOf(String(c.id))>=0}).length;card.innerHTML='<h3>The Sideline</h3><p>Tactical. Smart. Scrappy. Coaches, equipment and the organized chaos beyond the white stripe.</p><strong>'+have+' / '+cards.length+' collected</strong><button type="button">OPEN COLLECTION →</button>';card.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openSet2()});root.appendChild(card);root.classList.add('turf-static-two-sets')}
function ensureCollections(){var root=q('#fhqAlbumGrid');if(!root)return;var s=cached();if(hasSet2(s)){appendSet2(s);return}var t=token();if(!t||root.dataset.turfStaticSet2Loading==='1')return;root.dataset.turfStaticSet2Loading='1';try{google.script.run.withSuccessHandler(function(x){root.dataset.turfStaticSet2Loading='';if(x){window.__fhqLastCollectionsState=x;appendSet2(x)}}).withFailureHandler(function(){root.dataset.turfStaticSet2Loading=''}).getFootballHQCollections(t)}catch(e){root.dataset.turfStaticSet2Loading=''}}
function run(){brand();ensureCollections()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();[100,300,700,1400,2600,5000,8000].forEach(function(ms){setTimeout(run,ms)});if(window.MutationObserver){var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,80)}).observe(document.documentElement,{subtree:true,childList:true})}
})();
