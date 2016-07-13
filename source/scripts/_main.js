/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jqxtn'], function ($) {
  'use strict';

  var W = (W && W.window || window),
      C = (W.C || W.console || {});

    $.inlineSvgs();
    $.watchHash();
    $.watchWidth();
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

  function bind() {
    W.jQuery = $;
    require(['expander'], function (Exp) {
      Exp.init(); // '#grid-preview .widget', '#grid-content .widget'
    });
    //$('head').append('<script src="./scripts/expander.js"></script>');
  }

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
});
/*



 */
