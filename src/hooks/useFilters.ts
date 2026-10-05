import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRICE_BOUNDS } from '../data/filters';
import { FilterState, SortOption } from '../types/product';

function parseArrayParam(param: string | null): string[] {
  if (!param) return [];
  return param
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = useMemo(() => {
    const search = searchParams.get('q') || '';
    const brands = parseArrayParam(searchParams.get('brand'));
    const gpus = parseArrayParam(searchParams.get('gpu'));
    const processors = parseArrayParam(searchParams.get('cpu'));
    const rams = parseArrayParam(searchParams.get('ram'));
    const storages = parseArrayParam(searchParams.get('storage'));
    const displays = parseArrayParam(searchParams.get('display'));
    const useCases = parseArrayParam(searchParams.get('useCase'));

    const minPriceRaw = Number(searchParams.get('minPrice'));
    const maxPriceRaw = Number(searchParams.get('maxPrice'));

    const minPrice =
      !Number.isNaN(minPriceRaw) && minPriceRaw >= PRICE_BOUNDS.MIN
        ? minPriceRaw
        : PRICE_BOUNDS.MIN;

    const maxPrice =
      !Number.isNaN(maxPriceRaw) && maxPriceRaw > 0 && maxPriceRaw <= PRICE_BOUNDS.MAX
        ? maxPriceRaw
        : PRICE_BOUNDS.MAX;

    return {
      search,
      brands,
      gpus,
      processors,
      rams,
      storages,
      displays,
      useCases,
      minPrice,
      maxPrice
    };
  }, [searchParams]);

  const sortBy: SortOption = useMemo(() => {
    const raw = searchParams.get('sort') as SortOption | null;
    const valid: SortOption[] = [
      'recommended',
      'price-asc',
      'price-desc',
      'newest',
      'gpu-perf',
      'rating'
    ];
    return raw && valid.includes(raw) ? raw : 'recommended';
  }, [searchParams]);

  const updateParam = useCallback(
    (key: string, values: string[] | string | number | null) => {
      const next = new URLSearchParams(searchParams);
      if (values === null || values === '' || (Array.isArray(values) && values.length === 0)) {
        next.delete(key);
      } else if (Array.isArray(values)) {
        next.set(key, values.join(','));
      } else {
        next.set(key, String(values));
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const toggleFacet = useCallback(
    (
      paramKey: 'brand' | 'gpu' | 'cpu' | 'ram' | 'storage' | 'display' | 'useCase',
      currentList: string[],
      value: string
    ) => {
      const exists = currentList.some((item) => item.toLowerCase() === value.toLowerCase());
      const nextList = exists
        ? currentList.filter((item) => item.toLowerCase() !== value.toLowerCase())
        : [...currentList, value];
      updateParam(paramKey, nextList);
    },
    [updateParam]
  );

  const setSearch = useCallback(
    (q: string) => {
      updateParam('q', q);
    },
    [updateParam]
  );

  const setPriceRange = useCallback(
    (min: number, max: number) => {
      const next = new URLSearchParams(searchParams);
      if (min <= PRICE_BOUNDS.MIN) {
        next.delete('minPrice');
      } else {
        next.set('minPrice', String(min));
      }
      if (max >= PRICE_BOUNDS.MAX) {
        next.delete('maxPrice');
      } else {
        next.set('maxPrice', String(max));
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setSortBy = useCallback(
    (sort: SortOption) => {
      updateParam('sort', sort === 'recommended' ? null : sort);
    },
    [updateParam]
  );

  const clearAllFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const activeFilterCount = useMemo(() => {
    let count =
      filters.brands.length +
      filters.gpus.length +
      filters.processors.length +
      filters.rams.length +
      filters.storages.length +
      filters.displays.length +
      filters.useCases.length;
    if (filters.search.trim()) count += 1;
    if (filters.minPrice > PRICE_BOUNDS.MIN || filters.maxPrice < PRICE_BOUNDS.MAX) count += 1;
    return count;
  }, [filters]);

  return {
    filters,
    sortBy,
    toggleFacet,
    setSearch,
    setPriceRange,
    setSortBy,
    clearAllFilters,
    activeFilterCount
  };
}
