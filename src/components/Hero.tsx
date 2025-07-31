import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Download } from 'lucide-react'

const Hero = () => {
  const [text, setText] = useState('')
  const fullText = 'Desarrollador Backend & Full Stack | Productor Multimedia | Emprendedor Creativo'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Java Spring', level: 92 },
    { name: 'Python', level: 88 },
    { name: 'Three.js', level: 85 }
  ]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              🎓 JUAN
            </motion.h1>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ARTURO CRUZ
            </motion.h1>
          </motion.div>

          {/* Typing Animation */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-4 h-20 flex items-center justify-center">
              <span className="border-r-2 border-primary-500 pr-2 animate-pulse">
                {text}
              </span>
            </h2>
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-center space-x-2 text-lg text-gray-500 dark:text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>León, Guanajuato, México</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center glass-effect p-6 rounded-2xl"
              >
                <div className="text-3xl font-bold gradient-text">150+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Eventos Producidos</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center glass-effect p-6 rounded-2xl"
              >
                <div className="text-3xl font-bold gradient-text">3+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Años Experiencia</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center glass-effect p-6 rounded-2xl"
              >
                <div className="text-3xl font-bold gradient-text">80%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Optimización SQL</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Bar Preview */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-lg font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Tecnologías Principales
            </h3>
            <div className="space-y-3 max-w-2xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                  className="flex items-center space-x-4"
                >
                  <span className="text-sm font-medium w-20 text-left">{skill.name}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1.5 }}
                      className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full neon-glow"
                    />
                  </div>
                  <span className="text-sm font-medium w-10 text-right">{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-full shadow-lg neon-glow hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Contáctame</span>
              </motion.a>
              
              <motion.a
                href="/cv-juan-arturo-cruz.html"
                target="_blank"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-effect border-2 border-primary-500 text-primary-500 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Ver CV</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com/ArturoCruzArm"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-effect rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/juanarturocruzarmenta"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-effect rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href="mailto:foro7.producciones@hotmail.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-effect rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary-500 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero