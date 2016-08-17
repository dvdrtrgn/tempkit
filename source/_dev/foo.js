/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
  C = (W.C || W.console || {});

var HOSTS = [
  '//localhost/wordpress',
  '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
];
var Form = $('form');

$('a.online').hide();

Form.on('change', function (evt) {
  var data = new FormData();

  evt.preventDefault();
  data.append('file', Form.find('input:file')[0].files[0]);

  $.ajax({
    url: HOSTS[0] + '/wp-json/wp/v2/media',
    method: 'POST',
    data: data,
    crossDomain: true,
    contentType: false,
    processData: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic username:password');
    },
    success: function (data) {
      console.debug(data);
      $('a.online').attr('href', data.link).show() //
        .find('span').html('Media ID #' + data.id).end() //
        .find('img').attr('src', data.source_url).end() //
      ;
    },
    error: function (error) {
      C.error(error);
    }
  });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
