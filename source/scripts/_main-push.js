/*jslint white:false */
/*global _def_, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 USE: bootstrap
 */
_def_('Main', {
  nom: 'MainPush',
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

  function bind() {
    require(['libs/jq-pusher'], test);
    require(['libs/dt-roman'], function (R) {
      C.debug(999, R.convert(999));
    });
  }

  function shim() {
    C.error('this will not work');
    $('body').append('' +
      '<script src="./scripts/libs/jq-pusher.js"></script>',
      '<script src="./scripts/libs/dt-poster.js"></script>'
    );
    test();
  }

  $.extend(Api, {
    _el: El,
  });

  W.setTimeout(W._shim ? shim : bind, 99);

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
