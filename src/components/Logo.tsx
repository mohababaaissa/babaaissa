import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  light?: boolean;
}

export default function Logo({ className = '', size = 'md', showSubtitle = true, light = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group transition-transform ${className}`}>
      {/* SVG Emblem: Steering Wheel + Road Marking + Car Silhouette */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl shadow-md bg-gradient-to-br from-[#072445] via-[#0c3d6e] to-[#072445] p-1.5 border border-white/20 group-hover:scale-105 transition-all duration-300`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
          {/* Outer circle / Steering rim */}
          <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="4" opacity="0.95" />
          <circle cx="50" cy="50" r="39" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />

          {/* Road in perspective */}
          <path d="M38 78 L46 44 L54 44 L62 78 Z" fill="#072445" opacity="0.6" />
          {/* Road markings */}
          <line x1="50" y1="46" x2="50" y2="54" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="60" x2="50" y2="76" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

          {/* Steering wheel crossbars */}
          <circle cx="50" cy="50" r="13" fill="#072445" stroke="#ffffff" strokeWidth="3" />
          <path d="M12 50 H37" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M63 50 H88" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 63 V87" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

          {/* Center emblem icon: Car silhouette */}
          <path
            d="M44 48 C44 47 45.5 45 47 45 H53 C54.5 45 56 47 56 48 L58 51 H42 L44 48 Z"
            fill="#10b981"
          />
          <circle cx="45" cy="52" r="1.5" fill="#ffffff" />
          <circle cx="55" cy="52" r="1.5" fill="#ffffff" />
        </svg>

        {/* Small Moroccan Star accent badge */}
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight uppercase ${titleSizes[size]} ${light ? 'text-white' : 'text-slate-900'}`}>
            BABAAISSA
          </span>
          <span className="font-arabic font-bold text-emerald-500 text-sm md:text-base">
            باباعيسى
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 text-[10px] md:text-xs font-medium tracking-wide">
            <span className={light ? 'text-emerald-400' : 'text-emerald-600 font-semibold'}>
              AUTO-ÉCOLE
            </span>
            <span className={light ? 'text-slate-300' : 'text-slate-500'}>•</span>
            <span className={light ? 'text-slate-200' : 'text-slate-600'}>
              BOUARFA
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
