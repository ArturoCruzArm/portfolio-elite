import { useEffect, useCallback } from 'react'

export const useKeyboardNavigation = (navigation: Array<{ name: string; href: string }>) => {
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const showKeyboardShortcuts = useCallback(() => {
    const shortcuts = `
Atajos de teclado disponibles:
• 1-6: Navegar a secciones
• Alt + ↑/↓: Sección anterior/siguiente  
• ?: Mostrar esta ayuda
• Esc: Cerrar modales
• Tab: Navegar por elementos interactivos
    `.trim()
    
    announceToScreenReader('Mostrando atajos de teclado')
    alert(shortcuts) // Temporal - en producción sería un modal accesible
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Solo procesar si no estamos en un input o textarea
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return
    }

    // Navegar con números 1-6
    if (event.key >= '1' && event.key <= '6') {
      event.preventDefault()
      const index = parseInt(event.key) - 1
      if (navigation[index]) {
        scrollToSection(navigation[index].href)
        // Anunciar para screen readers
        const announcement = `Navegando a ${navigation[index].name}`
        announceToScreenReader(announcement)
      }
    }

    // Navegar con teclas de flecha + Alt
    if (event.altKey) {
      const currentSection = getCurrentSection()
      const currentIndex = navigation.findIndex(nav => nav.href === `#${currentSection}`)
      
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        const nextIndex = (currentIndex + 1) % navigation.length
        scrollToSection(navigation[nextIndex].href)
        announceToScreenReader(`Navegando a ${navigation[nextIndex].name}`)
      }
      
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const prevIndex = currentIndex === 0 ? navigation.length - 1 : currentIndex - 1
        scrollToSection(navigation[prevIndex].href)
        announceToScreenReader(`Navegando a ${navigation[prevIndex].name}`)
      }
    }

    // Tecla de ayuda (?)
    if (event.key === '?' || (event.shiftKey && event.key === '/')) {
      event.preventDefault()
      showKeyboardShortcuts()
    }

    // Escape para cerrar modales
    if (event.key === 'Escape') {
      closeAllModals()
    }
  }, [navigation, scrollToSection, showKeyboardShortcuts])

  const getCurrentSection = (): string => {
    const sections = document.querySelectorAll('section[id]')
    let currentSection = 'hero'
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom > 100) {
        currentSection = section.id
      }
    })
    
    return currentSection
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }


  const closeAllModals = () => {
    // Cerrar cualquier modal abierto
    const closeButtons = document.querySelectorAll('[aria-label*="cerrar"], [aria-label*="close"]')
    closeButtons.forEach(button => {
      if (button instanceof HTMLElement && button.offsetParent !== null) {
        button.click()
      }
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    
    // Agregar indicadores visuales para usuarios de teclado
    const style = document.createElement('style')
    style.textContent = `
      .focus-visible:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
      
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [handleKeyDown])

  return {
    scrollToSection,
    announceToScreenReader,
    getCurrentSection
  }
}