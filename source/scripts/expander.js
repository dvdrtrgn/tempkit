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
      },
      El = $.reify({
        body: 'body',
        content: '.content',
        choices: '.grid li',
        shown: '',
        expanded: '',
        null: '#',
      });

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

  function setExpand(ele, amt) {
    if (!amt) {
      ele.shrink().removeClass('expand');
      El.expanded = El.null;
    } else {
      ele.expand(amt).addClass('expand');
      El.expanded = ele;
    }
  }
  function setShown(ele, bool) {
    if (!bool) {
      ele.shrink(0);
      El.shown = El.null;
    } else {
      ele.expand(0);
      El.shown = ele;
    }
  }
  function toggle(par, con) {
    if (con.is(El.shown)) {
      setExpand(par, 0);
      setShown(con, false);
    } else {
      setExpand(par, con.targetHeight());
      setShown(con, true);
    }
  }

  function insertContent(evt) {
    var me = $(evt.delegateTarget),
        con = $('.content').first(),
        par = me.parent();

    setExpand(El.expanded, 0); // any prior expanded?
    par.append(con);
    defer(function () {
      toggle(par, con);
    });
  }

  function wrapTargets(i, e) {
    var ele = $(e).addClass('ani'),
        div;

    div = $('<div>')
    .addClass('target')
    .css({ // fill container and save size
      //width: ele.innerWidth(),
      height: ele.targetHeight(),
    }).on('click', insertContent);

    div.append(e.innerHTML);
    ele.empty().append(div);
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  function bind() {
    El.content.expand().shrink('0').addClass('ani');
    El.choices.each(wrapTargets).first().append(El.content);
  }

  $.extend(Api, {
    _el: El,
    init: bind,
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
