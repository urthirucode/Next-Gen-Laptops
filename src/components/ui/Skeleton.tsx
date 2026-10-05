import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-[#181818] border-b border-[#2A2A2A]" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="h-3 w-16 bg-[#2A2A2A] rounded" />
          <div className="h-5 w-3/4 bg-[#2A2A2A] rounded" />
          <div className="space-y-1.5 pt-2">
            <div className="h-3 w-full bg-[#242424] rounded" />
            <div className="h-3 w-5/6 bg-[#242424] rounded" />
            <div className="h-3 w-2/3 bg-[#242424] rounded" />
          </div>
        </div>
        <div className="pt-4 border-t border-[#2A2A2A] space-y-3">
          <div className="h-6 w-1/2 bg-[#2A2A2A] rounded" />
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-[#242424] rounded" />
            <div className="h-9 flex-1 bg-[#2A2A2A] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => (
  <div className={`bg-[#2A2A2A] animate-pulse rounded ${className}`} />
);
