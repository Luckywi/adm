'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Carousel from '../ReactBits/Caroussel';

interface FormationModule {
  title: string;
  duration: string;
  icon?: string;
}

interface FormationTimelineProps {
  modules: FormationModule[];
}

// Création des items de compétences pour le carrousel
const SKILLS_ITEMS = [
  {
    title: "Front-end",
    description: "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS",
    id: 1,
    image: "./vitrine.png", // Utilisation d'une image existante
  },
  {
    title: "Back-end",
    description: "Node.js, Express, MongoDB, API REST, Authentication",
    id: 2,
    image: "./rdv.png", // Utilisation d'une image existante
  },
  {
    title: "Outils",
    description: "Git, GitHub, SEO, Debugging, Performances, Tests",
    id: 3,
    image: "./3d.png", // Utilisation d'une image existante
  },
  {
    title: "Design",
    description: "Figma, UI/UX, Responsive, Accessibilité, Design System",
    id: 4,
    image: "./vitrine.png", // Utilisation d'une image existante
  },
];

const FormationTimeline: React.FC<FormationTimelineProps> = ({
  modules
}) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 bg-white rounded-lg"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative"
      >
        {/* Logo OpenClassrooms */}
        <motion.div 
          variants={itemVariants} 
          className="mb-10 flex justify-center"
        >
          <div className="bg-[#222222] rounded-lg p-4 inline-flex items-center">
            <Image src="/oc.svg" alt="OpenClassrooms" width={100} height={100} className="mr-4" />
            <div>
              <h3 className="text-white font-bold text-sm">Formation Développeur Web (Alternance)</h3>
              <p className="text-white text-sm">Mai 2024 – Mai 2025</p>
            </div>
          </div>
        </motion.div>

        <div className="relative flex flex-col items-center">
          {/* Vertical Line - S'arrête exactement à la bordure du carrousel */}
          <motion.div 
            variants={lineVariants}
            className="absolute left-4 md:left-1/2 ml-[3px] md:-ml-[2px] top-0 w-[2px] bg-[#FFB5CA] z-0"
            style={{ height: 'calc(100% - 140px)' }} // Ajusté pour s'arrêter au début du carrousel
          />

          {/* Modules */}
          <div className="w-full">
            {modules.map((module, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row md:items-center mb-16 relative ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 -ml-[4px] md:-ml-[8px] mt-3 md:mt-0 w-[10px] h-[10px] md:w-[16px] md:h-[16px] rounded-full bg-[#FFB5CA] border-2 border-white z-10" />
                
                {/* Content Box */}
                <div 
                  className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:ml-12 md:mr-auto' : 'md:mr-12 md:ml-auto'
                  }`}
                >
                  <div className="bg-white backdrop-blur-sm rounded-lg border-2 border-[#FFB5CA] p-5 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex flex-col h-full">
                      <h4 className="text-lg md:text-xl font-bold text-[#222222] mb-2">{module.title}</h4>
                      <p className="text-[#222222] text-sm mb-1">{module.duration}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nœud de connexion final - Positionné juste avant le carrousel */}
          <motion.div 
            variants={itemVariants}
            className="absolute left-4 md:left-1/2 -ml-[6px] md:-ml-[10px] bottom-[140px] w-[14px] h-[14px] md:w-[20px] md:h-[20px]"
          />
          
          {/* Carrousel - Intégré comme continuation directe de la timeline */}
          <motion.div 
            variants={itemVariants}
          >
            <Carousel
              items={SKILLS_ITEMS}
              baseWidth={900}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormationTimeline;