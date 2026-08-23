/* TURF static migration — shell parity layer.
 * Restores approved TURF topbar, T branding, profile button, Trials + competitive rows.
 * Test-only; does not modify production root.
 */
(function(){
'use strict';
if(window.__TURF_STATIC_SHELL_PARITY__)return;window.__TURF_STATIC_SHELL_PARITY__=true;
var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var MARK=ROOT+'turf-mark.svg?v=8940';
var WORD=ROOT+'turf-wordmark.svg?v=8940';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function css(){if(q('#turfStaticShellParityCss'))return;var s=document.createElement('style');s.id='turfStaticShellParityCss';s.textContent=`
:root{--turf-side-w:282px!important}
#fhqSidebar{width:282px!important;min-width:282px!important;padding-top:0!important}
#fhqBrandHome{height:126px!important;min-height:126px!important;padding:0!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;background:radial-gradient(circle at 34% 42%,rgba(18,108,157,.18),transparent 58%),linear-gradient(180deg,#061725 0%,#04131f 100%)!important;border-bottom:1px solid rgba(38,190,255,.16)!important}
#fhqBrandHome .fhq-brand-mark,#fhqBrandHome .fhq-brand-copy{display:none!important}
#turfStaticSidebarBrand{width:100%!important;height:100%!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;padding:9px 10px!important;box-sizing:border-box!important}
#turfStaticSidebarBrand .mark{width:62px!important;height:62px!important;object-fit:contain!important;filter:drop-shadow(0 0 10px rgba(48,194,255,.28))!important}
#turfStaticSidebarBrand .word{width:154px!important;max-height:52px!important;object-fit:contain!important;object-position:left center!important}
#turfTopbar{position:fixed!important;left:282px!important;right:0!important;top:0!important;height:58px!important;z-index:62000!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:8px!important;padding:7px 15px!important;box-sizing:border-box!important;background:linear-gradient(180deg,rgba(5,20,31,.98),rgba(4,16,25,.96))!important;border-bottom:1px solid rgba(65,190,239,.20)!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important}
#turfTopbar .turf-top-wallet{display:flex!important;align-items:center!important;gap:7px!important;min-height:42px!important;padding:5px 10px!important;border:1px solid rgba(74,187,233,.28)!important;border-radius:12px!important;background:#091f2d!important}
#turfTopbar .turf-v8909-coin-img{width:28px!important;height:32px!important;object-fit:contain!important}
#turfTopbar .turf-wallet-copy{display:grid!important;line-height:1!important}#turfTopbar .turf-wallet-copy small{font-size:7px!important;letter-spacing:.16em!important;color:#88aabf!important}#turfTopbar .turf-wallet-copy strong{font-size:14px!important;color:#a8efff!important;margin-top:4px!important}
#turfTopbar .turf-top-green,#turfTopbar .turf-top-future{display:flex!important;align-items:center!important;gap:5px!important;height:40px!important;padding:0 10px!important;border:1px solid rgba(75,177,216,.18)!important;border-radius:11px!important;background:#081b28!important;color:#6f8999!important;font-size:8px!important;font-weight:900!important;letter-spacing:.12em!important}
#turfTopbar button{width:42px!important;height:42px!important;min-width:42px!important;padding:0!important;display:grid!important;place-items:center!important;border-radius:12px!important;border:1px solid rgba(72,187,235,.26)!important;background:linear-gradient(160deg,#0c2536,#071927)!important;color:#e9f8ff!important;box-shadow:none!important}
#turfTopbar button img{width:27px!important;height:27px!important;object-fit:contain!important;border-radius:8px!important}
#fhqWalletBar{display:none!important}
#fhqHome{top:58px!important}
#fhqProfileButton{margin-top:12px!important}
#turfStaticTrialsNav,#turfTrialsCompetitiveLinks .turf-comp-nav{width:100%!important;box-sizing:border-box!important;text-align:left!important;border:0!important;background:transparent!important;color:#dce8ef!important;font-weight:800!important;cursor:pointer!important}
#turfStaticTrialsNav{height:44px!important;padding:7px 14px!important;display:flex!important;align-items:center!important;gap:10px!important;border-radius:10px!important}
#turfStaticTrialsNav:hover,#turfTrialsCompetitiveLinks .turf-comp-nav:hover{background:rgba(31,145,197,.14)!important;color:#fff!important}
#turfTrialsCompetitiveLinks{width:100%!important;margin:0!important;padding:0 0 4px 0!important;border:0!important;display:flex!important;flex-direction:column!important;gap:0!important}
#turfTrialsCompetitiveLinks .turf-comp-nav{height:45px!important;min-height:45px!important;padding:6px 14px 6px 22px!important;display:flex!important;align-items:center!important;gap:10px!important;border-radius:10px!important;font-size:12px!important;white-space:nowrap!important}
#turfTrialsCompetitiveLinks .turf-comp-icon{width:30px!important;height:30px!important;min-width:30px!important;display:grid!important;place-items:center!important;border-radius:8px!important;border:1px solid rgba(71,184,231,.25)!important;background:linear-gradient(145deg,#0d2a3a,#0a1b27)!important;color:#78dcff!important}
#turfTrialsCompetitiveLinks .turf-comp-icon svg{width:17px!important;height:17px!important}
#turfTrialsCompetitiveLinks [data-comp-game="deal"] .turf-comp-icon{color:#f4c95f!important;background:linear-gradient(145deg,#3c2c0d,#151b20)!important}
#turfTrialsCompetitiveLinks [data-comp-game="connect4"] .turf-comp-icon{color:#ff6b72!important;background:linear-gradient(145deg,#39171b,#111d25)!important}
@media(max-width:800px){#turfTopbar{left:0!important}#fhqHome{top:58px!important}}
`;document.head.appendChild(s)}
function icon(type){var a='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';if(type==='cases')return '<svg '+a+'><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4 11h16M10 13h4"/></svg>';if(type==='ttt')return '<svg '+a+'><path d="M8 3v18M16 3v18M3 8h18M3 16h18"/><path d="m5 5 2 2m0-2-2 2"/><circle cx="12" cy="12" r="2.1"/></svg>';return '<svg '+a+'><circle cx="8" cy="6" r="2.4"/><circle cx="12" cy="10" r="2.4"/><circle cx="16" cy="14" r="2.4"/><circle cx="12" cy="18" r="2.4"/></svg>'}
function brand(){var box=q('#fhqBrandHome');if(!box)return;if(!q('#turfStaticSidebarBrand',box)){var d=document.createElement('div');d.id='turfStaticSidebarBrand';d.innerHTML='<img class="mark" src="'+MARK+'" alt=""><img class="word" src="'+WORD+'" alt="TURF">';box.appendChild(d)}}
function topbar(){var top=q('#turfTopbar');if(!top)return;top.style.removeProperty('display');var p=q('#turfProfileBtn');if(p){var img=q('img',p);if(!img){img=document.createElement('img');p.textContent='';p.appendChild(img)}img.src=MARK;img.alt='Profile'}}
function comp(){var nav=q('#fhqSidebar .fhq-nav');if(!nav)return;var games=q('[data-fhq-nav="games"]',nav);if(!games)return;var trials=q('#turfStaticTrialsNav');if(!trials){trials=document.createElement('button');trials.id='turfStaticTrialsNav';trials.type='button';trials.innerHTML='<span style="font-size:17px">⚡</span><span>Trials</span>';games.insertAdjacentElement('afterend',trials);trials.onclick=function(){games.click()}}
var wrap=q('#turfTrialsCompetitiveLinks');if(!wrap){wrap=document.createElement('div');wrap.id='turfTrialsCompetitiveLinks';trials.insertAdjacentElement('afterend',wrap)}
wrap.innerHTML='<button type="button" class="turf-comp-nav" data-comp-game="deal"><span class="turf-comp-icon">'+icon('cases')+'</span><span>Cases</span></button><button type="button" class="turf-comp-nav" data-comp-game="ttt"><span class="turf-comp-icon">'+icon('ttt')+'</span><span>Trivia Tac Toe</span></button><button type="button" class="turf-comp-nav" data-comp-game="connect4"><span class="turf-comp-icon">'+icon('connect4')+'</span><span>4 in a Row</span></button>';
qa('[data-comp-game]',wrap).forEach(function(btn){btn.onclick=function(){var target=q('#turfV8911Root [data-turf-new="'+this.dataset.compGame+'"]');if(target){target.click();return}games.click()}})}
function sync(){var p=window.__TURF_AUTH_PROFILE__||{};var top=q('#turfTopCoins');if(top)top.textContent=String(p.hqCoins||p.coins||0);var name=q('#fhqAccountName');if(name)name.textContent=p.username||'Guest'}
function run(){css();brand();topbar();comp();sync()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();[100,300,700,1400,2600,4500].forEach(function(ms){setTimeout(run,ms)});window.addEventListener('turf:auth-ready',run);if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,80)}).observe(document.documentElement,{childList:true,subtree:true})}
})();