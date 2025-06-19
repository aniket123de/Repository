"use client";

import React, { useState, useEffect } from 'react';
import Loader from '~/components/Loader/LoaderAdvanced';

interface HomePageLoaderProps {
  duration?: number;
}

const HomePageLoader: React.FC<HomePageLoaderProps> = ({ 
  duration = 1500 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always show loader on component mount (covers initial load and refresh)
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it runs once per mount

  useEffect(() => {
    // Additional handler for page visibility changes (handles refresh scenarios)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), duration);
      }
    };

    // Listen for page becoming visible after refresh
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [duration]);

  if (!isLoading) return null;

  return (
    <Loader 
      message="" 
      spinnerColor="#57B9C2"
      backgroundColor="#000"
      size={70}
    />
  );
};

export default HomePageLoader;
