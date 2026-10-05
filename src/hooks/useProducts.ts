import { useMemo } from 'react';
import { products } from '../data/products';
import { FilterState, Product, SortOption } from '../types/product';
import { filterProducts } from '../utils/filterProducts';
import { sortProducts } from '../utils/sortProducts';

export function useProducts(filters?: FilterState, sortBy: SortOption = 'recommended') {
  const filteredAndSorted = useMemo(() => {
    const base = filters ? filterProducts(products, filters) : products;
    return sortProducts(base, sortBy);
  }, [filters, sortBy]);

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.isFeatured);
  }, []);

  return {
    allProducts: products,
    products: filteredAndSorted,
    featuredProducts,
    getProductById
  };
}
