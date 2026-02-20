(function () {
  'use strict';

  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const contactForm = document.getElementById('contact-form');

  // Header con scroll
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-label',
        navLinks.classList.contains('open') ? 'Cerrar menú' : 'Abrir menú'
      );
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // Formulario de contacto: abre el cliente de correo enviando a gabyordgue@gmail.com
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = 'Contacto web - ' + (name || 'Sin nombre');
      const body = 'Nombre: ' + name + '\nCorreo: ' + email + '\n\nMensaje:\n' + message;
      const mailto = 'mailto:gabyordgue@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
      contactForm.reset();
    });
  }
})();
