$(function () {
  var result;
  $.ajax({
    type: "get",
    url: "/address/queryAddress",
    success: function (res) {
      console.log(res);
      result = res;
      var str = template('addTem', { data: res });
      $('.addmsg').html(str);
    }
  });


  $('.addmsg').on('tap', '.del', function () {
    var id = $(this).parents('li').attr('data-id');
    mui.confirm('确定删除？', function (e) {
      if (e.index == 1) {
        $.ajax({
          type: "post",
          url: "/address/deleteAddress",
          data: {
            'id': id
          },
          success: function (res) {
            if (res.success) {
              $(this).parents('li').remove();
              location.reload();
            }
          }
        });
      }
    })
  })

  $('.addmsg').on('tap', '.update', function () {
    var id = $(this).parents('li').attr('data-id');
    for (var i = 0; i < result.length; i++) {
      if (result[i].id == id) {
        localStorage.setItem('data', JSON.stringify(result[i]));
        break;
      }
    }
    location.href = 'addAdress.html?isEdit=1';
  })
})