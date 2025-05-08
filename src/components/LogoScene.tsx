// components/LogoScene.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

function RotatingLogo() {
  const { scene } = useGLTF('/ADM.glb')
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5
    }
  })

  return <primitive ref={ref} object={scene} scale={1.2} />
}

export default function LogoScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100vh', background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingLogo />
      {/* débogage, désactivez en prod si vous ne voulez pas d’interaction */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
