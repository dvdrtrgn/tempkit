/*jslint white:false */
/*global _def_, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
_def_('autoRevExp', {
  nom: 'revexp',
  doc: 'targets id=* from the query string for reveal and expand',
  rev: '(0.0.1) 2016-09',
  dev: 'turgd01',
  sig: function () {
    'use strict';
    if (window._amd_) {
      return [];
    } else {
      return [];
    }
  },
}, function () {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -

  return function autoRevExp(rev) {
    rev = rev || W._rev;
    var idx, sea, sid, tgt, util;

    util = {
      parseSearch: function () {
        var obj = {};
        var qry = location.search.slice(1).split('&');

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
        } else C.log('nuthin');
        return sho;
      },
      expandSoon: function (ele) {
        setTimeout(function () {
          $(ele).find('.ex-target').click();
        }, 500);
      },
    };

    sea = util.parseSearch();
    sid = '#' + sea.id;
    tgt = $(sid)[0];
    idx = Number(sid.split('-').pop()) + 1;

    if (idx) {
      util.revealUpto(rev, idx);
      util.expandSoon(tgt);
    }
  };
});
/*



 */
