/*jslint white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: bootstrap
 */
(function (factory) {
  'use strict';

  if (!(typeof define === 'function' && define.amd)) {
    window.Main = factory(jQuery);
  } else {
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

  function bind() {
    require(['grocer'], function (grocer) {
      W._groc = grocer();
    });

    require(['modal', 'dialog'], function (mod, dialog) {
      W._dia = dialog.bind();
    });

    require(['loader'], function (loader) {
      W._lo = loader();
    });

    require(['expander'], function (expander) {
      W._exp = expander();
    });

    require(['revealer'], function (revealer) {
      W._rev = revealer('.page .loadmore', '.page .widget', 2).inc(3);
    });

  }

  function shim() {
    $('body').append('' +
      '<script src="./scripts/expander.js"></script>' +
      '<script src="./scripts/grocer.js"></script>' +
      '<script src="./scripts/loader.js"></script>' +
      '<script src="./scripts/revealer.js"></script>' +
      '<script src="./scripts/modal.js"></script>' +
      '<script src="./scripts/dialog.js"></script>' +
      '<script src="./scripts/_shim.js"></script>'
    );
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
