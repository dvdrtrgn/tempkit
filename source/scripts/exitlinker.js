(function ($) {
  'use strict';
  var whitelist = ['wellsfargo.com', 'wellsfargomedia.com', 'wf.com'];

  function addStyles(css) {
    var style = $('<style type=text/css>');
    style.text(css.replace(/([;{])\s(\w)/g, '$1\n  $2')); // pretty indent
    $('head').append(style);
  }

  $.exitlinker = function () {
    var links = $('a[href*="//"]');
    var notice = $('.exit-link-notice').hide();

    whitelist.forEach(function (domain) {
      links = links.not('[href*="' + domain + '"]');
    });

    if (links.length) {
      links.not('.exit-link')
      .attr('target', '_blank')
      .append('<sup title="Not a Wells Fargo website">‡</sup>')
      .addClass('exit-link');
      notice.show();
    }
  };

  $(function () {
    var css = '.exit-link-notice { font-size: 90%; }\n' +
      '.exit-link sup { display: inline-block; cursor: help; }';
    //$($.exitlinker);
    addStyles(css);
  });
}(jQuery));
