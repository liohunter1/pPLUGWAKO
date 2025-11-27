import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryNode {
  id: string;
  name: string;
  level: number;
  children?: CategoryNode[];
  parent_id: string | null;
}

interface CategorySidebarProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const categories: CategoryNode[] = [
  {
    id: "whisky",
    name: "Whisky",
    level: 0,
    parent_id: null,
  },
  {
    id: "spirits",
    name: "Spirits",
    level: 0,
    parent_id: null,
    children: [
      { id: "liqueur", name: "Liqueur", level: 1, parent_id: "spirits" },
      { id: "rum", name: "Rum", level: 1, parent_id: "spirits" },
      { id: "vodka-gin", name: "Vodka & Gin", level: 1, parent_id: "spirits" },
      { id: "cognac-brandy", name: "Cognac & Brandy", level: 1, parent_id: "spirits" },
    ]
  },
  {
    id: "wine",
    name: "Wine",
    level: 0,
    parent_id: null,
  },
  {
    id: "beer-cider",
    name: "Beers & Ciders",
    level: 0,
    parent_id: null,
    children: [
      { id: "beer", name: "Beer", level: 1, parent_id: "beer-cider" },
      { id: "cider", name: "Cider", level: 1, parent_id: "beer-cider" },
    ]
  },
  {
    id: "non-alcoholic",
    name: "Non-Alcoholic",
    level: 0,
    parent_id: null,
  }
];

export default function CategorySidebar({ onCategorySelect, selectedCategory }: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category: CategoryNode, depth: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;

    return (
      <div key={category.id}>
        <button
          onClick={() => {
            onCategorySelect(category.id);
            if (hasChildren) {
              toggleExpand(category.id);
            }
          }}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-card hover:text-white'
          }`}
          style={{ marginLeft: `${depth * 0.5}rem` }}
          data-testid={`category-${category.id}`}
        >
          <span className={depth > 0 ? 'text-sm' : 'font-medium'}>{category.name}</span>
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          )}
        </button>

        {hasChildren && isExpanded && (
          <div className="space-y-0">
            {category.children!.map(child => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2 p-4 bg-card rounded-lg border border-border">
      <h3 className="font-serif text-lg font-bold text-white mb-4">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === null
              ? 'bg-primary text-primary-foreground font-medium'
              : 'text-muted-foreground hover:bg-muted hover:text-white'
          }`}
          data-testid="category-all"
        >
          All Products
        </button>
        {categories.map(category => renderCategory(category))}
      </div>
    </div>
  );
}
