import { Order, StoreSettings, Product } from '../context/StoreContext';
import { formatCurrency } from './format';

export function buildOrderWhatsAppMessage(
order: Order,
settings: StoreSettings)
{
  const phone = settings.whatsappNumber.replace(/\D/g, '');

  let message = `*New Order: ${order.orderNumber}*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${order.customerName}\n`;
  message += `Phone: ${order.customerPhone}\n`;
  if (order.customerEmail) message += `Email: ${order.customerEmail}\n`;
  message += `\n*Delivery Method:* ${order.deliveryType}\n`;
  if (order.address) message += `Address: ${order.address}\n`;
  if (order.notes) message += `Notes: ${order.notes}\n`;

  message += `\n*Order Items:*\n`;
  order.items.forEach((item) => {
    message += `- ${item.quantity}x ${item.name} (${formatCurrency(item.price, settings.currency)})\n`;
  });

  message += `\n*Total:* ${formatCurrency(order.total, settings.currency)}\n`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildEnquiryUrl(product: Product, settings: StoreSettings) {
  const phone = settings.whatsappNumber.replace(/\D/g, '');
  const message = `Hi, I'm interested in the product: ${product.name} (${formatCurrency(product.price, settings.currency)}). Is it available?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralContactUrl(settings: StoreSettings) {
  const phone = settings.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${phone}`;
}