import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'rating', label: 'Popularity' },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} data-testid="sort-select">
      <SelectTrigger className="w-[180px] bg-muted border-border text-white" data-testid="sort-trigger">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {sortOptions.map(option => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="text-white hover:bg-muted focus:bg-muted"
            data-testid={`sort-option-${option.value}`}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
