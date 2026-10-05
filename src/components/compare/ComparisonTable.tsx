import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import { LaptopVisual } from '../ui/LaptopVisual';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface ComparisonTableProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onOpenAddModal: () => void;
  highlightDifferences: boolean;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  products,
  onRemove,
  onOpenAddModal,
  highlightDifferences
}) => {
  const { addToCart } = useCart();

  // Compute best values to highlight strongest specification in cyan
  const bestGpuScore = Math.max(...products.map((p) => p.gpuTierScore), 0);
  const bestRamGb = Math.max(...products.map((p) => p.ramSizeGb), 0);
  const bestStorageGb = Math.max(...products.map((p) => p.storageSizeGb), 0);
  const bestRefreshHz = Math.max(...products.map((p) => p.refreshRateHz), 0);
  const lowestWeight = Math.min(...products.map((p) => p.weightKg), 99);
  const lowestPrice = Math.min(...products.map((p) => p.price), 9999999);
  const bestCinebench = Math.max(...products.map((p) => p.benchmarks.cinebenchR23Multi), 0);
  const bestAiTops = Math.max(...products.map((p) => p.benchmarks.aiTops), 0);

  const rows: {
    label: string;
    getValue: (p: Product) => React.ReactNode;
    isBest?: (p: Product) => boolean;
    rawString: (p: Product) => string;
  }[] = [
    {
      label: 'CPU',
      getValue: (p) => (
        <div>
          <div className="font-medium text-[#F5F5F5]">{p.cpu}</div>
          <div className="text-xs text-[#737373] mt-0.5">{p.cpuCores}</div>
        </div>
      ),
      isBest: (p) => products.length > 1 && p.benchmarks.cinebenchR23Multi === bestCinebench,
      rawString: (p) => p.cpu
    },
    {
      label: 'GPU',
      getValue: (p) => (
        <div>
          <div className="font-medium text-[#F5F5F5]">{p.gpu}</div>
          <div className="text-xs text-[#737373] font-mono-tech mt-0.5">{p.gpuTgp}</div>
        </div>
      ),
      isBest: (p) => products.length > 1 && p.gpuTierScore === bestGpuScore,
      rawString: (p) => p.gpu
    },
    {
      label: 'RAM',
      getValue: (p) => <span className="font-mono-tech">{p.ram}</span>,
      isBest: (p) => products.length > 1 && p.ramSizeGb === bestRamGb,
      rawString: (p) => p.ram
    },
    {
      label: 'SSD Storage',
      getValue: (p) => <span className="font-mono-tech">{p.storage}</span>,
      isBest: (p) => products.length > 1 && p.storageSizeGb === bestStorageGb,
      rawString: (p) => p.storage
    },
    {
      label: 'Display & Refresh Rate',
      getValue: (p) => (
        <div>
          <div className="font-medium text-[#F5F5F5]">
            {p.refreshRate} · {p.displayResolution}
          </div>
          <div className="text-xs text-[#737373] mt-0.5">
            {p.panelType} · {p.colorGamut}
          </div>
        </div>
      ),
      isBest: (p) => products.length > 1 && p.refreshRateHz === bestRefreshHz,
      rawString: (p) => `${p.refreshRate}-${p.displayResolution}`
    },
    {
      label: 'AI Compute (TOPS)',
      getValue: (p) => <span className="font-mono-tech">{p.benchmarks.aiTops} TOPS</span>,
      isBest: (p) => products.length > 1 && p.benchmarks.aiTops === bestAiTops,
      rawString: (p) => String(p.benchmarks.aiTops)
    },
    {
      label: 'Battery & Endurance',
      getValue: (p) => (
        <div>
          <div className="font-mono-tech">{p.battery}</div>
          <div className="text-xs text-[#737373] mt-0.5">
            Up to {p.benchmarks.batteryHours} hrs mixed workflow
          </div>
        </div>
      ),
      rawString: (p) => p.battery
    },
    {
      label: 'Weight',
      getValue: (p) => <span className="font-mono-tech">{p.weight}</span>,
      isBest: (p) => products.length > 1 && p.weightKg === lowestWeight,
      rawString: (p) => p.weight
    },
    {
      label: 'Operating System',
      getValue: (p) => <span>{p.os}</span>,
      rawString: (p) => p.os
    },
    {
      label: 'Warranty',
      getValue: (p) => <span className="text-xs">{p.warranty}</span>,
      rawString: (p) => p.warranty
    },
    {
      label: 'Price',
      getValue: (p) => (
        <div>
          <span className="text-base font-bold font-mono-tech text-[#F5F5F5]">
            {formatPrice(p.price)}
          </span>
          <span className="text-xs font-mono-tech text-[#737373] line-through ml-2">
            {formatPrice(p.originalPrice)}
          </span>
        </div>
      ),
      isBest: (p) => products.length > 1 && p.price === lowestPrice,
      rawString: (p) => String(p.price)
    }
  ];

  const visibleRows = highlightDifferences
    ? rows.filter((row) => {
        const values = products.map((p) => row.rawString(p));
        return new Set(values).size > 1;
      })
    : rows;

  return (
    <div className="overflow-x-auto bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg">
      <table className="w-full text-left border-collapse min-w-[760px]">
        <thead>
          <tr className="border-b border-[#2A2A2A]">
            <th className="w-52 p-5 bg-[#181818] align-top">
              <div className="text-xs uppercase tracking-wider text-[#737373] font-semibold">
                Specification Matrix
              </div>
              <p className="text-xs text-[#A3A3A3] font-normal mt-2 leading-relaxed">
                Cyan-accented cells denote the strongest hardware specification in that row.
              </p>
            </th>

            {products.map((product) => (
              <th
                key={product.id}
                className="p-5 min-w-[230px] max-w-[280px] border-l border-[#2A2A2A] align-top relative group"
              >
                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  aria-label={`Remove ${product.name}`}
                  className="absolute top-3 right-3 p-1.5 text-[#737373] hover:text-[#EF4444] hover:bg-[#242424] rounded transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <Link to={`/laptops/${product.id}`} className="block">
                  <div className="aspect-[4/3] rounded overflow-hidden border border-[#2A2A2A] mb-3">
                    <LaptopVisual product={product} preferPhoto />
                  </div>
                  <div className="text-xs text-[#737373] uppercase font-medium">
                    {product.brand}
                  </div>
                  <div className="text-base font-semibold text-[#F5F5F5] hover:text-[#00E5FF] transition-colors mt-0.5 line-clamp-1">
                    {product.name}
                  </div>
                </Link>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold font-mono-tech text-[#00E5FF]">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => addToCart(product, 1)}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </th>
            ))}

            {products.length < 4 && (
              <th className="p-5 min-w-[220px] border-l border-[#2A2A2A] align-middle text-center bg-[#181818]/40">
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className="w-full py-12 px-4 border border-dashed border-[#2A2A2A] hover:border-[#00E5FF] rounded-lg flex flex-col items-center justify-center gap-2 text-[#A3A3A3] hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#202020] flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold">Add Machine to Compare</span>
                  <span className="text-[11px] text-[#737373]">
                    {4 - products.length} slot{4 - products.length > 1 ? 's' : ''} remaining
                  </span>
                </button>
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#2A2A2A] text-sm">
          {visibleRows.map((row) => (
            <tr key={row.label} className="hover:bg-[#202020]/50 transition-colors">
              <td className="p-4 bg-[#181818] text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">
                {row.label}
              </td>
              {products.map((product) => {
                const winner = row.isBest ? row.isBest(product) : false;
                return (
                  <td
                    key={product.id}
                    className={`p-4 border-l border-[#2A2A2A] transition-colors ${
                      winner
                        ? 'bg-[#00E5FF]/[0.06] text-[#F5F5F5]'
                        : 'text-[#A3A3A3]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>{row.getValue(product)}</div>
                      {winner && (
                        <span
                          title="Strongest specification in comparison"
                          className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-[#00E5FF] shrink-0 mt-0.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Lead</span>
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
              {products.length < 4 && <td className="p-4 border-l border-[#2A2A2A] bg-[#181818]/20" />}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
