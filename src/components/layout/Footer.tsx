import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181818] border-t border-[#2A2A2A] mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="font-display text-xl font-bold tracking-tight text-[#F5F5F5] inline-block"
            >
              NextGen Laptops
            </Link>
            <p className="text-sm text-[#A3A3A3] max-w-sm leading-relaxed">
              Power Uncompromised. Authorized high-performance hardware showroom for gaming, neural compute, software architecture, and enterprise deployments.
            </p>
            <div className="text-xs text-[#737373] space-x-2 pt-1">
              <span>ISO 9001 Validated Lab</span>
              <span aria-hidden="true">·</span>
              <span>48-Point Pre-Dispatch Thermal QC</span>
              <span aria-hidden="true">·</span>
              <span>Direct OEM Warranty</span>
            </div>
          </div>

          {/* Hardware Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F5F5] tracking-wider uppercase">
              Workloads
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A3A3A3]">
              <li>
                <Link to="/shop?useCase=gaming" className="hover:text-[#00E5FF] transition-colors">
                  Esports & AAA Gaming
                </Link>
              </li>
              <li>
                <Link to="/shop?useCase=ai-ml" className="hover:text-[#00E5FF] transition-colors">
                  AI & LLM Workstations
                </Link>
              </li>
              <li>
                <Link to="/shop?useCase=development" className="hover:text-[#00E5FF] transition-colors">
                  Linux & Dev Machines
                </Link>
              </li>
              <li>
                <Link to="/shop?useCase=creator" className="hover:text-[#00E5FF] transition-colors">
                  OLED Studio Creator
                </Link>
              </li>
              <li>
                <Link to="/shop?useCase=business" className="hover:text-[#00E5FF] transition-colors">
                  Executive Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* GPU Tiers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F5F5] tracking-wider uppercase">
              Graphics Architecture
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A3A3A3]">
              <li>
                <Link to="/shop?gpu=RTX+4090,RTX+4080" className="hover:text-[#00E5FF] transition-colors">
                  NVIDIA RTX 4090 / 4080
                </Link>
              </li>
              <li>
                <Link to="/shop?gpu=RTX+4070" className="hover:text-[#00E5FF] transition-colors">
                  NVIDIA RTX 4070 Series
                </Link>
              </li>
              <li>
                <Link to="/shop?gpu=RTX+4060" className="hover:text-[#00E5FF] transition-colors">
                  NVIDIA RTX 4060 Series
                </Link>
              </li>
              <li>
                <Link to="/shop?gpu=RTX+4050,RTX+3050" className="hover:text-[#00E5FF] transition-colors">
                  RTX 4050 / 3050 Entry
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#00E5FF] transition-colors">
                  Side-by-Side Spec Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F5F5] tracking-wider uppercase">
              Showroom & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A3A3A3]">
              <li>
                <Link to="/about" className="hover:text-[#00E5FF] transition-colors">
                  About & QC Lab
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#00E5FF] transition-colors">
                  Enterprise Procurement
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#00E5FF] transition-colors">
                  Saved Configurations
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#00E5FF] transition-colors">
                  Shopping Bag & EMI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <p>© {new Date().getFullYear()} NextGen Laptops Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#A3A3A3] transition-colors">
              Warranty Terms
            </Link>
            <Link to="/contact" className="hover:text-[#A3A3A3] transition-colors">
              Support Desk
            </Link>
            <Link to="/compare" className="hover:text-[#A3A3A3] transition-colors">
              Hardware Benchmarks
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
