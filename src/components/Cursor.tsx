import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setIsPointer(true)
    const handleMouseLeave = () => setIsPointer(false)

    // Track mouse movement
    window.addEventListener('mousemove', moveCursor)

    // Track interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      border: '2px solid rgba(59, 130, 246, 0.8)'
    },
    pointer: {
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.6)',
      border: '2px solid rgba(139, 92, 246, 0.9)'
    }
  }

  // Don't show custom cursor on mobile devices
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        variants={variants}
        animate={isPointer ? 'pointer' : 'default'}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28
        }}
      />
      
      {/* Trailing dots */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-400 rounded-full pointer-events-none z-49 opacity-60"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay: 0.02
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-purple-400 rounded-full pointer-events-none z-48 opacity-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          delay: 0.04
        }}
      />
    </>
  )
}

export default CustomCursor