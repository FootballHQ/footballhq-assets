(() => {
  const screens = {
    intro: document.getElementById('screen-intro'),
    reveal: document.getElementById('screen-reveal'),
    race: document.getElementById('screen-race'),
    results: document.getElementById('screen-results')
  };

  const els = {
    start: document.getElementById('start-btn'),
    rematch: document.getElementById('rematch-btn'),
    back: document.getElementById('back-btn'),
    revealCount: document.getElementById('reveal-count'),
    revealTitle: document.getElementById('reveal-title'),
    countdown: document.getElementById('countdown'),
    status: document.getElementById('race-status'),
    runnerA: document.getElementById('runner-a'),
    runnerB: document.getElementById('runner-b'),
    laneNameA: document.getElementById('lane-name-a'),
    laneNameB: document.getElementById('lane-name-b'),
    introNameA: document.getElementById('intro-name-a'),
    introNameB: document.getElementById('intro-name-b'),
    winnerName: document.getElementById('winner-name'),
    winnerTime: document.getElementById('winner-time'),
    winnerAvatar: document.getElementById('winner-avatar'),
    resultNameA: document.getElementById('result-name-a'),
    resultNameB: document.getElementById('result-name-b'),
    resultTimeA: document.getElementById('result-time-a'),
    resultTimeB: document.getElementById('result-time-b')
  };

  const roster = [
    { id: 'bolt', name: 'Bolt', speed: 92, burst: 95, consistency: 86, avatar: 'a' },
    { id: 'rush', name: 'Rush', speed: 90, burst: 88, consistency: 93, avatar: 'b' },
    { id: 'dash', name: 'Dash', speed: 94, burst: 91, consistency: 82, avatar: 'a' },
    { id: 'jet', name: 'Jet', speed: 89, burst: 96, consistency: 84, avatar: 'b' },
    { id: 'zip', name: 'Zip', speed: 91, burst: 89, consistency: 90, avatar: 'a' },
    { id: 'flash', name: 'Flash', speed: 93, burst: 90, consistency: 85, avatar: 'b' }
  ];

  let matchup = [roster[0], roster[1]];
  let raceToken = 0;

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  function showScreen(name) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[name].classList.add('active');
  }

  function randomMatchup() {
    const first = roster[Math.floor(Math.random() * roster.length)];
    let second = roster[Math.floor(Math.random() * roster.length)];
    while (second.id === first.id) second = roster[Math.floor(Math.random() * roster.length)];
    matchup = [first, second];
    syncNames();
  }

  function syncNames() {
    const [a, b] = matchup;
    els.introNameA.textContent = a.name;
    els.introNameB.textContent = b.name;
    els.laneNameA.textContent = a.name;
    els.laneNameB.textContent = b.name;
    els.resultNameA.textContent = a.name;
    els.resultNameB.textContent = b.name;
  }

  function resetRaceVisuals() {
    raceToken += 1;
    [els.runnerA, els.runnerB].forEach(runner => {
      runner.classList.remove('running', 'winner', 'loser');
      runner.style.setProperty('--progress', '0');
      runner.style.transition = 'none';
    });
    els.status.textContent = 'GET READY';
    els.countdown.classList.add('hidden');
    els.revealTitle.classList.add('hidden');
    els.revealCount.classList.remove('hidden');
    els.revealCount.textContent = '3';
  }

  async function revealSequence(token) {
    showScreen('reveal');
    els.revealTitle.classList.add('hidden');
    els.revealCount.classList.remove('hidden');

    for (const value of ['3', '2', '1']) {
      if (token !== raceToken) return false;
      els.revealCount.textContent = value;
      els.revealCount.style.animation = 'none';
      void els.revealCount.offsetWidth;
      els.revealCount.style.animation = '';
      await wait(650);
    }

    if (token !== raceToken) return false;
    els.revealCount.textContent = 'REVEAL';
    await wait(700);
    els.revealCount.classList.add('hidden');
    els.revealTitle.classList.remove('hidden');
    await wait(1250);
    return token === raceToken;
  }

  function calculateTime(character) {
    const skill = character.speed * 0.55 + character.burst * 0.3 + character.consistency * 0.15;
    const baseline = 5.38 - ((skill - 80) * 0.047);
    const variance = (Math.random() - 0.5) * 0.16;
    return Math.max(4.18, Math.min(5.25, baseline + variance));
  }

  async function raceCountdown(token) {
    els.countdown.classList.remove('hidden');
    for (const value of ['3', '2', '1']) {
      if (token !== raceToken) return false;
      els.countdown.textContent = value;
      await wait(650);
    }
    if (token !== raceToken) return false;
    els.countdown.textContent = 'GO!';
    els.status.textContent = 'RUNNING';
    await wait(300);
    els.countdown.classList.add('hidden');
    return token === raceToken;
  }

  async function animateRace(token, timeA, timeB) {
    const slowest = Math.max(timeA, timeB);
    const durationA = timeA * 1000;
    const durationB = timeB * 1000;

    els.runnerA.classList.add('running');
    els.runnerB.classList.add('running');

    requestAnimationFrame(() => {
      els.runnerA.style.transition = `transform ${durationA}ms cubic-bezier(.12,.65,.22,1)`;
      els.runnerB.style.transition = `transform ${durationB}ms cubic-bezier(.12,.65,.22,1)`;
      els.runnerA.style.setProperty('--progress', '1');
      els.runnerB.style.setProperty('--progress', '1');
    });

    await wait(slowest * 1000 + 150);
    if (token !== raceToken) return false;

    els.runnerA.classList.remove('running');
    els.runnerB.classList.remove('running');
    els.status.textContent = 'FINISHED';

    const aWins = timeA <= timeB;
    const winnerRunner = aWins ? els.runnerA : els.runnerB;
    const loserRunner = aWins ? els.runnerB : els.runnerA;
    winnerRunner.classList.add('winner');
    loserRunner.classList.add('loser');

    await wait(1350);
    return token === raceToken;
  }

  function showResults(timeA, timeB) {
    const aWins = timeA <= timeB;
    const winner = aWins ? matchup[0] : matchup[1];
    const winnerTime = aWins ? timeA : timeB;

    els.winnerName.textContent = winner.name.toUpperCase();
    els.winnerTime.textContent = `${winnerTime.toFixed(2)}s`;
    els.resultTimeA.textContent = `${timeA.toFixed(2)}s`;
    els.resultTimeB.textContent = `${timeB.toFixed(2)}s`;

    els.winnerAvatar.classList.remove('avatar-a', 'avatar-b');
    els.winnerAvatar.classList.add(winner.avatar === 'a' ? 'avatar-a' : 'avatar-b');

    const rows = document.querySelectorAll('.result-row');
    rows.forEach(row => row.classList.remove('winner-row'));
    rows[aWins ? 0 : 1].classList.add('winner-row');

    showScreen('results');
  }

  async function runTrial({ newMatchup = false } = {}) {
    resetRaceVisuals();
    if (newMatchup) randomMatchup();
    const token = raceToken;

    const revealed = await revealSequence(token);
    if (!revealed) return;

    showScreen('race');
    await wait(350);
    const counted = await raceCountdown(token);
    if (!counted) return;

    let timeA = calculateTime(matchup[0]);
    let timeB = calculateTime(matchup[1]);
    if (Math.abs(timeA - timeB) < 0.025) timeB += 0.035;

    const completed = await animateRace(token, timeA, timeB);
    if (!completed) return;
    showResults(timeA, timeB);
  }

  els.start.addEventListener('click', () => runTrial());
  els.rematch.addEventListener('click', () => runTrial({ newMatchup: true }));
  els.back.addEventListener('click', () => {
    resetRaceVisuals();
    randomMatchup();
    showScreen('intro');
  });

  syncNames();
})();
