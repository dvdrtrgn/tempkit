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
  $.fn.preserveHeight = function (init) {
    var me = $(this),
        dat = me.data(),
        str = 'preserveHeight',
        rtn;
    rtn = Number(dat[str] = dat[str] || me.innerHeight());
    return init ? this : rtn;
  };
  $.fn.setHeight = function (px) {
    $(this).css('height', px);
    return this;
  };
  $.fn.grow = function (px) { // additional amount
    var me = $(this);
    px = undef(px) ? 100 : Number(px);
    return me.setHeight(me.preserveHeight() + px);
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
      El.feature = El.holder = (El.holder.remove() && '');
    }
  }
  function borrowFeature(num) {
    restoreFeature(); // try anyway
    El.feature = El.sources.eq(num);
    El.holder = $('<placeholder>').insertBefore(El.feature);
    El.content.append(El.feature);
  }
  function setExpanded(ele, amt) {
    ele = ele || El.expanded;

    if (!amt) {
      ele.shrink().removeClass('ex-panded');
      El.expanded = El.null;
    } else {
      ele.grow(amt).addClass('ex-panded');
      El.expanded = ele;
    }
  }
  function showContent(bool) {
    if (bool) {
      El.content.grow(0);
      Api.shown = true;
    } else {
      El.content.shrink(0);
      Api.shown = false;
    }
  }
  function shutDown() {
    showContent(false);
    setExpanded(false);
    restoreFeature();
  }
  function insertContent(evt) {
    var me = $(evt.delegateTarget),
        ele = me.parent();

    if (ele.is(El.expanded)) {
      defer(restoreFeature); // toggle off
    } else {
      showContent();
      setExpanded(false);
    }

    Api.load(ele.data(Api.key));
    ele.append(El.content);

    defer(function () { // ensure insertion into DOM?
      if (Api.shown) {
        setExpanded(ele, 0);
        showContent(false);
      } else {
        setExpanded(ele, El.content.preserveHeight());
        showContent(true);
      }
    });
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
    ele.add(div).css({
      height: ele.preserveHeight(),
    });
  }

  function loadIndex(num) {
    if (num === false) {
      return restoreFeature();
    }
    num = (num - 1) % El.sources.length;
    borrowFeature(num);
  }

  function unbind(i, e) {
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
    El.choices.each(unbind).removeClass('ex-ani');
    El.closer.off('click');
    El.content.appendTo('body');
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
