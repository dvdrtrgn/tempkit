/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.2.0';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:grocer.js', V);
    W.Grocer = factory(jQuery);
  } else {
    console.info('AMD:grocer.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var Nom = 'Grocer';
  var Debug = W._dbug > 0;
  var Host = 'http://localhost/wordpress';

  function fetch(url, cb) {
    $.ajax(url, {
      type: 'get',
      datatype: 'jsonp',
      cache: false,
      error: function (err) {
        console.log('fetch err', err, url);
        this.success({
          source_url: 'failed'
        });
      },
      success: function (obj) {
        if (typeof cb === 'function') {
          cb(obj);
        } else {
          console.log(url, obj);
        }
      },
    });
  }

  function fetchPost(num, cb) {
    fetch(Host + '/wp-json/wp/v2/posts/' + num, cb);
  }

  function fetchPict(num, cb) {
    fetch(Host + '/wp-json/wp/v2/media/' + num, cb);
  }

  function goShopping(forPost, thenDo) {
    function dbg() {
      var args = [].slice.call(arguments);
      args = [Nom].concat(args);
      return (Debug ? console.debug.apply(console, args) : '');
    }

    function gather(i, obj) {
      var basket = {};

      basket.href = obj.link;
      basket.para = obj.excerpt.rendered;
      basket.title = obj.title.rendered;

      fetchPict(obj.featured_media, function (obj) {
        basket.src = obj.source_url;
        thenDo(basket);
        dbg('post+media', basket);
      });
    }

    dbg('getting grocs...');
    fetchPost(forPost, function (arr) {
      arr = $.isArray(arr) ? arr : [arr]; // enforce array mode
      $.each(arr, gather);
    });
  }

  // Expose Fake Constructor
  function Grocer(a, b) {
    return goShopping(a, b);
  }
  $.extend(Grocer, {
    setHost: function (host) {
      Host = host;
      return Grocer;
    },
  })
  return Grocer;
}));
/*

  todo: dvdrtrgn

 */
