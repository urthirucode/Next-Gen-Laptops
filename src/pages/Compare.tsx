import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Plus, Trash2 } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ComparisonTable } from '../components/compare/ComparisonTable';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { useCompare } from '../hooks/useCompare';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

export const Compare: React.FC = () => {
  const { comparedProducts, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const navigate = useNavigate();

  const availableToAdd = products.filter(
    (p) =>
      !comparedProducts.some((cp) => cp.id === p.id) &&
      (searchFilter.trim() === '' ||
        `${p.brand} ${p.name} ${p.gpuShort} ${p.cpu}`
          .toLowerCase()
          .includes(searchFilter.toLowerCase()))
  );

  return (
    <PageContainer className="py-8 lg:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#2A2A2A]">
        <div>
          <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider mb-1.5">
            SIDE-BY-SIDE TELEMETRY MATRIX ({comparedProducts.length}/4 SELECTED)
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
            Compare Hardware Specifications
          </h1>
        </div>

        {comparedProducts.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            {comparedProducts.length > 1 && (
              <Checkbox
                id="diff-toggle"
                checked={highlightDifferences}
                onChange={setHighlightDifferences}
                label="Show Only Differences"
              />
            )}

            {comparedProducts.length < 4 && (
              <Button variant="secondary" size="sm" onClick={() => setAddModalOpen(true)}>
                <Plus className="w-4 h-4 text-[#00E5FF]" />
                <span>Add Laptop</span>
              </Button>
            )}

            <Button variant="ghost" size="sm" onClick={clearCompare}>
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </Button>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="py-8">
          <EmptyState
            icon={<Layers className="w-5 h-5" />}
            title="No laptops selected for comparison."
            description="Select up to 4 laptops from the catalog or add machines directly below to evaluate CPU, GPU TGP, RAM, and display specifications side-by-side."
            actionLabel="Add Laptops to Compare"
            onAction={() => setAddModalOpen(true)}
          />
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="text-xs text-[#00E5FF] hover:underline cursor-pointer"
            >
              Or browse full Shop Catalog →
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <ComparisonTable
            products={comparedProducts}
            onRemove={removeFromCompare}
            onOpenAddModal={() => setAddModalOpen(true)}
            highlightDifferences={highlightDifferences}
          />
        </div>
      )}

      {/* Modal to Add Laptop to Comparison */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title={`Select Laptop to Compare (${comparedProducts.length}/4)`}
        maxWidthClass="max-w-2xl"
      >
        <div className="space-y-4">
          <input
            type="search"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter by name, brand, or GPU (e.g. RTX 4070)..."
            className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded-md px-3.5 py-2 text-sm text-[#F5F5F5] focus:outline-none"
          />

          <div className="divide-y divide-[#2A2A2A] max-h-96 overflow-y-auto">
            {availableToAdd.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-[#242424]/40 px-2 rounded"
              >
                <div className="min-w-0">
                  <div className="text-xs text-[#737373] uppercase">{item.brand}</div>
                  <div className="text-sm font-semibold text-[#F5F5F5] truncate">{item.name}</div>
                  <div className="text-xs font-mono-tech text-[#A3A3A3] mt-0.5">
                    {item.cpu} · {item.gpuShort} · {item.ramShort}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-mono-tech font-semibold text-[#00E5FF]">
                    {formatPrice(item.price)}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const added = addToCompare(item);
                      if (added && comparedProducts.length + 1 >= 4) {
                        setAddModalOpen(false);
                      }
                    }}
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default Compare;
