/*jslint white:false */
/*global window, jQuery, FormData */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var W = (W && W.window || window);
var C = (W.C || W.console || {});
var AUTH = 'Basic YXV0bzpxd2VydHk=';
var HOSTS = [
  '//localhost/wordpress',
  '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
];
var Link = $('a.online').hide();
var showOff = function (data) {
  'use strict';

  Link.attr('href', data.link).show() //
    .find('span').html('Media ID #' + data.id).end() //
    .find('img').attr('src', data.source_url).end() //
  ;
  C.debug(data);
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

jQuery.fn.pusher = function (cb) {
  'use strict';

  var api = {};
  var me = $(this).closest('form');
  var main = me.find('input:file');

  if (main.length < 1) {
    return C.error('no file field');
  }

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
    var file = main[0].files[0];

    evt.preventDefault();
    fdat.append('file', file);

    sendNow(fdat);
  }

  function bind() {
    main.off('change.pusher') //
    .on('change.pusher', onChange) //
    .data('pusher', api)
    ;
  }

  api = {
    callback: cb,
    input: main,
  };

  return bind();
};

Link.pusher(showOff);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
