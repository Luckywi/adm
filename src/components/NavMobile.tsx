'use client';
// src/components/NavMobile.tsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

interface NavMobileProps {
  items?: NavItem[];
}

const NavMobile: React.FC<NavMobileProps> = ({ 
  items = [
    { label: 'Accueil', href: '/' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'Compétence', href: '/competence' },
  ]
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Par défaut, "Accueil" est actif
  const [viewportHeight, setViewportHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Obtenir la hauteur réelle du viewport (évite les problèmes avec 100vh sur mobile)
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);

  // Verrouiller le défilement du corps quand le menu est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Fermer le menu mobile au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Variantes pour l'animation du menu - adaptation pour plein écran
  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },  // Commence complètement à droite
    visible: { 
      opacity: 1, 
      x: 0,  // Se déplace jusqu'à sa position normale
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',  // Sort vers la droite
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },  // Légère animation vers le haut plutôt que sur le côté
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Bouton de menu mobile (+ ou X) */}
      <button 
        className="fixed top-8 right-4 z-50 mobile-menu-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}
      >
        {isMobileMenuOpen ? (
          // Icône de fermeture (X)
          <div className="bg-[#FFB5CA] rounded-full p-2 shadow-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#222222" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        ) : (
          // Icône + bordée de rose
          <div className="bg-white rounded-full w-10 h-10 border-2 border-[#FFB5CA] flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#222222" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        )}
      </button>

      {/* Menu mobile en plein écran */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            ref={menuRef}
            className="fixed top-0 left-0 right-0 bg-white z-40 shadow-lg mobile-menu flex flex-col overflow-hidden"
            style={{ 
              height: viewportHeight, // Utiliser la hauteur exacte du viewport
              maxHeight: viewportHeight // S'assurer que le menu ne dépasse pas la hauteur visible
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {/* Content wrapper avec défilement si nécessaire */}
            <div className="flex flex-col items-center justify-center h-full overflow-y-auto py-12 px-6">
              {/* Logo en haut du menu */}
              <motion.div 
                variants={itemVariants}
                className="mb-10 mt-6"
              >
                <Image
                  src="/adm.png"
                  alt="ADM"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                  priority
                />
              </motion.div>
              
              {/* Items de navigation avec espacement ajusté */}
              <div className="flex flex-col w-full max-w-xs mx-auto space-y-5">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <Link 
                      href={item.href}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        block w-full py-4 px-6 text-center
                        rounded-lg
                        transition-all
                        duration-200
                        font-serif
                        text-xl font-bold
                        ${activeIndex === index 
                          ? 'bg-[#222222] text-[#FFB5CA] shadow-md' 
                          : 'bg-white text-[#222222] border-2 border-[#FFB5CA]'}
                      `}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Footer du menu avec copyright */}
              <motion.div 
                variants={itemVariants}
                className="mt-auto pt-8 text-center text-sm text-[#222222] opacity-70"
              >
                © 2025 ADM Digital
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavMobile;