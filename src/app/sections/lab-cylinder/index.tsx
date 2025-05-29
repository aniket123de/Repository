"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./lab-cylinder.module.scss";

// Sample event data structure
interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
  link?: string;
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
  };

  // Sample event data (replace with actual data source)
  const events: Event[] = [
    {
      id: "event1",
      title: "Lorem Ipsum Title 1",
      date: "Apr 20, 2025",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "/events/lorem-ipsum-1",
    },
    {
      id: "event2",
      title: "Lorem Ipsum Title 2",
      date: "Apr 19, 2025",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "/events/lorem-ipsum-2",
    },
    {
      id: "event3",
      title: "Lorem Ipsum Title 3",
      date: "Mar 09, 2025",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      link: "/events/lorem-ipsum-3",
    },
    {
      id: "event4",
      title: "Lorem Ipsum Title 4",
      date: "Feb 08, 2025",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      link: "/events/lorem-ipsum-4",
    },
  ];

  return (
    <section className={s.eventsSection} ref={sectionRef}>
      <div className={s.container}>
        <h2 className={s.sectionHeading}>UPCOMING EVENTS</h2>

        <AnimatePresence mode="wait">
          <motion.ul
            key="event-list"
            className={s.stackList}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {events.map((event, index) => (
              <EventStackItem
                key={event.id}
                event={event}
                variants={itemVariants}
                custom={index}
              />
            ))}
          </motion.ul>
        </AnimatePresence>

        <div className={s.viewAllContainer}>
          <Link href="/events" className={s.viewAllButton}>
            View All Events
          </Link>
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
}: {
  event: Event;
  variants: any;
  custom: number;
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
      className={`${s.stackItem} ${isExpanded ? s.expanded : ""}`}
      onClick={toggleExpand}
      variants={variants}
      custom={custom}
      layout
    >
      <motion.div
        className={s.stackHeader}
        layout="position"
      >
        <div className={s.eventMeta}>
          <span className={s.eventDate}>{event.date}</span>
          <h3 className={s.eventTitle}>{event.title}</h3>
        </div>
        <motion.button
          className={s.expandButton}
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
            className={s.expandedContent}
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
              }}
            >
              <p className={s.description}>{event.description}</p>
              <Link href={event.link || "#"} className={s.learnMoreLink}>
                Learn more
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
