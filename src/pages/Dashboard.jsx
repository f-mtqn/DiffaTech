import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { fetchJobs, applyToJob, checkAlreadyApplied, timeAgo } from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applying, setApplying] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [filters, setFilters] = useState({
    remote: false,
    onsite: false,
    hybrid: false,
    fullTime: false,
    partTime: false,
    freelance: false,
    magang: false,
    minSalary12: false,
    disabilityFriendly: false,
  });

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load jobs dari Supabase
  useEffect(() => {
    loadJobs();
  }, [searchQuery, filters]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      let data = await fetchJobs({ search: searchQuery });

      // Tipe kerja (work_type) — bisa multi pilih
      const workTypeFilters = [
        filters.remote && 'remote',
        filters.onsite && 'on-site',
        filters.hybrid && 'hybrid',
      ].filter(Boolean);
      if (workTypeFilters.length > 0) {
        data = data.filter((j) =>
          workTypeFilters.some((wt) => j.work_type?.toLowerCase().includes(wt))
        );
      }

      // Tipe pekerjaan (job_type)
      const jobTypeFilters = [
        filters.fullTime && 'full',
        filters.partTime && 'part',
        filters.freelance && 'freelance',
        filters.magang && 'magang',
      ].filter(Boolean);
      if (jobTypeFilters.length > 0) {
        data = data.filter((j) =>
          jobTypeFilters.some((jt) => j.job_type?.toLowerCase().includes(jt))
        );
      }

      // Filter gaji
      if (filters.minSalary12) {
        data = data.filter((j) => (j.salary_min || 0) >= 12000000);
      }

      // Filter ramah disabilitas
      if (filters.disabilityFriendly) {
        data = data.filter((j) => j.disability_support && j.disability_support.trim() !== '');
      }

      setJobs(data);
    } catch (err) {
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const handleApply = async (job) => {
    if (!user) {
      showToast('Silakan login terlebih dahulu untuk melamar.', 'error');
      return;
    }
    if (appliedJobs.has(job.id)) return;

    setApplying(job.id);
    try {
      const res = await applyToJob({ jobId: job.id, applicantId: user.id, coverNote: '' });
      setAppliedJobs((prev) => new Set([...prev, job.id]));
      if (res?.alreadyApplied) {
        showToast(`Lamaran untuk "${job.title}" sudah terdaftar sebelumnya.`, 'success');
      } else {
        showToast(`Lamaran untuk "${job.title}" berhasil dikirim! Silakan pantau di Lamaran Saya.`, 'success');
      }
    } catch (err) {
      console.error('Apply error:', err);
      showToast('Gagal mengirim lamaran. Coba lagi.', 'error');
    } finally {
      setApplying(null);
    }
  };

  const CheckboxIcon = ({ checked }) => (
    <div
      className={`w-[13px] h-[13px] flex items-center justify-center rounded-[3px] border ${
        checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-500'
      }`}
    >
      {checked && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      <ChatSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-[68px] w-full max-w-[1024px] mx-auto px-6 py-8 flex flex-col gap-6">
          {/* HERO BANNER */}
          <section className="w-full rounded-2xl p-8 flex justify-between items-center bg-gradient-to-br from-[#2D52D6] to-[#3B5EEA]">
            <div className="max-w-md">
              <h1 className="font-bold text-[24px] leading-[33px] text-white">
                Cari pekerjaan dengan mudah, tanpa halangan apa pun
              </h1>
              <p className="mt-1 font-normal text-[14px] text-[#BEDBFF]">
                Meningkatkan kepercayaan kepada disabilitas
              </p>
            </div>
            <div className="relative w-[120px] h-[110px] opacity-90 text-white/30">
              <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="15" r="10" stroke="currentColor" strokeWidth="3" />
                <path d="M50 25V55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 35L70 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 35L35 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 55H70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 55V35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="45" cy="75" r="18" stroke="currentColor" strokeWidth="3" />
                <circle cx="45" cy="75" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="75" cy="82" r="8" stroke="currentColor" strokeWidth="3" />
                <path d="M70 55L75 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M60 55L65 68H55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </section>

          {/* SEARCH BAR */}
          <section className="w-full h-[57px] bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center">
            <div className="pl-4 pr-3">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M16 16L12.0167 12.0167M12.0167 12.0167C13.1222 10.9111 13.8056 9.38889 13.8056 7.69444C13.8056 4.31944 11.0694 1.58333 7.69444 1.58333C4.31944 1.58333 1.58333 4.31944 1.58333 7.69444C1.58333 11.0694 4.31944 13.8056 7.69444 13.8056C9.38889 13.8056 10.9111 13.1222 12.0167 12.0167Z" stroke="#90A1B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="saya mau kerja.."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-full outline-none font-normal text-[14px] text-slate-900 placeholder:text-[#90A1B9] bg-transparent"
            />
            <button
              onClick={handleSearch}
              className="m-2 px-6 py-2.5 bg-[#1447E6] text-white rounded-xl font-semibold text-[14px]"
            >
              Cari
            </button>
          </section>

          {/* CONTENT AREA */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Job Listings */}
            <div className="flex-1 flex flex-col gap-4">
              {loading ? (
                /* Loading skeleton */
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-slate-200 rounded w-1/2" />
                        <div className="h-4 bg-slate-100 rounded w-1/3" />
                        <div className="h-3 bg-slate-100 rounded w-3/4 mt-2" />
                        <div className="h-3 bg-slate-100 rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : jobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                  <p className="text-[#62748E] text-sm">
                    {searchQuery ? `Tidak ada lowongan untuk "${searchQuery}".` : 'Belum ada lowongan tersedia.'}
                  </p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-row gap-4 hover:border-slate-200 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shrink-0 flex items-center justify-center font-bold text-lg shadow-xs">
                      {job.company_logo_letter || job.company_name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[18px] text-[#1D293D]">{job.title}</h3>
                        <span className="text-[11px] text-[#90A1B9] font-medium hidden sm:inline-block">
                          {timeAgo(job.created_at)}
                        </span>
                      </div>
                      <p className="font-normal text-[14px] text-[#62748E]">{job.company_name}</p>

                      <div className="mt-2 flex gap-3 sm:gap-4 items-center flex-wrap">
                        <span className="flex items-center gap-1.5 text-[12px] text-[#62748E]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px] text-[#62748E]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {job.salary_range}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px] text-[#62748E]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {job.work_type}
                        </span>
                        {job.disability_support && (
                          <span className="flex items-center gap-1.5 text-[12px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            ♿ {job.disability_support}
                          </span>
                        )}
                      </div>

                      {/* Skills Chips */}
                      {job.skills && job.skills.length > 0 && (
                        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                          {job.skills.slice(0, 5).map((sk, idx) => (
                            <span key={idx} className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                              {sk}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="text-[10px] text-gray-400">+{job.skills.length - 5}</span>
                          )}
                        </div>
                      )}

                      <p className="mt-3 font-normal text-[14px] leading-[22.75px] text-[#62748E] line-clamp-2">
                        {job.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2.5">
                        <button
                          onClick={() => handleApply(job)}
                          disabled={applying === job.id || appliedJobs.has(job.id)}
                          className={`rounded-xl px-5 py-2.5 font-semibold text-[13px] transition-colors cursor-pointer shadow-xs ${
                            appliedJobs.has(job.id)
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-[#1447E6] hover:bg-[#1035c8] text-white'
                          } disabled:opacity-70`}
                        >
                          {applying === job.id ? 'Mengirim...' : appliedJobs.has(job.id) ? 'Terkirim ✓' : 'Lamar Kerja'}
                        </button>
                        <Link
                          to={`/job-detail/${job.id}`}
                          className="border border-[#E2E8F0] text-[#314158] hover:bg-slate-50 hover:border-slate-300 rounded-xl px-4 py-2.5 font-semibold text-[13px] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          Detail Pekerjaan
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right: Filter Sidebar */}
            <aside className="w-full lg:w-52 h-fit bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-5 shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[14px] text-[#1D293D]">Filter</h2>
                {Object.values(filters).some(Boolean) && (
                  <button
                    onClick={() => setFilters({ remote: false, onsite: false, hybrid: false, fullTime: false, partTime: false, freelance: false, magang: false, minSalary12: false, disabilityFriendly: false })}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Tipe Kerja */}
              <div>
                <p className="text-[11px] font-bold text-[#90A1B9] uppercase tracking-wide mb-2">Tipe Kerja</p>
                <div className="flex flex-col gap-2">
                  {[
                    { key: 'remote', label: 'Remote' },
                    { key: 'onsite', label: 'On-site' },
                    { key: 'hybrid', label: 'Hybrid' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group" onClick={() => handleFilterChange(key)}>
                      <CheckboxIcon checked={filters[key]} />
                      <span className={`font-normal text-[13px] ${filters[key] ? 'text-blue-600 font-semibold' : 'text-[#45556C]'}`}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tipe Pekerjaan */}
              <div>
                <p className="text-[11px] font-bold text-[#90A1B9] uppercase tracking-wide mb-2">Tipe Pekerjaan</p>
                <div className="flex flex-col gap-2">
                  {[
                    { key: 'fullTime', label: 'Full-Time' },
                    { key: 'partTime', label: 'Part-Time' },
                    { key: 'freelance', label: 'Freelance' },
                    { key: 'magang', label: 'Magang' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer" onClick={() => handleFilterChange(key)}>
                      <CheckboxIcon checked={filters[key]} />
                      <span className={`font-normal text-[13px] ${filters[key] ? 'text-blue-600 font-semibold' : 'text-[#45556C]'}`}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gaji & Disabilitas */}
              <div>
                <p className="text-[11px] font-bold text-[#90A1B9] uppercase tracking-wide mb-2">Lainnya</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleFilterChange('minSalary12')}>
                    <CheckboxIcon checked={filters.minSalary12} />
                    <span className={`font-normal text-[13px] ${filters.minSalary12 ? 'text-blue-600 font-semibold' : 'text-[#45556C]'}`}>Gaji ≥ 12 Juta</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleFilterChange('disabilityFriendly')}>
                    <CheckboxIcon checked={filters.disabilityFriendly} />
                    <span className={`font-normal text-[13px] ${filters.disabilityFriendly ? 'text-blue-600 font-semibold' : 'text-[#45556C]'}`}>♿ Ramah Disabilitas</span>
                  </label>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold text-white ${toastType === 'error' ? 'bg-red-600' : 'bg-slate-900'}`}>
          {toastType === 'error' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-200">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
