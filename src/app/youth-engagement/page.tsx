'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2, Printer, Award, Globe, Send, User, Mail, Calendar } from 'lucide-react';
import { activities, learningTools } from '@/data/activities';
import ActivityCard from '@/components/sections/youth/ActivityCard';
import Button from '@/components/ui/Button';
import SectionDivider from '@/components/ui/SectionDivider';
import styles from './page.module.css';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function YouthEngagementPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const challengesHeaderRef = useRef<HTMLDivElement>(null);
  const challengesGridRef = useRef<HTMLDivElement>(null);
  const toolsHeaderRef = useRef<HTMLDivElement>(null);
  const toolsGridRef = useRef<HTMLDivElement>(null);
  const signupCardRef = useRef<HTMLDivElement>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !age) return;
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setAge('');
    }, 1200);
  };

  useGSAP(() => {
    // 1. Hero Reveal Animation
    const heroTl = gsap.timeline();
    heroTl.to(heroTitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }).to(heroSubRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.45').to(btnGroupRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.4');

    // 2. Challenges Staggered 3D Flip-in
    const cards = challengesGridRef.current?.querySelectorAll('.activity-card-trigger');
    if (cards && cards.length > 0) {
      gsap.to(cards, {
        rotateY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: challengesGridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Challenges Header Reveal
    gsap.fromTo(challengesHeaderRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: challengesHeaderRef.current,
          start: 'top 85%',
        },
      }
    );

    // 3. Learning Tools Scale Reveal
    const toolCards = toolsGridRef.current?.querySelectorAll(`.${styles.toolCard}`);
    if (toolCards && toolCards.length > 0) {
      gsap.fromTo(toolCards,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: toolsGridRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Tools Header Reveal
    gsap.fromTo(toolsHeaderRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: toolsHeaderRef.current,
          start: 'top 85%',
        },
      }
    );

    // 4. Signup Card slide in
    gsap.to(signupCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: signupCardRef.current,
        start: 'top 85%',
      },
    });

  }, { scope: containerRef });


  // Render Tool Icons
  const renderToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2': return <Gamepad2 size={26} />;
      case 'Printer': return <Printer size={26} />;
      case 'Award': return <Award size={26} />;
      case 'Globe': return <Globe size={26} />;
      default: return <Award size={26} />;
    }
  };

  return (
    <div ref={containerRef} className={styles.page}>
      {/* Split Screen Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <div className={styles.heroContent}>
            <div className={styles.accentLine}></div>
            <h1 ref={heroTitleRef} className={styles.title}>
              Become a Hero of the Earth
            </h1>
            <p ref={heroSubRef} className={styles.heroSubtitle}>
              We empower young people to take action through fun, interactive environmental challenges.
            </p>
            <div ref={btnGroupRef} className={styles.heroActions}>
              <Button 
                variant="primary" 
                size="md" 
                href="#challenges"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`.${styles.firstSection}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Challenges
              </Button>
              <Button 
                variant="outline" 
                size="md" 
                href="#newsletter"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`.${styles.signupCard}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Join Movement
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Image 
            src="/images/youth-hero.png"
            alt="Youth environmental leaders showcase"
            fill
            sizes="(max-width: 992px) 100vw, 50vw"
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Challenges Section */}
      <section className={`${styles.section} ${styles.firstSection}`}>

        <div className={styles.container}>
          <div ref={challengesHeaderRef} className={styles.header}>
            <span className={styles.subtitle}>Take Action</span>
            <h2 className={styles.title}>Youth Environmental Challenges</h2>
          </div>
          
          <div ref={challengesGridRef} className={styles.grid}>
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tools Section */}
      <section className={styles.sectionGreen}>
        <div className={styles.container}>
          <div ref={toolsHeaderRef} className={styles.header}>
            <span className={styles.subtitle}>Interactive Learning</span>
            <h2 className={styles.title}>Games & Tools</h2>
          </div>

          <div ref={toolsGridRef} className={styles.toolsGrid}>
            {learningTools.map((tool) => (
              <div key={tool.id} className={styles.toolCard}>
                <div className={styles.toolIconWrapper}>
                  {renderToolIcon(tool.iconName)}
                </div>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDesc}>{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Journey Signup Form Section */}
      <section className={styles.signupSection}>
        <div className={styles.container}>
          <div ref={signupCardRef} className={styles.signupContainer}>
            
            {/* Left Image Side */}
            <div className={styles.signupImageSide}>
              <Image 
                src="/images/youth-hero.png" /* reusing youth-hero or we can use another image */
                alt="Youth planting trees"
                fill
                className={styles.signupImage}
              />
            </div>

            {/* Right Form Side */}
            <div className={styles.signupCard}>
              <h2 className={styles.signupTitle}>Start Your Journey</h2>
              <p className={styles.signupDesc}>
                Enroll in the Heroes of the Earth Youth Program to track your XP, earn badges, and gain access to exclusive missions.
              </p>

              {submitted ? (
                <div className={styles.successMsg}>
                  🎉 Welcome to the team! We have sent a confirmation email to start your environmental training.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-sage)' }} />
                      <input
                        type="text"
                        id="name"
                        className={styles.input}
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-sage)' }} />
                      <input
                        type="email"
                        id="email"
                        className={styles.input}
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="age" className={styles.label}>Age Group</label>
                    <div style={{ position: 'relative' }}>
                      <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-sage)' }} />
                      <select
                        id="age"
                        className={styles.input}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ paddingLeft: '2.5rem', appearance: 'none', backgroundColor: 'var(--color-white)' }}
                        required
                      >
                        <option value="" disabled>Select your age group</option>
                        <option value="6-9">6 - 9 years old</option>
                        <option value="10-14">10 - 14 years old</option>
                        <option value="15-18">15 - 18 years old</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: 'var(--space-md)', justifyContent: 'center' }}
                  >
                    {isSubmitting ? 'Enrolling...' : 'Join as a Youth Hero'}
                    <Send size={16} style={{ marginLeft: '8px' }} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
