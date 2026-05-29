import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone, UserRound } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../lib/format';
import { SearchBar } from '../../components/shared/SearchBar';

export function AdminCustomers() {
  const { customers, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(query) ||
      customer.phone?.toLowerCase().includes(query) ||
      customer.email?.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  const contactUrl = (phone?: string, name?: string) => {
    const clean = (phone || '').replace(/\D/g, '');
    return `https://wa.me/${clean}?text=${encodeURIComponent(`Hi ${name || ''}, this is ${settings.storeName}.`)}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg">Customers</h1>
        <p className="text-muted">Customer records created automatically from orders.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Unique customers</p>
          <p className="mt-2 text-3xl font-bold text-primary">{customers.length}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Total amount spent</p>
          <p className="mt-2 text-3xl font-bold text-primary">
            {formatCurrency(customers.reduce((sum, item) => sum + item.totalSpent, 0), settings.currency)}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-primary/10">
          <p className="text-sm text-muted">Repeat customers</p>
          <p className="mt-2 text-3xl font-bold text-primary">{customers.filter((item) => item.orderCount > 1).length}</p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm border border-primary/10">
        <div className="mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search customers..." />
        </div>
        {filteredCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-primary/10 text-muted">
                <tr>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Contact</th>
                  <th className="pb-3 font-semibold">Orders</th>
                  <th className="pb-3 font-semibold">Total spent</th>
                  <th className="pb-3 font-semibold">Last order</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="text-fg">
                    <td className="py-4">
                      <Link to={`/admin/customers/${customer.id}`} className="flex items-center gap-3 hover:text-primary">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lightblue/20 text-primary">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">{customer.name}</span>
                      </Link>
                    </td>
                    <td className="py-4 text-muted">
                      <div className="space-y-1">
                        {customer.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {customer.phone}</p>}
                        {customer.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {customer.email}</p>}
                      </div>
                    </td>
                    <td className="py-4">{customer.orderCount}</td>
                    <td className="py-4 font-semibold text-primary">{formatCurrency(customer.totalSpent, settings.currency)}</td>
                    <td className="py-4 text-muted">{customer.lastOrderDate ? formatDate(customer.lastOrderDate) : '-'}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/customers/${customer.id}`} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white">
                          Details
                        </Link>
                        {customer.phone && (
                          <a href={contactUrl(customer.phone, customer.name)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent hover:text-white">
                            <MessageCircle className="inline h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <UserRound className="mx-auto h-12 w-12 text-primary/30" />
            <h2 className="mt-4 text-xl font-bold text-fg">No customers found</h2>
            <p className="mt-2 text-muted">Customers will appear here once orders are placed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
