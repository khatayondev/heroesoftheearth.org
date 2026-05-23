'use client';

import React, { useRef, useState } from 'react';
import { Video, Award, MessageSquare, Flame, ArrowLeft, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './ProgramsEvents.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Program {
  title: string;
  category: string;
  description: string;
  date: string;
  image: string;
  iconName: 'video' | 'award' | 'message' | 'flame';
}

export default function ProgramsEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const isTransitioning = useRef(false);

  const programs: Program[] = [
    {
      title: 'Ocean Literacy Workshop',
      category: 'Virtual',
      description: 'Engaging virtual workshops introducing ocean conservation and marine ecosystems to school classrooms worldwide.',
      date: 'Monthly Sessions',
      image: '/images/hero-sea-bg.png',
      iconName: 'video',
    },
    {
      title: 'Climate Action Challenge',
      category: 'Campaign',
      description: 'Annual youth campaign offering school grants for local carbon reduction and community recycling programs.',
      date: 'Starts Oct 2026',
      image: '/images/schools-hero.png',
      iconName: 'award',
    },
    {
      title: 'Community Storytelling',
      category: 'In-Person',
      description: 'In-person events bringing diverse authors and indigenous speakers together for children storytelling.',
      date: 'Summer Tour',
      image: '/images/youth-hero.png',
      iconName: 'message',
    },
    {
      title: 'Earth Heroes Summit',
      category: 'Summit',
      description: 'Our flagship annual youth summit gathering young environmental activists for interactive workshops and panels.',
      date: 'Nov 14, 2026',
      image: '/images/hero-bg.png',
      iconName: 'flame',
    },
  ];

  // Map iconName to Lucide component
  const getIcon = (name: string, size = 20) => {
    switch (name) {
      case 'video':
        return <Video size={size} />;
      case 'award':
        return <Award size={size} />;
      case 'message':
        return <MessageSquare size={size} />;
      case 'flame':
        return <Flame size={size} />;
      default:
        return <Video size={size} />;
    }
  };

  // Scroll entrance animation
  useGSAP(() => {
    gsap.from(`.${styles.splitGrid}`, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  const handleNav = (nextIndex: number) => {
    if (isTransitioning.current || nextIndex === activeIndex) return;
    isTransitioning.current = true;

    // Determine direction
    const isForward = activeIndex === 3 && nextIndex === 0 
      ? true 
      : activeIndex === 0 && nextIndex === 3 
        ? false 
        : nextIndex > activeIndex;

    const yOut = isForward ? -25 : 25;
    const yIn = isForward ? 25 : -25;

    const targets = textRef.current?.querySelectorAll(`.${styles.animateText}`);
    
    if (targets && targets.length > 0) {
      gsap.timeline({
        onComplete: () => {
          setDisplayedIndex(nextIndex);
          setActiveIndex(nextIndex);
          
          // Reset starting position for entry
          gsap.set(targets, { y: yIn, opacity: 0 });
          
          // Animate in
          gsap.to(targets, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.45,
            ease: 'power3.out',
            onComplete: () => {
              isTransitioning.current = false;
            }
          });
        }
      })
      .to(targets, {
        y: yOut,
        opacity: 0,
        stagger: 0.03,
        duration: 0.25,
        ease: 'power3.in'
      });
    } else {
      setActiveIndex(nextIndex);
      setDisplayedIndex(nextIndex);
      isTransitioning.current = false;
    }
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? programs.length - 1 : activeIndex - 1;
    handleNav(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === programs.length - 1 ? 0 : activeIndex + 1;
    handleNav(nextIndex);
  };

  return (
    <section ref={containerRef} className={styles.section} id="programs">
      <div className={styles.container}>
        <div className={styles.splitGrid}>
          {/* Left Column: Copywriting & Navigation */}
          <div ref={textRef} className={styles.textCol}>
            <h2 className={`${styles.title} ${styles.animateText}`}>
              {programs[displayedIndex].title}
            </h2>
            
            <p className={`${styles.leadText} ${styles.animateText}`}>
              {programs[displayedIndex].description}
            </p>

            <div className={`${styles.metaInfo} ${styles.animateText}`}>
              <span className={styles.metaLabel}>SCHEDULE:</span>
              <span className={styles.metaValue}>{programs[displayedIndex].date}</span>
            </div>

            <div className={`${styles.btnWrapper} ${styles.animateText}`}>
              <button className={styles.ctaBtn}>
                Register Interest &rarr;
              </button>
            </div>

            {/* Premium Navigation Controls */}
            <div className={styles.navControls}>
              {/* Numbered Dots */}
              <div className={styles.numDots}>
                {programs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNav(idx)}
                    className={`${styles.dotBtn} ${idx === activeIndex ? styles.dotActive : ''}`}
                  >
                    <span className={styles.dotNum}>0{idx + 1}</span>
                    <span className={styles.dotLine} />
                  </button>
                ))}
              </div>

              {/* Arrow Triggers */}
              <div className={styles.arrowTriggers}>
                <button onClick={handlePrev} className={styles.arrowBtn} aria-label="Previous Program">
                  <ArrowLeft size={20} />
                </button>
                <button onClick={handleNext} className={styles.arrowBtn} aria-label="Next Program">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Card Carousel */}
          <div className={styles.carouselContainer}>
            <div
              ref={trackRef}
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${activeIndex * 304}px)` // Card width (280) + Gap (24)
              }}
            >
              {programs.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => handleNav(idx)}
                  className={`${styles.card} ${idx === activeIndex ? styles.activeCard : ''}`}
                  style={{
                    backgroundImage: `url(${p.image})`,
                    opacity: idx === activeIndex ? 1 : idx < activeIndex ? 0.05 : 0.55,
                    pointerEvents: idx < activeIndex ? 'none' : 'auto'
                  }}
                >
                  {/* Card Vignette Overlay */}
                  <div className={styles.cardOverlay} />

                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIconWrapper}>
                        {getIcon(p.iconName, 22)}
                      </div>
                      <span className={styles.cardCategory}>{p.category}</span>
                    </div>

                    <div className={styles.cardBottom}>
                      <h3 className={styles.cardTitle}>{p.title}</h3>
                      <p className={styles.cardDate}>{p.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
