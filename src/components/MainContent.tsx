'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import GooeyNav from './ReactBits/Nav/GooeyNav'

const MainContent: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  
  // Configuration des éléments du menu
  const navItems = [
    { label: 'Accueil', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
  ]
  
  useEffect(() => {
    if (!titleRef.current) return
    
    // Animation pour faire apparaître le titre progressivement
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
    )
    
    // Animation de la navigation, indépendamment du titre
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      )
    }
    
  }, [])
  
  return (
    <div className="pt-8 pb-20">
      <h1 
        ref={titleRef} 
        className="flex pt-12 pb-12 justify-center w-full text-4xl font-extrabold opacity-0 mt-12 mb-12"
      >
        Solutions digitales sur mesure.
      </h1>
      
      <div 
        ref={navRef} 
        className="flex justify-center w-full opacity-0 mt-8"
        style={{ height: '100px', position: 'relative' }}
      >
        <GooeyNav 
          items={navItems}
          particleCount={15}
          particleDistances={[90, 10]} 
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 4, 1, 2, 3, 4]} // Utilise les couleurs définies dans globals.css
        />
      </div>
      
    </div>
  )
}

export default MainContent
