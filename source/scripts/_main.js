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

    require(['grocer'], function (grocer) {
      $('#Grocs').on('click', function () {
        grocer(470, function (grocs) {
          console.info('Here are your groceries:', grocs);
        });
      });
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
      W._rev = revealer('.page .loadmore', '.page .widget', 3);
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
