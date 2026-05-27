import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock, Star, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/public/ProductCard';
import { SectionHeading } from '../components/shared/SectionHeading';
import { formatCurrency } from '../lib/format';
import { motion } from 'framer-motion';

function HeroProductCard({ product }: { product: { name: string; price: number; discountPrice?: number; images: string[]; currency: string } }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden w-44 shrink-0"
    >
      <div className="aspect-[3/4] overflow-hidden bg-black/5 dark:bg-white/5">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-fg text-xs font-medium line-clamp-1">{product.name}</p>
        <p className="text-accent text-xs font-semibold mt-1">
          {formatCurrency(product.discountPrice ?? product.price, product.currency)}
        </p>
      </div>
    </motion.div>
  );
}

export function Home() {
  const { products, categories, settings } = useStore();

  const featuredProducts = products.filter((p) => p.isActive && p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isActive && p.isTrending).slice(0, 4);
  const flashSaleProducts = products.filter((p) => p.isActive && p.discountPrice).slice(0, 4);
  const newArrivals = [...products].filter((p) => p.isActive).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const bestSellers = [...products].filter((p) => p.isActive).sort((a, b) => a.stock - b.stock).slice(0, 4);
  const heroProducts = products.filter((p) => p.isActive && p.images.length > 0).slice(0, 3);

  const stats = [
    { value: products.length > 0 ? `${products.length}+` : '100+', label: 'Products' },
    { value: 'Free',  label: 'Delivery available' },
    { value: '24/7',  label: 'WhatsApp support'  },
  ];

  return (
    <div className="pb-24">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Animated blob background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="animate-blob absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 dark:bg-accent/5 blur-3xl" />
          <div className="animate-blob-slow absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,var(--bg)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 grid lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              </motion.span>
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                New Arrivals
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-fg leading-[1.05] mb-6">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-normal">
                Premium
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-normal">
                everyday
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl italic text-accent relative w-fit">
                essentials.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 300 6"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 3 Q75 0 150 3 Q225 6 300 3"
                    stroke="#FFB547"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Search, browse, order, and arrange payment in minutes. A clean local marketplace built for easy shopping.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/shop"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-fg hover:text-background transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-black/10 dark:border-white/10 text-fg font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              >
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div>
                    <p className="text-fg font-bold text-xl">{s.value}</p>
                    <p className="text-muted text-xs mt-0.5">{s.label}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Right — floating product cards */}
          {heroProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col gap-4 items-center"
            >
              {heroProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  style={{ marginLeft: i === 1 ? '48px' : i === 2 ? '-24px' : '0' }}
                >
                  <HeroProductCard product={{ ...product, currency: settings.currency }} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-muted" />
        </motion.div>
      </section>

      {/* ── Categories ──────────────────────────────────────── */}
      <section className="py-6 border-y border-black/5 dark:border-white/5 bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {['No customer account needed', 'Fast WhatsApp order follow-up', settings.deliveryInfo || 'Delivery and collection available'].map((text) => (
            <div key={text} className="rounded-xl bg-background px-5 py-4 text-fg border border-black/5 dark:border-white/5">
              {text}
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-surface border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Shop by Category"
            subtitle="Explore our carefully curated collections."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories
              .filter((c) => c.isActive)
              .slice(0, 4)
              .map((category, i) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/shop?category=${category.slug}`}
                    className="group relative block aspect-square rounded-3xl overflow-hidden"
                  >
                    <img
                      src={
                        category.image ||
                        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-white/80 flex items-center gap-2 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────────── */}
      {flashSaleProducts.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="rounded-2xl bg-accent p-6 md:p-10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-black/60 text-xs uppercase tracking-widest font-bold mb-2">Limited offers</p>
              <h2 className="font-serif text-4xl text-black">Flash Sale</h2>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full font-semibold">
              Shop deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading title="Featured Essentials" subtitle="Handpicked favorites for you." />
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Value Props ──────────────────────────────────────── */}
      <section className="py-24 bg-surface border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Truck className="w-7 h-7" />,
                title: 'Fast Delivery',
                body: 'Nationwide delivery right to your doorstep within 3–5 business days.',
              },
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: 'Secure Checkout',
                body: 'Your payment is handled securely via WhatsApp — simple and safe.',
              },
              {
                icon: <Clock className="w-7 h-7" />,
                title: '24/7 Support',
                body: 'Have a question? Reach out to us anytime via WhatsApp for quick help.',
              },
            ].map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-300">
                  {prop.icon}
                </div>
                <h3 className="text-lg font-semibold text-fg mb-3">{prop.title}</h3>
                <p className="text-muted leading-relaxed text-sm">{prop.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending ─────────────────────────────────────────── */}
      {trendingProducts.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading title="Trending Now" subtitle="What everyone is buying right now." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA Banner ───────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-24 bg-surface border-y border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="New Arrivals" subtitle="Fresh products recently added to the store." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      )}

      {bestSellers.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeading title="Best Sellers" subtitle="Popular picks customers keep coming back for." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-accent p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
            <div className="relative z-10">
              <p className="text-black/60 text-xs font-semibold tracking-widest uppercase mb-4">
                Explore More
              </p>
              <h2 className="font-serif text-black text-4xl md:text-5xl mb-4">
                Ready to elevate your everyday?
              </h2>
              <p className="text-black/70 text-lg mb-8 max-w-lg mx-auto">
                Browse our full collection and find something you'll love.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
              >
                Explore All Products
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
