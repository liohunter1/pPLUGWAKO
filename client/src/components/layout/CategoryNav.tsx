import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  children?: CategoryItem[];
}

const categoryHierarchy: CategoryItem[] = [
  {
    id: 'whisky',
    name: 'Whisky'
  },
  {
    id: 'spirits',
    name: 'Spirits',
    children: [
      { id: 'liqueur', name: 'Liqueur' },
      { id: 'rum', name: 'Rum' },
      { id: 'vodka-gin', name: 'Vodka & Gin' },
      { id: 'cognac-brandy', name: 'Cognac & Brandy' },
    ]
  },
  {
    id: 'wine',
    name: 'Wine'
  },
  {
    id: 'beer-cider',
    name: 'Beers & Ciders',
    children: [
      { id: 'beer', name: 'Beer' },
      { id: 'cider', name: 'Cider' },
    ]
  },
  {
    id: 'non-alcoholic',
    name: 'Non-Alcoholic'
  }
];

interface CategoryNavItemProps {
  item: CategoryItem;
  onLinkClick?: () => void;
}

function CategoryNavItem({ item, onLinkClick }: CategoryNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={`/products?category=${item.id}`}
        className="text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary focus:outline-none transition-colors active:text-primary"
        data-testid={`category-link-${item.id}`}
        onClick={onLinkClick}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary focus:outline-none transition-colors active:text-primary flex items-center gap-1 cursor-pointer"
        data-testid={`category-dropdown-${item.id}`}
        aria-expanded={isOpen}
        aria-label={`${item.name} menu`}
      >
        {item.name}
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50" 
          data-testid={`category-submenu-${item.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          {item.children?.map(child => (
            <Link
              key={child.id}
              href={`/products?category=${child.id}`}
              className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary focus:text-primary focus:outline-none hover:bg-muted/50 focus:bg-muted/50 transition-colors active:text-primary cursor-pointer"
              data-testid={`subcategory-link-${child.id}`}
              onClick={(e) => {
                setIsOpen(false);
                onLinkClick?.();
              }}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryNav({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="hidden lg:flex items-center gap-6 py-2">
      {categoryHierarchy.map(item => (
        <CategoryNavItem key={item.id} item={item} onLinkClick={onLinkClick} />
      ))}
    </div>
  );
}
