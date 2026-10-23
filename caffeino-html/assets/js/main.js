/* Caffeino — shared layout, header/footer injection, scroll reveal, and page interactions.
   Ported from the Next.js components (Header, Footer, ScrollReveal, Hero, StoryCategories,
   ClipsReels, ReservationSection, AboutSection, GallerySection, SocialSection, ContactSection)
   and the page components (menu, gallery, reservation, events, about, contact, reels). */
(function () {
  'use strict';

  var D = window.CaffeinoData;
  var I = window.CaffeinoIcon;
  // Resolve links relative to the page's depth (root index.html vs pages/*.html)
  var inPages = window.location.pathname.indexOf('/pages/') !== -1;
  var root = inPages ? '../' : '';
  function hrefFor(linkHref) {
    // linkHref values are 'index.html' or 'pages/xxx.html'; prefix with root
    return root + linkHref;
  }
  function reservationHref() { return root + 'pages/reservation.html'; }

  /* ---------------- Header ---------------- */
  function renderHeader(activeHref) {
    var navLinks = D.NAV_LINKS.map(function (l) {
      var isActive = activeHref === l.href;
      return '<a href="' + hrefFor(l.href) + '" class="px-3 py-2 text-sm rounded-lg transition-all duration-300 ' +
        (isActive ? 'text-cyan font-semibold' : 'text-gray-300 hover:text-cyan') + '">' + l.label + '</a>';
    }).join('');

    var html =
      '<header id="siteHeader" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-4">' +
        '<nav class="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">' +
          '<a href="' + root + 'index.html" class="flex flex-col items-start gap-0.5 shrink-0">' +
            '<span class="text-2xl font-bold text-white tracking-tight">CAFEINO</span>' +
            '<span class="text-[10px] text-cyan/70 font-medium tracking-widest">CAFE & RESTAURANT</span>' +
          '</a>' +
          '<div class="hidden lg:flex items-center gap-1">' + navLinks + '</div>' +
          '<div class="flex items-center gap-3">' +
            '<a href="' + reservationHref() + '" class="hidden sm:inline-flex items-center gap-2 bg-cyan text-navy-950 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cyan-light transition-all duration-300 shadow-lg shadow-cyan/20">رزرو آنلاین</a>' +
            '<button id="menuOpenBtn" class="p-2 text-white rounded-xl border border-cyan/20 hover:bg-navy-700 transition-colors lg:hidden" aria-label="منو">' + I('menu', 22) + '</button>' +
          '</div>' +
        '</nav>' +
      '</header>';

    // Mobile overlay
    var mobileLinks = D.NAV_LINKS.map(function (l) {
      var isActive = activeHref === l.href;
      return '<a href="' + hrefFor(l.href) + '" class="px-4 py-3 rounded-xl text-sm transition-colors ' +
        (isActive ? 'bg-navy-700 text-cyan font-semibold' : 'text-gray-300 hover:bg-navy-800') + '">' + l.label + '</a>';
    }).join('');

    html +=
      '<div id="mobileMenu" class="fixed inset-0 z-[60] lg:hidden transition-all duration-300 opacity-0 invisible">' +
        '<div id="mobileBackdrop" class="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"></div>' +
        '<div id="mobilePanel" class="absolute top-0 right-0 h-full w-72 bg-navy-900 border-l border-cyan/15 p-6 transition-transform duration-300 translate-x-full">' +
          '<div class="flex items-center justify-between mb-8">' +
            '<span class="text-xl font-bold text-white">CAFEINO</span>' +
            '<button id="menuCloseBtn" class="p-2 text-gray-400 hover:text-white" aria-label="بستن">' + I('close', 22) + '</button>' +
          '</div>' +
          '<nav class="flex flex-col gap-1">' + mobileLinks + '</nav>' +
          '<a href="' + reservationHref() + '" class="mt-6 flex items-center justify-center gap-2 bg-cyan text-navy-950 font-semibold text-sm px-5 py-3 rounded-full">رزرو آنلاین</a>' +
        '</div>' +
      '</div>';

    document.getElementById('header').innerHTML = html;
  }

  /* ---------------- Footer ---------------- */
  function renderFooter() {
    var c = D.CONTACT_INFO;
    var html =
      '<footer class="bg-navy-950 border-t border-cyan/10 mt-0">' +
        '<div class="max-w-[1400px] mx-auto px-4 md:px-6 py-12">' +
          '<div class="grid grid-cols-1 md:grid-cols-4 gap-8">' +
            '<div class="md:col-span-1">' +
              '<div class="flex flex-col gap-1 mb-4">' +
                '<span class="text-2xl font-bold text-white">CAFEINO</span>' +
                '<span class="text-[10px] text-cyan/70 font-medium tracking-widest">CAFE & RESTAURANT</span>' +
              '</div>' +
              '<div class="flex items-center gap-3 mt-4">' +
                socialIcon('instagram', 'https://instagram.com/' + c.instagram.replace('@', '')) +
                socialIcon('telegram', 'https://t.me/' + c.telegram.replace('@', '')) +
                socialIcon('whatsapp', 'https://wa.me/' + c.whatsapp.replace(/\D/g, '')) +
              '</div>' +
            '</div>' +
            '<div>' +
              '<h4 class="text-cyan font-semibold text-sm mb-4">تماس با ما</h4>' +
              '<ul class="space-y-3 text-sm text-gray-400">' +
                '<li class="flex items-start gap-2">' + I('mapPin', 16) + '<span>' + c.address + '</span></li>' +
                '<li class="flex items-center gap-2">' + I('phone', 16) + '<span dir="ltr">' + c.phone + '</span></li>' +
                '<li class="flex items-center gap-2">' + I('clock', 16) + '<span>' + c.hours + '</span></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4 class="text-cyan font-semibold text-sm mb-4">ساعات کاری</h4>' +
              '<p class="text-sm text-gray-400 mb-1">هر روز هفته</p>' +
              '<p class="text-lg font-semibold text-white" dir="ltr">۱۲:۰۰ - ۲۴:۰۰</p>' +
            '</div>' +
            '<div>' +
              '<h4 class="text-cyan font-semibold text-sm mb-4">خبرنامه</h4>' +
              '<p class="text-xs text-gray-400 mb-3 leading-relaxed">با عضویت در خبرنامه کافئینو، از تخفیف‌ها و رویدادهای جدید باخبر شوید.</p>' +
              '<form class="flex gap-2" onsubmit="return false;">' +
                '<input type="email" placeholder="ایمیل خود را وارد کنید" class="input-field flex-1 text-sm" aria-label="ایمیل">' +
                '<button type="submit" class="shrink-0 bg-cyan text-navy-950 rounded-xl px-3.5 py-2 hover:bg-cyan-light transition-colors" aria-label="ثبت">' + I('send', 18) + '</button>' +
              '</form>' +
            '</div>' +
          '</div>' +
          '<div class="mt-10 pt-6 border-t border-cyan/10 flex flex-col md:flex-row items-center justify-between gap-3">' +
            '<p class="text-xs text-gray-500">© ۱۴۰۳ کافئینو. تمامی حقوق محفوظ است.</p>' +
            '<div class="flex items-center gap-4 text-xs text-gray-500">' +
              '<a href="' + root + 'pages/menu.html" class="hover:text-cyan transition-colors">منو</a>' +
              '<a href="' + root + 'pages/reservation.html" class="hover:text-cyan transition-colors">رزرو</a>' +
              '<a href="' + root + 'pages/reels.html" class="hover:text-cyan transition-colors">ریلزها</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
    document.getElementById('footer').innerHTML = html;
  }

  function socialIcon(name, url) {
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-full border border-cyan/20 text-cyan hover:bg-cyan hover:text-navy-950 transition-all duration-300" aria-label="' + name + '">' + I(name, 18) + '</a>';
  }

  /* ---------------- Shared behaviors ---------------- */
  function initHeader() {
    var header = document.getElementById('siteHeader');
    function onScroll() {
      if (window.scrollY > 30) {
        header.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-navy-950/90 backdrop-blur-md border-b border-cyan/10 py-2';
      } else {
        header.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-4';
      }
    }
    window.addEventListener('scroll', onScroll);

    var menu = document.getElementById('mobileMenu');
    var panel = document.getElementById('mobilePanel');
    function open() {
      menu.classList.remove('opacity-0', 'invisible');
      panel.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.add('opacity-0', 'invisible');
      panel.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }
    document.getElementById('menuOpenBtn').addEventListener('click', open);
    document.getElementById('menuCloseBtn').addEventListener('click', close);
    document.getElementById('mobileBackdrop').addEventListener('click', close);
  }

  function initScrollReveal() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- ReelCard (shared) ---------------- */
  function reelCardHtml(reel) {
    var progressId = 'prog-' + reel.id + '-' + Math.random().toString(36).slice(2, 7);
    // progress handled per-card via data attributes; we animate width in initReelCards
    return (
      '<div class="reel-card relative w-full rounded-3xl overflow-hidden border border-cyan/15 bg-navy-800 group" style="aspect-ratio:9/16" data-reel="' + reel.id + '">' +
        '<img src="' + reel.thumbnail + '" alt="' + reel.title + '" class="absolute inset-0 w-full h-full object-cover" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/40"></div>' +
        '<div class="absolute inset-0 bg-gradient-to-l from-navy-950/40 to-transparent"></div>' +
        '<div class="absolute inset-0 flex items-center justify-center">' +
          '<button class="p-4 rounded-full bg-cyan/20 backdrop-blur-sm border border-cyan/30 text-cyan hover:bg-cyan hover:text-navy-950 transition-all duration-300 group-hover:scale-110" aria-label="پخش">' + I('play', 28) + '</button>' +
        '</div>' +
        '<button class="absolute top-3 left-3 p-1.5 text-white/70 hover:text-white transition-colors" aria-label="بیشتر">' + I('more', 20) + '</button>' +
        '<div class="absolute bottom-16 right-3 flex flex-col items-center gap-4">' +
          '<button class="reel-like flex flex-col items-center gap-1" aria-label="پسندیدن">' +
            I('heart', 22) + '<span class="text-white text-[10px] font-medium">' + reel.likes + '</span>' +
          '</button>' +
          '<div class="flex flex-col items-center gap-1">' + I('chat', 22) + '<span class="text-white text-[10px] font-medium">۷۸</span></div>' +
          '<button class="reel-save flex flex-col items-center gap-1" aria-label="ذخیره">' + I('bookmark', 22) + '</button>' +
          '<button class="flex flex-col items-center gap-1" aria-label="اشتراک">' + I('share', 22) + '</button>' +
        '</div>' +
        '<div class="absolute bottom-0 right-0 left-0 p-4 pr-12">' +
          '<p class="text-white text-sm font-semibold mb-1">' + reel.title + '</p>' +
          '<div class="flex items-center gap-2 text-gray-300 text-xs">' + I('play', 12) + '<span>' + reel.views + ' بازدید</span></div>' +
        '</div>' +
        '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">' +
          '<div class="reel-progress h-full bg-cyan transition-all duration-75" style="width:0%"></div>' +
        '</div>' +
      '</div>'
    );
  }

  function initReelCards(scope) {
    (scope || document).querySelectorAll('.reel-card').forEach(function (card) {
      var likedBtn = card.querySelector('.reel-like');
      var savedBtn = card.querySelector('.reel-save');
      var heart = likedBtn.querySelector('svg');
      var bookmark = savedBtn.querySelector('svg');
      var liked = false, saved = false;
      likedBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        liked = !liked;
        heart.style.color = liked ? '#f87171' : '#fff';
        heart.style.fill = liked ? 'currentColor' : 'none';
        heart.style.transform = liked ? 'scale(1.1)' : 'scale(1)';
      });
      savedBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        saved = !saved;
        bookmark.style.color = saved ? '#63bac6' : '#fff';
        bookmark.style.fill = saved ? 'currentColor' : 'none';
        bookmark.style.transform = saved ? 'scale(1.1)' : 'scale(1)';
      });
      // animated progress bar (ported from ReelCard's interval)
      var bar = card.querySelector('.reel-progress');
      if (bar) {
        var progress = 0;
        setInterval(function () {
          progress = progress >= 100 ? 0 : progress + 0.5;
          bar.style.width = progress + '%';
        }, 80);
      }
    });
  }

  /* ---------------- HOMEPAGE ---------------- */
  function buildHome() {
    var html = '<main>';
    html += buildHero();
    html += '<div class="outer-frame">';
    html += buildStoryCategories();
    html += buildClipsReels();
    html += buildReservationSection();
    html += buildAboutSection();
    html += buildGallerySection();
    html += buildSocialSection();
    html += buildContactSection();
    html += '</div></main>';
    document.getElementById('app').innerHTML = html;

    initHero();
    initReservationSection();
    initReelCards(document);
  }

  function buildHero() {
    var slidesBg = D.HERO_SLIDES.map(function (s, i) {
      return '<div class="hero-slide absolute inset-0 transition-opacity duration-1000" style="opacity:' + (i === 0 ? 1 : 0) + '">' +
        '<img src="' + s.image + '" alt="" class="w-full h-full object-cover" loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
        '<div class="absolute inset-0 bg-gradient-to-l from-navy-950/95 via-navy-950/80 to-navy-950/50"></div>' +
        '<div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60"></div>' +
      '</div>';
    }).join('');

    var features = D.HERO_FEATURES.map(function (f) {
      return '<div class="flex items-center gap-2.5">' +
        '<div class="p-2 rounded-full border border-cyan/20 bg-navy-800/50">' + I(f.icon, 18) + '</div>' +
        '<div><p class="text-white text-sm font-semibold">' + f.title + '</p><p class="text-gray-400 text-xs">' + f.text + '</p></div>' +
      '</div>';
    }).join('');

    var dots = D.HERO_SLIDES.map(function (_, i) {
      return '<button data-slide="' + i + '" class="hero-dot h-1.5 rounded-full transition-all duration-300 ' + (i === 0 ? 'w-8 bg-cyan' : 'w-1.5 bg-cyan/30') + '" aria-label="اسلاید ' + (i + 1) + '"></button>';
    }).join('');

    return (
      '<section class="relative min-h-[100vh] flex items-center pt-24 pb-12 px-4 md:px-6 overflow-hidden">' +
        slidesBg +
        '<div class="relative z-10 max-w-[1400px] mx-auto w-full">' +
          '<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">' +
            '<div class="lg:col-span-7 text-right">' +
              '<div class="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-6">' + I('sparkles', 14) + '<span class="text-cyan text-xs font-medium">به کافئینو خوش آمدید</span></div>' +
              '<div id="heroText" class="animate-fade-in">' +
                '<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"><span class="hero-t1"></span><br><span class="text-gradient-cyan hero-t2"></span></h1>' +
                '<p class="hero-sub text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mb-8"></p>' +
              '</div>' +
              '<div class="flex flex-wrap items-center gap-4 mb-10">' +
                '<a href="' + reservationHref() + '" class="inline-flex items-center gap-2 bg-cyan text-navy-950 font-semibold px-7 py-3.5 rounded-full hover:bg-cyan-light transition-all duration-300 shadow-lg shadow-cyan/20">' + I('table', 18) + 'رزرو میز</a>' +
                '<a href="' + root + 'pages/menu.html" class="inline-flex items-center gap-2 border-2 border-cyan/40 text-cyan font-semibold px-7 py-3.5 rounded-full hover:bg-cyan/10 transition-all duration-300">مشاهده منو' + I('arrowLeft', 18) + '</a>' +
              '</div>' +
              '<div class="flex flex-wrap items-center gap-6">' + features + '</div>' +
            '</div>' +
            '<div class="lg:col-span-5 flex justify-center lg:justify-start">' +
              '<div class="w-full max-w-[280px]">' +
                '<p class="text-cyan text-sm font-semibold mb-3 text-center lg:text-right">جدیدترین ریلز</p>' +
                reelCardHtml(D.FEATURED_REEL) +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="flex items-center justify-center lg:justify-end gap-4 mt-8">' +
            '<button id="heroPrev" class="p-2 rounded-full border border-cyan/20 text-cyan/60 hover:text-cyan hover:border-cyan/50 transition-all" aria-label="قبلی">' + I('chevronRight', 20) + '</button>' +
            '<div class="flex items-center gap-2">' + dots + '</div>' +
            '<button id="heroNext" class="p-2 rounded-full border border-cyan/20 text-cyan/60 hover:text-cyan hover:border-cyan/50 transition-all" aria-label="بعدی">' + I('chevronLeft', 20) + '</button>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function initHero() {
    var slides = D.HERO_SLIDES;
    var idx = 0;
    var slideEls = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.hero-dot');
    var textEl = document.getElementById('heroText');

    function render() {
      slideEls.forEach(function (el, i) { el.style.opacity = i === idx ? 1 : 0; });
      dots.forEach(function (d, i) {
        d.className = 'hero-dot h-1.5 rounded-full transition-all duration-300 ' + (i === idx ? 'w-8 bg-cyan' : 'w-1.5 bg-cyan/30');
      });
      textEl.classList.remove('animate-fade-in');
      void textEl.offsetWidth;
      textEl.classList.add('animate-fade-in');
      textEl.querySelector('.hero-t1').textContent = slides[idx].title1;
      textEl.querySelector('.hero-t2').textContent = slides[idx].title2;
      textEl.querySelector('.hero-sub').textContent = slides[idx].subtitle;
    }
    function next() { idx = (idx + 1) % slides.length; render(); }
    function prev() { idx = (idx - 1 + slides.length) % slides.length; render(); }

    var timer = setInterval(next, 6000);
    function reset() { clearInterval(timer); timer = setInterval(next, 6000); }
    document.getElementById('heroNext').addEventListener('click', function () { next(); reset(); });
    document.getElementById('heroPrev').addEventListener('click', function () { prev(); reset(); });
    dots.forEach(function (d) {
      d.addEventListener('click', function () { idx = parseInt(d.getAttribute('data-slide'), 10); render(); reset(); });
    });
    render();
  }

  function buildStoryCategories() {
    var items = D.STORY_CATEGORIES.map(function (cat) {
      return '<a href="' + root + 'pages/reels.html" class="flex flex-col items-center gap-2 shrink-0 group">' +
        '<div class="relative w-20 h-20 md:w-24 md:h-24">' +
          '<div class="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-cyan to-cyan/20"><div class="w-full h-full rounded-full overflow-hidden bg-navy-800"><img src="' + cat.image + '" alt="' + cat.name + '" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"></div></div>' +
          '<div class="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-navy-900 border border-cyan/30">' + I(cat.icon, 14) + '</div>' +
        '</div>' +
        '<span class="text-xs text-gray-300 group-hover:text-cyan transition-colors max-w-[80px] text-center leading-tight">' + cat.name + '</span>' +
      '</a>';
    }).join('');

    return '<section class="py-12 px-4 md:px-6 reveal">' +
      '<div class="max-w-[1400px] mx-auto">' +
        '<div class="flex items-center gap-3 mb-8"><div class="p-2 rounded-full bg-cyan/10 border border-cyan/20">' + I('sparkles', 18) + '</div><h2 class="text-xl md:text-2xl font-bold text-white">لحظه‌های کافئینو</h2></div>' +
        '<div class="flex gap-5 overflow-x-auto no-scrollbar pb-2" style="scrollbar-width:none">' + items + '</div>' +
      '</div>' +
    '</section>';
  }

  function buildClipsReels() {
    var cards = D.REELS.map(function (reel) {
      return '<a href="' + root + 'pages/reels.html" class="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-cyan/10 bg-navy-800 card-hover">' +
        '<img src="' + reel.thumbnail + '" alt="' + reel.title + '" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/30"></div>' +
        '<div class="absolute inset-0 flex items-center justify-center"><div class="p-3 rounded-full bg-cyan/20 backdrop-blur-sm border border-cyan/30 text-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300">' + I('play', 20) + '</div></div>' +
        '<button class="absolute top-2 left-2 text-white/60 hover:text-white p-1" aria-label="بیشتر">' + I('more', 16) + '</button>' +
        '<div class="absolute bottom-0 right-0 left-0 p-3"><p class="text-white text-xs font-semibold mb-1 line-clamp-2">' + reel.title + '</p><div class="flex items-center gap-1.5 text-gray-300 text-[10px]">' + I('play', 10) + '<span>' + reel.views + '</span></div></div>' +
      '</a>';
    }).join('');

    return '<section class="py-12 px-4 md:px-6 reveal"><div class="max-w-[1400px] mx-auto">' +
      '<div class="flex items-center justify-between mb-8"><div class="flex items-center gap-3"><div class="p-2 rounded-full bg-cyan/10 border border-cyan/20">' + I('film', 18) + '</div><h2 class="text-xl md:text-2xl font-bold text-white">کلیپ‌ها و ریلزها</h2></div>' +
      '<a href="' + root + 'pages/reels.html" class="flex items-center gap-1.5 text-sm text-cyan/70 hover:text-cyan transition-colors">مشاهده همه' + I('arrowLeft', 16) + '</a></div>' +
      '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">' + cards + '</div>' +
    '</div></section>';
  }

  function buildReservationSection() {
    var guestOpts = [1,2,3,4,5,6,7,8].map(function (n) { return '<option value="' + n + '">' + n + ' نفر</option>'; }).join('') + '<option value="9+">بیشتر از ۸ نفر</option>';
    var timeOpts = ['12:00','13:00','14:00','16:00','18:00','19:00','20:00','21:00','22:00'].map(function (t) { return '<option value="' + t + '">' + t + '</option>'; }).join('');

    return '<section class="py-12 px-4 md:px-6 reveal"><div class="max-w-[1400px] mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">' +
      '<div class="relative rounded-3xl overflow-hidden border border-cyan/15 bg-navy-800 p-8"><div class="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full blur-3xl"></div><div class="relative z-10">' +
        '<div class="flex items-center gap-3 mb-3"><div class="p-2 rounded-full bg-cyan/10 border border-cyan/20">' + I('table', 20) + '</div><h3 class="text-2xl font-bold text-white">رزرو میز</h3></div>' +
        '<p class="text-gray-400 text-sm mb-6 leading-relaxed">میز دلخواه خود را برای یک تجربه خاص رزرو کنید.</p>' +
        '<div id="resSectionForm">' +
          '<form class="space-y-4">' +
            '<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">' +
              '<div><label class="block text-xs text-gray-400 mb-1.5">تعداد نفرات</label><select class="input-field text-sm res-guests">' + guestOpts + '</select></div>' +
              '<div><label class="block text-xs text-gray-400 mb-1.5">ساعت</label><select class="input-field text-sm res-time" required><option value="" disabled>انتخاب ساعت</option>' + timeOpts + '</select></div>' +
              '<div><label class="block text-xs text-gray-400 mb-1.5">تاریخ</label><input type="date" class="input-field text-sm res-date" required></div>' +
            '</div>' +
            '<button type="submit" class="w-full bg-cyan text-navy-950 font-semibold py-3.5 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2">' + I('search', 18) + 'جستجو و رزرو</button>' +
          '</form>' +
        '</div>' +
      '</div></div>' +
      '<div class="relative rounded-3xl overflow-hidden border border-cyan/15 group min-h-[300px]">' +
        '<img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80" alt="مراسم و جشن‌ها" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-l from-navy-950/95 via-navy-950/70 to-navy-950/30"></div>' +
        '<div class="relative z-10 h-full flex flex-col justify-end p-8">' +
          '<div class="flex items-center gap-3 mb-3"><div class="p-2 rounded-full bg-cyan/10 border border-cyan/20 backdrop-blur-sm">' + I('calendar', 20) + '</div><h3 class="text-2xl font-bold text-white">مراسم و جشن‌ها</h3></div>' +
          '<p class="text-gray-300 text-sm mb-6 leading-relaxed max-w-sm">برای مراسم خاص خود، فضایی خصوصی و به‌یادماندنی با امکانات ویژه رزرو کنید.</p>' +
          '<a href="' + root + 'pages/events.html" class="inline-flex items-center gap-2 border-2 border-cyan/40 text-cyan font-semibold px-6 py-3 rounded-full hover:bg-cyan/10 transition-all duration-300 w-fit">اطلاعات بیشتر' + I('arrowLeft', 18) + '</a>' +
        '</div>' +
      '</div>' +
    '</div></div></section>';
  }

  function initReservationSection() {
    var wrap = document.getElementById('resSectionForm');
    if (!wrap) return;
    var form = wrap.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      wrap.innerHTML =
        '<div class="flex flex-col items-center justify-center py-12 text-center">' +
          '<div class="p-4 rounded-full bg-cyan/10 border border-cyan/30 mb-4">' + I('check', 32) + '</div>' +
          '<p class="text-white text-lg font-semibold mb-2">رزرو شما با موفقیت ثبت شد</p>' +
          '<p class="text-gray-400 text-sm">به زودی با شما تماس خواهیم گرفت.</p>' +
        '</div>';
      setTimeout(function () { /* keep success state; original resets after 5s but we keep it simple */ }, 5000);
    });
  }

  function buildAboutSection() {
    var feats = D.ABOUT_FEATURES.map(function (f) {
      return '<div class="flex items-start gap-3 p-3 rounded-2xl bg-navy-800/50 border border-cyan/10"><div class="p-2 rounded-full bg-cyan/10 shrink-0">' + I(f.icon, 18) + '</div><div><p class="text-white text-sm font-semibold">' + f.title + '</p><p class="text-gray-400 text-xs">' + f.text + '</p></div></div>';
    }).join('');

    return '<section class="py-12 px-4 md:px-6 reveal"><div class="max-w-[1400px] mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">' +
      '<div class="grid grid-cols-3 gap-3 h-[400px]">' +
        '<div class="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-cyan/10"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" alt="فضای کافئینو" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy"></div>' +
        '<div class="col-span-1 rounded-2xl overflow-hidden border border-cyan/10"><img src="https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=400&q=80" alt="قهوه کافئینو" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy"></div>' +
        '<div class="col-span-1 rounded-2xl overflow-hidden border border-cyan/10"><img src="https://images.unsplash.com/photo-1551024601-b5117d5f5d8f?w=400&q=80" alt="دسر کافئینو" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy"></div>' +
      '</div>' +
      '<div>' +
        '<div class="flex items-center gap-3 mb-4"><div class="p-2 rounded-full bg-cyan/10 border border-cyan/20">' + I('home', 18) + '</div><h2 class="text-2xl font-bold text-white">درباره کافئینو</h2></div>' +
        '<p class="text-gray-300 text-sm md:text-base leading-relaxed mb-6">کافئینو جایی است برای آرامش، لذت و تجربه طعم‌های به‌یادماندنی. ما تلاش می‌کنیم با ترکیب قهوه باکیفیت، غذای تازه، فضای دلنشین و میزبانی حرفه‌ای، لحظه‌هایی متفاوت برای شما خلق کنیم.</p>' +
        '<div class="grid grid-cols-2 gap-4 mb-8">' + feats + '</div>' +
        '<a href="' + root + 'pages/about.html" class="inline-flex items-center gap-2 border-2 border-cyan/40 text-cyan font-semibold px-6 py-3 rounded-full hover:bg-cyan/10 transition-all duration-300">بیشتر درباره ما' + I('arrowLeft', 18) + '</a>' +
      '</div>' +
    '</div></div></section>';
  }

  function buildGallerySection() {
    var imgs = D.GALLERY_IMAGES.slice(0, 8).map(function (img, i) {
      var big = (i === 0 || i === 5);
      return '<div class="relative rounded-2xl overflow-hidden border border-cyan/10 group cursor-pointer' + (big ? ' col-span-2 row-span-2' : '') + '" style="aspect-ratio:' + (big ? '1/1' : '3/4') + '">' +
        '<img src="' + img.src + '" alt="' + img.alt + '" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">' +
        '<div class="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors duration-300"></div>' +
      '</div>';
    }).join('');

    return '<section class="py-12 px-4 md:px-6 reveal"><div class="max-w-[1400px] mx-auto">' +
      '<div class="flex items-center justify-between mb-8"><div class="flex items-center gap-3"><div class="p-2 rounded-full bg-cyan/10 border border-cyan/20">' + I('camera', 18) + '</div><h2 class="text-xl md:text-2xl font-bold text-white">گالری تصاویر</h2></div>' +
      '<a href="' + root + 'pages/gallery.html" class="flex items-center gap-1.5 text-sm text-cyan/70 hover:text-cyan transition-colors">مشاهده همه' + I('arrowLeft', 16) + '</a></div>' +
      '<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">' + imgs + '</div>' +
    '</div></section>';
  }

  function buildSocialSection() {
    var images = D.REELS.slice(0, 3).map(function (r) { return r.thumbnail; }).concat(D.GALLERY_IMAGES.slice(0, 3).map(function (g) { return g.src; }));
    var tiles = images.map(function (src) {
      return '<div class="relative aspect-square rounded-xl overflow-hidden border border-cyan/10 group"><img src="' + src + '" alt="پست اینستاگرام" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"><div class="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors"></div></div>';
    }).join('');

    return '<section class="py-12 px-4 md:px-6 reveal"><div class="max-w-[1400px] mx-auto text-center">' +
      '<div class="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">' + I('instagram', 16) + '<span class="text-cyan text-xs font-medium">@cafeino</span></div>' +
      '<h2 class="text-xl md:text-2xl font-bold text-white mb-3">ما را در اینستاگرام دنبال کنید</h2>' +
      '<p class="text-gray-400 text-sm mb-8 max-w-lg mx-auto">لحظه‌های روزمره کافئینو، قهوه‌های تازه، غذاهای خوشمزه و فضای دنج ما را در اینستاگرام ببینید.</p>' +
      '<div class="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">' + tiles + '</div>' +
      '<a href="https://instagram.com/cafeino" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-gradient-to-l from-cyan to-cyan-light text-navy-950 font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity">' + I('instagram', 18) + 'مشاهده اینستاگرام</a>' +
    '</div></section>';
  }

  function buildContactSection() {
    var c = D.CONTACT_INFO;
    return '<section class="py-12 px-4 md:px-6 reveal"><div class="max-w-[1400px] mx-auto">' +
      '<div class="flex items-center gap-3 mb-8"><div class="p-2 rounded-full bg-cyan/10 border border-cyan/20">' + I('phone', 18) + '</div><h2 class="text-xl md:text-2xl font-bold text-white">تماس با ما</h2></div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">' +
        contactCard('mapPin', 'آدرس', c.address, false) +
        contactCard('phone', 'تلفن', c.phone, true) +
        contactCard('clock', 'ساعات کاری', c.hours, false) +
        '<div class="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover"><div class="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">' + I('instagram', 20) + '</div><h3 class="text-white text-sm font-semibold mb-1">شبکه‌های اجتماعی</h3>' +
          '<div class="flex items-center gap-2 mt-2">' +
            socialIcon('instagram', 'https://instagram.com/' + c.instagram.replace('@', '')) +
            socialIcon('telegram', 'https://t.me/' + c.telegram.replace('@', '')) +
            socialIcon('whatsapp', 'https://wa.me/' + c.whatsapp.replace(/\D/g, '')) +
          '</div></div>' +
      '</div>' +
      '<div class="mt-6 rounded-3xl overflow-hidden border border-cyan/15 h-[200px] md:h-[300px] relative bg-navy-800"><iframe src="https://www.openstreetmap.org/export/embed.html?bbox=51.389,35.696,51.419,35.716&layer=mapnik" class="w-full h-full" style="border:0;filter:invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1)" loading="lazy" title="نقشه کافئینو"></iframe></div>' +
    '</div></section>';
  }

  function contactCard(icon, title, value, ltr) {
    return '<div class="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover"><div class="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">' + I(icon, 20) + '</div><h3 class="text-white text-sm font-semibold mb-1">' + title + '</h3><p class="text-gray-400 text-sm" ' + (ltr ? 'dir="ltr"' : '') + '>' + value + '</p></div>';
  }

  /* ---------------- MENU PAGE ---------------- */
  function buildMenu() {
    var cats = D.MENU_CATEGORIES.map(function (cat) {
      return '<button data-cat="' + cat.id + '" class="menu-cat shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 bg-navy-800 text-gray-400 border border-cyan/10 hover:border-cyan/30">' + I(cat.icon, 14) + cat.name + '</button>';
    }).join('');

    var html =
      '<main class="min-h-screen pt-20 px-4 md:px-6 pb-16"><div class="max-w-[1400px] mx-auto">' +
        pageHeading('coffee', 'منوی کافئینو', 'منوی آنلاین', 'از قهوه صبحگاهی تا شام ویژه، همه چیز برای یک تجربه خوشمزه.') +
        '<div class="relative max-w-md mx-auto mb-6"><input type="text" id="menuSearch" placeholder="جستجو در منو..." class="input-field pr-10">' + '<span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">' + I('search', 18) + '</span></div>' +
        '<div class="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 justify-start md:justify-center">' +
          '<button data-cat="all" class="menu-cat shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all bg-cyan text-navy-950">همه</button>' + cats +
        '</div>' +
        '<div id="menuGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>' +
      '</div></main>';
    document.getElementById('app').innerHTML = html;
    initMenu();
  }

  function initMenu() {
    var activeCat = 'all';
    var search = '';
    var grid = document.getElementById('menuGrid');

    function render() {
      var items = D.MENU_ITEMS;
      if (activeCat !== 'all') items = items.filter(function (i) { return i.category === activeCat; });
      if (search) items = items.filter(function (i) { return i.name.indexOf(search) !== -1 || i.description.indexOf(search) !== -1; });

      if (items.length === 0) {
        grid.innerHTML = '<div class="text-center py-16 text-gray-500"><p class="text-lg">موردی یافت نشد</p></div>';
        return;
      }
      grid.innerHTML = items.map(function (item) {
        return '<button data-item="' + item.id + '" class="menu-item text-right rounded-2xl overflow-hidden border border-cyan/10 bg-navy-800 card-hover hover:border-cyan/25">' +
          '<div class="relative aspect-[4/3] overflow-hidden">' +
            '<img src="' + item.image + '" alt="' + item.name + '" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy">' +
            (item.featured ? '<span class="absolute top-2 right-2 bg-cyan text-navy-950 text-[10px] font-bold px-2 py-1 rounded-full">پیشنهادی</span>' : '') +
            (!item.available ? '<div class="absolute inset-0 bg-navy-950/70 flex items-center justify-center"><span class="text-white text-sm">ناموجود</span></div>' : '') +
          '</div>' +
          '<div class="p-4"><div class="flex items-start justify-between gap-2 mb-1"><h3 class="text-white font-semibold text-sm">' + item.name + '</h3><span class="text-cyan font-bold text-sm shrink-0" dir="ltr">' + D.formatPrice(item.price) + '</span></div>' +
          '<p class="text-gray-400 text-xs leading-relaxed line-clamp-2">' + item.description + '</p></div>' +
        '</button>';
      }).join('');
    }

    document.querySelectorAll('.menu-cat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCat = btn.getAttribute('data-cat');
        document.querySelectorAll('.menu-cat').forEach(function (b) {
          var a = b.getAttribute('data-cat') === activeCat;
          b.className = 'menu-cat shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ' + (a ? 'bg-cyan text-navy-950' : 'bg-navy-800 text-gray-400 border border-cyan/10 hover:border-cyan/30') + (b.querySelector('svg') ? ' flex items-center gap-1.5' : '');
        });
        render();
      });
    });

    document.getElementById('menuSearch').addEventListener('input', function (e) { search = e.target.value; render(); });

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('.menu-item');
      if (!btn) return;
      var id = btn.getAttribute('data-item');
      var item = D.MENU_ITEMS.find(function (m) { return m.id === id; });
      if (item) openMenuModal(item);
    });
    render();
  }

  function openMenuModal(item) {
    var ingrs = item.ingredients ? '<div class="mb-4"><h3 class="text-cyan text-xs font-semibold mb-2">مواد تشکیل‌دهنده</h3><div class="flex flex-wrap gap-2">' +
      item.ingredients.map(function (ing) { return '<span class="text-xs text-gray-300 bg-navy-800 px-3 py-1 rounded-full border border-cyan/10">' + ing + '</span>'; }).join('') + '</div></div>' : '';

    var overlay = document.createElement('div');
    overlay.id = 'menuModal';
    overlay.className = 'fixed inset-0 z-[70] flex items-center justify-center p-4';
    overlay.innerHTML =
      '<div class="modal-backdrop absolute inset-0 bg-navy-950/80 backdrop-blur-sm"></div>' +
      '<div class="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden border border-cyan/20 bg-navy-900">' +
        '<div class="relative aspect-[16/10] overflow-hidden"><img src="' + item.image + '" alt="' + item.name + '" class="w-full h-full object-cover">' +
        '<button class="menu-modal-close absolute top-3 left-3 p-2 rounded-full bg-navy-950/70 text-white hover:bg-navy-950 transition-colors" aria-label="بستن">' + I('close', 20) + '</button></div>' +
        '<div class="p-6">' +
          '<div class="flex items-start justify-between mb-3"><h2 class="text-xl font-bold text-white">' + item.name + '</h2>' + (item.featured ? '<span class="bg-cyan text-navy-950 text-[10px] font-bold px-2 py-1 rounded-full">پیشنهادی</span>' : '') + '</div>' +
          '<p class="text-gray-400 text-sm leading-relaxed mb-4">' + item.description + '</p>' + ingrs +
          '<div class="flex items-center justify-between pt-4 border-t border-cyan/10"><span class="text-gray-400 text-sm">قیمت</span><span class="text-cyan font-bold text-lg" dir="ltr">' + D.formatPrice(item.price) + '</span></div>' +
          '<a href="' + reservationHref() + '" class="mt-4 w-full bg-cyan text-navy-950 font-semibold py-3 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2">' + I('table', 18) + 'رزرو میز برای این تجربه</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    function close() { overlay.remove(); document.body.style.overflow = ''; }
    overlay.querySelector('.menu-modal-close').addEventListener('click', close);
    overlay.querySelector('.modal-backdrop').addEventListener('click', close);
  }

  /* ---------------- GALLERY PAGE ---------------- */
  function buildGallery() {
    var cats = [{ id: 'all', label: 'همه' }, { id: 'coffee', label: 'قهوه' }, { id: 'food', label: 'غذا' }, { id: 'dessert', label: 'دسر' }, { id: 'space', label: 'فضا' }, { id: 'events', label: 'رویدادها' }];
    var tabs = cats.map(function (c) {
      return '<button data-filter="' + c.id + '" class="gallery-filter shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ' + (c.id === 'all' ? 'bg-cyan text-navy-950' : 'bg-navy-800 text-gray-400 border border-cyan/10 hover:border-cyan/30') + '">' + c.label + '</button>';
    }).join('');

    var html =
      '<main class="min-h-screen pt-20 px-4 md:px-6 pb-16"><div class="max-w-[1400px] mx-auto">' +
        pageHeading('camera', 'گالری', 'گالری کافئینو', 'لحظه‌های زیبای کافئینو را کشف کنید.') +
        '<div class="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 justify-center">' + tabs + '</div>' +
        '<div id="galleryGrid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"></div>' +
      '</div></main>';
    document.getElementById('app').innerHTML = html;
    initGallery();
  }

  function initGallery() {
    var filter = 'all';
    var grid = document.getElementById('galleryGrid');
    function render() {
      var imgs = filter === 'all' ? D.GALLERY_IMAGES : D.GALLERY_IMAGES.filter(function (g) { return g.category === filter; });
      grid.innerHTML = imgs.map(function (img, i) {
        var big = i % 5 === 0;
        return '<div class="gallery-item relative rounded-2xl overflow-hidden border border-cyan/10 group cursor-pointer' + (big ? ' row-span-2' : '') + '" style="aspect-ratio:' + (big ? '3/4' : '1/1') + '" data-src="' + img.src + '">' +
          '<img src="' + img.src + '" alt="' + img.alt + '" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">' +
          '<div class="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-colors duration-300 flex items-end p-3"><p class="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">' + img.alt + '</p></div>' +
        '</div>';
      }).join('');
    }
    document.querySelectorAll('.gallery-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.gallery-filter').forEach(function (b) {
          var a = b.getAttribute('data-filter') === filter;
          b.className = 'gallery-filter shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ' + (a ? 'bg-cyan text-navy-950' : 'bg-navy-800 text-gray-400 border border-cyan/10 hover:border-cyan/30');
        });
        render();
      });
    });
    grid.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery-item');
      if (!item) return;
      openLightbox(item.getAttribute('data-src'));
    });
    render();
  }

  function openLightbox(src) {
    var overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.className = 'fixed inset-0 z-[70] flex items-center justify-center p-4';
    overlay.innerHTML =
      '<div class="modal-backdrop absolute inset-0 bg-navy-950/90 backdrop-blur-sm"></div>' +
      '<img src="' + src + '" alt="" class="relative z-10 max-w-full max-h-[85vh] rounded-2xl border border-cyan/20">' +
      '<button class="lightbox-close absolute top-4 left-4 z-20 p-2 rounded-full bg-navy-800 text-white hover:bg-navy-700 transition-colors" aria-label="بستن">' + I('close', 24) + '</button>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    function close() { overlay.remove(); document.body.style.overflow = ''; }
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.modal-backdrop').addEventListener('click', close);
  }

  /* ---------------- RESERVATION PAGE ---------------- */
  function buildReservation() {
    var html =
      '<main class="min-h-screen pt-20 px-4 md:px-6 pb-16"><div class="max-w-[1400px] mx-auto">' +
        pageHeading('table', 'رزرو میز', 'رزرو آنلاین میز', 'میز دلخواه خود را برای یک تجربه خاص در کافئینو رزرو کنید.') +
        '<div id="resPageWrap" class="max-w-lg mx-auto"></div>' +
      '</div></main>';
    document.getElementById('app').innerHTML = html;
    initReservationPage();
  }

  function initReservationPage() {
    var wrap = document.getElementById('resPageWrap');
    var form = { name: '', phone: '', date: '', time: '', guests: '2', notes: '' };

    function renderForm() {
      var guestOpts = [1,2,3,4,5,6,7,8].map(function (n) { return '<option value="' + n + '"' + (String(form.guests) === String(n) ? ' selected' : '') + '>' + n + ' نفر</option>'; }).join('') + '<option value="9+" ' + (form.guests === '9+' ? ' selected' : '') + '>۸+</option>';
      var timeOpts = ['12:00','13:00','14:00','16:00','18:00','19:00','20:00','21:00','22:00'].map(function (t) { return '<option value="' + t + '"' + (form.time === t ? ' selected' : '') + '>' + t + '</option>'; }).join('');

      wrap.innerHTML =
        '<div class="max-w-lg mx-auto rounded-3xl border border-cyan/15 bg-navy-800 p-6 md:p-8">' +
          '<form class="space-y-4">' +
            '<div><label class="block text-xs text-gray-400 mb-1.5">نام و نام خانوادگی</label><input type="text" class="input-field text-sm rf-name" placeholder="نام خود را وارد کنید" value="' + esc(form.name) + '" required></div>' +
            '<div><label class="block text-xs text-gray-400 mb-1.5">شماره تماس</label><input type="tel" class="input-field text-sm rf-phone" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹" value="' + esc(form.phone) + '" required></div>' +
            '<div class="grid grid-cols-3 gap-3">' +
              '<div><label class="block text-xs text-gray-400 mb-1.5">تاریخ</label><input type="date" class="input-field text-sm rf-date" value="' + esc(form.date) + '" required></div>' +
              '<div><label class="block text-xs text-gray-400 mb-1.5">ساعت</label><select class="input-field text-sm rf-time" required><option value="" disabled>انتخاب</option>' + timeOpts + '</select></div>' +
              '<div><label class="block text-xs text-gray-400 mb-1.5">نفرات</label><select class="input-field text-sm rf-guests">' + guestOpts + '</select></div>' +
            '</div>' +
            '<div><label class="block text-xs text-gray-400 mb-1.5">توضیحات (اختیاری)</label><textarea class="input-field text-sm resize-none rf-notes" placeholder="درخواست‌های خاص خود را بنویسید..." rows="3">' + esc(form.notes) + '</textarea></div>' +
            '<button type="submit" class="w-full bg-cyan text-navy-950 font-semibold py-3.5 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2">' + I('search', 18) + 'جستجو و رزرو</button>' +
          '</form>' +
        '</div>';
      bind();
    }

    function bind() {
      var el = wrap;
      el.querySelector('.rf-name').addEventListener('input', function (e) { form.name = e.target.value; });
      el.querySelector('.rf-phone').addEventListener('input', function (e) { form.phone = e.target.value; });
      el.querySelector('.rf-date').addEventListener('input', function (e) { form.date = e.target.value; });
      el.querySelector('.rf-time').addEventListener('change', function (e) { form.time = e.target.value; });
      el.querySelector('.rf-guests').addEventListener('change', function (e) { form.guests = e.target.value; });
      el.querySelector('.rf-notes').addEventListener('input', function (e) { form.notes = e.target.value; });
      el.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        renderSuccess();
      });
    }

    function renderSuccess() {
      wrap.innerHTML =
        '<div class="max-w-lg mx-auto rounded-3xl border border-cyan/20 bg-navy-800 p-8 text-center">' +
          '<div class="inline-flex p-4 rounded-full bg-cyan/10 border border-cyan/30 mb-4">' + I('check', 36) + '</div>' +
          '<h2 class="text-2xl font-bold text-white mb-3">رزرو شما با موفقیت ثبت شد</h2>' +
          '<p class="text-gray-400 text-sm mb-6 leading-relaxed">کارشناسان ما به زودی با شما تماس خواهند گرفت تا رزرو شما را تأیید کنند.</p>' +
          '<div class="grid grid-cols-3 gap-3 mb-6 text-right">' +
            '<div class="p-3 rounded-xl bg-navy-900/50 border border-cyan/10"><p class="text-xs text-gray-500 mb-1">تاریخ</p><p class="text-sm text-white" dir="ltr">' + (form.date || '—') + '</p></div>' +
            '<div class="p-3 rounded-xl bg-navy-900/50 border border-cyan/10"><p class="text-xs text-gray-500 mb-1">ساعت</p><p class="text-sm text-white" dir="ltr">' + (form.time || '—') + '</p></div>' +
            '<div class="p-3 rounded-xl bg-navy-900/50 border border-cyan/10"><p class="text-xs text-gray-500 mb-1">نفرات</p><p class="text-sm text-white">' + form.guests + ' نفر</p></div>' +
          '</div>' +
          '<button class="res-new border-2 border-cyan/40 text-cyan font-semibold px-6 py-2.5 rounded-full hover:bg-cyan/10 transition-all">رزرو جدید</button>' +
        '</div>';
      wrap.querySelector('.res-new').addEventListener('click', function () {
        form.name = ''; form.phone = ''; form.date = ''; form.time = ''; form.guests = '2'; form.notes = '';
        renderForm();
      });
    }

    renderForm();
  }

  /* ---------------- EVENTS PAGE ---------------- */
  function buildEvents() {
    var cards = D.EVENTS.map(function (ev) {
      var services = ev.services.map(function (s) { return '<span class="text-xs text-gray-300 bg-navy-900/50 px-3 py-1 rounded-full border border-cyan/10">' + s + '</span>'; }).join('');
      return '<div class="rounded-3xl overflow-hidden border border-cyan/15 bg-navy-800 card-hover hover:border-cyan/25">' +
        '<div class="relative aspect-[4/3] overflow-hidden"><img src="' + ev.image + '" alt="' + ev.title + '" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div><span class="absolute top-3 right-3 bg-cyan/90 text-navy-950 text-xs font-bold px-3 py-1 rounded-full">' + ev.capacity + '</span></div>' +
        '<div class="p-5"><h2 class="text-lg font-bold text-white mb-2">' + ev.title + '</h2><p class="text-gray-400 text-sm leading-relaxed mb-4">' + ev.description + '</p>' +
        '<div class="mb-4"><h3 class="text-cyan text-xs font-semibold mb-2">امکانات</h3><div class="flex flex-wrap gap-2">' + services + '</div></div>' +
        '<a href="' + reservationHref() + '" class="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 text-cyan font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cyan hover:text-navy-950 transition-all">رزرو این مراسم' + I('arrowLeft', 16) + '</a>' +
        '</div></div>';
    }).join('');

    var html =
      '<main class="min-h-screen pt-20 px-4 md:px-6 pb-16"><div class="max-w-[1400px] mx-auto">' +
        pageHeading('calendar', 'مراسم و جشن‌ها', 'مراسم و جشن‌ها', 'برای مراسم خاص خود، فضایی خصوصی و به‌یادماندنی با امکانات ویژه رزرو کنید.') +
        '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">' + cards + '</div>' +
      '</div></main>';
    document.getElementById('app').innerHTML = html;
  }

  /* ---------------- ABOUT PAGE ---------------- */
  function buildAbout() {
    var feats = D.ABOUT_FEATURES.map(function (f) {
      return '<div class="p-6 rounded-2xl bg-navy-800/50 border border-cyan/10 card-hover text-center"><div class="inline-flex p-3 rounded-full bg-cyan/10 mb-3">' + I(f.icon, 24) + '</div><h3 class="text-white text-sm font-semibold mb-1">' + f.title + '</h3><p class="text-gray-400 text-xs">' + f.text + '</p></div>';
    }).join('');

    var html =
      '<main class="min-h-screen pt-20 px-4 md:px-6 pb-16"><div class="max-w-[1400px] mx-auto">' +
        pageHeading('home', 'درباره ما', 'درباره کافئینو', '') +
        '<div class="rounded-3xl overflow-hidden border border-cyan/15 mb-8 h-[300px] md:h-[400px] relative">' +
          '<img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80" alt="فضای کافئینو" class="w-full h-full object-cover">' +
          '<div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent"></div>' +
          '<div class="absolute bottom-0 right-0 left-0 p-6 md:p-10"><h2 class="text-2xl md:text-4xl font-bold text-white mb-3">جایی برای <span class="text-gradient-cyan">لحظه‌های به‌یادماندنی</span></h2><p class="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">کافئینو جایی است برای آرامش، لذت و تجربه طعم‌های به‌یادماندنی. ما تلاش می‌کنیم با ترکیب قهوه باکیفیت، غذای تازه، فضای دلنشین و میزبانی حرفه‌ای، لحظه‌هایی متفاوت برای شما خلق کنیم.</p></div>' +
        '</div>' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">' + feats + '</div>' +
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">' +
          '<div class="grid grid-cols-2 gap-3">' +
            '<div class="rounded-2xl overflow-hidden border border-cyan/10 aspect-square"><img src="https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=600&q=80" alt="قهوه" class="w-full h-full object-cover" loading="lazy"></div>' +
            '<div class="rounded-2xl overflow-hidden border border-cyan/10 aspect-square"><img src="https://images.unsplash.com/photo-1546069901-ba9599a7eaa5?w=600&q=80" alt="غذا" class="w-full h-full object-cover" loading="lazy"></div>' +
            '<div class="rounded-2xl overflow-hidden border border-cyan/10 aspect-square"><img src="https://images.unsplash.com/photo-1551024601-b5117d5f5d8f?w=600&q=80" alt="دسر" class="w-full h-full object-cover" loading="lazy"></div>' +
            '<div class="rounded-2xl overflow-hidden border border-cyan/10 aspect-square"><img src="https://images.unsplash.com/photo-1453614512568-c4021d66884c?w=600&q=80" alt="فضای شبانه" class="w-full h-full object-cover" loading="lazy"></div>' +
          '</div>' +
          '<div><h2 class="text-2xl font-bold text-white mb-4">داستان ما</h2>' +
          '<p class="text-gray-400 text-sm leading-relaxed mb-4">کافئینو با رویکردی متفاوت به دنیای قهوه و رستوران متولد شد. ما باور داریم که هر فنجان قهوه و هر بشقاب غذا، فرصتی است برای خلق یک خاطره.</p>' +
          '<p class="text-gray-400 text-sm leading-relaxed mb-4">از انتخاب دانه‌های قهوه تک‌ریشه تا استفاده از تازه‌ترین مواد اولیه در آشپزخانه، هر جزئیات برای تجربه‌ای خاص و متمایز طراحی شده است.</p>' +
          '<p class="text-gray-400 text-sm leading-relaxed mb-6">تیم حرفه‌ای ما، از باریستاها تا سرآشپزها، با عشق و تعهد، بهترین کیفیت را برای شما تضمین می‌کنند.</p>' +
          '<a href="' + root + 'pages/menu.html" class="inline-flex items-center gap-2 bg-cyan text-navy-950 font-semibold px-6 py-3 rounded-full hover:bg-cyan-light transition-colors">مشاهده منو' + I('arrowLeft', 18) + '</a>' +
        '</div>' +
      '</div></div></main>';
    document.getElementById('app').innerHTML = html;
  }

  /* ---------------- CONTACT PAGE ---------------- */
  function buildContact() {
    var c = D.CONTACT_INFO;
    var html =
      '<main class="min-h-screen pt-20 px-4 md:px-6 pb-16"><div class="max-w-[1400px] mx-auto">' +
        pageHeading('phone', 'تماس با ما', 'با ما در ارتباط باشید', 'هر سوال یا پیشنهادی دارید، خوشحال می‌شویم بشنویم.') +
        '<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">' +
          '<div class="lg:col-span-1 space-y-4">' +
            contactInfoCard('mapPin', 'آدرس', c.address, false) +
            contactInfoCard('phone', 'تلفن', c.phone, true) +
            contactInfoCard('clock', 'ساعات کاری', c.hours, false) +
            '<div class="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10"><h3 class="text-white text-sm font-semibold mb-3">شبکه‌های اجتماعی</h3><div class="flex items-center gap-3">' +
              socialIcon('instagram', 'https://instagram.com/' + c.instagram.replace('@', '')) +
              socialIcon('telegram', 'https://t.me/' + c.telegram.replace('@', '')) +
              socialIcon('whatsapp', 'https://wa.me/' + c.whatsapp.replace(/\D/g, '')) +
            '</div></div>' +
          '</div>' +
          '<div class="lg:col-span-2">' +
            '<div id="contactFormWrap" class="rounded-3xl border border-cyan/15 bg-navy-800 p-6 md:p-8"></div>' +
            '<div class="mt-6 rounded-3xl overflow-hidden border border-cyan/15 h-[250px]"><iframe src="https://www.openstreetmap.org/export/embed.html?bbox=51.389,35.696,51.419,35.716&layer=mapnik" class="w-full h-full" style="border:0;filter:invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1)" loading="lazy" title="نقشه کافئینو"></iframe></div>' +
          '</div>' +
        '</div>' +
      '</div></main>';
    document.getElementById('app').innerHTML = html;
    initContactForm();
  }

  function contactInfoCard(icon, title, value, ltr) {
    return '<div class="p-5 rounded-2xl bg-navy-800/50 border border-cyan/10"><div class="p-2.5 rounded-full bg-cyan/10 w-fit mb-3">' + I(icon, 20) + '</div><h3 class="text-white text-sm font-semibold mb-1">' + title + '</h3><p class="text-gray-400 text-sm" ' + (ltr ? 'dir="ltr"' : '') + '>' + value + '</p></div>';
  }

  function initContactForm() {
    var wrap = document.getElementById('contactFormWrap');
    var form = { name: '', email: '', message: '' };
    function renderForm() {
      wrap.innerHTML =
        '<form class="space-y-4">' +
          '<div><label class="block text-xs text-gray-400 mb-1.5">نام شما</label><input type="text" class="input-field text-sm cf-name" placeholder="نام خود را وارد کنید" value="' + esc(form.name) + '" required></div>' +
          '<div><label class="block text-xs text-gray-400 mb-1.5">ایمیل</label><input type="email" class="input-field text-sm cf-email" dir="ltr" placeholder="example@email.com" value="' + esc(form.email) + '" required></div>' +
          '<div><label class="block text-xs text-gray-400 mb-1.5">پیام</label><textarea class="input-field text-sm resize-none cf-message" placeholder="پیام خود را بنویسید..." rows="6" required>' + esc(form.message) + '</textarea></div>' +
          '<button type="submit" class="w-full bg-cyan text-navy-950 font-semibold py-3.5 rounded-xl hover:bg-cyan-light transition-colors flex items-center justify-center gap-2">' + I('send', 18) + 'ارسال پیام</button>' +
        '</form>';
      bind();
    }
    function bind() {
      wrap.querySelector('.cf-name').addEventListener('input', function (e) { form.name = e.target.value; });
      wrap.querySelector('.cf-email').addEventListener('input', function (e) { form.email = e.target.value; });
      wrap.querySelector('.cf-message').addEventListener('input', function (e) { form.message = e.target.value; });
      wrap.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        wrap.innerHTML =
          '<div class="flex flex-col items-center justify-center py-16 text-center">' +
            '<div class="p-4 rounded-full bg-cyan/10 border border-cyan/30 mb-4">' + I('check', 32) + '</div>' +
            '<p class="text-white text-lg font-semibold mb-2">پیام شما ارسال شد</p>' +
            '<p class="text-gray-400 text-sm">به زودی پاسخ خواهیم داد.</p>' +
          '</div>';
        setTimeout(function () { form.name = ''; form.email = ''; form.message = ''; renderForm(); }, 5000);
      });
    }
    renderForm();
  }

  /* ---------------- REELS PAGE ---------------- */
  function buildReels() {
    var cards = D.REELS.map(function (reel) {
      return '<div class="reel-tile cursor-pointer" data-reel="' + reel.id + '">' + reelCardHtml(reel) + '<p class="text-gray-400 text-xs mt-2 text-center">' + reel.category + '</p></div>';
    }).join('');

    var html =
      '<main class="min-h-screen pt-20 px-4 md:px-6 pb-16"><div class="max-w-[1400px] mx-auto">' +
        pageHeading('film', 'ریلزها', 'کلیپ‌ها و ریلزها', 'لحظه‌های زیبا و جذاب کافئینو را تماشا کنید.') +
        '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">' + cards + '</div>' +
      '</div></main>';
    document.getElementById('app').innerHTML = html;
    initReelsPage();
  }

  function initReelsPage() {
    initReelCards(document);
    document.querySelectorAll('.reel-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var id = tile.getAttribute('data-reel');
        var reel = D.REELS.find(function (r) { return r.id === id; });
        if (reel) openReelModal(reel);
      });
    });
  }

  function openReelModal(reel) {
    var overlay = document.createElement('div');
    overlay.id = 'reelModal';
    overlay.className = 'fixed inset-0 z-[70] flex items-center justify-center p-4';
    overlay.innerHTML =
      '<div class="modal-backdrop absolute inset-0 bg-navy-950/90 backdrop-blur-sm"></div>' +
      '<div class="relative z-10 w-full max-w-md">' +
        '<div class="flex items-center justify-between mb-3"><p class="text-white text-sm font-semibold">' + reel.title + '</p><button class="reel-close p-2 rounded-full bg-navy-800 text-white hover:bg-navy-700 transition-colors" aria-label="بستن">' + I('close', 20) + '</button></div>' +
        reelCardHtml(reel) +
        '<div class="mt-3 space-y-2"><p class="text-gray-400 text-xs leading-relaxed">' + reel.description + '</p>' +
        '<div class="flex items-center gap-3 text-xs text-gray-500"><span class="flex items-center gap-1">' + I('calendar', 12) + reel.date + '</span><span class="flex items-center gap-1">' + I('play', 12) + reel.views + ' بازدید</span></div>' +
        '<button class="reel-copy flex items-center gap-1.5 text-cyan/70 hover:text-cyan transition-colors text-xs">' + I('copy', 14) + '<span class="copy-label">کپی لینک</span></button></div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    initReelCards(overlay);
    function close() { overlay.remove(); document.body.style.overflow = ''; }
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.reel-close').addEventListener('click', close);
    overlay.querySelector('.modal-backdrop').addEventListener('click', close);
    overlay.querySelector('.reel-copy').addEventListener('click', function (e) {
      e.stopPropagation();
      var label = overlay.querySelector('.copy-label');
      if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
      label.textContent = 'لینک کپی شد';
      setTimeout(function () { label.textContent = 'کپی لینک'; }, 2000);
    });
  }

  /* ---------------- helpers ---------------- */
  function pageHeading(icon, badge, title, subtitle) {
    var sub = subtitle ? '<p class="text-gray-400 text-sm max-w-lg mx-auto">' + subtitle + '</p>' : '';
    return '<div class="text-center mb-10 pt-8">' +
      '<div class="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 mb-4">' + I(icon, 14) + '<span class="text-cyan text-xs font-medium">' + badge + '</span></div>' +
      '<h1 class="text-3xl md:text-5xl font-bold text-white mb-3">' + title + '</h1>' + sub + '</div>';
  }

  function esc(s) {
    return String(s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"');
  }

  /* ---------------- boot ---------------- */
  var PAGES = {
    home: buildHome,
    menu: buildMenu,
    gallery: buildGallery,
    reservation: buildReservation,
    events: buildEvents,
    about: buildAbout,
    contact: buildContact,
    reels: buildReels
  };

  function currentNavHref() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '' || path === 'index.html') return 'index.html';
    return 'pages/' + path;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var page = body.getAttribute('data-page');
    renderHeader(currentNavHref());
    renderFooter();
    initHeader();
    var builder = PAGES[page];
    if (builder) builder();
    initScrollReveal();
  });
})();
