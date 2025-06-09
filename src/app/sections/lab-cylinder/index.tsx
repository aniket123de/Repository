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
      date: "Sep 6-7, 2025",
      description: "Transform ideas into reality through innovative coding solutions.",
      logo: "/hackathon-logos/metamorph2k25_logo.jpeg",
      pdf: "/hackathon-logos/MetamorphMoU.docx",
    },
    {
      id: 3,
      name: "StatusCode2",
      date: "Aug 23-24, 2025",
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
            variants={containerVariants}
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
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3>Memorandum of Understanding</h3>
                  <button onClick={closePdfModal}>×</button>
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
                  <div className={styles.downloadContainer || 'downloadContainer'}>
                    <div className={styles.documentIcon || 'documentIcon'}>📄</div>
                    <p>This document cannot be previewed in the browser.</p>
                    <p>Click the button below to download and view the MoU document.</p>
                    <a
                      href={selectedPdf}
                      download
                      className={styles.downloadButton || 'downloadButton'}
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
      className={styles.partnershipCard || 'partnershipCard'}
      variants={variants}
      custom={custom}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -8,
      }}
    >
      {/* Logo Container - No circle, flexible display */}
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
        </div>        {/* View MoU Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPdf(partnership.pdf);
          }}
          className={styles.viewMouButton || 'viewMouButton'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.text || 'text'}>View MoU</span>
        </motion.button>
      </div>
    </motion.div>
  );
};