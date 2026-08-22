/* ============================================================
   TURF v89.57 — LAYOUT BALANCE POLISH
   Presentation only. Does not touch auth/account/sign-in logic.
   - LOCKS the approved hero sizing/alignment by leaving hero untouched.
   - Makes the top-left TURF banner ~9% smaller with balanced breathing room.
   - Refines the top-right profile control into a cleaner premium avatar.
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

function apply(){addCss();polishSidebar();polishProfile()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[80,220,500,1000,1800,3000].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('turf:auth-ready',function(){[0,120,400].forEach(function(ms){setTimeout(apply,ms)})});
if(window.MutationObserver){try{new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}}
})();
