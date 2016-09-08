/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 rev. 2016-09 dvdrtrgn
 USE: convert arabic to roman numerals
 */
(function (factory) {
  'use strict';
  var V = '0.0.1';

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:libs/dt-roman.js', V);
    window.Roman = factory();
  } else {
    console.info('AMD:libs/dt-roman.js', V);
    require.config({
      baseUrl: 'scripts',
      paths: {},
    });
    define(['jqxtn'], factory);
  }
}(function () {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  var Nom = 'Roman',
    Api = {
      slick: null,
    };

  // - - - - - - - - - - - - - - - - - -
  // RUNTIME

  function makeRomDigit() {
    var x = { // 'roman digits'
      _idx: 6,
      _order: 'IVXLCDM',
      _hash: {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
      },
      toString: () => x._order.charAt(x._idx),
      valueOf: () => x._hash[x.toString()] || 0,
      shift: () => x._idx > -1 ? x._idx-- && x.valueOf() : 0,
      reset: () => x._idx = 6,
      ensure: (v) => (isNaN(v) || v > 4999 || v < 1) ? 0 : parseInt(v, 10),
      approx: function (v) {
        if (!x.ensure(v)) {
          throw Error('unroman!');
        }
        while (x.valueOf() > v) x.shift();
      },
    };
    return x;
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT
  /*
   */

  function calcRoman(v, old) {
    var b = '';
    var rd = makeRomDigit();

    do {
      rd.approx(v);
      v -= Number(rd);
      b += String(rd);
    } while (v);

    if (!old) {
      b = b
        .replace(/DCCCC/, 'CM')
        .replace(/CCCC/, 'CD')
        .replace(/LXXXX/, 'XC')
        .replace(/XXXX/, 'XL')
        .replace(/VIIII/, 'IX')
        .replace(/IIII/, 'IV');
    }

    return b;
  }

  Api = {
    convert: calcRoman,
  };

  if (W._dbug > 0) { // Expose
    W[Nom] = Api;
    C.warn(Nom, 'exposed', Api);
  } else {
    C.debug(Nom, 'loaded', Api);
  }

  return Api;
}));
/*



 */
