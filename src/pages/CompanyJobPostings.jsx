import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { fetchCompanyJobs, toggleJobActive, deleteJob, timeAgo } from '../utils/api';
import {
  Briefcase, Plus, Search, MapPin, Eye, Pencil, Trash2,
  CheckCircle2, XCircle, Power, PowerOff, AlertTriangle, Loader2
} from 'lucide-react';

export default function CompanyJobPostings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  const [actionLoading, setActionLoading] = useState(null);
  const [deleteConfirmJob, setDeleteConfirmJob] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (user) loadJobs();
  }, [user]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchCompanyJobs(user.id);
      setJobs(data);
    } catch (err) {
      console.error('Error loading company jobs:', err);
      showToast('Gagal memuat lowongan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** Toggle Aktif / Non-aktif */
  const handleToggleStatus = async (job) => {
    const nextStatus = !job.is_active;
    setActionLoading(job.id);
    try {
      await toggleJobActive(job.id, nextStatus);
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, is_active: nextStatus } : j))
      );
      showToast(
        nextStatus
          ? `Lowongan "${job.title}" berhasil diaktifkan kembali!`
          : `Lowongan "${job.title}" dinonaktifkan.`
      );
    } catch (err) {
      console.error('Gagal mengubah status lowongan:', err);
      showToast('Gagal mengubah status lowongan. Coba lagi.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  /** Hapus Lowongan Permanen */
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmJob) return;
    const jobId = deleteConfirmJob.id;
    const jobTitle = deleteConfirmJob.title;
    setActionLoading(jobId);
    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      showToast(`Lowongan "${jobTitle}" berhasil dihapus permanen.`);
      setDeleteConfirmJob(null);
    } catch (err) {
      console.error('Gagal menghapus lowongan:', err);
      showToast('Gagal menghapus lowongan. Silakan coba lagi.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const activeCount = jobs.filter((j) => j.is_active).length;
  const inactiveCount = jobs.filter((j) => !j.is_active).length;

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location?.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'active') return matchesSearch && j.is_active;
    if (statusFilter === 'inactive') return matchesSearch && !j.is_active;
    return matchesSearch;
  });

  const companyMeta = user?.user_metadata || {};
  const logoLetter = (companyMeta.company_name || 'P').charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-6 lg:p-10 max-w-[1500px]">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              Manajemen Lowongan
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Postingan Lowongan</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola, edit, aktifkan/nonaktifkan, atau hapus lowongan pekerjaan perusahaan Anda.
            </p>
          </div>
          <button
            onClick={() => navigate('/company-post-job')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Buat Postingan Baru
          </button>
        </div>

        {/* Filter Tabs & Search */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-xl w-fit">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Semua ({jobs.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'active' ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Aktif ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'inactive' ? 'bg-white text-amber-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Nonaktif ({inactiveCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari posisi atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Job Cards */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-100 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="font-bold text-base text-gray-900 mb-1">
              {searchQuery
                ? `Tidak ditemukan hasil untuk "${searchQuery}"`
                : statusFilter !== 'all'
                ? `Tidak ada lowongan berstatus ${statusFilter === 'active' ? 'Aktif' : 'Nonaktif'}`
                : 'Belum ada postingan lowongan'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {searchQuery
                ? 'Coba gunakan kata kunci pencarian yang lain.'
                : 'Mulai buat postingan lowongan baru untuk menemukan kandidat terbaik.'}
            </p>
            <button
              onClick={() => navigate('/company-post-job')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm cursor-pointer shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Buat Lowongan Baru
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 transition-all shadow-xs ${
                  job.is_active ? 'border-gray-100 hover:border-blue-200' : 'border-gray-200/80 bg-gray-50/40 opacity-90'
                }`}
              >
                {/* Logo */}
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 shadow-xs text-white ${
                  job.is_active
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700'
                    : 'bg-gradient-to-br from-gray-500 to-slate-600'
                }`}>
                  {logoLetter}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-bold text-base text-gray-900 truncate">{job.title}</h3>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        job.is_active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {job.is_active ? '● Aktif' : '○ Nonaktif'}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {job.work_type || 'Full-Time'}
                    </span>
                  </div>

                  {/* Meta details */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 font-medium"><MapPin className="w-3.5 h-3.5 text-gray-400" />{job.location}</span>
                    <span>·</span>
                    <span className="font-semibold text-gray-700">{job.salary_range || '-'}</span>
                    <span>·</span>
                    <span>Diposting {timeAgo(job.created_at)}</span>
                  </div>

                  {/* Tags: Disability & Skills */}
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    {job.disability_support && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                        ♿ {job.disability_support}
                      </span>
                    )}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {job.skills.slice(0, 4).map((sk, idx) => (
                          <span key={idx} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            {sk}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="text-[10px] text-gray-400">+{job.skills.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Group */}
                <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 flex-wrap justify-end">
                  {/* Lihat Pelamar */}
                  <button
                    onClick={() => navigate(`/company-applicants?job=${job.id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    title="Lihat Pelamar"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Pelamar</span>
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                    title="Edit Lowongan"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  {/* Toggle Aktif / Non-aktif */}
                  <button
                    onClick={() => handleToggleStatus(job)}
                    disabled={actionLoading === job.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 ${
                      job.is_active
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                    title={job.is_active ? 'Nonaktifkan lowongan ini' : 'Aktifkan kembali lowongan ini'}
                  >
                    {actionLoading === job.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : job.is_active ? (
                      <PowerOff className="w-3.5 h-3.5" />
                    ) : (
                      <Power className="w-3.5 h-3.5" />
                    )}
                    <span>{job.is_active ? 'Nonaktifkan' : 'Aktifkan'}</span>
                  </button>

                  {/* Hapus Permanen */}
                  <button
                    onClick={() => setDeleteConfirmJob(job)}
                    disabled={actionLoading === job.id}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors cursor-pointer disabled:opacity-50"
                    title="Hapus Lowongan Permanen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmJob && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Hapus Lowongan Permanen?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 leading-relaxed">
                Anda akan menghapus lowongan <strong className="text-gray-900">"{deleteConfirmJob.title}"</strong>. Semua data pelamar dan chat yang terkait akan ikut dihapus permanen dan tidak dapat dipulihkan.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmJob(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={actionLoading === deleteConfirmJob.id}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {actionLoading === deleteConfirmJob.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{actionLoading === deleteConfirmJob.id ? 'Menghapus...' : 'Ya, Hapus Lowongan'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold text-white ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-slate-900'
            }`}
          >
            {toast.type === 'error' ? (
              <XCircle className="w-4 h-4 text-red-200" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toast.msg}</span>
          </div>
        )}
      </main>
    </div>
  );
}
