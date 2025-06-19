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
    // Show loader on every component mount
    // This covers: initial website opening, page refresh, navigation to home
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []); // Empty dependency ensures it runs once per mount

  if (!isLoading) return null;

  return (
    <Loader 
      message="Welcome to Repository..." 
      spinnerColor="#57B9C2"
      backgroundColor="#000"
      size={50}
    />
  );
};

export default HomePageLoader;
