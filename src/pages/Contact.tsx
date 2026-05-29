import React from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { buildGeneralContactUrl } from '../lib/whatsapp';

export function Contact() {
  const { settings } = useStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.open(buildGeneralContactUrl(settings), '_blank');
  };

  return (
    <div className="bg-background">
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">Contact Kenmok CC</p>
          <h1 className="mt-3 text-4xl font-bold text-fg md:text-5xl">Let us help you choose the right solution.</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted">
            Send a service enquiry, request product guidance, or contact us directly through WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          {[
            { icon: MapPin, title: 'Location', value: settings.address },
            { icon: Mail, title: 'Email', value: settings.email, href: `mailto:${settings.email}` },
            { icon: Phone, title: 'Phone', value: settings.phoneNumber, href: `tel:${settings.phoneNumber}` },
            { icon: Clock, title: 'Business hours', value: 'Monday to Friday, 08:00 - 17:00' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-primary/10 bg-white p-5">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-lightblue/20 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-fg">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="mt-1 block text-muted hover:text-secondary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-muted">{item.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-xl shadow-secondary/10 md:p-8">
          <h2 className="text-2xl font-bold text-fg">Send an enquiry</h2>
          <p className="mt-2 text-muted">The form opens WhatsApp so Kenmok CC can respond quickly.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-fg">Your name</span>
              <input required className="h-12 w-full rounded-lg border border-primary/15 bg-surface px-4 outline-none focus:border-secondary" placeholder="Your name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-fg">Phone or email</span>
              <input required className="h-12 w-full rounded-lg border border-primary/15 bg-surface px-4 outline-none focus:border-secondary" placeholder="How can we reach you?" />
            </label>
          </div>
          <label className="mt-5 block space-y-2">
            <span className="text-sm font-semibold text-fg">What do you need?</span>
            <select className="h-12 w-full rounded-lg border border-primary/15 bg-surface px-4 outline-none focus:border-secondary">
              <option>Pest control service</option>
              <option>Cleaning products</option>
              <option>Fragrances</option>
              <option>General enquiry</option>
            </select>
          </label>
          <label className="mt-5 block space-y-2">
            <span className="text-sm font-semibold text-fg">Message</span>
            <textarea required rows={5} className="w-full rounded-lg border border-primary/15 bg-surface px-4 py-3 outline-none focus:border-secondary" placeholder="Tell us what you need help with." />
          </label>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white transition-colors hover:bg-accent">
            <MessageCircle className="h-5 w-5" />
            Send via WhatsApp
          </button>
        </form>
      </section>
    </div>
  );
}
