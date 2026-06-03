'use client';

import React from 'react';
import { Sparkles, Droplet, Leaf, Clock, Trophy, Flame } from 'lucide-react';
import { Activity } from '@/data/activities';
import styles from './ActivityCard.module.css';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  // Map icons
  const renderIcon = () => {
    switch (activity.iconName) {
      case 'Sparkles': return <Sparkles size={24} />;
      case 'Droplet': return <Droplet size={24} />;
      case 'Leaf': return <Leaf size={24} />;
      default: return <Flame size={24} />;
    }
  };

  // Map difficulty styles
  const getDifficultyClass = () => {
    switch (activity.difficulty) {
      case 'Easy': return styles.easy;
      case 'Medium': return styles.medium;
      case 'Hard': return styles.hard;
      default: return '';
    }
  };

  return (
    <div className={`${styles.cardContainer} activity-card-trigger`} style={{ transform: 'rotateY(90deg)', opacity: 0 }}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.iconWrapper}>
            {renderIcon()}
          </div>
          <div className={styles.points}>
            +{activity.points} XP
          </div>
        </div>

        <h3 className={styles.title}>{activity.title}</h3>
        <p className={styles.desc}>{activity.description}</p>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Clock size={14} className={styles.metaIcon} />
            <span>{activity.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
