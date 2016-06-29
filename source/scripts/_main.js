/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    console.log('AMD:Main', !define(
        ['jqxtn'], factory));
  } else {
    console.warn('app.js shim', window.Main = factory
        ($));
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window),
      C = (W.C || W.console || {});

    $.inlineSvgs();
    $.watchHash();
    $.watchWidth();
  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  var Nom = 'Main',
      Api = {
        slick: null,
      },
      El = $.reify({
        body: 'body',
        content: '.content',
        choices: '.grid li',
      });

  // - - - - - - - - - - - - - - - - - -
  // RUNTIME

  $.fn.targetHeight = function() {
    var ele = $(this),
        dat = ele.data();
    return Number(dat.targetHeight = dat.targetHeight || ele.innerHeight());
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

  function bind() {
    El.content.expand().shrink('0').addClass('ani');
    El.choices.each(wrapTargets);
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  $.extend(Api, {
    _el: El,
  });

  W.setTimeout(bind, 99);

  if (W.debug > 0) {
    W[Nom] = Api;
    C.warn(Nom, 'exposed', Api); // Expose
  } else {
    C.debug(Nom, 'loaded', Api); // Expose
  }

  return Api;
}));
/*



 */
