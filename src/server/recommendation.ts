import type { ProductRecommendation, RecommendationResult } from '~/lib/types'

const products: Record<string, ProductRecommendation> = {
  sony720: {
    slug: 'sony-wh-ch720n',
    title: 'Sony WH-CH720N',
    brand: 'Sony',
    kind: 'headphones',
    price: 4790000,
    oldPrice: 5250000,
    rating: 4.4,
    ratingCount: 318,
    fit: 'بهترین انتخاب برای نیاز تو',
    summary: 'صدای متعادل، تفکیک خوب و وزن پایین؛ برای شنیدن لایه‌های گیتار و وکال انتخاب امن‌تری است.',
    pros: ['تفکیک ساز خوب', 'سبک برای استفاده طولانی', 'ANC کاربردی'],
    con: 'اگر بیس خیلی کوبنده می‌خواهی، انتخاب اول من نیست.',
    scores: [
      { label: 'تفکیک', value: 92, display: 'عالی' },
      { label: 'راحتی', value: 91, display: 'عالی' },
      { label: 'صدای متعادل', value: 88, display: 'خیلی خوب' },
      { label: 'بیس', value: 68, display: 'متوسط' },
    ],
    digikalaUrl: 'https://www.digikala.com/search/?q=Sony%20WH-CH720N',
  },
  q30: {
    slug: 'soundcore-q30',
    title: 'Soundcore Life Q30',
    brand: 'Soundcore',
    kind: 'headphones',
    price: 4290000,
    rating: 4.3,
    ratingCount: 412,
    fit: 'اگر بیس بیشتری می‌خواهی',
    summary: 'EQ منعطف و صدای پرانرژی‌تر؛ برای کسی که کمی هیجان بیشتر در پایین‌فرکانس می‌خواهد.',
    pros: ['EQ بسیار خوب', 'باتری قوی', 'ارزش خرید بالا'],
    con: 'تیون پیش‌فرضش برای چیزی که گفتی کمی bass-heavy است.',
    scores: [
      { label: 'تفکیک', value: 84, display: 'خیلی خوب' },
      { label: 'راحتی', value: 86, display: 'خیلی خوب' },
      { label: 'صدای متعادل', value: 76, display: 'خوب' },
      { label: 'بیس', value: 91, display: 'عالی' },
    ],
    digikalaUrl: 'https://www.digikala.com/search/?q=Soundcore%20Q30',
  },
  jbl770: {
    slug: 'jbl-tune-770nc',
    title: 'JBL Tune 770NC',
    brand: 'JBL',
    kind: 'headphones',
    price: 4980000,
    rating: 4.2,
    ratingCount: 227,
    fit: 'اگر استفاده روزمره مهم‌تر است',
    summary: 'همه‌فن‌حریف و ساده برای استفاده روزمره؛ صدای سرگرم‌کننده‌تر ولی کم‌جزئیات‌تر از انتخاب اول.',
    pros: ['باتری عالی', 'اتصال پایدار', 'استفاده آسان'],
    con: 'برای تفکیک سازها به اندازه Sony دقیق نیست.',
    scores: [
      { label: 'تفکیک', value: 79, display: 'خوب' },
      { label: 'راحتی', value: 84, display: 'خیلی خوب' },
      { label: 'صدای متعادل', value: 77, display: 'خوب' },
      { label: 'بیس', value: 84, display: 'خیلی خوب' },
    ],
    digikalaUrl: 'https://www.digikala.com/search/?q=JBL%20Tune%20770NC',
  },
  phone: {
    slug: 'galaxy-a56',
    title: 'Samsung Galaxy A56',
    brand: 'Samsung',
    kind: 'phone',
    price: 28900000,
    rating: 4.5,
    ratingCount: 186,
    fit: 'متعادل‌ترین انتخاب برای عکاسی',
    summary: 'دوربین اصلی قابل اتکا، پردازش تصویر باثبات و تجربه نرم‌افزاری بالغ‌تر از گزینه‌های صرفاً عدد-محور.',
    pros: ['دوربین اصلی باثبات', 'نمایشگر خوب', 'نرم‌افزار قابل اتکا'],
    con: 'اگر زوم اپتیکال برایت مهم است باید بودجه را بالاتر ببری.',
    scores: [
      { label: 'دوربین', value: 88, display: 'خیلی خوب' },
      { label: 'ویدئو', value: 84, display: 'خیلی خوب' },
      { label: 'باتری', value: 86, display: 'خیلی خوب' },
      { label: 'ارزش خرید', value: 85, display: 'خیلی خوب' },
    ],
    digikalaUrl: 'https://www.digikala.com/search/?q=Galaxy%20A56',
  },
  laptop: {
    slug: 'asus-vivobook-16',
    title: 'ASUS Vivobook 16',
    brand: 'ASUS',
    kind: 'laptop',
    price: 64900000,
    rating: 4.4,
    ratingCount: 94,
    fit: 'انتخاب منطقی برای کدنویسی روزانه',
    summary: 'تمرکز روی CPU، رم و فضای کاری نمایشگر؛ بدون پرداخت اضافه برای GPUای که احتمالاً استفاده نمی‌کنی.',
    pros: ['نمایشگر 16 اینچ', 'رم مناسب چندوظیفگی', 'تعادل خوب وزن و قدرت'],
    con: 'برای گیمینگ سنگین یا CUDA انتخاب مناسبی نیست.',
    scores: [
      { label: 'CPU', value: 89, display: 'خیلی خوب' },
      { label: 'چندوظیفگی', value: 91, display: 'عالی' },
      { label: 'نمایشگر', value: 86, display: 'خیلی خوب' },
      { label: 'حمل‌پذیری', value: 76, display: 'خوب' },
    ],
    digikalaUrl: 'https://www.digikala.com/search/?q=ASUS%20Vivobook%2016',
  },
  fryer: {
    slug: 'philips-airfryer',
    title: 'Philips Airfryer XL',
    brand: 'Philips',
    kind: 'airfryer',
    price: 9200000,
    rating: 4.6,
    ratingCount: 521,
    fit: 'کم‌ریسک‌ترین انتخاب برای خانه',
    summary: 'ظرفیت کاربردی، کنترل ساده و کیفیت ساختی که برای استفاده مداوم مهم‌تر از تعداد برنامه‌های نمایشی است.',
    pros: ['ظرفیت مناسب', 'تمیزکاری ساده', 'پخت یکنواخت'],
    con: 'اگر فضای کابینت محدود داری، ابعادش را قبل از خرید چک کن.',
    scores: [
      { label: 'پخت', value: 92, display: 'عالی' },
      { label: 'ظرفیت', value: 89, display: 'خیلی خوب' },
      { label: 'تمیزکاری', value: 88, display: 'خیلی خوب' },
      { label: 'ارزش خرید', value: 82, display: 'خیلی خوب' },
    ],
    digikalaUrl: 'https://www.digikala.com/search/?q=Philips%20Airfryer%20XL',
  },
}

const clean = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replaceAll('ي', 'ی')
    .replaceAll('ك', 'ک')

export function recommend(rawQuery: string): RecommendationResult {
  const query = clean(rawQuery)

  if (query.includes('گوشی') || query.includes('موبایل') || query.includes('عکاس')) {
    return singleCategoryResult(rawQuery, products.phone, {
      budget: 'تا ۳۰ میلیون',
      useCase: 'عکاسی + روزمره',
      priority: 'کیفیت واقعی دوربین',
      category: 'گوشی موبایل',
      kicker: 'برای عکاسی، مگاپیکسل همه‌چیز نیست.',
      subtitle: 'کیفیت پردازش تصویر، ثبات دوربین اصلی و عملکرد شب را بیشتر از عدد روی جعبه وزن دادیم.',
    })
  }

  if (query.includes('لپ') || query.includes('برنامه') || query.includes('کدنویس')) {
    return singleCategoryResult(rawQuery, products.laptop, {
      budget: 'تا ۷۰ میلیون',
      useCase: 'برنامه‌نویسی',
      priority: 'CPU + RAM + نمایشگر',
      category: 'لپ‌تاپ',
      kicker: 'برای کدنویسی، GPU گران همیشه ارزش ندارد.',
      subtitle: 'قدرت پردازنده، رم و فضای کاری نمایشگر را برای IDE و چندوظیفگی بیشتر وزن دادیم.',
    })
  }

  if (query.includes('ایر') || query.includes('سرخ') || query.includes('هواپز')) {
    return singleCategoryResult(rawQuery, products.fryer, {
      budget: 'تا ۱۰ میلیون',
      useCase: 'آشپزی روزمره',
      priority: 'ظرفیت + کیفیت پخت',
      category: 'هواپز',
      kicker: 'تعداد برنامه‌ها معیار خوبی برای هواپز نیست.',
      subtitle: 'ظرفیت واقعی، یکنواختی پخت و تمیزکاری را بالاتر از قابلیت‌های نمایشی قرار دادیم.',
    })
  }

  return {
    query: rawQuery,
    intent: {
      budget: query.includes('۱۵') ? 'تا ۱۵ میلیون' : 'تا ۵ میلیون',
      useCase: query.includes('متال') ? 'موسیقی / متال' : 'موسیقی روزمره',
      priority: query.includes('متال') ? 'تفکیک ساز + تعادل صدا' : 'راحتی + ارزش خرید',
      category: 'هدفون دورگوشی',
    },
    verdict: {
      kicker: 'برای متال، بیس بیشتر لزوماً صدای بهتر نیست.',
      title: 'Sony WH-CH720N رو بخر.',
      subtitle: 'برای چیزی که گفتی، این مدل کم‌ریسک‌ترین ترکیبِ تفکیک، راحتی و قیمت را دارد.',
      confidence: 'خیلی بالا',
    },
    winner: products.sony720,
    alternatives: [
      { label: 'اگر بیس بیشتری می‌خوای', reason: 'EQ منعطف‌تر و پایین‌فرکانس پرانرژی‌تر', product: products.q30 },
      { label: 'اگر روزمره‌تر می‌خوای', reason: 'باتری عالی و تجربه ساده‌تر برای استفاده عمومی', product: products.jbl770 },
    ],
    reviewSignals: {
      positives: [
        { label: 'راحتی در استفاده طولانی', count: 84 },
        { label: 'باتری خوب', count: 71 },
        { label: 'صدای شفاف', count: 63 },
      ],
      negatives: [
        { label: 'میکروفون در محیط شلوغ', count: 34 },
        { label: 'بدنه معمولی', count: 27 },
      ],
    },
    refinements: ['بیس بیشتری می‌خوام', 'ANC مهم‌تره', 'ارزون‌تر می‌خوام', 'تا ۱۰ میلیون برو'],
    freshness: 'نمونه نمایشی · داده واقعی نیست',
  }
}

function singleCategoryResult(
  query: string,
  product: ProductRecommendation,
  meta: {
    budget: string
    useCase: string
    priority: string
    category: string
    kicker: string
    subtitle: string
  },
): RecommendationResult {
  return {
    query,
    intent: {
      budget: meta.budget,
      useCase: meta.useCase,
      priority: meta.priority,
      category: meta.category,
    },
    verdict: {
      kicker: meta.kicker,
      title: `${product.title} رو بخر.`,
      subtitle: meta.subtitle,
      confidence: 'بالا',
    },
    winner: product,
    alternatives: [
      { label: 'اگر ارزون‌تر می‌خوای', reason: 'در نسخه واقعی از کاتالوگ، جایگزین ارزان‌تر پیدا می‌کنیم.', product },
      { label: 'اگر کیفیت مهم‌تره', reason: 'در نسخه واقعی با افزایش بودجه، گزینه بعدی را نشان می‌دهیم.', product },
    ],
    reviewSignals: {
      positives: [
        { label: 'کیفیت کلی', count: 81 },
        { label: 'ارزش خرید', count: 64 },
        { label: 'استفاده روزمره', count: 52 },
      ],
      negatives: [{ label: 'نکته‌ای که قبل خرید باید بدانی', count: 19 }],
    },
    refinements: ['ارزون‌تر می‌خوام', 'کیفیت مهم‌تره', 'گزینه دیگه نشون بده'],
    freshness: 'نمونه نمایشی · داده واقعی نیست',
  }
}

export function findProduct(slug: string) {
  return Object.values(products).find((product) => product.slug === slug)
}
