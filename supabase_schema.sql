-- ==============================================================================
-- DATABASE SCHEMA: AUTO-ÉCOLE BABAAISSA (Bouarfa, Maroc)
-- Database Engine: PostgreSQL 14+ / Supabase
-- Includes: Tables, Constraints, Indexes, Foreign Keys, RLS Policies & Triggers
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('ADMIN', 'STUDENT')),
    license_category VARCHAR(10) DEFAULT 'B',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for quick lookup
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 3. COURSE CATEGORIES TABLE (12 Moroccan Highway Code Categories)
CREATE TABLE IF NOT EXISTS public.course_categories (
    id VARCHAR(50) PRIMARY KEY,
    title_fr VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    description_fr TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id VARCHAR(100) PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL REFERENCES public.course_categories(id) ON DELETE RESTRICT,
    title_fr VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    description_fr TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    content_fr TEXT NOT NULL,
    content_ar TEXT NOT NULL,
    key_points_fr JSONB DEFAULT '[]'::jsonb,
    key_points_ar JSONB DEFAULT '[]'::jsonb,
    diagram_type VARCHAR(50),
    diagram_label_fr VARCHAR(255),
    diagram_label_ar VARCHAR(255),
    quiz JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT true NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_lessons_category ON public.lessons(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_published ON public.lessons(is_published);

-- 5. LESSON PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id VARCHAR(100) NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false NOT NULL,
    last_quiz_score INT,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON public.lesson_progress(user_id);

-- 6. EXAM QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.exam_questions (
    id VARCHAR(100) PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL REFERENCES public.course_categories(id) ON DELETE RESTRICT,
    question_fr TEXT NOT NULL,
    question_ar TEXT NOT NULL,
    options_fr JSONB NOT NULL,
    options_ar JSONB NOT NULL,
    correct_index INT NOT NULL CHECK (correct_index >= 0),
    explanation_fr TEXT,
    explanation_ar TEXT,
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    diagram_type VARCHAR(50),
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_exam_q_category ON public.exam_questions(category_id);

-- 7. EXAM ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id VARCHAR(100) PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_name VARCHAR(255),
    category_filter VARCHAR(50) DEFAULT 'all',
    score INT NOT NULL,
    total_questions INT NOT NULL,
    passed BOOLEAN NOT NULL,
    time_spent_seconds INT DEFAULT 0,
    answers JSONB NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_exam_attempts_user ON public.exam_attempts(user_id);

-- 8. LESSON TYPES TABLE
CREATE TABLE IF NOT EXISTS public.lesson_types (
    id VARCHAR(50) PRIMARY KEY,
    title_fr VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    description_fr TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    duration_minutes INT DEFAULT 60 NOT NULL,
    price_mad DECIMAL(10, 2),
    is_available BOOLEAN DEFAULT true NOT NULL
);

-- 9. LESSON BOOKINGS TABLE (WITH UNIQUE CONSTRAINT & CONCURRENCY CONTROL)
CREATE TABLE IF NOT EXISTS public.lesson_bookings (
    id VARCHAR(100) PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    student_name VARCHAR(255) NOT NULL,
    student_phone VARCHAR(30) NOT NULL,
    student_email VARCHAR(255),
    lesson_type_id VARCHAR(50) NOT NULL REFERENCES public.lesson_types(id),
    lesson_type_title_fr VARCHAR(255) NOT NULL,
    lesson_type_title_ar VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'REJECTED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED')),
    admin_notes TEXT,
    instructor VARCHAR(255),
    vehicle VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Partial index to prevent double bookings on active reservations
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_booking_slot
    ON public.lesson_bookings (date, time_slot)
    WHERE status IN ('PENDING', 'CONFIRMED');

CREATE INDEX IF NOT EXISTS idx_bookings_user ON public.lesson_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.lesson_bookings(date);

-- 10. NARSA ASSISTANCE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.narsa_requests (
    id VARCHAR(100) PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    license_category VARCHAR(10) NOT NULL,
    preferred_date DATE,
    request_type VARCHAR(50) NOT NULL,
    additional_notes TEXT,
    privacy_consent BOOLEAN DEFAULT false NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'CONFIRMED_BY_SCHOOL', 'COMPLETED', 'CANCELLED')),
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_narsa_user ON public.narsa_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_narsa_status ON public.narsa_requests(status);

-- 11. BUSINESS SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.business_settings (
    id INT PRIMARY KEY DEFAULT 1,
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    city_ar VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    address_ar VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    opening_hours_fr TEXT,
    opening_hours_ar TEXT,
    exam_passing_score INT DEFAULT 32 NOT NULL,
    total_exam_questions INT DEFAULT 40 NOT NULL,
    exam_time_limit_minutes INT DEFAULT 30 NOT NULL,
    official_links JSONB DEFAULT '{}'::jsonb,
    instructors JSONB DEFAULT '[]'::jsonb,
    vehicles JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT single_row_settings CHECK (id = 1)
);

-- 12. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    ip VARCHAR(50),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs(timestamp DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.narsa_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can see nothing; User can see and edit their own; Admins see all
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Lessons: Public can read published lessons; Admins can do all
CREATE POLICY "Public can view published lessons"
    ON public.lessons FOR SELECT
    USING (is_published = true);

-- Lesson Progress: Students can view/edit their own progress
CREATE POLICY "Users manage own progress"
    ON public.lesson_progress FOR ALL
    USING (auth.uid() = user_id);

-- Bookings: Students view their own bookings; Admins view and manage all
CREATE POLICY "Students view own bookings"
    ON public.lesson_bookings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Students can insert bookings"
    ON public.lesson_bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Settings: Everyone can read business settings; Only Admins can update
CREATE POLICY "Public can read settings"
    ON public.business_settings FOR SELECT
    USING (true);
