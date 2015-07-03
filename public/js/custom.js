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

function sendMail() {
	$.ajax({
		type: 'POST',
		url: 'https://mandrillapp.com/api/1.0/messages/send.json',
		data: {
			'key': 'hTCWCxrtRI6raHeWq1skgg',
			'message': {
				'from_email': 'your@email.here',
				'to': [{
					'email': 'william-urias@hotmail.com',
					'name': 'William Alonço',
					'type': 'to'
				}],
				'autotext': 'true',
				'subject': 'Inscrição',
				'html': 'Exemplo de conteúdo'
			}
		}
	}).done(function(response) {
		console.log(response);
	});
}