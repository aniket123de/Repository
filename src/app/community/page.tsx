"use client";

import Image from "next/image";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faWhatsapp, 
  faDiscord, 
  faTwitter, 
  faInstagram, 
  faLinkedin, 
  faGithub 
} from "@fortawesome/free-brands-svg-icons";

import s from "./community.module.scss";

export default function CommunityPage() {
  const socialLinks = [
    {
      name: "WhatsApp Community",
      icon: faWhatsapp,
      url: "https://chat.whatsapp.com/DuEKwdOeedk2R564i2Ri5A",
      color: "#25D366"
    },
    {
      name: "Discord Server",
      icon: faDiscord,
      url: "#",
      color: "#5865F2"
    },
    {
      name: "Twitter",
      icon: faTwitter,
      url: "#",
      color: "#1DA1F2"
    },
    {
      name: "Instagram",
      icon: faInstagram,
      url: "#",
      color: "#E4405F"
    },
    {
      name: "LinkedIn",
      icon: faLinkedin,
      url: "#",
      color: "#0077B5"
    },
    {
      name: "GitHub",
      icon: faGithub,
      url: "https://github.com/Repository-Main",
      color: "#333"
    }
  ];  useEffect(() => {
    // Load YouForm script
    const script = document.createElement("script");
    script.src = "https://app.youform.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Ensure proper mobile viewport handling
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }

    return () => {
      // Safely remove script only if it exists and is still in the DOM
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.bgAnimation}>
        <div className={s.bgCircle}></div>
        <div className={s.bgCircle}></div>
      </div>      
      <header className={s.header}>
        <div className={s.titleContainer}>
          <h1 className={s.title}>Join Our Community</h1>
          <div className={s.glowUnderline}></div>
        </div>
        <p className={s.subtitle}>Connect, collaborate, and create amazing digital experiences with our growing community of passionate builders</p>
      </header>

      <section className={s.heroSection}>
        <div className={s.heroContent}>
          <h2 className={s.heroTitle}>Build Together.<br />Grow Together.</h2>
          <p className={s.heroText}>
            Join a thriving ecosystem of developers, designers, and digital creators who are pushing boundaries and making an impact through technology.
          </p>
        </div>
        <div className={s.heroVisual}>
          <div className={s.visualContainer}>
            <Image
              src="/circle.png"
              alt="Community"
              width={300}
              height={300}
              className={s.heroImage}
            />
          </div>
        </div>
      </section>      <section className={s.socialSection}>
        <div className={s.sectionHeader}>
          <h2>
            <span className={s.sectionAccent}>#</span>
            Connect With Us
          </h2>
          <div className={s.sectionDivider}></div>
        </div>
        <p className={s.sectionDesc}>Join our channels to stay updated and engage with our community</p>
        <div className={s.socialGrid}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.socialCard}
              style={{ '--accent-color': social.color } as React.CSSProperties}
            >
              <div className={s.socialIconWrapper}>
                <FontAwesomeIcon icon={social.icon} className={s.socialIcon} />
              </div>
              <div className={s.socialContent}>
                <span className={s.socialName}>{social.name}</span>
                <span className={s.socialJoin}>Join Now</span>
              </div>
              <div className={s.cardGlow}></div>
            </a>
          ))}
        </div>
      </section>      <section className={s.recruitmentSection}>
        <div className={s.sectionHeader}>
          <h2>
            <span className={s.sectionAccent}>#</span>
            Campus Ambassador Form
          </h2>
          <div className={s.sectionDivider}></div>
        </div>
        <p className={s.sectionDesc}>Join our team as a Campus Ambassador and represent our community at your campus.</p>        <div className={s.typeformContainer}>
          <div className={s.typeformWrapper}>
            <div data-youform-embed data-form='ygfgmlyw' data-width='100%' data-height='700'></div>
          </div>
        </div>
      </section>      <footer className={s.pageFooter}>
        <div className={s.footerContent}>
          <p>© {new Date().getFullYear()} @ Repository</p>
          <p>Building the future, together.</p>
        </div>
      </footer>
    </div>
  );
}
