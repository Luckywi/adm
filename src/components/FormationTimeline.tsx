'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';

interface FormationModule {
  title: string;
  duration: string;
  icon?: string;
}

interface SkillItem {
  title: string;
  description: string;
  icon: string;
}

interface FormationTimelineProps {
  modules: FormationModule[];
}

// Skills data avec des descriptions simplifiées
const SKILLS_ITEMS: SkillItem[] = [
  {
    title: "Front-end",
    description: "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS",
    icon: "code",
  },
  {
    title: "Back-end",
    description: "Node.js, Express, MongoDB, API REST, Authentication",
    icon: "server",
  },
  {
    title: "Outils",
    description: "Git, GitHub, SEO, Debugging, Performances, Tests",
    icon: "tools",
  },
  {
    title: "Design",
    description: "Figma, UI/UX, Responsive, Accessibilité, Design System",
    icon: "design",
  },
];

const FormationTimeline: React.FC<FormationTimelineProps> = ({ modules }) => {
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Icônes SVG pour les compétences
  const getIconSvg = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'server':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
      case 'tools':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        );
      case 'design':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 bg-white rounded-lg"
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
          className="mb-8 flex justify-center"
        >
          <div className="bg-[#222222] rounded-lg p-4 inline-flex items-center shadow-sm">
            <Image src="/oc.svg" alt="OpenClassrooms" width={100} height={100} className="mr-4" />
            <div>
              <h3 className="text-white font-bold text-sm md:text-base">Formation Développeur Web (Alternance)</h3>
              <p className="text-white text-xs md:text-sm">Mai 2024 – Mai 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline avec modules - Style épuré */}
        <div className="relative flex flex-col items-center mb-14">
          {/* Ligne verticale simple */}
          <motion.div 
  variants={itemVariants}
  className="absolute top-0 bg-[#FFB5CA] z-0 w-[2px] left-4 md:left-1/2 transform md:-translate-x-1/2"
style={{ height: `calc(100% - 20px)` }}
/>
          
          {/* Fin de la ligne avec connexion aux compétences */}
          <div className="absolute left-0 bottom-0 w-full">
            <motion.div
              className="absolute left-4 md:left-1/2 bottom-0 w-[20px] h-[20px] z-10 bg-white rounded-full border-2 border-[#FFB5CA] flex items-center justify-center transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#222222" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </motion.div>
          </div>

          {/* Modules */}
          <div className="w-full">
            {modules.map((module, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row md:items-center mb-8 relative ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node - minimaliste avec meilleur centrage */}
                <div className="absolute left-4 md:left-1/2 top-1/2 w-[10px] h-[10px] rounded-full bg-[#FFB5CA] z-10" style={{ transform: 'translate(-50%, -50%)' }} />
                
                {/* Content Box - style simplifié */}
                <div 
                  className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:ml-8 md:mr-auto' : 'md:mr-8 md:ml-auto'
                  }`}
                >
                  <div className="bg-white rounded-lg border-2 border-[#FFB5CA] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex flex-col h-full">
                      <h4 className="text-sm md:text-base font-bold text-[#222222] mb-1">{module.title}</h4>
                      <p className="text-[#222222] text-xs">{module.duration}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills section - style minimaliste */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="relative mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS_ITEMS.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                className="bg-white rounded-lg border-2 border-[#FFB5CA] p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-full bg-[#FFB5CA] text-[#222222] flex-shrink-0">
                    {getIconSvg(skill.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#222222] mb-1">{skill.title}</h4>
                    <p className="text-sm text-[#222222]">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FormationTimeline;