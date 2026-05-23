'use client';

import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  // Esc key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useGSAP(() => {
    // Avoid running on initial mount if closed
    if (!isMounted.current) {
      isMounted.current = true;
      if (!isOpen) {
        gsap.set(overlayRef.current, { opacity: 0, visibility: 'hidden' });
        gsap.set(modalRef.current, { scale: 0.9, y: 20 });
        return;
      }
    }

    if (isOpen) {
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';

      // Entrance animation
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.25,
        ease: 'power2.out',
      }).to(
        modalRef.current,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'back.out(1.4)',
        },
        '-=0.1'
      );
    } else {
      // Restore body scrolling
      document.body.style.overflow = '';

      // Exit animation
      const tl = gsap.timeline();
      tl.to(modalRef.current, {
        scale: 0.9,
        y: 15,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(overlayRef.current, { visibility: 'hidden' });
          },
        },
        '-=0.15'
      );
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div 
      ref={overlayRef} 
      className={styles.overlay} 
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        ref={modalRef} 
        className={styles.modal}
        data-lenis-prevent
      >
        <div className={styles.header}>
          {title ? <h3 className={styles.title}>{title}</h3> : <div></div>}
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
}
