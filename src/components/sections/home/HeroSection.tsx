'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from '@/components/ui/Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const outlineBadgeRef = useRef<HTMLDivElement>(null);

  // Countdown timer calculations targeting next summit on June 15, 2026
  const [timeLeft, setTimeLeft] = useState({ hours: 120, minutes: 24, seconds: 15 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-06-15T09:00:00Z').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        // Mockup countdown shows hours, minutes, seconds.
        // We sum all days into the hours variable to match the look.
        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { hours: totalHours, minutes, seconds };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Fade up left column elements stagger
    const tl = gsap.timeline();
    
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
    )
    .fromTo(headlineRef.current,
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
    )
    .fromTo(outlineBadgeRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    // Fade in countdown card on the right
    gsap.fromTo(countdownRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.2)', delay: 0.45 }
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
          {/* Mockup-Style Top-Left Little Label */}
          <div ref={badgeRef} className={styles.badgeLabel}>
            Act for Earth — Climate Summit 2026
          </div>

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

          {/* Mockup-Style Outline Capsule Detail (Bottom-Left) */}
          <div ref={outlineBadgeRef} className={styles.outlineBadge}>
            Storytelling | Environmental Education | Youth Action
          </div>
        </div>

        {/* Mockup-Style Floating Countdown Card (Bottom-Right) */}
        <div ref={countdownRef} className={styles.countdownCard}>
          <span className={styles.countdownText}>Next Youth Climate Summit:</span>
          <div className={styles.timerContainer}>
            <div className={styles.timerBlock}>
              <span className={styles.timerVal}>{timeLeft.hours} <span className={styles.unit}>hrs.</span></span>
            </div>
            <div className={styles.timerBlock}>
              <span className={styles.timerVal}>{timeLeft.minutes} <span className={styles.unit}>mins.</span></span>
            </div>
            <div className={styles.timerBlock}>
              <span className={styles.timerVal} style={{ backgroundColor: 'var(--color-dark)', color: 'var(--color-sand)' }}>
                {timeLeft.seconds} <span className={styles.unit} style={{ color: 'rgba(254, 254, 254, 0.7)' }}>secs.</span>
              </span>
            </div>
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
