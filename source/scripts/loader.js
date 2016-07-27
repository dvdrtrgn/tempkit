/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.1';
  var W = (W && W.window || window);
  var $ = W.jQuery;

  function mion_init() {
    W.setTimeout(function () {
      W._rev = new W.Loader(7);
    }, 2e3);
  }

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:loader.js', V);
    W.Loader = factory($);
    return W._dbug || $(mion_init);
  } else {
    console.info('AMD:loader.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var Debug = W._dbug > 0;
  var Nom = 'Loader';
  var Speed = 333;

  // - - - - - - - - - - - - - - - - - -
  // EXTEND
  $.fn.loader = function (these, revealed) {
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

    // - - - - - - - - - - - - - - - - - -
    // PUBLIC
    $.extend(api, {
      _el: Debug ? els : null,
      //
      showing: function () {
        return revealed;
      },
      //
      //--Meths
      init: function () {
        var prior = els.btn.data(Nom);
        if (prior) {
          C.warn(Nom, 'already there');
          return prior;
        }
        els.btn.data(Nom, api); // expose on primary element

        reveal(0, revealed);
        return finish('init').enableBtn();
      },
    });
    // - - - - - - - - - - - - - - - - - -

    reify(els);
    return api.init();
  };

  // Expose Fake Constructor
  function Loader(a, b, c) {
    a = a || '.page .loadmore';
    b = b || '.page .widget';
    return $(a).loader(b, c);
  }
  return Loader;
}));
/*

  todo: dvdrtrgn

 */
