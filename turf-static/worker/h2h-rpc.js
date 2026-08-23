import {ensureSheet,sheetValues,appendValues,updateRange} from './common.js';

const METHODS=new Set(['turfH2HJoinOrPoll','turfH2HCancel','turfH2HGameInit','turfH2HGamePoll','turfH2HGameChooseMove','turfH2HGameAnswer','turfH2HCasesAction','turfH2HV8940QuestionCount']);
const ALLOWED={deal:'Cases',ttt:'Trivia Tac Toe',connect4:'4 in a Row'};
const WAIT_TTL=30000,MATCH_TTL=120000,GAME_TTL=45*60*1000;
const QUEUE_SHEET='TURF_H2H_Queue',GAME_SHEET='TURF_H2H_Games';
export function handlesH2HRpc(m){return METHODS.has(String(m||''));}
export async function handleH2HRpc(method,args,env){switch(String(method||'')){
 case 'turfH2HJoinOrPoll':return joinOrPoll(args?.[0],args?.[1],env);
 case 'turfH2HCancel':return cancel(args?.[0],env);
 case 'turfH2HGameInit':return gameInit(args?.[0],args?.[1],args?.[2],args?.[3],env);
 case 'turfH2HGamePoll':return gamePoll(args?.[0],args?.[1],env);
 case 'turfH2HGameChooseMove':return chooseMove(args?.[0],args?.[1],args?.[2],env);
 case 'turfH2HGameAnswer':return answer(args?.[0],args?.[1],args?.[2],env);
 case 'turfH2HCasesAction':return casesAction(args?.[0],args?.[1],args?.[2],args?.[3],env);
 case 'turfH2HV8940QuestionCount':return {ok:true,count:TRIVIA.length};
 default:return null;}}

const TRIVIA=[
['Which franchise drafted Brett Favre?',['Atlanta Falcons','Green Bay Packers','New York Jets','Minnesota Vikings'],0],
['Which team selected Eli Manning first overall in 2004 before trading him?',['New York Giants','San Diego Chargers','Oakland Raiders','Arizona Cardinals'],1],
['Who was the first defensive player selected in the 2014 NFL Draft?',['Khalil Mack','Jadeveon Clowney','Aaron Donald','Anthony Barr'],1],
['Which quarterback was drafted 199th overall in 2000?',['Drew Brees','Tom Brady','Marc Bulger','Matt Hasselbeck'],1],
['Which team drafted Davante Adams?',['Raiders','Packers','Rams','49ers'],1],
['Which school did Patrick Mahomes attend?',['Texas','Texas Tech','TCU','Oklahoma'],1],
['Which franchise drafted Randy Moss?',['Vikings','Raiders','Patriots','Titans'],0],
['Who won Super Bowl XLVIII MVP?',['Russell Wilson','Kam Chancellor','Malcolm Smith','Marshawn Lynch'],2],
['Which player recorded 22.5 sacks in the 2021 season?',['T.J. Watt','Myles Garrett','Nick Bosa','Micah Parsons'],0],
['Which team drafted Aaron Rodgers?',['49ers','Packers','Jets','Raiders'],1],
['Who was the No. 1 overall pick in the 2018 NFL Draft?',['Saquon Barkley','Baker Mayfield','Sam Darnold','Josh Allen'],1],
['Which team originally drafted Drew Brees?',['Saints','Chargers','Dolphins','Cowboys'],1],
['Which receiver won the Triple Crown in 2021?',['Davante Adams','Cooper Kupp','Justin Jefferson','Tyreek Hill'],1],
['Which team selected Lamar Jackson in the 2018 draft?',['Ravens','Bills','Jets','Browns'],0],
['Which player was the 2012 AP NFL MVP?',['Peyton Manning','Adrian Peterson','Aaron Rodgers','Tom Brady'],1],
['Which franchise drafted Rob Gronkowski?',['Buccaneers','Patriots','Cardinals','Bills'],1],
['Who led the NFL in rushing yards in 2020?',['Derrick Henry','Dalvin Cook','Nick Chubb','Jonathan Taylor'],0],
['Which franchise selected Matthew Stafford first overall?',['Rams','Lions','Browns','Raiders'],1],
['Which defensive player won Super Bowl 50 MVP?',['Von Miller','Luke Kuechly','Aqib Talib','DeMarcus Ware'],0],
['Which team drafted Jalen Hurts?',['Eagles','Cowboys','Commanders','Ravens'],0],
['Who was the first wide receiver selected in the 2020 NFL Draft?',['Justin Jefferson','CeeDee Lamb','Henry Ruggs III','Jerry Jeudy'],2],
['Which school did Josh Allen attend?',['Wyoming','Boise State','Utah State','Colorado State'],0],
['Which franchise drafted Travis Kelce?',['Chiefs','Eagles','Bengals','Browns'],0],
['Who was Super Bowl XLIX MVP?',['Tom Brady','Julian Edelman','Malcolm Butler','Rob Gronkowski'],0],
['Which team drafted Christian McCaffrey?',['49ers','Panthers','Broncos','Colts'],1],
['Which quarterback was selected third overall in 2021?',['Zach Wilson','Trey Lance','Justin Fields','Mac Jones'],1],
['Which team drafted DK Metcalf?',['Seahawks','Titans','Ravens','Packers'],0],
['Who won the 2015 NFL MVP award?',['Cam Newton','Tom Brady','Carson Palmer','Adrian Peterson'],0],
['Which team did Peyton Manning finish his career with?',['Colts','Broncos','Titans','Cardinals'],1],
['Which team drafted George Kittle?',['49ers','Chiefs','Bears','Packers'],0],
['Which player won Offensive Rookie of the Year in 2020?',['Justin Herbert','Joe Burrow','Justin Jefferson','Jonathan Taylor'],0],
['Which franchise drafted Micah Parsons?',['Cowboys','Giants','Eagles','Steelers'],0],
['Which team selected Calvin Johnson second overall in 2007?',['Raiders','Lions','Browns','Falcons'],1],
['Who was the first overall pick in 2005?',['Aaron Rodgers','Alex Smith','Ronnie Brown','Braylon Edwards'],1],
['Which player won Super Bowl LVI MVP?',['Matthew Stafford','Aaron Donald','Cooper Kupp','Odell Beckham Jr.'],2],
['Which team drafted A.J. Brown?',['Titans','Eagles','Ravens','Colts'],0],
['Which school did Justin Jefferson attend?',['LSU','Alabama','Ohio State','Clemson'],0],
['Which franchise drafted Derrick Henry?',['Titans','Ravens','Jaguars','Cowboys'],0],
['Who won the 2019 NFL MVP?',['Patrick Mahomes','Lamar Jackson','Russell Wilson','Christian McCaffrey'],1],
['Which team selected Sauce Gardner fourth overall in 2022?',['Jets','Giants','Texans','Lions'],0],
['Which team drafted Stefon Diggs?',['Vikings','Bills','Texans','Patriots'],0],
['Which player was drafted fifth overall in 2021?',["Ja'Marr Chase",'Jaylen Waddle','Kyle Pitts','Penei Sewell'],0],
['Which team selected Myles Garrett first overall?',['Browns','Texans','Jets','Bears'],0],
['Who won Super Bowl LI MVP?',['Tom Brady','James White','Julio Jones','Matt Ryan'],0],
['Which franchise drafted DeAndre Hopkins?',['Texans','Cardinals','Titans','Chiefs'],0],
['Which quarterback was the 32nd and final pick of the 2018 first round?',['Lamar Jackson','Josh Rosen','Baker Mayfield','Josh Allen'],0],
['Which player won the 2022 AP NFL MVP?',['Jalen Hurts','Patrick Mahomes','Josh Allen','Justin Jefferson'],1]
].map(x=>({q:x[0],a:x[1],c:x[2]}));
const CASE_POOLS={
 RB:[["Jahmyr Gibbs",21.6],["Bijan Robinson",20.8],["Saquon Barkley",19.7],["Josh Jacobs",17.6],["Breece Hall",16.9],["James Cook",16.1],["Kyren Williams",15.8],["David Montgomery",13.4],["Rachaad White",10.6],["Sean Tucker",2.2],["De'Von Achane",18.8],["Jonathan Taylor",18.1]],
 WR:[["Ja'Marr Chase",20.9],["Justin Jefferson",20.3],["CeeDee Lamb",19.4],["Amon-Ra St. Brown",18.7],["Puka Nacua",18.2],["Nico Collins",16.8],["A.J. Brown",16.3],["Drake London",15.7],["Terry McLaurin",13.1],["Jalen Nailor",7.4],["Mike Evans",14.9],["Garrett Wilson",14.3]],
 TE:[["Brock Bowers",15.8],["Trey McBride",15.0],["George Kittle",13.7],["Travis Kelce",12.9],["Sam LaPorta",12.4],["Mark Andrews",11.8],["T.J. Hockenson",11.3],["Dallas Goedert",10.6],["Dalton Kincaid",9.8],["Chig Okonkwo",7.1],["Kyle Pitts",10.2],["Jake Ferguson",9.5]],
 QB:[["Josh Allen",24.8],["Lamar Jackson",24.2],["Jalen Hurts",23.5],["Jayden Daniels",22.9],["Patrick Mahomes",22.5],["Joe Burrow",21.8],["Caleb Williams",20.4],["Justin Herbert",19.9],["Baker Mayfield",18.8],["Bryce Young",15.1],["Drake Maye",19.2],["C.J. Stroud",18.3]]};

async function qrows(env){await ensureSheet(env,QUEUE_SHEET,['GameId','Token','StateJSON','UpdatedAt']);return sheetValues(env,`${QUEUE_SHEET}!A2:D`);}
async function grows(env){await ensureSheet(env,GAME_SHEET,['MatchId','StateJSON','UpdatedAt']);return sheetValues(env,`${GAME_SHEET}!A2:C`);}
async function saveQueueEntry(env,rowNum,gameId,token,state){const vals=[[gameId,token,JSON.stringify(state),new Date().toISOString()]]; if(rowNum)await updateRange(env,`${QUEUE_SHEET}!A${rowNum}:D${rowNum}`,vals);else await appendValues(env,`${QUEUE_SHEET}!A:D`,vals);}
async function loadGame(env,id){const rs=await grows(env),i=rs.findIndex(r=>String(r[0]||'')===String(id||''));if(i<0)return null;try{const st=JSON.parse(String(rs[i][1]||''));if(Date.now()-Number(st.updatedAt||0)>GAME_TTL)return null;return {rowNum:i+2,state:st};}catch{return null;}}
async function saveGame(env,st,rowNum){st.updatedAt=Date.now();const vals=[[st.matchId,JSON.stringify(st),new Date().toISOString()]];if(rowNum)await updateRange(env,`${GAME_SHEET}!A${rowNum}:C${rowNum}`,vals);else await appendValues(env,`${GAME_SHEET}!A:C`,vals);}
function matchResponse(me){return {ok:true,matched:true,gameId:me.gameId,matchId:me.matchId,opponentId:me.opponentToken,opponentName:'TURF Opponent',playerSlot:me.playerSlot||''};}
async function joinOrPoll(gameId,token,env){gameId=String(gameId||'').trim().toLowerCase();token=String(token||'').trim();if(!ALLOWED[gameId])return {ok:false,matched:false,error:'invalid_game'};if(!/^h2h_[A-Za-z0-9_\-]{8,100}$/.test(token))return {ok:false,matched:false,error:'invalid_token'};const now=Date.now(),rows=await qrows(env),entries=[];rows.forEach((r,i)=>{if(String(r[0]||'')!==gameId)return;try{const x=JSON.parse(String(r[2]||''));const age=now-Number(x.lastSeen||x.joinedAt||0);if(age<=(x.matchId?MATCH_TTL:WAIT_TTL))entries.push({rowNum:i+2,...x});}catch{}});let me=entries.find(x=>x.token===token);if(me?.matchId){me.lastSeen=now;await saveQueueEntry(env,me.rowNum,gameId,token,me);return matchResponse(me);}if(!me){me={token,gameId,joinedAt:now,lastSeen:now,status:'waiting',matchId:'',opponentToken:'',playerSlot:''};}else{me.lastSeen=now;me.status='waiting';}let opponent=entries.filter(x=>x.token!==token&&!x.matchId&&x.status==='waiting'&&(now-Number(x.lastSeen||0)<=WAIT_TTL)).sort((a,b)=>Number(a.joinedAt)-Number(b.joinedAt))[0];if(opponent){const matchId='match_'+crypto.randomUUID().replace(/-/g,'').slice(0,20);Object.assign(opponent,{matchId,opponentToken:token,playerSlot:'A',status:'matched',lastSeen:now});Object.assign(me,{matchId,opponentToken:opponent.token,playerSlot:'B',status:'matched',lastSeen:now});await saveQueueEntry(env,opponent.rowNum,gameId,opponent.token,opponent);await saveQueueEntry(env,me.rowNum,gameId,token,me);return matchResponse(me);}await saveQueueEntry(env,me.rowNum,gameId,token,me);return {ok:true,matched:false,gameId,waiting:true,queueSize:entries.filter(x=>!x.matchId&&x.status==='waiting').length+(me.rowNum?0:1),waitedMs:Math.max(0,now-me.joinedAt)};}
async function cancel(token,env){token=String(token||'').trim();if(!token)return {ok:true,removed:false};const rows=await qrows(env);let removed=false;for(let i=0;i<rows.length;i++){try{const st=JSON.parse(String(rows[i][2]||''));if(st.token===token&&!st.matchId){st.status='cancelled';st.lastSeen=0;await saveQueueEntry(env,i+2,String(rows[i][0]||''),token,st);removed=true;}}catch{}}return {ok:true,removed};}
function slot(v){v=String(v||'').toUpperCase();return v==='A'||v==='B'?v:'';}function safeName(v,s){const n=String(v||'').replace(/[<>]/g,'').trim().slice(0,28);return n||(s==='A'?'Player A':'Player B');}
function newGame(matchId,gameId){const first=Math.random()<.5?'A':'B',st={matchId:String(matchId),gameId:String(gameId),createdAt:Date.now(),updatedAt:Date.now(),players:{A:{name:'Player A',ready:false},B:{name:'Player B',ready:false}},turn:first,first,status:'active',winner:'',moveNo:0,pending:null,used:[],lastResult:null};if(gameId==='ttt')st.board=Array(9).fill('');if(gameId==='connect4')st.board=Array.from({length:6},()=>Array(7).fill(''));if(gameId==='deal'){st.round=0;st.positions=['RB','WR','TE','QB'];st.lineups={A:[],B:[]};st.cases={A:newCases('RB'),B:newCases('RB')};}return st;}
async function gameInit(matchId,gameId,s,name,env){s=slot(s);if(!s)return {ok:false,error:'bad_slot'};let rec=await loadGame(env,matchId),st=rec?.state||newGame(matchId,gameId);if(st.gameId!==String(gameId||''))return {ok:false,error:'wrong_game'};st.players[s].name=safeName(name,s);st.players[s].ready=true;await saveGame(env,st,rec?.rowNum);return publicGame(st,s);}
async function gamePoll(matchId,s,env){const rec=await loadGame(env,matchId);s=slot(s);if(!rec)return {ok:false,error:'missing_match'};if(!s)return {ok:false,error:'bad_slot'};return publicGame(rec.state,s);}
async function chooseMove(matchId,s,move,env){const rec=await loadGame(env,matchId);s=slot(s);if(!rec||!s)return {ok:false,error:'missing'};const st=rec.state;if(st.status!=='active'||st.turn!==s)return {ok:false,error:'not_your_turn'};if(st.pending)return {ok:false,error:'question_pending'};move=Number(move);if(st.gameId==='ttt'&&(move<0||move>8||st.board[move]))return {ok:false,error:'bad_move'};if(st.gameId==='connect4'&&(move<0||move>6||st.board[0][move]))return {ok:false,error:'bad_move'};if(!['ttt','connect4'].includes(st.gameId))return {ok:false,error:'wrong_game'};const id=pickQuestion(st);st.pending={slot:s,move,qid:id};await saveGame(env,st,rec.rowNum);return publicGame(st,s);}
async function answer(matchId,s,answerIndex,env){const rec=await loadGame(env,matchId);s=slot(s);if(!rec||!s||!rec.state.pending||rec.state.pending.slot!==s)return {ok:false,error:'no_question'};const st=rec.state,q=TRIVIA[Number(st.pending.qid)];if(!q)return {ok:false,error:'bad_question'};const correct=Number(answerIndex)===Number(q.c);if(correct){if(st.gameId==='ttt')st.board[Number(st.pending.move)]=s;else if(st.gameId==='connect4')drop(st.board,Number(st.pending.move),s);}st.lastResult={slot:s,correct,question:q.q};st.pending=null;st.moveNo++;const w=winner(st);if(w){st.status='finished';st.winner=w;}else if(full(st)){st.status='finished';st.winner='DRAW';}else st.turn=s==='A'?'B':'A';await saveGame(env,st,rec.rowNum);const out=publicGame(st,s);out.answerCorrect=correct;return out;}
function newCases(pos){const pool=CASE_POOLS[pos].slice();for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}const x=pool.slice(0,10),mapping={};for(let k=1;k<=10;k++)mapping[k]={name:x[k-1][0],projection:x[k-1][1]};return {position:pos,mapping,myCase:0,opened:{},stage:0,openedThisPhase:0,offer:null,finalChoice:false,complete:false,lockedPlayer:null};}
async function casesAction(matchId,s,action,value,env){const rec=await loadGame(env,matchId);s=slot(s);if(!rec||rec.state.gameId!=='deal'||!s)return {ok:false,error:'missing'};const st=rec.state;if(st.status!=='active'||st.turn!==s)return {ok:false,error:'not_your_turn'};const p=st.cases[s];action=String(action||'');if(action==='choose'){const n=Number(value);if(p.myCase||n<1||n>10||p.opened[n])return {ok:false,error:'bad_case'};p.myCase=n;}else if(action==='open'){const c=Number(value);if(!p.myCase||p.offer||p.finalChoice||c<1||c>10||c===p.myCase||p.opened[c])return {ok:false,error:'bad_case'};p.opened[c]=true;p.openedThisPhase++;const needed=[3,3,2][Math.min(p.stage,2)];if(p.openedThisPhase>=needed){p.offer=makeOffer(p);p.openedThisPhase=0;}}else if(action==='offer'){if(!p.offer)return {ok:false,error:'no_offer'};if(String(value)==='accept'){p.lockedPlayer={name:p.offer.name,projection:p.offer.projection,source:'BANKER'};p.offer=null;p.complete=true;afterCasesTurn(st,s);}else{p.offer=null;if(p.stage>=2)p.finalChoice=true;else{p.stage++;afterCasesTurn(st,s);}}}else if(action==='final'){if(!p.finalChoice)return {ok:false,error:'no_final'};const remaining=remainingCase(p),chosen=String(value)==='swap'?remaining:p.myCase,card=p.mapping[chosen];p.lockedPlayer={name:card.name,projection:card.projection,source:chosen===p.myCase?'CASE':'SWAP'};p.finalChoice=false;p.complete=true;afterCasesTurn(st,s);}else return {ok:false,error:'bad_action'};await saveGame(env,st,rec.rowNum);return publicGame(st,s);}
function afterCasesTurn(st,s){const other=s==='A'?'B':'A';if(st.cases.A.complete&&st.cases.B.complete){st.lineups.A.push(st.cases.A.lockedPlayer);st.lineups.B.push(st.cases.B.lockedPlayer);st.round++;if(st.round>=st.positions.length){st.status='finished';const a=lineupTotal(st.lineups.A),b=lineupTotal(st.lineups.B);st.winner=a===b?'DRAW':a>b?'A':'B';return;}const pos=st.positions[st.round];st.cases.A=newCases(pos);st.cases.B=newCases(pos);st.turn=other;return;}st.turn=other;}
function makeOffer(p){const vals=[];for(let k=1;k<=10;k++)if(!p.opened[k])vals.push(p.mapping[k].projection);const avg=vals.reduce((a,b)=>a+b,0)/Math.max(1,vals.length),pool=CASE_POOLS[p.position].filter(x=>!Object.values(p.mapping).some(m=>m.name===x[0])).sort((a,b)=>Math.abs(a[1]-avg)-Math.abs(b[1]-avg)),pick=pool[Math.min(p.stage,pool.length-1)]||[p.position+' Player',Math.round(avg*10)/10],factor=[.92,.98,1][Math.min(p.stage,2)];return {name:pick[0],projection:Math.round(Math.min(pick[1],avg*factor)*10)/10};}
function remainingCase(p){for(let k=1;k<=10;k++)if(k!==p.myCase&&!p.opened[k])return k;return p.myCase;}function lineupTotal(a){return Math.round(a.reduce((s,x)=>s+Number(x.projection||0),0)*10)/10;}
function pickQuestion(st){let avail=[];for(let i=0;i<TRIVIA.length;i++)if(!st.used.includes(i))avail.push(i);if(!avail.length){st.used=[];avail=TRIVIA.map((_,i)=>i);}const id=avail[Math.floor(Math.random()*avail.length)];st.used.push(id);return id;}
function publicGame(st,s){const out=JSON.parse(JSON.stringify(st));if(out.pending){const q=TRIVIA[Number(out.pending.qid)];out.question=out.pending.slot===s?{q:q.q,a:q.a}:null;delete out.pending.qid;}else out.question=null;if(out.cases){const other=s==='A'?'B':'A';out.myCases=out.cases[s];out.opponentCases=out.cases[other];delete out.cases;}return {ok:true,state:out};}
function winner(st){if(st.gameId==='ttt'){for(const x of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]])if(st.board[x[0]]&&st.board[x[0]]===st.board[x[1]]&&st.board[x[1]]===st.board[x[2]])return st.board[x[0]];}if(st.gameId==='connect4'){const g=st.board;for(let r=0;r<6;r++)for(let c=0;c<7;c++){const x=g[r][c];if(!x)continue;if(c<=3&&g[r][c+1]===x&&g[r][c+2]===x&&g[r][c+3]===x)return x;if(r<=2&&g[r+1][c]===x&&g[r+2][c]===x&&g[r+3][c]===x)return x;if(r<=2&&c<=3&&g[r+1][c+1]===x&&g[r+2][c+2]===x&&g[r+3][c+3]===x)return x;if(r>=3&&c<=3&&g[r-1][c+1]===x&&g[r-2][c+2]===x&&g[r-3][c+3]===x)return x;}}return '';}
function full(st){return st.gameId==='ttt'?st.board.every(Boolean):st.gameId==='connect4'?st.board[0].every(Boolean):false;}function drop(g,col,s){for(let r=5;r>=0;r--)if(!g[r][col]){g[r][col]=s;return true;}return false;}
