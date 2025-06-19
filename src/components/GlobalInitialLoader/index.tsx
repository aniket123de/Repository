"use client";

import React, { useState, useEffect } from 'react';
import Loader from '~/components/Loader/LoaderAdvanced';

const GlobalInitialLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this is the first time loading the website in this session
    if (typeof window !== 'undefined') {
      const hasLoadedBefore = sessionStorage.getItem('hasInitiallyLoaded');
      
      if (!hasLoadedBefore) {
        // First load of the session
        setIsLoading(true);
        sessionStorage.setItem('hasInitiallyLoaded', 'true');
        
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Show for 1 second on initial load

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

export default GlobalInitialLoader;
