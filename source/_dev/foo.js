/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
  C = (W.C || W.console || {});

var imageForm = $('#image-form'),
  fileInput = $('#image-input'),
  formData = new FormData();

imageForm.on('submit', function (e) {
  e.preventDefault();

  formData.append('file', fileInput[0].files[0]);

  $.ajax({
    url: 'http://localhost/wordpress/wp-json/wp/v2/media',
    method: 'POST',
    data: formData,
    crossDomain: true,
    contentType: false,
    processData: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic username:password');
    },
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    }
  });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
