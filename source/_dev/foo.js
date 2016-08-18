/*jslint white:false */
/*global require, window, FormData */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window);
var C = (W.C || W.console || {});
var RND = Math.random() * 1e4 | 0;

function makeFieldSerial(obj) {
  var arr = [];
  $.each(obj, function (i, e) {
    arr.push('fields[' + i + ']=' + encodeURIComponent(e));
  });
  return arr.join('&');
}
var HOSTS = {
  loc: '//localhost/wordpress',
  csc: '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
};
var APIS = {
  wp: 'wp-json/wp/v2/card',
  acf: 'wp-json/acf/v2/card',
};
var tmpO = {
  description: "foo foo foo #" + RND,
  first_name: "Dvdr",
  last_name: "Trgn",
  city: "Mpls",
  state: "MN",
  country: "USA",
  area_of_interest: "hacking",
  photo: "158",
  background_color: "#ce3333",
};
tmpO.title = tmpO.first_name + ' ' + tmpO.last_name;
tmpO.slug = 'slug-' + RND;

function makeUrl(host, api, id, obj) {
  var tag;
  console.log('makeUrl', [host, api, id, obj]);

  if (obj && api === 'acf') {
    id += '?' + makeFieldSerial(obj);
  }
  api = APIS[api];
  host = HOSTS[host];

  return [host, api, id].join('/');
}
var str;

str = makeUrl('csc', 'acf', 191, tmpO);
Poster(str);

str = makeUrl('csc', 'wp', 191);
Poster(str, tmpO);

// push photo
//    id =
// post wp/card/id
//    media:  photo id
//    title:  full name (first last)
//    status: publish
//    id =
// post acf/card/id card
//    alt the fields

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
