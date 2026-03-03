/**
 * Fuerza que la rueda del ratón siempre mueva el documento: después de bajar, se puede volver a subir.
 * Intercepta todo el scroll hacia arriba y lo aplica al documento para evitar que quede bloqueado.
 */
(function () {
	"use strict";

	function getScrollTop() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	}

	function setScrollTop(value) {
		window.scrollTo(0, value);
		document.documentElement.scrollTop = value;
		document.body.scrollTop = value;
	}

	document.addEventListener(
		"wheel",
		function (e) {
			// Solo scroll hacia arriba
			if (e.deltaY >= 0) return;

			var scrollTop = getScrollTop();
			if (scrollTop <= 0) return;

			// Interceptar y mover nosotros el scroll (evita que otro elemento lo bloquee)
			e.preventDefault();
			e.stopPropagation();

			var step = Math.min(scrollTop, Math.max(80, Math.abs(e.deltaY)));
			setScrollTop(scrollTop - step);
		},
		{ passive: false, capture: true }
	);
})();
