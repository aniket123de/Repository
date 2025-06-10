"use client";

import Link from "next/link";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const typewriterRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
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
        const text = "HACKATHON PARTNERSHIPS";
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
    });

    return () => ctx.revert();
  }, []);

  // Partnership data
  const partnerships = [
    {
      id: 1,
      name: "HACK{0}LUTION 2K25",
      date: "Jun 26-27, 2025",
      description: "36 hours of non-stop innovation and coding madness!",
      logo: "/hackathon-logos/hackolutionlogo.jpeg",
      link: "https://hackolution.example.com",
      venue: "IEM Ashram Campus",
    },
    {
      id: 3,
      name: "StatusCode2",
      date: "Aug 23-24, 2025",
      description: "The wildest hackathon of the year! Code till your fingers cramp.",
      logo: "/hackathon-logos/sc2logo.png",
      link: "https://statuscode2.example.com",
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
  ];

  return (
    <section className={styles.eventsSection} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeading} ref={typewriterRef}></h2>
        {/* Add floating elements for visual enhancement */}
        <div className="floating-element" style={{ position: "absolute", top: "10%", left: "5%", width: "100px", height: "100px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "50%" }}></div>
        <div className="floating-element" style={{ position: "absolute", bottom: "15%", right: "8%", width: "150px", height: "150px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "50%" }}></div>
        <AnimatePresence mode="wait">
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
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// Partnership card component
const PartnershipCard = ({
  partnership,
  styles,
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
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.partnershipCard || 'partnershipCard'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -8,
      }}
    >
      {/* Logo Container */}
      <motion.div
        className={styles.logoContainer || 'logoContainer'}
        animate={{
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <img
          src={partnership.logo}
          alt={`${partnership.name} logo`}
        />
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <h3 className={styles.eventTitle || 'eventTitle'}>
            {partnership.name}
          </h3>
          <span className={styles.eventDate || 'eventDate'}>
            {partnership.date}
          </span>
          <p className={styles.description || 'description'}>
            {partnership.description}
          </p>
          <p className={styles.description || 'description'}>
            <strong>Venue:</strong> {partnership.venue}
          </p>
        </div>
        {/* View More Button */}
        <motion.a
          href={partnership.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewMouButton || 'viewMouButton'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.text || 'text'}>View More</span>
        </motion.a>
      </div>
    </motion.div>
  );
};