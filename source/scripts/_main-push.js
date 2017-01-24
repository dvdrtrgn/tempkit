/*jslint white:false */
/*global _def_, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 USE: bootstrap modules
 */
_def_('Main', {
  nom: '_main-push',
  rev: '(0.0.1) 2016-09',
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

  function test() {
    var picker = $('a.preview').hide();
    picker.closest('form').show();
    W._push = picker.pusher();
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  function shim() {

    $('head').scriptify([
      'libs/jq-pusher.js',
      'libs/dt-poster.js',
    ]);

    test();
  }

  function bind() {
    $.inlineSvgs();
    if (W._shim) {
      return shim();
    }
    require(['libs/jq-pusher'], test);
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
