/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd && 0) {
    console.info('AMD:Expander');
    define(['jquery'], factory);
  } else {
    console.warn('expander.js shim', window.Expander = factory(jQuery));
    window.Expander.init();
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window),
      C = (W.C || W.console || {});

  function undef(x) {
    return (typeof x === 'undefined');
  }
  function defer(fn) {
    W.setTimeout(fn, 9);
  }

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  $.reify = function (obj) { // replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      obj[i] = $(sel);
    });
  };

  $.fn.targetHeight = function (init) {
    var me = $(this),
        dat = me.data(),
        rtn;
    rtn = Number(dat.targetHeight = dat.targetHeight || me.innerHeight());
    return init ? this : rtn;
  };
  $.fn.setHeight = function (px) {
    $(this).css('height', px);
    return this;
  };
  $.fn.expand = function (px) { // additional amount
    var me = $(this);
    px = undef(px) ? 100 : Number(px);
    return me.setHeight(me.targetHeight() + px);
  };
  $.fn.shrink = function (px) { // targeted amount
    var me = $(this);
    px = undef(px) ? '' : Number(px);
    return me.setHeight(px);
  };

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  var Nom = 'Expander',
      Api = {
        shown: false,
      },
      El = $.reify({
        body: 'body',
        choices: '',
        content: '<div class="ex-content">',
        closer: '<div class="ex-closer">',
        feature: '',
        source: '',
        expanded: '',
        null: '#',
      });

  El.content.append(El.closer).appendTo(El.body);

  // - - - - - - - - - - - - - - - - - -
  // RUNTIME

  function setExpanded(ele, amt) {
    ele = ele || El.expanded;

    if (!amt) {
      ele.shrink().removeClass('ex-panded');
      El.expanded = El.null;
    } else {
      ele.expand(amt).addClass('ex-panded');
      El.expanded = ele;
    }
  }
  function showContent(bool) {
    if (bool) {
      El.content.expand(0);
      Api.shown = true;
    } else {
      El.content.shrink(0);
      Api.shown = false;
    }
  }
  function insertContent(evt) {
    var me = $(evt.delegateTarget),
        ele = me.parent();

    Api.load(me.data('targetIndex'));

    if (!ele.is(El.expanded)) {
      setExpanded(El.expanded, 0);
      showContent(false);
    }
    ele.append(El.content);

    defer(function () { // ensure insertion into DOM?
      if (Api.shown) {
        setExpanded(ele, 0);
        showContent(false);
      } else {
        setExpanded(ele, El.content.targetHeight());
        showContent(true);
      }
    });
  }

  function wrapTargets(i, e) {
    var ele = $(e),
        div = $('<div class="ex-target">');

    div.css({ // fill container and save size
      height: ele.targetHeight(),
    })
    .data('targetIndex', i + 1)
    .on('click', insertContent);

    div.append(e.innerHTML);
    ele.empty().append(div);
  }

  function loadIndex(num) {
    num = (num - 1) % El.sources.length;

    El.feature.remove();
    El.feature = El.sources.eq(num).clone();
    El.content.append(El.feature);
  }
  // - - - - - - - - - - - - - - - - - -
  // INIT

  function bind(choices, sources) {
    El.choices = $(choices || '#grid-preview .widget');
    El.sources = $(sources || '#grid-content .widget');

    El.content.addClass('ex-ani').expand('0').shrink('0');
    El.choices.addClass('ex-ani').each(wrapTargets);

    El.closer.on('click', function () {
      showContent(false);
      setExpanded(false);
    });
  }

  $.extend(Api, {
    _el: El,
    init: bind,
    load: loadIndex,
  });

  if (W.debug > 0) { // Expose
    W[Nom] = Api;
    C.warn(Nom, 'exposed', Api);
  } else {
    C.debug(Nom, 'loaded');
  }

  return Api;
}));
/*



 */
