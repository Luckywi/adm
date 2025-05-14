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
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  
  // Handle animation phase transitions
  const handleInitialAnimationComplete = () => {
    console.log("Initial animation complete, transitioning...")
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
    console.log("Transition complete, showing content...")
    // Once the logo has moved to the header position
    setAnimationPhase('completed')
    
    // Ensure canvas is rendered properly during/after animation
    if (canvasContainerRef.current) {
      // Keep canvas visible but disable pointer events
      canvasContainerRef.current.style.pointerEvents = 'none';
      canvasContainerRef.current.style.zIndex = '5';
    }
    
    // Fade in the main content
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          onStart: () => {
            // Enable pointer events as soon as the animation starts
            if (mainContentRef.current) {
              mainContentRef.current.style.pointerEvents = 'auto';
            }
          }
        }
      );
    }
  }
  
  // Ensure component is mounted on client-side only
  useEffect(() => {
    setMounted(true)
    
    // Set default pointer events
    if (mainContentRef.current) {
      mainContentRef.current.style.pointerEvents = 'none';
    }
    
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
      
      {/* 3D Canvas - Always visible but z-index changes with phase */}
      <div 
        ref={canvasContainerRef} 
        className="fixed inset-0 w-full h-full"
        style={{ 
          zIndex: animationPhase === 'completed' ? 5 : 20,
          pointerEvents: animationPhase === 'completed' ? 'none' : 'auto'
        }}
      >
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
      
      {/* Main content - Hidden initially, then visible with proper z-index */}
      <main 
        ref={mainContentRef}
        className="relative w-full opacity-0"
        style={{ 
          zIndex: 30, // Always keep content at highest z-index
          pointerEvents: 'none' // Will be enabled by GSAP onStart
        }}
      >
      
        <MainContent />
      </main>
    </div>
  )
}