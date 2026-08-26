import React from 'react';
import { 
  Home, 
  PlusCircle, 
  Users, 
  Bell, 
  ChevronDown, 
  User, 
  Edit2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Flame 
} from 'lucide-react';

const CompanyDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen flex flex-col fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">diffaTech</h1>
        </div>
        <div className="px-4">
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-white font-bold shrink-0">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h2 className="text-sm font-semibold truncate text-gray-900">Acme Inc</h2>
              <p className="text-xs text-gray-500 truncate">Enterprise</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
          </div>
        </div>
        <div className="px-6 py-6 flex-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Platform</p>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md bg-gray-100 text-gray-900">
              <Home className="w-5 h-5 text-gray-500" />
              Dashboard
            </a>
            <a href="/company-post-job" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <PlusCircle className="w-5 h-5 text-gray-500" />
              Posting Lowongan Baru
            </a>
            <a href="/company-job-postings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <Users className="w-5 h-5 text-gray-500" />
              Daftar Kandidat Saya
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <Bell className="w-5 h-5 text-gray-500" />
              Notifikasi
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate text-gray-900">shadcn</p>
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
            <p className="text-blue-100 text-lg">Meningkatkan kepercayaan kepada disabilitas</p>
          </div>
          <div className="relative z-10 hidden md:block">
            {/* Simple SVG Illustration imitating the one in design */}
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80">
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
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1 capitalize">company</h3>
              <p className="text-base font-medium text-gray-900">m@example.com</p>
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center items-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">12</h3>
            <p className="text-sm text-gray-500">Posting Lamaran</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center items-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">2</h3>
            <p className="text-sm text-gray-500">Sedang berjalan</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-1">Jabatan Kerja</h3>
          <p className="text-sm text-gray-500">HR</p>
        </div>

        {/* Job Postings */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Posting Lamaran Kerja</h3>
          <div className="space-y-4">
            
            {/* Job Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0 border border-gray-200"></div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">UI Designer</h4>
                  <p className="text-sm text-gray-500 mb-3">Lui Company</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400"/> Jakarta Selatan</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-gray-400"/> 12 juta</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-400"/> Remote</span>
                    <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-gray-400"/> Remote</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed max-w-3xl">
                    Kami mencari UI Designer berbakat yang mampu merancang antarmuka inklusif dan aksesibel untuk semua pengguna.
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="px-5 py-2.5 text-blue-600 bg-white border-2 border-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
                      Edit Postingan
                    </button>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                      Lihat Pelamar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0 border border-gray-200"></div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">UI Designer</h4>
                  <p className="text-sm text-gray-500 mb-3">Lui Company</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400"/> Jakarta Selatan</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-gray-400"/> 12 juta</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-400"/> Remote</span>
                    <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-gray-400"/> Remote</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed max-w-3xl">
                    Bergabunglah dengan tim kreatif kami dan kembangkan produk digital yang memberdayakan jutaan pengguna.
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="px-5 py-2.5 text-blue-600 bg-white border-2 border-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
                      Edit Postingan
                    </button>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                      Lihat Pelamar
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
