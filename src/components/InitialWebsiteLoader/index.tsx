"use client";

import React, { useState, useEffect } from 'react';
import Loader from '~/components/Loader/LoaderAdvanced';

const InitialWebsiteLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this is a new session or refresh
    if (typeof window !== 'undefined') {
      const isNewSession = !sessionStorage.getItem('websiteInitialized');
      
      if (isNewSession) {
        // Mark as initialized and show loader
        sessionStorage.setItem('websiteInitialized', 'true');
        setIsLoading(true);
        
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Show for 1 second for initial load

        return () => clearTimeout(timer);
      }
    }
  }, []);
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

export default InitialWebsiteLoader;
