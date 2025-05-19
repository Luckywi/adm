'use client';

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'
import { gsap } from 'gsap'
import { Object3D, Mesh } from 'three'

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
  
  // Set the logo color to #F8F7F4
  useEffect(() => {
    if (scene) {
      scene.traverse((child: Object3D) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh

      
          mesh.castShadow = true
          mesh.receiveShadow = true
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
    
    // Camera zoom - on le garde mais modéré
    timeline.to(camera.position, {
      z: 10,  // Un zoom plus léger
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
  }, [scene, camera, animationPhase, onInitialAnimationComplete])
  
  // Phase 2: Transition to header (center top)
  useEffect(() => {
    if (
      !logoRef.current || 
      animationPhase !== 'transitioning' || 
      completedSecondPhaseRef.current ||
      !completedFirstPhaseRef.current
    ) return
    
    animatingRef.current = true
    
    // Position du header - en haut de l'écran (ajusté pour remonter un peu plus)
    const headerPosY = viewport.height / 2 - 0.5  // Augmenté un peu
    const headerPosX = 0
    
    console.log('Moving to header position:', { x: headerPosX, y: headerPosY, viewportHeight: viewport.height })
    
    const timeline = gsap.timeline({
      onComplete: () => {
        completedSecondPhaseRef.current = true
        animatingRef.current = false
        onTransitionComplete()
        console.log('Final logo position:', logoRef.current?.position)
      }
    })
    
    // IMPORTANT: Déplacer le logo seul, sans affecter la caméra
    // 1. Déplacer le logo vers le haut
    timeline.to(logoRef.current.position, {
      x: headerPosX,
      y: headerPosY,
      duration: 1.5,
      ease: 'power3.inOut'
    }, 0)
    
    // 2. Réduire légèrement l'échelle du logo
    timeline.to(logoRef.current.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      duration: 1.5,
      ease: 'power3.inOut'
    }, 0)
    
    return () => {
      timeline.kill()
    }
  }, [animationPhase, viewport, onTransitionComplete])
  
  // Handle viewport resize in header position
  useEffect(() => {
    if (
      !logoRef.current || 
      animationPhase !== 'completed' ||
      !completedSecondPhaseRef.current
    ) return
    
    const headerPosY = viewport.height / 2 - 0.5  // Augmenté un peu
    const headerPosX = 0
    
    // Mettre à jour la position du logo (pas la caméra)
    gsap.to(logoRef.current.position, {
      x: headerPosX,
      y: headerPosY,
      duration: 0.5,
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
        logoRef.current.rotation.y += delta * 0.5
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
