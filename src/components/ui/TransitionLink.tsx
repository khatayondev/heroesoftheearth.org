'use client';

import React from 'react';
import Link from 'next/link';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
}

export default function TransitionLink({
  href,
  children,
  className = '',
  onClick,
  style,
}: TransitionLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    const targetPath = href.split('#')[0];
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      // If we are already on the target path, smoothly scroll to top
      if (targetPath === currentPath) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { duration: 0.8 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} style={style}>
      {children}
    </Link>
  );
}

