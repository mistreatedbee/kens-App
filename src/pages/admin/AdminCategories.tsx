import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useStore, Category } from '../../context/StoreContext';
import { toast } from 'sonner';
export function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } =
  useStore();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true
  });
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      isActive: true
    });
    setIsEditing(null);
    setIsAdding(false);
  };
  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
      isActive: category.isActive
    });
    setIsEditing(category.id);
    setIsAdding(false);
  };
  const handleDelete = (id: string, name: string) => {
    const productsInCategory = products.filter(
      (p) => p.categoryId === id
    ).length;
    if (productsInCategory > 0) {
      toast.error(
        `Cannot delete category. It contains ${productsInCategory} products.`
      );
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteCategory(id);
      toast.success('Category deleted');
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      name: formData.name,
      slug: formData.name.
      toLowerCase().
      replace(/[^a-z0-9]+/g, '-').
      replace(/(^-|-$)+/g, ''),
      description: formData.description,
      image:
      formData.image ||
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      isActive: formData.isActive
    };
    if (isEditing) {
      updateCategory(isEditing, categoryData);
      toast.success('Category updated');
    } else {
      addCategory(categoryData);
      toast.success('Category created');
    }
    resetForm();
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Categories</h1>
          <p className="text-zinc-400">Manage your product categories.</p>
        </div>
        {!isAdding && !isEditing &&
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-accent text-black font-semibold rounded-xl hover:bg-white transition-colors flex items-center gap-2">
          
            <Plus className="w-5 h-5" /> Add Category
          </button>
        }
      </div>

      {(isAdding || isEditing) &&
      <div className="glass-card rounded-2xl p-6 border border-accent/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-white">
              {isEditing ? 'Edit Category' : 'New Category'}
            </h2>
            <button
            onClick={resetForm}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10">
            
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Category Name *</label>
                <input
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
                }
                className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors" />
              
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Image URL</label>
                <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value
                })
                }
                className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors" />
              
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Description</label>
              <textarea
              value={formData.description}
              onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
              }
              rows={2}
              className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors resize-none" />
            
            </div>

            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  isActive: e.target.checked
                })
                }
                className="w-4 h-4 rounded border-white/10 bg-background text-accent focus:ring-accent" />
              
                <span className="text-white text-sm">
                  Active (Visible on store)
                </span>
              </label>

              <button
              type="submit"
              className="px-6 py-2.5 bg-accent text-black font-semibold rounded-xl hover:bg-white transition-colors flex items-center gap-2">
              
                <Save className="w-4 h-4" />{' '}
                {isEditing ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const productCount = products.filter(
            (p) => p.categoryId === category.id
          ).length;
          return (
            <div
              key={category.id}
              className="glass-card rounded-2xl overflow-hidden group">
              
              <div className="h-32 relative bg-zinc-900">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 bg-black/50 hover:bg-accent hover:text-black text-white rounded-lg backdrop-blur-md transition-colors">
                    
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    className="p-2 bg-black/50 hover:bg-red-500 hover:text-white text-white rounded-lg backdrop-blur-md transition-colors">
                    
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {!category.isActive &&
                <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-md">
                    Hidden
                  </div>
                }
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-1">
                  {category.description || 'No description'}
                </p>
                <div className="text-sm text-zinc-500 font-medium">
                  {productCount} {productCount === 1 ? 'Product' : 'Products'}
                </div>
              </div>
            </div>);

        })}
      </div>
    </div>);

}