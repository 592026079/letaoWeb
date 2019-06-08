$(function () {
  var page = 1;
  var pageSize = 6;
  getData(page, pageSize);
  $('#prevBtn').on('click', function () {
    page--;
    if (page < 1) {
      alert('已经是第一页了');
      page = 1
    }
    getData(page, pageSize);
  })
  $('#nextBtn').on('click', function () {
    page++;
    var num = Math.ceil(all / pageSize);
    if (page > num) {
      alert('已经是最后一页了');
      page = num;
    }
    getData(page, pageSize);
  })
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: 1,
      pageSize: 100
    },
    success: function (res) {
      var str = template('categoryId', res);
      // console.log(str)
      $('.categoryId').html(str);
    }
  });
  $('.brandLogo').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data)
      imgRes = data.result.picAddr;
      $('.img-thumbnail').attr('src', imgRes);
    }
  })
  $('.save').on('click', function () {
    var categoryId = $('.categoryId').val();
    var brandName = $('.brandName').val();
    // var brandLogo = $('.brandLogo').val();
    if (!categoryId || $.trim(categoryId) == "请选择商品分类") {
      alert('请选择商品分类');
      return;
    }
    if (!brandName || $.trim(brandName) == "") {
      alert('请输入商品名称');
      return;
    }
    if (!imgRes || $.trim(imgRes) == "") {
      alert('请选择商品Logo');
      return;
    }
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: {
        categoryId: categoryId,
        brandName: brandName,
        brandLogo: imgRes,
        hot: 0
      },
      success: function (res) {
        if (res.success) {
          location.reload();
          return;
          // console.log(res);
        }
        alert(res.error);
      }
    });
  });

})
function getData(page, pageSize) {
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
    async: false,
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (res) {
      all = res.total;
      console.log(res);
      if (res.rows.length > 0) {
        var str = template('secondTem', res);
        $('.table-bordered tbody').html(str);
      }
    }
  });
}
