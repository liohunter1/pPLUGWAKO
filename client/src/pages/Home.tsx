import { Link } from 'wouter';
import { ArrowRight, Wine, Truck, Shield, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { heroImage, getCategoryImage } from '@/utils/productImages';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import type { Product } from '@/types/product';

const featuredProducts = (products as Product[]).filter(p => p.featured).slice(0, 8);

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in Nairobi',
  },
  {
    icon: Shield,
    title: 'Authentic Products',
    description: '100% genuine premium spirits',
  },
  {
    icon: Clock,
    title: 'Order 24/7',
    description: 'Place orders anytime via WhatsApp',
  },
];

export default function Home() {
  return (
    <Layout>
      <section className="relative min-h-[90vh] flex items-center" data-testid="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">
              Kenya's Premier Liquor Store
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Premium Spirits,<br />
              <span className="text-primary">Exceptional Service</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Discover our curated selection of world-class whiskies, cognacs, wines, and more. 
              Delivered to your doorstep across Kenya.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/products" data-testid="hero-shop-now">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border text-white hover:bg-white/10">
                <Link href="/stores" data-testid="hero-find-stores">
                  Find Stores
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card/50 border-y border-border" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4" data-testid={`feature-${index}`}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">
                Explore our wide range of premium spirits
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              <Link href="/products" data-testid="view-all-categories">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.id}`}
                data-testid={`category-card-${category.id}`}
              >
                <div className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300">
                  <img
                    src={getCategoryImage(category.id)}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/30" data-testid="featured-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Our most popular premium spirits
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              <Link href="/products" data-testid="view-all-products">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-8 lg:p-12 border border-primary/30">
            <div className="max-w-2xl mx-auto text-center">
              <Wine className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
                Order via WhatsApp
              </h2>
              <p className="text-muted-foreground mb-8">
                Add items to your cart and checkout directly via WhatsApp. 
                Fast, easy, and secure ordering for delivery anywhere in Kenya.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/products" data-testid="cta-browse">
                  Browse Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
