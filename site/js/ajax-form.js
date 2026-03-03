$(function() {

	var form = $('#contact-form');
	if (!form.length) return;

	var formMessages = $('.ajax-response');
	var btn = form.find('button[type="submit"]');
	var btnOriginalText = btn.text();

	form.on('submit', function(e) {
		e.preventDefault();

		var action = form.attr('action');
		if (!action || action.indexOf('YOUR_FORM_ID') !== -1) {
			$(formMessages).removeClass('success').addClass('error');
			$(formMessages).text('Configura el formulario: en contact.html sustituye YOUR_FORM_ID por tu ID de Formspree (formspree.io).');
			return;
		}

		var formData = form.serialize();

		btn.prop('disabled', true).text('Espera...');
		$(formMessages).removeClass('success error').text('');

		$.ajax({
			type: 'POST',
			url: action,
			data: formData,
			dataType: 'json',
			headers: { 'Accept': 'application/json' }
		})
		.done(function() {
			$(formMessages).removeClass('error').addClass('success');
			$(formMessages).text('Mensaje enviado. Te responderemos por correo en breve.');
			form.find('#cname, #cemail, #cmessage').val('');
		})
		.fail(function(xhr) {
			$(formMessages).removeClass('success').addClass('error');
			if (xhr.status === 0 || xhr.status === 404) {
				$(formMessages).text('No se pudo enviar. Comprueba que hayas sustituido YOUR_FORM_ID en contact.html por tu ID de Formspree, o escríbenos a consultora.automatizacion@gmail.com');
			} else {
				$(formMessages).text('No se pudo enviar el mensaje. Prueba a escribirnos a consultora.automatizacion@gmail.com');
			}
		})
		.always(function() {
			btn.prop('disabled', false).text(btnOriginalText);
		});
	});

});
