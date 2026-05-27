import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
}

export function ImageUpload({ images, onChange, multiple = true }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setIsUploading(true);
    try {
      const uploaded = await Promise.all(files.map((file) => api.uploadImage(file)));
      const urls = uploaded.map((item) => item.url);
      onChange(multiple ? [...images, ...urls] : [urls[0]]);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const removeImage = (url: string) => onChange(images.filter((image) => image !== url));
  const moveImage = (index: number, direction: -1 | 1) => {
    const next = [...images];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 dark:border-white/20 bg-background text-muted hover:text-fg transition-colors">
        <Upload className="w-6 h-6 mb-2" />
        <span className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Upload image'}</span>
        <input type="file" accept="image/*" multiple={multiple} onChange={handleUpload} className="sr-only" disabled={isUploading} />
      </label>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div key={image} className="relative group aspect-square rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
              <img src={image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-x-1 top-1 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => moveImage(index, -1)} className="px-1.5 py-1 rounded bg-black/60 text-white text-xs">Up</button>
                <button type="button" onClick={() => removeImage(image)} className="p-1 rounded bg-black/60 text-white">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
