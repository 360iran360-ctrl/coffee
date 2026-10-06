import Link from 'next/link';
import Icon from '@/components/Icon';
import { EVENTS } from '@/lib/data';

export default function EventsPage() {
  return (
    <main className="min-h-screen pt-20 px-4 md:px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
            <Icon name="calendar" size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-medium">مراسم و جشن‌ها</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">مراسم و جشن‌ها</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            برای مراسم خاص خود، فضایی خصوصی و به‌یادماندنی با امکانات ویژه رزرو کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl overflow-hidden border border-cyan/15 bg-navy-800 card-hover hover:border-cyan/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <span className="absolute top-3 right-3 bg-cyan/90 text-navy-950 text-xs font-bold px-3 py-1 rounded-full">
                  {event.capacity}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold text-white mb-2">{event.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{event.description}</p>
                <div className="mb-4">
                  <h3 className="text-cyan text-xs font-semibold mb-2">امکانات</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.services.map((s, i) => (
                      <span key={i} className="text-xs text-gray-300 bg-navy-900/50 px-3 py-1 rounded-full border border-cyan/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/reservation"
                  className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cyan hover:text-navy-950 transition-all"
                >
                  رزرو این مراسم
                  <Icon name="arrowLeft" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
