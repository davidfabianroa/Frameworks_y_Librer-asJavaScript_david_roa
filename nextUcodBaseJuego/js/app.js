// JavaScript Document
// inicia el juego
$(function() {iniciar();});
function iniciar() {parpadear('h1.main-titulo');
	$('.btn-reinicio').click(function () {if ($(this).text() === 'Reiniciar') {location.reload(true);}
		caramelos_de_pantalla();$(this).text('Reiniciar');$('#timer').startTimer({onComplete: finalizar	})});
}
//funcion que permite destellos de color en el titulo
function parpadear(selector) {
	$(selector).animate({opacity: '1',}, {step: function () {$(this).css('color', 'white');},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'yellow');parpadear('h1.main-titulo');},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'white');	},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'yellow');},queue: true}, 600).delay(1000);}




