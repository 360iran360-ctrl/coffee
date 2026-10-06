import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'کافئینو | کافه و رستوران',
  description: 'کافئینو، کافه و رستورانی مدرن با قهوه تازه، غذای خوشمزه و محیطی دلنشین. رزرو میز، منوی آنلاین، ریلزها و رویدادهای ویژه.',
  keywords: ['کافئینو', 'کافه', 'رستوران', 'قهوه', 'رزرو میز', 'منو', 'تهران'],
  openGraph: {
    title: 'کافئینو | کافه و رستوران',
    description: 'کافه و رستورانی مدرن با قهوه تازه، غذای خوشمزه و محیطی دلنشین',
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'کافئینو',
            description: 'کافه و رستوران مدرن با قهوه تازه و غذای خوشمزه',
            servesCuisine: ['قهوه', 'غذای ایرانی', 'پاستا', 'دسر'],
            address: { '@type': 'PostalAddress', addressLocality: 'تهران', addressCountry: 'IR' },
          })
        }} />
      </head>
      <body className="font-vazir antialiased">
        <Header />
        <ScrollReveal />
        {children}
        <Footer />
      </body>
    </html>
  );
}
