import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Settings, X, Sun, Moon, Monitor, Sparkles, Zap, Waves } from 'lucide-react'

interface Theme {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  icon: React.ReactNode
}

const themes: Theme[] = [
  {
    name: 'Elite Blue',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    icon: <Zap className="w-4 h-4" />
  },
  {
    name: 'Cyber Purple',
    primary: '#8b5cf6',
    secondary: '#ec4899',
    accent: '#f59e0b',
    background: '#1a0a2e',
    surface: '#16213e',
    text: '#e5e7eb',
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    name: 'Ocean Deep',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#10b981',
    background: '#0c1321',
    surface: '#1e3a8a',
    text: '#f0f9ff',
    icon: <Waves className="w-4 h-4" />
  },
  {
    name: 'Sunset Orange',
    primary: '#f59e0b',
    secondary: '#ef4444',
    accent: '#8b5cf6',
    background: '#1a1a1a',
    surface: '#2d1b69',
    text: '#fef3c7',
    icon: <Sun className="w-4 h-4" />
  }
]

interface ThemeCustomizerProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

const ThemeCustomizer = ({ currentTheme, onThemeChange }: ThemeCustomizerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)
  const [displayMode, setDisplayMode] = useState<'auto' | 'light' | 'dark'>('auto')

  useEffect(() => {
    const savedDisplayMode = localStorage.getItem('displayMode') as 'auto' | 'light' | 'dark'
    if (savedDisplayMode) {
      setDisplayMode(savedDisplayMode)
    }
  }, [])

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.style.setProperty('--primary-500', theme.primary)
    root.style.setProperty('--primary-600', theme.secondary)
    root.style.setProperty('--accent-500', theme.accent)
    root.style.setProperty('--background', theme.background)
    root.style.setProperty('--surface', theme.surface)
    root.style.setProperty('--text-primary', theme.text)
    
    // Save to localStorage
    localStorage.setItem('selectedTheme', theme.name)
    onThemeChange(theme.name)
    setSelectedTheme(theme.name)
  }

  const handleDisplayModeChange = (mode: 'auto' | 'light' | 'dark') => {
    setDisplayMode(mode)
    localStorage.setItem('displayMode', mode)
    
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else if (mode === 'light') {
      root.classList.remove('dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  return (
    <>
      {/* Floating Theme Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 right-4 z-40 p-3 bg-primary-500 text-white rounded-full shadow-lg neon-glow hover:bg-primary-600 transition-all duration-300"
        style={{ transform: 'translateY(-50%)' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
        </motion.div>
      </motion.button>

      {/* Theme Customizer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-dark-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Personalización
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-dark-800"
                >
                  <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </motion.button>
              </div>

              {/* Display Mode */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Modo de Visualización
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { mode: 'auto' as const, icon: <Monitor className="w-4 h-4" />, label: 'Auto' },
                    { mode: 'light' as const, icon: <Sun className="w-4 h-4" />, label: 'Claro' },
                    { mode: 'dark' as const, icon: <Moon className="w-4 h-4" />, label: 'Oscuro' }
                  ].map(({ mode, icon, label }) => (
                    <motion.button
                      key={mode}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDisplayModeChange(mode)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        displayMode === mode
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <div className={displayMode === mode ? 'text-primary-500' : 'text-slate-500'}>
                          {icon}
                        </div>
                        <span className={`text-xs font-medium ${
                          displayMode === mode 
                            ? 'text-primary-700 dark:text-primary-400' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {label}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Temas de Color
                </h4>
                <div className="space-y-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => applyTheme(theme)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedTheme === theme.name
                          ? 'border-primary-500 shadow-lg'
                          : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800">
                          <div style={{ color: theme.primary }}>
                            {theme.icon}
                          </div>
                        </div>
                        <div className="flex-1 text-left">
                          <h5 className="font-medium text-slate-800 dark:text-white">
                            {theme.name}
                          </h5>
                          <div className="flex items-center space-x-1 mt-1">
                            {[theme.primary, theme.secondary, theme.accent].map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        {selectedTheme === theme.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                          >
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preview Section */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Vista Previa
                </h4>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="space-y-3">
                    <div className="h-2 bg-primary-500 rounded-full w-3/4"></div>
                    <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded-full w-1/2"></div>
                    <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded-full w-2/3"></div>
                    <div className="flex space-x-2 mt-4">
                      <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
                      <div className="w-8 h-8 bg-secondary-500 rounded-lg"></div>
                      <div className="w-8 h-8 bg-accent-500 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  applyTheme(themes[0])
                  handleDisplayModeChange('auto')
                }}
                className="w-full p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                Restablecer por Defecto
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ThemeCustomizer