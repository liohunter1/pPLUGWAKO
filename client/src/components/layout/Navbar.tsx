import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Wine, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartDrawer from '@/components/cart/CartDrawer';
import CategoryNav from '@/components/layout/CategoryNav';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/stores', label: 'Stores' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group" data-testid="logo-link">
            <Wine className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="font-serif text-xl lg:text-2xl font-bold text-white">
              Premium<span className="text-primary">Liquor</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? 'text-primary' : 'text-muted-foreground'
                }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <CategoryNav />

          <div className="flex items-center gap-4">
            <Link href="/products" data-testid="nav-search">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-muted-foreground hover:text-primary"
                  data-testid="cart-button"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg bg-card border-border">
                <CartDrawer onClose={() => setCartOpen(false)} />
              </SheetContent>
            </Sheet>

            <button
              className="md:hidden text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border" data-testid="mobile-menu">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
