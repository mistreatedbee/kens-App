import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../lib/format';
import { SectionHeading } from '../components/shared/SectionHeading';
import { motion } from 'framer-motion';
export function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const { settings } = useStore();
  const navigate = useNavigate();
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="w-24 h-24 mx-auto bg-surface rounded-full flex items-center justify-center text-zinc-500 mb-8 border border-white/5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-zinc-400 mb-8 text-lg">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-white transition-colors">
          
          Continue Shopping <ArrowRight className="w-5 h-5" />
        </Link>
      </div>);

  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeading
        title="Your Cart"
        subtitle="Review your items before checkout." />
      

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, index) => {
            const price = item.product.discountPrice || item.product.price;
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.1
                }}
                key={item.product.id}
                className="flex gap-6 p-4 sm:p-6 bg-surface border border-white/5 rounded-3xl">
                
                <Link
                  to={`/product/${item.product.slug}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden bg-zinc-900">
                  
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  
                </Link>

                <div className="flex flex-col flex-grow justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-lg font-medium text-white hover:text-accent transition-colors line-clamp-1">
                        
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-zinc-500 mt-1">
                        {item.product.categoryName}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors">
                      
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-background border border-white/10 rounded-full p-1">
                      <button
                        onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                        
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-white text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.min(item.product.stock, item.quantity + 1)
                        )
                        }
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                        
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">
                        {formatCurrency(
                          price * item.quantity,
                          settings.currency
                        )}
                      </div>
                      {item.quantity > 1 &&
                      <div className="text-xs text-zinc-500 mt-1">
                          {formatCurrency(price, settings.currency)} each
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </motion.div>);

          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-3xl p-8 sticky top-32">
            <h3 className="text-xl font-serif text-white mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">
                  {formatCurrency(subtotal, settings.currency)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-white">Calculated at checkout</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-white font-medium">
                  Total (excl. shipping)
                </span>
                <span className="text-2xl font-semibold text-white">
                  {formatCurrency(subtotal, settings.currency)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-accent text-black font-semibold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 mb-4">
              
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/shop"
              className="w-full py-4 bg-transparent border border-white/10 text-white font-medium rounded-full hover:bg-white/5 transition-colors flex items-center justify-center">
              
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>);

}