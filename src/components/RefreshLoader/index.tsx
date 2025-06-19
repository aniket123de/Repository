"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '~/components/Loader/LoaderAdvanced';

interface RefreshLoaderProps {
  pageName?: string;
  duration?: number;
}

const RefreshLoader: React.FC<RefreshLoaderProps> = ({ 
  pageName = 'Loading...', 
  duration = 1200 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Always show loader when component mounts (covers all cases)
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [pathname]); // Trigger on pathname change to handle navigation

  useEffect(() => {
    // Additional check for page visibility changes (covers refresh scenarios)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, duration);
      }
    };

    // Listen for page becoming visible (handles refresh and focus)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for page load events
    const handlePageLoad = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, duration);
    };

    window.addEventListener('load', handlePageLoad);
    window.addEventListener('pageshow', handlePageLoad);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('load', handlePageLoad);
      window.removeEventListener('pageshow', handlePageLoad);
    };
  }, [duration]);

  if (!isLoading) return null;

  return <Loader message={`Loading ${pageName}...`} />;
};

export default RefreshLoader;
