'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
          {/* Formation Timeline Component */}
          <FormationTimeline 
            modules={formationModules}
          />
          
          {/* Skills Section */}
          <motion.div variants={itemVariants} className="mt-16 mb-24">
            <div className="bg-white rounded-lg border-2 border-[#FFB5CA] p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#222222] mb-6 text-center">
                Technologies & Compétences
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Frontend Skills */}
                <div className="rounded-lg bg-[#222222] p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#FFB5CA] mb-4">Front-end</h3>
                  <div className="space-y-4">
                    {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'].map((skill, index) => (
                      <div key={index} className="relative">
                        <div className="h-8 bg-[#222222] rounded-lg border-2 border-[#FFB5CA] overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#FFB5CA] flex items-center"
                            style={{ width: `${100 - index * 10}%` }}
                          >
                            <span className="absolute left-4 text-sm font-bold">
                              {100 - index * 10}%
                            </span>
                          </div>
                          <span 
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-bold text-white"
                          >
                            {skill}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Backend Skills */}
                <div className="rounded-lg bg-[#222222] p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#FFB5CA] mb-4">Back-end & Outils</h3>
                  <div className="space-y-4">
                    {['Node.js', 'Express', 'MongoDB', 'Git', 'Figma', 'SEO'].map((skill, index) => (
                      <div key={index} className="relative">
                        <div className="h-8 bg-[#222222] rounded-lg border-2 border-[#FFB5CA] overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#FFB5CA] flex items-center"
                            style={{ width: `${95 - index * 12}%` }}
                          >
                            <span className="absolute left-4 text-sm font-bold">
                              {95 - index * 12}%
                            </span>
                          </div>
                          <span 
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-bold text-white"
                          >
                            {skill}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Technologies Logos */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-[#222222] rounded-lg p-6 relative overflow-hidden">
              <h2 className="text-2xl font-bold text-[#FFB5CA] mb-8 text-center">
                Technologies Maîtrisées
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
                {/* SVG icons positioned here with styling */}
                <div className="flex justify-center items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Image src="/react.svg" alt="React" width={128} height={128} className="object-contain" />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Image src="/nxt.svg" alt="Next.js" width={128} height={128} className="object-contain" />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Image src="/firebase.svg" alt="Firebase" width={128} height={128} className="object-contain" />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Image src="/vrcl.svg" alt="Vercel" width={128} height={128} className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}