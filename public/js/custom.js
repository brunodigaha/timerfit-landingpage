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
        $('.scrollspy').scrollSpy();
        $("#send_mail").submit(function() {
            var name = $("#name").val();
            var email = $("#email").val();
            var message = $("#message").val();
            $.ajax({
                    type: "POST",
                    url: "https://mandrillapp.com/api/1.0/messages/send.json",
                    data: {
                        'key': 'hTCWCxrtRI6raHeWq1skgg',
                        'message': {
                            'from_name': name,
                            'from_email': email,
                            'headers': {
                                'Reply-To': email
                            },
                            'subject': '[Meu Treinamento] Estou interessado em saber mais sobre o sistema!',
                            'text': message,
                            'to': [{
                                'email': 'william-urias@hotmail.com',
                                'name': 'William Alonço',
                                'type': 'to'
                            }]
                        }
                    }
                })
                .done(function(response) {
                    Materialize.toast('Mensagem enviada com sucesso!', 3500);
                    $("#name").val('');
                    $("#email").val('');
                    $("#message").val('');
                })
                .fail(function(response) {
                    Materialize.toast('Erro ao enviar mensagem!', 3500);
                });
            return false;
        });
    });
})(jQuery);