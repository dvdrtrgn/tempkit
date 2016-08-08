/*jslint white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: immediate use / command object load page of wp post json
 */
(function (factory) {
  'use strict';
  var V = '0.3.3';
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

  function setHost(host) {
    Host = (host || 'http://localhost/wordpress');
  }

  function goShopping(filter, usePost) {
    var dbg = function () {
      dbg.args = [].slice.call(arguments);
      dbg.args = [Nom].concat(dbg.args);
      return (Debug ? console.debug.apply(console, dbg.args) : '');
    };

    function procPost(i, obj) {
      var basket = {
        href: obj.link,
        para: obj.excerpt.rendered,
        title: obj.title.rendered,
        src: null,
      };
      fetchMedia(obj.featured_media, function (obj) {
        basket.src = obj.source_url;
        usePost(basket);
        dbg('post+media', basket);
      });
    }

    dbg('getting grocs...');
    fetchPosts(filter, function (arr) {
      arr = $.isArray(arr) ? arr : [arr]; // enforce array mode
      $.each(arr, procPost); // each post gets an image sub-request
    });
  }

  function checkout(ele, obj) {
    var els = {
      blurb: ele.find('.entry-content'),
      link: ele.find('.entry-header .entry-title a'),
      pic: ele.find('.entry-header .wp-post-image'),
    };

    els.pic.attr({
      alt: Debug ? obj.src : '',
      src: obj.src,
      srcset: '',
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

  function fillerUp(filters, bags) {
    var index = 0;

    bags.addClass('loading');
    goShopping(filters, function (grocs) {
      checkout(bags.eq(index++), grocs);
    });
    return Grocer;
  }

  // Expose Fake Constructor
  function Grocer(host) {
    setHost(host);
    return Grocer;
  }

  return $.extend(Grocer, {
    fillerUp: fillerUp,
    goShopping: goShopping,
    test: function (num) {
      var store = $('div.external-blog').children();
      var filters = '?filter[orderby]=rand&filter[posts_per_page]=4';
      var hosts = [
        'http://rmion.com',
        'http://demo.wp-api.org',
        'https://blogs.wf.com',
        'https://blogswf.staging.wpengine.com'
      ];

      return (new Grocer(hosts[num]).fillerUp(filters, store));
    },
  });

}));
/*

  todo: dvdrtrgn

 */
