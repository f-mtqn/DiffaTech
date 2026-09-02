import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';

const CompanyApplicants = () => {
  const navigate = useNavigate();

  const candidates = [
    {
      id: 1,
      name: "Hanif Almansyah",
      skills: ["Figma", "Figma", "Figma", "Figma"],
      details: ["4 Sertikat", "12 Tahun Berpengalaman", "Tunarungu"]
    },
    {
      id: 2,
      name: "Michele",
      skills: ["Figma", "Figma", "Figma", "Figma"],
      details: ["4 Sertikat", "12 Tahun Berpengalaman", "Tunarungu"]
    },
    {
      id: 3,
      name: "Hanif Almansyah",
      skills: ["Figma", "Figma", "Figma", "Figma"],
      details: ["4 Sertikat", "12 Tahun Berpengalaman", "Tunarungu"]
    },
    {
      id: 4,
      name: "Michele",
      skills: ["Figma", "Figma", "Figma", "Figma"],
      details: ["4 Sertikat", "12 Tahun Berpengalaman", "Tunarungu"]
    }
  ];

  const skillColors = [
    "bg-red-100 text-red-600",
    "bg-gray-100 text-gray-600",
    "bg-purple-100 text-purple-600",
    "bg-orange-100 text-orange-600"
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <CompanySidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Banner */}
        <div className="bg-blue-600 rounded-2xl p-8 mb-8 flex justify-between items-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-2">Daftar Pelamar Kerja</h2>
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm md:col-span-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
            <h3 className="text-xl font-bold text-gray-900">UI Designer</h3>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm md:col-span-3 flex flex-col justify-center items-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">18</h3>
            <p className="text-sm text-gray-500">Kandidat diterima</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm md:col-span-3 flex flex-col justify-center items-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">12</h3>
            <p className="text-sm text-gray-500">Sisa pekerja</p>
          </div>
        </div>

        {/* Table Header and Actions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Kandidat Pekerja <span className="text-gray-400 font-normal text-base">/ UI Designer</span>
            </h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
              Buka data kandidat diterima
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Kandidat</th>
                  <th className="px-6 py-4">Skills</th>
                  <th className="px-6 py-4">All</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {candidates.map((candidate, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors bg-white">
                    <td className="px-6 py-5 text-sm text-gray-500">{candidate.id}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">{candidate.name}</td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        {candidate.skills.map((skill, i) => (
                          <span key={i} className={`px-2.5 py-1 rounded-md text-xs font-semibold ${skillColors[i % skillColors.length]}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs text-gray-600 leading-relaxed">
                      {candidate.details.map((detail, i) => (
                        <div key={i}>• {detail}</div>
                      ))}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button 
                        onClick={() => navigate('/company-candidate-detail')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm inline-block"
                      >
                        Lihat Kandidat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-end items-center gap-2 text-sm text-gray-600 bg-white">
            <button className="flex items-center gap-1 hover:text-gray-900 px-2 py-1 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button 
                  key={num} 
                  className={`w-8 h-8 rounded flex items-center justify-center font-medium transition-colors ${num === 2 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1 hover:text-gray-900 px-2 py-1 transition-colors">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyApplicants;
