import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Zap } from 'lucide-react'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import CustomCursor from './components/Cursor'
import ThemeCustomizer from './components/ThemeCustomizer'
import PresentationMode from './components/PresentationMode'
import SEOHead from './components/SEOHead'
import { usePerformance } from './hooks/usePerformance'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

// Lazy loading para componentes pesados
const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))
const MatrixRain = lazy(() => import('./components/MatrixRain'))
const ThreeScene = lazy(() => import('./components/ThreeScene'))

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isLoading, setIsLoading] = useState(true)
  const [currentTheme, setCurrentTheme] = useState('Elite Blue')
  const [presentationMode, setPresentationMode] = useState(false)
  const [liteMode, setLiteMode] = useState(false)
  
  const performance = usePerformance()

  const navigation = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Experiencia', href: '#experience' },
    { name: 'Educación', href: '#education' },
    { name: 'Contacto', href: '#contact' },
  ]

  const { announceToScreenReader } = useKeyboardNavigation(navigation)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Auto-activar modo lite en dispositivos de bajos recursos
    const savedLiteMode = localStorage.getItem('liteMode')
    if (savedLiteMode === 'true' || performance.isLowEnd) {
      setLiteMode(true)
    }

    // Loading animation - más rápido en dispositivos lentos
    const loadingTime = performance.isLowEnd ? 1000 : 2000
    setTimeout(() => setIsLoading(false), loadingTime)

    // Intersection Observer for active section
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [performance.isLowEnd])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const toggleLiteMode = () => {
    setLiteMode(!liteMode)
    localStorage.setItem('liteMode', (!liteMode).toString())
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dark-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mt-4"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg font-semibold gradient-text"
          >
            Cargando experiencia elite...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <SEOHead />
      <CustomCursor />
      <div className="bg-white dark:bg-dark-900 text-slate-900 dark:text-white">
        {/* Matrix Background - Solo si no está en modo lite */}
        {!liteMode && !performance.shouldReduceAnimations && (
          <ErrorBoundary fallback={<div />}>
            <Suspense fallback={<div />}>
              <MatrixRain />
            </Suspense>
          </ErrorBoundary>
        )}
        
        {/* 3D Background - Solo si soporta WebGL y no está en modo lite */}
        {!liteMode && performance.supportsWebGL && !performance.shouldReduceAnimations && (
          <div className="fixed inset-0 z-0 opacity-30">
            <ErrorBoundary fallback={<div />}>
              <Suspense fallback={<div />}>
                <ThreeScene />
              </Suspense>
            </ErrorBoundary>
          </div>
        )}

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 w-full z-40 glass-effect backdrop-blur-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold gradient-text"
              >
                Juan Arturo Cruz
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: performance.shouldReduceAnimations ? 1 : 1.1 }}
                    whileTap={{ scale: performance.shouldReduceAnimations ? 1 : 0.95 }}
                    onClick={() => {
                      scrollToSection(item.href)
                      announceToScreenReader(`Navegando a ${item.name}`)
                    }}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary-500 ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary-500 text-white neon-glow'
                        : 'hover:bg-primary-100 dark:hover:bg-primary-900/20'
                    }`}
                    aria-label={`Ir a la sección ${item.name} (Atajo: ${index + 1})`}
                    aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                  >
                    <span aria-hidden="true">{index + 1}.</span> {item.name}
                  </motion.button>
                ))}
              </div>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPresentationMode(true)}
                  className="hidden md:flex p-2 rounded-lg bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors items-center gap-2 text-sm"
                >
                  <i className="fas fa-presentation"></i>
                  Presentación
                </motion.button>

                {/* Performance Status & Lite Mode Toggle */}
                <div className="hidden md:flex items-center space-x-2">
                  {performance.isLowEnd && (
                    <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Auto-optimizado
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleLiteMode}
                    className={`p-2 rounded-lg transition-colors text-xs ${
                      liteMode 
                        ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300' 
                        : 'bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700'
                    }`}
                    title={liteMode ? 'Modo Lite Activo - Mejor rendimiento' : 'Activar Modo Lite'}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-dark-800"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden glass-effect"
              >
                <div className="px-4 py-2 space-y-2">
                  {navigation.map((item) => (
                    <motion.button
                      key={item.name}
                      whileHover={{ x: 10 }}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-3 py-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Main Content */}
        <main id="main-content" className="relative z-10" role="main">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="lg" text="Cargando sección..." />}>
              <Hero />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="md" text="Cargando sobre mí..." />}>
              <About />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="md" text="Cargando habilidades..." />}>
              <Skills />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="md" text="Cargando experiencia..." />}>
              <Experience />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="md" text="Cargando educación..." />}>
              <Education />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner size="md" text="Cargando contacto..." />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-30 p-3 bg-primary-500 text-white rounded-full shadow-lg neon-glow hover:bg-primary-600 transition-colors"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↑
          </motion.div>
        </motion.button>

        {/* Theme Customizer */}
        <ThemeCustomizer 
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        {/* Presentation Mode */}
        <PresentationMode
          isOpen={presentationMode}
          onClose={() => setPresentationMode(false)}
        />

        {/* Keyboard Navigation Helper */}
        <div className="fixed bottom-4 left-4 z-30 text-xs text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-lg p-2 max-w-xs">
          <div className="font-medium mb-1">⌨️ Navegación por teclado:</div>
          <div>• Teclas 1-6: Ir a secciones</div>
          <div>• Alt + ↑/↓: Navegar</div>
          <div>• ?: Ayuda completa</div>
        </div>

        {/* Skip Link para accesibilidad */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Saltar al contenido principal
        </a>
      </div>
    </div>
  )
}

export default App
