/* ============================================================
   TURF V89.32 — BATCH 3 REPAIR
   Fixes:
   - Remove accidental collection tags overlaying/cropping cards
   - Give 001 / 002 distinct football-themed cover + detail banners
   - Show set number clearly on banners
   - Preserve real account token when opening Trials
   - Keep Avatar shop pack-free and suppress black/legacy flashes
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8932_BATCH3_REPAIR__) return;
window.__TURF_V8932_BATCH3_REPAIR__=true;

function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]})}
function token(){
  try{if(typeof window.fhqGetToken==='function') return String(window.fhqGetToken()||'')}catch(e){}
  try{if(typeof fhqGetToken==='function') return String(fhqGetToken()||'')}catch(e){}
  try{var p=typeof getAccountProfile==='function'?(getAccountProfile()||{}):{};return String(p.token||p.accountToken||'')}catch(e){}
  return '';
}
function shopFilter(){
  try{if(typeof fhqShopFilter!=='undefined') return String(fhqShopFilter||'all').toLowerCase()}catch(e){}
  var a=qs('[data-shop-filter].active');return a?String(a.getAttribute('data-shop-filter')||'all').toLowerCase():'all';
}
function setFromText(el){var t=String(el&&el.textContent||'').toLowerCase();if(t.indexOf('sideline')>=0)return'002';if(t.indexOf('gridiron')>=0)return'001';return''}

function css(){
  if(qs('#turfV8932Css'))return;
  var s=document.createElement('style');s.id='turfV8932Css';s.textContent=`
    /* never allow the V89.31 set tag to land on actual cards */
    #fhqAlbumGrid .v8858-card>.turf8931-set-tag,
    #fhqAlbumGrid .fhq-v8856-card>.turf8931-set-tag,
    #fhqAlbumGrid .v8858-grid .turf8931-set-tag,
    #fhqAlbumGrid .fhq-v8856-grid .turf8931-set-tag{display:none!important}

    /* collection home replacement artwork */
    #fhqAlbumGrid .turf8932-cover-visual{position:relative;height:220px;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.08);background:#07131c;color:#fff}
    #fhqAlbumGrid .turf8932-cover-visual:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:58px 58px;opacity:.35}
    #fhqAlbumGrid .turf8932-cover-visual:after{content:"";position:absolute;width:165px;height:96px;border:5px solid currentColor;border-radius:50%;transform:rotate(-18deg);right:10%;top:62px;opacity:.68;box-shadow:0 0 30px currentColor}
    #fhqAlbumGrid .turf8932-cover-001 .turf8932-cover-visual{color:#71e5ff;background:radial-gradient(circle at 72% 24%,rgba(39,212,255,.27),transparent 31%),linear-gradient(145deg,#062638,#07394a 58%,#081a26)}
    #fhqAlbumGrid .turf8932-cover-002 .turf8932-cover-visual{color:#ffd16d;background:radial-gradient(circle at 72% 24%,rgba(255,188,61,.24),transparent 31%),linear-gradient(145deg,#241609,#4a2e0d 54%,#171b20)}
    #fhqAlbumGrid .turf8932-cover-code{position:absolute;left:18px;top:16px;z-index:3;padding:6px 10px;border:1px solid currentColor;border-radius:999px;background:rgba(4,11,17,.68);font-size:10px;font-weight:1000;letter-spacing:.16em}
    #fhqAlbumGrid .turf8932-cover-copy{position:absolute;left:22px;bottom:22px;z-index:3}.turf8932-cover-copy small{display:block;font-size:9px;font-weight:1000;letter-spacing:.18em;opacity:.8}.turf8932-cover-copy strong{display:block;font-size:27px;margin-top:4px;letter-spacing:-.03em}
    #fhqAlbumGrid .turf8932-yard{position:absolute;left:0;right:0;top:50%;height:4px;background:currentColor;opacity:.22;box-shadow:0 -58px 0 currentColor,0 58px 0 currentColor}
    #fhqAlbumGrid .turf8932-laces{position:absolute;right:calc(10% + 70px);top:102px;width:46px;height:4px;background:currentColor;transform:rotate(-18deg);z-index:2;box-shadow:0 -13px 0 -1px currentColor,0 13px 0 -1px currentColor}

    /* detail banner */
    #fhqAlbumGrid .turf8932-detail-banner{position:relative;height:138px;border:1px solid rgba(255,255,255,.09);border-radius:18px;margin:0 0 20px;overflow:hidden;color:#fff;box-shadow:0 18px 34px rgba(0,0,0,.2)}
    #fhqAlbumGrid .turf8932-detail-banner[data-set="001"]{color:#79e4ff;background:radial-gradient(circle at 76% 20%,rgba(52,214,255,.24),transparent 30%),linear-gradient(135deg,#062637,#0a3c48,#091720)}
    #fhqAlbumGrid .turf8932-detail-banner[data-set="002"]{color:#ffd176;background:radial-gradient(circle at 76% 20%,rgba(255,192,65,.22),transparent 30%),linear-gradient(135deg,#25180b,#4c2e0d,#151a20)}
    #fhqAlbumGrid .turf8932-detail-banner:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 92px,rgba(255,255,255,.09) 92px 94px);opacity:.42}
    #fhqAlbumGrid .turf8932-detail-code{position:absolute;left:20px;top:18px;z-index:2;border:1px solid currentColor;border-radius:999px;padding:6px 10px;background:rgba(5,12,18,.66);font-size:10px;font-weight:1000;letter-spacing:.17em}
    #fhqAlbumGrid .turf8932-detail-copy{position:absolute;left:22px;bottom:20px;z-index:2}.turf8932-detail-copy strong{display:block;font-size:27px}.turf8932-detail-copy span{display:block;font-size:10px;font-weight:900;letter-spacing:.12em;opacity:.78;margin-top:3px}
    #fhqAlbumGrid .turf8932-detail-football{position:absolute;right:9%;top:23px;width:150px;height:88px;border:5px solid currentColor;border-radius:50%;transform:rotate(-18deg);opacity:.7}.turf8932-detail-football:before{content:"";position:absolute;left:50%;top:16px;width:4px;height:50px;background:currentColor;transform:translateX(-50%)}.turf8932-detail-football:after{content:"";position:absolute;left:48px;top:39px;width:54px;height:4px;background:currentColor;box-shadow:0 -11px 0 -1px currentColor,0 11px 0 -1px currentColor}

    /* avatar tab: hold content invisible until actual avatar items are painted */
    #fhqShopGrid[data-turf8932-avatar-loading="1"]{visibility:hidden!important;opacity:0!important}
    #fhqShopGrid .turf8932-pack-sentinel{display:none!important}
  `;document.head.appendChild(s);
}

function cleanCollectionCardTags(){
  qsa('#fhqAlbumGrid .v8858-card,#fhqAlbumGrid .fhq-v8856-card').forEach(function(card){
    qsa('.turf8931-set-tag',card).forEach(function(x){x.remove()});
    card.classList.remove('turf8931-set001','turf8931-set002');
  });
}
function decorateHomeCovers(){
  var root=qs('#fhqAlbumGrid');if(!root)return;
  qsa('.fhq-v823-cover[data-v823-set],[data-open-set],[data-v8855-open-set]',root).forEach(function(cover){
    if(cover.closest('.v8858-grid,.fhq-v8856-grid'))return;
    var set=setFromText(cover);if(!set)return;
    cover.classList.add('turf8932-cover-'+set);
    if(qs('.turf8932-cover-visual',cover))return;
    qsa(':scope > svg,:scope > img,:scope > .fhq-collection-cover-art,:scope > .fhq-v823-art',cover).forEach(function(x){x.style.display='none'});
    var v=document.createElement('div');v.className='turf8932-cover-visual';
    var name=set==='001'?'THE GRIDIRON':'THE SIDELINE';
    var sub=set==='001'?'FIELD • SPEED • IMPACT':'SIDELINE • GEAR • GAME DAY';
    v.innerHTML='<div class="turf8932-yard"></div><div class="turf8932-laces"></div><div class="turf8932-cover-code">SET '+set+'</div><div class="turf8932-cover-copy"><small>'+sub+'</small><strong>'+name+'</strong></div>';
    var bottom=qs('.fhq-collection-cover-bottom,.fhq-v823-cover-bottom',cover);cover.insertBefore(v,bottom||cover.firstChild);
  });
}
function decorateDetail(){
  var root=qs('#fhqAlbumGrid');if(!root)return;
  var detail=qs('.v8858-set,.fhq-v8856-detail,.fhq-v823-detail,.fhq-collection-detail',root);if(!detail)return;
  cleanCollectionCardTags();
  if(qs('.turf8932-detail-banner',detail))return;
  var set=setFromText(detail);if(!set)return;
  var name=set==='001'?'THE GRIDIRON':'THE SIDELINE';
  var sub=set==='001'?'BUILT ON THE FIELD':'BEYOND THE WHITE STRIPE';
  var b=document.createElement('div');b.className='turf8932-detail-banner';b.setAttribute('data-set',set);
  b.innerHTML='<div class="turf8932-detail-code">SET '+set+'</div><div class="turf8932-detail-copy"><strong>'+name+'</strong><span>'+sub+'</span></div><div class="turf8932-detail-football"></div>';
  var back=qs('.v8858-back,.fhq-v8856-back,#fhqV823Back',detail);if(back&&back.parentNode)back.parentNode.insertBefore(b,back.nextSibling);else detail.insertBefore(b,detail.firstChild);
}

function openTrialsWithToken(e){
  var hit=e.target&&e.target.closest?e.target.closest('#turfTrialsNav'):null;if(!hit)return;
  var t=token();if(!t)return;
  e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  var path='/trials/?token='+encodeURIComponent(t);
  try{if(window.top)window.top.postMessage({type:'turf-open-trials',path:path,version:'8932'},'*')}catch(err){}
  try{if(window.parent&&window.parent!==window.top)window.parent.postMessage({type:'turf-open-trials',path:path,version:'8932'},'*')}catch(err){}
}

function stripAvatarPacks(){
  var g=qs('#fhqShopGrid');if(!g||shopFilter()!=='avatar')return;
  qsa('[data-shop-pack-card]',g).forEach(function(x){if(!x.classList.contains('turf8932-pack-sentinel'))x.remove()});
  qsa('.fhq-v8831-shop-heading',g).forEach(function(h){if(/pack/i.test(h.textContent||''))h.remove()});
  if(!qs('.turf8932-pack-sentinel',g)){
    var sentinel=document.createElement('i');sentinel.className='turf8932-pack-sentinel';sentinel.setAttribute('data-shop-pack-card','avatar-sentinel');g.appendChild(sentinel);
  }
  var avatars=qsa('.fhq-shop-item:not([data-shop-pack-card])',g);
  if(avatars.length){delete g.dataset.turf8932AvatarLoading;g.style.visibility='visible';g.style.opacity='1'}
}
function loadAvatarShop(){
  var g=qs('#fhqShopGrid');if(!g||shopFilter()!=='avatar')return;
  g.dataset.turf8932AvatarLoading='1';
  try{if(typeof window.fhqLoadShop==='function')window.fhqLoadShop();else if(typeof fhqLoadShop==='function')fhqLoadShop()}catch(e){}
  [80,180,350,700,1300].forEach(function(ms){setTimeout(stripAvatarPacks,ms)});
  setTimeout(function(){
    if(shopFilter()!=='avatar')return;
    stripAvatarPacks();
    if(g.dataset.turf8932AvatarLoading==='1'){
      delete g.dataset.turf8932AvatarLoading;
      g.innerHTML='<div style="grid-column:1/-1;padding:28px;border:1px solid #294656;border-radius:16px;background:#0a1720;color:#9fb4c1">No avatar items were returned for this account.</div><i class="turf8932-pack-sentinel" data-shop-pack-card="avatar-sentinel"></i>';
    }
  },1800);
}

function apply(){css();cleanCollectionCardTags();decorateHomeCovers();decorateDetail();if(shopFilter()==='avatar')stripAvatarPacks()}

window.addEventListener('click',openTrialsWithToken,true);
document.addEventListener('click',function(e){
  var f=e.target&&e.target.closest?e.target.closest('[data-shop-filter="avatar"],[data-shop-filter="avatars"]'):null;
  if(f){setTimeout(loadAvatarShop,0);setTimeout(loadAvatarShop,120)}
  var n=e.target&&e.target.closest?e.target.closest('[data-fhq-nav="album"],[data-fhq-nav="shop"],#fhqAlbumGrid button,#fhqAlbumGrid [data-open-set],#fhqAlbumGrid [data-v823-set]'):null;
  if(n)[0,80,220,600].forEach(function(ms){setTimeout(apply,ms)});
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,350,900,1800].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8932Timer);window.__turf8932Timer=setTimeout(apply,55)}).observe(document.documentElement,{childList:true,subtree:true});
})();
