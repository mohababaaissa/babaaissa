import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  User,
  CourseCategory,
  Lesson,
  LessonProgress,
  ExamQuestion,
  ExamAttempt,
  LessonType,
  LessonBooking,
  NarsaAssistanceRequest,
  BusinessSettings,
  AuditLog,
  BookingStatus,
} from './types';
import {
  initialCategories,
  initialLessons,
  initialExamQuestions,
  initialLessonTypes,
  initialBusinessSettings,
  initialUsers,
} from '@/data/seedData';

export interface DatabaseSchema {
  users: User[];
  categories: CourseCategory[];
  lessons: Lesson[];
  lessonProgress: LessonProgress[];
  examQuestions: ExamQuestion[];
  examAttempts: ExamAttempt[];
  lessonTypes: LessonType[];
  bookings: LessonBooking[];
  narsaRequests: NarsaAssistanceRequest[];
  settings: BusinessSettings;
  auditLogs: AuditLog[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

// In-memory cache
let cachedDb: DatabaseSchema | null = null;
let isWriting = false;

function getDefaultDatabase(): DatabaseSchema {
  return {
    users: [...initialUsers],
    categories: [...initialCategories],
    lessons: [...initialLessons],
    lessonProgress: [
      {
        userId: 'usr-student-01',
        lessonId: 'lesson-road-signs-danger',
        completed: true,
        completedAt: '2026-01-16T14:30:00Z',
        lastQuizScore: 1,
      }
    ],
    examQuestions: [...initialExamQuestions],
    examAttempts: [
      {
        id: 'attempt-demo-1',
        userId: 'usr-student-01',
        userName: 'Mohamed El Alami',
        categoryFilter: 'all',
        score: 35,
        totalQuestions: 40,
        passed: true,
        timeSpentSeconds: 1140,
        completedAt: '2026-01-18T16:20:00Z',
        answers: [],
      }
    ],
    lessonTypes: [...initialLessonTypes],
    bookings: [
      {
        id: 'book-demo-1',
        reference: 'BAB-2026-0842',
        userId: 'usr-student-01',
        studentName: 'Mohamed El Alami',
        studentPhone: '0612345678',
        studentEmail: 'eleve@babaaissa.ma',
        lessonTypeId: 'city',
        lessonTypeTitleFr: 'Conduite Urbaine',
        lessonTypeTitleAr: 'السياقة في المدينة',
        date: '2026-10-25',
        timeSlot: '10:00 - 11:00',
        status: 'CONFIRMED',
        instructor: 'Moniteur Babaaissa',
        vehicle: 'Dacia Sandero Stepway',
        createdAt: '2026-10-18T09:00:00Z',
        updatedAt: '2026-10-18T10:00:00Z',
      }
    ],
    narsaRequests: [
      {
        id: 'narsa-demo-1',
        reference: 'NAR-2026-103',
        userId: 'usr-student-01',
        fullName: 'Mohamed El Alami',
        phone: '0612345678',
        licenseCategory: 'B',
        requestType: 'theory_exam',
        preferredDate: '2026-11-10',
        privacyConsent: true,
        status: 'IN_PROGRESS',
        internalNotes: 'Dossier CIN et certificat médical reçus à Hay Al Wahda. Attente validation créneau.',
        createdAt: '2026-10-19T11:00:00Z',
        updatedAt: '2026-10-19T14:00:00Z',
      }
    ],
    settings: { ...initialBusinessSettings },
    auditLogs: [
      {
        id: 'log-1',
        userId: 'usr-admin-01',
        userName: 'Directeur Babaaissa',
        action: 'SYSTEM_INIT',
        details: 'Initialisation de la plateforme Auto-école Babaaissa à Bouarfa.',
        timestamp: '2026-01-01T08:00:00Z',
      }
    ]
  };
}

export function getDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      cachedDb = JSON.parse(data);
      return cachedDb!;
    }
  } catch (err) {
    console.error('Error reading database file, using default seed:', err);
  }

  if (!cachedDb) {
    cachedDb = getDefaultDatabase();
    saveDb(cachedDb);
  }
  return cachedDb;
}

export function saveDb(db: DatabaseSchema): void {
  cachedDb = db;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    // Atomic write
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error saving database to disk:', err);
  }
}

// Transactional lock helper for concurrency protection
export async function withLock<T>(fn: () => Promise<T> | T): Promise<T> {
  while (isWriting) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  isWriting = true;
  try {
    return await fn();
  } finally {
    isWriting = false;
  }
}

// ----------------- USER HELPERS -----------------
export function findUserByEmail(email: string): User | undefined {
  const db = getDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  const db = getDb();
  return db.users.find((u) => u.id === id);
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const db = getDb();
  const newUser: User = {
    ...user,
    id: `usr-${crypto.randomBytes(4).toString('hex')}`,
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  saveDb(db);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const db = getDb();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  db.users[index] = { ...db.users[index], ...updates };
  saveDb(db);
  return db.users[index];
}

// ----------------- LESSON & PROGRESS HELPERS -----------------
export function getCategories(): CourseCategory[] {
  return getDb().categories;
}

export function getLessons(categoryId?: string): Lesson[] {
  const db = getDb();
  if (categoryId) {
    return db.lessons.filter((l) => l.categoryId === categoryId && l.isPublished);
  }
  return db.lessons;
}

export function getLessonById(id: string): Lesson | undefined {
  return getDb().lessons.find((l) => l.id === id);
}

export function saveLesson(lesson: Partial<Lesson> & { titleFr: string; categoryId: any }): Lesson {
  const db = getDb();
  if (lesson.id) {
    const idx = db.lessons.findIndex((l) => l.id === lesson.id);
    if (idx !== -1) {
      db.lessons[idx] = { ...db.lessons[idx], ...lesson };
      saveDb(db);
      return db.lessons[idx];
    }
  }
  const newLesson: Lesson = {
    id: `lesson-${Date.now()}`,
    categoryId: lesson.categoryId,
    titleFr: lesson.titleFr,
    titleAr: lesson.titleAr || lesson.titleFr,
    descriptionFr: lesson.descriptionFr || '',
    descriptionAr: lesson.descriptionAr || '',
    contentFr: lesson.contentFr || '',
    contentAr: lesson.contentAr || '',
    keyPointsFr: lesson.keyPointsFr || [],
    keyPointsAr: lesson.keyPointsAr || [],
    isPublished: lesson.isPublished ?? true,
    order: lesson.order ?? db.lessons.length + 1,
    createdAt: new Date().toISOString(),
    quiz: lesson.quiz || [],
  };
  db.lessons.push(newLesson);
  saveDb(db);
  return newLesson;
}

export function deleteLesson(id: string): boolean {
  const db = getDb();
  const beforeLen = db.lessons.length;
  db.lessons = db.lessons.filter((l) => l.id !== id);
  saveDb(db);
  return db.lessons.length < beforeLen;
}

export function getUserProgress(userId: string): LessonProgress[] {
  return getDb().lessonProgress.filter((p) => p.userId === userId);
}

export function markLessonProgress(userId: string, lessonId: string, completed: boolean, quizScore?: number): LessonProgress {
  const db = getDb();
  const idx = db.lessonProgress.findIndex((p) => p.userId === userId && p.lessonId === lessonId);
  const now = new Date().toISOString();

  if (idx !== -1) {
    db.lessonProgress[idx].completed = completed;
    if (completed) db.lessonProgress[idx].completedAt = now;
    if (quizScore !== undefined) db.lessonProgress[idx].lastQuizScore = quizScore;
    saveDb(db);
    return db.lessonProgress[idx];
  }

  const newProg: LessonProgress = {
    userId,
    lessonId,
    completed,
    completedAt: completed ? now : undefined,
    lastQuizScore: quizScore,
  };
  db.lessonProgress.push(newProg);
  saveDb(db);
  return newProg;
}

// ----------------- EXAMS HELPERS -----------------
export function getExamQuestions(categoryId?: string): ExamQuestion[] {
  const db = getDb();
  let questions = db.examQuestions.filter((q) => q.isPublished);
  if (categoryId && categoryId !== 'all') {
    questions = questions.filter((q) => q.categoryId === categoryId);
  }
  return questions;
}

export function saveExamQuestion(question: Partial<ExamQuestion> & { questionFr: string; optionsFr: string[]; correctIndex: number }): ExamQuestion {
  const db = getDb();
  if (question.id) {
    const idx = db.examQuestions.findIndex((q) => q.id === question.id);
    if (idx !== -1) {
      db.examQuestions[idx] = { ...db.examQuestions[idx], ...question };
      saveDb(db);
      return db.examQuestions[idx];
    }
  }
  const newQ: ExamQuestion = {
    id: `exam-q-${Date.now()}`,
    categoryId: question.categoryId || 'road-signs',
    questionFr: question.questionFr,
    questionAr: question.questionAr || question.questionFr,
    optionsFr: question.optionsFr,
    optionsAr: question.optionsAr || question.optionsFr,
    correctIndex: question.correctIndex,
    explanationFr: question.explanationFr || '',
    explanationAr: question.explanationAr || '',
    difficulty: question.difficulty || 'medium',
    isPublished: question.isPublished ?? true,
    createdAt: new Date().toISOString(),
  };
  db.examQuestions.push(newQ);
  saveDb(db);
  return newQ;
}

export function deleteExamQuestion(id: string): boolean {
  const db = getDb();
  const initLen = db.examQuestions.length;
  db.examQuestions = db.examQuestions.filter((q) => q.id !== id);
  saveDb(db);
  return db.examQuestions.length < initLen;
}

export function recordExamAttempt(attempt: Omit<ExamAttempt, 'id' | 'completedAt'>): ExamAttempt {
  const db = getDb();
  const newAttempt: ExamAttempt = {
    ...attempt,
    id: `attempt-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    completedAt: new Date().toISOString(),
  };
  db.examAttempts.unshift(newAttempt);
  saveDb(db);
  return newAttempt;
}

export function getUserExamAttempts(userId: string): ExamAttempt[] {
  return getDb().examAttempts.filter((a) => a.userId === userId);
}

// ----------------- BOOKING HELPERS (WITH CONCURRENCY LOCK & DOUBLE-BOOKING CHECK) -----------------
export async function createLessonBooking(
  bookingData: Omit<LessonBooking, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; booking?: LessonBooking; error?: string }> {
  return withLock(async () => {
    const db = getDb();

    // Check if slot is already booked and active (PENDING or CONFIRMED)
    const existing = db.bookings.find(
      (b) =>
        b.date === bookingData.date &&
        b.timeSlot === bookingData.timeSlot &&
        (b.status === 'PENDING' || b.status === 'CONFIRMED')
    );

    if (existing) {
      return {
        success: false,
        error: 'Ce créneau horaire est déjà réservé. Veuillez choisir un autre créneau.',
      };
    }

    const reference = `BAB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newBooking: LessonBooking = {
      ...bookingData,
      id: `book-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      reference,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    };

    db.bookings.unshift(newBooking);
    saveDb(db);

    return {
      success: true,
      booking: newBooking,
    };
  });
}

export function updateBookingStatus(
  id: string,
  status: BookingStatus,
  adminNotes?: string,
  instructor?: string,
  vehicle?: string
): LessonBooking | null {
  const db = getDb();
  const idx = db.bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  db.bookings[idx].status = status;
  db.bookings[idx].updatedAt = new Date().toISOString();
  if (adminNotes !== undefined) db.bookings[idx].adminNotes = adminNotes;
  if (instructor !== undefined) db.bookings[idx].instructor = instructor;
  if (vehicle !== undefined) db.bookings[idx].vehicle = vehicle;

  saveDb(db);
  return db.bookings[idx];
}

export function getBookedSlotsForDate(date: string): string[] {
  const db = getDb();
  return db.bookings
    .filter((b) => b.date === date && (b.status === 'PENDING' || b.status === 'CONFIRMED'))
    .map((b) => b.timeSlot);
}

// ----------------- NARSA REQUEST HELPERS -----------------
export function createNarsaRequest(
  data: Omit<NarsaAssistanceRequest, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt'>
): NarsaAssistanceRequest {
  const db = getDb();
  const reference = `NAR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date().toISOString();

  const newReq: NarsaAssistanceRequest = {
    ...data,
    id: `narsa-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    reference,
    status: 'PENDING',
    createdAt: now,
    updatedAt: now,
  };

  db.narsaRequests.unshift(newReq);
  saveDb(db);
  return newReq;
}

export function updateNarsaRequestStatus(
  id: string,
  status: NarsaAssistanceRequest['status'],
  internalNotes?: string
): NarsaAssistanceRequest | null {
  const db = getDb();
  const idx = db.narsaRequests.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  db.narsaRequests[idx].status = status;
  db.narsaRequests[idx].updatedAt = new Date().toISOString();
  if (internalNotes !== undefined) {
    db.narsaRequests[idx].internalNotes = internalNotes;
  }

  saveDb(db);
  return db.narsaRequests[idx];
}

// ----------------- SETTINGS & AUDIT -----------------
export function updateBusinessSettings(newSettings: Partial<BusinessSettings>): BusinessSettings {
  const db = getDb();
  db.settings = { ...db.settings, ...newSettings };
  saveDb(db);
  return db.settings;
}

export function addAuditLog(userId: string, userName: string, action: string, details: string): void {
  const db = getDb();
  db.auditLogs.unshift({
    id: `log-${Date.now()}`,
    userId,
    userName,
    action,
    details,
    timestamp: new Date().toISOString(),
  });
  if (db.auditLogs.length > 500) {
    db.auditLogs = db.auditLogs.slice(0, 500);
  }
  saveDb(db);
}
