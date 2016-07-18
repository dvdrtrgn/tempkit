/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var v = '0.4.2';

  function mion_init() {
    window.exp = new Expander('#grid-preview .widget:not(:first-child)', '#grid-content .widget:not(:first-child)');
  }

  if (typeof define === 'function' && define.amd) {
    console.info('AMD:expander.js', v);
    define(['jquery'], factory);
  } else {
    console.warn('SHIM:expander.js', v);
    window.Expander = factory(jQuery);
    return window.debug || window.setTimeout(mion_init, 333);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var Nom = 'Expander';
  var Speed = 222;

  function defer(fn, ms) {
    W.setTimeout(fn, ms || Speed);
  }
  function reify(obj) { // reify v3 : replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      if (typeof sel === 'object') {
        sel = sel.selector;
      }
      (obj[i] = $(sel)).selector = sel;
    });
  }
  function undef(x) {
    return (typeof x === 'undefined');
  }

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

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

  $.fn.expander = function (choices, sources) {}

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

    var api = {
          inited: false,
          key: Nom + 'Index',
          lastIndex: undefined,
          shown: false,
        },
        Df = {
          body: 'body',
          choices: '',
          closer: '<div class="ex-closer">',
          expanded: '',
          feature: '',
          holder: '',
          reveal: '<div class="ex-reveal">',
          scrolls: 'body, html', // for msie
          sources: '',
          null: '#',
        },
        els;

    // - - - - - - - - - - - - - - - - - -
    // FEATURES
    function retireFeature() {
      if (els.feature && els.holder) {
        els.feature.insertAfter(els.holder);
        delete els.feature;
        els.holder.remove();
        delete els.holder;
        return api;
      }
    }
    function borrowFeature(num) {
      retireFeature(); // try anyway
      els.feature = els.sources.eq(num);
      els.holder = $('<placeholder>').insertBefore(els.feature);
      return els.feature;
    }
    function loadFeatureIndex(num) {
      if (num === false) {
        return retireFeature();
      }
      num = (num - 1) % els.sources.length;
      els.reveal.append(borrowFeature(num));
      api.lastIndex = num;
      return api;
    }

    // - - - - - - - - - - - - - - - - - -
    // ACTIONS

    function scrollToContent () {
        var scrollVal = els.reveal.offset().top,
            revealed = els.feature ? els.feature.preserveH() + 10 : 0;

        scrollVal += revealed;
        scrollVal -= $(W).height();
        els.scrolls.animate({
          scrollTop: scrollVal
        }, 333);
    }
    function animateWidget(amt) {
      if (!amt) {
        els.expanded.shrinkH().removeClass('ex-panded');
        els.expanded = els.null;
      } else {
        els.expanded.growH(amt).addClass('ex-panded');
      }
    }
    function animateFeature(bool) {
      if (bool) {
        els.reveal.growH(els.feature.preserveH());
        api.shown = true;
      } else {
        els.reveal.shrinkH(0);
        api.shown = false;
      }
    }
    function collapse(bool) {
      animateWidget();
      animateFeature();
      if (bool) {
        delete api.lastIndex;
      }
    }
    function expand() {
      if (api.shown) {
        collapse();
      } else {
        animateWidget(els.feature.preserveH());
        animateFeature(true);
      }
    }

    // - - - - - - - - - - - - - - - - - -
    // HANDLERS

    function insertContent(evt) {
      var me = $(evt.delegateTarget),
          ele = me.parent();

      if (ele.is(els.expanded)) {
        defer(retireFeature); // toggle off
      } else {
        collapse();
        loadFeatureIndex(ele.data(api.key));
        els.expanded = ele.append(els.reveal);
      }
      defer(expand, 11); // ensure insertion into DOM?
    }
    function wrapTargets(i, e) {
      var ele = $(e),
          div = ele.children(),
          dat = ele.data();

      dat[api.key] = i + 1; // remember index

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

      delete dat[api.key];
      delete dat.preserveH;
    }

    // - - - - - - - - - - - - - - - - - -
    // BINDERS

    function destroy() {
      if (!api.inited) {
        return C.error(Nom + ' cannot kill what is already dead!');
      }
      collapse();
      retireFeature();
      els.reveal.appendTo('body').off('transitionend', scrollToContent);
      els.closer.off('click', collapse);
      els.choices.removeClass('ex-ani').each(zapTargets);
      els.choices = els.sources = '';
      api.inited = false;
      return api;
    }
    function bind(choices, sources) {
      if (api.inited) {
        return C.error(Nom + ' cannot double init');
      }
      api.inited = true;
      reify(els);
      els.choices = $(choices || '#grid-preview .widget');
      els.sources = $(sources || '#grid-content .widget');
      els.choices.addClass('ex-ani').each(wrapTargets);
      els.closer.on('click', collapse);
      els.reveal.append(els.closer).appendTo(els.body) //
      .on('transitionend', scrollToContent) //
      .preserveH(true).shrinkH('0');
      defer(function () {
        els.reveal.addClass('ex-ani'); // prevent scrolling upon load
      });
      return api;
    }

    // - - - - - - - - - - - - - - - - - -
    // INIT

    $.extend(api, {
      _el: els = $.extend({}, Df),
      init: bind,
      kill: destroy,
      load: loadFeatureIndex,
      unload: retireFeature,
      restore: function () {
        if (undef(api.lastIndex)) return;
        els.choices.eq(api.lastIndex).find('.ex-target').trigger('click');
      },
    });

  W[Nom] = api;
  C.warn(Nom, 'exposed', api);

  // Expose Fake Constructor
  function Expander(a, b) {
    a = a || '.choices';
    b = b || '.sources';
    return api.init(a, b); // $(a).expander(b);
  }
  return Expander;
}));
/*

  todo: dvdrtrgn
    attach a resize event

 */
