/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

W.debug = Number(new Date('2016/04/01') > new Date());
W.SHIET = {
  trident: W.navigator.userAgent.indexOf('rident') + 1,
};

require.config({
  baseUrl: 'scripts',
  paths: {
    jquery: '../vendors/jquery/jquery',
    lodash: '../vendors/lodash.js/lodash',
    slick: '../vendors/slick-carousel/slick',
    //
    fobj: 'libs/fobj',
    jqxtn: 'libs/jq-xtn',
    stow: 'libs/stow',
    //
  },
  shim: {
    deserial: {
      // deps: ['jquery'],
      // exports: '$',
    },
  },
});

require(['jquery'], function () {
  var loc = W.location.hostname === 'localhost';

  // ESTABLISH BASELINES

  try {
    if (W.SHIET.trident) { // debug IE less
      W.debug -= 1;
      $('html').addClass('msie');
    } else if (loc) {
      W.debug += 1;
      $('html').addClass('debug');
    }
  } catch (err) {
    C.error('config', err);
  }

  // ASSIST DEBUGGING

//  if (W.debug && loc || W.debug > 1) {
//    require(['lr'], function () {
//      C.warn('LiveReloading @ ' + W.debug);
//    }, function () {
//      C.info('no LiveReloading @ ' + W.debug);
//    });
//  }

  /// CUSTOMIZED INIT
  location.hash = location.hash || 'Page1';

  require(['jqxtn'], function ($) {
    require(['_main'], function () {

      $('body').removeClass('loading');
    });
  }); //

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
