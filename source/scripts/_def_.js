/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-09 dvdrtrgn
 USE: dependency config factory
 */
function _def_(Nom, cf, fn) {
  'use strict';
  window._amd_ = (typeof define === 'function' && define.amd);
  if (!(cf && fn)) {
    throw Error('missing factory params/config');
  }
  if (window._amd_) {
    console.info('_def_AMD', cf.nom, cf);
    require.config(cf);
    define(cf.sig(), fn);
  } else {
    console.warn('_def_shim', cf.nom, cf);
    window[Nom] = fn.apply('', cf.sig());
  }
}
if (window._dbug) {
  console.log('_def_', [_def_]);
}
/*

  _def_('jQuery', {
    baseUrl: 'scripts',
    paths: {
      jquery: '../vendors/jquery/jquery',
      jqxtn: './libs/jq-xtn',
    },
    sig: function () {
      'use strict';
      return _amd_ ? ['jquery'] : [jQuery];
    },
    vers: '(0.0.0)',
  }, function ($) {
    var W = (W && W.window || window);
    var C = (W.C || W.console || {});
    var Nom = 'jQuery';
    C.debug([Nom, 'loaded', $]);
    return $;
  });

 */
