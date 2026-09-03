import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { fetchAllCompanyApplicants, getApplicationStatusInfo, timeAgo } from '../utils/api';
import { Users, Search, Eye, Filter } from 'lucide-react';

export default function CompanyApplicants() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (user) loadApplicants();
  }, [user]);

  const loadApplicants = async () => {
    setLoading(true);
    try {
      const data = await fetchAllCompanyApplicants(user.id);
      setApplicants(data);
    } catch (err) {
      console.error('Error loading applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = applicants.filter((app) => {
    const name = app.profiles?.full_name || '';
    const title = app.job_listings?.title || '';
    const matchSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: applicants.length,
    review: applicants.filter((a) => a.status === 'review').length,
    interview: applicants.filter((a) => a.status === 'interview').length,
    accepted: applicants.filter((a) => a.status === 'accepted').length,
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-6 lg:p-10 max-w-[1500px]">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              Manajemen Pelamar
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Daftar Pelamar</h1>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? 'Memuat...' : `${stats.total} total pelamar`}
            </p>
          </div>
        </div>

        {/* Stats pills */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {[
            { id: 'all', label: `Semua (${stats.total})` },
            { id: 'review', label: `Ditinjau (${stats.review})` },
            { id: 'interview', label: `Interview (${stats.interview})` },
            { id: 'accepted', label: `Diterima (${stats.accepted})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama pelamar atau posisi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 text-xs font-bold text-gray-500 uppercase tracking-wider px-6 py-3 bg-gray-50/80 border-b border-gray-100">
            <span className="w-10">#</span>
            <span>Kandidat</span>
            <span className="px-4 text-center">Posisi</span>
            <span className="px-4 text-center">Status</span>
            <span className="text-right">Aksi</span>
          </div>

          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 py-4 animate-pulse flex items-center gap-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <h3 className="font-bold text-sm text-gray-900">
                {searchQuery ? `Tidak ditemukan untuk "${searchQuery}"` : 'Belum ada pelamar'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Pastikan ada lowongan aktif agar pelamar bisa mendaftar.</p>
            </div>
          ) : (
            filtered.map((app, idx) => {
              const name = app.profiles?.full_name || 'Kandidat';
              const { className, label } = getApplicationStatusInfo(app.status);
              const disability = app.job_seeker_profiles?.disability_types?.join(', ') || '-';
              const education = app.job_seeker_profiles?.last_education || '-';
              return (
                <div key={app.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-0 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <div className="w-10 flex items-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-white flex items-center justify-center font-bold text-sm">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex flex-col pl-2">
                    <p className="font-semibold text-sm text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{disability} · {education}</p>
                    <p className="text-xs text-gray-400">{timeAgo(app.applied_at)}</p>
                  </div>
                  <div className="px-4 text-center">
                    <span className="text-xs text-gray-700 font-medium">{app.job_listings?.title || '-'}</span>
                  </div>
                  <div className="px-4 text-center">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${className}`}>{label}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => navigate(`/company-candidate-detail/${app.id}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />Detail
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
