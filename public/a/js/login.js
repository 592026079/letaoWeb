$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  async: false,
  success: function (res) {
    if (res.success) {
      location.href = "user.html";
      return;
    }
  }
});
$(function () {
  $('.btn-primary').on('click', function () {
    // console.log(1);
    var name = $('.form-username').val();
    var password = $('.form-password').val();
    if (!name || $.trim(name) == '') {
      alert('请输入用户名');
      return;
    }
    if (!password || $.trim(password) == '') {
      alert('请输入密码');
      return;
    }
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: {
        'username': name,
        'password': password
      },
      success: function (res) {
        if (res.success) {
          location.href = 'user.html';
          return;
        }
        alert(res.message);
      }
    });
  })
  $('.form-password').on('keyup', function (e) {
    if (e.keyCode == 13) {
      var name = $('.form-username').val();
      var password = $('.form-password').val();
      if (!name || $.trim(name) == '') {
        alert('请输入用户名');
        return;
      }
      if (!password || $.trim(password) == '') {
        alert('请输入密码');
        return;
      }
      $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        data: {
          'username': name,
          'password': password
        },
        success: function (res) {
          if (res.success) {
            location.href = 'user.html';
            return;
          }
          alert(res.message);
        }
      });
    }
  })
})