import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    twelveJuta: true,
    remote1: true,
    remote2: true,
  });

  const handleLogout = () => {
    signOut();
    navigate('/login');
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
    <div className="min-h-screen bg-slate-50 font-['Inter']">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-[68px] bg-white border-b border-slate-100 shadow-sm z-50 flex items-center justify-between px-8 py-3.5">
        <Link
          to="/dashboard"
          className="font-bold text-[18px] text-[#155DFC] tracking-tight"
        >
          diffaTech
        </Link>

        <nav className="flex items-center gap-7">
          <Link to="#" className="font-medium text-[14px] text-[#45556C]">
            Pelatihan & Skil
          </Link>
          <Link to="#" className="font-medium text-[14px] text-[#45556C]">
            Komunitas
          </Link>
          <Link to="#" className="font-medium text-[14px] text-[#45556C]">
            Tentang Kami
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/chat"
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-[#45556C] hover:text-[#155DFC]"
                title="Chat HRD"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium text-[14px]">Chat HRD</span>
              </Link>
              <Link
                to="/profile"
                className="text-[#314158] font-semibold text-[14px] hover:text-[#155DFC] transition-colors"
              >
                {user.email || 'User'}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 font-semibold text-[14px]"
              >
                Keluar
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/register/perusahaan"
                className="font-semibold text-[14px] text-[#314158]"
              >
                Daftar Perusahaan
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 font-semibold text-[14px]"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold text-[14px]"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </header>

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
        <div className="flex flex-row gap-6">
          {/* Left: Filter Sidebar */}
          <aside className="w-44 h-fit bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3">
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

          {/* Right: Job Listings */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Job Card 1 */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-row gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl shrink-0 overflow-hidden">
                 {/* Placeholder for avatar */}
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-[18px] text-[#1D293D]">
                  UI Designer
                </h3>
                <p className="font-normal text-[14px] text-[#62748E]">
                  Lui Company
                </p>

                <div className="mt-2 flex gap-4 items-center">
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Jakarta Selatan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">12 juta</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Remote</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#62748E" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#62748E" strokeWidth="2"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Remote</span>
                  </div>
                </div>

                <p className="mt-3 font-normal text-[14px] leading-[22.75px] text-[#62748E] line-clamp-2">
                  Kami mencari UI Designer berbakat yang mampu merancang antarmuka yang inklusif dan aksesibel untuk semua pengguna, termasuk penyandang disabilitas.
                </p>

                <button className="mt-3 bg-[#1447E6] text-white rounded-xl px-5 py-2.5 font-semibold text-[14px] w-fit">
                  Lamar Kerja
                </button>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-row gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl shrink-0 overflow-hidden">
                 {/* Placeholder for avatar */}
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-[18px] text-[#1D293D]">
                  UI Designer
                </h3>
                <p className="font-normal text-[14px] text-[#62748E]">
                  Lui Company
                </p>

                <div className="mt-2 flex gap-4 items-center">
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Jakarta Selatan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">12 juta</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Remote</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#62748E" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#62748E" strokeWidth="2"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Remote</span>
                  </div>
                </div>

                <p className="mt-3 font-normal text-[14px] leading-[22.75px] text-[#62748E] line-clamp-2">
                  Bergabunglah dengan tim kreatif kami dan kembangkan produk digital yang memberdayakan jutaan pengguna setiap harinya.
                </p>

                <button className="mt-3 bg-[#1447E6] text-white rounded-xl px-5 py-2.5 font-semibold text-[14px] w-fit">
                  Lamar Kerja
                </button>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-row gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl shrink-0 overflow-hidden">
                 {/* Placeholder for avatar */}
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-[18px] text-[#1D293D]">
                  Frontend Developer
                </h3>
                <p className="font-normal text-[14px] text-[#62748E]">
                  Tech Inklusif
                </p>

                <div className="mt-2 flex gap-4 items-center">
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Bandung</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">15 juta</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Full-Time</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#62748E" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#62748E" strokeWidth="2"/></svg>
                    <span className="font-normal text-[12px] text-[#62748E]">Disleksia-friendly</span>
                  </div>
                </div>

                <p className="mt-3 font-normal text-[14px] leading-[22.75px] text-[#62748E] line-clamp-2">
                  Posisi terbuka untuk developer React/Vue yang bersemangat membangun produk yang dapat diakses oleh semua kalangan.
                </p>

                <button className="mt-3 bg-[#1447E6] text-white rounded-xl px-5 py-2.5 font-semibold text-[14px] w-fit">
                  Lamar Kerja
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
