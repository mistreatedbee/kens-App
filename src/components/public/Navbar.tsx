import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MessageCircle, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { buildGeneralContactUrl } from '../../lib/whatsapp';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Pest Control', path: '/services/pest-control' },
  { name: 'Cleaning Products', path: '/services/cleaning-products' },
  { name: 'Fragrances', path: '/services/fragrances' },
  { name: 'Shop', path: '/shop' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const { settings } = useStore();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop');
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 border-b border-primary/10 bg-white transition-shadow ${isScrolled ? 'shadow-lg shadow-primary/5' : ''}`}>
        <div className="bg-primary text-white">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
            <span>Kenmok CC · Professional pest control, cleaning products and fragrances</span>
            <a href={`tel:${settings.phoneNumber}`} className="hidden font-semibold hover:text-accent sm:inline">
              {settings.phoneNumber}
            </a>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={settings.logo || '/logo.svg'} alt={settings.storeName} className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center justify-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-secondary ${
                  location.pathname === link.path ? 'text-secondary' : 'text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <form onSubmit={submitSearch} className="hidden xl:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search"
                  className="h-10 w-44 rounded-full border border-primary/10 bg-surface pl-9 pr-4 text-sm outline-none focus:border-secondary"
                />
              </div>
            </form>
            <a
              href={buildGeneralContactUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Link to="/cart" className="relative rounded-full p-2 text-primary transition-colors hover:bg-surface">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="rounded-full p-2 text-primary hover:bg-surface lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm lg:hidden">
          <div className="ml-auto flex h-full w-4/5 max-w-sm flex-col bg-white p-6 shadow-2xl">
            <div className="mb-10 flex items-center justify-between">
              <img src={settings.logo || '/logo.svg'} alt={settings.storeName} className="h-12 w-auto" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="rounded-full bg-surface p-2 text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-lg px-4 py-3 font-semibold ${
                    location.pathname === link.path ? 'bg-primary text-white' : 'text-muted hover:bg-surface hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <a
              href={buildGeneralContactUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Kenmok
            </a>
          </div>
        </div>
      )}
    </>
  );
}
