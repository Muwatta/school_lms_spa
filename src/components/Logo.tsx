import React from 'react';

type Props = {
  size?: number;
  className?: string;
};

const Logo: React.FC<Props> = ({ size = 40, className = '' }) => {
  const initials = 'AMUN';

  return (
    <span className={`logo inline-flex items-center gap-3 ${className}`} aria-hidden="false">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="AMUN Bright Minds Academy logo"
        className="logo-svg rounded-full"
      >
        <defs>
          <linearGradient id="amun-logo-gradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="10" fill="url(#amun-logo-gradient)" />
        <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          {initials}
        </text>
      </svg>
    </span>
  );
};

export default Logo;