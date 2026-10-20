// Site-wide data: contact, links, reviews, highlights, gallery.

export const SITE = {
  nameEn: 'Toos Kitchen × Zaffran',
  nameAr: 'مطبخ طوس × زعفران',
  taglineEn: 'Two kitchens, one family — serving Saihat since 2017.',
  mapsUrl: 'https://maps.app.goo.gl/E4hqEyC5sPV4Qo7G7',
  instagram: 'https://www.instagram.com/Tast_of_Zaffran',
};

export const PHONES = {
  bookingIntl: '+966 58 133 0111',
  bookingWa: '966581330111',
  call1: '013 8083337',
  call2: '013 8566623',
};

export const LOCATIONS = [
  {
    id: 'toos',
    addrEn: '15th Street, An Naqa, Saihat 31972, Saudi Arabia',
    hoursEn: 'Daily · 6:30 AM – 11:00 PM',
    mapsQuery: 'Toos Kitchen Saihat',
  },
  {
    id: 'zaffran',
    addrEn: '15th Street, An Naqa, Saihat 32461, Saudi Arabia',
    hoursEn: 'Daily · 5:30–11:00 AM & 12:00–11:00 PM',
    mapsQuery: 'Zaffran Restaurant Saihat',
  },
] as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONES.bookingWa}?text=${encodeURIComponent(message)}`;
}

export function dishOrderMessage(dishEn: string, dishAr: string, price: string | null, lang: 'en' | 'ar'): string {
  const line = lang === 'ar' ? `أرغب بطلب: ${dishAr}` : `I would like to order: ${dishEn}`;
  const p = price ? (lang === 'ar' ? ` (السعر: ${price} ر.س)` : ` (Price: ${price} SAR)`) : '';
  return `${line}${p}`;
}

export interface Review {
  name: string;
  stars: number;
  dateEn: string;
  text: string;
  photos: number;
  guide: boolean;
}

export const REVIEWS: Review[] = [
  {
    name: 'Muhammed Shammas',
    stars: 4,
    dateEn: 'a year ago',
    text: 'I visited Toos Kitchen after watching a reel and decided to order the Walima Rice for takeaway. The dish was absolutely delicious! The rice was perfectly soft, mildly spicy, and the quality of the meat stood out. The smallest portion size is surprisingly enough to serve 5 people. Highly recommended!',
    photos: 2,
    guide: true,
  },
  {
    name: 'Food with Shayne',
    stars: 4,
    dateEn: 'a year ago',
    text: 'We ordered the Lamb Meat with Spicy Rice for SR 120, and it was easily one of the best cuts of meat I have had anywhere. The lamb was tender with a perfect balance of fat and meat. The portion size is generous, easily serving three people, maybe even four.',
    photos: 1,
    guide: true,
  },
  {
    name: 'Sanjith P Salim',
    stars: 5,
    dateEn: '4 years ago',
    text: "I've been having food from 2017 and I must say, superb. Biriyani, moreover Kabsa is superb. Many types are available — spicy, non spicy, plain white. Good parking space, separate family space upstairs, well clean and tidy. Very fresh food and tasty, very friendly staff.",
    photos: 4,
    guide: true,
  },
  {
    name: 'Zarfot',
    stars: 4,
    dateEn: '5 months ago',
    text: 'Best in town beef (lahm quzi). Lamb waleema dish is well cooked and soft. Chicken grill is also quite good. Good customer service.',
    photos: 0,
    guide: true,
  },
  {
    name: 'Rafsan Rafsan',
    stars: 5,
    dateEn: '6 months ago',
    text: 'Harun best talent, excellent.',
    photos: 1,
    guide: false,
  },
];

export interface Highlight {
  img: string;
  ar: string;
  en: string;
}

export const HIGHLIGHTS: Highlight[] = [
  { img: 'assets/img/dish-mandi.jpg', ar: 'مندي لحم بالأرز الحار', en: 'Lamb Mandi with Spicy Rice' },
  { img: 'assets/img/dish-1.jpg', ar: 'دجاج مشوي بالأرز الحار', en: 'Grilled Chicken with Spicy Rice' },
  { img: 'assets/img/dish-2.jpg', ar: 'صحن وليمة لحم', en: 'Lamb Waleema Platter' },
  { img: 'assets/img/dish-3.jpg', ar: 'برياني دجاج', en: 'Chicken Biryani' },
  { img: 'assets/img/dish-4.jpg', ar: 'كبسة', en: 'Kabsa' },
  { img: 'assets/img/dish-5.jpg', ar: 'مشكل زعفران خاص', en: 'Zaffran Special Mixed Grill' },
];

export const GALLERY: { img: string; altEn: string; altAr: string }[] = [
  { img: 'assets/img/dish-mandi.jpg', altEn: 'Lamb mandi with side dishes', altAr: 'مندي لحم مع المقبلات' },
  { img: 'assets/img/g-010.jpg', altEn: 'Lamb mandi, close up', altAr: 'مندي لحم عن قرب' },
  { img: 'assets/img/dish-1.jpg', altEn: 'Signature rice platter', altAr: 'صحن أرز مميز' },
  { img: 'assets/img/g-031.jpg', altEn: 'Grand sharing platter', altAr: 'صحن مشاركة كبير' },
  { img: 'assets/img/g-022.jpg', altEn: 'Chicken mandi', altAr: 'مندي دجاج' },
  { img: 'assets/img/g-017.jpg', altEn: 'Shawarma plate with fries', altAr: 'صحن شاورما مع بطاطس' },
  { img: 'assets/img/g-061.jpg', altEn: 'Mixed grill plate', altAr: 'صحن مشويات مشكلة' },
  { img: 'assets/img/g-021.jpg', altEn: 'Appetizer spread', altAr: 'تشكيلة مقبلات' },
  { img: 'assets/img/g-002.jpg', altEn: 'Family dining area', altAr: 'قسم العائلات' },
  { img: 'assets/img/dish-5.jpg', altEn: 'Rice sampler platter', altAr: 'تشكيلة أرز' },
  { img: 'assets/img/g-033.jpg', altEn: 'Grills with fries', altAr: 'مشويات مع بطاطس' },
  { img: 'assets/img/g-113.jpg', altEn: 'Stuffed grape leaves', altAr: 'ورق عنب' },
  { img: 'assets/img/g-108.jpg', altEn: 'Fresh pizza', altAr: 'بيتزا طازجة' },
  { img: 'assets/img/g-052.jpg', altEn: 'Chicken mandi platter', altAr: 'صحن مندي دجاج' },
  { img: 'assets/img/dish-3.jpg', altEn: 'Family platter', altAr: 'صحن عائلي' },
  { img: 'assets/img/g-136.jpg', altEn: 'Chicken biryani plate', altAr: 'صحن برياني دجاج' },
  { img: 'assets/img/g-083.jpg', altEn: 'Chicken over fragrant rice', altAr: 'دجاج على أرز مبهر' },
  { img: 'assets/img/dish-4.jpg', altEn: 'Mandi platter', altAr: 'صحن مندي' },
  { img: 'assets/img/g-101.jpg', altEn: 'Lamb over saffron rice', altAr: 'لحم على أرز بالزعفران' },
  { img: 'assets/img/dish-6.jpg', altEn: 'Fresh from the grill', altAr: 'طازج من المشواة' },
  { img: 'assets/img/g-120.jpg', altEn: 'Pasta, kitchen style', altAr: 'باستا على طريقتنا' },
  { img: 'assets/img/gallery-1.jpg', altEn: 'Dinner spread', altAr: 'مائدة عشاء' },
  { img: 'assets/img/g-064.jpg', altEn: 'Dining hall', altAr: 'قاعة الطعام' },
  { img: 'assets/img/g-old.jpg', altEn: 'Toos Kitchen, the original board (2019)', altAr: 'مطبخ طوس، اللوحة الأصلية (2019)' },
  { img: 'assets/img/dish-2.jpg', altEn: 'Grilled platter', altAr: 'صحن مشويات' },
];
