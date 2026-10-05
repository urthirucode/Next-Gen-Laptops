import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import { products } from '../data/products';

interface CompareContextValue {
  comparedProducts: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  isCompared: (productId: string) => boolean;
  clearCompare: () => void;
  compareWarning: string | null;
  dismissCompareWarning: () => void;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

const STORAGE_KEY = 'nextgen_compare_ids_v1';
const MAX_COMPARE_ITEMS = 4;

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparedIds, setComparedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, MAX_COMPARE_ITEMS);
      }
    } catch {
      // ignore storage errors
    }
    // Pre-populate 2 flagship models so /compare is immediately rich if visited directly,
    // while still allowing full user control
    return ['asus-rog-strix-g16', 'lenovo-thinkpad-p1-gen7'];
  });

  const [compareWarning, setCompareWarning] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comparedIds));
    } catch {
      // ignore storage errors
    }
  }, [comparedIds]);

  useEffect(() => {
    if (!compareWarning) return;
    const timer = setTimeout(() => setCompareWarning(null), 3500);
    return () => clearTimeout(timer);
  }, [compareWarning]);

  const comparedProducts = React.useMemo(
    () =>
      comparedIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [comparedIds]
  );

  const isCompared = useCallback(
    (productId: string) => comparedIds.includes(productId),
    [comparedIds]
  );

  const addToCompare = useCallback(
    (product: Product): boolean => {
      if (comparedIds.includes(product.id)) return true;
      if (comparedIds.length >= MAX_COMPARE_ITEMS) {
        setCompareWarning('You can compare up to 4 laptops.');
        return false;
      }
      setComparedIds((prev) => [...prev, product.id]);
      setCompareWarning(null);
      return true;
    },
    [comparedIds]
  );

  const removeFromCompare = useCallback((productId: string) => {
    setComparedIds((prev) => prev.filter((id) => id !== productId));
    setCompareWarning(null);
  }, []);

  const toggleCompare = useCallback(
    (product: Product) => {
      if (comparedIds.includes(product.id)) {
        removeFromCompare(product.id);
      } else {
        addToCompare(product);
      }
    },
    [comparedIds, addToCompare, removeFromCompare]
  );

  const clearCompare = useCallback(() => {
    setComparedIds([]);
    setCompareWarning(null);
  }, []);

  const dismissCompareWarning = useCallback(() => {
    setCompareWarning(null);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isCompared,
        clearCompare,
        compareWarning,
        dismissCompareWarning
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompareContext(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompareContext must be used within a CompareProvider');
  }
  return ctx;
}
