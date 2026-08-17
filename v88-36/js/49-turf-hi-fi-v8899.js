/* ============================================================
   TURF V88.99 — HIGH-FIDELITY VISUAL SKIN

   User-facing goals
   - Match the approved colorful TURF mockup much more closely.
   - Use the standalone electric-blue T mark everywhere (no circle logo).
   - Keep top wallet / future currency / notifications / profile / menu.
   - Sync top wallet from the real account coin balance.
   - Remove visible NFL references and league-logo-like presentation.
   - Add original, colorful TURF icons and richer dashboard art.

   Safety
   - Presentation only. Does not rename backend FootballHQ functions.
   - Does not touch cards, collections, account, rewards, Trial logic or data.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8899_HIFI__) return;
  window.__TURF_V8899_HIFI__=true;

  var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
  var MARK=ROOT+'turf-mark.svg?v=8899';

  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

  function addCss(){
    if(document.getElementById('turfV8899HiFiCss')) return;
    var s=document.createElement('style');
    s.id='turfV8899HiFiCss';
    s.textContent=`
      :root{
        --turf-cyan:#22c4ff;--turf-blue:#178dff;--turf-indigo:#4c46ff;
        --turf-purple:#8a4dff;--turf-gold:#ffd24c;--turf-green:#28e081;
        --turf-deep:#020b15;--turf-panel:#061a2b;--turf-line:rgba(40,185,255,.36);
      }

      html,body{background:#020b15!important}

      /* ===== Overall app shell ===== */
      #fhqSidebar.fhq-sidebar{
        background:
          radial-gradient(circle at 28% 0%,rgba(31,164,255,.16),transparent 28%),
          linear-gradient(180deg,#03101d 0%,#06111d 55%,#07101a 100%)!important;
        border-right:1px solid rgba(40,184,255,.30)!important;
        box-shadow:14px 0 45px rgba(0,0,0,.28)!important;
      }
      #turfTopbar{
        background:linear-gradient(180deg,rgba(2,11,21,.99),rgba(4,15,26,.98))!important;
        border-bottom:1px solid rgba(32,190,255,.48)!important;
        box-shadow:0 8px 35px rgba(0,0,0,.28)!important;
      }

      /* ===== One logo system: standalone T everywhere ===== */
      #fhqSidebar .fhq-brand-mark,
      #fhqHome .fhq-home-shield,
      #fhqMobileLogo,
      .turf-top-profile{
        background-image:url("${MARK}")!important;
        background-repeat:no-repeat!important;
        background-position:center!important;
        background-size:contain!important;
      }
      #fhqSidebar .fhq-brand-mark svg,#fhqSidebar .fhq-brand-mark img,
      #fhqHome .fhq-home-shield svg,#fhqHome .fhq-home-shield img,
      #fhqMobileLogo svg,#fhqMobileLogo img,.turf-top-profile img{display:none!important}
      #fhqSidebar .fhq-brand-mark:after,#fhqHome .fhq-home-shield:after,#fhqMobileLogo:before{content:none!important}
      .turf-top-profile{border-color:rgba(55,196,255,.54)!important;box-shadow:0 0 18px rgba(34,196,255,.18)!important}

      /* ===== Sidebar like approved mockup ===== */
      #fhqSidebar .fhq-brand{border-bottom:1px solid rgba(46,175,231,.16)!important}
      #fhqSidebar .fhq-brand-copy{font-size:26px!important;font-weight:1000!important;letter-spacing:.045em!important}
      #fhqSidebar .fhq-brand-copy small{color:#8de5ff!important;letter-spacing:.18em!important}
      #fhqSidebar .turf-nav-category{color:#40c8ff!important;font-size:9px!important;letter-spacing:.18em!important}
      #fhqSidebar .fhq-nav button,#turfTrialsNav{
        min-height:44px!important;border-radius:12px!important;
        color:#f5f9ff!important;font-weight:850!important;
      }
      #fhqSidebar .fhq-nav button.active,#turfTrialsNav.active{
        background:linear-gradient(90deg,rgba(21,159,229,.30),rgba(18,61,94,.30))!important;
        border-color:#29c3ff!important;
        box-shadow:inset 3px 0 0 #2ad0ff,0 0 23px rgba(20,183,255,.12)!important;
      }
      .turf-nav-icon{border-radius:9px!important;background:linear-gradient(145deg,rgba(14,54,82,.92),rgba(6,27,43,.98))!important}
      [data-fhq-nav="pass"] .turf-nav-icon,[data-fhq-nav="album"] .turf-nav-icon,#turfTrialsNav .turf-nav-icon,[data-fhq-nav="leaderboard"] .turf-nav-icon{color:#ffd64e!important;box-shadow:0 0 14px rgba(255,211,63,.07)!important}
      [data-fhq-nav="draft"] .turf-nav-icon{color:#b78cff!important}

      /* ===== Homepage stadium hero ===== */
      #fhqHome.fhq-home-overlay{
        background:
          radial-gradient(circle at 80% 76%,rgba(126,67,255,.13),transparent 28%),
          radial-gradient(circle at 38% 2%,rgba(15,146,255,.22),transparent 35%),
          linear-gradient(180deg,#03101d 0%,#04101a 58%,#040c16 100%)!important;
      }
      #fhqHome .fhq-hero{
        position:relative!important;overflow:hidden!important;
        min-height:325px!important;
        padding:34px 38px!important;
        border:1px solid rgba(41,191,255,.62)!important;
        background:
          radial-gradient(circle at 9% 10%,rgba(255,255,255,.80) 0 1px,rgba(71,191,255,.65) 2px,transparent 9px),
          radial-gradient(circle at 16% 8%,rgba(255,255,255,.70) 0 1px,rgba(71,191,255,.5) 2px,transparent 8px),
          radial-gradient(circle at 86% 9%,rgba(255,255,255,.78) 0 1px,rgba(71,191,255,.58) 2px,transparent 9px),
          linear-gradient(180deg,rgba(2,24,49,.30) 0%,rgba(4,23,40,.34) 52%,rgba(3,25,28,.70) 70%,rgba(5,33,24,.90) 100%),
          radial-gradient(ellipse at 50% 13%,#0c4f83 0%,#082844 48%,#06131f 78%)!important;
        box-shadow:0 22px 70px rgba(0,0,0,.42),inset 0 0 70px rgba(19,142,224,.13)!important;
      }
      #fhqHome .fhq-hero:after{
        content:"";position:absolute;left:-3%;right:-3%;bottom:-4px;height:95px;pointer-events:none;
        background:
          repeating-linear-gradient(90deg,transparent 0 10%,rgba(255,255,255,.08) 10% 10.25%),
          linear-gradient(180deg,rgba(18,94,55,.08),rgba(7,75,38,.58));
        border-top:1px solid rgba(115,255,180,.13);
        transform:perspective(300px) rotateX(52deg);transform-origin:bottom;
        opacity:.86;
      }
      #fhqHome .fhq-hero>*{position:relative;z-index:2}
      #fhqHome .fhq-home-brandline{gap:18px!important}
      #fhqHome .fhq-home-shield{width:112px!important;height:112px!important;flex:0 0 112px!important;filter:drop-shadow(0 0 13px rgba(40,197,255,.60))!important}
      #fhqHome .fhq-home-brandline h1{
        font-size:clamp(72px,8vw,118px)!important;line-height:.82!important;
        letter-spacing:-.02em!important;font-weight:1000!important;
        color:#f8fbff!important;
        text-shadow:0 2px 0 #96b6d2,0 6px 0 rgba(0,0,0,.28),0 0 25px rgba(57,183,255,.15)!important;
        font-style:italic!important;
      }
      #fhqHome .fhq-home-brandline:after{content:"COMPETE • COLLECT • CLIMB"!important;color:#f9fbff!important;font-size:11px!important;letter-spacing:.28em!important;margin-top:116px!important;margin-left:130px!important;text-shadow:0 0 12px rgba(35,195,255,.35)!important}
      #fhqHome .fhq-hero>div:first-child>p{font-size:16px!important;color:#d7e7f2!important;max-width:680px!important}
      #fhqHome .fhq-primary{background:linear-gradient(180deg,#38d2ff,#078ef0)!important;border:1px solid #61dcff!important;box-shadow:0 0 20px rgba(27,187,255,.20)!important}
      #fhqHome .fhq-secondary{background:linear-gradient(180deg,#102941,#091a2b)!important;border-color:rgba(76,168,232,.48)!important}
      #fhqHome .fhq-hero-actions .fhq-secondary:last-child{background:linear-gradient(180deg,rgba(99,58,186,.72),rgba(36,25,78,.95))!important;border-color:#865aff!important;box-shadow:0 0 20px rgba(129,77,255,.10)!important}

      /* ===== Cards: more color, more exaggeration ===== */
      #fhqHome .fhq-dashboard-card,#fhqHome .fhq-daily-reward,#fhqHome .fhq-card{
        border-color:rgba(41,176,239,.47)!important;
        background:linear-gradient(155deg,rgba(7,29,48,.98),rgba(4,16,29,.99))!important;
        box-shadow:0 14px 35px rgba(0,0,0,.24),inset 0 1px rgba(255,255,255,.025)!important;
      }
      #fhqHome .fhq-dashboard-card:nth-child(1){background:linear-gradient(155deg,rgba(0,48,83,.96),rgba(4,20,35,.99))!important}
      #fhqHome .fhq-dashboard-card:nth-child(2){background:linear-gradient(155deg,rgba(48,37,7,.82),rgba(7,21,35,.99))!important;border-color:rgba(255,198,47,.35)!important}
      #fhqHome .fhq-dashboard-card:nth-child(3){background:linear-gradient(155deg,rgba(74,27,11,.72),rgba(10,18,31,.99))!important;border-color:rgba(255,112,46,.32)!important}
      #fhqHome .fhq-dashboard-card:nth-child(4){background:linear-gradient(155deg,rgba(12,48,89,.88),rgba(6,21,37,.99))!important}
      #fhqHome .fhq-dashboard-card strong{font-size:28px!important}

      #fhqHome .fhq-daily-reward:nth-child(1){background:linear-gradient(135deg,rgba(9,58,94,.94),rgba(5,23,40,.98))!important}
      #fhqHome .fhq-daily-reward:nth-child(2){background:linear-gradient(135deg,rgba(56,31,106,.66),rgba(6,25,43,.98))!important;border-color:rgba(136,82,255,.38)!important}
      #fhqHome .fhq-daily-reward .icon{width:64px!important;height:64px!important;border-color:rgba(57,198,255,.46)!important;box-shadow:0 0 22px rgba(30,183,255,.09)!important}

      /* Colorful original Daily Game art badges */
      .turf-game-art{height:105px;margin:-14px -14px 14px;border-radius:14px 14px 10px 10px;display:grid;place-items:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(62,187,244,.28)}
      .turf-game-art:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,rgba(255,255,255,.16),transparent 35%),linear-gradient(135deg,rgba(15,111,177,.68),rgba(4,18,33,.92))}
      .turf-game-art svg{position:relative;width:62px;height:62px;stroke:#eafaff;filter:drop-shadow(0 0 12px rgba(37,190,255,.55))}
      .turf-game-art.gold:before{background:radial-gradient(circle at 50% 25%,rgba(255,221,96,.22),transparent 35%),linear-gradient(135deg,#6c4709,#11182a)}.turf-game-art.gold svg{stroke:#ffd751;filter:drop-shadow(0 0 12px rgba(255,208,65,.45))}
      .turf-game-art.purple:before{background:radial-gradient(circle at 50% 25%,rgba(181,100,255,.24),transparent 35%),linear-gradient(135deg,#38166d,#10172a)}.turf-game-art.purple svg{stroke:#c891ff;filter:drop-shadow(0 0 13px rgba(174,89,255,.52))}
      .turf-game-art.green:before{background:radial-gradient(circle at 50% 25%,rgba(73,240,159,.21),transparent 35%),linear-gradient(135deg,#0e5837,#0b1b2b)}.turf-game-art.green svg{stroke:#7ff0ad;filter:drop-shadow(0 0 12px rgba(68,227,140,.42))}
      #fhqHome .fhq-card{overflow:hidden!important;padding:14px!important}
      #fhqHome .fhq-card:hover{transform:translateY(-5px) scale(1.015)!important;border-color:#29c6ff!important;box-shadow:0 20px 42px rgba(0,0,0,.32),0 0 24px rgba(39,190,255,.10)!important}

      /* ===== Top wallet ===== */
      .turf-top-wallet{border-color:rgba(52,188,249,.52)!important;background:linear-gradient(160deg,#09263b,#061522)!important}
      .turf-wallet-orb{color:#704800!important;background:radial-gradient(circle at 35% 30%,#fff3a3,#ffd33d 45%,#d79c00 100%)!important;border:1px solid rgba(255,231,109,.75)!important;box-shadow:0 0 15px rgba(255,201,49,.20)!important}
      .turf-top-future{border-color:rgba(142,86,255,.35)!important;background:linear-gradient(160deg,#1d1640,#091729)!important}

      /* Remove league-brand wording without changing code/data */
      .turf-no-league-brand{display:none!important}

      @media(max-width:900px){
        #fhqHome .fhq-home-shield{width:72px!important;height:72px!important;flex-basis:72px!important}
        #fhqHome .fhq-home-brandline h1{font-size:58px!important}
        #fhqHome .fhq-home-brandline:after{margin-top:80px!important;margin-left:86px!important;font-size:7px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function exactTextReplace(){
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),nodes=[],n;
    while((n=walker.nextNode())) nodes.push(n);
    nodes.forEach(function(t){
      var p=t.parentElement;if(!p) return;
      var tag=p.tagName;if(tag==='SCRIPT'||tag==='STYLE'||tag==='TEXTAREA'||tag==='INPUT') return;
      var v=t.nodeValue||'', nv=v;
      nv=nv.replace(/\bNFL\b/g,'Pro Football');
      nv=nv.replace(/National Football League/gi,'Pro Football');
      nv=nv.replace(/FOOTBALL HQ/gi,'TURF');
      nv=nv.replace(/HQ Coins/gi,'TURF Coins');
      nv=nv.replace(/HQ Pass/gi,'TURF Pass');
      nv=nv.replace(/HQ Shop/gi,'TURF Shop');
      if(nv!==v)t.nodeValue=nv;
    });
  }

  function setFavicon(){
    qsa('link[rel~="icon"],link[rel="shortcut icon"]').forEach(function(x){try{x.remove()}catch(e){}});
    var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=MARK;document.head.appendChild(l);
  }

  function parseNumber(s){
    var m=String(s||'').replace(/,/g,'').match(/(?:^|\D)(\d{1,9})(?:\D|$)/);
    return m?Number(m[1]):null;
  }

  function findRealCoins(){
    /* Strongest path: find a native wallet whose label says coins and whose value is not our topbar. */
    var all=qsa('body *');
    var best=null;
    for(var i=0;i<all.length;i++){
      var el=all[i];
      if(el.closest&&el.closest('#turfTopbar')) continue;
      var tx=(el.textContent||'').trim();
      if(!/\b(?:HQ|TURF)\s*COINS\b/i.test(tx)) continue;
      var nums=tx.replace(/,/g,'').match(/\d{1,9}/g)||[];
      for(var j=0;j<nums.length;j++){
        var num=Number(nums[j]);
        if(!Number.isFinite(num)) continue;
        /* prefer the largest plausible account balance, avoids year / labels */
        if(best===null||num>best) best=num;
      }
    }
    /* Fallback: known account balance elements that contain a large integer. */
    if(best===null){
      qsa('[class*="coin"],[id*="coin"],[class*="wallet"],[id*="wallet"]').forEach(function(el){
        if(el.closest&&el.closest('#turfTopbar')) return;
        var nums=(el.textContent||'').replace(/,/g,'').match(/\d{1,9}/g)||[];
        nums.forEach(function(x){var n=Number(x);if(Number.isFinite(n)&&(best===null||n>best))best=n});
      });
    }
    return best;
  }

  function syncCoins(){
    var n=findRealCoins();
    var out=qs('#turfTopCoins');
    if(out&&n!==null) out.textContent=n.toLocaleString();
  }

  function iconSvg(kind){
    var common='viewBox="0 0 64 64" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';
    var d={
      active:'<circle cx="32" cy="22" r="10"/><path d="M14 52c2-13 9-19 18-19s16 6 18 19"/><path d="m22 42 10 7 10-7"/>',
      grid:'<rect x="10" y="10" width="44" height="44" rx="6"/><path d="M25 10v44M40 10v44M10 25h44M10 40h44"/><circle cx="47" cy="17" r="4"/>',
      legends:'<path d="M19 10h26v9c0 12-6 20-13 20s-13-8-13-20z"/><path d="M24 49h16M32 39v10"/><path d="M19 16h-8v4c0 8 5 13 12 13M45 16h8v4c0 8-5 13-12 13"/>',
      who:'<circle cx="27" cy="22" r="10"/><path d="M9 53c3-13 9-19 18-19 5 0 9 2 13 5"/><path d="M43 22c1-7 14-7 14 2 0 7-8 7-8 13M49 47h.01"/>'
    };
    return '<svg '+common+'>'+ (d[kind]||d.grid) +'</svg>';
  }

  function decorateGameCards(){
    var cards=qsa('#fhqHome .fhq-card');
    cards.forEach(function(card,idx){
      if(qs('.turf-game-art',card))return;
      var title=(qs('h3',card)||{}).textContent||'';
      var kind='grid',cls='';
      if(/active/i.test(title)){kind='active';cls='green'}
      else if(/legend/i.test(title)){kind='legends';cls='gold'}
      else if(/who am/i.test(title)){kind='who';cls='purple'}
      var art=document.createElement('div');art.className='turf-game-art '+cls;art.innerHTML=iconSvg(kind);
      card.insertBefore(art,card.firstChild);
    });
  }

  function normalizeLogoText(){
    var brand=qs('#fhqSidebar .fhq-brand-copy');
    if(brand){
      var sm=qs('small',brand); if(sm)sm.textContent='COMPETE • COLLECT • CLIMB';
      Array.prototype.slice.call(brand.childNodes).forEach(function(n){if(n.nodeType===3&&n.nodeValue.trim())n.nodeValue='TURF'});
    }
    var hero=qs('#fhqHome .fhq-home-brandline h1');if(hero)hero.textContent='TURF';
  }

  function apply(){exactTextReplace();normalizeLogoText();decorateGameCards();syncCoins();document.title='TURF'}

  function boot(){
    addCss();setFavicon();apply();
    [200,600,1300,2600,5000].forEach(function(ms){setTimeout(apply,ms)});
    setInterval(syncCoins,1000);
    if(window.MutationObserver){
      var timer=null;
      new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(apply,100)}).observe(document.body,{subtree:true,childList:true,characterData:true});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
