import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../lib/format';
export function AdminOrders() {
  const { orders, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Confirmed':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Processing':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Ready for collection':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'Out for delivery':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Orders</h1>
        <p className="text-zinc-400">Manage customer orders and fulfillment.</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by order number or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors" />
            
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors appearance-none sm:w-48 cursor-pointer">
            
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Ready for collection">Ready for collection</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-zinc-400 border-b border-white/10">
              <tr>
                <th className="pb-4 font-medium px-4">Order</th>
                <th className="pb-4 font-medium px-4">Date</th>
                <th className="pb-4 font-medium px-4">Customer</th>
                <th className="pb-4 font-medium px-4">Method</th>
                <th className="pb-4 font-medium px-4">Status</th>
                <th className="pb-4 font-medium px-4">Total</th>
                <th className="pb-4 font-medium px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ?
              filteredOrders.map((order) =>
              <tr
                key={order.id}
                className="group hover:bg-white/[0.02] transition-colors">
                
                    <td className="py-4 px-4">
                      <Link
                    to={`/admin/orders/${order.id}`}
                    className="font-medium text-white hover:text-accent transition-colors">
                    
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-zinc-400">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white">{order.customerName}</div>
                      <div className="text-xs text-zinc-500">
                        {order.items.length} items
                      </div>
                    </td>
                    <td className="py-4 px-4 text-zinc-300 capitalize">
                      {order.deliveryType}
                    </td>
                    <td className="py-4 px-4">
                      <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white font-medium">
                      {formatCurrency(order.total, settings.currency)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                    to={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-xs font-medium">
                    
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
              ) :

              <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    No orders found.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}