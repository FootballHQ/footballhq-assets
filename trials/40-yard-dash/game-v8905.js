(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const screens={intro:$('screen-intro'),reveal:$('screen-reveal'),race:$('screen-race'),results:$('screen-results')};
  const els={
    start:$('start-btn'),shuffle:$('shuffle-btn'),rematch:$('rematch-btn'),back:$('back-btn'),exit:$('exit-btn'),
    records:$('records-btn'),resultsRecords:$('results-records-btn'),recordsModal:$('records-modal'),recordsClose:$('records-close'),
    personalBest:$('personal-best'),modalPersonalBest:$('modal-personal-best'),revealCount:$('reveal-count'),revealTitle:$('reveal-title'),
    countdown:$('countdown'),status:$('race-status'),runnerA:$('runner-a'),runnerB:$('runner-b'),laneNameA:$('lane-name-a'),laneNameB:$('lane-name-b'),
    laneThumbA:$('lane-thumb-a'),laneThumbB:$('lane-thumb-b'),runnerArtA:$('runner-art-a'),runnerArtB:$('runner-art-b'),
    winnerName:$('winner-name'),winnerTime:$('winner-time'),winnerArt:$('winner-art'),winnerCardRarity:$('winner-card-rarity'),
    winnerCardSubtitle:$('winner-card-subtitle'),resultNameA:$('result-name-a'),resultNameB:$('result-name-b'),resultTimeA:$('result-time-a'),
    resultTimeB:$('result-time-b'),trackViewport:$('track-viewport'),trackWorld:$('track-world'),tapCount:$('tap-count'),keyR:$('key-r'),keyG:$('key-g'),
    distanceText:$('distance-text'),distanceFill:$('distance-fill'),worldRows:$('world-record-rows'),worldStatus:$('world-record-status')
  };

  const APPS_SCRIPT='https://script.google.com/macros/s/AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ/exec';
  const A='https://footballhq.github.io/footballhq-assets/v88-36/cards/art/';
  const fallback=[
    {id:'tg001',name:'Conjuke',subtitle:'Training Cone',rarity:'common',index:1,total:24,speed:52,burst:63,consistency:61,art:A+'tg001.webp?v=8836fix58'},
    {id:'tg002',name:'Turfling',subtitle:'Field Turf',rarity:'common',index:2,total:24,speed:55,burst:54,consistency:53,art:A+'tg002.webp?v=8836fix58'},
    {id:'tg003',name:'Teezy',subtitle:'Kicking Tee',rarity:'common',index:3,total:24,speed:58,burst:58,consistency:58,art:A+'tg003.webp?v=8836fix58'},
    {id:'tg004',name:'Towelow',subtitle:'Sideline Towel',rarity:'common',index:4,total:24,speed:61,burst:62,consistency:63,art:A+'tg004.webp?v=8836fix58'},
    {id:'tg005',name:'Hashling',subtitle:'Hash Mark',rarity:'common',index:5,total:24,speed:64,burst:53,consistency:55,art:A+'tg005.webp?v=8836fix58'},
    {id:'tg006',name:'Cleatle',subtitle:'Game Cleat',rarity:'uncommon',index:6,total:24,speed:62,burst:65,consistency:68,art:A+'tg006.webp?v=8836fix58'}
  ];

  const params=new URLSearchParams(location.search);
  const accountToken=params.get('token')||'';
  const BEST_KEY='turf.trials.40yard.best';
  let ownedCards=[],cpuPool=fallback.slice(),matchup=[fallback[0],fallback[5]];
  let raceToken=0,raceLive=false,lastTap='',tapTotal=0,progressA=0,progressB=0,finishA=null,finishB=null,raceStartedAt=0,rafId=0;
  let startX=90,raceDistance=1000,worldWidth=1600;

  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function showScreen(n){Object.values(screens).forEach(s=>s&&s.classList.remove('active'));if(screens[n])screens[n].classList.add('active')}
  function jsonp(action,p={}){return new Promise((resolve,reject)=>{
    const cb='__turf_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),s=document.createElement('script');
    const q=new URLSearchParams({action,callback:cb,...p}),timer=setTimeout(()=>done(new Error('Request timed out')),10000);
    function done(err,data){clearTimeout(timer);try{delete window[cb]}catch(e){}s.remove();err?reject(err):resolve(data)}
    window[cb]=data=>done(null,data);s.onerror=()=>done(new Error('Request failed'));s.src=APPS_SCRIPT+'?'+q.toString();document.head.appendChild(s);
  })}

  function installSelectorShell(){
    const hero=document.querySelector('#screen-intro .hero-card');
    if(!hero||$('owned-card-strip'))return;
    const box=document.createElement('section');
    box.className='owned-picker';
    box.innerHTML='<div class="owned-picker-head"><div><span>YOUR COLLECTION</span><h2>CHOOSE YOUR RUNNER</h2></div><strong id="owned-status">Loading owned cards…</strong></div><div id="owned-card-strip" class="owned-card-strip"></div>';
    const actions=hero.querySelector('.matchup-actions');
    hero.insertBefore(box,actions);
  }

  function installSelectorStyle(){
    if($('owned-picker-style'))return;
    const s=document.createElement('style');s.id='owned-picker-style';s.textContent=`
      .owned-picker{margin:26px 0 22px;padding:18px;border:1px solid rgba(142,216,255,.18);border-radius:20px;background:linear-gradient(180deg,rgba(9,25,38,.96),rgba(5,14,22,.94));box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
      .owned-picker-head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:14px}.owned-picker-head span{color:#82dbff;font-size:10px;font-weight:1000;letter-spacing:.18em}.owned-picker-head h2{font-size:20px;margin:3px 0 0}.owned-picker-head strong{color:#91a9ba;font-size:11px}
      .owned-card-strip{display:flex;gap:12px;overflow-x:auto;overscroll-behavior-x:contain;padding:3px 3px 12px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}
      .owned-choice{flex:0 0 118px;scroll-snap-align:start;border:1px solid rgba(142,216,255,.14);background:#091723;border-radius:14px;padding:7px;cursor:pointer;color:#fff;text-align:left;transition:.16s;position:relative}
      .owned-choice:hover{transform:translateY(-3px);border-color:#6fd3ff}.owned-choice.selected{border-color:#5de0ff;box-shadow:0 0 0 2px rgba(64,205,255,.18),0 0 24px rgba(38,174,255,.18);transform:translateY(-3px)}
      .owned-choice img{width:100%;aspect-ratio:720/1040;object-fit:contain;border-radius:8px;background:#06101a;display:block}.owned-choice b{display:block;font-size:11px;margin:7px 2px 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.owned-choice small{display:block;color:#83d9ff;font-size:8px;font-weight:900;text-transform:uppercase;margin:0 2px 3px}
      .owned-empty{padding:18px;color:#9fb0c1}.mobile-run-tip{display:none}
      @media(pointer:coarse),(max-width:800px){.control-demo,.race-controls .keycap{display:none!important}.mobile-run-tip{display:block;color:#8ed8ff;font-weight:1000;letter-spacing:.1em;text-align:center;margin:12px 0}.owned-choice{flex-basis:102px}}
    `;document.head.appendChild(s);
    const demo=document.querySelector('.control-demo');if(demo){const tip=document.createElement('div');tip.className='mobile-run-tip';tip.textContent='TAP THE TRACK RAPIDLY TO RUN';demo.after(tip)}
  }

  function normalizeCard(c){
    return {
      id:String(c.id||''),name:String(c.name||'TURF Card'),subtitle:String(c.subtitle||'TURF Card'),rarity:String(c.rarity||'common').toLowerCase(),
      index:Number(c.index||1),total:Number(c.total||24),speed:Number(c.speed||55),burst:Number(c.burst||55),consistency:Number(c.consistency||55),
      art:String(c.art||c.preview||''),preview:String(c.preview||c.art||'')
    };
  }
  function renderOwned(){
    const strip=$('owned-card-strip'),status=$('owned-status');if(!strip)return;
    if(!ownedCards.length){strip.innerHTML='<div class="owned-empty">No owned cards were returned. Open Trials from TURF while signed into your account.</div>';if(status)status.textContent='0 cards';return}
    if(status)status.textContent=ownedCards.length+' owned';
    strip.innerHTML=ownedCards.map(c=>`<button class="owned-choice ${matchup[0].id===c.id?'selected':''}" data-card="${esc(c.id)}"><img src="${esc(c.preview||c.art)}" alt="${esc(c.name)}"><b>${esc(c.name)}</b><small>${esc(c.rarity)}</small></button>`).join('');
    strip.querySelectorAll('[data-card]').forEach(btn=>btn.addEventListener('click',()=>selectOwned(btn.dataset.card)));
  }
  function selectOwned(id){
    const c=ownedCards.find(x=>x.id===id);if(!c)return;
    let cpu=cpuPool[Math.floor(Math.random()*cpuPool.length)]||fallback[5];
    if(cpu.id===c.id&&cpuPool.length>1){cpu=cpuPool.find(x=>x.id!==c.id)||cpu}
    matchup=[c,cpu];syncMatchup();renderOwned();
  }
  async function loadInventory(){
    if(!accountToken){ownedCards=fallback.slice();cpuPool=fallback.slice();matchup=[ownedCards[0],fallback[5]];syncMatchup();renderOwned();return}
    try{
      const data=await jsonp('trialInventory',{token:accountToken});
      if(data&&data.ok&&Array.isArray(data.cards)&&data.cards.length){
        ownedCards=data.cards.map(normalizeCard);
        cpuPool=ownedCards.slice();
        matchup=[ownedCards[0],ownedCards.length>1?ownedCards[1]:fallback[5]];
      }else ownedCards=fallback.slice();
    }catch(e){ownedCards=fallback.slice()}
    if(!cpuPool.length)cpuPool=ownedCards.length?ownedCards.slice():fallback.slice();
    syncMatchup();renderOwned();
  }

  function randomMatchup(){
    if(ownedCards.length){const c=ownedCards[Math.floor(Math.random()*ownedCards.length)];selectOwned(c.id);return}
    const a=fallback[Math.floor(Math.random()*fallback.length)];let b=fallback[Math.floor(Math.random()*fallback.length)];
    while(b.id===a.id)b=fallback[Math.floor(Math.random()*fallback.length)];matchup=[a,b];syncMatchup();
  }
  function fillCard(side,c){
    const card=$('intro-card-'+side);if(!card)return;
    card.className='trial-card rarity-'+c.rarity+(side==='a'?' player-card':'');
    $('intro-rarity-'+side).textContent=c.rarity.toUpperCase();$('intro-number-'+side).textContent=String(c.index).padStart(3,'0')+'/'+String(c.total).padStart(3,'0');
    $('intro-art-'+side).src=c.art;$('intro-name-'+side).textContent=c.name;$('intro-subtitle-'+side).textContent=c.subtitle;
    $('intro-speed-'+side).textContent=c.speed;$('intro-burst-'+side).textContent=c.burst;
  }
  function syncMatchup(){
    const[a,b]=matchup;fillCard('a',a);fillCard('b',b);
    els.laneNameA.textContent=a.name;els.laneNameB.textContent=b.name;els.resultNameA.textContent=a.name;els.resultNameB.textContent=b.name;
    [els.laneThumbA,els.runnerArtA].forEach(i=>{if(i){i.src=a.art;i.alt=a.name}});
    [els.laneThumbB,els.runnerArtB].forEach(i=>{if(i){i.src=b.art;i.alt=b.name}});
  }

  function getPersonalBest(){const n=Number(localStorage.getItem(BEST_KEY));return Number.isFinite(n)&&n>0?n:null}
  function updateBestDisplay(){const b=getPersonalBest(),t=b?b.toFixed(2)+'s':'—';if(els.personalBest)els.personalBest.textContent=t;if(els.modalPersonalBest)els.modalPersonalBest.textContent=t}
  function saveBest(t){const b=getPersonalBest();if(!b||t<b)localStorage.setItem(BEST_KEY,String(t));updateBestDisplay()}
  function playerName(){return params.get('player')||'TURF Player'}
  function playerId(){return accountToken||'device-'+Math.random().toString(36).slice(2)}

  function renderWorldRecords(rows){
    const list=Array.isArray(rows)?rows:[];if(!els.worldRows)return;
    if(!list.length){els.worldRows.innerHTML='<div class="wr-empty">No world records yet. Be the first.</div>';return}
    els.worldRows.innerHTML=list.map((r,i)=>`<div class="wr-row ${i<3?'top-'+(i+1):''}"><span class="wr-rank">#${i+1}</span><span class="wr-player">${esc(r.player||'TURF Player')}<small>${esc(r.character||'')}</small></span><strong>${Number(r.time).toFixed(2)}s</strong></div>`).join('');
  }
  async function loadWorldRecords(){try{const d=await jsonp('trialRecords',{trial:'40yard'});renderWorldRecords(d&&d.rows);if(els.worldStatus)els.worldStatus.textContent=d&&d.rows&&d.rows.length?'Fastest verified runs':'No records yet'}catch(e){if(els.worldStatus)els.worldStatus.textContent='World records unavailable'}}
  async function submitWorldRecord(time){try{await jsonp('submitTrialRecord',{trial:'40yard',playerId:playerId(),player:playerName(),time:Number(time).toFixed(3),character:matchup[0].name,taps:String(tapTotal)})}catch(e){}}
  function openRecords(){updateBestDisplay();els.recordsModal.classList.remove('hidden');loadWorldRecords()}
  function closeRecords(){els.recordsModal.classList.add('hidden')}

  function resetRaceVisuals(){
    raceToken++;raceLive=false;cancelAnimationFrame(rafId);progressA=0;progressB=0;finishA=null;finishB=null;tapTotal=0;lastTap='';
    els.tapCount.textContent='0';els.keyR.classList.add('active-key');els.keyG.classList.remove('active-key');
    [els.runnerA,els.runnerB].forEach(r=>r&&r.classList.remove('running','winner','loser'));els.status.textContent='GET READY';
    els.countdown.classList.add('hidden');els.revealTitle.classList.add('hidden');els.revealCount.classList.remove('hidden');els.revealCount.textContent='3';
    els.distanceText.textContent='0 YDS';els.distanceFill.style.width='0%';positionRaceWorld(true);
  }
  async function revealSequence(token){showScreen('reveal');for(const v of['3','2','1']){if(token!==raceToken)return false;els.revealCount.textContent=v;await wait(520)}els.revealCount.textContent='REVEAL';await wait(580);els.revealCount.classList.add('hidden');els.revealTitle.classList.remove('hidden');await wait(760);return token===raceToken}
  async function raceCountdown(token){els.countdown.classList.remove('hidden');for(const v of['3','2','1']){if(token!==raceToken)return false;els.countdown.textContent=v;await wait(580)}els.countdown.textContent='GO!';els.status.textContent=matchMedia('(pointer:coarse)').matches?'TAP! TAP! TAP!':'ALTERNATE R + G!';await wait(220);els.countdown.classList.add('hidden');return true}
  function calculateOfficialBase(c){const skill=c.speed*.58+c.burst*.27+c.consistency*.15;return clamp(5.28-((skill-50)*.020)+(Math.random()-.5)*.16,4.48,5.35)}
  function setupWorld(){const vw=Math.max(700,els.trackViewport.clientWidth||1000);worldWidth=Math.round(vw*2.75);startX=Math.round(vw*.09);raceDistance=worldWidth-startX-Math.round(vw*.16);els.trackWorld.style.width=worldWidth+'px';document.documentElement.style.setProperty('--race-start',startX+'px');document.documentElement.style.setProperty('--race-finish',(startX+raceDistance)+'px');positionRaceWorld(true)}
  function positionRaceWorld(reset=false){if(!els.trackViewport)return;const vw=els.trackViewport.clientWidth||1000,xA=startX+progressA*raceDistance,xB=startX+progressB*raceDistance;els.runnerA.style.left=xA+'px';els.runnerB.style.left=xB+'px';const maxCam=Math.max(0,worldWidth-vw),focus=Math.max(xA,xB);let cam=reset?0:clamp(focus-vw*.42,0,maxCam);if(Math.max(progressA,progressB)>.86)cam=clamp((startX+raceDistance)-vw*.78,0,maxCam);els.trackWorld.style.transform=`translate3d(${-cam}px,0,0)`;els.distanceText.textContent=Math.round(progressA*40)+' YDS';els.distanceFill.style.width=(progressA*100).toFixed(1)+'%'}
  function validTap(key){if(!raceLive||lastTap===key)return;lastTap=key;tapTotal++;els.tapCount.textContent=String(tapTotal);progressA=clamp(progressA+.0075+(matchup[0].burst*.000035),0,1);els.keyR.classList.toggle('active-key',key==='g');els.keyG.classList.toggle('active-key',key==='r')}
  document.addEventListener('keydown',e=>{if(e.repeat)return;const k=e.key.toLowerCase();if(k==='r'||k==='g'){e.preventDefault();validTap(k)}});
  let mobileToggle='g';
  function mobileTap(e){if(!raceLive)return;if(e.target.closest('button,a,.records-modal,.topbar'))return;e.preventDefault();mobileToggle=mobileToggle==='r'?'g':'r';validTap(mobileToggle)}
  document.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')mobileTap(e)},{passive:false});

  function runInteractiveRace(token){return new Promise(resolve=>{
    const baseA=calculateOfficialBase(matchup[0]),baseB=calculateOfficialBase(matchup[1]),playerVisualSeconds=baseA*1.82,cpuVisualSeconds=baseB*1.57;
    raceStartedAt=performance.now();raceLive=true;els.runnerA.classList.add('running');els.runnerB.classList.add('running');let last=raceStartedAt;
    function frame(now){
      if(token!==raceToken){raceLive=false;return resolve(false)}
      const dt=Math.min(.05,(now-last)/1000);last=now;
      if(finishA===null){progressA=clamp(progressA+dt/playerVisualSeconds,0,1);if(progressA>=1)finishA=now}
      if(finishB===null){progressB=clamp(progressB+dt/cpuVisualSeconds,0,1);if(progressB>=1)finishB=now}
      positionRaceWorld();
      if(finishA!==null&&finishB!==null){
        raceLive=false;els.runnerA.classList.remove('running');els.runnerB.classList.remove('running');
        const visualA=(finishA-raceStartedAt)/1000,tps=tapTotal/Math.max(visualA,.1),tapSkill=clamp((tps-2)/6.5,0,1),tapBonus=.08+tapSkill*.58;
        const timeA=clamp(baseA-tapBonus+(Math.random()-.5)*.035,4.18,5.35),timeB=clamp(baseB+(Math.random()-.5)*.025,4.25,5.40);
        const aw=timeA<=timeB;(aw?els.runnerA:els.runnerB).classList.add('winner');(aw?els.runnerB:els.runnerA).classList.add('loser');setTimeout(()=>resolve({timeA,timeB}),650);return;
      }
      rafId=requestAnimationFrame(frame);
    }rafId=requestAnimationFrame(frame);
  })}
  function showResults(timeA,timeB){const aw=timeA<=timeB,w=aw?matchup[0]:matchup[1],wt=aw?timeA:timeB;els.winnerName.textContent=w.name.toUpperCase();els.winnerTime.textContent=wt.toFixed(2)+'s';els.winnerArt.src=w.art;els.winnerCardRarity.textContent=w.rarity.toUpperCase();els.winnerCardSubtitle.textContent=w.subtitle;els.resultTimeA.textContent=timeA.toFixed(2)+'s';els.resultTimeB.textContent=timeB.toFixed(2)+'s';saveBest(timeA);submitWorldRecord(timeA);showScreen('results')}
  async function runTrial(){resetRaceVisuals();const token=raceToken;if(!await revealSequence(token))return;showScreen('race');await wait(80);setupWorld();if(!await raceCountdown(token))return;const r=await runInteractiveRace(token);if(r)showResults(r.timeA,r.timeB)}

  if(els.start)els.start.addEventListener('click',runTrial);
  if(els.shuffle)els.shuffle.addEventListener('click',randomMatchup);
  if(els.rematch)els.rematch.addEventListener('click',()=>{showScreen('intro');renderOwned()});
  if(els.records)els.records.addEventListener('click',openRecords);
  if(els.resultsRecords)els.resultsRecords.addEventListener('click',openRecords);
  if(els.recordsClose)els.recordsClose.addEventListener('click',closeRecords);
  document.querySelectorAll('[data-record-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.record-tab').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.record-pane').forEach(x=>x.classList.remove('active'));$('record-'+b.dataset.recordTab).classList.add('active')}));
  function back(){const q=accountToken?'?token='+encodeURIComponent(accountToken):'';location.href='/trials/'+q}
  if(els.exit)els.exit.addEventListener('click',back);if(els.back)els.back.addEventListener('click',back);

  installSelectorShell();installSelectorStyle();syncMatchup();updateBestDisplay();loadInventory();
  if(params.get('records')==='1')setTimeout(openRecords,250);
})();