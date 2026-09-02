import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, PlusCircle, Users, Bell, ChevronDown, User, Briefcase } from 'lucide-react';

const CompanySidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const companyName = user?.user_metadata?.company_name || 'Perusahaan';
  const userEmail = user?.email || 'm@example.com';

  const navItems = [
    { to: '/company-dashboard', icon: Home, label: 'Dashboard' },
    { to: '/company-post-job', icon: PlusCircle, label: 'Posting Lowongan Baru' },
    { to: '/company-job-postings', icon: Users, label: 'Daftar Kandidat Saya' },
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
                isActive(to)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive(to) ? 'text-gray-700' : 'text-gray-500'}`} />
              {label}
            </Link>
          ))}
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-500" />
            Notifikasi
          </Link>
        </nav>
      </div>

      {/* Footer - Profile Link */}
      <div className="p-4 border-t border-gray-100">
        <Link
          to="/company-profile"
          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
            isActive('/company-profile')
              ? 'bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <User className={`w-4 h-4 ${isActive('/company-profile') ? 'text-blue-600' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className={`text-sm font-medium truncate ${isActive('/company-profile') ? 'text-blue-600' : 'text-gray-900'}`}>
              {user?.user_metadata?.full_name || companyName}
            </p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
          <ChevronDown className={`w-4 h-4 shrink-0 ${isActive('/company-profile') ? 'text-blue-600' : 'text-gray-500'}`} />
        </Link>
      </div>
    </aside>
  );
};

export default CompanySidebar;
