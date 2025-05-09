'use client'

import { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import MainContent from '../components/MainContent'

// Lazy-load the 3D component
const Logo3D = dynamic(() => import('../components/Logo3D'), {
  ssr: false,
})

export default function Home() {
  const [animationPhase, setAnimationPhase] = useState('splash') // 'splash', 'transitioning', 'completed'
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  
  // Handle animation phase transitions
  const handleInitialAnimationComplete = () => {
    // After initial rotation is complete, start transitioning
    setAnimationPhase('transitioning')
    
    // Start fading the pink overlay while logo is transitioning to header
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      })
    }
  }
  
  const handleTransitionComplete = () => {
    // Once the logo has moved to the header position
    setAnimationPhase('completed')
  }
  
  // Ensure component is mounted on client-side only
  useEffect(() => {
    setMounted(true)
    
    // Force animation to play on every page refresh
    const handleBeforeUnload = () => {
      localStorage.setItem('resetAnimation', 'true')
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
  
  // Don't render during SSR
  if (!mounted) return null
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Pink overlay for splash screen */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: '#FFB5CA' }}
      />
      
      {/* 3D Canvas - fixed size and position, covering the entire page */}
      <div className="fixed inset-0 z-20 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5} 
            castShadow
          />
          <Logo3D
            animationPhase={animationPhase} 
            onInitialAnimationComplete={handleInitialAnimationComplete}
            onTransitionComplete={handleTransitionComplete}
          />
        </Canvas>
      </div>
      
      {/* Main content - visible after splash */}
      <main 
        className={`relative z-0 ${
          animationPhase === 'completed' ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-700`}
      >
        <MainContent />
      </main>
    </div>
  )
}