"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FytSection } from '~/app/components/fyt';
import './fyt-page.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollProgressBar = dynamic(
  () => import("~/app/components/scroll-progress-bar"),
  { ssr: false }
);

const ScrollToTopButton = dynamic(
  () => import("~/app/components/scroll-to-top-button"),
  { ssr: false }
);

export default function FytPage() {
  useEffect(() => {
    // Initial page entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      "main",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.inOut" }
    );
    
    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
    return (
    <>
      <ScrollProgressBar />
      <main className="fyt-page">
        <FytSection />
      </main>
      <ScrollToTopButton />
    </>
  );
}
