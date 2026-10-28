/* ==========================================================================
   3d-effects.js — پارالاکس ملایم هیرو/درباره من و چرخش سه‌بعدی کارت‌ها
   همه محاسبات با CSS custom properties و transform انجام می‌شود.
   روی دستگاه‌های لمسی و در حالت «کاهش حرکت» غیرفعال است.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  function effectsAllowed() {
    return !reduceMotion.matches && precisePointer.matches;
  }

  function raf(fn) {
    var queued = false;
    return function (event) {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        fn(event);
      });
    };
  }

  /* ---------------- پارالاکس هیرو و درباره من ---------------- */
  var roots = Array.prototype.slice.call(document.querySelectorAll('[data-parallax-root]'));

  roots.forEach(function (root) {
    var layers = Array.prototype.slice.call(root.querySelectorAll('[data-parallax]'));
    if (!layers.length) return;

    var apply = raf(function (event) {
      var rect = root.getBoundingClientRect();
      // موقعیت اشاره‌گر به بازه ۱- تا ۱ نرمال می‌شود
      var dx = ((event.clientX - rect.left) / rect.width - .5) * 2;
      var dy = ((event.clientY - rect.top) / rect.height - .5) * 2;

      layers.forEach(function (layer) {
        var depth = parseFloat(layer.getAttribute('data-parallax')) || 0;
        layer.style.setProperty('--px', (dx * depth).toFixed(2) + 'px');
        layer.style.setProperty('--py', (dy * depth * .6).toFixed(2) + 'px');
      });
    });

    function reset() {
      layers.forEach(function (layer) {
        layer.style.setProperty('--px', '0px');
        layer.style.setProperty('--py', '0px');
      });
    }

    function bind() {
      if (effectsAllowed()) {
        root.addEventListener('pointermove', apply);
        root.addEventListener('pointerleave', reset);
      } else {
        root.removeEventListener('pointermove', apply);
        root.removeEventListener('pointerleave', reset);
        reset();
      }
    }

    bind();
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', bind);
    if (precisePointer.addEventListener) precisePointer.addEventListener('change', bind);
  });

  /* ---------------- چرخش سه‌بعدی کارت‌ها ---------------- */
  var tiltItems = Array.prototype.slice.call(document.querySelectorAll('.tilt'));

  tiltItems.forEach(function (item) {
    var update = raf(function (event) {
      var rect = item.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;

      var rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4.5;
      var rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 4.5;

      item.style.setProperty('--rx', rotateX.toFixed(2) + 'deg');
      item.style.setProperty('--ry', rotateY.toFixed(2) + 'deg');
      item.style.setProperty('--mx', x.toFixed(0) + 'px');
      item.style.setProperty('--my', y.toFixed(0) + 'px');
    });

    function reset() {
      item.style.setProperty('--rx', '0deg');
      item.style.setProperty('--ry', '0deg');
    }

    function bind() {
      if (effectsAllowed()) {
        item.addEventListener('pointermove', update);
        item.addEventListener('pointerleave', reset);
      } else {
        item.removeEventListener('pointermove', update);
        item.removeEventListener('pointerleave', reset);
        reset();
      }
    }

    bind();
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', bind);
    if (precisePointer.addEventListener) precisePointer.addEventListener('change', bind);
  });
})();
