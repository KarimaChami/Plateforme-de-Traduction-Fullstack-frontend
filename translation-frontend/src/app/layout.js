// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google'; 
import Header from '@/components/Header';
import AnimatedBackground from '@/components/AnimatedBackground';

const inter = Inter({ subsets: ['latin'] });

// Métadonnées (Server Side)
export const metadata = {
  title: 'TalAIt Translator',
  description: 'Application de traduction sécurisée avec IA par TalAIt',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="fr" className={inter.className}>
   <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 relative">
    {/* Background animé */}
    <AnimatedBackground />

    {/* Header */}
    <Header />

    {/* Main content */}
    <main className="flex-grow flex flex-col items-center justify-center p-6 z-10 w-full">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-300 p-8 animate-fade-in">
        {children}
      </div>
    </main>
  </body>
    </html>
  );
}