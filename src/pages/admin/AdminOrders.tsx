import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { useStore, Order } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../lib/format';
import { ORDER_STATUSES } from '../../lib/orderStatuses';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { SearchBar } from '../../components/shared/SearchBar';
import { EmptyState } from '../../components/shared/EmptyState';
import { ConfirmModal } from '../../components/shared/ConfirmModal';
import { toast } from 'sonner';
export function AdminOrders() {
  const { orders, settings, deleteOrder } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Orders</h1>
        <p className="text-muted">Manage customer orders and fulfillment.</p>
      </div>

      <div className="bg-white border border-primary/10 shadow-sm rounded-2xl p-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by order number or customer name..." />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors appearance-none sm:w-48 cursor-pointer">
            
            <option value="all">All Statuses</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-muted border-b border-black/10 dark:border-white/10">
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
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filteredOrders.length > 0 ?
              filteredOrders.map((order) =>
              <tr
                key={order.id}
                className="group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                
                    <td className="py-4 px-4">
                      <Link
                    to={`/admin/orders/${order.id}`}
                    className="font-medium text-fg hover:text-accent transition-colors">
                    
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-muted">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-fg">{order.customerName}</div>
                      <div className="text-xs text-muted">
                        {order.items.length} items
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted capitalize">
                      {order.deliveryType}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-4 text-fg font-medium">
                      {formatCurrency(order.total, settings.currency)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                    to={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-lg transition-colors text-xs font-medium">
                    
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(order)}
                        className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-lg transition-colors text-xs font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </td>
                  </tr>
              ) :

              <tr>
                  <td colSpan={7} className="py-4">
                    <EmptyState title="No orders found" body="Try a different search or status filter." />
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete order?"
        body={`This will permanently delete order ${deleteTarget?.orderNumber}. Customer totals will be recalculated.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          try {
            await deleteOrder(deleteTarget.id);
            toast.success('Order deleted');
          } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete order');
          } finally {
            setDeleteTarget(null);
          }
        }}
      />
    </div>);

}
