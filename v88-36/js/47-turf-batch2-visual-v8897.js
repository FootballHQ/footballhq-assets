/* ============================================================
   TURF V88.97 — BATCH 2 DIRECT VISUAL REBRAND

   Directly targets the known live TURF DOM from the Apps Script Index.
   Keeps all account/game/card/navigation logic intact.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8897_VISUAL__) return;
  window.__TURF_V8897_VISUAL__=true;

  var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
  var MARK=ROOT+'turf-mark.svg?v=8897';
  var WORDMARK=ROOT+'turf-wordmark.svg?v=8897';

  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

  function addCss(){
    if(document.getElementById('turfV8897VisualCss')) return;
    var st=document.createElement('style');
    st.id='turfV8897VisualCss';
    st.textContent=`
      :root{
        --turf-bg:#06101a;
        --turf-bg2:#081722;
        --turf-panel:#0b1823;
        --turf-panel2:#0d1d2a;
        --turf-line:rgba(53,169,225,.24);
        --turf-blue:#28b8ff;
        --turf-blue2:#72ddff;
        --turf-text:#f4f8fc;
        --turf-muted:#99adbb;
        --turf-gold:#f5c451;
        --turf-purple:#8c5dff;
      }

      html,body{background:var(--turf-bg)!important}
      body{color:var(--turf-text)!important}

      /* Sidebar */
      #fhqSidebar.fhq-sidebar{
        background:
          radial-gradient(circle at 15% 4%,rgba(33,169,238,.10),transparent 25%),
          linear-gradient(180deg,#07121c 0%,#09131c 58%,#071019 100%)!important;
        border-right:1px solid rgba(54,177,233,.21)!important;
        box-shadow:10px 0 40px rgba(0,0,0,.15)!important;
      }
      #fhqSidebar .fhq-brand{
        min-height:88px!important;
        padding:16px 18px!important;
        gap:11px!important;
        border-bottom:1px solid rgba(66,181,232,.10)!important;
      }
      #fhqSidebar .fhq-brand-mark{
        width:51px!important;height:51px!important;
        display:flex!important;align-items:center!important;justify-content:center!important;
      }
      #fhqSidebar .fhq-brand-mark svg{display:none!important}
      #fhqSidebar .fhq-brand-mark:after{
        content:"";display:block;width:51px;height:51px;
        background:url("${MARK}") center/contain no-repeat;
        filter:drop-shadow(0 0 8px rgba(40,184,255,.28));
      }
      #fhqSidebar .fhq-brand-copy{
        color:#f8fbfe!important;font-size:22px!important;font-weight:1000!important;
        letter-spacing:.04em!important;line-height:1!important;
      }
      #fhqSidebar .fhq-brand-copy small{
        display:block!important;margin-top:6px!important;
        color:#78d7ff!important;font-size:7px!important;font-weight:1000!important;
        letter-spacing:.16em!important;white-space:nowrap!important;
      }

      #fhqSidebar .fhq-profile-button{
        background:linear-gradient(150deg,rgba(16,34,48,.95),rgba(9,21,31,.98))!important;
        border-color:rgba(73,166,209,.24)!important;
        box-shadow:0 12px 28px rgba(0,0,0,.18)!important;
      }
      #fhqSidebar .fhq-profile-button-avatar{
        border-color:rgba(51,190,251,.48)!important;
        box-shadow:0 0 18px rgba(40,184,255,.10)!important;
      }
      #fhqSidebar .turf-nav-category{color:#6dbde3!important}
      #fhqSidebar .fhq-nav button{
        transition:background .16s ease,border-color .16s ease,transform .16s ease!important;
      }
      #fhqSidebar .fhq-nav button:hover{transform:translateX(2px)!important}
      #fhqSidebar .fhq-nav button.active{
        border-color:rgba(53,191,255,.55)!important;
        background:linear-gradient(90deg,rgba(21,102,149,.38),rgba(10,27,39,.72))!important;
        box-shadow:inset 3px 0 0 var(--turf-blue),0 0 18px rgba(31,166,229,.07)!important;
      }

      /* Main home background */
      #fhqHome.fhq-home-overlay{
        background:
          radial-gradient(circle at 48% -6%,rgba(30,125,184,.20),transparent 34%),
          radial-gradient(circle at 96% 5%,rgba(118,70,202,.07),transparent 28%),
          linear-gradient(180deg,#07131d 0%,#07131d 42%,#06111a 100%)!important;
      }
      #fhqHome .fhq-home-inner{position:relative!important}
      #fhqHome .fhq-home-inner:before{
        content:"";position:absolute;left:0;right:0;top:0;height:320px;pointer-events:none;z-index:0;
        background:
          linear-gradient(180deg,rgba(0,0,0,.02),rgba(4,14,22,.86)),
          radial-gradient(ellipse at 50% 0%,rgba(38,153,220,.18),transparent 64%);
        border-radius:20px;
      }
      #fhqHome .fhq-home-inner>*{position:relative;z-index:1}

      /* Hero */
      #fhqHome .fhq-hero{
        min-height:280px!important;
        padding:32px 36px!important;
        background:
          radial-gradient(circle at 18% 15%,rgba(38,173,244,.13),transparent 27%),
          radial-gradient(circle at 88% 12%,rgba(66,119,255,.08),transparent 25%),
          linear-gradient(145deg,rgba(12,31,44,.98),rgba(8,20,30,.98))!important;
        border:1px solid rgba(70,182,232,.27)!important;
        box-shadow:0 22px 58px rgba(0,0,0,.28),inset 0 1px rgba(255,255,255,.02)!important;
        overflow:hidden!important;
      }
      #fhqHome .fhq-hero:before{
        content:"";position:absolute!important;inset:0!important;pointer-events:none!important;
        background:linear-gradient(100deg,rgba(38,177,243,.06),transparent 34%,transparent 68%,rgba(112,73,210,.035))!important;
      }
      #fhqHome .fhq-home-brandline{display:flex!important;align-items:center!important;gap:14px!important;margin-bottom:3px!important}
      #fhqHome .fhq-home-shield{
        width:72px!important;height:72px!important;flex:0 0 72px!important;
        display:block!important;background:url("${MARK}") center/contain no-repeat!important;
        filter:drop-shadow(0 0 10px rgba(37,183,255,.24))!important;
      }
      #fhqHome .fhq-home-shield svg{display:none!important}
      #fhqHome .fhq-home-brandline h1{
        margin:0!important;color:#f8fbfe!important;font-size:clamp(48px,5vw,70px)!important;
        line-height:.92!important;letter-spacing:.015em!important;font-weight:1000!important;
        text-shadow:0 6px 24px rgba(0,0,0,.30)!important;
      }
      #fhqHome .fhq-home-brandline:after{
        content:"COMPETE • COLLECT • CLIMB";
        position:absolute;margin-top:88px;margin-left:86px;
        color:#73d8ff;font-size:9px;font-weight:1000;letter-spacing:.21em;
      }
      #fhqHome .fhq-hero>div:first-child>p{
        margin-top:28px!important;max-width:650px!important;color:#a8bac7!important;
        font-size:17px!important;line-height:1.55!important;
      }
      #fhqHome .fhq-hero-actions{gap:10px!important;margin-top:22px!important}
      #fhqHome .fhq-primary{
        background:linear-gradient(180deg,#2abdfc,#1689d6)!important;
        border-color:#42c8ff!important;box-shadow:0 8px 24px rgba(24,150,217,.18)!important;
      }
      #fhqHome .fhq-secondary{
        background:linear-gradient(180deg,#172838,#101c28)!important;
        border-color:rgba(92,171,209,.26)!important;
      }
      #fhqHome .fhq-hero-actions .fhq-secondary:last-child{
        border-color:rgba(140,93,255,.30)!important;
        background:linear-gradient(180deg,rgba(70,47,119,.46),rgba(24,24,49,.94))!important;
      }
      #fhqHome .fhq-scorecard{
        background:linear-gradient(165deg,rgba(8,25,36,.97),rgba(7,17,26,.99))!important;
        border-color:rgba(64,173,222,.28)!important;
        box-shadow:0 14px 34px rgba(0,0,0,.24)!important;
      }
      #fhqHome .fhq-scorecard>span:first-child{color:#75d6ff!important}

      /* Dashboard stats */
      #fhqHome .fhq-dashboard{gap:12px!important}
      #fhqHome .fhq-dashboard-card{
        background:linear-gradient(155deg,rgba(11,28,40,.97),rgba(8,20,29,.98))!important;
        border-color:rgba(64,170,218,.25)!important;
        box-shadow:0 13px 30px rgba(0,0,0,.16)!important;
      }
      #fhqHome .fhq-dashboard-card small{color:#72c9ed!important}
      #fhqHome .fhq-dashboard-card strong{color:#f7fbff!important}
      #fhqHome .fhq-dashboard-progress{background:#132a37!important}
      #fhqHome .fhq-dashboard-progress i{background:linear-gradient(90deg,#20b8ff,#73ddff)!important}

      /* Section headers */
      #fhqHome .fhq-section-title{
        color:#f5f9fc!important;font-weight:1000!important;letter-spacing:.015em!important;
        text-shadow:0 4px 18px rgba(0,0,0,.18)!important;
      }

      /* Rewards */
      #fhqHome .fhq-daily-rewards{gap:14px!important}
      #fhqHome .fhq-daily-reward{
        background:linear-gradient(150deg,rgba(11,29,42,.98),rgba(8,21,31,.98))!important;
        border-color:rgba(58,175,228,.27)!important;
        box-shadow:0 14px 34px rgba(0,0,0,.17)!important;
      }
      #fhqHome .fhq-daily-reward .icon{
        border-color:rgba(55,186,239,.32)!important;
        background:linear-gradient(145deg,#102d40,#0b1e2c)!important;
      }
      #fhqHome .fhq-daily-reward p{color:#8fb5c7!important}
      #fhqHome .fhq-daily-reward button{
        border-color:rgba(61,189,244,.36)!important;
        background:linear-gradient(180deg,#17435b,#102b3b)!important;
        color:#9de4ff!important;
      }

      /* Daily game tiles */
      #fhqHome .fhq-card-grid{gap:12px!important}
      #fhqHome .fhq-card{
        background:linear-gradient(155deg,rgba(12,29,41,.98),rgba(8,20,29,.99))!important;
        border-color:rgba(55,167,218,.24)!important;
        box-shadow:0 12px 28px rgba(0,0,0,.16)!important;
        transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease!important;
      }
      #fhqHome .fhq-card:hover{
        transform:translateY(-3px)!important;border-color:rgba(45,190,255,.55)!important;
        box-shadow:0 16px 34px rgba(0,0,0,.23),0 0 18px rgba(39,178,240,.06)!important;
      }
      #fhqHome .fhq-card h3{color:#f7fbff!important}
      #fhqHome .fhq-card p{color:#9eb0bd!important}
      #fhqHome .fhq-card .tag{
        background:rgba(33,125,80,.28)!important;border-color:rgba(69,199,122,.30)!important;color:#8ee2aa!important;
      }

      /* Wallet wording */
      .fhq-shop-wallet small,.fhq-wallet small,[class*="wallet"] small{color:#77d8ff!important}

      /* Mobile logo */
      #fhqMobileLogo svg{display:none!important}
      #fhqMobileLogo:before{content:"";display:block;width:38px;height:38px;background:url("${MARK}") center/contain no-repeat}
      #fhqMobileLogo span{color:#fff!important;font-weight:1000!important}

      @media(max-width:900px){
        #fhqHome .fhq-hero{padding:24px!important;min-height:0!important}
        #fhqHome .fhq-home-brandline h1{font-size:46px!important}
        #fhqHome .fhq-home-shield{width:58px!important;height:58px!important;flex-basis:58px!important}
        #fhqHome .fhq-home-brandline:after{margin-top:75px;margin-left:72px;font-size:7px!important;letter-spacing:.16em!important}
      }
    `;
    document.head.appendChild(st);
  }

  function replaceVisibleText(){
    var pairs=[
      ['FOOTBALL HQ','TURF'],['Football HQ','TURF'],['HQ Pass','TURF Pass'],['HQ Shop','TURF Shop'],
      ['HQ COINS','TURF COINS'],['HQ Coins','TURF Coins'],['Football HQ Rank','TURF Rank'],
      ['2026 FOOTBALL CENTER','COMPETE • COLLECT • CLIMB']
    ];
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);
    var nodes=[],n;while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(function(node){
      var p=node.parentElement;if(!p) return;
      var tag=p.tagName;if(tag==='SCRIPT'||tag==='STYLE'||tag==='TEXTAREA'||tag==='INPUT') return;
      var v=node.nodeValue||'',nv=v;
      pairs.forEach(function(pair){nv=nv.split(pair[0]).join(pair[1])});
      if(nv!==v) node.nodeValue=nv;
    });
  }

  function enforceKnownText(){
    var brand=qs('#fhqSidebar .fhq-brand-copy');
    if(brand){
      var small=qs('small',brand);
      brand.childNodes.forEach(function(n){if(n.nodeType===3&&n.nodeValue.trim())n.nodeValue='TURF'});
      if(small) small.textContent='COMPETE • COLLECT • CLIMB';
    }
    var hero=qs('#fhqHome .fhq-home-brandline h1');if(hero) hero.textContent='TURF';
    var pass=qs('.fhq-nav [data-fhq-nav="pass"]');if(pass) pass.innerHTML='▣ TURF Pass';
    var gift=qs('#fhqDailyGiftCopy');if(gift) gift.textContent=(gift.textContent||'').replace(/HQ Coins/gi,'TURF Coins');
  }

  function title(){
    var active=qs('.fhq-nav button.active[data-fhq-nav]');
    var key=active?active.getAttribute('data-fhq-nav'):'';
    var names={home:'',pass:'Pass',shop:'Shop',locker:'Locker',album:'Collections',games:'Games',rankings:'Rankings',draft:'Draft Sim',leaderboard:'Leaderboards'};
    document.title=names[key]?'TURF — '+names[key]:'TURF';
    try{window.top.postMessage({type:'turf-page-title',title:document.title},'*')}catch(e){}
  }

  function favicon(){
    qsa('link[rel~="icon"],link[rel="shortcut icon"]').forEach(function(x){try{x.remove()}catch(e){}});
    var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=MARK;document.head.appendChild(l);
  }

  function apply(){replaceVisibleText();enforceKnownText();title()}

  function boot(){
    addCss();favicon();apply();
    [150,500,1200,2500].forEach(function(ms){setTimeout(apply,ms)});
    document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('.fhq-nav button'))setTimeout(function(){apply()},80)},false);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
