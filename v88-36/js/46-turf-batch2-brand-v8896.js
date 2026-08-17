/* ============================================================
   TURF V88.96 — BATCH 2 BRAND / IDENTITY

   PURPOSE
   - Rebrand visible Football HQ copy to TURF without renaming internal code.
   - Apply TURF mark/wordmark styling to the existing UI.
   - Lock in the tagline: COMPETE • COLLECT • CLIMB.
   - Keep account, navigation, game, card, Set 001/002 and backend logic intact.

   IMPORTANT
   - This script never reparents native nav buttons.
   - This script never renames FootballHQ functions/variables.
   - Text replacement is presentation-only.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8896_BRAND__) return;
  window.__TURF_V8896_BRAND__=true;

  var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
  var MARK=ROOT+'turf-mark.svg?v=8896';
  var WORDMARK=ROOT+'turf-wordmark.svg?v=8896';

  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

  function installFavicon(){
    var old=qsa('link[rel~="icon"],link[rel="shortcut icon"]');
    old.forEach(function(x){try{x.remove()}catch(e){}});
    var link=document.createElement('link');
    link.rel='icon';link.type='image/svg+xml';link.href=MARK;
    document.head.appendChild(link);
  }

  function addCss(){
    if(document.getElementById('turfV8896BrandCss')) return;
    var st=document.createElement('style');
    st.id='turfV8896BrandCss';
    st.textContent=`
      :root{--turf-blue:#20b8ff;--turf-blue2:#65ddff;--turf-deep:#07111c;--turf-panel:#0c1924;--turf-gold:#f6c64e}
      body{background-color:var(--turf-deep)!important}
      #fhqSidebar.fhq-sidebar{background:linear-gradient(180deg,#09131d 0%,#0a1219 100%)!important;border-right-color:rgba(71,184,236,.18)!important}
      #fhqSidebar button[data-fhq-nav].active,#turfTrialsNav.active{border-color:rgba(56,185,246,.55)!important;background:linear-gradient(90deg,rgba(22,98,142,.34),rgba(11,28,40,.62))!important;box-shadow:inset 3px 0 0 #26baff!important}
      #fhqSidebar button[data-fhq-nav]:hover,#turfTrialsNav:hover{border-color:rgba(74,194,249,.42)!important;background:rgba(27,77,105,.24)!important}
      .turf-nav-category{color:#73bfe6!important}

      .turf-brand-lockup{display:flex!important;align-items:center!important;gap:11px!important}
      .turf-brand-lockup .turf-brand-mark{width:46px!important;height:46px!important;object-fit:contain!important;filter:drop-shadow(0 0 9px rgba(30,183,255,.34))}
      .turf-brand-lockup .turf-brand-name{font-size:24px!important;line-height:.95!important;font-weight:1000!important;letter-spacing:.035em!important;color:#f7fbff!important}
      .turf-brand-lockup .turf-brand-tag{display:block!important;margin-top:5px!important;color:#7fd8ff!important;font-size:7.5px!important;font-weight:900!important;letter-spacing:.15em!important;white-space:nowrap!important}

      .turf-hero-wordmark{display:block;width:min(560px,72vw);height:auto;max-height:118px;object-fit:contain;object-position:left center;margin:-15px 0 6px;filter:drop-shadow(0 0 14px rgba(28,171,255,.16))}
      .turf-hero-tagline{color:#7ed8ff!important;font-size:10px!important;font-weight:1000!important;letter-spacing:.22em!important;text-transform:uppercase!important;margin:2px 0 12px!important}

      .turf-premium-card{border-color:rgba(73,178,229,.26)!important;box-shadow:0 16px 42px rgba(0,0,0,.22)!important}
      .turf-coin-label{color:#80d8ff!important;letter-spacing:.08em!important}
      .turf-brand-accent{color:#72d5ff!important}
    `;
    document.head.appendChild(st);
  }

  var directMap={
    'FOOTBALL HQ':'TURF',
    'Football HQ':'TURF',
    'Football HQ ':'TURF ',
    'HQ Pass':'TURF Pass',
    'HQ Shop':'TURF Shop',
    'HQ Coins':'TURF Coins',
    'FOOTBALL HQ COINS':'TURF COINS',
    'Football HQ Rank':'TURF Rank',
    'FOOTBALL HQ RANK':'TURF RANK',
    'Football HQ • Set 001':'TURF • SET 001',
    'Football HQ • Set 002':'TURF • SET 002',
    'FOOTBALL HQ • SET 001':'TURF • SET 001',
    'FOOTBALL HQ • SET 002':'TURF • SET 002',
    '2026 FOOTBALL CENTER':'COMPETE • COLLECT • CLIMB'
  };

  function replaceTextValue(v){
    if(!v) return v;
    if(directMap[v]!==undefined) return directMap[v];
    var out=v;
    out=out.replace(/\bFootball HQ\b/g,'TURF');
    out=out.replace(/\bFOOTBALL HQ\b/g,'TURF');
    out=out.replace(/\bHQ Coins\b/g,'TURF Coins');
    out=out.replace(/\bHQ Pass\b/g,'TURF Pass');
    out=out.replace(/\bHQ Shop\b/g,'TURF Shop');
    return out;
  }

  function patchText(root){
    root=root||document.body;
    if(!root) return;
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      var p=n.parentElement;
      if(!p) return NodeFilter.FILTER_REJECT;
      var tag=p.tagName;
      if(tag==='SCRIPT'||tag==='STYLE'||tag==='TEXTAREA'||tag==='INPUT'||tag==='OPTION') return NodeFilter.FILTER_REJECT;
      return /Football HQ|FOOTBALL HQ|HQ Coins|HQ Pass|HQ Shop|2026 FOOTBALL CENTER/.test(n.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    var nodes=[],n;while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(function(t){var nv=replaceTextValue(t.nodeValue);if(nv!==t.nodeValue)t.nodeValue=nv});
  }

  function findExactText(text,root){
    var candidates=qsa('h1,h2,h3,strong,b,div,span,p',root||document);
    for(var i=0;i<candidates.length;i++){
      if((candidates[i].textContent||'').trim()===text) return candidates[i];
    }
    return null;
  }

  function brandSidebar(){
    var side=qs('#fhqSidebar');if(!side) return;
    if(qs('.turf-brand-lockup',side)) return;

    var name=findExactText('TURF',side);
    if(!name) return;
    var box=name.parentElement;
    if(!box) return;

    name.classList.add('turf-brand-name');
    var lock=document.createElement('div');
    lock.className='turf-brand-lockup';
    var mark=document.createElement('img');mark.className='turf-brand-mark';mark.src=MARK;mark.alt='TURF';
    var copy=document.createElement('div');
    var tag=document.createElement('span');tag.className='turf-brand-tag';tag.textContent='COMPETE • COLLECT • CLIMB';
    copy.appendChild(name.cloneNode(true));copy.appendChild(tag);lock.appendChild(mark);lock.appendChild(copy);

    /* Replace only the small text block; leave unrelated sidebar structure intact. */
    try{
      var container=box.parentElement||box;
      qsa('img,svg',container).slice(0,1).forEach(function(x){x.style.display='none'});
      box.style.display='none';
      container.insertBefore(lock,container.firstChild);
    }catch(e){}
  }

  function brandHero(){
    if(qs('.turf-hero-wordmark')) return;
    var h=findExactText('TURF');
    if(!h || (qs('#fhqSidebar')&&qs('#fhqSidebar').contains(h))) return;
    if(!/^H[1-3]$/.test(h.tagName)) return;
    var img=document.createElement('img');img.className='turf-hero-wordmark';img.src=WORDMARK;img.alt='TURF — Compete • Collect • Climb';
    h.style.display='none';
    h.parentNode.insertBefore(img,h);
    var tag=document.createElement('div');tag.className='turf-hero-tagline';tag.textContent='COMPETE • COLLECT • CLIMB';
    img.parentNode.insertBefore(tag,h.nextSibling);
  }

  function polish(){
    qsa('[class*="card"],[class*="panel"]').forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.width>240&&r.height>70) el.classList.add('turf-premium-card');
    });
    qsa('*').forEach(function(el){
      if(el.children.length===0 && /TURF Coins/i.test(el.textContent||'')) el.classList.add('turf-coin-label');
    });
  }

  function titleForPage(){
    var active=qs('.fhq-nav button.active[data-fhq-nav]');
    var section=active?active.getAttribute('data-fhq-nav'):'';
    var names={home:'',pass:'Pass',shop:'Shop',locker:'Locker',album:'Collections',games:'Games',rankings:'Rankings',draft:'Draft Sim',leaderboard:'Leaderboards'};
    document.title=section&&names[section]?'TURF — '+names[section]:'TURF';
    try{window.top.postMessage({type:'turf-page-title',title:document.title},'*')}catch(e){}
  }

  function apply(){
    patchText(document.body);
    brandSidebar();
    brandHero();
    polish();
    titleForPage();
  }

  function boot(){
    installFavicon();addCss();
    apply();
    [250,800,1800,3500].forEach(function(ms){setTimeout(apply,ms)});

    /* Debounced text-only observer: no nav movement/reparenting. */
    if(window.MutationObserver){
      var timer=null;
      new MutationObserver(function(){
        clearTimeout(timer);timer=setTimeout(apply,120);
      }).observe(document.body,{childList:true,subtree:true,characterData:true});
    }

    document.addEventListener('click',function(e){
      if(e.target&&e.target.closest&&e.target.closest('.fhq-nav button')) setTimeout(titleForPage,80);
    },false);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
