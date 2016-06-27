/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    console.log('AMD:Main', !define(
        ['jqxtn'], factory));
  } else {
    console.warn('app.js shim', window.Main = factory
        ($));
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window),
      C = (W.C || W.console || {});

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

  function bind() {
    $.inlineSvgs();
    $.watchHash();
    $.watchWidth();

  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  $.extend(Api, {
    _el: El,
  });

  W.setTimeout(bind, 99);

  if (W.debug > 0) {
    W[Nom] = Api;
    C.warn(Nom, 'exposed', Api); // Expose
  } else {
    C.debug(Nom, 'loaded', Api); // Expose
  }

  return Api;
}));
/*



 */
