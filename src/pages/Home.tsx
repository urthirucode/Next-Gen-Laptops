import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { HardwareFilter } from '../components/home/HardwareFilter';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CATEGORY_SPOTLIGHTS } from '../data/categories';

export const Home: React.FC = () => {
  return (
    <div>
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Dynamic Hardware Filter Panel */}
      <HardwareFilter />

      {/* 3. Featured Collection */}
      <FeaturedProducts />

      {/* 4. Engineering Architecture & Category Spotlights */}
      <section
        aria-labelledby="architecture-heading"
        className="py-16 lg:py-24 bg-[#181818] border-t border-[#2A2A2A]"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider mb-2">
              PURPOSE-BUILT SILICON TIERS
            </div>
            <h2
              id="architecture-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F5]"
            >
              Configured by Workload, Validated by Telemetry
            </h2>
            <p className="text-sm sm:text-base text-[#A3A3A3] mt-3 leading-relaxed">
              Every machine in our catalog is categorized by sustained thermal power limits (TGP), memory bandwidth, and display color accuracy rather than marketing labels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORY_SPOTLIGHTS.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/shop${cat.queryParams}`}
                className="group bg-[#1C1C1C] border border-[#2A2A2A] hover:border-[#00E5FF] rounded-lg p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#737373] mb-3">
                    <span>0{index + 1}. WORKLOAD ARCHITECTURE</span>
                    <span className="text-[#00E5FF]">{cat.featuredSpec}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F5F5F5] group-hover:text-[#00E5FF] transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">{cat.subtitle}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between text-xs">
                  <span className="font-mono-tech text-[#F5F5F5]">{cat.metrics}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#00E5FF]">
                    <span>Configure</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
