/* TURF production authentication configuration.
 * The existing TURF application remains the visual/runtime source of truth.
 * Only authentication/API transport is cut over to the Worker backend.
 */
(function(global){
  'use strict';
  global.TURF_STATIC_CONFIG={
    migrationMode:false,
    productionCutover:true,
    apiBaseUrl:'https://turftest-api.turftrials.workers.dev',
    apiTransport:'http',
    googleClientId:'981412579361-ebftqmubklnd2pk5k88s8kcbh27cj7i8.apps.googleusercontent.com'
  };

  if(global.TurfApi){
    global.TurfApi.configure({
      transport:global.TURF_STATIC_CONFIG.apiTransport,
      baseUrl:global.TURF_STATIC_CONFIG.apiBaseUrl,
      timeout:15000
    });
  }
})(window);
