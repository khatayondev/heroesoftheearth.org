'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const curtain = curtainRef.current;
    const logo = logoRef.current;

    if (curtain) {
      // Create GSAP Timeline for the entrance / exit sweep
      const tl = gsap.timeline();
      
      gsap.killTweensOf(curtain);
      gsap.killTweensOf(logo);

      // Start fully visible (0%) and animate upwards to reveal page (-100%)
      tl.set(curtain, { display: 'flex', yPercent: 0 })
        .set(logo, { opacity: 1, y: 0 })
        .to(logo, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: 'power2.in',
          delay: 0.05,
        })
        .to(curtain, {
          yPercent: -100,
          duration: 0.45,
          ease: 'power3.inOut',
          onComplete: () => {
            // Hide it completely after animation completes so it never blocks clicks!
            gsap.set(curtain, { display: 'none' });
          }
        }, '-=0.1');
    }
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      id="transition-curtain"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--color-dark)', // premium charcoal-forest background
        zIndex: 99999, // stays on top of everything!
        pointerEvents: 'none', // lets user click through during normal interactions
        display: 'none', // START AS DISPLAY: NONE (100% SAFE!)
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={logoRef}
        className="transition-logo"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.25rem',
          fontWeight: 800,
          color: 'var(--color-sand)', // soft cream ivory lettering
          letterSpacing: '-1px',
          opacity: 0,
        }}
      >
        Heroes of the Earth
      </div>
    </div>
  );
}
