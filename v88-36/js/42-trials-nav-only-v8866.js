/* ============================================================
   TURF V88.88 — STABLE BATCH 1 NAVIGATION

   IMPORTANT:
   - Categorizes sidebar ONCE after the native nav exists.
   - No MutationObserver and no repeated DOM reordering.
   - Keeps native buttons/native click handlers intact.
   - Trials and Leaderboards get only the custom behavior they need.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8888_STABLE_NAV__) return;
  window.__TURF_V8888_STABLE_NAV__=true;

  var TRIALS_URL='https://turftrials.com/trials/';
  var nativeLeaderboardPass=false;
  var arranged=false;

  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

  function style(){
    if(document.getElementById('turfV8888StableNavCss')) return;
    var s=document.createElement('style');
    s.id='turfV8888StableNavCss';
    s.textContent=`
      #fhqSidebar.fhq-sidebar{
        overflow-y:auto!important;
        overflow-x:hidden!important;
        overscroll-behavior:contain!important;
        scrollbar-width:thin!important;
      }
      #fhqSidebar .fhq-side-spacer{flex:0 0 0!important;min-height:0!important;height:0!important}
      #fhqSidebar .fhq-side-foot{flex:0 0 auto!important}
      #fhqSidebar .fhq-nav{flex:0 0 auto!important;padding-bottom:12px!important}
      .fhq-nav .turf-nav-category{
        margin:15px 10px 6px!important;padding:0!important;border:0!important;
        background:transparent!important;color:#718695!important;
        font-size:9px!important;font-weight:1000!important;letter-spacing:.18em!important;
        line-height:1.2!important;text-transform:uppercase!important;pointer-events:none!important;
        min-height:0!important;height:auto!important;display:block!important;text-align:left!important;
      }
      .fhq-nav .turf-nav-category:first-child{margin-top:5px!important}
      #turfTrialsNav{position:relative!important}
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px}

      #turfLeaderboardHub{
        position:fixed;z-index:8000;top:0;right:0;bottom:0;left:244px;
        overflow:auto;background:radial-gradient(circle at 35% -10%,#17364c 0,#0b1721 40%,#071018 100%);
        color:#f4f8fb;padding:46px clamp(24px,4vw,58px) 70px;display:none;
      }
      #turfLeaderboardHub.open{display:block}
      .turf-lb-shell{max-width:1180px;margin:0 auto}
      .turf-lb-eyebrow{font-size:10px;font-weight:1000;letter-spacing:.22em;color:#77d3ff;text-transform:uppercase}
      .turf-lb-head{display:flex;justify-content:space-between;gap:22px;align-items:flex-end;margin-bottom:28px}
      .turf-lb-head h1{font-size:clamp(38px,6vw,70px);line-height:.95;letter-spacing:-.05em;margin:8px 0 7px}
      .turf-lb-head p{margin:0;color:#91a6b5;max-width:650px;line-height:1.55}
      .turf-lb-close{border:1px solid #2f4a5b;background:#0b1720;color:#eaf6fc;padding:10px 14px;border-radius:11px;font-weight:900;cursor:pointer}
      .turf-lb-types{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:24px}
      .turf-lb-type{border:1px solid #284355;background:linear-gradient(160deg,#102334,#0a1721);border-radius:18px;padding:20px;text-align:left;color:#fff;cursor:pointer;min-height:125px}
      .turf-lb-type.active{border-color:#66c9f7;box-shadow:0 0 0 1px rgba(102,201,247,.18)}
      .turf-lb-type small{display:block;color:#75cffa;font-size:9px;font-weight:1000;letter-spacing:.16em;margin-bottom:8px}
      .turf-lb-type strong{display:block;font-size:23px}.turf-lb-type span{display:block;color:#8fa4b3;font-size:12px;margin-top:7px;line-height:1.45}
      .turf-lb-panel{display:none;border:1px solid #233d4e;background:rgba(7,17,25,.78);border-radius:20px;padding:22px}.turf-lb-panel.active{display:block}
      .turf-lb-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px}
      .turf-lb-tab{border:1px solid #2b4658;background:#0d1b26;color:#a9bdc9;padding:9px 12px;border-radius:999px;font-size:11px;font-weight:900;cursor:pointer}
      .turf-lb-tab.active{background:#15364a;border-color:#68cff9;color:#eaf9ff}
      .turf-lb-card{border:1px solid #213846;background:linear-gradient(160deg,#0d1d29,#08131b);border-radius:16px;padding:20px}
      .turf-lb-card h3{margin:0 0 7px;font-size:21px}.turf-lb-card p{margin:0;color:#8fa4b3;line-height:1.55}
      .turf-lb-action{margin-top:16px;border:0;border-radius:11px;background:linear-gradient(180deg,#a9e4ff,#70c6ee);color:#07111a;padding:11px 15px;font-weight:1000;cursor:pointer}
      @media(max-width:800px){#turfLeaderboardHub{left:0}.turf-lb-types{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function category(text){
    var d=document.createElement('div');
    d.className='turf-nav-category';
    d.textContent=text;
    return d;
  }

  function clickHomeFirst(){
    try{var h=qs('.fhq-nav [data-fhq-nav="home"]');if(h)h.click()}catch(e){}
  }

  function openTrials(e){
    if(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation()}
    clickHomeFirst();
    setTimeout(function(){
      try{window.top.location.href=TRIALS_URL}catch(err){window.location.href=TRIALS_URL}
    },40);
  }

  function addTrialsNav(nav){
    var existing=qs('#turfTrialsNav,[data-fhq-nav="trials"]',nav);
    if(existing){
      if(!existing.dataset.turfTrialsWired){existing.dataset.turfTrialsWired='1';existing.addEventListener('click',openTrials,true)}
      return existing;
    }
    var btn=document.createElement('button');
    btn.id='turfTrialsNav';btn.type='button';btn.setAttribute('data-fhq-nav','trials');
    btn.innerHTML='<span aria-hidden="true">⚡</span> Trials';
    btn.dataset.turfTrialsWired='1';
    btn.addEventListener('click',openTrials,true);
    nav.appendChild(btn);
    return btn;
  }

  function arrangeSidebarOnce(){
    if(arranged) return true;
    var nav=qs('.fhq-nav');
    if(!nav) return false;
    addTrialsNav(nav);

    var map={};
    qsa('button[data-fhq-nav]',nav).forEach(function(b){map[b.getAttribute('data-fhq-nav')]=b});
    if(!map.home||!map.shop||!map.games||!map.rankings||!map.draft||!map.leaderboard) return false;

    qsa('.turf-nav-category',nav).forEach(function(x){x.remove()});
    function group(label,ids){
      nav.appendChild(category(label));
      ids.forEach(function(id){if(map[id])nav.appendChild(map[id])});
    }
    group('Home',['home','pass','shop','locker','album']);
    group('Competitive',['trials']);
    group('Casual',['games']);
    group('Fantasy',['rankings','draft']);
    group('Leaderboards',['leaderboard']);
    if(map.coming)nav.appendChild(map.coming);

    arranged=true;
    nav.setAttribute('data-turf-categorized','1');
    return true;
  }

  function hubHTML(){return `
    <div class="turf-lb-shell">
      <div class="turf-lb-head"><div><div class="turf-lb-eyebrow">TURF COMPETITION CENTER</div><h1>Leaderboards</h1><p>Game scores, Trial records, and overall TURF points.</p></div><button class="turf-lb-close" id="turfLbClose">← BACK</button></div>
      <div class="turf-lb-types">
        <button class="turf-lb-type active" data-turf-lb-type="games"><small>CASUAL</small><strong>Games</strong><span>Browse game scoreboards.</span></button>
        <button class="turf-lb-type" data-turf-lb-type="trials"><small>COMPETITIVE</small><strong>Trials</strong><span>World records for Trial events.</span></button>
        <button class="turf-lb-type" data-turf-lb-type="points"><small>OVERALL</small><strong>Points</strong><span>Daily, weekly and all-time points.</span></button>
      </div>
      <section class="turf-lb-panel active" data-turf-lb-panel="games"><div class="turf-lb-tabs"><button class="turf-lb-tab active">Daily Games</button><button class="turf-lb-tab">Unlimited</button><button class="turf-lb-tab">All Games</button></div><div class="turf-lb-card"><h3>Games Leaderboards</h3><p>Individual game leaderboards will live here.</p></div></section>
      <section class="turf-lb-panel" data-turf-lb-panel="trials"><div class="turf-lb-tabs"><button class="turf-lb-tab active">40-Yard Dash</button><button class="turf-lb-tab" disabled>Trial 02</button><button class="turf-lb-tab" disabled>Trial 03</button></div><div class="turf-lb-card"><h3>40-Yard Dash</h3><p>Open the current 40-Yard Dash World Records board.</p><button class="turf-lb-action" id="turfOpen40Records">VIEW 40-YARD RECORDS</button></div></section>
      <section class="turf-lb-panel" data-turf-lb-panel="points"><div class="turf-lb-tabs"><button class="turf-lb-tab" data-points-period="daily">Today</button><button class="turf-lb-tab" data-points-period="weekly">This Week</button><button class="turf-lb-tab active" data-points-period="alltime">All-Time</button></div><div class="turf-lb-card"><h3>TURF Points</h3><p>Open the existing points leaderboard.</p><button class="turf-lb-action" data-points-period="alltime">OPEN POINTS LEADERBOARD</button></div></section>
    </div>`}

  function ensureHub(){
    var hub=qs('#turfLeaderboardHub');
    if(hub)return hub;
    hub=document.createElement('section');hub.id='turfLeaderboardHub';hub.innerHTML=hubHTML();document.body.appendChild(hub);
    qs('#turfLbClose',hub).onclick=function(){hub.classList.remove('open')};
    qsa('[data-turf-lb-type]',hub).forEach(function(b){b.onclick=function(){var type=b.dataset.turfLbType;qsa('[data-turf-lb-type]',hub).forEach(function(x){x.classList.toggle('active',x===b)});qsa('[data-turf-lb-panel]',hub).forEach(function(x){x.classList.toggle('active',x.dataset.turfLbPanel===type)})}});
    qsa('[data-points-period]',hub).forEach(function(b){b.onclick=function(){openNativePoints(b.dataset.pointsPeriod||'alltime')}});
    qs('#turfOpen40Records',hub).onclick=function(){clickHomeFirst();setTimeout(function(){try{window.top.location.href=TRIALS_URL+'40-yard-dash/?records=1'}catch(e){location.href=TRIALS_URL+'40-yard-dash/?records=1'}},40)};
    return hub;
  }

  function openHub(e){
    if(nativeLeaderboardPass){nativeLeaderboardPass=false;return}
    if(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation()}
    ensureHub().classList.add('open');
  }

  function openNativePoints(period){
    var hub=qs('#turfLeaderboardHub');if(hub)hub.classList.remove('open');
    var lb=qs('.fhq-nav [data-fhq-nav="leaderboard"]');
    if(lb){nativeLeaderboardPass=true;lb.click()}
    setTimeout(function(){try{if(typeof window.setFootballHQLeaderboardPeriod==='function')window.setFootballHQLeaderboardPeriod(period)}catch(e){}},120);
  }

  function wireCustomButtons(){
    var lb=qs('.fhq-nav [data-fhq-nav="leaderboard"]');
    if(lb&&!lb.dataset.turfStableWired){lb.dataset.turfStableWired='1';lb.addEventListener('click',openHub,true)}
    var nav=qs('.fhq-nav');
    if(nav&&!nav.dataset.turfCloseWired){nav.dataset.turfCloseWired='1';nav.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('button[data-fhq-nav]'):null;if(b&&b.dataset.fhqNav!=='leaderboard'){var h=qs('#turfLeaderboardHub');if(h)h.classList.remove('open')}},true)}
  }

  function boot(){
    style();
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      if(arrangeSidebarOnce()||tries>30){clearInterval(timer);wireCustomButtons();ensureHub()}
    },100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
