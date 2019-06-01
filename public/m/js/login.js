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
        if (!/^[a-zA-Z0-9]\w{5,17}$/.test(password)) {
          mui.toast('用户密码最低6位');
          return false;
        }
        $('#login').html('登陆中.....');
      },
      success: function (res) {
        if (res.success) {
          $('#login').html('登陆成功');
          mui.toast('登陆成功');
          setTimeout(() => {
            location.href = 'user.html'
          }, 2000);
        } else {
          mui.toast(res.message);
          $('#login').html('登陆');
        }
      }
    });

  })
})