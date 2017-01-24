/*jslint white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: bootstrap modules
 */
(function (factory) {
  'use strict';

  if (!(typeof define === 'function' && define.amd)) {
    window.Main = factory(jQuery);
  } else {
    require.config({
      baseUrl: 'scripts',
      paths: {
        jquery: '../vendors/jquery/jquery',
        lodash: '../vendors/lodash.js/lodash',
        jqxtn: './libs/jq-xtn',
      },
    });
    define(['jqxtn'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // ESTABLISH BASELINES

  try {
    if (~navigator.userAgent.indexOf('rident')) { // IE
      W._dbug -= 1;
      $('html').addClass('msie');
    } else if (W.location.hostname === 'localhost') {
      W._dbug += 1;
      $('html').addClass('debug');
    }
  } catch (err) {
    C.error('config', err);
  }

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

  function shim() {
    $('body').append('' +
      '<script src="./scripts/modal.js"></script>' +
      '<script src="./scripts/dialog.js"></script>'
    );
    W._mod = W.Modal.init('body div.modal');
    W._dia = W.Dialog.bind('.external-link');

    W.document.title += ' SHIM';
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  function bind() {
    $.inlineSvgs();
    $.watchHash();
    $.watchWidth();
    $.watchInputDevice();

    if (W._shim) {
      return shim();
    }

    require(['modal', 'dialog', 'exitlinker'], function (mod, dialog) {
      W._dia = dialog.bind();
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
}));
/*



 */
