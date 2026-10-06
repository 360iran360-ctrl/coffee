'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { STORY_CATEGORIES } from '@/lib/data';

export default function StoryCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 px-4 md:px-6 reveal">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-full bg-cyan/10 border border-cyan/20">
            <Icon name="sparkles" size={18} className="text-cyan" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">لحظه‌های کافئینو</h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {STORY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href="/reels"
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                {/* Cyan ring */}
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-cyan to-cyan/20">
                  <div className="w-full h-full rounded-full overflow-hidden bg-navy-800">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* Icon badge */}
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-navy-900 border border-cyan/30">
                  <Icon name={cat.icon} size={14} className="text-cyan" />
                </div>
              </div>
              <span className="text-xs text-gray-300 group-hover:text-cyan transition-colors max-w-[80px] text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
