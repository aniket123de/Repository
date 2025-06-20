"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    logo?: string;
    date?: string;
    venue?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '2.5rem 0',
      }}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          style={{
            position: 'relative',
            display: 'block',
            padding: '0.5rem',
            height: '100%',
            width: '100%',
            textDecoration: 'none',
          }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                style={{
                  position: 'absolute',
                  inset: 0,
                  height: '100%',
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '1.5rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            {item.date && <CardDate>{item.date}</CardDate>}
            <CardDescription>{item.description}</CardDescription>
            {item.venue && <CardVenue>Venue: {item.venue}</CardVenue>}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={className}
      style={{
        borderRadius: '1rem',
        height: '100%',
        width: '100%',
        padding: '1rem',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid transparent',
        position: 'relative',
        zIndex: 20,
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <div style={{ position: 'relative', zIndex: 50 }}>
        <div style={{ padding: '1rem' }}>{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 
      className={className}
      style={{
        color: '#f1f5f9',
        fontWeight: 'bold',
        letterSpacing: '0.025em',
        marginTop: '1rem',
        fontSize: '1.25rem',
      }}
    >
      {children}
    </h4>
  );
};

export const CardDate = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p 
      className={className}
      style={{
        color: '#94a3b8',
        letterSpacing: '0.025em',
        lineHeight: '1.625',
        fontSize: '0.875rem',
        marginTop: '0.5rem',
        fontWeight: '500',
      }}
    >
      {children}
    </p>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={className}
      style={{
        marginTop: '2rem',
        color: '#94a3b8',
        letterSpacing: '0.025em',
        lineHeight: '1.625',
        fontSize: '0.875rem',
      }}
    >
      {children}
    </p>
  );
};

export const CardVenue = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p 
      className={className}
      style={{
        color: '#cbd5e1',
        letterSpacing: '0.025em',
        lineHeight: '1.625',
        fontSize: '0.875rem',
        marginTop: '1rem',
        fontWeight: '500',
      }}
    >
      {children}
    </p>
  );
};
