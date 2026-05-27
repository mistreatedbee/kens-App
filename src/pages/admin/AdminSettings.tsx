import React, { useState } from 'react';
import {
  Save,
  Store,
  Phone,
  Mail,
  MapPin,
  Share2,
  DollarSign } from
'lucide-react';
import { useStore } from '../../context/StoreContext';
import { toast } from 'sonner';
import { ImageUpload } from '../../components/admin/ImageUpload';
export function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState(settings);
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
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
    updateSettings(formData);
    toast.success('Store settings updated successfully');
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-serif text-fg mb-2">Store Settings</h1>
        <p className="text-muted">
          Manage your store's public information and preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Info */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-medium text-fg mb-4 flex items-center gap-2">
            <Store className="w-5 h-5 text-muted" /> General Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-muted">Store Name *</label>
              <input
                required
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
              
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Currency Symbol</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  required
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-muted">Store Logo</label>
              <ImageUpload
                images={formData.logo ? [formData.logo] : []}
                multiple={false}
                onChange={(images) => setFormData((prev) => ({ ...prev, logo: images[0] || '' }))}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-medium text-fg mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-muted" /> Contact Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-muted">
                WhatsApp Number (for orders) *
              </label>
              <input
                required
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
              
              <p className="text-xs text-muted">
                Include country code (e.g. +1)
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">
                General Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
              
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-muted">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
                
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-muted">Physical Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-muted" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors resize-none" />
                
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-medium text-fg mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-muted" /> Additional Information
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-muted">
                Delivery Information (shown in footer)
              </label>
              <textarea
                name="deliveryInfo"
                value={formData.deliveryInfo}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors resize-none" />
              
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted">
                Footer Text (Copyright)
              </label>
              <input
                type="text"
                name="footerText"
                value={formData.footerText}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors" />
              
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-accent text-black font-semibold rounded-xl hover:bg-white transition-colors flex items-center gap-2">
            
            <Save className="w-5 h-5" /> Save Settings
          </button>
        </div>
      </form>
    </div>);

}
