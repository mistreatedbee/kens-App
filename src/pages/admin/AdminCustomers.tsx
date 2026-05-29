import React, { useMemo } from 'react';
import { Mail, Phone, UserRound } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../lib/format';

export function AdminCustomers() {
  const { orders, settings } = useStore();

  const customers = useMemo(() => {
    const map = new Map<string, {
      name: string;
      phone: string;
      email?: string;
      orders: number;
      total: number;
      lastOrder: string;
    }>();

    orders.forEach((order) => {
      const key = order.customerEmail || order.customerPhone || order.customerName;
      const existing = map.get(key);
      if (existing) {
        existing.orders += 1;
        existing.total += order.total;
        if (new Date(order.createdAt) > new Date(existing.lastOrder)) {
          existing.lastOrder = order.createdAt;
        }
      } else {
        map.set(key, {
          name: order.customerName,
          phone: order.customerPhone,
          email: order.customerEmail,
          orders: 1,
          total: order.total,
          lastOrder: order.createdAt,
        });
      }
    });

    return [...map.values()].sort((a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime());
  }, [orders]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg">Customers</h1>
        <p className="text-muted">Read-only customer list generated from order details.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Unique customers</p>
          <p className="mt-2 text-3xl font-bold text-primary">{customers.length}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Total order value</p>
          <p className="mt-2 text-3xl font-bold text-primary">
            {formatCurrency(customers.reduce((sum, item) => sum + item.total, 0), settings.currency)}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Repeat customers</p>
          <p className="mt-2 text-3xl font-bold text-primary">{customers.filter((item) => item.orders > 1).length}</p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm border border-primary/10">
        {customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-primary/10 text-muted">
                <tr>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Contact</th>
                  <th className="pb-3 font-semibold">Orders</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Last order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {customers.map((customer) => (
                  <tr key={`${customer.phone}-${customer.email}`} className="text-fg">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lightblue/20 text-primary">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-muted">
                      <div className="space-y-1">
                        <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {customer.phone}</p>
                        {customer.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {customer.email}</p>}
                      </div>
                    </td>
                    <td className="py-4">{customer.orders}</td>
                    <td className="py-4 font-semibold text-primary">{formatCurrency(customer.total, settings.currency)}</td>
                    <td className="py-4 text-muted">{formatDate(customer.lastOrder)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <UserRound className="mx-auto h-12 w-12 text-primary/30" />
            <h2 className="mt-4 text-xl font-bold text-fg">No customers yet</h2>
            <p className="mt-2 text-muted">Customers will appear here once orders are placed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
