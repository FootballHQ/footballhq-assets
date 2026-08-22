/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   v89.57 SIGN-IN FIRST / CLEAN AUTH FLOW + LOCKED HERO + POLISHED BRAND/PROFILE

   Auth behavior is unchanged from the working v89.48 flow.
   This file only adds a late presentation-only layout enforcement pass.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8948__)return;
window.__TURF_V8897_ENTRY_8948__=true;

try{localStorage.removeItem('turfAuthAccountTokenV1')}catch(e){}
try{sessionStorage.removeItem('turfAuthAccountTokenV1')}catch(e){}

function suppressOldRecovery(){
  try{
    var nodes=document.querySelectorAll('body *');
    for(var i=0;i<nodes.length;i++){
      var el=nodes[i];
      if(!el||!el.textContent)continue;
      var t=String(el.textContent).replace(/\s+/g,' ').trim();
      if(t==='Recovering your Football HQ account…'||t==='Recovering your Football HQ account...'||t==='Restoring your TURF account…'||t==='Restoring your TURF account...'){
        var p=el;
        while(p&&p!==document.body){
          var cs=null;try{cs=getComputedStyle(p)}catch(e){}
          if(cs&&(cs.position==='fixed'||cs.position==='absolute')&&p.getBoundingClientRect().width>window.innerWidth*.5){
            p.style.setProperty('display','none','important');
            p.setAttribute('aria-hidden','true');
            break;
          }
          p=p.parentElement;
        }
      }
    }
  }catch(e){}
}

function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');
  s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){} if(next)next()};
  (document.head||document.documentElement).appendChild(s);
}

var B='https://footballhq.github.io/footballhq-assets/v88-36/js/';
load(B+'88-turf-home2-v8918.js?v=8957','8918',function(){
  load(B+'89-turf-home2b-v8919.js?v=8957','8919',function(){
    load(B+'90-turf-favicon-v8920.js?v=8957','8920',function(){
      load(B+'96-turf-coin-ui-cleanup-v8928.js?v=8957','8928',function(){
        load(B+'97-turf-visual-polish-v8929.js?v=8957','8929',function(){
          load(B+'98-turf-visual-polish-v8930.js?v=8957','8930',function(){
            load(B+'99-turf-visual-cleanup-v8931.js?v=8957','8931',function(){
              load(B+'102-turf-approved-brand-v8937.js?v=8957','8937',function(){
                suppressOldRecovery();
                enforceLayout();
              });
            });
          });
        });
      });
    });
  });
});

/* ===== PRESENTATION ONLY: NO AUTH / ACCOUNT / STORAGE WRITES ===== */
var PROFILE_SVG='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f3853"/><stop offset="1" stop-color="#061621"/></linearGradient><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f3fbff"/><stop offset="1" stop-color="#79d3f9"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#bg)" stroke="#4fd1ff" stroke-opacity=".58" stroke-width="2"/><circle cx="32" cy="23" r="9.5" fill="url(#fg)"/><path d="M14 53c1.8-11.7 8.7-18.2 18-18.2S48.2 41.3 50 53" fill="url(#fg)"/><circle cx="32" cy="32" r="24" fill="none" stroke="#57cfff" stroke-opacity=".10" stroke-width="2"/></svg>');

function findFeaturedRight(){
  var home=document.getElementById('fhqHome');
  if(!home)return 0;
  var all=home.querySelectorAll('h1,h2,h3,h4,strong,div,span');
  var label=null;
  for(var i=0;i<all.length;i++){
    if(/^FEATURED\s+CHALLENGES$/i.test(String(all[i].textContent||'').replace(/\s+/g,' ').trim())){label=all[i];break;}
  }
  if(!label)return 0;
  var p=label,best=null;
  for(var j=0;j<8&&p&&p!==home;j++,p=p.parentElement){
    var r;try{r=p.getBoundingClientRect()}catch(e){continue}
    if(r.width>=320&&r.width<=760&&r.height>=180){best=p;}
  }
  if(!best){
    p=label.parentElement;
    while(p&&p!==home){
      var rr=p.getBoundingClientRect();
      if(rr.width>=320&&rr.width<=760){best=p;break}
      p=p.parentElement;
    }
  }
  return best?best.getBoundingClientRect().right:0;
}

/* HERO LOCK: same sizing logic that produced the approved current result. */
function enforceHero(){
  var hero=document.querySelector('#fhqHome .fhq-hero');
  if(!hero)return;
  var right=findFeaturedRight();
  if(!right)return;
  var hr=hero.getBoundingClientRect();
  var w=Math.round(right-hr.left);
  if(w>700){
    hero.style.setProperty('width',w+'px','important');
    hero.style.setProperty('max-width','none','important');
    hero.style.setProperty('box-sizing','border-box','important');
    hero.style.setProperty('margin-right','0','important');
  }
}

function enforceSidebarBrand(){
  var box=document.getElementById('fhqBrandHome');
  var img=document.getElementById('turfV8940SidebarLogo');
  if(!box||!img)return;
  box.style.setProperty('height','122px','important');
  box.style.setProperty('min-height','122px','important');
  box.style.setProperty('padding','10px 12px','important');
  box.style.setProperty('overflow','hidden','important');
  box.style.setProperty('display','flex','important');
  box.style.setProperty('align-items','center','important');
  box.style.setProperty('justify-content','center','important');
  img.style.setProperty('display','block','important');
  img.style.setProperty('width','100%','important');
  img.style.setProperty('height','100%','important');
  img.style.setProperty('max-width','none','important');
  img.style.setProperty('max-height','none','important');
  img.style.setProperty('object-fit','contain','important');
  img.style.setProperty('transform','scale(1.06)','important');
  img.style.setProperty('transform-origin','center','important');
}

function enforceProfile(){
  var btn=document.getElementById('turfProfileBtn');
  if(!btn)return;
  var img=document.getElementById('turfV8940ProfileLogo');
  if(!img){
    img=document.createElement('img');
    img.id='turfV8940ProfileLogo';
    img.alt='Profile';
    btn.appendChild(img);
  }
  img.src=PROFILE_SVG;
  img.alt='Profile';
  img.style.setProperty('display','block','important');
  img.style.setProperty('width','34px','important');
  img.style.setProperty('height','34px','important');
  img.style.setProperty('object-fit','contain','important');
  img.style.setProperty('border-radius','11px','important');
  img.style.setProperty('filter','drop-shadow(0 0 8px rgba(67,201,255,.20))','important');
  btn.style.setProperty('background-image','none','important');
  btn.style.setProperty('background','linear-gradient(160deg,#09283b,#061722)','important');
  btn.style.setProperty('border-color','rgba(83,201,255,.48)','important');
  btn.setAttribute('aria-label','Open profile');
}

function enforceLayout(){
  try{enforceHero();enforceSidebarBrand();enforceProfile()}catch(e){}
}

[0,80,220,500,900,1500,2500,4000].forEach(function(ms){setTimeout(function(){suppressOldRecovery();enforceLayout()},ms)});
window.addEventListener('resize',function(){setTimeout(enforceLayout,80)});
window.addEventListener('turf:auth-ready',function(){[0,120,450,1000].forEach(function(ms){setTimeout(enforceLayout,ms)})});
if(window.MutationObserver){try{new MutationObserver(function(){enforceLayout()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}}
})();
