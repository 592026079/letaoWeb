$(function () {
  var page = 1;
  var pageSize = 10;
  $.ajax({
    type: "get",
    url: "/product/queryProductDetailList",
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (res) {
      if (res.rows.length > 0) {
        var str = template('productTem', res);
        // console.log(str);
        $('.table-bordered tbody').html(str);
      }
    }
  });
  $.ajax({
    type: "GET",
    url: "/category/querySecondCategoryPaging",
    data: {
      page: 1,
      pageSize: 100
    },
    success: function (res) {
      // console.log(res)
      if (res.rows.length > 0) {
        var str = template('optTem', res);
        // console.log(str);
        $('.brandId').html(str);
      }
    }
  });
  var arr = [];
  $('#files').fileupload({
    dataType: 'json',
    done: function (e, data) {
      // console.log(data)
      arr.push(data.result);
      // imgRes = data.result.picAddr;
      // $('.img-thumbnail').attr('src', imgRes);
    }
  })
  $('#addProduct').on('click', function () {
    var proName = $.trim($('.proName').val());
    var oldPrice = $.trim($('.oldPrice').val());
    var price = $.trim($('.price').val());
    var proDesc = $.trim($('.proDesc').val());
    var size = $.trim($('.size').val());
    var num = $.trim($('.num').val());
    var brandId = $.trim($('.brandId').val());
    if (!proName) {
      alert('请输入产品名称');
      return;
    }
    if (!oldPrice) {
      alert('请输入产品原价');
      return;
    }
    if (!price) {
      alert('请输入产品折扣价');
      return;
    }
    if (!proDesc) {
      alert('请输入产品描述');
      return;
    }
    if (!size) {
      alert('请输入产品尺寸');
      return;
    }
    if (!num) {
      alert('请输入产品剩余数量');
      return;
    }
    if (!brandId || brandId == '-- 请选择品牌 --') {
      alert('请选择品牌');
      return;
    }
    $.ajax({
      type: "POST",
      url: "/product/addProduct",
      data: {
        proName: proName,
        oldPrice: oldPrice,
        price: price,
        proDesc: proDesc,
        size: size,
        num: num,
        brandId: brandId,
        pic: arr,
        statu: 1,
      },
      success: function (res) {
        if (res.success) {
          location.reload();
        }
      }
    })
  });
})