/*jslint white:false */
/*global window, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.1';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:poster.js', V);
    W.Poster = factory(jQuery);
  } else {
    console.info('AMD:poster.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  function Poster(url, obj, auth, cb) {
    var nom = 'Poster',
      cf, blob;

    cf = $.extend({
      url: url,
      obj: obj,
      auth: auth || 'Basic YXV0bzpxd2VydHk=',
      cb: cb || $.noop,
    }, $.isPlainObject(url) && url);

    blob = (typeof cf.obj === 'object') && !$.isPlainObject(cf.obj);

    $.ajax({
      url: cf.url,
      method: 'POST',
      data: cf.obj,
      crossDomain: true,
      contentType: blob ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: !blob,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', cf.auth);
      },
      success: function (data) {
        C.debug(nom, data, cf);
        cf.cb(data);
      },
      error: function (error) {
        C.error([nom, error.responseText, error]);
      },
    });
  }

  return Poster;
}));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
