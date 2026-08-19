/* ============================================================
   TURF V89.33 — BATCH 3 REPAIR / COLLECTION + AVATAR STABILITY
   - Stable Avatar shop snapshot (no pack repaint/glitch loop)
   - New common collection cover format: set # left / set name right
   - Colorful football-themed cover art for 001 / 002 without team/NFL logos
   - Removes older V89.32 collection cover inserts before repainting
   - Preserves collection-card art and Trials account-token forwarding
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8933_BATCH3_REPAIR__) return;
window.__TURF_V8933_BATCH3_REPAIR__=true;

function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function token(){
  try{if(typeof window.fhqGetToken==='function') return String(window.fhqGetToken()||'')}catch(e){}
  try{if(typeof fhqGetToken==='function') return String(fhqGetToken()||'')}catch(e){}
  try{var p=typeof getAccountProfile==='function'?(getAccountProfile()||{}):{};return String(p.token||p.accountToken||'')}catch(e){}
  return '';
}
function setFromText(el){var t=String(el&&el.textContent||'').toLowerCase();if(t.indexOf('sideline')>=0)return'002';if(t.indexOf('gridiron')>=0)return'001';return''}
function shopFilter(){
  try{if(typeof fhqShopFilter!=='undefined') return String(fhqShopFilter||'all').toLowerCase()}catch(e){}
  var a=qs('[data-shop-filter].active');return a?String(a.getAttribute('data-shop-filter')||'all').toLowerCase():'all';
}

function addCss(){
  if(qs('#turfV8933Css'))return;
  var s=document.createElement('style');s.id='turfV8933Css';s.textContent=`
    /* ---------- COLLECTION HOME: one repeatable premium format ---------- */
    #fhqAlbumGrid .turf8933-cover{overflow:hidden!important;position:relative!important}
    #fhqAlbumGrid .turf8933-cover>.turf8932-cover-visual{display:none!important}
    #fhqAlbumGrid .turf8933-cover-art{height:255px;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.10);isolation:isolate}
    #fhqAlbumGrid .turf8933-cover-art:before{content:"";position:absolute;inset:0;z-index:-2}
    #fhqAlbumGrid .turf8933-cover-art:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(255,255,255,.05),transparent 28%,rgba(0,0,0,.22));pointer-events:none}
    #fhqAlbumGrid .turf8933-cover-001 .turf8933-cover-art:before{background:radial-gradient(circle at 72% 32%,rgba(69,225,255,.58),transparent 24%),radial-gradient(circle at 16% 80%,rgba(55,255,170,.30),transparent 30%),linear-gradient(135deg,#082c5e 0%,#075f78 48%,#073c45 72%,#071a28 100%)}
    #fhqAlbumGrid .turf8933-cover-002 .turf8933-cover-art:before{background:radial-gradient(circle at 75% 24%,rgba(255,226,92,.54),transparent 24%),radial-gradient(circle at 15% 82%,rgba(255,78,154,.32),transparent 30%),linear-gradient(135deg,#5a1d0d 0%,#a74e13 46%,#6b234f 76%,#211127 100%)}
    #fhqAlbumGrid .turf8933-topline{position:absolute;left:22px;right:22px;top:18px;display:flex;justify-content:space-between;align-items:center;gap:18px;z-index:5}
    #fhqAlbumGrid .turf8933-setno{font-size:13px;font-weight:1000;letter-spacing:.23em;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.45)}
    #fhqAlbumGrid .turf8933-setname{font-size:18px;font-weight:1000;letter-spacing:.08em;color:#fff;text-align:right;text-shadow:0 2px 12px rgba(0,0,0,.45)}
    #fhqAlbumGrid .turf8933-field{position:absolute;left:4%;right:4%;bottom:-48px;height:180px;border:2px solid rgba(255,255,255,.18);border-radius:48% 48% 0 0;transform:perspective(480px) rotateX(58deg);transform-origin:bottom;background:repeating-linear-gradient(90deg,rgba(255,255,255,.10) 0 2px,transparent 2px 76px),repeating-linear-gradient(0deg,rgba(255,255,255,.09) 0 2px,transparent 2px 38px)}
    #fhqAlbumGrid .turf8933-football{position:absolute;right:11%;top:74px;width:146px;height:86px;border:5px solid rgba(255,255,255,.72);border-radius:50%;transform:rotate(-18deg);filter:drop-shadow(0 0 18px rgba(255,255,255,.20))}
    #fhqAlbumGrid .turf8933-football:before{content:"";position:absolute;left:50%;top:17px;width:4px;height:48px;background:rgba(255,255,255,.78);transform:translateX(-50%)}
    #fhqAlbumGrid .turf8933-football:after{content:"";position:absolute;left:46px;top:39px;width:52px;height:4px;background:rgba(255,255,255,.78);box-shadow:0 -12px 0 -1px rgba(255,255,255,.72),0 12px 0 -1px rgba(255,255,255,.72)}
    #fhqAlbumGrid .turf8933-goal{position:absolute;left:11%;bottom:42px;width:95px;height:92px;border-left:6px solid rgba(255,255,255,.45);border-right:6px solid rgba(255,255,255,.45);border-top:6px solid rgba(255,255,255,.45);border-radius:4px 4px 0 0}
    #fhqAlbumGrid .turf8933-goal:after{content:"";position:absolute;left:41px;top:0;width:6px;height:115px;background:rgba(255,255,255,.45)}
    #fhqAlbumGrid .turf8933-accent{position:absolute;left:22px;bottom:20px;z-index:4;font-size:10px;font-weight:1000;letter-spacing:.20em;color:rgba(255,255,255,.82)}
    #fhqAlbumGrid .turf8933-cover-001 .turf8933-accent:before{content:"FIELD • SPEED • IMPACT"}
    #fhqAlbumGrid .turf8933-cover-002 .turf8933-accent:before{content:"SIDELINE • GEAR • GAME DAY"}

    /* remove accidental old set pills from individual cards */
    #fhqAlbumGrid .v8858-grid .turf8931-set-tag,#fhqAlbumGrid .fhq-v8856-grid .turf8931-set-tag{display:none!important}

    /* ---------- AVATAR SHOP: use a stable cloned surface ---------- */
    #turf8933AvatarSurface{display:none;grid-template-columns:repeat(auto-fit,minmax(285px,1fr));gap:18px;margin-top:24px}
    body.turf8933-avatar-mode #turf8933AvatarSurface{display:grid}
    body.turf8933-avatar-mode #fhqShopGrid{position:absolute!important;left:-99999px!important;top:-99999px!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}
    #turf8933AvatarSurface .turf8933-avatar-head{grid-column:1/-1;border:1px solid rgba(94,205,255,.20);background:linear-gradient(145deg,#0c2030,#0a1721);border-radius:16px;padding:18px 20px}
    #turf8933AvatarSurface .turf8933-avatar-head small{display:block;color:#75d7ff;font-size:9px;font-weight:1000;letter-spacing:.20em;margin-bottom:5px}
    #turf8933AvatarSurface .turf8933-avatar-head h2{margin:0;color:#fff;font-size:25px}
    #turf8933AvatarSurface .fhq-shop-item{display:block!important}
    #turf8933AvatarSurface [data-shop-pack-card],#turf8933AvatarSurface .fhq-pack-card{display:none!important}
    #turf8933AvatarSurface .turf8933-avatar-loading{grid-column:1/-1;padding:30px;border:1px solid #294656;border-radius:16px;background:#0a1720;color:#9fb4c1;text-align:center;font-weight:800}
  `;document.head.appendChild(s);
}

function cleanCollectionCardTags(){
  qsa('#fhqAlbumGrid .v8858-card,#fhqAlbumGrid .fhq-v8856-card').forEach(function(card){
    qsa('.turf8931-set-tag',card).forEach(function(x){x.remove()});
    card.classList.remove('turf8931-set001','turf8931-set002');
  });
}

function paintCollectionCovers(){
  var root=qs('#fhqAlbumGrid');if(!root)return;
  qsa('.fhq-v823-cover[data-v823-set],[data-open-set],[data-v8855-open-set]',root).forEach(function(cover){
    if(cover.closest('.v8858-grid,.fhq-v8856-grid'))return;
    var set=setFromText(cover);if(!set)return;
    cover.classList.add('turf8933-cover','turf8933-cover-'+set);
    qsa(':scope > .turf8932-cover-visual,:scope > .turf8933-cover-art',cover).forEach(function(x){x.remove()});
    qsa(':scope > svg,:scope > img,:scope > .fhq-collection-cover-art,:scope > .fhq-v823-art',cover).forEach(function(x){x.style.display='none'});
    var art=document.createElement('div');art.className='turf8933-cover-art';
    var name=set==='001'?'THE GRIDIRON':'THE SIDELINE';
    art.innerHTML='<div class="turf8933-topline"><span class="turf8933-setno">'+set+'</span><span class="turf8933-setname">'+name+'</span></div><div class="turf8933-field"></div><div class="turf8933-goal"></div><div class="turf8933-football"></div><div class="turf8933-accent"></div>';
    var bottom=qs('.fhq-collection-cover-bottom,.fhq-v823-cover-bottom',cover);cover.insertBefore(art,bottom||cover.firstChild);
  });
}

function ensureAvatarSurface(){
  var g=qs('#fhqShopGrid');if(!g)return null;
  var surf=qs('#turf8933AvatarSurface');
  if(!surf){surf=document.createElement('section');surf.id='turf8933AvatarSurface';g.parentNode.insertBefore(surf,g.nextSibling)}
  return surf;
}
function wireAvatarButtons(root){
  qsa('[data-shop-buy]',root).forEach(function(b){
    if(b.dataset.turf8933Wired==='1')return;b.dataset.turf8933Wired='1';
    b.addEventListener('click',function(){try{if(typeof fhqBuyShopItem==='function')fhqBuyShopItem(this.dataset.shopBuy)}catch(e){}},false);
  });
}
function snapshotAvatars(){
  if(!document.body.classList.contains('turf8933-avatar-mode'))return false;
  var g=qs('#fhqShopGrid'),surf=ensureAvatarSurface();if(!g||!surf)return false;
  var cards=qsa('.fhq-shop-item',g).filter(function(x){return !x.matches('[data-shop-pack-card],.fhq-pack-card') && !x.querySelector('[data-shop-pack-card]')});
  if(!cards.length)return false;
  surf.innerHTML='<div class="turf8933-avatar-head"><small>PROFILE COSMETICS</small><h2>Avatars</h2></div>'+cards.map(function(x){return x.outerHTML}).join('');
  wireAvatarButtons(surf);return true;
}
function enterAvatarMode(){
  document.body.classList.add('turf8933-avatar-mode');
  var surf=ensureAvatarSurface();if(surf)surf.innerHTML='<div class="turf8933-avatar-loading">Loading avatars…</div>';
  /* Let the existing shop renderer do one normal data paint, then copy only actual avatars
     onto our stable surface. We do NOT call fhqLoadShop here, which was causing the repaint loop. */
  [20,55,100,180,320,600,1000,1600].forEach(function(ms){setTimeout(snapshotAvatars,ms)});
  setTimeout(function(){
    if(!document.body.classList.contains('turf8933-avatar-mode'))return;
    var s=ensureAvatarSurface();if(!s)return;
    if(!s.querySelector('.fhq-shop-item'))s.innerHTML='<div class="turf8933-avatar-loading">No avatar items were returned. Try leaving the Shop and opening Avatars again.</div>';
  },2200);
}
function leaveAvatarMode(){document.body.classList.remove('turf8933-avatar-mode')}

function openTrialsWithToken(e){
  var hit=e.target&&e.target.closest?e.target.closest('#turfTrialsNav'):null;if(!hit)return;
  var t=token();if(!t)return;
  e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  var path='/trials/?token='+encodeURIComponent(t);
  try{if(window.top)window.top.postMessage({type:'turf-open-trials',path:path,version:'8933'},'*')}catch(err){}
  try{if(window.parent&&window.parent!==window.top)window.parent.postMessage({type:'turf-open-trials',path:path,version:'8933'},'*')}catch(err){}
}

function apply(){addCss();cleanCollectionCardTags();paintCollectionCovers();if(document.body.classList.contains('turf8933-avatar-mode'))snapshotAvatars()}

window.addEventListener('click',openTrialsWithToken,true);
document.addEventListener('click',function(e){
  var avatar=e.target&&e.target.closest?e.target.closest('[data-shop-filter="avatar"],[data-shop-filter="avatars"]'):null;
  var other=e.target&&e.target.closest?e.target.closest('[data-shop-filter="all"],[data-shop-filter="pack"],[data-fhq-nav]:not([data-fhq-nav="shop"])'):null;
  if(avatar)setTimeout(enterAvatarMode,0);
  else if(other)leaveAvatarMode();
  var c=e.target&&e.target.closest?e.target.closest('[data-fhq-nav="album"],#fhqAlbumGrid button,#fhqAlbumGrid [data-open-set],#fhqAlbumGrid [data-v823-set]'):null;
  if(c)[0,80,220,600].forEach(function(ms){setTimeout(apply,ms)});
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,350,900,1800].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8933Timer);window.__turf8933Timer=setTimeout(apply,55)}).observe(document.documentElement,{childList:true,subtree:true});
})();
