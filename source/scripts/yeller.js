/*jslint white:false */
/*global window, define, jQuery, Looker */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.3';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:yeller.js', V);
    W.Yeller = factory(jQuery, Looker);
  } else {
    console.info('AMD:yeller.js', V);
    define(['jquery', 'looker'], factory);
  }
}(function ($, Looker) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var Nom = 'Yeller';
  var Debug = W._dbug > 0 ? W._dbug : '';

  function makeFieldSerial(obj) {
    var arr = [];
    $.each(obj, function (i, e) {
      arr.push('fields[' + i + ']=' + encodeURIComponent(e));
    });
    return arr.join('&');
  }

  function makeUrl(host, api, id, obj) {
    if (Debug) {
      C.debug(Nom, 'makeUrl', [host, api, id, obj]);
    }
    if (obj && api === 'acf') {
      id += '?' + makeFieldSerial(obj);
    }
    api = Looker.apis[api];
    host = Looker.hosts[host];

    return [host, api, id].join('/');
  }

  return makeUrl;
}));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
