import React from 'react';
import {
  BRAND_OPTIONS,
  DISPLAY_OPTIONS,
  GPU_OPTIONS,
  PRICE_BOUNDS,
  PROCESSOR_OPTIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  USE_CASE_OPTIONS
} from '../../data/filters';
import { FilterState } from '../../types/product';
import { Checkbox } from '../ui/Checkbox';
import { Slider } from '../ui/Slider';

interface ProductFiltersProps {
  filters: FilterState;
  onToggleFacet: (
    paramKey: 'brand' | 'gpu' | 'cpu' | 'ram' | 'storage' | 'display' | 'useCase',
    currentList: string[],
    value: string
  ) => void;
  onPriceChange: (min: number, max: number) => void;
  onClearAll: () => void;
  activeCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onToggleFacet,
  onPriceChange,
  onClearAll,
  activeCount
}) => {
  const isSelected = (list: string[], value: string) =>
    list.some((item) => item.toLowerCase() === value.toLowerCase());

  return (
    <aside aria-label="Hardware Filters" className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F5F5F5]">
          Hardware Filters
          {activeCount > 0 && (
            <span className="ml-2 text-xs font-mono-tech text-[#00E5FF]">({activeCount})</span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-[#00E5FF] hover:underline cursor-pointer"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Price Range Slider */}
      <div className="pb-5 border-b border-[#2A2A2A]">
        <Slider
          label="Price Ceiling"
          min={PRICE_BOUNDS.MIN}
          max={PRICE_BOUNDS.MAX}
          step={PRICE_BOUNDS.STEP}
          minValue={filters.minPrice}
          value={filters.maxPrice}
          onMinChange={(newMin) => onPriceChange(newMin, filters.maxPrice)}
          onChange={(newMax) => onPriceChange(filters.minPrice, newMax)}
        />
      </div>

      {/* Primary Workload / Use Case */}
      <div className="pb-5 border-b border-[#2A2A2A] space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
          Use Case
        </h3>
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {USE_CASE_OPTIONS.map((uc) => {
            const active = isSelected(filters.useCases, uc.id);
            return (
              <button
                key={uc.id}
                type="button"
                onClick={() => onToggleFacet('useCase', filters.useCases, uc.id)}
                className={`px-2.5 py-1.5 rounded text-xs font-medium text-left transition-all cursor-pointer whitespace-nowrap truncate border ${
                  active
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]'
                    : 'bg-[#181818] border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#737373]'
                }`}
              >
                {uc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand */}
      <div className="pb-5 border-b border-[#2A2A2A] space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">Brand</h3>
        <div className="space-y-2 pt-1">
          {BRAND_OPTIONS.map((brand) => (
            <Checkbox
              key={brand}
              id={`filter-brand-${brand}`}
              checked={isSelected(filters.brands, brand)}
              onChange={() => onToggleFacet('brand', filters.brands, brand)}
              label={brand}
              className="w-full"
            />
          ))}
        </div>
      </div>

      {/* GPU */}
      <div className="pb-5 border-b border-[#2A2A2A] space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
          Graphics (GPU)
        </h3>
        <div className="space-y-2 pt-1">
          {GPU_OPTIONS.map((gpu) => (
            <Checkbox
              key={gpu}
              id={`filter-gpu-${gpu}`}
              checked={isSelected(filters.gpus, gpu)}
              onChange={() => onToggleFacet('gpu', filters.gpus, gpu)}
              label={gpu}
              className="w-full"
            />
          ))}
        </div>
      </div>

      {/* Processor */}
      <div className="pb-5 border-b border-[#2A2A2A] space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
          Processor
        </h3>
        <div className="space-y-2 pt-1">
          {PROCESSOR_OPTIONS.map((cpu) => (
            <Checkbox
              key={cpu}
              id={`filter-cpu-${cpu}`}
              checked={isSelected(filters.processors, cpu)}
              onChange={() => onToggleFacet('cpu', filters.processors, cpu)}
              label={cpu}
              className="w-full"
            />
          ))}
        </div>
      </div>

      {/* RAM */}
      <div className="pb-5 border-b border-[#2A2A2A] space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
          System Memory (RAM)
        </h3>
        <div className="grid grid-cols-2 gap-2 pt-1">
          {RAM_OPTIONS.map((ram) => {
            const active = isSelected(filters.rams, ram);
            return (
              <button
                key={ram}
                type="button"
                onClick={() => onToggleFacet('ram', filters.rams, ram)}
                className={`px-3 py-1.5 rounded text-xs font-mono-tech transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]'
                    : 'bg-[#181818] border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5]'
                }`}
              >
                {ram}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage */}
      <div className="pb-5 border-b border-[#2A2A2A] space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
          NVMe SSD Storage
        </h3>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {STORAGE_OPTIONS.map((ssd) => {
            const active = isSelected(filters.storages, ssd);
            return (
              <button
                key={ssd}
                type="button"
                onClick={() => onToggleFacet('storage', filters.storages, ssd)}
                className={`px-2.5 py-1.5 rounded text-xs font-mono-tech transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]'
                    : 'bg-[#181818] border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5]'
                }`}
              >
                {ssd}
              </button>
            );
          })}
        </div>
      </div>

      {/* Display Refresh Rate */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
          Display Refresh Rate
        </h3>
        <div className="space-y-2 pt-1">
          {DISPLAY_OPTIONS.map((hz) => (
            <Checkbox
              key={hz}
              id={`filter-hz-${hz}`}
              checked={isSelected(filters.displays, hz)}
              onChange={() => onToggleFacet('display', filters.displays, hz)}
              label={hz === '240Hz' ? '240Hz+' : hz}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
