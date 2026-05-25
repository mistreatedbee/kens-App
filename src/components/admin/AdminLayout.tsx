import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X, Store } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
export function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useStore();
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-white/5 z-40 flex items-center justify-between px-4">
        <h2 className="text-lg font-serif text-white flex items-center gap-2">
          <Store className="w-4 h-4 text-accent" />
          {settings.storeName}
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-zinc-400 hover:text-white">
          
          {isMobileMenuOpen ?
          <X className="w-6 h-6" /> :

          <Menu className="w-6 h-6" />
          }
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div className="md:hidden fixed inset-0 top-16 bg-surface z-40 p-4 flex flex-col">
          <nav className="space-y-2 flex-1">
            <Link
            to="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-4 text-white hover:bg-white/5 rounded-xl">
            
              Dashboard
            </Link>
            <Link
            to="/admin/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-4 text-white hover:bg-white/5 rounded-xl">
            
              Products
            </Link>
            <Link
            to="/admin/categories"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-4 text-white hover:bg-white/5 rounded-xl">
            
              Categories
            </Link>
            <Link
            to="/admin/orders"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-4 text-white hover:bg-white/5 rounded-xl">
            
              Orders
            </Link>
            <Link
            to="/admin/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-4 text-white hover:bg-white/5 rounded-xl">
            
              Settings
            </Link>
          </nav>
          <button
          onClick={() => {
            logout();
            setIsMobileMenuOpen(false);
          }}
          className="p-4 text-red-400 hover:bg-red-400/10 rounded-xl text-left">
          
            Logout
          </button>
        </div>
      }

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto pt-16 md:pt-0">
        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>);

}