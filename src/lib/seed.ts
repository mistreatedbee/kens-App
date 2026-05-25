import { generateId } from './id';
import { Category, Product, StoreSettings } from '../context/StoreContext';

export const defaultSettings: StoreSettings = {
  storeName: "Kens App",
  logo: '/logo.svg',
  whatsappNumber: '073 204 7642',
  phoneNumber: '073 204 7642',
  email: 'hello@kensapp.com',
  address: '123 Design Avenue, Creative District',
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com'
  },
  deliveryInfo:
  'Free delivery on orders over R150. Standard delivery takes 3-5 business days.',
  footerText: '© 2026 Kens App. All rights reserved.',
  currency: 'R'
};

export const seedCategories: Category[] = [
{
  id: 'cat-1',
  name: 'Apparel',
  slug: 'apparel',
  description: 'Modern clothing for everyday wear.',
  image:
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'cat-2',
  name: 'Accessories',
  slug: 'accessories',
  description: 'Elevate your look with premium accessories.',
  image:
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'cat-3',
  name: 'Home',
  slug: 'home',
  description: 'Minimalist decor for your living space.',
  image:
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'cat-4',
  name: 'Tech',
  slug: 'tech',
  description: 'Sleek gadgets and essentials.',
  image:
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}];


export const seedProducts: Product[] = [
{
  id: 'prod-1',
  name: 'Minimalist Cotton Tee',
  slug: 'minimalist-cotton-tee',
  price: 45,
  description:
  'Premium heavyweight cotton t-shirt with a relaxed fit. Perfect for everyday wear.',
  categoryId: 'cat-1',
  categoryName: 'Apparel',
  images: [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'],

  stock: 50,
  isActive: true,
  isFeatured: true,
  isTrending: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'prod-2',
  name: 'Matte Black Watch',
  slug: 'matte-black-watch',
  price: 180,
  discountPrice: 150,
  description:
  'Sleek matte black timepiece with a minimalist dial and leather strap.',
  categoryId: 'cat-2',
  categoryName: 'Accessories',
  images: [
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80'],

  stock: 15,
  isActive: true,
  isFeatured: true,
  isTrending: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'prod-3',
  name: 'Ceramic Vase Set',
  slug: 'ceramic-vase-set',
  price: 85,
  description: 'Set of three handcrafted ceramic vases in neutral tones.',
  categoryId: 'cat-3',
  categoryName: 'Home',
  images: [
  'https://images.unsplash.com/photo-1612152505975-6454ce466c6d?auto=format&fit=crop&w=800&q=80'],

  stock: 8,
  isActive: true,
  isFeatured: false,
  isTrending: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'prod-4',
  name: 'Wireless Over-Ear Headphones',
  slug: 'wireless-headphones',
  price: 250,
  description:
  'High-fidelity audio with active noise cancellation and premium comfort.',
  categoryId: 'cat-4',
  categoryName: 'Tech',
  images: [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],

  stock: 20,
  isActive: true,
  isFeatured: true,
  isTrending: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'prod-5',
  name: 'Leather Weekend Bag',
  slug: 'leather-weekend-bag',
  price: 320,
  description:
  'Spacious duffel bag crafted from full-grain leather. Ideal for short trips.',
  categoryId: 'cat-2',
  categoryName: 'Accessories',
  images: [
  'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80'],

  stock: 5,
  isActive: true,
  isFeatured: false,
  isTrending: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
},
{
  id: 'prod-6',
  name: 'Linen Lounge Pants',
  slug: 'linen-lounge-pants',
  price: 75,
  description: 'Breathable linen pants with a comfortable elastic waistband.',
  categoryId: 'cat-1',
  categoryName: 'Apparel',
  images: [
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'],

  stock: 30,
  isActive: true,
  isFeatured: false,
  isTrending: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}];