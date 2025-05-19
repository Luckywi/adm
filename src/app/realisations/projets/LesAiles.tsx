// src/app/realisations/projets/LesAiles.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';

export default function LesAiles() {
  // State pour gérer l'affichage du texte complet en mobile
  const [showFullText, setShowFullText] = useState(false);
  // State pour détecter si on est sur mobile
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile côté client uniquement
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Schema.org JSON-LD pour le référencement
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Les Ailes - Association de Yoga",
    "url": "https://lesailes.vercel.app/",
    "description": "Première présence web pour une association de yoga établie depuis 10 ans.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lesailes.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* Script JSON-LD pour le SEO */}
      <Script
        id="schema-lesailes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Conteneur principal - border supprimée en mobile */}
      <div className="md:rounded-lg md:border-2 md:border-[#FFB5CA] md:p-4 md:bg-#F8F7F4">
        {/* Conteneur principal */}
        <article className="project-container bg-[#222222] p-3 md:p-4 rounded-lg space-y-6 md:space-y-8" itemScope itemType="http://schema.org/WebSite">
          {/* Section iframe avec le bouton en haut à droite - titre déplacé en dessous */}
          <motion.div 
            className="relative rounded-lg overflow-hidden bg-gray-100 h-[250px] md:h-[400px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Contenu iframe - adapté pour mobile/desktop */}
            <div className="absolute inset-0">
              <iframe 
                src="https://lesailes.vercel.app"
                title="Les Ailes Yoga - Site web" 
                className="w-full h-full"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts"
                style={{ 
                  minWidth: isMobile ? 'auto' : '1200px', 
                  transform: isMobile ? 'scale(1)' : 'scale(1)', 
                  transformOrigin: 'center top' 
                }}
              />
            </div>
            
            {/* Bouton visiter en haut à droite */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
              <a 
                href="https://lesailes.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#FFB5CA] hover:bg-#F8F7F4 text-[#222222] font-extrabold text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                itemProp="url"
              >
                <span className="mr-1 md:mr-2">Visiter</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Titre du projet - maintenant placé sous l'iframe */}
          <motion.h2 
            className="text-xl md:text-3xl font-extrabold text-[#FFB5CA] mb-3 md:mb-4" 
            itemProp="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            lesailes.vercel.app
          </motion.h2>
          
          {/* Description du projet - adaptée pour mobile avec option "voir plus" */}
          <motion.div 
            className="text-[#F8F7F4] w-full md:w-4/5" 
            itemProp="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Premier paragraphe toujours visible - réduit à deux lignes max */}
            <p className="text-sm md:text-md mb-3 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
              Association de yoga implantée à Lyon depuis 10 ans, Les Ailes disposait d&apos;une clientèle fidèle mais exclusivement locale. Malgré la qualité de ses cours et la passion de ses instructeurs, son rayonnement était limité par l&apos;absence totale de présence en ligne et une communication reposant uniquement sur le bouche-à-oreille.
            </p>
            
            {/* Contenu supplémentaire pour mobile - conditionnel */}
            <div className={`${showFullText ? 'block' : 'hidden md:block'}`}>
              <p className="text-sm md:text-md mb-3 md:mb-4 leading-relaxed">
                Notre intervention a consisté à créer leur première vitrine digitale : un site épuré mais chaleureux, reflétant l&apos;essence et les valeurs de l&apos;association. Les nouveaux membres peuvent désormais découvrir l&apos;association en ligne, consulter les horaires et s&apos;inscrire directement via un formulaire sécurisé.
              </p>
            </div>
            
            {/* Bouton Voir plus/moins - uniquement sur mobile */}
            <button 
              className="block md:hidden text-[#FFB5CA] text-sm font-bold mt-2 mb-1"
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? 'Voir moins' : 'Voir plus'}
            </button>
          </motion.div>
        </article>
      </div>
    </>
  );
}