'use client';

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/dist/Observer";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer);
}

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  isTilted?: boolean;
  tiltDirection?: "left" | "right";
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: "down" | "up";
  pauseOnHover?: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "30rem",
  maxHeight = "100%",
  negativeMargin = "-4rem",
  items = [],
  isTilted = false,
  tiltDirection = "left",
  autoplay = true,
  autoplaySpeed = 2.0,
  autoplayDirection = "down",
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détection de mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Valeurs équilibrées pour les transformations
  const getTiltTransform = (): string => {
    if (!isTilted) return "none";
    
    // Réduire l'effet de perspective sur mobile
    if (isMobile) {
      return tiltDirection === "left"
        ? "rotateX(8deg) rotateZ(0deg) skewX(0deg)"
        : "rotateX(8deg) rotateZ(5deg) skewX(-5deg)";
    }
    
    // Valeurs modérées pour garantir l'effet visuel sans trop décaler le composant
    return tiltDirection === "left"
      ? "rotateX(15deg) rotateZ(0deg) skewX(0deg)"
      : "rotateX(15deg) rotateZ(10deg) skewX(-10deg)";
  };

  // Calculer le décalage nécessaire pour compenser la transformation
  const getContainerStyles = () => {
    const baseStyles = {
      transform: getTiltTransform(),
      transformOrigin: "center center",
      width: isMobile ? "70%" : width,
    };
    
    // Ajout de styles spécifiques selon la direction
    if (isTilted) {
      if (tiltDirection === "right") {
        return {
          ...baseStyles,
          position: "relative",
          left: "0",
          right: "0",
          margin: "0 auto", // Centrage horizontal
        };
      } else {
        return {
          ...baseStyles,
          position: "relative",
          margin: "0 auto", // Centrage horizontal
        };
      }
    }
    
    return baseStyles;
  };

  // Adapter l'espace entre éléments pour mobile
  const getMobileAdjustedNegativeMargin = () => {
    return isMobile ? "-2rem" : negativeMargin;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    // Forcer une hauteur fixe pour toutes les cartes sur mobile
    divItems.forEach((child) => {
      // Hauteur adaptée sur mobile (min-height et max-height) et fixe sur desktop
      if (isMobile) {
        child.style.height = "auto";
        child.style.minHeight = "160px";
        child.style.maxHeight = "190px";
      } else {
        child.style.height = "230px";
      }
      
      // Réduire la taille des titres et boutons sur mobile
      if (isMobile) {
        // Obtenir les titres et les boutons dans les cartes
        const titles = child.querySelectorAll('h3');
        const buttons = child.querySelectorAll('a.bg-\\[\\#222222\\]');
        const paragraphs = child.querySelectorAll('p');
        
        titles.forEach(title => {
          title.classList.remove('text-2xl');
          title.classList.add('text-lg');
        });
        
        // Ajouter un <br> après chaque paragraphe sur mobile
        paragraphs.forEach(paragraph => {
          // Vérifier si un <br> a déjà été ajouté
          const nextElement = paragraph.nextElementSibling;
          if (nextElement && nextElement.tagName !== 'BR') {
            const breakElement = document.createElement('br');
            paragraph.parentNode?.insertBefore(breakElement, nextElement);
          }
        });
        
        buttons.forEach(button => {
          const buttonText = button.querySelector('span');
          if (buttonText && buttonText.textContent === "Voir le projet") {
            buttonText.textContent = "Voir";
          }
        });
      }
    });

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const measuredItemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    
    // Réduire l'espacement entre les éléments sur mobile
    const totalItemHeight = isMobile 
      ? measuredItemHeight + (itemMarginTop * 0.7) // 30% de réduction d'espacement sur mobile
      : measuredItemHeight + itemMarginTop;

    const totalHeight =
      measuredItemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    // Ajuster la sensibilité tactile pour mobile
    const touchSensitivity = isMobile ? 0.8 : 1.0;
    
    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = "grab";
      },
      onChange: ({ deltaY, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaY : deltaY;
        // Adaptation de la sensibilité pour mobile
        const distance = isDragging 
          ? d * (isMobile ? 3 : 5) 
          : d * (isMobile ? 6 : 10);
        
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: isMobile ? 0.3 : 0.5, // Animation plus rapide sur mobile
            ease: "expo.out",
            y: `+=${distance * touchSensitivity}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
      },
    });

    let rafId: number;
    if (autoplay) {
      const directionFactor = autoplayDirection === "down" ? 1 : -1;
      // Réduire la vitesse sur mobile pour une meilleure lisibilité
      const speedPerFrame = autoplaySpeed * directionFactor * (isMobile ? 0.7 : 1.0);

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => {
          rafId = requestAnimationFrame(tick);
        };

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);
        
        // Ajouter pause sur touch pour mobile
        container.addEventListener("touchstart", stopTicker);
        container.addEventListener("touchend", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
          container.removeEventListener("touchstart", stopTicker);
          container.removeEventListener("touchend", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          rafId && cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    isTilted,
    tiltDirection,
    negativeMargin,
    isMobile,
    width,
  ]);

  return (
    <>
      <style jsx>{`
        .infinite-scroll-wrapper {
          max-height: ${maxHeight};
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          perspective: ${isMobile ? '800px' : '1000px'}; /* Réduire la perspective sur mobile */
        }

        .infinite-scroll-container {
          cursor: grab;
          transform-style: preserve-3d;
        }

        .infinite-scroll-item {
          height: ${isMobile ? 'auto' : '230px'};
          min-height: ${isMobile ? '160px' : '230px'};
          max-height: ${isMobile ? '190px' : 'none'};
          margin-top: ${getMobileAdjustedNegativeMargin()};
          position: relative;
          padding: ${isMobile ? '0.6em' : '1em'};
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: ${isMobile ? 'none' : '2px solid #FFB5CA'};
          transform: ${isMobile ? 'scale(0.95)' : 'scale(1)'};
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
      `}</style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={getContainerStyles()}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;