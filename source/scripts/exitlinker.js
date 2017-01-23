(function ($) {
  'use strict';
  var whitelist = ['wellsfargo.com', 'wellsfargomedia.com', 'wf.com'];

  $(function () {
    var links = $('a[href*="//"]');

    whitelist.forEach(function (e) {
      links = links.not('[href*="' + e + '"]');
    });

    if (links.length) {
      $('.exit-link-notice').show();
      links.addClass('exit-link');
      links.attr('target', '_blank');
    }
  });

}(jQuery));
