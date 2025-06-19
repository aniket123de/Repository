"use client";

import React, { useState, useEffect } from 'react';
import Loader from '~/components/Loader/LoaderAdvanced';

interface HomePageLoaderProps {
  duration?: number;
}

const HomePageLoader: React.FC<HomePageLoaderProps> = ({ 
  duration = 1500 
}) => {
  const [isLoading, setIsLoading] = useState(true);  useEffect(() => {
    // Simple timeout to hide loader after specified duration
    console.log('HomePageLoader: Starting loader for', duration, 'ms');
    
    const timer = setTimeout(() => {
      console.log('HomePageLoader: Hiding loader after timeout');
      setIsLoading(false);
    }, duration);

    // Cleanup timer on unmount
    return () => {
      console.log('HomePageLoader: Cleaning up timer');
      clearTimeout(timer);
    };
  }, [duration]);

  // Don't render anything if not loading
  if (!isLoading) {
    return null;
  }

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
