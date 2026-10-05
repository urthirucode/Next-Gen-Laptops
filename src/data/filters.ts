export const BRAND_OPTIONS = ['ASUS', 'Lenovo', 'MSI', 'HP', 'Dell', 'Acer'] as const;

export const GPU_OPTIONS = [
  'Integrated',
  'RTX 3050',
  'RTX 4050',
  'RTX 4060',
  'RTX 4070',
  'RTX 4080',
  'RTX 4090'
] as const;

export const PROCESSOR_OPTIONS = [
  'Intel Core i5',
  'Intel Core i7',
  'Intel Core i9',
  'Intel Core Ultra',
  'AMD Ryzen 7',
  'AMD Ryzen 9',
  'AMD Ryzen AI'
] as const;

export const RAM_OPTIONS = ['16GB', '24GB', '32GB', '64GB+'] as const;

export const STORAGE_OPTIONS = ['512GB', '1TB', '2TB+'] as const;

export const DISPLAY_OPTIONS = ['60Hz', '120Hz', '144Hz', '165Hz', '240Hz'] as const;

export const USE_CASE_OPTIONS = [
  { id: 'gaming', label: 'Gaming' },
  { id: 'ai-ml', label: 'AI / ML' },
  { id: 'development', label: 'Development' },
  { id: 'creator', label: 'Creator' },
  { id: 'business', label: 'Business' },
  { id: 'student', label: 'Student' }
] as const;

export const PRICE_BOUNDS = {
  MIN: 40000,
  MAX: 300000,
  STEP: 5000
};

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'gpu-perf', label: 'GPU Performance' },
  { value: 'rating', label: 'Best Rated' }
] as const;
