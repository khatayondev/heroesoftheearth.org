export interface NavItem {
  href: string;
  label: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  price: string;
  coverImage: string;
  purchaseLink?: string;
  sampleLink?: string;
  comingSoon?: boolean;
  languages?: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'lesson-plan' | 'worksheet' | 'guide' | 'poster' | 'quiz';
  downloadUrl: string;
  icon: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'challenge' | 'mission' | 'task';
}

export interface LearningTool {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'activity' | 'certificate' | 'mission';
  downloadUrl?: string;
  icon: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  type: 'workshop' | 'event' | 'program' | 'campaign';
  icon: string;
}
