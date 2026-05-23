export interface Activity {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  points: number;
  iconName: string;
}

export interface LearningTool {
  id: string;
  title: string;
  description: string;
  type: string;
  iconName: string;
}

export const activities: Activity[] = [
  {
    id: 'plastic-free-challenge',
    title: 'Plastic-Free Challenges',
    description: 'Avoid single-use plastics for 5 days. Swap plastic wrap for beeswax, bottles for metal flasks, and record your impact!',
    difficulty: 'Easy',
    duration: '5 Days',
    points: 100,
    iconName: 'Sparkles',
  },
  {
    id: 'ocean-protection-mission',
    title: 'Ocean Protection Missions',
    description: 'Organize or participate in a local beach, river, or park cleanup. Log the debris types to map pollution in your area.',
    difficulty: 'Hard',
    duration: '1 Day',
    points: 250,
    iconName: 'Droplet',
  },
  {
    id: 'climate-action-tasks',
    title: 'Climate Action Tasks',
    description: 'Work with your family to inspect home energy conservation, thermostat settings, and compost wastes. Calculate carbon savings!',
    difficulty: 'Medium',
    duration: '2 Days',
    points: 150,
    iconName: 'Leaf',
  },
];

export const learningTools: LearningTool[] = [
  {
    id: 'env-trivia',
    title: 'Environmental Quizzes (PDF or online)',
    description: 'Test your green knowledge with interactive trivia sets on ocean life and biodiversity.',
    type: 'Quiz',
    iconName: 'Gamepad2',
  },
  {
    id: 'printable-sheets',
    title: 'Activity Sheets (PDF downloads)',
    description: 'Printable word searches, coloring grids, and science puzzles about sustainability.',
    type: 'Worksheet',
    iconName: 'Printer',
  },
  {
    id: 'badge-certification',
    title: 'Certificates & Badges (PDF or digital)',
    description: 'Earn digital certificates and printable badges for completing youth challenges.',
    type: 'Reward',
    iconName: 'Award',
  },
  {
    id: 'interactive-missions',
    title: 'Interactive learning missions',
    description: 'Browser-guided interactive stories where you make choices that impact environmental health.',
    type: 'Simulation',
    iconName: 'Globe',
  },
];
