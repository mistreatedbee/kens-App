import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Product, useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/format';
import { toast } from 'sonner';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const { settings } = useStore();
  const { addToCart } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`Added ${product.name} to cart`);
  };
  const isOutOfStock = product.stock <= 0;
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative flex flex-col glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 hover:border-white/10">
      
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isOutOfStock &&
          <span className="px-3 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full backdrop-blur-md">
              Out of Stock
            </span>
          }
          {!isOutOfStock && product.isTrending &&
          <span className="px-3 py-1 bg-accent/90 text-black text-xs font-medium rounded-full backdrop-blur-md">
              Trending
            </span>
          }
          {product.discountPrice &&
          <span className="px-3 py-1 bg-white/90 text-black text-xs font-medium rounded-full backdrop-blur-md">
              Sale
            </span>
          }
        </div>

        {/* Quick Add Overlay */}
        {!isOutOfStock &&
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-white/10 hover:bg-accent hover:text-black backdrop-blur-md border border-white/20 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
            
              <ShoppingCart className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        }
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider font-medium">
          {product.categoryName}
        </div>
        <h3 className="text-lg font-medium text-zinc-100 mb-2 line-clamp-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            {product.discountPrice ?
            <>
                <span className="text-lg font-semibold text-white">
                  {formatCurrency(product.discountPrice, settings.currency)}
                </span>
                <span className="text-sm text-zinc-500 line-through">
                  {formatCurrency(product.price, settings.currency)}
                </span>
              </> :

            <span className="text-lg font-semibold text-white">
                {formatCurrency(product.price, settings.currency)}
              </span>
            }
          </div>

          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>);

}