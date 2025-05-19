'use client';

import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform, MotionValue, SpringOptions } from "framer-motion";
import type { ReactElement } from 'react';
import Image from "next/image";

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  image: string;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

// Composant d'élément de carousel pour isoler l'utilisation de useTransform
interface CarouselItemComponentProps {
  item: CarouselItem;
  index: number;
  x: MotionValue<number>; // Type correct pour MotionValue
  trackItemOffset: number;
  itemWidth: number;
  round: boolean;
  effectiveTransition: SpringOptions | { duration: number }; // Type correct pour les transitions
  isMobile: boolean;
}

// Ce composant isolé permet d'utiliser useTransform correctement
const CarouselItemComponent = ({
  item,
  index,
  x,
  trackItemOffset,
  itemWidth,
  round,
  effectiveTransition,
}: CarouselItemComponentProps): ReactElement => {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  // Utilisation correcte de useTransform dans un composant React
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`relative shrink-0 ${
        round
          ? "flex flex-col items-center justify-center text-center bg-[#060606] border-0"
          : "bg-[#222] border border-[#222] rounded-lg overflow-hidden"
      } cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "auto",
        rotateY: rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={effectiveTransition}
    >
      {!round && (
        <div className="flex flex-col md:flex-row">
          {/* Contenu texte à gauche (en haut sur mobile) */}
          <div className="p-4 md:p-5 flex flex-col justify-center w-full md:w-2/3">
            <div className="mb-1 font-black text-base md:text-lg text-white">
              {item.title}
            </div>
            <p className="text-xs md:text-sm text-white">
              {item.description}
            </p>
          </div>
          
          {/* Image à droite (ou en bas sur mobile) */}
          <div className="w-full md:w-1/3 h-16 md:h-full flex justify-center items-center">
            <Image 
              src={item.image} 
              alt={item.title} 
              width={160}
              height={160}
              className="w-16 h-16 md:w-4/5 md:h-4/5 object-cover" 
            />
          </div>
        </div>
      )}

      {round && (
        <>
          <div className="p-0 m-0">
            <Image
              src={item.image} 
              alt={item.title} 
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg mb-2 md:mb-4" 
            />
          </div>
          <div className="p-2 md:p-3">
            <div className="mb-1 font-black text-base md:text-lg text-white">
              {item.title}
            </div>
            <p className="text-xs md:text-sm text-white">
              {item.description}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Site Vitrine",
    description: "Image de marque percutante avec optimisation SEO avancée",
    id: 1,
    image: "/vitrine.png",
  },
  {
    title: "Solution de Réservation",
    description: "Plateforme complète avec portail client et interface d'administration mobile",
    id: 2,
    image: "/rdv.png",
  },
  {
    title: "Design 3D",
    description: "Icônes et modèles 3D sur mesure pour votre identité visuelle",
    id: 3,
    image: "/3d.png",
  },
  {
    title: "Motion Design",
    description: "Animations vidéo pour campagnes publicitaires et contenus pédagogiques",
    id: 4,
    image: "/images/motion-design.jpg",
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: SpringOptions = {stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): ReactElement {
  const containerPadding = 16;
  const [containerWidth, setContainerWidth] = useState(baseWidth);
  const [isMobile, setIsMobile] = useState(false);
  const itemWidth = containerWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Gestion du responsive
  useEffect(() => {
    const updateDimensions = () => {
      // Détection des appareils mobiles
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Ajustement de la largeur du carousel en fonction de la taille d'écran
      if (mobile) {
        // Sur mobile: utiliser presque toute la largeur de l'écran
        setContainerWidth(Math.min(window.innerWidth - 32, baseWidth));
      } else {
        // Sur desktop: utiliser la taille par défaut
        setContainerWidth(baseWidth);
      }
    };

    // Mise à jour initiale
    updateDimensions();

    // Écoute des changements de taille d'écran
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [baseWidth]);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone.
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition: SpringOptions | { duration: number } = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // Typage correct des propriétés de contraintes de glissement
  type DragConstraintProps = {
    dragConstraints?: {
      left: number;
      right: number;
    }
  };
  
  const dragProps: DragConstraintProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round
          ? "rounded-lg border border-white"
          : isMobile 
            ? "rounded-lg" // Sans bordure rose sur mobile
            : "rounded-lg border-2 border-[#FFB5CA]" // Bordure rose sur desktop
      }`}
      style={{
        width: `${containerWidth}px`,
        ...(round && { height: `${containerWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselItemComponent
            key={index}
            item={item}
            index={index}
            x={x}
            trackItemOffset={trackItemOffset}
            itemWidth={itemWidth}
            round={round}
            effectiveTransition={effectiveTransition}
            isMobile={isMobile}
          />
        ))}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-8 md:bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-4 flex w-[120px] md:w-[150px] justify-between px-4 md:px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-lg cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}