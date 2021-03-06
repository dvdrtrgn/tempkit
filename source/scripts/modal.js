/*jslint white:false */
/*global define, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: single use / command object for manipulating lightbox
 */
(function (factory) {
  'use strict';
  var V = '0.1.3';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:modal.js', V);
    W.Modal = factory(jQuery);
  } else {
    console.info('AMD:modal.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var Nom = 'Modal';
  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var Df, El, self;
  var Act = 'keypress click';
  var Cleaners = $.Callbacks();

  function db(num) {
    return W.debug > (num || 1);
  }

  // DEFAULTS
  Df = {
    inited: false,
    begin: '<span class="ada" tabindex="0"> Beginning of dialog content </span>',
    closer: '<a class="closer" href="#"><span class="ada"> Close </span></a>',
    closers: '.closer, .cancel', // all "closers"
    finish: '<span class="ada" tabindex="0"> End of dialog content </span>'
  };
  // ELEMENTS
  El = {
    modal: 'body > div.modal, #Modal', // safe guesses
    watcher: 'body',
  };

  // EXTEND
  $.reify = function (x, y) { // jq-reify props w/selector vals
    $.each(x, function (i, e) {
      x[i] = $(e);
    });
    return y ? $.extend(y, x) : x; // extend optional host
  };

  $.fn.contains = function (x) {
    return Boolean(this.is(x) || this.has(x).length);
  };

  $.fn.addCloser = function () {
    if (Df.closer && !this.contains('.closer')) {
      $(Df.closer).prependTo(this);
    }
    return this;
  };

  //  PRIVATE
  self = {
    bind: function (source, target, fixer, cleaner) {
      self.init(); // double check

      var data = {
        source: $(source), // departure
        target: $(target),
        df: Df
      };

      if (data.source.length > 1) { // recurse
        return data.source.each(function (i, e) {
          self.bind(e, target, fixer, cleaner);
        });
      } else if (data.source.data(Nom)) { // reject
        throw new Error(Nom + ' already');
      }
      Cleaners.add(cleaner);
      data.target.addCloser();
      /// map selectors to trigger show and callback
      data.source.on(Act, function (evt) {
        Df.trigger = this; // remember THE departure point

        if (evt.keyCode === undefined || evt.keyCode === 13) {
          evt.preventDefault(); // do not trigger
        } else if (evt.keyCode !== 0 && evt.keyCode !== 32) {
          return; // allow for spacebar open
        }
        if (fixer) {
          try {
            fixer(data);
          } catch (err) {
            C.error(err);
          }
        }
        self.show(data.target);
      }).data(Nom, data);
    },
    show: function (ele) {
      /// activate container, hide all kids, then feature one
      El.modal.addClass('active').find('> div').hide();
      if (ele && ele.length) {
        ele.fadeIn(function () {
          ele.find('a, button') //
            .attr('tabindex', '0') //
            .first().focus().end() //
            .last().one('blur', function () {
              ele.find('a, button').first().focus(); // loop back
            });
        });
      }
      return self;
    },
    hide: function () {
      /// deactivate container and do whatever cleaning
      El.modal.removeClass('active');
      Cleaners.fire();
      try {
        Df.trigger.focus(); // restore focus
      } catch (err) {
        if (db())
          C.log('no trigger to focus on');
      }
      return self;
    },
    init: function (sel) { // to pre-emptively spec the modal div
      if (Df.inited) {
        return null;
      }
      El.modal = sel || El.modal;

      if (db()) {
        C.info(Nom, 'debug:', db(), self);
        self[Nom] = Df;
      }
      Df.inited = true;
      Df.El = $.reify(El);
      El.modal.prepend(Df.begin).append(Df.finish);

      /// bind container actions to .hide
      El.modal.on(Act, function (evt) {
        var ele = $(evt.target);

        if (ele.is(El.modal) || ele.is(Df.closers)) {
          evt.preventDefault(); // do change hash
          self.hide();
        }
      });
      El.watcher.on('keydown', function (evt) {
        if (evt.keyCode === 27) {
          self.hide(); // escape key
        }
      });
      return self;
    }
  };

  return self;
}));
/*

  todo: dvdrtrgn
    document data

 */
