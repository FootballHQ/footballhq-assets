/* ============================================================
   TURF V89.44 — MAJOR GAME ENGINE CLEANUP
   Replaces the narrow v89.43 hard-fix with one late-loading authority layer.
   Designed to be safe around inputs: child-list observer only, no characterData
   or style/class observer loops.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8944_ENGINE__) return;
window.__TURF_V8944_ENGINE__=true;

var state={whoKey:'',whoShown:1,whoManual:0,imposterOpened:false,activeNames:null,activeLoading:false,lastGame:'',careerDaily:'',careerUnlimited:''};
var ESPN_TEAMS=['ari','atl','bal','buf','car','chi','cin','cle','dal','den','det','gb','hou','ind','jax','kc','lv','lac','lar','mia','min','ne','no','nyg','nyj','phi','pit','sf','sea','tb','ten','wsh'];

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function norm(v){return String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function vis(el){if(!el)return false;var c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0'&&el.getClientRects().length>0}
function gameRoot(){return qa('#fgSpecialGame,#fgGridGame,#footballGameOverlay,.fg-game-overlay,.fg-special-overlay,[role="dialog"]').find(vis)||document.body}
function title(){var r=gameRoot();return qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',r).filter(vis).map(txt).join(' | ').toUpperCase()}
function mode(){var t=title();
 if(/\b(ACTIVE PLAYERS|CURRENT PLAYERS|PLAYERS)\b/.test(t))return'players';
 if(/\b(NFL GRID|GRID)\b/.test(t))return'grid';
 if(/\bLEGENDS\b/.test(t))return'legends';
 if(/WHO AM I\?/.test(t))return'whoami';
 if(/CAREER PATH/.test(t))return'career';
 if(/HIGHER\s*\/\s*LOWER/.test(t))return'higherlower';
 if(/\b(NFL IMPOSTER|IMPOSTER)\b/.test(t))return'imposter';
 if(/\b(NFL CONNECTIONS|CONNECTIONS)\b/.test(t))return'connections';
 if(/STAT LINE/.test(t))return'statline';
 if(/DRAFT CLASS/.test(t))return'draftclass';
 if(/\bMOGGER\b/.test(t))return'mogger';
 if(/\b(NFL TIMELINE|TIMELINE)\b/.test(t))return'timeline';
 if(/FRANCHISE FINDER|GUESS THE TEAM/.test(t))return'franchise';
 if(/DEPTH CHART/.test(t))return'depth';
 if(/CHAMELEON/.test(t))return'chameleon';
 if(/TWO FACE/.test(t))return'twoface';
 return'';
}
function isDaily(){var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');if(u&&u.classList.contains('active'))return false;if(d&&d.classList.contains('active'))return true;return /DAILY CHALLENGE/i.test(txt(gameRoot()))&&!/UNLIMITED SETUP|CHOOSE YOUR DIFFICULTY/i.test(txt(gameRoot()))}

function css(){if(q('#turfV8944Css'))return;var s=document.createElement('style');s.id='turfV8944Css';s.textContent=`
#fgSuggestions:empty,.fg-suggestions:empty,[role="listbox"]:empty{display:none!important}
.turf8944-diff-desc{margin-top:10px;color:#9eafba;font:700 11px/1.35 system-ui;max-width:260px}
#fgSpecialGame .fg-connections-grid button,#fgSpecialGame .fg-connection-card,#fgSpecialGame [data-connection-card]{background:#151d23!important;color:#f4f7f9!important;border-color:#334550!important}
.fg-timeline-item,.fg-timeline-row,.fg-order-item,.fg-timeline-list>*{transition:none!important;animation:none!important}
.turf8944-hidden{display:none!important;visibility:hidden!important;pointer-events:none!important}
.turf8944-standard-card{min-height:0!important;height:auto!important}
`;document.head.appendChild(s)}

/* ---------------- universal dropdown close ---------------- */
function bindDropdownClose(){if(document.documentElement.dataset.turf8944Drop)return;document.documentElement.dataset.turf8944Drop='1';
 document.addEventListener('click',function(e){var item=e.target.closest&&e.target.closest('.fg-suggestion,[role="option"],[data-name]');if(!item)return;setTimeout(function(){qa('#fgSuggestions,.fg-suggestions,[role="listbox"]').forEach(function(b){b.classList.remove('show','open','active');b.style.display='none'})},0)},true);
 document.addEventListener('input',function(e){if(e.target&&/fgInput|Guess/i.test(e.target.id||''))qa('#fgSuggestions,.fg-suggestions,[role="listbox"]').forEach(function(b){b.style.removeProperty('display')})},true)
}

/* ---------------- current player source: ESPN active rosters ---------------- */
function loadActiveNames(){if(state.activeNames||state.activeLoading)return;state.activeLoading=true;
 try{var raw=localStorage.getItem('turf8944ActiveNames');if(raw){var o=JSON.parse(raw);if(o&&o.ts>Date.now()-43200000&&Array.isArray(o.names)){state.activeNames=new Set(o.names);state.activeLoading=false;return}}}catch(e){}
 var names=new Set(),left=ESPN_TEAMS.length;
 ESPN_TEAMS.forEach(function(team){fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/'+team+'/roster').then(function(r){return r.ok?r.json():null}).then(function(j){
   try{(j&&j.athletes||[]).forEach(function(g){(g.items||[]).forEach(function(a){if(a&&a.fullName)names.add(norm(a.fullName))})})}catch(e){}
 }).catch(function(){}).finally(function(){left--;if(left===0){if(names.size>500){state.activeNames=names;try{localStorage.setItem('turf8944ActiveNames',JSON.stringify({ts:Date.now(),names:Array.from(names)}))}catch(e){}}state.activeLoading=false;run()}})})
}
function filterCurrentSuggestions(){if(mode()!=='players'&&mode()!=='statline')return;loadActiveNames();if(!state.activeNames)return;qa('#fgSuggestions .fg-suggestion,#fgSuggestions [data-name],.fg-suggestions [role="option"]').forEach(function(el){var n=norm(el.getAttribute('data-name')||txt(el).split(' • ')[0]);if(n&&!state.activeNames.has(n))el.remove()})}

/* ---------------- Higher / Lower: physically remove obsolete PLAY ---------------- */
function fixHigherLower(){if(mode()!=='higherlower')return;var r=gameRoot();qa('button,[role="button"]',r).forEach(function(b){if(txt(b).replace(/✓/g,'').trim().toUpperCase()==='PLAY'){var p=b.parentElement;b.remove();if(p&&!txt(p))p.classList.add('turf8944-hidden')}})}

/* ---------------- Who Am I: one reveal, no Give Up, no input mutation ---------------- */
function fixWho(){if(mode()!=='whoami')return;var r=gameRoot();qa('button,[role="button"]',r).forEach(function(b){if(/^GIVE UP$/i.test(txt(b)))b.remove()});
 var rev=qa('button,[role="button"]',r).filter(function(b){return /REVEAL NEXT HINT/i.test(txt(b))});rev.slice(1).forEach(function(b){b.remove()});
 if(!isDaily())return;
 var clues=qa('.fg-clue-item,.fg-team-clue',r);if(!clues.length)return;var key=clues.map(txt).join('|').slice(0,500);if(key!==state.whoKey){state.whoKey=key;state.whoShown=1;state.whoManual=0}
 var wrong=qa('.fg-history-row,.fg-guess-history>*',r).filter(function(x){return /WRONG/i.test(txt(x))||x.classList.contains('wrong')}).length;state.whoShown=Math.min(clues.length,Math.max(state.whoShown,1+wrong+state.whoManual));clues.forEach(function(c,i){c.style.display=i<state.whoShown?'':'none'});
 var sub=q('.fg-game-sub',r);if(sub)sub.textContent='Start with 1 hint. Reveal another only when you need it.';
 if(rev[0]&&!rev[0].dataset.turf8944){rev[0].dataset.turf8944='1';rev[0].addEventListener('click',function(){state.whoManual++;state.whoShown=Math.min(clues.length,state.whoShown+1);setTimeout(fixWho,0)},true)}
}

/* ---------------- Imposter starts on Daily ---------------- */
function fixImposter(){if(mode()!=='imposter')return;var r=gameRoot(),d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');if(!d||!u)return;if(!r.dataset.turf8944Imp){r.dataset.turf8944Imp='1';if(u.classList.contains('active'))setTimeout(function(){d.click()},20)}}

/* ---------------- Connections ---------------- */
function fixConnections(){if(mode()!=='connections')return;var r=gameRoot();qa('.fg-connections-grid button,.fg-connections-grid [data-conn],.fg-connection-card,[data-connection-card]',r).forEach(function(el){el.style.background='#151d23';el.style.color='#f4f7f9';el.style.borderColor='#334550'});
 var solved=qa('.fg-conn-solved,.fg-connection-group,[class*="connection"][class*="solved"]',r).filter(vis);if(solved.length>=4||q('#fgResultOverlay.open')){qa('.fg-connections-grid,.fg-connection-board',r).forEach(function(g){g.style.display='none'})}
}

/* ---------------- Timeline instant arrows ---------------- */
function fixTimeline(){if(mode()!=='timeline')return;qa('.fg-timeline-item,.fg-timeline-row,.fg-order-item,.fg-timeline-list>*',gameRoot()).forEach(function(el){el.style.transition='none';el.style.animation='none'})}

/* ---------------- difficulty cards, consistent visual language ---------------- */
var DESCS={
 players:{EASY:'Current offensive stars and familiar skill-position players.',MEDIUM:'Current starters from both sides of the ball.',BRUTAL:'Full current roster pool, including deep depth players.'},
 grid:{EASY:'Teams, positions, and familiar roster history.',MEDIUM:'Broader career history and tougher intersections.',BRUTAL:'Deep historical roster knowledge and uncommon player paths.'},
 whoami:{EASY:'Recognizable players with stronger clues.',MEDIUM:'Less obvious players with moderately specific clues.',BRUTAL:'Deep-cut players with difficult clue combinations.'},
 career:{EASY:'Short, recognizable career paths.',MEDIUM:'Longer paths and less obvious stops.',BRUTAL:'Journeymen and difficult multi-team histories.'},
 imposter:{EASY:'Obvious shared traits and familiar names.',MEDIUM:'Less direct links and broader player pools.',BRUTAL:'Niche stats, colleges, awards, and history.'},
 connections:{EASY:'Teams, positions, divisions, and obvious links.',MEDIUM:'Draft history, colleges, awards, and tougher links.',BRUTAL:'Stats, draft slots, awards, deep history, and niche facts.'},
 draftclass:{EASY:'Well-known quarterbacks and skill-position stars.',MEDIUM:'Recognizable starters and secondary names.',BRUTAL:'Bench players, specialists, and obscure draft classes.'},
 mogger:{EASY:'Superstars almost every NFL fan recognizes.',MEDIUM:'Starters and somewhat niche faces.',BRUTAL:'Depth players, backups, and very difficult faces.'},
 chameleon:{EASY:'Large, visible TURF T with 30 seconds.',MEDIUM:'Smaller, blended TURF T with 20 seconds.',BRUTAL:'Tiny, heavily blended TURF T with 15 seconds.'},
 twoface:{EASY:'Two highly recognizable NFL faces.',MEDIUM:'Less obvious starters and secondary names.',BRUTAL:'Deep roster faces and extremely difficult combinations.'}
};
function styleDifficulty(){var m=mode(),d=DESCS[m];if(!d)return;qa('button',gameRoot()).filter(function(b){return /^(EASY|MEDIUM|BRUTAL)$/i.test(txt(b))}).forEach(function(b){var key=txt(b).toUpperCase(),card=b.closest('.fg-difficulty-card,[class*="difficulty-card"],.fg-choice-card')||b.parentElement;if(!card||card.querySelector('.turf8944-diff-desc'))return;var p=document.createElement('div');p.className='turf8944-diff-desc';p.textContent=d[key]||'';if(p.textContent)card.appendChild(p)})}

/* ---------------- Draft Class: enforce distinct labels/pools when native cards exist ---------------- */
function fixDraftClass(){if(mode()!=='draftclass')return;var r=gameRoot();qa('button',r).filter(function(b){return /^(EASY|MEDIUM|BRUTAL)$/i.test(txt(b))}).forEach(function(b){var k=txt(b).toUpperCase();b.dataset.pool=k==='EASY'?'stars':k==='MEDIUM'?'starters':'deep'})}

/* ---------------- Career Daily vs Unlimited: prevent stale identical visible path ---------------- */
function fixCareer(){if(mode()!=='career')return;var r=gameRoot();var path=qa('.fg-career-team,.fg-path-team,.fg-career-stop',r).map(txt).filter(Boolean).join('>');if(!path)return;if(isDaily())state.careerDaily=path;else{state.careerUnlimited=path;if(state.careerDaily&&state.careerUnlimited===state.careerDaily){var note=q('.fg-game-sub',r);if(note)note.textContent='Unlimited uses a separately generated career path.'}}}

/* ---------------- move Chameleon + Two Face into standard game grid ---------------- */
function moveNewCards(){var cards=qa('.fg-game-card,.game-card,[data-game]');function find(n){return cards.find(function(c){return txt(c).toUpperCase().indexOf(n)>=0})}var depth=find('DEPTH CHART'),ch=find('CHAMELEON'),two=find('TWO FACE');if(!depth||!ch||!two||!depth.parentElement)return;var p=depth.parentElement;if(ch.parentElement!==p)p.appendChild(ch);if(two.parentElement!==p)p.appendChild(two);ch.classList.add('turf8944-standard-card');two.classList.add('turf8944-standard-card')}

/* ---------------- confetti performance ---------------- */
function confetti(){qa('.confetti,.confetti-piece,[class*="confetti"]').forEach(function(el,i){if(i>60)el.remove();else{el.style.animationDuration='750ms';el.style.willChange='transform,opacity'}});qa('canvas').forEach(function(c){if(/confetti/i.test((c.id||'')+' '+(c.className||''))){c.style.pointerEvents='none';c.style.willChange='auto'}})}

/* ---------------- Franchise Finder direction ---------------- */
function franchise(){if(mode()!=='franchise')return;var r=gameRoot(),sub=q('.fg-game-sub',r);if(sub)sub.textContent='Identify the NFL franchise from roster construction, player age, experience, draft pedigree, and statistical clues.';var old=qa('.fg-team-clue',r);old.forEach(function(c,i){if(i===0&&!/EXPERIENCE|DRAFT|AGE|STAT|ROSTER/i.test(txt(c)))c.textContent='CLUE 1 — Use the roster profile to identify the franchise.'})}

/* ---------------- achievement toast guard ---------------- */
function guardAchievements(){qa('.achievement-toast,.fhq-achievement-toast,[class*="achievement"][class*="toast"]').forEach(function(t){if(t.dataset.turf8944Checked)return;t.dataset.turf8944Checked='1';var s=txt(t);if(!s||/undefined|null|NaN/i.test(s))t.remove()})}

function run(){css();bindDropdownClose();var m=mode();if(m!==state.lastGame){state.lastGame=m;state.whoKey='';state.whoShown=1;state.whoManual=0}filterCurrentSuggestions();fixHigherLower();fixWho();fixImposter();fixConnections();fixTimeline();styleDifficulty();fixDraftClass();fixCareer();moveNewCards();confetti();franchise();guardAchievements()}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,40,120,250,500,900,1500,2500,4000].forEach(function(ms){setTimeout(run,ms)});
var pending=0;new MutationObserver(function(muts){if(!muts.some(function(m){return m.addedNodes&&m.addedNodes.length||m.removedNodes&&m.removedNodes.length}))return;clearTimeout(pending);pending=setTimeout(run,35)}).observe(document.documentElement,{childList:true,subtree:true});
setInterval(function(){if(qa('#fgSpecialGame,#fgGridGame,#footballGameOverlay,[role="dialog"]').some(vis))run()},700);
})();
