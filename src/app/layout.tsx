import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/shared/styles/normalize.css';
import './globals.scss';
import EmotionProvider from '@/components/EmotionProvider';
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'генератор дорожек для программ фигурного катания',
  description:
    'Генерируем дорожку (step sequence) для короткой программы фигурного катания',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <EmotionProvider>{children}</EmotionProvider>
      </body>
    </html>
  );
}
