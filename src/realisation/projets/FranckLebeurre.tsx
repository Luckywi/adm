// src/components/projects/FranckLebeurreProject.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FranckLebeurreProject() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <article className="project-container space-y-8" itemScope itemType="http://schema.org/WebSite">
      {/* Project Header with iframe */}
      <div className="relative rounded-xl overflow-hidden border-2 border-[#FFB5CA] bg-gray-100 h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <iframe 
            src="https://francklebeurre-expertise.fr" 
            title="Franck Lebeurre Expertise - Site web" 
            className="w-full h-full"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
        
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <a 
            href="https://francklebeurre-expertise.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FFB5CA] hover:bg-white text-[#222222] font-extrabold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            itemProp="url"
          >
            Visiter le site
          </a>
        </div>
      </div>
      
      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Project Info - 3 columns on desktop */}
        <div className="md:col-span-3 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#FFB5CA]" itemProp="name">
            francklebeurre-expertise.fr
          </h2>
          
          <div className="prose text-[#222222]" itemProp="description">
            <p className="text-lg">
              Avec plus de 20 ans d'expertise, ce cabinet comptable spécialiste des professions libérales ne 
              possédait aucune présence en ligne. La croissance de cette entreprise reposée uniquement sur le 
              bouche à oreille.
            </p>
            <p className="text-lg">
              La mise en place d'un site vitrine moderne avec prise de rendez-vous intégrée, 
              des articles et vidéo éducatifs pour renforcer le SEO, ainsi qu'une prise en main du compte 
              LinkedIn de l'entreprise a permis à Franck Lebeurre Expert Comptable d'une présence en ligne et 
              d'une nouvelle image de marque moderne qui lui amène chaque mois des centaines de visites et 
              de nouveaux clients.
            </p>
          </div>
          
          {/* Development Accordion */}
          <div className="border-2 border-[#FFB5CA] rounded-lg overflow-hidden">
            <button 
              className="w-full px-6 py-4 bg-white text-left flex justify-between items-center"
              onClick={toggleAccordion}
            >
              <span className="text-xl font-bold text-[#222222]">Développement</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="#FFB5CA" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <motion.div 
              className="bg-gray-50 px-6 py-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isAccordionOpen ? 'auto' : 0,
                opacity: isAccordionOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">Technologies utilisées</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>React & Next.js pour le frontend</li>
                    <li>Tailwind CSS pour le style</li>
                    <li>Netlify pour l'hébergement</li>
                    <li>Contentful pour la gestion de contenu</li>
                    <li>Calendly pour la prise de rendez-vous</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">Optimisation SEO</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Structure sémantique HTML5</li>
                    <li>Métadonnées et Schema.org pour le référencement local</li>
                    <li>Optimisation des images et lazy loading</li>
                    <li>Pages AMP pour les articles du blog</li>
                    <li>Stratégie de contenu ciblant les mots-clés pertinents</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">Défis techniques</h3>
                  <p>
                    L'intégration du système de prise de rendez-vous avec les contraintes de disponibilité 
                    spécifiques a nécessité une personnalisation avancée de l'API Calendly.
                    La mise en place d'un tableau de bord d'analyse de performance a permis au client
                    de suivre l'évolution de sa présence en ligne et le ROI des actions marketing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Visual Details - 2 columns on desktop */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-[#222222]">Détails visuels</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#FFB5CA] relative">
              <Image 
                src="/franck-detail-1.jpg" 
                alt="Page d'accueil Franck Lebeurre Expertise" 
                layout="fill"
                objectFit="cover"
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#FFB5CA] relative">
              <Image 
                src="/franck-detail-2.jpg" 
                alt="Page services Franck Lebeurre Expertise" 
                layout="fill"
                objectFit="cover"
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#FFB5CA] relative">
              <Image 
                src="/franck-detail-3.jpg" 
                alt="Formulaire de contact Franck Lebeurre Expertise" 
                layout="fill"
                objectFit="cover"
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#FFB5CA] relative">
              <Image 
                src="/franck-detail-4.jpg" 
                alt="Version mobile Franck Lebeurre Expertise" 
                layout="fill"
                objectFit="cover"
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Results / Key Metrics */}
          <div className="bg-[#222222] text-white rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#FFB5CA] mb-4">Résultats</h3>
            
            <div className="space-y-3">
              <div>
                <p className="font-bold">Trafic mensuel</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div className="bg-[#FFB5CA] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm mt-1">+850 visiteurs/mois</p>
              </div>
              
              <div>
                <p className="font-bold">Nouveaux clients</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div className="bg-[#FFB5CA] h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm mt-1">+15 clients/mois</p>
              </div>
              
              <div>
                <p className="font-bold">Positionnement SEO</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div className="bg-[#FFB5CA] h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm mt-1">Top 3 sur les mots-clés cibles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}