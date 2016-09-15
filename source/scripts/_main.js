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
    $.inlineSvgs();
    $.watchHash();
    $.watchWidth();
    $.watchInputDevice();

    if (W._shim) {
      return shim();
    }

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
      '<script src="./scripts/dialog.js"></script>'
    );
    W._lo = W.Loader(
      999, [function () {
        var els = $('div.external-blog').children();
        var host = 'https://blogswf.staging.wpengine.com';
        var filters = '?filter[orderby]=rand&amp;filter[posts_per_page]=4';
        W._groc = W.Grocer(host).fillerUp(filters, els);
      }, function () {
        W._mod = W.Modal.init('body div.modal');
        W._dia = W.Dialog.bind('.external-link');
      }, function () {
        W._exp = W.Expander();
      }, function () {
        W._rev = W.Revealer('.page .loadmore', '.page .widget', 2).inc(3);
      }]
    );

    W.document.title += ' SHIM';
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
