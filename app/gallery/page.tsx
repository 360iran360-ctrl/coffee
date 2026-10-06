'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import { GALLERY_IMAGES } from '@/lib/data';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const categories = ['all', 'coffee', 'food', 'dessert', 'space', 'events'];
  const catLabels: Record<string, string> = {
    all: 'همه',
    coffee: 'قهوه',
    food: 'غذا',
    dessert: 'دسر',
    space: 'فضا',
    events: 'رویدادها',
  };

  const filtered = useMemo(() => {
    if (filter === 'all') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter(g => g.category === filter);
  }, [filter]);

  return (
    <main className="min-h-screen pt-20 px-4 md:px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
            <Icon name="camera" size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-medium">گالری</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">گالری کافئینو</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            لحظه‌های زیبای کافئینو را کشف کنید.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-cyan text-navy-950'
                  : 'bg-navy-800 text-gray-400 border border-cyan/10 hover:border-cyan/30'
              }`}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className={`relative rounded-2xl overflow-hidden border border-cyan/10 group cursor-pointer ${
                i % 5 === 0 ? 'row-span-2' : ''
              }`}
              style={{ aspectRatio: i % 5 === 0 ? '3/4' : '1/1' }}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-colors duration-300 flex items-end p-3">
                <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />
          <img
            src={lightbox}
            alt=""
            className="relative z-10 max-w-full max-h-[85vh] rounded-2xl border border-cyan/20"
          />
          <button
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-navy-800 text-white hover:bg-navy-700 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="بستن"
          >
            <Icon name="close" size={24} />
          </button>
        </div>
      )}
    </main>
  );
}
