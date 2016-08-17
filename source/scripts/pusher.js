/*jslint white:false */
/*global window, jQuery, FormData */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

jQuery.fn.pusher = function (cb) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var $ = jQuery.noConflict();

  var NOM = 'jq-pusher';
  var VER = '(0.1.1)';
  var HOSTS = [
    '//localhost/wordpress',
    '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
  ];

  var api, auth, host;
  var form = $(this).closest('form');
  var main = form.find('input:file');

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
        C.debug(data);
        api.callback(data);
      },
      error: function (error) {
        C.error(NOM, error);
      }
    });
  }

  function wrapFile() {
    var fdat = new FormData();
    var blob = main[0].files[0];

    fdat.append('file', blob);
    C.warn(fdat, blob);
    return fdat;
  }

  function onChange(evt) {
    evt.preventDefault();
    sendNow(wrapFile());
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
      .data('pusher', api);
    return api;
  }

  function preview(data) {
    form.find('a.preview').attr('href', data.link).show() //
      .find('span').html('Media ID #' + data.id).end() //
      .find('img').attr('src', data.source_url).end();
  }

  api = {
    callback: cb || preview,
    input: main,
    origin: form,
    setAuth: setAuth,
    setHost: setHost,
  };

  C.debug(NOM, VER, 'init');
  return bind().setAuth().setHost();
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
