# قالب Elementor Pro — وب‌سایت مهدی پارسا

## فایل‌های بسته
- `mehdiparsa-elementor-template.json` — قالب صفحه اصلی Elementor
- `mehdiparsa-custom.css` — استایل سفارشی (فونت، RTL، افکت‌های سه‌بعدی)
- `assets/images/` — تصاویر وب‌سایت

## مراحل نصب

### ۱. نصب فونت وزیرمتن
فایل‌های فونت در `assets/fonts/` قرار دارند. این فایل‌ها را در مسیر زیر آپلود کنید:
```
/wp-content/uploads/fonts/
```
سپس فایل `mehdiparsa-custom.css` را در یکی از این مسیرها اضافه کنید:
- Appearance → Customize → Additional CSS
- یا در فایل `style.css` قالب فعال

### ۲. آپلود تصاویر در WordPress Media Library
تمام تصاویر موجود در `assets/images/` را در Media Library آپلود کنید:
- `hero-specialist.webp` — عکس هیرو
- `about-specialist.webp` — پرتره درباره من
- `service-assessment.webp` — ارزیابی و آنالیز حرکتی
- `service-corrective.webp` — حرکات اصلاحی
- `service-online.webp` — مشاوره آنلاین
- `service-training.webp` — برنامه تمرینی اختصاصی
- `article-1.webp` — مقاله ۱
- `article-2.webp` — مقاله ۲
- `article-3.webp` — مقاله ۳
- `video-poster.webp` — پوستر ویدئو
- `consultation-banner.webp` — بنر مشاوره
- `logo.svg` — لوگو

### ۳. جایگزینی آدرس تصاویر در قالب
بعد از آپلود تصاویر، در ویرایشگر Elementor هر ویجت Image را باز کرده و تصویر را از Media Library انتخاب کنید.
در قالب JSON، تصاویر با نشانه‌گذاری `{{IMAGE:نام-فایل}}` مشخص شده‌اند که باید با URL واقعی تصویر از Media Library جایگزین شوند.

### ۴. وارد کردن قالب (Import)
1. به WordPress → Templates → Saved Templates بروید
2. روی دکمه «Import Templates» کلیک کنید
3. فایل `mehdiparsa-elementor-template.json` را انتخاب و آپلود کنید
4. قالب در لیست Saved Templates ظاهر می‌شود

### ۵. ایجاد صفحه
1. Pages → Add New را بزنید
2. با Elementor ویرایش کنید
3. روی آیکون فولدر (Template Library) کلیک کنید
4. قالب «مهدی پارسا - صفحه اصلی» را در تب My Templates پیدا کرده و Insert کنید
5. تصاویر هر ویجت را با تصاویر آپلود شده جایگزین کنید

## نکات مهم
- تمام متن‌های فارسی در ویرایشگر Elementor قابل ویرایش هستند
- موارد داخل کروشه `[...]` جای‌نگهدار هستند و باید با اطلاعات واقعی جایگزین شوند:
  - `[مدرک تحصیلی]`، `[گواهینامه بین‌المللی]`، `[سابقه کاری]`
  - `[شماره تماس]`، `[نشانی ایمیل]`، `[نشانی محل فعالیت]`
  - `[تاریخ انتشار]` در مقاله‌ها
- افکت‌های سه‌بعدی (Tilt، Parallax، Glow) در فایل CSS سفارشی تعریف شده‌اند
- چیدمان کاملاً RTL است و از Flexbox Containers استفاده می‌کند
- تمام بخش‌ها از ویجت‌های بومی Elementor ساخته شده‌اند (Heading، Text Editor، Image، Button، Icon، Icon Box، Nav Menu، Social Icons، Icon List)
