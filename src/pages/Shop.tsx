import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { SortDropdown } from '../components/products/SortDropdown';
import { useFilters } from '../hooks/useFilters';
import { useProducts } from '../hooks/useProducts';
import { PRICE_BOUNDS, SORT_OPTIONS } from '../data/filters';
import { formatPrice } from '../utils/formatPrice';
import { SortOption } from '../types/product';

export const Shop: React.FC = () => {
  const {
    filters,
    sortBy,
    toggleFacet,
    setSearch,
    setPriceRange,
    setSortBy,
    clearAllFilters,
    activeFilterCount
  } = useFilters();

  const { products, allProducts } = useProducts(filters, sortBy);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  return (
    <PageContainer className="py-8 lg:py-12">
      {/* Shop Header & Search Bar */}
      <div className="pb-8 border-b border-[#2A2A2A]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider mb-1.5">
              HARDWARE CATALOG · {products.length} OF {allProducts.length} MACHINES
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
              Shop Laptops
            </h1>
          </div>

          {/* Search & Desktop Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 4060, Lenovo, Core i9, AI..."
                aria-label="Search laptops by brand, model, CPU, GPU, or use case"
                className="w-full bg-[#1C1C1C] border border-[#2A2A2A] focus:border-[#00E5FF] rounded-md pl-10 pr-8 py-2 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#737373] focus:outline-none transition-colors"
              />
              {filters.search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#F5F5F5] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="hidden lg:block">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        {/* Mobile [ Filters ] [ Sort ] Action Bar */}
        <div className="grid grid-cols-2 gap-3 mt-5 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1C1C1C] border border-[#2A2A2A] rounded-md text-xs font-semibold text-[#F5F5F5] cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#00E5FF]" />
            <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileSortOpen(true)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1C1C1C] border border-[#2A2A2A] rounded-md text-xs font-semibold text-[#F5F5F5] cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4 text-[#00E5FF]" />
            <span>
              Sort: {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
            </span>
          </button>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFilterCount > 0 && (
          <div className="mt-5 pt-4 border-t border-[#2A2A2A]/70 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#737373] mr-1">Active Filters:</span>

            {filters.search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs text-[#F5F5F5] hover:border-[#00E5FF] cursor-pointer"
              >
                <span>Search: "{filters.search}"</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            )}

            {filters.useCases.map((uc) => (
              <button
                key={`uc-${uc}`}
                type="button"
                onClick={() => toggleFacet('useCase', filters.useCases, uc)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs text-[#F5F5F5] cursor-pointer"
              >
                <span className="capitalize">{uc}</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            ))}

            {filters.brands.map((b) => (
              <button
                key={`b-${b}`}
                type="button"
                onClick={() => toggleFacet('brand', filters.brands, b)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs text-[#F5F5F5] cursor-pointer"
              >
                <span>{b}</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            ))}

            {filters.gpus.map((gpu) => (
              <button
                key={`gpu-${gpu}`}
                type="button"
                onClick={() => toggleFacet('gpu', filters.gpus, gpu)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs font-mono-tech text-[#F5F5F5] cursor-pointer"
              >
                <span>{gpu}</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            ))}

            {filters.processors.map((cpu) => (
              <button
                key={`cpu-${cpu}`}
                type="button"
                onClick={() => toggleFacet('cpu', filters.processors, cpu)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs text-[#F5F5F5] cursor-pointer"
              >
                <span>{cpu}</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            ))}

            {filters.rams.map((ram) => (
              <button
                key={`ram-${ram}`}
                type="button"
                onClick={() => toggleFacet('ram', filters.rams, ram)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs font-mono-tech text-[#F5F5F5] cursor-pointer"
              >
                <span>RAM: {ram}</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            ))}

            {filters.storages.map((ssd) => (
              <button
                key={`ssd-${ssd}`}
                type="button"
                onClick={() => toggleFacet('storage', filters.storages, ssd)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs font-mono-tech text-[#F5F5F5] cursor-pointer"
              >
                <span>SSD: {ssd}</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            ))}

            {filters.displays.map((hz) => (
              <button
                key={`hz-${hz}`}
                type="button"
                onClick={() => toggleFacet('display', filters.displays, hz)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs font-mono-tech text-[#F5F5F5] cursor-pointer"
              >
                <span>{hz}</span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            ))}

            {(filters.minPrice > PRICE_BOUNDS.MIN || filters.maxPrice < PRICE_BOUNDS.MAX) && (
              <button
                type="button"
                onClick={() => setPriceRange(PRICE_BOUNDS.MIN, PRICE_BOUNDS.MAX)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1C1C1C] border border-[#00E5FF]/60 rounded text-xs font-mono-tech text-[#F5F5F5] cursor-pointer"
              >
                <span>
                  {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
                </span>
                <X className="w-3 h-3 text-[#00E5FF]" />
              </button>
            )}

            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-[#00E5FF] hover:underline ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main 2-Column Layout: Sticky Filter Sidebar + Product Grid */}
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-3 sticky top-24 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-5 max-h-[calc(100vh-7rem)] overflow-y-auto">
          <ProductFilters
            filters={filters}
            onToggleFacet={toggleFacet}
            onPriceChange={setPriceRange}
            onClearAll={clearAllFilters}
            activeCount={activeFilterCount}
          />
        </div>

        <div className="lg:col-span-9">
          <ProductGrid
            products={products}
            onClearFilters={clearAllFilters}
            columns={3}
          />
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Hardware Filters"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-[#1C1C1C] border-l border-[#2A2A2A] h-full flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
              <span className="font-semibold text-base text-[#F5F5F5]">Filter Laptops</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-[#A3A3A3] hover:text-[#F5F5F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              <ProductFilters
                filters={filters}
                onToggleFacet={toggleFacet}
                onPriceChange={setPriceRange}
                onClearAll={clearAllFilters}
                activeCount={activeFilterCount}
              />
            </div>

            <div className="p-4 border-t border-[#2A2A2A] bg-[#181818] flex gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-2.5 px-4 rounded border border-[#2A2A2A] text-xs font-semibold text-[#A3A3A3]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 px-4 rounded bg-[#00E5FF] text-[#121212] text-xs font-semibold"
              >
                Show {products.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sort Bottom Sheet */}
      {mobileSortOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Sort Laptops"
          onClick={() => setMobileSortOpen(false)}
        >
          <div
            className="w-full bg-[#1C1C1C] border-t border-[#2A2A2A] rounded-t-xl p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#2A2A2A]">
              <span className="text-sm font-semibold text-[#F5F5F5]">Sort Laptops By</span>
              <button
                type="button"
                onClick={() => setMobileSortOpen(false)}
                className="p-1 text-[#A3A3A3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              {SORT_OPTIONS.map((opt) => {
                const selected = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.value as SortOption);
                      setMobileSortOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded text-sm font-medium flex items-center justify-between ${
                      selected
                        ? 'bg-[#00E5FF]/15 text-[#00E5FF]'
                        : 'text-[#A3A3A3] hover:bg-[#242424]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selected && <span className="text-xs font-mono-tech">Active</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Shop;
