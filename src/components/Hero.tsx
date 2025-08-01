import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Download } from 'lucide-react'
import { AnimatedCounter, FloatingElement, MorphingShape } from './AdvancedAnimations'

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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" role="banner" aria-labelledby="hero-title">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <FloatingElement duration={8} yOffset={-30}>
          <MorphingShape className="top-20 left-20 w-32 h-32 opacity-60" />
        </FloatingElement>
        <FloatingElement duration={12} yOffset={20}>
          <MorphingShape className="top-1/2 right-20 w-24 h-24 opacity-40" />
        </FloatingElement>
        <FloatingElement duration={10} yOffset={-15}>
          <MorphingShape className="bottom-20 left-1/3 w-28 h-28 opacity-50" />
        </FloatingElement>
        
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
              id="hero-title"
              className="text-6xl md:text-8xl lg:text-9xl font-black gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="Juan Arturo Cruz, Desarrollador Full Stack"
            >
              <span role="img" aria-label="graduación">🎓</span> JUAN
            </motion.h1>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-hidden="true"
            >
              ARTURO CRUZ
            </motion.h1>
          </motion.div>

          {/* Typing Animation */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-4 h-20 flex items-center justify-center" aria-live="polite">
              <span className="border-r-2 border-primary-500 pr-2 animate-pulse" aria-label="Descripción profesional">
                {text}
              </span>
            </h2>
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants} className="mb-8">
            <address className="flex items-center justify-center space-x-2 text-lg text-slate-500 dark:text-slate-400 not-italic">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <span>León, Guanajuato, México</span>
            </address>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mb-12" role="region" aria-label="Estadísticas profesionales">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center glass-effect p-6 rounded-2xl"
                role="group"
                aria-labelledby="eventos-label"
              >
                <div className="text-3xl font-bold gradient-text" aria-label="150 eventos producidos">
                  <AnimatedCounter from={0} to={150} suffix="+" />
                </div>
                <div id="eventos-label" className="text-sm text-slate-500 dark:text-slate-400">Eventos Producidos</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center glass-effect p-6 rounded-2xl"
                role="group"
                aria-labelledby="experiencia-label"
              >
                <div className="text-3xl font-bold gradient-text" aria-label="5 años de experiencia">
                  <AnimatedCounter from={0} to={5} suffix="+" />
                </div>
                <div id="experiencia-label" className="text-sm text-slate-500 dark:text-slate-400">Años Experiencia</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center glass-effect p-6 rounded-2xl"
                role="group"
                aria-labelledby="optimizacion-label"
              >
                <div className="text-3xl font-bold gradient-text" aria-label="80% de optimización SQL">
                  <AnimatedCounter from={0} to={80} suffix="%" />
                </div>
                <div id="optimizacion-label" className="text-sm text-slate-500 dark:text-slate-400">Optimización SQL</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Bar Preview */}
          <motion.div variants={itemVariants} className="mb-12" role="region" aria-labelledby="skills-title">
            <h3 id="skills-title" className="text-lg font-semibold mb-6 text-slate-700 dark:text-slate-300">
              Tecnologías Principales
            </h3>
            <div className="space-y-3 max-w-2xl mx-auto" role="list">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                  className="flex items-center space-x-4"
                  role="listitem"
                >
                  <span className="text-sm font-medium w-20 text-left" id={`skill-${index}`}>{skill.name}</span>
                  <div className="flex-1 bg-slate-200 dark:bg-dark-700 rounded-full h-2" role="progressbar" aria-labelledby={`skill-${index}`} aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1.5 }}
                      className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full neon-glow"
                    />
                  </div>
                  <span className="text-sm font-medium w-10 text-right" aria-hidden="true">{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="mb-12" role="navigation" aria-label="Acciones principales">
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-full shadow-lg neon-glow hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                aria-label="Ir a la sección de contacto"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                <span>Contáctame</span>
              </motion.a>
              
              <motion.a
                href="./cv-juan-arturo-cruz.html"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-effect border-2 border-primary-500 text-primary-500 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center space-x-2"
                aria-label="Ver currículum vitae en nueva ventana"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span>Ver CV</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} role="navigation" aria-label="Enlaces a redes sociales">
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com/ArturoCruzArm"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-effect rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
                aria-label="Visitar perfil de GitHub"
              >
                <Github className="w-6 h-6" aria-hidden="true" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/juanarturocruzarmenta"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-effect rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
                aria-label="Visitar perfil de LinkedIn"
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </motion.a>
              
              <motion.a
                href="mailto:foro7.producciones@hotmail.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-effect rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                aria-label="Enviar correo electrónico"
              >
                <Mail className="w-6 h-6" aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            aria-label="Desplazar hacia abajo para ver más contenido"
            role="button"
            tabIndex={0}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center" aria-hidden="true">
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