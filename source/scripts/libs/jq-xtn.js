/*jslint  white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    //console.log('AMD:jq-xtn');
    define(['jquery'], factory);
  } else {
    console.warn('jq-xtn.js shim', [factory(jQuery)]);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window),
    C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -
  // AUTOMATE
  $.reify = function (obj) { // reify v3 : replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      if (typeof sel === 'object') {
        sel = sel.selector;
      }
      (obj[i] = $(sel)).selector = sel;
    });
  };

  // - - - - - - - - - - - - - - - - - -
  // PUBSUBS
  $.pubsubs = $({});
  $.publish = function () {
    $.pubsubs.trigger.apply($.pubsubs, arguments);
  };
  $.subscribe = function () {
    $.pubsubs.on.apply($.pubsubs, arguments);
  };
  $.unsubscribe = function () {
    $.pubsubs.off.apply($.pubsubs, arguments);
  };

  // - - - - - - - - - - - - - - - - - -
  // WATCHERS
  $.watchHash = function () {
    function trackHash() {
      var self = trackHash,
        hash = W.location.hash.slice(1),
        prev = self.previous;

      if (prev !== hash) {
        $('html').removeClass(prev).addClass(hash);
        self.previous = hash;
      }

      return self;
    }
    $(W).on('hashchange', trackHash());
  };
  $.watchInputDevice = function () {
    $('body').on('keydown', function () {
      $(this).removeClass('mouse');
      $(this).addClass('keyboard');
    }).on('mouseover', function () {
      $(this).removeClass('keyboard');
      $(this).addClass('mouse');
    });
  };
  $.watchWidth = function () {
    // track window size
    $.onResize(function () {
      var w = W.innerWidth,
        b = $('body');
      b.removeClass('small medium large');
      if (w < 600)
        b.addClass('small');
      else if (w < 900)
        b.addClass('medium');
      else
        b.addClass('large');
    });
  };
  $.onResize = function (fn, ns) {
    var evtn = 'resize.' + (ns || 'Util');

    $(W).off(evtn);

    if (fn) {
      fn();
      $(W).on(evtn, fn);
    }

    $(W).trigger(evtn);
  };
  $.markAgent = function () {
    var ua = W.navigator.userAgent;

    C.info(ua);

    $.watchResize(function () {
      if (ua.match(/mobi/i) ||
        $(W).width() < 768) { // simulate
        $('html').addClass('mobi');
      } else {
        $('html').removeClass('mobi');
      }
      if (ua.match(/chrome/i)) {
        $('html').addClass('chrome');
      } else if (ua.match(/safari/i)) {
        $('html').addClass('safari');
      } else if (ua.match(/firefox/i)) {
        $('html').addClass('firefox');
      } else if (ua.match(/trident/i)) {
        $('html').addClass('trident');
      }
    }, 'markAgent');
  };

  // - - - - - - - - - - - - - - - - - -
  // HELPERS
  $.scrollTo = function (px, sp) {
    px = px || 0;
    sp = sp || 333;
    $('body').animate({
      scrollTop: px,
    }, sp);
  };

  $.inlineSvgs = function () {
    $('img.svg').each($.fn.inlineSvg);
  };
  $.fn.inlineSvg = function () {
    var $img = $(this),
      imgID = $img.attr('id'),
      imgClass = $img.attr('class'),
      imgURL = $img.attr('src'),
      imgStyle = $img.attr('style').replace('color', 'fill');

    $.get(imgURL, function (data) {
      var $svg = $(data).find('svg');

      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
      if (typeof imgStyle !== 'undefined') {
        $svg = $svg.attr('style', imgStyle);
      }

      $svg = $svg.removeAttr('xmlns:a'); // Remove any invalid XML

      // svg scales if the viewport is set
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      }

      $img.replaceWith($svg.css('visibility', 'visible'));

    }, 'xml');
  };

  $.doneLoading = function () {
    $('.loading').removeClass('loading');
  };

  // create modifier-keys object [storing event?]
  $.filterKeys = function (evt, bool) {
    return {
      alt: evt.altKey,
      ctrl: evt.ctrlKey,
      meta: evt.metaKey,
      shift: evt.shiftKey,
      evt: bool ? evt : undefined,
    };
  };
  // help OSX assert(control+click !== contextual-click)
  $.fn.con = function () {
    var me = 'contextmenu.con'; // start as a name
    function check(evt) {
      if (!evt.button && evt.ctrlKey) {
        evt.preventDefault(); // stop contextmenu
        evt.type = 'click'; // mutate event
        me.trigger(evt); // recall as click
      }
    }
    me = $(this).off(me).on(me, check); // recycle var & reattach
    return me.on.apply(this, arguments); // do normal event/listener
  };

  // - - - - - - - - - - - - - - - - - -
  // HANDLERS

  return $;
}));
/*



 */
