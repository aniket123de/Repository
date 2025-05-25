"use client";

import { useState, useEffect, useCallback } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faXmark, faChevronRight, faUser, faCode, faStar } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./github-login-modal.module.scss";

type GithubLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const GithubLoginModal = ({ isOpen, onClose }: GithubLoginModalProps) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl: window.location.href });
  };
  
  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);
  
  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);
  
  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Stop scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modalOverlay}
          onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <button className={styles.closeButton} onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.logoContainer}>
                <FontAwesomeIcon icon={faGithub} className={styles.githubLogo} />
              </div>
              <h2>Login with GitHub</h2>
            </div>
            
            <div className={styles.modalBody}>
              {status === "authenticated" ? (
                <div className={styles.loggedInContainer}>
                  <div className={styles.userInfo}>
                    <Image 
                      src={session.user?.image || 'https://github.com/identicons/app/oauth_app/1497612'}
                      alt={session.user?.name || 'User'} 
                      className={styles.userAvatar}
                      width={70}
                      height={70}
                    />
                    <div>
                      <h3>{session.user?.name}</h3>
                      <p>{session.user?.email}</p>
                    </div>
                  </div>
                  
                  <div className={styles.accountBenefits}>
                    <p>You're successfully logged in with GitHub!</p>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faUser} />
                        <span>Access your personalized profile</span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCode} />
                        <span>Connect with nearby developers</span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faStar} />
                        <span>Join hackathon teams & projects</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={styles.modalActions}>
                    <button 
                      className={styles.continueButton} 
                      onClick={onClose}
                    >
                      Continue to your profile
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <button 
                      className={styles.logoutButton}
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.benefitsSection}>
                    <h3>Connect with the developer community</h3>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faUser} />
                        <span>Find developers near your location</span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCode} />
                        <span>Showcase your skills & projects</span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faStar} />
                        <span>Join hackathon teams & collaborate</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={styles.privacyNote}>
                    <p>We only access your basic GitHub profile information and never post on your behalf.</p>
                  </div>
                  
                  <div className={styles.modalActions}>
                    <button 
                      className={styles.loginButton} 
                      onClick={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className={styles.spinner}></span>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faGithub} />
                          <span>Continue with GitHub</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GithubLoginModal;
