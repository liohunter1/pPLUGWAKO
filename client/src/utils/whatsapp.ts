import { formatCurrency } from './formatCurrency';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  volume: string;
  quantity: number;
  image: string;
}

export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  const itemsList = items
    .map(item => `• ${item.name} ${item.volume} – ${formatCurrency(item.price)} (x${item.quantity})`)
    .join('\n');

  const message = `Hello, I'd like to order:

${itemsList}

Total: ${formatCurrency(total)}
Delivery Location: _______`;

  return message;
}

export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function redirectToWhatsApp(items: CartItem[], total: number, phoneNumber: string = '254700123456'): void {
  const message = generateWhatsAppMessage(items, total);
  const url = getWhatsAppUrl(phoneNumber, message);
  window.open(url, '_blank');
}
