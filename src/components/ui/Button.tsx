import React from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  onClick,
  icon,
  type = 'button',
  style,
  disabled = false,
}: ButtonProps) {
  const combinedClass = `${styles.btn} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ''} ${className}`.trim();

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <TransitionLink href={href} className={combinedClass} onClick={onClick as any} style={style}>
        {content}
      </TransitionLink>
    );
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick as any} style={style} disabled={disabled}>
      {content}
    </button>
  );
}
