/*jslint white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: multi use / jq method marries preview grid to full content
 */
(function (factory) {
  'use strict';
  var V = '0.7.2';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:expander.js', V);
    W.Expander = factory(jQuery, W._);
  } else {
    console.info('AMD:expander.js', V);
    define(['jquery', 'lodash'], factory);
  }
}(function ($, _) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var Debug = W._dbug > 0;
  var Nom = 'Expander';
  var Api = {
    inited: false,
    key: Nom + 'Index',
    lastIndex: undefined,
    shown: false,
  };
  var El = {
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
  };
  var Df = {
    align: 'bottom',
    speed: 250,
  };
  var Styles;

  function defer(fn, ms) {
    return W.setTimeout(fn, ms || Df.speed);
  }

  function getStyles() {
    return Styles || (Styles = $('link[href*=' + Nom.toLowerCase() + ']')[0].sheet.rules);
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
    rtn = dat && Number(dat[str] = dat[str] || me.innerHeight());
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
  $.fn.killWhitey = function () {
    var ele = $(this);
    ele.children().appendTo(ele); // squash spaces
    return this;
  };
  $.fn.makeTabbable = function () {
    var me = $(this);
    me.attr('tabindex', '0') //
      .on('keypress', function (evt) {
        return (evt.keyCode === 13) && me.click();
      });
    return this;
  };

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  $.expander = function (choices, sources, opts) {

    var api = $.extend({}, Api),
      els = $.extend({}, El),
      cf = $.extend({}, Df, opts);

    els.choices = choices || '.choices';
    els.sources = sources || '.sources';

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    function finish(str) {
      if (Debug) {
        C.info(Nom, (str || ''), api);
      }
      return api;
    }

    // FEATURES

    function retireFeature() {
      if (els.feature && els.holder) {
        els.feature.insertAfter(els.holder);
        delete els.feature;
        els.holder.remove();
        delete els.holder;
        return finish('retireFeature');
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
      els.reveal.prepend(borrowFeature(num));
      api.lastIndex = num;
      return finish('loadFeatureIndex');
    }

    // ANIMATIONS

    function scrollToFeature() {
      var scrollVal = els.reveal.offset().top,
        revealH = els.feature ? els.feature.preserveH() : 0;

      if (cf.align === 'top') {
        scrollVal -= 100; // buffer top by a couple fingers
      } else {
        scrollVal += (revealH + 50); // buffer bottom
        scrollVal -= $(W).height();
      }
      els.scrolls.animate({
        scrollTop: scrollVal
      }, cf.speed);
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

    function dismiss() {
      collapse();
      retireFeature();
    }

    // HANDLERS

    function insertContent(evt) {
      var me = $(evt.delegateTarget),
        ele = me.parent();

      if (ele.is(els.expanded)) {
        defer(retireFeature, cf.speed); // toggle off
      } else {
        collapse();
        loadFeatureIndex(ele.data(api.key));
        els.expanded = ele.append(els.reveal);
      }
      defer(expand, 11); // ensure insertion into DOM?
    }

    function wrapTargets(i, e) {
      var ele = $(e), // ex-wrap
        div = ele.children(),
        dat = ele.data();

      dat[api.key] = i + 1; // remember index

      if (div.length === 1) { // skip re-wrapping
      } else {
        div = ele.find('.ex-init').append(div);
        C.warn(Nom, 'rewrapping ex-init', e);
      }

      div.addClass('ex-target').makeTabbable() //
        .on('click', insertContent) //
        .append('<span class="ada">Show more</span>');

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
    // PUBLIC

    $.extend(api, {
      _el: Debug ? els : null,
      _cf: Debug ? cf : null,
      config: function (obj, val) {
        if (typeof obj === 'object') {
          $.extend(cf, obj);
        } else if (val) {
          cf[obj] = val;
        }
      },
      kill: function () {
        if (!api.inited) {
          return C.error(Nom + ' cannot kill what is already dead!');
        }
        collapse();
        retireFeature();
        els.reveal.appendTo('body').off('transitionend', scrollToFeature);
        els.closer.off('click', collapse);
        els.choices.parent().removeClass('ex-wrap').each(zapTargets);
        // els.choices = els.sources = '';
        api.inited = false;
        return finish('kill');
      },
      init: function () {
        if (api.inited) {
          return C.error(Nom + ' cannot double init');
        }
        api.inited = true;
        reify(els);

        els.choices.parent() // whole deal is stupid and fragile
          .addClass('ex-wrap') // targeting sub-item
          .each(wrapTargets); // todo: ensure parent wrapper
        els.choices.parent().parent().killWhitey();

        els.closer.makeTabbable() //
          .on('click', dismiss) //
          .prepend('<span class="ada">Close</span>');

        els.reveal.append(els.closer).appendTo(els.body) //
          .on('transitionend', scrollToFeature) //
          .preserveH(true).shrinkH('0');

        defer(function () {
          els.reveal.addClass('ex-ani'); // prevent scrolling upon load
        }, cf.speed * 10);
        return finish('init');
      },
      restore: function () {
        if (undef(api.lastIndex)) return;
        els.choices.eq(api.lastIndex).find('.ex-target').trigger('click');
      },
      setSpeed: function (num) {
        var rule;
        cf.speed = num;
        try {
          rule = _.find(getStyles(), {
            selectorText: '.ex-ani',
          });
          rule.style.transitionDuration = num + 'ms';
        } catch (err) {
          C.error(err);
        }
      }
    });

    reify(els);
    return api.init();
  };

  // Expose Fake Constructor
  function Expander(a, b) {
    var args = [].slice.call(arguments);
    args[0] = a || '#Grid-preview .ex-init';
    args[1] = b || '#Grid-content .widget';
    return $.expander.apply(null, args);
  }
  return Expander;
}));
/*

  todo: dvdrtrgn
    attach a resize event
    ensure parent wrapper

 */
