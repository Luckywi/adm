'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Nav from './Nav'
import Carousel from '../ReactBits/Caroussel'
import InfiniteScroll from '../ReactBits/InfiniteScroll'
import XpCard from './xpCard'
import Footer from './Footer'

const MainContent: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  
  // Liste d'items avec la palette de couleurs #222222, #FFB5CA et blanc
  const originalItems = [
    {
      content: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg w-full min-h-[220px] transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden">
          <div className="p-8 flex flex-col h-full">
            <Link 
              href="https://francklebeurre-expertise.fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline transition-colors duration-200"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#222222] transition-colors duration-200 hover:text-[#FFB5CA]">
                francklebeurre-expertise.fr
              </h3>
            </Link>
            <p className="text-base text-[#222222] leading-relaxed mb-14">
              L&apos;expert-comptable spécialiste<br/>
              des professions libérales
            </p>
            <div className="absolute bottom-8 right-8">
              <a 
                href="https://francklebeurre-expertise.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#222222] font-extrabold inline-flex items-center px-5 py-2.5  text-[#FFB5CA] rounded-lg text-sm font-lg transition-all duration-300 hover:bg-[#FFB5CA] hover:text-white hover:shadow-md hover:shadow-[#FFB5CA]/20 hover:translate-y-[-2px] group"
              >
                <span className="mr-2">Voir le projet</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg w-full min-h-[220px] transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden">
          <div className="p-8 flex flex-col h-full">
            <Link 
              href="https://lebalzac-coiffure-decines.fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline transition-colors duration-200"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#222222] transition-colors duration-200 hover:text-[#FFB5CA]">
                lebalzac-coiffure-decines.fr
              </h3>
            </Link>
            <p className="text-base text-[#222222] leading-relaxed mb-14">
              Salon de coiffure avec réservation<br/>
              en ligne et gestion administrative
            </p>
            <div className="absolute bottom-8 right-8">
              <a 
                href="https://lebalzac-coiffure-decines.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#222222] font-extrabold inline-flex items-center px-5 py-2.5  text-[#FFB5CA] rounded-lg text-sm font-lg transition-all duration-300 hover:bg-[#FFB5CA] hover:text-white hover:shadow-md hover:shadow-[#FFB5CA]/20 hover:translate-y-[-2px] group"
              >
                <span className="mr-2">Voir le projet</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg w-full min-h-[220px] transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden">
          <div className="p-8 flex flex-col h-full">
            <Link 
              href="https://lesailes.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline transition-colors duration-200"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#222222] transition-colors duration-200 hover:text-[#FFB5CA]">
                lesailes.vercel.app
              </h3>
            </Link>
            <p className="text-base text-[#222222] leading-relaxed mb-14">
              Première présence web pour une<br/>
              association de yoga établie depuis 10 ans
            </p>
            <div className="absolute bottom-8 right-8">
              <a 
                href="https://lesailes.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#222222] font-extrabold inline-flex items-center px-5 py-2.5  text-[#FFB5CA] rounded-lg text-sm font-lg transition-all duration-300 hover:bg-[#FFB5CA] hover:text-white hover:shadow-md hover:shadow-[#FFB5CA]/20 hover:translate-y-[-2px] group"
              >
                <span className="mr-2">Voir le projet</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )
    },
  ];
  
  // Solution intégrée: Dupliquer le premier élément à la fin
  const items = [
    ...originalItems,
    originalItems[0] // Ajoute une copie du premier élément à la fin
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
    <div className="pt-8">


      <h1
        ref={titleRef}
        className="flex pt-20 pb-8 justify-center w-full text-4xl text-[#222222] font-extrabold opacity-0 mt-12 mb-12"
      >
        Solutions digitales sur mesure.
      </h1>

      <div ref={navRef}>
        <Nav />
      </div>

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

      <div className="mt-16 mb-16">
      
        <div style={{height: '500px', position: 'relative', marginTop: '50px'}}>
          <InfiniteScroll
            items={items}
            isTilted={true}
            tiltDirection='left'
            autoplay={true}
            autoplaySpeed={1.0}
            autoplayDirection="down"
            pauseOnHover={true}
            width="38rem"
            itemMinHeight={220}
            negativeMargin="-5.5em"
          />
        </div>
<div className='mt-10'>
        <XpCard />
        </div>
      </div>
      
      <Footer />
    </div>


  )
}

export default MainContent