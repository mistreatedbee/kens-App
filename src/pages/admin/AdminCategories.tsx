import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useStore, Category } from '../../context/StoreContext';
import { toast } from 'sonner';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { ConfirmModal } from '../../components/shared/ConfirmModal';
export function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } =
  useStore();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    icon: '',
    sortOrder: '0',
    isActive: true
  });
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      icon: '',
      sortOrder: '0',
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
      icon: category.icon || '',
      sortOrder: String(category.sortOrder ?? 0),
      isActive: category.isActive
    });
    setIsEditing(category.id);
    setIsAdding(false);
  };
  const handleDelete = (category: Category) => {
    const productsInCategory = products.filter(
      (p) => p.categoryId === category.id
    ).length;
    if (productsInCategory > 0) {
      toast.error(
        `Cannot delete category. It contains ${productsInCategory} products.`
      );
      return;
    }
    setDeleteTarget(category);
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
      icon: formData.icon,
      sortOrder: Number(formData.sortOrder) || 0,
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
          <h1 className="text-3xl font-bold text-fg mb-2">Categories</h1>
          <p className="text-muted">Manage your product categories.</p>
        </div>
        {!isAdding && !isEditing &&
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-accent transition-colors flex items-center gap-2">
          
            <Plus className="w-5 h-5" /> Add Category
          </button>
        }
      </div>

      {(isAdding || isEditing) &&
      <div className="bg-white rounded-2xl p-6 border border-primary/10 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-fg">
              {isEditing ? 'Edit Category' : 'New Category'}
            </h2>
            <button
            onClick={resetForm}
            className="p-2 text-muted hover:text-fg rounded-full hover:bg-black/10 dark:hover:bg-white/10">
            
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted">Category Name *</label>
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
                className="w-full px-4 py-2.5 bg-background border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors" />
              
            </div>
              <div className="space-y-2">
                <label className="text-sm text-muted">Sort Order</label>
                <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  sortOrder: e.target.value
                })
                }
                className="w-full px-4 py-2.5 bg-background border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted">Icon (optional)</label>
                <input
                value={formData.icon}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  icon: e.target.value
                })
                }
                placeholder="Icon name or URL"
                className="w-full px-4 py-2.5 bg-background border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors" />
              </div>
            <div className="space-y-2">
                <label className="text-sm text-muted">Category Image</label>
                <ImageUpload
                  images={formData.image ? [formData.image] : []}
                  multiple={false}
                  onChange={(images) => setFormData({ ...formData, image: images[0] || '' })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted">Description</label>
              <textarea
              value={formData.description}
              onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
              }
              rows={2}
              className="w-full px-4 py-2.5 bg-background border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors resize-none" />
            
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
                className="w-4 h-4 rounded border-black/10 dark:border-white/10 bg-background text-accent focus:ring-accent" />
              
                <span className="text-fg text-sm">
                  Active (Visible on store)
                </span>
              </label>

              <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-accent transition-colors flex items-center gap-2">
              
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
              className="bg-white border border-primary/10 shadow-sm rounded-2xl overflow-hidden group">
              
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
                    onClick={() => handleDelete(category)}
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
                <h3 className="text-lg font-medium text-fg mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted mb-4 line-clamp-1">
                  {category.description || 'No description'}
                </p>
                <div className="text-sm text-muted font-medium">
                  {productCount} {productCount === 1 ? 'Product' : 'Products'}
                </div>
              </div>
            </div>);

        })}
      </div>
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete category?"
        body={`This will permanently delete "${deleteTarget?.name}".`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteCategory(deleteTarget.id);
          toast.success('Category deleted');
          setDeleteTarget(null);
        }}
      />
    </div>);

}
