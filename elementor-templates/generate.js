#!/usr/bin/env node
/**
 * Generates Elementor JSON template files for the Caffeino website.
 * Output: ./elementor-templates/*.json
 *
 * Elementor template schema (v0.4, flexbox containers):
 * {
 *   "content": [ top-level containers ],
 *   "page_settings": { ... },
 *   "version": "0.4",
 *   "title": "...",
 *   "type": "page" | "header" | "footer"
 * }
 *
 * Element hierarchy:
 *   container -> settings { content_width, flex_direction, flex_gap, padding, background_*, border_*, border_radius, ... }
 *   widget    -> settings { widget-specific props }
 */

const fs = require('fs');
const path = require('path');

// ── Design tokens from the original site ──
const C = {
  navy950: '#0a1219',
  navy900: '#031C2C',
  navy800: '#05263A',
  navy700: '#07354A',
  cyan:    '#63bac6',
  cyanLight: '#7fd0dc',
  white:   '#ffffff',
  gray300: '#aeb6c0',
  gray400: '#8b9aa5',
  gray500: '#6b7d8a',
};

let idCounter = 1;
const genId = () => String(idCounter++).padStart(8, '0');

// ── Element factory helpers ──
function container(settings = {}, elements = []) {
  return { id: genId(), elType: 'container', settings, elements, isInner: false };
}

function widget(widgetType, settings = {}) {
  return { id: genId(), elType: 'widget', widgetType, settings, elements: [] };
}

function box(unit, size) {
  return { unit, size: String(size), isLinked: false,
    top: String(size), right: String(size), bottom: String(size), left: String(size) };
}

function boxSide(unit, top, right, bottom, left) {
  return { unit, isLinked: false,
    top: String(top), right: String(right), bottom: String(bottom), left: String(left) };
}

function dims(unit, top, right, bottom, left) {
  return { unit, top: String(top), right: String(right), bottom: String(bottom), left: String(left), isLinked: true };
}

function fontFamily(font = 'Vazirmatn') {
  return { typography_typography: 'custom', typography_font_family: font };
}

function fontSize(px) {
  return { typography_font_size: { unit: 'px', size: String(px) }, typography_font_weight: '700' };
}

// ── Reusable settings fragments ──
const colContainer = {
  content_width: 'boxed',
  flex_direction: 'column',
  flex_gap: { row: '0', column: '20', unit: 'px' },
  padding: box('px', 48),
};

const sectionHeading = (title, icon = '') => {
  const s = {
    title: title,
    header_size: 'h2',
    align: 'right',
    title_color: C.white,
    ...fontFamily(),
    ...fontSize(28),
  };
  return widget('heading', s);
};

const heading = (text, size, weight = '700', color = C.white, tag = 'h1') =>
  widget('heading', {
    title: text,
    header_size: tag,
    align: 'right',
    title_color: color,
    ...fontFamily(),
    typography_font_size: { unit: 'px', size: String(size) },
    typography_font_weight: weight,
  });

const textEditor = (html, color = C.gray300, size = 15, align = 'right') =>
  widget('text-editor', {
    editor: html,
    text_color: color,
    align,
    ...fontFamily(),
    typography_font_size: { unit: 'px', size: String(size) },
    typography_line_height: { unit: 'em', size: '1.8' },
  });

const image = (url, alt = '', radius = 16, w = 'auto') =>
  widget('image', {
    image: { url, id: '' },
    image_size: 'full',
    title_text: alt,
    image_border_border: 'solid',
    image_border_color: 'rgba(99,186,198,0.15)',
    image_border_width: box('px', 1),
    image_border_radius: { unit: 'px', ...dims('', radius, radius, radius, radius), isLinked: true,
      top: String(radius), right: String(radius), bottom: String(radius), left: String(radius) },
  });

const btn = (text, url = '#', bg = C.cyan, textColor = C.navy950, outline = false) => {
  const s = {
    text,
    link: { url, is_external: '', nofollow: '', custom_attributes: '' },
    button_text_color: textColor,
    ...fontFamily(),
    typography_font_weight: '600',
    typography_font_size: { unit: 'px', size: '14' },
    button_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true },
  };
  if (outline) {
    s.button_background_color = 'transparent';
    s.button_border_border = 'solid';
    s.button_border_color = C.cyan;
    s.button_border_width = box('px', 2);
  } else {
    s.button_background_color = bg;
  }
  return widget('button', s);
};

const iconBox = (icon, title, desc) =>
  widget('icon-box', {
    selected_icon: { value: icon, library: 'fa-solid' },
    title_text: title,
    description_text: desc,
    icon_color: C.cyan,
    icon_background_background: 'classic',
    icon_background_color: 'rgba(99,186,198,0.1)',
    icon_border_border: 'solid',
    icon_border_color: 'rgba(99,186,198,0.2)',
    icon_border_width: box('px', 1),
    icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true },
    icon_size: { unit: 'px', size: '20' },
    icon_padding: { unit: 'px', size: '10', isLinked: true },
    title_color: C.white,
    description_color: C.gray400,
    ...fontFamily(),
    title_typography_font_size: { unit: 'px', size: '14' },
    title_typography_font_weight: '600',
    description_typography_font_size: { unit: 'px', size: '12' },
    position: 'left',
  });

const divider = () => widget('divider', {
  style: { color: 'rgba(99,186,198,0.1)', width: 1 },
});

const darkCard = {
  background_background: 'classic',
  background_color: C.navy800,
  border_border: 'solid',
  border_color: 'rgba(99,186,198,0.1)',
  border_width: box('px', 1),
  border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
  padding: box('px', 32),
};

// ── Template wrapper ──
function template(title, type, content, pageSettings = {}) {
  return JSON.stringify({
    content,
    page_settings: { ...pageSettings },
    version: '0.4',
    title,
    type,
  }, null, 2);
}

// ── ALL image URLs used in the site ──
const IMG = {
  hero1: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=1600&q=80',
  hero2: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80',
  hero3: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80',
  coffee1: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=400&q=80',
  food1: 'https://images.unsplash.com/photo-1546069901-ba9599a7eaa5?w=400&q=80',
  dessert1: 'https://images.unsplash.com/photo-1551024601-b5117d5f5d8f?w=400&q=80',
  space1: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
  customers: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34cf?w=400&q=80',
  behind: 'https://images.unsplash.com/photo-1453614512568-c4021d66884c?w=400&q=80',
  events: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
  reel1: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=600&q=80',
  reel2: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
  reel3: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80',
  reel4: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
  reel5: 'https://images.unsplash.com/photo-1453614512568-c4021d66884c?w=600&q=80',
  reel6: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?w=600&q=80',
  event1: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  event2: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
  event3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  event4: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
  event5: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80',
  event6: 'https://images.unsplash.com/photo-1464349034109-3a50a1f7b7e8?w=800&q=80',
  // Menu items
  espresso: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80',
  cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
  latte: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80',
  mocha: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80',
  iceLatte: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=600&q=80',
  iceAmericano: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80',
  shakeNutella: 'https://images.unsplash.com/photo-1572490122747-39d8e00586d0?w=600&q=80',
  teaBlack: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&q=80',
  teaHerbal: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80',
  breakfastCaf: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
  omelette: 'https://images.unsplash.com/photo-1525351484163-7510ef9f71ec?w=600&q=80',
  saladCaesar: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80',
  soupMushroom: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  joojeh: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  koobideh: 'https://images.unsplash.com/photo-1529193591184-b1d78079ec3a?w=600&q=80',
  pastaAlfredo: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80',
  pastaPesto: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&q=80',
  burgerCaf: 'https://images.unsplash.com/photo-1568901346375-23c9450f58ae?w=600&q=80',
  clubSandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80',
  tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
  cheesecake: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
  cakeChoco: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
  cakeCarrot: 'https://images.unsplash.com/photo-1599785209707-a456fcf9a2f4?w=600&q=80',
  matcha: 'https://images.unsplash.com/photo-1515823893255-9c5e8b1d7d4e?w=600&q=80',
  goldenLatte: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
};

const MENU_ITEMS = [
  { name: 'اسپرسو', desc: 'شات‌های غلیظ و خالص از دانه‌های انتخابی', price: '۵۵٬۰۰۰ تومان', img: IMG.espresso, featured: false, cat: 'قهوه و اسپرسو' },
  { name: 'کاپوچینو', desc: 'اسپرسو با شیر بخارپز و فوم مخملی', price: '۷۵٬۰۰۰ تومان', img: IMG.cappuccino, featured: true, cat: 'قهوه و اسپرسو' },
  { name: 'لاته', desc: 'شیر بخارپز با اسپرسو و لاته آرت', price: '۸۰٬۰۰۰ تومان', img: IMG.latte, featured: false, cat: 'قهوه و اسپرسو' },
  { name: 'موکا', desc: 'ترکیب اسپرسو، شکلات و شیر بخارپز', price: '۹۵٬۰۰۰ تومان', img: IMG.mocha, featured: false, cat: 'قهوه و اسپرسو' },
  { name: 'آیس لاته', desc: 'اسپرسو سرد با شیر و یخ', price: '۸۵٬۰۰۰ تومان', img: IMG.iceLatte, featured: true, cat: 'نوشیدنی‌های سرد' },
  { name: 'آیس آمریکانو', desc: 'اسپرسو سرد با آب و یخ', price: '۷۰٬۰۰۰ تومان', img: IMG.iceAmericano, featured: false, cat: 'نوشیدنی‌های سرد' },
  { name: 'شیک نوتلا', desc: 'شیک خامه‌ای نوتلا با بستنی وانیلی', price: '۱۱۰٬۰۰۰ تومان', img: IMG.shakeNutella, featured: false, cat: 'نوشیدنی‌های سرد' },
  { name: 'چای سیاه سنتی', desc: 'چای ممتاز لاهیجان با عرقیات', price: '۴۰٬۰۰۰ تومان', img: IMG.teaBlack, featured: false, cat: 'چای و دمنوش' },
  { name: 'دمنوش بهارنارنج', desc: 'دمنوش آرام‌بخش بهارنارنج و بابونه', price: '۵۰٬۰۰۰ تومان', img: IMG.teaHerbal, featured: false, cat: 'چای و دمنوش' },
  { name: 'صبحانه کافئینو', desc: 'تخم مرغ، پنیر، گردو، عسل و کره', price: '۱۸۰٬۰۰۰ تومان', img: IMG.breakfastCaf, featured: true, cat: 'صبحانه' },
  { name: 'املت اسپانیایی', desc: 'املت با فلفل دلمه، گوجه و سیب‌زمینی', price: '۱۵۰٬۰۰۰ تومان', img: IMG.omelette, featured: false, cat: 'صبحانه' },
  { name: 'سالاد سزار', desc: 'کاهو، مرط گریل، پارمسان و سس سزار', price: '۱۲۰٬۰۰۰ تومان', img: IMG.saladCaesar, featured: false, cat: 'پیش‌غذا' },
  { name: 'سوپ قارچ', desc: 'سوپ خامه‌ای قارچ تازه با کرامبل', price: '۹۵٬۰۰۰ تومان', img: IMG.soupMushroom, featured: false, cat: 'پیش‌غذا' },
  { name: 'جوجه کباب زعفرانی', desc: 'سینه مرغ گریل با زعفران و برنج زعفرانی', price: '۳۲۰٬۰۰۰ تومان', img: IMG.joojeh, featured: true, cat: 'غذاهای اصلی' },
  { name: 'کباب کوبیده', desc: 'دو سیخ کوبیده گوسفندی با برنج و گوجه گریل', price: '۲۸۰٬۰۰۰ تومان', img: IMG.koobideh, featured: false, cat: 'غذاهای اصلی' },
  { name: 'پاستا آلفردو', desc: 'پاستا با سس خامه‌ای، سینه مرغ و قارچ', price: '۲۴۰٬۰۰۰ تومان', img: IMG.pastaAlfredo, featured: true, cat: 'پاستا' },
  { name: 'پاستا پستو', desc: 'پاستا با سس پستو، گوجه گیلاسی و پارمسان', price: '۲۳۰٬۰۰۰ تومان', img: IMG.pastaPesto, featured: false, cat: 'پاستا' },
  { name: 'برگر کافئینو', desc: 'گوشت گوساله، پنیر چدار، سس مخصوص و سیب‌زمینی', price: '۲۶۰٬۰۰۰ تومان', img: IMG.burgerCaf, featured: true, cat: 'برگر و ساندویچ' },
  { name: 'کلاب ساندویچ', desc: 'مرغ، بکن، کاهو و سس مخصوص', price: '۱۹۰٬۰۰۰ تومان', img: IMG.clubSandwich, featured: false, cat: 'برگر و ساندویچ' },
  { name: 'تیرامیسو', desc: 'لایه‌های کیک قهوه با ماسکارپونه', price: '۱۲۰٬۰۰۰ تومان', img: IMG.tiramisu, featured: true, cat: 'دسر' },
  { name: 'چیزکیک نیویورکی', desc: 'چیزکیک خامه‌ای با سس توت‌فرنگی', price: '۱۳۰٬۰۰۰ تومان', img: IMG.cheesecake, featured: false, cat: 'دسر' },
  { name: 'کیک شکلاتی', desc: 'کیک سه لایه شکلاتی با گاناش', price: '۹۰٬۰۰۰ تومان', img: IMG.cakeChoco, featured: false, cat: 'کیک' },
  { name: 'کیک هویج', desc: 'کیک هویج تازه با کرم پنیر', price: '۸۵٬۰۰۰ تومان', img: IMG.cakeCarrot, featured: false, cat: 'کیک' },
  { name: 'ماچا لاته', desc: 'ماچای ژاپنی با شیر بخارپز و عسل', price: '۱۲۰٬۰۰۰ تومان', img: IMG.matcha, featured: true, cat: 'نوشیدنی‌های ویژه' },
  { name: 'طلایی کافئینو', desc: 'شیر طلایی با زردچوبه، عسل و دارچین', price: '۱۱۰٬۰۰۰ تومان', img: IMG.goldenLatte, featured: false, cat: 'نوشیدنی‌های ویژه' },
];

const STORY_CATS = [
  { name: 'قهوه و نوشیدنی', img: IMG.coffee1 },
  { name: 'غذاهای ویژه', img: IMG.food1 },
  { name: 'دسرهای خوشمزه', img: IMG.dessert1 },
  { name: 'فضای رستوران', img: IMG.space1 },
  { name: 'مشتریان ما', img: IMG.customers },
  { name: 'پشت صحنه', img: IMG.behind },
  { name: 'رویدادها', img: IMG.events },
];

const REELS_DATA = [
  { title: 'آیس لاته کافئینو', thumb: IMG.reel1, views: '۲٫۱K' },
  { title: 'فضای کافه در شب', thumb: IMG.reel2, views: '۳٫۴K' },
  { title: 'پاستای مخصوص کافئینو', thumb: IMG.reel3, views: '۱٫۸K' },
  { title: 'تیرامیسوی تازه', thumb: IMG.reel4, views: '۴٫۲K' },
  { title: 'شب‌های کافئینو', thumb: IMG.reel5, views: '۲٫۷K' },
  { title: 'قهوه و هنر', thumb: IMG.reel6, views: '۵٫۱K' },
];

const EVENTS_DATA = [
  { title: 'جشن تولد', desc: 'برای تولد عزیزانتان فضایی خصوصی با دکوراسیون ویژه، کیک تولد و موسیقی زنده رزرو کنید.', img: IMG.event1, cap: 'تا ۳۰ نفر', svc: 'کیک تولد مخصوص، دکوراسیون، موسیقی زنده، عکاسی حرفه‌ای' },
  { title: 'جشن خصوصی', desc: 'فضای اختصاصی کافئینو برای جشن‌های خصوصی و دورهمی‌های دوستانه.', img: IMG.event2, cap: 'تا ۵۰ نفر', svc: 'منوی اختصاصی، باریستا حرفه‌ای، فضای خصوصی، پارکینگ' },
  { title: 'سالگرد ازدواج', desc: 'شام رمانتیک برای دو نفر با فضای دنج، نورپردازی ویژه و منوی مخصوص.', img: IMG.event3, cap: '۲ نفر', svc: 'شام رمانتیک، نورپردازی شمعی، گل و دکوراسیون، سرویس ویژه' },
  { title: 'جلسات کاری', desc: 'فضای آرام و حرفه‌ای برای جلسات کاری و رویدادهای شرکتی کوچک.', img: IMG.event4, cap: 'تا ۲۰ نفر', svc: 'وای‌فای رایگان، پروژکتور، پذیرایی، نوشیدنی رایگان' },
  { title: 'شام رمانتیک', desc: 'یک شب فراموش‌نشدنی برای دو نفر با منوی مخصوص و فضای خصوصی.', img: IMG.event5, cap: '۲ نفر', svc: 'منوی ویژه، گل رز، شممع، موسیقی ملایم' },
  { title: 'مناسبتی خاص', desc: 'روز مادر، روز عشق، یلدا و سایر مناسبت‌ها با برنامه‌های ویژه کافئینو.', img: IMG.event6, cap: 'متغیر', svc: 'برنامه ویژه، منوی فصلی، هدیه یادگاری، عکاسی' },
];

const GALLERY_IMGS = [
  IMG.coffee1, IMG.space1, IMG.food1, IMG.dessert1, IMG.behind, IMG.customers,
  IMG.hero2, IMG.tiramisu, IMG.pastaAlfredo, IMG.event1, IMG.reel6, IMG.burgerCaf,
];

const CONTACT = {
  address: 'تهران، خیابان نمونه، پلاک ۱۲',
  phone: '۰۲۱-۱۲۳۴۵۶۷۸',
  hours: 'هر روز ۱۲:۰۰ تا ۲۴:۰۰',
  instagram: '@cafeino',
};

// ── PAGE BUILDERS ──

function buildHeader() {
  const navLinks = [
    { label: 'خانه', href: '/' },
    { label: 'منو', href: '/menu' },
    { label: 'گالری', href: '/gallery' },
    { label: 'رزرو', href: '/reservation' },
    { label: 'مراسم و جشن‌ها', href: '/events' },
    { label: 'درباره ما', href: '/about' },
    { label: 'تماس با ما', href: '/contact' },
  ];

  const navItems = navLinks.map(link =>
    widget('button', {
      text: link.label,
      link: { url: link.href, is_external: '', nofollow: '', custom_attributes: '' },
      button_text_color: C.gray300,
      button_background_color: 'transparent',
      button_border_border: 'none',
      button_border_radius: { unit: 'px', top: '8', right: '8', bottom: '8', left: '8', isLinked: true },
      button_padding: { unit: 'px', top: '8', right: '12', bottom: '8', left: '12', isLinked: false },
      ...fontFamily(),
      typography_font_size: { unit: 'px', size: '14' },
      typography_font_weight: '400',
      button_css_id: link.href.replace('/', ''),
    })
  );

  const logoCol = container({
    flex_direction: 'column',
    flex_gap: { row: '0', column: '0', unit: 'px' },
  }, [
    widget('heading', {
      title: 'CAFEINO',
      header_size: 'div',
      align: 'right',
      title_color: C.white,
      ...fontFamily(),
      typography_font_size: { unit: 'px', size: '24' },
      typography_font_weight: '700',
      typography_letter_spacing: { unit: 'px', size: '-0.5' },
    }),
    widget('heading', {
      title: 'CAFE & RESTAURANT',
      header_size: 'div',
      align: 'right',
      title_color: 'rgba(99,186,198,0.7)',
      ...fontFamily(),
      typography_font_size: { unit: 'px', size: '10' },
      typography_font_weight: '500',
      typography_letter_spacing: { unit: 'px', size: '3' },
      typography_text_transform: 'uppercase',
    }),
  ]);

  const navCol = container({
    flex_direction: 'row',
    flex_gap: { row: '4', column: '0', unit: 'px' },
    flex_align_items: 'center',
  }, navItems);

  const ctaCol = container({
    flex_direction: 'row',
    flex_gap: { row: '12', column: '0', unit: 'px' },
    flex_align_items: 'center',
  }, [
    btn('رزرو آنلاین', '/reservation', C.cyan, C.navy950, false),
  ]);

  return container({
    content_width: 'boxed',
    flex_direction: 'row',
    flex_justify_content: 'space-between',
    flex_align_items: 'center',
    padding: boxSide('px', 16, 24, 16, 24),
    background_background: 'classic',
    background_color: 'rgba(10,18,25,0.9)',
    background_overlay_opacity: 90,
    border_border: 'solid',
    border_color: 'rgba(99,186,198,0.1)',
    border_width: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false },
  }, [logoCol, navCol, ctaCol]);
}

function buildFooter() {
  // Column 1: Brand + Social
  const brandCol = container({ flex_direction: 'column', flex_gap: { row: '0', column: '16', unit: 'px' } }, [
    widget('heading', {
      title: 'CAFEINO',
      header_size: 'div',
      align: 'right',
      title_color: C.white,
      ...fontFamily(),
      typography_font_size: { unit: 'px', size: '24' },
      typography_font_weight: '700',
    }),
    widget('heading', {
      title: 'CAFE & RESTAURANT',
      header_size: 'div',
      align: 'right',
      title_color: 'rgba(99,186,198,0.7)',
      ...fontFamily(),
      typography_font_size: { unit: 'px', size: '10' },
      typography_font_weight: '500',
    }),
    container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' } }, [
      widget('icon', { selected_icon: { value: 'fab fa-instagram', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://instagram.com/cafeino', is_external: 'on' } }),
      widget('icon', { selected_icon: { value: 'fab fa-telegram', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://t.me/cafeino', is_external: 'on' } }),
      widget('icon', { selected_icon: { value: 'fab fa-whatsapp', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://wa.me/09123456789', is_external: 'on' } }),
    ]),
  ]);

  // Column 2: Contact
  const contactCol = container({ flex_direction: 'column', flex_gap: { row: '0', column: '12', unit: 'px' } }, [
    widget('heading', { title: 'تماس با ما', header_size: 'h4', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '14' }, typography_font_weight: '600' }),
    textEditor(`<p><i class="fas fa-map-marker-alt" style="color:rgba(99,186,198,0.6);margin-left:8px;"></i>${CONTACT.address}</p>`, C.gray400, 14),
    textEditor(`<p><i class="fas fa-phone" style="color:rgba(99,186,198,0.6);margin-left:8px;"></i><span dir="ltr">${CONTACT.phone}</span></p>`, C.gray400, 14),
    textEditor(`<p><i class="fas fa-clock" style="color:rgba(99,186,198,0.6);margin-left:8px;"></i>${CONTACT.hours}</p>`, C.gray400, 14),
  ]);

  // Column 3: Hours
  const hoursCol = container({ flex_direction: 'column', flex_gap: { row: '0', column: '12', unit: 'px' } }, [
    widget('heading', { title: 'ساعات کاری', header_size: 'h4', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '14' }, typography_font_weight: '600' }),
    textEditor('<p style="color:#aeb6c0;font-size:14px;">هر روز هفته</p>', C.gray400, 14),
    widget('heading', { title: '۱۲:۰۰ - ۲۴:۰۰', header_size: 'div', align: 'right', title_color: C.white, ...fontFamily(), typography_font_size: { unit: 'px', size: '18' }, typography_font_weight: '600' }),
  ]);

  // Column 4: Newsletter
  const newsCol = container({ flex_direction: 'column', flex_gap: { row: '0', column: '12', unit: 'px' } }, [
    widget('heading', { title: 'خبرنامه', header_size: 'h4', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '14' }, typography_font_weight: '600' }),
    textEditor('<p style="color:#8b9aa5;font-size:12px;line-height:1.6;">با عضویت در خبرنامه کافئینو، از تخفیف‌ها و رویدادهای جدید باخبر شوید.</p>', C.gray500, 12),
    widget('form', {
      form_name: 'newsletter',
      form_fields: [
        { key: 'email', type: 'email', label: 'ایمیل', placeholder: 'ایمیل خود را وارد کنید', required: true, width: '70' },
      ],
      submit_button_text: 'ثبت',
      button_background_color: C.cyan,
      button_text_color: C.navy950,
      button_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
      field_background_color: 'rgba(7,53,74,0.5)',
      field_border_color: 'rgba(99,186,198,0.2)',
      field_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
      field_text_color: C.white,
      ...fontFamily(),
      field_typography_font_size: { unit: 'px', size: '14' },
    }),
  ]);

  return container({
    content_width: 'boxed',
    flex_direction: 'column',
    flex_gap: { row: '0', column: '40', unit: 'px' },
    padding: box('px', 48),
    background_background: 'classic',
    background_color: C.navy950,
    border_border: 'solid',
    border_color: 'rgba(99,186,198,0.1)',
    border_width: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false },
  }, [
    container({ flex_direction: 'row', flex_gap: { row: '32', column: '0', unit: 'px' }, flex_wrap: 'wrap' }, [brandCol, contactCol, hoursCol, newsCol]),
    container({ flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center', padding: { unit: 'px', top: '24', right: '0', bottom: '0', left: '0', isLinked: false }, border_border: 'solid', border_color: 'rgba(99,186,198,0.1)', border_width: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false } }, [
      textEditor('<p style="color:#6b7d8a;font-size:12px;">© ۱۴۰۳ کافئینو. تمامی حقوق محفوظ است.</p>', C.gray500, 12),
      container({ flex_direction: 'row', flex_gap: { row: '16', column: '0', unit: 'px' } }, [
        btn('منو', '/menu', 'transparent', C.gray500, false),
        btn('رزرو', '/reservation', 'transparent', C.gray500, false),
        btn('ریلزها', '/reels', 'transparent', C.gray500, false),
      ]),
    ]),
  ]);
}

function buildHomepage() {
  // Hero section
  const hero = container({
    content_width: 'full',
    flex_direction: 'row',
    flex_align_items: 'center',
    min_height: '100vh',
    padding: boxSide('px', 96, 24, 48, 24),
    background_background: 'classic',
    background_color: C.navy900,
    background_image: { url: IMG.hero1, id: '' },
    background_position: 'center center',
    background_size: 'cover',
    background_overlay_background: 'classic',
    background_overlay_color: 'rgba(10,18,25,0.8)',
  }, [
    // Text column
    container({ flex_direction: 'column', flex_gap: { row: '0', column: '24', unit: 'px' }, content_width: '58%' }, [
      container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
        widget('icon', { selected_icon: { value: 'fas fa-sparkles', library: 'fa-solid' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '14' } }),
        widget('heading', { title: 'به کافئینو خوش آمدید', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
      ]),
      widget('heading', {
        title: 'لحظه‌های خاص<br><span style="background:linear-gradient(135deg,#63bac6,#7fd0dc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">با طعم به‌یادماندنی</span>',
        header_size: 'h1',
        align: 'right',
        title_color: C.white,
        ...fontFamily(),
        typography_font_size: { unit: 'px', size: '56' },
        typography_font_weight: '700',
        typography_line_height: { unit: 'em', size: '1.2' },
      }),
      textEditor('<p>کافه کافئینو، جایی برای تجربه طعم‌های خاص، محیطی دلنشین و خاطره‌سازی با عزیزان شما.</p>', C.gray300, 16),
      container({ flex_direction: 'row', flex_gap: { row: '16', column: '0', unit: 'px' } }, [
        btn('رزرو میز', '/reservation', C.cyan, C.navy950, false),
        btn('مشاهده منو', '/menu', 'transparent', C.cyan, true),
      ]),
      container({ flex_direction: 'row', flex_gap: { row: '24', column: '0', unit: 'px' }, flex_wrap: 'wrap' }, [
        iconBox('fas fa-heart', 'محیطی دلنشین', 'فضایی گرم و صمیمی'),
        iconBox('fas fa-leaf', 'مواد اولیه تازه', 'تازه و باکیفیت'),
        iconBox('fas fa-star', 'کیفیت بی‌نظیر', 'هنر و سلیقه'),
      ]),
    ]),
    // Reel column
    container({ flex_direction: 'column', flex_gap: { row: '0', column: '12', unit: 'px' }, content_width: '38%' }, [
      widget('heading', { title: 'جدیدترین ریلز', header_size: 'h3', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '14' }, typography_font_weight: '600' }),
      widget('image', {
        image: { url: IMG.reel1, id: '' },
        image_size: 'full',
        title_text: 'آیس لاته کافئینو',
        image_border_border: 'solid',
        image_border_color: 'rgba(99,186,198,0.15)',
        image_border_width: box('px', 1),
        image_border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
        height: { unit: 'px', size: '420' },
        object_fit: 'cover',
      }),
    ]),
  ]);

  // Story categories
  const storySection = container({ ...colContainer, padding: box('px', 48) }, [
    container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' }, flex_align_items: 'center', margin: { unit: 'px', top: '0', right: '0', bottom: '32', left: '0', isLinked: false } }, [
      widget('icon', { selected_icon: { value: 'fas fa-sparkles', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_width: box('px', 1), icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '8', isLinked: true }, icon_size: { unit: 'px', size: '18' } }),
      heading('لحظه‌های کافئینو', 28, '700', C.white, 'h2'),
    ]),
    container({ flex_direction: 'row', flex_gap: { row: '20', column: '0', unit: 'px' }, flex_wrap: 'wrap' },
      STORY_CATS.map(cat =>
        container({ flex_direction: 'column', flex_gap: { row: '0', column: '8', unit: 'px' }, flex_align_items: 'center' }, [
          widget('image', {
            image: { url: cat.img, id: '' },
            image_size: 'thumbnail',
            title_text: cat.name,
            width: { unit: 'px', size: '96' },
            height: { unit: 'px', size: '96' },
            object_fit: 'cover',
            image_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true },
            link: { url: '/reels', is_external: '' },
          }),
          widget('heading', { title: cat.name, header_size: 'div', align: 'center', title_color: C.gray300, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '400' }),
        ])
      )
    ),
  ]);

  // Clips & Reels
  const clipsSection = container({ ...colContainer, padding: box('px', 48) }, [
    container({ flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center', margin: { unit: 'px', top: '0', right: '0', bottom: '32', left: '0', isLinked: false } }, [
      container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' }, flex_align_items: 'center' }, [
        widget('icon', { selected_icon: { value: 'fas fa-film', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_width: box('px', 1), icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '8', isLinked: true }, icon_size: { unit: 'px', size: '18' } }),
        heading('کلیپ‌ها و ریلزها', 28, '700', C.white, 'h2'),
      ]),
      container({ flex_direction: 'row', flex_gap: { row: '6', column: '0', unit: 'px' }, flex_align_items: 'center' }, [
        btn('مشاهده همه', '/reels', 'transparent', 'rgba(99,186,198,0.7)', false),
        widget('icon', { selected_icon: { value: 'fas fa-arrow-left', library: 'fa-solid' }, icon_color: 'rgba(99,186,198,0.7)', icon_size: { unit: 'px', size: '16' } }),
      ]),
    ]),
    container({ flex_direction: 'row', flex_gap: { row: '16', column: '16', unit: 'px' }, flex_wrap: 'wrap' },
      REELS_DATA.map(reel =>
        container({ flex_direction: 'column', flex_gap: { row: '0', column: '8', unit: 'px' }, ...darkCard, padding: box('px', 0) }, [
          widget('image', {
            image: { url: reel.thumb, id: '' },
            image_size: 'full',
            title_text: reel.title,
            width: { unit: 'px', size: '180' },
            height: { unit: 'px', size: '320' },
            object_fit: 'cover',
            image_border_radius: { unit: 'px', top: '16', right: '16', bottom: '0', left: '0', isLinked: false },
            link: { url: '/reels', is_external: '' },
          }),
          container({ flex_direction: 'column', padding: boxSide('px', 12, 12, 12, 12) }, [
            widget('heading', { title: reel.title, header_size: 'div', align: 'right', title_color: C.white, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '600' }),
            textEditor(`<p style="font-size:10px;color:#aeb6c0;"><i class="fas fa-play" style="font-size:10px;margin-left:4px;"></i>${reel.views} بازدید</p>`, C.gray300, 10),
          ]),
        ])
      )
    ),
  ]);

  // Reservation + Events
  const resEventsSection = container({ ...colContainer, padding: box('px', 48) }, [
    container({ flex_direction: 'row', flex_gap: { row: '24', column: '0', unit: 'px' }, flex_wrap: 'wrap' }, [
      // Reservation card
      container({ ...darkCard, flex_direction: 'column', flex_gap: { row: '0', column: '16', unit: 'px' }, content_width: '48%' }, [
        container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' }, flex_align_items: 'center' }, [
          widget('icon', { selected_icon: { value: 'fas fa-table', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_width: box('px', 1), icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '8', isLinked: true }, icon_size: { unit: 'px', size: '20' } }),
          heading('رزرو میز', 24, '700', C.white, 'h3'),
        ]),
        textEditor('<p>میز دلخواه خود را برای یک تجربه خاص رزرو کنید.</p>', C.gray400, 14),
        widget('form', {
          form_name: 'homepage_reservation',
          form_fields: [
            { key: 'guests', type: 'select', label: 'تعداد نفرات', options: '1 نفر|2 نفر|3 نفر|4 نفر|5 نفر|6 نفر|7 نفر|8 نفر|بیشتر از ۸ نفر', required: true, width: '33' },
            { key: 'time', type: 'select', label: 'ساعت', options: '12:00|13:00|14:00|16:00|18:00|19:00|20:00|21:00|22:00', required: true, width: '33' },
            { key: 'date', type: 'date', label: 'تاریخ', required: true, width: '34' },
          ],
          submit_button_text: 'جستجو و رزرو',
          button_background_color: C.cyan,
          button_text_color: C.navy950,
          button_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
          button_width: '100',
          field_background_color: 'rgba(7,53,74,0.5)',
          field_border_color: 'rgba(99,186,198,0.2)',
          field_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
          field_text_color: C.white,
          ...fontFamily(),
          field_typography_font_size: { unit: 'px', size: '14' },
        }),
      ]),
      // Events card
      container({
        ...darkCard, padding: box('px', 32),
        background_background: 'classic',
        background_color: C.navy900,
        background_image: { url: IMG.event1, id: '' },
        background_size: 'cover',
        background_position: 'center center',
        background_overlay_background: 'gradient',
        background_overlay_color: C.navy950,
        background_overlay_color_b: 'transparent',
        background_overlay_gradient_angle: 90,
        content_width: '48%',
        flex_direction: 'column',
        flex_justify_content: 'flex-end',
        min_height: '300px',
      }, [
        container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' }, flex_align_items: 'center' }, [
          widget('icon', { selected_icon: { value: 'fas fa-calendar', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_width: box('px', 1), icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '8', isLinked: true }, icon_size: { unit: 'px', size: '20' } }),
          heading('مراسم و جشن‌ها', 24, '700', C.white, 'h3'),
        ]),
        textEditor('<p>برای مراسم خاص خود، فضایی خصوصی و به‌یادماندنی با امکانات ویژه رزرو کنید.</p>', C.gray300, 14),
        btn('اطلاعات بیشتر', '/events', 'transparent', C.cyan, true),
      ]),
    ]),
  ]);

  // About section
  const aboutSection = container({ ...colContainer, padding: box('px', 48) }, [
    container({ flex_direction: 'row', flex_gap: { row: '32', column: '0', unit: 'px' }, flex_align_items: 'center', flex_wrap: 'wrap' }, [
      // Image collage
      container({ flex_direction: 'row', flex_gap: { row: '12', column: '12', unit: 'px' }, content_width: '48%' }, [
        container({ ...darkCard, padding: box('px', 0), content_width: '66%' }, [image(IMG.space1, 'فضای کافئینو', 16)]),
        container({ flex_direction: 'column', flex_gap: { row: '0', column: '12', unit: 'px' }, content_width: '33%' }, [
          container({ ...darkCard, padding: box('px', 0) }, [image(IMG.coffee1, 'قهوه کافئینو', 16)]),
          container({ ...darkCard, padding: box('px', 0) }, [image(IMG.dessert1, 'دسر کافئینو', 16)]),
        ]),
      ]),
      // Text
      container({ flex_direction: 'column', flex_gap: { row: '0', column: '24', unit: 'px' }, content_width: '48%' }, [
        container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' }, flex_align_items: 'center' }, [
          widget('icon', { selected_icon: { value: 'fas fa-home', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_width: box('px', 1), icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '8', isLinked: true }, icon_size: { unit: 'px', size: '18' } }),
          heading('درباره کافئینو', 28, '700', C.white, 'h2'),
        ]),
        textEditor('<p>کافئینو جایی است برای آرامش، لذت و تجربه طعم‌های به‌یادماندنی. ما تلاش می‌کنیم با ترکیب قهوه باکیفیت، غذای تازه، فضای دلنشین و میزبانی حرفه‌ای، لحظه‌هایی متفاوت برای شما خلق کنیم.</p>', C.gray300, 15),
        container({ flex_direction: 'row', flex_gap: { row: '16', column: '16', unit: 'px' }, flex_wrap: 'wrap' }, [
          iconBox('fas fa-home', 'محیطی گرم و صمیمی', 'فضایی دنج برای آرامش و گفتگو'),
          iconBox('fas fa-list', 'منوی متنوع', 'از قهوه تا غذای اصلی، همه چیز'),
          iconBox('fas fa-users', 'تیم حرفه‌ای', 'باریستاها و سرآشپزهای مجرب'),
          iconBox('fas fa-star', 'بهترین کیفیت', 'مواد اولیه تازه و باکیفیت'),
        ]),
        btn('بیشتر درباره ما', '/about', 'transparent', C.cyan, true),
      ]),
    ]),
  ]);

  // Gallery section
  const gallerySection = container({ ...colContainer, padding: box('px', 48) }, [
    container({ flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center', margin: { unit: 'px', top: '0', right: '0', bottom: '32', left: '0', isLinked: false } }, [
      container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' }, flex_align_items: 'center' }, [
        widget('icon', { selected_icon: { value: 'fas fa-camera', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_width: box('px', 1), icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '8', isLinked: true }, icon_size: { unit: 'px', size: '18' } }),
        heading('گالری تصاویر', 28, '700', C.white, 'h2'),
      ]),
      btn('مشاهده همه', '/gallery', 'transparent', 'rgba(99,186,198,0.7)', false),
    ]),
    widget('image-gallery', {
      wp_gallery: GALLERY_IMGS.map((src, i) => ({ url: src, id: String(i + 1) })),
      gallery_columns: '4',
      gallery_spacing: { unit: 'px', size: '12' },
      gallery_border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
    }),
  ]);

  // Social section
  const socialSection = container({ ...colContainer, padding: box('px', 48), flex_align_items: 'center' }, [
    container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
      widget('icon', { selected_icon: { value: 'fab fa-instagram', library: 'fa-brands' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '16' } }),
      widget('heading', { title: '@cafeino', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
    ]),
    heading('ما را در اینستاگرام دنبال کنید', 28, '700', C.white, 'h2'),
    textEditor('<p>لحظه‌های روزمره کافئینو، قهوه‌های تازه، غذاهای خوشمزه و فضای دنج ما را در اینستاگرام ببینید.</p>', C.gray400, 14),
    widget('image-gallery', {
      wp_gallery: GALLERY_IMGS.slice(0, 6).map((src, i) => ({ url: src, id: String(i + 1) })),
      gallery_columns: '6',
      gallery_spacing: { unit: 'px', size: '10' },
      gallery_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
    }),
    btn('مشاهده اینستاگرام', 'https://instagram.com/cafeino', C.cyan, C.navy950, false),
  ]);

  // Contact section
  const contactSection = container({ ...colContainer, padding: box('px', 48) }, [
    container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' }, flex_align_items: 'center', margin: { unit: 'px', top: '0', right: '0', bottom: '32', left: '0', isLinked: false } }, [
      widget('icon', { selected_icon: { value: 'fas fa-phone', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_width: box('px', 1), icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '8', isLinked: true }, icon_size: { unit: 'px', size: '18' } }),
      heading('تماس با ما', 28, '700', C.white, 'h2'),
    ]),
    container({ flex_direction: 'row', flex_gap: { row: '16', column: '0', unit: 'px' }, flex_wrap: 'wrap' }, [
      container({ ...darkCard, padding: box('px', 20), content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fas fa-map-marker-alt', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '10', isLinked: true }, icon_size: { unit: 'px', size: '20' } }),
        heading('آدرس', 14, '600', C.white, 'h3'),
        textEditor(`<p>${CONTACT.address}</p>`, C.gray400, 14),
      ]),
      container({ ...darkCard, padding: box('px', 20), content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fas fa-phone', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '10', isLinked: true }, icon_size: { unit: 'px', size: '20' } }),
        heading('تلفن', 14, '600', C.white, 'h3'),
        textEditor(`<p dir="ltr">${CONTACT.phone}</p>`, C.gray400, 14),
      ]),
      container({ ...darkCard, padding: box('px', 20), content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fas fa-clock', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '10', isLinked: true }, icon_size: { unit: 'px', size: '20' } }),
        heading('ساعات کاری', 14, '600', C.white, 'h3'),
        textEditor(`<p>${CONTACT.hours}</p>`, C.gray400, 14),
      ]),
      container({ ...darkCard, padding: box('px', 20), content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fab fa-instagram', library: 'fa-brands' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '10', isLinked: true }, icon_size: { unit: 'px', size: '20' } }),
        heading('شبکه‌های اجتماعی', 14, '600', C.white, 'h3'),
        container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' } }, [
          widget('icon', { selected_icon: { value: 'fab fa-instagram', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://instagram.com/cafeino', is_external: 'on' } }),
          widget('icon', { selected_icon: { value: 'fab fa-telegram', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://t.me/cafeino', is_external: 'on' } }),
          widget('icon', { selected_icon: { value: 'fab fa-whatsapp', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://wa.me/09123456789', is_external: 'on' } }),
        ]),
      ]),
    ]),
    widget('html', { html: '<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=51.389,35.696,51.419,35.716&layer=mapnik" style="width:100%;height:300px;border:none;border-radius:24px;filter:invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1);" loading="lazy" title="نقشه کافئینو"></iframe>' }),
  ]);

  return [hero, storySection, clipsSection, resEventsSection, aboutSection, gallerySection, socialSection, contactSection];
}

function buildMenuPage() {
  const menuCards = MENU_ITEMS.map(item =>
    container({ ...darkCard, padding: box('px', 0), flex_direction: 'column', content_width: '32%' }, [
      widget('image', {
        image: { url: item.img, id: '' },
        image_size: 'full',
        title_text: item.name,
        width: { unit: '%', size: '100' },
        height: { unit: 'px', size: '200' },
        object_fit: 'cover',
        image_border_radius: { unit: 'px', top: '16', right: '16', bottom: '0', left: '0', isLinked: false },
      }),
      container({ flex_direction: 'column', flex_gap: { row: '0', column: '8', unit: 'px' }, padding: box('px', 16) }, [
        container({ flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'flex-start' }, [
          heading(item.name, 14, '600', C.white, 'h3'),
          widget('heading', { title: item.price, header_size: 'div', align: 'left', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '14' }, typography_font_weight: '700' }),
        ]),
        textEditor(`<p>${item.desc}</p>`, C.gray400, 12),
        item.featured ? widget('heading', { title: 'پیشنهادی', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '10' }, typography_font_weight: '700' }) : null,
      ].filter(Boolean)),
    ])
  );

  return [
    container({ ...colContainer, padding: box('px', 48), flex_align_items: 'center' }, [
      container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
        widget('icon', { selected_icon: { value: 'fas fa-coffee', library: 'fa-solid' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '14' } }),
        widget('heading', { title: 'منوی کافئینو', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
      ]),
      heading('منوی آنلاین', 48, '700', C.white, 'h1'),
      textEditor('<p>از قهوه صبحگاهی تا شام ویژه، همه چیز برای یک تجربه خوشمزه.</p>', C.gray400, 14),
    ]),
    // Category tabs as HTML widget (native Elementor doesn't have interactive tab filtering)
    widget('html', { html: '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:32px;" id="cafeino-menu-tabs"><button class="cafeino-tab active" data-cat="all" style="background:#63bac6;color:#031C2C;border:none;padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;font-weight:500;">همه</button><button class="cafeino-tab" data-cat="coffee" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">قهوه و اسپرسو</button><button class="cafeino-tab" data-cat="cold" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">نوشیدنی‌های سرد</button><button class="cafeino-tab" data-cat="tea" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">چای و دمنوش</button><button class="cafeino-tab" data-cat="breakfast" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">صبحانه</button><button class="cafeino-tab" data-cat="appetizer" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">پیش‌غذا</button><button class="cafeino-tab" data-cat="main" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">غذاهای اصلی</button><button class="cafeino-tab" data-cat="pasta" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">پاستا</button><button class="cafeino-tab" data-cat="burger" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">برگر و ساندویچ</button><button class="cafeino-tab" data-cat="dessert" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">دسر</button><button class="cafeino-tab" data-cat="cake" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">کیک</button><button class="cafeino-tab" data-cat="special" style="background:#05263A;color:#8b9aa5;border:1px solid rgba(99,186,198,0.1);padding:8px 16px;border-radius:50px;font-family:Vazirmatn;font-size:14px;cursor:pointer;">نوشیدنی‌های ویژه</button></div>' }),
    container({ flex_direction: 'row', flex_gap: { row: '16', column: '16', unit: 'px' }, flex_wrap: 'wrap' }, menuCards),
  ];
}

function buildEventsPage() {
  const eventCards = EVENTS_DATA.map(ev =>
    container({ ...darkCard, padding: box('px', 0), flex_direction: 'column', content_width: '32%' }, [
      widget('image', {
        image: { url: ev.img, id: '' },
        image_size: 'full',
        title_text: ev.title,
        width: { unit: '%', size: '100' },
        height: { unit: 'px', size: '240' },
        object_fit: 'cover',
        image_border_radius: { unit: 'px', top: '16', right: '16', bottom: '0', left: '0', isLinked: false },
      }),
      container({ flex_direction: 'column', flex_gap: { row: '0', column: '12', unit: 'px' }, padding: box('px', 20) }, [
        heading(ev.title, 18, '700', C.white, 'h3'),
        textEditor(`<p>${ev.desc}</p>`, C.gray400, 14),
        textEditor(`<p><i class="fas fa-users" style="color:rgba(99,186,198,0.6);margin-left:6px;"></i>${ev.cap}</p>`, C.gray300, 14),
        textEditor(`<p style="font-size:12px;"><strong style="color:#63bac6;">امکانات:</strong> ${ev.svc}</p>`, C.gray400, 12),
        btn('رزرو این مراسم', '/reservation', 'transparent', C.cyan, true),
      ]),
    ])
  );

  return [
    container({ ...colContainer, padding: box('px', 48), flex_align_items: 'center' }, [
      container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
        widget('icon', { selected_icon: { value: 'fas fa-calendar', library: 'fa-solid' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '14' } }),
        widget('heading', { title: 'مراسم و جشن‌ها', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
      ]),
      heading('مراسم و جشن‌ها', 48, '700', C.white, 'h1'),
      textEditor('<p>برای مراسم خاص خود، فضایی خصوصی و به‌یادماندنی با امکانات ویژه رزرو کنید.</p>', C.gray400, 14),
    ]),
    container({ flex_direction: 'row', flex_gap: { row: '20', column: '20', unit: 'px' }, flex_wrap: 'wrap' }, eventCards),
  ];
}

function buildGalleryPage() {
  return [
    container({ ...colContainer, padding: box('px', 48), flex_align_items: 'center' }, [
      container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
        widget('icon', { selected_icon: { value: 'fas fa-camera', library: 'fa-solid' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '14' } }),
        widget('heading', { title: 'گالری', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
      ]),
      heading('گالری کافئینو', 48, '700', C.white, 'h1'),
      textEditor('<p>لحظه‌های زیبای کافئینو را کشف کنید.</p>', C.gray400, 14),
    ]),
    widget('image-gallery', {
      wp_gallery: GALLERY_IMGS.map((src, i) => ({ url: src, id: String(i + 1) })),
      gallery_columns: '4',
      gallery_spacing: { unit: 'px', size: '16' },
      gallery_border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
      gallery_links_to: 'file',
    }),
  ];
}

function buildReservationPage() {
  return [
    container({ ...colContainer, padding: box('px', 48), flex_align_items: 'center' }, [
      container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
        widget('icon', { selected_icon: { value: 'fas fa-table', library: 'fa-solid' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '14' } }),
        widget('heading', { title: 'رزرو میز', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
      ]),
      heading('رزرو آنلاین میز', 48, '700', C.white, 'h1'),
      textEditor('<p>میز دلخواه خود را برای یک تجربه خاص در کافئینو رزرو کنید.</p>', C.gray400, 14),
    ]),
    container({ flex_direction: 'column', content_width: '600px', ...darkCard, padding: box('px', 32) }, [
      widget('form', {
        form_name: 'full_reservation',
        form_fields: [
          { key: 'name', type: 'text', label: 'نام و نام خانوادگی', placeholder: 'نام خود را وارد کنید', required: true, width: '100' },
          { key: 'phone', type: 'tel', label: 'شماره تماس', placeholder: '۰۹۱۲۳۴۵۶۷۸۹', required: true, width: '100' },
          { key: 'date', type: 'date', label: 'تاریخ', required: true, width: '33' },
          { key: 'time', type: 'select', label: 'ساعت', options: '12:00|13:00|14:00|16:00|18:00|19:00|20:00|21:00|22:00', required: true, width: '33' },
          { key: 'guests', type: 'select', label: 'تعداد نفرات', options: '1 نفر|2 نفر|3 نفر|4 نفر|5 نفر|6 نفر|7 نفر|8 نفر|بیشتر از ۸ نفر', required: true, width: '34' },
          { key: 'notes', type: 'textarea', label: 'توضیحات (اختیاری)', placeholder: 'درخواست‌های خاص خود را بنویسید...', width: '100' },
        ],
        submit_button_text: 'جستجو و رزرو',
        button_background_color: C.cyan,
        button_text_color: C.navy950,
        button_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
        button_width: '100',
        field_background_color: 'rgba(7,53,74,0.5)',
        field_border_color: 'rgba(99,186,198,0.2)',
        field_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
        field_text_color: C.white,
        ...fontFamily(),
        field_typography_font_size: { unit: 'px', size: '14' },
        label_color: C.gray400,
        label_typography_font_size: { unit: 'px', size: '12' },
      }),
    ]),
  ];
}

function buildAboutPage() {
  return [
    container({ ...colContainer, padding: box('px', 48), flex_align_items: 'center' }, [
      container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
        widget('icon', { selected_icon: { value: 'fas fa-home', library: 'fa-solid' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '14' } }),
        widget('heading', { title: 'درباره ما', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
      ]),
      heading('درباره کافئینو', 48, '700', C.white, 'h1'),
    ]),
    // Hero image
    container({ ...darkCard, padding: box('px', 0), position: 'relative', min_height: '400px' }, [
      widget('image', { image: { url: IMG.space1, id: '' }, image_size: 'full', width: { unit: '%', size: '100' }, height: { unit: 'px', size: '400' }, object_fit: 'cover', image_border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true } }),
      container({ flex_direction: 'column', flex_gap: { row: '0', column: '12', unit: 'px' }, position: 'absolute', bottom: '40px', right: '40px', width: '60%' }, [
        heading('جایی برای لحظه‌های به‌یادماندنی', 36, '700', C.white, 'h2'),
        textEditor('<p>کافئینو جایی است برای آرامش، لذت و تجربه طعم‌های به‌یادماندنی. ما تلاش می‌کنیم با ترکیب قهوه باکیفیت، غذای تازه، فضای دلنشین و میزبانی حرفه‌ای، لحظه‌هایی متفاوت برای شما خلق کنیم.</p>', C.gray300, 15),
      ]),
    ]),
    // Feature cards
    container({ flex_direction: 'row', flex_gap: { row: '16', column: '0', unit: 'px' }, flex_wrap: 'wrap' }, [
      container({ ...darkCard, padding: box('px', 24), flex_direction: 'column', flex_align_items: 'center', content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fas fa-home', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '12', isLinked: true }, icon_size: { unit: 'px', size: '24' } }),
        heading('محیطی گرم و صمیمی', 14, '600', C.white, 'h3'),
        textEditor('<p>فضایی دنج برای آرامش و گفتگو</p>', C.gray400, 12),
      ]),
      container({ ...darkCard, padding: box('px', 24), flex_direction: 'column', flex_align_items: 'center', content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fas fa-list', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '12', isLinked: true }, icon_size: { unit: 'px', size: '24' } }),
        heading('منوی متنوع', 14, '600', C.white, 'h3'),
        textEditor('<p>از قهوه تا غذای اصلی، همه چیز</p>', C.gray400, 12),
      ]),
      container({ ...darkCard, padding: box('px', 24), flex_direction: 'column', flex_align_items: 'center', content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fas fa-users', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '12', isLinked: true }, icon_size: { unit: 'px', size: '24' } }),
        heading('تیم حرفه‌ای', 14, '600', C.white, 'h3'),
        textEditor('<p>باریستاها و سرآشپزهای مجرب</p>', C.gray400, 12),
      ]),
      container({ ...darkCard, padding: box('px', 24), flex_direction: 'column', flex_align_items: 'center', content_width: '24%' }, [
        widget('icon', { selected_icon: { value: 'fas fa-star', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '12', isLinked: true }, icon_size: { unit: 'px', size: '24' } }),
        heading('بهترین کیفیت', 14, '600', C.white, 'h3'),
        textEditor('<p>مواد اولیه تازه و باکیفیت</p>', C.gray400, 12),
      ]),
    ]),
    // Story section
    container({ flex_direction: 'row', flex_gap: { row: '32', column: '0', unit: 'px' }, flex_align_items: 'center', flex_wrap: 'wrap' }, [
      container({ flex_direction: 'row', flex_gap: { row: '12', column: '12', unit: 'px' }, flex_wrap: 'wrap', content_width: '48%' }, [
        image(IMG.coffee1, 'قهوه', 16),
        image(IMG.food1, 'غذا', 16),
        image(IMG.dessert1, 'دسر', 16),
        image(IMG.behind, 'فضای شبانه', 16),
      ]),
      container({ flex_direction: 'column', flex_gap: { row: '0', column: '16', unit: 'px' }, content_width: '48%' }, [
        heading('داستان ما', 28, '700', C.white, 'h2'),
        textEditor('<p>کافئینو با رویکردی متفاوت به دنیای قهوه و رستوران متولد شد. ما باور داریم که هر فنجان قهوه و هر بشقاب غذا، فرصتی است برای خلق یک خاطره.</p>', C.gray400, 14),
        textEditor('<p>از انتخاب دانه‌های قهوه تک‌ریشه تا استفاده از تازه‌ترین مواد اولیه در آشپزخانه، هر جزئیات برای تجربه‌ای خاص و متمایز طراحی شده است.</p>', C.gray400, 14),
        textEditor('<p>تیم حرفه‌ای ما، از باریستاها تا سرآشپزها، با عشق و تعهد، بهترین کیفیت را برای شما تضمین می‌کنند.</p>', C.gray400, 14),
        btn('مشاهده منو', '/menu', C.cyan, C.navy950, false),
      ]),
    ]),
  ];
}

function buildContactPage() {
  return [
    container({ ...colContainer, padding: box('px', 48), flex_align_items: 'center' }, [
      container({ flex_direction: 'row', flex_gap: { row: '8', column: '0', unit: 'px' }, flex_align_items: 'center', background_background: 'classic', background_color: 'rgba(99,186,198,0.1)', border_border: 'solid', border_color: 'rgba(99,186,198,0.2)', border_width: box('px', 1), border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, padding: boxSide('px', 6, 16, 6, 16) }, [
        widget('icon', { selected_icon: { value: 'fas fa-phone', library: 'fa-solid' }, icon_color: C.cyan, icon_size: { unit: 'px', size: '14' } }),
        widget('heading', { title: 'تماس با ما', header_size: 'div', align: 'right', title_color: C.cyan, ...fontFamily(), typography_font_size: { unit: 'px', size: '12' }, typography_font_weight: '500' }),
      ]),
      heading('با ما در ارتباط باشید', 48, '700', C.white, 'h1'),
      textEditor('<p>هر سوال یا پیشنهادی دارید، خوشحال می‌شویم بشنویم.</p>', C.gray400, 14),
    ]),
    container({ flex_direction: 'row', flex_gap: { row: '24', column: '0', unit: 'px' }, flex_wrap: 'wrap' }, [
      // Info column
      container({ flex_direction: 'column', flex_gap: { row: '0', column: '16', unit: 'px' }, content_width: '33%' }, [
        container({ ...darkCard, padding: box('px', 20) }, [widget('icon', { selected_icon: { value: 'fas fa-map-marker-alt', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '10', isLinked: true }, icon_size: { unit: 'px', size: '20' } }), heading('آدرس', 14, '600', C.white, 'h3'), textEditor(`<p>${CONTACT.address}</p>`, C.gray400, 14)]),
        container({ ...darkCard, padding: box('px', 20) }, [widget('icon', { selected_icon: { value: 'fas fa-phone', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '10', isLinked: true }, icon_size: { unit: 'px', size: '20' } }), heading('تلفن', 14, '600', C.white, 'h3'), textEditor(`<p dir="ltr">${CONTACT.phone}</p>`, C.gray400, 14)]),
        container({ ...darkCard, padding: box('px', 20) }, [widget('icon', { selected_icon: { value: 'fas fa-clock', library: 'fa-solid' }, icon_color: C.cyan, icon_background_background: 'classic', icon_background_color: 'rgba(99,186,198,0.1)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, icon_padding: { unit: 'px', size: '10', isLinked: true }, icon_size: { unit: 'px', size: '20' } }), heading('ساعات کاری', 14, '600', C.white, 'h3'), textEditor(`<p>${CONTACT.hours}</p>`, C.gray400, 14)]),
        container({ ...darkCard, padding: box('px', 20) }, [
          heading('شبکه‌های اجتماعی', 14, '600', C.white, 'h3'),
          container({ flex_direction: 'row', flex_gap: { row: '12', column: '0', unit: 'px' } }, [
            widget('icon', { selected_icon: { value: 'fab fa-instagram', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://instagram.com/cafeino', is_external: 'on' } }),
            widget('icon', { selected_icon: { value: 'fab fa-telegram', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://t.me/cafeino', is_external: 'on' } }),
            widget('icon', { selected_icon: { value: 'fab fa-whatsapp', library: 'fa-brands' }, icon_color: C.cyan, icon_border_border: 'solid', icon_border_color: 'rgba(99,186,198,0.2)', icon_border_radius: { unit: 'px', top: '50', right: '50', bottom: '50', left: '50', isLinked: true }, link: { url: 'https://wa.me/09123456789', is_external: 'on' } }),
          ]),
        ]),
      ]),
      // Form column
      container({ flex_direction: 'column', flex_gap: { row: '0', column: '24', unit: 'px' }, content_width: '66%' }, [
        container({ ...darkCard, padding: box('px', 32) }, [
          widget('form', {
            form_name: 'contact_form',
            form_fields: [
              { key: 'name', type: 'text', label: 'نام شما', placeholder: 'نام خود را وارد کنید', required: true, width: '100' },
              { key: 'email', type: 'email', label: 'ایمیل', placeholder: 'example@email.com', required: true, width: '100' },
              { key: 'message', type: 'textarea', label: 'پیام', placeholder: 'پیام خود را بنویسید...', required: true, width: '100', rows: '6' },
            ],
            submit_button_text: 'ارسال پیام',
            button_background_color: C.cyan,
            button_text_color: C.navy950,
            button_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
            button_width: '100',
            field_background_color: 'rgba(7,53,74,0.5)',
            field_border_color: 'rgba(99,186,198,0.2)',
            field_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
            field_text_color: C.white,
            ...fontFamily(),
            field_typography_font_size: { unit: 'px', size: '14' },
            label_color: C.gray400,
            label_typography_font_size: { unit: 'px', size: '12' },
          }),
        ]),
        widget('html', { html: '<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=51.389,35.696,51.419,35.716&layer=mapnik" style="width:100%;height:250px;border:none;border-radius:24px;filter:invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1);" loading="lazy" title="نقشه کافئینو"></iframe>' }),
      ]),
    ]),
  ];
}

// ── Generate all files ──
const outDir = path.join(__dirname);
const tplDir = path.join(outDir, 'elementor-templates');

if (!fs.existsSync(tplDir)) fs.mkdirSync(tplDir, { recursive: true });

const templates = {
  'caffeino-homepage.json': template('کافئینو - صفحه اصلی', 'page', buildHomepage(), { content_width: 'full', hide_title: 'yes' }),
  'caffeino-header.json': template('کافئینو - هدر', 'header', [buildHeader()], {}),
  'caffeino-footer.json': template('کافئینو - فوتر', 'footer', [buildFooter()], {}),
  'caffeino-menu.json': template('کافئینو - منو', 'page', buildMenuPage(), { content_width: 'full', hide_title: 'yes' }),
  'caffeino-events.json': template('کافئینو - مراسم و جشن‌ها', 'page', buildEventsPage(), { content_width: 'full', hide_title: 'yes' }),
  'caffeino-gallery.json': template('کافئینو - گالری', 'page', buildGalleryPage(), { content_width: 'full', hide_title: 'yes' }),
  'caffeino-reservation.json': template('کافئینو - رزرو میز', 'page', buildReservationPage(), { content_width: 'full', hide_title: 'yes' }),
  'caffeino-about.json': template('کافئینو - درباره ما', 'page', buildAboutPage(), { content_width: 'full', hide_title: 'yes' }),
  'caffeino-contact.json': template('کافئینو - تماس با ما', 'page', buildContactPage(), { content_width: 'full', hide_title: 'yes' }),
};

Object.entries(templates).forEach(([filename, json]) => {
  fs.writeFileSync(path.join(tplDir, filename), json);
  console.log(`✓ ${filename}`);
});

console.log(`\nAll ${Object.keys(templates).length} templates generated.`);
