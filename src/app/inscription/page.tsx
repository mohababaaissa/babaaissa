'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import {
  User,
  Mail,
  Lock,
  Phone,
  Car,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export default function RegisterPage() {
  const { t, isRTL } = useLanguage();
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('0626783160');
  const [password, setPassword] = useState('');
  const [licenseCategory, setLicenseCategory] = useState('B');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = await register({
      name,
      email,
      phone,
      password,
      licenseCategory,
    });
    setIsSubmitting(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setErrorMsg(res.error || "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 space-y-8">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#072445]">
          {t.auth.registerTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.auth.registerSubtitle}
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
              {t.auth.nameLabel} *
            </label>
            <div className="relative">
              <User className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Yassine Berrada"
                className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {t.auth.emailLabel} *
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
              {t.auth.phoneLabel} *
            </label>
            <div className="relative">
              <Phone className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0626783160"
                className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {t.auth.licenseCategoryLabel}
            </label>
            <select
              value={licenseCategory}
              onChange={(e) => setLicenseCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="B">Permis B (Voiture légère)</option>
              <option value="A">Permis A (Moto)</option>
              <option value="C">Permis C (Poids lourd)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {t.auth.passwordLabel} *
            </label>
            <div className="relative">
              <Lock className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed pt-1">
            {t.auth.privacyNotice}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            {isSubmitting ? t.common.loading : t.auth.registerBtn}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          <span>{t.auth.haveAccount} </span>
          <Link href="/connexion" className="text-emerald-600 font-bold hover:underline">
            {t.nav.login}
          </Link>
        </div>
      </div>

    </div>
  );
}
