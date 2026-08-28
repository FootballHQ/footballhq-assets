/* ============================================================
   TURF V89.41 — GAMES POLISH / REGRESSION FIXES
   Load AFTER 83-turf-games-master-rules-v8940.js.
   This version aggressively re-enforces late-render fixes.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8941_POLISH__) return;
window.__TURF_V8941_POLISH__=true;

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;var c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0'}
function host(){return q('#fgSpecialGame')||q('#fgGridGame')||q('#footballGameOverlay')||document.body}
function titleText(){
  var h=host();
  var candidates=qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',h).filter(visible);
  return candidates.map(txt).join(' | ').toUpperCase();
}
function mode(){
  var t=titleText();
  if(/\b(ACTIVE PLAYERS|CURRENT PLAYERS|PLAYERS)\b/.test(t))return 'players';
  if(/\b(NFL GRID|GRID)\b/.test(t))return 'grid';
  if(/\bLEGENDS\b/.test(t))return 'legends';
  if(/WHO AM I\?/.test(t))return 'whoami';
  if(/CAREER PATH/.test(t))return 'career';
  if(/HIGHER\s*\/\s*LOWER/.test(t))return 'higherlower';
  if(/\b(NFL IMPOSTER|IMPOSTER)\b/.test(t))return 'imposter';
  if(/\b(NFL CONNECTIONS|CONNECTIONS)\b/.test(t))return 'connections';
  if(/STAT LINE/.test(t))return 'statline';
  if(/DRAFT CLASS/.test(t))return 'draftclass';
  if(/\bMOGGER\b/.test(t))return 'mogger';
  if(/\b(NFL TIMELINE|TIMELINE)\b/.test(t))return 'timeline';
  if(/FRANCHISE FINDER|GUESS THE TEAM/.test(t))return 'franchise';
  if(/DEPTH CHART/.test(t))return 'depth';
  return '';
}
function daily(){
  var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');
  if(u&&u.classList.contains('active'))return false;
  if(d&&d.classList.contains('active'))return true;
  return /DAILY CHALLENGE/i.test(txt(host()))&&!/UNLIMITED SETUP|CHOOSE YOUR DIFFICULTY/i.test(txt(host()));
}

document.addEventListener('click',function(e){
  var item=e.target.closest&&e.target.closest('.fg-suggestion,[data-name],[role="option"]');
  if(!item)return;
  setTimeout(function(){
    qa('#fgSuggestions,.fg-suggestions,[role="listbox"]').forEach(function(box){
      box.innerHTML='';
      box.classList.remove('show','open','active');
      box.style.setProperty('display','none','important');
    });
  },0);
},true);

function fixHigherLower(){
  if(mode()!=='higherlower')return;
  var h=host();
  qa('button,[role="button"]',h).forEach(function(b){
    var t=txt(b).replace(/✓/g,'').trim().toUpperCase();
    if(t==='PLAY'){
      b.disabled=true;
      b.setAttribute('aria-hidden','true');
      b.style.setProperty('display','none','important');
      b.style.setProperty('visibility','hidden','important');
      b.style.setProperty('pointer-events','none','important');
      if(b.parentNode) b.parentNode.removeChild(b);
    }
  });
  qa('*',h).forEach(function(el){
    if(!el.children.length&&/^0\s*(?:TO|[-–—])\s*0$/i.test(txt(el)))el.style.setProperty('display','none','important');
  });
}

function fixWhoAmI(){
  if(mode()!=='whoami')return;
  var h=host();
  qa('button,[role="button"]',h).forEach(function(b){
    if(/^GIVE UP$/i.test(txt(b))){
      b.style.setProperty('display','none','important');
      b.disabled=true;
      if(b.parentNode)b.parentNode.removeChild(b);
    }
  });
  var reveal=qa('button,[role="button"]',h).filter(function(b){return /REVEAL NEXT HINT/i.test(txt(b))});
  reveal.forEach(function(b,i){
    if(i===0){
      b.style.removeProperty('display');
      b.style.removeProperty('visibility');
      b.removeAttribute('aria-hidden');
    }else if(b.parentNode){
      b.parentNode.removeChild(b);
    }
  });
  if(daily()){
    var clues=qa('.fg-clue-item,.fg-team-clue',h);
    clues.forEach(function(c,i){c.style.setProperty('display',i===0?'':'none','important')});
  }
}

function fixImposterDefault(){
  if(mode()!=='imposter')return;
  var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');
  if(!d||!u)return;
  var h=host();
  if(!h.dataset.turf8941ImposterInit){
    h.dataset.turf8941ImposterInit='1';
    if(u.classList.contains('active')&&!/CHOOSE YOUR|UNLIMITED SETUP/i.test(txt(h))){
      setTimeout(function(){try{d.click()}catch(e){}},20);
    }
  }
}

function fixConnections(){
  if(mode()!=='connections')return;
  var h=host();
  qa('.fg-connections-grid button,.fg-connections-grid [data-conn],.fg-connection-card,[data-connection-card]',h).forEach(function(el){
    el.style.setProperty('background','#121a20','important');
    el.style.setProperty('color','#f5f7fa','important');
    el.style.setProperty('border-color','#344751','important');
  });
  var solved=qa('.fg-conn-solved,.fg-connection-group,[class*="connection"][class*="solved"]',h).filter(visible);
  if(solved.length){
    var names={};
    solved.forEach(function(g){qa('button,[data-conn]',g).forEach(function(x){names[txt(x).toLowerCase()]=1})});
    qa('.fg-connections-grid button,.fg-connections-grid [data-conn]',h).forEach(function(x){
      if(names[txt(x).toLowerCase()])x.style.setProperty('display','none','important');
    });
  }
  if(q('#fgResultOverlay.open'))qa('.fg-connections-grid,.fg-connection-board',h).forEach(function(g){g.style.setProperty('display','none','important')});
}

function fixTimeline(){
  if(mode()!=='timeline')return;
  qa('.fg-timeline-item,.fg-timeline-row,.fg-order-item,.fg-timeline-list *',host()).forEach(function(el){
    el.style.setProperty('transition','none','important');
    el.style.setProperty('animation','none','important');
  });
}

function styleDifficulty(){
  var m=mode();
  if(!/players|grid|whoami|career|higherlower|imposter|connections|draftclass|mogger/.test(m))return;
  var h=host();
  var buttons=qa('button',h).filter(function(b){return /^(EASY|MEDIUM|BRUTAL)$/i.test(txt(b))});
  if(buttons.length<3)return;
  var descriptions={
    players:{EASY:'Current offensive skill-position names and major stars.',MEDIUM:'Current starters from both sides of the ball.',BRUTAL:'Full current roster pool, including obscure depth players.'},
    grid:{EASY:'Common teams, positions, and familiar player combinations.',MEDIUM:'Broader NFL history and tougher team/position intersections.',BRUTAL:'Deep historical roster knowledge and uncommon player paths.'},
    whoami:{EASY:'More recognizable players and more informative clues.',MEDIUM:'Less obvious players with moderately specific clues.',BRUTAL:'Deep-cut players with tougher clue combinations.'},
    career:{EASY:'Short, recognizable career paths.',MEDIUM:'Longer paths and less obvious stops.',BRUTAL:'Journeymen and difficult multi-team histories.'},
    higherlower:{EASY:'Familiar offensive comparisons.',MEDIUM:'Broader categories and less obvious players.',BRUTAL:'Deep statistical comparisons and defensive categories.'},
    imposter:{EASY:'Obvious shared traits and familiar names.',MEDIUM:'Less direct connections and broader player pools.',BRUTAL:'Niche relationships, stats, colleges, and history.'},
    connections:{EASY:'Teams, positions, divisions, and obvious links.',MEDIUM:'Draft history, colleges, awards, and less obvious links.',BRUTAL:'Stats, draft slots, awards, deep history, and niche facts.'},
    draftclass:{EASY:'Well-known quarterbacks and skill-position stars.',MEDIUM:'Recognizable starters and secondary names.',BRUTAL:'Bench players, specialists, and obscure draft classes.'},
    mogger:{EASY:'Superstars almost every NFL fan recognizes.',MEDIUM:'Starters and moderately recognizable faces.',BRUTAL:'Depth players, niche names, and difficult faces.'}
  };
  buttons.forEach(function(b){
    var key=txt(b).toUpperCase();
    var card=b.closest('.fg-difficulty-card,[class*="difficulty-card"],.fg-choice-card')||b.parentElement;
    if(!card||card.querySelector('.turf8941-diff-desc'))return;
    var p=document.createElement('div');p.className='turf8941-diff-desc';p.textContent=(descriptions[m]&&descriptions[m][key])||'';
    if(p.textContent)card.appendChild(p);
  });
}

function moveNewGames(){
  var page=q('#gamesPage,.games-page,#fgGamesPage')||document;
  var cards=qa('.fg-game-card,.game-card,[data-game]',page);
  function byTitle(name){return cards.find(function(c){return txt(c).toUpperCase().indexOf(name)>=0})}
  var depth=byTitle('DEPTH CHART'),cham=byTitle('CHAMELEON'),two=byTitle('TWO FACE');
  if(!depth||!cham||!two||!depth.parentElement)return;
  var parent=depth.parentElement;
  if(cham.parentElement!==parent)parent.appendChild(cham);
  if(two.parentElement!==parent)parent.appendChild(two);
  cham.classList.add('turf8941-standard-card');two.classList.add('turf8941-standard-card');
}

function tameConfetti(){
  qa('canvas').forEach(function(c){var id=(c.id||'')+' '+(c.className||'');if(/confetti/i.test(id)){c.style.pointerEvents='none';c.style.willChange='auto';c.style.transform='translateZ(0)'}});
  qa('.confetti,.confetti-piece,[class*="confetti"]',document).forEach(function(el,i){if(i>70)el.remove();else{el.style.animationDuration='900ms';el.style.willChange='transform,opacity'}});
}

function addCss(){
  if(q('#turf8941Css'))return;
  var s=document.createElement('style');s.id='turf8941Css';s.textContent=`
    .turf8941-diff-desc{margin-top:10px;color:#9eb0bd;font:700 11px/1.35 system-ui;max-width:260px}
    .turf8941-standard-card{min-height:0!important;height:auto!important}
    #fgSpecialGame .fg-connections-grid button,#fgSpecialGame .fg-connection-card{background:#121a20!important;color:#f5f7fa!important;border-color:#344751!important}
    #fgSuggestions:empty,.fg-suggestions:empty,[role="listbox"]:empty{display:none!important}
    .fg-timeline-item,.fg-timeline-row,.fg-order-item{transition:none!important}
  `;document.head.appendChild(s);
}

function run(){addCss();fixHigherLower();fixWhoAmI();fixImposterDefault();fixConnections();fixTimeline();styleDifficulty();moveNewGames();tameConfetti()}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,30,80,150,300,600,1000,1600,2500,4000,6500,10000].forEach(function(ms){setTimeout(run,ms)});
var timer=null;
new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,12)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,characterData:true,attributeFilter:['class','style','aria-hidden','disabled']});
setInterval(function(){if(q('#fgSpecialGame')||q('#fgGridGame')||q('#footballGameOverlay'))run()},250);
})();

/* Active Players: one authoritative patch only. */
(function(){
  if(window.__TURF_ACTIVE_PLAYERS_SINGLE_LOADER__)return;
  window.__TURF_ACTIVE_PLAYERS_SINGLE_LOADER__=true;
  document.querySelectorAll('script[src*="105-turf-active-players"],script[src*="106-turf-active-players"]').forEach(function(n){try{n.remove()}catch(e){}});
  var s=document.createElement('script');
  s.src='https://footballhq.github.io/footballhq-assets/v88-36/js/107-turf-active-players-exact-v8957.js?v=8957-'+Date.now();
  s.async=true;
  (document.head||document.documentElement).appendChild(s);
})();
