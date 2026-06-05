'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { books } from '@/data/books';
import { Book } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import styles from './BooksPreview.module.css';

export default function BooksPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // Staggered reveal of book cards on scroll
    gsap.to(`.${styles.cardContainer}`, {
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

  const handleOpenModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Discover Our Exciting Books</h2>
          <p className={styles.sectionDesc} style={{ 
            maxWidth: '650px', 
            margin: '1.2rem auto 0 auto', 
            color: 'var(--color-text-light)', 
            fontSize: '1.1rem', 
            lineHeight: '1.6' 
          }}>
            Our books combine storytelling with hands-on learning to make environmental education fun, accessible, and impactful.
          </p>
        </div>

        <div className={styles.grid}>
          {books.map((book) => {
            const isComing = (book as any).comingSoon;
            return (
              <div key={book.id} className={styles.cardContainer}>
                <div className={styles.card}>
                  {/* Cover Column */}
                  <div className={styles.imageCol}>
                    <Image
                       src={book.coverImage}
                       alt={`${book.title} Cover`}
                       fill
                       sizes="(max-width: 576px) 100vw, 200px"
                       className={styles.image}
                    />
                  </div>

                  {/* Info Column */}
                  <div className={styles.infoCol}>
                    <div>
                      <h3 className={styles.bookTitle}>{book.title}</h3>
                      <div className={styles.bookSubtitle}>{book.subtitle}</div>
                      
                      <p className={styles.bookDesc}>{book.description}</p>
                    </div>

                    <div className={styles.actions}>
                      {!isComing && (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          href={book.purchaseLink || '#'}
                        >
                          Buy Now
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleOpenModal(book)}
                      >
                        About Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.viewMoreRow}>
          <Button variant="secondary" size="lg" href="/books">
            View more books &rarr;
          </Button>
        </div>
      </div>

      {/* Book Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedBook?.title || 'Book Details'}
      >
        {selectedBook && (
          <div>
            <div className={styles.modalMeta}>
              <span className={styles.bookSubtitle}>{selectedBook.subtitle}</span>
              <span 
                className={`${styles.priceBadge} ${(selectedBook as any).comingSoon ? styles.priceComingSoon : ''}`}
              >
                {selectedBook.price}
              </span>
            </div>
            
            <h4 className={styles.modalBodyTitle}>About this adventure</h4>
            <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {selectedBook.fullDescription}
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              {!(selectedBook as any).comingSoon && (
                <Button variant="primary" size="md" href={selectedBook.purchaseLink || '#'}>
                  Purchase Copy
                </Button>
              )}
              {selectedBook.sampleLink && (
                <Button variant="outline" size="md" href={selectedBook.sampleLink}>
                  Download Free Sample
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
