import React from 'react';
import Image from 'next/image';

const XpCard: React.FC = () => {
  // Skills data with proper percentages matching the mockup
  const skills = [
    { name: 'HTML', percentage: 100, textColor: '#222222' },
    { name: 'CSS', percentage: 80, textColor: '#FFB5CA' },
    { name: 'JS', percentage: 70, textColor: '#FFB5CA' },
    { name: 'TAILWIND', percentage: 10, textColor: '#FFB5CA' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-1">
      <div className="bg-[#222222] rounded-3xl p-6 overflow-hidden border-4 border-pink-100">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row md:gap-8 md:justify-between">
          {/* Left Column: Technology Logos (positioned randomly) - 35% width */}
          <div className="w-[35%] relative h-64">
            {/* Firebase logo - more spread out positioning */}
            <div className="absolute bottom-2 left-2">
              <Image src="/firebase.svg" alt="Firebase" width={90} height={90} />
            </div>
            
            {/* Next.js logo - more spread out */}
            <div className="absolute top-0 right-2">
              <Image src="/nxt.svg" alt="Next.js" width={100} height={100} />
            </div>
            
            {/* React logo - more spread out */}
            <div className="absolute bottom-16 left-1/3 -translate-x-1/3">
              <Image src="/react.svg" alt="React" width={120} height={120} />
            </div>
            
            {/* Vercel logo - more spread out */}
            <div className="absolute top-1/3 right-0 -translate-y-1/4">
              <Image src="/vrcl.svg" alt="Vercel" width={110} height={110} />
            </div>
          </div>

          {/* Right Column: Formation Info and Progress Bars - 65% width */}
          <div className="w-[65%] flex flex-col justify-between">
            {/* Formation Banner */}
            <div className="bg-[#222222] border-2 border-[#FFB5CA] rounded-2xl mb-8">
              <div className="flex items-center gap-4 p-3">
                <Image src="/oc.svg" alt="OpenClassrooms" width={80} height={80} className="w-16 h-16" />
                <div>
                  <h4 className="text-white font-bold">
                    Formation Développeur Web (Alternance)
                  </h4>
                  <p className="text-white text-sm">
                    Mai 2024 – Mai 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="w-full">
                  <div className="relative h-8 bg-[#222222] rounded-full border-2 border-gray-800">
                    {/* Progress Bar */}
                    <div
                      className="h-full bg-[#FFB5CA] rounded-full flex items-center"
                      style={{ width: `${skill.percentage}%` }}
                    >
                      {/* Percentage Text - bigger for small percentages */}
                      <span className={`absolute left-4 text-sm font-bold ${skill.percentage <= 10 ? 'text-lg' : ''}`}>
                        {skill.percentage}%
                      </span>
                    </div>
                    {/* Skill Name (right aligned) with dynamic color */}
                    <span 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-bold"
                      style={{ color: skill.textColor }}
                    >
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top Section: Formation Info and Progress Bars - Make this larger */}
          <div className="mb-8 w-full">
            {/* Formation Banner */}
            <div className="bg-[#222222] border-2 border-[#FFB5CA] rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-4">
                <Image src="/oc.svg" alt="OpenClassrooms" width={40} height={40} className="w-10 h-10" />
                <div>
                  <h3 className="text-white font-bold">
                    Formation Développeur Web (Alternance)
                  </h3>
                  <p className="text-white text-sm">
                    Mai 2024 – Mai 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="w-full">
                  <div className="relative h-8 bg-[#222222] rounded-full">
                    {/* Progress Bar */}
                    <div
                      className="h-full bg-[#FFB5CA] rounded-full flex items-center"
                      style={{ width: `${skill.percentage}%` }}
                    >
                      {/* Percentage Text - bigger for small percentages */}
                      <span className={`absolute left-4 text-sm font-bold ${skill.percentage <= 20 ? 'text-lg' : ''}`}>
                        {skill.percentage}%
                      </span>
                    </div>
                    {/* Skill Name (right aligned) with dynamic color */}
                    <span 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-bold"
                      style={{ color: skill.textColor }}
                    >
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Technology Logos (positioned in a less structured way) */}
          <div className="relative h-32">
            {/* Firebase logo - left */}
            <div className="absolute left-0 top-1/3">
              <Image src="/firebase.svg" alt="Firebase" width={70} height={70} />
            </div>
            
            {/* React logo - center left */}
            <div className="absolute left-1/5 bottom-0">
              <Image src="/react.svg" alt="React" width={75} height={75} />
            </div>
            
            {/* Next.js logo - center right */}
            <div className="absolute right-1/5 top-0">
              <Image src="/nxt.svg" alt="Next.js" width={70} height={70} />
            </div>
            
            {/* Vercel logo - right */}
            <div className="absolute right-0 top-1/3">
              <Image src="/vrcl.svg" alt="Vercel" width={80} height={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XpCard;