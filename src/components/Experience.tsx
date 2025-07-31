import { motion } from 'framer-motion'
import { Calendar, MapPin, TrendingUp } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      company: 'Coqueta y Audaz',
      position: 'Desarrollador Backend',
      period: 'Julio 2022 – Julio 2025',
      location: 'Remoto',
      achievements: [
        'Optimización de consultas SQL (+80% rendimiento)',
        'Automatización con jobs, triggers y procedimientos',
        'Integración continua, patrón MVVM y despliegues productivos',
        'Implementación de arquitecturas escalables'
      ],
      tech: ['Java', 'Spring Boot', 'SQL', 'MVVM', 'CI/CD'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      company: 'Producciones Foro 7',
      position: 'Fundador & Productor Multimedia',
      period: 'Desde 2012 – Actualidad',
      location: 'León, Guanajuato',
      achievements: [
        'Dirección y postproducción de más de 150 eventos sociales',
        'Edición profesional con Adobe Suite (Diplomado internacional)',
        'Gestión integral de clientes, logística y entrega visual',
        'Crecimiento sostenido durante 12+ años'
      ],
      tech: ['Adobe Premiere', 'After Effects', 'Fotografía 4K', 'Gestión'],
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            📌 Experiencia Relevante
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div className={`glass-effect p-8 rounded-2xl border-l-4 border-gradient bg-gradient-to-r ${exp.color} border-opacity-50 hover:shadow-2xl transition-all duration-300`}>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <motion.h3 
                      whileHover={{ scale: 1.02 }}
                      className="text-2xl font-bold gradient-text mb-2"
                    >
                      {exp.company}
                    </motion.h3>
                    
                    <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      {exp.position}
                    </h4>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: (index * 0.2) + (achievementIndex * 0.1) }}
                          className="flex items-start space-x-3"
                        >
                          <TrendingUp className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Tecnologías</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (index * 0.2) + (techIndex * 0.05) }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 bg-gradient-to-r ${exp.color} bg-opacity-10 rounded-xl text-center`}
                    >
                      <div className="text-lg font-bold gradient-text">
                        {index === 0 ? '3+' : '12+'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Años de Experiencia
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience