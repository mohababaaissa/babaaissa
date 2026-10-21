import React from 'react';

interface RoadSignIconProps {
  type?: string;
  className?: string;
  label?: string;
}

export default function RoadSignIcon({ type = 'danger-triangle', className = 'w-24 h-24', label }: RoadSignIconProps) {
  switch (type) {
    case 'danger-triangle':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            {/* Triangle danger sign */}
            <polygon points="50,6 94,84 6,84" fill="#ffffff" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
            <circle cx="50" cy="70" r="3.5" fill="#1e293b" />
            <rect x="47.5" y="34" width="5" height="26" rx="2.5" fill="#1e293b" />
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    case 'priority-cross':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            <rect width="100" height="100" rx="12" fill="#072445" />
            {/* Cross roads */}
            <rect x="40" y="5" width="20" height="90" fill="#334155" />
            <rect x="5" y="40" width="90" height="20" fill="#334155" />
            {/* Priority arrow from right */}
            <path d="M85 50 L60 50" stroke="#10b981" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" />
            <polygon points="55,50 63,45 63,55" fill="#10b981" />
            <circle cx="50" cy="50" r="5" fill="#fbbf24" />
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    case 'speed-gauge':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#dc2626" strokeWidth="8" />
            <text x="50" y="60" textAnchor="middle" fill="#0f172a" fontSize="32" fontWeight="800" fontFamily="sans-serif">
              60
            </text>
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    case 'safety-cars':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            <rect width="160" height="80" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            {/* Car 1 */}
            <rect x="15" y="32" width="35" height="18" rx="4" fill="#0284c7" />
            <rect x="22" y="24" width="20" height="10" rx="3" fill="#38bdf8" />
            {/* Safety bracket */}
            <path d="M58 41 H102" stroke="#10b981" strokeWidth="3" strokeDasharray="3 3" />
            <text x="80" y="34" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="700">60 m</text>
            {/* Car 2 */}
            <rect x="110" y="32" width="35" height="18" rx="4" fill="#072445" />
            <rect x="117" y="24" width="20" height="10" rx="3" fill="#0c3d6e" />
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    case 'curb-colors':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            <rect width="120" height="70" rx="8" fill="#f1f5f9" />
            {/* Curb block */}
            <rect x="10" y="35" width="20" height="15" fill="#dc2626" />
            <rect x="30" y="35" width="20" height="15" fill="#ffffff" stroke="#94a3b8" />
            <rect x="50" y="35" width="20" height="15" fill="#dc2626" />
            <rect x="70" y="35" width="20" height="15" fill="#ffffff" stroke="#94a3b8" />
            <rect x="90" y="35" width="20" height="15" fill="#dc2626" />
            {/* Forbidden sign */}
            <circle cx="60" cy="18" r="10" fill="#ffffff" stroke="#dc2626" strokeWidth="2.5" />
            <line x1="53" y1="25" x2="67" y2="11" stroke="#dc2626" strokeWidth="2.5" />
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    case 'solid-line':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            <rect width="100" height="80" rx="8" fill="#334155" />
            {/* Solid white line */}
            <line x1="50" y1="5" x2="50" y2="75" stroke="#ffffff" strokeWidth="4" />
            {/* Warning prohibition */}
            <circle cx="28" cy="40" r="12" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
            <line x1="20" y1="48" x2="36" y2="32" stroke="#dc2626" strokeWidth="3" />
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    case 'points-license':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            <rect x="10" y="15" width="80" height="70" rx="8" fill="#072445" stroke="#10b981" strokeWidth="3" />
            <rect x="18" y="25" width="25" height="30" rx="4" fill="#ffffff" opacity="0.3" />
            <line x1="50" y1="30" x2="80" y2="30" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="40" x2="75" y2="40" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="65" r="12" fill="#10b981" />
            <text x="50" y="70" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">30</text>
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    case 'passing-pedestrian':
      return (
        <div className={`inline-flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
            <rect width="140" height="80" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            {/* Pedestrian */}
            <circle cx="25" cy="30" r="6" fill="#072445" />
            <line x1="25" y1="36" x2="25" y2="55" stroke="#072445" strokeWidth="3" strokeLinecap="round" />
            {/* Bracket 1.5m */}
            <path d="M38 42 H72" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="55" y="36" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="700">1,5 m</text>
            {/* Car */}
            <rect x="80" y="30" width="45" height="25" rx="5" fill="#072445" />
          </svg>
          {label && <span className="text-[11px] font-semibold text-slate-700 mt-1">{label}</span>}
        </div>
      );

    default:
      return (
        <div className={`inline-flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 p-2 ${className}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
      );
  }
}
