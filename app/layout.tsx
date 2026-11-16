import type { Metadata } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/noto-sans-sinhala';
import './globals.css';

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
    <html lang="si">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
