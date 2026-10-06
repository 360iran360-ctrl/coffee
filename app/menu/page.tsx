'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { MENU_CATEGORIES, MENU_ITEMS, formatPrice } from '@/lib/data';
import type { MenuItem } from '@/lib/types';

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    let items = MENU_ITEMS;
    if (activeCat !== 'all') items = items.filter(i => i.category === activeCat);
    if (search) items = items.filter(i => i.name.includes(search) || i.description.includes(search));
    return items;
  }, [activeCat, search]);

  return (
    <main className="min-h-screen pt-20 px-4 md:px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
            <Icon name="coffee" size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-medium">منوی کافئینو</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">منوی آنلاین</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            از قهوه صبحگاهی تا شام ویژه، همه چیز برای یک تجربه خوشمزه.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در منو..."
            className="input-field pr-10"
          />
          <Icon name="search" size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 justify-start md:justify-center">
          <button
            onClick={() => setActiveCat('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCat === 'all'
                ? 'bg-cyan text-navy-950'
                : 'bg-navy-800 text-gray-400 border border-cyan/10 hover:border-cyan/30'
            }`}
          >
            همه
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeCat === cat.id
                  ? 'bg-cyan text-navy-950'
                  : 'bg-navy-800 text-gray-400 border border-cyan/10 hover:border-cyan/30'
              }`}
            >
              <Icon name={cat.icon} size={14} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="text-right rounded-2xl overflow-hidden border border-cyan/10 bg-navy-800 card-hover hover:border-cyan/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {item.featured && (
                  <span className="absolute top-2 right-2 bg-cyan text-navy-950 text-[10px] font-bold px-2 py-1 rounded-full">
                    پیشنهادی
                  </span>
                )}
                {!item.available && (
                  <div className="absolute inset-0 bg-navy-950/70 flex items-center justify-center">
                    <span className="text-white text-sm">ناموجود</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                  <span className="text-cyan font-bold text-sm shrink-0" dir="ltr">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">موردی یافت نشد</p>
          </div>
        )}
      </div>

      {/* Item detail modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden border border-cyan/20 bg-navy-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 left-3 p-2 rounded-full bg-navy-950/70 text-white hover:bg-navy-950 transition-colors"
                aria-label="بستن"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-white">{selectedItem.name}</h2>
                {selectedItem.featured && (
                  <span className="bg-cyan text-navy-950 text-[10px] font-bold px-2 py-1 rounded-full">پیشنهادی</span>
                )}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{selectedItem.description}</p>
              {selectedItem.ingredients && (
                <div className="mb-4">
                  <h3 className="text-cyan text-xs font-semibold mb-2">مواد تشکیل‌دهنده</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs text-gray-300 bg-navy-800 px-3 py-1 rounded-full border border-cyan/10">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-cyan/10">
                <span className="text-gray-400 text-sm">قیمت</span>
                <span className="text-cyan font-bold text-lg" dir="ltr">{formatPrice(selectedItem.price)}</span>
              </div>
              <Link
                href="/reservation"
                className="mt-4 w-full bg-cyan text-navy-950 font-semibold py-3 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="table" size={18} />
                رزرو میز برای این تجربه
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
