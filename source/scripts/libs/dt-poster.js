/*jslint white:false */
/*global window, define, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.3';
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
  var Debug = W._dbug > 0 ? W._dbug : '';

  function Poster(url, obj, auth, cb) {
    var cf, nom = 'Poster';

    cf = $.extend({
      url: url,
      obj: obj,
      auth: auth || 'Basic YXV0bzpxd2VydHk=',
      cb: cb || $.noop,
    }, $.isPlainObject(url) && url);

    cf.blob = (typeof cf.obj === 'object') && !$.isPlainObject(cf.obj);

    if (Debug) {
      C.debug(nom, 'config', cf);
    }

    $.ajax({
      method: 'POST',
      url: cf.url,
      data: cf.obj,
      crossDomain: true,
      contentType: cf.blob ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: cf.blob ? false : true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', cf.auth);
      },
      success: function (data) {
        if (Debug) {
          C.debug(nom, ['data', data]);
        }
        cf.cb(data);
      },
      error: function (error) {
        if (Debug > 1) {
          C.warn(nom, error.responseText, [error]);
        }
      },
    });
  }

  return Poster;
}));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
