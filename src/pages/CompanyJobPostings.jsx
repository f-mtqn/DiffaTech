import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { fetchCompanyJobs, deactivateJob, timeAgo } from '../utils/api';
import { Briefcase, Plus, Search, MapPin, Eye, Pencil, Trash2, CheckCircle2 } from 'lucide-react';

export default function CompanyJobPostings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (jobId) => {
    if (!window.confirm('Yakin ingin menonaktifkan lowongan ini?')) return;
    try {
      await deactivateJob(jobId);
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, is_active: false } : j));
    } catch (err) {
      alert('Gagal menonaktifkan lowongan.');
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {jobs.length} total lowongan · {jobs.filter((j) => j.is_active).length} aktif
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

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
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
              {searchQuery ? `Tidak ditemukan hasil untuk "${searchQuery}"` : 'Belum ada lowongan'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">Buat postingan lowongan pertama Anda sekarang.</p>
            <button
              onClick={() => navigate('/company-post-job')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Buat Lowongan
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-gray-200 transition-all">
                {/* Logo */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                  {logoLetter}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-bold text-base text-gray-900 truncate">{job.title}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${job.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                      {job.is_active ? '● Aktif' : '○ Nonaktif'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span>·</span>
                    <span>{job.work_type || job.job_type}</span>
                    <span>·</span>
                    <span>{job.salary_range}</span>
                    <span>·</span>
                    <span>Diposting {timeAgo(job.created_at)}</span>
                  </div>
                  {job.disability_support && (
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ♿ {job.disability_support}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate(`/company-applicants?job=${job.id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />Pelamar
                  </button>
                  <button
                    onClick={() => navigate('/company-post-job')}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {job.is_active && (
                    <button
                      onClick={() => handleDeactivate(job.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                      title="Nonaktifkan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
