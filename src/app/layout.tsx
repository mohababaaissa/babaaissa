import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { AuthProvider } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { BUSINESS_INFO } from '@/lib/constants';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#072445',
};

export const metadata: Metadata = {
  title: 'Auto-école Babaaissa | École de conduite à Bouarfa — Code, Examens & Leçons',
  description: 'Apprenez le Code de la route marocain, entraînez-vous aux examens blancs et réservez vos leçons de conduite à Bouarfa chez Auto-école Babaaissa (Hay Al Wahda N°1). Tél: 0626783160.',
  keywords: [
    'Auto-école Bouarfa',
    'École de conduite à Bouarfa',
    'Code de la route Maroc',
    'دروس السياقة بوعرفة',
    'مدرسة تعليم السياقة بوعرفة',
    'Permis de conduire Bouarfa',
    'Examen NARSA Maroc',
    'Auto-école Babaaissa'
  ],
  authors: [{ name: 'Auto-école Babaaissa' }],
  openGraph: {
    title: 'Auto-école Babaaissa — Bouarfa',
    description: 'Formation au permis de conduire, Code de la route interactif et réservation de leçons à Bouarfa.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
