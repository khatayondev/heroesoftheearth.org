import { Book } from '@/types';

export const books: Book[] = [
  {
    id: 'waves-of-change',
    title: 'Waves of Change',
    subtitle: 'Book 1',
    description:
      'A children’s book introducing ocean conservation, climate change, and environmental responsibility through storytelling and interactive learning.',
    fullDescription:
      'Waves of Change is an exciting journey into the world of ocean conservation. Through colourful stories, interactive activities, and thought-provoking questions, children aged 6–14 learn about the importance of protecting our oceans, understanding climate change, and taking environmental responsibility. Available in English and French, this book makes learning about the environment fun and accessible for young readers everywhere.',
    price: '$14.99',
    coverImage: '/images/book-waves-of-change.png',
    purchaseLink: '#',
    sampleLink: '/files/waves-of-change-sample.pdf',
    languages: ['English', 'French'],
  },
  {
    id: 'afrika-our-amazing-planet',
    title: 'Afrika – Our Amazing Planet',
    subtitle: 'Book 2',
    description:
      'An educational book for children exploring pollution, renewable energy, and biodiversity across Africa.',
    fullDescription:
      'Afrika – Our Amazing Planet takes young readers on an incredible adventure across the African continent. Through vibrant illustrations and engaging stories, children explore the challenges of pollution, discover the promise of renewable energy, and learn about the rich wildlife that makes Africa unique. With hands-on activities and relatable characters, this book empowers children to become environmental heroes in their own communities.',
    price: 'Coming Soon',
    coverImage: '/images/book-afrika.png',
    comingSoon: true,
    sampleLink: '/files/afrika-sample.pdf',
    languages: ['English'],
  },
];
