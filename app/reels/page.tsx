'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import ReelCard from '@/components/ReelCard';
import { REELS } from '@/lib/data';
import type { Reel } from '@/lib/types';

export default function ReelsPage() {
  const [selected, setSelected] = useState<Reel | null>(null);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pt-20 px-4 md:px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
            <Icon name="film" size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-medium">ریلزها</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">کلیپ‌ها و ریلزها</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            لحظه‌های زیبا و جذاب کافئینو را تماشا کنید.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {REELS.map((reel) => (
            <div key={reel.id} onClick={() => setSelected(reel)} className="cursor-pointer">
              <ReelCard reel={reel} />
              <p className="text-gray-400 text-xs mt-2 text-center">{reel.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reel modal / viewer */}
      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm font-semibold">{selected.title}</p>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-full bg-navy-800 text-white hover:bg-navy-700 transition-colors"
                aria-label="بستن"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <ReelCard reel={selected} featured />
            <div className="mt-3 space-y-2">
              <p className="text-gray-400 text-xs leading-relaxed">{selected.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Icon name="calendar" size={12} />
                  {selected.date}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="play" size={12} />
                  {selected.views} بازدید
                </span>
              </div>
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 text-cyan/70 hover:text-cyan transition-colors text-xs"
              >
                <Icon name="copy" size={14} />
                {copied ? 'لینک کپی شد' : 'کپی لینک'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
