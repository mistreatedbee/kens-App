import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles, SprayCan } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/public/ProductCard';
import { buildGeneralContactUrl } from '../lib/whatsapp';

const serviceContent = {
  'pest-control': {
    title: 'Pest Control Services',
    eyebrow: 'Professional pest management',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80',
    intro:
      'Reliable pest control support for homes, offices, shops and commercial properties.',
    points: ['Residential and commercial call-outs', 'Practical prevention guidance', 'Discreet and professional service', 'Follow-up support via WhatsApp'],
  },
  'cleaning-products': {
    title: 'Cleaning Products',
    eyebrow: 'Hygiene and maintenance essentials',
    icon: SprayCan,
    image:
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1400&q=80',
    intro:
      'Practical cleaning products for daily hygiene, surfaces, floors and facility teams.',
    points: ['Multipurpose cleaning solutions', 'Products for business and home use', 'Simple ordering process', 'Helpful product guidance'],
  },
  fragrances: {
    title: 'Fragrances',
    eyebrow: 'Fresh spaces, better impressions',
    icon: Sparkles,
    image:
      'https://images.unsplash.com/photo-1595425964071-2c1ec4d3dcb2?auto=format&fit=crop&w=1400&q=80',
    intro:
      'Fresh fragrance options for offices, receptions, homes, bathrooms and customer spaces.',
    points: ['Clean professional scent profiles', 'Options for homes and businesses', 'Ideal for high-traffic spaces', 'Easy WhatsApp enquiries'],
  },
} as const;

export function ServiceDivision() {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, settings } = useStore();
  const content = slug ? serviceContent[slug as keyof typeof serviceContent] : null;

  if (!content) return <Navigate to="/" replace />;

  const category = categories.find((item) => item.slug === slug);
  const relatedProducts = products
    .filter((product) => product.isActive && (!category || product.categoryId === category.id))
    .slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-30">
          <img src={content.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lightblue">{content.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">{content.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{content.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildGeneralContactUrl(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-primary transition-colors hover:bg-accent hover:text-white"
              >
                Request via WhatsApp <MessageCircle className="h-4 w-4" />
              </a>
              <Link
                to={`/shop?category=${slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 font-semibold text-white hover:bg-white/10"
              >
                View products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-fg shadow-2xl">
            <content.icon className="mb-5 h-10 w-10 text-accent" />
            <h2 className="text-2xl font-bold">What to expect</h2>
            <div className="mt-6 space-y-4">
              {content.points.map((point) => (
                <div key={point} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-muted">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-secondary">Related catalog</p>
              <h2 className="mt-3 text-3xl font-bold text-fg">Products and services in this division.</h2>
            </div>
            <Link to={`/shop?category=${slug}`} className="font-semibold text-secondary hover:text-accent">
              Browse all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
