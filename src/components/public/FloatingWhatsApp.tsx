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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-300 hover:scale-105 group"
      aria-label="Contact us on WhatsApp">
      
      <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 group-hover:opacity-40" />
      <MessageCircle className="w-7 h-7 relative z-10" />
    </a>);

}
