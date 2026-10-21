export type Role = 'ADMIN' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  licenseCategory?: string; // e.g. "B" (Véhicule léger), "A", "C"
  passwordHash?: string;
  createdAt: string;
}

export type CourseCategoryId =
  | 'road-signs'
  | 'traffic-lights'
  | 'priority-rules'
  | 'intersections-roundabouts'
  | 'speed-limits'
  | 'overtaking'
  | 'parking-stopping'
  | 'safety-distances'
  | 'vulnerable-users'
  | 'defensive-driving'
  | 'vehicle-safety'
  | 'general-traffic-rules';

export interface CourseCategory {
  id: CourseCategoryId;
  titleFr: string;
  titleAr: string;
  descriptionFr: string;
  descriptionAr: string;
  icon: string;
  order: number;
}

export interface QuizQuestion {
  id: string;
  questionFr: string;
  questionAr: string;
  optionsFr: string[];
  optionsAr: string[];
  correctIndex: number;
  explanationFr: string;
  explanationAr: string;
}

export interface Lesson {
  id: string;
  categoryId: CourseCategoryId;
  titleFr: string;
  titleAr: string;
  descriptionFr: string;
  descriptionAr: string;
  contentFr: string;
  contentAr: string;
  keyPointsFr: string[];
  keyPointsAr: string[];
  diagramType?: string; // Type of SVG visual diagram
  diagramLabelFr?: string;
  diagramLabelAr?: string;
  quiz?: QuizQuestion[];
  isPublished: boolean;
  order: number;
  createdAt: string;
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  lastQuizScore?: number;
}

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface ExamQuestion {
  id: string;
  categoryId: CourseCategoryId;
  questionFr: string;
  questionAr: string;
  optionsFr: string[];
  optionsAr: string[];
  correctIndex: number; // 0-based
  explanationFr: string;
  explanationAr: string;
  difficulty: QuestionDifficulty;
  diagramType?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface ExamAttempt {
  id: string;
  userId?: string;
  userName?: string;
  categoryFilter?: string; // 'all' or specific category
  score: number;
  totalQuestions: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
  answers: {
    questionId: string;
    selectedOption: number;
    correctOption: number;
    isCorrect: boolean;
  }[];
}

export type LessonTypeId =
  | 'beginner'
  | 'city'
  | 'parking'
  | 'practice'
  | 'exam-prep';

export interface LessonType {
  id: LessonTypeId;
  titleFr: string;
  titleAr: string;
  descriptionFr: string;
  descriptionAr: string;
  durationMinutes: number;
  priceMAD?: number; // Optional placeholder editable by admin
  isAvailable: boolean;
}

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'REJECTED'
  | 'RESCHEDULED'
  | 'CANCELLED'
  | 'COMPLETED';

export interface LessonBooking {
  id: string;
  reference: string; // e.g. "BAB-2026-XXXX"
  userId?: string;
  studentName: string;
  studentPhone: string;
  studentEmail?: string;
  lessonTypeId: LessonTypeId;
  lessonTypeTitleFr: string;
  lessonTypeTitleAr: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // "09:00 - 10:00"
  status: BookingStatus;
  adminNotes?: string;
  instructor?: string;
  vehicle?: string;
  createdAt: string;
  updatedAt: string;
}

export type NarsaRequestStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'CONFIRMED_BY_SCHOOL'
  | 'COMPLETED'
  | 'CANCELLED';

export interface NarsaAssistanceRequest {
  id: string;
  reference: string;
  userId?: string;
  fullName: string;
  phone: string;
  licenseCategory: string; // "B", "A", "C", "D", "EB"
  preferredDate?: string;
  requestType: 'theory_exam' | 'practical_exam' | 'file_deposit' | 'renewal' | 'general_info';
  additionalNotes?: string;
  privacyConsent: boolean;
  status: NarsaRequestStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessSettings {
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  address: string;
  addressAr: string;
  phone: string;
  openingHoursFr: string;
  openingHoursAr: string;
  examPassingScore: number;
  totalExamQuestions: number;
  examTimeLimitMinutes: number;
  officialLinks: {
    narsaPortal: string;
    narsaServices: string;
    khadamatNarsa: string;
  };
  instructors: string[];
  vehicles: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  ip?: string;
  timestamp: string;
}
