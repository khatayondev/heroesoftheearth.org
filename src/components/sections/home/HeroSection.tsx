'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from '@/components/ui/Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade up center elements stagger
    const tl = gsap.timeline();
    
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(subheadlineRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(ctasRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      '-=0.35'
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* YouTube Background Video */}
      <div className={styles.videoWrapper}>
        <iframe 
          className={styles.backgroundVideo}
          src="https://www.youtube.com/embed/aoLh_zTZ-qY?autoplay=1&mute=1&loop=1&playlist=aoLh_zTZ-qY&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
          title="Heroes of the Earth Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      {/* Dark overlay for text readability */}
      <div className={styles.heroOverlay}></div>

      <div className={styles.container}>
        <div className={styles.centerCol}>

          <h1 ref={headlineRef} className={styles.headline}>
            Empowering the next generation to protect our planet through education and storytelling
          </h1>

          <p ref={subheadlineRef} className={styles.subheadline}>
            Through storytelling, education, and action, Heroes of the Earth equips children and youth with the knowledge and tools to protect our planet.
          </p>

          <div ref={ctasRef} className={styles.ctas}>
            <Button 
              href="/contact" 
              className={styles.mockupBtnLime}
            >
              Partner with Us
            </Button>
          </div>
        </div>
      </div>

      {/* Center Mockup Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span>SCROLL</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
