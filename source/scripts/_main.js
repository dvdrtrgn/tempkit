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

    function fillCart(ele, obj) {
      var els = {
        blurb: ele.find('.entry-content'),
        link: ele.find('.entry-header .entry-title a'),
        pic: ele.find('.entry-header .wp-post-image'),
      };

      els.pic.attr('src', obj.src);
      els.link.attr({
        href: obj.href,
        target: 'blog',
      });
      els.link.text(obj.title);
      els.blurb.html(obj.para);
    }

    require(['grocer'], function (grocer) {
      var store = $('div.external-blog');
      var carts = store.children();
      var index = 0;

      $('#Grocs').on('click', function () {
        grocer('?filter[orderby]=rand&filter[posts_per_page]=4', function (grocs) {
          var cart = carts.eq(index++);

          fillCart(cart, grocs);
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
