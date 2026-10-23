/* ============================================
   CAFEINO - Custom JavaScript for Elementor
   به‌کارگیری: Elementor Pro → Custom Code (در هدر)
   یا: Appearance → Customize → Additional JS
   یا: با افزونه Insert Headers and Footers
   ============================================ */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    // ── فیلتر منو با تب‌ها ──
    var tabs = document.querySelectorAll('.cafeino-tab');
    if (tabs.length > 0) {
      // نگاشت آیتم‌های منو به دسته‌ها (با data-cat)
      var menuItems = document.querySelectorAll('[data-menu-cat]');
      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          var cat = this.getAttribute('data-cat');
          // تغییر حالت فعال
          tabs.forEach(function(t) {
            t.style.background = '#05263A';
            t.style.color = '#8b9aa5';
            t.style.border = '1px solid rgba(99,186,198,0.1)';
            t.classList.remove('active');
          });
          this.style.background = '#63bac6';
          this.style.color = '#031C2C';
          this.style.border = 'none';
          this.classList.add('active');

          // فیلتر آیتم‌ها
          menuItems.forEach(function(item) {
            var itemCat = item.getAttribute('data-menu-cat');
            if (cat === 'all' || itemCat === cat) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }

    // ── هدر چسبان با تغییر شکل هنگام اسکرول ──
    var header = document.querySelector('.elementor-location-header');
    if (header) {
      header.classList.add('cafeino-sticky-header');
      window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
          header.style.padding = '8px 0';
          header.style.transition = 'all 0.5s ease';
        } else {
          header.style.padding = '16px 0';
        }
      });
    }

    // ── پخش/توقف ریلز ──
    var reelCards = document.querySelectorAll('[data-reel]');
    reelCards.forEach(function(card) {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        // این بخش در صورت افزودن ویدیو واقعی فعال می‌شود
        var video = this.querySelector('video');
        if (video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    });

    // ── انیمیشن ظاهر شدن هنگام اسکرول ──
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('cafeino-fade-in');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    var revealElements = document.querySelectorAll('.elementor-section, .elementor-container');
    revealElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });

    // ── نمبرهای فارسی ──
    function toPersianNum(input) {
      var persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
      return String(input).replace(/[0-9]/g, function(d) {
        return persianDigits[d];
      });
    }

    // تبدیل قیمت‌ها به اعداد فارسی
    var priceElements = document.querySelectorAll('.cafeino-price');
    priceElements.forEach(function(el) {
      el.textContent = toPersianNum(el.textContent);
    });
  });
})();
