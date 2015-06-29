(function($) {
	$(function() {
		$('.button-collapse').sideNav({
			'edge': 'left'
		});
		$('.outer a').on("click", function() {
			$('.inner').slideToggle(300, function() {
				$('.inner .card').show(100);
			});
		});
	});
})(jQuery);