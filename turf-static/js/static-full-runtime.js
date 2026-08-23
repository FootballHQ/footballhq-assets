/* TURF static migration full runtime loader.
 * Loads the preserved post-V89.10 game/runtime patches in the same order as the current Index.
 * V89.43/V89.44 remain disabled exactly as in the approved rollback-safe Index.
 */
(function(){
'use strict';
if(window.__TURF_STATIC_FULL_RUNTIME__)return;window.__TURF_STATIC_FULL_RUNTIME__=true;
var base='/v88-36/js/';
var files=[
'56-turf-games-revamp-v8910.js?v=8910','57-turf-new-games-v8911.js?v=8911','58-turf-new-games-ui-v8912.js?v=8912','59-turf-competitive-nav-v8913.js?v=8913','60-turf-competitive-order-v8914.js?v=8914','61-turf-competitive-placement-v8915.js?v=8915','62-turf-competitive-tabs-v8916.js?v=8916','63-turf-competitive-icons-v8917.js?v=8917','64-turf-cases-v8918.js?v=8918','65-turf-cases-dealer-v8919.js?v=8919','66-turf-games-fix-v8920.js?v=8920','67-turf-casual-trivia-v8921.js?v=8921','68-turf-newgames-overhaul-v8922.js?v=8922','69-turf-higherlower-record-adjust-v8923.js?v=8923','70-turf-h2h-launcher-v8924.js?v=8924','71-turf-h2h-cpu-difficulty-v8925.js?v=8925','72-turf-trivia-cpu-engine-v8926.js?v=8926','73-turf-competitive-click-guard-v8927.js?v=8927','74-turf-cases-connect4-launch-guard-v8928.js?v=8928','75-turf-nav-cleanup-h2h-bridge-v8929.js?v=8929','76-turf-h2h-live-queue-v8930.js?v=8930','77-turf-batch3-functional-v8931.js?v=8931','78-turf-batch3-repair-v8932.js?v=8932','79-turf-collection-open-v8936.js?v=8936','80-turf-h2h-gameplay-v8937.js?v=8937','81-turf-h2h-autostart-v8938.js?v=8938','82-turf-games-authoritative-audit-v8939.js?v=8939','83-turf-games-master-rules-v8940.js?v=8940','84-turf-games-polish-v8941.js?v=8941','85-turf-two-surgical-fixes-v8942.js?v=8942'];
function load(i){if(i>=files.length){window.dispatchEvent(new CustomEvent('turf:static-runtime-ready'));return;}var s=document.createElement('script');s.src=base+files[i];s.async=false;var done=false,t=setTimeout(function(){if(done)return;done=true;console.warn('TURF static runtime patch timed out',files[i]);load(i+1)},3500);s.onload=s.onerror=function(){if(done)return;done=true;clearTimeout(t);load(i+1)};(document.body||document.documentElement).appendChild(s)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){load(0)},{once:true});else load(0);
})();