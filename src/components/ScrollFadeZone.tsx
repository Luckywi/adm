'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface ScrollFadeZoneProps {
  children: React.ReactNode;
  // Marge supplémentaire au-dessus et en-dessous de la zone du logo
  marginY?: number;
}

const ScrollFadeZone: React.FC<ScrollFadeZoneProps> = ({ 
  children, 
  marginY = 50 
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [logoPosition, setLogoPosition] = useState({ y: 0, height: 0 })
  
  // Calculer la position du logo (comme dans Logo3D.tsx)
  useEffect(() => {
    const updateLogoPosition = () => {
      const viewportHeight = window.innerHeight
      const logoY = viewportHeight / 2 - 0.5
      
      // Pour la hauteur, nous estimons qu'elle fait environ 100px
      // Vous pouvez ajuster cette valeur selon la taille réelle de votre logo
      const logoHeight = 100
      
      setLogoPosition({
        y: logoY - logoHeight / 2, // Position centrale du logo
        height: logoHeight
      })
    }
    
    updateLogoPosition()
    window.addEventListener('resize', updateLogoPosition)
    
    return () => {
      window.removeEventListener('resize', updateLogoPosition)
    }
  }, [])
  
  // Configurer l'IntersectionObserver pour détecter quand les éléments sont près du logo
  useEffect(() => {
    if (!contentRef.current) return
    
    // Créer la zone d'exclusion (logo + marge)
    const exclusionZoneTop = logoPosition.y - marginY
    const exclusionZoneBottom = logoPosition.y + logoPosition.height + marginY
    const exclusionZoneHeight = exclusionZoneBottom - exclusionZoneTop
    
    // Configuration de l'observateur
    const options = {
      root: null, // Viewport
      rootMargin: "0px",
      threshold: Array.from({ length: 20 }, (_, i) => i / 20) // Plus de points d'observation pour une transition fluide
    }
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const elementRect = entry.boundingClientRect
        const elementTop = elementRect.top
        const elementBottom = elementRect.bottom
        const elementHeight = elementRect.height
        
        // Calculer si l'élément entre dans la zone d'exclusion
        const topOverlap = Math.max(0, exclusionZoneBottom - elementTop)
        const bottomOverlap = Math.max(0, elementBottom - exclusionZoneTop)
        
        // L'élément est dans la zone d'exclusion
        if (topOverlap > 0 || bottomOverlap > 0) {
          // Calculer le pourcentage de superposition
          const overlapPercentage = Math.min(1, Math.max(topOverlap, bottomOverlap) / exclusionZoneHeight)
          
          // Faire disparaître l'élément proportionnellement à son chevauchement avec la zone du logo
          gsap.to(entry.target, {
            opacity: 1 - (overlapPercentage * 0.9), // Garder une légère trace visible
            y: overlapPercentage * 10, // Léger décalage pour effet supplémentaire
            duration: 0.2,
            ease: 'power2.out'
          })
        } else {
          // L'élément est complètement hors de la zone d'exclusion
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })
    }
    
    // Créer l'observateur
    const observer = new IntersectionObserver(handleIntersection, options)
    
    // Observer tous les éléments enfants directs
    contentRef.current.childNodes.forEach(child => {
      if (child instanceof HTMLElement) {
        observer.observe(child)
      }
    })
    
    return () => {
      observer.disconnect()
    }
  }, [logoPosition, marginY])
  
  return (
    <div ref={contentRef} className="w-full">
      {children}
    </div>
  )
}

export default ScrollFadeZone