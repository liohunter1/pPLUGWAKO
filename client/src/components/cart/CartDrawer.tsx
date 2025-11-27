import { ShoppingBag, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { redirectToWhatsApp } from '@/utils/whatsapp';
import { getProductImage } from '@/utils/productImages';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();

  const handleCheckout = () => {
    redirectToWhatsApp(items, total);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full" data-testid="cart-drawer-empty">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl text-white">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-serif text-lg text-white mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Browse our collection and add your favorite drinks.
          </p>
          <Button onClick={onClose} asChild>
            <Link href="/products" data-testid="cart-browse-products">
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" data-testid="cart-drawer">
      <SheetHeader>
        <SheetTitle className="font-serif text-xl text-white">
          Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </SheetTitle>
      </SheetHeader>

      <ScrollArea className="flex-1 my-4">
        <div className="space-y-4 pr-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-muted/30 rounded-lg border border-border"
              data-testid={`cart-item-${item.id}`}
            >
              <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={getProductImage(item.id.split('-')[0], item.id)}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-sm truncate">{item.name}</h4>
                <p className="text-muted-foreground text-xs">{item.volume}</p>
                <p className="text-primary font-semibold text-sm mt-1">
                  {formatCurrency(item.price)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-muted/80 transition-colors"
                      data-testid={`cart-decrease-${item.id}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-muted/80 transition-colors"
                      data-testid={`cart-increase-${item.id}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    data-testid={`cart-remove-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-white font-semibold">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-muted-foreground text-sm">Calculated at checkout</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-white font-semibold">Total</span>
          <span className="text-primary font-bold text-xl">{formatCurrency(total)}</span>
        </div>
        <Button
          onClick={handleCheckout}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white gap-2"
          size="lg"
          data-testid="cart-checkout-button"
        >
          <MessageCircle className="h-5 w-5" />
          Order via WhatsApp
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          asChild
          className="w-full border-border text-muted-foreground hover:text-white"
        >
          <Link href="/cart" data-testid="cart-view-full">
            View Full Cart
          </Link>
        </Button>
      </div>
    </div>
  );
}
