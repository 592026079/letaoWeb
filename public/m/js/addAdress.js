$(function () {
  var isEdit = parseInt(getParamsByUrl('isEdit'));
  if (isEdit) {
    if (localStorage.getItem('data')) {
      var data = JSON.parse(localStorage.getItem('data'));
      $('.mui-title').html('编辑收货地址');
      console.log(data);
      $('#recipients').val(data.recipients);
      $('#postcode').val(data.postCode);
      $('#address').val(data.address);
      $('#addressDetail').val(data.addressDetail);
    }
  } else {
    $('#recipients').val('');
    $('#postcode').val('');
    $('#address').val('');
    $('#addressDetail').val('');
  }
  var picker = new mui.PopPicker({ layer: 3 });
  picker.setData(cityData);
  $('#address').on('tap', function () {
    picker.show((s) => {
      $(this).val(s[0].text + s[1].text + s[2].text);
    })
  })
  $('.mui-btn-primary').on('tap', function () {
    var that = $(this);
    that.attr('disabled', true);
    var recipients = $('#recipients').val();
    var postcode = $('#postcode').val();
    var address = $('#address').val();
    var addressDetail = $('#addressDetail').val();
    if (!recipients || $.trim(recipients) == '') {
      mui.toast('请输入收货人姓名');
      return;
    }
    if (!postcode || $.trim(postcode) == '') {
      mui.toast('请输入邮编');
      return;
    }
    if (!address || $.trim(address) == '') {
      mui.toast('请输入省市区');
      return;
    }
    if (!addressDetail || $.trim(addressDetail) == '') {
      mui.toast('请输入具体地址');
      return;
    }
    var url;
    var data1 = {
      'recipients': recipients,
      'postcode': postcode,
      'address': address,
      'addressDetail': addressDetail
    }
    if (isEdit) {
      url = '/address/updateAddress';
      data1.id = data.id;
    } else {
      url = "/address/addAddress";
    }
    $.ajax({
      type: "POST",
      url: url,
      data: data1,
      success: function (res) {
        if (res.success) {
          if (isEdit) {
            mui.toast('修改成功');
            localStorage.removeItem('data');
          } else {
            mui.toast('添加成功');
          }
          setTimeout(() => {
            that.attr('disabled', false);
            location.href = 'adress.html';
          }, 2000);
          return;
        }
        mui.toast(res.message);
        that.attr('disabled', false);
      }
    });
  })




})