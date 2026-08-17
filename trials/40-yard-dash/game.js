(() => {
  const $=id=>document.getElementById(id);
  const screens={intro:$('screen-intro'),reveal:$('screen-reveal'),race:$('screen-race'),results:$('screen-results')};
  const els={start:$('start-btn'),shuffle:$('shuffle-btn'),rematch:$('rematch-btn'),back:$('back-btn'),exit:$('exit-btn'),records:$('records-btn'),resultsRecords:$('results-records-btn'),recordsModal:$('records-modal'),recordsClose:$('records-close'),personalBest:$('personal-best'),modalPersonalBest:$('modal-personal-best'),revealCount:$('reveal-count'),revealTitle:$('reveal-title'),countdown:$('countdown'),status:$('race-status'),runnerA:$('runner-a'),runnerB:$('runner-b'),laneNameA:$('lane-name-a'),laneNameB:$('lane-name-b'),laneThumbA:$('lane-thumb-a'),laneThumbB:$('lane-thumb-b'),runnerArtA:$('runner-art-a'),runnerArtB:$('runner-art-b'),winnerName:$('winner-name'),winnerTime:$('winner-time'),winnerArt:$('winner-art'),winnerCardRarity:$('winner-card-rarity'),winnerCardSubtitle:$('winner-card-subtitle'),resultNameA:$('result-name-a'),resultNameB:$('result-name-b'),resultTimeA:$('result-time-a'),resultTimeB:$('result-time-b'),trackViewport:$('track-viewport'),trackWorld:$('track-world'),tapCount:$('tap-count'),keyR:$('key-r'),keyG:$('key-g'),distanceText:$('distance-text'),distanceFill:$('distance-fill'),worldRows:$('world-record-rows'),worldStatus:$('world-record-status')};

  const APPS_SCRIPT='https://script.google.com/macros/s/AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ/exec';
  const A='https://footballhq.github.io/footballhq-assets/v88-36/cards/art/';
  const roster=[
    {id:'tg001',name:'Conjuke',subtitle:'Training Cone',rarity:'common',index:1,speed:52,burst:63,consistency:61,art:A+'tg001.webp?v=8836fix58'},
    {id:'tg002',name:'Turfling',subtitle:'Field Turf',rarity:'common',index:2,speed:55,burst:54,consistency:53,art:A+'tg002.webp?v=8836fix58'},
    {id:'tg003',name:'Teezy',subtitle:'Kicking Tee',rarity:'common',index:3,speed:58,burst:58,consistency:58,art:A+'tg003.webp?v=8836fix58'},
    {id:'tg004',name:'Towelow',subtitle:'Sideline Towel',rarity:'common',index:4,speed:61,burst:62,consistency:63,art:A+'tg004.webp?v=8836fix58'},
    {id:'tg005',name:'Hashling',subtitle:'Hash Mark',rarity:'common',index:5,speed:64,burst:53,consistency:55,art:A+'tg005.webp?v=8836fix58'},
    {id:'tg006',name:'Cleatle',subtitle:'Game Cleat',rarity:'uncommon',index:6,speed:62,burst:65,consistency:68,art:A+'tg006.webp?v=8836fix58'},
    {id:'tg007',name:'Flagoon',subtitle:'Penalty Flag',rarity:'uncommon',index:7,speed:65,burst:69,consistency:60,art:A+'tg007.webp?v=8836fix58'},
    {id:'tg008',name:'Downster',subtitle:'Down Marker',rarity:'uncommon',index:8,speed:68,burst:60,consistency:65,art:A+'tg008.webp?v=8836fix58'},
    {id:'tg009',name:'Chaynk',subtitle:'Chain Crew',rarity:'uncommon',index:9,speed:71,burst:64,consistency:70,art:A+'tg009.webp?v=8836fix58'},
    {id:'tg010',name:'Glovolt',subtitle:'Receiver Glove',rarity:'uncommon',index:10,speed:60,burst:71,consistency:69,art:A+'tg010.webp?v=8836fix58'}
  ];

  const BEST_KEY='turf.trials.40yard.best',PLAYER_ID_KEY='turf.trials.player.id',PLAYER_NAME_KEY='turf.trials.player.name';
  let matchup=[roster[0],roster[5]],raceToken=0,raceLive=false,lastTap='',tapTotal=0;
  let progressA=0,progressB=0,finishA=null,finishB=null,raceStartedAt=0,rafId=0;
  let startX=90,raceDistance=1000,worldWidth=1600;
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  function showScreen(n){Object.values(screens).forEach(s=>s.classList.remove('active'));screens[n].classList.add('active')}
  function randomMatchup(){const first=roster[Math.floor(Math.random()*roster.length)];let second=roster[Math.floor(Math.random()*roster.length)];while(second.id===first.id)second=roster[Math.floor(Math.random()*roster.length)];matchup=[first,second];syncMatchup()}
  function fillCard(side,c){$('intro-card-'+side).className='trial-card rarity-'+c.rarity+(side==='a'?' player-card':'');$('intro-rarity-'+side).textContent=c.rarity.toUpperCase();$('intro-number-'+side).textContent=String(c.index).padStart(3,'0')+'/024';$('intro-art-'+side).src=c.art;$('intro-art-'+side).alt=c.name;$('intro-name-'+side).textContent=c.name;$('intro-subtitle-'+side).textContent=c.subtitle;$('intro-speed-'+side).textContent=c.speed;$('intro-burst-'+side).textContent=c.burst}
  function syncMatchup(){const[a,b]=matchup;fillCard('a',a);fillCard('b',b);els.laneNameA.textContent=a.name;els.laneNameB.textContent=b.name;els.resultNameA.textContent=a.name;els.resultNameB.textContent=b.name;[els.laneThumbA,els.runnerArtA].forEach(i=>{i.src=a.art;i.alt=a.name});[els.laneThumbB,els.runnerArtB].forEach(i=>{i.src=b.art;i.alt=b.name})}

  function getPersonalBest(){const n=Number(localStorage.getItem(BEST_KEY));return Number.isFinite(n)&&n>0?n:null}
  function updateBestDisplay(){const b=getPersonalBest(),t=b?b.toFixed(2)+'s':'—';els.personalBest.textContent=t;els.modalPersonalBest.textContent=t}
  function saveBest(t){const b=getPersonalBest();if(!b||t<b)localStorage.setItem(BEST_KEY,String(t));updateBestDisplay()}
  function getPlayerId(){let id=localStorage.getItem(PLAYER_ID_KEY);if(!id){id='tp_'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-5);localStorage.setItem(PLAYER_ID_KEY,id)}return id}
  function getPlayerName(){let name=localStorage.getItem(PLAYER_NAME_KEY);if(!name){name='TURF Player '+getPlayerId().slice(-4).toUpperCase();localStorage.setItem(PLAYER_NAME_KEY,name)}return name}

  function jsonp(action,params={}){return new Promise((resolve,reject)=>{const cb='__turfcb_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);const script=document.createElement('script');const q=new URLSearchParams({action,callback:cb,...params});const timer=setTimeout(()=>done(new Error('Leaderboard request timed out')),9000);function done(err,data){clearTimeout(timer);try{delete window[cb]}catch(e){}script.remove();err?reject(err):resolve(data)}window[cb]=data=>done(null,data);script.onerror=()=>done(new Error('Leaderboard request failed'));script.src=APPS_SCRIPT+'?'+q.toString();document.head.appendChild(script)})}
  function escapeHtml(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function renderWorldRecords(rows){if(!els.worldRows)return;const list=Array.isArray(rows)?rows:[];if(!list.length){els.worldRows.innerHTML='<div class="wr-empty">No world records yet. Be the first.</div>';return}els.worldRows.innerHTML=list.map((r,i)=>`<div class="wr-row ${i<3?'top-'+(i+1):''}"><span class="wr-rank">#${i+1}</span><span class="wr-player">${escapeHtml(r.player||'TURF Player')}<small>${escapeHtml(r.character||'')}</small></span><strong>${Number(r.time).toFixed(2)}s</strong></div>`).join('')}
  async function loadWorldRecords(){if(els.worldStatus)els.worldStatus.textContent='Loading world records…';try{const data=await jsonp('trialRecords',{trial:'40yard'});renderWorldRecords(data&&data.rows);if(els.worldStatus)els.worldStatus.textContent=data&&data.rows&&data.rows.length?'Fastest verified runs':'No records yet'}catch(e){if(els.worldStatus)els.worldStatus.textContent='World records unavailable until the new Code.gs is deployed';renderWorldRecords([])}}
  async function submitWorldRecord(time){try{const data=await jsonp('submitTrialRecord',{trial:'40yard',playerId:getPlayerId(),player:getPlayerName(),time:Number(time).toFixed(3),character:matchup[0].name,taps:String(tapTotal)});if(data&&data.rows)renderWorldRecords(data.rows)}catch(e){console.warn('World record sync unavailable',e)}}

  function openRecords(){updateBestDisplay();els.recordsModal.classList.remove('hidden');loadWorldRecords()}
  function closeRecords(){els.recordsModal.classList.add('hidden')}
  function goBackToTrials(){raceToken++;raceLive=false;cancelAnimationFrame(rafId);location.href='/trials/'}

  function resetRaceVisuals(){raceToken++;raceLive=false;cancelAnimationFrame(rafId);progressA=0;progressB=0;finishA=null;finishB=null;tapTotal=0;lastTap='';els.tapCount.textContent='0';els.keyR.classList.add('active-key');els.keyG.classList.remove('active-key');[els.runnerA,els.runnerB].forEach(r=>r.classList.remove('running','winner','loser'));els.status.textContent='GET READY';els.countdown.classList.add('hidden');els.revealTitle.classList.add('hidden');els.revealCount.classList.remove('hidden');els.revealCount.textContent='3';els.distanceText.textContent='0 YDS';els.distanceFill.style.width='0%';positionRaceWorld(true)}
  async function revealSequence(token){showScreen('reveal');for(const v of['3','2','1']){if(token!==raceToken)return false;els.revealCount.textContent=v;await wait(560)}if(token!==raceToken)return false;els.revealCount.textContent='REVEAL';await wait(620);els.revealCount.classList.add('hidden');els.revealTitle.classList.remove('hidden');await wait(900);return token===raceToken}
  async function raceCountdown(token){els.countdown.classList.remove('hidden');for(const v of['3','2','1']){if(token!==raceToken)return false;els.countdown.textContent=v;await wait(620)}if(token!==raceToken)return false;els.countdown.textContent='GO!';els.status.textContent='ALTERNATE R + G!';await wait(240);els.countdown.classList.add('hidden');return true}

  function calculateOfficialBase(c){const skill=c.speed*.58+c.burst*.27+c.consistency*.15;const base=5.28-((skill-50)*.020)+(Math.random()-.5)*.16;return clamp(base,4.48,5.35)}
  function setupWorld(){const vw=Math.max(700,els.trackViewport.clientWidth||1000);worldWidth=Math.round(vw*2.75);startX=Math.round(vw*.09);raceDistance=worldWidth-startX-Math.round(vw*.16);els.trackWorld.style.width=worldWidth+'px';document.documentElement.style.setProperty('--race-start',startX+'px');document.documentElement.style.setProperty('--race-finish',(startX+raceDistance)+'px');positionRaceWorld(true)}
  function positionRaceWorld(reset=false){if(!els.trackViewport||!els.trackWorld)return;const vw=els.trackViewport.clientWidth||1000;const xA=startX+progressA*raceDistance,xB=startX+progressB*raceDistance;els.runnerA.style.left=xA+'px';els.runnerB.style.left=xB+'px';const focus=Math.max(xA,xB);const maxCam=Math.max(0,worldWidth-vw);let cam=reset?0:clamp(focus-vw*.42,0,maxCam);if(Math.max(progressA,progressB)>.86)cam=clamp((startX+raceDistance)-vw*.78,0,maxCam);els.trackWorld.style.transform=`translate3d(${-cam}px,0,0)`;const yards=Math.round(progressA*40);els.distanceText.textContent=yards+' YDS';els.distanceFill.style.width=(progressA*100).toFixed(1)+'%'}

  function validTap(key){if(!raceLive||!['r','g'].includes(key)||lastTap===key)return;lastTap=key;tapTotal++;els.tapCount.textContent=String(tapTotal);const bonus=.0075+(matchup[0].burst*.000035);progressA=clamp(progressA+bonus,0,1);els.keyR.classList.toggle('active-key',key==='g');els.keyG.classList.toggle('active-key',key==='r');const el=key==='r'?els.keyR:els.keyG;el.classList.remove('key-hit');void el.offsetWidth;el.classList.add('key-hit')}
  document.addEventListener('keydown',e=>{if(e.repeat)return;const k=e.key.toLowerCase();if(k==='r'||k==='g'){e.preventDefault();validTap(k)}});

  function runInteractiveRace(token){return new Promise(resolve=>{
    const baseA=calculateOfficialBase(matchup[0]),baseB=calculateOfficialBase(matchup[1]);
    const playerVisualSeconds=baseA*1.82,cpuVisualSeconds=baseB*1.57;
    raceStartedAt=performance.now();raceLive=true;els.runnerA.classList.add('running');els.runnerB.classList.add('running');let last=raceStartedAt;
    function frame(now){
      if(token!==raceToken){raceLive=false;return resolve(false)}
      const dt=Math.min(.05,(now-last)/1000);last=now;
      if(finishA===null){progressA=clamp(progressA+dt/playerVisualSeconds,0,1);if(progressA>=1)finishA=now}
      if(finishB===null){progressB=clamp(progressB+dt/cpuVisualSeconds,0,1);if(progressB>=1)finishB=now}
      positionRaceWorld();
      if(finishA!==null&&finishB!==null){
        raceLive=false;els.runnerA.classList.remove('running');els.runnerB.classList.remove('running');els.status.textContent='FINISHED';
        const visualA=(finishA-raceStartedAt)/1000;
        const tapsPerSec=tapTotal/Math.max(visualA,.1);
        const tapSkill=clamp((tapsPerSec-2.0)/6.5,0,1);
        const tapBonus=.08+tapSkill*.58;
        const timeA=clamp(baseA-tapBonus+(Math.random()-.5)*.035,4.18,5.35);
        const timeB=clamp(baseB+(Math.random()-.5)*.025,4.25,5.40);
        const aWins=timeA<=timeB;(aWins?els.runnerA:els.runnerB).classList.add('winner');(aWins?els.runnerB:els.runnerA).classList.add('loser');
        setTimeout(()=>resolve({timeA,timeB}),850);return;
      }
      rafId=requestAnimationFrame(frame);
    }
    rafId=requestAnimationFrame(frame);
  })}

  function showResults(timeA,timeB){const aw=timeA<=timeB,w=aw?matchup[0]:matchup[1],wt=aw?timeA:timeB;els.winnerName.textContent=w.name.toUpperCase();els.winnerTime.textContent=wt.toFixed(2)+'s';els.winnerArt.src=w.art;els.winnerArt.alt=w.name;els.winnerCardRarity.textContent=w.rarity.toUpperCase();els.winnerCardSubtitle.textContent=w.subtitle;els.resultTimeA.textContent=timeA.toFixed(2)+'s';els.resultTimeB.textContent=timeB.toFixed(2)+'s';document.querySelectorAll('.result-row').forEach(r=>r.classList.remove('winner-row'));document.querySelectorAll('.result-row')[aw?0:1].classList.add('winner-row');saveBest(timeA);submitWorldRecord(timeA);showScreen('results')}
  async function runTrial(){resetRaceVisuals();const token=raceToken;if(!await revealSequence(token))return;showScreen('race');await wait(80);setupWorld();if(!await raceCountdown(token))return;const result=await runInteractiveRace(token);if(!result)return;showResults(result.timeA,result.timeB)}

  els.start.addEventListener('click',runTrial);els.shuffle.addEventListener('click',randomMatchup);els.rematch.addEventListener('click',()=>{randomMatchup();showScreen('intro')});els.back.addEventListener('click',goBackToTrials);els.exit.addEventListener('click',goBackToTrials);els.records.addEventListener('click',openRecords);els.resultsRecords.addEventListener('click',openRecords);els.recordsClose.addEventListener('click',closeRecords);els.recordsModal.addEventListener('click',e=>{if(e.target===els.recordsModal)closeRecords()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeRecords()});window.addEventListener('resize',()=>{if(screens.race.classList.contains('active'))setupWorld()});document.querySelectorAll('.record-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.record-tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.record-pane').forEach(p=>p.classList.remove('active'));tab.classList.add('active');$('record-'+tab.dataset.recordTab).classList.add('active');if(tab.dataset.recordTab==='world')loadWorldRecords()}));updateBestDisplay();syncMatchup();
})();
