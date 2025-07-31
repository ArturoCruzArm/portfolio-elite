import { motion } from 'framer-motion'
import { GraduationCap, Award, Clock, Star } from 'lucide-react'

const Education = () => {
  const education = [
    {
      institution: 'Universidad Virtual del Estado de Guanajuato (UVEG)',
      degree: 'Licenciatura en Sistemas Computacionales',
      specialty: 'Especialidad en Big Data y Análisis de Datos',
      status: 'En curso',
      completion: 'Octubre 2025',
      icon: '🎓',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      institution: 'Instituto Tecnológico de León (ITL)',
      degree: 'Ingeniería en Sistemas Computacionales',
      specialty: 'Carrera completa',
      status: 'Completado',
      completion: '2016 - 2021',
      icon: '🏢',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const certifications = [
    { name: 'Técnico en Informática', org: 'Fundación Carlos Slim', year: '2023' },
    { name: 'Curador de Datos', org: 'Fundación Carlos Slim', year: '2023' },
    { name: 'Desarrollador Web', org: 'Fundación Carlos Slim', year: '2023' },
    { name: 'Desarrollador de Contenido Digital', org: 'Fundación Carlos Slim', year: '2023' },
    { name: 'Asistente Web', org: 'Certificación Profesional', year: '2023' },
    { name: 'Java Programming', org: 'SoloLearn', year: '2023' },
    { name: 'JavaScript', org: 'SoloLearn', year: '2023' },
    { name: 'Python Core', org: 'SoloLearn', year: '2023' },
    { name: 'PHP', org: 'SoloLearn', year: '2023' },
    { name: 'SQL', org: 'SoloLearn', year: '2023' },
    { name: 'HTML', org: 'SoloLearn', year: '2023' },
    { name: 'CSS', org: 'SoloLearn', year: '2023' },
    { name: 'jQuery', org: 'SoloLearn', year: '2023' },
    { name: 'C Programming', org: 'SoloLearn', year: '2023' },
    { name: 'C++', org: 'SoloLearn', year: '2023' },
    { name: 'C#', org: 'SoloLearn', year: '2023' },
    { name: 'Ruby', org: 'SoloLearn', year: '2023' },
    { name: 'Swift 4', org: 'SoloLearn', year: '2023' },
    { name: 'Ofimática', org: 'Certificación Profesional', year: '2023' },
    { name: 'Cisco Networking (VLANs, Routing)', org: 'Cisco Academy', year: '2023' },
    { name: 'Edición de Video Digital', org: 'Diplomado Internacional', year: '2022' },
    { name: 'Educación Financiera', org: 'Gobierno de México', year: '2024', grade: '9/10' }
  ]

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            🎓 Formación Académica
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Education */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect p-8 rounded-2xl relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${edu.color} opacity-5`}></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{edu.icon}</div>
                
                <h3 className="text-xl font-bold gradient-text mb-2">
                  {edu.institution}
                </h3>
                
                <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {edu.degree}
                </h4>
                
                {edu.specialty && (
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                    {edu.specialty}
                  </p>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{edu.completion}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{edu.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-effect p-8 rounded-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold gradient-text mb-4">
              🏅 Certificaciones Técnicas
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Formación continua y especialización en tecnologías actuales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-dark-600 hover:border-primary-500 transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {cert.org}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-500 font-medium">
                        {cert.year}
                      </span>
                      {cert.grade && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs font-medium text-yellow-600">
                            {cert.grade}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl border border-primary-500/20 text-center"
          >
            <h4 className="text-xl font-bold gradient-text mb-2">
              Aprendizaje Continuo
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              Comprometido con la actualización constante en tecnologías emergentes y mejores prácticas de desarrollo
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education