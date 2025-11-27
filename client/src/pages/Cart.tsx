import { Link } from 'wouter';
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { getProductImage } from '@/utils/productImages';
import { redirectToWhatsApp } from '@/utils/whatsapp';

export default function Cart() {
  const { items, updateQuantity, removeItem, total, itemCount, clearCart } = useCart();

  const handleCheckout = () => {
    redirectToWhatsApp(items, total);
  };

  const handleCheckoutAndContinue = () => {
    redirectToWhatsApp(items, total);
    // User can continue shopping after placing order
    // Cart items remain for placing multiple orders
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center" data-testid="cart-empty">
            <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl text-white mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Browse our collection to find your favorite drinks.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/products" data-testid="cart-browse-products">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white" data-testid="cart-title">
            Shopping Cart
          </h1>
          <span className="text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-card rounded-xl border border-border p-4 sm:p-6 flex gap-4 sm:gap-6"
                data-testid={`cart-item-${item.id}`}
              >
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link 
                        href={`/product/${item.id}`}
                        className="font-medium text-white hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-muted-foreground text-sm mt-1">{item.volume}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      data-testid={`remove-item-${item.id}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-muted/80 transition-colors"
                        data-testid={`decrease-${item.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-muted/80 transition-colors"
                        data-testid={`increase-${item.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold text-lg">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-muted-foreground text-xs">
                          {formatCurrency(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-border text-muted-foreground hover:text-destructive hover:border-destructive"
                data-testid="clear-cart"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1" data-testid="cart-summary">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span className="text-white">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-white">Total</span>
                  <span className="text-primary font-bold text-2xl">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white gap-2"
                  size="lg"
                  data-testid="checkout-whatsapp"
                >
                  <MessageCircle className="h-5 w-5" />
                  Place Order via WhatsApp
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-border text-muted-foreground hover:text-white"
                >
                  <Link href="/products" data-testid="continue-shopping">
                    Continue Shopping
                  </Link>
                </Button>

                <div className="pt-2 border-t border-border">
                  <Button
                    onClick={handleCheckoutAndContinue}
                    variant="outline"
                    className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                    size="sm"
                    data-testid="order-and-continue"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Order & Continue Shopping
                  </Button>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Click the WhatsApp button to place your order. Our team will confirm availability and delivery details. You can place multiple orders in the same session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
