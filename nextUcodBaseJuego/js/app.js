// JavaScript Document
// inicia el juego
$(function() {iniciar();});
function iniciar() {parpadear('h1.main-titulo');
	$('.btn-reinicio').click(function () {if ($(this).text() === 'Reiniciar') {location.reload(true);}
		caramelos_de_pantalla();$(this).text('Reiniciar');$('#timer').startTimer({onComplete: finalizar	})});
}
function parpadear(selector) {
	$(selector).animate({opacity: '1',}, {step: function () {$(this).css('color', 'white');},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'yellow');parpadear('h1.main-titulo');},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'white');	},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'yellow');},queue: true}, 600).delay(1000);}
// funcion de números al azar
function numeros_azar(minimo, maximo) {minimo = Math.ceil(minimo);maximo = Math.floor(maximo);return Math.floor(Math.random() * (maximo - minimo)) + minimo;}
// definicion de variables para filas  o columas
function obtener_arreglos(tipo, indice) {var clmna1 = $('.col-1').children();	var clmna2 = $('.col-2').children();var clmna3 = $('.col-3').children();var clmna4 = $('.col-4').children();var clmna5 = $('.col-5').children();var clmna6 = $('.col-6').children();var clmna7 = $('.col-7').children();
	var cantidad_clmnas = $([clmna1, clmna2, clmna3, clmna4,clmna5, clmna6, clmna7	]);
	if (typeof indice === 'number') {var fila_mod = $([clmna1.eq(indice), clmna2.eq(indice), clmna3.eq(indice),clmna4.eq(indice), clmna5.eq(indice), clmna6.eq(indice),clmna7.eq(indice)]);}
	else {indice = '';}
	if (tipo === 'clmns') {return cantidad_clmnas;} 
	else if (tipo === 'rows' && indice !== '') {return fila_mod;}}
// filas
function fila_modelos(indice) {
	var fila_mod = obtener_arreglos('rows', indice);return fila_mod;}
// colunmnas
function cantidad_clmnas(indice) {var clmna_modelos = obtener_arreglos('clmns');return clmna_modelos[indice];
}
//verificar si hay tres dulces del mismo tipo en línea
function verificacion() {
							for (var loco = 0; loco < 7; loco++) {
																		var dulces_pantalla = 0;var pos = [];var pos_auxiliar = [];var clmna_modelos = cantidad_clmnas(loco);var valor_retornado = clmna_modelos.eq(0);var guion = false;for (var i = 1; i < clmna_modelos.length; i++) {
																																	var ruta_retornada = valor_retornado.attr('src');var ruta_dulce = clmna_modelos.eq(i).attr('src');
																																	if (ruta_retornada != ruta_dulce) {	if (pos.length >= 3) {guion = true;	} else {pos = [];}dulces_pantalla = 0;}
																																	else {if (dulces_pantalla == 0) {if (!guion) {pos.push(i - 1);} else {	pos_auxiliar.push(i - 1);}}	if (!guion) {pos.push(i);} else {pos_auxiliar.push(i);}	dulces_pantalla += 1;}
																																	valor_retornado = clmna_modelos.eq(i);
																															   }
																		if (pos_auxiliar.length > 2) {pos = $.merge(pos, pos_auxiliar);	}
																		if (pos.length <= 2) {pos = [];}
																		contar_dulces = pos.length;
																		if (contar_dulces >= 3) {borrar_vertical(pos, clmna_modelos);puntuacion_gato(contar_dulces);}
																}
												}						
function borrar_vertical(pos, clmna_modelos) {for (var i = 0; i < pos.length; i++) {clmna_modelos.eq(pos[i]).addClass('delete');}}

// verificacion de eliminacion
function verificacion_para_fila() {
	for (var perro = 0; perro < 6; perro++) {var dulces_pantalla = 0;var pos = [];var pos_auxiliar = [];var fila_mod = fila_modelos(perro);var valor_retornado =fila_mod[0];var guion = false;
		for (var i = 1; i < fila_mod.length; i++) {
														var ruta_retornada = valor_retornado.attr('src');
														var ruta_dulce = fila_mod[i].attr('src');
														if (ruta_retornada != ruta_dulce) {	if (pos.length >= 3) {guion = true;	} else {pos = [];}dulces_pantalla = 0;}
														else {if (dulces_pantalla == 0) {if (!guion) {pos.push(i - 1);} else {pos_auxiliar.push(i - 1);}}if (!guion) {pos.push(i);} else {pos_auxiliar.push(i);}		dulces_pantalla += 1;}
														valor_retornado = fila_mod[i];
																					}
											if (pos_auxiliar.length > 2) {pos = $.merge(pos, pos_auxiliar);	}
											if (pos.length <= 2) {	pos = [];}
											contar_dulces = pos.length;
											if (contar_dulces >= 3) {horizontal_borrar(pos, fila_mod);puntuacion_gato(contar_dulces);}
								}
}
function horizontal_borrar(pos, fila_mod) {
	for (var i = 0; i < pos.length; i++) {
		fila_mod[pos[i]].addClass('delete');
	}
}

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
function mostrar_error(error) {console.log(error);
}

function desaparecer_caramelos() {
	return new Promise(function (rslv, reject) {
		if ($('img.delete').remove()) {
			rslv(true);
		} else {
			reject('imposible borrar..');
		}
	})
}

//terminar el juego
function finalizar() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
	
}