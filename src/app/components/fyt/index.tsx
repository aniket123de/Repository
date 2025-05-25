"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub,  
} from '@fortawesome/free-brands-svg-icons';
import { 
  faBinoculars, 
  faUsers, 
  faMapMarkerAlt, 
  faCode, 
  faLaptopCode, 
  faUserPlus,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './fyt.module.scss';
import * as Scrollytelling from "~/lib/scrollytelling-client";
import GithubLoginModal from '~/app/components/github-login-modal';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Sample data for nearby coders
const nearbyCodersData = [
  {
    id: 1,
    name: "Alex Johnson",
    githubUsername: "alexjcoder",
    distance: "2.4 km",
    avatar: "https://github.com/identicons/app/oauth_app/1497612",
    skills: ["React", "TypeScript", "Node.js"],
    interests: ["Open Source", "Web3", "AI"],
  },
  {
    id: 2,
    name: "Samantha Liu",
    githubUsername: "samliu42",
    distance: "3.7 km",
    avatar: "https://github.com/identicons/app/oauth_app/1497613",
    skills: ["Python", "Django", "Machine Learning"],
    interests: ["Data Science", "Backend Development", "Cloud"],
  },
  {
    id: 3,
    name: "Raj Patel",
    githubUsername: "rajdev404",
    distance: "5.1 km",
    avatar: "https://github.com/identicons/app/oauth_app/1497614",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    interests: ["Frontend", "UI/UX", "Mobile Development"],
  },
  {
    id: 4,
    name: "Maria Gonzalez",
    githubUsername: "mariacode",
    distance: "6.8 km",
    avatar: "https://github.com/identicons/app/oauth_app/1497615",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
    interests: ["Enterprise Solutions", "System Design", "DevOps"],
  }
];

// FYT Hero Section
const FytHero = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      loginButtonRef.current,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );
  }, []);

  return (
    <div className={s["hero"]} ref={heroRef}>
      <div className={s["hero-content"]}>
        <div className={s["hero-decoration"]}>
          <span className={s["starburst"]}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="glow-fyt" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#b2ebf2" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#57B9C2" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="28" cy="28" r="28" fill="url(#glow-fyt)"/>
              <circle cx="28" cy="28" r="22" fill="#57B9C2"/>
              <path d="M28 10L31.5 22.5L44 26L31.5 29.5L28 42L24.5 29.5L12 26L24.5 22.5L28 10Z" fill="#fff"/>
            </svg>
          </span>
        </div>

        <h1 className={s["hero-title"]} ref={titleRef}>
          Find Your Tribe
        </h1>
          <p className={s["hero-description"]} ref={descriptionRef}>
          Connect with passionate coders in your area, collaborate on projects,
          and build a community of like-minded developers. Your next hackathon
          partner might be just around the corner!
        </p>
        
        <button 
          className={s["github-login-btn"]} 
          ref={loginButtonRef} 
          onClick={handleOpenModal}
        >
          <FontAwesomeIcon icon={faGithub} className={s["btn-icon"]} />
          <span>{session ? 'My Profile' : 'Login with GitHub'}</span>
        </button>
      </div>
      
      <GithubLoginModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

// How It Works Section
const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      sectionRef.current.querySelector('h2'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    itemRefs.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(
          item,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            ease: "back.out(1.4)",
            delay: index * 0.1
          },
          "-=0.5"
        );
      }
    });
  }, []);

  const steps = [
    {
      icon: faGithub,
      title: "Connect with GitHub",
      description: "Login with your GitHub account to get started and share your developer profile."
    },
    {
      icon: faMapMarkerAlt,
      title: "Enable Location",
      description: "Share your location to find developers near you. Your privacy is always protected."
    },
    {
      icon: faSearch,
      title: "Discover Coders",
      description: "Browse through nearby developers with matching skills and interests."
    },
  ];

  return (
    <div className={s["how-it-works"]} ref={sectionRef}>
      <h2>How It Works</h2>
      <div className={s["steps-container"]}>
        {steps.map((step, index) => (          <div 
            key={index} 
            className={s["step-item"]}
            ref={(el) => {
              itemRefs.current[index] = el;
              return undefined;
            }}
          >
            <div className={s["step-icon"]}>
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Nearby Coders Component
const NearbyCoders = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      searchRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Animate cards with stagger effect
    cardRefs.current.forEach((card, index) => {
      if (card) {
        tl.fromTo(
          card,
          { 
            y: 40, 
            opacity: 0,
            rotateY: -5,
            scale: 0.95
          },
          { 
            y: 0, 
            opacity: 1, 
            rotateY: 0,
            scale: 1,
            duration: 0.6, 
            ease: "back.out(1.4)",
          },
          "-=0.4"
        );
      }
    });
  }, []);

  return (
    <div className={s["nearby-coders"]} ref={sectionRef}>
      <h2 ref={titleRef}>Coders Near You</h2>
      
      <div className={s["search-container"]} ref={searchRef}>
        <div className={s["search-input"]}>
          <FontAwesomeIcon icon={faSearch} className={s["search-icon"]} />
          <input type="text" placeholder="Search by skills, interests or name..." />
        </div>
        <div className={s["filters"]}>
          <button className={s["filter-btn"]}>Filters</button>
          <span className={s["distance-filter"]}>Distance: 10km</span>
        </div>
      </div>
      
      <div className={s["coders-grid"]} ref={cardsRef}>
        {nearbyCodersData.map((coder, index) => (          <div 
            key={coder.id} 
            className={s["coder-card"]}
            ref={(el) => {
              cardRefs.current[index] = el;
              return undefined;
            }}
          >
            <div className={s["card-header"]}>
              <div className={s["avatar-container"]}>
                <div className={s["avatar"]}>
                  <Image 
                    src={coder.avatar} 
                    alt={coder.name} 
                    width={60}
                    height={60}
                    className={s["avatar"]}
                  />
                </div>
              </div>
              <div className={s["name-container"]}>
                <h3>{coder.name}</h3>
                <div className={s["github-username"]}>
                  <FontAwesomeIcon icon={faGithub} />
                  <span>{coder.githubUsername}</span>
                </div>
              </div>
              <div className={s["distance"]}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{coder.distance}</span>
              </div>
            </div>
            
            <div className={s["card-body"]}>
              <div className={s["skills-section"]}>
                <h4>
                  <FontAwesomeIcon icon={faCode} />
                  <span>Skills</span>
                </h4>
                <div className={s["tags"]}>
                  {coder.skills.map((skill, i) => (
                    <span key={i} className={s["tag"]}>{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className={s["interests-section"]}>
                <h4>
                  <FontAwesomeIcon icon={faLaptopCode} />
                  <span>Interests</span>
                </h4>
                <div className={s["tags"]}>
                  {coder.interests.map((interest, i) => (
                    <span key={i} className={s["tag"]}>{interest}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={s["card-actions"]}>
              <button className={s["connect-btn"]}>Connect</button>
              <button className={s["view-profile-btn"]}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dynamic Map Section
const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mapContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      mapContentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  return (
    <div className={s["map-section"]} ref={mapRef}>
      <h2 ref={titleRef}>Developer Map</h2>
      <div className={s["map-container"]} ref={mapContentRef}>
        <div className={s["map-placeholder"]}>
          <div className={s["map-overlay"]}>
            <div className={s["marker"]} style={{ top: '30%', left: '40%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className={s["marker"]} style={{ top: '45%', left: '60%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className={s["marker"]} style={{ top: '55%', left: '25%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className={s["marker"]} style={{ top: '65%', left: '70%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className={s["marker"]} style={{ top: '35%', left: '85%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className={s["marker"]} style={{ top: '20%', left: '55%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className={s["marker"]} style={{ top: '70%', left: '45%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className={s["marker"]} style={{ top: '50%', left: '50%' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={s["current-user"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Join Community Section
const JoinCommunity = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className={s["join-community"]} ref={sectionRef}>
      <div className={s["community-content"]} ref={contentRef}>
        <div className={s["starburst-container"]}>
          <span className={s["starburst"]}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="glow-community" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#b2ebf2" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#57B9C2" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="28" cy="28" r="28" fill="url(#glow-community)"/>
              <circle cx="28" cy="28" r="22" fill="#57B9C2"/>
              <path d="M28 10L31.5 22.5L44 26L31.5 29.5L28 42L24.5 29.5L12 26L24.5 22.5L28 10Z" fill="#fff"/>
            </svg>
          </span>
        </div>
        <h2>Ready to Join the Community?</h2>        <p>
          Connect with like-minded developers, build your network, and find 
          collaborators for your next big project. The tech community is 
          waiting for you!
        </p>
        <button 
          className={s["github-login-btn"]} 
          onClick={handleOpenModal}
        >
          <FontAwesomeIcon icon={faGithub} className={s["btn-icon"]} />
          <span>{session ? 'View My Profile' : 'Get Started Now'}</span>
        </button>
      </div>
      
      <GithubLoginModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export const FytSection = () => {
  return (
    <div className={s["fyt-section"]}>
      <div className={s["floating-particles"]}></div>
      <div className={s["dots"]}></div>
      <FytHero />
      <HowItWorks />
      <NearbyCoders />
      <MapSection />
      <JoinCommunity />
    </div>
  );
};
