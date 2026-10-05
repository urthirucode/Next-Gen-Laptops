import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap shrink-0 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] disabled:opacity-45 disabled:pointer-events-none cursor-pointer active:scale-[0.98]';

  const variants = {
    primary:
      'bg-[#00E5FF] text-[#121212] font-semibold hover:bg-[#33ECFF] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]',
    secondary:
      'bg-[#202020] text-[#F5F5F5] border border-[#2A2A2A] hover:border-[#00E5FF]/60 hover:bg-[#262626]',
    outline:
      'bg-transparent text-[#F5F5F5] border border-[#2A2A2A] hover:border-[#00E5FF] hover:text-[#00E5FF] hover:bg-[#00E5FF]/5',
    ghost:
      'bg-transparent text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#1C1C1C]',
    danger:
      'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/20'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-sm md:text-base'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
