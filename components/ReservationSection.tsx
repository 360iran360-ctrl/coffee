'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function ReservationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ date: '', time: '', guests: '2' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-12 px-4 md:px-6 reveal">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reservation card */}
          <div className="relative rounded-3xl overflow-hidden border border-cyan/15 bg-navy-800 p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-cyan/10 border border-cyan/20">
                  <Icon name="table" size={20} className="text-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white">رزرو میز</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                میز دلخواه خود را برای یک تجربه خاص رزرو کنید.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-cyan/10 border border-cyan/30 mb-4">
                    <Icon name="check" size={32} className="text-cyan" />
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">رزرو شما با موفقیت ثبت شد</p>
                  <p className="text-gray-400 text-sm">به زودی با شما تماس خواهیم گرفت.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">تعداد نفرات</label>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="input-field text-sm"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n} className="bg-navy-900">{n} نفر</option>
                        ))}
                        <option value="9+" className="bg-navy-900">بیشتر از ۸ نفر</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">ساعت</label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="input-field text-sm"
                        required
                      >
                        <option value="" className="bg-navy-900" disabled>انتخاب ساعت</option>
                        {['12:00','13:00','14:00','16:00','18:00','19:00','20:00','21:00','22:00'].map(t => (
                          <option key={t} value={t} className="bg-navy-900">{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">تاریخ</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="input-field text-sm"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-cyan text-navy-950 font-semibold py-3.5 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon name="search" size={18} />
                    جستجو و رزرو
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Events card */}
          <div className="relative rounded-3xl overflow-hidden border border-cyan/15 group min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
              alt="مراسم و جشن‌ها"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-navy-950/95 via-navy-950/70 to-navy-950/30" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-cyan/10 border border-cyan/20 backdrop-blur-sm">
                  <Icon name="calendar" size={20} className="text-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white">مراسم و جشن‌ها</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-sm">
                برای مراسم خاص خود، فضایی خصوصی و به‌یادماندنی با امکانات ویژه رزرو کنید.
              </p>
              <a
                href="/events"
                className="inline-flex items-center gap-2 border-2 border-cyan/40 text-cyan font-semibold px-6 py-3 rounded-full hover:bg-cyan/10 transition-all duration-300 w-fit"
              >
                اطلاعات بیشتر
                <Icon name="arrowLeft" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
