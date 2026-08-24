import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
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
  );
};

export default Navbar;
