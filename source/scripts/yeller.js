/*jslint white:false */
/*global window, define, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.1';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:yeller.js', V);
    W.Yeller = factory(jQuery);
  } else {
    console.info('AMD:yeller.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  // var Debug = W._dbug > 0;

  var HOSTS = {
    loc: '//localhost/wordpress',
    csc: '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
  };
  var APIS = {
    wp: 'wp-json/wp/v2/card',
    acf: 'wp-json/acf/v2/card',
  };

  function makeFieldSerial(obj) {
    var arr = [];
    $.each(obj, function (i, e) {
      arr.push('fields[' + i + ']=' + encodeURIComponent(e));
    });
    return arr.join('&');
  }

  function makeUrl(host, api, id, obj) {
    C.log('makeUrl', [host, api, id, obj]);

    if (obj && api === 'acf') {
      id += '?' + makeFieldSerial(obj);
    }
    api = APIS[api];
    host = HOSTS[host];

    return [host, api, id].join('/');
  }

  return makeUrl;
}));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
