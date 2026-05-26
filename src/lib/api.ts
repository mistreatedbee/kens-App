import type { Product, Category, Order, StoreSettings } from '../context/StoreContext';

const BASE = import.meta.env.VITE_API_URL ?? '';
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY ?? '';

function normalize<T>(doc: Record<string, unknown>): T {
  const { _id, __v, ...rest } = doc;
  return { id: _id, ...rest } as unknown as T;
}

function normalizeSettings(doc: Record<string, unknown>): StoreSettings {
  const { _id, id, __v, createdAt, updatedAt, ...rest } = doc;
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
  if (admin && ADMIN_KEY) headers['x-admin-key'] = ADMIN_KEY;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
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
  placeOrder: (data: unknown) => request<Order>('POST', '/api/orders', data),
  updateOrderStatus: (id: string, status: string) =>
    request<Order>('PATCH', `/api/orders/${id}/status`, { status }, true),

  getSettings: async (): Promise<StoreSettings> => {
    const raw = await request<Record<string, unknown>>('GET', '/api/settings');
    return normalizeSettings(raw);
  },
  updateSettings: (data: unknown) =>
    request<StoreSettings>('PUT', '/api/settings', data, true).then((raw) =>
      normalizeSettings(raw as unknown as Record<string, unknown>)
    ),
};
