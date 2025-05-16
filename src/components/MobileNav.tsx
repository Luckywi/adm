'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  items?: { label: string; href: string }[];
  initialActiveIndex?: number;
}

const MobileNav: React.FC<MobileNavProps> = ({
  items = [
    { label: 'Accueil', href: '/' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'Compétence', href: '/competence' },
  ],
  initialActiveIndex = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Reproduire exactement la même logique de state que dans Nav.tsx
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    // Set initial active based on current path if available
    const currentPathIndex = items.findIndex(item => 
      item.href !== '#' && pathname === item.href
    );
    return currentPathIndex >= 0 ? currentPathIndex : initialActiveIndex;
  });

  // Gestion du scroll pour afficher un fond au bouton de menu quand on n'est pas en haut de la page
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Bouton hamburger (remplacé par +) */}
      <button 
        onClick={toggleMenu}
        className={`fixed top-4 right-4 z-50 p-2 rounded-full transition-all duration-300 ${
          isScrolled || isOpen ? 'bg-[#222222]' : 'bg-transparent'
        }`}
        aria-label="Menu"
      >
        {isOpen ? (
          // Icône X quand le menu est ouvert
          <div className="relative w-6 h-6">
            <span className="absolute block h-0.5 w-6 bg-[#FFB5CA] transform rotate-45 top-3"></span>
            <span className="absolute block h-0.5 w-6 bg-[#FFB5CA] transform -rotate-45 top-3"></span>
          </div>
        ) : (
          // Icône + quand le menu est fermé
          <div className="relative w-6 h-6">
            <span className="absolute block h-0.5 w-6 bg-[#FFB5CA] top-3"></span>
            <span className="absolute block h-0.5 w-6 bg-[#FFB5CA] top-3 rotate-90"></span>
          </div>
        )}
      </button>

      {/* Menu plein écran */}
      <div 
        className={`fixed inset-0 z-40 bg-[#FFB5CA] flex flex-col items-center justify-center transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {items.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              onClick={(e) => {
                // Exactement la même logique que dans Nav.tsx
                if (item.href.startsWith('#')) {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
                setActiveIndex(index);
                closeMenu(); // En plus, fermer le menu
              }}
              className={`
                px-8 py-4
                rounded-lg
                border
                transition-all
                duration-300
                font-serif
                text-xl
                ${activeIndex === index 
                  ? 'bg-[#222222] text-[#FFB5CA] border-transparent font-extrabold shadow-lg' 
                  : 'bg-transparent text-[#222222] border-[#222222] border-2 font-extrabold'}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;