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
      });

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
    var ele = $(this);
    ele.css({
      height: ele.targetHeight() + Number(px || 100),
    });
    return this;
  };
  $.fn.shrink = function (px) {
    var ele = $(this);
    ele.css({
      height: Number(px || ele.targetHeight()),
    });
    return this;
  };

  function toggle(par, con) {
    if (con.is('.shown')) {
      par.shrink();
      con.shrink('0').removeClass('shown');
    } else {
      par.expand(con.targetHeight());
      con.expand('0').addClass('shown');
    }
  }

  function insertContent(evt) {
    var me = $(evt.delegateTarget),
        con = $('.content').first(),
        par = me.parent();

    if (par.has(con).length === 0) {
      par.append(con);
    }
    toggle(par, con);
  }

  function wrapTargets(i, e) {
    var ele = $(e).addClass('ani'),
        div;

    div = $('<div>')
    .addClass('target')
    .css({ // fill container and save size
      width: ele.innerWidth(),
      height: ele.targetHeight(),
    }).on('click', insertContent);

    div.append(e.innerHTML);
    ele.empty().append(div);
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  function bind() {
    El.content.expand().shrink('0').addClass('ani');
    El.choices.each(wrapTargets);
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
