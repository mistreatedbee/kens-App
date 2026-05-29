import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff } from
'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../lib/format';
import { toast } from 'sonner';
import { ConfirmModal } from '../../components/shared/ConfirmModal';
import { SearchBar } from '../../components/shared/SearchBar';
import { EmptyState } from '../../components/shared/EmptyState';
export function AdminProducts() {
  const { products, categories, settings, deleteProduct, updateProduct } =
  useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    const matchesCategory =
    categoryFilter === 'all' || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };
  const toggleStatus = (id: string, currentStatus: boolean) => {
    updateProduct(id, {
      isActive: !currentStatus
    });
    toast.success(`Product marked as ${!currentStatus ? 'active' : 'inactive'}`);
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-fg mb-2">Products</h1>
          <p className="text-muted">Manage your store inventory.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="px-6 py-3 bg-accent text-black font-semibold rounded-xl hover:bg-white transition-colors flex items-center gap-2">
          
          <Plus className="w-5 h-5" /> Add Product
        </Link>
      </div>

      <div className="glass-card rounded-2xl p-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search products..." />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors appearance-none sm:w-48 cursor-pointer">
            
            <option value="all">All Categories</option>
            {categories.map((c) =>
            <option key={c.id} value={c.id}>
                {c.name}
              </option>
            )}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-muted border-b border-black/10 dark:border-white/10">
              <tr>
                <th className="pb-4 font-medium px-4">Product</th>
                <th className="pb-4 font-medium px-4">Category</th>
                <th className="pb-4 font-medium px-4">Price</th>
                <th className="pb-4 font-medium px-4">Stock</th>
                <th className="pb-4 font-medium px-4">Status</th>
                <th className="pb-4 font-medium px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filteredProducts.length > 0 ?
              filteredProducts.map((product) =>
              <tr
                key={product.id}
                className="group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-zinc-900 shrink-0" />
                    
                        <div>
                          <div className="font-medium text-fg">
                            {product.name}
                          </div>
                          <div className="text-xs text-muted flex gap-2 mt-1">
                            {product.isFeatured &&
                        <span className="text-accent">Featured</span>
                        }
                            {product.isTrending &&
                        <span className="text-purple-400">Trending</span>
                        }
                            {product.isComingSoon &&
                        <span className="text-secondary">Coming soon</span>
                        }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted">
                      {product.categoryName}
                    </td>
                    <td className="py-4 px-4 text-fg">
                      {product.discountPrice ?
                  <div>
                          <span>
                            {formatCurrency(
                        product.discountPrice,
                        settings.currency
                      )}
                          </span>
                          <span className="text-xs text-muted line-through ml-2">
                            {formatCurrency(product.price, settings.currency)}
                          </span>
                        </div> :

                  formatCurrency(product.price, settings.currency)
                  }
                    </td>
                    <td className="py-4 px-4">
                      <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-500/10 text-green-400' : product.stock > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                    
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                    onClick={() =>
                    toggleStatus(product.id, product.isActive)
                    }
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${product.isActive ? 'bg-black/10 dark:bg-white/10 text-fg hover:bg-black/10 dark:hover:bg-white/20' : 'bg-zinc-800 text-muted hover:bg-zinc-700'}`}>
                    
                        {product.isActive ?
                    <Eye className="w-3 h-3" /> :

                    <EyeOff className="w-3 h-3" />
                    }
                        {product.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                      to={`/admin/products/${product.id}`}
                      className="p-2 text-muted hover:text-fg hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                      title="Edit">
                      
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete">
                      
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
              ) :

              <tr>
                  <td colSpan={6} className="py-4">
                    <EmptyState title="No products found" body="Try changing the search or category filter." />
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete product?"
        body={`This will permanently delete "${deleteTarget?.name}".`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteProduct(deleteTarget.id);
          toast.success('Product deleted');
          setDeleteTarget(null);
        }}
      />
    </div>);

}
