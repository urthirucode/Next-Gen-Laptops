import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  sublabel,
  disabled = false,
  className = ''
}) => {
  return (
    <label
      htmlFor={id}
      className={`group inline-flex items-center justify-between gap-2.5 select-none ${
        disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <span className="inline-flex items-center gap-2.5 min-w-0">
        <button
          id={id}
          type="button"
          role="checkbox"
          aria-checked={checked}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onChange(!checked);
          }}
          className={`w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] ${
            checked
              ? 'bg-[#00E5FF] border border-[#00E5FF] text-[#121212] shadow-[0_0_8px_rgba(0,229,255,0.35)]'
              : 'bg-[#181818] border border-[#2A2A2A] group-hover:border-[#737373]'
          }`}
        >
          <Check
            className={`w-3 h-3 stroke-[3] transition-transform duration-150 ${
              checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          />
        </button>
        {label && (
          <span
            className={`text-sm truncate transition-colors duration-150 ${
              checked ? 'text-[#F5F5F5] font-medium' : 'text-[#A3A3A3] group-hover:text-[#F5F5F5]'
            }`}
          >
            {label}
          </span>
        )}
      </span>
      {sublabel && (
        <span className="text-xs font-mono-tech text-[#737373] shrink-0">{sublabel}</span>
      )}
    </label>
  );
};
