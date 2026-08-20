/* ============================================================
   TURF V89.18 — BATCH 2A HOME 2.0
   Presentation-only. No account/game/card logic changes.
   - crisp vector hero branding
   - professional stat/reward layout
   - Lifetime Points permanently uses green achievement mark
   - removes fallback TURF labels / black icon plates
   - repairs clipped sidebar labels
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8918_HOME2__)return;
window.__TURF_V8918_HOME2__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var MARK=ROOT+'turf-mark.svg?v=8918';
var WORD=ROOT+'turf-wordmark.svg?v=8918';

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()}

function css(){
  var st=q('#turfV8918Home2Css');
  if(!st){st=document.createElement('style');st.id='turfV8918Home2Css'}
  st.textContent=`
  /* HOME 2.0 — authoritative late visual layer */
  #fhqHome{background:#06111b!important}
  #fhqHome .fhq-home-inner{max-width:1160px!important;margin:0 auto!important;padding:14px 22px 48px!important}

  /* Hero: quiet premium panel, not giant poster art */
  #fhqHome .fhq-hero{
    min-height:300px!important;
    display:grid!important;grid-template-columns:minmax(0,1.65fr) minmax(250px,.75fr)!important;
    gap:28px!important;align-items:stretch!important;
    padding:34px 38px!important;border-radius:20px!important;overflow:hidden!important;
    border:1px solid rgba(61,192,246,.48)!important;
    background:
      radial-gradient(circle at 18% 0%,rgba(34,181,248,.17),transparent 33%),
      radial-gradient(circle at 82% 100%,rgba(15,178,121,.13),transparent 38%),
      linear-gradient(145deg,#0a1d2b 0%,#081824 55%,#07141e 100%)!important;
    box-shadow:0 24px 60px rgba(0,0,0,.28)!important;
  }
  #fhqHome .fhq-hero>div:first-child{min-width:0!important;display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:flex-start!important}
  #turfV8918Brand{display:flex!important;align-items:center!important;gap:18px!important;width:100%!important;margin:0 0 15px!important}
  #turfV8918Brand .turf-v8918-mark{width:92px!important;height:92px!important;flex:0 0 92px!important;object-fit:contain!important;filter:drop-shadow(0 0 14px rgba(43,187,255,.35))!important}
  #turfV8918Brand .turf-v8918-word{width:min(390px,64%)!important;height:auto!important;object-fit:contain!important;object-position:left center!important;filter:drop-shadow(0 7px 20px rgba(0,0,0,.22))!important}
  #turfV8918Tag{font-size:10px!important;line-height:1!important;font-weight:900!important;letter-spacing:.25em!important;color:#76dbff!important;margin:0 0 24px 4px!important}
  #fhqHome .fhq-hero>div:first-child>p{max-width:650px!important;margin:0!important;color:#b5c6d2!important;font-size:17px!important;line-height:1.55!important;font-weight:650!important}
  #fhqHome .fhq-hero-actions{display:flex!important;gap:11px!important;flex-wrap:wrap!important;margin-top:24px!important}
  #fhqHome .fhq-hero-actions button{min-height:48px!important;padding:0 20px!important;border-radius:12px!important;font-size:14px!important;font-weight:900!important;letter-spacing:.01em!important}
  #fhqHome .fhq-primary{background:linear-gradient(180deg,#24bdff,#1594df)!important;border:1px solid #42c9ff!important;box-shadow:0 8px 22px rgba(20,155,224,.22)!important}
  #fhqHome .fhq-secondary{background:#102333!important;border:1px solid rgba(103,184,222,.32)!important;color:#f3f8fb!important}
  #fhqHome .fhq-hero-actions .fhq-secondary:last-child{background:linear-gradient(180deg,#6540b5,#4c2b91)!important;border-color:#9875ec!important}
  #fhqHome .fhq-scorecard{align-self:stretch!important;border-radius:16px!important;padding:24px 22px!important;background:linear-gradient(160deg,#0b2231,#081923)!important;border:1px solid rgba(74,185,229,.34)!important;box-shadow:none!important}
  #fhqHome .fhq-scorecard strong{font-size:38px!important;line-height:1!important}
  #fhqHome .fhq-scorecard span,#fhqHome .fhq-scorecard p{font-size:13px!important;line-height:1.35!important}

  /* Hide all legacy/raster hero-brand layers so only crisp SVGs remain. */
  #fhqHome .fhq-home-brandline,
  #fhqHome #turfProHeroBrand,
  #fhqHome #turfProHeroTag,
  #fhqHome #turfExactHeroLogoV8901,
  #fhqHome .turf-exact-hero-logo,
  #fhqHome .turf-exact-hero-tag,
  #fhqHome .turf-v8901-tagline,
  #fhqHome .turf-hero-brand-clean{display:none!important}

  /* Stat system */
  #fhqHome .fhq-dashboard{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:14px!important;margin-top:18px!important}
  #fhqHome .fhq-dashboard-card{
    min-width:0!important;min-height:154px!important;padding:20px 18px!important;border-radius:16px!important;
    display:grid!important;grid-template-columns:58px minmax(0,1fr)!important;grid-template-rows:auto auto 1fr!important;column-gap:14px!important;align-items:center!important;
    background:linear-gradient(155deg,#0a1b28,#081722)!important;border:1px solid rgba(62,176,226,.34)!important;box-shadow:none!important;
  }
  #fhqHome .fhq-dashboard-card small{font-size:10px!important;line-height:1.2!important;font-weight:900!important;letter-spacing:.08em!important;color:#82d8fa!important;white-space:normal!important}
  #fhqHome .fhq-dashboard-card strong{font-size:28px!important;line-height:1.05!important;font-weight:950!important;color:#f7fbff!important}
  #fhqHome .fhq-dashboard-card p,#fhqHome .fhq-dashboard-card div:not(.turf-v8918-stat-icon):not(.fhq-dashboard-progress){font-size:11px!important;line-height:1.35!important;color:#91a9b8!important}
  #fhqHome .fhq-dashboard-card .turf-v8918-stat-icon{grid-row:1/4!important;grid-column:1!important;width:54px!important;height:54px!important;display:grid!important;place-items:center!important;background:transparent!important;border:0!important;box-shadow:none!important}
  #fhqHome .fhq-dashboard-card .turf-v8918-stat-icon svg{width:50px!important;height:50px!important;display:block!important;filter:drop-shadow(0 0 8px rgba(59,190,247,.18))!important}
  #fhqHome .fhq-dashboard-card>img,
  #fhqHome .fhq-dashboard-card .fhq-coin-icon,
  #fhqHome .fhq-dashboard-card .turf-stat-art,
  #fhqHome .fhq-dashboard-card>.icon{display:none!important}
  #fhqHome .fhq-dashboard-card[data-turf-stat="lifetime"]{border-color:rgba(55,217,119,.52)!important;background:linear-gradient(155deg,#0a261c,#081a18)!important}
  #fhqHome .fhq-dashboard-card[data-turf-stat="streak"]{border-color:rgba(242,107,48,.47)!important;background:linear-gradient(155deg,#2a1714,#151315)!important}
  #fhqHome .fhq-dashboard-card[data-turf-stat="continue"]{border-color:rgba(63,139,246,.50)!important;background:linear-gradient(155deg,#0c2542,#0a1928)!important}
  #fhqHome .fhq-dashboard-progress{grid-column:2!important;width:100%!important;height:7px!important;margin-top:8px!important;background:#102a38!important;border-radius:999px!important;overflow:hidden!important}

  /* Rewards */
  #fhqHome .fhq-section-title{font-size:22px!important;line-height:1.15!important;margin:26px 0 14px!important;color:#f5f9fc!important}
  #fhqHome .fhq-daily-rewards{display:grid!important;grid-template-columns:1fr 1fr!important;gap:16px!important}
  #fhqHome .fhq-daily-reward{min-height:178px!important;padding:18px!important;border-radius:17px!important;display:grid!important;grid-template-columns:130px minmax(0,1fr) 126px!important;gap:18px!important;align-items:center!important;background:linear-gradient(150deg,#0a1c29,#081722)!important;border:1px solid rgba(61,180,229,.34)!important;box-shadow:none!important;overflow:hidden!important}
  #fhqHome .fhq-daily-reward .icon{width:130px!important;height:130px!important;min-width:130px!important;display:grid!important;place-items:center!important;padding:8px!important;overflow:hidden!important;border-radius:14px!important;background:linear-gradient(145deg,#0b2535,#081a27)!important;border:1px solid rgba(61,179,228,.20)!important;box-shadow:none!important}
  #fhqHome .fhq-daily-reward .icon img,#fhqHome .fhq-daily-reward img{max-width:112px!important;max-height:112px!important;width:auto!important;height:auto!important;object-fit:contain!important;filter:none!important}
  #fhqHome .fhq-daily-reward h3{font-size:20px!important;line-height:1.15!important;margin:0 0 7px!important}
  #fhqHome .fhq-daily-reward p{font-size:12px!important;line-height:1.4!important;color:#9db3c1!important}
  #fhqHome .fhq-daily-reward button{min-width:112px!important;min-height:44px!important;border-radius:11px!important;font-size:11px!important;font-weight:900!important;letter-spacing:.08em!important}

  /* Never show gray alt/fallback TURF tags. */
  #fhqHome img[alt="TURF"],#fhqHome img[title="TURF"]{font-size:0!important;color:transparent!important;text-indent:-9999px!important}

  /* Sidebar — always show complete labels */
  #fhqSidebar{overflow-x:visible!important}
  #fhqSidebar .fhq-nav,#fhqSidebar [class*="nav"]{overflow-x:visible!important}
  #fhqSidebar button,#fhqSidebar [data-fhq-nav],#fhqSidebar .side-nav-item{min-width:0!important;width:100%!important;max-width:none!important;overflow:visible!important;white-space:nowrap!important;text-overflow:clip!important}
  #fhqSidebar button span,#fhqSidebar [data-fhq-nav] span{max-width:none!important;overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important}

  @media(max-width:1050px){
    #fhqHome .fhq-dashboard{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    #fhqHome .fhq-daily-rewards{grid-template-columns:1fr!important}
  }
  @media(max-width:760px){
    #fhqHome .fhq-home-inner{padding:10px 12px 36px!important}
    #fhqHome .fhq-hero{grid-template-columns:1fr!important;padding:24px 20px!important}
    #turfV8918Brand .turf-v8918-mark{width:68px!important;height:68px!important;flex-basis:68px!important}
    #turfV8918Brand .turf-v8918-word{width:min(300px,68%)!important}
    #fhqHome .fhq-dashboard{grid-template-columns:1fr!important}
    #fhqHome .fhq-daily-reward{grid-template-columns:92px minmax(0,1fr)!important}
    #fhqHome .fhq-daily-reward .icon{width:92px!important;height:92px!important;min-width:92px!important}
    #fhqHome .fhq-daily-reward button{grid-column:1/3!important;width:100%!important}
  }
  `;

  /* Keep this stylesheet physically last so old legacy patches cannot override it. */
  if(document.body){document.body.appendChild(st)}else document.documentElement.appendChild(st);
}

function hero(){
  var hero=q('#fhqHome .fhq-hero');if(!hero)return;
  var left=hero.firstElementChild;if(!left)return;
  var brand=q('#turfV8918Brand');
  if(!brand){
    brand=document.createElement('div');brand.id='turfV8918Brand';
    var m=document.createElement('img');m.className='turf-v8918-mark';m.src=MARK;m.alt='';m.setAttribute('aria-hidden','true');
    var w=document.createElement('img');w.className='turf-v8918-word';w.src=WORD;w.alt='TURF';
    brand.appendChild(m);brand.appendChild(w);
    left.insertBefore(brand,left.firstChild);
  }
  var tag=q('#turfV8918Tag');
  if(!tag){tag=document.createElement('div');tag.id='turfV8918Tag';tag.textContent='COMPETE • COLLECT • CLIMB';brand.insertAdjacentElement('afterend',tag)}
}

function iconSvg(kind){
  if(kind==='today')return '<svg viewBox="0 0 64 64" fill="none"><rect x="11" y="15" width="42" height="38" rx="9" fill="#0b2940" stroke="#39bffc" stroke-width="3"/><path d="M19 10v12M45 10v12M12 27h40" stroke="#7ee0ff" stroke-width="4" stroke-linecap="round"/><path d="M22 36h8M35 36h8M22 44h8" stroke="#45c6ff" stroke-width="3" stroke-linecap="round"/></svg>';
  if(kind==='lifetime')return '<svg viewBox="0 0 64 64" fill="none"><path d="M32 5 54 17v30L32 59 10 47V17L32 5Z" fill="#0c3525" stroke="#34df79" stroke-width="3"/><path d="m32 16 5 10 11 1.6-8 7.8 1.9 11L32 41.2 22.1 46.4 24 35.4l-8-7.8L27 26l5-10Z" stroke="#93f6b6" stroke-width="3" stroke-linejoin="round"/></svg>';
  if(kind==='streak')return '<svg viewBox="0 0 64 64" fill="none"><path d="M35 6c4 13-7 16-4 27 2-7 8-10 12-16 8 8 12 17 10 27-2 10-10 15-21 15S12 52 11 41c-1-12 7-20 16-29-1 9 1 14 8 18-1-9 1-16 0-24Z" fill="#ff7a26" stroke="#ffb14a" stroke-width="2"/><path d="M31 34c6 7 5 12 1 19-6-2-9-6-8-11 1-4 4-7 7-8Z" fill="#ffd25a"/></svg>';
  return '<svg viewBox="0 0 64 64" fill="none"><circle cx="25" cy="26" r="10" fill="#1e8df0"/><circle cx="43" cy="25" r="8" fill="#45b4ff"/><path d="M9 52c1-11 7-17 16-17s15 6 16 17H9Z" fill="#238fe8"/><path d="M35 51c1-9 5-14 12-14 6 0 10 5 11 14H35Z" fill="#53bfff"/></svg>';
}

function tagStats(){
  qa('#fhqHome .fhq-dashboard-card').forEach(function(card){
    var t=text(card),kind='';
    if(t.indexOf("today's challenges")>=0||t.indexOf('todays challenges')>=0)kind='today';
    else if(t.indexOf('lifetime points')>=0)kind='lifetime';
    else if(t.indexOf('day streak')>=0)kind='streak';
    else if(t.indexOf('continue today')>=0)kind='continue';
    if(!kind)return;
    card.dataset.turfStat=kind;
    var icon=q('.turf-v8918-stat-icon',card);
    if(!icon){icon=document.createElement('div');icon.className='turf-v8918-stat-icon';card.insertBefore(icon,card.firstChild)}
    icon.innerHTML=iconSvg(kind);
  });
}

function cleanFallbacks(){
  qa('#fhqHome img').forEach(function(img){
    if(String(img.alt||'').trim().toUpperCase()==='TURF' && !img.classList.contains('turf-v8918-word'))img.alt='';
    if(String(img.title||'').trim().toUpperCase()==='TURF')img.removeAttribute('title');
  });
}

function sidebar(){
  var labels={pass:'TURF Pass',shop:'Shop',locker:'Locker',album:'Collections',leaderboard:'Leaderboard',games:'Games',rankings:'Rankings',draft:'Draft Sim'};
  Object.keys(labels).forEach(function(key){
    var b=q('#fhqSidebar [data-fhq-nav="'+key+'"]');if(!b)return;
    b.setAttribute('aria-label',labels[key]);b.title=labels[key];
  });
  /* Dynamic competitive/casual items: remove CSS ellipsis without replacing click handlers. */
  qa('#fhqSidebar button,#fhqSidebar [role="button"],#fhqSidebar [data-fhq-nav]').forEach(function(b){b.style.textOverflow='clip';b.style.overflow='visible';b.style.whiteSpace='nowrap'});
}

function apply(){css();hero();tagStats();cleanFallbacks();sidebar()}
function boot(){
  apply();
  [80,220,500,1000,1800,3200,5500].forEach(function(ms){setTimeout(apply,ms)});
  var timer=null;
  if(window.MutationObserver)new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(apply,70)}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
