import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import ParticleField from './ParticleField'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function SetBackground({ theme }) {
  const { gl } = useThree()
  useEffect(() => {
    gl.setClearColor(new THREE.Color(theme === 'light' ? '#F5F2ED' : '#08080a'), 1)
  }, [gl, theme])
  return null
}

export default function FormCanvas({ bootConcentrationRef, bootComplete, theme }) {
  if (reducedMotion) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
        }}
      >
        <SetBackground theme={theme} />
        <ParticleField
          bootConcentrationRef={bootConcentrationRef}
          bootComplete={bootComplete}
          theme={theme}
        />
      </Canvas>
    </div>
  )
}
