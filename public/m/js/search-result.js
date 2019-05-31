var page = 1;
var pageSize = 3;
var key = getParamsByUrl('keyword');
var str = '';
var priceSort = 1;
var numSort = 1;
var that;
$(function () {
  mui.init({
    pullRefresh: {
      container: '#refresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: true,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: getData
      }
    }
  });

  // $.ajax({
  //   type: "GET",
  //   url: "/product/queryProduct",
  //   data: {
  //     'page': page,
  //     'pageSize': pageSize,
  //     'proName': key
  //   },
  //   dataType: "json",
  //   success: function (res) {
  //     console.log(res);
  //     if (res.data.length > 0) {
  //       var str = template('listTem', res);
  //       $('#prodect-list').html(str);
  //     }
  //   }
  // });
  $('#price').on('tap', function () {
    priceSort = priceSort == 1 ? 2 : 1;
    str = '';
    page = 1;
    mui('#refresh').pullRefresh().refresh(true);
    getData();
  });
  $('#num').on('tap', function () {
    numSort = numSort == 1 ? 2 : 1;
    str = '';
    page = 1;
    mui('#refresh').pullRefresh().refresh(true);
    getData();
  })


})
// url 传入的地址栏
// key 需要获取的参数名(string);
// return 返回参数名称对应的参数值
function getParamsByUrl(key) {
  var obj = {};
  var url = location.search;
  var arr = url.substr(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < arr.length; i++) {
    var acc = arr[i].split('=');
    obj[acc[0]] = acc[1];
  }
  if (obj[key]) {
    return obj[key];
  }
  return obj;
}
function getData() {
  if (!that) {
    that = this;
  }
  $.ajax({
    type: "GET",
    url: "/product/queryProduct",
    data: {
      'page': page++,
      'pageSize': pageSize,
      'proName': key,
      'price': priceSort,
      'num': numSort
    },
    dataType: "json",
    success: function (res) {
      if (res.data.length > 0) {
        str += template('listTem', res);
        $('#prodect-list').html(str);
        that.endPullupToRefresh(false);
        return;
      }
      that.endPullupToRefresh(true);
    }
  });
} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
