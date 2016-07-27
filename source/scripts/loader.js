/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.1.0';
  var W = (W && W.window || window);
  var $ = W.jQuery;

  function mion_init() {
    W._lo = new W.Loader('body', 3e3, []);
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

  // - - - - - - - - - - - - - - - - - -
  // EXTEND
  $.fn.loader = function (ms, cbs) {
    var api = {
      cbs: (cbs && cbs.length) ? cbs : [],
    };
    var els = { // use later for defaults
      me: $(this),
    };

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE
    function fire() {
      $.each(api.cbs, function (i, e) {
        if (typeof e !== 'function') {
          return;
        }
        try {
          e();
        } catch (err) {
          C.error(err);
        }
      });
    }

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
        return els.me.is('.loading');
      },
      timeout: function (ms) {
        ms = ms || 1e3;
        W.setTimeout(api.stop, ms);
        return finish('timeout: ' + ms);
      },
      start: function () {
        els.me.addClass('loading');
        return finish('start');
      },
      stop: function () {
        els.me.removeClass('loading');
        fire();
        return finish('stop');
      },
      //
      //--Meths
      init: function () {
        var prior = els.me.data(Nom);
        if (prior) {
          C.warn(Nom, 'already there');
          return prior;
        }
        els.me.data(Nom, api); // expose on primary element
        return finish('init').start().timeout(ms);
      },
    });
    // - - - - - - - - - - - - - - - - - -


    return api.init();
  };

  // Expose Fake Constructor
  function Loader(a, b, c) {
    return $(a || 'body').loader(b, c);
  }
  return Loader;
}));
/*

  todo: dvdrtrgn

 */
