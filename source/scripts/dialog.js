/*jslint white:false, laxcomma:true */
/*globals define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 create command object for manipulating lightbox

 TODO
 document a bit

 */
define(['jquery', 'modal'], function ($, Modal) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function bindDialog() { // off site dialog
        var dialog = $('.modal .dialog'); // thing to show
        var triggers = $('.shareBar .shares a'); // intercept these

        Modal.bind(triggers, dialog, function (data) {
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
});
