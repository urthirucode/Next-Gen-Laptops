import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import { ProductGrid } from '../products/ProductGrid';
import { UseCase } from '../../types/product';

const TABS: { id: 'all' | UseCase; label: string }[] = [
  { id: 'all', label: 'Flagship All-Rounders' },
  { id: 'gaming', label: 'Esports & AAA Gaming' },
  { id: 'ai-ml', label: 'AI / ML Compute' },
  { id: 'development', label: 'Software Engineering' },
  { id: 'business', label: 'Enterprise & Executive' }
];

export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | UseCase>('all');

  const displayedProducts = useMemo(() => {
    if (activeTab === 'all') {
      return products.slice(0, 6);
    }
    return products.filter((p) => p.useCases.includes(activeTab)).slice(0, 6);
  }, [activeTab]);

  return (
    <section aria-labelledby="featured-heading" className="py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider mb-2">
              BENCHMARKED INVENTORY
            </div>
            <h2
              id="featured-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F5]"
            >
              Engineered for Peak Throughput
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:underline whitespace-nowrap shrink-0"
          >
            <span>Explore Full Catalog ({products.length} Models)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Filter Tabs (Functional Segmented Buttons) */}
        <div
          role="tablist"
          aria-label="Filter featured laptops by workload"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-[#2A2A2A]"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#00E5FF] text-[#121212] font-semibold'
                    : 'bg-[#1C1C1C] text-[#A3A3A3] hover:text-[#F5F5F5] border border-[#2A2A2A]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <ProductGrid products={displayedProducts} columns={3} />
      </div>
    </section>
  );
};
