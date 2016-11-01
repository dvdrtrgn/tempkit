/*jslint white:false */
/*global window, define, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.2';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:looker.js', V);
    W.Looker = factory(jQuery);
  } else {
    console.info('AMD:looker.js', V);
    define(['jquery'], factory);
  }
}(function () {
  'use strict';

  return {
    hosts: {
      loc: '//localhost/wordpress',
      csc: '//ecgsolutions.hosting.wellsfargo.com/marketing/csc',
    },
    apis: {
      wp: 'wp-json/wp/v2/card',
      acf: 'wp-json/acf/v2/card',
    },
    cats: { // interests
      'General': 1,
      'Human': 3,
      'Environmental': 4,
      'Animal': 5,
      'Arts': 6,
      'Education': 7,
      'Disease': 8,
      'Diversity': 10,
      'Child': 11,
      'Other': 13,
    },
    tags: { // state
      'MN': 14,
      'NC': 15,
    },
  };
}));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
