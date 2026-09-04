import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, CheckCircle2, XCircle, Loader2, MessageSquare } from 'lucide-react';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { fetchApplicationDetail, updateApplicationStatus, createNotification, getOrCreateChatRoom, timeAgo } from '../utils/api';
import { supabase } from '../utils/supabaseClient';

const CompanyCandidateDetail = () => {
  const { id: applicationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [appDetail, setAppDetail] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  /** Buka atau buat chat room dengan kandidat ini, lalu navigate ke company chat */
  const handleOpenChat = async () => {
    if (!appDetail) return;
    setChatLoading(true);
    try {
      const { id: roomId } = await getOrCreateChatRoom(
        appDetail.id,                // application_id
        appDetail.applicant_id,      // job_seeker_id
        user.id                      // company_id
      );
      navigate(`/company-chat/${roomId}`);
    } catch (err) {
      showToast('Gagal membuka ruang chat. Coba lagi.');
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) loadDetail();
  }, [applicationId]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const data = await fetchApplicationDetail(applicationId);
      setAppDetail(data);

      if (data?.applicant_id) {
        // Fetch skills dan pengalaman kandidat
        const [skillsRes, expRes] = await Promise.all([
          supabase.from('user_skills').select('skill_name').eq('user_id', data.applicant_id),
          supabase.from('experiences').select('*').eq('user_id', data.applicant_id).order('created_at'),
        ]);
        setSkills((skillsRes.data || []).map((s) => s.skill_name));
        setExperiences(expRes.data || []);
      }
    } catch (err) {
      console.error('Error loading candidate detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!appDetail) return;
    setUpdating(true);
    try {
      await updateApplicationStatus(applicationId, newStatus);

      // Kirim notifikasi ke pencari kerja
      const companyName = user?.user_metadata?.company_name || 'Perusahaan';
      const jobTitle = appDetail.job_listings?.title || 'posisi ini';
      const notifConfig = {
        accepted: {
          title: `🎉 Selamat! Lamaran Anda Diterima`,
          message: `${companyName} telah menerima lamaran Anda untuk posisi "${jobTitle}". Tim HRD akan segera menghubungi Anda untuk langkah selanjutnya.`,
          category: 'lamaran',
          actionText: 'Lihat Lamaran',
          actionLink: '/my-applications',
        },
        rejected: {
          title: `Pembaruan Status Lamaran`,
          message: `Kami mohon maaf, ${companyName} belum dapat melanjutkan lamaran Anda untuk posisi "${jobTitle}" saat ini. Terus semangat dan coba peluang lainnya!`,
          category: 'lamaran',
          actionText: 'Cari Lowongan Lain',
          actionLink: '/dashboard',
        },
        interview: {
          title: `📅 Undangan Wawancara: ${jobTitle}`,
          message: `${companyName} mengundang Anda untuk tahap wawancara posisi "${jobTitle}". Tim HRD akan mengirim detail jadwal segera.`,
          category: 'lamaran',
          actionText: 'Buka Pesan',
          actionLink: '/chat',
        },
      };
      const notifData = notifConfig[newStatus];
      if (notifData) {
        await createNotification({
          userId: appDetail.applicant_id,
          ...notifData,
          type: newStatus === 'rejected' ? 'warning' : 'success',
        });
      }

      setAppDetail((prev) => ({ ...prev, status: newStatus }));
      showToast(
        newStatus === 'accepted'
          ? 'Kandidat berhasil diterima! Notifikasi telah dikirim.'
          : newStatus === 'rejected'
          ? 'Lamaran berhasil ditolak.'
          : 'Status diperbarui ke Wawancara!'
      );
    } catch (err) {
      showToast('Gagal memperbarui status. Coba lagi.');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
        <CompanySidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Memuat detail kandidat...</span>
          </div>
        </main>
      </div>
    );
  }

  if (!appDetail) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
        <CompanySidebar />
        <main className="flex-1 ml-64 p-8">
          <p className="text-gray-500">Data kandidat tidak ditemukan.</p>
          <button onClick={() => navigate('/company-applicants')} className="mt-3 text-blue-600 hover:underline text-sm">← Kembali</button>
        </main>
      </div>
    );
  }

  const profile = appDetail.profiles || {};
  const seekerProfile = appDetail.job_seeker_profiles || {};
  const name = profile.full_name || 'Kandidat';
  const disabilityTypes = seekerProfile.disability_types || [];
  const jobTypePrefs = seekerProfile.job_type_preferences || [];

  const statusColors = {
    review: 'bg-amber-50 text-amber-700 border-amber-200',
    interview: 'bg-blue-50 text-blue-700 border-blue-200',
    accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };
  const statusLabels = {
    review: 'Dalam Peninjauan', interview: 'Tahap Wawancara',
    accepted: 'Diterima', rejected: 'Tidak Lolos',
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-8">
        {/* Back & Header */}
        <button
          onClick={() => navigate('/company-applicants')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Pelamar
        </button>

        {/* Banner */}
        <div className="bg-blue-600 rounded-2xl p-8 mb-8 flex justify-between items-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-1">Detail Kandidat</h2>
            <p className="text-blue-100 text-sm">Tinjau profil lengkap pelamar dan ambil keputusan rekrutmen.</p>
          </div>
          <div className="relative z-10 hidden md:flex flex-col items-end gap-1">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColors[appDetail.status]}`}>
              {statusLabels[appDetail.status] || 'Dalam Peninjauan'}
            </span>
            <span className="text-blue-200 text-xs">Melamar {timeAgo(appDetail.applied_at)}</span>
          </div>
        </div>

        {/* Detail Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Profil Pelamar</h3>
            <span className="text-xs text-gray-500">Melamar untuk: <strong className="text-gray-800">{appDetail.job_listings?.title || '-'}</strong></span>
          </div>

          {/* Profile Info Row */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex gap-4 items-center md:items-start md:w-1/3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
                <p className="text-sm text-gray-500">{seekerProfile.last_education || 'Pendidikan tidak diisi'}</p>
                {disabilityTypes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {disabilityTypes.map((d, i) => (
                      <span key={i} className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-2/3">
              <h5 className="font-semibold text-sm text-gray-900 mb-2">Tentang Kandidat</h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {seekerProfile.about || 'Kandidat belum mengisi deskripsi diri.'}
              </p>
              {appDetail.cover_letter && (
                <div className="mt-4 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                  <h5 className="font-semibold text-xs text-blue-800 mb-1">Cover Note dari Kandidat:</h5>
                  <p className="text-sm text-blue-900 italic">"{appDetail.cover_letter}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-gray-100 mb-8">
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Tipe Pekerjaan yang Diminati</h5>
              <div className="flex flex-wrap gap-2">
                {jobTypePrefs.length > 0 ? (
                  jobTypePrefs.map((t, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">{t}</span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">Belum diisi</span>
                )}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Skills</h5>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((s, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium">{s}</span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">Belum ada skill</span>
                )}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Pendidikan</h5>
              <p className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg inline-block">
                {seekerProfile.last_education || '-'}
              </p>
              {seekerProfile.education_year && (
                <p className="text-xs text-gray-400 mt-1">Tahun {seekerProfile.education_year}</p>
              )}
            </div>
          </div>

          {/* Pengalaman */}
          <div className="mb-8">
            <h5 className="text-sm font-bold text-gray-900 mb-4">Pengalaman Kerja</h5>
            {experiences.length === 0 ? (
              <p className="text-sm text-gray-400">Belum ada pengalaman kerja yang diisi.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <h6 className="font-bold text-sm text-gray-900 mb-1">{exp.position} — {exp.company_name}</h6>
                    <p className="text-xs text-gray-500 mb-3">
                      {exp.start_date} — {exp.end_date || 'Sekarang'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CV */}
          {seekerProfile.cv_url && (
            <div className="mb-8">
              <h5 className="text-sm font-bold text-gray-900 mb-4">CV</h5>
              <a
                href={seekerProfile.cv_url}
                target="_blank"
                rel="noreferrer"
                className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-bold text-sm text-gray-900">CV — {name}</h6>
                  <p className="text-xs text-gray-500">Klik untuk membuka dokumen</p>
                </div>
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center gap-3 mt-8 pt-6 border-t border-gray-100 flex-wrap">
            <button
              onClick={() => navigate('/company-applicants')}
              className="border-2 border-gray-200 text-gray-600 font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Kembali
            </button>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Tombol Chat — selalu tersedia */}
              <button
                onClick={handleOpenChat}
                disabled={chatLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer disabled:opacity-60 shadow-sm"
              >
                {chatLoading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <MessageSquare className="w-4 h-4" />
                }
                {chatLoading ? 'Membuka...' : 'Chat dengan Kandidat'}
              </button>
            {appDetail.status !== 'rejected' && appDetail.status !== 'accepted' && (
              <>
                <button
                  onClick={() => handleUpdateStatus('interview')}
                  disabled={updating}
                  className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-60"
                >
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Undang Interview
                </button>
                <button
                  onClick={() => handleUpdateStatus('rejected')}
                  disabled={updating}
                  className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-60"
                >
                  <XCircle className="w-4 h-4" />Tolak
                </button>
                <button
                  onClick={() => handleUpdateStatus('accepted')}
                  disabled={updating}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-lg text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-60"
                >
                  <CheckCircle2 className="w-4 h-4" />Terima Kandidat
                </button>
              </>
            )}
            {(appDetail.status === 'accepted' || appDetail.status === 'rejected') && (
              <div className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold ${appDetail.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {appDetail.status === 'accepted' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {appDetail.status === 'accepted' ? 'Sudah Diterima' : 'Sudah Ditolak'}
              </div>
            )}
            </div>{/* end right button group */}
          </div>{/* end action row */}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default CompanyCandidateDetail;
