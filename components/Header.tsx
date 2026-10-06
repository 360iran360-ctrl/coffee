'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { NAV_LINKS } from '@/lib/data';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-950/90 backdrop-blur-md border-b border-cyan/10 py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo (right side in RTL) */}
          <Link href="/" className="flex flex-col items-start gap-0.5 shrink-0">
            <span className="text-2xl font-bold text-white tracking-tight">CAFEINO</span>
            <span className="text-[10px] text-cyan/70 font-medium tracking-widest">CAFE & RESTAURANT</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-cyan font-semibold'
                      : 'text-gray-300 hover:text-cyan'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + hamburger (left side in RTL) */}
          <div className="flex items-center gap-3">
            <Link
              href="/reservation"
              className="hidden sm:inline-flex items-center gap-2 bg-cyan text-navy-950 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cyan-light transition-all duration-300 shadow-lg shadow-cyan/20"
            >
              رزرو آنلاین
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white rounded-xl border border-cyan/20 hover:bg-navy-700 transition-colors lg:hidden"
              aria-label="منو"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-navy-900 border-l border-cyan/15 p-6 transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold text-white">CAFEINO</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
              aria-label="بستن"
            >
              <Icon name="close" size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                    isActive
                      ? 'bg-navy-700 text-cyan font-semibold'
                      : 'text-gray-300 hover:bg-navy-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/reservation"
            className="mt-6 flex items-center justify-center gap-2 bg-cyan text-navy-950 font-semibold text-sm px-5 py-3 rounded-full"
          >
            رزرو آنلاین
          </Link>
        </div>
      </div>
    </>
  );
}
