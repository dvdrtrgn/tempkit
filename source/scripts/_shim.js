/*jslint white:false */
/*global $ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-08 dvdrtrgn
 USE: bootstrap
 */
$(function () {
  'use strict';

  var W = (W && W.window || window);

  $.inlineSvgs();
  $.watchHash();
  $.watchWidth();
  $.watchInputDevice();

  W._lo = W.Loader(
    999, [function () {
      var els = $('div.external-blog').children();
      var host = 'https://blogswf.staging.wpengine.com';
      var filters = '?filter[orderby]=rand&amp;filter[posts_per_page]=4';
      W._groc = W.Grocer(host).fillerUp(filters, els);
      W._push = $('a.preview').pusher();
    }, function () {
      W._mod = W.Modal.init('#pg-54-7 div.modal');
      W._dia = W.Dialog.bind('.external-link');
    }, function () {
      W._exp = W.Expander();
    }, function () {
      W._rev = W.Revealer('.page .loadmore', '.page .widget', 2).inc(3);
    }]
  );

  W.document.title += ' SHIM';
});
