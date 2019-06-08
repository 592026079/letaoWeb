$.ajax({
	type: "get",
	url: "/employee/checkRootLogin",
	async: false,
	success: function (res) {
		if (res.error && res.error == 400) {
			location.href = "login.html";
			return;
		}
	}
});
$(function () {
	$('.login_out_bot').on('click', function () {

		if (!confirm('确定退出？')) return;
		$.ajax({
			type: "GET",
			url: "/employee/employeeLogout",
			success: function (res) {
				if (res.success) {
					location.href = 'login.html';
				}
			}
		});
	})


	var navLi = $('.navs li')

	navLi.on('click', function () {

		$(this).find('ul').slideToggle();

	});

});