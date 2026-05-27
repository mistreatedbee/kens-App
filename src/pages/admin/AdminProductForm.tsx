import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { toast } from 'sonner';
import { ImageUpload } from '../../components/admin/ImageUpload';
export function AdminProductForm() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useStore();
  const isEditing = id && id !== 'new';
  const existingProduct = isEditing ? products.find((p) => p.id === id) : null;
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPrice: '',
    description: '',
    categoryId: '',
    images: [] as string[],
    stock: '10',
    isActive: true,
    isFeatured: false,
    isTrending: false
  });
  useEffect(() => {
    if (isEditing && existingProduct) {
      setFormData({
        name: existingProduct.name,
        price: existingProduct.price.toString(),
        discountPrice: existingProduct.discountPrice?.toString() || '',
        description: existingProduct.description,
        categoryId: existingProduct.categoryId,
        images: existingProduct.images,
        stock: existingProduct.stock.toString(),
        isActive: existingProduct.isActive,
        isFeatured: existingProduct.isFeatured,
        isTrending: existingProduct.isTrending
      });
    }
  }, [isEditing, existingProduct]);
  useEffect(() => {
    if (!isEditing && categories.length > 0) {
      setFormData((prev) => prev.categoryId ? prev : {
        ...prev,
        categoryId: categories[0].id
      });
    }
  }, [isEditing, categories]);
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>

  {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      toast.error('Please select a category');
      return;
    }
    const category = categories.find((c) => c.id === formData.categoryId);
    if (!category) return;
    const imageArray = formData.images;
    if (imageArray.length === 0) {
      imageArray.push(
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      ); // Fallback
    }
    const productData = {
      name: formData.name,
      slug: formData.name.
      toLowerCase().
      replace(/[^a-z0-9]+/g, '-').
      replace(/(^-|-$)+/g, ''),
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ?
      parseFloat(formData.discountPrice) :
      undefined,
      description: formData.description,
      categoryId: formData.categoryId,
      categoryName: category.name,
      images: imageArray,
      stock: parseInt(formData.stock, 10),
      isActive: formData.isActive,
      isFeatured: formData.isFeatured,
      isTrending: formData.isTrending
    };
    if (isEditing && id) {
      updateProduct(id, productData);
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product created successfully');
    }
    navigate('/admin/products');
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/products"
          className="p-2 text-muted hover:text-fg hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors">
          
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-fg">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-muted">
            {isEditing ?
            'Update product details.' :
            'Create a new product for your store.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl space-y-6">
              <h2 className="text-xl font-medium text-fg mb-4">
                Basic Information
              </h2>

              <div className="space-y-2">
                <label className="text-sm text-muted">Product Name *</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted">Description *</label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors resize-none" />
                
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted">
                  Product Images *
                </label>
                <ImageUpload
                  images={formData.images}
                  onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                />
                <p className="text-xs text-muted">
                  Upload clear product photos. The first image is used as the main thumbnail.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-6">
              <h2 className="text-xl font-medium text-fg mb-4">
                Pricing & Stock
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted">
                    Regular Price *
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                  
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted">
                    Discount Price (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                  
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted">
                  Stock Quantity *
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl space-y-6">
              <h2 className="text-xl font-medium text-fg mb-4">
                Organization
              </h2>

              <div className="space-y-2">
                <label className="text-sm text-muted">Category *</label>
                <select
                  required
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                  
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((c) =>
                  <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-6">
              <h2 className="text-xl font-medium text-fg mb-4">
                Status & Visibility
              </h2>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="text-fg font-medium group-hover:text-accent transition-colors">
                    Active
                  </div>
                  <div className="text-xs text-muted">Visible on store</div>
                </div>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-black/10 dark:border-white/10 bg-background text-accent focus:ring-accent focus:ring-offset-background" />
                
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="text-fg font-medium group-hover:text-accent transition-colors">
                    Featured
                  </div>
                  <div className="text-xs text-muted">Show on homepage</div>
                </div>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-black/10 dark:border-white/10 bg-background text-accent focus:ring-accent focus:ring-offset-background" />
                
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="text-fg font-medium group-hover:text-accent transition-colors">
                    Trending
                  </div>
                  <div className="text-xs text-muted">
                    Add trending badge
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-black/10 dark:border-white/10 bg-background text-accent focus:ring-accent focus:ring-offset-background" />
                
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent text-black font-semibold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
              
              <Save className="w-5 h-5" />
              {isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </div>
      </form>
    </div>);

}
