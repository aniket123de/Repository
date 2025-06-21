"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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

export const LabCylinder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const cardObserverRefs = useRef<HTMLDivElement[]>([]);  useEffect(() => {
    // Detect mobile device - improved detection
    const checkIsMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isTouchDevice || isSmallScreen || isMobileUserAgent);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    // Setup Intersection Observer for mobile scroll animations
    let observer: IntersectionObserver | null = null;
    
    const setupObserver = () => {
      if (isMobile && cardObserverRefs.current.length > 0) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
              if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                setVisibleCards(prev => {
                  const newSet = new Set(prev);
                  newSet.add(cardIndex);
                  return newSet;
                });
              } else {
                setVisibleCards(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(cardIndex);
                  return newSet;
                });
              }
            });
          },
          {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '-20% 0px -20% 0px'
          }
        );

        cardObserverRefs.current.forEach((card) => {
          if (card && observer) observer.observe(card);
        });
      }
    };

    // Setup observer with a delay to ensure cards are rendered
    const timeoutId = setTimeout(setupObserver, 200);

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
      window.removeEventListener('resize', checkIsMobile);
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
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
    },
    {
      id: 2,
      name: "Metamorph 2K25",
      date: "Sep 6-7, 2025",
      description: "Transform ideas into reality through innovative coding solutions.",
      logo: "/hackathon-logos/metamorph2k25_logo.jpeg",
      link: "https://metamorph.example.com",
      venue: "Guru Nanak Institute of Technology",
    },
    {
      id: 4,
      name: "SAP Inside Track Kolkata",
      date: "Aug 2, 2025",
      description: "A platform for the SAP community to network, learn, and grow together with SAP developments in Kolkata.",
      logo: "/hackathon-logos/sap.jpeg",
      link: "https://www.linkedin.com/company/sap-inside-track-kolkata/",
      venue: "St. Xavier's University",
    },
  ];

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
          >
            {partnerships.map((partnership, index) => (
              <PartnershipCard
                key={partnership.id}
                partnership={partnership}
                styles={styles}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                isMobile={isMobile}
                isVisible={visibleCards.has(index)}
                cardRef={(el: HTMLDivElement | null) => {
                  if (el) cardObserverRefs.current[index] = el;
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// Partnership card component with hover effect
const PartnershipCard = ({
  partnership,
  styles,
  index,
  hoveredIndex,
  setHoveredIndex,
  isMobile,
  isVisible,
  cardRef,
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
  isVisible: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {  const [isHovered, setIsHovered] = useState(false);

  // For mobile, use scroll-based visibility; for desktop, use hover
  const shouldShowEffect = isMobile ? isVisible : hoveredIndex === index;

  return (
    <motion.div
      className={styles.partnershipCard || 'partnershipCard'}
      ref={(el) => {
        cardRef(el);
        if (el) el.setAttribute('data-card-index', index.toString());
      }}
      onHoverStart={() => {
        if (!isMobile) {
          setIsHovered(true);
          setHoveredIndex(index);
        }
      }}
      onHoverEnd={() => {
        if (!isMobile) {
          setIsHovered(false);
          setHoveredIndex(null);
        }
      }}      whileHover={!isMobile ? {
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }
      } : {}}
      animate={isMobile ? (isVisible ? {
        y: -12,
        scale: 1.02,
        transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }
      } : {
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }
      }) : {}}      style={{ 
        position: 'relative',
        // Add CSS shadows for mobile to match hover effect
        ...(isMobile && isVisible ? {
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(87, 185, 194, 0.1)',
          borderColor: 'rgba(87, 185, 194, 0.3)'
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
              background: 'linear-gradient(135deg, rgba(87, 185, 194, 0.15) 0%, rgba(87, 185, 194, 0.05) 50%, transparent 100%)',
              borderRadius: '1.5rem',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(87, 185, 194, 0.4)',
              boxShadow: `
                0 8px 32px rgba(87, 185, 194, 0.15),
                0 4px 16px rgba(87, 185, 194, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
              zIndex: 1,
            }}
            layoutId={isMobile ? `mobileBackground-${index}` : "hoverBackground"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { 
                duration: isMobile ? 0.5 : 0.3,
                ease: [0.25, 0.8, 0.25, 1]
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { 
                duration: isMobile ? 0.3 : 0.2,
                delay: isMobile ? 0 : 0.1,
                ease: [0.25, 0.8, 0.25, 1]
              },
            }}
          />
        )}
      </AnimatePresence>{/* Original Card Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>        {/* Logo Container */}
        <motion.div
          className={styles.logoContainer || 'logoContainer'}
          animate={{
            scale: shouldShowEffect ? 1.1 : 1,
            rotateY: shouldShowEffect ? 5 : 0,
          }}
          transition={{ 
            duration: isMobile ? 0.5 : 0.4, 
            ease: [0.25, 0.8, 0.25, 1] 
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
            whileHover={!isMobile ? { 
              scale: 1.05,
              boxShadow: '0 4px 20px rgba(87, 185, 194, 0.3)'
            } : {}}
            animate={isMobile ? (isVisible ? {
              scale: 1.05,
              boxShadow: '0 4px 20px rgba(87, 185, 194, 0.3)',
              borderColor: 'var(--color-orange)'
            } : {
              scale: 1,
              boxShadow: 'none',
              borderColor: 'rgba(87, 185, 194, 0.3)'
            }) : {}}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: isMobile ? 0.5 : 0.2 }}
          >
            <span className={styles.text || 'text'}>View More</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};