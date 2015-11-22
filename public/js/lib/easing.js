$(document).ready(function() {
	$('a.nav-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 50)
		}, 1200, 'easeInOutExpo');
		event.preventDefault();
	});
});