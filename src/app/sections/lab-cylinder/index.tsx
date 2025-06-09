"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./lab-cylinder.module.scss";

// Fallback styles object in case CSS module fails to load
const fallbackStyles = {
  eventsSection: 'eventsSection',
  container: 'container',
  sectionHeading: 'sectionHeading',
  eventsGrid: 'eventsGrid',
  eventColumn: 'eventColumn',
  columnHeading: 'columnHeading',
  stackList: 'stackList',
  stackItem: 'stackItem',
  expanded: 'expanded',
  hackathon: 'hackathon',
  workshop: 'workshop',
  webinar: 'webinar',
  stackHeader: 'stackHeader',
  eventMeta: 'eventMeta',
  eventDate: 'eventDate',
  eventTitle: 'eventTitle',
  eventType: 'eventType',
  expandButton: 'expandButton',
  expandedContent: 'expandedContent',
  description: 'description',
  learnMoreLink: 'learnMoreLink',
  viewAllContainer: 'viewAllContainer',
  viewAllButton: 'viewAllButton',
  modalOverlay: 'modalOverlay',
  modalContent: 'modalContent',
};

// Use fallback if styles fail to load
const styles = s && Object.keys(s).length > 0 ? s : fallbackStyles;

interface Partnership {
  id: number;
  name: string;
  date: string;
  description: string;
  logo: string;
  pdf: string;
}

export const LabCylinder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "50px", // Start animation slightly before the section comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  // Partnership data
  const partnerships = [
    {
      id: 1,
      name: "HACK{0}LUTION 2K25",
      date: "Jun 26-27, 2025",
      description: "36 hours of non-stop innovation! Open-theme hackathon at IEM Ashram Campus.",
      logo: "/hackathon-logos/hackolutionlogo.jpeg",
      pdf: "/hackathon-logos/MoU Hackolution.pdf",
    },
    {
      id: 2,
      name: "Metamorph 2K25",
      date: "TBD 2025",
      description: "Transform ideas into reality through innovative coding solutions.",
      logo: "/hackathon-logos/metamorph2k25_logo.jpeg",
      pdf: "/hackathon-logos/MetamorphMoU.docx",
    },
    {
      id: 3,
      name: "StatusCode2",
      date: "Jun 20-21, 2025",
      description: "The wildest hackathon of the year! Code till your fingers cramp.",
      logo: "/hackathon-logos/sc2logo.png",
      pdf: "/hackathon-logos/MoU StatusCode2.docx",
    },
  ];

  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const openPdfModal = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  const closePdfModal = () => {
    setSelectedPdf(null);
  };

  return (
    <section className={styles.eventsSection} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeading}>HACKATHON PARTNERSHIPS</h2>
        
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.eventsGrid}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              padding: '2rem 0',
              justifyItems: 'center'
            }}
          >
            {partnerships.map((partnership, index) => (
              <PartnershipCard
                key={partnership.id}
                partnership={partnership}
                variants={itemVariants}
                custom={index}
                styles={styles}
                onOpenPdf={openPdfModal}
              />
            ))}
          </motion.div>
        </AnimatePresence>        {/* PDF/Document Modal */}
        <AnimatePresence>
          {selectedPdf && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePdfModal}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '2rem'
              }}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1rem',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  overflow: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3>Memorandum of Understanding</h3>
                  <button
                    onClick={closePdfModal}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>
                {selectedPdf.endsWith('.pdf') ? (
                  <iframe
                    src={selectedPdf}
                    style={{
                      width: '100%',
                      height: '70vh',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    title="MoU PDF"
                  />
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '70vh',
                    color: '#333',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                      This document cannot be previewed in the browser.
                    </p>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                      Click the button below to download and view the MoU document.
                    </p>
                    <a
                      href={selectedPdf}
                      download
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: '25px',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      }}
                    >
                      Download MoU Document
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Partnership card component
const PartnershipCard = ({
  partnership,
  variants,
  custom,
  styles,
  onOpenPdf,
}: {
  partnership: {
    id: number;
    name: string;
    date: string;
    description: string;
    logo: string;
    pdf: string;
  };
  variants: any;
  custom: number;
  styles: any;
  onOpenPdf: (pdfUrl: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.stackItem} ${styles.hackathon}`}
      variants={variants}
      custom={custom}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        minHeight: '350px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Logo Container */}
      <motion.div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          overflow: 'hidden'
        }}
        animate={{
          rotate: isHovered ? 5 : 0
        }}
      >
        <img
          src={partnership.logo}
          alt={`${partnership.name} logo`}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain'
          }}
        />
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 className={styles.eventTitle} style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
            {partnership.name}
          </h3>
          <span className={styles.eventDate} style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            {partnership.date}
          </span>
          <p 
            className={styles.description} 
            style={{ 
              margin: '1rem 0', 
              fontSize: '0.9rem', 
              lineHeight: '1.4',
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            {partnership.description}
          </p>
        </div>

        {/* View MoU Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPdf(partnership.pdf);
          }}
          className={styles.learnMoreLink}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            alignSelf: 'center',
            marginTop: '1rem'
          }}
          whileHover={{
            scale: 1.05,
            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          View MoU
        </motion.button>
      </div>

      {/* Decorative elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
        animate={{
          rotate: isHovered ? 180 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};