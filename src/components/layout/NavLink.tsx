import React from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export default function NavLink({
  href,
  children,
  className = '',
  activeClassName = 'active',
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();

  // Highlight exact match for home page, startsWith for secondary pages
  const isActive = href === '/' 
    ? pathname === '/' 
    : pathname.startsWith(href);

  const combinedClassName = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <TransitionLink href={href} className={combinedClassName} onClick={onClick}>
      {children}
    </TransitionLink>
  );
}
