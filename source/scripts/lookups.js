/*jslint white:false */
/*global window, define, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  var V = '0.0.1';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:lookups.js', V);
    W.Lookups = factory(jQuery);
  } else {
    console.info('AMD:lookups.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  return {
    // interests
    cat: {
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
    // state
    tag: {
      'MN': 14,
      'NC': 15,
    },
  };
}));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
