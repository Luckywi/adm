// src/app/realisations/RealisationsPage.tsx
'use client';

import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FranckLebeurreProject from './projets/FranckLebeurre';

export default function RealisationsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Nav initialActiveIndex={1} /> {/* Set active index to "Réalisations" */}
        
        <h1 className="text-3xl font-extrabold text-[#222222] text-center mt-16 mb-12">
          Nos Réalisations
        </h1>
        
        <div className="max-w-5xl mx-auto space-y-24">
          {/* Project grid - We'll start with just one project and make it expandable */}
          <FranckLebeurreProject />
          
          {/* Additional project placeholders for future projects */}
          <div className="opacity-40 hover:opacity-90 transition-opacity duration-300">
            <div className="h-64 border-2 border-dashed border-[#FFB5CA] rounded-lg flex items-center justify-center">
              <p className="text-xl text-[#222222] font-medium">Projet à venir</p>
            </div>
          </div>
          
          <div className="opacity-40 hover:opacity-90 transition-opacity duration-300">
            <div className="h-64 border-2 border-dashed border-[#FFB5CA] rounded-lg flex items-center justify-center">
              <p className="text-xl text-[#222222] font-medium">Projet à venir</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}