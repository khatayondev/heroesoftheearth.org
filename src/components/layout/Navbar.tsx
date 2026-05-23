'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { navItems } from '@/data/navigation';
import NavLink from './NavLink';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

// Register GSAP plugins client-side before render
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Add simple scroll event listener to complement ScrollTrigger for immediate styles
  useEffect(() => {
    
    // Add simple scroll event listener to complement ScrollTrigger for immediate styles
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // ScrollTrigger to shrink header
    ScrollTrigger.create({
      start: 'top -50',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });
  }, { scope: headerRef });

  useGSAP(() => {
    if (isMenuOpen) {
      // Open mobile menu animation
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, visibility: 'hidden' },
        { opacity: 1, visibility: 'visible', duration: 0.3, ease: 'power2.out' }
      );
      // Stagger nav links slide up
      gsap.fromTo(
        `.${styles.mobileLink}`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, delay: 0.15, ease: 'back.out(1.5)' }
      );
    } else {
      // Close mobile menu animation
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { visibility: 'hidden' });
        },
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef} 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.container}>
        {/* Brand/Logo */}
        <TransitionLink href="/" className={styles.brand} onClick={closeMenu}>
          <Image 
            src="/images/logo.png" 
            alt="Heroes of the Earth Logo" 
            width={40} 
            height={40}
            priority
          />
          <span className={styles.brandText}>Heroes of the Earth</span>
        </TransitionLink>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <NavLink 
                key={item.href} 
                href={item.href} 
                className={styles.link}
                activeClassName={styles.active}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <Button 
            variant="primary" 
            size="sm" 
            href="/contact"
          >
            Partner with Us
          </Button>
        </nav>

        {/* Hamburger Icon for Mobile */}
        <button 
          className={styles.mobileToggle} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Fullscreen Menu */}
        <div 
          ref={mobileMenuRef} 
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
          data-lenis-prevent
        >
          <div className={styles.mobileLinks}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                activeClassName={styles.mobileActive}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <Button 
              variant="primary" 
              size="lg" 
              href="/contact"
              onClick={closeMenu}
              style={{ marginTop: '2rem' }}
            >
              Partner with Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
