import React from 'react';
import { Product } from '../../types/product';

interface ProductSpecsProps {
  product: Product;
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
  const specRows = [
    { label: 'Processor', value: `${product.cpu} (${product.cpuCores})`, highlight: true },
    { label: 'Graphics (GPU)', value: `${product.gpu} · ${product.gpuTgp}`, highlight: true },
    { label: 'System Memory (RAM)', value: product.ram, highlight: false },
    { label: 'Internal Storage', value: product.storage, highlight: false },
    { label: 'Display Panel', value: `${product.display} (${product.panelType})`, highlight: false },
    { label: 'Refresh Rate & Color', value: `${product.refreshRate} · ${product.colorGamut}`, highlight: true },
    { label: 'Battery & Power', value: product.battery, highlight: false },
    { label: 'Chassis Weight', value: product.weight, highlight: false },
    { label: 'Operating System', value: product.os, highlight: false },
    { label: 'Manufacturer Warranty', value: product.warranty, highlight: false }
  ];

  return (
    <section aria-labelledby="specs-heading" className="mt-16 pt-12 border-t border-[#2A2A2A]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Lab Validated Benchmarks */}
        <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 id="specs-heading" className="text-xl font-bold text-[#F5F5F5]">
              Hardware Specifications & Telemetry
            </h2>
            <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">
              Verified on NextGen Lab’s 24°C ambient testbench using sustained 30-minute stress workloads.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#A3A3A3]">Cinebench R23 Multi-Core</span>
                  <span className="font-mono-tech text-[#00E5FF] font-semibold">
                    {product.benchmarks.cinebenchR23Multi.toLocaleString()} pts
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E5FF]"
                    style={{
                      width: `${Math.min(100, Math.round((product.benchmarks.cinebenchR23Multi / 34000) * 100))}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#A3A3A3]">3DMark Time Spy Graphics</span>
                  <span className="font-mono-tech text-[#00E5FF] font-semibold">
                    {product.benchmarks.timeSpyGraphics.toLocaleString()} pts
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E5FF]"
                    style={{
                      width: `${Math.min(100, Math.round((product.benchmarks.timeSpyGraphics / 23000) * 100))}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#A3A3A3]">Combined AI Compute (GPU + NPU)</span>
                  <span className="font-mono-tech text-[#00E5FF] font-semibold">
                    {product.benchmarks.aiTops} TOPS
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00A8CC]"
                    style={{
                      width: `${Math.min(100, Math.round((product.benchmarks.aiTops / 700) * 100))}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#A3A3A3]">Mixed Developer Battery Runtime</span>
                  <span className="font-mono-tech text-[#22C55E] font-semibold">
                    {product.benchmarks.batteryHours} Hours
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#22C55E]"
                    style={{
                      width: `${Math.min(100, Math.round((product.benchmarks.batteryHours / 20) * 100))}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Physical I/O Ports List */}
          <div className="mt-8 pt-6 border-t border-[#2A2A2A]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-3">
              Physical I/O Ports
            </h3>
            <ul className="space-y-1.5 text-xs font-mono-tech text-[#F5F5F5]">
              {product.ports.map((port, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0" />
                  <span>{port}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right 2 Columns: Full Specification Matrix */}
        <div className="lg:col-span-2 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-[#181818] border-b border-[#2A2A2A] flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
              Complete Component Sheet
            </span>
            <span className="text-xs font-mono-tech text-[#737373]">
              Model ID: {product.id.toUpperCase()}
            </span>
          </div>

          <dl className="divide-y divide-[#2A2A2A]">
            {specRows.map((row) => (
              <div
                key={row.label}
                className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2 hover:bg-[#202020]/60 transition-colors"
              >
                <dt className="text-xs sm:text-sm font-medium text-[#A3A3A3]">{row.label}</dt>
                <dd
                  className={`sm:col-span-2 text-sm font-mono-tech ${
                    row.highlight ? 'text-[#00E5FF] font-medium' : 'text-[#F5F5F5]'
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
