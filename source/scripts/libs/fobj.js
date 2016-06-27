/*jslint  white:false */
/*global define, window, jQuery, Stow */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    //console.log('AMD:Fobj');
    define(['jquery', 'stow', 'deserial'], factory);
  } else {
    console.warn('fobj.js shim', window.Fobj = factory(jQuery, Stow));
  }
}(function ($, Stow) {
  'use strict';

  var W = (W && W.window || window),
      C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -
  // ASSIGN

  var Nom = 'Fobj',
      Api = {},
      filter = W.location.hostname !== 'localhost';

  if (W.debug > 0) {
    C.info(Nom, 'always saving', !filter);
  }

  $(W).on('beforeunload', function () {
    Api.save();
    C.warn(Nom, '...bye');
  });

  function disableNosave(bool) {
    var eles = $('[data-nosave]');

    if (filter && bool) {
      eles.attr('disabled', true);
    } else {
      eles.attr('disabled', false);
    }
  }

  Api = {
    save: function (nom) {
      disableNosave(1);
      Stow.set(nom || Nom, $('form').serialize());
      disableNosave(0);
      return Api;
    },
    load: function () {
      $('form').deserialize(Stow.get(Nom));
      Api.save(Nom + '_bu');
      return Api;
    },
    freshen: function () {
      $(':input').trigger('change');
      return Api;
    },
    fudge: function () {
      Stow.set(Nom,
          'Info-customer=Bart+McRumpus&Info-relationship=PMA&Info-date=March+6%2C+2016&Info-banker=Fanny+Mandible&Info-tel=123-123-1234&Info-email=fannyman%40wellsfargo.com&' +
          'Cash_Back_College_Visa=on&Wells_Fargo_Propel=on&Wells_Fargo_Propel_365=on&Wells_Fargo_Propel_World=on&Cash_Back_Visa=on&Home_Rebate_Visa=on&Rewards_Visa=on&' +
          'Visa_Signature=on&Cash_Back_Visa_Signature=on&Home_Rebate_Visa_Signature=on&Cash_Wise=on&Cash_Wise_Visa_Signature=on&' +
          'Spend-airfare=101&Spend-travel=102&Spend-grocery=100&Spend-refuel=100&Spend-dining=100&Spend-other=100&Spend-mobile=10');
      Api.load().freshen();
      return Api;
    },
  };

  Api.init = Api.load;

  return Api;
}));
/*




 */
