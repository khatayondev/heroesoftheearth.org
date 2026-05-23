import React from 'react';
import type { Metadata } from 'next';
import HomeClientLayout from '@/components/sections/home/HomeClientLayout';

export const metadata: Metadata = {
  title: 'Home | Heroes of the Earth',
  description: 'Empowering children and youth with stories and education to protect our oceans, climate, and ecosystems.',
};

export default function HomePage() {
  return <HomeClientLayout />;
}
