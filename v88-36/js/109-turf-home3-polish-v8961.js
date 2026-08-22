/* ============================================================
   TURF v89.61 — BATCH 3 HOME 2.0 POLISH PASS
   Presentation only. No auth/account/storage/game-state changes.
   Goals:
   - Keep the approved hero and sidebar branding untouched.
   - Make New Game + Featured Challenges feel like one intentional system.
   - Tighten typography, panel rhythm, borders, and responsive behavior.
   - Remove only obvious legacy FootballHQ/HQ wording on Home.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_HOME3_POLISH_8961__)return;
window.__TURF_HOME3_POLISH_8961__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  if(document.getElementById('turfHome3Polish8961Css'))return;
  var s=document.createElement('style');
  s.id='turfHome3Polish8961Css';
  s.textContent=`
    /* Home only — preserve the approved hero dimensions/art exactly as-is. */
    #fhqHome{--turf-home-gap:16px;--turf-home-radius:16px}

    #fhqHome .turf-home-polish-panel{
      box-sizing:border-box!important;
      border-radius:var(--turf-home-radius)!important;
      border:1px solid rgba(62,181,238,.40)!important;
      background:linear-gradient(155deg,rgba(8,37,59,.96),rgba(4,20,34,.985))!important;
      box-shadow:0 14px 34px rgba(0,0,0,.20),inset 0 1px rgba(255,255,255,.025)!important;
      overflow:hidden!important;
    }
    #fhqHome .turf-home-polish-panel>h1,
    #fhqHome .turf-home-polish-panel>h2,
    #fhqHome .turf-home-polish-panel>h3,
    #fhqHome .turf-home-polish-panel .turf-home-polish-title{
      color:#f3f8fc!important;
      font-weight:900!important;
      letter-spacing:.015em!important;
      line-height:1.05!important;
      text-shadow:0 1px 0 rgba(255,255,255,.05)!important;
    }
    #fhqHome .turf-home-polish-subtitle{
      color:#8fa8ba!important;
      font-size:12px!important;
      line-height:1.35!important;
      margin-top:4px!important;
    }

    #fhqHome .turf-home-polish-new,
    #fhqHome .turf-home-polish-featured{
      align-self:stretch!important;
    }

    #fhqHome .turf-home-polish-inner{
      border-radius:14px!important;
      border:1px solid rgba(56,175,232,.31)!important;
      background:linear-gradient(155deg,rgba(9,48,76,.74),rgba(5,27,45,.84))!important;
      box-shadow:inset 0 1px rgba(255,255,255,.018)!important;
    }

    #fhqHome .turf-home-polish-featured .turf-home-polish-inner{
      background:linear-gradient(155deg,rgba(6,35,56,.92),rgba(4,23,39,.97))!important;
    }

    #fhqHome .turf-home-polish-panel button,
    #fhqHome .turf-home-polish-panel [role="button"]{
      transition:transform .14s ease,border-color .14s ease,box-shadow .14s ease!important;
    }
    #fhqHome .turf-home-polish-panel button:hover,
    #fhqHome .turf-home-polish-panel [role="button"]:hover{
      transform:translateY(-1px)!important;
    }

    /* Keep section widths balanced and spacing predictable on desktop. */
    #fhqHome .turf-home-polish-row{
      gap:var(--turf-home-gap)!important;
      align-items:stretch!important;
    }

    /* Mobile/tablet: stack safely without changing the desktop hero. */
    @media(max-width:900px){
      #fhqHome .fhq-hero{
        width:100%!important;
        max-width:100%!important;
      }
      #fhqHome .turf-home-polish-row{
        display:grid!important;
        grid-template-columns:1fr!important;
        gap:14px!important;
      }
      #fhqHome .turf-home-polish-panel{
        width:100%!important;
        min-width:0!important;
      }
    }
  `;
  document.head.appendChild(s);
}

function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}

function nearestPanel(label,home){
  var p=label;
  for(var i=0;i<7&&p&&p!==home;i++,p=p.parentElement){
    var r=null;try{r=p.getBoundingClientRect()}catch(e){}
    if(r&&r.width>=280&&r.height>=180)return p;
  }
  return label&&label.parentElement;
}

function markPanels(){
  var home=q('#fhqHome');
  if(!home)return;
  var nodes=qa('h1,h2,h3,h4,strong,div,span',home);
  var newPanel=null,featuredPanel=null,newLabel=null,featuredLabel=null;
  for(var i=0;i<nodes.length;i++){
    var t=text(nodes[i]);
    if(!newLabel&&/^NEW\s+GAME$/i.test(t)){newLabel=nodes[i];newPanel=nearestPanel(nodes[i],home)}
    if(!featuredLabel&&/^FEATURED\s+CHALLENGES$/i.test(t)){featuredLabel=nodes[i];featuredPanel=nearestPanel(nodes[i],home)}
  }

  if(newPanel){
    newPanel.classList.add('turf-home-polish-panel','turf-home-polish-new');
    if(newLabel)newLabel.classList.add('turf-home-polish-title');
  }
  if(featuredPanel){
    featuredPanel.classList.add('turf-home-polish-panel','turf-home-polish-featured');
    if(featuredLabel)featuredLabel.classList.add('turf-home-polish-title');
  }

  /* Mark their shared row when possible so spacing is consistent. */
  if(newPanel&&featuredPanel){
    var a=newPanel.parentElement,b=featuredPanel.parentElement;
    if(a&&a===b)a.classList.add('turf-home-polish-row');
  }

  [newPanel,featuredPanel].forEach(function(panel){
    if(!panel)return;
    var ps=qa('p',panel);
    if(ps[0])ps[0].classList.add('turf-home-polish-subtitle');
    qa('div',panel).forEach(function(d){
      if(d===panel)return;
      var r=null;try{r=d.getBoundingClientRect()}catch(e){}
      if(r&&r.width>220&&r.height>90&&r.height<360)d.classList.add('turf-home-polish-inner');
    });
  });
}

function cleanHomeLegacyCopy(){
  var home=q('#fhqHome');
  if(!home)return;
  var walker=document.createTreeWalker(home,NodeFilter.SHOW_TEXT,null),n;
  while((n=walker.nextNode())){
    var v=n.nodeValue;
    if(!v||!/FootballHQ|Football Headquarters|HQ Coins|HQ Points/i.test(v))continue;
    var next=v
      .replace(/Football Headquarters/gi,'TURF')
      .replace(/FootballHQ/gi,'TURF')
      .replace(/HQ Coins/gi,'TURF Coins')
      .replace(/HQ Points/gi,'XP');
    if(next!==v)n.nodeValue=next;
  }
}

function apply(){
  addCss();
  markPanels();
  cleanHomeLegacyCopy();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[80,220,500,1000,1800,3000].forEach(function(ms){setTimeout(apply,ms)});
window.addEventListener('resize',function(){setTimeout(apply,80)});
window.addEventListener('turf:auth-ready',function(){[0,180,600].forEach(function(ms){setTimeout(apply,ms)})});
if(window.MutationObserver){try{new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}}
})();
