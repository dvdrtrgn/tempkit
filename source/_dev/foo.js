/*jslint white:false */
/*global require, window, FormData, Poster, Yeller */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window);
var C = (W.C || W.console || {});
var RND = Math.random() * 1e4 | 0;

var tmpO = {
  description: "foo foo foo #" + RND,
  first_name: "Dvdr",
  last_name: "Trgn",
  city: "Mpls",
  state: "MN",
  country: "USA",
  area_of_interest: "hacking",
  photo: "158",
  background_color: "#ce3333",
};
tmpO.title = tmpO.first_name + ' ' + tmpO.last_name;
tmpO.slug = 'slug-' + RND;

// Poster(Yeller('csc', 'acf', 191, tmpO));
// Poster(Yeller('csc', 'wp', 191), tmpO);

$.fn.hasValue = function () {
  var me = $(this),
      ok = me.val();
  return !(ok === '0' || ok === '');
};

$.fn.hasZip = function () {
  var me = $(this),
      ok = me.val();
  return Boolean(ok && ok.match(/^\d{5}$/));
};

$('#select1').on('blur', function () {
  console.log(
    $(this).hasValue(),
      this);
});

$('#input1').on('blur', function () {
  console.log(
    $(this).hasZip(),
      this);
});


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
