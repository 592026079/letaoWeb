$(function () {
  var hisArr = [];
  $('#search').on('click', function () {
    var keyword = $('#keywords').val();
    if (!keyword) {
      alert('请输入关键字');
      return;
    }
    // console.log(hisArr);
    hisArr.push(keyword);
    localStorage.setItem('search-history', JSON.stringify(hisArr));
    location.href = "search-result.html?keyword=" + keyword;
  });
  $('#clear-history').on('click', function () {
    if (localStorage.getItem('search-history')) {
      if (confirm('确认删除？')) {
        $('#history-bottom').html('');
        localStorage.removeItem('search-history');
      }

    } else {
      alert('没历史记录啊');
    }
  });

  $('#history-bottom').on('click', 'span', function () {
    if (localStorage.getItem('search-history')) {
      if (confirm('确认删除？')) {
        hisArr = JSON.parse(localStorage.getItem('search-history'));
        var id = parseInt($(this).parents('li').attr('data-id'));
        $(this).parents('li').remove();
        hisArr.splice(id, 1);
        localStorage.setItem('search-history', JSON.stringify(hisArr));
      }

    } else {
      alert('没历史记录啊');
    }
  });
  // 实现用户点击搜索 跳转搜索结果页

  if (localStorage.getItem('search-history')) {
    var hisArr = JSON.parse(localStorage.getItem('search-history'));
    var str1 = template('hisTem', { data: hisArr })
    $('#history-bottom').html(str1);
  }
})