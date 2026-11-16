import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Sinhala } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const notoSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sinhala',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'helaprompt. — අදහස ඔබේ. හරිම prompt එක මෙතැන.',
  description:
    "Sri Lanka's bilingual Sinhala and English AI prompt workspace for business, education, content creation, image generation, and daily productivity.",
  openGraph: {
    title: 'helaprompt. — අදහස ඔබේ. හරිම prompt එක මෙතැන.',
    description:
      "Sri Lanka's bilingual Sinhala and English AI prompt workspace for business, education, content creation, image generation, and daily productivity.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'helaprompt. — අදහස ඔබේ. හරිම prompt එක මෙතැන.',
    description:
      "Sri Lanka's bilingual Sinhala and English AI prompt workspace for business, education, content creation, image generation, and daily productivity.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="si"
      className={`${plusJakarta.variable} ${notoSinhala.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
