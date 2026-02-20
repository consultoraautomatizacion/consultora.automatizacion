import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Descubrimiento y dolor',
    text: 'Identificamos tu dolor: tiempos perdidos, errores, cuellos de botella. Definimos qué automatizar o predecir primero y con qué métricas medir el éxito.'
  },
  {
    num: '02',
    title: 'Diseño y pilotaje por valor',
    text: 'Propuesta de flujos, agentes e integraciones. Pilotaje de 4–8 semanas en un área concreta con métricas claras: antes (tiempo, errores, coste) vs después (resolución autónoma, precisión, ROI).'
  },
  {
    num: '03',
    title: 'Implementación y entregables',
    text: 'Desarrollo, pruebas y puesta en marcha. Entregamos documentación técnica y de arquitectura (diagramas C4/UML), diseño del agente (rol, herramientas, objetivos), manuales de usuario y runbooks de operaciones.'
  },
  {
    num: '04',
    title: 'Trazabilidad, gobernanza y evolución',
    text: 'Auditoría de decisiones (logs, chain-of-thought), guardrails de seguridad y ética. Roadmap a 6/12 meses: de agente asistente a autónomo con supervisión por excepción y multi-agente.'
  }
]

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="como-lo-hacemos" className="section process">
      <div className="container" ref={ref}>
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Cómo lo hacemos
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          De «herramienta» a trabajador digital con resultados medibles
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          Pilotajes con ROI, documentación que genera confianza y una estrategia de evolución a medio plazo.
        </motion.p>
        <div className="process-grid">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="process-step"
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
            >
              <span className="step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
