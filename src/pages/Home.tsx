import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Leaf,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/public/ProductCard';
import { buildGeneralContactUrl } from '../lib/whatsapp';

const divisions = [
  {
    title: 'Pest Control Services',
    path: '/services/pest-control',
    icon: ShieldCheck,
    body: 'Reliable pest management for homes, businesses, offices and facilities.',
    cta: 'View pest control',
  },
  {
    title: 'Cleaning Products',
    path: '/services/cleaning-products',
    icon: SprayCan,
    body: 'Practical cleaning products for hygiene, surfaces, floors and daily operations.',
    cta: 'Shop cleaning products',
  },
  {
    title: 'Fragrances',
    path: '/services/fragrances',
    icon: Sparkles,
    body: 'Fresh fragrance solutions for professional, welcoming environments.',
    cta: 'Explore fragrances',
  },
];

const trustItems = [
  { icon: Award, title: 'Professional standards', body: 'Clear communication, dependable service and tidy workmanship.' },
  { icon: ClipboardCheck, title: 'Service-focused', body: 'Solutions matched to the site, product need and customer priority.' },
  { icon: Building2, title: 'Business ready', body: 'Suitable for homes, offices, shops, schools and facility teams.' },
  { icon: Leaf, title: 'Clean environments', body: 'Focused on safer, fresher and better maintained spaces.' },
];

const testimonials = [
  {
    quote: 'Kenmok CC helped us keep our workspace clean, fresh and professionally maintained.',
    name: 'Facility Manager',
    role: 'Commercial client',
  },
  {
    quote: 'Fast responses, practical advice and products that fit our daily cleaning needs.',
    name: 'Operations Lead',
    role: 'Local business',
  },
  {
    quote: 'The team is reliable and easy to work with. The service feels personal and professional.',
    name: 'Homeowner',
    role: 'Residential client',
  },
];

export function Home() {
  const { products, categories, settings } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const featuredProducts = products.filter((p) => p.isActive && p.isFeatured).slice(0, 6);
  const activeCategories = categories.filter((c) => c.isActive);
  const heroImage =
    activeCategories[0]?.image ||
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80';

  const productSearchPath = useMemo(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());
    if (category !== 'all') params.set('category', category);
    const qs = params.toString();
    return qs ? `/shop?${qs}` : '/shop';
  }, [query, category]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(productSearchPath);
  };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-surface">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/35" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Professional South African service company
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Pest control, cleaning products and fragrances you can trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88">
              Kenmok CC helps homes and businesses maintain cleaner, fresher and safer spaces with dependable service and practical product solutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-primary transition-colors hover:bg-accent hover:text-white"
              >
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildGeneralContactUrl(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                WhatsApp us <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 text-sm">
              {[
                ['3', 'Core divisions'],
                ['24/7', 'WhatsApp access'],
                ['SA', 'Local service'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-white/75">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-2xl shadow-primary/30">
            <form onSubmit={submitSearch} className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Find products</p>
                <h2 className="mt-2 text-2xl font-bold text-fg">Search Kenmok solutions</h2>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search cleaning, pest control, fragrance..."
                  className="h-12 w-full rounded-lg border border-primary/15 bg-surface pl-12 pr-4 text-fg outline-none transition-colors focus:border-secondary"
                />
              </div>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 w-full rounded-lg border border-primary/15 bg-surface px-4 text-fg outline-none transition-colors focus:border-secondary"
              >
                <option value="all">All divisions</option>
                {activeCategories.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-white transition-colors hover:bg-accent">
                Search catalog <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">Service divisions</p>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">Three practical ways Kenmok CC supports your space.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {divisions.map((division) => (
            <Link key={division.title} to={division.path} className="group rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-lightblue/20 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <division.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-fg">{division.title}</h3>
              <p className="mt-3 leading-7 text-muted">{division.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-secondary">
                {division.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">Featured products</p>
                <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">Popular Kenmok products and services.</h2>
              </div>
              <Link to="/shop" className="inline-flex items-center gap-2 font-semibold text-secondary hover:text-accent">
                View full catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">Why choose Kenmok CC</p>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">A professional partner for cleaner, safer spaces.</h2>
            <p className="mt-5 leading-8 text-muted">
              Kenmok CC brings service discipline, practical products and responsive communication together in one easy-to-work-with platform.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-primary/10 bg-white p-5">
                <item.icon className="mb-4 h-7 w-7 text-accent" />
                <h3 className="font-bold text-fg">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-lightblue">Testimonials</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built around trust and repeat service.</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-xl bg-white/10 p-6 ring-1 ring-white/15">
                <div className="mb-4 flex gap-1 text-accent">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="leading-7 text-white/88">"{item.quote}"</p>
                <p className="mt-6 font-bold">{item.name}</p>
                <p className="text-sm text-white/65">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-surface p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold text-fg md:text-4xl">Need service support or product guidance?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted">
            Speak to Kenmok CC about pest control, cleaning products, fragrance options or a tailored quote.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="rounded-full bg-primary px-7 py-4 font-semibold text-white transition-colors hover:bg-accent">
              Contact Kenmok CC
            </Link>
            <a
              href={buildGeneralContactUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary/20 px-7 py-4 font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              WhatsApp now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
