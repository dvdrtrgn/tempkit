/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.2.4';
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

  function fetch(url, process) {
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
      success: function (data) {
        if (typeof process === 'function') {
          process(data);
        } else {
          console.log(url, data);
        }
      },
    });
  }

  function fetchPosts(filter, cb) {
    fetch(Host + '/wp-json/wp/v2/posts/' + filter, cb);
  }

  function fetchMedia(num, cb) {
    fetch(Host + '/wp-json/wp/v2/media/' + num, cb);
  }

  function goShopping(filter, thenDo) {
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

      fetchMedia(obj.featured_media, function (obj) {
        basket.src = obj.source_url;
        thenDo(basket);
        dbg('post+media', basket);
      });
    }

    dbg('getting grocs...');
    fetchPosts(filter, function (arr) {
      arr = $.isArray(arr) ? arr : [arr]; // enforce array mode
      $.each(arr, gather);
    });
  }

  function fillCart(ele, obj) {
    var els = {
      blurb: ele.find('.entry-content'),
      link: ele.find('.entry-header .entry-title a'),
      pic: ele.find('.entry-header .wp-post-image'),
    };

    els.pic.attr({
      alt: obj.src,
      src: obj.src,
    }).on('load', function () {
      ele.removeClass('loading');
    });
    els.link.attr({
      href: obj.href,
      target: 'blog',
    });
    els.link.html(obj.title);
    els.blurb.html(obj.para);
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
    fillCart: fillCart,
  });
  return Grocer;
}));
/*

  todo: dvdrtrgn

 */
