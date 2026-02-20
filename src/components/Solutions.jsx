import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const solutions = [
  {
    icon: '◆',
    title: 'IA agéntica (LLMs)',
    intro: 'Agentes que no solo responden: actúan. Resuelven incidencias, redactan propuestas y gestionan procesos de principio a fin.',
    items: [
      'Soporte y helpdesks: IT, RR.HH. — diagnostican, resuelven o escalan con contexto.',
      'Ventas: automatización de RFPs (de días a horas), cualificación de leads y comunicaciones personalizadas.',
      'Finanzas: procesamiento de facturas, validación de gastos, conciliación que cruza datos y actualiza el ERP.'
    ]
  },
  {
    icon: '◇',
    title: 'ML y MLOps',
    intro: 'Predicción y optimización a escala. El valor está en anticipar fallos, fraude y demanda.',
    items: [
      'Mantenimiento predictivo: sensores y datos para predecir fallos en maquinaria o flotas.',
      'Detección de fraude y cumplimiento: monitorización en tiempo real, patrones sospechosos y alertas.',
      'Cadena de suministro: rutas dinámicas (clima, tráfico), predicción de stock y órdenes de compra automáticas.'
    ]
  },
  {
    icon: '◈',
    title: 'Automatizaciones híbridas',
    intro: 'Combinan agentes conversacionales, ML predictivo y flujos de automatización en un solo proceso.',
    items: [
      'Ejemplo: agente analiza clima (IA), consulta histórico de averías (ML), programa técnicos en campo (automatización).',
      'Orquestación de trabajadores digitales que aprenden y mejoran con tu operación.'
    ]
  }
]

export default function Solutions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="soluciones" className="section solutions">
      <div className="container" ref={ref}>
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Servicios y casos de uso
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          El «qué»: tecnología traducida en soluciones de negocio
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          Catálogo por tipo de solución. Cada una se adapta a tu industria y a tus sistemas (ERP, CRM, BBDD).
        </motion.p>
        <div className="cards cards--stack">
          {solutions.map((card, i) => (
            <motion.article
              key={card.title}
              className="card"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p className="card-intro">{card.intro}</p>
              <ul className="card-list">
                {card.items.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
