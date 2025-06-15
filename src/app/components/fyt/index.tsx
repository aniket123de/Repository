"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBinoculars, 
  faUsers, 
  faMapMarkerAlt, 
  faCode, 
  faLaptopCode, 
  faUserPlus,
  faSearch,
  faUser,
  faEnvelope,
  faFilter,
  faTimes,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './fyt.module.scss';
import * as Scrollytelling from "~/lib/scrollytelling-client";
import { UserQuiz } from '~/app/components/user-quiz';
import { useUserSearch } from '~/hooks/useUserSearch';
import { UserProfile } from '~/lib/supabase';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// FYT Hero Section
const FytHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const decorationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });    tl.fromTo(
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
      decorationsRef.current,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)" },
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
        </h1>        <p className={s["hero-description"]} ref={descriptionRef}>
          Connect with passionate coders in your area, collaborate on projects,
          and build a community of like-minded developers. Your next hackathon
          partner might be just around the corner!
        </p>        <div className={s["hero-decorations"]} ref={decorationsRef}>
          <div className={s["connecting-dots"]}>
            <div className={s["dot"]}></div>
            <div className={s["line"]}></div>
            <div className={s["dot"]}></div>
            <div className={s["line"]}></div>
            <div className={s["dot"]}></div>
            <div className={s["line"]}></div>
            <div className={s["dot"]}></div>
            <div className={s["line"]}></div>
            <div className={s["dot"]}></div>
          </div>
        </div>
      </div>
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
  }, []);  const steps = [
    {
      icon: faUserPlus,
      title: "Take Our Quiz",
      description: "Complete our interactive quiz to help us understand your skills and interests better."
    },
    {
      icon: faUsers,
      title: "Get Smart Matches",
      description: "Our algorithm analyzes your quiz results to find developers with similar skills, interests, and coding style."
    },
    {
      icon: faSearch,
      title: "Connect & Code",
      description: "Browse through your personalized matches and connect with developers who share your passion."
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    expertise: [] as string[],
    skills: [] as string[],
    hasLinkedIn: false,
    hasGitHub: false,
  });
  const { users: allCoders, isLoading, error, searchUsers } = useUserSearch();
  
  // Filter coders based on active filters
  const filteredCoders = React.useMemo(() => {
    if (!allCoders) return [];
    
    return allCoders.filter(coder => {
      // Expertise filter
      if (activeFilters.expertise.length > 0 && 
          !activeFilters.expertise.includes(coder.expertise || '')) {
        return false;
      }
      
      // Skills filter
      if (activeFilters.skills.length > 0) {
        const coderSkills = (coder.skills || []).map(skill => skill.toLowerCase());
        const hasMatchingSkill = activeFilters.skills.some(filterSkill => 
          coderSkills.some(skill => skill.includes(filterSkill.toLowerCase()))
        );
        if (!hasMatchingSkill) return false;
      }
      
      // LinkedIn filter
      if (activeFilters.hasLinkedIn && !coder.linkedin) {
        return false;
      }
      
      // GitHub filter
      if (activeFilters.hasGitHub && !coder.github) {
        return false;
      }
      
      return true;
    });
  }, [allCoders, activeFilters]);
  
  const coders = filteredCoders;
  
  // Handle filter changes
  const toggleFilter = (category: keyof typeof activeFilters, value: string | boolean) => {
    setActiveFilters(prev => {
      if (category === 'hasLinkedIn' || category === 'hasGitHub') {
        return { ...prev, [category]: !prev[category] };
      } else {
        const currentFilters = prev[category] as string[];
        const newFilters = currentFilters.includes(value as string)
          ? currentFilters.filter(f => f !== value)
          : [...currentFilters, value as string];
        return { ...prev, [category]: newFilters };
      }
    });
  };
  
  const clearAllFilters = () => {
    setActiveFilters({
      expertise: [],
      skills: [],
      hasLinkedIn: false,
      hasGitHub: false,
    });
  };
  
  const hasActiveFilters = Object.values(activeFilters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter
  );
  
  // Get unique values for filter options
  const availableExpertise = React.useMemo(() => {
    const expertiseSet = new Set<string>();
    allCoders?.forEach(coder => {
      if (coder.expertise) expertiseSet.add(coder.expertise);
    });
    return Array.from(expertiseSet);
  }, [allCoders]);
    const availableSkills = React.useMemo(() => {
    const skillsSet = new Set<string>();
    allCoders?.forEach(coder => {
      (coder.skills || []).forEach(skill => skillsSet.add(skill));
    });
    return Array.from(skillsSet).slice(0, 20); // Limit to top 20 skills
  }, [allCoders]);
  
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  
  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    
    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Handle search input with debouncing
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear previous timeout and set new one for debouncing
    const timeoutId = setTimeout(() => {
      searchUsers(value);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  // Load initial data on mount
  useEffect(() => {
    searchUsers(); // Load all users initially
  }, [searchUsers]);

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
      <h2 ref={titleRef}>Connect with Your Tribe</h2>
        <div className={s["search-container"]} ref={searchRef}>
        <div className={s["search-input"]}>
          <FontAwesomeIcon icon={faSearch} className={s["search-icon"]} />
          <input 
            type="text" 
            placeholder="Search by skills, interests or name..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>        <div className={s["filters"]}>
          <div className={s["filter-dropdown"]} ref={filterDropdownRef}>
            <button 
              className={`${s["filter-btn"]} ${hasActiveFilters ? s["active"] : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Filters</span>
              {hasActiveFilters && <span className={s["filter-count"]}>{
                (activeFilters.expertise.length + activeFilters.skills.length + 
                 (activeFilters.hasLinkedIn ? 1 : 0) + (activeFilters.hasGitHub ? 1 : 0))
              }</span>}
              <FontAwesomeIcon icon={faChevronDown} className={`${s["dropdown-icon"]} ${showFilters ? s["open"] : ""}`} />
            </button>
            
            {showFilters && (
              <div className={s["filter-panel"]}>
                <div className={s["filter-header"]}>
                  <h4>Filter Developers</h4>
                  {hasActiveFilters && (
                    <button onClick={clearAllFilters} className={s["clear-filters"]}>
                      <FontAwesomeIcon icon={faTimes} />
                      Clear All
                    </button>
                  )}
                </div>
                
                <div className={s["filter-section"]}>
                  <h5>Expertise</h5>
                  <div className={s["filter-options"]}>
                    {availableExpertise.map(expertise => (
                      <label key={expertise} className={s["filter-option"]}>
                        <input
                          type="checkbox"
                          checked={activeFilters.expertise.includes(expertise)}
                          onChange={() => toggleFilter('expertise', expertise)}
                        />
                        <span className={s["checkmark"]}></span>
                        <span className={s["option-text"]}>
                          {expertise === 'webdev' ? 'Web Development' :
                           expertise === 'appdev' ? 'App Development' :
                           expertise === 'blockchain' ? 'Blockchain' :
                           expertise === 'aiml' ? 'AI/ML' : expertise}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className={s["filter-section"]}>
                  <h5>Skills</h5>
                  <div className={s["filter-options"]}>
                    {availableSkills.slice(0, 10).map(skill => (
                      <label key={skill} className={s["filter-option"]}>
                        <input
                          type="checkbox"
                          checked={activeFilters.skills.includes(skill)}
                          onChange={() => toggleFilter('skills', skill)}
                        />
                        <span className={s["checkmark"]}></span>
                        <span className={s["option-text"]}>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className={s["filter-section"]}>
                  <h5>Profile Links</h5>
                  <div className={s["filter-options"]}>
                    <label className={s["filter-option"]}>
                      <input
                        type="checkbox"
                        checked={activeFilters.hasLinkedIn}
                        onChange={() => toggleFilter('hasLinkedIn', true)}
                      />
                      <span className={s["checkmark"]}></span>
                      <span className={s["option-text"]}>Has LinkedIn</span>
                    </label>
                    <label className={s["filter-option"]}>
                      <input
                        type="checkbox"
                        checked={activeFilters.hasGitHub}
                        onChange={() => toggleFilter('hasGitHub', true)}
                      />
                      <span className={s["checkmark"]}></span>
                      <span className={s["option-text"]}>Has GitHub</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className={s["distance-filter"]}>
            {isLoading ? 'Searching...' : error ? 'Search error' : `${coders.length} results`}
          </span>
        </div>
      </div>
      
      <div className={s["recommendation-banner"]}>
        <FontAwesomeIcon icon={faLaptopCode} />
        <p>Based on your quiz results, we&apos;ve found developers with similar expertise and interests!</p>
      </div>        <div className={s["coders-grid"]} ref={cardsRef}>
        {isLoading ? (
          <div className={s["loading-state"]}>
            <div className={s["loading-spinner"]}></div>
            <p>Finding your tribe...</p>
          </div>
        ) : error ? (
          <div className={s["error-state"]}>
            <p>Unable to load developers. Please try again later.</p>
          </div>
        ) : coders.length === 0 ? (
          <div className={s["empty-state"]}>
            <FontAwesomeIcon icon={faUsers} className={s["empty-icon"]} />
            <h3>No developers found</h3>
            <p>Be the first to join the community! Fill out the quiz above to connect with like-minded developers.</p>
          </div>        ) : (
          coders.map((coder, index) => (            <div 
              key={coder.id} 
              className={s["coder-card"]}
              ref={(el) => {
                cardRefs.current[index] = el;
                return undefined;
              }}
            >
              <div className={s["card-header"]}>
                <div className={s["profile-section"]}>
                  <div className={s["profile-avatar"]}>
                    <div className={s["avatar-inner"]}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className={s["status-indicator"]}></div>
                  </div>
                  <div className={s["profile-info"]}>
                    <h3 className={s["coder-name"]}>{coder.name}</h3>
                  </div>
                </div>
              </div>
              
              <div className={s["card-body"]}>
                <div className={s["info-section"]}>
                  <div className={s["skills-container"]}>
                    <div className={s["skills-grid"]}>
                      {(coder.skills || []).slice(0, 6).map((skill, i) => (
                        <span key={i} className={s["skill-badge"]}>{skill}</span>
                      ))}
                      {(coder.skills || []).length > 6 && (
                        <span className={s["skill-badge"]} data-more>+{(coder.skills || []).length - 6} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className={s["interests-container"]}>
                    <div className={s["section-header"]}>
                      <FontAwesomeIcon icon={faLaptopCode} className={s["section-icon"]} />
                      <h4>Interests & Focus</h4>
                    </div>
                    <div className={s["interests-grid"]}>
                      {(Array.isArray(coder.interests) ? coder.interests : []).slice(0, 4).map((interest: string, i: number) => (
                        <span key={i} className={s["interest-tag"]}>{interest}</span>
                      ))}
                      {(Array.isArray(coder.interests) ? coder.interests : []).length > 4 && (
                        <span className={s["interest-tag"]} data-more>+{(Array.isArray(coder.interests) ? coder.interests : []).length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={s["card-footer"]}>
                <div className={s["social-actions"]}>
                  {coder.email && (
                    <a 
                      href={`mailto:${coder.email}`}
                      className={`${s["social-btn"]} ${s["email-btn"]}`}
                      title="Send Email"
                    >
                      <div className={s["btn-icon"]}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                      <span className={s["btn-text"]}>Send E-Mail</span>
                      <div className={s["btn-shine"]}></div>
                    </a>
                  )}
                  {coder.linkedin && (
                    <a 
                      href={coder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${s["social-btn"]} ${s["linkedin-btn"]}`}
                      title="View LinkedIn Profile"
                    >
                      <div className={s["btn-icon"]}>
                        <FontAwesomeIcon icon={faLinkedin} />
                      </div>
                      <span className={s["btn-text"]}>LinkedIn Profile</span>
                      <div className={s["btn-shine"]}></div>
                    </a>
                  )}
                  {coder.github && (
                    <a 
                      href={coder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${s["social-btn"]} ${s["github-btn"]}`}
                      title="View GitHub Profile"
                    >
                      <div className={s["btn-icon"]}>
                        <FontAwesomeIcon icon={faGithub} />
                      </div>
                      <span className={s["btn-text"]}>GitHub Profile</span>
                      <div className={s["btn-shine"]}></div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


// Join Community Section
const JoinCommunity = () => {
  const sectionRef = useRef<HTMLDivElement>(null);const contentRef = useRef<HTMLDivElement>(null);
  
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
        </p>        <Link href="/fyt">          <button 
            className={s["community-btn"]}
          >
            <FontAwesomeIcon icon={faUsers} className={s["btn-icon"]} />
            <span>Get Started Now</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export const FytSection = () => {
  return (
    <div className={s["fyt-section"]}>
      <div className={s["floating-particles"]}></div>
      <div className={s["dots"]}></div>
      <FytHero />
      <UserQuiz />
      <HowItWorks />
      <NearbyCoders />
      <JoinCommunity />
    </div>
  );
};
