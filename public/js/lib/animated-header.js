$(function () {
	var AnimatedHeader = 60;
	$(window).scroll(function () {
		var scroll = getCurrentScroll();
		if (scroll >= AnimatedHeader) {
			$('.navbar-default').addClass('animated-nav-default');
			$('.navbar-brand').addClass('animated-nav-brand');
			$('.navbar-logo').addClass('animated-nav-logo');
		} else {
			$('.navbar-default').removeClass('animated-nav-default');
			$('.navbar-brand').removeClass('animated-nav-brand');
			$('.navbar-logo').removeClass('animated-nav-logo');
		}
	});
	function getCurrentScroll() {
		return window.pageYOffset;
	}
});