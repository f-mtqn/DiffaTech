import { supabase } from './supabaseClient';

// ============================================
// JOBS
// ============================================

/** Fetch semua lowongan aktif, opsional filter pencarian */
export async function fetchJobs({ search = '', workType = '', category = '' } = {}) {
  let query = supabase
    .from('job_listings')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%,company_name.ilike.%${search}%,location.ilike.%${search}%`);
  }
  if (workType) {
    query = query.ilike('work_type', `%${workType}%`);
  }
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/** Fetch detail satu lowongan berdasarkan ID */
export async function fetchJobById(id) {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/** Fetch lowongan milik perusahaan yang login */
export async function fetchCompanyJobs(companyId) {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/** Posting lowongan baru */
export async function postJob(jobData) {
  const { data, error } = await supabase
    .from('job_listings')
    .insert([jobData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Update lowongan */
export async function updateJob(id, updates) {
  const { data, error } = await supabase
    .from('job_listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Ubah status aktif / non-aktif lowongan */
export async function toggleJobActive(id, isActive) {
  const { data, error } = await supabase
    .from('job_listings')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Hapus permanen lowongan beserta keterkaitannya */
export async function deleteJob(id) {
  try {
    await supabase.from('job_skills').delete().eq('job_id', id);
    await supabase.from('applications').delete().eq('job_id', id);
  } catch (err) {
    console.warn('Pre-delete cleanup warning:', err);
  }
  const { error } = await supabase
    .from('job_listings')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ============================================
// APPLICATIONS (LAMARAN)
// ============================================

/** Lamar pekerjaan — mudah, lancar & tanpa kendala FK */
export async function applyToJob({ jobId, applicantId, coverNote = '' }) {
  // 1. Pastikan record profil ada di profiles & job_seeker_profiles agar FK tidak gagal
  try {
    await supabase.from('profiles').upsert({ id: applicantId, role: 'job_seeker' }, { onConflict: 'id', ignoreDuplicates: true });
    await supabase.from('job_seeker_profiles').upsert({ id: applicantId }, { onConflict: 'id', ignoreDuplicates: true });
  } catch (syncErr) {
    console.warn('Silent profile sync warning:', syncErr);
  }

  // 2. Cek apakah sudah pernah melamar
  const already = await checkAlreadyApplied(jobId, applicantId);
  if (already) {
    return { id: null, alreadyApplied: true };
  }

  // 3. Masukkan lamaran ke tabel applications
  const { data, error } = await supabase
    .from('applications')
    .insert([{
      job_id: jobId,
      applicant_id: applicantId,
      cover_letter: coverNote,
      status: 'review',
    }])
    .select()
    .single();

  if (error) {
    // Jika unique constraint error, berarti sudah pernah melamar
    if (error.code === '23505') {
      return { id: null, alreadyApplied: true };
    }
    throw error;
  }

  // 4. Kirim notifikasi otomatis ke pihak HRD / Perusahaan
  try {
    const { data: jobData } = await supabase
      .from('job_listings')
      .select('company_id, title')
      .eq('id', jobId)
      .single();

    if (jobData && jobData.company_id) {
      await createNotification({
        userId: jobData.company_id,
        title: 'Pelamar Baru Diterima',
        message: `Kandidat baru melamar posisi "${jobData.title}". Segera tinjau profilnya.`,
        type: 'application',
        category: 'Lamaran Masuk',
        actionText: 'Lihat Pelamar',
        actionLink: `/company-applicants?job=${jobId}`,
      });
    }
  } catch (notifErr) {
    console.warn('Notifikasi perusahaan gagal:', notifErr);
  }

  return data;
}

/** Cek apakah user sudah melamar ke job ini */
export async function checkAlreadyApplied(jobId, applicantId) {
  if (!jobId || !applicantId) return false;
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('id')
      .eq('job_id', jobId)
      .eq('applicant_id', applicantId)
      .maybeSingle();
    if (error) return false;
    return !!data;
  } catch (err) {
    return false;
  }
}

/** Fetch semua lamaran milik pencari kerja (dengan join job_listings) */
export async function fetchMyApplications(applicantId) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      id, status, cover_letter, hr_note, interview_date, has_chat,
      applied_at, updated_at,
      job_listings (
        id, title, company_name, location, work_type,
        salary_range, disability_support, company_logo_letter
      )
    `)
    .eq('applicant_id', applicantId)
    .order('applied_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/** Tarik lamaran (hapus) */
export async function withdrawApplication(applicationId) {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', applicationId);
  if (error) throw error;
}

/** Fetch pelamar untuk sebuah job (sisi perusahaan) */
export async function fetchJobApplicants(jobId) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      id, status, cover_letter, hr_note, interview_date, applied_at,
      applicant_id,
      profiles!applicant_id (id, full_name, avatar_url),
      job_seeker_profiles!applicant_id (
        about, disability_types, job_type_preferences,
        last_education, cv_url
      )
    `)
    .eq('job_id', jobId)
    .order('applied_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/** Fetch semua pelamar untuk semua job milik company */
export async function fetchAllCompanyApplicants(companyId) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      id, status, cover_letter, hr_note, interview_date, applied_at,
      applicant_id,
      profiles!applicant_id (id, full_name, avatar_url),
      job_seeker_profiles!applicant_id (
        about, disability_types, job_type_preferences,
        last_education, cv_url
      ),
      job_listings!job_id (id, title, company_id)
    `)
    .order('applied_at', { ascending: false });
  if (error) throw error;
  // Filter hanya job milik company ini
  const filtered = (data || []).filter(
    (app) => app.job_listings?.company_id === companyId
  );
  return filtered;
}

/** Update status lamaran (terima/tolak) */
export async function updateApplicationStatus(applicationId, status, hrNote = '') {
  const { data, error } = await supabase
    .from('applications')
    .update({ status, hr_note: hrNote, updated_at: new Date().toISOString() })
    .eq('id', applicationId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Fetch detail satu lamaran + profil pelamar */
export async function fetchApplicationDetail(applicationId) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      id, status, cover_letter, hr_note, interview_date, applied_at,
      applicant_id,
      profiles!applicant_id (id, full_name, avatar_url),
      job_seeker_profiles!applicant_id (
        about, disability_types, job_type_preferences,
        last_education, education_year, cv_url
      ),
      job_listings!job_id (id, title, company_id)
    `)
    .eq('id', applicationId)
    .single();
  if (error) throw error;
  return data;
}

// ============================================
// SKILLS (USER)
// ============================================

export async function fetchUserSkills(userId) {
  const { data, error } = await supabase
    .from('user_skills')
    .select('skill_name')
    .eq('user_id', userId);
  if (error) throw error;
  return (data || []).map((s) => s.skill_name);
}

export async function saveUserSkills(userId, skills) {
  // Hapus semua skill lama, masukkan yang baru
  await supabase.from('user_skills').delete().eq('user_id', userId);
  if (skills.length === 0) return;
  const rows = skills.filter(Boolean).map((s) => ({ user_id: userId, skill_name: s }));
  const { error } = await supabase.from('user_skills').insert(rows);
  if (error) throw error;
}

// ============================================
// EXPERIENCES
// ============================================

export async function fetchUserExperiences(userId) {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('user_id', userId)
    .order('created_at');
  if (error) throw error;
  return data || [];
}

export async function saveUserExperiences(userId, experiences) {
  await supabase.from('experiences').delete().eq('user_id', userId);
  const valid = experiences.filter((e) => e.posisi || e.position);
  if (valid.length === 0) return;
  const rows = valid.map((e) => ({
    user_id: userId,
    position: e.posisi || e.position || '',
    company_name: e.perusahaan || e.company_name || '',
    start_date: e.mulaiKerja || e.start_date || '',
    end_date: e.akhirKerja || e.end_date || '',
  }));
  const { error } = await supabase.from('experiences').insert(rows);
  if (error) throw error;
}

// ============================================
// CERTIFICATIONS
// ============================================

export async function fetchUserCertifications(userId) {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data || [];
}

export async function saveUserCertifications(userId, certs) {
  await supabase.from('certifications').delete().eq('user_id', userId);
  const valid = certs.filter(Boolean);
  if (valid.length === 0) return;
  const rows = valid.map((c) => ({ user_id: userId, cert_url: c, title: c }));
  const { error } = await supabase.from('certifications').insert(rows);
  if (error) throw error;
}

// ============================================
// NOTIFICATIONS
// ============================================

/** Fetch notifikasi user (job seeker atau company) */
export async function fetchNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/** Tandai notifikasi sebagai dibaca */
export async function markNotificationRead(notificationId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);
  if (error) throw error;
}

/** Tandai semua notifikasi dibaca */
export async function markAllNotificationsRead(userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId);
  if (error) throw error;
}

/** Hapus notifikasi */
export async function deleteNotification(notificationId) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);
  if (error) throw error;
}

/** Buat notifikasi baru */
export async function createNotification({ userId, title, message, type = 'info', category = 'sistem', actionText = '', actionLink = '', relatedId = null }) {
  const { error } = await supabase
    .from('notifications')
    .insert([{ user_id: userId, title, message, type, category, action_text: actionText, action_link: actionLink, related_id: relatedId }]);
  if (error) throw error;
}

// ============================================
// CHAT & MESSAGES
// ============================================

/** Fetch semua chat rooms milik user (job seeker ATAU company) */
export async function fetchChatRooms(userId) {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select(`
      id, created_at, last_message_at, last_message_text,
      job_seeker_id, company_id, application_id,
      job_seeker_profile:profiles!job_seeker_id (full_name),
      company_profile:profiles!company_id (full_name)
    `)
    .or(`job_seeker_id.eq.${userId},company_id.eq.${userId}`)
    .order('last_message_at', { ascending: false, nullsLast: true });
  if (error) throw error;
  return data || [];
}

/** Fetch chat rooms khusus company (dengan info aplikasi & kandidat) */
export async function fetchCompanyChatRooms(companyId) {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select(`
      id, created_at, last_message_at, last_message_text,
      job_seeker_id, company_id, application_id,
      job_seeker_profile:profiles!job_seeker_id (full_name, avatar_url),
      applications!application_id (
        id, status,
        job_listings!job_id (title)
      )
    `)
    .eq('company_id', companyId)
    .order('last_message_at', { ascending: false, nullsLast: true });
  if (error) throw error;
  return data || [];
}

/** Update last_message di chat_rooms setiap ada pesan baru */
export async function updateRoomLastMessage(roomId, text) {
  await supabase
    .from('chat_rooms')
    .update({ last_message_at: new Date().toISOString(), last_message_text: text })
    .eq('id', roomId);
}

/** Fetch pesan dalam sebuah chat room */
export async function fetchMessages(roomId) {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id, content, sent_at, is_read, sender_id,
      sender:profiles!sender_id (full_name)
    `)
    .eq('room_id', roomId)
    .order('sent_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

/** Kirim pesan */
export async function sendMessage(roomId, senderId, content) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ room_id: roomId, sender_id: senderId, content }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Buat atau cari chat room untuk aplikasi ini (company memulai chat) */
export async function getOrCreateChatRoom(applicationId, jobSeekerId, companyId) {
  // Cek apakah sudah ada berdasarkan application_id
  const { data: existing } = await supabase
    .from('chat_rooms')
    .select('id')
    .eq('application_id', applicationId)
    .maybeSingle();

  if (existing) return { id: existing.id, isNew: false };

  // Buat baru
  const { data, error } = await supabase
    .from('chat_rooms')
    .insert([{
      application_id: applicationId,
      job_seeker_id: jobSeekerId,
      company_id: companyId,
      last_message_at: new Date().toISOString(),
    }])
    .select('id')
    .single();
  if (error) throw error;
  return { id: data.id, isNew: true };
}

// ============================================
// COMPANY STATS
// ============================================

/** Hitung statistik dashboard perusahaan */
export async function fetchCompanyStats(companyId) {
  const { data: jobs, error } = await supabase
    .from('job_listings')
    .select('id, is_active')
    .eq('company_id', companyId);
  if (error) throw error;

  const totalJobs = jobs?.length || 0;
  const activeJobs = jobs?.filter((j) => j.is_active).length || 0;

  return { totalJobs, activeJobs };
}

// ============================================
// JOB SEEKER PROFILE (dari tabel terpisah)
// ============================================

export async function fetchJobSeekerProfile(userId) {
  const { data, error } = await supabase
    .from('job_seeker_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertJobSeekerProfile(userId, profileData) {
  const { error } = await supabase
    .from('job_seeker_profiles')
    .upsert({ id: userId, ...profileData, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// ============================================
// FORMAT HELPERS
// ============================================

/** Konversi tanggal ke format "X hari yang lalu" */
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Map status application ke label & warna badge */
export function getApplicationStatusInfo(status) {
  const map = {
    review: {
      label: 'Dalam Peninjauan',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      step: 2,
    },
    interview: {
      label: 'Tahap Wawancara',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      step: 3,
    },
    accepted: {
      label: 'Diterima (Offering)',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      step: 4,
    },
    rejected: {
      label: 'Tidak Lolos',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      step: 4,
    },
    pending: {
      label: 'Menunggu',
      badgeColor: 'bg-slate-50 text-slate-600 border-slate-200',
      step: 1,
    },
  };
  return map[status] || map.review;
}
