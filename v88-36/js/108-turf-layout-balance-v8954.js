/* ============================================================
   TURF v89.54 — LAYOUT BALANCE PASS
   Presentation only. Does not touch auth/account/sign-in logic.
   - Hero right edge matches Featured Challenges right edge.
   - Top-left TURF banner fills its brand box more naturally.
   - Top-right profile control reads as a profile/avatar control.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_LAYOUT_BALANCE_8954__)return;
window.__TURF_LAYOUT_BALANCE_8954__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  if(document.getElementById('turfLayoutBalance8954Css'))return;
  var s=document.createElement('style');
  s.id='turfLayoutBalance8954Css';
  s.textContent=`
    /* top-left brand area */
    #fhqSidebar .fhq-brand{
      box-sizing:border-box!important;
      width:100%!important;
      padding:10px 14px!important;
      min-height:118px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      overflow:hidden!important;
    }
    #fhqSidebar .fhq-brand img,
    #fhqSidebar .fhq-brand picture,
    #fhqSidebar .fhq-brand .turf-approved-brand,
    #fhqSidebar .fhq-brand [data-turf-brand]{
      width:100%!important;
      max-width:none!important;
      height:100%!important;
      max-height:none!important;
      object-fit:contain!important;
      object-position:center!important;
      margin:0!important;
    }
    #fhqSidebar .fhq-brand-mark{
      max-width:none!important;
      flex:0 0 auto!important;
    }

    /* profile/avatar button: keep exact click target, change only presentation */
    .turf-top-profile,
    #turfProfileBtn,
    #fhqProfileButton{
      position:relative!important;
      background-image:none!important;
      overflow:hidden!important;
      border-radius:14px!important;
    }
    .turf-top-profile .turf-profile-avatar-8954,
    #turfProfileBtn .turf-profile-avatar-8954,
    #fhqProfileButton .turf-profile-avatar-8954{
      position:absolute!important;
      inset:5px!important;
      display:block!important;
      border-radius:10px!important;
      pointer-events:none!important;
      background:linear-gradient(145deg,rgba(24,69,101,.98),rgba(5,20,33,.98))!important;
      box-shadow:inset 0 0 0 1px rgba(103,207,255,.26),0 0 14px rgba(34,196,255,.12)!important;
    }
    .turf-profile-avatar-8954:before{
      content:""!important;
      position:absolute!important;
      left:50%!important;
      top:20%!important;
      width:26%!important;
      aspect-ratio:1!important;
      transform:translateX(-50%)!important;
      border-radius:50%!important;
      background:linear-gradient(180deg,#dff7ff,#8ad8ff)!important;
      box-shadow:0 0 10px rgba(99,205,255,.28)!important;
    }
    .turf-profile-avatar-8954:after{
      content:""!important;
      position:absolute!important;
      left:50%!important;
      bottom:15%!important;
      width:58%!important;
      height:35%!important;
      transform:translateX(-50%)!important;
      border-radius:50% 50% 28% 28% / 68% 68% 32% 32%!important;
      background:linear-gradient(180deg,#bcecff,#63c8f7)!important;
      box-shadow:0 0 12px rgba(99,205,255,.18)!important;
    }
  `;
  document.head.appendChild(s);
}

function findFeaturedPanel(){
  var home=q('#fhqHome');
  if(!home)return null;
  var nodes=qa('h1,h2,h3,h4,strong,div,span',home);
  for(var i=0;i<nodes.length;i++){
    var txt=String(nodes[i].textContent||'').replace(/\s+/g,' ').trim();
    if(!/^FEATURED\s+CHALLENGES$/i.test(txt))continue;
    var p=nodes[i];
    for(var j=0;j<7&&p&&p!==home;j++,p=p.parentElement){
      var r;try{r=p.getBoundingClientRect()}catch(e){continue}
      if(r.width>=280&&r.height>=120&&r.right<=window.innerWidth+3)return p;
    }
  }
  return null;
}

function alignHero(){
  var home=q('#fhqHome');
  if(!home)return;
  var hero=q('.fhq-hero',home);
  var featured=findFeaturedPanel();
  if(!hero||!featured)return;
  var hr=hero.getBoundingClientRect(),fr=featured.getBoundingClientRect();
  if(!hr.width||!fr.width)return;
  var width=fr.right-hr.left;
  if(width<500)return;
  hero.style.setProperty('box-sizing','border-box','important');
  hero.style.setProperty('width',Math.round(width)+'px','important');
  hero.style.setProperty('max-width','none','important');
  hero.style.setProperty('margin-right','0','important');
  hero.style.setProperty('justify-self','start','important');
}

function expandBrand(){
  var brand=q('#fhqSidebar .fhq-brand');
  if(!brand)return;
  var kids=qa('img,picture,div,span',brand);
  for(var i=0;i<kids.length;i++){
    var el=kids[i],cs=null;
    try{cs=getComputedStyle(el)}catch(e){}
    if(!cs)continue;
    if(el.tagName==='IMG'||(cs.backgroundImage&&cs.backgroundImage!=='none')){
      el.style.setProperty('max-width','none','important');
      if(el.tagName==='IMG'){
        el.style.setProperty('width','100%','important');
        el.style.setProperty('height','100%','important');
        el.style.setProperty('object-fit','contain','important');
      }else{
        el.style.setProperty('background-size','contain','important');
        el.style.setProperty('background-position','center','important');
        el.style.setProperty('background-repeat','no-repeat','important');
      }
    }
  }
}

function profileBtn(){
  return q('.turf-top-profile')||q('#turfProfileBtn')||q('#fhqProfileButton');
}
function styleProfile(){
  var btn=profileBtn();
  if(!btn)return;
  if(!q('.turf-profile-avatar-8954',btn)){
    var span=document.createElement('span');
    span.className='turf-profile-avatar-8954';
    span.setAttribute('aria-hidden','true');
    btn.appendChild(span);
  }
}

function apply(){addCss();alignHero();expandBrand();styleProfile()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[80,200,500,1000,1800,3000].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('resize',function(){setTimeout(apply,60)});
window.addEventListener('turf:auth-ready',function(){[0,120,400].forEach(function(ms){setTimeout(apply,ms)})});
if(window.MutationObserver){try{new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}}
})();
