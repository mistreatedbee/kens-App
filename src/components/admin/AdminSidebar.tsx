import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Settings,
  LogOut,
  Store } from
'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
export function AdminSidebar() {
  const { logout } = useAuth();
  const { settings } = useStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  const navItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    end: true
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: Package
  },
  {
    name: 'Categories',
    path: '/admin/categories',
    icon: Tags
  },
  {
    name: 'Orders',
    path: '/admin/orders',
    icon: ShoppingCart
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: Settings
  }];

  return (
    <aside className="w-64 bg-surface border-r border-white/5 h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-serif text-white flex items-center gap-2">
          <Store className="w-5 h-5 text-accent" />
          {settings.storeName}
        </h2>
        <p className="text-xs text-zinc-500 mt-1">Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) =>
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-accent/10 text-accent font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`
          }>
          
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        )}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>);

}