/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.2.3';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:loader.js', V);
    W.Loader = factory(jQuery);
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
  $.loader = function (ms, cbs) {
    var api = {
      ms: ms || 1e3,
      cbs: (cbs && cbs.length) ? cbs : [],
    };
    var els = { // use later for defaults
      me: $('body'),
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
        return !els.me.is('.loaded');
      },
      timeout: function (ms) {
        W.setTimeout(api.stop, ms);
        return finish('timeout: ' + ms);
      },
      start: function () {
        els.me.removeClass('loaded').addClass('loading');
        return finish('start');
      },
      stop: function () {
        els.me.removeClass('loading').addClass('loaded');
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
        return finish('init').start().timeout(api.ms);
      },
    });
    // - - - - - - - - - - - - - - - - - -

    return api.init();
  };

  // Expose Fake Constructor
  function Loader(a, b) {
    return $.loader(a, b);
  }
  return Loader;
}));
/*

  todo: dvdrtrgn

 */
