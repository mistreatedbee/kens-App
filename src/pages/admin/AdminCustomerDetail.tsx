import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Phone } from 'lucide-react';
import { api, CustomerDetailResponse } from '../../lib/api';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../lib/format';
import { StatusBadge } from '../../components/shared/StatusBadge';

export function AdminCustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const { settings } = useStore();
  const [data, setData] = useState<CustomerDetailResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.getCustomer(id).then(setData).catch((err) => setError(err instanceof Error ? err.message : 'Failed to load customer'));
  }, [id]);

  if (error) return <div className="rounded-xl bg-white p-8 text-red-500">{error}</div>;
  if (!data) return <div className="rounded-xl bg-white p-8 text-muted">Loading customer...</div>;

  const { customer, orders } = data;
  const phone = customer.phone?.replace(/\D/g, '');

  return (
    <div className="space-y-8">
      <Link to="/admin/customers" className="inline-flex items-center gap-2 text-muted hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to customers
      </Link>

      <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-3xl font-bold text-fg">{customer.name}</h1>
            <div className="mt-4 space-y-2 text-muted">
              {customer.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {customer.phone}</p>}
              {customer.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {customer.email}</p>}
              {customer.address && <p>{customer.address}</p>}
            </div>
          </div>
          {phone && (
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${customer.name}, this is ${settings.storeName}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Orders</p>
          <p className="mt-2 text-3xl font-bold text-primary">{customer.orderCount}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Total spent</p>
          <p className="mt-2 text-3xl font-bold text-primary">{formatCurrency(customer.totalSpent, settings.currency)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Last order</p>
          <p className="mt-2 text-xl font-bold text-primary">{customer.lastOrderDate ? formatDate(customer.lastOrderDate) : '-'}</p>
        </div>
      </div>

      <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-fg">Order history</h2>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-primary/10 text-muted">
                <tr>
                  <th className="pb-3">Order</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4"><Link className="font-semibold text-primary" to={`/admin/orders/${order.id}`}>{order.orderNumber}</Link></td>
                    <td className="py-4 text-muted">{formatDate(order.createdAt)}</td>
                    <td className="py-4"><StatusBadge status={order.status} /></td>
                    <td className="py-4 text-right font-semibold">{formatCurrency(order.total, settings.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No order history.</p>
        )}
      </div>
    </div>
  );
}
