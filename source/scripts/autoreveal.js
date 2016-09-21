/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

USE: targets id=* from the query string for reveal and expand

*/
(function (factory) {
  'use strict';
  var V = '0.0.4';
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

  return function (rev) {
    var idx, qid, util;

    if (!rev) {
      rev = W._rev; // if not passed in look to global
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
      revealUpto: function (obj, num) { // use Reveal instance and show N items
        var cnt = obj.showing();
        var tot = obj.total();

        num = (num ? num : tot) - cnt; // without a count, show all
        if (num) {
          obj.next(num);
        }
      },
      expandSoon: function (ele) { // wait for reveals (half-second)
        setTimeout(function () {
          $(ele).find('.ex-target').click();
        }, 500);
      },
    };

    qid = '#' + util.parseSearch().id; // get id from query
    idx = Number(qid.split('-').pop()) + 1; // take number from selector

    if (idx) {
      util.revealUpto(rev, idx);
      util.expandSoon(qid);
    }
  };
}));
/*



 */
