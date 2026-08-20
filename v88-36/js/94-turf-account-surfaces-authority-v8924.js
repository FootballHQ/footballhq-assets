/* ============================================================
   TURF v89.24 — AUTHENTICATED ACCOUNT SURFACES AUTHORITY
   Keeps Profile/Achievements, Pass Rewards/Locker and Collections
   synchronized with the already-verified Google-authenticated profile.
   Non-destructive: no account writes, purchases or reward claims.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACCOUNT_SURFACES_8924__)return;
window.__TURF_ACCOUNT_SURFACES_8924__=true;

var profile=null, busy=false, lastFetch=0;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function txt(id,v){var n=q('#'+id);if(n&&v!=null)n.textContent=String(v)}
function authToken(){
  try{if(window.__TURF_AUTH_TOKEN__)return String(window.__TURF_AUTH_TOKEN__)}catch(e){}
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return String(window.__TURF_AUTH_PROFILE__.token)}catch(e){}
  return '';
}
function knownProfile(){
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__}catch(e){}
  return profile;
}
function publish(p){
  if(!p||!p.token)return;
  profile=p;
  window.__TURF_AUTH_TOKEN__=String(p.token);
  window.__TURF_AUTH_PROFILE__=p;
  /* Legacy surfaces frequently call fhqGetToken. Authenticated identity always wins. */
  try{window.fhqGetToken=function(){return String(window.__TURF_AUTH_TOKEN__||'')}}catch(e){}
  try{window.fhqCurrentAccount=p}catch(e){}
  try{window.__FHQ_PROFILE__=p}catch(e){}
  applyAll(p);
}
function refresh(force){
  var token=authToken();
  if(!token||!window.google||!google.script||!google.script.run)return;
  var now=Date.now(); if(busy||(!force&&now-lastFetch<1800))return;
  busy=true;lastFetch=now;
  try{
    google.script.run
      .withSuccessHandler(function(p){busy=false;if(p&&p.token)publish(p)})
      .withFailureHandler(function(){busy=false})
      .getFootballHQAccount(token);
  }catch(e){busy=false}
}

function applyCore(p){
  txt('fhqGlobalCoins',Number(p.hqCoins||0));
  txt('turfTopCoins',Number(p.hqCoins||0));
  txt('fhqAccountName',p.username||'PLAYER');
  var meta=q('#fhqAccountMeta');if(meta)meta.textContent=(p.equippedTitle||('Level '+Number(p.level||1)));
  txt('fhqDashLifetime',Number(p.points||0));
  txt('fhqDashStreak',Number(p.streakDays||0));
}
function applyProfile(p){
  txt('fhqProfileName',p.username||'PLAYER');
  txt('fhqProfileLifetimePoints',Number(p.points||0));
  txt('fhqProfileDailyWins',Number(p.dailyWins||0));
  txt('fhqProfileDailies',Number(p.totalDailies||0));
  txt('fhqProfileStreak',Number(p.streakDays||0));
  var sub=q('#fhqProfileSub');if(sub)sub.textContent=(p.equippedTitle?String(p.equippedTitle)+' • ':'')+'Level '+Number(p.level||1)+' • TURF account';
  var a=q('#fhqProfileAvatarLarge');if(a){
    if(p.avatarUrl){a.innerHTML='<img alt="" src="'+String(p.avatarUrl).replace(/"/g,'&quot;')+'" style="width:100%;height:100%;object-fit:contain">'}
    else if(p.avatarEmoji){a.textContent=p.avatarEmoji}
  }
}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function itemIcon(it){
  var t=String(it&&it.type||'').toLowerCase();
  if(t==='avatar')return '◉';if(t==='title')return '★';if(t==='ring')return '◌';if(t==='banner')return '▰';return '◆';
}
function renderOwnedGrid(el,items,kind){
  if(!el)return;
  items=(items||[]).filter(function(it){return it&&(!kind||String(it.type||'').toLowerCase()===kind)});
  if(!items.length){el.innerHTML='<div class="turf-owned-empty">No unlocked items in this category yet.</div>';return}
  el.innerHTML=items.map(function(it){
    return '<div class="turf-owned-reward"><div class="turf-owned-icon">'+itemIcon(it)+'</div><strong>'+esc(it.name||it.value||'TURF Reward')+'</strong><small>'+esc(it.source||'Unlocked')+'</small></div>';
  }).join('');
}
function applyRewards(p){
  var inv=Array.isArray(p.inventory)?p.inventory:[];
  var avatars=inv.filter(function(x){return String(x&&x.type||'').toLowerCase()==='avatar'});
  var titles=inv.filter(function(x){return String(x&&x.type||'').toLowerCase()==='title'});
  var competitive=inv.filter(function(x){var t=String(x&&x.type||'').toLowerCase();return t==='ring'||t==='banner'});
  /* Only replace truly blank grids; native populated grids keep their richer art/buttons. */
  var ag=q('#fhqPassAvatarRewards'),tg=q('#fhqPassTitleRewards'),cg=q('#fhqCompetitiveRewards');
  if(ag&&(!ag.children.length||/guest/i.test(ag.textContent||'')))renderOwnedGrid(ag,avatars,'avatar');
  if(tg&&(!tg.children.length||/guest/i.test(tg.textContent||'')))renderOwnedGrid(tg,titles,'title');
  if(cg&&(!cg.children.length||/guest/i.test(cg.textContent||'')))renderOwnedGrid(cg,competitive,'');
}
function collectionId(setNo,num){
  if(setNo===1)return 'tg'+String(num).padStart(3,'0');
  if(setNo===2)return 'ts002-'+String(num).padStart(3,'0');
  return '';
}
function detectSetNo(){
  var root=q('#fhqAlbumPage')||document;
  var t=String(root.textContent||'');
  var m=t.match(/SET\s*0*(\d+)/i);if(m)return Number(m[1]);
  if(/The Sideline/i.test(t))return 2;
  if(/Gridiron/i.test(t))return 1;
  return 0;
}
function applyCollectionDetail(p){
  var root=q('#fhqAlbumPage');if(!root)return;
  var owned={};(Array.isArray(p.collection)?p.collection:[]).forEach(function(id){owned[String(id)]=true});
  var setNo=detectSetNo();if(!setNo)return;
  var cards=qa('div',root).filter(function(el){
    if(!el.querySelector('img'))return false;
    var t=String(el.textContent||'').trim();return /(?:^|\s)0?\d{1,3}(?:\s|$)/.test(t)&&el.children.length<15;
  });
  var seen={},ownedOnPage=0,total=0;
  cards.forEach(function(card){
    var t=String(card.textContent||'');var m=t.match(/(?:^|\s)0*(\d{1,3})(?:\s|$)/);if(!m)return;
    var n=Number(m[1]);if(!n||seen[n])return;seen[n]=1;total++;
    var id=collectionId(setNo,n),isOwned=!!owned[id];if(isOwned)ownedOnPage++;
    if(isOwned){
      card.classList.remove('locked','is-locked','fhq-locked');
      card.classList.add('turf-auth-owned');
      qa('[class*="lock"],.locked-overlay',card).forEach(function(x){if(/locked/i.test(x.textContent||'')||/lock/i.test(x.className||''))x.style.display='none'});
      var im=q('img',card);if(im){im.style.opacity='1';im.style.filter='none'}
    }
  });
  /* Fix visible X / total collection count when the page exposes one. */
  qa('strong,b,div,span',root).forEach(function(el){
    if(el.children.length)return;var s=String(el.textContent||'').trim();
    if(/^\d+\s*\/\s*\d+$/.test(s)&&total){el.textContent=ownedOnPage+' / '+total}
  });
}
function applyAll(p){applyCore(p);applyProfile(p);applyRewards(p);applyCollectionDetail(p)}

var css=document.createElement('style');css.id='turf-account-surfaces-8924-css';css.textContent='\
.turf-owned-empty{grid-column:1/-1;padding:22px;border:1px dashed rgba(86,191,236,.25);border-radius:14px;color:#87a3b4;font-weight:800}\
.turf-owned-reward{min-height:112px;padding:14px;border:1px solid rgba(83,184,228,.28);border-radius:14px;background:#091b26;display:flex;flex-direction:column;justify-content:center;gap:5px}\
.turf-owned-reward strong{color:#eefaff;font-size:13px}.turf-owned-reward small{color:#7895a6;font-size:10px}.turf-owned-icon{font-size:27px;color:#6edcff}\
.turf-auth-owned{opacity:1!important;filter:none!important}\
';(document.head||document.documentElement).appendChild(css);

window.addEventListener('turf:auth-ready',function(e){var p=e&&e.detail&&e.detail.profile;if(p)publish(p);else refresh(true)});
document.addEventListener('click',function(e){
  var n=e.target&&e.target.closest?e.target.closest('[data-fhq-nav],[data-pass-tab],#turfProfileBtn,#fhqProfileButton,[data-profile-panel]'):null;
  if(!n)return;
  [40,140,400,900].forEach(function(ms){setTimeout(function(){var p=knownProfile();if(p)applyAll(p);refresh(ms>300)},ms)});
},true);

var mo=new MutationObserver(function(){var p=knownProfile();if(p)applyAll(p)});
try{mo.observe(document.body,{childList:true,subtree:true})}catch(e){}

[0,120,400,1000,2200,5000].forEach(function(ms){setTimeout(function(){var p=knownProfile();if(p)publish(p);refresh(ms===0||ms===1000)},ms)});
})();