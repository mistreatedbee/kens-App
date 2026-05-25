import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  Tags,
  AlertCircle,
  ArrowRight } from
'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../lib/format';
export function AdminDashboard() {
  const { products, categories, orders, settings } = useStore();
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) =>
  ['New', 'Pending', 'Processing'].includes(o.status)
  ).length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const recentOrders = [...orders].
  sort(
    (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).
  slice(0, 5);
  const stats = [
  {
    name: 'Total Products',
    value: totalProducts,
    icon: Package,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    name: 'Categories',
    value: totalCategories,
    icon: Tags,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    name: 'Total Orders',
    value: totalOrders,
    icon: ShoppingCart,
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  },
  {
    name: 'Pending Orders',
    value: pendingOrders,
    icon: AlertCircle,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10'
  }];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-zinc-400">Welcome back to your store admin.</p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-accent text-black font-medium rounded-lg hover:bg-white transition-colors whitespace-nowrap">
          
          + Add Product
        </Link>
        <Link
          to="/admin/categories"
          className="px-4 py-2 bg-surface border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
          
          Manage Categories
        </Link>
        <Link
          to="/admin/orders"
          className="px-4 py-2 bg-surface border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
          
          View Orders
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) =>
        <div key={i} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-zinc-400 text-sm font-medium">{stat.name}</p>
            <p className="text-3xl font-semibold text-white mt-1">
              {stat.value}
            </p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-white">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm text-accent hover:underline flex items-center gap-1">
              
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-zinc-400 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.length > 0 ?
                recentOrders.map((order) =>
                <tr key={order.id} className="group">
                      <td className="py-4">
                        <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-white hover:text-accent transition-colors font-medium">
                      
                          {order.orderNumber}
                        </Link>
                        <div className="text-xs text-zinc-500 mt-1">
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                      <td className="py-4 text-zinc-300">
                        {order.customerName}
                      </td>
                      <td className="py-4">
                        <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-500/10 text-green-400' : order.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right text-white font-medium">
                        {formatCurrency(order.total, settings.currency)}
                      </td>
                    </tr>
                ) :

                <tr>
                    <td colSpan={4} className="py-8 text-center text-zinc-500">
                      No orders yet.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" /> Low Stock
          </h2>

          <div className="space-y-4">
            {lowStockProducts.length > 0 ?
            lowStockProducts.map((product) =>
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              
                  <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover bg-zinc-900" />
              
                  <div className="flex-1 min-w-0">
                    <Link
                  to={`/admin/products/${product.id}`}
                  className="text-sm font-medium text-white hover:text-accent truncate block">
                  
                      {product.name}
                    </Link>
                    <p
                  className={`text-xs mt-1 font-medium ${product.stock === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                  
                      {product.stock} remaining
                    </p>
                  </div>
                </div>
            ) :

            <div className="text-center py-8 text-zinc-500 text-sm">
                All products are well stocked.
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}