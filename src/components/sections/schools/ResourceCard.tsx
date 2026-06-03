'use client';

import React from 'react';
import { FileText, BookOpen, HelpCircle, CheckSquare, Palette, Download, Image as ImageIcon, Award } from 'lucide-react';
import { Resource } from '@/data/resources';
import styles from './ResourceCard.module.css';

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export default function ResourceCard({ resource, className = '' }: ResourceCardProps) {
  // Map string iconName to Lucide components
  const renderIcon = () => {
    switch (resource.iconName) {
      case 'FileText': return <FileText size={24} />;
      case 'BookOpen': return <BookOpen size={24} />;
      case 'HelpCircle': return <HelpCircle size={24} />;
      case 'CheckSquare': return <CheckSquare size={24} />;
      case 'Palette': return <Palette size={24} />;
      case 'Image': return <ImageIcon size={24} />;
      case 'Award': return <Award size={24} />;
      default: return <Download size={24} />;
    }
  };

  // Map type to badge styles and label
  const getBadgeDetails = () => {
    switch (resource.type) {
      case 'lesson-plan':
        return { label: 'Lesson Plan', style: styles.badgeLessonPlan };
      case 'guide':
        return { label: 'Guide Book', style: styles.badgeGuide };
      case 'worksheet':
        return { label: 'Worksheet', style: styles.badgeWorksheet };
      case 'poster':
        return { label: 'Classroom Poster', style: styles.badgePoster };
      case 'quiz':
        return { label: 'Quiz Set', style: styles.badgeQuiz };
      default:
        return { label: 'Resource', style: '' };
    }
  };

  const { label, style } = getBadgeDetails();

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.top}>
        <div className={styles.iconWrapper}>
          {renderIcon()}
        </div>

        <h3 className={styles.title}>{resource.title}</h3>
        <p className={styles.desc}>{resource.description}</p>
      </div>

      <a href={resource.downloadUrl} className={styles.downloadLink}>
        <Download size={16} />
        <span>Download PDF</span>
      </a>
    </div>
  );
}
