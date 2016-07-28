/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jqxtn', 'lodash'], function ($, _) {
  'use strict';

  var W = (W && W.window || window),
    C = (W.C || W.console || {});

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

  function bind() {
    W.jQuery = $;

    require(['loader'], function (Lo) {
      W.Loader = Lo;
      W._lo = new Lo();
    });

    require(['expander'], function (Exp) {
      W.Expander = Exp;
      W._exp = new Exp();
    });

    require(['revealer'], function (Rev) {
      W.Revealer = Rev;
      W._rev = new Rev('.page .loadmore', '.page .widget', 3);
    });

  }

  $.extend(Api, {
    _el: El,
  });

  W.setTimeout(bind, 99);

  if (W._dbug > 0) {
    W[Nom] = Api;
    C.warn(Nom, 'exposed', Api, _); // Expose
  } else {
    C.debug(Nom, 'loaded', Api); // Expose
  }

  return Api;
});
/*



 */
