import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ShoppingCart, Check, Star, Wine, Minus, Plus, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { getProductImage } from '@/utils/productImages';
import { redirectToWhatsApp } from '@/utils/whatsapp';
import products from '@/data/products.json';
import type { Product } from '@/types/product';

export default function ProductDetails() {
  const params = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();

  const allProducts = products as Product[];
  const product = allProducts.find(p => p.id === params.id);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Wine className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-white mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        volume: product.volume,
        image: product.image,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    const items = [{
      id: product.id,
      name: product.name,
      price: product.price,
      volume: product.volume,
      quantity,
      image: product.image,
    }];
    redirectToWhatsApp(items, product.price * quantity);
  };

  const productImage = getProductImage(product.category_id, product.id);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors" data-testid="back-link">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12" data-testid="product-details">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border">
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
            <img
              src={productImage}
              alt={product.name}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              data-testid="product-image"
            />
            {product.featured && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            {!product.in_stock && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white font-semibold text-xl">Out of Stock</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-border text-muted-foreground">
                {product.category_name}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)}</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4" data-testid="product-name">
              {product.name}
            </h1>

            <p className="text-muted-foreground mb-6" data-testid="product-description">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-card rounded-lg px-4 py-2 border border-border">
                <span className="text-xs text-muted-foreground block">Volume</span>
                <span className="text-white font-medium">{product.volume}</span>
              </div>
              <div className="bg-card rounded-lg px-4 py-2 border border-border">
                <span className="text-xs text-muted-foreground block">ABV</span>
                <span className="text-white font-medium">{product.alcohol_percentage}%</span>
              </div>
              <div className="bg-card rounded-lg px-4 py-2 border border-border">
                <span className="text-xs text-muted-foreground block">Stock</span>
                <span className={product.in_stock ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-3xl font-bold text-primary" data-testid="product-price">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-muted-foreground">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-white hover:bg-muted/80 transition-colors"
                  data-testid="quantity-decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-white font-medium w-12 text-center" data-testid="quantity-value">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-white hover:bg-muted/80 transition-colors"
                  data-testid="quantity-increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock || addedToCart}
                size="lg"
                className={`flex-1 gap-2 ${
                  addedToCart ? 'bg-green-600 hover:bg-green-600' : ''
                }`}
                data-testid="add-to-cart-button"
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={!product.in_stock}
                variant="outline"
                size="lg"
                className="flex-1 gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                data-testid="buy-now-button"
              >
                <MessageCircle className="h-5 w-5" />
                Buy Now via WhatsApp
              </Button>
            </div>

            <div className="mt-8 p-4 bg-card rounded-lg border border-border">
              <h3 className="font-medium text-white mb-2">Available at:</h3>
              <p className="text-muted-foreground text-sm">{product.store.name}</p>
              <p className="text-muted-foreground text-sm">{product.store.location}</p>
              <p className="text-primary text-sm mt-1">{product.store.contact}</p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24" data-testid="related-products">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
