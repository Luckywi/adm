'use client';
// src/components/Nav.tsx (updated)
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  items?: NavItem[];
  initialActiveIndex?: number;
}

const Nav: React.FC<NavProps> = ({ 
  items = [
    { label: 'Accueil', href: '/' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'Compétence', href: '/competence' },
  ],
  initialActiveIndex = 0
}) => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    // Set initial active based on current path if available
    const currentPathIndex = items.findIndex(item => 
      item.href !== '#' && pathname === item.href
    );
    return currentPathIndex >= 0 ? currentPathIndex : initialActiveIndex;
  });

  return (
    <div className="flex justify-center w-full my-8"> 
      <nav className="flex flex-wrap space-x-2 md:space-x-4 justify-center">
        {items.map((item, index) => (
          <Link 
            href={item.href} 
            key={index}
            onClick={(e) => {
              if (item.href.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
              setActiveIndex(index);
            }}
            className={`
              px-4 md:px-6 py-3
              rounded-lg
              border
              transition-all
              duration-300
              font-serif
              text-sm md:text-base
              mb-2
              ${activeIndex === index 
                ? 'bg-[#222222] font-extrabold text-[#FFB5CA] border-transparent shadow-md hover:shadow-lg' 
                : 'bg-#F8F7F4 font-extrabold text-[#222222] border-[#FFB5CA] border-2 hover:bg-[#FFF5F8] hover:-translate-y-1 hover:shadow-md'}
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Nav;  