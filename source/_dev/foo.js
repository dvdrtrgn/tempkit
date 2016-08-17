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
    url: HOSTS[1] + '/wp-json/wp/v2/media',
    method: 'POST',
    data: data,
    crossDomain: true,
    contentType: false,
    processData: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic YXV0bzpxd2VydHk=');
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

var jsonresult = {
  "id": 29,
  "date": "2016-08-17T02:53:29",
  "date_gmt": "2016-08-17T02:53:29",
  "guid": {
    "rendered": "http:\/\/localhost\/wordpress\/wp-content\/uploads\/2016\/08\/face-1.png",
    "raw": "http:\/\/localhost\/wordpress\/wp-content\/uploads\/2016\/08\/face-1.png"
  },
  "modified": "2016-08-17T02:53:29",
  "modified_gmt": "2016-08-17T02:53:29",
  "password": "",
  "slug": "face-1",
  "status": "inherit",
  "type": "attachment",
  "link": "http:\/\/localhost\/wordpress\/face-1\/",
  "title": {
    "raw": "face-1",
    "rendered": "face-1"
  },
  "author": 2,
  "comment_status": "open",
  "ping_status": "closed",
  "alt_text": "",
  "caption": "",
  "description": "",
  "media_type": "image",
  "mime_type": "image\/png",
  "media_details": {
    "width": 276,
    "height": 276,
    "file": "2016\/08\/face-1.png",
    "sizes": {
      "thumbnail": {
        "file": "face-1-150x150.png",
        "width": 150,
        "height": 150,
        "mime_type": "image\/png",
        "source_url": "http:\/\/localhost\/wordpress\/wp-content\/uploads\/2016\/08\/face-1-150x150.png"
      },
      "full": {
        "file": "face-1.png",
        "width": 276,
        "height": 276,
        "mime_type": "image\/png",
        "source_url": "http:\/\/localhost\/wordpress\/wp-content\/uploads\/2016\/08\/face-1.png"
      }
    },
    "image_meta": {
      "aperture": "0",
      "credit": "",
      "camera": "",
      "caption": "",
      "created_timestamp": "0",
      "copyright": "",
      "focal_length": "0",
      "iso": "0",
      "shutter_speed": "0",
      "title": "",
      "orientation": "0",
      "keywords": []
    }
  },
  "post": null,
  "source_url": "http:\/\/localhost\/wordpress\/wp-content\/uploads\/2016\/08\/face-1.png",
  "_links": {
    "self": [{
      "href": "http:\/\/localhost\/wordpress\/wp-json\/wp\/v2\/media\/29"
    }],
    "collection": [{
      "href": "http:\/\/localhost\/wordpress\/wp-json\/wp\/v2\/media"
    }],
    "about": [{
      "href": "http:\/\/localhost\/wordpress\/wp-json\/wp\/v2\/types\/attachment"
    }],
    "author": [{
      "embeddable": true,
      "href": "http:\/\/localhost\/wordpress\/wp-json\/wp\/v2\/users\/2"
    }],
    "replies": [{
      "embeddable": true,
      "href": "http:\/\/localhost\/wordpress\/wp-json\/wp\/v2\/comments?post=29"
    }]
  }
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
