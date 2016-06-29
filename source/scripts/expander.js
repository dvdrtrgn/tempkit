/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
  'use strict';

  var W = (W && W.window || window),
      C = (W.C || W.console || {});

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

  function undef(x) {
    return (typeof x === 'undefined');
  }
  function defer(fn) {
    W.setTimeout(fn, 9);
  }

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

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
  $.fn.expand = function (px) {
    var me = $(this);
    px = undef(px) ? 100 : Number(px);
    return me.setHeight(me.targetHeight() + px);
  };
  $.fn.shrink = function (px) {
    var me = $(this);
    px = undef(px) ? '' : Number(px);
    return me.setHeight(px);
  };

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

    if (!ele.is(El.expanded)) { // any prior expanded?
      setExpanded(El.expanded, 0);
      showContent(false);
    }
    ele.append(El.content);
    defer(function () {
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
    var ele = $(e).addClass('ex-ani'),
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
    El.choices = $(choices);
    El.sources = $(sources);

    El.content.addClass('ex-ani').expand().shrink('0');
    El.choices.each(wrapTargets).first().append(El.content);

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
});
/*



 */
