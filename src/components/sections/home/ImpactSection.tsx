'use client';

import React, { useRef, useEffect } from 'react';
import { BookOpen, Globe, Building2, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CounterAnimation from '@/components/ui/CounterAnimation';
import styles from './ImpactSection.module.css';

export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // Fade in and stagger up the impact cards
    gsap.to(`.${styles.card}`, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Footprint</span>
          <h2 className={styles.title}>Making a Difference</h2>
        </div>

        <div className={styles.grid}>
          {/* Card 1: Static Ages */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <BookOpen size={24} />
            </div>
            <h3 className={styles.staticText}>6–14</h3>
            <p className={styles.label}>Educational resources developed for children aged 6–14.</p>
          </div>

          {/* Card 2: Reached */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Globe size={24} />
            </div>
            <CounterAnimation target={50} suffix="+" duration={1.8} />
            <p className={styles.label}>Projects reaching communities in Canada and Beyond.</p>
          </div>

          {/* Card 3: School Partnerships */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Building2 size={24} />
            </div>
            <CounterAnimation target={20} suffix="+" duration={1.8} />
            <p className={styles.label}>Partnerships with schools and youth organisations.</p>
          </div>

          {/* Card 4: Programs */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Sparkles size={24} />
            </div>
            <CounterAnimation target={10} suffix="+" duration={1.8} />
            <p className={styles.label}>Supported by environmental initiatives and microgrants.</p>
          </div>
        </div>

        <p className={styles.supportText}>
          We are committed to building a more inclusive and accessible environmental movement 
          through education.
        </p>
      </div>
    </section>
  );
}
