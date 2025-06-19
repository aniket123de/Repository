"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '~/components/Loader';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on initial load/refresh
    const handleInitialLoad = () => {
      // Add a minimum loading time for better UX
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1 second minimum loading time

      return timer;
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleInitialLoad();
    } else {
      const timer = handleInitialLoad();
      const handleLoad = () => {
        clearTimeout(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      };

      window.addEventListener('load', handleLoad);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    // Show loader briefly on route change for consistency
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Don't render anything if not loading
  if (!isLoading) return null;

  return <Loader />;
};

export default GlobalLoader;
