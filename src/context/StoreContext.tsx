import React, { useCallback, useEffect, useState, createContext, useContext } from 'react';
import { toast } from 'sonner';
import { defaultSettings, seedCategories, seedProducts } from '../lib/seed';
import { api } from '../lib/api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  description: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  stock: number;
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isComingSoon?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  sortOrder?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'delivery' | 'collection';
  address?: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status:
    | 'New'
    | 'Pending'
    | 'Confirmed'
    | 'Processing'
    | 'Ready for Collection'
    | 'Out for Delivery'
    | 'Completed'
    | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate?: string;
  orderIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  storeName: string;
  logo: string;
  tagline?: string;
  description?: string;
  contactPerson?: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  websiteUrl?: string;
  address: string;
  operatingHours?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
  };
  deliveryInfo: string;
  collectionInfo?: string;
  footerText: string;
  aboutInfo?: string;
  additionalInfo?: string;
  currency: string;
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  settings: StoreSettings;
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<StoreSettings>) => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshCustomers: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function sortCategories(categories: Category[]) {
  return [...categories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshProducts = useCallback(async () => setProducts(await api.getProducts()), []);
  const refreshCategories = useCallback(async () => setCategories(sortCategories(await api.getCategories())), []);
  const refreshSettings = useCallback(async () => setSettings(await api.getSettings()), []);
  const refreshOrders = useCallback(async () => setOrders(await api.getOrders()), []);
  const refreshCustomers = useCallback(async () => setCustomers(await api.getCustomers()), []);

  useEffect(() => {
    Promise.all([
      api.getProducts().catch(() => null),
      api.getCategories().catch(() => null),
      api.getSettings().catch(() => null),
      api.getOrders().catch(() => null),
      api.getCustomers().catch(() => null),
    ]).then(([prods, cats, setts, ords, custs]) => {
      setProducts(prods ?? seedProducts);
      setCategories(sortCategories(cats ?? seedCategories));
      if (setts) setSettings(setts);
      if (ords) setOrders(ords);
      if (custs) setCustomers(custs);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL ?? '';
    const source = new EventSource(`${base}/api/events`);
    source.addEventListener('settings', () => refreshSettings().catch(() => undefined));
    source.addEventListener('products', () => refreshProducts().catch(() => undefined));
    source.addEventListener('categories', () => refreshCategories().catch(() => undefined));
    source.addEventListener('orders', () => refreshOrders().catch(() => undefined));
    source.addEventListener('customers', () => refreshCustomers().catch(() => undefined));
    source.onerror = () => undefined;
    return () => source.close();
  }, [refreshCategories, refreshCustomers, refreshOrders, refreshProducts, refreshSettings]);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const saved = await api.createProduct(productData);
    setProducts((prev) => [saved, ...prev]);
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    const saved = await api.updateProduct(id, data);
    setProducts((prev) => prev.map((p) => p.id === id ? saved : p));
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await api.deleteProduct(id);
  };

  const addCategory = async (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    const saved = await api.createCategory(categoryData);
    setCategories((prev) => sortCategories([saved, ...prev]));
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    const saved = await api.updateCategory(id, data);
    setCategories((prev) => sortCategories(prev.map((c) => c.id === id ? saved : c)));
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    await api.deleteCategory(id);
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const saved = await api.placeOrder(orderData);
    setOrders((prev) => [saved, ...prev.filter((o) => o.id !== saved.id)]);
    refreshCustomers().catch(() => undefined);
    return saved;
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const saved = await api.updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => o.id === id ? saved : o));
  };

  const deleteOrder = async (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    await api.deleteOrder(id);
    refreshCustomers().catch(() => undefined);
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const saved = await api.updateSettings(newSettings);
    setSettings(saved);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-muted flex items-center justify-center">
        Loading Kenmok CC...
      </div>
    );
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        customers,
        settings,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateSettings,
        refreshOrders,
        refreshCustomers,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
