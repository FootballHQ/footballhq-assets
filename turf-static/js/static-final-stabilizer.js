/* TURF static migration final stabilizer — test only. */
(function(){
'use strict';
if(window.__TURF_STATIC_FINAL_STABILIZER__)return;window.__TURF_STATIC_FINAL_STABILIZER__=true;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function profile(){try{return window.__TURF_AUTH_PROFILE__||parent.__TURF_AUTH_PROFILE__||JSON.parse(sessionStorage.getItem('turfStaticBootProfileV1')||'null')||JSON.parse(localStorage.getItem('turfAuthCachedProfileV1')||'null')||{}}catch(e){return window.__TURF_AUTH_PROFILE__||{}}}
function css(){if(q('#turfStaticFinalStabilizerCss'))return;var s=document.createElement('style');s.id='turfStaticFinalStabilizerCss';s.textContent=`
html,body{background:#06141e!important}
body{padding-top:0!important}
#fhqSidebar{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;z-index:62010!important}
#fhqHome{display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;z-index:61000!important;position:fixed!important;left:282px!important;right:0!important;top:58px!important;bottom:0!important;overflow:auto!important}
#fhqHome .fhq-home-inner{display:block!important;visibility:visible!important;opacity:1!important}
#turfTopbar{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;z-index:62020!important}
#fhqWalletBar{display:none!important}
#fhqCorePage{display:none!important}
#fhqGamesPage,#fhqShopPage,#fhqPassPage,#fhqLockerPage,#fhqAlbumPage,#fhqLeaderboardPage,#fhqDraftPage,#fhqAdminPage{display:none!important}
@media(max-width:800px){#fhqHome{left:0!important}}
`;(document.head||document.documentElement).appendChild(s)}
function applyProfile(){var p=profile()||{};window.__TURF_AUTH_PROFILE__=p;window.__TURF_AUTH_TOKEN__=p.token||window.__TURF_AUTH_TOKEN__||'';window.fhqGetToken=function(){return window.__TURF_AUTH_TOKEN__||''};[['fhqAccountName',p.username||'TURF account'],['fhqPoints',String(p.points||0)],['fhqDashLifetime',String(p.points||0)],['fhqDashStreak',String(p.streakDays||0)],['fhqGlobalCoins',String(p.hqCoins||p.coins||0)],['turfTopCoins',String(p.hqCoins||p.coins||0)]].forEach(function(x){var e=document.getElementById(x[0]);if(e)e.textContent=x[1]});try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(p);if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(p)}catch(e){}}
function forceHome(){css();document.body.classList.remove('rankings-page','rankings-loading','draft-page','games-page');var home=q('#fhqHome');if(home){home.classList.remove('hidden');home.style.setProperty('display','block','important');home.style.setProperty('visibility','visible','important');home.style.setProperty('opacity','1','important')}var side=q('#fhqSidebar');if(side){side.classList.remove('hidden');side.style.setProperty('display','flex','important')}var top=q('#turfTopbar');if(top){top.classList.remove('hidden');top.style.setProperty('display','flex','important')}var core=q('#fhqCorePage');if(core)core.style.setProperty('display','none','important');qa('[data-fhq-nav]').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-fhq-nav')==='home')});applyProfile();}
function boot(){forceHome();[60,150,300,600,1000,1800,3000,5000,8000,12000].forEach(function(ms){setTimeout(forceHome,ms)});window.addEventListener('turf:auth-ready',forceHome);if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(forceHome,40)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();