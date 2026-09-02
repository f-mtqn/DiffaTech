import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { loadJobListings, applyToJob, hasApplied } from '../utils/profileApi';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobListings, setJobListings] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [toast, setToast] = useState(null);

  const [filterRemote, setFilterRemote] = useState(false);
  const [filterFullTime, setFilterFullTime] = useState(false);
  const [filterHybrid, setFilterHybrid] = useState(false);

  // Load job listings dari Supabase
  useEffect(() => {
    setLoadingJobs(true);
    loadJobListings()
      .then(async (jobs) => {
        setJobListings(jobs);
        // Cek mana yang sudah dilamar user ini
        if (user?.id) {
          const appliedSet = new Set();
          await Promise.all(
            jobs.map(async (job) => {
              const applied = await hasApplied(user.id, job.id);
              if (applied) appliedSet.add(job.id);
            })
          );
          setAppliedJobs(appliedSet);
        }
      })
      .catch(err => console.error('Gagal load lowongan:', err))
      .finally(() => setLoadingJobs(false));
  }, [user?.id]);

  // Filter berdasarkan search + tipe pekerjaan
  const filteredJobs = jobListings.filter(job => {
    const matchSearch = !searchQuery ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const activeFilters = [];
    if (filterRemote) activeFilters.push('Remote');
    if (filterFullTime) activeFilters.push('Full-Time');
    if (filterHybrid) activeFilters.push('Hybrid');

    const matchFilter = activeFilters.length === 0 ||
      activeFilters.some(f => (job.job_types || []).includes(f));

    return matchSearch && matchFilter;
  });

  const handleApply = async (jobId) => {
    if (!user?.id) { navigate('/login'); return; }
    if (appliedJobs.has(jobId)) return;
    setApplyingJobId(jobId);
    try {
      await applyToJob(user.id, jobId);
      setAppliedJobs(prev => new Set([...prev, jobId]));
      setToast('Lamaran berhasil dikirim! âœ…');
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast('Gagal melamar. Mungkin kamu sudah melamar sebelumnya.');
      setTimeout(() => setToast(null), 3000);
    } finally {
      setApplyingJobId(null);
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
          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter']">
      {/* HEADER */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="pt-[68px] w-full max-w-[1024px] mx-auto px-6 py-8 flex flex-col gap-6">
        {/* HERO BANNER */}
        <section className="w-full rounded-2xl p-8 flex justify-between items-center bg-gradient-to-br from-[#2D52D6] to-[#3B5EEA]">
          <div className="max-w-md">
            <h1 className="font-bold text-[24px] leading-[33px] text-white">
              Cari pekerjaan dengan mudah, tanpa halangan apa pun
            </h1>
            <p className="mt-1 font-normal text-[14px] text-[#BEDBFF]">
              Ribuan lowongan dari perusahaan yang peduli aksesibilitas
            </p>
          </div>
          <div className="relative w-[120px] h-[110px] opacity-90 text-white">
            <svg
              viewBox="0 0 120 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="55" r="45" stroke="currentColor" strokeWidth="8" />
              <rect x="40" y="45" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="6" />
              <path d="M50 45V35C50 32.2386 52.2386 30 55 30H65C67.7614 30 70 32.2386 70 35V45" stroke="currentColor" strokeWidth="6" />
              <circle cx="50" cy="85" r="15" stroke="currentColor" strokeWidth="6" fill="transparent" />
              <circle cx="90" cy="85" r="15" stroke="currentColor" strokeWidth="6" fill="transparent" />
            </svg>
          </div>
        </section>

        {/* SEARCH BAR */}
        <section className="w-full h-[57px] bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center">
          <div className="pl-4 pr-3">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M16 16L12.0167 12.0167M12.0167 12.0167C13.1222 10.9111 13.8056 9.38889 13.8056 7.69444C13.8056 4.31944 11.0694 1.58333 7.69444 1.58333C4.31944 1.58333 1.58333 4.31944 1.58333 7.69444C1.58333 11.0694 4.31944 13.8056 7.69444 13.8056C9.38889 13.8056 10.9111 13.1222 12.0167 12.0167Z" stroke="#90A1B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari posisi, perusahaan, atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-full outline-none font-normal text-[14px] text-slate-900 placeholder:text-[#90A1B9] bg-transparent"
          />
          <button
            onClick={() => {}}
            className="m-2 px-6 py-2.5 bg-[#1447E6] text-white rounded-xl font-semibold text-[14px]"
          >
            Cari
          </button>
        </section>

        {/* CONTENT AREA */}
        <div className="flex flex-row gap-6">
          {/* Left: Filter Sidebar */}
          <aside className="w-44 h-fit bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3">
            <h2 className="font-semibold text-[14px] text-[#314158] mb-1">Filter</h2>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="hidden" checked={filterRemote} onChange={() => setFilterRemote(p => !p)}/>
              <CheckboxIcon checked={filterRemote} />
              <span className="font-normal text-[14px] text-[#45556C]">Remote</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="hidden" checked={filterFullTime} onChange={() => setFilterFullTime(p => !p)}/>
              <CheckboxIcon checked={filterFullTime} />
              <span className="font-normal text-[14px] text-[#45556C]">Full-Time</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="hidden" checked={filterHybrid} onChange={() => setFilterHybrid(p => !p)}/>
              <CheckboxIcon checked={filterHybrid} />
              <span className="font-normal text-[14px] text-[#45556C]">Hybrid</span>
            </label>
          </aside>

          {/* Right: Job Listings */}
          <div className="flex-1 flex flex-col gap-4">
            {loadingJobs ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"/>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center text-[#90A1B9]">
                <p className="font-semibold text-[16px]">Tidak ada lowongan ditemukan</p>
                <p className="text-[14px] mt-1">Coba ubah kata kunci pencarian atau filter</p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isApplied = appliedJobs.has(job.id);
                const isApplying = applyingJobId === job.id;
                const initials = job.company_name?.slice(0, 2).toUpperCase() || 'CO';
                const colors = ['#10B981','#6366F1','#F59E0B','#EF4444','#3B82F6'];
                const colorIdx = job.company_name?.charCodeAt(0) % colors.length || 0;

                return (
                  <div key={job.id} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-row gap-4">
                    {/* Company Logo */}
                    <div
                      className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-[14px]"
                      style={{ backgroundColor: colors[colorIdx] }}
                    >
                      {initials}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-[18px] text-[#1D293D]">{job.title}</h3>
                      <p className="font-normal text-[14px] text-[#62748E]">{job.company_name}</p>

                      <div className="mt-2 flex flex-wrap gap-3 items-center">
                        {job.location && (
                          <div className="flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <span className="font-normal text-[12px] text-[#62748E]">{job.location}</span>
                          </div>
                        )}
                        {job.salary_range && (
                          <div className="flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <span className="font-normal text-[12px] text-[#62748E]">{job.salary_range}</span>
                          </div>
                        )}
                        {(job.job_types || []).map(type => (
                          <span key={type} className="text-[12px] bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2 py-0.5">{type}</span>
                        ))}
                      </div>

                      {(job.accessibility_features || []).length > 0 && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" fill="#62748E"/><path d="M12 7v5M9 9l-3 5h4l1 4h2l1-4h4l-3-5" stroke="#62748E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          <span className="text-[12px] text-[#62748E]">Ramah: <span className="font-medium text-[#314158]">{job.accessibility_features.join(', ')}</span></span>
                        </div>
                      )}

                      {job.description && (
                        <p className="mt-3 font-normal text-[14px] leading-[22.75px] text-[#62748E] line-clamp-2">
                          {job.description}
                        </p>
                      )}

                      {/* Skills */}
                      {(job.job_skills || []).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {job.job_skills.map(s => (
                            <span key={s.skill_name} className="text-[11px] bg-slate-100 text-slate-600 rounded-full px-2 py-0.5">{s.skill_name}</span>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={isApplied || isApplying}
                        className={`mt-3 rounded-xl px-5 py-2.5 font-semibold text-[14px] w-fit transition-colors ${
                          isApplied
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-[#1447E6] text-white hover:bg-[#1035c8]'
                        }`}
                      >
                        {isApplying ? 'Mengirim...' : isApplied ? 'âœ“ Sudah Dilamar' : 'Lamar Kerja'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1447E6] text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-[14px]">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
