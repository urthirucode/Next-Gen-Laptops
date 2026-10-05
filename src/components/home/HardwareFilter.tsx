import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';

const USE_CASES = [
  { label: 'Gaming', value: 'gaming' },
  { label: 'AI / ML', value: 'ai-ml' },
  { label: 'Development', value: 'development' },
  { label: 'Business', value: 'business' }
];

const GPUS = [
  { label: 'RTX 3050', value: 'RTX 3050' },
  { label: 'RTX 4050', value: 'RTX 4050' },
  { label: 'RTX 4060', value: 'RTX 4060' },
  { label: 'RTX 4070+', value: 'RTX 4070+' }
];

const RAMS = [
  { label: '16GB', value: '16GB' },
  { label: '32GB', value: '32GB' },
  { label: '64GB+', value: '64GB+' }
];

const BUDGETS = [
  { label: '₹75K', maxPrice: 80000 },
  { label: '₹1L', maxPrice: 105000 },
  { label: '₹1.5L', maxPrice: 150000 },
  { label: '₹1.5L+', minPrice: 150000 }
];

export const HardwareFilter: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUseCase, setSelectedUseCase] = useState<string>('gaming');
  const [selectedGpu, setSelectedGpu] = useState<string>('RTX 4060');
  const [selectedRam, setSelectedRam] = useState<string>('');
  const [selectedBudgetLabel, setSelectedBudgetLabel] = useState<string>('');

  const buildQueryAndNavigate = (overrides?: {
    useCase?: string;
    gpu?: string;
    ram?: string;
    budgetLabel?: string;
  }) => {
    const params = new URLSearchParams();
    const uc = overrides?.useCase !== undefined ? overrides.useCase : selectedUseCase;
    const gpu = overrides?.gpu !== undefined ? overrides.gpu : selectedGpu;
    const ram = overrides?.ram !== undefined ? overrides.ram : selectedRam;
    const budgetLbl =
      overrides?.budgetLabel !== undefined ? overrides.budgetLabel : selectedBudgetLabel;

    if (uc) params.set('useCase', uc);
    if (gpu) params.set('gpu', gpu);
    if (ram) params.set('ram', ram);

    if (budgetLbl) {
      const found = BUDGETS.find((b) => b.label === budgetLbl);
      if (found?.maxPrice) params.set('maxPrice', String(found.maxPrice));
      if (found?.minPrice) params.set('minPrice', String(found.minPrice));
    }

    navigate(`/shop?${params.toString()}`);
  };

  return (
    <section
      aria-labelledby="quick-filter-heading"
      className="bg-[#181818] border-b border-[#2A2A2A] py-10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-[#00E5FF]" />
              <div>
                <h2 id="quick-filter-heading" className="text-lg font-bold text-[#F5F5F5]">
                  Find Your Machine
                </h2>
                <p className="text-xs text-[#A3A3A3]">
                  Select hardware parameters to jump directly into matching configurations, or click any filter chip for instant dispatch.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => buildQueryAndNavigate()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00E5FF] hover:bg-[#33ECFF] text-[#121212] text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Launch Configured Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {/* Workload */}
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                Workload
              </span>
              <div className="flex flex-wrap gap-2">
                {USE_CASES.map((item) => {
                  const active = selectedUseCase === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        const next = active ? '' : item.value;
                        setSelectedUseCase(next);
                      }}
                      onDoubleClick={() => buildQueryAndNavigate({ useCase: item.value })}
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-[#121212] border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#737373]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GPU */}
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                GPU Architecture
              </span>
              <div className="flex flex-wrap gap-2">
                {GPUS.map((item) => {
                  const active = selectedGpu === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        const next = active ? '' : item.value;
                        setSelectedGpu(next);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-mono-tech border transition-all cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-[#121212] border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#737373]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RAM */}
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                System Memory (RAM)
              </span>
              <div className="flex flex-wrap gap-2">
                {RAMS.map((item) => {
                  const active = selectedRam === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        const next = active ? '' : item.value;
                        setSelectedRam(next);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-mono-tech border transition-all cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-[#121212] border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#737373]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
                Budget Target
              </span>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((item) => {
                  const active = selectedBudgetLabel === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        const next = active ? '' : item.label;
                        setSelectedBudgetLabel(next);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-mono-tech border transition-all cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-[#121212] border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-[#737373]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Direct 1-Click Preset Routes */}
          <div className="mt-6 pt-4 border-t border-[#2A2A2A]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-[#737373]">
              <span>Instant Presets:</span>
              <button
                type="button"
                onClick={() => navigate('/shop?useCase=gaming&gpu=RTX+4060')}
                className="text-[#A3A3A3] hover:text-[#00E5FF] underline underline-offset-4 cursor-pointer"
              >
                Gaming + RTX 4060
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigate('/shop?useCase=ai-ml&ram=64GB%2B')}
                className="text-[#A3A3A3] hover:text-[#00E5FF] underline underline-offset-4 cursor-pointer"
              >
                Local LLM 64GB+ Workstations
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigate('/shop?useCase=development&ram=32GB')}
                className="text-[#A3A3A3] hover:text-[#00E5FF] underline underline-offset-4 cursor-pointer"
              >
                32GB Developer Ultrabooks
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
