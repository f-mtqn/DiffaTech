import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { fetchCompanyJobs, fetchAllCompanyApplicants, timeAgo } from '../utils/api';
import {
  Briefcase, Users, Eye, Plus, TrendingUp, BarChart3,
  CheckCircle2, Clock, ArrowRight
} from 'lucide-react';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const companyMeta = user?.user_metadata || {};
  const companyName = companyMeta.company_name || 'Perusahaan Anda';
  const logoLetter = companyName.charAt(0).toUpperCase();

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [jobData, appData] = await Promise.all([
        fetchCompanyJobs(user.id),
        fetchAllCompanyApplicants(user.id),
      ]);
      setJobs(jobData);
      setApplicants(appData);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.is_active).length;
  const totalApplicants = applicants.length;
  const newApplicants = applicants.filter((a) => a.status === 'review').length;

  const getStatusBadge = (status) => {
    const map = {
      review: 'bg-amber-50 text-amber-700 border border-amber-200',
      interview: 'bg-blue-50 text-blue-700 border border-blue-200',
      accepted: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      rejected: 'bg-red-50 text-red-700 border border-red-200',
    };
    const labels = { review: 'Ditinjau', interview: 'Interview', accepted: 'Diterima', rejected: 'Ditolak' };
    return { className: map[status] || map.review, label: labels[status] || 'Ditinjau' };
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-6 lg:p-10 max-w-[1500px]">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboard Perusahaan
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Selamat Datang, <span className="text-blue-600">{companyName}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Kelola lowongan dan pantau pelamar disabilitas terbaik Anda.</p>
          </div>
          <button
            onClick={() => navigate('/company-post-job')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Posting Lowongan Baru
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Lowongan', value: loading ? '...' : totalJobs, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Lowongan Aktif', value: loading ? '...' : activeJobs, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Total Pelamar', value: loading ? '...' : totalApplicants, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'Menunggu Review', value: loading ? '...' : newApplicants, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Lowongan Terbaru */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-base text-gray-900">Lowongan Terbaru</h3>
              </div>
              <Link to="/company-job-postings" className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="px-6 py-4 animate-pulse flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                      <div className="h-3 bg-slate-100 rounded w-1/3" />
                    </div>
                  </div>
                ))
              ) : jobs.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Briefcase className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Belum ada lowongan.</p>
                  <button
                    onClick={() => navigate('/company-post-job')}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Buat lowongan pertama →
                  </button>
                </div>
              ) : (
                jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="px-6 py-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                      {logoLetter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.location} · {timeAgo(job.created_at)}</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${job.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {job.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pelamar Terbaru */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-violet-600" />
                <h3 className="font-bold text-base text-gray-900">Pelamar Terbaru</h3>
              </div>
              <Link to="/company-applicants" className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="px-6 py-4 animate-pulse flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                      <div className="h-3 bg-slate-100 rounded w-1/3" />
                    </div>
                  </div>
                ))
              ) : applicants.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Users className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Belum ada pelamar.</p>
                </div>
              ) : (
                applicants.slice(0, 5).map((app) => {
                  const name = app.profiles?.full_name || 'Kandidat';
                  const { className, label } = getStatusBadge(app.status);
                  return (
                    <div
                      key={app.id}
                      onClick={() => navigate(`/company-candidate-detail/${app.id}`)}
                      className="px-6 py-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{name}</p>
                        <p className="text-xs text-gray-500 truncate">{app.job_listings?.title || 'Posisi'}</p>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${className}`}>{label}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
