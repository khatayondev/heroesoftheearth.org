'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { books } from '@/data/books';
import { Book } from '@/types';
import BookCard from '@/components/sections/books/BookCard';
import BookDetailModal from '@/components/sections/books/BookDetailModal';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
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
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(subtitleRef.current, {
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

    // Staggered reveal of book cards in the catalog on scroll
    gsap.to('.book-card-trigger', {
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
  }, { scope: containerRef });

  const handleOpenDetail = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Scroll to catalog section helper
  const scrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.querySelector(`.${styles.catalogSection}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className={styles.booksPage}>
      {/* Premium Minimalist Hero */}
      <section className={styles.hero}>
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.badgeHighlight}>Storybooks</span>
          <span>6+ Active Titles</span>
        </div>

        <h1 ref={titleRef} className={styles.title}>
          Discover Our Exciting Books
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          Showcase educational books and resources that teach children about oceans, climate, and sustainability.
        </p>

        <div ref={btnGroupRef} className={styles.btnGroup}>
          <Button 
            variant="primary" 
            size="md" 
            href="#catalog"
            onClick={scrollToCatalog}
          >
            Explore Catalog
          </Button>
          <Button 
            variant="outline" 
            size="md" 
            href="/contact"
          >
            Partner with Us
          </Button>
        </div>

        {/* 3D Overlapping Book Cover Stack floating below */}
        <div ref={floatingRef} className={styles.floatingContainer}>
          <div className={styles.floatingCard}>
            <div className={styles.bookStack}>
              <div className={styles.bookFrameLeft}>
                <Image 
                  src="/images/book-waves-of-change.png"
                  alt="Waves of Change Book Cover"
                  fill
                  sizes="180px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.bookFrameRight}>
                <Image 
                  src="/images/book-afrika.png"
                  alt="Afrika Our Amazing Planet Book Cover"
                  fill
                  sizes="180px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className={styles.catalogSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {books.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onDetailClick={handleOpenDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Book Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
