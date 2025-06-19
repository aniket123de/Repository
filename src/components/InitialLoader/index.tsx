"use client";

import React, { useState, useEffect } from 'react';
import Loader from '~/components/Loader';

const InitialLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Check if this is a page refresh or initial load
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const isPageRefresh = navigationEntries[0]?.type === 'reload';
      const isInitialLoad = !sessionStorage.getItem('hasLoaded');

      if (isPageRefresh || isInitialLoad) {
        // Mark that the page has been loaded
        sessionStorage.setItem('hasLoaded', 'true');
        
        // Show loader for initial load/refresh
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
      } else {
        // Don't show loader for navigation
        setIsLoading(false);
      }
    }
  }, []);

  if (!isLoading) return null;

  return <Loader />;
};

export default InitialLoader;
