import Link from 'next/link';
import Icon from './Icon';
import { REELS, GALLERY_IMAGES } from '@/lib/data';

export default function SocialSection() {
  const images = [
    ...REELS.slice(0, 3).map(r => r.thumbnail),
    ...GALLERY_IMAGES.slice(0, 3).map(g => g.src),
  ];

  return (
    <section className="py-12 px-4 md:px-6 reveal">
      <div className="max-w-[1400px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
          <Icon name="instagram" size={16} className="text-cyan" />
          <span className="text-cyan text-xs font-medium">@cafeino</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">ما را در اینستاگرام دنبال کنید</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
          لحظه‌های روزمره کافئینو، قهوه‌های تازه، غذاهای خوشمزه و فضای دنج ما را در اینستاگرام ببینید.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden border border-cyan/10 group"
            >
              <img
                src={src}
                alt="پست اینستاگرام"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors" />
            </div>
          ))}
        </div>

        <a
          href="https://instagram.com/cafeino"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-l from-cyan to-cyan-light text-navy-950 font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
        >
          <Icon name="instagram" size={18} />
          مشاهده اینستاگرام
        </a>
      </div>
    </section>
  );
}
