import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="footer-top">
          <a href="#" className="logo">Consultora de <span>Automatización</span></a>
          <nav>
            <a href="#soluciones">Soluciones</a>
            <a href="#como-lo-hacemos">Proceso</a>
            <a href="#casos">Casos de uso</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Consultora de Automatización. Soluciones a la medida de automatización e inteligencia.</p>
        </div>
      </div>
    </motion.footer>
  )
}
