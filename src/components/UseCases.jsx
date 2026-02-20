import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const rows = [
  {
    area: 'Finanzas',
    ml: 'Detección de anomalías en transacciones para prevención de fraude.',
    agentic: 'Conciliación bancaria automática y gestión de gastos de empleados.'
  },
  {
    area: 'RR.HH.',
    ml: 'Análisis de rotación y predicción de talento interno.',
    agentic: 'Onboarding de nuevos empleados y resolución autónoma de dudas.'
  },
  {
    area: 'Operaciones / Supply',
    ml: 'Mantenimiento predictivo de maquinaria crítica.',
    agentic: 'Optimización de rutas y reorden de inventario autónomo.'
  },
  {
    area: 'Ventas',
    ml: 'Scoring de leads y predicción de cierre de ventas.',
    agentic: 'Generación de propuestas comerciales (RFPs) y atención 24/7.'
  }
]

export default function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="casos" className="section use-cases">
      <div className="container" ref={ref}>
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Casos de uso por área
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Dónde aplicamos ML/MLOps y IA agéntica
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          Mismo negocio, dos palancas: predicción y optimización (ML) o agentes que actúan con tus sistemas (agéntica).
        </motion.p>
        <motion.div
          className="use-case-table-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <table className="use-case-table">
            <thead>
              <tr>
                <th>Área de negocio</th>
                <th>Caso de uso ML / MLOps</th>
                <th>Caso de uso IA agéntica</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.area}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                >
                  <td><strong>{row.area}</strong></td>
                  <td>{row.ml}</td>
                  <td>{row.agentic}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
