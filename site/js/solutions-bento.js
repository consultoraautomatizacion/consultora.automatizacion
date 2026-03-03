/**
 * Efecto tipo Mac en "Soluciones a la medida": la card central se agranda
 * cuando la sección llega a la mitad del viewport (flujo de scroll).
 */
(function () {
	"use strict";

	var section = document.querySelector(".solutions-two");
	if (!section) return;

	function checkCenterFocus() {
		var rect = section.getBoundingClientRect();
		var viewportMid = window.innerHeight * 0.5;
		var sectionMid = rect.top + rect.height * 0.5;
		var distance = Math.abs(sectionMid - viewportMid);
		// Activar cuando el centro de la sección está cerca del centro del viewport
		var inFocus = distance < window.innerHeight * 0.4;
		section.classList.toggle("solutions-two--center-focus", inFocus);
	}

	checkCenterFocus();
	window.addEventListener("scroll", checkCenterFocus, { passive: true });
	window.addEventListener("resize", checkCenterFocus);
})();
