import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/public/ProductCard';
import { SectionHeading } from '../components/shared/SectionHeading';
import { motion } from 'framer-motion';
export function Home() {
  const { products, categories } = useStore();
  const featuredProducts = products.
  filter((p) => p.isActive && p.isFeatured).
  slice(0, 4);
  const trendingProducts = products.
  filter((p) => p.isActive && p.isTrending).
  slice(0, 4);
  const newArrivals = [...products].
  filter((p) => p.isActive).
  sort(
    (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).
  slice(0, 4);
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,181,71,0.05)_0%,transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="text-center lg:text-left">
            
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6">
              Shop quality products,{' '}
              <span className="italic text-accent">delivered.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover our curated collection of premium essentials designed to
              elevate your everyday lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2">
                
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/categories"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-medium rounded-full hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center">
                
                View Categories
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.8,
              delay: 0.4
            }}
            className="relative hidden lg:block">
            
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass p-2">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
                alt="Premium Lifestyle"
                className="w-full h-full object-cover rounded-2xl" />
              
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl max-w-xs animate-bounce"
              style={{
                animationDuration: '3s'
              }}>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-medium">Premium Quality</p>
                  <p className="text-zinc-400 text-sm">
                    Guaranteed satisfaction
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Shop by Category"
            subtitle="Explore our carefully curated collections." />
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.
            filter((c) => c.isActive).
            slice(0, 4).
            map((category, i) =>
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: i * 0.1
              }}
              key={category.id}>
              
                  <Link
                to={`/shop?category=${category.slug}`}
                className="group relative block aspect-square rounded-3xl overflow-hidden">
                
                    <img
                  src={
                  category.image ||
                  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-zinc-300 flex items-center gap-2 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 &&
      <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
            title="Featured Essentials"
            subtitle="Handpicked favorites for you." />
          
            <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-accent transition-colors mb-12">
            
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) =>
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: i * 0.1
            }}
            key={product.id}>
            
                <ProductCard product={product} />
              </motion.div>
          )}
          </div>
        </section>
      }

      {/* Value Props */}
      <section className="py-24 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Fast Delivery
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Nationwide delivery right to your doorstep within 3-5 business
                days.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Secure Checkout
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Your payment information is processed securely with
                industry-standard encryption.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                24/7 Support
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Have a question? Reach out to us anytime via WhatsApp for quick
                assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      {trendingProducts.length > 0 &&
      <section className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading
          title="Trending Now"
          subtitle="What everyone is buying right now." />
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, i) =>
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: i * 0.1
            }}
            key={product.id}>
            
                <ProductCard product={product} />
              </motion.div>
          )}
          </div>
        </section>
      }
    </div>);

}