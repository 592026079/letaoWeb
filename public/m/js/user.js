$(function () {
  $('.logout').on('click', function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      success: function (res) {
        if (res.success) {
          mui.toast('退出成功');
          setTimeout(() => {
            location.href = 'index.html';
          }, 2000);
        }
      }
    });
  })
  if (userInfo) {
    var str = template('userTem', userInfo);
    $('.msg').html(str);
  }
})
var userInfo;
$.ajax({
  type: "get",
  url: "/user/queryUserMessage",
  async: false,
  success: function (res) {
    if (res.error && res.error == 400) {
      location.href = 'login.html';
      return;
    }
    userInfo = res;
  }
});