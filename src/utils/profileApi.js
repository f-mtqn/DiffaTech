import { supabase } from './supabaseClient';

// ===========================
// PROFILE
// ===========================

/**
 * Load semua data profil pencari kerja dari Supabase
 */
export async function loadJobSeekerProfile(userId) {
  const [
    { data: profile },
    { data: jsProfile },
    { data: experiences },
    { data: certifications },
    { data: skills },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
    supabase.from('job_seeker_profiles').select('*').eq('id', userId).maybeSingle(),
    supabase.from('experiences').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    supabase.from('certifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    supabase.from('user_skills').select('*').eq('user_id', userId).order('created_at', { ascending: true }),
  ]);

  return { profile, jsProfile, experiences: experiences || [], certifications: certifications || [], skills: skills || [] };
}

/**
 * Simpan/update profil pencari kerja ke Supabase
 */
export async function saveJobSeekerProfile(userId, { namaLengkap, about, address, cvUrl, disabilityTypes, jobTypePreferences, lastEducation, educationYear }) {
  // Update tabel profiles (nama)
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: namaLengkap, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (profileError) throw profileError;

  // Upsert tabel job_seeker_profiles
  const { error: jsError } = await supabase
    .from('job_seeker_profiles')
    .upsert({
      id: userId,
      about,
      address,
      cv_url: cvUrl,
      disability_types: disabilityTypes,
      job_type_preferences: jobTypePreferences,
      last_education: lastEducation,
      education_year: educationYear,
      updated_at: new Date().toISOString(),
    });

  if (jsError) throw jsError;
}

/**
 * Simpan pengalaman kerja (replace semua)
 */
export async function saveExperiences(userId, experiences) {
  // Hapus semua pengalaman lama
  await supabase.from('experiences').delete().eq('user_id', userId);

  if (experiences.length === 0) return;

  const rows = experiences
    .filter(e => e.posisi?.trim())
    .map(e => ({
      user_id: userId,
      position: e.posisi,
      company_name: e.perusahaan,
      start_date: e.mulaiKerja,
      end_date: e.akhirKerja,
    }));

  if (rows.length > 0) {
    const { error } = await supabase.from('experiences').insert(rows);
    if (error) throw error;
  }
}

/**
 * Simpan sertifikasi (replace semua)
 */
export async function saveCertifications(userId, certUrls) {
  await supabase.from('certifications').delete().eq('user_id', userId);

  const rows = certUrls
    .filter(url => url?.trim())
    .map(url => ({ user_id: userId, cert_url: url }));

  if (rows.length > 0) {
    const { error } = await supabase.from('certifications').insert(rows);
    if (error) throw error;
  }
}

/**
 * Simpan skills (replace semua)
 */
export async function saveSkills(userId, skillNames) {
  await supabase.from('user_skills').delete().eq('user_id', userId);

  const rows = skillNames
    .filter(s => s?.trim())
    .map(s => ({ user_id: userId, skill_name: s }));

  if (rows.length > 0) {
    const { error } = await supabase.from('user_skills').insert(rows);
    if (error) throw error;
  }
}

// ===========================
// JOB LISTINGS
// ===========================

/**
 * Load semua lowongan aktif + skills per lowongan
 */
export async function loadJobListings({ search = '', jobType = null } = {}) {
  let query = supabase
    .from('job_listings')
    .select(`
      *,
      job_skills (skill_name)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%,company_name.ilike.%${search}%,location.ilike.%${search}%`);
  }

  if (jobType) {
    query = query.contains('job_types', [jobType]);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ===========================
// APPLICATIONS
// ===========================

/**
 * Lamar lowongan
 */
export async function applyToJob(userId, jobId, coverLetter = '') {
  const { data, error } = await supabase
    .from('applications')
    .insert({ job_id: jobId, applicant_id: userId, cover_letter: coverLetter, status: 'review' })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

/**
 * Cek apakah user sudah melamar lowongan tertentu
 */
export async function hasApplied(userId, jobId) {
  const { data } = await supabase
    .from('applications')
    .select('id')
    .eq('applicant_id', userId)
    .eq('job_id', jobId)
    .single();

  return !!data;
}

/**
 * Load semua lamaran user
 */
export async function loadMyApplications(userId) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      job_listings (title, company_name, location, job_types)
    `)
    .eq('applicant_id', userId)
    .order('applied_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// ===========================
// NOTIFICATIONS
// ===========================

/**
 * Load notifikasi user
 */
export async function loadNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Tandai notifikasi sebagai sudah dibaca
 */
export async function markNotificationRead(notifId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notifId);

  if (error) throw error;
}
