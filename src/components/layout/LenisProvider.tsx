'use client';

import React, { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins client-side at root provider
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface LenisProviderProps {
  children: React.ReactNode;
}

// Scroll to top helper that triggers on pathname changes
function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Integrate Lenis smooth scrolling with GSAP ticker
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // Expose lenis globally for same-page menu items
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    // Use GSAP to drive Lenis' raf loop
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      }}
    >
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
