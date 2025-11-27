import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/formatCurrency';

interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceFilter({ min, max, value, onChange }: PriceFilterProps) {
  return (
    <div className="space-y-4" data-testid="price-filter">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Price Range</span>
        <span className="text-sm text-white">
          {formatCurrency(value[0])} – {formatCurrency(value[1])}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={100}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        className="w-full"
        data-testid="price-slider"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatCurrency(min)}</span>
        <span>{formatCurrency(max)}</span>
      </div>
    </div>
  );
}
