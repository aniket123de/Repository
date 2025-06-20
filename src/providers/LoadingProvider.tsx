"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '~/components/Loader';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const isInitialLoad = useRef(true);
  const previousPath = useRef<string>('');

  // Handle route changes - only show loader when navigating back to home from other routes
  useEffect(() => {
    // Skip loading on very first render (initial page load)
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      previousPath.current = pathname;
      return;
    }

    const isHomePage = pathname === '/';
    const comingFromOtherPage = previousPath.current !== '/' && previousPath.current !== '';
    
    // Only show loader when navigating back to home from other routes
    if (isHomePage && comingFromOtherPage) {
      console.log('NavigationLoader: Showing loader - returning to home from:', previousPath.current);
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        console.log('NavigationLoader: Hiding loader');
      }, 1200);

      // Update previous path after setting up the loader
      previousPath.current = pathname;
      
      return () => clearTimeout(timer);
    } else {
      // For other route changes, just update the previous path without showing loader
      previousPath.current = pathname;
      console.log('NavigationLoader: Route change to:', pathname, 'from:', previousPath.current, 'No loader needed');
    }
  }, [pathname]);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
