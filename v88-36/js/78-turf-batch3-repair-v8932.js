/* ============================================================
   TURF V89.34 — BATCH 3 REPAIR / PREMIUM COLLECTION COVERS
   - Completely removes the legacy green collection-cover artwork
   - Rebuilds 001 / 002 as one unified premium cover surface
   - Set # upper-left / set name upper-right
   - Detailed football/stadium/playbook backgrounds + subtle TURF T watermark
   - Keeps Avatar stability patch and Trials account-token forwarding
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8934_BATCH3_REPAIR__) return;
window.__TURF_V8934_BATCH3_REPAIR__=true;

function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function token(){
  try{if(typeof window.fhqGetToken==='function') return String(window.fhqGetToken()||'')}catch(e){}
  try{if(typeof fhqGetToken==='function') return String(fhqGetToken()||'')}catch(e){}
  try{var p=typeof getAccountProfile==='function'?(getAccountProfile()||{}):{};return String(p.token||p.accountToken||'')}catch(e){}
  return '';
}
function setFromText(el){var t=String(el&&el.textContent||'').toLowerCase();if(t.indexOf('sideline')>=0)return'002';if(t.indexOf('gridiron')>=0)return'001';return''}

function addCss(){
  if(qs('#turfV8934Css'))return;
  var s=document.createElement('style');s.id='turfV8934Css';s.textContent=`
    /* ==================== COLLECTION COVERS ==================== */
    #fhqAlbumGrid .turf8934-cover{overflow:hidden!important;position:relative!important}
    #fhqAlbumGrid .turf8934-cover-art{height:330px;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.12);isolation:isolate;background:#07131d}
    #fhqAlbumGrid .turf8934-cover-art:before{content:"";position:absolute;inset:0;z-index:-4}
    #fhqAlbumGrid .turf8934-cover-art:after{content:"";position:absolute;inset:0;z-index:20;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.07),transparent 18%,transparent 72%,rgba(0,0,0,.36));box-shadow:inset 0 0 70px rgba(0,0,0,.34)}
    #fhqAlbumGrid .turf8934-cover-001 .turf8934-cover-art:before{background:radial-gradient(circle at 72% 28%,rgba(70,230,255,.48),transparent 21%),radial-gradient(circle at 15% 90%,rgba(35,255,175,.25),transparent 30%),linear-gradient(135deg,#062854 0%,#075d79 42%,#07524d 69%,#071924 100%)}
    #fhqAlbumGrid .turf8934-cover-002 .turf8934-cover-art:before{background:radial-gradient(circle at 77% 22%,rgba(255,217,83,.45),transparent 20%),radial-gradient(circle at 12% 86%,rgba(255,75,139,.28),transparent 31%),linear-gradient(135deg,#541b0a 0%,#aa4b10 39%,#73204c 70%,#1b1028 100%)}

    #fhqAlbumGrid .turf8934-topline{position:absolute;left:24px;right:24px;top:19px;display:flex;justify-content:space-between;align-items:center;gap:18px;z-index:30}
    #fhqAlbumGrid .turf8934-setno{font-size:14px;font-weight:1000;letter-spacing:.25em;color:#fff;text-shadow:0 3px 16px rgba(0,0,0,.6)}
    #fhqAlbumGrid .turf8934-setname{font-size:19px;font-weight:1000;letter-spacing:.10em;color:#fff;text-align:right;text-shadow:0 3px 16px rgba(0,0,0,.6)}

    /* huge subtle TURF T watermark */
    #fhqAlbumGrid .turf8934-watermark{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) skewX(-9deg);font-family:Arial Black,Arial,sans-serif;font-size:210px;line-height:.8;font-weight:1000;color:rgba(255,255,255,.055);text-shadow:0 0 34px rgba(255,255,255,.055);z-index:1;user-select:none}
    #fhqAlbumGrid .turf8934-watermark:after{content:"TURF";position:absolute;left:50%;top:50%;transform:translate(-50%,66px) skewX(9deg);font:1000 21px/1 Arial,sans-serif;letter-spacing:.46em;color:rgba(255,255,255,.055);white-space:nowrap}

    /* stadium lights */
    #fhqAlbumGrid .turf8934-lights{position:absolute;left:5%;right:5%;top:64px;height:26px;z-index:2;background:radial-gradient(circle at 4% 50%,rgba(255,255,255,.65) 0 2px,transparent 3px),radial-gradient(circle at 12% 50%,rgba(255,255,255,.48) 0 2px,transparent 3px),radial-gradient(circle at 20% 50%,rgba(255,255,255,.58) 0 2px,transparent 3px),radial-gradient(circle at 80% 50%,rgba(255,255,255,.58) 0 2px,transparent 3px),radial-gradient(circle at 88% 50%,rgba(255,255,255,.48) 0 2px,transparent 3px),radial-gradient(circle at 96% 50%,rgba(255,255,255,.65) 0 2px,transparent 3px);opacity:.65;filter:drop-shadow(0 0 8px rgba(255,255,255,.35))}

    /* field perspective */
    #fhqAlbumGrid .turf8934-field{position:absolute;left:-4%;right:-4%;bottom:-74px;height:245px;border-top:2px solid rgba(255,255,255,.15);transform:perspective(530px) rotateX(61deg);transform-origin:bottom;z-index:2;background:repeating-linear-gradient(90deg,rgba(255,255,255,.10) 0 2px,transparent 2px 78px),repeating-linear-gradient(0deg,rgba(255,255,255,.10) 0 2px,transparent 2px 38px)}
    #fhqAlbumGrid .turf8934-field:after{content:"10     20     30     40     50     40     30     20     10";position:absolute;left:5%;right:5%;top:88px;color:rgba(255,255,255,.14);font-size:16px;font-weight:1000;letter-spacing:.14em;word-spacing:22px;white-space:nowrap;text-align:center}

    /* generic football */
    #fhqAlbumGrid .turf8934-football{position:absolute;right:8%;top:100px;width:150px;height:88px;border:5px solid rgba(255,255,255,.68);border-radius:50%;transform:rotate(-18deg);z-index:7;filter:drop-shadow(0 0 18px rgba(255,255,255,.18))}
    #fhqAlbumGrid .turf8934-football:before{content:"";position:absolute;left:50%;top:17px;width:4px;height:50px;background:rgba(255,255,255,.74);transform:translateX(-50%)}
    #fhqAlbumGrid .turf8934-football:after{content:"";position:absolute;left:47px;top:40px;width:52px;height:4px;background:rgba(255,255,255,.74);box-shadow:0 -12px 0 -1px rgba(255,255,255,.68),0 12px 0 -1px rgba(255,255,255,.68)}

    /* goal post */
    #fhqAlbumGrid .turf8934-goal{position:absolute;left:9%;bottom:68px;width:96px;height:98px;border-left:6px solid rgba(255,255,255,.34);border-right:6px solid rgba(255,255,255,.34);border-top:6px solid rgba(255,255,255,.34);z-index:5;filter:drop-shadow(0 0 12px rgba(255,255,255,.12))}
    #fhqAlbumGrid .turf8934-goal:after{content:"";position:absolute;left:42px;top:0;width:6px;height:127px;background:rgba(255,255,255,.34)}

    /* play-diagram layer */
    #fhqAlbumGrid .turf8934-play{position:absolute;inset:90px 0 0;z-index:6;opacity:.35}
    #fhqAlbumGrid .turf8934-play .dot{position:absolute;width:9px;height:9px;border:2px solid rgba(255,255,255,.7);border-radius:50%}
    #fhqAlbumGrid .turf8934-play .d1{left:37%;top:24%}.turf8934-play .d2{left:43%;top:48%}.turf8934-play .d3{left:31%;top:58%}
    #fhqAlbumGrid .turf8934-play .route{position:absolute;border-top:2px dashed rgba(255,255,255,.58);width:85px;height:50px;border-radius:50%;transform:rotate(-27deg)}
    #fhqAlbumGrid .turf8934-play .r1{left:38%;top:28%}.turf8934-play .r2{left:28%;top:61%;transform:rotate(18deg);width:110px}

    /* hash marks / speed streaks */
    #fhqAlbumGrid .turf8934-hashes{position:absolute;left:48%;top:102px;width:86px;height:105px;z-index:3;opacity:.20;background:repeating-linear-gradient(0deg,transparent 0 13px,rgba(255,255,255,.8) 13px 16px)}
    #fhqAlbumGrid .turf8934-speed{position:absolute;left:2%;right:2%;bottom:38px;height:60px;z-index:3;background:repeating-linear-gradient(165deg,transparent 0 34px,rgba(255,255,255,.09) 34px 37px)}

    #fhqAlbumGrid .turf8934-accent{position:absolute;left:24px;bottom:22px;z-index:30;font-size:10px;font-weight:1000;letter-spacing:.20em;color:rgba(255,255,255,.88);text-shadow:0 2px 8px rgba(0,0,0,.42)}
    #fhqAlbumGrid .turf8934-cover-001 .turf8934-accent:before{content:"FIELD • SPEED • IMPACT"}
    #fhqAlbumGrid .turf8934-cover-002 .turf8934-accent:before{content:"SIDELINE • GEAR • GAME DAY"}

    /* Set-specific extra treatment */
    #fhqAlbumGrid .turf8934-cover-001 .turf8934-football{border-color:rgba(192,244,255,.74)}
    #fhqAlbumGrid .turf8934-cover-001 .turf8934-watermark{color:rgba(143,241,255,.06)}
    #fhqAlbumGrid .turf8934-cover-002 .turf8934-watermark{color:rgba(255,219,127,.06)}
    #fhqAlbumGrid .turf8934-cover-002 .turf8934-play{opacity:.48}

    /* remove accidental old set pills from individual cards */
    #fhqAlbumGrid .v8858-grid .turf8931-set-tag,#fhqAlbumGrid .fhq-v8856-grid .turf8931-set-tag{display:none!important}

    /* ==================== AVATAR SHOP STABILITY ==================== */
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
    cover.classList.add('turf8934-cover','turf8934-cover-'+set);

    /* Remove every previous injected premium cover. */
    qsa(':scope > .turf8932-cover-visual,:scope > .turf8933-cover-art,:scope > .turf8934-cover-art',cover).forEach(function(x){x.remove()});

    /* Identify the actual lower information panel first. Anything else above it is legacy art
       and gets hidden so the old green illustration can never sit beneath the new cover. */
    var bottom=qs(':scope > .fhq-collection-cover-bottom,:scope > .fhq-v823-cover-bottom',cover) || qs('.fhq-collection-cover-bottom,.fhq-v823-cover-bottom',cover);
    Array.prototype.slice.call(cover.children).forEach(function(child){
      if(child===bottom)return;
      child.style.display='none';
      child.setAttribute('data-turf8934-legacy-cover','1');
    });

    var art=document.createElement('div');art.className='turf8934-cover-art';art.style.display='block';
    var name=set==='001'?'THE GRIDIRON':'THE SIDELINE';
    art.innerHTML='<div class="turf8934-topline"><span class="turf8934-setno">'+set+'</span><span class="turf8934-setname">'+name+'</span></div><div class="turf8934-watermark">T</div><div class="turf8934-lights"></div><div class="turf8934-field"></div><div class="turf8934-goal"></div><div class="turf8934-football"></div><div class="turf8934-play"><i class="dot d1"></i><i class="dot d2"></i><i class="dot d3"></i><i class="route r1"></i><i class="route r2"></i></div><div class="turf8934-hashes"></div><div class="turf8934-speed"></div><div class="turf8934-accent"></div>';
    cover.insertBefore(art,bottom||cover.firstChild);
    if(bottom)bottom.style.display='block';
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
  try{if(window.top)window.top.postMessage({type:'turf-open-trials',path:path,version:'8934'},'*')}catch(err){}
  try{if(window.parent&&window.parent!==window.top)window.parent.postMessage({type:'turf-open-trials',path:path,version:'8934'},'*')}catch(err){}
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
new MutationObserver(function(){clearTimeout(window.__turf8934Timer);window.__turf8934Timer=setTimeout(apply,55)}).observe(document.documentElement,{childList:true,subtree:true});
})();
