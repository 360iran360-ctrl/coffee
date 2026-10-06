import type { MenuItem, MenuCategory, Reel, StoryCategory, EventItem, GalleryImage } from './types';

export const NAV_LINKS = [
  { label: 'خانه', href: '/' },
  { label: 'منو', href: '/menu' },
  { label: 'گالری', href: '/gallery' },
  { label: 'رزرو', href: '/reservation' },
  { label: 'مراسم و جشن‌ها', href: '/events' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

export const HERO_SLIDES = [
  {
    title1: 'لحظه‌های خاص',
    title2: 'با طعم به‌یادماندنی',
    subtitle: 'کافه کافئینو، جایی برای تجربه طعم‌های خاص، محیطی دلنشین و خاطره‌سازی با عزیزان شما.',
    image: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=1600&q=80',
  },
  {
    title1: 'قهوه‌ای تازه',
    title2: 'برای یک حال خوب',
    subtitle: 'هر فنجان قهوه، داستانی از عشق و هنر. با ما، روزتان را متفاوت آغاز کنید.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80',
  },
  {
    title1: 'کنار هم بودن',
    title2: 'خوشمزه‌تر است',
    subtitle: 'غذای تازه، محیط گرم و لحظه‌هایی که دوست دارید دوباره تجربه‌شان کنید.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80',
  },
];

export const HERO_FEATURES = [
  { icon: 'heart', title: 'محیطی دلنشین', text: 'فضایی گرم و صمیمی' },
  { icon: 'leaf', title: 'مواد اولیه تازه', text: 'تازه و باکیفیت' },
  { icon: 'star', title: 'کیفیت بی‌نظیر', text: 'هنر و سلیقه' },
];

export const STORY_CATEGORIES: StoryCategory[] = [
  { id: 'coffee', name: 'قهوه و نوشیدنی', image: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=400&q=80', icon: 'coffee' },
  { id: 'food', name: 'غذاهای ویژه', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7eaa5?w=400&q=80', icon: 'utensils' },
  { id: 'dessert', name: 'دسرهای خوشمزه', image: 'https://images.unsplash.com/photo-1551024601-b5117d5f5d8f?w=400&q=80', icon: 'cake' },
  { id: 'space', name: 'فضای رستوران', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80', icon: 'home' },
  { id: 'customers', name: 'مشتریان ما', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34cf?w=400&q=80', icon: 'users' },
  { id: 'behind', name: 'پشت صحنه', image: 'https://images.unsplash.com/photo-1453614512568-c4021d66884c?w=400&q=80', icon: 'camera' },
  { id: 'events', name: 'رویدادها', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80', icon: 'calendar' },
];

export const REELS: Reel[] = [
  {
    id: 'r1',
    title: 'آیس لاته کافئینو',
    thumbnail: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=600&q=80',
    views: '۲٫۱K',
    likes: '۱٫۲K',
    category: 'قهوه و نوشیدنی',
    date: '۱۴۰۳/۰۷/۱۵',
    description: 'طرز تهیه آیس لاته ویژه کافئینو با شیر بادام و عسل طبیعی.',
  },
  {
    id: 'r2',
    title: 'فضای کافه در شب',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
    views: '۳٫۴K',
    likes: '۸۹۰',
    category: 'فضای کافه',
    date: '۱۴۰۳/۰۷/۱۰',
    description: 'نگاهی به فضای دنج و زیبای کافئینو در شب‌های پاییزی.',
  },
  {
    id: 'r3',
    title: 'پاستای مخصوص کافئینو',
    thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80',
    views: '۱٫۸K',
    likes: '۶۵۰',
    category: 'غذا',
    date: '۱۴۰۳/۰۷/۰۵',
    description: 'آماده‌سازی پاستای مخصوص سرآشپز با سس آلفردو و قارچ تازه.',
  },
  {
    id: 'r4',
    title: 'تیرامیسوی تازه',
    thumbnail: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
    views: '۴٫۲K',
    likes: '۲٫۱K',
    category: 'دسر',
    date: '۱۴۰۳/۰۶/۲۸',
    description: 'تیرامیسوی ایتالیایی با ماسکارپونه تازه و قهوه اسپرسو.',
  },
  {
    id: 'r5',
    title: 'شب‌های کافئینو',
    thumbnail: 'https://images.unsplash.com/photo-1453614512568-c4021d66884c?w=600&q=80',
    views: '۲٫۷K',
    likes: '۱٫۵K',
    category: 'فضای کافه',
    date: '۱۴۰۳/۰۶/۲۰',
    description: 'آتmosفر گرم و موسیقی زنده در شب‌های آخر هفته کافئینو.',
  },
  {
    id: 'r6',
    title: 'قهوه و هنر',
    thumbnail: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?w=600&q=80',
    views: '۵٫۱K',
    likes: '۳٫۲K',
    category: 'قهوه و نوشیدنی',
    date: '۱۴۰۳/۰۶/۱۵',
    description: 'هنر لاته آرت و نقاشی روی قهوه توسط باریستاهای کافئینو.',
  },
];

export const FEATURED_REEL = REELS[0];

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'coffee', name: 'قهوه و اسپرسو', icon: 'coffee' },
  { id: 'cold', name: 'نوشیدنی‌های سرد', icon: 'snowflake' },
  { id: 'tea', name: 'چای و دمنوش', icon: 'leaf' },
  { id: 'breakfast', name: 'صبحانه', icon: 'sun' },
  { id: 'appetizer', name: 'پیش‌غذا', icon: 'utensils' },
  { id: 'main', name: 'غذاهای اصلی', icon: 'utensils' },
  { id: 'pasta', name: 'پاستا', icon: 'utensils' },
  { id: 'burger', name: 'برگر و ساندویچ', icon: 'utensils' },
  { id: 'dessert', name: 'دسر', icon: 'cake' },
  { id: 'cake', name: 'کیک', icon: 'cake' },
  { id: 'special', name: 'نوشیدنی‌های ویژه', icon: 'star' },
];

export const MENU_ITEMS: MenuItem[] = [
  // قهوه و اسپرسو
  { id: 'm1', name: 'اسپرسو', description: 'شات‌های غلیظ و خالص از دانه‌های انتخابی', price: 55000, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80', category: 'coffee', available: true, ingredients: ['دانه قهوه ۱۰۰٪', 'آب فیلتر شده'] },
  { id: 'm2', name: 'کاپوچینو', description: 'اسپرسو با شیر بخارپز و فوم مخملی', price: 75000, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80', category: 'coffee', featured: true, available: true, ingredients: ['اسپرسو', 'شیر تازه', 'فوم شیر'] },
  { id: 'm3', name: 'لاته', description: 'شیر بخارپز با اسپرسو و لاته آرت', price: 80000, image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80', category: 'coffee', available: true, ingredients: ['اسپرسو', 'شیر تازه', 'فوم شیر'] },
  { id: 'm4', name: 'موکا', description: 'ترکیب اسپرسو، شکلات و شیر بخارپز', price: 95000, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80', category: 'coffee', available: true, ingredients: ['اسپرسو', 'سوس شکلات', 'شیر'] },

  // نوشیدنی‌های سرد
  { id: 'm5', name: 'آیس لاته', description: 'اسپرسو سرد با شیر و یخ', price: 85000, image: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=600&q=80', category: 'cold', featured: true, available: true, ingredients: ['اسپرسو', 'شیر', 'یخ'] },
  { id: 'm6', name: 'آیس آمریکانو', description: 'اسپرسو سرد با آب و یخ', price: 70000, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80', category: 'cold', available: true, ingredients: ['اسپرسو', 'آب', 'یخ'] },
  { id: 'm7', name: 'شیک نوتلا', description: 'شیک خامه‌ای نوتلا با بستنی وانیلی', price: 110000, image: 'https://images.unsplash.com/photo-1572490122747-39d8e00586d0?w=600&q=80', category: 'cold', available: true, ingredients: ['نوتلا', 'بستنی وانیلی', 'شیر'] },

  // چای و دمنوش
  { id: 'm8', name: 'چای سیاه سنتی', description: 'چای ممتاز لاهیجان با عرقیات', price: 40000, image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&q=80', category: 'tea', available: true, ingredients: ['چای سیاه', 'عرق بهارنارنج'] },
  { id: 'm9', name: 'دمنوش بهارنارنج', description: 'دمنوش آرام‌بخش بهارنارنج و بابونه', price: 50000, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80', category: 'tea', available: true, ingredients: ['بهارنارنج', 'بابونه', 'پونه'] },

  // صبحانه
  { id: 'm10', name: 'صبحانه کافئینو', description: 'تخم مرغ، پنیر، گردو، عسل و کره', price: 180000, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80', category: 'breakfast', featured: true, available: true, ingredients: ['تخم مرغ', 'پنیر محلی', 'گردو', 'عسل طبیعی'] },
  { id: 'm11', name: 'املت اسپانیایی', description: 'املت با فلفل دلمه، گوجه و سیب‌زمینی', price: 150000, image: 'https://images.unsplash.com/photo-1525351484163-7510ef9f71ec?w=600&q=80', category: 'breakfast', available: true, ingredients: ['تخم مرغ', 'فلفل دلمه', 'گوجه'] },

  // پیش‌غذا
  { id: 'm12', name: 'سالاد سزار', description: 'کاهو، مرط گریل، پارمسان و سس سزار', price: 120000, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80', category: 'appetizer', available: true, ingredients: ['کاهو', 'مرغ گریل', 'پنیر پارمسان', 'سس سزار'] },
  { id: 'm13', name: 'سوپ قارچ', description: 'سوپ خامه‌ای قارچ تازه با کرامبل', price: 95000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80', category: 'appetizer', available: true, ingredients: ['قارچ تازه', 'خامه', 'پیاز'] },

  // غذاهای اصلی
  { id: 'm14', name: 'جوجه کباب زعفرانی', description: 'سینه مرغ گریل با زعفران و برنج زعفرانی', price: 320000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', category: 'main', featured: true, available: true, ingredients: ['سینه مرغ', 'زعفران', 'برنج', 'کره'] },
  { id: 'm15', name: 'کباب کوبیده', description: 'دو سیخ کوبیده گوسفندی با برنج و گوجه گریل', price: 280000, image: 'https://images.unsplash.com/photo-1529193591184-b1d78079ec3a?w=600&q=80', category: 'main', available: true, ingredients: ['گوشت گوسفندی', 'پیاز', 'برنج'] },

  // پاستا
  { id: 'm16', name: 'پاستا آلفردو', description: 'پاستا با سس خامه‌ای، سینه مرغ و قارچ', price: 240000, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80', category: 'pasta', featured: true, available: true, ingredients: ['پاستا فرنه', 'سینه مرغ', 'قارچ', 'خامه'] },
  { id: 'm17', name: 'پاستا پستو', description: 'پاستا با سس پستو، گوجه گیلاسی و پارمسان', price: 230000, image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&q=80', category: 'pasta', available: true, ingredients: ['پاستا', 'ریحان', 'گوجه گیلاسی', 'پنیر پارمسان'] },

  // برگر و ساندویچ
  { id: 'm18', name: 'برگر کافئینو', description: 'گوشت گوساله، پنیر چدار، سس مخصوص و سیب‌زمینی', price: 260000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450f58ae?w=600&q=80', category: 'burger', featured: true, available: true, ingredients: ['گوشت گوساله', 'پنیر چدار', 'نان بریوش', 'سس مخصوص'] },
  { id: 'm19', name: 'کلاب ساندویچ', description: 'مرغ، بکن، کاهو و سس مخصوص', price: 190000, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80', category: 'burger', available: true, ingredients: ['مرغ', 'بکن', 'کاهو', 'نان تست'] },

  // دسر
  { id: 'm20', name: 'تیرامیسو', description: 'لایه‌های کیک قهوه با ماسکارپونه', price: 120000, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', category: 'dessert', featured: true, available: true, ingredients: ['ماسکارپونه', 'اسپرسو', 'بیسکویت', 'کاکائو'] },
  { id: 'm21', name: 'چیزکیک نیویورکی', description: 'چیزکیک خامه‌ای با سس توت‌فرنگی', price: 130000, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', category: 'dessert', available: true, ingredients: ['پنیر خامه‌ای', 'بیسکویت', 'توت‌فرنگی'] },

  // کیک
  { id: 'm22', name: 'کیک شکلاتی', description: 'کیک سه لایه شکلاتی با گاناش', price: 90000, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80', category: 'cake', available: true, ingredients: ['شکلات تلخ', 'خامه', 'آرد'] },
  { id: 'm23', name: 'کیک هویج', description: 'کیک هویج تازه با کرم پنیر', price: 85000, image: 'https://images.unsplash.com/photo-1599785209707-a456fcf9a2f4?w=600&q=80', category: 'cake', available: true, ingredients: ['هویج', 'کرم پنیر', 'دارچین'] },

  // نوشیدنی‌های ویژه
  { id: 'm24', name: 'ماچا لاته', description: 'ماچای ژاپنی با شیر بخارپز و عسل', price: 120000, image: 'https://images.unsplash.com/photo-1515823893255-9c5e8b1d7d4e?w=600&q=80', category: 'special', featured: true, available: true, ingredients: ['پودر ماچا', 'شیر', 'عسل'] },
  { id: 'm25', name: 'طلایی کافئینو', description: 'شیر طلایی با زردچوبه، عسل و دارچین', price: 110000, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', category: 'special', available: true, ingredients: ['زردچوبه', 'شیر', 'عسل', 'دارچین'] },
];

export const EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'جشن تولد',
    description: 'برای تولد عزیزانتان فضایی خصوصی با دکوراسیون ویژه، کیک تولد و موسیقی زنده رزرو کنید.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    capacity: 'تا ۳۰ نفر',
    services: ['کیک تولد مخصوص', 'دکوراسیون', 'موسیقی زنده', 'عکاسی حرفه‌ای'],
  },
  {
    id: 'e2',
    title: 'جشن خصوصی',
    description: 'فضای اختصاصی کافئینو برای جشن‌های خصوصی و دورهمی‌های دوستانه.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
    capacity: 'تا ۵۰ نفر',
    services: ['منوی اختصاصی', 'باریستا حرفه‌ای', 'فضای خصوصی', 'پارکینگ'],
  },
  {
    id: 'e3',
    title: 'سالگرد ازدواج',
    description: 'شام رمانتیک برای دو نفر با فضای دنج، نورپردازی ویژه و منوی مخصوص.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    capacity: '۲ نفر',
    services: ['شام رمانتیک', 'نورپردازی شمعی', 'گل و دکوراسیون', 'سرویس ویژه'],
  },
  {
    id: 'e4',
    title: 'جلسات کاری',
    description: 'فضای آرام و حرفه‌ای برای جلسات کاری و رویدادهای شرکتی کوچک.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    capacity: 'تا ۲۰ نفر',
    services: ['وای‌فای رایگان', 'پروژکتور', 'پذیرایی', 'نوشیدنی رایگان'],
  },
  {
    id: 'e5',
    title: 'شام رمانتیک',
    description: 'یک شب فراموش‌نشدنی برای دو نفر با منوی مخصوص و فضای خصوصی.',
    image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80',
    capacity: '۲ نفر',
    services: ['منوی ویژه', 'گل رز', 'شممع', 'موسیقی ملایم'],
  },
  {
    id: 'e6',
    title: 'مناسبتی خاص',
    description: 'روز مادر، روز عشق، یلدا و سایر مناسبت‌ها با برنامه‌های ویژه کافئینو.',
    image: 'https://images.unsplash.com/photo-1464349034109-3a50a1f7b7e8?w=800&q=80',
    capacity: 'متغیر',
    services: ['برنامه ویژه', 'منوی فصلی', 'هدیه یادگاری', 'عکاسی'],
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1461026861981-344fae5e7af0?w=800&q=80', alt: 'فنجان قهوه اسپرسو', category: 'coffee', width: 4, height: 3 },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', alt: 'فضای داخلی کافئینو', category: 'space', width: 3, height: 4 },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1546069901-ba9599a7eaa5?w=800&q=80', alt: 'غذای اصلی کافئینو', category: 'food', width: 4, height: 3 },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1551024601-b5117d5f5d8f?w=800&q=80', alt: 'دسر خوشمزه', category: 'dessert', width: 3, height: 4 },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1453614512568-c4021d66884c?w=800&q=80', alt: 'فضای شبانه کافه', category: 'space', width: 4, height: 3 },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34cf?w=800&q=80', alt: 'محیط رستوران', category: 'space', width: 3, height: 4 },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', alt: 'تهیه قهوه', category: 'coffee', width: 4, height: 3 },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80', alt: 'تیرامیسو تازه', category: 'dessert', width: 3, height: 4 },
  { id: 'g9', src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80', alt: 'پاستای مخصوص', category: 'food', width: 4, height: 3 },
  { id: 'g10', src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', alt: 'جشن و رویداد', category: 'events', width: 3, height: 4 },
  { id: 'g11', src: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?w=800&q=80', alt: 'لاته آرت', category: 'coffee', width: 4, height: 3 },
  { id: 'g12', src: 'https://images.unsplash.com/photo-1568901346375-23c9450f58ae?w=800&q=80', alt: 'برگر کافئینو', category: 'food', width: 3, height: 4 },
];

export const CONTACT_INFO = {
  address: 'تهران، خیابان نمونه، پلاک ۱۲',
  phone: '۰۲۱-۱۲۳۴۵۶۷۸',
  hours: 'هر روز ۱۲:۰۰ تا ۲۴:۰۰',
  instagram: '@cafeino',
  telegram: '@cafeino',
  whatsapp: '۰۹۱۲-۳۴۵۶۷۸۹',
};

export const ABOUT_FEATURES = [
  { icon: 'home', title: 'محیطی گرم و صمیمی', text: 'فضایی دنج برای آرامش و گفتگو' },
  { icon: 'list', title: 'منوی متنوع', text: 'از قهوه تا غذای اصلی، همه چیز' },
  { icon: 'users', title: 'تیم حرفه‌ای', text: 'باریستاها و سرآشپزهای مجرب' },
  { icon: 'star', title: 'بهترین کیفیت', text: 'مواد اولیه تازه و باکیفیت' },
];

export const formatPrice = (price: number): string => {
  return price.toLocaleString('fa-IR') + ' تومان';
};
