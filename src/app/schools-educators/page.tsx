'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Check, Video, School, ShieldAlert, Award } from 'lucide-react';

import { teachingResources, freeDownloads } from '@/data/resources';
import ResourceCard from '@/components/sections/schools/ResourceCard';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function SchoolsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Staggered reveal of hero components in premium style
    tl.to(badgeRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    })
      .to(heroTitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(heroSubRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.45')
      .to(btnGroupRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.4')
      .to(floatingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
      }, '-=0.35');

    // Staggered reveal of teaching resource cards
    gsap.to('.resource-card-trigger', {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: `.${styles.grid}`,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Staggered slide right for free download list items
    gsap.to('.download-item-trigger', {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: `.${styles.downloadsList}`,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Alternating slides for workshops cards
    const workshopCards = gsap.utils.toArray('.workshop-card-trigger');
    workshopCards.forEach((card: any) => {
      gsap.to(card, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef });


  const workshops = [
    {
      title: 'Virtual Workshops',
      description: 'Engage your students with live, interactive virtual sessions on ocean habitats and plastic waste solutions led by our environmental educators.',
      visual: <Video size={64} />,
      points: [
        'Aligned with regional science curriculums',
        'Includes live Q&A sessions and interactive polls',
        'Available in English, French, and selected Indigenous languages',
      ],
      isOdd: false,
    },
    {
      title: 'In-Person School Visits',
      description: 'Bring environmental concepts to life directly in your classroom through hands-on ecological demonstrations, waste sorting, and local activities.',
      visual: <School size={64} style={{ color: 'var(--color-sage)' }} />,
      points: [
        'Interactive physical classroom visits and demos',
        'Suited for all elementary and middle school grades',
        'Hands-on collaborative projects for students',
      ],
      isOdd: true,
    },
    {
      title: 'Interactive Storytelling Sessions',
      description: 'A magical in-school reading experience bringing environmental concepts to life for younger grades through stories, puppet theater, and music.',
      visual: <Award size={64} style={{ color: 'var(--color-coral)' }} />,
      points: [
        'Best suited for Kindergartens through Grade 3',
        'Features our signature multi-lingual eco-storybooks',
        'Fosters creative reading prompts and discussion groups',
      ],
      isOdd: false,
    },
    {
      title: 'Climate and Ocean Education Programs',
      description: 'Empower your students with curriculum-aligned lessons on climate change, renewable energy, and marine ecosystem conservation.',
      visual: <Video size={64} style={{ color: 'var(--color-ocean)' }} />,
      points: [
        'Curriculum-linked teaching materials and worksheets',
        'Promoting deep appreciation for sustainability',
        'Inclusive content bridging indigenous wisdom and modern science',
      ],
      isOdd: true,
    },
  ];

  return (
    <div ref={containerRef} className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <div className={styles.heroContent}>
            <div className={styles.accentLine}></div>
            <h1 ref={heroTitleRef} className={styles.title}>
              Bring Environmental Education to Your Classroom
            </h1>
            <p ref={heroSubRef} className={styles.subtitle}>
              We provide curriculum-aligned tools to help teachers deliver engaging lessons on oceans, climate change, and sustainability through storytelling, interactive activities, and inclusive learning resources in multiple languages, including French and Indigenous languages, to support accessibility and cultural inclusion.
            </p>
            <div ref={btnGroupRef} className={styles.heroActions}>
              <Button 
                variant="primary" 
                size="md" 
                href="#resources"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`.${styles.firstSection}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Resources
              </Button>
              <Button 
                variant="outline" 
                size="md" 
                href="/contact"
              >
                Request Workshop
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Image 
            src="/images/schools-hero.png"
            alt="Classroom Education Showcase"
            fill
            sizes="(max-width: 992px) 100vw, 50vw"
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Teaching Resources Section */}
      <section className={`${styles.section} ${styles.firstSection}`}>

        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Curriculum Material</span>
            <h2 className={styles.title}>Premium Teaching Resources</h2>
          </div>
          <div className={styles.grid}>
            {teachingResources.map((res) => (
              <div 
                key={res.id} 
                className="resource-card-trigger"
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                <ResourceCard resource={res} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Workshops Section */}
      <section className={styles.sectionSand}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Interactive Programs</span>
            <h2 className={styles.title}>School Visits & Workshops</h2>
          </div>
          <div className={styles.workshopsList}>
            {workshops.map((w, index) => (
              <div 
                key={index} 
                className={`${styles.workshopCard} ${w.isOdd ? styles.workshopCardOdd : ''} workshop-card-trigger`}
                style={{ 
                  opacity: 0, 
                  transform: w.isOdd ? 'translateX(60px)' : 'translateX(-60px)' 
                }}
              >
                {/* Visual block */}
                {!w.isOdd && (
                  <div className={styles.workshopVisual}>
                    {w.visual}
                  </div>
                )}

                {/* Content block */}
                <div className={styles.workshopContent}>
                  <h3 className={styles.workshopTitle}>{w.title}</h3>
                  <p className={styles.workshopDesc}>{w.description}</p>
                  <div className={styles.workshopPoints}>
                    {w.points.map((pt, i) => (
                      <div key={i} className={styles.workshopPoint}>
                        <Check size={16} className={styles.pointIcon} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alternating Visual Block */}
                {w.isOdd && (
                  <div className={styles.workshopVisual} style={{ background: 'var(--color-sand)', border: '1px solid var(--color-sand-dark)' }}>
                    {w.visual}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Downloads Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Resource Library</span>
            <h2 className={styles.title}>Free Classroom Downloads</h2>
          </div>
          
          <div className={styles.downloadsList}>
            {freeDownloads.map((res) => (
              <div 
                key={res.id} 
                className={`${styles.downloadItem} download-item-trigger`}
                style={{ transform: 'translateX(-30px)', opacity: 0 }}
              >
                <div className={styles.downloadInfo}>
                  <div className={styles.downloadIcon}>
                    <Download size={20} />
                  </div>
                  <div>
                    <h3 className={styles.downloadTitle}>{res.title}</h3>
                    <p className={styles.downloadDesc}>{res.description}</p>
                  </div>
                </div>
                <a 
                  href={res.downloadUrl} 
                  className={styles.downloadBtn}
                  aria-label={`Download ${res.title}`}
                >
                  <Download size={18} />
                </a>
              </div>
            ))}
          </div>

          {/* School Contact CTA */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Schedule a Program for Your School</h3>
            <p className={styles.ctaText}>
              Ready to inspire your students? Contact our educational outreach team to coordinate virtual or in-person workshop schedules.
            </p>
            <Button variant="secondary" size="lg" href="/contact">
              Request Workshop
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
