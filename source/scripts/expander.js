/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var v = '0.2.2';
  if (typeof define === 'function' && define.amd) {
    console.info('AMD:expander.js', v);
    define(['jquery'], factory);
  } else {
    console.warn('SHIM:expander.js', v);
    window.Expander = factory(jQuery);
    return window.debug || window.setTimeout(window.Expander.init, 333);
  }
}(function ($) {
  'use strict';
  var W = (W && W.window || window),
      C = (W.C || W.console || {});

  function undef(x) {
    return (typeof x === 'undefined');
  }
  function defer(fn, ms) {
    W.setTimeout(fn, ms || 222);
  }

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  $.reify = function (obj) { // replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      obj[i] = $(sel);
    });
  };
  $.fn.preserveH = function (init) {
    var me = $(this),
        dat = me.data(),
        str = 'preserveH',
        rtn;
    rtn = Number(dat[str] = dat[str] || me.innerHeight());
    return init ? this : rtn;
  };
  $.fn.setHeight = function (px) {
    $(this).css('height', px);
    return this;
  };
  $.fn.growH = function (px) { // additional amount
    var me = $(this);
    px = undef(px) ? 100 : Number(px);
    return me.setHeight(me.preserveH() + px);
  };
  $.fn.shrinkH = function (px) { // targeted amount
    var me = $(this);
    px = undef(px) ? '' : Number(px);
    return me.setHeight(px);
  };

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  var Nom = 'Expander',
      Api = {
        inited: false,
        shown: false,
        key: Nom + 'Index',
      },
      Df = {
        body: 'body',
        choices: '',
        content: '<div class="ex-content ex-ani">',
        closer: '<div class="ex-closer">',
        feature: '',
        source: '',
        expanded: '',
        null: '#',
      },
      El;

  // - - - - - - - - - - - - - - - - - -
  // FEATURES

  function restoreFeature() {
    if (El.feature && El.holder) {
      El.feature.insertAfter(El.holder);
      delete El.feature;
      El.holder.remove();
      delete El.holder;
    }
  }
  function borrowFeature(num) {
    restoreFeature(); // try anyway
    El.feature = El.sources.eq(num);
    El.holder = $('<placeholder>').insertBefore(El.feature);
    return El.feature;
  }
  function loadFeatureIndex(num) {
    if (num === false) {
      return restoreFeature();
    }
    num = (num - 1) % El.sources.length;
    El.content.append(borrowFeature(num));
  }

  // - - - - - - - - - - - - - - - - - -
  // ACTIONS

  function animateWidget(amt) {
    if (!amt) {
      El.expanded.shrinkH().removeClass('ex-panded');
      El.expanded = El.null;
    } else {
      El.expanded.growH(amt).addClass('ex-panded');
    }
  }
  function animateFeature(bool) {
    if (bool) {
      El.content.growH(0);
      Api.shown = true;
    } else {
      El.content.shrinkH(0);
      Api.shown = false;
    }
  }
  function collapse() {
    animateWidget();
    animateFeature();
  }
  function expand() {
    if (Api.shown) {
      collapse();
    } else {
      animateWidget(El.content.preserveH());
      animateFeature(true);
    }
  }

  // - - - - - - - - - - - - - - - - - -
  // HANDLERS

  function insertContent(evt) {
    var me = $(evt.delegateTarget),
        ele = me.parent();

    if (ele.is(El.expanded)) {
      defer(restoreFeature); // toggle off
    } else {
      collapse();
      loadFeatureIndex(ele.data(Api.key));
      El.expanded = ele.append(El.content);
    }
    defer(expand, 11); // ensure insertion into DOM?
  }
  function wrapTargets(i, e) {
    var ele = $(e),
        div = ele.children(),
        dat = ele.data();

    dat[Api.key] = i + 1; // remember index

    if (div.length === 1) { // avoid re-wrapping
    } else {
      div = $('<div>').append(e.innerHTML);
      ele.empty().append(div);
      C.warn(Nom, 'using innerHTML', e);
    }

    div.addClass('ex-target').on('click', insertContent);
    ele.add(div).setHeight(ele.preserveH());
  }
  function zapTargets(i, e) {
    var ele = $(e),
        div = ele.children(),
        dat = ele.data();

    div.removeClass('ex-target').off('click');
    div.add(ele).css('height', '');

    delete dat[Api.key];
    delete dat.preserveH;
  }

  // - - - - - - - - - - - - - - - - - -
  // BINDERS

  function destroy() {
    collapse();
    restoreFeature();
    El.content.appendTo('body');
    El.closer.off('click', collapse);
    El.choices.removeClass('ex-ani').each(zapTargets);
    El.choices = El.sources = '';
    Api.inited = false;
  }
  function bind(choices, sources) {
    if (Api.inited) {
      throw new Error(Nom + ' double init?');
    }
    Api.inited = true;
    El = $.reify($.extend({}, Df));
    El.choices = $(choices || '#grid-preview .widget');
    El.sources = $(sources || '#grid-content .widget');
    El.choices.addClass('ex-ani').each(wrapTargets);
    El.closer.on('click', collapse);
    El.content.append(El.closer).appendTo(El.body)
    .preserveH(true).shrinkH('0');
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  $.extend(Api, {
    _el: El,
    init: bind,
    kill: destroy,
    load: loadFeatureIndex,
    unload: restoreFeature,
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

  todo: dvdrtrgn
    attach a resize event
    test display flexbox
    allow custom height at init?
    auto scroll to bottom

 */
