import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, CheckCircle2, ClipboardCheck, Leaf, MessageCircle } from 'lucide-react';
import { useStore, Category, Product } from '../context/StoreContext';
import { ProductCard } from '../components/public/ProductCard';
import { buildGeneralContactUrl } from '../lib/whatsapp';

const divisionOrder = ['cleaning-products', 'fragrances', 'pest-control'];

const trustItems = [
  { icon: Award, title: 'Professional standards', body: 'Dependable service, clear communication and practical guidance.' },
  { icon: ClipboardCheck, title: 'Easy admin-to-site updates', body: 'Products, categories and business details update from the dashboard.' },
  { icon: Building2, title: 'Business ready', body: 'Suitable for homes, offices, shops, schools and facility teams.' },
  { icon: Leaf, title: 'Clean environments', body: 'Focused on safer, fresher and better maintained spaces.' },
];

function ProductSection({ title, subtitle, products, viewAll }: { title: string; subtitle: string; products: Product[]; viewAll?: string }) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">{subtitle}</p>
          <h2 className="mt-2 text-3xl font-bold text-fg">{title}</h2>
        </div>
        {viewAll && <Link to={viewAll} className="font-semibold text-secondary hover:text-accent">View all</Link>}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

function DivisionSection({ category, products }: { category: Category; products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <Link to={`/services/${category.slug}`} className="group overflow-hidden rounded-2xl bg-primary text-white shadow-xl shadow-secondary/10">
          <div className="relative aspect-[4/3]">
            <img src={category.image} alt={category.name} className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-lightblue">Division</p>
              <h2 className="mt-2 text-3xl font-bold">{category.name}</h2>
              <p className="mt-3 text-white/80">{category.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-accent">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-primary/10 bg-surface p-8 text-muted">
            No active products in this division yet. Add products in the admin dashboard.
          </div>
        )}
      </div>
    </section>
  );
}

export function Home() {
  const { products, categories, settings } = useStore();
  const activeProducts = products.filter((product) => product.isActive);
  const activeCategories = categories.filter((category) => category.isActive);
  const orderedDivisions = divisionOrder
    .map((slug) => activeCategories.find((category) => category.slug === slug))
    .filter(Boolean) as Category[];
  const remainingDivisions = activeCategories.filter((category) => !divisionOrder.includes(category.slug));
  const divisions = [...orderedDivisions, ...remainingDivisions];
  const heroCategory = divisions[0];
  const heroImage = heroCategory?.image || '/logo.jpg';

  const featured = activeProducts.filter((product) => product.isFeatured && !product.isComingSoon).slice(0, 6);
  const latest = [...activeProducts].filter((product) => !product.isComingSoon).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
  const trending = activeProducts.filter((product) => product.isTrending && !product.isComingSoon).slice(0, 6);
  const comingSoon = activeProducts.filter((product) => product.isComingSoon).slice(0, 6);

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
              {settings.tagline || 'Professional South African service company'}
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              {settings.storeName}: cleaning products, fragrances and pest control.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88">
              {settings.description || settings.aboutInfo || 'Kenmok CC helps homes and businesses maintain cleaner, fresher and safer spaces.'}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-primary transition-colors hover:bg-accent hover:text-white">
                Browse products <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={buildGeneralContactUrl(settings)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 font-semibold text-white hover:bg-white/10">
                WhatsApp us <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-primary/30">
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">Contact information</p>
            <h2 className="mt-2 text-2xl font-bold text-fg">{settings.contactPerson || settings.storeName}</h2>
            <div className="mt-5 space-y-3 text-muted">
              <p>{settings.phoneNumber}</p>
              <p>{settings.email}</p>
              <p>{settings.operatingHours}</p>
              <p>{settings.address}</p>
            </div>
            <Link to="/contact" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-accent">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {divisions.map((category) => (
        <DivisionSection key={category.id} category={category} products={activeProducts.filter((product) => product.categoryId === category.id && !product.isComingSoon)} />
      ))}

      <ProductSection title="Featured Products" subtitle="Selected by admin" products={featured} viewAll="/shop" />
      <ProductSection title="Latest Products" subtitle="Recently added" products={latest} viewAll="/shop" />
      <ProductSection title="Trending Products" subtitle="Popular right now" products={trending} viewAll="/shop" />
      <ProductSection title="Coming Soon" subtitle="Launching soon" products={comingSoon} viewAll="/shop" />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">Why choose {settings.storeName}</p>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">A professional partner for cleaner, safer spaces.</h2>
            <p className="mt-5 leading-8 text-muted">{settings.aboutInfo || 'Practical products, responsive communication and dependable service.'}</p>
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

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-surface p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold text-fg md:text-4xl">Need service support or product guidance?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted">{settings.additionalInfo || settings.deliveryInfo}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="rounded-full bg-primary px-7 py-4 font-semibold text-white transition-colors hover:bg-accent">
              Contact {settings.storeName}
            </Link>
            <a href={buildGeneralContactUrl(settings)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-primary/20 px-7 py-4 font-semibold text-primary hover:border-accent hover:text-accent">
              WhatsApp now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
