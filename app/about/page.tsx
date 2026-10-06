import Link from 'next/link';
import Icon from '@/components/Icon';
import { ABOUT_FEATURES } from '@/lib/data';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 px-4 md:px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
            <Icon name="home" size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-medium">درباره ما</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">درباره کافئینو</h1>
        </div>

        {/* Hero image */}
        <div className="rounded-3xl overflow-hidden border border-cyan/15 mb-8 h-[300px] md:h-[400px] relative">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80"
            alt="فضای کافئینو"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
          <div className="absolute bottom-0 right-0 left-0 p-6 md:p-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              جایی برای <span className="text-gradient-cyan">لحظه‌های به‌یادماندنی</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
              کافئینو جایی است برای آرامش، لذت و تجربه طعم‌های به‌یادماندنی. ما تلاش می‌کنیم با ترکیب قهوه باکیفیت، غذای تازه، فضای دلنشین و میزبانی حرفه‌ای، لحظه‌هایی متفاوت برای شما خلق کنیم.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {ABOUT_FEATURES.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover text-center">
              <div className="inline-flex p-3 rounded-full bg-cyan/10 mb-3">
                <Icon name={f.icon} size={24} className="text-cyan" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
              <p className="text-gray-400 text-xs">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Story section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden border border-cyan/10 aspect-square">
              <img src="https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=600&q=80" alt="قهوه" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-cyan/10 aspect-square">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7eaa5?w=600&q=80" alt="غذا" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-cyan/10 aspect-square">
              <img src="https://images.unsplash.com/photo-1551024601-b5117d5f5d8f?w=600&q=80" alt="دسر" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-cyan/10 aspect-square">
              <img src="https://images.unsplash.com/photo-1453614512568-c4021d66884c?w=600&q=80" alt="فضای شبانه" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">داستان ما</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              کافئینو با رویکردی متفاوت به دنیای قهوه و رستوران متولد شد. ما باور داریم که هر فنجان قهوه و هر بشقاب غذا، فرصتی است برای خلق یک خاطره.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              از انتخاب دانه‌های قهوه تک‌ریشه تا استفاده از تازه‌ترین مواد اولیه در آشپزخانه، هر جزئیات برای تجربه‌ای خاص و متمایز طراحی شده است.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              تیم حرفه‌ای ما، از باریستاها تا سرآشپزها، با عشق و تعهد، بهترین کیفیت را برای شما تضمین می‌کنند.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-cyan text-navy-950 font-semibold px-6 py-3 rounded-full hover:bg-cyan-light transition-colors"
            >
              مشاهده منو
              <Icon name="arrowLeft" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
