"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faLinkedinIn, 
  faGithub, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import s from './team.module.scss';

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
  const imageSection = (
    <div className={s["team-member-image"]}>
      <div className={s["image-wrapper"]}>        <Image 
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
        <div className={s["starburst-wrapper"]}>          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div className={s["member-info"]}>
        <h3>{name}</h3>
        <h4>{role}</h4>
        <div className={s["social-links"]}>
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
      <div className={s["quote-container"]}>
        <span className={s["quote-mark"]}>&ldquo;</span>
        <p>{statement}</p>
        <span className={s["quote-mark"]}>&rdquo;</span>
      </div>
    </div>
  );
  return (
    <div className={`${s["team-member"]} ${isReversed ? s["reversed"] : ""}`}>
      {imageSection}
      {statementSection}
    </div>
  );
};

export const TeamSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const teamMembers = [
    {
      name: "Saptarshi",
      role: "Founder & Community Architect",
      statement: "Building a vibrant community is about creating spaces where passion meets purpose. I'm dedicated to architecting an ecosystem where developers can grow, innovate, and make meaningful connections that last beyond any single project.",
      image: "/team/sap.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/saptarshi",
        github: "https://github.com/saptarshi",
        twitter: "https://twitter.com/saptarshi"
      }
    },
    {
      name: "Parthi",
      role: "Outreach Lead",
      statement: "I believe in the power of connections. My mission is to expand our community's reach by building bridges with other tech groups, companies and educational institutions, creating opportunities for collaboration and growth for all our members.",
      image: "/team/parthi.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/parthi",
        twitter: "https://twitter.com/parthi"
      }
    },
    {
      name: "Anik",
      role: "Outreach Lead",
      statement: "Technology communities thrive when they extend beyond their boundaries. I work to create partnerships and collaborations that bring fresh perspectives and opportunities to our members while sharing our innovations with the wider tech ecosystem.",
      image: "/team/anik.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/anik",
        twitter: "https://twitter.com/anik"
      }
    },
    {
      name: "Aniket",
      role: "Community Lead",
      statement: "Community is the heart of everything we do. I'm passionate about fostering an inclusive, supportive environment where everyone feels welcome to share ideas, collaborate on projects, and grow together as developers and as people.",
      image: "/team/aniket.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/aniket",
        github: "https://github.com/aniket123de",
        twitter: "https://twitter.com/aniket"
      }
    },
    {
      name: "Ootso",
      role: "Tech Lead",
      statement: "Technology is a powerful tool for solving real-world problems. I'm focused on guiding our technical initiatives, mentoring emerging developers, and ensuring our community stays at the cutting edge of innovation while building solutions that matter.",
      image: "/team/ootso.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/ootso",
        github: "https://github.com/ootso"
      }
    },
    {
      name: "Protyoy",
      role: "Creative & Marketing Lead",
      statement: "Great ideas deserve great storytelling. I blend creativity with strategy to showcase our community's incredible work, build our brand identity, and create compelling narratives that resonate with developers and industry leaders alike.",
      image: "/team/ptoy.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/protyoy",
        instagram: "https://instagram.com/protyoy"
      }
    },
    {
      name: "Adrish",
      role: "Engagement Lead",
      statement: "Meaningful engagement creates lasting community bonds. I work to design events, workshops and interactive experiences that bring our members together, spark creativity, and create an atmosphere where knowledge sharing becomes second nature.",
      image: "/team/adrish.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/adrish",
        twitter: "https://twitter.com/adrish"
      }
    },
    {
      name: "Suryanshu",
      role: "Engagement Lead",
      statement: "Community thrives on active participation. My focus is creating engaging experiences that inspire members to contribute, collaborate and connect on a deeper level, turning casual participants into community champions.",
      image: "/team/suryanshu.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/suryanshu",
        twitter: "https://twitter.com/suryanshu"
      }
    },
    {
      name: "Sambit",
      role: "Engagement Co-lead",
      statement: "The strength of a community lies in its member interactions. I help craft meaningful engagement opportunities that foster genuine connections, encourage knowledge exchange, and create a supportive environment where everyone can thrive.",
      image: "/team/sambit.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/sambit",
        github: "https://github.com/sambit"
      }
    },
    {
      name: "Yuvraj",
      role: "Public Relations Lead",
      statement: "Effective communication builds bridges between communities and the wider world. I'm passionate about sharing our story, amplifying our impact, and creating relationships with media and industry partners that highlight our community's incredible talent and achievements.",
      image: "/team/yuvraj.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/yuvraj",
        twitter: "https://twitter.com/yuvraj"
      }
    }
  ];

  return (
    <section className={s["team-section"]}>
      <div className="wrapper">
        <div className={s["section-header"]}>
          <h2>Our Core Team</h2>
          <div className={s["header-decoration"]}>
            <span className={s["starburst"]}>              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>      <div className={s["team-members"]}>
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
      </div>
    </section>
  );
};
