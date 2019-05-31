$(function () {
  $('#login').on('tap', function () {
    if (!$('#username').val() || $.trim($('#username').val()) == '') {
      mui.toast('请输入用户名');
      return;
    }
    if (!$('#password').val() || $.trim($('#password').val()) == '') {
      mui.toast('请输入密码');
      return;
    }
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        'username': username,
        'password': password
      },
      beforeSend: function () {
        if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(username)) {
          mui.toast('用户名格式错误');
          return false;
        }
        if (!/^[a-zA-Z]\w{5,17}$/.test(password)) {
          mui.toast('用户密码最低6位');
          return false;
        }
      },
      success: function (res) {
        if (res.error) {
          mui.toast(res.message);
          return;
        }
        if (res.success) {
          location.href = 'user.html';
        }
      }
    });

  })
})