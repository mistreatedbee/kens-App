import React from 'react';
import { MapPin, Mail, Phone, MessageCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SectionHeading } from '../components/shared/SectionHeading';
import { buildGeneralContactUrl } from '../lib/whatsapp';
export function Contact() {
  const { settings } = useStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email. For now, we'll just show a toast or redirect to WhatsApp.
    window.open(buildGeneralContactUrl(settings), '_blank');
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeading
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        centered />
      

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mt-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="prose prose-invert">
            <h3 className="text-2xl font-serif text-fg mb-4">
              Get in touch
            </h3>
            <p className="text-muted leading-relaxed">
              Whether you have a question about our products, need help with an
              order, or just want to say hello, we're here for you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 text-accent">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-fg font-medium mb-1">Visit Us</h4>
                <p className="text-muted">{settings.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 text-accent">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-fg font-medium mb-1">Email Us</h4>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-muted hover:text-accent transition-colors">
                  
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 text-accent">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-fg font-medium mb-1">Call Us</h4>
                <a
                  href={`tel:${settings.phoneNumber}`}
                  className="text-muted hover:text-accent transition-colors">
                  
                  {settings.phoneNumber}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 text-accent">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-fg font-medium mb-1">Business Hours</h4>
                <p className="text-muted">
                  Mon - Fri: 9:00 AM - 6:00 PM
                  <br />
                  Sat: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-2xl font-serif text-fg mb-6">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-muted">Your Name</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors"
                placeholder="John Doe" />
              
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted">Email Address</label>
              <input
                required
                type="email"
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors"
                placeholder="john@example.com" />
              
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted">Message</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="How can we help you?" />
              
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent text-black font-semibold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2">
              
              <MessageCircle className="w-5 h-5" />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>);

}