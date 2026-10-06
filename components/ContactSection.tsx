import Icon from './Icon';
import { CONTACT_INFO } from '@/lib/data';

export default function ContactSection() {
  return (
    <section className="py-12 px-4 md:px-6 reveal">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-full bg-cyan/10 border border-cyan/20">
            <Icon name="phone" size={18} className="text-cyan" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">تماس با ما</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover">
            <div className="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">
              <Icon name="mapPin" size={20} className="text-cyan" />
            </div>
            <h3 className="text-white text-sm font-semibold mb-1">آدرس</h3>
            <p className="text-gray-400 text-sm">{CONTACT_INFO.address}</p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover">
            <div className="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">
              <Icon name="phone" size={20} className="text-cyan" />
            </div>
            <h3 className="text-white text-sm font-semibold mb-1">تلفن</h3>
            <p className="text-gray-400 text-sm" dir="ltr">{CONTACT_INFO.phone}</p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover">
            <div className="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">
              <Icon name="clock" size={20} className="text-cyan" />
            </div>
            <h3 className="text-white text-sm font-semibold mb-1">ساعات کاری</h3>
            <p className="text-gray-400 text-sm">{CONTACT_INFO.hours}</p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover">
            <div className="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">
              <Icon name="instagram" size={20} className="text-cyan" />
            </div>
            <h3 className="text-white text-sm font-semibold mb-1">شبکه‌های اجتماعی</h3>
            <div className="flex items-center gap-2 mt-2">
              <a href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all" aria-label="اینستاگرام">
                <Icon name="instagram" size={16} />
              </a>
              <a href={`https://t.me/${CONTACT_INFO.telegram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all" aria-label="تلگرام">
                <Icon name="telegram" size={16} />
              </a>
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all" aria-label="واتساپ">
                <Icon name="whatsapp" size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-6 rounded-3xl overflow-hidden border border-cyan/15 h-[200px] md:h-[300px] relative bg-navy-800">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=51.389,35.696,51.419,35.716&layer=mapnik"
            className="w-full h-full"
            style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1)' }}
            loading="lazy"
            title="نقشه کافئینو"
          />
        </div>
      </div>
    </section>
  );
}
