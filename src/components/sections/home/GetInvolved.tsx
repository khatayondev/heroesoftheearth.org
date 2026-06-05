'use client';

import React, { useRef, useEffect } from 'react';
import { Handshake, Heart, School, Gift } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Button from '@/components/ui/Button';
import styles from './GetInvolved.module.css';

export default function GetInvolved() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // Elastic pop in for icon circles
    gsap.to(`.${styles.iconWrapper}`, {
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      ease: 'elastic.out(1.2, 0.6)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Stagger slide up for card labels
    gsap.to(`.${styles.itemText}`, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  const items = [
    { label: 'Partner with us.', icon: <Handshake size={28} /> },
    { label: 'Volunteer with us', icon: <Heart size={28} /> },
    { label: 'Invite us to your school or community.', icon: <School size={28} /> },
    { label: 'Support our mission.', icon: <Gift size={28} /> },
  ];

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Join Us in Creating Change</h2>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <p className={styles.itemText}>{item.label}</p>
            </div>
          ))}
        </div>

        <p className={styles.closingText}>
          Together, we can empower the next generation to protect our planet.
        </p>
        
        <Button variant="primary" size="lg" href="/contact">
          Partner with Us
        </Button>
      </div>
    </section>
  );
}
