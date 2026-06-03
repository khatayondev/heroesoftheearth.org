'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { books } from '@/data/books';
import { Book } from '@/types';
import BookCard from '@/components/sections/books/BookCard';
import BookDetailModal from '@/components/sections/books/BookDetailModal';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className={styles.booksPage}>
      {/* Philanthropy-X Style Split Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <div className={styles.heroContent}>
            <div className={styles.accentLine}></div>
            <h1 className={styles.title}>Discover Our<br/>Exciting Books</h1>
            <p className={styles.subtitle}>
              Showcase educational books and resources that teach children about oceans, climate, and sustainability.
            </p>
            <div className={styles.heroActions}>
              <Button href="#catalog" variant="primary">Browse Catalog</Button>
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

      {/* Stats Strip */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h2 className={styles.statNum}>2<span className={styles.statSuffix}>books</span></h2>
            <p className={styles.statLabel}>Currently Available</p>
          </div>
          <div className={styles.statItem}>
            <h2 className={styles.statNum}>6-14<span className={styles.statSuffix}>yrs</span></h2>
            <p className={styles.statLabel}>Target Age Group</p>
          </div>
          <div className={styles.statItem}>
            <h2 className={styles.statNum}>100<span className={styles.statSuffix}>%</span></h2>
            <p className={styles.statLabel}>Educational Content</p>
          </div>
          <div className={styles.statItem}>
            <h2 className={styles.statNum}>50<span className={styles.statSuffix}>+</span></h2>
            <p className={styles.statLabel}>Partner Schools</p>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section (Cream Background) */}
      <section id="catalog" className={styles.catalogSection}>
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
