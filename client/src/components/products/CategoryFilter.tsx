import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { Category } from '@/types/product';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div data-testid="category-filter">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          <Button
            variant={selected === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(null)}
            className={`flex-shrink-0 ${
              selected === null 
                ? 'bg-primary text-primary-foreground' 
                : 'border-border text-muted-foreground hover:text-white hover:border-primary'
            }`}
            data-testid="category-all"
          >
            {selected === null && <Check className="h-3 w-3 mr-1" />}
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selected === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onChange(category.id)}
              className={`flex-shrink-0 ${
                selected === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border-border text-muted-foreground hover:text-white hover:border-primary'
              }`}
              data-testid={`category-${category.id}`}
            >
              {selected === category.id && <Check className="h-3 w-3 mr-1" />}
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
