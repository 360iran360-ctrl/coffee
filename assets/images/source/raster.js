/* ساخت تصویرهای WebP از سورس‌های SVG — اجرای داخل کانتینر Node با Sharp
   docker run --rm -v "$PWD/assets/images/source:/gen" -v "$PWD/assets/images:/out" -w /gen node:22 \
     sh -c "npm i --silent sharp@0.33.5 && node raster.js"
*/
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const jobs = [
  ['hero-specialist.svg', 'hero-specialist.webp', 84],
  ['about-specialist.svg', 'about-specialist.webp', 84],
  ['service-assessment.svg', 'service-assessment.webp', 82],
  ['service-corrective.svg', 'service-corrective.webp', 82],
  ['service-online.svg', 'service-online.webp', 82],
  ['service-training.svg', 'service-training.webp', 82],
  ['video-poster.svg', 'video-poster.webp', 82],
  ['article-1.svg', 'article-1.webp', 82],
  ['article-2.svg', 'article-2.webp', 82],
  ['article-3.svg', 'article-3.webp', 82],
  ['consultation-banner.svg', 'consultation-banner.webp', 80],
];
(async () => {
  for (const [src, out, q] of jobs) {
    const buf = fs.readFileSync(path.join('/gen', src));
    const info = await sharp(buf).webp({ quality: q, effort: 6 }).toFile(path.join('/out', out));
    console.log(out, info.width + 'x' + info.height, (info.size / 1024).toFixed(1) + 'kB');
  }
})().catch((e) => { console.error('FAILED', e.message); process.exit(1); });
