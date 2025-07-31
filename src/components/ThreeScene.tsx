import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// import * as random from 'maath/random/dist/maath-random.esm'

interface StarsProps {
  count?: number
}

function Stars({ count = 5000 }: StarsProps) {
  const ref = useRef<any>(null)
  
  const [sphere] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      const r = Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i] = r * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = r * Math.cos(phi)
    }
    return [positions]
  }, [count])

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

interface FloatingCubesProps {
  count?: number
}

function FloatingCubes({ count = 50 }: FloatingCubesProps) {
  const meshRef = useRef<any>(null)
  
  const cubes = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        scale: Math.random() * 0.1 + 0.05
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={meshRef}>
      {cubes.map((cube, index) => (
        <mesh
          key={index}
          position={cube.position as [number, number, number]}
          rotation={cube.rotation as [number, number, number]}
          scale={cube.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#6366f1"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

const ThreeScene: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars count={2000} />
        <FloatingCubes count={20} />
      </Canvas>
    </div>
  )
}

export default ThreeScene