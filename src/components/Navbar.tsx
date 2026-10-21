'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageProvider';
import { useAuth } from './AuthProvider';
import {
  Menu,
  X,
  User,
  Shield,
  CalendarCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isRTL, language } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Uniform, balanced links across the bar
  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/code-de-la-route', label: t.nav.courses },
    { href: '/examens-blancs', label: t.nav.exams },
    { href: '/lecons-conduite', label: t.nav.lessons },
    { href: '/espace-narsa', label: t.nav.narsa },
    { href: '/a-propos', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Logo size="md" />
          </div>

          {/* Center: Evenly spaced desktop navigation links */}
          <nav className="hidden xl:flex items-center justify-center gap-1 2xl:gap-1.5 flex-1 max-w-2xl px-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`h-9 inline-flex items-center justify-center px-3 rounded-lg text-[13px] 2xl:text-sm font-semibold tracking-normal transition-all whitespace-nowrap ${
                    active
                      ? 'bg-slate-100 text-[#072445] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-[#072445] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Balanced Action Items with matching h-9 height */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Quick Action: Réserver une leçon */}
            <Link
              href="/reserver-lecon"
              className="h-9 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow transition transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{t.nav.booking}</span>
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-1.5">
                {user.role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    className="h-9 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] text-white text-xs font-bold transition shadow-sm whitespace-nowrap"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.nav.admin}</span>
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="h-9 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition whitespace-nowrap"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.nav.dashboard}</span>
                  </Link>
                )}

                <button
                  onClick={() => logout()}
                  title={t.nav.logout}
                  className="h-9 w-9 inline-flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  <LogOut className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/connexion"
                  className="h-9 inline-flex items-center px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition whitespace-nowrap"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/inscription"
                  className="h-9 inline-flex items-center px-3.5 rounded-xl text-xs font-bold bg-[#072445] hover:bg-[#0c3d6e] text-white shadow-sm transition whitespace-nowrap"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    active
                      ? 'bg-slate-100 text-[#072445] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/reserver-lecon"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" />
                <span>{t.nav.booking}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <div className="flex flex-col gap-2">
                {user.role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#072445] text-white text-sm font-bold"
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>{t.nav.admin}</span>
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-bold"
                  >
                    <User className="w-4 h-4" />
                    <span>{t.nav.dashboard}</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-sm font-semibold"
                >
                  <LogOut className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  <span>{t.nav.logout}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm font-bold hover:bg-slate-50"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/inscription"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-lg bg-[#072445] text-white text-sm font-bold hover:bg-[#0c3d6e]"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
