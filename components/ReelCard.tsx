'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import type { Reel } from '@/lib/types';

export default function ReelCard({ reel, featured = false }: { reel: Reel; featured?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden border border-cyan/15 bg-navy-800 group ${
        featured ? 'aspect-[9/16]' : 'aspect-[9/16]'
      }`}
    >
      {/* Thumbnail / poster */}
      <img
        src={reel.thumbnail}
        alt={reel.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/40" />
      <div className="absolute inset-0 bg-gradient-to-l from-navy-950/40 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="p-4 rounded-full bg-cyan/20 backdrop-blur-sm border border-cyan/30 text-cyan hover:bg-cyan hover:text-navy-950 transition-all duration-300 group-hover:scale-110"
          aria-label="پخش"
        >
          <Icon name="play" size={28} />
        </button>
      </div>

      {/* Three-dot menu */}
      <button
        className="absolute top-3 left-3 p-1.5 text-white/70 hover:text-white transition-colors"
        aria-label="بیشتر"
      >
        <Icon name="more" size={20} />
      </button>

      {/* Social interaction icons (right side) */}
      <div className="absolute bottom-16 right-3 flex flex-col items-center gap-4">
        <button
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1"
          aria-label="پسندیدن"
        >
          <Icon
            name="heart"
            size={22}
            className={`transition-all duration-300 ${
              liked ? 'text-red-400 fill-red-400 scale-110' : 'text-white'
            }`}
            style={liked ? { fill: 'currentColor' } : {}}
          />
          <span className="text-white text-[10px] font-medium">{reel.likes}</span>
        </button>
        <div className="flex flex-col items-center gap-1">
          <Icon name="chat" size={22} className="text-white" />
          <span className="text-white text-[10px] font-medium">۷۸</span>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="flex flex-col items-center gap-1"
          aria-label="ذخیره"
        >
          <Icon
            name="bookmark"
            size={22}
            className={`transition-all duration-300 ${
              saved ? 'text-cyan fill-cyan scale-110' : 'text-white'
            }`}
            style={saved ? { fill: 'currentColor' } : {}}
          />
        </button>
        <button className="flex flex-col items-center gap-1" aria-label="اشتراک">
          <Icon name="share" size={22} className="text-white" />
        </button>
      </div>

      {/* Title & views */}
      <div className="absolute bottom-0 right-0 left-0 p-4 pr-12">
        <p className="text-white text-sm font-semibold mb-1">{reel.title}</p>
        <div className="flex items-center gap-2 text-gray-300 text-xs">
          <Icon name="play" size={12} />
          <span>{reel.views} بازدید</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
        <div className="h-full bg-cyan transition-all duration-75" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
