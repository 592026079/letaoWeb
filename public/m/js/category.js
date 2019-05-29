$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  var getSecond = (id) => {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        'id': id
      },
      dataType: "json",
      success: function (res) {
        if (res.rows.length <= 0) {
          $('#second').html('<div class="nores">暂无数据</div>');
          return;
        }
        var str = template('secondTem', res);
        $('#second').html(str);
      }
    });
  }
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (res) {
      if (res.rows.length > 0) {
        var str = template('linksTem', res);
        $('.links').html(str);
        $('.links').find('a').eq(0).addClass('active');
        var id = res.rows[0].id;
        getSecond(id);
      }
    }
  });

  $('#links').on('click', 'a', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var id = $(this).attr('data-id');
    getSecond(id);
  });
})