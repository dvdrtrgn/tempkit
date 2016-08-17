/*jslint white:false */
/*global window, jQuery, FormData */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var W = (W && W.window || window),
  C = (W.C || W.console || {});

var AUTH = 'Basic YXV0bzpxd2VydHk=';
var HOSTS = [
  '//localhost/wordpress',
  '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
];
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Link = $('a.online').hide();
var showOff = function (data) {
  'use strict';

  Link.attr('href', data.link).show() //
    .find('span').html('Media ID #' + data.id).end() //
    .find('img').attr('src', data.source_url).end() //
  ;
  C.debug(data);
};

var Push = function ($, cb, form) {
  'use strict';
  var api;

  function sendNow(fdat) {
    $.ajax({
      url: HOSTS[1] + '/wp-json/wp/v2/media',
      method: 'POST',
      data: fdat,
      crossDomain: true,
      contentType: false,
      processData: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', AUTH);
      },
      success: function (data) {
        api.cb(data);
      },
      error: function (error) {
        C.error(error);
      }
    });
  }

  function onChange(evt) {
    var fdat = new FormData();
    var file = api.form.find('input:file')[0].files[0];

    evt.preventDefault();
    fdat.append('file', file);

    sendNow(fdat);
  }

  function hookUp(el, fn) {
    el = $(el);
    el.off('change.Push');
    el.on('change.Push', fn);
  }

  api = {
    cb: cb,
    form: $(form || 'form'),
    handleChange: onChange,
    handleSend: sendNow,
    init: function (a, b) {
      hookUp(a || api.form, b || onChange);
      return api;
    },
  };

  return api.init();
};

Push(jQuery, showOff);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
