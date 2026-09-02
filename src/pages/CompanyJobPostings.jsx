import React from 'react';
import { MapPin, Clock, Briefcase, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';

const CompanyJobPostings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <CompanySidebar />

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

        {/* Job Postings Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Posting Lamaran Kerja</h3>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Buat Postingan Baru
              </button>
              <div className="flex gap-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                    placeholder="cari postingan"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Cari
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Job Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex gap-5">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200"></div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">UI Designer</h4>
                  <p className="text-sm font-medium text-blue-600 mb-3">Batas Pendaftaran : 28 Oktober 2025</p>
                  
                  <div className="flex flex-wrap gap-5 text-xs font-medium text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400"/> Jakarta Selatan</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400"/> 12 juta</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-400"/> Remote</span>
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-gray-400"/> Remote</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6 max-w-4xl">
                    Kami mencari UI Designer berbakat yang mampu merancang antarmuka inklusif dan aksesibel untuk semua pengguna.
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="px-5 py-2 text-blue-600 bg-white border border-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                      Edit Postingan
                    </button>
                    <button 
                      onClick={() => navigate('/company-applicants')}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Lihat Pelamar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex gap-5">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200"></div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">UI Designer</h4>
                  <p className="text-sm font-medium text-blue-600 mb-3">Batas Pendaftaran : 28 Oktober 2025</p>
                  
                  <div className="flex flex-wrap gap-5 text-xs font-medium text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400"/> Jakarta Selatan</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400"/> 12 juta</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-400"/> Remote</span>
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-gray-400"/> Remote</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6 max-w-4xl">
                    Bergabunglah dengan tim kreatif kami dan kembangkan produk digital yang memberdayakan jutaan pengguna.
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="px-5 py-2 text-blue-600 bg-white border border-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                      Edit Postingan
                    </button>
                    <button 
                      onClick={() => navigate('/company-applicants')}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Lihat Pelamar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex gap-5">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200"></div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">UI Designer</h4>
                  <p className="text-sm font-medium text-blue-600 mb-3">Batas Pendaftaran : 28 Oktober 2025</p>
                  
                  <div className="flex flex-wrap gap-5 text-xs font-medium text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400"/> Jakarta Selatan</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400"/> 12 juta</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-400"/> Remote</span>
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-gray-400"/> Remote</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6 max-w-4xl">
                    Posisi terbuka untuk kandidat yang bersemangat dan berkomitmen terhadap inklusivitas digital.
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="px-5 py-2 text-blue-600 bg-white border border-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                      Edit Postingan
                    </button>
                    <button 
                      onClick={() => navigate('/company-applicants')}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
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

export default CompanyJobPostings;
