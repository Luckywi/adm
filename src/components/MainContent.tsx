'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const MainContent: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const leftNavRef = useRef<HTMLDivElement>(null)
  const rightNavRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!headerRef.current || !leftNavRef.current || !rightNavRef.current || !titleRef.current || !contentRef.current) return
    
    // Animation pour faire apparaître le contenu progressivement
    const timeline = gsap.timeline({ delay: 0.2 })
    
    // Faire apparaître la navigation de gauche
    timeline.fromTo(
      leftNavRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      0
    )
    
    // Faire apparaître la navigation de droite
    timeline.fromTo(
      rightNavRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      0.1
    )
    
    // Titre principal
    timeline.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.4 // Léger délai
    )
    
    // Contenu principal
    timeline.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0.6 // Léger délai
    )
    
    return () => {
      timeline.kill()
    }
  }, [])
  
  return (
    <>
      {/* Header avec le logo 3D centré */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100" ref={headerRef}>
        {/* Navigation gauche */}
        <div ref={leftNavRef} className="opacity-0">
          <nav>
            <ul className="flex gap-6">
              <li><a href="#" className="hover:text-[#FFB5CA] transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-[#FFB5CA] transition-colors">Services</a></li>
            </ul>
          </nav>
        </div>
        
        {/* Espace central réservé pour le logo 3D */}
        <div className="w-20 h-20"></div>
        
        {/* Navigation droite */}
        <div ref={rightNavRef} className="opacity-0">
          <nav>
            <ul className="flex gap-6">
              <li><a href="#" className="hover:text-[#FFB5CA] transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-[#FFB5CA] transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Contenu principal avec un padding correct pour éviter le header */}
      <div className="pt-8 pb-20">
        <h1 
          ref={titleRef} 
          className="flex justify-center w-full text-4xl font-extrabold opacity-0 mt-12"
        >
          Solutions digitales sur mesure.
        </h1>
        
        <div 
          ref={contentRef} 
          className="max-w-4xl mx-auto mt-12 px-4 opacity-0"
        >
          <p className="text-xl mb-8">
            Nous créons des expériences numériques innovantes pour des marques exigeantes.
            Notre équipe combine créativité et expertise technique pour donner vie à vos projets.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">Développement Web</h3>
              <p>Sites élégants et performants avec les technologies les plus récentes.</p>
            </div>
            
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">Design UX/UI</h3>
              <p>Interfaces intuitives et esthétiques centrées sur l&apos;utilisateur.</p>
            </div>
            
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3">Applications 3D</h3>
              <p>Expériences immersives et interactives avec Three.js et WebGL.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainContent