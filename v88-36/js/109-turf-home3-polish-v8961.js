/* ============================================================
   TURF v89.61 — BATCH 3 HOME 2.0 POLISH PASS
   Presentation only. No auth/account/storage/game-state changes.
   Goals:
   - Keep the approved hero and sidebar branding untouched.
   - Make New Game + Featured Challenges feel like one intentional system.
   - Tighten typography, panel rhythm, borders, and responsive behavior.
   - Remove only obvious legacy FootballHQ/HQ wording on Home.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_HOME3_POLISH_8961__)return;
window.__TURF_HOME3_POLISH_8961__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  if(document.getElementById('turfHome3Polish8961Css'))return;
  var s=document.createElement('style');
  s.id='turfHome3Polish8961Css';
  s.textContent=`
    /* Home only — preserve the approved hero dimensions/art exactly as-is. */
    #fhqHome{--turf-home-gap:16px;--turf-home-radius:16px}

    #fhqHome .turf-home-polish-panel{
      box-sizing:border-box!important;
      border-radius:var(--turf-home-radius)!important;
      border:1px solid rgba(62,181,238,.40)!important;
      background:linear-gradient(155deg,rgba(8,37,59,.96),rgba(4,20,34,.985))!important;
      box-shadow:0 14px 34px rgba(0,0,0,.20),inset 0 1px rgba(255,255,255,.025)!important;
      overflow:hidden!important;
    }
    #fhqHome .turf-home-polish-panel>h1,
    #fhqHome .turf-home-polish-panel>h2,
    #fhqHome .turf-home-polish-panel>h3,
    #fhqHome .turf-home-polish-panel .turf-home-polish-title{
      color:#f3f8fc!important;
      font-weight:900!important;
      letter-spacing:.015em!important;
      line-height:1.05!important;
      text-shadow:0 1px 0 rgba(255,255,255,.05)!important;
    }
    #fhqHome .turf-home-polish-subtitle{
      color:#8fa8ba!important;
      font-size:12px!important;
      line-height:1.35!important;
      margin-top:4px!important;
    }

    #fhqHome .turf-home-polish-new,
    #fhqHome .turf-home-polish-featured{
      align-self:stretch!important;
    }

    #fhqHome .turf-home-polish-inner{
      border-radius:14px!important;
      border:1px solid rgba(56,175,232,.31)!important;
      background:linear-gradient(155deg,rgba(9,48,76,.74),rgba(5,27,45,.84))!important;
      box-shadow:inset 0 1px rgba(255,255,255,.018)!important;
    }

    #fhqHome .turf-home-polish-featured .turf-home-polish-inner{
      background:linear-gradient(155deg,rgba(6,35,56,.92),rgba(4,23,39,.97))!important;
    }

    #fhqHome .turf-home-polish-panel button,
    #fhqHome .turf-home-polish-panel [role="button"]{
      transition:transform .14s ease,border-color .14s ease,box-shadow .14s ease!important;
    }
    #fhqHome .turf-home-polish-panel button:hover,
    #fhqHome .turf-home-polish-panel [role="button"]:hover{
      transform:translateY(-1px)!important;
    }

    #fhqHome .turf-home-polish-row{
      gap:var(--turf-home-gap)!important;
      align-items:stretch!important;
    }

    @media(max-width:900px){
      #fhqHome .fhq-hero{width:100%!important;max-width:100%!important}
      #fhqHome .turf-home-polish-row{display:grid!important;grid-template-columns:1fr!important;gap:14px!important}
      #fhqHome .turf-home-polish-panel{width:100%!important;min-width:0!important}
    }
  `;
  document.head.appendChild(s);
}

function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function nearestPanel(label,home){var p=label;for(var i=0;i<7&&p&&p!==home;i++,p=p.parentElement){var r=null;try{r=p.getBoundingClientRect()}catch(e){}if(r&&r.width>=280&&r.height>=180)return p}return label&&label.parentElement}
function markPanels(){
  var home=q('#fhqHome');if(!home)return;
  var nodes=qa('h1,h2,h3,h4,strong,div,span',home),newPanel=null,featuredPanel=null,newLabel=null,featuredLabel=null;
  for(var i=0;i<nodes.length;i++){var t=text(nodes[i]);if(!newLabel&&/^NEW\s+GAME$/i.test(t)){newLabel=nodes[i];newPanel=nearestPanel(nodes[i],home)}if(!featuredLabel&&/^FEATURED\s+CHALLENGES$/i.test(t)){featuredLabel=nodes[i];featuredPanel=nearestPanel(nodes[i],home)}}
  if(newPanel){newPanel.classList.add('turf-home-polish-panel','turf-home-polish-new');if(newLabel)newLabel.classList.add('turf-home-polish-title')}
  if(featuredPanel){featuredPanel.classList.add('turf-home-polish-panel','turf-home-polish-featured');if(featuredLabel)featuredLabel.classList.add('turf-home-polish-title')}
  if(newPanel&&featuredPanel){var a=newPanel.parentElement,b=featuredPanel.parentElement;if(a&&a===b)a.classList.add('turf-home-polish-row')}
  [newPanel,featuredPanel].forEach(function(panel){if(!panel)return;var ps=qa('p',panel);if(ps[0])ps[0].classList.add('turf-home-polish-subtitle');qa('div',panel).forEach(function(d){if(d===panel)return;var r=null;try{r=d.getBoundingClientRect()}catch(e){}if(r&&r.width>220&&r.height>90&&r.height<360)d.classList.add('turf-home-polish-inner')})})
}
function cleanHomeLegacyCopy(){
  var home=q('#fhqHome');if(!home)return;var walker=document.createTreeWalker(home,NodeFilter.SHOW_TEXT,null),n;
  while((n=walker.nextNode())){var v=n.nodeValue;if(!v||!/FootballHQ|Football Headquarters|HQ Coins|HQ Points/i.test(v))continue;var next=v.replace(/Football Headquarters/gi,'TURF').replace(/FootballHQ/gi,'TURF').replace(/HQ Coins/gi,'TURF Coins').replace(/HQ Points/gi,'XP');if(next!==v)n.nodeValue=next}
}
function apply(){addCss();markPanels();cleanHomeLegacyCopy()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[80,220,500,1000,1800,3000].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('resize',function(){setTimeout(apply,80)});
window.addEventListener('turf:auth-ready',function(){[0,180,600].forEach(function(ms){setTimeout(apply,ms)})});
if(window.MutationObserver){try{new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}}
})();

/* ============================================================
   TURF WORKER AUTH RECEIVER — existing TURF runtime integration
   Auth plumbing only. Does not alter Home, branding, navigation or games.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_WORKER_AUTH_RECEIVER_8962__)return;
window.__TURF_WORKER_AUTH_RECEIVER_8962__=true;
if(window.parent===window)return;
var TRUSTED='https://turftrials.com';
var TOKEN_KEY='turfAuthAccountTokenV1';

function post(data){try{window.parent.postMessage(data,TRUSTED)}catch(e){}}
function saveProfile(profile){
  profile=profile&&typeof profile==='object'?profile:{};
  var token=String(profile.token||'').trim();if(!token)throw new Error('TURF Worker profile did not include a token.');
  try{localStorage.setItem(TOKEN_KEY,token)}catch(e){}
  window.__TURF_AUTH_TOKEN__=token;window.__TURF_AUTH_PROFILE__=profile;
  try{window.fhqGetToken=function(){return window.__TURF_AUTH_TOKEN__||token}}catch(e){}
  try{if(typeof fhqSetRuntimeIdentity==='function')fhqSetRuntimeIdentity(profile)}catch(e){}
  try{if(typeof fhqWriteLastConfirmedAccount==='function')fhqWriteLastConfirmedAccount(profile)}catch(e){}
  try{if(typeof fhqSyncLocalProfileFromServer==='function')fhqSyncLocalProfileFromServer(profile)}catch(e){}
  try{if(typeof fhqRememberLifetimePoints==='function')fhqRememberLifetimePoints(Number(profile.points)||0)}catch(e){}
  try{if(typeof fhqRememberCoins==='function')fhqRememberCoins(Number(profile.hqCoins||profile.coins)||0)}catch(e){}
  try{if(typeof fhqUpdateAccountUI==='function')fhqUpdateAccountUI(profile)}catch(e){}
  try{if(typeof refreshFootballHQScoreDisplays==='function')refreshFootballHQScoreDisplays()}catch(e){}
  try{if(typeof refreshFootballHQDashboard==='function')refreshFootballHQDashboard()}catch(e){}
}
function clearObsoleteLocks(){
  try{document.documentElement.classList.remove('turf-auth-locked','fhq-identity-recovering','recovering','loading','is-loading');document.body&&document.body.classList.remove('turf-auth-locked','fhq-identity-recovering','recovering','loading','is-loading','modal-open')}catch(e){}
  try{var gate=document.getElementById('turfAuthGate');if(gate){gate.classList.add('turf-auth-hidden');gate.style.setProperty('display','none','important');gate.style.setProperty('pointer-events','none','important')}}catch(e){}
  try{document.documentElement.style.removeProperty('pointer-events');document.body.style.removeProperty('pointer-events');document.body.style.removeProperty('filter');document.body.style.removeProperty('opacity');document.body.style.removeProperty('overflow')}catch(e){}
  try{
    var all=document.body?document.body.querySelectorAll('*'):[];
    for(var i=0;i<all.length;i++){
      var el=all[i],txt=String(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
      if(txt.indexOf('recovering your football hq account')<0&&txt.indexOf('restoring your turf account')<0)continue;
      var p=el;
      while(p&&p!==document.body){
        var cs=null,r=null;try{cs=getComputedStyle(p);r=p.getBoundingClientRect()}catch(_){break}
        if(r&&cs&&(cs.position==='fixed'||cs.position==='absolute')&&r.width>window.innerWidth*.45&&r.height>window.innerHeight*.25){p.style.setProperty('display','none','important');p.style.setProperty('visibility','hidden','important');p.style.setProperty('opacity','0','important');p.style.setProperty('pointer-events','none','important');p.setAttribute('aria-hidden','true');break}
        p=p.parentElement;
      }
    }
  }catch(e){}
}
function unlock(profile){
  try{saveProfile(profile);clearObsoleteLocks()}catch(e){post({type:'turf-auth-error',message:e.message||String(e)});return}
  try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:profile}}))}catch(e){}
  [0,80,220,500,1000,1800,3000].forEach(function(ms){setTimeout(function(){clearObsoleteLocks();try{if(typeof fhqUpdateAccountUI==='function')fhqUpdateAccountUI(profile)}catch(e){}},ms)});
  post({type:'turf-auth-ready',token:String(profile.token||''),username:String(profile.username||''),version:'worker-runtime-8962'});
}
window.addEventListener('message',function(e){
  if(e.origin!==TRUSTED||e.source!==window.parent)return;var d=e&&e.data;if(!d||typeof d!=='object')return;
  if(d.type==='turf-auth-worker-profile'&&d.profile&&d.profile.token){unlock(d.profile)}
},true);
post({type:'turf-worker-profile-receiver-ready',version:'worker-runtime-8962'});
post({type:'turf-worker-auth-bridge-ready',version:'worker-runtime-8962'});
})();
