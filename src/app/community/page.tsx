"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faWhatsapp, 
  faDiscord, 
  faTwitter, 
  faInstagram, 
  faLinkedin, 
  faGithub 
} from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faUsers, faBriefcase } from "@fortawesome/free-solid-svg-icons";

import s from "./community.module.scss";

export default function CommunityPage() {
  const [activeForm, setActiveForm] = useState<'member' | 'core' | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    motivation: ''
  });
  const [coreForm, setCoreForm] = useState({
    name: '',
    email: '',
    role: '',
    experience: '',
    portfolio: '',
    availability: '',
    leadership: ''
  });

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
  ];

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle member application submission
    console.log('Member application:', memberForm);
    alert('Application submitted successfully!');
    setMemberForm({ name: '', email: '', skills: '', experience: '', motivation: '' });
    setActiveForm(null);
  };

  const handleCoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle core team application submission
    console.log('Core team application:', coreForm);
    alert('Application submitted successfully!');
    setCoreForm({ name: '', email: '', role: '', experience: '', portfolio: '', availability: '', leadership: '' });
    setActiveForm(null);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.bgAnimation}>
        <div className={s.bgCircle}></div>
        <div className={s.bgCircle}></div>
      </div>
      
      <header className={s.header}>
        <Link href="/" className={s.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Home</span>
        </Link>
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
        <p className={s.sectionDesc}>Join our team as a Campus Ambassador and represent our community at your campus.</p>
        <div className={s.typeformContainer}>
          <div className={s.typeformWrapper}>
            <div data-tf-live="01JWZTSNGVQBDXFKWEET4EQ2QR"></div>
          </div>
        </div>
      </section>

      <footer className={s.pageFooter}>
        <div className={s.footerContent}>
          <p>© {new Date().getFullYear()} Repository Community</p>
          <p>Building the future, together.</p>
        </div>
      </footer>

      {/* Member Application Form */}
      {activeForm === 'member' && (
        <div className={s.formOverlay} onClick={() => setActiveForm(null)}>
          <div className={s.formContainer} onClick={(e) => e.stopPropagation()}>
            <div className={s.formHeader}>
              <h3>Community Member Application</h3>
              <button className={s.closeButton} onClick={() => setActiveForm(null)}>
                ×
              </button>
            </div>
            <p className={s.formDescription}>Join our community of creators, builders, and innovators. Tell us a bit about yourself!</p>
            <form onSubmit={handleMemberSubmit}>
              <div className={s.formColumns}>
                <div className={s.formColumn}>
                  <div className={s.formGroup}>
                    <label>Full Name <span className={s.required}>*</span></label>
                    <input
                      type="text"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label>Email <span className={s.required}>*</span></label>
                    <input
                      type="email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label>Experience Level <span className={s.required}>*</span></label>
                    <select
                      value={memberForm.experience}
                      onChange={(e) => setMemberForm({...memberForm, experience: e.target.value})}
                      required
                    >
                      <option value="">Select your level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="advanced">Advanced (3+ years)</option>
                    </select>
                  </div>
                </div>
                
                <div className={s.formColumn}>
                  <div className={s.formGroup}>
                    <label>Skills & Technologies <span className={s.required}>*</span></label>
                    <textarea
                      value={memberForm.skills}
                      onChange={(e) => setMemberForm({...memberForm, skills: e.target.value})}
                      placeholder="e.g., React, Node.js, Python, Design, etc."
                      required
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label>Why do you want to join? <span className={s.required}>*</span></label>
                    <textarea
                      value={memberForm.motivation}
                      onChange={(e) => setMemberForm({...memberForm, motivation: e.target.value})}
                      placeholder="Tell us about your goals and what you hope to achieve..."
                      required
                    />
                  </div>
                </div>
              </div>              
              <div className={s.formActions}>
                <button type="button" className={s.cancelButton} onClick={() => setActiveForm(null)}>
                  <span>Cancel</span>
                </button>
                <button type="submit" className={s.submitButton}>
                  <span>Submit Application</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Core Team Application Form */}
      {activeForm === 'core' && (
        <div className={s.formOverlay} onClick={() => setActiveForm(null)}>
          <div className={s.formContainer} onClick={(e) => e.stopPropagation()}>
            <div className={s.formHeader}>
              <h3>Core Team Application</h3>
              <div className={s.formBadge}>Leadership Position</div>
              <button className={s.closeButton} onClick={() => setActiveForm(null)}>
                ×
              </button>
            </div>
            <p className={s.formDescription}>Lead initiatives, mentor others, and shape the future of our community. Tell us about your experience and vision.</p>
            
            <form onSubmit={handleCoreSubmit}>
              <div className={s.formColumns}>
                <div className={s.formColumn}>
                  <div className={s.formGroup}>
                    <label>Full Name <span className={s.required}>*</span></label>
                    <input
                      type="text"
                      value={coreForm.name}
                      onChange={(e) => setCoreForm({...coreForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label>Email <span className={s.required}>*</span></label>
                    <input
                      type="email"
                      value={coreForm.email}
                      onChange={(e) => setCoreForm({...coreForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label>Preferred Role <span className={s.required}>*</span></label>
                    <select
                      value={coreForm.role}
                      onChange={(e) => setCoreForm({...coreForm, role: e.target.value})}
                      required
                      className={s.enhancedSelect}
                    >
                      <option value="">Select a role</option>
                      <option value="tech-lead">Technical Lead</option>
                      <option value="design-lead">Design Lead</option>
                      <option value="community-manager">Community Manager</option>
                      <option value="event-coordinator">Event Coordinator</option>
                      <option value="content-creator">Content Creator</option>
                    </select>
                  </div>
                  <div className={s.formGroup}>
                    <label>Portfolio/GitHub/LinkedIn</label>
                    <input
                      type="url"
                      value={coreForm.portfolio}
                      onChange={(e) => setCoreForm({...coreForm, portfolio: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                
                <div className={s.formColumn}>
                  <div className={s.formGroup}>
                    <label>Time Availability <span className={s.required}>*</span></label>
                    <select
                      value={coreForm.availability}
                      onChange={(e) => setCoreForm({...coreForm, availability: e.target.value})}
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="5-10">5-10 hours/week</option>
                      <option value="10-20">10-20 hours/week</option>
                      <option value="20+">20+ hours/week</option>
                    </select>
                  </div>
                  <div className={s.formGroup}>
                    <label>Relevant Experience <span className={s.required}>*</span></label>
                    <textarea
                      value={coreForm.experience}
                      onChange={(e) => setCoreForm({...coreForm, experience: e.target.value})}
                      placeholder="Describe your relevant experience, projects, and achievements..."
                      required
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label>Leadership & Vision <span className={s.required}>*</span></label>
                    <textarea
                      value={coreForm.leadership}
                      onChange={(e) => setCoreForm({...coreForm, leadership: e.target.value})}
                      placeholder="Describe your leadership experience and vision for the community..."
                      required
                    />
                  </div>
                </div>
              </div>              
              <div className={s.formActions}>
                <button type="button" className={s.cancelButton} onClick={() => setActiveForm(null)}>
                  <span>Cancel</span>
                </button>
                <button type="submit" className={s.submitButton}>
                  <span>Submit Application</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
