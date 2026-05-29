import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';
export function Footer() {
  const { settings } = useStore();
  return (
    <footer className="bg-surface border-t border-black/5 dark:border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link
              to="/"
              className="text-3xl font-serif text-fg tracking-wide block">
              
              {settings.storeName}
            </Link>
            <p className="text-muted leading-relaxed">
              Premium quality products curated for the modern lifestyle. Elevate
              your everyday with our carefully selected collections.
            </p>
            <div className="flex items-center gap-4">
              {settings.socialLinks?.instagram &&
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted hover:bg-accent hover:text-black transition-colors">
                
                  <Instagram className="w-5 h-5" />
                </a>
              }
              {settings.socialLinks?.facebook &&
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted hover:bg-accent hover:text-black transition-colors">
                
                  <Facebook className="w-5 h-5" />
                </a>
              }
              {settings.socialLinks?.twitter &&
              <a
                href={settings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted hover:bg-accent hover:text-black transition-colors">
                
                  <Twitter className="w-5 h-5" />
                </a>
              }
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-fg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/shop"
                  className="text-muted hover:text-accent transition-colors">
                  
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-muted hover:text-accent transition-colors">
                  
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted hover:text-accent transition-colors">
                  
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-muted hover:text-accent transition-colors">
                  
                  View Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-fg font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-muted" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Mail className="w-5 h-5 shrink-0 text-muted" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-accent transition-colors">
                  
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone className="w-5 h-5 shrink-0 text-muted" />
                <a
                  href={`tel:${settings.phoneNumber}`}
                  className="hover:text-accent transition-colors">
                  
                  {settings.phoneNumber}
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="text-fg font-medium mb-6">Delivery</h4>
            <p className="text-muted leading-relaxed mb-6">
              {settings.deliveryInfo}
            </p>
            <Link
              to="/admin/login"
              className="text-sm text-muted hover:text-muted transition-colors">
              
              Admin Portal
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 dark:border-white/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">{settings.footerText}</p>
          <div className="flex items-center gap-4 text-sm text-muted">
            <Link to="#" className="hover:text-fg transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-fg transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}