"use client";

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCode, faLaptop, faBook, faUsers, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { signOut } from 'next-auth/react';
import styles from './user-profile-card.module.scss';

type UserProfileCardProps = {
  user: {
    name: string;
    username: string;
    image: string;
    distance?: string;
    bio?: string;
    location?: string;
    stats?: {
      repos: number;
      followers: number;
      following: number;
    };
    skills?: string[];
    interests?: string[];
    githubUrl?: string;
  };
  onClose?: () => void;
};

const UserProfileCard = ({ user, onClose }: UserProfileCardProps) => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Image 
            src={user.image} 
            alt={user.name} 
            width={64} 
            height={64}
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.userInfo}>
          <h2>{user.name}</h2>
          <div className={styles.username}>
            <FontAwesomeIcon icon={faGithub} className={styles.icon} />
            {user.username}
          </div>
          {user.location && (
            <div className={styles.location}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              {user.location}
            </div>
          )}
          {user.distance && (
            <div className={styles.distance}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              {user.distance}
            </div>
          )}
        </div>
        <button 
          className={styles.logoutButton} 
          onClick={handleLogout}
          title="Logout"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>

      {user.bio && (
        <div className={styles.bio}>
          {user.bio}
        </div>
      )}

      {user.stats && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <FontAwesomeIcon icon={faBook} className={styles.icon} />
            <span className={styles.value}>{user.stats.repos}</span>
            <span className={styles.label}>Repos</span>
          </div>
          <div className={styles.stat}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <span className={styles.value}>{user.stats.followers}</span>
            <span className={styles.label}>Followers</span>
          </div>
          <div className={styles.stat}>
            <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
            <span className={styles.value}>{user.stats.following}</span>
            <span className={styles.label}>Following</span>
          </div>
        </div>
      )}

      <div className={styles.content}>
        {user.skills && user.skills.length > 0 && (
          <div className={styles.section}>
            <h3>
              <FontAwesomeIcon icon={faLaptop} className={styles.sectionIcon} />
              Skills
            </h3>
            <div className={styles.tags}>
              {user.skills.map((skill, index) => (
                <span key={index} className={styles.tag}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {user.interests && user.interests.length > 0 && (
          <div className={styles.section}>
            <h3>
              <FontAwesomeIcon icon={faCode} className={styles.sectionIcon} />
              Interests
            </h3>
            <div className={styles.tags}>
              {user.interests.map((interest, index) => (
                <span key={index} className={styles.tag}>{interest}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.connectButton}>Connect</button>
        <a 
          href={user.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.viewButton}
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfileCard; 