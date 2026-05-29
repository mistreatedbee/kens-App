import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, LockKeyhole, Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="border-t border-primary/10 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <img src={settings.logo || '/logo.svg'} alt={settings.storeName} className="h-14 w-auto" />
            <p className="mt-5 max-w-sm leading-7 text-muted">
              Professional pest control, cleaning products and fragrances for homes, businesses and facility teams.
            </p>
            <div className="mt-6 flex gap-3">
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white p-3 text-primary hover:text-accent">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white p-3 text-primary hover:text-accent">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-fg">Services</h4>
            <div className="mt-5 flex flex-col gap-3 text-muted">
              <Link to="/services/pest-control" className="hover:text-secondary">Pest Control</Link>
              <Link to="/services/cleaning-products" className="hover:text-secondary">Cleaning Products</Link>
              <Link to="/services/fragrances" className="hover:text-secondary">Fragrances</Link>
              <Link to="/shop" className="hover:text-secondary">Product Catalog</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-fg">Company</h4>
            <div className="mt-5 flex flex-col gap-3 text-muted">
              <Link to="/" className="hover:text-secondary">Home</Link>
              <Link to="/categories" className="hover:text-secondary">Categories</Link>
              <Link to="/contact" className="hover:text-secondary">Contact</Link>
              <Link to="/cart" className="hover:text-secondary">Cart</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-fg">Contact</h4>
            <div className="mt-5 space-y-4 text-muted">
              <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-secondary" /> {settings.address}</p>
              <a href={`mailto:${settings.email}`} className="flex gap-3 hover:text-secondary"><Mail className="h-5 w-5 shrink-0 text-secondary" /> {settings.email}</a>
              <a href={`tel:${settings.phoneNumber}`} className="flex gap-3 hover:text-secondary"><Phone className="h-5 w-5 shrink-0 text-secondary" /> {settings.phoneNumber}</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-6 text-sm text-muted md:flex-row">
          <div className="flex items-center gap-2">
            <p>{settings.footerText}</p>
            <Link
              to="/admin/login"
              aria-label="Admin portal"
              title="Admin portal"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted/25 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <LockKeyhole className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p>Built for simple, reliable service enquiries.</p>
        </div>
      </div>
    </footer>
  );
}
