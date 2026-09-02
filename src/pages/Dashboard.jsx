import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { jobsData } from '../data/jobsData';

const Dashboard = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [filters, setFilters] = useState({
    twelveJuta: true,
    remote1: true,
    remote2: true,
  });

  const handleApply = (jobTitle) => {
    setToastMessage(`Lamaran untuk "${jobTitle}" berhasil dikirim! Silakan pantau di Lamaran Saya.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const CheckboxIcon = ({ checked }) => (
    <div
      className={`w-[13px] h-[13px] flex items-center justify-center rounded-[3px] border ${
        checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-500'
      }`}
    >
      {checked && (
        <svg
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 3.5L3.5 6L8 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      {/* Sidebar Platform on the left */}
      <ChatSidebar />

      {/* Right content area with Navbar */}
      <div className="flex-1 flex flex-col min-h-screen">
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
                Meningkatkan kepercayaan kepada disabilitas
              </p>
            </div>
            <div className="relative w-[120px] h-[110px] opacity-90 text-white/30">
              {/* Wheelchair illustration matching Figma */}
              <svg
                viewBox="0 0 120 110"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 16L12.0167 12.0167M12.0167 12.0167C13.1222 10.9111 13.8056 9.38889 13.8056 7.69444C13.8056 4.31944 11.0694 1.58333 7.69444 1.58333C4.31944 1.58333 1.58333 4.31944 1.58333 7.69444C1.58333 11.0694 4.31944 13.8056 7.69444 13.8056C9.38889 13.8056 10.9111 13.1222 12.0167 12.0167Z"
                stroke="#90A1B9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="saya mau kerja.."
            className="flex-1 h-full outline-none font-normal text-[14px] text-slate-900 placeholder:text-[#90A1B9] bg-transparent"
          />
          <div className="px-3">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V12C8 14.2091 9.79086 16 12 16Z"
                stroke="#90A1B9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16"
                stroke="#90A1B9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button className="m-2 px-6 py-2.5 bg-[#1447E6] text-white rounded-xl font-semibold text-[14px]">
            Cari
          </button>
        </section>

        {/* CONTENT AREA */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Job Listings */}
          <div className="flex-1 flex flex-col gap-4">
            {jobsData.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-row gap-4 hover:border-slate-200 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shrink-0 flex items-center justify-center font-bold text-lg shadow-xs">
                  {job.companyLogo}
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[18px] text-[#1D293D]">
                      {job.title}
                    </h3>
                    <span className="text-[11px] text-[#90A1B9] font-medium hidden sm:inline-block">
                      {job.postedDate}
                    </span>
                  </div>
                  <p className="font-normal text-[14px] text-[#62748E]">
                    {job.company}
                  </p>

                  <div className="mt-2 flex gap-3 sm:gap-4 items-center flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="font-normal text-[12px] text-[#62748E]">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="font-normal text-[12px] text-[#62748E]">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="font-normal text-[12px] text-[#62748E]">{job.workType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#62748E" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#62748E" strokeWidth="2"/></svg>
                      <span className="font-normal text-[12px] text-[#62748E]">{job.disabilitySupport}</span>
                    </div>
                  </div>

                  <p className="mt-3 font-normal text-[14px] leading-[22.75px] text-[#62748E] line-clamp-2">
                    {job.description}
                  </p>

                  {/* Actions: Lamar Kerja & Detail Pekerjaan */}
                  <div className="mt-4 flex items-center gap-2.5">
                    <button
                      onClick={() => handleApply(job.title)}
                      className="bg-[#1447E6] hover:bg-[#1035c8] text-white rounded-xl px-5 py-2.5 font-semibold text-[13px] transition-colors cursor-pointer shadow-xs"
                    >
                      Lamar Kerja
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
            ))}
          </div>

          {/* Right: Filter Sidebar ("Snackbar") */}
          <aside className="w-full lg:w-48 h-fit bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 shrink-0">
            <h2 className="font-semibold text-[14px] text-[#314158] mb-1">
              Filter
            </h2>

            {/* Filter Items */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={filters.twelveJuta}
                onChange={() => handleFilterChange('twelveJuta')}
              />
              <CheckboxIcon checked={filters.twelveJuta} />
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-normal text-[14px] text-[#45556C]">
                12 juta
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={filters.remote1}
                onChange={() => handleFilterChange('remote1')}
              />
              <CheckboxIcon checked={filters.remote1} />
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-normal text-[14px] text-[#45556C]">
                Remote
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={filters.remote2}
                onChange={() => handleFilterChange('remote2')}
              />
              <CheckboxIcon checked={filters.remote2} />
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-normal text-[14px] text-[#45556C]">
                Remote
              </span>
            </label>
          </aside>
        </div>
      </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
