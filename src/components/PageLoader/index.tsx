"use client";

import React, { useState, useEffect } from 'react';
import Loader from '~/components/Loader';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Handle initial page load
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 1200); // Show for 1.2 seconds on initial load

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    // Handle navigation events
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 400);
    };

    // Listen for navigation events
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      handleStart();
      originalPushState.apply(history, args);
      handleComplete();
    };

    history.replaceState = function(...args) {
      handleStart();
      originalReplaceState.apply(history, args);
      handleComplete();
    };

    // Listen for back/forward navigation
    window.addEventListener('popstate', () => {
      handleStart();
      handleComplete();
    });

    // Listen for page refresh
    window.addEventListener('beforeunload', handleStart);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handleStart);
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  // Show loader on initial load or navigation
  if (isInitialLoad || isLoading) {
    return <Loader />;
  }

  return null;
};

export default PageLoader;
