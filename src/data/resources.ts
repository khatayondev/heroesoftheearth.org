export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'lesson-plan' | 'worksheet' | 'guide' | 'poster' | 'quiz';
  downloadUrl: string;
  iconName: string;
}

export const teachingResources: Resource[] = [
  {
    id: 'lesson-plans',
    title: 'Lesson Plans (PDF)',
    description: 'Curriculum-aligned lesson plans for teaching oceans, climate change, and sustainability.',
    type: 'lesson-plan',
    downloadUrl: '#',
    iconName: 'FileText',
  },
  {
    id: 'worksheets',
    title: 'Worksheets (PDF)',
    description: 'Interactive worksheets and activities in multiple languages, including French and Indigenous languages.',
    type: 'worksheet',
    downloadUrl: '#',
    iconName: 'CheckSquare',
  },
  {
    id: 'teacher-guides',
    title: 'Teacher Guides (PDF)',
    description: 'Comprehensive guides to help educators deliver inclusive and engaging environmental lessons.',
    type: 'guide',
    downloadUrl: '#',
    iconName: 'BookOpen',
  },
];

export const freeDownloads: Resource[] = [
  {
    id: 'plastic-free-worksheet',
    title: 'Plastic-Free Challenge Worksheet (PDF)',
    description: 'Instantly downloadable tracker for students to log plastic reduction activities.',
    type: 'worksheet',
    downloadUrl: '#',
    iconName: 'CheckSquare',
  },
  {
    id: 'ocean-pollution-activity',
    title: 'Ocean Pollution Activity Sheet (PDF)',
    description: 'Instantly downloadable activity sheet to understand marine conservation.',
    type: 'worksheet',
    downloadUrl: '#',
    iconName: 'Palette',
  },
  {
    id: 'climate-basics-guide',
    title: 'Climate Basics Guide (PDF)',
    description: 'Instantly downloadable guide summarizing key climate concepts.',
    type: 'guide',
    downloadUrl: '#',
    iconName: 'Download',
  },
  {
    id: 'classroom-poster',
    title: 'Hero of the Earth Classroom Poster (PDF)',
    description: 'Instantly downloadable classroom poster for environmental education.',
    type: 'poster',
    downloadUrl: '#',
    iconName: 'Image',
  },
  {
    id: 'env-quiz-pack',
    title: 'Environmental Quiz Pack (PDF)',
    description: 'Instantly downloadable trivia quizzes about global sustainability.',
    type: 'quiz',
    downloadUrl: '#',
    iconName: 'Award',
  },
];
