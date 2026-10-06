'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import ReelCard from './ReelCard';
import { HERO_SLIDES, HERO_FEATURES, FEATURED_REEL } from '@/lib/data';

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const next = () => setSlide((s) => (s + 1) % HERO_SLIDES.length);
  const prev = () => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i: number) => {
    setSlide(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6000);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-12 px-4 md:px-6 overflow-hidden">
      {/* Background images with fade transition */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === slide ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy-950/95 via-navy-950/80 to-navy-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
        </div>
      ))}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 text-right">
            <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-6">
              <Icon name="sparkles" size={14} className="text-cyan" />
              <span className="text-cyan text-xs font-medium">به کافئینو خوش آمدید</span>
            </div>

            <div key={slide} className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                {HERO_SLIDES[slide].title1}
                <br />
                <span className="text-gradient-cyan">{HERO_SLIDES[slide].title2}</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mb-8">
                {HERO_SLIDES[slide].subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/reservation"
                className="inline-flex items-center gap-2 bg-cyan text-navy-950 font-semibold px-7 py-3.5 rounded-full hover:bg-cyan-light transition-all duration-300 shadow-lg shadow-cyan/20"
              >
                <Icon name="table" size={18} />
                رزرو میز
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 border-2 border-cyan/40 text-cyan font-semibold px-7 py-3.5 rounded-full hover:bg-cyan/10 transition-all duration-300"
              >
                مشاهده منو
                <Icon name="arrowLeft" size={18} />
              </Link>
            </div>

            {/* Feature icons */}
            <div className="flex flex-wrap items-center gap-6">
              {HERO_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="p-2 rounded-full border border-cyan/20 bg-navy-800/50">
                    <Icon name={f.icon} size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{f.title}</p>
                    <p className="text-gray-400 text-xs">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Reel card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-[280px]">
              <p className="text-cyan text-sm font-semibold mb-3 text-center lg:text-right">جدیدترین ریلز</p>
              <ReelCard reel={FEATURED_REEL} featured />
            </div>
          </div>
        </div>

        {/* Slider controls */}
        <div className="flex items-center justify-center lg:justify-end gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-cyan/20 text-cyan/60 hover:text-cyan hover:border-cyan/50 transition-all"
            aria-label="قبلی"
          >
            <Icon name="chevronRight" size={20} />
          </button>
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? 'w-8 bg-cyan' : 'w-1.5 bg-cyan/30'
                }`}
                aria-label={`اسلاید ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full border border-cyan/20 text-cyan/60 hover:text-cyan hover:border-cyan/50 transition-all"
            aria-label="بعدی"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
