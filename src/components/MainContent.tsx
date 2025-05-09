'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Nav from './Nav'
import Carousel from '../ReactBits/Caroussel'
import Folder from '../ReactBits/Folder'

const MainContent: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  
  // Créez vos éléments à mettre dans le dossier (facultatif)
  const folderItems = [
    <div key="1" className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-800 text-sm font-medium">
      Item 1
    </div>,
    <div key="2" className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg text-gray-800 text-sm font-medium">
      Item 2
    </div>,
    <div key="3" className="w-full h-full flex items-center justify-center bg-white rounded-lg text-gray-800 text-sm font-medium">
      Item 3
    </div>
  ];
  
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
        className="flex pt-20 pb-8 justify-center w-full text-4xl color-[#222222] font-extrabold opacity-0 mt-12 mb-12"
      >
        Solutions digitales sur mesure.
      </h1>

      <div ref={navRef}>
        <Nav />
      </div>

      <div className='flex justify-center pt-8 pb-8'>
        <Carousel
          baseWidth={900}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>

      <div className="flex justify-center items-center pt-33 mt-8">
        <Folder 
          color="#FFB5CA" 
          size={3} 
          items={folderItems}
          className="transform-gpu"
        />
      </div>
    </div>
  )
}

export default MainContent