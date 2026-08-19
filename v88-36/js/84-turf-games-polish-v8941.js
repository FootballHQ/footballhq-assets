/* ============================================================
   TURF V89.41 — GAMES POLISH / REGRESSION FIXES
   Load AFTER 83-turf-games-master-rules-v8940.js.
   Focuses on late-render UI/state regressions without replacing core engines.
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
function mode(){
  var h=host(), all=qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',h);
  for(var i=0;i<all.length;i++){
    if(!visible(all[i]))continue;
    var t=txt(all[i]).toUpperCase();
    if(t==='ACTIVE PLAYERS'||t==='CURRENT PLAYERS'||t==='PLAYERS')return 'players';
    if(t==='GRID'||t==='NFL GRID')return 'grid';
    if(t==='LEGENDS')return 'legends';
    if(t==='WHO AM I?')return 'whoami';
    if(t==='CAREER PATH')return 'career';
    if(t==='HIGHER / LOWER'||t==='HIGHER/LOWER')return 'higherlower';
    if(t==='IMPOSTER'||t==='NFL IMPOSTER')return 'imposter';
    if(t==='CONNECTIONS'||t==='NFL CONNECTIONS')return 'connections';
    if(t==='STAT LINE')return 'statline';
    if(t==='DRAFT CLASS')return 'draftclass';
    if(t==='MOGGER')return 'mogger';
    if(t==='TIMELINE'||t==='NFL TIMELINE')return 'timeline';
    if(t==='FRANCHISE FINDER'||t==='GUESS THE TEAM')return 'franchise';
    if(t==='DEPTH CHART')return 'depth';
  }
  return '';
}
function daily(){
  var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');
  if(u&&u.classList.contains('active'))return false;
  if(d&&d.classList.contains('active'))return true;
  return /DAILY CHALLENGE/i.test(txt(host()))&&!/UNLIMITED SETUP|CHOOSE YOUR DIFFICULTY/i.test(txt(host()));
}

/* Universal dropdown close after selection. */
document.addEventListener('click',function(e){
  var item=e.target.closest&&e.target.closest('.fg-suggestion,[data-name],[role="option"]');
  if(!item)return;
  setTimeout(function(){
    qa('#fgSuggestions,.fg-suggestions,[role="listbox"]').forEach(function(box){
      box.innerHTML='';
      box.classList.remove('show','open','active');
      box.style.display='none';
    });
  },0);
},true);

function fixHigherLower(){
  if(mode()!=='higherlower')return;
  qa('button,[role="button"]',host()).forEach(function(b){
    if(txt(b).toUpperCase()==='PLAY'){
      b.disabled=true;
      b.style.setProperty('display','none','important');
      b.setAttribute('aria-hidden','true');
    }
  });
}

function fixWhoAmI(){
  if(mode()!=='whoami')return;
  var h=host();
  qa('button',h).forEach(function(b){
    if(/GIVE UP/i.test(txt(b))) b.style.setProperty('display','none','important');
  });
  var reveal=qa('button',h).filter(function(b){return /REVEAL NEXT HINT/i.test(txt(b))&&visible(b)});
  reveal.forEach(function(b,i){if(i>0)b.style.setProperty('display','none','important')});
  if(daily()){
    var clues=qa('.fg-clue-item,.fg-team-clue',h).filter(visible);
    if(clues.length>1){
      for(var i=1;i<clues.length;i++) clues[i].style.setProperty('display','none','important');
    }
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
  var resultOpen=q('#fgResultOverlay.open');
  if(resultOpen){
    qa('.fg-connections-grid,.fg-connection-board',h).forEach(function(g){g.style.setProperty('display','none','important')});
  }
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
    var p=document.createElement('div');p.className='turf8941-diff-desc';
    p.textContent=(descriptions[m]&&descriptions[m][key])||'';
    if(p.textContent)card.appendChild(p);
  });
}

function moveNewGames(){
  var page=q('#gamesPage,.games-page,#fgGamesPage')||document;
  var cards=qa('.fg-game-card,.game-card,[data-game]',page);
  function byTitle(name){return cards.find(function(c){return txt(c).toUpperCase().indexOf(name)>=0})}
  var depth=byTitle('DEPTH CHART'), cham=byTitle('CHAMELEON'), two=byTitle('TWO FACE');
  if(!depth||!cham||!two||!depth.parentElement)return;
  var parent=depth.parentElement;
  if(cham.parentElement!==parent)parent.appendChild(cham);
  if(two.parentElement!==parent)parent.appendChild(two);
  cham.classList.add('turf8941-standard-card');
  two.classList.add('turf8941-standard-card');
}

function tameConfetti(){
  qa('canvas').forEach(function(c){
    var id=(c.id||'')+' '+(c.className||'');
    if(/confetti/i.test(id)){
      c.style.pointerEvents='none';
      c.style.willChange='auto';
      c.style.transform='translateZ(0)';
    }
  });
  qa('.confetti,.confetti-piece,[class*="confetti"]',document).forEach(function(el,i){
    if(i>70)el.remove();
    else{el.style.animationDuration='900ms';el.style.willChange='transform,opacity'}
  });
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

function run(){
  addCss();
  fixHigherLower();
  fixWhoAmI();
  fixImposterDefault();
  fixConnections();
  fixTimeline();
  styleDifficulty();
  moveNewGames();
  tameConfetti();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[60,160,350,700,1200,2200,4000].forEach(function(ms){setTimeout(run,ms)});
var timer=null;
new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,35)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
})();
