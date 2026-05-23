'use client';

import React from 'react';
import Image from 'next/image';
import { Book } from '@/types';
import Button from '@/components/ui/Button';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  onDetailClick: (book: Book) => void;
}

export default function BookCard({ book, onDetailClick }: BookCardProps) {
  const isComing = (book as any).comingSoon;

  return (
    <div className={`${styles.cardContainer} book-card-trigger`}>
      <div className={styles.card}>
        {/* Cover Image */}
        <div className={styles.imageContainer}>
          <Image
            src={book.coverImage}
            alt={`${book.title} Cover`}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            priority
            className={styles.image}
          />
          <div className={styles.badgeContainer}>
            <span className={`${styles.priceBadge} ${isComing ? styles.comingSoon : ''}`}>
              {book.price}
            </span>
          </div>
        </div>

        {/* Info Column */}
        <div className={styles.info}>
          <div className={styles.titleGroup}>
            <span className={styles.subtitle}>{book.subtitle}</span>
            <h3 className={styles.title}>{book.title}</h3>
            
            {/* Languages */}
            <div className={styles.languages}>
              {(book as any).languages?.map((lang: string) => (
                <span key={lang} className={styles.langBadge}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <p className={styles.desc}>{book.description}</p>

          <div className={styles.buttons}>
            {!isComing && (
              <Button 
                variant="primary" 
                size="md" 
                href={book.purchaseLink || '#'}
                className={styles.buyBtn}
              >
                Buy Book
              </Button>
            )}
            <Button 
              variant="outline" 
              size="md" 
              onClick={() => onDetailClick(book)}
              className={styles.aboutBtn}
            >
              About Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
