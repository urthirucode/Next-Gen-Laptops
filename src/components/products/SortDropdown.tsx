import React from 'react';
import { SORT_OPTIONS } from '../../data/filters';
import { SortOption } from '../../types/product';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="inline-flex items-center gap-2.5">
      <label htmlFor="sort-select" className="text-xs text-[#A3A3A3] whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-[#1C1C1C] border border-[#2A2A2A] hover:border-[#00E5FF]/60 rounded-md px-3 py-2 text-xs font-medium text-[#F5F5F5] focus:outline-none focus:border-[#00E5FF] transition-colors cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
