'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', date: '', time: '', guests: '2', notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = "input-field text-sm";

  return (
    <main className="min-h-screen pt-20 px-4 md:px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
            <Icon name="table" size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-medium">رزرو میز</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">رزرو آنلاین میز</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            میز دلخواه خود را برای یک تجربه خاص در کافئینو رزرو کنید.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-lg mx-auto rounded-3xl border border-cyan/20 bg-navy-800 p-8 text-center">
            <div className="inline-flex p-4 rounded-full bg-cyan/10 border border-cyan/30 mb-4">
              <Icon name="check" size={36} className="text-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">رزرو شما با موفقیت ثبت شد</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              کارشناسان ما به زودی با شما تماس خواهند گرفت تا رزرو شما را تأیید کنند.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6 text-right">
              <div className="p-3 rounded-xl bg-navy-900/50 border border-cyan/10">
                <p className="text-xs text-gray-500 mb-1">تاریخ</p>
                <p className="text-sm text-white" dir="ltr">{form.date || '—'}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-900/50 border border-cyan/10">
                <p className="text-xs text-gray-500 mb-1">ساعت</p>
                <p className="text-sm text-white" dir="ltr">{form.time || '—'}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-900/50 border border-cyan/10">
                <p className="text-xs text-gray-500 mb-1">نفرات</p>
                <p className="text-sm text-white">{form.guests} نفر</p>
              </div>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm({ name:'', phone:'', date:'', time:'', guests:'2', notes:'' }); }}
              className="border-2 border-cyan/40 text-cyan font-semibold px-6 py-2.5 rounded-full hover:bg-cyan/10 transition-all"
            >
              رزرو جدید
            </button>
          </div>
        ) : (
          <div className="max-w-lg mx-auto rounded-3xl border border-cyan/15 bg-navy-800 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="نام خود را وارد کنید"
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">شماره تماس</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className={inputCls}
                  dir="ltr"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">تاریخ</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">ساعت</label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className={inputCls}
                    required
                  >
                    <option value="" disabled className="bg-navy-900">انتخاب</option>
                    {['12:00','13:00','14:00','16:00','18:00','19:00','20:00','21:00','22:00'].map(t => (
                      <option key={t} value={t} className="bg-navy-900">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">نفرات</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className={inputCls}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n} className="bg-navy-900">{n} نفر</option>
                    ))}
                    <option value="9+" className="bg-navy-900">۸+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">توضیحات (اختیاری)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="درخواست‌های خاص خود را بنویسید..."
                  rows={3}
                  className={inputCls + ' resize-none'}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan text-navy-950 font-semibold py-3.5 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="search" size={18} />
                جستجو و رزرو
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
