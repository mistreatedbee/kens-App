import { Category, Product, StoreSettings } from '../context/StoreContext';

const now = new Date().toISOString();

export const defaultSettings: StoreSettings = {
  storeName: 'Kenmok CC',
  logo: '/logo.svg',
  whatsappNumber: '073 204 7642',
  phoneNumber: '073 204 7642',
  email: 'info@kenmok.co.za',
  address: 'South Africa',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  deliveryInfo:
    'Service call-outs and product delivery available across selected South African areas.',
  footerText: '© 2026 Kenmok CC. Professional pest control, cleaning products and fragrances.',
  currency: 'R',
};

export const seedCategories: Category[] = [
  {
    id: 'cat-pest',
    name: 'Pest Control Services',
    slug: 'pest-control',
    description: 'Residential and commercial pest management solutions.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'cat-cleaning',
    name: 'Cleaning Products',
    slug: 'cleaning-products',
    description: 'Professional detergents, sanitizers and hygiene essentials.',
    image:
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80',
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
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const seedProducts: Product[] = [
  {
    id: 'prod-1',
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
    isActive: true,
    isFeatured: true,
    isTrending: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-2',
    name: 'Ant & Crawling Insect Treatment',
    slug: 'ant-crawling-insect-treatment',
    price: 380,
    description:
      'Professional treatment for ants and crawling insects with practical prevention advice.',
    categoryId: 'cat-pest',
    categoryName: 'Pest Control Services',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    ],
    stock: 15,
    isActive: true,
    isFeatured: true,
    isTrending: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-3',
    name: 'Multipurpose Cleaning Degreaser',
    slug: 'multipurpose-cleaning-degreaser',
    price: 95,
    description:
      'A reliable cleaning product for kitchens, work surfaces, floors and high-touch areas.',
    categoryId: 'cat-cleaning',
    categoryName: 'Cleaning Products',
    images: [
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80',
    ],
    stock: 35,
    isActive: true,
    isFeatured: true,
    isTrending: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-4',
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
    isActive: true,
    isFeatured: false,
    isTrending: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-5',
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
    isActive: true,
    isFeatured: true,
    isTrending: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'prod-6',
    name: 'Lemon Fresh Aircare',
    slug: 'lemon-fresh-aircare',
    price: 68,
    description:
      'Bright citrus fragrance for bathrooms, offices, vehicles and customer-facing areas.',
    categoryId: 'cat-fragrances',
    categoryName: 'Fragrances',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
    ],
    stock: 40,
    isActive: true,
    isFeatured: false,
    isTrending: true,
    createdAt: now,
    updatedAt: now,
  },
];
