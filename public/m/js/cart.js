$(function () {
  var page = 1;
  var pageSize = 5;
  $.ajax({
    type: "get",
    url: "/cart/queryCartPaging",
    data: {
      'page': page,
      'pageSize': pageSize
    },
    success: function (res) {
      console.log(res)
      if (res.data.length > 0) {
        var str = template('cartTem', res);
        $('.mui-table-view').html(str);
      }
    }
  });
})