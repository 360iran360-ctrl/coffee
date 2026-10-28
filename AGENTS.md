# AGENTS.md — یادداشت‌های محیط توسعه (وب‌سایت مهدی پارسا)

## ماهیت پروژه
سایت **کاملاً ایستا** است: یک `index.html` به‌همراه `assets/` (CSS، JS، تصویر، فونت، آیکون).
هیچ فریم‌ورک، هیچ مرحله build، هیچ بک‌اند، دیتابیس یا فراخوانی شبکه‌ای وجود ندارد و
هیچ وابستگی بیرونی (CDN، Google Fonts، آیکون آنلاین، اسکریپت رهگیری) استفاده نشده است.

## اجرا در سندباکس
```bash
docker compose -f docker-compose.base44.yml up -d
curl -I http://localhost:3000/
```
سرویس `web` تصویر پایه `python:3.12-slim` است و مخزن را فقط-خواندنی در `/app` مانت می‌کند و
با `http.server` روی پورت ۳۰۰۰ سرو می‌کند. چون سورس مستقیماً از دیسک خوانده می‌شود،
هر ویرایش در HTML/CSS/JS بی‌درنگ در پورت ۳۰۰۰ دیده می‌شود.

نکته مهم: این پروژه سرور توسعه با live-reload ندارد (عمداً، برای باقی ماندن سایت بدون وابستگی).
بعد از هر تغییر در فایل‌ها در سندباکس، `reload_preview` را صدا بزنید.

فونت‌ها و تصاویر با هدر MIME درست سرو می‌شوند؛ نوع `font/woff2`، `image/webp` و `image/svg+xml`
در `command` سرویس صریحاً ثبت شده است (پیش‌فرض `mimetypes` پایتون ممکن است این‌ها را نشناسد).

## بدون راز (secrets)
سایت به هیچ سرویس بیرونی وابسته نیست؛ `.base44/environment.json` فهرست `secrets` خالی دارد و
نیازی به `env_file: /run/base44/app.env` نیست.

## ساخت تصاویر
تصویرهای WebP در `assets/images/` از سورس‌های SVG در `assets/images/source/` ساخته شده‌اند.
برای تغییر تصویر، فایل SVG متناظر را ویرایش کنید و با Sharp دوباره خروجی بگیرید:

```bash
docker run --rm -v "$PWD/assets/images/source:/gen" -v "$PWD/assets/images:/out" -w /gen node:22 \
  sh -c "npm i --silent sharp@0.33.5 && node raster.js"
```
(فایل `raster.js` با همان دستور داخل کانتینر ساخته می‌شود؛ نگاشت نام‌ها: `hero-specialist.svg → hero-specialist.webp` و به همین شکل برای بقیه.)

## جای‌نگهدارها (Placeholders)
موارد زیر در `index.html` با کلاس `ph` نشانه‌گذاری شده‌اند و باید با اطلاعات واقعی تکمیل شوند:
- اطلاعات تماس پاصفحه (تلفن، ایمیل، نشانی) و پیوند شبکه‌های اجتماعی (`data-placeholder-link`)
- سه نشان تخصصی در بخش «درباره من» (مدرک، گواهینامه، سابقه کاری)
- تاریخ انتشار مقاله‌ها
هیچ مدرک، گواهینامه یا سابقه کاری‌ای در محتوا ساخته نشده است.

## بسته تحویل
`dist/mehdi-parsa-website.zip` شامل `index.html`، `README.md` و کل `assets/` است.
بازسازی بسته:
```bash
docker run --rm -v "$PWD":/w -w /w python:3.12-slim python3 -c "import os,zipfile; z=zipfile.ZipFile('dist/mehdi-parsa-website.zip','w',zipfile.ZIP_DEFLATED); [z.write(os.path.join(r,f)) for r,d,fs in os.walk('assets') for f in fs]; [z.write(f) for f in ['index.html','README.md']]; z.close()"
```
