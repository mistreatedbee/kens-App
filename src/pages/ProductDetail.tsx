import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  MessageCircle,
  ArrowLeft,
  Minus,
  Plus,
  Check,
  Share2 } from
'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/format';
import { buildEnquiryUrl } from '../lib/whatsapp';
import { ProductCard } from '../components/public/ProductCard';
import { toast } from 'sonner';
export function ProductDetail() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const { products, settings } = useStore();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const product = products.find((p) => p.slug === slug && p.isActive);
  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    window.scrollTo(0, 0);
  }, [slug]);
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-serif text-fg mb-4">
          Product not found
        </h2>
        <button
          onClick={() => navigate('/shop')}
          className="text-accent hover:underline">
          
          Return to Shop
        </button>
      </div>);

  }
  const relatedProducts = products.
  filter(
    (p) =>
    p.categoryId === product.categoryId &&
    p.id !== product.id &&
    p.isActive
  ).
  slice(0, 4);
  const isOutOfStock = product.stock <= 0;
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(
      `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`
    );
  };
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };
  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } catch (err) {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-muted hover:text-fg mb-8 transition-colors">
        
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-surface border border-black/5 dark:border-white/5 relative">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover" />
            
            {isOutOfStock &&
            <div className="absolute top-6 left-6 px-4 py-2 bg-red-500/90 text-white text-sm font-medium rounded-full backdrop-blur-md">
                Out of Stock
              </div>
            }
            {product.discountPrice && !isOutOfStock &&
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 text-black text-sm font-medium rounded-full backdrop-blur-md">
                Sale
              </div>
            }
          </div>

          {product.images.length > 1 &&
          <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) =>
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}>
              
                  <img
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-full h-full object-cover" />
              
                </button>
            )}
            </div>
          }
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <Link
              to={`/shop?category=${product.categoryId}`}
              className="text-sm text-accent uppercase tracking-wider font-medium hover:underline">
              
              {product.categoryName}
            </Link>
            <button
              onClick={handleShare}
              className="p-2 text-muted hover:text-fg rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-fg mb-6">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            {product.discountPrice ?
            <>
                <span className="text-3xl font-semibold text-fg">
                  {formatCurrency(product.discountPrice, settings.currency)}
                </span>
                <span className="text-xl text-muted line-through">
                  {formatCurrency(product.price, settings.currency)}
                </span>
              </> :

            <span className="text-3xl font-semibold text-fg">
                {formatCurrency(product.price, settings.currency)}
              </span>
            }
          </div>

          <p className="text-muted text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-2 text-sm">
              {isOutOfStock ?
              <span className="text-red-400 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" /> Out of
                  stock
                </span> :

              <span className="text-green-400 flex items-center gap-2">
                  <Check className="w-4 h-4" /> In stock ({product.stock}{' '}
                  available)
                </span>
              }
            </div>

            {!isOutOfStock &&
            <div className="flex items-center gap-4">
                <span className="text-muted font-medium">Quantity</span>
                <div className="flex items-center bg-surface border border-black/10 dark:border-white/10 rounded-full p-1">
                  <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted hover:text-fg hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                  
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-fg font-medium">
                    {quantity}
                  </span>
                  <button
                  onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-10 h-10 flex items-center justify-center text-muted hover:text-fg hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                  
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            }
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 py-4 bg-accent text-black font-semibold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent">
              
              <ShoppingCart className="w-5 h-5" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <a
              href={buildEnquiryUrl(product, settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 bg-surface border border-black/10 dark:border-white/10 text-fg font-medium rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              
              <MessageCircle className="w-5 h-5" />
              Enquire on WhatsApp
            </a>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex-1 py-4 bg-black text-white font-semibold rounded-full hover:bg-accent hover:text-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              Buy Now
            </button>
          </div>

          <div className="mt-10 glass-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-fg mb-4">Product Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><dt className="text-muted">Category</dt><dd className="text-fg font-medium">{product.categoryName}</dd></div>
              <div><dt className="text-muted">Stock</dt><dd className="text-fg font-medium">{product.stock} available</dd></div>
              <div><dt className="text-muted">Rating</dt><dd className="text-fg font-medium">New product</dd></div>
              <div><dt className="text-muted">Order type</dt><dd className="text-fg font-medium">Delivery or collection</dd></div>
            </dl>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 &&
      <div className="pt-24 border-t border-black/5 dark:border-white/5">
          <h2 className="text-3xl font-serif text-fg mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) =>
          <ProductCard key={p.id} product={p} />
          )}
          </div>
        </div>
      }
    </div>);

}
