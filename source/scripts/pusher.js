/*jslint white:false */
/*global window, jQuery, FormData */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

jQuery.fn.pusher = function (cb) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var $ = jQuery.noConflict();

  var HOSTS = [
    '//localhost/wordpress',
    '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
  ];
  var VER = '(0.0.1)';
  var NOM = 'jq-pusher';

  var api = {};
  var auth;
  var host;
  var me = $(this).closest('form');
  var main = me.find('input:file');

  if (main.length < 1) {
    return C.error(NOM, 'no file field');
  }

  function sendNow(fdat) {
    $.ajax({
      url: host + '/wp-json/wp/v2/media',
      method: 'POST',
      data: fdat,
      crossDomain: true,
      contentType: false,
      processData: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', auth);
      },
      success: function (data) {
        api.callback(data);
      },
      error: function (error) {
        C.error(NOM, error);
      }
    });
  }

  function onChange(evt) {
    var fdat = new FormData();
    var file = main[0].files[0];

    evt.preventDefault();
    fdat.append('file', file);

    sendNow(fdat);
  }

  function setAuth(str) {
    auth = str || 'Basic YXV0bzpxd2VydHk=';
    return api;
  }

  function setHost(str) {
    host = str || HOSTS[0];
    return api;
  }

  function bind() {
    main.off('change.pusher') //
    .on('change.pusher', onChange) //
    .data('pusher', api)
    ;
    return api;
  }

  api = {
    callback: cb,
    input: main,
    setAuth: setAuth,
    setHost: setHost,
  };

  C.debug(NOM, VER, 'init');
  return bind().setAuth().setHost();
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */