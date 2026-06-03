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
        <div className={styles.imageWrapper} onClick={() => onDetailClick(book)}>
          <Image
            src={book.coverImage}
            alt={`${book.title} Cover`}
            width={240}
            height={340}
            priority
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.titleRow} onClick={() => onDetailClick(book)}>
            <h3 className={styles.title}>{book.title}</h3>
            <span className={styles.subtitle}>{book.subtitle}</span>
          </div>

          <span className={`${styles.price} ${isComing ? styles.comingSoonBadge : ''}`}>
            {book.price}
          </span>
          
          <p className={styles.description}>{book.description}</p>
          
          <div className={styles.actions}>
            {!isComing ? (
              <Button 
                variant="primary" 
                size="sm" 
                href={book.purchaseLink || '#'}
                className={styles.buyBtn}
              >
                Buy Book
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="sm" 
                href="/contact"
                className={`${styles.buyBtn} ${styles.comingSoonBtn}`}
              >
                Coming Soon
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
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
