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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

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
