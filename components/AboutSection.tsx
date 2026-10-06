import Link from 'next/link';
import Icon from './Icon';
import { ABOUT_FEATURES } from '@/lib/data';

export default function AboutSection() {
  return (
    <section className="py-12 px-4 md:px-6 reveal">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image collage */}
          <div className="grid grid-cols-3 gap-3 h-[400px]">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-cyan/10">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                alt="فضای کافئینو"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="col-span-1 rounded-2xl overflow-hidden border border-cyan/10">
              <img
                src="https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=400&q=80"
                alt="قهوه کافئینو"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="col-span-1 rounded-2xl overflow-hidden border border-cyan/10">
              <img
                src="https://images.unsplash.com/photo-1551024601-b5117d5f5d8f?w=400&q=80"
                alt="دسر کافئینو"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-cyan/10 border border-cyan/20">
                <Icon name="home" size={18} className="text-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-white">درباره کافئینو</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              کافئینو جایی است برای آرامش، لذت و تجربه طعم‌های به‌یادماندنی. ما تلاش می‌کنیم با ترکیب قهوه باکیفیت، غذای تازه، فضای دلنشین و میزبانی حرفه‌ای، لحظه‌هایی متفاوت برای شما خلق کنیم.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {ABOUT_FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-navy-800/50 border border-cyan/10">
                  <div className="p-2 rounded-full bg-cyan/10 shrink-0">
                    <Icon name={f.icon} size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{f.title}</p>
                    <p className="text-gray-400 text-xs">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-cyan/40 text-cyan font-semibold px-6 py-3 rounded-full hover:bg-cyan/10 transition-all duration-300"
            >
              بیشتر درباره ما
              <Icon name="arrowLeft" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
