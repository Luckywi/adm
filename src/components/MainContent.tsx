'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Nav from './Nav'
import Carousel from '../ReactBits/Caroussel'
import InfiniteScroll from '../ReactBits/InfiniteScroll'
import SkillsComponent from '@/ReactBits/SkillsComponent'


const MainContent: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)


  const mesCompetences = [
    { title: "React", progress: "90%" },
    { title: "Next.js", progress: "85%" },
    { title: "Node.js", progress: "75%" },
    { title: "TypeScript", progress: "80%" }
  ];

  
  // Liste d'items avec la palette de couleurs #222222, #FFB5CA et blanc
  const originalItems = [
    {
      content: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg w-full min-h-[220px] transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden">
          <div className="p-8 flex flex-col h-full">
            <Link 
              href="https://francklebeurre-expertise.fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline transition-colors duration-200"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#222222] transition-colors duration-200 hover:text-[#FFB5CA]">
                francklebeurre-expertise.fr
              </h3>
            </Link>
            <p className="text-base text-[#222222] leading-relaxed mb-14">
              L&apos;expert-comptable spécialiste<br/>
              des professions libérales
            </p>
            <div className="absolute bottom-8 right-8">
              <a 
                href="https://francklebeurre-expertise.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#222222] font-extrabold inline-flex items-center px-5 py-2.5  text-[#FFB5CA] rounded-lg text-sm font-lg transition-all duration-300 hover:bg-[#FFB5CA] hover:text-white hover:shadow-md hover:shadow-[#FFB5CA]/20 hover:translate-y-[-2px] group"
              >
                <span className="mr-2">Voir le projet</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  xm