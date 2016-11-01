/*jslint white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: multi use / jq.fn wrapper load state and callback helper
 */
(function (factory) {
  'use strict';
  var V = '0.3.3';
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
  $.fn.loader = function (ms, cbs) {
    var api = {
      delay: ms || 1e3,
      cbs: (cbs && cbs.length) ? cbs : [],
    };
    var me = $(this);

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE
    function fire() {
      api.stop();
      $.each(api.cbs, function (i, cb) {
        if (typeof cb !== 'function') {
          return;
        }
        try {
          cb();
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
      _el: Debug ? me : null,
      //
      showing: function () {
        return !me.is('.loaded');
      },
      timeout: function (ms) {
        W.setTimeout(fire, ms);
        return finish('timeout: ' + ms);
      },
      start: function () {
        me.removeClass('loaded').addClass('loading');
        return finish('start');
      },
      stop: function () {
        me.removeClass('loading').addClass('loaded');
        return finish('stop');
      },
      //
      //--Meths
      init: function () {
        var prior = me.data(Nom);
        if (prior) {
          C.warn(Nom, 'already there');
          return prior;
        }
        me.data(Nom, api); // expose on primary element
        return finish('init').start().timeout(api.delay);
      },
    });
    // - - - - - - - - - - - - - - - - - -

    return api.init();
  };

  // Expose Fake Constructor
  function Loader(a, b) {
    return $('body').loader(a, b);
  }
  return Loader;
}));
/*

  todo: dvdrtrgn

 */
