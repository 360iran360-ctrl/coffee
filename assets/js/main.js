/* ==========================================================================
   main.js — رفتارهای پایه رابط: سربرگ چسبان، منوی موبایل، جست‌وجو،
   پیوندهای جای‌نگهدار و سال پاصفحه. بدون هیچ وابستگی بیرونی.
   ========================================================================== */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  var searchToggle = document.getElementById('searchToggle');
  var searchPanel = document.getElementById('searchPanel');
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');
  var toast = document.getElementById('toast');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- سربرگ: اثر ملایم هنگام اسکرول ---------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- منوی موبایل ---------- */
  function closeNav() {
    if (!navList) return;
    navList.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var open = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navList.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('click', function (event) {
      if (!navList.classList.contains('is-open')) return;
      if (navList.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });
  }

  /* ---------- پیمایش نرم با احتساب ارتفاع سربرگ ---------- */
  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var offset = (header ? header.offsetHeight : 0) + 16;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top < 0 ? 0 : top, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('data-placeholder-link')) return;
    var id = link.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    closeNav();
    closeSearch();
    scrollToId(id);
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  });

  /* ---------- برجسته‌سازی پیوند بخش فعال ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main > section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function setActive(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', match);
      if (match) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      var best = null;
      entries.forEach(function (entry) {
        if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) best = entry;
      });
      if (best) setActive(best.target.id);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, .25, .5, .75, 1] });
    sections.forEach(function (section) { activeObserver.observe(section); });
  }

  /* ---------- اعلان کوتاه ---------- */
  var toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 4200);
  }
  window.showToast = showToast;

  /* ---------- پیوندهای شبکه اجتماعی جای‌نگهدار ---------- */
  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-placeholder-link]');
    if (!link) return;
    event.preventDefault();
    showToast('پیوند ' + link.getAttribute('data-placeholder-link') +
      ' جای‌نگهدار است؛ نشانی واقعی را در فایل index.html وارد کنید.');
  });

  /* ---------- جست‌وجوی درون‌صفحه‌ای ---------- */
  function normalize(text) {
    return (text || '')
      .replace(/[\u064A\u0649]/g, '\u06CC')
      .replace(/\u0643/g, '\u06A9')
      .replace(/[\u200C\u200F\u200E]/g, '')
      .replace(/[\u064B-\u0652]/g, '')
      .trim()
      .toLowerCase();
  }

  var searchIndex = [];

  function buildIndex() {
    searchIndex = [];

    Array.prototype.forEach.call(document.querySelectorAll('.service-card'), function (card) {
      var title = card.querySelector('.card-title');
      if (!title) return;
      searchIndex.push({
        title: title.textContent.trim(),
        kind: 'خدمت',
        action: { open: 'service', key: card.getAttribute('data-service') }
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('.article-card'), function (card) {
      var title = card.querySelector('.card-title');
      if (!title) return;
      searchIndex.push({
        title: title.textContent.trim(),
        kind: 'مقاله',
        action: { open: 'article', key: card.getAttribute('data-article') }
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('main > section[id]'), function (section) {
      var heading = section.querySelector('.section-title, .hero-title, .consult-title');
      if (!heading) return;
      searchIndex.push({
        title: heading.textContent.trim(),
        kind: 'بخش سایت',
        action: { scroll: section.id }
      });
    });
  }

  function renderResults(query) {
    if (!searchResults) return;
    var q = normalize(query);
    searchResults.innerHTML = '';

    if (!q) {
      var hint = document.createElement('li');
      hint.className = 'search-empty';
      hint.textContent = 'نام خدمت، مقاله یا بخش مورد نظر را بنویسید.';
      searchResults.appendChild(hint);
      return;
    }

    var hits = searchIndex.filter(function (item) {
      return normalize(item.title).indexOf(q) !== -1;
    }).slice(0, 8);

    if (!hits.length) {
      var empty = document.createElement('li');
      empty.className = 'search-empty';
      empty.textContent = 'نتیجه‌ای پیدا نشد.';
      searchResults.appendChild(empty);
      return;
    }

    hits.forEach(function (hit) {
      var li = document.createElement('li');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'search-hit';

      var strong = document.createElement('strong');
      strong.textContent = hit.title;
      var span = document.createElement('span');
      span.textContent = hit.kind;

      button.appendChild(strong);
      button.appendChild(span);

      button.addEventListener('click', function () {
        closeSearch();
        if (hit.action.scroll) {
          scrollToId(hit.action.scroll);
          return;
        }
        if (window.openSiteDialog) {
          window.openSiteDialog({ mode: hit.action.open, key: hit.action.key });
        }
      });

      li.appendChild(button);
      searchResults.appendChild(li);
    });
  }

  function openSearch() {
    if (!searchPanel) return;
    searchPanel.hidden = false;
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'true');
    buildIndex();
    renderResults(searchInput ? searchInput.value : '');
    if (searchInput) searchInput.focus();
  }

  function closeSearch() {
    if (!searchPanel || searchPanel.hidden) return;
    searchPanel.hidden = true;
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
  }

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function () {
      if (searchPanel.hidden) openSearch();
      else closeSearch();
    });
    if (searchInput) {
      searchInput.addEventListener('input', function () { renderResults(searchInput.value); });
    }
    document.addEventListener('click', function (event) {
      if (searchPanel.hidden) return;
      if (searchPanel.contains(event.target) || searchToggle.contains(event.target)) return;
      closeSearch();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    closeNav();
    closeSearch();
  });

  /* ---------- سال پاصفحه به تقویم هجری شمسی ---------- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) {
    try {
      var year = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date());
      yearEl.textContent = '© ' + year;
    } catch (error) {
      yearEl.textContent = '';
    }
  }
})();
