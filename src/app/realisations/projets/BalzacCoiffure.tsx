// src/app/realisations/projets/BalzacCoiffure.tsx (version adaptée mobile)
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';

export default function BalzacCoiffure() {
  // State pour gérer l'affichage du texte complet en mobile
  const [showFullText, setShowFullText] = useState(false);

  // Schema.org JSON-LD pour le référencement
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Le Balzac Coiffure Décines",
    "url": "https://www.lebalzac-coiffure-decines.fr/",
    "description": "Salon de coiffure à Décines avec système de réservation en ligne et gestion administrative.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.lebalzac-coiffure-decines.fr/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* Script JSON-LD pour le SEO */}
      <Script
        id="schema-balzac-coiffure"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Conteneur principal - border supprimée en mobile */}
      <div className="md:rounded-lg md:border-2 md:border-[#FFB5CA] md:p-4 md:bg-white">
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
                src={`https://www.lebalzac-coiffure-decines.fr`}
                title="Le Balzac Coiffure Décines - Site web" 
                className="w-full h-full"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts"
                style={{ 
                  minWidth: window.innerWidth <= 768 ? 'auto' : '1200px', 
                  transform: window.innerWidth <= 768 ? 'scale(1)' : 'scale(1)', 
                  transformOrigin: 'center top' 
                }}
              />
            </div>
            
            {/* Bouton visiter - adapté pour mobile */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
              <a 
                href="https://www.lebalzac-coiffure-decines.fr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#FFB5CA] hover:bg-white text-[#222222] font-extrabold text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
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
          
          {/* Titre du projet - adapté pour mobile */}
          <motion.h2 
            className="text-xl md:text-3xl font-extrabold text-[#FFB5CA] mb-3 md:mb-4" 
            itemProp="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            lebalzac-coiffure-decines.fr
          </motion.h2>
          
          {/* Description du projet - adaptée pour mobile avec option "voir plus" */}
          <motion.div 
            className="text-white w-full md:w-4/5" 
            itemProp="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Premier paragraphe toujours visible - réduit à deux lignes max */}
            <p className="text-sm md:text-md mb-3 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
              Institution de Décines depuis plus de 30 ans, le salon de coiffure Le Balzac faisait face à un défi majeur : faute de présence digitale propre, il était devenu dépendant des plateformes comme Planity et Kute. Ces services, bien qu'apportant une clientèle, imposaient des commissions élevées et des rabais considérables sur les prestations.
            </p>
            
            {/* Contenu supplémentaire pour mobile - conditionnel */}
            <div className={`${showFullText ? 'block' : 'hidden md:block'}`}>
              <p className="text-sm md:text-md mb-3 md:mb-4 leading-relaxed">
                Notre approche a consisté à développer un écosystème digital complet : un site responsive avec système de réservation et paiement en ligne intégré, couplé à une application d'administration mobile optimisée pour iPad. Cette solution sur mesure redonne au Balzac son indépendance commerciale et lui permet de piloter son activité sans intermédiaire.
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