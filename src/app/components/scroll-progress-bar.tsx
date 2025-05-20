"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgressBar = ({ color = '#57B9C2', height = 5 }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 120);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: 'transparent',
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{
          height: '100%',
          background: `linear-gradient(90deg, #fff 0%, ${color} 100%)`,
          transformOrigin: 'left',
          scaleX: scrollProgress / 100,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={isScrolling ? { type: 'spring', stiffness: 300, damping: 20 } : { type: 'spring', stiffness: 200, damping: 8, velocity: 2 }}
      />
    </div>
  );
}

export default ScrollProgressBar;
