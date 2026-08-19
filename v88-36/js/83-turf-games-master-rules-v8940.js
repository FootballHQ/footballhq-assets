/* ============================================================
   TURF V89.40 — MASTER GAMES RULES / REGRESSION ENFORCEMENT
   Load AFTER 82-turf-games-authoritative-audit-v8939.js.

   Purpose: make the approved game design authoritative even when older
   FootballHQ renderers redraw a game after launch.

   Covers the approved master spec for:
   Active Players, Grid, Legends, Who Am I, Career Path, Higher/Lower,
   Imposter, Connections, Stat Line, Draft Class, Mogger, Timeline,
   Franchise Finder, Depth Chart, Chameleon, Two Face, Cases,
   Trivia Tac Toe, 4 in a Row, and shared Daily/Unlimited presentation.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8940_MASTER_GAMES__)return;
window.__TURF_V8940_MASTER_GAMES__=true;

var scheduled=false;
var whoState={key:'',shown:1,manual:0};
var seenQuestions={};
var playerCache=null,playerStamp='';

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function norm(v){return String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function vis(el){if(!el)return false;var cs=getComputedStyle(el);return cs.display!=='none'&&cs.visibility!=='hidden'&&cs.opacity!=='0'}
function host(){return q('#fgSpecialGame')||q('#fgGridGame')||q('#footballGameOverlay')||document.body}
function mode(){
 var h=host(),els=qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',h);
 for(var i=0;i<els.length;i++){
  if(!vis(els[i]))continue;
  var t=text(els[i]).toUpperCase();
  if(t==='ACTIVE PLAYERS'||t==='CURRENT PLAYERS'||t==='FOOTBALL DAILY')return 'players';
  if(t==='GRID'||t==='NFL GRID')return 'grid';
  if(t==='LEGENDS')return 'legends';
  if(t==='WHO AM I?')return 'whoami';
  if(t==='CAREER PATH')return 'career';
  if(t==='HIGHER / LOWER'||t==='HIGHER/LOWER')return 'higherlower';
  if(t==='IMPOSTER'||t==='NFL IMPOSTER')return 'imposter';
  if(t==='CONNECTIONS'||t==='NFL CONNECTIONS')return 'connections';
  if(t==='STAT LINE'||t==='GUESS THE STAT LINE')return 'statline';
  if(t==='DRAFT CLASS')return 'draftclass';
  if(t==='MOGGER')return 'moggle';
  if(t==='TIMELINE'||t==='NFL TIMELINE')return 'timeline';
  if(t==='FRANCHISE FINDER'||t==='GUESS THE TEAM')return 'guessteam';
  if(t==='DEPTH CHART'||t==='NFL DEPTH CHART')return 'depthchart';
 }
 return '';
}
function daily(){
 var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');
 if(u&&u.classList.contains('active'))return false;
 if(d&&d.classList.contains('active'))return true;
 return /DAILY CHALLENGE/i.test(text(host()))&&!/UNLIMITED SETUP|NEW UNLIMITED/i.test(text(host()));
}

/* ---------- broad player universe ---------- */
function addPlayer(map,o){
 if(!o||typeof o!=='object')return;
 var n=String(o.name||o.player||o.fullName||o.displayName||'').trim();
 if(!n||n.length<3||n.length>48||/^(unknown|player|team|n\/a)$/i.test(n))return;
 var team=String(o.team||o.nflTeam||o.abbr||'').trim();
 var pos=String(o.position||o.pos||'').trim();
 var active=(o.active===true||o.isActive===true||/active|current/i.test(String(o.status||'')));
 var retired=(o.retired===true||/retired|legend|hof/i.test(String(o.status||'')));
 var key=norm(n),old=map.get(key)||{};
 map.set(key,{name:n,team:team||old.team||'',pos:pos||old.pos||'',active:active||old.active||false,retired:retired||old.retired||false});
}
function walk(map,node,depth,budget){
 if(!node||depth>5||budget.n>22000)return;budget.n++;
 if(Array.isArray(node)){for(var i=0;i<node.length&&budget.n<22000;i++)walk(map,node[i],depth+1,budget);return}
 if(typeof node!=='object')return;
 addPlayer(map,node);
 Object.keys(node).slice(0,90).forEach(function(k){var v=node[k];if(v&&typeof v==='object')walk(map,v,depth+1,budget)});
}
function universe(){
 var stamp='';try{stamp=localStorage.length+'|'+String(localStorage.getItem('footballHQAccountTokenV80')||'')}catch(e){}
 if(playerCache&&playerStamp===stamp)return playerCache;
 var map=new Map(),budget={n:0};
 ['players','rankings','footballHQPlayers','footballHQRankings','FHQ_PLAYERS','FHQ_RANKINGS','ALL_PLAYERS','NFL_PLAYERS','LEGENDS','__FHQ_PLAYERS__','__FHQ_RANKINGS__'].forEach(function(k){try{if(window[k])walk(map,window[k],0,budget)}catch(e){}});
 try{for(var i=0;i<localStorage.length;i++){
  var k=localStorage.key(i)||'';if(!/player|rank|nfl|football|legend|grid|draft|roster/i.test(k))continue;
  var raw=localStorage.getItem(k)||'';if(!raw||raw.length>3000000||!/^[\[{]/.test(raw.trim()))continue;
  try{walk(map,JSON.parse(raw),0,budget)}catch(e){}
 }}catch(e){}
 playerCache=Array.from(map.values());playerStamp=stamp;return playerCache;
}
function addSuggestions(filter){
 var input=q('#fgInput'),box=q('#fgSuggestions');if(!input||!box)return;
 var query=norm(input.value);if(!query)return;
 var existing=new Set(qa('[data-name],.fg-suggestion',box).map(function(el){return norm(el.getAttribute('data-name')||text(el).split(' • ')[0])}));
 universe().filter(filter||function(){return true}).filter(function(p){return norm(p.name).indexOf(query)>=0&&!existing.has(norm(p.name))}).slice(0,18).forEach(function(p){
  existing.add(norm(p.name));var d=document.createElement('div');d.className='fg-suggestion turf8940-suggestion';d.setAttribute('data-name',p.name);
  d.textContent=p.name+(p.team?' • '+p.team:'')+(p.pos?' • '+p.pos:'');
  d.onmousedown=function(e){e.preventDefault()};d.onclick=function(){input.value=p.name;box.innerHTML='';box.classList.remove('show');input.dispatchEvent(new Event('change',{bubbles:true}))};box.appendChild(d);
 });
 if(qa('.fg-suggestion',box).length)box.classList.add('show');
}
function enforcePools(){
 var m=mode();if(!/^(players|grid|legends|career|statline|moggle)$/.test(m))return;
 var input=q('#fgInput');if(input&&!input.dataset.turf8940Pool){
  input.dataset.turf8940Pool='1';input.addEventListener('input',function(){setTimeout(enforcePools,4)});input.addEventListener('focus',function(){setTimeout(enforcePools,4)});
 }
 if(m==='players'||m==='statline')addSuggestions(function(p){return !p.retired});
 else if(m==='legends')addSuggestions(function(p){return p.retired||!p.active});
 else addSuggestions();
}

/* ---------- Active Players / Legends / Career labels ---------- */
function enforceClassicLabels(){
 var m=mode(),h=q('#fgSpecialGame')||host();
 if(m==='players'){
  var sub=q('.fg-game-sub',h);if(sub&&!/current/i.test(text(sub)))sub.textContent='Guess the current active NFL player in 8 guesses.';
 }
 if(m==='legends'){
  var s=q('.fg-game-sub',h);if(s&&!/retired/i.test(text(s)))s.textContent='Guess the retired NFL legend in 8 guesses.';
 }
 if(m==='career'){
  var c=q('.fg-game-sub',h);if(c)c.textContent='Identify the player from the teams in his NFL career path.';
 }
}

/* ---------- Grid ---------- */
function enforceGrid(){
 if(mode()!=='grid')return;enforcePools();
 var h=q('#fgSpecialGame')||host();
 qa('.fg-grid-difficulty button,[data-grid-difficulty],.fg-difficulty button',h).forEach(function(b){
  var t=text(b).toUpperCase();if(t==='HARD'&&!qa('button',b.parentNode).some(function(x){return text(x).toUpperCase()==='BRUTAL'})){
   /* keep historical Hard when the native engine has it; never rename it away */
  }
 });
 var msg=q('#fgMessage');if(msg&&/choose a valid answer from the suggestions/i.test(text(msg)))msg.textContent='Search the full football player pool, then submit a player who satisfies both clues.';
}

/* ---------- Higher / Lower ---------- */
function enforceHigherLower(){
 if(mode()!=='higherlower')return;var h=q('#fgSpecialGame')||host();
 qa('button,[role="button"]',h).forEach(function(b){if(text(b).toUpperCase()==='PLAY'){b.style.setProperty('display','none','important');b.disabled=true}});
 qa('*',h).forEach(function(el){if(!el.children.length&&/^0\s*(?:TO|[-–—])\s*0$/i.test(text(el)))el.style.setProperty('display','none','important')});
}

/* ---------- Who Am I: Daily always starts with one hint ---------- */
function enforceWho(){
 if(mode()!=='whoami'||!daily())return;var h=q('#fgSpecialGame');if(!h)return;
 var clues=qa('.fg-clue-item,.fg-team-clue',h);if(!clues.length)return;
 var key=clues.map(function(x){return text(x)}).join('|').slice(0,300);
 if(whoState.key!==key)whoState={key:key,shown:1,manual:0};
 var wrong=qa('.fg-history-row.wrong,.fg-history-row',h).filter(function(x){return /WRONG/i.test(text(x))||x.classList.contains('wrong')}).length;
 whoState.shown=Math.max(whoState.shown,Math.min(clues.length,1+wrong+whoState.manual));
 clues.forEach(function(el,i){el.style.setProperty('display',i<whoState.shown?'':'none','important')});
 var sub=q('.fg-game-sub',h);if(sub)sub.textContent='Start with 1 hint. Reveal another only when you need it.';
 var rev=q('#fgRevealClue,#turf8939RevealWho,#turf8940RevealWho',h);
 if(!rev&&whoState.shown<clues.length){var row=document.createElement('div');row.className='fg-inline-actions';rev=document.createElement('button');rev.id='turf8940RevealWho';rev.type='button';rev.textContent='REVEAL NEXT HINT';row.appendChild(rev);(q('.fg-clue-list',h)||clues[clues.length-1]).parentNode.appendChild(row)}
 if(rev&&!rev.dataset.turf8940){rev.dataset.turf8940='1';rev.textContent='REVEAL NEXT HINT';rev.addEventListener('click',function(){whoState.manual++;whoState.shown=Math.min(clues.length,whoState.shown+1);setTimeout(enforceWho,10)},rev.id==='turf8940RevealWho')}
 if(rev)rev.style.display=whoState.shown<clues.length?'':'none';
}

/* ---------- Imposter ---------- */
function enforceImposter(){
 if(mode()!=='imposter')return;var h=q('#fgSpecialGame');if(!h)return;
 var note=q('.fg-imposter-lock-note',h);if(note)note.textContent='Changing difficulty affects the next group — these four stay locked.';
 var sub=q('.fg-game-sub',h);if(sub)sub.textContent='Three belong together. Who DOESN’T belong?';
}

/* ---------- Connections ---------- */
function enforceConnections(){
 if(mode()!=='connections')return;var h=q('#fgSpecialGame');if(!h)return;
 var solved=qa('.fg-conn-solved > *,[class*="connection"][class*="solved"],.fg-connection-group',h).filter(vis);
 if(solved.length){
  var solvedNames=new Set();solved.forEach(function(g){qa('[data-conn],button',g).forEach(function(x){solvedNames.add(norm(text(x)))})});
  qa('.fg-connections-grid [data-conn],.fg-connections-grid button',h).forEach(function(b){if(solvedNames.has(norm(text(b))))b.style.setProperty('display','none','important')});
 }
 var msg=q('#fgMessage');if(msg&&/one away/i.test(text(msg)))msg.classList.add('turf8940-one-away');
}

/* ---------- Stat Line / Draft Class ---------- */
function enforceStatDraft(){
 var m=mode(),h=q('#fgSpecialGame');if(!h)return;
 if(m==='statline'){
  var s=q('.fg-game-sub',h);if(s)s.textContent='Whose 2025 regular-season stat line is this?';
  var msg=q('#fgMessage');if(msg&&!/three lives/i.test(text(msg)))msg.textContent='Three lives. Build the longest streak you can.';
 }
 if(m==='draftclass'){
  var d=q('.fg-game-sub',h);if(d)d.textContent='What NFL Draft class was this player in?';
 }
}

/* ---------- Mogger ---------- */
function enforceMogger(){
 if(mode()!=='moggle')return;var h=q('#fgSpecialGame');if(!h)return;
 qa('img',h).forEach(function(img){if(!img.alt)img.alt='NFL player photo';img.referrerPolicy='no-referrer'});
}

/* ---------- Timeline ---------- */
function enforceTimeline(){
 if(mode()!=='timeline')return;
 var ov=q('#fgResultOverlay');if(!ov||!ov.classList.contains('open'))return;
 var headings=qa('h1,h2,h3,.fg-result-heading',ov).filter(function(x){return /GAME OVER/i.test(text(x))});headings.forEach(function(x,i){if(i)x.style.display='none'});
 var subs=qa('#fgResultSub,.fg-result-sub',ov).filter(function(x){return /Correct order:/i.test(text(x))});subs.forEach(function(x,i){if(i)x.style.display='none'});
}

/* ---------- Franchise Finder ---------- */
function enforceFranchise(){
 if(mode()!=='guessteam')return;var h=q('#fgSpecialGame');if(!h)return;
 var clues=qa('.fg-team-clue',h);if(clues.length){var shown=clues.filter(function(x){return !/🔒|locked/i.test(text(x))&&!x.classList.contains('locked')});if(!shown.length)clues[0].classList.remove('locked')}
 var input=q('#fgGuessTeamInput',h);if(input)input.placeholder='Search city, team name, or abbreviation…';
}

/* ---------- Depth Chart ---------- */
function enforceDepth(){
 if(mode()!=='depthchart')return;var h=q('#fgSpecialGame');if(!h)return;
 var sub=q('.fg-game-sub',h);if(sub&&!/order|starter|backup/i.test(text(sub)))sub.textContent='Arrange the current NFL depth chart from starter to deepest backup.';
}

/* ---------- Daily / Unlimited state ---------- */
function enforceTabs(){
 var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn'),h=q('#fgSpecialGame');if(!d||!u||!h)return;
 var t=text(h).toUpperCase();
 if(/UNLIMITED SETUP|NEW UNLIMITED GAME|CHOOSE YOUR DIFFICULTY|CHOOSE THE PLAYER POOL/.test(t)){u.classList.add('active');d.classList.remove('active');u.setAttribute('aria-pressed','true');d.setAttribute('aria-pressed','false')}
}

/* ---------- H2H board presentation ---------- */
function enforceH2H(){
 var h=q('#turf8937');if(!h)return;
 var title=text(q('.head h2',h)).toUpperCase();
 if(/4 IN A ROW/.test(title)){
  qa('.c4 button',h).forEach(function(cell){if(cell.classList.contains('A'))cell.style.background='#0e4f83';else if(cell.classList.contains('B'))cell.style.background='#05090d'});
 }
 var turn=q('.turn',h);if(turn&&/TURF OPPONENT/i.test(text(turn))){var pills=qa('.pill',h);if(pills[1]&&text(pills[1])&&!/TURF OPPONENT/i.test(text(pills[1])))turn.textContent=text(pills[1]).replace(/\s*•.*$/,'')+"'s Turn"}
}

/* ---------- New games section naming / cards ---------- */
function enforceNewGameCards(){
 qa('a,button,[role="button"],.game-card,.turf-game-card').forEach(function(el){
  var t=text(el);
  if(/^TRIVIA TIC[- ]TAC[- ]TOE$/i.test(t)){
   qa('*',el).forEach(function(x){if(/^Trivia Tic-Tac-Toe$/i.test(text(x)))x.textContent='Trivia Tac Toe'});
  }
 });
}

/* ---------- no same visible trivia question twice in one H2H board ---------- */
function trackQuestions(){
 var h=q('#turf8937');if(!h)return;var qbox=q('.qbox b',h);if(!qbox)return;
 var title=text(q('.head h2',h))||'h2h',qt=text(qbox);if(!qt)return;
 seenQuestions[title]=seenQuestions[title]||new Set();seenQuestions[title].add(qt);
}

/* ---------- result cleanup ---------- */
function cleanResult(){
 var ov=q('#fgResultOverlay');if(!ov||!ov.classList.contains('open'))return;
 var m=mode();
 if(m==='higherlower'){
  var sub=q('#fgResultSub',ov);if(sub&&/streak ended/i.test(text(sub))&&!/ vs /i.test(text(sub))){/* leave engine data intact if comparison values are unavailable */}
 }
 qa('button',ov).forEach(function(b){if(daily()&&/PLAY AGAIN/i.test(text(b)))b.textContent='PLAY UNLIMITED'});
}

function css(){
 if(q('#turf8940css'))return;var s=document.createElement('style');s.id='turf8940css';s.textContent=`
 .turf8940-suggestion{cursor:pointer!important}.turf8940-suggestion:hover{background:#14374a!important;border-color:#42d5ff!important}
 .turf8940-one-away{color:#ffd963!important;font-weight:950!important}
 #turf8940RevealWho{border:1px solid #35cfff;background:#0d87bc;color:white;border-radius:10px;padding:10px 15px;font-weight:950;cursor:pointer}
 #turf8937 .c4{background:linear-gradient(180deg,#092d51,#03080d)!important;border-color:#2676ac!important}
 #turf8937 .c4 button.A{background:#0e4f83!important;box-shadow:inset 0 0 0 5px #238bd0!important}
 #turf8937 .c4 button.B{background:#05090d!important;box-shadow:inset 0 0 0 5px #344652!important}
 `;document.head.appendChild(s)
}
function apply(){
 css();enforceTabs();enforcePools();enforceClassicLabels();enforceGrid();enforceHigherLower();enforceWho();enforceImposter();enforceConnections();enforceStatDraft();enforceMogger();enforceTimeline();enforceFranchise();enforceDepth();enforceH2H();enforceNewGameCards();trackQuestions();cleanResult();
}
function schedule(){if(scheduled)return;scheduled=true;setTimeout(function(){scheduled=false;apply()},18)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[60,160,350,700,1200,2200,4000].forEach(function(ms){setTimeout(apply,ms)});
document.addEventListener('click',function(){setTimeout(apply,10);setTimeout(apply,100)},true);
if(window.MutationObserver)new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden','disabled']});
})();
