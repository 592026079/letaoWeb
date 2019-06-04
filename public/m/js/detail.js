$(function () {
  var id = getParamsByUrl('id');
  var productId;
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      'id': id
    },
    success: function (res) {
      if (res.statu) {
        productId = res.id;
        var str = template('detTem', res);
        $('#det-box').html(str);
        var gallery = mui('.mui-slider');
        gallery.slider();
        mui('.mui-numbox').numbox();
      }
    }
  });
  $('#det-box').on('tap', '.size span', function () {
    $(this).addClass('active').siblings().removeClass('active');
  })
  $('.join-car').on('tap', function () {
    var sizeVal = $('.size .active').text();
    var num = $('.mui-numbox-input').val();
    if (!sizeVal) {
      mui.alert('请选择尺码');
      return;
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        'productId': productId,
        'num': num,
        'size': sizeVal
      },
      success: function (res) {
        if (res.success) {
          mui.confirm('加入购物车成功，跳转到购物车？', function (e) {
            if (e.index == 1) {
              location.href = 'cart.html';
            }
          })
          return;
        }
        location.href = 'login.html';
      }
    });
  })
})