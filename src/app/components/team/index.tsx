"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faLinkedinIn, 
  faGithub, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faSearch } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './team.module.scss';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type TeamMemberProps = {
  name: string;
  role: string;
  statement: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    website?: string;
  };
  isReversed?: boolean;
};

export const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  statement, 
  image, 
  socials,
  isReversed 
}) => {
  // Create refs for animation targets
  const memberRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const starburstRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteStartRef = useRef<HTMLSpanElement>(null);
  const quoteEndRef = useRef<HTMLSpanElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);  useEffect(() => {
    if (!memberRef.current) return;

    // Enhanced initial animation for the component
    gsap.fromTo(
      memberRef.current,
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95,
        rotationX: 5
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: memberRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Enhanced animation for the image when scrolling
    if (imageRef.current) {
      const imageElement = imageRef.current.querySelector('img');
      const imageWrapperElement = imageRef.current.querySelector(`.${s["image-wrapper"]}`);
      
      if (imageElement) {
        const direction = isReversed ? 1 : -1;
        
        // First, animate the wrapper with a bounce effect
        gsap.fromTo(
          imageWrapperElement,
          {
            opacity: 0,
            scale: 0.8,
            y: 40,
            rotation: direction * -5
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: memberRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
          // Then animate the actual image with a slight delay
        gsap.fromTo(
          imageElement,
          { 
            scale: 0.95,
            x: direction * 40,
            rotation: direction * -8,
            filter: 'blur(2px) brightness(0.8)'
          },
          {
            scale: 1,
            x: 0,
            rotation: 0,
            filter: 'blur(0) brightness(0.95)',
            duration: 0.8,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: memberRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }
    // Animate starburst on hover
    const starburst = starburstRef.current;
    if (starburst && memberRef.current) {
      memberRef.current.addEventListener('mouseenter', () => {
        gsap.to(starburst, {
          rotation: 15,
          scale: 1.1,
          duration: 0.5,
          ease: "power1.out"
        });
      });
      memberRef.current.addEventListener('mouseleave', () => {
        gsap.to(starburst, {
          rotation: 0,
          scale: 1,
          duration: 0.5,
          ease: "power1.in"
        });
      });
    }
    // Animate quote marks and text with staggered effect
    if (quoteRef.current && quoteStartRef.current && quoteEndRef.current) {
      const quoteContainer = quoteRef.current;
      const quoteStart = quoteStartRef.current;
      const quoteEnd = quoteEndRef.current;
      const quoteText = quoteRef.current.querySelector('p');
      
      // Initial animation for quote elements
      gsap.fromTo(
        quoteContainer,
        { 
          opacity: 0, 
          x: isReversed ? -30 : 30,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: memberRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate quote marks separately
      gsap.fromTo(
        [quoteStart, quoteEnd],
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 0.2,
          scale: 1,
          duration: 1.2,
          delay: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: memberRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Hover animation
      quoteContainer.addEventListener('mouseenter', () => {
        gsap.to(quoteStart, {
          scale: 1.3,
          opacity: 0.7,
          x: -5,
          duration: 0.4,
          ease: "power1.out"
        });
        gsap.to(quoteEnd, {
          scale: 1.3,
          opacity: 0.7,
          x: 5,
          duration: 0.4,
          ease: "power1.out"
        });
        gsap.to(quoteText, {
          scale: 1.02,
          duration: 0.4,
          ease: "power1.out"
        });
      });
      
      quoteContainer.addEventListener('mouseleave', () => {
        gsap.to([quoteStart, quoteEnd], {
          scale: 1,
          opacity: 0.2,
          x: 0,
          duration: 0.4,
          ease: "power1.in"
        });
        gsap.to(quoteText, {
          scale: 1,
          duration: 0.4,
          ease: "power1.in"
        });
      });
    }

    // Social links enhanced hover animation
    if (socialLinksRef.current) {
      const socialLinks = socialLinksRef.current.querySelectorAll('a');
      
      // Initial animation
      gsap.fromTo(
        socialLinks,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: memberRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Hover animations
      socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            y: -8,
            scale: 1.2,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
          
          // Affect neighboring links slightly
          const otherLinks = Array.from(socialLinks).filter((_, i) => i !== index);
          gsap.to(otherLinks, {
            scale: 0.95,
            opacity: 0.7,
            duration: 0.3,
            ease: "power1.out"
          });
        });
        
        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power1.in"
          });
          
          // Restore neighboring links
          const otherLinks = Array.from(socialLinks).filter((_, i) => i !== index);
          gsap.to(otherLinks, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power1.out"
          });
        });
      });
    }
  }, [isReversed]);

  const imageSection = (
    <div className={s["team-member-image"]} ref={imageRef}>
      <div className={s["image-wrapper"]}>
        <Image 
          src={image} 
          alt={`${name} - ${role}`} 
          width={300} 
          height={300} 
          className={s["member-avatar"]}
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/circle.png'; // Use existing image as fallback
          }}
        />
        <div className={s["starburst-wrapper"]} ref={starburstRef}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id={`glow-${name.replace(/\s+/g, '')}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b2ebf2" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#57B9C2" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="28" cy="28" r="28" fill={`url(#glow-${name.replace(/\s+/g, '')})`}/>
            <circle cx="28" cy="28" r="22" fill="#57B9C2"/>
            <path d="M28 10L31.5 22.5L44 26L31.5 29.5L28 42L24.5 29.5L12 26L24.5 22.5L28 10Z" fill="#fff"/>
          </svg>
        </div>
      </div>
      <div className={s["member-info"]} ref={infoRef}>
        <h3>{name}</h3>
        <h4>{role}</h4>
        <div className={s["social-links"]} ref={socialLinksRef}>
          {socials.twitter && (
            <Link href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Twitter`}>
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
          )}
          {socials.linkedin && (
            <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn`}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
          )}
          {socials.github && (
            <Link href={socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s GitHub`}>
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          )}
          {socials.instagram && (
            <Link href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Instagram`}>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          )}
          {socials.website && (
            <Link href={socials.website} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Website`}>
              <FontAwesomeIcon icon={faGlobe} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
  const statementSection = (
    <div className={s["team-member-statement"]}>
      <div className={s["quote-container"]} ref={quoteRef}>
        <span className={s["quote-mark"]} ref={quoteStartRef}>&ldquo;</span>
        <p>{statement}</p>
        <span className={s["quote-mark"]} ref={quoteEndRef}>&rdquo;</span>
      </div>
    </div>
  );
  return (
    <div className={`${s["team-member"]} ${isReversed ? s["reversed"] : ""}`} ref={memberRef}>
      {imageSection}
      {statementSection}
    </div>
  );
};

type CampusAmbassadorProps = {
  name: string;
  email: string;
  linkedin: string;
  college: string;
};

export const CampusAmbassador: React.FC<CampusAmbassadorProps> = ({ 
  name, 
  email, 
  linkedin, 
  college 
}) => {
  const ambassadorRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ambassadorRef.current) return;

    // Initial animation for the ambassador card
    gsap.fromTo(
      ambassadorRef.current,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ambassadorRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate info section
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { 
          opacity: 0, 
          x: -20
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ambassadorRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Animate contact links
    if (contactRef.current) {
      const contactLinks = contactRef.current.querySelectorAll('a');
      
      gsap.fromTo(
        contactLinks,
        {
          opacity: 0,
          y: 15
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ambassadorRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Hover animations for contact links
      contactLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            y: -3,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
  }, []);

  return (
    <div className={s["campus-ambassador"]} ref={ambassadorRef}>
      <div className={s["ambassador-info"]} ref={infoRef}>
        <h4>{name}</h4>
        <p className={s["college-name"]}>{college}</p>
      </div>
      <div className={s["ambassador-contact"]} ref={contactRef}>
        <Link 
          href={`mailto:${email}`} 
          className={s["contact-link"]}
          aria-label={`Email ${name}`}
        >
          <FontAwesomeIcon icon={faGlobe} />
          <span>Email</span>
        </Link>
        <Link 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className={s["contact-link"]}
          aria-label={`${name}'s LinkedIn`}
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
          <span>LinkedIn</span>
        </Link>
      </div>
    </div>
  );
};

export const TeamSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const teamMembersRef = useRef<HTMLDivElement>(null);
  const starburstHeaderRef = useRef<HTMLSpanElement>(null);
  const ambassadorsRef = useRef<HTMLDivElement>(null);
  const ambassadorsHeaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsLoaded(true);
    
    if (typeof window === 'undefined' || !sectionRef.current) return;
      // Enhanced animations for header elements
    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    if (headerRef.current) {
      const h2Element = headerRef.current.querySelector('h2');
      const pElement = headerRef.current.querySelector('p');
      
      // Simpler but still beautiful heading animation
      if (h2Element) {
        headerTimeline.fromTo(
          h2Element, 
          { 
            opacity: 0, 
            y: 40,
            filter: 'blur(8px)'
          }, 
          { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            duration: 1.2, 
            ease: "power3.out" 
          }
        );
      }
      
      // Enhanced starburst animation
      if (starburstHeaderRef.current) {
        headerTimeline.fromTo(
          starburstHeaderRef.current, 
          { 
            opacity: 0, 
            scale: 0.2, 
            rotation: -60
          }, 
          { 
            opacity: 1, 
            scale: 1.2, 
            rotation: 360, 
            duration: 1.5, 
            ease: "back.out(1.7)" 
          },
          "-=0.8"
        );
        
        // Add a small bounce at the end
        headerTimeline.to(
          starburstHeaderRef.current,
          {
            scale: 1,
            duration: 0.5,
            ease: "bounce.out"
          }
        );
        
        // Add continuous floating animation
        gsap.to(starburstHeaderRef.current, {
          y: -10,
          rotation: '+=15',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      
      // Enhanced paragraph animation
      if (pElement) {
        headerTimeline.fromTo(
          pElement, 
          { 
            opacity: 0, 
            y: 30
          }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out" 
          },
          "-=0.7"
        );
        
        
      }
    }
    
    // Add a cool entrance animation for the whole section
    gsap.fromTo(
      sectionRef.current,
      { 
        backgroundPosition: "0% 30%" 
      },
      { 
        backgroundPosition: "0% 50%", 
        duration: 1.5, 
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
    
  }, [isLoaded]);
  
  // Campus ambassadors animation
  useEffect(() => {
    if (!ambassadorsHeaderRef.current || !ambassadorsRef.current) return;

    // Animate ambassadors header
    gsap.fromTo(
      ambassadorsHeaderRef.current.querySelector('h3'),
      { 
        opacity: 0, 
        y: 30
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ambassadorsHeaderRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      ambassadorsHeaderRef.current.querySelector('p'),
      { 
        opacity: 0, 
        y: 20
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ambassadorsHeaderRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [isLoaded]);

    const teamMembers = [
    {
      name: "Saptarshi",
      role: "Community Lead",
      statement: "Building a vibrant community is about creating spaces where passion meets purpose. I'm dedicated to architecting an ecosystem where developers can grow, innovate, and make meaningful connections that last beyond any single project.",
      image: "/team/sap.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/saptarshigosh20045",
        instagram: "https://www.instagram.com/saptarshiiiiiii?igsh=Y3Q5eTc0dmE4ZmFp",
        twitter: "https://x.com/SAPTARS67452951?t=k-8hq3TzLUKHPa8rzrwqOA&s=09",
        github: "https://github.com/Godsaptarshifrtw"
      }
    },
    {
      name: "Aniket",
      role: "Community Lead",
      statement: "Community is the heart of everything we do. I'm passionate about fostering an inclusive, supportive environment where everyone feels welcome to share ideas, collaborate on projects, and grow together as developers and as people.",
      image: "/team/aniket.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/aniket-de-505362287/",
        instagram: "https://www.instagram.com/aweniket/",
        twitter: "https://x.com/AnkieDe1",
        github: "https://github.com/aniket123de"
      }
    },
    {
      name: "Yuvraj",
      role: "Management Lead",
      statement: "Effective communication builds bridges between communities and the wider world. I'm passionate about sharing our story, amplifying our impact, and creating relationships with media and industry partners that highlight our community's incredible talent and achievements.",
      image: "/team/yuvraj.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/yuvrajprasad",
        instagram: "https://www.instagram.com/yuvistechpoint.yt/",
        twitter: "https://x.com/YuvisTechPoint/",
        github: "https://github.com/YuvisTechPoint"
      }
    },
    {
      name: "Parthita",
      role: "Finance & Tech Lead",
      statement: "Technology is a powerful tool for solving real-world problems. I'm focused on guiding our technical initiatives, mentoring emerging developers, and ensuring our community stays at the cutting edge of innovation while building solutions that matter.",
      image: "/team/parthi.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/parthita-chattopadhyay-7bb3072b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        twitter: "https://x.com/half_icecream?t=1TLgicXbTdsiEs6JBJhA1A&s=09",
        instagram: "https://www.instagram.com/lesshairyape?igsh=aThxZmx2dDNoaGYy",
        github: "https://github.com/Parthita"      }
    },
    {
      name: "Adrish",
      role: "Tech Co-Lead",
      statement: "Meaningful engagement creates lasting community bonds. I work to design events, workshops and interactive experiences that bring our members together, spark creativity, and create an atmosphere where knowledge sharing becomes second nature.",
      image: "/team/adrish.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/adrishbasak/",
        instagram: "https://www.instagram.com/bepoisdying/?hl=en",
        twitter: "https://x.com/bepoooooooooe",
        github: "https://github.com/bepoooe"
      }
    },
    {
      name: "Anik",
      role: "Outreach Lead",
      statement: "Technology communities thrive when they extend beyond their boundaries. I work to create partnerships and collaborations that bring fresh perspectives and opportunities to our members while sharing our innovations with the wider tech ecosystem.",
      image: "/team/anik.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/anik-paul-2bb315265/",
        instagram: "https://twitter.com/PaulAnik1157",
        twitter: "https://twitter.com/PaulAnik1157",
        github: "https://github.com/Anik-Paul-toj"
      }
    },
    {
      name: "Ootso",
      role: "Outreach Lead",
      statement: "I believe in the power of connections. My mission is to expand our community's reach by building bridges with other tech groups, companies and educational institutions, creating opportunities for collaboration and growth for all our members.",
      image: "/team/ootso.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/ootso-dharchowdhury-924213340/",
        instagram: "https://www.instagram.com/ootsooooosleepy?utm_source=qr&igsh=MW5rMHhjOGJnczVvYQ==",
        twitter: "https://x.com/OotsoC89232?t=hTN1lKtavKbih04gpWOVtA&s=09",
        github: "https://github.com/Ben160804"
      }
    },
    {
      name: "Protyoy",
      role: "Design Lead",
      statement: "Great ideas deserve great storytelling. I blend creativity with strategy to showcase our community's incredible work, build our brand identity, and create compelling narratives that resonate with developers and industry leaders alike.",
      image: "/team/ptoy.jpg",
      socials: {
        linkedin: "linkedin.com/in/protyoy-bhandary",
        instagram: "https://www.instagram.com/_.pro.__/",
        twitter: "x.com/ptoybuilds",
        github: "GitHub.com/prox004"
      }
    },
    {
      name: "Shreya",
      role: "Design Co-Lead",
      statement: "Great design is about empathy and creativity. I work to craft experiences that not only look good but also feel meaningful to our community.",
      image: "/team/shreya.jpg",
      socials: {
        linkedin: "linkedin.com/in/shreyajha2103",
        instagram: "https://www.instagram.com/shreyajha.ux/",
        twitter: "https://x.com/ShreyaJha_21",
        github: "https://github.com/ShreyaJha21"
      }
    },
    {
      name: "Debopriya",
      role: "Media Lead",
      statement: "Design is the bridge between ideas and impact. I strive to create visuals that resonate with our community's mission and inspire action.",
      image: "/team/debopriya.jpg", 
      socials: {
        linkedin: "https://www.linkedin.com/in/debopriya-mullick-89395628b",
        instagram: "https://www.instagram.com/_rai.o4?igsh=MXRqbmRrMzY5OTQ0cg==",
        twitter: "https://x.com/sayhellorai?t=V-J_iHaYbi9Q1OQARsdnhw&s=09",
        github: "https://github.com/Debopriya-codes"
      }
    },
    {
      name: "Suryanshu",
      role: "Senior Advisor",
      statement: "Community thrives on active participation. My focus is creating engaging experiences that inspire members to contribute, collaborate and connect on a deeper level, turning casual participants into community champions.",
      image: "/team/suryanshu.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/suryanshu-paul-2aa003253/",
        instagram: "https://www.instagram.com/suryanshupaul18/",
        twitter: "https://x.com/paul2_suryanshu",
        github: "https://github.com/paulsuryanshu"      }
    },
    {
      name: "Swapnanil",
      role: "Senior Advisor",
      statement: "Strategic guidance and mentorship are crucial for sustainable community growth. I focus on providing direction and support to help our community navigate challenges and capitalize on opportunities for meaningful expansion.",
      image: "/team/swapnanil.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/swapnanil-adhikary/",
        instagram: "https://www.instagram.com/putin_real1/",
        twitter: "https://x.com/SwapnanilA41903",
        github: "https://github.com/SwapnanilAdhikary"      }
    },
    {
      name: "Pranay",
      role: "Marketing Lead",
      statement: "Marketing is about telling the right story to the right audience. I aim to amplify our community's voice and ensure our initiatives reach those who can benefit the most.",
      image: "/team/pranay.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/pranay-chatterjee-346717244/",
        instagram: "https://www.instagram.com/heypranayy/",        twitter: "https://x.com/Pranay_221",
        github: "https://github.com/heypranayy"
      }
    },
    {
      name: "Sambit",
      role: "Marketing Co-Lead",
      statement: "The strength of a community lies in its member interactions. I help craft meaningful engagement opportunities that foster genuine connections, encourage knowledge exchange, and create a supportive environment where everyone can thrive.",
      image: "/team/sambit.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/sambit-das-59688526a",
        instagram: "https://www.instagram.com/itssambit/",
        twitter: "https://x.com/iamsosambit?t=41IgU4oGEpRmUMK4NWVEgg&s=09",
        github: "https://github.com/sambitdas77"
      }
    }
  ];

  const campusAmbassadors = [
    {
      name: "Aayushi Kaushik",
      email: "33200122001@tib.edu.in",
      linkedin: "https://www.linkedin.com/in/aayushi-kaushik-243b10251",
      college: "Techno International Batanagar"
    },
    {
      name: "Abhishek Gupta",
      email: "itzabhi888@gmail.com",
      linkedin: "https://github.com/ezabhishek1",
      college: "JIS University"
    },    {
      name: "Ananya Kar",
      email: "ananyakar8900@gmail.com",
      linkedin: "https://www.linkedin.com/in/ananya-kar01?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      college: "Guru Nanak Institute of Technology"
    },
    {
      name: "Antik Mondal",
      email: "work.antikmondal@gmail.com",
      linkedin: "https://linkedin.com/in/antik-mondal-825684240",
      college: "Techno Main Saltlake"
    },
    {
      name: "Arpan Mitra",
      email: "arpannghss@gmail.com",
      linkedin: "https://www.linkedin.com/in/arpan-mitra-170231336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      college: "Netaji Subhash Engineering College"
    },
    {
      name: "Arunima Dutta",
      email: "arunima.dutta@example.com",
      linkedin: "https://www.linkedin.com/in/arunima-dutta",
      college: "Heritage Institute of Technology"
    },    {
      name: "Arnab Mal",
      email: "arnab37686@gmail.com",
      linkedin: "https://www.linkedin.com/in/arnab-mal-a544a828b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      college: "Asansol Engineering College"
    },
    {
      name: "Aryan Sengupta",
      email: "aryansengupta75@gmail.com",
      linkedin: "https://www.linkedin.com/in/aryan-sengupta-685a32270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      college: "Institute of Engineering and Management"
    },
    {
      name: "Ayushman Rana",
      email: "ayushmanrana81@gmail.com",
      linkedin: "https://www.linkedin.com/in/ayushman-rana-1478b32a5/",
      college: "Haldia Institute of Technology"
    },    {
      name: "Debangshu Chatterjee",
      email: "debangshu.chatterjee@example.com",
      linkedin: "https://www.linkedin.com/in/debangshu-chatterjee-858859282",
      college: "Institute of Engineering and Management"
    },
    {
      name: "Debosmita Chowdhury",
      email: "debosmitachowdhury20@gmail.com",
      linkedin: "https://www.linkedin.com/in/debosmita-chowdhury-777529302",
      college: "Techno Main Saltlake"
    },
    {
      name: "Dhrubojyoti Saha",
      email: "dhrubojyotisaha5@gmail.com",
      linkedin: "https://github.com/dhrubojyotii",
      college: "JIS College of Engineering"
    },
    {
      name: "Gourabananda Datta",
      email: "gourabanandadattacse@gmail.com",
      linkedin: "https://www.linkedin.com/in/gourabananda-datta-a3521a285",
      college: "Ramkrishna Mahato Government Engineering College, Purulia"
    },
    {
      name: "Piyush Goenka",
      email: "goenkapiyush2005@gmail.com",
      linkedin: "https://www.linkedin.com/in/piyushgoenka2005/",
      college: "Techno International New Town"
    },
    {
      name: "Rahul Pradhan",
      email: "rahulpradhancse@gmail.com",
      linkedin: "https://www.linkedin.com/in/rahul-pradhan-56113a30b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      college: "Narula Institute of Technology"
    },
    {
      name: "Rahul Singh",
      email: "singhrahul161104@gmail.com",
      linkedin: "https://www.linkedin.com/in/rahul-singh-a89436290",
      college: "St. Thomas' College of Engineering and Technology"
    },
    {
      name: "Ricky Dey",
      email: "deyricky36@gmail.com",
      linkedin: "https://www.linkedin.com/in/ricky-dey-a49726206/",
      college: "Techno International New Town"
    },
    {
      name: "Rimanshu Patel",
      email: "rimanshu.patel@example.com",
      linkedin: "https://www.linkedin.com/in/rimanshu-patel",
      college: "Techno India University"
    },
    {
      name: "Rupsa Das",
      email: "rupsadas581@gmail.com",
      linkedin: "https://www.linkedin.com/in/rupsa-das2006",
      college: "Government College of Engineering and Leather Technology"
    },    {
      name: "Sattik Mondal",
      email: "sattikmondal853@gmail.com",
      linkedin: "https://www.linkedin.com/in/sattik-m-4b78b2298/",
      college: "Greater Kolkata College of Engineering"
    },
    {
      name: "Sayan Deyashi",
      email: "deyashisayan2@gmail.com",
      linkedin: "https://www.linkedin.com/in/sayandeyashi",
      college: "Budge Budge Institute of Technology"
    },
    {
      name: "Shatadru Dhar",
      email: "shatadrudhar10c@gmail.com",
      linkedin: "https://www.linkedin.com/in/shatadru-dhar/",
      college: "Kalyani Government Engineering College"
    },
    {
      name: "Shayan Ghosh",
      email: "shayanghosh0439@gmail.com",
      linkedin: "https://www.linkedin.com/in/shayan-ghosh-0834b3271/",
      college: "Abacus Institute of Engineering and Management"
    },    {
      name: "Souvik Saha",
      email: "sahasouvik631@gmail.com",
      linkedin: "https://github.com/souvik27-lab",
      college: "Saroj Mohan Institute of Technology"
    },
    {
      name: "Subhanu Majumder",
      email: "reach.subhanu@gmail.com",
      linkedin: "https://www.linkedin.com/in/subhanumajumder/",
      college: "Future Institute of Engineering and Management"
    }
  ];
  return (
    <section className={s["team-section"]} ref={sectionRef}>
      <div className="wrapper">
        <div className={s["section-header"]} ref={headerRef}>
          <h2>Our Core Team</h2>
          <div className={s["header-decoration"]}>
            <span className={s["starburst"]} ref={starburstHeaderRef}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="team-header-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#b2ebf2" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#57B9C2" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="28" cy="28" r="28" fill="url(#team-header-glow)"/>
                <circle cx="28" cy="28" r="22" fill="#57B9C2"/>
                <path d="M28 10L31.5 22.5L44 26L31.5 29.5L28 42L24.5 29.5L12 26L24.5 22.5L28 10Z" fill="#fff"/>
              </svg>
            </span>
          </div>
          <p>Meet the passionate individuals driving our community forward</p>
        </div>      
        <div className={s["team-members"]} ref={teamMembersRef}>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              statement={member.statement}
              image={member.image}
              socials={member.socials}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Campus Ambassadors Section */}
        <div className={s["ambassadors-section"]}>
          <div className={s["ambassadors-header"]} ref={ambassadorsHeaderRef}>
            <h3>Campus Ambassadors</h3>
            <p>Our dedicated representatives across leading institutions</p>
          </div>
          <div className={s["search-bar"]}>
            <FontAwesomeIcon icon={faSearch} className={s["search-icon"]} />
            <input 
              type="text" 
              placeholder="Search by name or college..." 
              className={s["search-input"]}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={s["campus-ambassadors"]} ref={ambassadorsRef}>
            {campusAmbassadors
              .filter(ambassador => 
                ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                ambassador.college.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((ambassador) => (
              <CampusAmbassador
                key={ambassador.name}
                name={ambassador.name}
                email={ambassador.email}
                linkedin={ambassador.linkedin}
                college={ambassador.college}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
