import React, { useEffect, useState, createContext, useContext } from 'react';
import { defaultSettings, seedCategories, seedProducts } from '../lib/seed';
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
  isActive: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
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
  'New' |
  'Pending' |
  'Confirmed' |
  'Processing' |
  'Ready for collection' |
  'Out for delivery' |
  'Completed' |
  'Cancelled';
  createdAt: string;
  updatedAt: string;
}
export interface StoreSettings {
  storeName: string;
  logo: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  deliveryInfo: string;
  footerText: string;
  currency: string;
}
interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: StoreSettings;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (
  category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>)
  => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
}
const StoreContext = createContext<StoreContextType | undefined>(undefined);
export function StoreProvider({ children }: {children: React.ReactNode;}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const storedProducts = localStorage.getItem('store_products');
    const storedCategories = localStorage.getItem('store_categories');
    const storedOrders = localStorage.getItem('store_orders');
    const storedSettings = localStorage.getItem('store_settings');
    if (storedProducts) setProducts(JSON.parse(storedProducts));else
    setProducts(seedProducts);
    if (storedCategories) setCategories(JSON.parse(storedCategories));else
    setCategories(seedCategories);
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedSettings) setSettings(JSON.parse(storedSettings));
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('store_products', JSON.stringify(products));
      localStorage.setItem('store_categories', JSON.stringify(categories));
      localStorage.setItem('store_orders', JSON.stringify(orders));
      localStorage.setItem('store_settings', JSON.stringify(settings));
    }
  }, [products, categories, orders, settings, isLoaded]);
  const addProduct = (
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
  {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts((prev) => [...prev, newProduct]);
  };
  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) =>
    prev.map((p) =>
    p.id === id ?
    {
      ...p,
      ...data,
      updatedAt: new Date().toISOString()
    } :
    p
    )
    );
  };
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };
  const addCategory = (
  categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) =>
  {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCategories((prev) => [...prev, newCategory]);
  };
  const updateCategory = (id: string, data: Partial<Category>) => {
    setCategories((prev) =>
    prev.map((c) =>
    c.id === id ?
    {
      ...c,
      ...data,
      updatedAt: new Date().toISOString()
    } :
    c
    )
    );
  };
  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };
  const addOrder = (
  orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) =>
  {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
  };
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
    prev.map((o) =>
    o.id === id ?
    {
      ...o,
      status,
      updatedAt: new Date().toISOString()
    } :
    o
    )
    );
  };
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings
    }));
  };
  if (!isLoaded) return null;
  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
        updateSettings
      }}>
      
      {children}
    </StoreContext.Provider>);

}
export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}