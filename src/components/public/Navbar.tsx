import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
export function Navbar() {
  const { settings } = useStore();
  const { itemCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Shop',
    path: '/shop'
  },
  {
    name: 'Categories',
    path: '/categories'
  },
  {
    name: 'Contact',
    path: '/contact'
  }];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif text-white tracking-wide">
            {settings.storeName}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-zinc-400'}`}>
              
                {link.name}
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="p-2 text-zinc-400 hover:text-white transition-colors">
              
              <Search className="w-5 h-5" />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 text-zinc-400 hover:text-white transition-colors group">
              
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {itemCount > 0 &&
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              }
            </Link>

            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}>
              
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)} />
          
            <motion.div
            initial={{
              x: '100%'
            }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200
            }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-surface border-l border-white/10 z-50 p-6 flex flex-col md:hidden">
            
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-serif text-white">
                  {settings.storeName}
                </span>
                <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full">
                
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link) =>
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-zinc-400'}`}>
                
                    {link.name}
                  </Link>
              )}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/10">
                <Link
                to="/admin/login"
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                
                  Admin Login
                </Link>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>);

}