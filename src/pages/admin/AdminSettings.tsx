import React, { useEffect, useState } from 'react';
import { Info, Mail, MapPin, Phone, Save, Share2, Store } from 'lucide-react';
import { useStore, StoreSettings } from '../../context/StoreContext';
import { toast } from 'sonner';
import { ImageUpload } from '../../components/admin/ImageUpload';

export function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => setFormData(settings), [settings]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialKey]: value },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
      toast.success('Business settings saved');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = 'w-full rounded-lg border border-primary/15 bg-background px-4 py-3 text-fg outline-none transition-colors focus:border-secondary';
  const labelClass = 'text-sm font-semibold text-fg';

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-fg">Business Settings</h1>
        <p className="text-muted">Update the information shown across the Kenmok CC website and admin dashboard.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-fg">
            <Store className="h-5 w-5 text-secondary" />
            General information
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Website/app name *</span>
              <input required name="storeName" value={formData.storeName} onChange={handleChange} className={inputClass} placeholder="Kenmok CC" />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Business slogan/tagline</span>
              <input name="tagline" value={formData.tagline || ''} onChange={handleChange} className={inputClass} placeholder="Clean spaces. Fresh impressions." />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className={labelClass}>Business description</span>
              <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className={inputClass} placeholder="Describe what Kenmok CC offers." />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Contact person name</span>
              <input name="contactPerson" value={formData.contactPerson || ''} onChange={handleChange} className={inputClass} placeholder="Main contact person" />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Website URL</span>
              <input name="websiteUrl" value={formData.websiteUrl || ''} onChange={handleChange} className={inputClass} placeholder="https://..." />
            </label>
            <div className="space-y-2 md:col-span-2">
              <span className={labelClass}>Business logo upload</span>
              <ImageUpload
                images={formData.logo ? [formData.logo] : []}
                multiple={false}
                onChange={(images) => setFormData((prev) => ({ ...prev, logo: images[0] || '/logo.jpg' }))}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-fg">
            <Phone className="h-5 w-5 text-secondary" />
            Contact details
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Phone number *</span>
              <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={inputClass} placeholder="073 204 7642" />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>WhatsApp number *</span>
              <input required name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className={inputClass} placeholder="073 204 7642" />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Email address</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClass} pl-10`} placeholder="info@kenmok.co.za" />
              </div>
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Operating hours</span>
              <input name="operatingHours" value={formData.operatingHours || ''} onChange={handleChange} className={inputClass} placeholder="Monday to Friday, 08:00 - 17:00" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className={labelClass}>Physical address</span>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 h-4 w-4 text-muted" />
                <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className={`${inputClass} pl-10`} placeholder="Business address" />
              </div>
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-fg">
            <Info className="h-5 w-5 text-secondary" />
            Business content
          </h2>
          <div className="grid gap-5">
            <label className="space-y-2">
              <span className={labelClass}>Delivery/collection information</span>
              <textarea name="deliveryInfo" value={formData.deliveryInfo} onChange={handleChange} rows={3} className={inputClass} placeholder="Delivery information shown to customers." />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Collection information</span>
              <textarea name="collectionInfo" value={formData.collectionInfo || ''} onChange={handleChange} rows={2} className={inputClass} placeholder="Collection details if available." />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>About business information</span>
              <textarea name="aboutInfo" value={formData.aboutInfo || ''} onChange={handleChange} rows={4} className={inputClass} placeholder="Tell customers about Kenmok CC." />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Additional business information</span>
              <textarea name="additionalInfo" value={formData.additionalInfo || ''} onChange={handleChange} rows={3} className={inputClass} placeholder="Extra notes, policies, service areas, etc." />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Footer text</span>
              <input name="footerText" value={formData.footerText} onChange={handleChange} className={inputClass} placeholder="© 2026 Kenmok CC. All rights reserved." />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Currency symbol</span>
              <input required name="currency" value={formData.currency} onChange={handleChange} className={inputClass} placeholder="R" />
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-fg">
            <Share2 className="h-5 w-5 text-secondary" />
            Social media links
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].map((name) => (
              <label key={name} className="space-y-2">
                <span className={labelClass}>{name[0].toUpperCase() + name.slice(1)}</span>
                <input name={`social_${name}`} value={formData.socialLinks?.[name as keyof StoreSettings['socialLinks']] || ''} onChange={handleChange} className={inputClass} placeholder={`https://${name}.com/...`} />
              </label>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white transition-colors hover:bg-accent disabled:opacity-60"
          >
            <Save className="h-5 w-5" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
