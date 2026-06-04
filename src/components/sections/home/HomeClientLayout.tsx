'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from '@/components/sections/home/HeroSection';
import AboutSection from '@/components/sections/home/AboutSection';
import BooksPreview from '@/components/sections/home/BooksPreview';
import GetInvolved from '@/components/sections/home/GetInvolved';
import ImpactSection from '@/components/sections/home/ImpactSection';
import ProgramsEvents from '@/components/sections/home/ProgramsEvents';
import RuralImpactCards from '@/components/sections/home/RuralImpactCards';

import styles from '@/app/page.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeClientLayout() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only stack panels on desktop viewports (width > 992px)
    const isMobile = window.innerWidth <= 992;
    if (isMobile) return;

    const panels = gsap.utils.toArray<HTMLElement>(`.${styles.scrollPanel}`);

    panels.forEach((panel, i) => {
      // Pin all panels except the last one so the subsequent ones scroll over them
      if (i < panels.length - 1) {
        // Dynamically evaluate if section content is taller than the viewport
        const isTall = panel.offsetHeight > window.innerHeight + 10;

        ScrollTrigger.create({
          trigger: panel,
          start: isTall ? 'bottom bottom' : 'top top',
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        });

        // Scale down, fade out, and shift underlying panel for a depth effect
        // Fade to 0 so it's fully invisible behind the incoming opaque section
        const nextPanel = panels[i + 1];
        gsap.to(panel, {
          scrollTrigger: {
            trigger: nextPanel,
            start: 'top bottom',
            end: 'top 40%',
            scrub: true,
            invalidateOnRefresh: true,
          },
          scale: 0.94,
          opacity: 0,
          yPercent: -8,
          ease: 'none',
        });
      }
    });
  }, { scope: containerRef });


  return (
    <div ref={containerRef} className={styles.scrollDeck}>
      <div className={styles.scrollPanel}>
        <HeroSection />
      </div>
      <div className={styles.scrollPanel}>
        <AboutSection />
      </div>
      <div className={styles.scrollPanel}>
        <BooksPreview />
      </div>
      <div className={styles.scrollPanel}>
        <RuralImpactCards />
      </div>
      <div className={styles.scrollPanel}>
        <GetInvolved />
      </div>
      <div className={styles.scrollPanel}>
        <ImpactSection />
      </div>
      <div className={styles.scrollPanel}>
        <ProgramsEvents />
      </div>
    </div>
  );
}
