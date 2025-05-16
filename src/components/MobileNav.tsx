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
  
  // Déterminer l'élément actif basé sur le chemin
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const currentPathIndex = items.findIndex(item => item.href !== '#' && pathname === item.href);
    return currentPathIndex >= 0 ? currentPathIndex : initialActiveIndex;
  });

  // Gestion du défilement pour l'apparence du bouton
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le défilement quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Fonctions pour gérer l'état du menu
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Bouton de menu avec transition douce */}
      <button 
        onClick={toggleMenu}
        className={`fixed top-4 right-4 z-50 p-2 rounded-full transition-all duration-300 ${
          isScrolled || isOpen ? 'bg-[#222222]' : 'bg-transparent'
        }`}
        aria-label="Menu"
      >
        <div className="relative w-6 h-6">
          <span className={`absolute block h-0.5 w-6 bg-[#FFB5CA] transition-all duration-300 ${
            isOpen ? 'rotate-45 top-3' : 'top-3'
          }`}></span>
          <span className={`absolute block h-0.5 w-6 bg-[#FFB5CA] transition-all duration-300 ${
            isOpen ? '-rotate-45 top-3' : 'top-3 rotate-90'
          }`}></span>
        </div>
      </button>

      {/* Menu plein écran avec animation */}
      <div 
        className={`fixed inset-0 z-40 bg-[#FFB5CA] flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="w-64 space-y-6">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => {
                setActiveIndex(index);
                closeMenu();
              }}
              className={`
                block w-full
                px-6 py-4
                rounded-lg
                border-2
                transition-all
                duration-300
                font-serif
                text-xl
                text-center
                ${activeIndex === index 
                  ? 'bg-[#222222] text-[#FFB5CA] border-transparent font-extrabold shadow-lg'
                  : 'bg-transparent text-[#222222] border-[#222222] font-extrabold hover:bg-[#222222]/5'}
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNav;