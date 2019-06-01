$(function () {
  $('body').on('tap', 'a', function () {
    mui.openWindow({
      url: $(this).attr('href')
    })
  })
})
function getParamsByUrl(key) {
  var obj = {};
  var url = location.search;
  var arr = url.substr(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < arr.length; i++) {
    var acc = arr[i].split('=');
    obj[acc[0]] = acc[1];
  }
  if (obj[key]) {
    return obj[key];
  }
  return obj;
}