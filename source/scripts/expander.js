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
      });

  function undef(x) {
    return (typeof x === 'undefined');
  }

  // - - - - - - - - - - - - - - - - - -
  // RUNTIME

  $.fn.targetHeight = function (init) {
    var ele = $(this),
        dat = ele.data(),
        rtn;
    rtn = Number(dat.targetHeight = dat.targetHeight || ele.innerHeight());
    return init ? this : rtn;
  };
  $.fn.expand = function (px) {
    px = undef(px) ? 100 : Number(px);
    var ele = $(this);
    ele.css({
      height: ele.targetHeight() + px,
    });
    return this;
  };
  $.fn.shrink = function (px) {
    px = undef(px) ? '' : Number(px);
    var ele = $(this);
    ele.css({
      height: px,
    });
    return this;
  };

  function setShown(ele, bool) {
    if (!bool) {
      ele.shrink(0);
      El.shown = '';
    } else {
      ele.expand(0);
      El.shown = ele;
    }
  }
  function toggle(par, con) {
    if (con.is(El.shown)) {
      par.shrink();
      setShown(con, false);
    } else {
      par.expand(con.targetHeight());
      setShown(con, true);
    }
  }

  function insertContent(evt) {
    var me = $(evt.delegateTarget),
        con = $('.content').first(),
        par = me.parent();

    if (par.has(con).length === 0) {
      par.append(con);
      con.css('height', 0).removeClass('shown');
    }
    setTimeout(function () {
      toggle(par, con);
    }, 9);
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
