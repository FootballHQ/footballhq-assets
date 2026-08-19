/* ============================================================
   TURF V89.39 — AUTHORITATIVE GAMES REGRESSION AUDIT
   Late-loading safety patch for fixes that were being overwritten
   by later game renders.

   Enforces:
   - Grid: broad full-player suggestion pool (rankings/local account data),
     rather than a tiny/context-filtered suggestion set.
   - Higher / Lower: removes the obsolete blue PLAY button and 0–0 junk.
   - Daily Who Am I?: starts with ONE visible hint and progressively reveals
     additional hints instead of dumping all Daily clues at launch.
   - Connections: removes leftover blank/white solved tiles after completion.
   - Timeline: removes duplicated result copy / duplicate GAME OVER output.
   - Daily/Unlimited state styling stays visually honest after rerenders.

   This patch intentionally does NOT replace the core game engine. It runs
   after it and repairs regressions each time the legacy renderer redraws.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8939_GAME_AUDIT__)return;
window.__TURF_V8939_GAME_AUDIT__=true;

var WHO_STATE={key:'',visible:1,manual:0};
var gridPoolCache=null,gridPoolStamp='';
var scheduled=false;

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function visible(el){
  if(!el)return false;
  var cs=getComputedStyle(el);
  return cs.display!=='none'&&cs.visibility!=='hidden'&&cs.opacity!=='0';
}
function gameHost(){return q('#fgSpecialGame')||q('#fgGridGame')||q('#footballGameOverlay')||document.body}
function activeMode(){
  var host=gameHost(),all=qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',host);
  for(var i=0;i<all.length;i++){
    if(!visible(all[i]))continue;
    var t=txt(all[i]).toUpperCase();
    if(t==='WHO AM I?')return 'whoami';
    if(t==='HIGHER / LOWER'||t==='HIGHER/LOWER')return 'higherlower';
    if(t==='CONNECTIONS'||t==='NFL CONNECTIONS')return 'connections';
    if(t==='TIMELINE'||t==='NFL TIMELINE')return 'timeline';
    if(t==='GRID'||t==='NFL GRID')return 'grid';
    if(t==='ACTIVE PLAYERS'||t==='CURRENT PLAYERS')return 'players';
    if(t==='LEGENDS')return 'legends';
    if(t==='CAREER PATH')return 'career';
    if(t==='IMPOSTER'||t==='NFL IMPOSTER')return 'imposter';
    if(t==='STAT LINE'||t==='GUESS THE STAT LINE')return 'statline';
    if(t==='DRAFT CLASS')return 'draftclass';
    if(t==='MOGGER')return 'moggle';
    if(t==='FRANCHISE FINDER')return 'guessteam';
    if(t==='DEPTH CHART')return 'depthchart';
  }
  return '';
}
function isDaily(){
  var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');
  if(d&&d.classList.contains('active')&&!(u&&u.classList.contains('active')))return true;
  if(u&&u.classList.contains('active'))return false;
  var host=gameHost(),t=txt(host).toUpperCase();
  return /DAILY CHALLENGE/.test(t)&&!/UNLIMITED SETUP|NEW UNLIMITED GAME/.test(t);
}

/* ---------------- HIGHER / LOWER ---------------- */
function fixHigherLower(){
  if(activeMode()!=='higherlower')return;
  var host=q('#fgSpecialGame')||gameHost();
  qa('button,[role="button"]',host).forEach(function(b){
    var t=txt(b).toUpperCase();
    if(t==='PLAY'){
      b.style.setProperty('display','none','important');
      b.setAttribute('aria-hidden','true');
      b.dataset.turf8939Removed='1';
    }
  });
  qa('*',host).forEach(function(el){
    if(el.children.length)return;
    var t=txt(el);
    if(/^0\s*(?:TO|[-–—])\s*0$/i.test(t))el.style.setProperty('display','none','important');
  });
}

/* ---------------- DAILY WHO AM I ---------------- */
function whoKey(items){
  var first=items[0]?txt(items[0]):'';
  var title=txt(q('.fg-game-title',q('#fgSpecialGame')||document));
  return title+'|'+first;
}
function fixWhoAmI(){
  if(activeMode()!=='whoami'||!isDaily())return;
  var host=q('#fgSpecialGame');if(!host)return;
  var items=qa('.fg-clue-item',host);if(!items.length)return;
  var key=whoKey(items);
  if(WHO_STATE.key!==key){WHO_STATE={key:key,visible:1,manual:0};}

  var history=qa('.fg-history-row',host);
  var wrong=history.filter(function(x){return /WRONG/i.test(txt(x))||x.classList.contains('wrong')}).length;
  var allowed=Math.max(1,Math.min(items.length,1+wrong+WHO_STATE.manual));
  WHO_STATE.visible=Math.max(WHO_STATE.visible,allowed);

  items.forEach(function(el,i){
    el.style.setProperty('display',i<WHO_STATE.visible?'':'none','important');
  });

  var sub=q('.fg-game-sub',host);
  if(sub&&/three clues|shared player uses/i.test(txt(sub))){
    sub.textContent='Start with 1 hint. Reveal another hint only when you need it.';
  }
  var budget=q('.fg-clue-budget-label',host);
  if(budget){
    var guessMatch=txt(budget).match(/(\d+)\s+guess/i);
    budget.textContent=WHO_STATE.visible+' hint'+(WHO_STATE.visible===1?'':'s')+' shown'+(guessMatch?' • '+guessMatch[1]+' guesses available':'');
  }

  var reveal=q('#turf8939RevealWho',host)||q('#fgRevealClue',host);
  if(!reveal&&WHO_STATE.visible<items.length){
    var row=document.createElement('div');row.className='fg-inline-actions';
    reveal=document.createElement('button');reveal.id='turf8939RevealWho';reveal.type='button';reveal.textContent='REVEAL NEXT HINT';
    row.appendChild(reveal);
    var list=q('.fg-clue-list',host);if(list&&list.parentNode)list.parentNode.insertBefore(row,list.nextSibling);
  }
  if(reveal){
    reveal.textContent='REVEAL NEXT HINT';
    reveal.style.display=WHO_STATE.visible<items.length?'':'none';
    if(!reveal.dataset.turf8939Bound){
      reveal.dataset.turf8939Bound='1';
      reveal.addEventListener('click',function(e){
        /* Own Daily reveal behavior so the legacy renderer cannot jump back to 3. */
        if(reveal.id==='turf8939RevealWho'){
          e.preventDefault();e.stopPropagation();
          WHO_STATE.manual++;
          WHO_STATE.visible=Math.min(items.length,WHO_STATE.visible+1);
          fixWhoAmI();
        }else{
          /* If the native reveal button exists, let its game-state update occur,
             then preserve the progressive visual behavior after rerender. */
          WHO_STATE.manual++;
          setTimeout(fixWhoAmI,20);
        }
      },reveal.id==='turf8939RevealWho');
    }
  }
}

/* ---------------- GRID FULL PLAYER POOL ---------------- */
function addPerson(map,obj){
  if(!obj||typeof obj!=='object')return;
  var name=String(obj.player||obj.name||obj.fullName||obj.displayName||'').trim();
  var team=String(obj.team||obj.nflTeam||obj.abbr||'').trim();
  var pos=String(obj.position||obj.pos||'').trim();
  if(!name||name.length<3||name.length>45)return;
  if(/^(team|player|name|unknown|n\/a)$/i.test(name))return;
  if(!map.has(norm(name)))map.set(norm(name),{name:name,team:team,pos:pos});
}
function walkPeople(map,node,depth,budget){
  if(!node||depth>5||budget.n>18000)return;
  budget.n++;
  if(Array.isArray(node)){
    for(var i=0;i<node.length&&budget.n<=18000;i++)walkPeople(map,node[i],depth+1,budget);
    return;
  }
  if(typeof node!=='object')return;
  addPerson(map,node);
  var keys=Object.keys(node);
  for(var k=0;k<keys.length&&k<80;k++){
    var v=node[keys[k]];
    if(v&&typeof v==='object')walkPeople(map,v,depth+1,budget);
  }
}
function harvestGridPool(){
  var stamp='';
  try{stamp=localStorage.length+'|'+String(localStorage.getItem('footballHQAccountTokenV80')||'')}catch(e){}
  if(gridPoolCache&&gridPoolStamp===stamp)return gridPoolCache;
  var map=new Map(),budget={n:0};

  /* Common global data hooks used across older FootballHQ builds. */
  ['players','rankings','footballHQPlayers','footballHQRankings','FHQ_PLAYERS','FHQ_RANKINGS','__FHQ_PLAYERS__','__FHQ_RANKINGS__'].forEach(function(k){
    try{if(window[k])walkPeople(map,window[k],0,budget)}catch(e){}
  });

  /* The ranking/player database has historically been persisted under several
     account keys. Read JSON-shaped storage safely and harvest player records. */
  try{
    for(var i=0;i<localStorage.length;i++){
      var key=localStorage.key(i)||'';
      if(!/player|rank|nfl|football|grid|draft/i.test(key))continue;
      var raw=localStorage.getItem(key)||'';
      if(!raw||raw.length>2500000||!/^[\[{]/.test(raw.trim()))continue;
      try{walkPeople(map,JSON.parse(raw),0,budget)}catch(e){}
    }
  }catch(e){}

  gridPoolCache=Array.from(map.values()).filter(function(x){return x.name});
  gridPoolStamp=stamp;
  return gridPoolCache;
}
function augmentGridSuggestions(){
  if(activeMode()!=='grid')return;
  var input=q('#fgInput'),box=q('#fgSuggestions');if(!input||!box)return;
  if(!input.dataset.turf8939Grid){
    input.dataset.turf8939Grid='1';
    input.addEventListener('input',function(){setTimeout(augmentGridSuggestions,5)},false);
    input.addEventListener('focus',function(){setTimeout(augmentGridSuggestions,5)},false);
  }
  var query=norm(input.value);if(!query)return;
  var pool=harvestGridPool();if(!pool.length)return;
  var existing=new Set(qa('[data-name],.fg-suggestion',box).map(function(el){return norm(el.getAttribute('data-name')||txt(el).split(' • ')[0])}));
  var adds=[];
  for(var i=0;i<pool.length&&adds.length<14;i++){
    var p=pool[i],n=norm(p.name);
    if(n.indexOf(query)<0||existing.has(n))continue;
    adds.push(p);existing.add(n);
  }
  adds.forEach(function(p){
    var d=document.createElement('div');d.className='fg-suggestion turf8939-grid-suggestion';d.setAttribute('data-name',p.name);
    d.innerHTML='<span>'+p.name+(p.team?' • '+p.team:'')+(p.pos?' • '+p.pos:'')+'</span>';
    d.addEventListener('mousedown',function(e){e.preventDefault()});
    d.addEventListener('click',function(){
      input.value=p.name;
      box.classList.remove('show');
      box.innerHTML='';
      input.dispatchEvent(new Event('change',{bubbles:true}));
    });
    box.appendChild(d);
  });
  if(qa('.fg-suggestion',box).length)box.classList.add('show');
}

/* ---------------- CONNECTIONS / TIMELINE CLEANUP ---------------- */
function fixConnections(){
  if(activeMode()!=='connections')return;
  var host=q('#fgSpecialGame');if(!host)return;
  var solved=qa('[class*="connection"][class*="solved"],.fg-connection-result,.fg-connection-group',host);
  if(solved.length<4)return;
  qa('button',host).forEach(function(b){
    var t=txt(b),bg=getComputedStyle(b).backgroundColor;
    if(t&&t.length<45&&!/SHARE|PLAY|AGAIN|CLOSE|UNLIMITED|DAILY/i.test(t)&&
       (bg==='rgb(232, 229, 220)'||bg==='rgb(255, 255, 255)'||bg==='white')){
      b.style.setProperty('display','none','important');
    }
  });
}
function fixTimeline(){
  if(activeMode()!=='timeline')return;
  var ov=q('#fgResultOverlay');if(!ov||!ov.classList.contains('open'))return;
  var sub=q('#fgResultSub',ov);if(sub&&/Correct order:/i.test(txt(sub)))sub.style.display='none';
  var games=qa('h1,h2,h3,.fg-result-heading',ov).filter(function(x){return /GAME OVER/i.test(txt(x))});
  games.forEach(function(x,i){if(i>0)x.style.display='none'});
}

/* ---------------- MODE TAB SANITY ---------------- */
function fixModeTabs(){
  var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');if(!d||!u)return;
  var host=q('#fgSpecialGame');if(!host)return;
  var t=txt(host).toUpperCase();
  if(/UNLIMITED SETUP|CHOOSE YOUR DIFFICULTY|CHOOSE THE PLAYER POOL|NEW UNLIMITED GAME/.test(t)){
    u.classList.add('active');d.classList.remove('active');
    u.setAttribute('aria-pressed','true');d.setAttribute('aria-pressed','false');
  }
}

function addCss(){
  if(q('#turf8939css'))return;
  var s=document.createElement('style');s.id='turf8939css';s.textContent=`
    #fgSpecialGame [data-turf8939-removed="1"]{display:none!important}
    #fgSuggestions .turf8939-grid-suggestion{cursor:pointer}
    #fgSuggestions .turf8939-grid-suggestion:hover{background:#153447!important;border-color:#39c9ff!important}
    #turf8939RevealWho,#fgRevealClue{border:1px solid #2fcafa;background:#148fc7;color:#fff;border-radius:10px;padding:10px 15px;font-weight:900;cursor:pointer}
  `;document.head.appendChild(s);
}
function apply(){
  addCss();
  fixModeTabs();
  fixHigherLower();
  fixWhoAmI();
  augmentGridSuggestions();
  fixConnections();
  fixTimeline();
}
function schedule(){
  if(scheduled)return;scheduled=true;
  setTimeout(function(){scheduled=false;apply()},18);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[80,220,500,1000,1800,3200].forEach(function(ms){setTimeout(apply,ms)});
document.addEventListener('click',function(){setTimeout(apply,15);setTimeout(apply,120)},true);
if(window.MutationObserver)new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
})();
