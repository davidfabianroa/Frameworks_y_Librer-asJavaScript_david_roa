// inicia el juego
function iniciar() {parpadear('h1.main-titulo');
	$('.btn-reinicio').click(function () {if ($(this).text() === 'Reiniciar') {location.reload(true);}
		caramelos_de_pantalla();$(this).text('Reiniciar');$('#timer').startTimer({onComplete: finalizar	})});
}


$(function() {iniciar();});

