"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./lab-cylinder.module.scss";

// Fallback styles object in case CSS module fails to load
const fallbackStyles = {
  eventsSection: 'eventsSection',
  container: 'container',
  sectionHeading: 'sectionHeading',
  eventsGrid: 'eventsGrid',
  eventColumn: 'eventColumn',
  columnHeading: 'columnHeading',
  stackList: 'stackList',
  stackItem: 'stackItem',
  expanded: 'expanded',
  hackathon: 'hackathon',
  workshop: 'workshop',
  webinar: 'webinar',
  stackHeader: 'stackHeader',
  eventMeta: 'eventMeta',
  eventDate: 'eventDate',
  eventTitle: 'eventTitle',
  eventType: 'eventType',
  expandButton: 'expandButton',
  expandedContent: 'expandedContent',
  description: 'description',
  learnMoreLink: 'learnMoreLink',
  viewAllContainer: 'viewAllContainer',
  viewAllButton: 'viewAllButton',
};

// Use fallback if styles fail to load
const styles = s && Object.keys(s).length > 0 ? s : fallbackStyles;

// Sample event data structure
interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
  link?: string;
  discordLink?: string;
  type: 'hackathon' | 'workshop' | 'webinar';
}

export const LabCylinder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "50px", // Start animation slightly before the section comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };  // Sample event data (replace with actual data source)
  const events: Event[] = [    {
      id: "hackathon1",
      title: "HexaFall",
      date: "Jun 28-29, 2025",
      description: "A 36-hour Offline Mysterious Hackathon Like Never Before!\n\nJoin us at JIS University, Kolkata for an extraordinary coding adventure.\n\nRegistration deadline: June 15, 2025.",
      link: "https://www.hexafalls.tech",
      discordLink: "https://discord.gg/cYdBDCXuPu",
      type: "hackathon"
    },
    {
      id: "hackathon2",
      title: "HACK{0}LUTION 2K25",
      date: "Jun 26-27, 2025",
      description: "36 hours of non-stop innovation! Open-theme hackathon at IEM Ashram Campus, Kolkata. Think. Code. Compete. Win big! Registration is live now.",
      link: "https://hackolution.tech",
      type: "hackathon"
    },    {
      id: "hackathon3",
      title: "StatusCode2",
      date: "Jun 20-21, 2025",
      description: "The wildest hackathon of the year! Code till your fingers cramp, debug like your GPA depends on it. Pull up with your gang and join the madness.",
      link: "https://lnkd.in/gV-pfKVN",
      type: "hackathon"
    },
    {
      id: "hackathon4",
      title: "Design-a-thon",
      date: "May 09-10, 2025",
      description: "A 24-hour UI/UX sprint hosted by Inspiria Knowledge Campus. Build smart, inclusive product prototypes in Figma addressing real-world challenges. ₹50,000 worth prizes. Individual participation only.",
      link: "https://inspiria.edu.in/Design-a-thon",
      type: "hackathon"
    },
    {
      id: "workshop1",
      title: "React Advanced Patterns Workshop",
      date: "Apr 19, 2025",
      description: "Master advanced React patterns and best practices in this hands-on workshop led by industry experts.",
      link: "/events/react-workshop",
      type: "workshop"
    },
    {
      id: "webinar1",
      title: "Building Scalable APIs",
      date: "Mar 12, 2025",
      description: "Learn the fundamentals of designing and building scalable APIs that can handle millions of requests.",
      link: "/events/api-webinar",
      type: "webinar"
    },
    {
      id: "workshop2",
      title: "UI/UX Design Fundamentals",
      date: "Feb 20, 2025",
      description: "Master the principles of user interface and user experience design in this comprehensive workshop.",
      link: "/events/design-workshop",
      type: "workshop"
    }
  ];

  // Separate events by type
  const hackathonEvents = events.filter(event => event.type === 'hackathon');
  const workshopWebinarEvents = events.filter(event => event.type === 'workshop' || event.type === 'webinar');  return (
    <section className={styles.eventsSection} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeading}>UPCOMING EVENTS</h2>        <div className={styles.eventsGrid}>
          {/* Hackathon Column */}
          <div className={styles.eventColumn}>
            <h3 className={styles.columnHeading}>
              Hackathons
            </h3>
            <AnimatePresence mode="wait">
              <motion.ul
                key="hackathon-list"
                className={styles.stackList}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
              >
                {hackathonEvents.map((event, index) => (
                  <EventStackItem
                    key={event.id}
                    event={event}
                    variants={itemVariants}
                    custom={index}
                    styles={styles}
                  />
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* Workshop/Webinar Column */}
          <div className={styles.eventColumn}>
            <h3 className={styles.columnHeading}>
              Workshops & Webinars
            </h3>
            <AnimatePresence mode="wait">
              <motion.ul
                key="workshop-list"
                className={styles.stackList}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
              >
                {workshopWebinarEvents.map((event, index) => (
                  <EventStackItem
                    key={event.id}
                    event={event}
                    variants={itemVariants}
                    custom={index + hackathonEvents.length}
                    styles={styles}
                  />
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// Event stack item with dropdown functionality
const EventStackItem = ({
  event,
  variants,
  custom,
  styles,
}: {
  event: Event;
  variants: any;
  custom: number;
  styles: any;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const expandVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: { duration: 0.2 },
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: { duration: 0.25, delay: 0.1 },
      },
    },
  };
  return (
    <motion.li
      className={`${styles.stackItem} ${isExpanded ? styles.expanded : ""} ${styles[event.type]}`}
      onClick={toggleExpand}
      variants={variants}
      custom={custom}
      layout
    >
      <motion.div
        className={styles.stackHeader}
        layout="position"
      >
        <div className={styles.eventMeta}>
          <span className={styles.eventDate}>{event.date}</span>
          <h3 className={styles.eventTitle}>{event.title}</h3>          <span className={styles.eventType}>
            {event.type === 'hackathon' ? 'Hackathon' : 
             event.type === 'workshop' ? 'Workshop' : 'Webinar'}
          </span>
        </div>
        <motion.button
          className={styles.expandButton}
          aria-label={isExpanded ? "Collapse" : "Expand"}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          {isExpanded ? "−" : "+"}
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className={styles.expandedContent}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={expandVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98]
                }
              }}
              exit={{
                opacity: 0,
                y: 20,
                transition: {
                  duration: 0.2
                }
              }}            >
              <p className={styles.description}>{event.description}</p>
              {event.discordLink && (
                <p className={styles.description}>
                  Join our{" "}
                  <Link 
                    href={event.discordLink} 
                    className={styles.learnMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </Link>
                  {" "}for updates and community discussions!
                </p>
              )}
              <Link href={event.link || "#"} className={styles.learnMoreLink}>
                Learn more
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};