export type UseCase = 'gaming' | 'ai-ml' | 'development' | 'creator' | 'business' | 'student';

export type Brand = 'ASUS' | 'Acer' | 'MSI' | 'HP' | 'Lenovo' | 'Dell';

export interface ProductBenchmarks {
  cinebenchR23Multi: number;
  timeSpyGraphics: number;
  aiTops: number;
  batteryHours: number;
}

export interface Product {
  id: string;
  brand: Brand;
  name: string;
  series: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discount: number;

  // Primary Hardware Specs
  cpu: string;
  cpuFamily: string;
  cpuCores: string;
  gpu: string;
  gpuShort: string;
  gpuVram: string;
  gpuTgp: string;
  gpuTierScore: number; // Used for sorting by GPU performance (e.g., 10 to 100)
  ram: string;
  ramShort: string;
  ramSizeGb: number;
  storage: string;
  storageShort: string;
  storageSizeGb: number;

  // Display & Chassis
  display: string;
  displayResolution: string;
  panelType: string;
  refreshRate: string;
  refreshRateHz: number;
  colorGamut: string;
  battery: string;
  weight: string;
  weightKg: number;
  os: string;
  warranty: string;
  ports: string[];

  // Taxonomy & Social Proof
  useCases: UseCase[];
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;

  // Visual theme for multi-angle studio rendering + photography
  image: string;
  chassisFinish: 'stealth-black' | 'titanium-gray' | 'anodized-silver' | 'obsidian-carbon';
  accentColor: string;
  screenTheme: 'neural-core' | 'cyber-grid' | 'compiler-ide' | 'studio-color' | 'enterprise-clean';
  benchmarks: ProductBenchmarks;
  highlights: string[];
}

export interface FilterState {
  search: string;
  brands: string[];
  gpus: string[];
  processors: string[];
  rams: string[];
  storages: string[];
  displays: string[];
  useCases: string[];
  minPrice: number;
  maxPrice: number;
}

export type SortOption =
  | 'recommended'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'gpu-perf'
  | 'rating';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWarrantyUpgrade?: boolean;
}
