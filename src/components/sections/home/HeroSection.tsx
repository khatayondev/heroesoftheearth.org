'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
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
    // Fade up left column elements stagger
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
      {/* Aerial Deep Teal-Green Ocean Background Image */}
      <div className={styles.backgroundGraphic}>
        <Image
          src="/images/hero-sea-bg.png"
          alt="Aerial ocean and green coast photograph"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Deep vignette overlay to match mockup's high-contrast moody border shading */}
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroOverlayLeft}></div>
      <div className={styles.heroOverlayBottom}></div>

      <div className={styles.container}>
        <div className={styles.leftCol}>

          <h1 ref={headlineRef} className={styles.headline}>
            Empowering the next generation to protect our planet through education and storytelling
          </h1>

          <p ref={subheadlineRef} className={styles.subheadline}>
            Through storytelling, education, and action, Heroes of the Earth equips children and youth with the knowledge and tools to protect our planet.
          </p>

          <div ref={ctasRef} className={styles.ctas}>
            <Button 
              href="/contact" 
              className={styles.mockupBtnWhite}
            >
              Partner with Us
            </Button>
            <Button 
              href="/contact" 
              className={styles.mockupBtnLime}
            >
              Talk to us
            </Button>
          </div>
        </div>



        {/* Center Mockup Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span>SCROLL</span>
          <div className={styles.scrollLine}></div>
        </div>
      </div>
    </section>
  );
}
