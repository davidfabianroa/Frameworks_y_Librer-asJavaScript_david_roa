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
//puntos ganados
function puntuacion_gato(contar_dulces) {var gato = Number($('#score-text').text());
	switch (contar_dulces) {
		case 3:
			gato += 25;
			break;
		case 4:
			gato += 50;
			break;
		case 5:
			gato += 75;
			break;
		case 6:
			gato += 100;
			break;
		case 7:
			gato += 200;
	}
	$('#score-text').text(gato);
}

//aparece en patalla los caramelos
function caramelos_de_pantalla() {ajustar();}

function ajustar() {var top = 6;var clmn = $('[class^="col-"]');clmn.each(function () {var listo = $(this).children().length;
		var arriba = top - listo;for (var i = 0; i < arriba; i++) {var tipo_caramelo = numeros_azar(1, 5);
																	if (i === 0 && listo < 1) {	$(this).append('<img src="image/' + tipo_caramelo + '.png" class="element"></img>');
																	} else {$(this).find('img:eq(0)').before('<img src="image/' + tipo_caramelo + '.png" class="element"></img>');}
																  }
	});
	sumar();
	sumar_validaciones();
}

// borrar_vertical
function sumar_validaciones() {verificacion();verificacion_para_fila();
	if ($('img.delete').length !== 0) {
		eliminar_animaciones();	}
}
//efecto drag and drop
function sumar() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: movimiento_caramelos
	});
	$('img').droppable({
		drop: vaca
	});
	eventos_disponibles();
}

function desactivacion_cuenta() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function eventos_disponibles() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function movimiento_caramelos(event, solido) {
	solido.position.top = Math.minimo(100, solido.position.top);
	solido.position.bottom = Math.minimo(100, solido.position.bottom);
	solido.position.left = Math.minimo(100, solido.position.left);
	solido.position.right = Math.minimo(100, solido.position.right);
}
function vaca(event, solido) {var solido = $(solido.draggable);	var solido_ruta = solido.attr('src');	var drop = $(this);
	var drope_ruta = drop.attr('src');solido.attr('src', drope_ruta);drop.attr('src', solido_ruta);	setTimeout(function () {caramelos_de_pantalla();
		if ($('img.delete').length === 0) {candyDrag.attr('src', solido_ruta);drop.attr('src', drope_ruta);} 
		else {actualizar_mov();
		}}, 500);}

function resutados_caramelos(result) {if (result) {caramelos_de_pantalla();	}}
//puntuacion validar
function actualizar_mov() {	var actualValue = Number($('#movimientos-text').text());var result = actualValue += 1;
	$('#movimientos-text').text(result);}
//eliminacion de animaciones
function eliminar_animaciones() {desactivacion_cuenta();$('img.delete').effect('pulsate', 400);	$('img.delete')
		.animate({opacity: '0'}, {duration: 200})
		.animate({opacity: '0'	}, {duration: 300,
			complete: function () {	desaparecer_caramelos().then(resutados_caramelos).catch(mostrar_error);			},
			queue: true
		});}



