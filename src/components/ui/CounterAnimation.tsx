'use client';

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CounterAnimation.module.css';

interface CounterAnimationProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CounterAnimation({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}: CounterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    if (!numberRef.current) return;

    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: target,
      duration: duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.round(obj.value).toString();
        }
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`${styles.counterContainer} ${className}`}>
      <span className={styles.number}>
        {prefix}
        <span ref={numberRef}>0</span>
        {suffix}
      </span>
    </div>
  );
}
