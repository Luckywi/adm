import React, { useState } from 'react';
import Link from 'next/link';

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
    { label: 'Accueil', href: '#' },
    { label: 'Réalisations', href: '#services' },
    { label: 'Compétence', href: '#portfolio' },

  ],
  initialActiveIndex = 0
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  return (
    <div className="flex justify-center w-full my-8">
      <nav className="flex space-x-4">
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
              px-6 py-3
              rounded-lg
              border
              transition-all
              duration-300
              font-serif
              ${activeIndex === index 
                ? 'bg-[#222222] font-extrabold text-[#FFB5CA] border-transparent shadow-md hover:shadow-lg' 
                : 'bg-white font-extrabold text-[#222222] border-[#FFB5CA] border-2 hover:bg-[#FFF5F8] hover:-translate-y-1 hover:shadow-md'}
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Export du composant pour utilisation dans d'autres fichiers
export default Nav;