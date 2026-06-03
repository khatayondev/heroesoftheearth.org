'use client';

import React from 'react';
import Link from 'next/link';
import './PromoBanner.css';

export default function PromoBanner() {
  return (
    <section className="promo-banner-section">
      <div className="container">
        <div className="promo-card" style={{ backgroundColor: '#2C5A47' }}>
          
          <div className="promo-content">
            <h2>Heroes of the Earth, <br/><span className="highlight">your partner</span> in environmental education.</h2>
            <p>Empowering children and youth with stories and action to protect our oceans, climate, and ecosystems.</p>
            
            <div className="promo-buttons">
              <Link href="/books" className="btn btn-white-solid">
                Explore Our Books
              </Link>
              <Link href="/contact" className="btn btn-white-outline">
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="promo-image-wrapper">
            <div className="promo-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
            <img 
              src="/images/hero-bg.png" 
              alt="Heroes of the Earth — Empowering Youth" 
              className="promo-bottles"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
