import type { Product, Category, Order, StoreSettings, Customer } from '../context/StoreContext';

const BASE = import.meta.env.VITE_API_URL ?? '';
const TOKEN_KEY = 'store_admin_token';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}

export interface CustomerDetailResponse {
  customer: Customer;
  orders: Order[];
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function normalize<T>(doc: Record<string, unknown>): T {
  const rest = { ...doc };
  const _id = rest._id;
  delete rest._id;
  delete rest.__v;
  return { id: _id, ...rest } as unknown as T;
}

function normalizeSettings(doc: Record<string, unknown>): StoreSettings {
  const rest = { ...doc };
  delete rest._id;
  delete rest.id;
  delete rest.__v;
  delete rest.createdAt;
  delete rest.updatedAt;
  return rest as StoreSettings;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  admin = false
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (admin) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    let message = text || `Request failed: ${res.status}`;
    try {
      const parsed = JSON.parse(text);
      message = parsed.error || message;
    } catch {
      // Keep plain text response.
    }
    if (res.status === 401) clearAdminToken();
    throw new Error(message);
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return data.map((d) => normalize<unknown>(d)) as unknown as T;
  }
  if (data && typeof data === 'object' && '_id' in data) {
    return normalize<T>(data as Record<string, unknown>);
  }
  return data as T;
}

export const api = {
  login: (email: string, password: string) =>
    request<LoginResponse>('POST', '/api/auth/login', { email, password }),
  me: () => request<{ admin: AdminUser }>('GET', '/api/auth/me', undefined, true),
  uploadImage: async (file: File) => {
    const token = getAdminToken();
    const data = new FormData();
    data.append('image', file);

    const res = await fetch(`${BASE}/api/uploads/image`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: data,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      if (res.status === 401) clearAdminToken();
      throw new Error(body.error || 'Image upload failed');
    }

    return res.json() as Promise<{ url: string; publicId: string }>;
  },

  getProducts: () => request<Product[]>('GET', '/api/products'),
  createProduct: (data: unknown) =>
    request<Product>('POST', '/api/products', data, true),
  updateProduct: (id: string, data: unknown) =>
    request<Product>('PUT', `/api/products/${id}`, data, true),
  deleteProduct: (id: string) =>
    request<{ success: boolean }>('DELETE', `/api/products/${id}`, undefined, true),

  getCategories: () => request<Category[]>('GET', '/api/categories'),
  createCategory: (data: unknown) =>
    request<Category>('POST', '/api/categories', data, true),
  updateCategory: (id: string, data: unknown) =>
    request<Category>('PUT', `/api/categories/${id}`, data, true),
  deleteCategory: (id: string) =>
    request<{ success: boolean }>('DELETE', `/api/categories/${id}`, undefined, true),

  getOrders: () => request<Order[]>('GET', '/api/orders', undefined, true),
  getOrderByNumber: (orderNumber: string) =>
    request<Order>('GET', `/api/orders/number/${encodeURIComponent(orderNumber)}`),
  placeOrder: (data: unknown) => request<Order>('POST', '/api/orders', data),
  updateOrderStatus: (id: string, status: string) =>
    request<Order>('PATCH', `/api/orders/${id}/status`, { status }, true),
  deleteOrder: (id: string) =>
    request<{ success: boolean }>('DELETE', `/api/orders/${id}`, undefined, true),

  getCustomers: () => request<Customer[]>('GET', '/api/customers', undefined, true),
  getCustomer: (id: string) =>
    request<{ customer: Record<string, unknown>; orders: Record<string, unknown>[] }>('GET', `/api/customers/${id}`, undefined, true)
      .then((data) => ({
        customer: normalize<Customer>(data.customer),
        orders: data.orders.map((order) => normalize<Order>(order)),
      })),

  getSettings: async (): Promise<StoreSettings> => {
    const raw = await request<Record<string, unknown>>('GET', '/api/settings');
    return normalizeSettings(raw);
  },
  updateSettings: (data: unknown) =>
    request<StoreSettings>('PUT', '/api/settings', data, true).then((raw) =>
      normalizeSettings(raw as unknown as Record<string, unknown>)
    ),
};
