import { motion } from 'framer-motion'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Tecnologías',
      icon: '💻',
      skills: [
        { name: 'Java Spring Boot', level: 95, color: 'from-orange-500 to-red-500' },
        { name: 'React.js', level: 92, color: 'from-blue-500 to-cyan-500' },
        { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400' },
        { name: 'Python', level: 88, color: 'from-green-500 to-yellow-500' },
        { name: 'SQL Optimization', level: 95, color: 'from-purple-500 to-pink-500' },
        { name: 'PHP', level: 85, color: 'from-indigo-500 to-purple-500' },
        { name: 'HTML/CSS', level: 90, color: 'from-orange-500 to-pink-500' }
      ]
    },
    {
      title: 'Multimedia',
      icon: '🎬',
      skills: [
        { name: 'Adobe Premiere Pro', level: 95, color: 'from-purple-600 to-blue-600' },
        { name: 'After Effects', level: 88, color: 'from-purple-500 to-purple-700' },
        { name: 'Fotografía 4K', level: 92, color: 'from-yellow-500 to-orange-500' },
        { name: 'Edición Profesional', level: 90, color: 'from-pink-500 to-red-500' },
        { name: 'Adobe Suite', level: 85, color: 'from-blue-500 to-purple-500' }
      ]
    },
    {
      title: 'Otros',
      icon: '🚀',
      skills: [
        { name: 'Inglés (Intermedio-Avanzado)', level: 85, color: 'from-blue-500 to-indigo-500' },
        { name: 'DevOps Básico', level: 80, color: 'from-green-500 to-teal-500' },
        { name: 'Cisco Networking', level: 85, color: 'from-blue-600 to-cyan-600' },
        { name: 'Gestión de Proyectos', level: 90, color: 'from-indigo-500 to-blue-500' },
        { name: 'Git/GitHub', level: 92, color: 'from-slate-600 to-slate-800' },
        { name: 'Big Data & Analytics', level: 80, color: 'from-purple-600 to-pink-600' }
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            💻 Habilidades Clave
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold gradient-text">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-primary-500">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-slate-200 dark:bg-dark-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1.5, 
                          delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3,
                          ease: "easeOut"
                        }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-8 p-4 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl border border-primary-500/20"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">
                    {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Promedio General
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                opacity: 0
              }}
              animate={{
                y: -100,
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute text-2xl opacity-20"
            >
              {['⚛️', '☕', '🐍', '💾', '🎨', '🚀', '⚡', '🔧'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills