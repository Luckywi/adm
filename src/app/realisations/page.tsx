// src/app/realisations/page.tsx
'use client';

import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FranckLebeurre from './projets/FranckLebeurre';
import { motion } from 'framer-motion';
import BalzacCoiffure from './projets/BalzacCoiffure';
import LesAiles from './projets/LesAiles';

// Animation variants pour les entrées
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function RealisationsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Nav initialActiveIndex={1} />
      
        
        <motion.div 
          className="max-w-5xl mx-auto space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Projet FranckLebeurre */}
          <motion.div variants={itemVariants}>
            <FranckLebeurre />
          </motion.div>
          
          <motion.div variants={itemVariants}>
          <BalzacCoiffure />
          </motion.div>


          <motion.div variants={itemVariants}>
          <LesAiles />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="opacity-40 hover:opacity-90 transition-opacity duration-300"
          >
            <div className="h-64 border-2 border-dashed border-[#FFB5CA] rounded-lg flex items-center justify-center">
              <p className="text-xl text-[#222222] font-medium">Projet à venir</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}