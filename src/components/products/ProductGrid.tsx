import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onClearFilters?: () => void;
  columns?: 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  onClearFilters,
  columns = 3
}) => {
  const gridColsClass =
    columns === 4
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';

  if (isLoading) {
    return (
      <div className={`grid ${gridColsClass} gap-6`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<RotateCcw className="w-5 h-5" />}
        title="No laptops match your current filters."
        description="Try removing a filter or expanding your price range."
        actionLabel="Clear Filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className={`grid ${gridColsClass} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
