'use client';

import React from 'react';
import Image from 'next/image';
import { Book } from '@/types';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  onDetailClick: (book: Book) => void;
}

export default function BookCard({ book, onDetailClick }: BookCardProps) {
  return (
    <div className={`${styles.cardContainer} book-card-trigger`}>
      <div className={styles.card} onClick={() => onDetailClick(book)}>
        <div className={styles.imageWrapper}>
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
          <h3 className={styles.title}>{book.title}</h3>
          <span className={styles.subtitle}>{book.subtitle}</span>
          
          <div className={styles.link}>
            Explore <span className={styles.arrow}>&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
