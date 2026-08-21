/* TURF v89.31 — hard visual cleanup only */
(function(){
'use strict';
if(window.__TURF_VISUAL_CLEANUP_8931__)return;
window.__TURF_VISUAL_CLEANUP_8931__=true;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function addCss(){var old=q('#turfV8931Css');if(old)old.remove();var st=document.createElement('style');st.id='turfV8931Css';st.textContent=`
/* kill old/fuzzy sidebar and top-profile logo art */
#fhqSidebar .fhq-brand-mark>img,#fhqSidebar .fhq-brand-mark>svg,#fhqSidebar .fhq-brand-mark .turf-v8919-side-mark,#fhqSidebar .fhq-brand-mark .turf-v8929-tmark,#fhqSidebar .fhq-brand-mark .turf-v8930-mark{display:none!important}
#fhqSidebar .fhq-brand-mark{position:relative!important;width:58px!important;height:58px!important;min-width:58px!important;border-radius:14px!important;background:linear-gradient(145deg,#0b1d2b,#07131e)!important;border:1px solid rgba(61,184,236,.30)!important;box-shadow:inset 0 0 18px rgba(28,119,170,.12),0 7px 20px rgba(0,0,0,.28)!important;overflow:hidden!important}
#fhqSidebar .fhq-brand-mark:after{content:'T'!important;position:absolute!important;inset:0!important;display:grid!important;place-items:center!important;font-family:Arial Black,Arial,sans-serif!important;font-size:39px!important;font-style:italic!important;font-weight:950!important;line-height:1!important;color:#b7c0c8!important;transform:skewX(-12deg) rotate(-2deg)!important;-webkit-text-stroke:2px #071019!important;text-shadow:-2px 0 #159fe7,2px 0 #159fe7,0 -2px #159fe7,0 2px #159fe7,0 0 9px rgba(48,190,255,.75),4px 5px 1px rgba(0,0,0,.55)!important}
/* same treatment for the top profile/T button */
#turfTopbar .turf-top-profile{position:relative!important;overflow:hidden!important}
#turfTopbar .turf-top-profile>img,#turfTopbar .turf-top-profile>svg,#turfTopbar .turf-top-profile .turf-v8929-smallmark,#turfTopbar .turf-top-profile .turf-v8930-smallmark{display:none!important}
#turfTopbar .turf-top-profile:before{content:'T'!important;position:absolute!important;inset:0!important;display:grid!important;place-items:center!important;font-family:Arial Black,Arial,sans-serif!important;font-size:27px!important;font-style:italic!important;font-weight:950!important;color:#b7c0c8!important;transform:skewX(-12deg) rotate(-2deg)!important;-webkit-text-stroke:1.6px #071019!important;text-shadow:-1px 0 #159fe7,1px 0 #159fe7,0 -1px #159fe7,0 1px #159fe7,0 0 7px rgba(48,190,255,.75),3px 3px 1px rgba(0,0,0,.5)!important}
/* if legacy balance IDs survive, their immediate wrappers never show */
#fhqShopCoins,#fhqLockerCoins{display:none!important}
/* broken Safari TURF fallback chip */
.turf-v8919-broken-image{display:none!important}
`;(document.head||document.documentElement).appendChild(st)}
function hideBalanceById(id){var el=document.getElementById(id);if(!el)return;var n=el;var best=null;for(var i=0;i<8&&n&&n!==document.body;i++,n=n.parentElement){var r;try{r=n.getBoundingClientRect()}catch(e){r=null}if(!r)continue;/* duplicate balance card is a compact rectangle in the upper-right */if(r.width>=150&&r.width<=520&&r.height>=55&&r.height<=190)best=n}if(best){best.style.setProperty('display','none','important');best.setAttribute('data-turf-hidden-balance-8931','1')}}
function hideBalanceByGeometry(){var titles=qa('h1,h2,h3').filter(function(x){return /^(HQ Shop|Locker)$/i.test(String(x.textContent||'').trim())});if(!titles.length)return;var title=titles[0],tr;try{tr=title.getBoundingClientRect()}catch(e){return}qa('div,section,aside').forEach(function(n){if(n.closest&&n.closest('#turfTopbar,#fhqSidebar'))return;var r;try{r=n.getBoundingClientRect()}catch(e){return}if(!r)return;if(r.top<tr.top-60||r.top>tr.top+120)return;if(r.left<tr.left+250)return;if(r.width<150||r.width>360||r.height<55||r.height>150)return;var txt=String(n.textContent||'').replace(/\s+/g,' ').trim();var hasCoinId=!!q('#fhqShopCoins,#fhqLockerCoins',n);var hasSmallIcon=!!q('img,svg',n);if(hasCoinId||(hasSmallIcon&&txt.length<24)){n.style.setProperty('display','none','important');n.setAttribute('data-turf-hidden-balance-8931','1')}})}
function killFloatingTurfFallback(){qa('body *').forEach(function(n){if(n.closest&&n.closest('#fhqSidebar,#turfTopbar'))return;var txt=String(n.textContent||'').trim();if(txt!=='TURF')return;var r;try{r=n.getBoundingClientRect()}catch(e){return}if(!r||r.width>110||r.height>45)return;n.style.setProperty('display','none','important');n.setAttribute('data-turf-hidden-fallback-8931','1')})}
function run(){addCss();hideBalanceById('fhqShopCoins');hideBalanceById('fhqLockerCoins');hideBalanceByGeometry();killFloatingTurfFallback()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();[0,80,180,350,700,1200,2200,4000,7000].forEach(function(ms){setTimeout(run,ms)});var t=null;if(window.MutationObserver)new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,40)}).observe(document.documentElement,{childList:true,subtree:true,attributes:false});
})();
