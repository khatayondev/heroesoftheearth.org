'use client';

import React, { useState } from 'react';
import { books } from '@/data/books';
import { Book } from '@/types';
import BookCard from '@/components/sections/books/BookCard';
import BookDetailModal from '@/components/sections/books/BookDetailModal';
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
      <div className={styles.container}>
        {/* Simple Header */}
        <div className={styles.header}>
          <div className={styles.accentLine}></div>
          <h1 className={styles.title}>Discover Our Exciting Books</h1>
          <p className={styles.subtitle}>
            Showcase educational books and resources that teach children about oceans, climate, and sustainability.
          </p>
        </div>

        {/* Books Grid */}
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

      {/* Detailed Book Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
