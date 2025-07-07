"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./lab-cylinder.module.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Fallback styles object in case CSS module fails to load
const fallbackStyles = {
  eventsSection: 'eventsSection',
  container: 'container',
  sectionHeading: 'sectionHeading',
  eventsGrid: 'eventsGrid',
  partnershipCard: 'partnershipCard',
  logoContainer: 'logoContainer',
  eventTitle: 'eventTitle',
  eventDate: 'eventDate',
  description: 'description',
  viewMouButton: 'viewMouButton',
  text: 'text',
  modalOverlay: 'modalOverlay',
  modalContent: 'modalContent',
  downloadContainer: 'downloadContainer',
  documentIcon: 'documentIcon',
  downloadButton: 'downloadButton',
};

// Use fallback if styles fail to load
const styles = s && Object.keys(s).length > 0 ? s : fallbackStyles;

interface Partnership {
  id: number;
  name: string;
  date: string;
  description: string;
  logo: string;
  link: string;
  venue: string;
}

export const LabCylinder = () => {  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [tappedCard, setTappedCard] = useState<number | null>(null);
  const tappedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const mobileCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);useEffect(() => {    // Detect mobile device - improved detection with throttling
    const checkIsMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isTouchDevice || isSmallScreen || isMobileUserAgent || hasCoarsePointer);
    };
      const throttledCheckIsMobile = () => {
      if (mobileCheckTimeoutRef.current) {
        clearTimeout(mobileCheckTimeoutRef.current);
      }
      mobileCheckTimeoutRef.current = setTimeout(checkIsMobile, 200); // Increased throttle for better performance
    };
    
    checkIsMobile();
    window.addEventListener('resize', throttledCheckIsMobile, { passive: true });

    const ctx = gsap.context(() => {
      // Section entry animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation with rotation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, rotateY: 90 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Typewriting effect for the heading when it comes into the viewport
      if (typewriterRef.current) {
        const text = "EVENT PARTNERSHIPS";
        const chars = text.split("");
        typewriterRef.current.textContent = "";

        ScrollTrigger.create({
          trigger: typewriterRef.current,
          start: "top 80%",
          onEnter: () => {
            const timeline = gsap.timeline();
            chars.forEach((char, i) => {
              timeline.to(typewriterRef.current, {
                textContent: text.slice(0, i + 1),
                duration: 0.05,
                ease: "none",
                x: 0, // Ensure the text starts from the left end
              });
            });

            // Add a glowing effect to the heading after typewriting
            timeline.to(typewriterRef.current, {
              textShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
              duration: 1,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          },
        });
      }

      // Floating animation for subtle background elements with rotation
      gsap.to(".floating-element", {
        y: "+=20",
        rotate: "360deg",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });    return () => {
      ctx.revert();
      window.removeEventListener('resize', throttledCheckIsMobile);
      if (mobileCheckTimeoutRef.current) {
        clearTimeout(mobileCheckTimeoutRef.current);
      }
      if (tappedTimeoutRef.current) {
        clearTimeout(tappedTimeoutRef.current);
      }
    };
  }, [isMobile]);// Partnership data
  const partnerships = [
    {
      id: 1,
      name: "HACK{0}LUTION 2K25",
      date: "Jun 26-27, 2025",
      description: "36 hours of non-stop innovation and coding madness!",
      logo: "/hackathon-logos/hackolutionlogo.jpeg",
      link: "http://www.hackolution.tech",
      venue: "IEM Ashram Campus",
    },
    {
      id: 3,
      name: "StatusCode2",
      date: "Aug 23-24, 2025",
      description: "The wildest hackathon of the year! Code till your fingers cramp.",
      logo: "/hackathon-logos/sc2logo.png",
      link: "https://statuscode-2.devfolio.co/?ref=843a4bfca8",
      venue: "IIIT Kalyani",
    },    {
      id: 2,
      name: "Metamorph 2K25",
      date: "Sep 6-7, 2025",
      description: "Transform ideas into reality through innovative coding solutions.",
      logo: "/hackathon-logos/metamorph2k25_logo.jpeg",
      link: "https://metamorph.example.com",
      venue: "Guru Nanak Institute of Technology",
    },
    {
      id: 5,
      name: "Hack4Brahma",
      date: "Sep 9-10, 2025",
      description: "An exciting hackathon bringing together innovators and developers in the northeast region.",
      logo: "/hackathon-logos/h4b.jpg", 
      link: "https://hack4brahmaputra.devfolio.co/?ref=843a4bfca8", 
      venue: "Guwahati",
    },
    {
      id: 4,
      name: "SAP Inside Track",
      date: "Aug 2, 2025",
      description: "A platform for the SAP community to network, learn, and grow together with SAP developments in Kolkata.",
      logo: "/hackathon-logos/sap.jpeg",
      link: "https://www.linkedin.com/company/sap-inside-track-kolkata/",
      venue: "St. Xavier's University",
    },];

  return (
    <section className={styles.eventsSection} ref={sectionRef}>
      <div className={styles.container}>        <h2 className={styles.sectionHeading} ref={typewriterRef}></h2>
        {/* Add floating elements for visual enhancement */}
        <div className="floating-element" style={{ position: "absolute", top: "10%", left: "5%", width: "100px", height: "100px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "50%" }}></div>
        <div className="floating-element" style={{ position: "absolute", bottom: "15%", right: "8%", width: "150px", height: "150px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "50%" }}></div>        <AnimatePresence mode="wait">
          <motion.div
            className={styles.eventsGrid}
            ref={(el) => {
              if (el) cardsRef.current.push(el);
            }}
          >            {partnerships.map((partnership, index) => (
              <PartnershipCard
                key={partnership.id}
                partnership={partnership}
                styles={styles}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                isMobile={isMobile}
                isTapped={isMobile ? index === tappedCard : false}
                onTap={(cardIndex: number) => {
                  if (isMobile) {
                    // Clear any existing timeout
                    if (tappedTimeoutRef.current) {
                      clearTimeout(tappedTimeoutRef.current);
                    }
                    
                    // Toggle tapped state
                    setTappedCard(prev => prev === cardIndex ? null : cardIndex);
                    
                    // Auto-hide after 3 seconds if tapped
                    if (tappedCard !== cardIndex) {
                      tappedTimeoutRef.current = setTimeout(() => {
                        setTappedCard(null);
                      }, 3000);
                    }
                  }
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const PartnershipCard = memo(({
  partnership,
  styles,
  index,
  hoveredIndex,
  setHoveredIndex,
  isMobile,
  isTapped,
  onTap,
}: {
  partnership: {
    id: number;
    name: string;
    date: string;
    description: string;
    logo: string;
    link: string;
    venue: string;
  };
  styles: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  isMobile: boolean;
  isTapped: boolean;
  onTap: (index: number) => void;
}) => {const [isHovered, setIsHovered] = useState(false);
  // For mobile, use only tap state; for desktop, use hover
  const shouldShowEffect = isMobile ? isTapped : hoveredIndex === index;
  return (
    <motion.div
      className={styles.partnershipCard || 'partnershipCard'}
      onHoverStart={() => {
        if (!isMobile) {
          setIsHovered(true);
          setHoveredIndex(index);
        }
      }}      onHoverEnd={() => {
        if (!isMobile) {
          setIsHovered(false);
          setHoveredIndex(null);
        }
      }}      onTap={() => {
        if (isMobile) {
          onTap(index);
        }
      }}
      whileTap={isMobile ? { scale: 0.98 } : {}}whileHover={!isMobile ? {
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }
      } : {}}      animate={isMobile ? (isTapped ? {
        y: -12,
        scale: 1.02,
        transition: { 
          duration: 0.25, 
          ease: "easeOut",
          type: "tween"
        }
      } : {
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.2, 
          ease: "easeOut",
          type: "tween"
        }
      }) : {}}style={{ 
        position: 'relative',        // Simplified mobile shadow effects for better performance
        ...(isMobile && isTapped ? {
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
          borderColor: 'rgba(87, 185, 194, 0.4)',
          transform: 'translate3d(0, 0, 0)', // Hardware acceleration
          backfaceVisibility: 'hidden', // Prevent flickering
          willChange: 'transform' // Only when animating
        } : isMobile ? {
          willChange: 'auto' // Reset when not animating
        } : {}),
        // Mobile-specific styling
        ...(isMobile ? {
          padding: '20px 16px',
          minHeight: '320px',
          maxWidth: '100%'
        } : {})
      }}
    >      {/* Animated Hover Background Effect */}
      <AnimatePresence>
        {shouldShowEffect && (
          <motion.span
            style={{
              position: 'absolute',
              inset: 0,
              height: '100%',
              width: '100%',
              background: isMobile && isTapped ? 
                'linear-gradient(135deg, rgba(87, 185, 194, 0.2) 0%, rgba(87, 185, 194, 0.08) 50%, transparent 100%)' :
                'linear-gradient(135deg, rgba(87, 185, 194, 0.15) 0%, rgba(87, 185, 194, 0.05) 50%, transparent 100%)',
              borderRadius: 'inherit', // This will inherit the border radius from the parent card
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(87, 185, 194, 0.4)',
              boxShadow: `
                0 8px 32px rgba(87, 185, 194, 0.15),
                0 4px 16px rgba(87, 185, 194, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
              zIndex: 1,
            }}
            layoutId={isMobile ? `mobileBackground-${index}` : "hoverBackground"}            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { 
                duration: isMobile ? 0.2 : 0.3,
                ease: "easeOut"
              },
            }}
            exit={{
              opacity: 0,
              transition: { 
                duration: isMobile ? 0.15 : 0.2,
                ease: "easeOut"
              },
            }}
          />
        )}
      </AnimatePresence>{/* Original Card Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>        {/* Logo Container */}        <motion.div
          className={styles.logoContainer || 'logoContainer'}          animate={{
            scale: shouldShowEffect ? 1.04 : 1,
          }}          transition={{ 
            duration: 0.2, 
            ease: "easeOut"
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: isMobile ? 'auto' : undefined,
            minHeight: isMobile ? '80px' : undefined,
            maxHeight: isMobile ? '100px' : undefined,
            margin: isMobile ? '0 auto 16px auto' : '0 auto 20px auto',
            padding: isMobile ? '8px' : '0'
          }}
        >
          <Image
            src={partnership.logo}
            alt={`${partnership.name} logo`}
            width={
              isMobile ? 
                (partnership.name === "Metamorph 2K25" || partnership.name === "SAP Inside Track Kolkata" 
                  ? 80 : 90) :
                (partnership.name === "Metamorph 2K25" || partnership.name === "SAP Inside Track Kolkata" 
                  ? 100 : 120)
            }
            height={
              isMobile ? 
                (partnership.name === "Metamorph 2K25" || partnership.name === "SAP Inside Track Kolkata" 
                  ? 40 : 45) :
                (partnership.name === "Metamorph 2K25" || partnership.name === "SAP Inside Track Kolkata" 
                  ? 50 : 60)
            }
            style={{ 
              objectFit: "contain",
              display: 'block',
              maxWidth: isMobile ? '90%' : '100%',
              height: 'auto'
            }}
          />
        </motion.div>{/* Content */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          width: '100%',
          minHeight: isMobile ? '240px' : '280px',
          padding: isMobile ? '0 8px' : '0'
        }}>
          <div style={{ marginBottom: isMobile ? '16px' : '20px' }}>
            <h3 className={styles.eventTitle || 'eventTitle'} style={{
              fontSize: isMobile ? 'clamp(18px, 4vw, 22px)' : undefined,
              lineHeight: isMobile ? '1.3' : undefined,
              marginBottom: isMobile ? '8px' : undefined
            }}>
              {partnership.name}
            </h3>
            <span className={styles.eventDate || 'eventDate'} style={{
              fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : undefined,
              marginBottom: isMobile ? '12px' : undefined,
              display: 'block'
            }}>
              {partnership.date}
            </span>
            <p className={styles.description || 'description'} style={{
              fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : undefined,
              lineHeight: isMobile ? '1.4' : undefined,
              marginBottom: isMobile ? '8px' : undefined
            }}>
              {partnership.description}
            </p>
            <p className={styles.description || 'description'} style={{
              fontSize: isMobile ? 'clamp(11px, 2.8vw, 13px)' : undefined,
              lineHeight: isMobile ? '1.3' : undefined,
              marginBottom: isMobile ? '0' : undefined
            }}>
              <strong>Venue:</strong> {partnership.venue}
            </p>
          </div>{/* View More Button */}          <motion.a
            href={partnership.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMouButton || 'viewMouButton'}
            onClick={(e) => {
              // Prevent card tap handler from interfering with button click
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              // Prevent card touch events from interfering on mobile
              e.stopPropagation();
            }}
            onTouchEnd={(e) => {
              // Prevent card touch events from interfering on mobile
              e.stopPropagation();
            }}
            whileHover={!isMobile ? { 
              scale: 1.05,
              boxShadow: '0 4px 20px rgba(87, 185, 194, 0.3)'
            } : {}}            animate={isMobile ? (isTapped ? {
              scale: 1.02,
              borderColor: 'var(--color-orange)'
            } : {
              scale: 1,
              borderColor: 'rgba(87, 185, 194, 0.3)'
            }) : {}}
            whileTap={{ scale: 0.98 }}            transition={{ 
              duration: 0.15,
              ease: "easeOut"
            }}
            style={{
              // Ensure button has proper touch target size on mobile
              minHeight: isMobile ? '44px' : undefined,
              minWidth: isMobile ? '120px' : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              // Improve touch responsiveness
              touchAction: 'manipulation',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <span className={styles.text || 'text'}>View More</span>
          </motion.a>
        </div>
      </div>    </motion.div>
  );
});