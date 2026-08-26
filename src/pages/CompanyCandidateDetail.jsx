import React from 'react';
import { 
  Home, 
  PlusCircle, 
  Users, 
  Bell, 
  ChevronDown, 
  User, 
  Briefcase,
  FileText,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyCandidateDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/company-dashboard')}>diffaTech</h1>
        </div>
        <div className="px-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors mt-4">
            <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h2 className="text-sm font-bold truncate text-gray-900">Acme Inc</h2>
              <p className="text-xs text-gray-500 truncate">Enterprise</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
          </div>
        </div>
        <div className="px-6 py-6 flex-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Platform</p>
          <nav className="space-y-1">
            <a href="/company-dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <Home className="w-5 h-5 text-gray-500" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <PlusCircle className="w-5 h-5 text-gray-500" />
              Posting Lowongan Baru
            </a>
            <a href="/company-job-postings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-md bg-blue-50 text-blue-600">
              <Users className="w-5 h-5 text-blue-600" />
              Daftar Kandidat Saya
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <Bell className="w-5 h-5 text-gray-500" />
              Notifikasi
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-gray-900">shadcn</p>
              <p className="text-xs text-gray-500 truncate">m@example.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Banner */}
        <div className="bg-blue-600 rounded-2xl p-8 mb-8 flex justify-between items-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-2">Siap memberi banyak lowongan pekerjaan</h2>
            <p className="text-blue-100 text-base">Meningkatkan kepercayaan kepada disabilitas</p>
          </div>
          <div className="relative z-10 hidden md:block">
            {/* Outline SVG Illustration */}
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90">
              <circle cx="50" cy="20" r="8" />
              <path d="M50 28 L50 60" />
              <path d="M30 45 L50 45" />
              <circle cx="30" cy="80" r="10" />
              <circle cx="70" cy="80" r="10" />
              <path d="M20 80 L80 80" />
              <path d="M40 80 L40 60 L60 60 L60 80" />
              <path d="M10 65 L30 65" />
              <path d="M10 70 L25 70" />
            </svg>
          </div>
        </div>

        {/* Candidate Detail Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Detail Kandidat</h3>
          
          {/* Profile Info Row */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex gap-4 items-center md:items-start md:w-1/3">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">profile</h4>
                <p className="text-sm text-gray-500">m@example.com</p>
              </div>
            </div>
            <div className="md:w-2/3">
              <h5 className="font-semibold text-sm text-gray-900 mb-2">Deskripsi Kandidat</h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-gray-100 mb-8">
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Tipe Pekerjaan</h5>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">Paruh Waktu</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">Full Time</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">Disleksia-freindly</span>
              </div>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Skills</h5>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">Figma</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">Figma</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">Figma</span>
              </div>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Education</h5>
              <p className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg inline-block">Fresh Gradution</p>
            </div>
          </div>

          {/* Pengalaman */}
          <div className="mb-8">
            <h5 className="text-sm font-bold text-gray-900 mb-4">Pengalaman</h5>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h6 className="font-bold text-sm text-gray-900 mb-1">[Position Job] - [Compoany Profile]</h6>
                  <p className="text-xs text-gray-500 mb-3">12 Januari 2025 - 12 Maret 2025</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1.5">
                    <li>Job 1 description detail goes here.</li>
                    <li>Job 2 description detail goes here.</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CV */}
          <div className="mb-8">
            <h5 className="text-sm font-bold text-gray-900 mb-4">CV</h5>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h6 className="font-bold text-sm text-gray-900">CV - [nama Profile]</h6>
                <p className="text-xs text-gray-500">update 24 Oktober 2025</p>
              </div>
            </div>
          </div>

          {/* Sertifikasi */}
          <div className="mb-8">
            <h5 className="text-sm font-bold text-gray-900 mb-4">Sertifikasi</h5>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h6 className="font-bold text-sm text-gray-900">Sertifikasi - [nama Profile]</h6>
                <p className="text-xs text-gray-500">update 24 Oktober 2025</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button 
              onClick={() => navigate('/company-applicants')}
              className="border-2 border-gray-200 text-gray-600 font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button 
              className="bg-blue-600 text-white font-bold px-8 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Diterima
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyCandidateDetail;
