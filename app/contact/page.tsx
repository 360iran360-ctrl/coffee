'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { CONTACT_INFO } from '@/lib/data';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:'', email:'', message:'' }); }, 5000);
  };

  return (
    <main className="min-h-screen pt-20 px-4 md:px-6 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">
            <Icon name="phone" size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-medium">تماس با ما</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">با ما در ارتباط باشید</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            هر سوال یا پیشنهادی دارید، خوشحال می‌شویم بشنویم.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10">
              <div className="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">
                <Icon name="mapPin" size={20} className="text-cyan" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">آدرس</h3>
              <p className="text-gray-400 text-sm">{CONTACT_INFO.address}</p>
            </div>
            <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10">
              <div className="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">
                <Icon name="phone" size={20} className="text-cyan" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">تلفن</h3>
              <p className="text-gray-400 text-sm" dir="ltr">{CONTACT_INFO.phone}</p>
            </div>
            <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10">
              <div className="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">
                <Icon name="clock" size={20} className="text-cyan" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">ساعات کاری</h3>
              <p className="text-gray-400 text-sm">{CONTACT_INFO.hours}</p>
            </div>
            <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10">
              <h3 className="text-white text-sm font-semibold mb-3">شبکه‌های اجتماعی</h3>
              <div className="flex items-center gap-3">
                <a href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all" aria-label="اینستاگرام">
                  <Icon name="instagram" size={18} />
                </a>
                <a href={`https://t.me/${CONTACT_INFO.telegram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all" aria-label="تلگرام">
                  <Icon name="telegram" size={18} />
                </a>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all" aria-label="واتساپ">
                  <Icon name="whatsapp" size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-cyan/15 bg-navy-800 p-6 md:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 rounded-full bg-cyan/10 border border-cyan/30 mb-4">
                    <Icon name="check" size={32} className="text-cyan" />
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">پیام شما ارسال شد</p>
                  <p className="text-gray-400 text-sm">به زودی پاسخ خواهیم داد.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">نام شما</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="نام خود را وارد کنید"
                      className="input-field text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">ایمیل</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="example@email.com"
                      className="input-field text-sm"
                      dir="ltr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">پیام</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="پیام خود را بنویسید..."
                      rows={6}
                      className="input-field text-sm resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-cyan text-navy-950 font-semibold py-3.5 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon name="send" size={18} />
                    ارسال پیام
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="mt-6 rounded-3xl overflow-hidden border border-cyan/15 h-[250px]">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=51.389,35.696,51.419,35.716&layer=mapnik"
                className="w-full h-full"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1)' }}
                loading="lazy"
                title="نقشه کافئینو"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
