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
    id: 'ocean-lesson-plan',
    title: 'Ocean Ecosystems Lesson Plan (PDF)',
    description: 'A comprehensive curriculum for grades 3–6 covering coral reefs, food chains, and human impacts on marine biology.',
    type: 'worksheet', // wait, let's make it worksheet/lesson-plan
    downloadUrl: '#',
    iconName: 'FileText',
  },
  {
    id: 'climate-teacher-guide',
    title: 'Climate Change Teacher Guide (PDF)',
    description: 'Classroom discussion guides and experiments that explain the greenhouse effect in a hands-on, relatable way.',
    type: 'guide',
    downloadUrl: '#',
    iconName: 'BookOpen',
  },
  {
    id: 'eco-story-discussion',
    title: 'Storytelling Discussion Kit (PDF)',
    description: 'Companion resource for our books with reading prompts, vocabulary exercises, and group storytelling guides.',
    type: 'guide',
    downloadUrl: '#',
    iconName: 'HelpCircle',
  },
];

export const freeDownloads: Resource[] = [
  {
    id: 'plastic-free-worksheet',
    title: 'Plastic-Free Challenge Worksheet (PDF)',
    description: 'A fun tracker for students to log plastic reduction activities at home and in school for one week.',
    type: 'worksheet',
    downloadUrl: '#',
    iconName: 'CheckSquare',
  },
  {
    id: 'ocean-pollution-activity',
    title: 'Ocean Pollution Activity Sheet (PDF)',
    description: 'Coloring, puzzles, and quizzes that help children understand marine conservation basics in multiple languages.',
    type: 'worksheet',
    downloadUrl: '#',
    iconName: 'Palette',
  },
  {
    id: 'climate-basics-guide',
    title: 'Climate Basics Guide (PDF)',
    description: 'An illustrated 5-page PDF guide summarizing key climate concepts and simple steps families can take.',
    type: 'guide',
    downloadUrl: '#',
    iconName: 'Download',
  },
  {
    id: 'classroom-poster',
    title: 'Hero of the Earth Classroom Poster (PDF)',
    description: 'A beautiful printable poster listing eco-friendly habits and indigenous words for nature.',
    type: 'poster',
    downloadUrl: '#',
    iconName: 'Image',
  },
  {
    id: 'env-quiz-pack',
    title: 'Environmental Quiz Pack (PDF)',
    description: 'A series of short trivia quizzes about biodiversity, ocean currents, and global sustainability.',
    type: 'quiz',
    downloadUrl: '#',
    iconName: 'Award',
  },
];
