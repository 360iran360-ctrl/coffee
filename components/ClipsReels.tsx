import Link from 'next/link';
import Icon from './Icon';
import { REELS } from '@/lib/data';

export default function ClipsReels() {
  return (
    <section className="py-12 px-4 md:px-6 reveal">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-cyan/10 border border-cyan/20">
              <Icon name="film" size={18} className="text-cyan" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">کلیپ‌ها و ریلزها</h2>
          </div>
          <Link
            href="/reels"
            className="flex items-center gap-1.5 text-sm text-cyan/70 hover:text-cyan transition-colors"
          >
            مشاهده همه
            <Icon name="arrowLeft" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {REELS.map((reel) => (
            <Link
              key={reel.id}
              href="/reels"
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-cyan/10 bg-navy-800 card-hover"
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/30" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-3 rounded-full bg-cyan/20 backdrop-blur-sm border border-cyan/30 text-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="play" size={20} />
                </div>
              </div>

              {/* Three dots */}
              <button className="absolute top-2 left-2 text-white/60 hover:text-white p-1" aria-label="بیشتر">
                <Icon name="more" size={16} />
              </button>

              {/* Title & views */}
              <div className="absolute bottom-0 right-0 left-0 p-3">
                <p className="text-white text-xs font-semibold mb-1 line-clamp-2">{reel.title}</p>
                <div className="flex items-center gap-1.5 text-gray-300 text-[10px]">
                  <Icon name="play" size={10} />
                  <span>{reel.views}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
