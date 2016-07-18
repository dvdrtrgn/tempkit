/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jqxtn', 'lodash'], function ($, _) {
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
      });

  // - - - - - - - - - - - - - - - - - -
  // RUNTIME

  function keyExperiment () {

    function filterKeys(evt, bool) {
      var keys = {
        alt: evt.altKey,
        ctrl: evt.ctrlKey,
        meta: evt.metaKey,
        shift: evt.shiftKey,
      };
      if (bool){
        keys.evt = evt;
      }
      return keys;
    }

    $.fn.con = function () { // help OSX assert(control+click !== contextual-click)
      var me = 'contextmenu.con'; // start as a name
      function check(evt) {
        if (!evt.button && evt.ctrlKey) {
          evt.preventDefault(); // stop contextmenu
          evt.type = 'click'; // mutate event
          me.trigger(evt); // recall as click
        }
      }
      me = $(this).off(me).on(me, check); // recycle var & reattach
      return me.on.apply(this, arguments); // do normal event/listener
    };

    function readKeys(evt) {
      C.debug(filterKeys(evt));
    }
    // end keyExperiment
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  function bind() {
    W.jQuery = $;
    window.debug = 0;

    // EXPANDER
    require(['expander'], function (Exp) {
      //Exp.init(); // '#grid-preview .widget', '#grid-content .widget'
    });
    //$('head').append('<script src="./scripts/expander.js"></script>');

    // REVEALER
    require(['revealer'], function (Revealer) {
      W.Revealer = Revealer;
      W.rev = new Revealer('.load_more-button', '.ef_flashcard').next(2);
    });

  }

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
});
/*



 */
