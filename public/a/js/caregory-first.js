$(function () {
  var page = 1;
  var pageSize = 6;
  getData(page, pageSize);
  $('.prev').on('click', function () {
    page--;
    if (page < 1) {
      alert('已经是第一页了');
      page = 1
    }
    getData(page, pageSize);
  })
  $('.next').on('click', function () {
    page++;
    var num = Math.ceil(all / pageSize);
    if (page > num) {
      alert('已经是最后一页了');
      page = num;
    }
    getData(page, pageSize);
  })
  $('.save').on('click', function () {
    var categoryName = $('.form-control').val();
    if (!categoryName || $.trim(categoryName) == "") {
      alert('请输入分类的名字');
      return;
    }
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: {
        categoryName: categoryName
      },
      success: function (res) {
        if (res.success) {
          // console.log(res);
          // getData(page, pageSize);
          // $('.cancel').click();
          // $('.form-control').val('');
          location.reload();
        }
      }
    });
  });
})

function getData(page, pageSize) {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    async: false,
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (res) {
      all = res.total;
      console.log(all);
      if (res.rows.length > 0) {
        var str = template('firstTem', res);
        $('.table-bordered tbody').html(str);
      }
    }
  });
}
