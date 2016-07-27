/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.1.12';
  var W = (W && W.window || window);
  var $ = W.jQuery;

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:revealer.js', V);
    W.Revealer = factory($);
  } else {
    console.info('AMD:revealer.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var Debug = W._dbug > 0;
  var Nom = 'Revealer';
  var Speed = 333;

  function reify(obj) { // reify v3 : replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      if (typeof sel === 'object') {
        sel = sel.selector;
      }
      (obj[i] = $(sel)).selector = sel;
    });
  }

  // - - - - - - - - - - - - - - - - - -
  // EXTEND
  $.fn.revealer = function (these, revealed) {
    revealed = revealed > 0 ? revealed : 0;

    var api = {};
    var els = { // use later for defaults
      btn: this,
      them: these,
    };
    var ens = 'click.' + Nom;

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE
    function finish(str) {
      if (Debug > 0) {
        C.info(Nom, (str || ''), api);
      }
      return api;
    }

    function reveal(lo, hi) {
      if (revealed < api.total()) {
        els.them.slice(lo, hi).fadeIn();
        revealed = hi;
      }
      return api;
    }
    // - - - - - - - - - - - - - - - - - -
    // PUBLIC
    $.extend(api, {
      _el: Debug ? els : null,
      //
      //--Props
      _inc: revealed || 1,
      //
      //--Xsrs
      inc: function (num) {
        if (num) {
          return (api._inc = num);
        } else {
          return api._inc;
        }
      },
      total: function () {
        return els.them.length;
      },
      showing: function () {
        return revealed;
      },
      //
      //--Meths
      disableBtn: function () {
        els.btn.css('cursor', 'initial').fadeTo(Speed, 0.5).off(ens);
        return finish('disableBtn');
      },
      enableBtn: function () {
        els.btn.css('cursor', 'pointer').fadeTo(Speed, 1) //
          .one(ens, function () {
            api.next();
            api.refresh();
          });

        return finish('enableBtn');
      },
      refresh: function () {
        reify(els);
        if (revealed >= api.total()) {
          revealed = api.total();
          return api.disableBtn();
        } else {
          api.enableBtn();
        }
        return finish('refresh');
      },
      next: function (num) {
        reveal(revealed, revealed + api.inc(num));
        return finish('next');
      },
      kill: function () {
        api.enableBtn(); // restore
        els.btn.off(ens); // remove listeners
        els.them.fadeTo(Speed, 1); // release the hidden
        delete els.btn.data()[Nom]; // clear api
        revealed = 0;
        return finish('kill');
      },
      init: function () {
        var prior = els.btn.data(Nom);
        if (prior) {
          C.warn(Nom, 'already there');
          return prior;
        }
        els.btn.data(Nom, api); // expose on primary element
        els.them.hide(); // todo: store initial state

        reveal(0, revealed);
        return finish('init').enableBtn();
      },
    });
    // - - - - - - - - - - - - - - - - - -

    reify(els);
    return api.init();
  };

  // Expose Fake Constructor
  function Revealer(a, b, c) {
    a = a || '.page .loadmore';
    b = b || '.page .widget';
    return $(a).revealer(b, c);
  }
  return Revealer;
}));
/*

  todo: dvdrtrgn
    preserve initial visibility
      els.them.not(sel).show(); // release those no longer selected

 */
