'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import styles from './AboutSection.module.css';

// Register ScrollTrigger globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    // 1. Split Header Column Reveal
    gsap.to(imageColRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.to(textColRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // 2. Bento Grid Bricks Slide-Up Reveal
    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Editorial Split Header (Top Part) */}
        <div className={styles.headerGrid}>
          {/* Left Column: Premium Framed Widescreen Image */}
          <div ref={imageColRef} className={styles.imageCol}>
            <div className={styles.imageFrame}>
              <Image 
                src="/images/schools-hero.png"
                alt="Environmental classroom education"
                fill
                sizes="(max-width: 992px) 100vw, 600px"
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>

          {/* Right Column: Copywriting & Modal Trigger */}
          <div ref={textColRef} className={styles.textCol}>


            <h2 className={styles.title}>About Us</h2>

            <p className={styles.leadText}>
              Heroes of the Earth is a youth-focused environmental education initiative. 
              We inspire children and young people to understand and take action on ocean 
              conservation, climate change, and sustainability through storytelling and 
              interactive learning in multiple languages, including French and Indigenous 
              languages, to promote accessibility, inclusion, and cultural respect.
            </p>

            <Button 
              variant="secondary" 
              size="md" 
              onClick={() => setIsModalOpen(true)}
            >
              Read More →
            </Button>
          </div>
        </div>

        {/* Bento Grid / Brick Design (Bottom Part) */}
        <div ref={gridRef} className={styles.bentoGrid}>
          {/* Card 1: Wide Green (Multilingual Storytelling) */}
          <div className={`${styles.card} ${styles.cardWideGreen}`}>
            <div>

              <h3 className={styles.cardTitle}>Multilingual & Culturally Respectful Resources</h3>
              <p className={styles.cardDesc}>
                Environmental stewardship is a shared human history. We translate our resources into French and Indigenous languages (such as Cree and Anishinaabemowin) to celebrate diversity, bridge traditional ecological wisdom with modern climate science, and honor the original caretakers of our ecosystems.
              </p>
            </div>
            <div className={styles.cardFooter}>
              <div>
                <span className={styles.metric}>3+</span>
                <span className={styles.metricSub}> Languages Offered</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsModalOpen(true)}
                style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Card 2: Square Sand (Our Mission Focus) */}
          <div className={`${styles.card} ${styles.cardSquareSand}`}>
            <div>

              <h3 className={styles.cardTitle}>Storytelling & Action</h3>
              <p className={styles.cardDesc}>
                We combine illustrated storytelling, immersive education, and local student-led cleanups to address ocean conservation and climate resilience.
              </p>
            </div>
            <div className={styles.cardFooter}>
              <div>
                <span className={styles.metric}>15k+</span>
                <span className={styles.metricSub}> Students Reached</span>
              </div>
            </div>
          </div>

          {/* Card 3: Square Coral (Real Impact) */}
          <div className={`${styles.card} ${styles.cardSquareCoral}`}>
            <div>

              <h3 className={styles.cardTitle}>Real Change, Real Results</h3>
              <p className={styles.cardDesc}>
                We empower youth to take tangible actions like restoring coastlines and setting up school plastic recycling hubs.
              </p>
            </div>
            <div className={styles.cardFooter}>
              <div>
                <span className={styles.metric}>50+</span>
                <span className={styles.metricSub}> Active Programs</span>
              </div>
            </div>
          </div>

          {/* Card 4: Wide Image Background (Empowering Next Gen) */}
          <div className={`${styles.card} ${styles.cardWideImage}`}>
            <Image
              src="/images/youth-hero.png"
              alt="Children participating in environmental education"
              fill
              sizes="(max-width: 992px) 100vw, 800px"
              style={{ objectFit: 'cover', zIndex: 1 }}
            />
            <div className={styles.bentoImageOverlay}></div>
            <div className={styles.cardImageContent}>


            </div>
          </div>
        </div>

      </div>

      {/* Read More Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="About Heroes of the Earth"
      >
        <h4 className={styles.modalHeader}>Our Mission & Vision</h4>
        <p className={styles.modalParagraph}>
          Our programs emphasize cultural respect, hands-on learning, and community involvement. 
          By collaborating with local schools, educators, and youth organizations, we create 
          meaningful and lasting change across communities.
        </p>
        <p className={styles.modalParagraph}>
          We are dedicated to creating resources that celebrate diversity and bridge the gap between 
          traditional indigenous wisdom and modern environmental science. Through this cross-cultural 
          lens, we show young people that protecting the Earth is a shared human heritage.
        </p>
        <p className={styles.modalParagraph}>
          Join us on this journey to create a more resilient and sustainable planet, starting with 
          the voices that represent our future!
        </p>
      </Modal>
    </section>
  );
}
