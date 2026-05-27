import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Package,
  Truck } from
'lucide-react';
import { useStore, Order } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../lib/format';
import { toast } from 'sonner';
import { ORDER_STATUSES } from '../../lib/orderStatuses';
import { StatusBadge } from '../../components/shared/StatusBadge';
export function AdminOrderDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { orders, settings, updateOrderStatus } = useStore();
  const order = orders.find((o) => o.id === id);
  if (!order) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-serif text-fg mb-4">Order not found</h2>
        <button
          onClick={() => navigate('/admin/orders')}
          className="text-accent hover:underline">
          
          Back to Orders
        </button>
      </div>);

  }
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Order['status'];
    updateOrderStatus(order.id, newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };
  const contactCustomerWhatsApp = () => {
    const phone = order.customerPhone.replace(/\D/g, '');
    const message = `Hi ${order.customerName}, regarding your order ${order.orderNumber} from ${settings.storeName}...`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/orders"
            className="p-2 text-muted hover:text-fg hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors">
            
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif text-fg flex items-center gap-3">
              Order {order.orderNumber}
            </h1>
            <p className="text-muted">{formatDate(order.createdAt)}</p>
            <div className="mt-2">
              <StatusBadge status={order.status} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">Update Status:</span>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="px-4 py-2 bg-surface border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer font-medium">
            
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Items */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-medium text-fg mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-muted" /> Order Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item, idx) =>
              <div
                key={idx}
                className="flex gap-4 p-4 bg-background border border-black/5 dark:border-white/5 rounded-xl">
                
                  <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-zinc-900 shrink-0" />
                
                  <div className="flex-grow flex justify-between">
                    <div>
                      <h4 className="font-medium text-fg">{item.name}</h4>
                      <p className="text-sm text-muted mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-fg">
                        {formatCurrency(
                        item.price * item.quantity,
                        settings.currency
                      )}
                      </div>
                      {item.quantity > 1 &&
                    <div className="text-xs text-muted mt-1">
                          {formatCurrency(item.price, settings.currency)} each
                        </div>
                    }
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-fg">
                  {formatCurrency(order.subtotal, settings.currency)}
                </span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-fg">
                  {order.deliveryType === 'collection' ? 'Free' : 'TBD'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 text-lg">
                <span className="text-fg font-medium">Total</span>
                <span className="font-semibold text-fg">
                  {formatCurrency(order.total, settings.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes &&
          <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-medium text-fg mb-3">
                Customer Notes
              </h2>
              <p className="text-muted bg-background p-4 rounded-xl border border-black/5 dark:border-white/5">
                {order.notes}
              </p>
            </div>
          }
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Customer Info */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-medium text-fg mb-6">
              Customer Details
            </h2>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted mb-1">Name</div>
                <div className="text-fg font-medium">
                  {order.customerName}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted mb-1">Contact</div>
                <div className="flex items-center gap-2 text-fg mb-2">
                  <Phone className="w-4 h-4 text-muted" />{' '}
                  {order.customerPhone}
                </div>
                {order.customerEmail &&
                <div className="flex items-center gap-2 text-fg">
                    <Mail className="w-4 h-4 text-muted" />{' '}
                    {order.customerEmail}
                  </div>
                }
              </div>

              <button
                onClick={contactCustomerWhatsApp}
                className="w-full py-2.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-medium rounded-xl transition-colors flex items-center justify-center gap-2 mt-4">
                
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-medium text-fg mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-muted" /> Delivery Method
            </h2>

            <div className="space-y-4">
              <div>
                <span className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 text-fg rounded-full text-sm font-medium capitalize mb-4">
                  {order.deliveryType}
                </span>
              </div>

              {order.deliveryType === 'delivery' && order.address &&
              <div>
                  <div className="text-sm text-muted mb-2">
                    Delivery Address
                  </div>
                  <div className="flex items-start gap-2 text-fg bg-background p-4 rounded-xl border border-black/5 dark:border-white/5">
                    <MapPin className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{order.address}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>);

}
