import Link from 'next/link';
import Icon from './Icon';
import { CONTACT_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-cyan/10 mt-0">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Social */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-2xl font-bold text-white">CAFEINO</span>
              <span className="text-[10px] text-cyan/70 font-medium tracking-widest">CAFE & RESTAURANT</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all duration-300"
                aria-label="اینستاگرام"
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href={`https://t.me/${CONTACT_INFO.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all duration-300"
                aria-label="تلگرام"
              >
                <Icon name="telegram" size={18} />
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all duration-300"
                aria-label="واتساپ"
              >
                <Icon name="whatsapp" size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cyan font-semibold text-sm mb-4">تماس با ما</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Icon name="mapPin" size={16} className="text-cyan/60 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="phone" size={16} className="text-cyan/60 shrink-0" />
                <span dir="ltr">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="clock" size={16} className="text-cyan/60 shrink-0" />
                <span>{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-cyan font-semibold text-sm mb-4">ساعات کاری</h4>
            <p className="text-sm text-gray-400 mb-1">هر روز هفته</p>
            <p className="text-lg font-semibold text-white" dir="ltr">۱۲:۰۰ - ۲۴:۰۰</p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-cyan font-semibold text-sm mb-4">خبرنامه</h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              با عضویت در خبرنامه کافئینو، از تخفیف‌ها و رویدادهای جدید باخبر شوید.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="input-field flex-1 text-sm"
                aria-label="ایمیل"
              />
              <button
                type="submit"
                className="shrink-0 bg-cyan text-navy-950 rounded-xl px-3.5 py-2 hover:bg-cyan-light transition-colors"
                aria-label="ثبت"
              >
                <Icon name="send" size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-cyan/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© ۱۴۰۳ کافئینو. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/menu" className="hover:text-cyan transition-colors">منو</Link>
            <Link href="/reservation" className="hover:text-cyan transition-colors">رزرو</Link>
            <Link href="/reels" className="hover:text-cyan transition-colors">ریلزها</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
