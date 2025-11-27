import { useState, useMemo, useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard, { ProductCardSkeleton } from '@/components/products/ProductCard';
import CategorySidebar from '@/components/categories/CategorySidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import type { Product, Category } from '@/types/product';

const PRODUCTS_PER_PAGE = 12;

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Products() {
  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  
  const urlParams = new URLSearchParams(searchParams);
  const initialCategory = urlParams.get('category') || '';
  const initialSearch = urlParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allProducts = products as Product[];
  const allCategories = categories as Category[];
  
  const maxPrice = Math.max(...allProducts.map(p => p.price));
  const minPrice = Math.min(...allProducts.map(p => p.price));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category_name.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category_id === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, sortBy, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([minPrice, maxPrice]);
    setSortBy('featured');
    setLocation('/products');
  };

  const hasActiveFilters = searchQuery || selectedCategory || priceRange[0] > minPrice || priceRange[1] < maxPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-white mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategory 
                ? 'bg-primary/20 text-primary' 
                : 'text-muted-foreground hover:bg-muted/50'
            }`}
            data-testid="filter-category-all"
          >
            All Categories
          </button>
          {allCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
              data-testid={`filter-category-${category.id}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-white mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            min={minPrice}
            max={maxPrice}
            step={100}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
            data-testid="filter-price-slider"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>KSh {priceRange[0].toLocaleString()}</span>
            <span>KSh {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <Button 
          variant="outline" 
          onClick={clearFilters} 
          className="w-full border-border text-muted-foreground"
          data-testid="clear-filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="hidden lg:block lg:col-span-1" data-testid="desktop-categories">
            <div className="sticky top-24">
              <CategorySidebar 
                onCategorySelect={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </div>
          </aside>

          {/* Filters Section - Below Categories */}
          <aside className="hidden lg:block w-full lg:col-span-1" data-testid="desktop-filters">
            <div className="sticky top-80 bg-card rounded-xl border border-border p-6">
              <h2 className="font-serif text-xl font-bold text-white mb-6">Filters</h2>
              <FilterContent />
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                  data-testid="search-input"
                />
              </div>
              
              <div className="flex gap-3">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden border-border" data-testid="mobile-filters-button">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <Badge className="ml-2 bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center">
                          !
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-card border-border">
                    <SheetHeader>
                      <SheetTitle className="font-serif text-white">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-card border-border" data-testid="sort-select">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground text-sm" data-testid="products-count">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </p>
              
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {allCategories.find(c => c.id === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16" data-testid="no-products">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6" data-testid="products-grid">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10" data-testid="pagination">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="border-border"
                      data-testid="pagination-prev"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? '' : 'border-border'}
                            data-testid={`pagination-page-${page}`}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="border-border"
                      data-testid="pagination-next"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
