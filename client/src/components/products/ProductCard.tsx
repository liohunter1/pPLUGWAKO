import { useState } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { getProductImage } from '@/utils/productImages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      volume: product.volume,
      image: product.image,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const productImage = getProductImage(product.category_id, product.id);

  return (
    <Link href={`/product/${product.id}`}>
      <div 
        className="group bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
        data-testid={`product-card-${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageLoaded && (
            <Skeleton className="absolute inset-0" />
          )}
          <img
            src={productImage}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = productImage;
              setImageLoaded(true);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              disabled={!product.in_stock || addedToCart}
              className={`w-full ${
                addedToCart 
                  ? 'bg-green-600 hover:bg-green-600' 
                  : 'bg-primary hover:bg-primary/90'
              } text-primary-foreground gap-2`}
              size="sm"
              data-testid={`add-to-cart-${product.id}`}
            >
              {addedToCart ? (
                <>
                  <Check className="h-4 w-4" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground mx-1">•</span>
            <span className="text-xs text-muted-foreground">{product.category_name}</span>
          </div>
          
          <h3 className="font-medium text-white text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>{product.volume}</span>
            {product.alcohol_percentage > 0 && (
              <>
                <span>•</span>
                <span>{product.alcohol_percentage}% ABV</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-primary font-bold">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Skeleton className="aspect-square" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}
