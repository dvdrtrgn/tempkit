/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-09 dvdrtrgn
 USE: dependency config factory
 */
var _def_ = function (Nom, cf, fn) {
  'use strict';
  window._amd_ = (typeof define === 'function' && define.amd);
  if (!(cf && fn)) {
    throw Error('missing factory params/config');
  }
  if (window._amd_) {
    console.info('_def_AMD', cf);
    require.config(cf);
    define(cf.sig(), fn);
  } else {
    console.warn('_def_shim', Nom, cf);
    window[Nom] = fn.apply('', cf.sig());
  }
};
if (window._dbug) {
  console.log('_def_', [_def_]);
}
/*

  _def_('jQuery', {
    rev: '(0.0.0)',
    sig: function () {
      return _amd_ ? ['jquery'] : [jQuery];
    },
  }, function ($) {
    return $;
  });

 */
