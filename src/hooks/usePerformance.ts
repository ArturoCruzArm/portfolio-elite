import { useState, useEffect } from 'react'

interface PerformanceInfo {
  isLowEnd: boolean
  supportsWebGL: boolean
  deviceMemory: number
  hardwareConcurrency: number
  shouldReduceAnimations: boolean
}

export const usePerformance = (): PerformanceInfo => {
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo>({
    isLowEnd: false,
    supportsWebGL: true,
    deviceMemory: 4,
    hardwareConcurrency: 4,
    shouldReduceAnimations: false
  })

  useEffect(() => {
    const getWebGLSupport = (): boolean => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        return !!gl
      } catch {
        return false
      }
    }

    const getDeviceMemory = (): number => {
      // @ts-ignore - Navigator.deviceMemory is experimental
      return navigator.deviceMemory || 4
    }

    const getHardwareConcurrency = (): number => {
      return navigator.hardwareConcurrency || 4
    }

    const shouldReduceAnimations = (): boolean => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    const deviceMemory = getDeviceMemory()
    const hardwareConcurrency = getHardwareConcurrency()
    const supportsWebGL = getWebGLSupport()
    
    // Considerar dispositivo de bajos recursos si:
    // - Menos de 4GB RAM
    // - Menos de 4 cores
    // - No soporta WebGL
    // - Usuario prefiere animaciones reducidas
    const isLowEnd = deviceMemory < 4 || hardwareConcurrency < 4 || !supportsWebGL

    setPerformanceInfo({
      isLowEnd,
      supportsWebGL,
      deviceMemory,
      hardwareConcurrency,
      shouldReduceAnimations: shouldReduceAnimations()
    })

    // Escuchar cambios en prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      setPerformanceInfo(prev => ({
        ...prev,
        shouldReduceAnimations: mediaQuery.matches
      }))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return performanceInfo
}