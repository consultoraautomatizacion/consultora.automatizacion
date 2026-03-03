# Formulario de contacto

El formulario de la página **Contacto** envía los mensajes mediante [Formspree](https://formspree.io) (gratis, sin backend propio).

## Configuración en 2 pasos

1. **Crea una cuenta en Formspree**
   - Entra en [https://formspree.io](https://formspree.io) y regístrate (gratis).
   - Crea un nuevo formulario y asocia tu email (consultora.automatizacion@gmail.com o el que uses).
   - Formspree te dará una URL como: `https://formspree.io/f/abcdexyz`.

2. **Pon tu ID en la web**
   - Abre `site/contact.html`.
   - Busca: `action="https://formspree.io/f/YOUR_FORM_ID"`.
   - Sustituye **YOUR_FORM_ID** por el ID de tu formulario (la parte que va después de `/f/` en la URL de Formspree).
   - Ejemplo: si tu URL es `https://formspree.io/f/myyzyqnp`, deja:  
     `action="https://formspree.io/f/myyzyqnp"`.

## Comportamiento

- Al enviar, el usuario ve **"Mensaje enviado. Te responderemos por correo en breve."** y el formulario se vacía.
- Si algo falla (sin configurar Formspree, sin red, etc.), se muestra un mensaje de error en español y el enlace a consultora.automatizacion@gmail.com como alternativa.
- Los campos **Nombre**, **Correo** y **¿Qué necesitas?** se envían a Formspree y tú recibes el correo con esos datos.

## Sin Formspree

Si no quieres usar Formspree, en la misma página hay el texto: *"Si el formulario no funciona, escríbenos a consultora.automatizacion@gmail.com"*, para que los visitantes puedan escribir por correo directamente.
