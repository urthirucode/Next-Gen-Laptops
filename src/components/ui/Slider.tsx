import React from 'react';
import { formatPrice } from '../../utils/formatPrice';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  minValue?: number;
  onChange: (value: number) => void;
  onMinChange?: (minValue: number) => void;
  label?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 5000,
  value,
  minValue = min,
  onChange,
  onMinChange,
  label
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#A3A3A3] font-medium">{label}</span>
          <span className="font-mono-tech text-[#00E5FF] font-medium">
            {formatPrice(minValue)} — {formatPrice(value)}
          </span>
        </div>
      )}

      <div className="relative pt-1">
        <div className="w-full h-1 bg-[#2A2A2A] rounded-full overflow-hidden pointer-events-none">
          <div
            className="h-full bg-[#00E5FF]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label || 'Maximum price filter'}
          onChange={(e) => onChange(Number(e.target.value))}
          className="nextgen-slider w-full absolute inset-0 h-4 -top-1"
        />
      </div>

      {onMinChange && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <label className="block text-[11px] text-[#737373] mb-1">Min Budget</label>
            <select
              value={minValue}
              onChange={(e) => {
                const nextMin = Number(e.target.value);
                onMinChange(Math.min(nextMin, value - step));
              }}
              className="w-full bg-[#181818] border border-[#2A2A2A] rounded px-2 py-1 text-xs font-mono-tech text-[#F5F5F5] focus:outline-none focus:border-[#00E5FF]"
            >
              {[40000, 60000, 80000, 100000, 125000, 150000, 200000].map((amt) => (
                <option key={amt} value={amt} disabled={amt >= value}>
                  {formatPrice(amt)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-[#737373] mb-1">Max Budget</label>
            <select
              value={value}
              onChange={(e) => {
                const nextMax = Number(e.target.value);
                onChange(Math.max(nextMax, minValue + step));
              }}
              className="w-full bg-[#181818] border border-[#2A2A2A] rounded px-2 py-1 text-xs font-mono-tech text-[#F5F5F5] focus:outline-none focus:border-[#00E5FF]"
            >
              {[80000, 100000, 125000, 150000, 200000, 250000, 300000].map((amt) => (
                <option key={amt} value={amt} disabled={amt <= minValue}>
                  {formatPrice(amt)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
