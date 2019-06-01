$(function () {
  $('.yzm').on('tap', function () {
    $.ajax({
      type: "get",
      url: "/user/vCodeForUpdatePassword",
      success: function (res) {
        // num = res.vCode;
        console.log(res.vCode);
      }
    });
  })
  $('#modify').on('tap', function () {
    var oldpwd = $('#oldpwd').val();
    var password = $('#password').val();
    var againPwd = $('#againPwd').val();
    var vCode = $('#vCode').val();
    if (!/^[a-zA-Z0-9]\w{5,17}$/.test(oldpwd)) {
      mui.toast('用户原密码最低6位');
      return;
    }
    if (!/^[a-zA-Z0-9]\w{5,17}$/.test(password)) {
      mui.toast('用户新密码最低6位');
      return;
    }
    if (password !== againPwd) {
      mui.toast('两次密码输入不一样');
      return;
    }

    if (!/^\d{6}$/.test(vCode)) {
      mui.toast('请输入验证码(6位哦)');
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/updatePassword",
      data: {
        'oldPassword': oldpwd,
        'newPassword': password,
        'vCode': vCode
      },
      success: function (res) {
        console.log(res);
        if (res.error) {
          mui.toast(res.message);
          return;
        }
        mui.toast('修改密码成功');
        setTimeout(() => {
          location.href = 'login.html';
        }, 2000);
        // if (res.success) {
        //   location.href = 'login.html';
        //   return;
        // }
        // mui.toast(res.message);
      }
    });
  })

})