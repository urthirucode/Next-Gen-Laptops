import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { products } from '../../data/products';
import { LaptopVisual } from '../ui/LaptopVisual';

export const Hero: React.FC = () => {
  const flagshipProduct = products[0];

  return (
    <section className="relative overflow-hidden border-b border-[#2A2A2A] bg-[#121212] bg-tech-grid">
      {/* Restrained radial cyan spotlight */}
      <div
        className="absolute top-0 right-1/4 w-[620px] h-[620px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.38) 0%, transparent 70%)'
        }}
      />

      {/* Subtle animated light streak along top hairline */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#00E5FF] tracking-wide">
              <span>2026 WORKSTATION & ESPORTS LINEUP</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A3A3A3]">NVIDIA RTX 40-SERIES & NPU SILICON</span>
            </div>

            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[72px] font-bold tracking-tight text-[#F5F5F5] leading-[1.04]">
              Power Uncompromised.
            </h1>

            <p className="text-base sm:text-lg text-[#A3A3A3] max-w-xl leading-relaxed">
              High-performance laptops engineered for gaming, development, AI, and professional workloads.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#00E5FF] hover:bg-[#33ECFF] text-[#121212] font-semibold text-sm sm:text-base rounded-md shadow-[0_0_25px_rgba(0,229,255,0.28)] transition-all duration-200 whitespace-nowrap"
              >
                <span>Shop Laptops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/compare"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1C1C1C] hover:bg-[#242424] text-[#F5F5F5] border border-[#2A2A2A] hover:border-[#00E5FF] font-medium text-sm sm:text-base rounded-md transition-all duration-200 whitespace-nowrap"
              >
                <Layers className="w-4 h-4 text-[#00E5FF]" />
                <span>Compare Models</span>
              </Link>
            </div>

            {/* Quantitative Hardware Proof Bar */}
            <div className="pt-8 border-t border-[#2A2A2A]/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono-tech text-[#F5F5F5]">
                  686 TOPS
                </div>
                <div className="text-xs text-[#737373] mt-0.5">Peak Local AI Compute</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono-tech text-[#00E5FF]">
                  175W TGP
                </div>
                <div className="text-xs text-[#737373] mt-0.5">Unthrottled GPU Power</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono-tech text-[#F5F5F5]">
                  240Hz
                </div>
                <div className="text-xs text-[#737373] mt-0.5">OLED & Mini-LED HDR</div>
              </div>
            </div>
          </div>

          {/* Right Column: Flagship Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)] group">
              <div className="aspect-[16/10] bg-[#141416] relative overflow-hidden">
                <LaptopVisual product={flagshipProduct} angle="front" preferPhoto />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-6 pt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-mono-tech text-[#00E5FF]">
                    FLAGSHIP SPOTLIGHT · IN STOCK
                  </div>
                  <h2 className="text-xl font-bold text-[#F5F5F5] mt-1">
                    ASUS ROG Strix SCAR 16 (2026)
                  </h2>
                  <p className="text-xs font-mono-tech text-[#A3A3A3] mt-1">
                    Core i9-14900HX · RTX 4080 12GB · 32GB DDR5 · 240Hz Mini-LED
                  </p>
                </div>

                <Link
                  to="/laptops/asus-rog-strix-scar-16"
                  className="text-xs font-semibold text-[#00E5FF] hover:underline whitespace-nowrap shrink-0"
                >
                  Inspect Specs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
