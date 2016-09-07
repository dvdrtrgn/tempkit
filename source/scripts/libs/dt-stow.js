/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    //console.log('AMD:Stow');
    define([], factory);
  } else {
    console.warn('stow.js shim', window.Stow = factory());
  }
}(function () {
  'use strict';

  var Nom = 'Stow',
    Api = {};

  function stringIt(obj) {
    return JSON.stringify(obj) || '""';
  }

  function runTests() {
    function clearTests() {
      for (var i in localStorage)
        if (i.match(/^test\.\d+/))
          localStorage.removeItem(i);
    }

    function makeKey() {
      var num = (new Date()).valueOf();

      num += Math.random();

      return 'test.' + num;
    }

    function test(obj) {
      var foo,
        str = makeKey();

      Api.set(str, obj);
      foo = Api.get(str);

      console.assert(stringIt(obj) === stringIt(foo),
        Nom, '...stowed object should match original');
    }
    clearTests();

    test(123);
    test('xyz');
    test({
      m: 3,
      n: 9
    });
    test([]);
    test(makeKey);
  }

  Api = {
    get: function (nom) {
      var str = localStorage.getItem(nom);
      return JSON.parse(str);
    },
    set: function (nom, obj) {
      var str = stringIt(obj);
      return localStorage.setItem(nom, str);
    },
    test: runTests,
  };

  return Api;
}));
/*




 */
