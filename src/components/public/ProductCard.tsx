import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
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
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {isOutOfStock && <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">Out of stock</span>}
          {!isOutOfStock && product.isFeatured && <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Featured</span>}
          {product.discountPrice && <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">Value offer</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-secondary">{product.categoryName}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-fg transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(product.discountPrice, settings.currency)}
                </span>
                <span className="text-sm text-muted line-through">
                  {formatCurrency(product.price, settings.currency)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                {formatCurrency(product.price, settings.currency)}
              </span>
            )}
          </div>
          {!isOutOfStock ? (
            <button
              onClick={handleAddToCart}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-accent"
              title="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          ) : (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted">
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
