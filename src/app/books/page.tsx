'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { books } from '@/data/books';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function BooksPage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToBook = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.booksPage}>
      {/* Split Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <div className={styles.heroContent}>
            <div className={styles.accentLine}></div>
            <h1 className={styles.title}>Discover Our<br/>Exciting Books</h1>
            <p className={styles.heroSubtitle}>
              Showcase educational books and resources that teach children about oceans, climate, and sustainability.
            </p>
            <div className={styles.heroActions}>
              <Button href="#book-0" variant="primary">Browse Catalog</Button>
              <Button href="/about" variant="outline">About Our Mission</Button>
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <Image 
            src="/images/hero-sea-bg.png" 
            alt="Educational Books Inspiration" 
            fill 
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Gestalten-style Book Detail Sections */}
      {books.map((book, index) => (
        <section
          key={book.id}
          id={`book-${index}`}
          ref={(el) => { sectionRefs.current[index] = el; }}
          className={styles.bookSection}
        >
          {/* Top border line */}
          <div className={styles.bookSectionBorder}></div>

          <div className={styles.bookLayout}>
            {/* Left: Cover Image */}
            <div className={styles.coverColumn}>
              <div className={styles.coverBg}>
                <div className={styles.coverMockup}>
                  <div className={styles.mockupSpine}></div>
                </div>
              </div>
              <p className={styles.coverHint}>CLICK FOR PREVIEW</p>
            </div>

            {/* Center: Book Details */}
            <div className={styles.detailColumn}>
              <h2 className={styles.bookTitle}>{book.title}</h2>
              <p className={styles.bookAuthor}>by <span>HEROES OF THE EARTH</span></p>

              <p className={styles.bookDescription}>{book.description}</p>
              <p className={styles.bookFullDescription}>{book.fullDescription}</p>

              {/* Metadata Grid */}
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Price</span>
                  <span className={styles.metaValue}>{book.price}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Age Group</span>
                  <span className={styles.metaValue}>6 – 14 years</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Format</span>
                  <span className={styles.metaValue}>Paperback</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Features</span>
                  <span className={styles.metaValue}>Full color, illustrated</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Language</span>
                  <span className={styles.metaValue}>{book.languages?.join(', ')}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Status</span>
                  <span className={styles.metaValue}>{book.comingSoon ? 'Coming Soon' : 'Available'}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={styles.bookActions}>
                {book.purchaseLink && !book.comingSoon && (
                  <Button href={book.purchaseLink} variant="primary">Buy Book</Button>
                )}
                {book.sampleLink && (
                  <a 
                    href={book.sampleLink} 
                    download 
                    className={styles.downloadBtn}
                  >
                    Download Sample (PDF)
                  </a>
                )}
                {book.comingSoon && (
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                )}
              </div>
            </div>

            {/* Right: Sidebar Thumbnails */}
            <div className={styles.sidebarColumn}>
              <span className={styles.sidebarLabel}>EXPLORE BOOKS</span>
              {books.map((thumbBook, thumbIndex) => (
                <button
                  key={thumbBook.id}
                  className={`${styles.sidebarThumb} ${thumbIndex === index ? styles.sidebarThumbActive : ''}`}
                  onClick={() => scrollToBook(thumbIndex)}
                >
                  <div className={styles.thumbMockup}></div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
