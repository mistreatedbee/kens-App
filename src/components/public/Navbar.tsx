import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Sun, Moon, Phone, ChevronDown } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const { settings, categories } = useStore();
  const { itemCount } = useCart();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const activeCategories = categories.filter((category) => category.isActive);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',       path: '/'          },
    { name: 'Shop',       path: '/shop'       },
    { name: 'Categories', path: '/categories' },
    { name: 'Contact',    path: '/contact'    },
  ];

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop');
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-lg border-b border-black/5 dark:border-white/5'
            : 'bg-background/90 backdrop-blur-md'
        }`}
      >
        <div className="border-b border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between text-xs text-muted">
            <span>Easy ordering. No account required.</span>
            <a href={`tel:${settings.phoneNumber}`} className="hidden sm:flex items-center gap-2 hover:text-fg">
              <Phone className="w-3.5 h-3.5" />
              {settings.phoneNumber}
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif text-fg tracking-wide">
            {settings.storeName}
          </Link>

          <form onSubmit={submitSearch} className="hidden lg:flex items-center min-w-0">
            <Link
              to="/categories"
              className="h-11 px-4 bg-surface border border-r-0 border-black/10 dark:border-white/10 rounded-l-xl text-sm text-fg flex items-center gap-2 whitespace-nowrap hover:text-accent"
            >
              Categories <ChevronDown className="w-4 h-4" />
            </Link>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="w-full h-11 pl-12 pr-4 bg-surface border border-black/10 dark:border-white/10 rounded-r-xl text-fg focus:outline-none focus:border-accent"
              />
            </div>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex lg:hidden items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-accent' : 'text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link to="/shop" className="p-2 text-muted hover:text-fg transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 text-muted hover:text-fg transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                    exit={{    opacity: 0, rotate:  90, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <Sun className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, rotate:  90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate:  0,  scale: 1   }}
                    exit={{    opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <Moon className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              to="/cart"
              className="relative p-2 text-muted hover:text-fg transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-muted hover:text-fg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        {activeCategories.length > 0 && (
          <div className="hidden lg:block border-t border-black/5 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-11 flex items-center gap-6 overflow-x-auto text-sm">
              {activeCategories.slice(0, 8).map((category) => (
                <Link key={category.id} to={`/shop?category=${category.slug}`} className="text-muted hover:text-accent whitespace-nowrap">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-surface border-l border-black/10 dark:border-white/10 z-50 p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-serif text-fg">{settings.storeName}</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-muted hover:text-fg bg-black/5 dark:bg-white/5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-medium transition-colors ${
                      location.pathname === link.path ? 'text-accent' : 'text-muted'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <Link
                  to="/admin/login"
                  className="text-sm text-muted hover:text-fg transition-colors"
                >
                  Admin Login
                </Link>
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 text-sm text-muted hover:text-fg transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
