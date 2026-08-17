/* ============================================================
   TURF V88.95 — STABLE BATCH 1 NAV + TRIALS

   Design rules:
   - NEVER move/reparent native sidebar buttons.
   - Categorize with CSS flex order only.
   - Intercept ONLY Trials and Leaderboard.
   - Trials opens in the top turftrials.com wrapper overlay via postMessage.
   - Back to TURF closes that overlay and returns the already-loaded app Home.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8895_BATCH1__) return;
  window.__TURF_V8895_BATCH1__=true;

  var TRIALS_PATH='/trials/';
  var nativeLbPass=false;

  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

  function addCss(){
    if(document.getElementById('turfV8895Css')) return;
    var st=document.createElement('style');
    st.id='turfV8895Css';
    st.textContent=`
      #fhqSidebar.fhq-sidebar{overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;scrollbar-width:thin!important}
      #fhqSidebar .fhq-side-spacer{flex:0 0 0!important;height:0!important;min-height:0!important}
      #fhqSidebar .fhq-side-foot{flex:0 0 auto!important}
      #fhqSidebar .fhq-nav{display:flex!important;flex-direction:column!important;flex:0 0 auto!important;padding-bottom:18px!important}

      .fhq-nav .turf-nav-category{padding:0 10px!important;margin:15px 0 6px!important;border:0!important;background:transparent!important;color:#718695!important;font-size:9px!important;font-weight:1000!important;letter-spacing:.18em!important;line-height:1.2!important;text-transform:uppercase!important;pointer-events:none!important;min-height:0!important;height:auto!important;text-align:left!important}
      .fhq-nav [data-turf-category="home"]{order:10}.fhq-nav [data-fhq-nav="home"]{order:11}.fhq-nav [data-fhq-nav="pass"]{order:12}.fhq-nav [data-fhq-nav="shop"]{order:13}.fhq-nav [data-fhq-nav="locker"]{order:14}.fhq-nav [data-fhq-nav="album"]{order:15}
      .fhq-nav [data-turf-category="competitive"]{order:20}#turfTrialsNav{order:21}
      .fhq-nav [data-turf-category="casual"]{order:30}.fhq-nav [data-fhq-nav="games"]{order:31}
      .fhq-nav [data-turf-category="fantasy"]{order:40}.fhq-nav [data-fhq-nav="rankings"]{order:41}.fhq-nav [data-fhq-nav="draft"]{order:42}
      .fhq-nav [data-turf-category="leaderboards"]{order:50}.fhq-nav [data-fhq-nav="leaderboard"]{order:51}
      .fhq-nav [data-fhq-nav="coming"]{order:90}
      #turfTrialsNav{position:relative!important}
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px}

      #turfLeaderboardHub{position:fixed!important;z-index:2147482000!important;top:0!important;right:0!important;bottom:0!important;left:244px!important;display:none!important;overflow:auto!important;background:radial-gradient(circle at 35% -10%,#17364c 0,#0b1721 40%,#071018 100%)!important;color:#f4f8fb!important;padding:46px clamp(24px,4vw,58px) 70px!important}
      #turfLeaderboardHub.open{display:block!important}
      .turf-lb-shell{max-width:1180px;margin:0 auto}.turf-lb-eyebrow{font-size:10px;font-weight:1000;letter-spacing:.22em;color:#77d3ff;text-transform:uppercase}.turf-lb-head{display:flex;justify-content:space-between;gap:22px;align-items:flex-end;margin-bottom:28px}.turf-lb-head h1{font-size:clamp(38px,6vw,70px);line-height:.95;letter-spacing:-.05em;margin:8px 0 7px}.turf-lb-head p{margin:0;color:#91a6b5;max-width:650px;line-height:1.55}.turf-lb-close{border:1px solid #2f4a5b;background:#0b1720;color:#eaf6fc;padding:10px 14px;border-radius:11px;font-weight:900;cursor:pointer}.turf-lb-types{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:24px}.turf-lb-type{border:1px solid #284355;background:linear-gradient(160deg,#102334,#0a1721);border-radius:18px;padding:20px;text-align:left;color:#fff;cursor:pointer;min-height:125px}.turf-lb-type.active{border-color:#66c9f7;box-shadow:0 0 0 1px rgba(102,201,247,.18)}.turf-lb-type small{display:block;color:#75cffa;font-size:9px;font-weight:1000;letter-spacing:.16em;margin-bottom:8px}.turf-lb-type strong{display:block;font-size:23px}.turf-lb-type span{display:block;color:#8fa4b3;font-size:12px;margin-top:7px;line-height:1.45}.turf-lb-panel{display:none;border:1px solid #233d4e;background:rgba(7,17,25,.78);border-radius:20px;padding:22px}.turf-lb-panel.active{display:block}.turf-lb-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px}.turf-lb-tab{border:1px solid #2b4658;background:#0d1b26;color:#a9bdc9;padding:9px 12px;border-radius:999px;font-size:11px;font-weight:900;cursor:pointer}.turf-lb-tab.active{background:#15364a;border-color:#68cff9;color:#eaf9ff}.turf-lb-card{border:1px solid #213846;background:linear-gradient(160deg,#0d1d29,#08131b);border-radius:16px;padding:20px}.turf-lb-card h3{margin:0 0 7px;font-size:21px}.turf-lb-card p{margin:0;color:#8fa4b3;line-height:1.55}.turf-lb-action{margin-top:16px;border:0;border-radius:11px;background:linear-gradient(180deg,#a9e4ff,#70c6ee);color:#07111a;padding:11px 15px;font-weight:1000;cursor:pointer}
      @media(max-width:800px){#turfLeaderboardHub{left:0!important}.turf-lb-types{grid-template-columns:1fr}}
    `;
    document.head.appendChild(st);
  }

  function category(nav,key,label){
    var el=qs('[data-turf-category="'+key+'"]',nav);
    if(el) return el;
    el=document.createElement('div');
    el.className='turf-nav-category';
    el.setAttribute('data-turf-category',key);
    el.textContent=label;
    nav.appendChild(el);
    return el;
  }

  function ensureTrialsButton(nav){
    var btn=qs('#turfTrialsNav',nav);
    if(!btn){
      btn=document.createElement('button');
      btn.id='turfTrialsNav';
      btn.type='button';
      btn.innerHTML='<span aria-hidden="true">⚡</span> Trials';
      nav.appendChild(btn);
    }
    if(btn.dataset.turf8895Wired!=='1'){
      btn.dataset.turf8895Wired='1';
      btn.addEventListener('click',openTrials,true);
    }
    return btn;
  }

  function setupSidebar(){
    var nav=qs('.fhq-nav');
    if(!nav) return false;
    if(!qs('[data-fhq-nav="home"]',nav) || !qs('[data-fhq-nav="shop"]',nav) || !qs('[data-fhq-nav="games"]',nav)) return false;
    category(nav,'home','HOME');
    category(nav,'competitive','COMPETITIVE');
    category(nav,'casual','CASUAL');
    category(nav,'fantasy','FANTASY');
    category(nav,'leaderboards','LEADERBOARDS');
    ensureTrialsButton(nav);
    return true;
  }

  function sendTopMessage(msg){
    var sent=false;
    try{if(window.top){window.top.postMessage(msg,'*');sent=true}}catch(e){}
    try{if(window.parent && window.parent!==window.top){window.parent.postMessage(msg,'*');sent=true}}catch(e){}
    return sent;
  }

  function openTrials(e){
    if(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation()}
    sendTopMessage({type:'turf-open-trials',path:TRIALS_PATH,version:'8895'});
    return false;
  }

  function hubHTML(){return `
    <div class="turf-lb-shell">
      <div class="turf-lb-head"><div><div class="turf-lb-eyebrow">TURF COMPETITION CENTER</div><h1>Leaderboards</h1><p>One place for game scores, Trial records, and overall TURF points.</p></div><button type="button" class="turf-lb-close" id="turfLbClose">← BACK</button></div>
      <div class="turf-lb-types">
        <button type="button" class="turf-lb-type active" data-turf-lb-type="games"><small>CASUAL</small><strong>Games</strong><span>Browse scoreboards by game and mode.</span></button>
        <button type="button" class="turf-lb-type" data-turf-lb-type="trials"><small>COMPETITIVE</small><strong>Trials</strong><span>World records for every live Trial.</span></button>
        <button type="button" class="turf-lb-type" data-turf-lb-type="points"><small>OVERALL</small><strong>Points</strong><span>Daily, weekly and all-time TURF points.</span></button>
      </div>
      <section class="turf-lb-panel active" data-turf-lb-panel="games"><div class="turf-lb-tabs"><button class="turf-lb-tab active" type="button">Daily Games</button><button class="turf-lb-tab" type="button">Unlimited</button><button class="turf-lb-tab" type="button">All Games</button></div><div class="turf-lb-card"><h3>Games Leaderboards</h3><p>Game-specific boards will appear here without changing the Games hub.</p></div></section>
      <section class="turf-lb-panel" data-turf-lb-panel="trials"><div class="turf-lb-tabs"><button class="turf-lb-tab active" type="button">40-Yard Dash</button><button class="turf-lb-tab" type="button" disabled>Trial 02</button><button class="turf-lb-tab" type="button" disabled>Trial 03</button></div><div class="turf-lb-card"><h3>40-Yard Dash</h3><p>Open the live 40-Yard Dash World Records board.</p><button type="button" class="turf-lb-action" id="turfOpen40Records">VIEW 40-YARD RECORDS</button></div></section>
      <section class="turf-lb-panel" data-turf-lb-panel="points"><div class="turf-lb-tabs"><button class="turf-lb-tab" type="button" data-points-period="daily">Today</button><button class="turf-lb-tab" type="button" data-points-period="weekly">This Week</button><button class="turf-lb-tab active" type="button" data-points-period="alltime">All-Time</button></div><div class="turf-lb-card"><h3>TURF Points</h3><p>Your existing points leaderboard remains the source of truth.</p><button class="turf-lb-action" type="button" data-points-period="alltime">OPEN POINTS LEADERBOARD</button></div></section>
    </div>`}

  function ensureHub(){
    var hub=qs('#turfLeaderboardHub');
    if(hub) return hub;
    hub=document.createElement('section');
    hub.id='turfLeaderboardHub';
    hub.innerHTML=hubHTML();
    document.body.appendChild(hub);
    qs('#turfLbClose',hub).onclick=function(){hub.classList.remove('open')};
    qsa('[data-turf-lb-type]',hub).forEach(function(b){b.onclick=function(){var t=b.getAttribute('data-turf-lb-type');qsa('[data-turf-lb-type]',hub).forEach(function(x){x.classList.toggle('active',x===b)});qsa('[data-turf-lb-panel]',hub).forEach(function(x){x.classList.toggle('active',x.getAttribute('data-turf-lb-panel')===t)})}});
    qsa('[data-points-period]',hub).forEach(function(b){b.onclick=function(){openNativePoints(b.getAttribute('data-points-period')||'alltime')}});
    qs('#turfOpen40Records',hub).onclick=function(){sendTopMessage({type:'turf-open-trials',path:'/trials/40-yard-dash/?records=1',version:'8895'})};
    return hub;
  }

  function openHub(e){
    if(nativeLbPass){nativeLbPass=false;return}
    if(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation()}
    ensureHub().classList.add('open');
  }

  function openNativePoints(period){
    var hub=ensureHub();hub.classList.remove('open');
    var lb=qs('.fhq-nav [data-fhq-nav="leaderboard"]');
    if(lb){nativeLbPass=true;lb.click()}
    setTimeout(function(){try{if(typeof window.setFootballHQLeaderboardPeriod==='function')window.setFootballHQLeaderboardPeriod(period)}catch(e){}},140);
  }

  function wireLeaderboard(){
    var lb=qs('.fhq-nav [data-fhq-nav="leaderboard"]');
    if(!lb || lb.dataset.turf8895Wired==='1') return !!lb;
    lb.dataset.turf8895Wired='1';
    lb.addEventListener('click',openHub,true);
    return true;
  }

  function goHome(){
    try{var h=qs('.fhq-nav [data-fhq-nav="home"]');if(h){h.click();return true}}catch(e){}
    return false;
  }

  window.addEventListener('message',function(e){
    var d=e&&e.data;
    if(!d||typeof d!=='object') return;
    if(d.type==='turf-go-home') goHome();
  });

  function boot(){
    addCss();ensureHub();
    var tries=0,timer=setInterval(function(){
      tries++;
      var a=setupSidebar(),b=wireLeaderboard();
      if((a&&b)||tries>60) clearInterval(timer);
    },100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
