'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import {
  Lock,
  Mail,
  Shield,
  User,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const { t, language, isRTL } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success && res.user) {
      if (res.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      setErrorMsg(res.error || t.auth.loginError);
    }
  };

  const autofillAdmin = () => {
    setEmail('admin@babaaissa.ma');
    setPassword('AdminBabaaissa2026!');
    setErrorMsg('');
  };

  const autofillStudent = () => {
    setEmail('eleve@babaaissa.ma');
    setPassword('EleveBabaaissa2026!');
    setErrorMsg('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 space-y-8">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#072445]">
          {t.auth.loginTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.auth.loginSubtitle}
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {t.auth.emailLabel}
            </label>
            <div className="relative">
              <Mail className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre-email@exemple.ma"
                className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {t.auth.passwordLabel}
            </label>
            <div className="relative">
              <Lock className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] text-white font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            {isSubmitting ? t.common.loading : t.auth.loginBtn}
          </button>
        </form>

        {/* Demo Accounts Quick-Fill Section */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.auth.demoCredentialsTitle}</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={autofillAdmin}
              className="w-full p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left text-xs text-slate-700 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="font-semibold">{t.auth.fillAdmin}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">admin@babaaissa.ma</span>
            </button>

            <button
              type="button"
              onClick={autofillStudent}
              className="w-full p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left text-xs text-slate-700 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">{t.auth.fillStudent}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">eleve@babaaissa.ma</span>
            </button>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-500">
          <span>{t.auth.noAccount} </span>
          <Link href="/inscription" className="text-emerald-600 font-bold hover:underline">
            {t.nav.register}
          </Link>
        </div>
      </div>

    </div>
  );
}
