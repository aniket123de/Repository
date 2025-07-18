"use client";

import React, { useState, useEffect } from 'react';
import Loader from '~/components/Loader/LoaderAdvanced';

interface PageRefreshLoaderProps {
  pageName?: string;
  duration?: number;
}

const PageRefreshLoader: React.FC<PageRefreshLoaderProps> = ({ 
  pageName = 'Page', 
  duration = 1200 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simple approach: always show loader for the specified duration
    // This covers all scenarios: refresh, initial load, navigation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isLoading) return null;

  return <Loader message={pageName ? `Loading ${pageName}...` : ""} size={70} />;
};

export default PageRefreshLoader;
