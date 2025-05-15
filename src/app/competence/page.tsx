'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FormationTimeline from '@/components/FormationTimeline';

// Formation modules data
const formationModules = [
  {
    title: "Créez la page d'accueil d'une agence de voyage avec HTML & CSS",
    duration: "60H"
  },
  {
    title: "Créez une page web dynamique avec JavaScript",
    duration: "60H"
  },
  {
    title: "Débuggez et optimisez LE SEO d'un site de photographe",
    duration: "50H"
  },
  {
    title: "Créez une application web de location immobilière avec React",
    duration: "60H"
  },
  {
    title: "Développez le back-end d'un site de notation de livres avec Node.js",
    duration: "60H"
  },
  {
    title: "Planifiez le développement du site de votre client",
    duration: "40H"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};



export default function CompetencePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Nav initialActiveIndex={2} />
        
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
  
          {/* Formation Timeline Component with integrated skills carousel */}
          <FormationTimeline modules={formationModules} />
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}