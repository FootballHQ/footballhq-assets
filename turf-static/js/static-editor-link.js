/* TURF static migration — open the existing Admin/Editor screen inside TURF.
   Avoids the unreliable Apps Script /exec recovery route entirely. */
(function(){
'use strict';
if(window.__TURF_STATIC_EDITOR_LINK__) return;
window.__TURF_STATIC_EDITOR_LINK__=true;

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function hide(el){if(el){el.style.setProperty('display','none','important');el.style.setProperty('visibility','hidden','important')}}
function show(el){if(el){el.style.setProperty('display','block','important');el.style.setProperty('visibility','visible','important');el.style.setProperty('opacity','1','important')}}
function css(){
 if(q('#turfStaticAdminCss'))return;
 var s=document.createElement('style');s.id='turfStaticAdminCss';s.textContent=`
 body.turf-static-admin-open{overflow:auto!important}
 body.turf-static-admin-open #fhqAdminPage{position:fixed!important;top:58px!important;left:275px!important;right:0!important;bottom:0!important;z-index:6500!important;overflow:auto!important;padding:28px 34px 60px!important;box-sizing:border-box!important;background:#06131f!important;color:#eaf7ff!important}
 #turfStaticAdminBack{position:sticky;top:0;z-index:5;margin:0 0 18px;padding:10px 14px;border:1px solid #2b617d;border-radius:10px;background:#0b2638;color:#eaf8ff;font-weight:900;cursor:pointer}
 @media(max-width:680px){body.turf-static-admin-open #fhqAdminPage{left:0!important;padding:18px 14px 40px!important}}
 `;(document.head||document.documentElement).appendChild(s)
}
function closeAdmin(){
 document.body.classList.remove('turf-static-admin-open');
 var p=q('#fhqAdminPage');if(p){p.style.removeProperty('display');p.style.removeProperty('visibility');p.style.removeProperty('opacity')}
 var h=q('#fhqHome');if(h){h.classList.remove('hidden');h.style.removeProperty('display');h.style.setProperty('visibility','visible','important');h.style.setProperty('opacity','1','important')}
 var b=q('#fhqSidebar [data-fhq-nav="home"]');if(b){try{b.click()}catch(e){}}
}
function openAdmin(){
 css();
 var page=q('#fhqAdminPage');if(!page)return false;
 document.body.classList.add('turf-static-admin-open');
 ['#fhqHome','#rankingsStandalone','#footballGameOverlay','#fhqLeaderboardPage'].forEach(function(sel){hide(q(sel))});
 show(page);
 var back=q('#turfStaticAdminBack',page);
 if(!back){back=document.createElement('button');back.id='turfStaticAdminBack';back.type='button';back.textContent='← BACK TO TURF';back.onclick=closeAdmin;page.insertBefore(back,page.firstChild)}
 try{if(typeof window.openFootballHQAdminTab==='function')window.openFootballHQAdminTab('overview')}catch(e){}
 try{if(typeof window.runFootballHQAdminAudit==='function')setTimeout(function(){try{window.runFootballHQAdminAudit(false)}catch(e){}},120)}catch(e){}
 window.scrollTo(0,0);
 return true;
}
function isAdminButton(el){
 if(!el)return false;
 return String(el.getAttribute&&el.getAttribute('data-fhq-nav')||'').toLowerCase()==='admin'||(el.classList&&el.classList.contains('admin-nav'));
}
function wire(){
 css();
 qa('#fhqSidebar [data-fhq-nav="admin"],#fhqSidebar .admin-nav').forEach(function(el){
   if(el.dataset.turfAdminInternal==='1')return;
   el.dataset.turfAdminInternal='1';
   el.addEventListener('click',function(e){
     e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
     openAdmin();
   },true);
 });
}
document.addEventListener('click',function(e){
 var el=e.target&&e.target.closest?e.target.closest('#fhqSidebar [data-fhq-nav],#fhqSidebar .admin-nav'):null;
 if(!isAdminButton(el))return;
 e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();openAdmin();
},true);
function boot(){wire();[80,200,500,1000,2200,5000].forEach(function(ms){setTimeout(wire,ms)});if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(wire,60)}).observe(document.documentElement,{childList:true,subtree:true})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
