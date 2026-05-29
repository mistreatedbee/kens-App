import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BarChart3, Menu, Settings, ShoppingCart, Store, Tags, Users, X, Package } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
export function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings, refreshOrders } = useStore();
  const { logout, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) refreshOrders();
  }, [isAuthenticated, refreshOrders]);
  const mobileLinks = [
    { to: '/admin', label: 'Dashboard', icon: Store },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/categories', label: 'Categories', icon: Tags },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/admin/customers', label: 'Customers', icon: Users },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];
  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-primary/10 z-40 flex items-center justify-between px-4">
        <h2 className="text-lg font-bold text-primary flex items-center gap-2">
          <Store className="w-4 h-4 text-accent" />
          {settings.storeName}
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-muted hover:text-fg">
          
          {isMobileMenuOpen ?
          <X className="w-6 h-6" /> :

          <Menu className="w-6 h-6" />
          }
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-4 flex flex-col">
          <nav className="space-y-2 flex-1">
            {mobileLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-4 text-fg hover:bg-lightblue/15 hover:text-primary rounded-xl"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
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
