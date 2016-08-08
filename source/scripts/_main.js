/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: bootstrap
 */
define(['jqxtn', 'lodash'], function ($, _) {
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
    W.jQuery = $;

    require(['grocer'], function (grocer) {
      var store = $('div.external-blog');
      var filters = '?filter[orderby]=rand&filter[posts_per_page]=4';
      var hosts = [
        'http://rmion.com',
        'http://demo.wp-api.org',
        'https://blogs.wf.com',
        'https://blogswf.staging.wpengine.com'
      ];

      $('#Grocs1').on('click', function () {
        grocer(hosts[0]).fillerUp(filters, store.children());
      });

      $('#Grocs2').on('click', function () {
        grocer(hosts[3]).fillerUp(filters, store.children());
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
