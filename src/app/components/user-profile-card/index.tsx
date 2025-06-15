"use client";

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCode, faLaptop, faBook, faUsers, faUserPlus, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './user-profile-card.module.scss';

type UserProfileCardProps = {
  user: {
    name: string;
    email?: string;
    linkedin?: string;
    github?: string;
    bio?: string;
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
  return (    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.profileIcon}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={styles.userInfo}>
          <h2>{user.name}</h2>
        </div>
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
      </div>      <div className={styles.actions}>
        {user.email && (
          <a 
            href={`mailto:${user.email}`}
            className={styles.emailButton}
            title="Send Email"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Email</span>
          </a>
        )}
        {user.linkedin && (
          <a 
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedinButton}
            title="View LinkedIn Profile"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span>LinkedIn</span>
          </a>
        )}
        {user.github && (
          <a 
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubButton}
            title="View GitHub Profile"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard; 