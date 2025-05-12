'use client';

import React, { useRef, useEffect } from "react";
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
  itemMinHeight?: number;
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
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = "left",
  autoplay = true,
  autoplaySpeed = 2.0,
  autoplayDirection = "down",
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Valeurs équilibrées pour les transformations
  const getTiltTransform = (): string => {
    if (!isTilted) return "none";
    
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight =
      itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

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
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            y: `+=${distance}`,
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
      const speedPerFrame = autoplaySpeed * directionFactor;

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

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
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
          perspective: 1000px; /* Ajout d'un point de perspective au wrapper */
        }

        .infinite-scroll-container {
          width: ${width};
          cursor: grab;
          transform-style: preserve-3d;
        }

        .infinite-scroll-item {
          min-height: ${itemMinHeight}px;
          margin-top: ${negativeMargin};
          position: relative;
          padding: 1em;
          background: #FFB5CA;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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