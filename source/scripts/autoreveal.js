/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

USE: targets id=* from the query string for reveal and expand

*/
(function (factory) {
  'use strict';
  var V = '0.1.0';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:autoreveal.js', V);
    W.autoreveal = factory(jQuery);
  } else {
    console.info('AMD:autoreveal.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -

  return function (Reveal) {
    var qty, qel, util;

    if (!Reveal) {
      Reveal = W._rev; // if not passed in look to global Reveal instance
      C.warn('autoreveal', 'no Reveal passed, trying global space');
    }

    util = {
      parseSearch: function () { // turn search string into object
        var obj = {};
        var qry = W.location.search.slice(1).split('&');

        qry.forEach(function (seg) {
          seg = seg.split('=');
          if (seg[0]) { // must have key (optional val)
            obj[seg[0]] = seg[1];
          }
        });
        return obj;
      },
      getNextMultiple: function (base, step) { // first higher multiple
        var high = base;
        if (step) {
          high = Math.ceil(base / step) * step;
        }
        return high;
      },
      revealPast: function (Rev, num) { // assume Reveal instance
        var tot = Rev.total();
        var step = Rev.inc();
        var shown = Rev.showing();

        if (num > shown) {
          var top = util.getNextMultiple(num, step);

          num = (num ? top : tot) - shown; // without a count, show all
          Rev.next(num);
        }
      },
      expandSoon: function (ele) { // wait for reveals a moment
        setTimeout(function () {
          $(ele).find('.ex-target').click();
        }, 500);
      },
    };

    qel = $('#' + util.parseSearch().id); // query for target element
    qty = Number(qel.data('ExpanderIndex')) + 1; // turn index into quantity

    if (qty) {
      util.revealPast(Reveal, qty);
      util.expandSoon(qel);
    }
  };
}));
/*



 */
