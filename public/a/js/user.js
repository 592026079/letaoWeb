$(function () {

  var page = 1;
  var pageSize = 5;
  $.ajax({
    type: "get",
    url: "/user/queryUser",
    data: {
      'page': page,
      'pageSize': pageSize
    },
    success: function (res) {
      console.log(res);
      if (res.total > 0) {
        var str = template('userTem', res);
        $('.table-bordered tbody').append(str);
      }
    }
  });
  $('.table-bordered').on('click', '.btn', function () {
    var id = $(this).attr('data-id');
    var isDelete = parseInt($(this).attr('data-isDelete'));
    $.ajax({
      type: "POST",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (res) {
        if (res.success) {
          location.reload();
        }
      }
    });
  });
})