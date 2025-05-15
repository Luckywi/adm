import React from 'react';
import Image from 'next/image';

const XpCard: React.FC = () => {
  // Skills data with proper percentages matching the mockup
  const skills = [
    { name: 'HTML', percentage: 100, textColor: '#222222' },
    { name: 'CSS', percentage: 80, textColor: '#FFB5CA' },
    { name: 'JS', percentage: 70, textColor: '#FFB5CA' },
    { name: 'TAILWIND', percentage: 15, textColor: '#FFB5CA' },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-8">
     <div className="rounded-lg border-2 border-[#FFB5CA] p-4 bg-white">
     <div className="bg-[#222222] rounded-lg p-4 overflow-hidden relative">
        {/* Container with overflow:visible to allow logos to extend beyond boundaries */}
        <div className="relative overflow-visible">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row md:gap-8 md:justify-between">
          {/* Left Column: Technology Logos (positioned randomly) - 35% width */}
          <div className="w-[35%] relative h-64 overflow-visible">
            {/* Firebase logo - partially outside on the bottom left */}
            <div className="absolute -bottom-8 -left-10">
              <Image src="/firebase.svg" alt="Firebase" width={110} height={110} />
            </div>
            
            {/* Next.js logo - partially outside on the top */}
            <div className="absolute -top-12 right-10">
              <Image src="/nxt.svg" alt="Next.js" width={120} height={120} />
            </div>
            
            {/* React logo - centered but larger */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <Image src="/react.svg" alt="React" width={140} height={140} />
            </div>
            
            {/* Vercel logo - half outside on the right */}
            <div className="absolute top-1/4 -right-16">
              <Image src="/vrcl.svg" alt="Vercel" width={130} height={130} />
            </div>
          </div>

          {/* Right Column: Formation Info and Progress Bars - 65% width */}
          <div className="w-[65%] flex flex-col p-4 justify-between">
            {/* Formation Banner */}
            <div className="bg-[#222222] border-2 border-[#FFB5CA] rounded-lg mb-8">
              <div className="flex items-center gap-4 p-3">
                <Image src="/oc.svg" alt="OpenClassrooms" width={80} height={80} className="w-27 h-27" />
                <div>
                  <h4 className="text-white text-sm font-bold">
                    Formation Développeur Web (Alternance)
                  </h4>
                  <p className="text-white text-sm">
                    Mai 2024 – Mai 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="w-full">
                  <div className="relative h-8 bg-[#222222] rounded-lg border-2 border-[#FFB5CA] overflow-hidden">
                    {/* Progress Bar - Using inset to eliminate gap between bar and border */}
                    <div
                      className="absolute top-0 left-0 h-full bg-[#FFB5CA] flex items-center"
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
            <div className="bg-[#222222] border-2 border-[#FFB5CA] rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <Image src="/oc.svg" alt="OpenClassrooms" width={40} height={40} className="w-16 h-16" />
                <div>
                  <h3 className="text-white text-sm font-bold">
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
                  <div className="relative h-8 bg-[#222222] rounded-lg border-2 border-[#FFB5CA] overflow-hidden">
                    {/* Progress Bar - Using absolute positioning to eliminate gap */}
                    <div
                      className="absolute top-0 left-0 h-full bg-[#FFB5CA] flex items-center"
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

          {/* Bottom Section: Technology Logos (positioned in a less structured way) */}
          <div className="relative h-32 overflow-visible">
            {/* Firebase logo - partially outside left */}
            <div className="absolute -left-10 top-1/4">
              <Image src="/firebase.svg" alt="Firebase" width={90} height={90} />
            </div>
            
            {/* React logo - bottom with part outside */}
            <div className="absolute left-1/3 -bottom-10">
              <Image src="/react.svg" alt="React" width={95} height={95} />
            </div>
            
            {/* Next.js logo - top with part outside */}
            <div className="absolute right-1/3 -top-10">
              <Image src="/nxt.svg" alt="Next.js" width={85} height={85} />
            </div>
            
            {/* Vercel logo - partially outside right */}
            <div className="absolute -right-10 top-1/4">
              <Image src="/vrcl.svg" alt="Vercel" width={90} height={90} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</div>
  );
}
export default XpCard;