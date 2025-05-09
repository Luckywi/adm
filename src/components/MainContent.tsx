'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Nav from './Nav'
import Carousel from '../ReactBits/Caroussel'


const MainContent: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  

  
  
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
        className="flex pt-20 pb-8 justify-center w-full text-4xl font-extrabold opacity-0 mt-12 mb-12"
      >
        Solutions digitales sur mesure.
      </h1>

      <Nav />

      <div className='flex justify-center pt-8'>
  <Carousel
    baseWidth={900}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
</div>
    
      
    </div>
  )
}

export default MainContent
