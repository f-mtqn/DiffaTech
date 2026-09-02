import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut, role } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const userInitial = (user?.user_metadata?.full_name || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 h-[68px] bg-white border-b border-slate-100 shadow-sm z-50 flex items-center justify-between px-8 py-3.5">
      <Link to={role === 'company' ? '/company-dashboard' : '/dashboard'} className="font-bold text-[18px] text-[#155DFC] tracking-tight">
        diffaTech
      </Link>

      <nav className="flex items-center gap-7">
        <Link to="#" className="font-medium text-[14px] text-[#45556C]">Pelatihan &amp; Skil</Link>
        <Link to="#" className="font-medium text-[14px] text-[#45556C]">Komunitas</Link>
        <Link to="/about" className="font-medium text-[14px] text-[#45556C] hover:text-[#155DFC] transition-colors">Tentang Kami</Link>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            {/* Chat HRD link (only for job seeker) */}
            {role !== 'company' && (
              <Link
                to="/chat"
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-[#45556C] hover:text-[#155DFC]"
                title="Chat HRD"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium text-[14px]">Chat HRD</span>
              </Link>
            )}

            {/* User avatar + email + chevron dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors"
              >
                {/* Avatar circle */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                  {userInitial}
                </div>
                {/* Email */}
                <span className="text-[#314158] font-semibold text-[14px] max-w-[140px] truncate">
                  {user.email || 'User'}
                </span>
                {/* Chevron down */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`text-[#62748E] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+6px)] bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 min-w-[160px] z-50">
                  <Link
                    to={role === 'company' ? '/company-profile' : '/profile'}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-[#314158] hover:bg-slate-50 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Profil Saya
                  </Link>
                  <hr className="border-slate-100 mx-3 my-1"/>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Link to="/register/perusahaan" className="font-semibold text-[14px] text-[#314158]">Daftar Perusahaan</Link>
            <Link to="/login" className="px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 font-semibold text-[14px]">Masuk</Link>
            <Link to="/register" className="px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold text-[14px]">Daftar</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
