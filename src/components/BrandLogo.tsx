import React, { useState } from 'react';

interface BrandLogoProps {
  variant?: 'dark-text' | 'light-text';
  label?: string;
  logoSrc?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark-text',
  label = "Sonu's Beauty Studio & Academy",
  logoSrc = '/assets/sonu/logo-emblem.png',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);
  const isLight = variant === 'light-text';

  return (
    <a
      href="#home"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5e1933]"
      aria-label="Sonu's Beauty Studio & Academy Home"
    >
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden flex items-center justify-center bg-[#faf3ec] border border-[#d4af6a]/50 shrink-0 shadow-xs">
        {!imgError ? (
          <img
            src={logoSrc}
            alt="Sonu's Beauty Studio & Academy Emblem"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain object-center"
          />
        ) : (
          <span className="font-serif-luxury text-lg font-bold text-[#5e1933]">S</span>
        )}
      </div>
      <span
        className={`font-serif-luxury text-base sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors ${
          isLight
            ? 'text-[#f7e7ce] group-hover:text-white'
            : 'text-[#4a1228] group-hover:text-[#5e1933]'
        }`}
      >
        {label}
      </span>
    </a>
  );
};
