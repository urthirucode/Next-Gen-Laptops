import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon
}) => {
  return (
    <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-12 text-center max-w-lg mx-auto my-8">
      {icon && (
        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#00E5FF]">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">{title}</h3>
      <p className="text-sm text-[#A3A3A3] mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
