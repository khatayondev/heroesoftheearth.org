'use client';

import React from 'react';
import './rural_impact.css';

export default function RuralImpactCards({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const sectionClass = `rural-impact-section ${theme === 'light' ? 'light-theme' : ''}`;
  
  return (
    <section className={sectionClass}>
      <div className="container">
        <div className="rural-impact-grid">
          
          {/* CARD 1 */}
          <div className="impact-card white-card">

            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </div>
            <h3>Transforming Environmental Education Through Interactive Storytelling</h3>
            
            <div className="card-img-container">
              <img 
                src="https://res.cloudinary.com/doysykrko/image/upload/v1779880795/IMG_8513_ptn0eq.jpg" 
                alt="Who We Are" 
              />
            </div>
          </div>

          {/* CARD 2 (Middle Abstract Card) */}
          <div className="impact-card vibrant-card">
            <div className="abstract-img-container">
              <img 
                src="https://res.cloudinary.com/doysykrko/image/upload/v1779888956/IMG_8602_hh4uks.jpg" 
                alt="Impact Track Record" 
                className="abstract-cutout-img"
              />
            </div>
            

            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </div>
            <h3>Thousands of Youth Engaged in Climate Action Worldwide</h3>
          </div>

          {/* CARD 3 */}
          <div className="impact-card white-card">

            <div className="card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </div>
            <h3>Prioritizing Local Cleanups, Education &amp; Conservation</h3>
            
            <div className="card-img-container">
              <img 
                src="https://res.cloudinary.com/doysykrko/image/upload/v1736651023/volunteers-filling-up-holes-after-planting-trees-a-2024-10-16-17-31-12-utc_50_2_85_ewz8wq.jpg" 
                alt="Climate Action" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
