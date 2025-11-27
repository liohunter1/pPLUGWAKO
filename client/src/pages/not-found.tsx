import { Link } from 'wouter';
import { Wine, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4" data-testid="not-found-page">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Wine className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-serif text-2xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to browsing our premium collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/products" data-testid="browse-products">
                Browse Products
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 border-border text-muted-foreground hover:text-white">
              <Link href="/" data-testid="go-home">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
