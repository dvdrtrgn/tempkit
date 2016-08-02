/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. dvdrtrgn 2016-08
 USE: single use / insert offsite-interstial into ada compliant modal
 */
(function (factory) {
  'use strict';
  var V = '0.1.0';
  var W = (W && W.window || window);
  var $ = W.jQuery;

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:dialog.js', V);
    W.Dialog = factory($, W.Modal);
  } else {
    console.info('AMD:dialog.js', V);
    define(['jquery', 'modal'], factory);
  }
}(function ($, Modal) {
  'use strict';

  var W = (W && W.window || window),
    C = (W.C || W.console || {});

  function bindDialog(sel) { // off site dialog
    var dialog = $('.modal .dialog'); // thing to show
    var triggers = $(sel || '.external-link'); // intercept these

    Modal.bind(triggers, dialog, function (data) {
      // data is passed from Modal
      var btn = dialog.find('.utilitybtn'); // find the go button
      var src = data.source[0];

      if (src.target) {
        btn.attr('target', src.target); // transfer target
      }
      btn.attr('href', src.href); // transfer url
      btn.on('click', Modal.hide);
    });
  }

  return {
    bind: bindDialog,
  };
}));
/*

  todo: dvdrtrgn

 */
