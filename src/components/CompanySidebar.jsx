import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, PlusCircle, Users, Bell, ChevronDown, Briefcase, LogOut, MessageSquare } from 'lucide-react';

const CompanySidebar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const companyName = user?.user_metadata?.company_name || 'Perusahaan';
  const userEmail = user?.email || 'm@example.com';

  const navItems = [
    { to: '/company-dashboard', icon: Home, label: 'Dashboard' },
    { to: '/company-post-job', icon: PlusCircle, label: 'Posting Lowongan Baru' },
    { to: '/company-job-postings', icon: Briefcase, label: 'Daftar Lowongan' },
    { to: '/company-applicants', icon: Users, label: 'Daftar Pelamar' },
    { to: '/company-chat', icon: MessageSquare, label: 'Pesan & Chat' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="p-6">
        <Link to="/company-dashboard" className="text-2xl font-bold text-blue-600 tracking-tight">
          diffaTech
        </Link>
      </div>

      {/* Company Card */}
      <div className="px-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h2 className="text-sm font-semibold truncate text-gray-900">{companyName}</h2>
            <p className="text-xs text-gray-500 truncate">Enterprise</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-6 flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Platform</p>
        <nav className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive(to) || location.pathname.startsWith(to + '/')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive(to) || location.pathname.startsWith(to + '/') ? 'text-blue-600' : 'text-gray-500'}`} />
              {label}
            </Link>
          ))}
          <Link
            to="/company-notifications"
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
              isActive('/company-notifications')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bell className={`w-5 h-5 ${isActive('/company-notifications') ? 'text-blue-600' : 'text-gray-500'}`} />
            Notifikasi
          </Link>
        </nav>
      </div>

      {/* Footer - Profile & Logout */}
      <div className="p-3 border-t border-gray-100 flex flex-col gap-1.5 bg-gray-50/50">
        <Link
          to="/company-profile"
          className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
            isActive('/company-profile')
              ? 'bg-blue-50 text-blue-600 shadow-xs'
              : 'hover:bg-white text-gray-700 hover:shadow-xs'
          }`}
          title="Buka Profil Perusahaan"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {(companyName || 'P').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className={`text-xs font-bold truncate ${isActive('/company-profile') ? 'text-blue-600' : 'text-gray-900'}`}>
              {user?.user_metadata?.full_name || companyName}
            </p>
            <p className="text-[11px] text-gray-400 truncate">{userEmail}</p>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 shrink-0 ${isActive('/company-profile') ? 'text-blue-600' : 'text-gray-400'}`} />
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50/80 border border-transparent hover:border-red-100 rounded-xl transition-all w-full cursor-pointer group"
          title="Keluar dari akun perusahaan"
        >
          <LogOut className="w-3.5 h-3.5 text-red-500 group-hover:-translate-x-0.5 transition-transform" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </aside>
  );
};

export default CompanySidebar;
