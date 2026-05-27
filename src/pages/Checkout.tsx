import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../lib/format';
import { generateOrderNumber } from '../lib/id';
import { toast } from 'sonner';
export function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { settings, addOrder } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    deliveryType: 'delivery' as 'delivery' | 'collection',
    address: '',
    notes: ''
  });
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>

  {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const orderNumber = generateOrderNumber();
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.discountPrice || item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      }));
      const newOrder = {
        orderNumber,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        deliveryType: formData.deliveryType,
        address:
        formData.deliveryType === 'delivery' ? formData.address : undefined,
        notes: formData.notes,
        items: orderItems,
        subtotal,
        total: subtotal,
        status: 'New' as const
      };
      addOrder(newOrder);
      clearCart();
      // Navigate to confirmation page
      navigate(`/order-confirmation/${orderNumber}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };
  if (items.length === 0) return null;
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center gap-2 text-muted hover:text-fg mb-8 transition-colors">
        
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Form */}
        <div>
          <h1 className="text-4xl font-serif text-fg mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-fg border-b border-black/10 dark:border-white/10 pb-2">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted">Full Name *</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                  
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                  
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-fg border-b border-black/10 dark:border-white/10 pb-2">
                Delivery Method
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${formData.deliveryType === 'delivery' ? 'bg-accent/10 border-accent text-accent' : 'bg-surface border-black/10 dark:border-white/10 text-fg hover:border-black/20 dark:hover:border-white/20'}`}>
                  
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={formData.deliveryType === 'delivery'}
                    onChange={handleChange}
                    className="sr-only" />
                  
                  <div className="font-medium mb-1">Delivery</div>
                  <div className="text-sm opacity-80">Ship to my address</div>
                </label>
                <label
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${formData.deliveryType === 'collection' ? 'bg-accent/10 border-accent text-accent' : 'bg-surface border-black/10 dark:border-white/10 text-fg hover:border-black/20 dark:hover:border-white/20'}`}>
                  
                  <input
                    type="radio"
                    name="deliveryType"
                    value="collection"
                    checked={formData.deliveryType === 'collection'}
                    onChange={handleChange}
                    className="sr-only" />
                  
                  <div className="font-medium mb-1">Collection</div>
                  <div className="text-sm opacity-80">Pick up in store</div>
                </label>
              </div>

              {formData.deliveryType === 'delivery' &&
              <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm text-muted">
                    Delivery Address *
                  </label>
                  <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-surface border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors resize-none" />
                
                </div>
              }
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-fg border-b border-black/10 dark:border-white/10 pb-2">
                Additional Information
              </h2>
              <div className="space-y-2">
                <label className="text-sm text-muted">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Special instructions for delivery..."
                  className="w-full px-4 py-3 bg-surface border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors resize-none" />
                
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-accent text-black font-semibold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
              
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted">
              <ShieldCheck className="w-4 h-4" /> Secure checkout process
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-3xl p-8 sticky top-32">
            <h3 className="text-xl font-serif text-fg mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => {
                const price = item.product.discountPrice || item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-zinc-900 overflow-hidden shrink-0 relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover" />
                      
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-700 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-fg line-clamp-2">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-muted mt-1">
                        {formatCurrency(
                          price * item.quantity,
                          settings.currency
                        )}
                      </p>
                    </div>
                  </div>);

              })}
            </div>

            <div className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-fg">
                  {formatCurrency(subtotal, settings.currency)}
                </span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-fg">
                  {formData.deliveryType === 'collection' ?
                  'Free' :
                  'Calculated after order'}
                </span>
              </div>
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
                <span className="text-fg font-medium">Total</span>
                <span className="text-2xl font-semibold text-fg">
                  {formatCurrency(subtotal, settings.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
