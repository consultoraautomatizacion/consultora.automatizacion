import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export default function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-bg"
        style={{ '--hero-bg-image': `url(${import.meta.env.BASE_URL}Auto.png)` }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <motion.div
        className="container hero-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-tag" variants={item}>Consultoría en automatización e IA</motion.p>
        <motion.h1 className="hero-title" variants={item}>
          <em>Trabajadores digitales</em> que resuelven problemas de negocio
        </motion.h1>
        <motion.p className="hero-subtitle" variants={item}>
          No vendemos solo tecnología: creamos agentes que razonan, usan tus sistemas (ERP, CRM, datos) y colaboran entre sí para resolver problemas complejos — a velocidad de máquina y 24/7. Resultados y menos fricción.
        </motion.p>
        <motion.div className="hero-cta" variants={item}>
          <a href="#contacto" className="btn btn-primary">Solicitar planteamiento del proceso</a>
          <a href="#soluciones" className="btn btn-secondary">Ver soluciones</a>
        </motion.div>
        <motion.div className="hero-stats" variants={item}>
          <div className="stat"><strong>Pilotajes con ROI</strong> 4–8 semanas, métricas claras</div>
          <div className="stat"><strong>Documentación y gobernanza</strong> arquitectura, trazabilidad, manuales</div>
          <div className="stat"><strong>Evolución a 6/12 meses</strong> de asistente a multi-agente</div>
        </motion.div>
      </motion.div>
    </section>
  )
}
