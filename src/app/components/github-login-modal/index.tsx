"use client";

import { useState, useEffect, useCallback } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faXmark, faChevronRight, faUser, faCode, faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./github-login-modal.module.scss";
import UserProfileCard from '../user-profile-card';

type GithubLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type GitHubProfile = {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  repos_url: string;
};

const GithubLoginModal = ({ isOpen, onClose }: GithubLoginModalProps) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  
  // Fetch GitHub profile data
  useEffect(() => {
    const fetchGitHubProfile = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          const data = await response.json();
          setGithubProfile(data);
        } catch (error) {
          console.error('Error fetching GitHub profile:', error);
        }
      }
    };

    if (session?.user) {
      fetchGitHubProfile();
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation('2.4 km'); // This is a mock distance, you would calculate real distance
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    }
  }, [session]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const currentPort = window.location.port || '3002';
      const result = await signIn("github", {
        callbackUrl: `http://localhost:${currentPort}/api/auth/callback/github`,
        redirect: true,
      });
      
      if (result?.error) {
        console.error("Authentication error:", result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

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
            
            {status === "authenticated" && session?.user && githubProfile ? (
              <UserProfileCard 
                user={{
                  name: githubProfile.name || session.user.name || 'GitHub User',
                  username: githubProfile.login,
                  image: githubProfile.avatar_url || session.user.image || '',
                  distance: userLocation || undefined,
                  bio: githubProfile.bio,
                  location: githubProfile.location,
                  stats: {
                    repos: githubProfile.public_repos,
                    followers: githubProfile.followers,
                    following: githubProfile.following
                  },
                  skills: ['React', 'TypeScript', 'Node.js'],
                  interests: ['Open Source', 'Web3', 'AI'],
                  githubUrl: githubProfile.html_url
                }}
                onClose={onClose}
              />
            ) : (
              <div className={styles.modalBody}>
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
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GithubLoginModal;
