'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Compass } from 'lucide-react';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

import ContactForm from '@/components/sections/contact/ContactForm';
import styles from './page.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBannerRef = useRef<HTMLDivElement>(null);
  const splitGridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Entrance Animations
    gsap.fromTo(heroBannerRef.current,
      { opacity: 0, scale: 0.96, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    // 2. Content Grid Stagger on scroll
    const textElements = splitGridRef.current?.querySelectorAll(`.${styles.animateText}`);
    const formCard = splitGridRef.current?.querySelector(`.${styles.formCol}`);

    if (textElements && textElements.length > 0) {
      gsap.fromTo(textElements,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: splitGridRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    if (formCard) {
      gsap.fromTo(formCard,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: splitGridRef.current,
            start: 'top 80%',
          }
        }
      );
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={styles.page}>
      <div className={styles.pageContainer}>
        
        {/* Landscape Fluid Organic Hero Banner Card */}
        <div ref={heroBannerRef} className={styles.heroBanner}>
          <div className={styles.heroOverlay} />
          
          <div className={styles.heroContent}>
            {/* Small Glowing Logo Accent */}
            <div className={styles.heroLogoWrapper}>
              <Compass size={28} className={styles.heroLogoIcon} />
            </div>

            <h1 className={styles.heroTitle}>Get in Touch</h1>
          </div>

          {/* Floating breadcrumb capsule */}
          <div className={styles.breadcrumbCapsule}>
            <span className={styles.breadcrumbItem}>Home</span>
            <span className={styles.breadcrumbDivider}>/</span>
            <span className={`${styles.breadcrumbItem} ${styles.active}`}>Get in Touch</span>
          </div>
        </div>

        {/* Main Content split section */}
        <section ref={splitGridRef} className={styles.mainSection}>
          <div className={styles.splitGrid}>
            
            {/* Left Column: Copywriting & Contact Coordinates Grid */}
            <div className={styles.textCol}>

              <h2 className={`${styles.mainTitle} ${styles.animateText}`}>
                Have questions or want to collaborate? We’d love to hear from you.
              </h2>

              <p className={`${styles.description} ${styles.animateText}`}>
                Have questions about our eco-storybooks, school and educator resources, youth challenges, 
                or want to explore corporate sponsorship opportunities? Reach out and connect with our outreach team.
              </p>

              {/* Coordinates Grid (2x2 layout) */}
              <div className={`${styles.coordinatesGrid} ${styles.animateText}`}>
                <div className={styles.coordCell}>
                  <h3 className={styles.coordLabel}>Call Center</h3>
                  <a href="tel:+15551234567" className={styles.coordValue}>
                    +1 (555) 123-4567
                  </a>
                  <a href="tel:+15559876543" className={styles.coordValue}>
                    +1 (555) 987-6543
                  </a>
                </div>

                <div className={styles.coordCell}>
                  <h3 className={styles.coordLabel}>Our Location</h3>
                  <span className={styles.coordValue}>Vancouver, BC, Canada</span>
                  <span className={styles.coordValue}>Pacific Highway Suite 400</span>
                </div>

                <div className={styles.coordCell}>
                  <h3 className={styles.coordLabel}>Email</h3>
                  <a href="mailto:hello@heroesoftheearth.org" className={styles.coordValue}>
                    hello@heroesoftheearth.org
                  </a>
                  <a href="mailto:outreach@heroesoftheearth.org" className={styles.coordValue}>
                    outreach@heroesoftheearth.org
                  </a>
                </div>

                 <div className={styles.coordCell}>
                  <h3 className={styles.coordLabel}>Social network</h3>
                  <div className={styles.socialRow}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                      <InstagramIcon size={18} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                      <LinkedinIcon size={18} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Twitter">
                      <TwitterIcon size={18} />
                    </a>
                    <a href="https://heroesoftheearth.org" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Website">
                      <Globe size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Partnerships Widget */}
              <div className={`${styles.partnershipsWidget} ${styles.animateText}`} style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(44, 90, 71, 0.1)' }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--color-dark)',
                  marginBottom: 'var(--space-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Partnerships & Collaboration
                </h3>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', marginBottom: 'var(--space-sm)', lineHeight: '1.6' }}>
                  We collaborate with a diverse ecosystem of organizations to scale our environmental movement:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Schools', 'NGOs', 'Environmental organisations', 'Sponsors', 'Community programs'].map((item) => (
                    <span key={item} style={{ 
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(44, 90, 71, 0.08)',
                      color: 'var(--color-sage-dark)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form Rounded Card */}
            <div className={styles.formCol}>
              <ContactForm />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
