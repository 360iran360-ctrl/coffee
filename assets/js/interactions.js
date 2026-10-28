/* ==========================================================================
   interactions.js — انیمیشن ورود بخش‌ها، دیالوگ‌های محتوا (خدمات، مقالات،
   آموزش‌ها، مشاوره) و بسط متن «درباره من». همه محتوا داخل همین فایل است؛
   هیچ درخواست شبکه‌ای انجام نمی‌شود.
   ========================================================================== */
(function () {
  'use strict';

  var CHECK = '<svg class="icon icon-sm" aria-hidden="true"><use href="#icon-check"></use></svg>';
  var PLACEHOLDER_ICON = '<svg class="icon icon-sm" aria-hidden="true"><use href="#icon-close"></use></svg>';

  /* ---------------- محتوای خدمات ---------------- */
  var SERVICES = {
    assessment: {
      detail: 'ارزیابی، نقطه شروع هر مسیر است. در این مرحله الگوهای حرکتی شما مشاهده و ثبت می‌شود تا مشخص شود کدام بخش از بدن در حرکت نقش مؤثر خود را ایفا نمی‌کند.',
      includes: [
        'مشاهده و ثبت الگوهای حرکتی پایه',
        'بررسی دامنه حرکتی مفاصل',
        'شناسایی عدم تعادل‌ها و نقاط ضعف عملکردی',
        'جمع‌بندی یافته‌ها و پیشنهاد مسیر پیش رو'
      ]
    },
    corrective: {
      detail: 'حرکات اصلاحی برای زمانی است که الگوی حرکت شما نیاز به بازسازی دارد. تمرین‌ها هدفمند و مرحله‌به‌مرحله پیش می‌روند تا بدن فرصت تطابق داشته باشد.',
      includes: [
        'طراحی تمرین بر پایه یافته‌های ارزیابی',
        'آموزش اجرای صحیح و ایمن حرکات',
        'پیشرفت تدریجی و کنترل‌شده در طول زمان',
        'بازبینی دوره‌ای الگوهای حرکتی'
      ]
    },
    online: {
      detail: 'اگر امکان حضور در محل تمرین را ندارید، همین مسیر به‌صورت غیرحضوری هم اجرا می‌شود؛ از ارزیابی اولیه تا دریافت برنامه و پیگیری پیشرفت.',
      includes: [
        'ارزیابی اولیه به‌صورت غیرحضوری',
        'دریافت برنامه به‌شکل دیجیتال',
        'پیگیری و اصلاح برنامه در بازه‌های زمانی',
        'پاسخ به پرسش‌ها در طول مسیر تمرین'
      ]
    },
    training: {
      detail: 'برنامه تمرینی زمانی نتیجه می‌دهد که با اهداف، سابقه تمرینی و شرایط جسمانی شما هم‌خوان باشد؛ نه با یک الگوی آماده برای همه.',
      includes: [
        'تعیین اهداف کوتاه‌مدت و بلندمدت',
        'تنظیم حجم و شدت تمرین بر پایه وضعیت شما',
        'تنوع تمرین برای پیشرفت پیوسته',
        'به‌روزرسانی برنامه بر پایه پیشرفت واقعی'
      ]
    }
  };

  /* ---------------- محتوای مقالات (نمونه) ---------------- */
  var ARTICLES = {
    a1: [
      'بدن هر فرد الگوی حرکتی خودش را دارد. تا زمانی که این الگو بررسی نشود، انتخاب تمرین بیشتر شبیه حدس زدن است؛ ممکن است تمرین درست باشد، اما برای بدن اشتباهی انتخاب شده باشد.',
      'در ارزیابی، حرکت‌های پایه انجام و مشاهده می‌شود تا مشخص شود کدام مفصل محدودیت دارد و کدام بخش بیش از حد کار می‌کند. نتیجه این بررسی، مبنای انتخاب تمرین‌های بعدی است.'
    ],
    a2: [
      'ساعت‌های طولانی نشستن، الگوی فعالیت عضلات لگن را تغییر می‌دهد. نتیجه معمولاً خود را در قالب احساس خشکی یا خستگی زودرس نشان می‌دهد.',
      'راه‌حل، تمرین‌های پیچیده نیست؛ وقفه‌های کوتاه و منظم در طول روز همراه با چند حرکت ساده می‌تواند الگو را به حالت متعادل‌تر برگرداند.'
    ],
    a3: [
      'در دویدن، هر گام هزینه انرژی خودش را دارد. اگر نیروی تولیدشده در مسیر اشتباه هدر برود، خستگی زودتر سراغ شما می‌آید.',
      'بهبود الگوی دویدن به معنای تغییر کامل سبک دویدن نیست؛ اصلاح‌های کوچک در وضعیت لگن، فرود پا و تعادل می‌تواند اقتصاد حرکت را به‌طور محسوسی بهتر کند.'
    ]
  };

  var SAMPLE_NOTE = 'این متن نمونه است تا چیدمان و خوانایی مقاله مشخص شود؛ متن نهایی را در فایل assets/js/interactions.js جایگزین کنید.';
  var DATE_NOTE = 'تاریخ انتشار جای‌نگهدار است؛ تاریخ واقعی را در فایل index.html وارد کنید.';

  /* ---------------- دیالوگ ---------------- */
  var dialog = document.getElementById('siteDialog');
  var dialogBody = document.getElementById('dialogBody');
  var lastTrigger = null;

  function findCard(selector) {
    return document.querySelector(selector);
  }

  function mediaOf(card) {
    var img = card ? card.querySelector('.card-media img') : null;
    if (!img) return '';
    return '<figure class="dialog-media"><img src="' + img.getAttribute('src') +
      '" alt="' + img.getAttribute('alt') + '" width="800" height="520"></figure>';
  }

  function titleOf(card) {
    var title = card ? card.querySelector('.card-title') : null;
    return title ? title.textContent.trim() : '';
  }

  function serviceView(key) {
    var card = findCard('.service-card[data-service="' + key + '"]');
    var data = SERVICES[key];
    if (!card || !data) return '';
    return mediaOf(card) +
      '<span class="dialog-eyebrow">خدمات تخصصی</span>' +
      '<h2 class="dialog-title" id="dialogTitle">' + titleOf(card) + '</h2>' +
      '<p class="dialog-text">' + data.detail + '</p>' +
      '<h3 class="dialog-subtitle">در این خدمت چه اتفاقی می‌افتد؟</h3>' +
      '<ul class="dialog-list">' + data.includes.map(function (item) {
        return '<li>' + CHECK + '<span>' + item + '</span></li>';
      }).join('') + '</ul>' +
      '<div class="dialog-actions">' +
        '<button class="btn btn-primary" type="button" data-dialog-goto="consultation">رزرو مشاوره</button>' +
        '<button class="btn btn-outline" type="button" data-close-dialog>بستن</button>' +
      '</div>' +
      '<p class="dialog-note">برای مشاهده جزئیات دیگر خدمات می‌توانید از فهرست خدمات استفاده کنید.</p>';
  }

  function indexView(kind) {
    var isService = kind === 'services';
    var selector = isService ? '.service-card' : '.article-card';
    var dataKey = isService ? 'service' : 'article';
    var attr = isService ? 'data-service' : 'data-article';
    var heading = isService ? 'همه خدمات تخصصی' : 'همه مقالات تخصصی';

    var items = Array.prototype.map.call(document.querySelectorAll(selector), function (card) {
      var img = card.querySelector('.card-media img');
      var text = card.querySelector('.card-text');
      return '<button class="dialog-index-item" type="button" data-dialog-switch="' + dataKey +
        '" ' + attr + '="' + card.getAttribute(attr) + '">' +
        (img ? '<img src="' + img.getAttribute('src') + '" alt="" width="800" height="520">' : '') +
        '<span><strong>' + titleOf(card) + '</strong><span>' +
        (text ? text.textContent.trim() : '') + '</span></span>' +
        '</button>';
    }).join('');

    return '<span class="dialog-eyebrow">فهرست</span>' +
      '<h2 class="dialog-title" id="dialogTitle">' + heading + '</h2>' +
      '<div class="dialog-index">' + items + '</div>' +
      '<p class="dialog-note">در این نسخه از سایت، ' + (isService ? 'خدمات' : 'مقالات') +
      ' به‌صورت ' + (isService ? 'چهار خدمت' : 'سه مقاله') + ' آماده شده است. برای افزودن موارد بیشتر، کارت تازه‌ای را در فایل index.html کنار بقیه اضافه کنید.</p>';
  }

  function articleView(key) {
    var card = findCard('.article-card[data-article="' + key + '"]');
    var paragraphs = ARTICLES[key];
    if (!card || !paragraphs) return '';
    var dateChip = card.querySelector('.ph');
    return mediaOf(card) +
      '<span class="dialog-eyebrow">مقالات تخصصی</span>' +
      '<h2 class="dialog-title" id="dialogTitle">' + titleOf(card) + '</h2>' +
      (dateChip ? '<p class="article-date" style="margin-top:12px">' +
        '<span class="ph" title="' + DATE_NOTE + '">' + dateChip.textContent.trim() + '</span></p>' : '') +
      paragraphs.map(function (text) {
        return '<p class="dialog-text">' + text + '</p>';
      }).join('') +
      '<div class="dialog-actions">' +
        '<button class="btn btn-outline" type="button" data-close-dialog>بستن</button>' +
      '</div>' +
      '<p class="dialog-note">' + SAMPLE_NOTE + '</p>';
  }

  function videosView() {
    return '<span class="dialog-eyebrow">آموزش‌ها</span>' +
      '<h2 class="dialog-title" id="dialogTitle">ویدئوهای آموزشی</h2>' +
      '<p class="dialog-text">در این بخش ویدئوهای کوتاه آموزشی منتشر می‌شود؛ درباره اجرای صحیح حرکت، وضعیت بدنی و تمرین‌های پایه.</p>' +
      '<h3 class="dialog-subtitle">فهرست ویدئوها</h3>' +
      '<ul class="dialog-list">' +
        '<li>' + CHECK + '<span>محل ویدئوی اول (جای‌نگهدار)</span></li>' +
        '<li>' + CHECK + '<span>محل ویدئوی دوم (جای‌نگهدار)</span></li>' +
        '<li>' + CHECK + '<span>محل ویدئوی سوم (جای‌نگهدار)</span></li>' +
      '</ul>' +
      '<div class="dialog-actions">' +
        '<button class="btn btn-outline" type="button" data-close-dialog>بستن</button>' +
      '</div>' +
      '<p class="dialog-note">هنوز ویدئویی در سایت قرار داده نشده است؛ بنابراین دکمه پخش، ویدئویی را شروع نمی‌کند. پس از آماده شدن ویدئوها، آنها را در کنار همین بخش قرار دهید.</p>';
  }

  function consultView() {
    return '<span class="dialog-eyebrow">رزرو مشاوره</span>' +
      '<h2 class="dialog-title" id="dialogTitle">رزرو جلسه مشاوره</h2>' +
      '<p class="dialog-text">در این نسخه از سایت، سامانه رزرو آنلاین فعال نیست؛ بنابراین هیچ درخواستی ثبت یا ارسال نمی‌شود. برای هماهنگی جلسه، می‌توانید از راه‌های ارتباطی زیر استفاده کنید.</p>' +
      '<h3 class="dialog-subtitle">راه‌های ارتباطی</h3>' +
      '<ul class="dialog-list">' +
        '<li><span class="ph" title="جای‌نگهدار: شماره تماس خود را وارد کنید">[شماره تماس]</span></li>' +
        '<li><span class="ph" title="جای‌نگهدار: نشانی ایمیل خود را وارد کنید">[نشانی ایمیل]</span></li>' +
        '<li><span class="ph" title="جای‌نگهدار: نشانی محل فعالیت خود را وارد کنید">[نشانی محل فعالیت]</span></li>' +
      '</ul>' +
      '<div class="dialog-actions">' +
        '<button class="btn btn-primary" type="button" data-dialog-goto="contact">مشاهده اطلاعات تماس</button>' +
        '<button class="btn btn-outline" type="button" data-close-dialog>بستن</button>' +
      '</div>' +
      '<p class="dialog-note">اطلاعات تماس جای‌نگهدار است؛ مقادیر واقعی را در فایل index.html جایگزین کنید. با افزودن یک فرم یا سامانه رزرو، این دکمه می‌تواند به آن متصل شود.</p>';
  }

  function render(view) {
    var html = '';
    if (view.mode === 'service') html = serviceView(view.key);
    else if (view.mode === 'services-index') html = indexView('services');
    else if (view.mode === 'article') html = articleView(view.key);
    else if (view.mode === 'articles-index') html = indexView('articles');
    else if (view.mode === 'videos') html = videosView();
    else if (view.mode === 'consult') html = consultView();

    if (!html) html = '<h2 class="dialog-title" id="dialogTitle">این بخش در دسترس نیست</h2>' +
      '<p class="dialog-text">محتوای درخواستی پیدا نشد.</p>' +
      '<p class="dialog-note">' + PLACEHOLDER_ICON + ' لطفاً این مورد را در فایل index.html بررسی کنید.</p>';
    return html;
  }

  function openSiteDialog(view) {
    if (!dialog || !dialogBody) return;
    dialogBody.innerHTML = render(view);
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }
  window.openSiteDialog = openSiteDialog;

  function closeSiteDialog() {
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  /* ---------- رویدادهای باز و بسته شدن ---------- */
  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-open]');
    if (opener) {
      lastTrigger = opener;
      openSiteDialog({ mode: opener.getAttribute('data-open'), key: opener.getAttribute('data-service') || opener.getAttribute('data-article') });
      return;
    }

    var switcher = event.target.closest('[data-dialog-switch]');
    if (switcher) {
      openSiteDialog({ mode: switcher.getAttribute('data-dialog-switch'), key: switcher.getAttribute('data-service') || switcher.getAttribute('data-article') });
      return;
    }

    var closer = event.target.closest('[data-close-dialog]');
    if (closer) {
      closeSiteDialog();
      return;
    }

    var goto = event.target.closest('[data-dialog-goto]');
    if (goto) {
      var id = goto.getAttribute('data-dialog-goto');
      closeSiteDialog();
      var target = document.getElementById(id);
      if (target) {
        var offset = (document.getElementById('siteHeader') ? document.getElementById('siteHeader').offsetHeight : 0) + 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    }
  });

  if (dialog) {
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeSiteDialog();
    });
    dialog.addEventListener('close', function () {
      if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    });
  }

  /* ---------- انیمیشن ورود بخش‌ها ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  /* ---------- بسط متن درباره من ---------- */
  var aboutMore = document.getElementById('aboutMore');
  var aboutMoreBtn = document.getElementById('aboutMoreBtn');

  if (aboutMore && aboutMoreBtn) {
    aboutMoreBtn.addEventListener('click', function () {
      var willShow = aboutMore.hidden;
      aboutMore.hidden = !willShow;
      aboutMoreBtn.setAttribute('aria-expanded', willShow ? 'true' : 'false');
      aboutMoreBtn.textContent = willShow ? 'بستن توضیحات' : 'اطلاعات بیشتر';
    });
  }
})();
