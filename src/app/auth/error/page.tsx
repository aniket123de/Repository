"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../signin/signin.module.scss';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    // Log the error for debugging
    if (error) {
      console.error('Authentication error:', error);
    }
  }, [error]);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please try again later.';
      case 'AccessDenied':
        return 'Access denied. You may not have permission to sign in.';
      case 'Verification':
        return 'The verification link may have expired or already been used.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signInCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>Repository</div>
          <p className={styles.errorMessage}>
            {error ? getErrorMessage(error) : 'An error occurred during authentication'}
          </p>
        </div>
        
        <div className={styles.providers}>
          <Link href="/auth/signin" className={styles.githubButton}>
            Try Again
          </Link>
        </div>

        <div className={styles.footer}>
          <p>
            Need help? Contact{' '}
            <a href="mailto:support@repository.com">support@repository.com</a>
          </p>
        </div>
      </div>
    </div>
  );
} 