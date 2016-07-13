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
    lr: 'http://localhost:7999/livereload.js?snipver=1',
    lib: 'libs',
    jquery: '../vendors/jquery/jquery',
    slick: '../vendors/slick-carousel/slick',
    lodash: '../vendors/lodash.js/lodash',
    //
    fobj: 'libs/fobj',
    jqxtn: 'libs/jq-xtn',
    stow: 'libs/stow',
    //
    deserial: '../vendors/jquery.deserialize',
  },
  shim: {
    deserial: {
      deps: ['jquery'],
      //exports: '$',
    },
    fobj: {
      deps: ['deserial'],
      //exports: '$',
    },
    expander: {
      deps: ['jquery'],
      exports: 'Expander',
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
