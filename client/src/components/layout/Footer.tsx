import { Link } from 'wouter';
import { Wine, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Wine className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl font-bold text-white">
                Premium<span className="text-primary">Liquor</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Kenya's premier online liquor store offering the finest selection of wines, spirits, 
              beers, and craft beverages. Fast delivery across Nairobi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-products">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=whisky" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-whisky">
                  Whisky
                </Link>
              </li>
              <li>
                <Link href="/products?category=wine" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-wine">
                  Wine
                </Link>
              </li>
              <li>
                <Link href="/products?category=beer-cider" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-beer">
                  Beer & Cider
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-stores">
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">Westlands, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+254700123456" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-phone">
                  +254 700 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@premiumliquor.co.ke" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-email">
                  info@premiumliquor.co.ke
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground text-sm">
                  <p>Mon - Sat: 10:00 AM - 10:00 PM</p>
                  <p>Sunday: 12:00 PM - 8:00 PM</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-semibold">Note:</span> You must be 18+ to purchase alcohol. 
                Please drink responsibly.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Premium Liquor Kenya. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-privacy">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
