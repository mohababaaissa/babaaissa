// Official business information - Auto-école Babaaissa
// Verified details as per official mandate. No invented contact details or hours.

export const BUSINESS_INFO = {
  name: "Auto-école Babaaissa",
  nameAr: "مدرسة تعليم السياقة باباعيسى",
  city: "Bouarfa",
  cityAr: "بوعرفة",
  country: "Maroc",
  countryAr: "المغرب",
  address: "Hay Al Wahda N°1, Bouarfa",
  addressAr: "حي الوحدة رقم 1، بوعرفة",
  phone: "0626783160",
  phoneFormatted: "06 26 78 31 60",
  phoneIntl: "+212626783160",
  whatsappNumber: "212626783160",
  currency: "MAD",
  currencySymbolFr: "DH",
  currencySymbolAr: "د.م.",
  whatsappMessages: {
    fr: "Bonjour Auto-école Babaaissa, je souhaite obtenir des informations sur vos cours de conduite.",
    ar: "السلام عليكم، أريد الحصول على معلومات حول دروس السياقة في مدرسة باباعيسى.",
  },
  officialLinks: {
    narsaPortal: "https://www.narsa.ma",
    narsaServices: "https://narsa.ma/fr/nos-services/permis-de-conduire",
    khadamatNarsa: "https://khadamat.narsa.gov.ma",
  },
  colors: {
    primary: "#072445", // Deep Navy Blue
    secondary: "#ffffff",
    accent: "#10b981", // Vibrant Green
  },
  defaultSettings: {
    workingDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    openingHoursPlaceholderFr: "Du Lundi au Samedi : 08h30 - 18h30 (Heures configurables)",
    openingHoursPlaceholderAr: "من الإثنين إلى السبت: 08:30 - 18:30 (ساعات قابلة للتعديل)",
    lessonDurationMinutes: 60,
    examPassingScore: 32, // Out of 40 in standard Moroccan simulation
    totalExamQuestions: 40,
    examTimeLimitMinutes: 30,
  }
} as const;

export function getWhatsAppLink(lang: "fr" | "ar" = "fr"): string {
  const msg = lang === "ar" ? BUSINESS_INFO.whatsappMessages.ar : BUSINESS_INFO.whatsappMessages.fr;
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
