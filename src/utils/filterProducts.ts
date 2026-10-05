import { FilterState, Product } from '../types/product';

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    // 1. Search query match (Brand, Name, CPU, GPU, Use Case, Series)
    if (filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      const searchableText = [
        product.brand,
        product.name,
        product.series,
        product.cpu,
        product.cpuFamily,
        product.gpu,
        product.gpuShort,
        product.ram,
        product.storage,
        ...product.useCases
      ]
        .join(' ')
        .toLowerCase();

      // Support multi-keyword search (e.g., "asus 4060")
      const terms = q.split(/\s+/);
      const matchesAllTerms = terms.every((term) => searchableText.includes(term));
      if (!matchesAllTerms) return false;
    }

    // 2. Brand filter
    if (filters.brands.length > 0) {
      const matchesBrand = filters.brands.some(
        (b) => b.toLowerCase() === product.brand.toLowerCase()
      );
      if (!matchesBrand) return false;
    }

    // 3. GPU filter (supports "RTX 4070+" shorthand from Hero filter panel as well as exact GPU options)
    if (filters.gpus.length > 0) {
      const matchesGpu = filters.gpus.some((selectedGpu) => {
        const normalized = selectedGpu.toUpperCase().replace(/\s+/g, ' ');
        if (normalized === 'RTX 4070+' || normalized === 'RTX4070+') {
          return ['RTX 4070', 'RTX 4080', 'RTX 4090'].includes(product.gpuShort.toUpperCase());
        }
        const cleanSelected = normalized.replace(/\s+/g, '');
        const cleanProductGpu = product.gpuShort.toUpperCase().replace(/\s+/g, '');
        return cleanSelected === cleanProductGpu;
      });
      if (!matchesGpu) return false;
    }

    // 4. Processor filter
    if (filters.processors.length > 0) {
      const matchesCpu = filters.processors.some(
        (cpu) => cpu.toLowerCase() === product.cpuFamily.toLowerCase()
      );
      if (!matchesCpu) return false;
    }

    // 5. RAM filter
    if (filters.rams.length > 0) {
      const matchesRam = filters.rams.some((ram) => {
        if (ram === '64GB+') return product.ramSizeGb >= 64;
        return product.ramShort.toLowerCase() === ram.toLowerCase();
      });
      if (!matchesRam) return false;
    }

    // 6. Storage filter
    if (filters.storages.length > 0) {
      const matchesStorage = filters.storages.some((storage) => {
        if (storage === '2TB+') return product.storageSizeGb >= 2048;
        return product.storageShort.toLowerCase() === storage.toLowerCase();
      });
      if (!matchesStorage) return false;
    }

    // 7. Display refresh rate filter
    if (filters.displays.length > 0) {
      const matchesDisplay = filters.displays.some((disp) => {
        if (disp === '240Hz+' || disp === '240Hz') return product.refreshRateHz >= 240;
        return product.refreshRate.toLowerCase() === disp.toLowerCase();
      });
      if (!matchesDisplay) return false;
    }

    // 8. Use Case filter
    if (filters.useCases.length > 0) {
      const matchesUseCase = filters.useCases.some((uc) =>
        product.useCases.includes(uc.toLowerCase() as any)
      );
      if (!matchesUseCase) return false;
    }

    // 9. Price range
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}
