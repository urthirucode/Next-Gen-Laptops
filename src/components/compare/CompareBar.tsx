import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Layers } from 'lucide-react';
import { useCompare } from '../../hooks/useCompare';
import { formatPriceCompact } from '../../utils/formatPrice';

export const CompareBar: React.FC = () => {
  const { comparedProducts, removeFromCompare, clearCompare } = useCompare();
  const location = useLocation();

  // Hide the floating bar when already on the /compare page or if empty
  if (comparedProducts.length === 0 || location.pathname === '/compare') {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Laptop comparison tray"
      className="fixed bottom-4 inset-x-4 z-30 max-w-4xl mx-auto bg-[#1C1C1C]/95 backdrop-blur-md border border-[#2A2A2A] shadow-[0_12px_40px_rgba(0,0,0,0.85)] rounded-lg px-4 py-3"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-[#2A2A2A]">
            <Layers className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs font-semibold text-[#F5F5F5] whitespace-nowrap">
              Compare ({comparedProducts.length}/4)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {comparedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-[#121212] border border-[#2A2A2A] rounded px-2.5 py-1.5 shrink-0"
              >
                <div className="text-xs">
                  <span className="text-[#F5F5F5] font-medium truncate max-w-[120px] inline-block align-bottom">
                    {product.name}
                  </span>
                  <span className="text-[#737373] font-mono-tech ml-1.5">
                    {formatPriceCompact(product.price)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCompare(product.id)}
                  aria-label={`Remove ${product.name} from comparison`}
                  className="text-[#737373] hover:text-[#EF4444] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="text-xs text-[#A3A3A3] hover:text-[#F5F5F5] px-2 py-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            Clear All
          </button>
          <Link
            to="/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00E5FF] hover:bg-[#33ECFF] text-[#121212] text-xs font-semibold rounded-md transition-all whitespace-nowrap"
          >
            <span>Compare Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
