import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="nav container">
        <a href="#" className="logo">Consultora de <span>Automatización</span></a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#soluciones" onClick={() => setMenuOpen(false)}>Soluciones</a></li>
          <li><a href="#como-lo-hacemos" onClick={() => setMenuOpen(false)}>Cómo lo hacemos</a></li>
          <li><a href="#casos" onClick={() => setMenuOpen(false)}>Casos de uso</a></li>
          <li><a href="#contacto" className="btn btn-nav" onClick={() => setMenuOpen(false)}>Planteamiento gratuito</a></li>
        </ul>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </motion.header>
  )
}
