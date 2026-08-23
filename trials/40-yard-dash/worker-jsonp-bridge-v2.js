(() => {
  'use strict';
  if (window.__TURF_TRIAL_WORKER_JSONP_V2__) return;
  window.__TURF_TRIAL_WORKER_JSONP_V2__ = true;

  const WORKER = 'https://turftest-api.turftrials.workers.dev';
  const oldAppend = Element.prototype.appendChild;

  function isLegacyTrialRequest(node) {
    if (!node || String(node.tagName || '').toUpperCase() !== 'SCRIPT') return false;
    const src = String(node.src || '');
    return src.includes('script.google.com/macros/s/') && src.includes('action=');
  }

  async function workerRequest(url) {
    const action = url.searchParams.get('action') || '';
    const params = Object.fromEntries(url.searchParams.entries());
    delete params.callback;
    delete params.action;

    if (action === 'trialInventory') {
      const q = new URLSearchParams({token: params.token || ''});
      const r = await fetch(WORKER + '/trials/inventory?' + q, {cache:'no-store'});
      return read(r);
    }
    if (action === 'trialRecords') {
      const q = new URLSearchParams({trial: params.trial || '40yard'});
      const r = await fetch(WORKER + '/trials/records?' + q, {cache:'no-store'});
      return read(r);
    }
    if (action === 'submitTrialRecord') {
      const r = await fetch(WORKER + '/trials/records', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(params),
        cache:'no-store'
      });
      return read(r);
    }
    throw new Error('Unsupported TURF Trial action: ' + action);
  }

  async function read(response) {
    const body = await response.json().catch(() => ({}));
    if (!response.ok || body.ok === false) throw new Error(body.error || ('TURF Trial request failed: ' + response.status));
    return body;
  }

  Element.prototype.appendChild = function(node) {
    if (!isLegacyTrialRequest(node)) return oldAppend.call(this, node);

    let url;
    try { url = new URL(node.src); }
    catch (_) { return oldAppend.call(this, node); }

    const cb = url.searchParams.get('callback') || '';
    Promise.resolve()
      .then(() => workerRequest(url))
      .then(data => {
        const fn = cb && window[cb];
        if (typeof fn === 'function') fn(data);
        else if (typeof node.onload === 'function') node.onload();
      })
      .catch(err => {
        console.error('[TURF Trials Worker V2]', err);
        if (typeof node.onerror === 'function') node.onerror(err);
      });

    return node;
  };
})();
