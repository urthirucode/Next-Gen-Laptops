import { Product, SortOption } from '../types/product';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const cloned = [...products];

  switch (sortBy) {
    case 'price-asc':
      return cloned.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return cloned.sort((a, b) => b.price - a.price);
    case 'newest':
      return cloned.sort((a, b) => {
        if (a.isNewArrival && !b.isNewArrival) return -1;
        if (!a.isNewArrival && b.isNewArrival) return 1;
        return b.gpuTierScore - a.gpuTierScore;
      });
    case 'gpu-perf':
      return cloned.sort((a, b) => b.gpuTierScore - a.gpuTierScore);
    case 'rating':
      return cloned.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviews - a.reviews;
      });
    case 'recommended':
    default:
      return cloned.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating * b.reviews - a.rating * a.reviews;
      });
  }
}
