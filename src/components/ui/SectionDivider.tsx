'use client';

import React from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'wave-reverse' | 'leaf';
  color: string;
  backgroundColor: string;
  className?: string;
}

export default function SectionDivider({
  variant = 'wave',
  color,
  backgroundColor,
  className = '',
}: SectionDividerProps) {
  // Styles for the container
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '80px',
    overflow: 'hidden',
    lineHeight: 0,
    backgroundColor: backgroundColor,
    position: 'relative',
    zIndex: 2,
  };

  const svgStyle: React.CSSProperties = {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '80px',
    fill: color,
  };

  // SVG paths for waves
  const paths = {
    wave: (
      <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
    ),
    'wave-reverse': (
      <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
    ),
    leaf: (
      <path d="M0,0C150,90,350,90,500,30C650,-30,850,-30,1000,30C1150,90,1350,90,1440,0L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
    ),
  };

  return (
    <div style={containerStyle} className={className}>
      <svg
        style={svgStyle}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths[variant]}
      </svg>
    </div>
  );
}
