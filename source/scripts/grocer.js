/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.1';
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

  var Host = 'https://blogs.wf.com';

  function fetch(url, cb) {
    $.ajax(url, {
      type: 'get',
      datatype: 'jsonp',
      cache: false,
      error: function (err) {
        console.log('fetch err', err, url);
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
    var basket = {};

    function dbg() {
      var args = [].slice.call(arguments);
      args = [Nom].concat(args);
      return (Debug ? console.debug.apply(console, args) : '');
    }

    dbg('getting grocs...');
    fetchPost(forPost, function (obj) {
      if ($.isArray(obj)) {
        obj = obj.pop();
      }
      basket.href = obj.link;
      basket.para = obj.excerpt.rendered;
      basket.title = obj.title.rendered;
      dbg('post', obj);

      fetchPict(obj.featured_media, function (obj) {
        basket.src = obj.source_url;
        dbg('media', obj);
        thenDo(basket);
      });
    });
  }

  // Expose Fake Constructor
  function Grocer(a, b) {
    return goShopping(a, b);
  }
  return Grocer;
}));
/*

  todo: dvdrtrgn

 */
