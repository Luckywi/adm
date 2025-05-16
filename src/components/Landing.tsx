'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Nav from './Nav'
import MobileNav from '../components/MobileNav'
import Carousel from '../ReactBits/Caroussel'
import InfiniteScroll from '../ReactBits/InfiniteScroll'
import XpCard from './xpCard'
import Footer from './Footer'

const MainContent: React.FC = () => {
  // Références pour les animations
  const titleRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  
  // État pour la largeur du carousel
  const [carouselWidth, setCarouselWidth] = useState(900);
  
  // Animation des éléments à l'entrée
  useEffect(() => {
    if (!titleRef.current) return
    
    // Animation du titre
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
    )
    
    // Animation de la navigation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      )
    }
  }, []) 

  // Données pour le carrousel
  const originalItems = [
    {
      content: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg w-full h-full transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden flex flex-col">
          <div className="p-3 md:p-8 flex flex-col flex-grow">
            <Link 
              href="https://francklebeurre-expertise.fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-4 text-[#222222] transition-colors duration-200 hover:text-[#FFB5CA]">
                francklebeurre-expertise.fr
              </h3>
            </Link>
            <p className="text-xs md:text-base text-[#222222] leading-relaxed flex-grow">
              L&apos;expert-comptable spécialiste<br/>
              des professions libérales
            </p>
            <div className="mt-auto md:absolute md:bottom-3 md:right-3 text-right pr-2">
              <a 
                href="https://francklebeurre-expertise.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#222222] font-extrabold inline-flex items-center px-2 py-1.5 md:px-5 md:py-2.5 text-[#FFB5CA] rounded-lg text-xs md:text-sm font-lg transition-all duration-300 hover:bg-[#FFB5CA] hover:text-white hover:shadow-md hover:shadow-[#FFB5CA]/20 hover:translate-y-[-2px] group"
              >
                <span className="mr-1 md:mr-2">Voir le projet</span>
                <svg 
                  className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" 
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
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg w-full h-full transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden flex flex-col">
          <div className="p-3 md:p-8 flex flex-col flex-grow">
            <Link 
              href="https://lebalzac-coiffure-decines.fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-4 text-[#222222] transition-colors duration-200 hover:text-[#FFB5CA]">
                lebalzac-coiffure-decines.fr
              </h3>
            </Link>
            <p className="text-xs md:text-base text-[#222222] leading-relaxed flex-grow">
              Salon de coiffure avec réservation<br/>
              en ligne et gestion administrative
            </p>
            <div className="mt-auto md:absolute md:bottom-3 md:right-3 text-right pr-2">
              <a 
                href="https://lebalzac-coiffure-decines.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#222222] font-extrabold inline-flex items-center px-2 py-1.5 md:px-5 md:py-2.5 text-[#FFB5CA] rounded-lg text-xs md:text-sm font-lg transition-all duration-300 hover:bg-[#FFB5CA] hover:text-white hover:shadow-md hover:shadow-[#FFB5CA]/20 hover:translate-y-[-2px] group"
              >
                <span className="mr-1 md:mr-2">Voir le projet</span>
                <svg 
                  className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" 
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
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg w-full h-full transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden flex flex-col">
          <div className="p-3 md:p-8 flex flex-col flex-grow">
            <Link 
              href="https://lesailes.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline transition-colors duration-200"
            >
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-4 text-[#222222] transition-colors duration-200 hover:text-[#FFB5CA]">
                lesailes.vercel.app
              </h3>
            </Link>
            <p className="text-xs md:text-base text-[#222222] leading-relaxed flex-grow">
              Première présence web pour une<br/>
              association de yoga établie depuis 10 ans
            </p>
            <div className="mt-auto md:absolute md:bottom-3 md:right-3 text-right pr-2">
              <a 
                href="https://lesailes.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#222222] font-extrabold inline-flex items-center px-2 py-1.5 md:px-5 md:py-2.5 text-[#FFB5CA] rounded-lg text-xs md:text-sm font-lg transition-all duration-300 hover:bg-[#FFB5CA] hover:text-white hover:shadow-md hover:shadow-[#FFB5CA]/20 hover:translate-y-[-2px] group"
              >
                <span className="mr-1 md:mr-2">Voir le projet</span>
                <svg 
                  className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" 
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

  // Ajouter une copie du premier élément à la fin pour le carrousel infini
  const items = [...originalItems, originalItems[0]];

  // Gestion de la largeur responsive du carousel
  useEffect(() => {
    const handleResize = () => {
      setCarouselWidth(getCarouselWidth());
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialisation
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calcul adaptatif de la largeur du carousel
  const getCarouselWidth = () => {
    if (typeof window === 'undefined') return 900; // Valeur par défaut pour SSR
    
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 640) {
      return Math.min(windowWidth - 32, 350); // Petits mobiles
    } else if (windowWidth < 768) {
      return Math.min(windowWidth - 48, 450); // Grands mobiles et petites tablettes
    } else if (windowWidth < 1024) {
      return 600; // Tablettes
    } else {
      return 900; // Desktops
    }
  };

  return (
    <div className="pt-4 md:pt-8">
      {/* Titre principal */}
      <h1
        ref={titleRef}
        className="flex pt-24 md:pt-20 pb-6 md:pb-8 justify-center w-full text-2xl md:text-4xl text-[#222222] font-extrabold opacity-0 mt-8 md:mt-12 mb-8 md:mb-12 px-4 text-center"
      >
        <span className="w-[70%]">Solutions digitales sur mesure.</span>
      </h1>

      {/* Navigation desktop */}
      <div ref={navRef} className="hidden md:block">
        <Nav />
      </div>

      {/* Navigation mobile - intégrée directement sans div supplémentaire */}
      <MobileNav />

      {/* Carousel de projets */}
      <div className='flex justify-center pt-4 md:pt-8 px-4'>
        <Carousel
          baseWidth={carouselWidth}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>

      {/* Section d'expérience */}
      <div className="mt-12 md:mt-16 mb-12 md:mb-16">
        {/* Animation de défilement infini */}
        <div 
          style={{
            height: '230px',
            position: 'relative', 
            marginTop: '30px',
            paddingBottom: '0px', 
            width: '100%', 
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <InfiniteScroll
            items={items}
            isTilted={true}
            tiltDirection='left'
            autoplay={true}
            autoplaySpeed={1.0}
            autoplayDirection="down"
            pauseOnHover={true}
            width="38rem"
            negativeMargin="-5.5em"
          />
        </div>
        
        {/* Carte d'expérience */}
        <div className='mt-8 md:mt-10 px-4'>
          <XpCard />
        </div>
      </div>
      
      {/* Pied de page */}
      <Footer />
    </div>
  )
}

export default MainContent