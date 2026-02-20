import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  function handleSubmit(e) {
    e.preventDefault()
    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    const message = document.getElementById('message').value.trim()
    const subject = 'Solicitud de planteamiento - ' + (name || 'Sin nombre')
    const body = 'Nombre: ' + name + '\nCorreo: ' + email + '\n\nMensaje:\n' + message
    window.location.href = 'mailto:consultora.automatizacion@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    e.target.reset()
  }

  return (
    <section id="contacto" className="section contact">
      <div className="container contact-inner" ref={ref}>
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2>Planteamiento del proceso</h2>
          <p>Escribe qué necesitas: proceso a automatizar, integraciones, datos o objetivos. Te enviamos por correo, <strong>gratis</strong>, una solución técnica y un planteamiento de arquitectura empresarial a tu medida.</p>
          <ul className="contact-meta">
            <li>Planteamiento gratuito por correo</li>
            <li>Solución técnica + arquitectura empresarial</li>
            <li>Respuesta en menos de 24 h · Sin compromiso</li>
            <li>El cobro se realiza al finalizar el trabajo acordado</li>
          </ul>
        </motion.div>
        <motion.form
          className="contact-form"
          id="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required placeholder="Tu nombre o el de tu empresa" />
          <label htmlFor="email">Correo</label>
          <input type="email" id="email" name="email" required placeholder="correo@ejemplo.com" />
          <label htmlFor="message">¿Qué necesitas? (proceso, integraciones, datos, objetivos)</label>
          <textarea id="message" name="message" rows="5" placeholder="Describe tu reto, proceso a automatizar o lo que quieres lograr. Con eso te enviamos por correo un planteamiento técnico y de arquitectura empresarial, gratis."></textarea>
          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Solicitar planteamiento gratuito
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
