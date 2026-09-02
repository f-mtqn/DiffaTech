-- Migration 002: job_seeker_profiles, experiences, certifications, user_skills
-- Jalankan setelah 001

CREATE TABLE public.job_seeker_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  about TEXT,
  address TEXT,
  cv_url TEXT,
  disability_types TEXT[] DEFAULT '{}',
  job_type_preferences TEXT[] DEFAULT '{}',
  last_education TEXT,
  education_year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.job_seeker_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Job seekers can view own profile" ON public.job_seeker_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Job seekers can insert own profile" ON public.job_seeker_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Job seekers can update own profile" ON public.job_seeker_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE TRIGGER set_job_seeker_profiles_updated_at
  BEFORE UPDATE ON public.job_seeker_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Experiences
CREATE TABLE public.experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  position TEXT NOT NULL,
  company_name TEXT,
  start_date TEXT,
  end_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own experiences" ON public.experiences
  FOR ALL USING (auth.uid() = user_id);

-- Certifications
CREATE TABLE public.certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  cert_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own certifications" ON public.certifications
  FOR ALL USING (auth.uid() = user_id);

-- Skills
CREATE TABLE public.user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own skills" ON public.user_skills
  FOR ALL USING (auth.uid() = user_id);
