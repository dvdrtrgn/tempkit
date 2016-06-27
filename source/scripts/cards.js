/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
  'use strict';

  var W = (W && W.window || window),
      C = (W.C || W.console || {});

  function Card(obj) {
    $.extend(true, this, obj);
  }
  Card.prototype = {
    is: function (str) {
      if (this.key.match(str)) {
        this['is' + str] = true;
      }
    },
  };

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  var Nom = 'Cards',
      Api = $.extend({}),
      _list = [];

  // - - - - - - - - - - - - - - - - - -
  // RUNTIME

  function string() {
    return JSON.stringify(Api, null, 4);
  }
  function array() {
    return _list;
  }
  function console() {
    C.info(string());
  }
  // - - - - - - - - - - - - - - - - - -
  // INIT

  $.extend(Api, {
    toString: string,
    valueOf: array,
    dump: console,
  });

  if (W.debug > 0) { // Expose
    W[Nom] = Api;
    C.warn(Nom, 'exposed', Api);
  } else {
    //C.debug(Nom, 'loaded');
  }

  return Api;
});
/*



 */
