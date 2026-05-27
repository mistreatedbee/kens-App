import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { buildGeneralContactUrl } from '../../lib/whatsapp';
export function FloatingWhatsApp() {
  const { settings } = useStore();
  if (!settings.whatsappNumber) return null;
  return (
    <a
      href={buildGeneralContactUrl(settings)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group"
      aria-label="Contact us on WhatsApp">
      
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40" />
      <MessageCircle className="w-7 h-7 relative z-10" />
    </a>);

}
