/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd && 0) {
    console.info('AMD:Expander');
    define(['jquery'], factory);
  } else {
    console.warn('expander.js shim');
    window.Expander = factory(jQuery);
    //window.setTimeout(window.Expander.init, 999);
  }
}(function ($) {
  'use strict';
  var W = (W && W.window || window),
      C = (W.C || W.console || {});

  function undef(x) {
    return (typeof x === 'undefined');
  }
  function defer(fn) {
    W.setTimeout(fn, 222);
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
  // RUNTIME
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
  function setExpanded(ele, amt) {
    ele = ele || El.expanded;

    if (!amt) {
      ele.shrinkH().removeClass('ex-panded');
      El.expanded = El.null;
    } else {
      ele.growH(amt).addClass('ex-panded');
      El.expanded = ele;
    }
  }
  function showContent(bool) {
    if (bool) {
      El.content.growH(0);
      Api.shown = true;
    } else {
      El.content.shrinkH(0);
      Api.shown = false;
    }
  }
  function shutDown() {
    setExpanded();
    showContent();
    restoreFeature();
  }
  function animateContent() {
    if (Api.shown) {
      setExpanded(El.expanded, 0);
      showContent(false);
    } else {
      setExpanded(El.expanded, El.content.preserveH());
      showContent(true);
    }
  }
  function insertContent(evt) {
    var me = $(evt.delegateTarget),
        ele = me.parent();

    if (ele.is(El.expanded)) {
      defer(restoreFeature); // toggle off
    } else {
      shutDown();
    }
    Api.load(ele.data(Api.key));
    El.expanded = ele;
    ele.append(El.content);

    defer(animateContent); // ensure insertion into DOM?
  }
  function loadIndex(num) {
    if (num === false) {
      return restoreFeature();
    }
    num = (num - 1) % El.sources.length;
    El.content.append(borrowFeature(num));
  }

  function wrapTargets(i, e) {
    var ele = $(e),
        div = ele.children();
    ele.data(Api.key, i + 1); // remember index

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
        dat = ele.data();

    ele.off('click')
    .children().removeClass('ex-target')
    .add(ele).css('height', '');

    delete dat[Api.key];
    delete dat.preserveH;
  }

  function destroy() {
    shutDown();
    El.content.appendTo('body');
    El.closer.off('click', shutDown);
    El.choices.removeClass('ex-ani').each(zapTargets);
    El.choices = El.sources = '';
    Api.inited = false;
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT
  function bind(choices, sources) {
    if (Api.inited) {
      throw new Error(Nom + ' double init?');
    }
    Api.inited = true;
    El = $.reify($.extend({}, Df));
    El.choices = $(choices || '#grid-preview .widget');
    El.sources = $(sources || '#grid-content .widget');
    El.choices.addClass('ex-ani').each(wrapTargets);
    El.closer.on('click', shutDown);
    El.content.append(El.closer).appendTo(El.body)
    .preserveH(true).shrinkH('0');
  }

  $.extend(Api, {
    _el: El,
    init: bind,
    kill: destroy,
    load: loadIndex,
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
  v2
  todo: dvdrtrgn
    attach a resize event

 */
