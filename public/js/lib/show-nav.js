$(document).ready(function() {
	$(".navbar").hide();
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() > 300) {
				$('.navbar').show();
			} else {
				$('.navbar').hide();
			}
		});
	});
});