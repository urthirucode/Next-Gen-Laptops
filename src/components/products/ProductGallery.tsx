import React, { useState } from 'react';
import { Product } from '../../types/product';
import { LaptopVisual, StudioAngle } from '../ui/LaptopVisual';

interface ProductGalleryProps {
  product: Product;
}

const STUDIO_ANGLES: { id: StudioAngle; label: string; caption: string }[] = [
  {
    id: 'front',
    label: 'Studio Front',
    caption: '16:10 Calibration View'
  },
  {
    id: 'angled',
    label: 'Chassis Profile',
    caption: 'Precision CNC Unibody'
  },
  {
    id: 'thermal',
    label: 'Thermal Chamber',
    caption: 'Vapor / Heatpipe Layout'
  },
  {
    id: 'io',
    label: 'I/O & Ports',
    caption: 'Thunderbolt & DisplayPort'
  }
];

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [selectedAngle, setSelectedAngle] = useState<StudioAngle>('front');

  return (
    <div className="space-y-4">
      {/* Main Studio Viewport */}
      <div className="relative aspect-[4/3] bg-[#151518] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <LaptopVisual
          product={product}
          angle={selectedAngle}
          preferPhoto={selectedAngle === 'front'}
        />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-[#121212]/85 backdrop-blur-sm border border-[#2A2A2A] rounded px-3 py-1.5">
          <span className="text-[#F5F5F5] font-medium">
            {STUDIO_ANGLES.find((a) => a.id === selectedAngle)?.label}
          </span>
          <span className="font-mono-tech text-[#00E5FF]">
            {STUDIO_ANGLES.find((a) => a.id === selectedAngle)?.caption}
          </span>
        </div>
      </div>

      {/* Angle Selector Thumbnails */}
      <div className="grid grid-cols-4 gap-3" role="tablist" aria-label="Product gallery angles">
        {STUDIO_ANGLES.map((view) => {
          const active = selectedAngle === view.id;
          return (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedAngle(view.id)}
              className={`group rounded-md overflow-hidden border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                active
                  ? 'border-[#00E5FF] bg-[#202020]'
                  : 'border-[#2A2A2A] bg-[#181818] hover:border-[#737373]'
              }`}
            >
              <div className="aspect-[16/10] w-full overflow-hidden pointer-events-none">
                <LaptopVisual product={product} angle={view.id} />
              </div>
              <div className="px-2.5 py-2 border-t border-[#2A2A2A]">
                <div
                  className={`text-xs font-medium truncate ${
                    active ? 'text-[#00E5FF]' : 'text-[#F5F5F5]'
                  }`}
                >
                  {view.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
