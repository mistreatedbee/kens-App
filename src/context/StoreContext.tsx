import React, { useEffect, useState, createContext, useContext } from 'react';
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
    | 'New'
    | 'Pending'
    | 'Confirmed'
    | 'Processing'
    | 'Ready for collection'
    | 'Out for delivery'
    | 'Completed'
    | 'Cancelled';
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
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getProducts().catch(() => null),
      api.getCategories().catch(() => null),
      api.getSettings().catch(() => null),
      api.getOrders().catch(() => null),
    ]).then(([prods, cats, setts, ords]) => {
      setProducts(prods ?? seedProducts);
      setCategories(cats ?? seedCategories);
      if (setts) setSettings(setts);
      if (ords) setOrders(ords);
    }).finally(() => setLoading(false));
  }, []);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tempId = `temp-${Date.now()}`;
    const now = new Date().toISOString();
    const optimistic: Product = { ...productData, id: tempId, createdAt: now, updatedAt: now };
    setProducts((prev) => [...prev, optimistic]);

    api.createProduct(productData)
      .then((saved) => setProducts((prev) => prev.map((p) => p.id === tempId ? saved : p)))
      .catch(() => {
        setProducts((prev) => prev.filter((p) => p.id !== tempId));
        toast.error('Failed to add product');
      });
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p)
    );

    api.updateProduct(id, data)
      .then((saved) => setProducts((prev) => prev.map((p) => p.id === id ? saved : p)))
      .catch(() => toast.error('Failed to update product'));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    api.deleteProduct(id)
      .catch(() => toast.error('Failed to delete product'));
  };

  const addCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tempId = `temp-${Date.now()}`;
    const now = new Date().toISOString();
    const optimistic: Category = { ...categoryData, id: tempId, createdAt: now, updatedAt: now };
    setCategories((prev) => [...prev, optimistic]);

    api.createCategory(categoryData)
      .then((saved) => setCategories((prev) => prev.map((c) => c.id === tempId ? saved : c)))
      .catch(() => {
        setCategories((prev) => prev.filter((c) => c.id !== tempId));
        toast.error('Failed to add category');
      });
  };

  const updateCategory = (id: string, data: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c)
    );

    api.updateCategory(id, data)
      .then((saved) => setCategories((prev) => prev.map((c) => c.id === id ? saved : c)))
      .catch(() => toast.error('Failed to update category'));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));

    api.deleteCategory(id)
      .catch(() => toast.error('Failed to delete category'));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tempId = `temp-${Date.now()}`;
    const now = new Date().toISOString();
    const optimistic: Order = { ...orderData, id: tempId, createdAt: now, updatedAt: now };
    setOrders((prev) => [optimistic, ...prev]);

    api.placeOrder(orderData)
      .then((saved) => setOrders((prev) => prev.map((o) => o.id === tempId ? saved : o)))
      .catch(() => toast.error('Failed to save order — your order was received but may not have saved'));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o)
    );

    api.updateOrderStatus(id, status)
      .then((saved) => setOrders((prev) => prev.map((o) => o.id === id ? saved : o)))
      .catch(() => toast.error('Failed to update order status'));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));

    api.updateSettings(newSettings)
      .then((saved) => setSettings(saved))
      .catch(() => toast.error('Failed to save settings'));
  };

  if (loading) return null;

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
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
        updateSettings,
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
