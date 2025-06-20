"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '~/components/Loader/LoaderAdvanced';

const NavigationLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    // Simple approach: check if coming to home from specific routes
    const isHomePage = pathname === '/';
    
    if (isHomePage) {
      // Check if user was previously on other pages (stored in sessionStorage)
      const previousPath = sessionStorage.getItem('previousPath');
      const hasNavigatedFromOtherPages = previousPath && previousPath !== '/';
      
      // Debug logging
      console.log('NavigationLoader Debug:', {
        isHomePage,
        previousPath,
        hasNavigatedFromOtherPages,
        currentPath: pathname
      });
      
      if (hasNavigatedFromOtherPages) {
        console.log('Showing navigation loader...');
        setIsLoading(true);
        
        const timer = setTimeout(() => {
          console.log('Hiding navigation loader...');
          setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
      }
    }
    
    // Store current path for next navigation
    sessionStorage.setItem('previousPath', pathname);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
    }}>
      <Loader 
        message="Welcome back..." 
        spinnerColor="#57B9C2"
        backgroundColor="#000"
        size={70}
      />
    </div>
  );
};

export default NavigationLoader;
