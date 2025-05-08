'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'
import { gsap } from 'gsap'

// Preload the model
useGLTF.preload('/ADM.glb')

interface Logo3DProps {
  animationPhase: string
  onInitialAnimationComplete: () => void
  onTransitionComplete: () => void
}

export default function Logo3D({ 
  animationPhase, 
  onInitialAnimationComplete,
  onTransitionComplete 
}: Logo3DProps) {
  const { scene } = useGLTF('/ADM.glb')
  const logoRef = useRef<Group>(null)
  const { viewport, camera } = useThree()
  
  // Animation flags
  const animatingRef = useRef(false)
  const completedFirstPhaseRef = useRef(false)
  const completedSecondPhaseRef = useRef(false)
  
  // Set the logo color to white
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.color.set(0xFFFFFF)
          }
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
    
    // Reset animation flags on remount
    animatingRef.current = false
    completedFirstPhaseRef.current = false
    completedSecondPhaseRef.current = false
    
    // Initial setup of the logo
    if (logoRef.current) {
      logoRef.current.position.set(0, 0, 0)
      logoRef.current.rotation.set(0, 0, 0)
      logoRef.current.scale.set(1.5, 1.5, 1.5)
    }
    
    // Initial camera position
    camera.position.set(0, 0, 15)
  }, [scene, camera])
  
  // Phase 1: Initial splash animation (360° rotation)
  useEffect(() => {
    if (!logoRef.current || animationPhase !== 'splash' || completedFirstPhaseRef.current) return
    
    animatingRef.current = true
    
    const timeline = gsap.timeline({
      onComplete: () => {
        completedFirstPhaseRef.current = true
        animatingRef.current = false
        onInitialAnimationComplete()
      }
    })
    
    // Initial spin animation
    timeline.to(logoRef.current.rotation, {
      y: Math.PI * 2,  // Full 360°
      duration: 1.2,
      ease: 'power2.inOut'
    }, 0)
    
    // Camera zooms in slightly
    timeline.to(camera.position, {
      z: 8,  // Closer, but not too close
      duration: 1.5,
      ease: 'power2.out'
    }, 0)
    
    // Final small additional rotation for settling effect
    timeline.to(logoRef.current.rotation, {
      y: Math.PI * 2.2,  // Slightly more than 360°
      duration: 0.8,
      ease: 'power1.out'
    }, 1.2)
    
    return () => {
      timeline.kill()
    }
  }, [animationPhase, camera, onInitialAnimationComplete])
  
  // Phase 2: Transition to header (center top)
  useEffect(() => {
    if (
      !logoRef.current || 
      animationPhase !== 'transitioning' || 
      completedSecondPhaseRef.current ||
      !completedFirstPhaseRef.current
    ) return
    
    animatingRef.current = true
    
    // Calculate header position
    // We want the logo to move to the center top of the header
    const headerPosX = 0  // Center horizontally
    const headerPosY = viewport.height / 2 - 0.8  // Top with some padding
    
    const timeline = gsap.timeline({
      onComplete: () => {
        completedSecondPhaseRef.current = true
        animatingRef.current = false
        onTransitionComplete()
      }
    })
    
    // Move logo to header position
    timeline.to(logoRef.current.position, {
      x: headerPosX,
      y: headerPosY,
      duration: 1.5,
      ease: 'power3.inOut'
    }, 0)
    
    // Scale logo down to fit in header
    timeline.to(logoRef.current.scale, {
      x: 0.2,
      y: 0.2,
      z: 0.2,
      duration: 1.5,
      ease: 'power3.inOut'
    }, 0)
    
    // Move camera to follow logo
    timeline.to(camera.position, {
      x: headerPosX,
      y: headerPosY,
      z: 4,  // Closer to see the smaller logo
      duration: 1.5,
      ease: 'power3.inOut'
    }, 0)
    
    return () => {
      timeline.kill()
    }
  }, [animationPhase, viewport, camera, onTransitionComplete])
  
  // Handle viewport resize in header position
  useEffect(() => {
    if (
      !logoRef.current || 
      animationPhase !== 'completed' ||
      !completedSecondPhaseRef.current
    ) return
    
    const headerPosX = 0  // Center horizontally
    const headerPosY = viewport.height / 2 - 0.8
    
    // Update logo position
    gsap.to(logoRef.current.position, {
      x: headerPosX,
      y: headerPosY,
      duration: 0.3,
      ease: 'power2.out'
    })
    
    // Update camera position
    gsap.to(camera.position, {
      x: headerPosX,
      y: headerPosY,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [viewport.width, viewport.height, animationPhase])
  
  // Gentle continuous rotation
  useFrame((_, delta) => {
    if (logoRef.current && !animatingRef.current) {
      // Different rotation speeds based on phase
      if (animationPhase === 'completed') {
        // Faster rotation in header
        logoRef.current.rotation.y += delta * 1.2
      } else {
        // Slower rotation during splash
        logoRef.current.rotation.y += delta * 0.3
      }
    }
  })
  
  return (
    <primitive 
      ref={logoRef} 
      object={scene} 
      position={[0, 0, 0]}
      scale={[1.5, 1.5, 1.5]}
    />
  )
}