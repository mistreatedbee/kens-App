import React from 'react';
import { BarChart3, Boxes, CheckCircle2, ShoppingCart, TrendingUp } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/format';

export function AdminAnalytics() {
  const { products, categories, orders, settings } = useStore();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const completed = orders.filter((order) => order.status === 'Completed').length;
  const activeProducts = products.filter((product) => product.isActive).length;
  const lowStock = products.filter((product) => product.stock <= 5).length;
  const categoryCounts = categories.map((category) => ({
    name: category.name,
    products: products.filter((product) => product.categoryId === category.id).length,
  }));
  const statusCounts = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const cards = [
    { label: 'Total revenue', value: formatCurrency(revenue, settings.currency), icon: TrendingUp },
    { label: 'Orders', value: orders.length, icon: ShoppingCart },
    { label: 'Completed', value: completed, icon: CheckCircle2 },
    { label: 'Active products', value: activeProducts, icon: Boxes },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg">Analytics</h1>
        <p className="text-muted">Simple business insights calculated from products, categories and orders.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-lightblue/20 text-primary">
              <card.icon className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold text-fg">
            <BarChart3 className="h-5 w-5 text-secondary" />
            Products by category
          </h2>
          <div className="mt-6 space-y-4">
            {categoryCounts.length > 0 ? categoryCounts.map((category) => {
              const width = products.length ? Math.max((category.products / products.length) * 100, 8) : 0;
              return (
                <div key={category.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-fg">{category.name}</span>
                    <span className="text-muted">{category.products}</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface">
                    <div className="h-3 rounded-full bg-secondary" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            }) : (
              <p className="text-muted">No category data yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-fg">Order status overview</h2>
          <div className="mt-6 space-y-3">
            {Object.keys(statusCounts).length > 0 ? Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                <span className="font-semibold text-fg">{status}</span>
                <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">{count}</span>
              </div>
            )) : (
              <p className="text-muted">No order data yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-fg">Stock health</h2>
        <p className="mt-2 text-muted">
          {lowStock > 0
            ? `${lowStock} product${lowStock === 1 ? '' : 's'} need stock attention.`
            : 'All listed products have healthy stock levels.'}
        </p>
      </div>
    </div>
  );
}
