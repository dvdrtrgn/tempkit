/*jslint white:false */
/*global define, window, _dbug:true */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-09 dvdrtrgn
 USE: dependency config factory
 */
_dbug = Number(new Date('2016/11/01') > new Date());

var _def_ = function (Nom, cf, fn) {
  'use strict';
  var _Nom = '_def_';

  window._amd_ = (typeof define === 'function' && define.amd);
  if (!(cf && fn)) {
    throw Error('missing factory params/config');
  }
  cf.sig = cf.sig || function () { // default to jquery only
    return window._amd_ ? ['jquery'] : [jQuery];
  };

  if (window._amd_) {
    console.info('AMD', _Nom, cf);
    require.config(cf);
    define(cf.sig(), fn);
  } else {
    console.warn('!!!', _Nom, Nom, cf);
    window[Nom] = fn.apply('', cf.sig());
  }
};
if (window._dbug) {
  console.log('_def_', [_def_]);
}
/*



 */
