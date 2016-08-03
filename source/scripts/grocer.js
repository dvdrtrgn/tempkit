/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
jQuery(function () {
  'use strict';

  var Host = 'https://blogs.wf.com';

  function fetch(url, cb) {
    $.ajax(url, {
      type: 'get',
      datatype: 'json',
      data: {},
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
    var shutup = false,
      dbg = function () {
        return (shutup ? console.debug.apply(null, arguments) : '');
      };

    fetchPost(forPost, function (obj) {
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

  $('#Grocs').on('click', function () {
    var index = 470;

    goShopping(index, function (grocs) {
      console.info('Here are your groceries:', grocs);
      window.alert('check your console');
    });
  });

});
/*

  todo: dvdrtrgn

 */
