'use client';

import React from 'react';

// Composant individuel pour chaque cercle de compétence
const SkillCircle = ({ title, progress }) => {
  // Convertir le pourcentage en nombre
  const progressValue = parseInt(progress, 10);
  
  // Calculer les paramètres du cercle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progressValue / 100);
  
  return (
    <div className="m-4">
      <div className="w-32 h-32">
        <svg viewBox="0 0 120 120">
          {/* Cercle de fond */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="#222222"
            stroke="222222"
            strokeWidth="5"
          />
          
          {/* Cercle de progression */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#FFB5CA"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90, 60, 60)"
          />
          
          {/* Texte du titre */}
          <text
            x="60"
            y="55"
            textAnchor="middle"
            fontSize="22"
            fontWeight="bold"
            fill="#FFB5CA"
          >
            {title}
          </text>
          
          {/* Texte du pourcentage */}
          <text
            x="60"
            y="80"
            textAnchor="middle"
            fontSize="16"
          >
            {progress}
          </text>
        </svg>
      </div>
    </div>
  );
};

// Composant principal pour afficher toutes les compétences
const SkillsComponent = ({ skills }) => {
  // Données par défaut si aucune compétence n'est fournie
  const defaultSkills = [
    { title: "JS", progress: "80%" },
    { title: "HTML", progress: "100%" },
    { title: "CSS", progress: "95%" },
    { title: "SWIFT", progress: "10%" }
  ];
  
  // Utiliser les compétences fournies ou les données par défaut
  const skillsData = skills || defaultSkills;

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Mes Compétences</h2>
      <div className="flex flex-wrap justify-center">
        {skillsData.map((skill, index) => (
          <SkillCircle
            key={index}
            title={skill.title}
            progress={skill.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsComponent;