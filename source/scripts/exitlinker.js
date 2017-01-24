(function ($) {
  'use strict';
  var whitelist = ['wellsfargo.com', 'wellsfargomedia.com', 'wf.com'];

  function addStyles(css) {
    var style = $('<style type=text/css>');
    style.text(css.replace(/([;{])\s(\w)/g, '$1\n  $2')); // pretty indent
    $('head').append(style);
  }

  function findLinks() {
    var links = $('a[href*="//"]');
    whitelist.forEach(function (domain) {
      links = links.not('[href*="' + domain + '"]');
    });
    return links;
  }

  function killLinks() {
    findLinks().replaceWith('💩');
  }

  function markLinks(links) {
    links.not('.exit-link').addClass('exit-link').attr('target', '_blank')
      .append('<sup title="Not a Wells Fargo website">‡</sup>');
  }

  function scanLinks() {
    var links = findLinks();
    var notice = $('.exit-link-notice').hide();

    if (links.length) {
      markLinks(links);
      notice.show();
    }
  }

  $.exitlinker = function exitlinker() {
    scanLinks();
  };
  $.exitlinker.kill = killLinks;
  $.exitlinker.list = findLinks;
  $.exitlinker.scan = scanLinks;

  $(function inject() {
    var css = '.exit-link-notice { font-size: 90%; }\n' +
      '.exit-link sup { display: inline-block; cursor: help; }';
    addStyles(css); // $($.exitlinker);
  });
}(jQuery));
