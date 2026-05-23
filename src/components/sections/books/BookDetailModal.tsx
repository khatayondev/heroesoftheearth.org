'use client';

import React from 'react';
import { Book } from '@/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Download, ShoppingBag, Globe, Info } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailModal({ book, isOpen, onClose }: BookDetailModalProps) {
  if (!book) return null;
  const isComing = (book as any).comingSoon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={book.title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {/* Subtitle & Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
          <span style={{ 
            fontSize: '0.9rem', 
            fontWeight: 700, 
            color: 'var(--color-sage)', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {book.subtitle}
          </span>
          <span style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: isComing ? 'var(--color-coral)' : 'var(--color-ocean-deep)',
            backgroundColor: isComing ? 'rgba(231,111,81,0.1)' : 'rgba(0,119,182,0.1)',
            padding: '0.3rem 0.8rem',
            borderRadius: 'var(--radius-full)'
          }}>
            {book.price}
          </span>
        </div>

        {/* Languages section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
          <Globe size={16} />
          <span>Available Languages: </span>
          <div style={{ display: 'inline-flex', gap: '4px' }}>
            {(book as any).languages?.map((lang: string) => (
              <span key={lang} style={{ 
                fontSize: '0.8rem', 
                backgroundColor: 'rgba(0, 119, 182, 0.05)', 
                color: 'var(--color-ocean-deep)', 
                padding: '0.1rem 0.4rem', 
                borderRadius: '4px',
                fontWeight: 600
              }}>
                {lang}
              </span>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(0, 119, 182, 0.1)', margin: 'var(--space-sm) 0' }} />

        {/* Full description */}
        <div>
          <h4 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '1.25rem', 
            fontWeight: 800, 
            color: 'var(--color-dark)', 
            marginBottom: 'var(--space-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Info size={18} style={{ color: 'var(--color-ocean)' }} />
            Book Overview
          </h4>
          <p style={{ 
            color: 'var(--color-text)', 
            fontSize: '1.05rem', 
            lineHeight: '1.7', 
            margin: 0 
          }}>
            {book.fullDescription}
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(0, 119, 182, 0.1)', margin: 'var(--space-sm) 0' }} />

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-sm)' }}>
          {!isComing && (
            <Button 
              variant="primary" 
              size="md" 
              href={book.purchaseLink || '#'} 
              icon={<ShoppingBag size={18} />}
            >
              Buy Book
            </Button>
          )}
          {book.sampleLink && (
            <Button 
              variant="outline" 
              size="md" 
              href={book.sampleLink} 
              icon={<Download size={18} />}
            >
              Download Sample (PDF)
            </Button>
          )}
          {isComing && (
            <Button 
              variant="primary" 
              size="md" 
              href="/contact"
              icon={<Info size={18} />}
            >
              Notify Me on Release
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
