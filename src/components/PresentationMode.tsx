import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Play, 
  Pause, 
  RotateCcw,
  Maximize,
  Download,
  Share2
} from 'lucide-react'

interface Slide {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  background?: string
  animation?: 'fade' | 'slide' | 'zoom' | 'flip'
}

const slides: Slide[] = [
  {
    id: 'intro',
    title: '👋 ¡Hola! Soy Juan Arturo Cruz',
    subtitle: 'Desarrollador Backend & Full Stack | Productor Multimedia',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    animation: 'fade',
    content: (
      <div className="text-center space-y-6">
        <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center text-6xl">
          🎓
        </div>
        <p className="text-xl opacity-90 max-w-2xl">
          Especializado en tecnologías backend con experiencia en Java Spring Boot, 
          React.js y producción multimedia profesional
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold">150+</div>
            <div className="opacity-80">Eventos Producidos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">3+</div>
            <div className="opacity-80">Años Experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">80%</div>
            <div className="opacity-80">Optimización SQL</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'skills',
    title: '💻 Stack Tecnológico',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    animation: 'slide',
    content: (
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Backend</h3>
          <div className="space-y-3">
            {[
              { tech: 'Java Spring Boot', level: 92 },
              { tech: 'Python', level: 88 },
              { tech: 'SQL Optimization', level: 95 },
              { tech: 'PHP', level: 85 }
            ].map((skill) => (
              <div key={skill.tech} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.tech}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-white rounded-full h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Frontend & Multimedia</h3>
          <div className="space-y-3">
            {[
              { tech: 'React.js + TypeScript', level: 90 },
              { tech: 'Three.js', level: 85 },
              { tech: 'Adobe Premiere Pro', level: 95 },
              { tech: 'Producción 4K', level: 92 }
            ].map((skill) => (
              <div key={skill.tech} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.tech}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-white rounded-full h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'experience',
    title: '🚀 Experiencia Profesional',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    animation: 'zoom',
    content: (
      <div className="space-y-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-2">Coqueta y Audaz</h3>
          <p className="text-lg opacity-90 mb-4">Desarrollador Backend • Jul 2022 - Jul 2025</p>
          <ul className="space-y-2 text-left">
            <li className="flex items-start space-x-2">
              <span className="text-yellow-300">⚡</span>
              <span>Optimización de consultas SQL con +80% mejora en rendimiento</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-300">🔧</span>
              <span>Automatización con jobs, triggers y procedimientos almacenados</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-300">🚀</span>
              <span>Integración continua, patrón MVVM y despliegues productivos</span>
            </li>
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-2">Producciones Foro 7</h3>
          <p className="text-lg opacity-90 mb-4">Fundador & Productor Multimedia • 2012 - Actualidad</p>
          <ul className="space-y-2 text-left">
            <li className="flex items-start space-x-2">
              <span className="text-purple-300">🎥</span>
              <span>150+ eventos sociales producidos con calidad profesional</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-pink-300">🏆</span>
              <span>Diplomado internacional en edición de video digital</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'contact',
    title: '📞 ¡Trabajemos Juntos!',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    animation: 'flip',
    content: (
      <div className="text-center space-y-8">
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          ¿Tienes un proyecto en mente? ¡Me encantaría ser parte de tu equipo y crear algo increíble juntos!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="text-4xl mb-3">📧</div>
            <h4 className="font-bold text-lg mb-2">Email</h4>
            <p className="text-sm opacity-80">foro7.producciones@hotmail.com</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="text-4xl mb-3">💼</div>
            <h4 className="font-bold text-lg mb-2">LinkedIn</h4>
            <p className="text-sm opacity-80">juanarturocruzarmenta</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="text-4xl mb-3">🌍</div>
            <h4 className="font-bold text-lg mb-2">Ubicación</h4>
            <p className="text-sm opacity-80">León, Guanajuato, México</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium opacity-90">
            "Apasionado por la tecnología y el arte visual. Mi meta es integrar ambas disciplinas para crear experiencias digitales memorables."
          </p>
        </div>
      </div>
    )
  }
]

interface PresentationModeProps {
  isOpen: boolean
  onClose: () => void
}

const PresentationMode = ({ isOpen, onClose }: PresentationModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && isOpen) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, isOpen, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          break
        case 'Escape':
          onClose()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, nextSlide, prevSlide, onClose])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const sharePresentation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Juan Arturo Cruz Armenta - Portafolio',
        text: 'Desarrollador Backend & Full Stack especializado en Java Spring Boot y React.js',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Show toast notification
    }
  }

  const downloadPDF = () => {
    // In a real implementation, you would generate a PDF
    // Downloading PDF presentation
  }

  if (!isOpen) return null

  const currentSlideData = slides[currentSlide]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Slide Content */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-white"
        style={{ background: currentSlideData.background }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ 
              opacity: 0,
              x: currentSlideData.animation === 'slide' ? 100 : 0,
              scale: currentSlideData.animation === 'zoom' ? 0.8 : 1,
              rotateY: currentSlideData.animation === 'flip' ? 90 : 0
            }}
            animate={{ 
              opacity: 1,
              x: 0,
              scale: 1,
              rotateY: 0
            }}
            exit={{ 
              opacity: 0,
              x: currentSlideData.animation === 'slide' ? -100 : 0,
              scale: currentSlideData.animation === 'zoom' ? 1.2 : 1,
              rotateY: currentSlideData.animation === 'flip' ? -90 : 0
            }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-8 text-center"
          >
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {currentSlideData.title}
            </motion.h1>
            {currentSlideData.subtitle && (
              <motion.p 
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl opacity-90 mb-8"
              >
                {currentSlideData.subtitle}
              </motion.p>
            )}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentSlideData.content}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
          <div className="text-white text-sm font-medium bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentSlide(0)}
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={sharePresentation}
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={downloadPDF}
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
          >
            <Download className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
          >
            <Maximize className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Slide Indicators */}
        <div className="flex items-center space-x-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-white"
        />
      </div>
    </motion.div>
  )
}

export default PresentationMode