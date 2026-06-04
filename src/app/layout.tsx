import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import LenisProvider from '@/components/layout/LenisProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Heroes of the Earth',
  description: 'Empowering the next generation to protect our planet through education and storytelling',
  keywords: [
    'environmental education',
    'children books',
    'ocean conservation',
    'climate action',
    'indigenous languages',
    'sustainability for schools',
    'youth programs',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <LenisProvider>
          <Navbar />
          <main style={{ minHeight: '80vh', overflowX: 'hidden', paddingTop: '0px' }}>
            {children}
          </main>

          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
