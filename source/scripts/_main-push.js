/*jslint white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: bootstrap
 */
(function (factory) {
  'use strict';
  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:_main-push.js');
    window.Main = factory(jQuery);
  } else {
    console.info('AMD:_main-push.js');
    require.config({
      baseUrl: 'scripts',
      paths: {
        jquery: '../vendors/jquery/jquery',
        jqxtn: './libs/jq-xtn',
      },
    });
    define(['jqxtn'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  $.inlineSvgs();
  $.watchHash();
  $.watchWidth();
  $.watchInputDevice();
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


  // - - - - - - - - - - - - - - - - - -
  // INIT

  function test() {
    var picker = $('a.preview').hide();
    picker.closest('form').show();
    W._push = picker.pusher();
  }

  function bind() {
    require(['libs/jq-pusher'], test);
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
}));
/*



 */
