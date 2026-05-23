import React from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import { Mail } from 'lucide-react';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import { navItems } from '@/data/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Dynamic Wave Divider */}
      <div className={styles.waveContainer}>
        <svg 
          className={styles.wave} 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>

      <div className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {/* About Column */}
            <div className={styles.aboutCol}>
              <h3 className={styles.brand}>Heroes of the Earth</h3>
              <p className={styles.tagline}>Inspiring action through stories.</p>
              <p className={styles.aboutText}>
                Heroes of the Earth is a youth-focused environmental education initiative. 
                We inspire children and young people to understand and take action on ocean 
                conservation, climate change, and sustainability through storytelling and 
                interactive learning in multiple languages.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Quick Links</h4>
              <nav className={styles.links}>
                {navItems.map((item) => (
                  <TransitionLink 
                    key={item.href} 
                    href={item.href} 
                    className={styles.footerLink}
                  >
                    {item.label}
                  </TransitionLink>
                ))}
              </nav>
            </div>

            {/* Connect Column */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Connect</h4>
              <p className={styles.aboutText} style={{ marginBottom: '1rem' }}>
                Join our community and help us make a lasting impact on our planet's future.
              </p>
              <div className={styles.socials}>
                <a 
                  href="mailto:contact@heroesoftheearth.org" 
                  className={styles.socialIcon}
                  aria-label="Email Us"
                >
                  <Mail size={20} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            <p className={styles.copy}>
              &copy; {new Date().getFullYear()} Heroes of the Earth. All rights reserved.
            </p>
            <p className={styles.bottomMotto}>
              Heroes of the Earth — Empowering young voices for a sustainable future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
