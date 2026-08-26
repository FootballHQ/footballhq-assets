/* ============================================================
   TURF v89.57 — LAYOUT BALANCE POLISH
   Presentation only. Does not touch auth/account/sign-in logic.
   - LOCKS the approved hero sizing/alignment by leaving hero untouched.
   - Makes the top-left TURF banner ~9% smaller with balanced breathing room.
   - Refines the top-right profile control into a cleaner premium avatar.
   - Releases stale legacy recovery interaction locks AFTER Worker auth only.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_LAYOUT_BALANCE_8957__)return;
window.__TURF_LAYOUT_BALANCE_8957__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  if(document.getElementById('turfLayoutBalance8957Css'))return;
  var s=document.createElement('style');
  s.id='turfLayoutBalance8957Css';
  s.textContent=`
    /* HERO IS INTENTIONALLY UNTOUCHED — current version is approved/locked. */

    /* Top-left brand: slightly smaller than prior pass, centered with breathing room. */
    #fhqBrandHome{
      box-sizing:border-box!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      overflow:hidden!important;
      padding:11px 14px!important;
    }
    #fhqBrandHome #turfV8940SidebarLogo{
      display:block!important;
      width:91%!important;
      max-width:91%!important;
      height:auto!important;
      max-height:100%!important;
      object-fit:contain!important;
      object-position:center!important;
      margin:0 auto!important;
      transform:none!important;
    }

    /* Premium profile/avatar presentation. Click target/functionality unchanged. */
    #turfProfileBtn{
      position:relative!important;
      overflow:hidden!important;
      border-radius:14px!important;
      background:linear-gradient(160deg,#09283b,#061722)!important;
      border-color:rgba(83,201,255,.48)!important;
      box-shadow:inset 0 0 0 1px rgba(95,205,255,.08),0 0 16px rgba(34,196,255,.10)!important;
    }
    #turfProfileBtn > :not(.turf-profile-avatar-8957){
      display:none!important;
    }
    #turfProfileBtn .turf-profile-avatar-8957{
      position:absolute!important;
      inset:5px!important;
      display:block!important;
      pointer-events:none!important;
      border-radius:10px!important;
      background:
        radial-gradient(circle at 50% 32%,rgba(68,197,255,.16),transparent 44%),
        linear-gradient(145deg,#0e3852,#071b2a)!important;
      box-shadow:inset 0 0 0 1px rgba(118,218,255,.18)!important;
    }
    #turfProfileBtn .turf-profile-avatar-8957:before{
      content:""!important;
      position:absolute!important;
      left:50%!important;
      top:18%!important;
      width:28%!important;
      aspect-ratio:1!important;
      transform:translateX(-50%)!important;
      border-radius:50%!important;
      background:linear-gradient(180deg,#f2fbff 0%,#9fe2ff 72%,#6fc8ef 100%)!important;
      box-shadow:0 0 9px rgba(91,206,255,.34)!important;
    }
    #turfProfileBtn .turf-profile-avatar-8957:after{
      content:""!important;
      position:absolute!important;
      left:50%!important;
      bottom:12%!important;
      width:62%!important;
      height:38%!important;
      transform:translateX(-50%)!important;
      border-radius:50% 50% 24% 24% / 72% 72% 28% 28%!important;
      background:linear-gradient(180deg,#c8efff 0%,#72cef5 100%)!important;
      box-shadow:0 0 11px rgba(91,206,255,.20)!important;
    }
  `;
  document.head.appendChild(s);
}

function polishSidebar(){
  var logo=q('#turfV8940SidebarLogo');
  if(!logo)return;
  logo.style.setProperty('width','91%','important');
  logo.style.setProperty('max-width','91%','important');
  logo.style.setProperty('height','auto','important');
  logo.style.setProperty('max-height','100%','important');
  logo.style.setProperty('object-fit','contain','important');
  logo.style.setProperty('object-position','center','important');
  logo.style.setProperty('margin','0 auto','important');
}

function polishProfile(){
  var btn=q('#turfProfileBtn');
  if(!btn)return;
  qa('.turf-profile-avatar-8954',btn).forEach(function(n){try{n.remove()}catch(e){}});
  if(!q('.turf-profile-avatar-8957',btn)){
    var avatar=document.createElement('span');
    avatar.className='turf-profile-avatar-8957';
    avatar.setAttribute('aria-hidden','true');
    btn.appendChild(avatar);
  }
}

function releasePostLoginInteraction(){
  var token='';
  try{token=String(window.__TURF_AUTH_TOKEN__||(typeof window.fhqGetToken==='function'?window.fhqGetToken():'')||'').trim()}catch(e){}
  if(!token)return;

  try{
    ['turf-auth-locked','fhq-identity-recovering','recovering','account-loading','is-loading','fhq-loading','loading'].forEach(function(c){
      document.documentElement.classList.remove(c);
      if(document.body)document.body.classList.remove(c);
    });
  }catch(e){}

  try{
    [document.documentElement,document.body].forEach(function(el){
      if(!el)return;
      el.removeAttribute('inert');
      el.style.removeProperty('pointer-events');
      el.style.removeProperty('filter');
      el.style.removeProperty('opacity');
    });
  }catch(e){}

  ['fhqSidebar','fhqMain','fhqHome','turfTopbar'].forEach(function(id){
    var root=document.getElementById(id);if(!root)return;
    try{
      root.removeAttribute('inert');
      root.style.removeProperty('pointer-events');
      root.style.removeProperty('filter');
      root.style.removeProperty('opacity');
      root.querySelectorAll('[inert]').forEach(function(el){el.removeAttribute('inert')});
      root.querySelectorAll('button,a,[role="button"]').forEach(function(el){el.style.removeProperty('pointer-events')});
    }catch(e){}
  });

  try{
    document.querySelectorAll('[id*="recover" i],[class*="recover" i],[id*="auth-loading" i],[class*="auth-loading" i]').forEach(function(el){
      if(el.id==='fhqSidebar'||el.id==='fhqMain'||el.id==='fhqHome'||el.id==='turfTopbar')return;
      var txt=String(el.textContent||'').toLowerCase();
      var cs=null,r=null;try{cs=getComputedStyle(el);r=el.getBoundingClientRect()}catch(e){}
      var recoveryText=txt.indexOf('recovering your football hq account')>=0||txt.indexOf('restoring your turf account')>=0;
      var transparentBlocker=!!(cs&&r&&(cs.position==='fixed'||cs.position==='absolute')&&r.width>window.innerWidth*.60&&r.height>window.innerHeight*.50&&(Number(cs.opacity||1)<.05||cs.visibility==='hidden'));
      if(recoveryText||transparentBlocker){
        el.setAttribute('aria-hidden','true');
        el.style.setProperty('pointer-events','none','important');
        el.style.setProperty('display','none','important');
      }
    });
  }catch(e){}
}

function postAuthUnlock(){
  releasePostLoginInteraction();
  [80,240,600,1200,2400,4800].forEach(function(ms){setTimeout(releasePostLoginInteraction,ms)});
}

function apply(){addCss();polishSidebar();polishProfile()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[80,220,500,1000,1800,3000].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('turf:auth-ready',function(){[0,120,400].forEach(function(ms){setTimeout(apply,ms)});postAuthUnlock()});
window.addEventListener('message',function(e){var d=e&&e.data;if(d&&typeof d==='object'&&d.type==='turf-auth-worker-profile')postAuthUnlock()},true);
[1200,2800,5200,9000].forEach(function(ms){setTimeout(function(){try{if(window.__TURF_AUTH_TOKEN__)releasePostLoginInteraction()}catch(e){}},ms)});
if(window.MutationObserver){try{new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}}
})();
