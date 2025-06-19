"use client";

import { useLoading } from '~/providers/LoadingProvider';

/**
 * Custom hook to control loading state
 * @returns Object with loading state and control functions
 */
export const useLoadingControl = () => {
  const { isLoading, setLoading } = useLoading();

  /**
   * Show loading screen for a specified duration
   * @param duration Duration in milliseconds (default: 1000)
   */
  const showLoading = (duration: number = 1000) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, duration);
  };

  /**
   * Show loading screen manually
   */
  const startLoading = () => {
    setLoading(true);
  };

  /**
   * Hide loading screen manually
   */
  const stopLoading = () => {
    setLoading(false);
  };

  return {
    isLoading,
    showLoading,
    startLoading,
    stopLoading,
  };
};

export default useLoadingControl;
