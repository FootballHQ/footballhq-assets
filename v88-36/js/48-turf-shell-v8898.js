/* ============================================================
   TURF V88.98 — APP SHELL / TOP BAR / SIDEBAR ICON SYSTEM

   GOALS
   - Bring the approved TURF mockup shell into the live app.
   - Add top-right wallet, future-currency slot, notifications, profile and menu.
   - Remove the duplicate large Profile card from the sidebar.
   - Move sidebar navigation upward.
   - Add original TURF interface icons without NFL/team marks.
   - Keep all existing account, navigation, game, card and backend handlers intact.

   IMPORTANT
   - Native navigation buttons are never reparented.
   - Existing click handlers remain on the original buttons.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8898_SHELL__) return;
  window.__TURF_V8898_SHELL__=true;

  var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
  var MARK=ROOT+'turf-mark.svg?v=8898';

  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

  function svgIcon(type){
    var common='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    var p={
      home:'<path d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4z"/>',
      pass:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M8 9h8M8 13h5"/><path d="M18 5v14"/>',
      shop:'<path d="M5 9h14l-1 11H6L5 9Z"/><path d="M8 9a4 4 0 0 1 8 0"/>',
      locker:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18M9 9h10M12 13h2"/>',
      album:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v16M12 8h5M12 12h5M12 16h3"/>',
      games:'<path d="M7 9h10a4 4 0 0 1 3.6 5.7l-1.2 2.5a2.2 2.2 0 0 1-3.4.7L14.5 16h-5L8 17.9a2.2 2.2 0 0 1-3.4-.7l-1.2-2.5A4 4 0 0 1 7 9Z"/><path d="M7 12v3M5.5 13.5h3M16 12h.01M18 14h.01"/>',
      rankings:'<path d="M5 20V11h4v9M10 20V6h4v14M15 20V3h4v17"/>',
      draft:'<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h5M8 16h3"/><path d="m16 15 2 2 3-4"/>',
      leaderboard:'<path d="M8 20h8M12 16v4"/><path d="M7 4h10v3a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v1a4 4 0 0 0 4 4M17 6h3v1a4 4 0 0 1-4 4"/>',
      trials:'<path d="m13 2-7 11h5l-1 9 8-12h-5z"/>',
      coming:'<path d="M12 5v14M5 12h14"/>'
    };
    return '<svg '+common+'>'+ (p[type]||p.coming) +'</svg>';
  }

  function addCss(){
    if(document.getElementById('turfV8898ShellCss')) return;
    var s=document.createElement('style');
    s.id='turfV8898ShellCss';
    s.textContent=`
      :root{--turf-shell-h:70px;--turf-sidebar-w:282px}

      /* Top utility bar */
      #turfTopbar{
        position:fixed;top:0;left:var(--turf-sidebar-w);right:0;height:var(--turf-shell-h);
        z-index:2147481000;display:flex;align-items:center;justify-content:flex-end;gap:10px;
        padding:0 18px;background:linear-gradient(180deg,rgba(5,14,23,.98),rgba(6,16,25,.94));
        border-bottom:1px solid rgba(37,178,245,.28);box-shadow:0 7px 28px rgba(0,0,0,.17);
        backdrop-filter:blur(15px);
      }
      #turfTopbar:before{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:linear-gradient(90deg,transparent,#2fc3ff 38%,#6757ff 73%,transparent);opacity:.45}
      .turf-top-wallet,.turf-top-future,.turf-top-icon,.turf-top-profile{
        height:42px;border:1px solid rgba(75,178,226,.30);background:linear-gradient(160deg,#0d2130,#081824);
        color:#f5fbff;border-radius:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(0,0,0,.15)
      }
      .turf-top-wallet{padding:0 13px;gap:10px;min-width:138px;justify-content:flex-start}
      .turf-wallet-orb{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;font-size:14px;font-weight:1000;color:#08131c;background:linear-gradient(145deg,#ffe887,#d8a620);box-shadow:0 0 14px rgba(246,196,81,.18)}
      .turf-wallet-copy small{display:block;color:#7edaff;font-size:7px;font-weight:1000;letter-spacing:.16em;line-height:1}.turf-wallet-copy strong{display:block;margin-top:4px;font-size:16px;line-height:1}
      .turf-top-future{padding:0 11px;gap:7px;color:#8da4b4;min-width:75px}.turf-future-gem{width:18px;height:18px;transform:rotate(45deg);border:1px solid rgba(122,111,255,.5);background:linear-gradient(145deg,#483ba2,#181b40);border-radius:5px}.turf-top-future span:last-child{font-size:9px;font-weight:900;letter-spacing:.1em}
      .turf-top-icon{width:42px;cursor:pointer;transition:.16s}.turf-top-icon:hover,.turf-top-profile:hover{border-color:#32bfff;transform:translateY(-1px)}.turf-top-icon svg{width:21px;height:21px}
      .turf-top-profile{width:45px;border-radius:50%;padding:4px;cursor:pointer;position:relative}.turf-top-profile img{width:100%;height:100%;object-fit:contain}.turf-top-profile:after{content:"";position:absolute;right:1px;bottom:1px;width:8px;height:8px;border-radius:50%;background:#42da86;border:2px solid #07111b}
      .turf-notification-dot{position:absolute;width:7px;height:7px;border-radius:50%;background:#4ad8ff;right:8px;top:8px;box-shadow:0 0 9px #4ad8ff}

      /* Remove duplicate profile card and reclaim that space */
      #fhqSidebar .fhq-profile-button{display:none!important}
      #fhqSidebar.fhq-sidebar{padding-top:0!important;width:var(--turf-sidebar-w)!important}
      #fhqSidebar .fhq-brand{min-height:70px!important;height:70px!important;padding:10px 18px!important;margin:0!important}
      #fhqSidebar .fhq-nav{padding-top:3px!important}
      #fhqSidebar .turf-nav-category{margin-top:10px!important}

      /* Top offset for every app section so topbar does not cover content */
      #fhqMain,.fhq-main,.fhq-main-content,#fhqHome,.fhq-overlay:not(.fhq-sidebar){padding-top:var(--turf-shell-h)!important}
      #fhqHome.fhq-home-overlay{padding-top:var(--turf-shell-h)!important}
      #turfLeaderboardHub{top:var(--turf-shell-h)!important}

      /* Original TURF sidebar icon treatment */
      #fhqSidebar .fhq-nav button,#turfTrialsNav{display:flex!important;align-items:center!important;gap:10px!important}
      .turf-nav-icon{width:27px;height:27px;flex:0 0 27px;display:grid;place-items:center;border-radius:8px;background:linear-gradient(145deg,rgba(20,62,85,.78),rgba(8,28,42,.9));border:1px solid rgba(69,176,225,.23);color:#6bd7ff}
      .turf-nav-icon svg{width:16px;height:16px}
      [data-fhq-nav="pass"] .turf-nav-icon{color:#f7c950;border-color:rgba(247,201,80,.28);background:rgba(99,71,11,.18)}
      [data-fhq-nav="album"] .turf-nav-icon{color:#f5d65c;border-color:rgba(245,214,92,.25)}
      [data-fhq-nav="draft"] .turf-nav-icon{color:#ae86ff;border-color:rgba(174,134,255,.28)}
      [data-fhq-nav="leaderboard"] .turf-nav-icon{color:#ffd65b;border-color:rgba(255,214,91,.28)}
      #turfTrialsNav .turf-nav-icon{color:#f7ca50;border-color:rgba(247,202,80,.27)}
      #fhqSidebar .fhq-nav button.active .turf-nav-icon{box-shadow:0 0 15px rgba(41,184,247,.11);border-color:rgba(74,201,255,.5)}

      /* Slightly closer match to approved mockup */
      #fhqHome .fhq-hero{margin-top:8px!important;border-color:rgba(48,181,240,.42)!important;box-shadow:0 22px 60px rgba(0,0,0,.32),0 0 30px rgba(34,164,226,.05)!important}
      #fhqHome .fhq-hero-actions button{min-height:48px!important;border-radius:11px!important}
      #fhqHome .fhq-dashboard-card,#fhqHome .fhq-daily-reward,#fhqHome .fhq-card{border-radius:15px!important}

      /* Collapsed sidebar desktop mode via hamburger */
      body.turf-sidebar-collapsed #fhqSidebar{transform:translateX(calc(-1 * var(--turf-sidebar-w)))!important;transition:transform .2s ease!important}
      body.turf-sidebar-collapsed #turfTopbar{left:0!important}
      body.turf-sidebar-collapsed #fhqMain,body.turf-sidebar-collapsed .fhq-main,body.turf-sidebar-collapsed .fhq-main-content,body.turf-sidebar-collapsed #fhqHome{margin-left:0!important;left:0!important}
      #fhqSidebar{transition:transform .2s ease!important}

      /* Tiny notifications popover */
      #turfNoticePopover{position:fixed;right:78px;top:61px;width:300px;z-index:2147482000;border:1px solid rgba(70,181,232,.28);border-radius:15px;padding:15px;background:linear-gradient(165deg,#0d2030,#08151f);box-shadow:0 20px 55px rgba(0,0,0,.42);display:none;color:#f4f9fc}
      #turfNoticePopover.open{display:block}.turf-notice-head{font-size:12px;font-weight:1000;letter-spacing:.08em}.turf-notice-empty{margin-top:10px;padding:13px;border-radius:11px;background:rgba(255,255,255,.035);color:#8fa6b5;font-size:11px;line-height:1.5}

      @media(max-width:800px){
        :root{--turf-sidebar-w:0px;--turf-shell-h:58px}
        #turfTopbar{left:0!important;padding:0 9px;gap:6px}.turf-top-future{display:none}.turf-top-wallet{min-width:112px;height:38px}.turf-top-icon,.turf-top-profile{width:38px;height:38px}.turf-wallet-copy strong{font-size:14px}
        #fhqSidebar .fhq-profile-button{display:none!important}
      }
    `;
    document.head.appendChild(s);
  }

  function stripLegacyGlyph(button){
    if(!button || button.dataset.turfIconized==='1') return;
    var nodes=Array.prototype.slice.call(button.childNodes);
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i];
      if(n.nodeType===3 && n.nodeValue){
        n.nodeValue=n.nodeValue.replace(/^\s*[▣◉▤▦★◇⚡⌂◫⊞+]+\s*/,'');
        if(n.nodeValue.trim()) break;
      }
    }
  }

  function iconizeButton(button,type){
    if(!button) return;
    stripLegacyGlyph(button);
    if(qs('.turf-nav-icon',button)) return;
    var wrap=document.createElement('span');wrap.className='turf-nav-icon';wrap.innerHTML=svgIcon(type);
    button.insertBefore(wrap,button.firstChild);
    button.dataset.turfIconized='1';
  }

  function iconizeNav(){
    var map={home:'home',pass:'pass',shop:'shop',locker:'locker',album:'album',games:'games',rankings:'rankings',draft:'draft',leaderboard:'leaderboard',coming:'coming'};
    Object.keys(map).forEach(function(k){iconizeButton(qs('.fhq-nav [data-fhq-nav="'+k+'"]'),map[k])});
    iconizeButton(qs('#turfTrialsNav'),'trials');
  }

  function coinValue(){
    var candidates=qsa('[class*="coin"],[id*="coin"],.fhq-shop-wallet,.fhq-wallet');
    for(var i=0;i<candidates.length;i++){
      var t=(candidates[i].textContent||'').replace(/,/g,'');
      var m=t.match(/\b(\d{1,9})\b/);
      if(m && Number(m[1])>=0) return Number(m[1]).toLocaleString();
    }
    return '0';
  }

  function openProfile(){
    try{
      if(typeof window.openFootballHQProfile==='function'){window.openFootballHQProfile();return}
      var native=qs('#fhqSidebar .fhq-profile-button');if(native){native.click();return}
    }catch(e){}
  }

  function ensureTopbar(){
    var bar=qs('#turfTopbar');
    if(bar) return bar;
    bar=document.createElement('header');bar.id='turfTopbar';
    bar.innerHTML=`
      <div class="turf-top-wallet" title="TURF Coins"><span class="turf-wallet-orb">T</span><div class="turf-wallet-copy"><small>TURF COINS</small><strong id="turfTopCoins">0</strong></div></div>
      <div class="turf-top-future" title="Future TURF currency"><span class="turf-future-gem"></span><span>SOON</span></div>
      <button type="button" class="turf-top-icon" id="turfNotifyBtn" aria-label="Notifications">${svgIcon('leaderboard')}<span class="turf-notification-dot"></span></button>
      <button type="button" class="turf-top-profile" id="turfProfileBtn" aria-label="Profile"><img src="${MARK}" alt="TURF profile"></button>
      <button type="button" class="turf-top-icon" id="turfMenuBtn" aria-label="Toggle sidebar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>`;
    document.body.appendChild(bar);

    var pop=document.createElement('div');pop.id='turfNoticePopover';pop.innerHTML='<div class="turf-notice-head">NOTIFICATIONS</div><div class="turf-notice-empty">You’re all caught up. Trial results, rewards, streaks and future TURF alerts can appear here.</div>';document.body.appendChild(pop);

    qs('#turfNotifyBtn').onclick=function(e){e.stopPropagation();pop.classList.toggle('open')};
    qs('#turfProfileBtn').onclick=openProfile;
    qs('#turfMenuBtn').onclick=function(){document.body.classList.toggle('turf-sidebar-collapsed')};
    document.addEventListener('click',function(e){if(pop.classList.contains('open')&&!pop.contains(e.target)&&e.target!==qs('#turfNotifyBtn'))pop.classList.remove('open')});
    return bar;
  }

  function syncCoins(){var el=qs('#turfTopCoins');if(el)el.textContent=coinValue()}

  function apply(){
    addCss();ensureTopbar();iconizeNav();syncCoins();
    var profile=qs('#fhqSidebar .fhq-profile-button');if(profile)profile.setAttribute('aria-hidden','true');
  }

  function boot(){
    apply();
    [250,700,1500,3000].forEach(function(ms){setTimeout(apply,ms)});
    setInterval(syncCoins,1500);
    if(window.MutationObserver){
      var timer=null;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(function(){iconizeNav();syncCoins()},120)}).observe(document.body,{childList:true,subtree:true,characterData:true});
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
