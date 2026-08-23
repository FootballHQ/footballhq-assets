/* Static migration shell parity: presentation only. Keeps authenticated account/runtime intact. */
(function(){
'use strict';
if(window.__TURF_STATIC_CURRENT_SHELL__) return;
window.__TURF_STATIC_CURRENT_SHELL__=true;

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function profile(){return window.__TURF_AUTH_PROFILE__||{};}
function txt(el,s){if(el)el.textContent=s;}

function addCss(){
 if(document.getElementById('turfStaticCurrentShellCss'))return;
 var st=document.createElement('style');st.id='turfStaticCurrentShellCss';st.textContent=`
 body{padding-top:58px!important;background:#06131f!important}
 #turfTopbar{position:fixed!important;z-index:2147483000!important;top:0!important;left:0!important;right:0!important;height:58px!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:8px!important;padding:0 16px!important;box-sizing:border-box!important;background:rgba(3,16,27,.97)!important;border-bottom:1px solid rgba(70,180,235,.18)!important;backdrop-filter:blur(12px)!important}
 #turfTopbar .turf-top-wallet{height:40px!important;display:flex!important;align-items:center!important;gap:9px!important;padding:0 12px!important;border:1px solid rgba(68,190,244,.34)!important;border-radius:13px!important;background:linear-gradient(160deg,#0c2739,#071924)!important;color:#eaf8ff!important}
 #turfTopbar .turf-wallet-copy{display:flex!important;flex-direction:column!important;line-height:1!important}#turfTopbar .turf-wallet-copy small{font-size:8px!important;letter-spacing:.12em!important;color:#7fa2b5!important;font-weight:900!important}#turfTopbar .turf-wallet-copy strong{font-size:15px!important;margin-top:3px!important;color:#9fe6ff!important}
 #turfTopbar button{width:40px!important;height:40px!important;display:grid!important;place-items:center!important;border:1px solid rgba(68,190,244,.18)!important;border-radius:12px!important;background:#091b28!important;color:#dff5ff!important}
 #turfTopbar .turf-top-future{height:40px!important;min-width:52px!important;padding:0 10px!important;display:grid!important;place-items:center!important;border:1px solid rgba(68,190,244,.10)!important;border-radius:12px!important;color:#527487!important;font-size:9px!important;font-weight:900!important}
 #fhqSidebar{top:58px!important;height:calc(100vh - 58px)!important;background:#06111a!important;border-right:1px solid rgba(59,142,184,.18)!important}
 #fhqBrandHome{height:112px!important;min-height:112px!important;padding:8px 9px!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;background:radial-gradient(circle at 34% 42%,rgba(18,108,157,.18),transparent 58%),linear-gradient(180deg,#061725,#04131f)!important;border-bottom:1px solid rgba(38,190,255,.16)!important}
 #fhqBrandHome .fhq-brand-mark,#fhqBrandHome .fhq-brand-copy{display:none!important}
 #fhqBrandHome #turfV8940SidebarLogo{display:block!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain!important}
 #fhqProfileButton{display:none!important}
 #fhqHome{top:58px!important}
 #fhqHome .fhq-home-inner{padding-top:28px!important}
 #fhqHome #fhqDashboard{display:none!important}
 #fhqHome .fhq-section-title{display:none!important}
 #fhqHome .turf-pro-home-grid{display:grid!important;grid-template-columns:minmax(0,1.45fr) minmax(360px,1fr)!important;gap:16px!important;margin:18px 0 14px!important}
 #fhqHome .turf-pro-panel,#fhqHome .turf-pro-rewards-shell{border:1px solid rgba(69,154,196,.22)!important;border-radius:18px!important;background:linear-gradient(160deg,rgba(13,37,54,.94),rgba(6,21,32,.96))!important;box-shadow:0 12px 28px rgba(0,0,0,.18)!important;padding:18px!important;box-sizing:border-box!important}
 #fhqHome .turf-pro-section-head{display:flex!important;justify-content:space-between!important;align-items:flex-start!important;margin-bottom:12px!important}#fhqHome .turf-pro-section-head h2{margin:0!important;font-size:22px!important;color:#eef8ff!important}#fhqHome .turf-pro-section-head p{margin:4px 0 0!important;font-size:10px!important;color:#7891a3!important}
 #fhqHome .turf-pro-games-panel .fhq-daily-scroll{overflow:visible!important}#fhqHome .turf-pro-games-panel .fhq-card-grid{display:block!important}#fhqHome .turf-pro-games-panel .fhq-card{display:none!important}#fhqHome .turf-pro-games-panel .fhq-card.turf-home-featured-game{display:flex!important;min-height:300px!important;height:300px!important;flex-direction:column!important;justify-content:center!important;align-items:flex-start!important;padding:26px!important;border:1px solid rgba(55,190,247,.30)!important;border-radius:16px!important;background:radial-gradient(circle at 72% 35%,rgba(24,139,204,.20),transparent 34%),linear-gradient(155deg,#12334a,#081b29)!important}
 #fhqHome .turf-pro-games-panel .fhq-card.turf-home-featured-game h3{font-size:32px!important;margin:0 0 12px!important}#fhqHome .turf-pro-games-panel .fhq-card.turf-home-featured-game p{font-size:14px!important;color:#8ca8b8!important;max-width:440px!important}#fhqHome .turf-pro-games-panel .fhq-card.turf-home-featured-game .tag{margin-top:22px!important}
 #fhqHome .turf-pro-focus-list{display:grid!important;gap:9px!important}#fhqHome .turf-pro-focus-item{display:grid!important;grid-template-columns:38px minmax(0,1fr) auto!important;gap:10px!important;align-items:center!important;min-height:72px!important;padding:10px 12px!important;border:1px solid rgba(83,151,187,.16)!important;border-radius:12px!important;background:rgba(10,35,52,.68)!important}#fhqHome .turf-pro-focus-icon{width:36px!important;height:36px!important;display:grid!important;place-items:center!important;border-radius:10px!important;background:rgba(29,152,214,.10)!important}#fhqHome .turf-pro-focus-copy strong{display:block!important;font-size:12px!important;color:#eef6fb!important}#fhqHome .turf-pro-focus-copy span{font-size:9px!important;color:#718a9d!important}#fhqHome .turf-pro-focus-value{font-size:13px!important;font-weight:950!important;color:#75d9ff!important}
 #fhqHome .turf-pro-rewards-shell{padding:18px!important;margin-top:14px!important}#fhqHome #fhqDailyRewards{margin:0!important}
 @media(max-width:900px){#fhqHome .turf-pro-home-grid{grid-template-columns:1fr!important}}
 `;document.head.appendChild(st);
}

function ensureTopbar(){
 var bar=q('#turfTopbar');
 if(!bar){bar=document.createElement('header');bar.id='turfTopbar';bar.setAttribute('aria-label','TURF utility bar');bar.innerHTML='<div class="turf-top-wallet"><span aria-hidden="true">T</span><div class="turf-wallet-copy"><small>TURF COINS</small><strong id="turfTopCoins">0</strong></div></div><div class="turf-top-future">SOON</div><div class="turf-top-future">SOON</div><button id="turfAchievementsBtn" type="button" title="Achievements">🏆</button><button id="turfNotifyBtn" type="button" title="Notifications">🔔</button><button id="turfProfileBtn" type="button" title="Profile">👤</button><button id="turfMenuBtn" type="button" title="Menu">☰</button>';document.body.appendChild(bar)}
 var p=profile();txt(q('#turfTopCoins'),String(p.hqCoins||p.coins||0));
 var menu=q('#turfMenuBtn');if(menu&&!menu.dataset.staticWired){menu.dataset.staticWired='1';menu.onclick=function(){document.body.classList.toggle('turf-sidebar-collapsed')}}
}

function brand(){
 var A=window.TURF_EXACT_BRAND_V8940||{};var b=q('#fhqBrandHome');if(!b)return;
 b.setAttribute('aria-label','Go to TURF home');
 if(A.sidebar){var img=q('#turfV8940SidebarLogo',b);if(!img){img=document.createElement('img');img.id='turfV8940SidebarLogo';img.alt='TURF';b.replaceChildren(img)}img.src=A.sidebar}else if(!q('#turfV8940SidebarLogo',b)){b.innerHTML='<strong style="font-size:34px;letter-spacing:.06em;color:#eef9ff">TURF</strong>'}
}

function visibleBrandCleanup(){
 if(!document.body)return;var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),arr=[],n;while((n=w.nextNode()))arr.push(n);arr.forEach(function(node){var p=node.parentElement;if(!p||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(p.tagName))return;var v=node.nodeValue||'',nv=v.replace(/\bFootball HQ\b/g,'TURF').replace(/\bFOOTBALL HQ\b/g,'TURF').replace(/\bHQ Coins\b/gi,'TURF Coins').replace(/\bHQ Pass\b/g,'TURF Pass');if(nv!==v)node.nodeValue=nv});
 document.title='TURF';
}

function num(s){var m=String(s||'').replace(/,/g,'').match(/\d+/);return m?Number(m[0]):0}
function syncFocus(){
 var p=profile(),daily=(q('#fhqDashProgress')&&q('#fhqDashProgress').textContent)||'0 / 12',streak=String(p.streakDays!=null?p.streakDays:((q('#fhqDashStreak')&&q('#fhqDashStreak').textContent)||0)),life=String(p.points!=null?p.points:((q('#fhqDashLifetime')&&q('#fhqDashLifetime').textContent)||0));
 txt(q('#turfProFocusDaily'),daily);txt(q('#turfProFocusStreak'),streak+' day'+(num(streak)===1?'':'s'));txt(q('#turfProFocusLifetime'),life);
}
function pickFeatured(root){var cards=qa('[data-game-open]',root);if(!cards.length)return;cards.forEach(function(c){c.classList.remove('turf-home-featured-game')});var d=cards.find(function(c){return c.getAttribute('data-game-open')==='depthchart'})||cards[0];d.classList.add('turf-home-featured-game');var h=q('h3',d);if(h)h.textContent='Depth Chart';var p=q('p',d);if(p)p.textContent='Order a position room.';var tag=q('.tag',d);if(tag)tag.textContent='PLAY NOW →'}
function buildHome(){
 var inner=q('#fhqHome .fhq-home-inner'),rewards=q('#fhqDailyRewards'),scroll=q('#fhqHome .fhq-daily-scroll');if(!inner||!rewards||!scroll)return;
 if(!q('#turfProHomeGrid')){
  var oldR=rewards.previousElementSibling,oldG=scroll.previousElementSibling;if(oldR&&oldR.classList.contains('fhq-section-title'))oldR.style.display='none';if(oldG&&oldG.classList.contains('fhq-section-title'))oldG.style.display='none';
  var rs=document.createElement('section');rs.className='turf-pro-rewards-shell';rs.innerHTML='<div class="turf-pro-section-head"><div><h2>Daily Rewards</h2><p>Quick rewards, kept compact and easy to scan.</p></div></div>';rewards.parentNode.insertBefore(rs,rewards);rs.appendChild(rewards);
  var grid=document.createElement('section');grid.className='turf-pro-home-grid';grid.id='turfProHomeGrid';
  var games=document.createElement('div');games.className='turf-pro-panel turf-pro-games-panel';games.innerHTML='<div class="turf-pro-section-head"><div><h2>New Game</h2><p>The newest or pinned TURF game.</p></div></div>';games.appendChild(scroll);pickFeatured(games);
  var focus=document.createElement('div');focus.className='turf-pro-panel turf-pro-focus-panel';focus.innerHTML='<div class="turf-pro-section-head"><div><h2>Featured Challenges</h2><p>Your best goals to chase today.</p></div></div><div class="turf-pro-focus-list"><div class="turf-pro-focus-item"><div class="turf-pro-focus-icon">✓</div><div class="turf-pro-focus-copy"><strong>Complete Today’s Games</strong><span>Finish the Daily board and build your total.</span></div><div class="turf-pro-focus-value" id="turfProFocusDaily">0 / 12</div></div><div class="turf-pro-focus-item"><div class="turf-pro-focus-icon">🔥</div><div class="turf-pro-focus-copy"><strong>Keep Your Streak</strong><span>Come back and complete a Daily each day.</span></div><div class="turf-pro-focus-value" id="turfProFocusStreak">0 days</div></div><div class="turf-pro-focus-item"><div class="turf-pro-focus-icon">★</div><div class="turf-pro-focus-copy"><strong>Lifetime Progress</strong><span>Every completed challenge adds to your climb.</span></div><div class="turf-pro-focus-value" id="turfProFocusLifetime">0</div></div></div>';
  grid.appendChild(games);grid.appendChild(focus);rs.parentNode.insertBefore(grid,rs);
 }
 syncFocus();
}
function enforce(){addCss();ensureTopbar();brand();visibleBrandCleanup();buildHome();syncFocus();var p=profile();txt(q('#fhqPoints'),String(p.points||0));txt(q('#fhqDashLifetime'),String(p.points||0));txt(q('#fhqDashStreak'),String(p.streakDays||0));txt(q('#fhqGlobalCoins'),String(p.hqCoins||p.coins||0));txt(q('#turfTopCoins'),String(p.hqCoins||p.coins||0));}
function boot(){enforce();[80,220,500,900,1500,2600,4200,7000].forEach(function(ms){setTimeout(enforce,ms)});if(window.MutationObserver){var t=null;new MutationObserver(function(){clearTimeout(t);t=setTimeout(enforce,80)}).observe(document.documentElement,{childList:true,subtree:true})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();