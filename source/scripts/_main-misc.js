/*jslint white:false */
/*global _def_, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 USE: bootstrap
 */
_def_('Main', {
  nom: '_main-misc',
  rev: '(0.0.2) 2016-09',
  dev: 'turgd01',
  sig: function () {
    'use strict';
    if (window._amd_) {
      return ['jqxtn'];
    } else {
      return [jQuery];
    }
  },
  baseUrl: 'scripts',
  paths: {
    jquery: '../vendors/jquery/jquery',
    jqxtn: './libs/jq-xtn',
  },
}, function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  var Nom = 'Main',
    Api = {
      slick: null,
    },
    El = $.reify({
      body: 'body',
    });

  // - - - - - - - - - - - - - - - - - -
  // RUNTIME

  function test(R) {
    $('li.roman a').on ('click', function () {
      var num = Math.round(Math.random() * 5000);
      C.debug('Arabic ' + num + ' = Roman', R.convert(num));
    });
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  function shim() {
    C.error('this will not work');

    $('head').scriptify([
      'libs/dt-roman.js',
    ]);

    test(W.Roman);
  }

  function bind() {
    $.inlineSvgs();
    if (W._shim) {
      return shim();
    }
    require(['libs/dt-roman'], test);
    require(['loader'], function (loader) {
      setTimeout(loader().stop, 3333);
    });
  }

  $.extend(Api, {
    _el: El,
  });

  W.setTimeout(bind, 99);

  if (W._dbug > 0) { // Expose
    W[Nom] = Api;
    C.warn(Nom, 'exposed', Api);
  } else {
    C.debug(Nom, 'loaded', Api);
  }

  return Api;
});
/*



 */
