import Link from 'next/link';
import Icon from './Icon';
import { GALLERY_IMAGES } from '@/lib/data';

export default function GallerySection() {
  return (
    <section className="py-12 px-4 md:px-6 reveal">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-cyan/10 border border-cyan/20">
              <Icon name="camera" size={18} className="text-cyan" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">گالری تصاویر</h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-1.5 text-sm text-cyan/70 hover:text-cyan transition-colors"
          >
            مشاهده همه
            <Icon name="arrowLeft" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.slice(0, 8).map((img, i) => (
            <div
              key={img.id}
              className={`relative rounded-2xl overflow-hidden border border-cyan/10 group cursor-pointer ${
                i === 0 || i === 5 ? 'col-span-2 row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 || i === 5 ? '1/1' : '3/4' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
