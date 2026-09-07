import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { fetchMyApplications, withdrawApplication, getApplicationStatusInfo, timeAgo } from '../utils/api';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Search, 
  FileCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';




export default function MyApplications() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('semua'); // 'semua' | 'interview' | 'review' | 'accepted'
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (user) loadApplications();
  }, [user]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchMyApplications(user.id);
      // Map database data ke format yang dipakai component
      const mapped = data.map(app => {
        const job = app.job_listings;
        const statusInfo = getApplicationStatusInfo(app.status);
        return {
          id: app.id,
          position: job?.title || 'Posisi tidak tersedia',
          company: job?.company_name || '-',
          location: `${job?.location || '-'} • ${job?.work_type || '-'}`,
          salary: job?.salary_range || '-',
          appliedDate: new Date(app.applied_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          supportedDisability: job?.disability_support || '-',
          status: app.status || 'review',
          statusLabel: statusInfo.label,
          statusBadgeColor: statusInfo.badgeColor,
          currentStep: statusInfo.step,
          coverLetter: app.cover_letter,
          hrNote: app.hr_note,
        };
      });
      setApplications(mapped);
    } catch (err) {
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleWithdraw = async (id, posName) => {
    if (!window.confirm(`Apakah Anda yakin ingin menarik lamaran untuk posisi "${posName}"?`)) return;
    try {
      await withdrawApplication(id);
      setApplications(prev => prev.filter(a => a.id !== id));
      showToast(`Lamaran untuk "${posName}" berhasil ditarik.`);
    } catch (err) {
      alert('Gagal menarik lamaran.');
    }
  };

  // Filter & search logic
  const filteredList = applications.filter((app) => {
    const matchesFilter =
      filterTab === 'semua' ? true : app.status === filterTab;
    const matchesSearch =
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Counters
  const totalCount = applications.length;
  const interviewCount = applications.filter((a) => a.status === 'interview').length;
  const reviewCount = applications.filter((a) => a.status === 'review').length;
  const acceptedCount = applications.filter((a) => a.status === 'accepted').length;

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      {/* Sidebar Platform on the left */}
      <ChatSidebar />

      {/* Right content area with Navbar */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />

        {/* Main Content */}
        <main className="pt-[68px] w-full max-w-[1060px] mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                Pelacakan Karier Inklusif
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D293D] tracking-tight">
                Lamaran Saya
              </h1>
              <p className="text-sm text-[#62748E] mt-1">
                Pantau progres lamaran, undangan wawancara ramah aksesibilitas, dan status penawaran kerja Anda.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-sm transition-colors shrink-0 self-start md:self-auto"
            >
              <Search className="w-4 h-4" />
              Cari Lowongan Baru
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-[#62748E] font-medium">Total Dilamar</p>
                <p className="text-2xl font-bold text-[#1D293D]">{totalCount}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-blue-600 font-medium">Wawancara</p>
                <p className="text-2xl font-bold text-blue-700">{interviewCount}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-amber-600 font-medium">Dalam Tinjauan</p>
                <p className="text-2xl font-bold text-amber-700">{reviewCount}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-medium">Diterima / Offering</p>
                <p className="text-2xl font-bold text-emerald-700">{acceptedCount}</p>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'semua', label: `Semua (${totalCount})` },
                { id: 'interview', label: `Wawancara (${interviewCount})` },
                { id: 'review', label: `Dalam Tinjauan (${reviewCount})` },
                { id: 'accepted', label: `Diterima (${acceptedCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    filterTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-[#45556C] hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari posisi atau perusahaan..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Applications List */}
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 animate-pulse">
                    <div className="h-5 bg-slate-200 rounded w-1/3 mb-3" />
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : applications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-base text-[#1D293D]">Belum ada lamaran</h3>
                <p className="text-xs text-[#62748E] mt-1">Mulai melamar pekerjaan dari halaman Dashboard.</p>
              </div>
            ) : (
              filteredList.length > 0 ? (
                filteredList.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5 hover:border-slate-300 transition-all"
                  >
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Avatar / Logo */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white text-base font-bold shrink-0 shadow-xs">
                          {app.company.charAt(0)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="font-bold text-base text-[#0F172B]">
                              {app.position}
                            </h3>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${app.statusBadgeColor}`}
                            >
                              {app.statusLabel}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-[#45556C] mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {app.company}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-[#62748E] mt-2 flex-wrap">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {app.location}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-slate-700">
                              {app.salary}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right sm:text-right flex sm:flex-col justify-between items-center sm:items-end gap-1">
                        <span className="text-[11px] text-slate-400 font-medium">
                          Dilamar: {app.appliedDate}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                          <Sparkles className="w-3 h-3 text-blue-500" />
                          {app.supportedDisability}
                        </span>
                      </div>
                    </div>

                    {/* Hiring Process Stepper */}
                    <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Tahapan Proses Rekrutmen
                      </p>
                      <div className="grid grid-cols-4 gap-2 text-center relative">
                        {[
                          { step: 1, title: 'Terkirim' },
                          { step: 2, title: 'Tinjauan Berkas' },
                          { step: 3, title: 'Wawancara HRD' },
                          { step: 4, title: 'Keputusan' },
                        ].map((s) => {
                          const isCompleted = app.currentStep >= s.step;
                          const isCurrent = app.currentStep === s.step;
                          return (
                            <div key={s.step} className="flex flex-col items-center relative">
                              {/* Circle */}
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                                  isCompleted
                                    ? app.status === 'accepted'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white border border-slate-300 text-slate-400'
                                } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                              >
                                {isCompleted ? '✓' : s.step}
                              </div>
                              <span
                                className={`text-[11px] leading-tight ${
                                  isCurrent
                                    ? 'font-bold text-slate-900'
                                    : isCompleted
                                    ? 'font-medium text-slate-700'
                                    : 'text-slate-400'
                                }`}
                              >
                                {s.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* HR Note Box */}
                    {app.hrNote && (
                      <div className="bg-blue-50/50 rounded-xl p-3.5 border border-blue-100 text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Keterangan Perusahaan: </span>
                          <span>{app.hrNote}</span>
                        </div>
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        {app.status === 'accepted' && (
                          <button
                            onClick={() => showToast('Offering Letter berhasil diunduh ke perangkat Anda.')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            Unduh Offering Letter
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleWithdraw(app.id, app.position)}
                          className="text-xs text-slate-400 hover:text-red-600 transition-colors font-medium cursor-pointer"
                        >
                          Tarik Lamaran
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                /* Filtered Empty State */
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-base text-[#1D293D] mb-1">
                    Tidak Ada Lamaran Ditemukan
                  </h3>
                  <p className="text-xs sm:text-sm text-[#62748E] max-w-sm mb-6">
                    {searchQuery
                      ? `Tidak ada lamaran yang cocok dengan kata kunci "${searchQuery}".`
                      : 'Anda belum memiliki lamaran di kategori ini. Cari peluang kerja yang sesuai dengan minat dan keahlian Anda.'}
                  </p>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-sm transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Jelajahi Lowongan Kerja
                  </Link>
                </div>
              )
            )}
          </div>

        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
