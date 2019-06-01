$(function () {
  $('.yzm').on('click', function () {
    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function (res) {
        console.log(res.vCode);
      }
    });
  })
  $('#register').on('click', function () {
    var username = $('#username').val();
    var password = $('#password').val();
    var mobile = $('#mobile').val();
    var vCode = $('#vCode').val();
    var againPwd = $('#againPwd').val();
    if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(username)) {
      mui.toast('用户名格式错误');
      return;
    }
    if (!/^[a-zA-Z0-9]\w{5,17}$/.test(password)) {
      mui.toast('用户密码最低6位');
      return;
    }
    if (password !== againPwd) {
      mui.toast('两次密码输入不一样');
      return;
    }
    if (!/^[1]\d{10}$$/.test(mobile)) {
      mui.toast('用户手机格式错误');
      return;
    }
    if (!/^\d{6}$/.test(vCode)) {
      mui.toast('请输入验证码(6位哦)');
      return;
    }
    $.ajax({
      type: "post",
      url: "/user/register",
      data: {
        'username': username,
        'password': password,
        'mobile': mobile,
        'vCode': vCode
      },
      success: function (res) {
        if (res.success) {
          location.href = 'login.html';
          return;
        }
        mui.toast(res.message);
      }
    });
  })

})