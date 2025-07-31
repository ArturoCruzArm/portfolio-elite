import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface ParallaxTextProps {
  children: string
  baseVelocity: number
}

export const ParallaxText = ({ children, baseVelocity = 100 }: ParallaxTextProps) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="parallax overflow-hidden whitespace-nowrap flex">
      <motion.div
        className="font-bold text-6xl flex whitespace-nowrap"
        style={{ x }}
      >
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  )
}

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
}

export const AnimatedCounter = ({ from, to, duration = 2, suffix = '' }: AnimatedCounterProps) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (inView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        const easeOutProgress = 1 - Math.pow(1 - progress, 3)
        const currentCount = from + (to - from) * easeOutProgress
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, from, to, duration])

  return (
    <span ref={ref}>
      {Math.floor(count) + suffix}
    </span>
  )
}

interface MorphingShapeProps {
  className?: string
}

export const MorphingShape = ({ className = "" }: MorphingShapeProps) => {
  const paths = [
    "M20,20 C20,20 50,10 80,20 C80,20 90,50 80,80 C80,80 50,90 20,80 C20,80 10,50 20,20 Z",
    "M20,30 C20,30 40,10 70,25 C70,25 90,40 85,70 C85,70 60,90 30,85 C30,85 5,60 20,30 Z",
    "M30,20 C30,20 60,5 85,25 C85,25 95,55 85,80 C85,80 55,95 25,85 C25,85 5,55 30,20 Z",
    "M25,25 C25,25 55,15 75,30 C75,30 85,60 75,75 C75,75 45,85 25,75 C25,75 15,45 25,25 Z"
  ]

  return (
    <svg
      className={`absolute ${className}`}
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <motion.path
        d={paths[0]}
        fill="url(#morphGradient)"
        animate={{
          d: paths,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <defs>
        <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.3} />
        </linearGradient>
      </defs>
    </svg>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  duration?: number
  yOffset?: number
}

export const FloatingElement = ({ 
  children, 
  duration = 6, 
  yOffset = -20 
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, yOffset, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

interface RevealTextProps {
  children: string
  className?: string
}

export const RevealText = ({ children, className = "" }: RevealTextProps) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const words = children.split(" ")

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Missing imports fix
import { 
  useMotionValue, 
  useScroll, 
  useVelocity, 
  useSpring, 
  useTransform, 
  useAnimationFrame,
  wrap 
} from 'framer-motion'