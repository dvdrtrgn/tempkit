/*jslint white:false */
/*global _def_, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
_def_('autoRevExp', {
  nom: 'revexp',
  doc: 'targets id=* from the query string for reveal and expand',
  rev: '(0.0.2) 2016-09',
  dev: 'turgd01',
  sig: '',
}, function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -

  return function autoRevExp(rev) {
    rev = rev || W._rev;
    var idx, qid, util;

    util = {
      parseSearch: function () {
        var obj = {};
        var qry = W.location.search.slice(1).split('&');

        qry.forEach(function (seg) {
          seg = seg.split('=');
          if (seg[0]) {
            obj[seg[0]] = seg[1];
          }
        });
        return obj;
      },
      revealUpto: function (obj, sho) {
        var cnt = obj.showing();
        var tot = obj.total();

        sho = (sho ? sho : tot) - cnt;
        if (sho) {
          obj.next(sho);
        }
        return sho;
      },
      expandSoon: function (ele) {
        setTimeout(function () {
          $(ele).find('.ex-target').click();
        }, 500);
      },
    };

    qid = '#' + util.parseSearch().id; // get id from query
    idx = Number(qid.split('-').pop()) + 1; // take number from selector

    if (idx) {
      util.revealUpto(rev, idx);
      util.expandSoon(qid); // wait for reveals
    }
  };
});
/*



 */
