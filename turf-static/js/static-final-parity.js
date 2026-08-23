/* TURF static migration: final visual parity layer. Presentation/navigation only. */
(function(){
'use strict';
if(window.__TURF_STATIC_FINAL_PARITY__)return;
window.__TURF_STATIC_FINAL_PARITY__=true;
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function norm(s){return String(s||'').replace(/\s+/g,' ').trim().toLowerCase()}
function addCss(){
 if(q('#turfStaticFinalParityCss'))return;
 var st=document.createElement('style');st.id='turfStaticFinalParityCss';st.textContent=`
 #fhqHome .fhq-hero{position:relative!important;overflow:hidden!important;min-height:250px!important;padding:0!important;background-color:#03101a!important;background-repeat:no-repeat!important;background-position:center center!important;background-size:cover!important;border-radius:20px!important}
 #fhqHome .fhq-hero:before,#fhqHome .fhq-hero:after{display:none!important;content:none!important}
 #fhqHome .fhq-hero>div:first-child{min-height:250px!important;height:250px!important;padding:0!important;margin:0!important;pointer-events:none!important}
 #fhqHome .fhq-hero>div:first-child>*{display:none!important}
 #turfStaticTrialsRow,.turf-static-comp-row{width:100%!important;min-height:42px!important;margin:0!important;padding:7px 14px!important;box-sizing:border-box!important;border:0!important;border-radius:10px!important;background:transparent!important;color:#dce8ef!important;display:flex!important;align-items:center!important;gap:10px!important;text-align:left!important;font:800 12px/1.1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;cursor:pointer!important}
 #turfStaticTrialsRow:hover,.turf-static-comp-row:hover{background:rgba(28,139,190,.14)!important;color:#fff!important}
 #turfStaticTrialsRow{color:#e5f4fb!important;font-weight:900!important}
 #turfStaticCompetitiveLinks{display:flex!important;flex-direction:column!important;width:100%!important;margin:0 0 2px!important;padding:0!important;gap:0!important}
 .turf-static-comp-icon{width:27px!important;height:27px!important;min-width:27px!important;display:grid!important;place-items:center!important;border-radius:8px!important;border:1px solid rgba(71,184,231,.22)!important;background:linear-gradient(145deg,#0d2a3a,#0a1b27)!important;color:#78dcff!important;font-size:13px!important}
 #turfStaticCases .turf-static-comp-icon{color:#f4c95f!important;border-color:rgba(244,201,95,.25)!important}
 #turfStaticConnect4 .turf-static-comp-icon{color:#ff7a80!important;border-color:rgba(255,107,114,.24)!important}
 @media(max-width:700px){#fhqHome .fhq-hero,#fhqHome .fhq-hero>div:first-child{min-height:190px!important;height:190px!important}}
 `;(document.head||document.documentElement).appendChild(st);
}
function hero(){
 var h=q('#fhqHome .fhq-hero'),A=window.TURF_EXACT_BRAND_V8940||{};
 if(!h||!A.full)return;
 h.style.setProperty('background-image','url("'+String(A.full).replace(/"/g,'%22')+'")','important');
 h.style.setProperty('background-repeat','no-repeat','important');
 h.style.setProperty('background-position','center center','important');
 h.style.setProperty('background-size','cover','important');
}
function navRows(){
 var sidebar=q('#fhqSidebar');if(!sidebar)return;
 var homeBtn=q('[data-fhq-nav="home"]',sidebar);if(!homeBtn)return;
 var games=null;
 qa('button,a,[role="button"]',sidebar).some(function(el){if(norm(el.textContent)==='games'){games=el;return true}return false});
 if(!games)return;
 var trials=q('#turfStaticTrialsRow');
 if(!trials){trials=document.createElement('button');trials.type='button';trials.id='turfStaticTrialsRow';trials.innerHTML='<span aria-hidden="true">⚡</span><span>Trials</span>';games.insertAdjacentElement('afterend',trials)}
 var wrap=q('#turfStaticCompetitiveLinks');
 if(!wrap){
   wrap=document.createElement('div');wrap.id='turfStaticCompetitiveLinks';
   wrap.innerHTML='<button type="button" id="turfStaticCases" class="turf-static-comp-row" data-static-comp="deal"><span class="turf-static-comp-icon">▣</span><span>Cases</span></button><button type="button" id="turfStaticTTT" class="turf-static-comp-row" data-static-comp="ttt"><span class="turf-static-comp-icon">⌗</span><span>Trivia Tac Toe</span></button><button type="button" id="turfStaticConnect4" class="turf-static-comp-row" data-static-comp="connect4"><span class="turf-static-comp-icon">●</span><span>4 in a Row</span></button>';
   trials.insertAdjacentElement('afterend',wrap);
 }
 function launch(id){var b=q('#turfV8911Root [data-turf-new="'+id+'"]');if(b){b.click();return true}return false}
 if(!trials.dataset.wired){trials.dataset.wired='1';trials.onclick=function(){var b=q('#turfTrialsNav');if(b&&b!==trials)b.click();else{var g=q('[data-fhq-nav="games"]',sidebar);if(g)g.click()}}}
 qa('[data-static-comp]',wrap).forEach(function(btn){if(btn.dataset.wired)return;btn.dataset.wired='1';btn.onclick=function(){launch(this.dataset.staticComp)}});
}
function sidebarBrand(){
 var b=q('#fhqBrandHome'),A=window.TURF_EXACT_BRAND_V8940||{};if(!b)return;
 if(A.sidebar){var img=q('#turfV8940SidebarLogo',b);if(!img){img=document.createElement('img');img.id='turfV8940SidebarLogo';img.alt='TURF';b.replaceChildren(img)}img.src=A.sidebar;img.style.cssText='display:block!important;width:100%!important;height:100%!important;object-fit:contain!important'}
}
function apply(){addCss();hero();sidebarBrand();navRows();document.title='TURF'}
function boot(){apply();[80,220,500,900,1500,2600,4200,7000].forEach(function(ms){setTimeout(apply,ms)});if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(apply,90)}).observe(document.documentElement,{childList:true,subtree:true})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();