'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import GooeyNav from './ReactBits/GooeyNav'

const MainContent: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  
  // Configuration des éléments du menu
  const navItems = [
    { label: 'Accueil', href: '#' },
    { label: 'Services', href: '/' },
    { label: 'Portfolio', href: '/' },
    { label: 'Contact', href: '/' }
  ]
  
  useEffect(() => {
    if (!titleRef.current || !navRef.current) return
    
    // Animation pour faire apparaître le titre progressivement
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
    )
    
    // Animation pour faire apparaître la navigation
    gsap.fromTo(
      navRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    )
    
  }, [])
  
  return (
    <div className="pt-8 pb-20">
      <h1 
        ref={titleRef} 
        className="flex pt-12 justify-center w-full text-4xl font-extrabold opacity-0 mt-12 mb-12"
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
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>
    </div>
  )
}

export default MainContent