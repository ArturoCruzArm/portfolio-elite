import React, { useEffect, useRef } from 'react'

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    // Matrix characters
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = new Array(Math.floor(columns)).fill(1)

    // Colors for matrix effect
    const colors = ['#0F0', '#0A0', '#050', '#0F5', '#5F0']

    const draw = () => {
      // Semi-transparent black background for fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        
        // Random color from green spectrum
        const color = colors[Math.floor(Math.random() * colors.length)]
        ctx.fillStyle = color

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Move drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    // Handle window resize
    const handleResize = () => {
      setCanvasSize()
      const newColumns = canvas.width / fontSize
      drops.length = Math.floor(newColumns)
      drops.fill(1)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-20 dark:opacity-30 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}

export default MatrixRain