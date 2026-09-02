-- Migration 003: job_listings, job_skills, applications
-- Jalankan setelah 002

CREATE TABLE public.job_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT,
  salary_range TEXT,
  job_types TEXT[] DEFAULT '{}',
  description TEXT,
  accessibility_features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone logged in can view active listings" ON public.job_listings
  FOR SELECT USING (is_active = true);
CREATE POLICY "Companies can manage own listings" ON public.job_listings
  FOR ALL USING (auth.uid() = company_id);
CREATE TRIGGER set_job_listings_updated_at
  BEFORE UPDATE ON public.job_listings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Job Skills
CREATE TABLE public.job_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.job_listings(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL
);

ALTER TABLE public.job_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone logged in can view job skills" ON public.job_skills
  FOR SELECT USING (true);
CREATE POLICY "Companies can manage own job skills" ON public.job_skills
  FOR ALL USING (
    auth.uid() = (SELECT company_id FROM public.job_listings WHERE id = job_id)
  );

-- Applications
CREATE TABLE public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.job_listings(id) ON DELETE CASCADE NOT NULL,
  applicant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, applicant_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Applicants can view own applications" ON public.applications
  FOR SELECT USING (auth.uid() = applicant_id);
CREATE POLICY "Applicants can insert own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);
CREATE POLICY "Companies can view their job applications" ON public.applications
  FOR SELECT USING (
    auth.uid() = (SELECT company_id FROM public.job_listings WHERE id = job_id)
  );
CREATE POLICY "Companies can update application status" ON public.applications
  FOR UPDATE USING (
    auth.uid() = (SELECT company_id FROM public.job_listings WHERE id = job_id)
  );
CREATE TRIGGER set_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
