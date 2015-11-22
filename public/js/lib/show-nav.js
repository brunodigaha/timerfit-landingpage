$(document).ready(function() {

	var header = $('.header').height();

	$(".navbar").hide();

	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() >= header - (header * 5.3) / 100) {
				$('.navbar').fadeIn();
			} else {
				$('.navbar').fadeOut();
			}
		});

	});
});