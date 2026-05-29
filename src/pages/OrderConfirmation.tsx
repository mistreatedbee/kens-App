import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  MessageCircle,
  ShoppingBag } from
'lucide-react';
import { useStore } from '../context/StoreContext';
import { buildOrderWhatsAppMessage } from '../lib/whatsapp';
import { formatCurrency } from '../lib/format';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
export function OrderConfirmation() {
  const { orderId } = useParams<{
    orderId: string;
  }>();
  const { orders, settings } = useStore();
  const navigate = useNavigate();
  const [remoteOrder, setRemoteOrder] = React.useState<typeof orders[number] | null>(null);
  const order = orders.find((o) => o.orderNumber === orderId) || remoteOrder;
  useEffect(() => {
    if (!orderId) return;
    if (!order) {
      api.getOrderByNumber(orderId).then(setRemoteOrder).catch(() => navigate('/'));
    }
  }, [order, orderId, navigate]);
  if (!order) return null;
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        className="glass-card rounded-3xl p-8 md:p-12 text-center">
        <img src={settings.logo || '/logo.svg'} alt={settings.storeName} className="mx-auto mb-6 h-14 w-auto" />
        
        <div className="w-20 h-20 mx-auto bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-4xl font-serif text-fg mb-4">
          Order Confirmed!
        </h1>
        <p className="text-muted text-lg mb-2">
          Thank you for your order, {order.customerName}.
        </p>
        <p className="text-muted mb-4">{settings.phoneNumber} · {settings.email}</p>
        <p className="text-muted mb-8">
          Order Number:{' '}
          <span className="text-fg font-medium">{order.orderNumber}</span>
        </p>

        <div className="bg-background rounded-2xl p-6 text-left mb-8 border border-black/5 dark:border-white/5">
          <h3 className="text-fg font-medium mb-4 border-b border-black/10 dark:border-white/10 pb-2">
            Order Summary
          </h3>
          <div className="space-y-3 mb-4">
            {order.items.map((item, idx) =>
            <div key={idx} className="flex justify-between text-sm">
                <span className="text-muted">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-fg">
                  {formatCurrency(
                  item.price * item.quantity,
                  settings.currency
                )}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-black/10 dark:border-white/10">
            <span className="text-fg font-medium">Total</span>
            <span className="text-xl font-semibold text-fg">
              {formatCurrency(order.total, settings.currency)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted mb-4">
            To complete your order and arrange payment/delivery, please send
            your order details to us on WhatsApp.
          </p>

          <a
            href={buildOrderWhatsAppMessage(order, settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2">
            
            <MessageCircle className="w-5 h-5" />
            Send Order via WhatsApp
          </a>

          <Link
            to="/shop"
            className="w-full py-4 bg-surface border border-black/10 dark:border-white/10 text-fg font-medium rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>);

}
