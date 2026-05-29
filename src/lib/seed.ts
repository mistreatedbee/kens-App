import { Category, Product, StoreSettings } from '../context/StoreContext';

const now = new Date().toISOString();

export const defaultSettings: StoreSettings = {
  storeName: 'Kenmok CC',
  logo: '/logo.svg',
  tagline: 'Clean spaces. Fresh impressions. Reliable service.',
  description:
    'Kenmok CC supplies cleaning products, fragrances and pest control services for homes and businesses.',
  contactPerson: 'Kenmok CC Team',
  whatsappNumber: '073 204 7642',
  phoneNumber: '073 204 7642',
  email: 'info@kenmok.co.za',
  websiteUrl: 'https://kens-app.vercel.app',
  address: 'South Africa',
  operatingHours: 'Monday to Friday, 08:00 - 17:00',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  deliveryInfo: 'Delivery available by arrangement across selected South African areas.',
  collectionInfo: 'Collection available by prior arrangement.',
  footerText: '© 2026 Kenmok CC. All rights reserved.',
  aboutInfo:
    'Kenmok CC helps homes and businesses maintain cleaner, fresher and safer spaces through practical products and dependable service.',
  additionalInfo: 'Contact us for product guidance, service enquiries and custom requirements.',
  currency: 'R',
};

export const seedCategories: Category[] = [
  {
    id: 'cat-cleaning',
    name: 'Cleaning Products',
    slug: 'cleaning-products',
    description: 'Professional detergents, sanitizers and hygiene essentials.',
    image:
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80',
    sortOrder: 1,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cat-fragrances',
    name: 'Fragrances',
    slug: 'fragrances',
    description: 'Fresh, long-lasting fragrances for homes and workplaces.',
    image:
      'https://images.unsplash.com/photo-1595425964071-2c1ec4d3dcb2?auto=format&fit=crop&w=900&q=80',
    sortOrder: 2,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cat-pest',
    name: 'Pest Control Services',
    slug: 'pest-control',
    description: 'Residential and commercial pest management solutions.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    sortOrder: 3,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const seedProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Multipurpose Cleaning Degreaser',
    slug: 'multipurpose-cleaning-degreaser',
    price: 95,
    description:
      'Reliable cleaning product for kitchens, work surfaces, floors and high-touch areas.',
    categoryId: 'cat-cleaning',
    categoryName: 'Cleaning Products',
    images: [
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80',
    ],
    stock: 35,
    tags: ['cleaning', 'degreaser'],
    isActive: true,
    isFeatured: true,
    isTrending: true,
    isComingSoon: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-2',
    name: 'Industrial Floor Cleaner',
    slug: 'industrial-floor-cleaner',
    price: 160,
    discountPrice: 145,
    description:
      'Concentrated floor cleaner suitable for offices, shops, schools and facility teams.',
    categoryId: 'cat-cleaning',
    categoryName: 'Cleaning Products',
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80',
    ],
    stock: 24,
    tags: ['floor', 'facility'],
    isActive: true,
    isFeatured: true,
    isTrending: false,
    isComingSoon: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-3',
    name: 'Office Fresh Fragrance',
    slug: 'office-fresh-fragrance',
    price: 75,
    description:
      'Clean and professional fragrance blend for offices, reception areas and shared spaces.',
    categoryId: 'cat-fragrances',
    categoryName: 'Fragrances',
    images: [
      'https://images.unsplash.com/photo-1595425964071-2c1ec4d3dcb2?auto=format&fit=crop&w=900&q=80',
    ],
    stock: 30,
    tags: ['fragrance', 'office'],
    isActive: true,
    isFeatured: true,
    isTrending: true,
    isComingSoon: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-4',
    name: 'Cockroach Control Treatment',
    slug: 'cockroach-control-treatment',
    price: 450,
    description:
      'Targeted pest control treatment for homes, kitchens, offices and commercial spaces.',
    categoryId: 'cat-pest',
    categoryName: 'Pest Control Services',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    ],
    stock: 20,
    tags: ['pest control', 'service'],
    isActive: true,
    isFeatured: false,
    isTrending: true,
    isComingSoon: false,
    createdAt: now,
    updatedAt: now,
  },
];
