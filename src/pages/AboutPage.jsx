import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import CompanySidebar from '../components/CompanySidebar';

export default function AboutPage() {
  const { user, role } = useAuth();

  const isCompany = role === 'company';
  const isLoggedIn = !!user;

  // Reusable About Content
  const AboutContent = () => (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="w-full rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#155DFC] via-[#1D4ED8] to-[#1E40AF] text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Tentang DiffaTech
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Platform kerja inklusif untuk <span className="text-blue-200">talenta disabilitas</span> Indonesia
          </h1>
          <p className="mt-4 text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
            DiffaTech menghubungkan profesional penyandang disabilitas dengan perusahaan teknologi terkemuka yang berkomitmen pada kesetaraan dan aksesibilitas.
          </p>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Apa itu DiffaTech */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2">
            Mengenal Kami
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172B] mb-3">Apa itu DiffaTech?</h2>
          <p className="text-sm sm:text-base text-[#45556C] leading-relaxed">
            DiffaTech adalah platform karier terdepan di Indonesia yang dirancang khusus untuk memberdayakan talenta penyandang disabilitas di sektor teknologi. Kami percaya bahwa setiap orang, tanpa memandang ragam disabilitas, berhak mendapatkan kesempatan yang setara untuk berkarya dan berprestasi.
          </p>
          <p className="text-sm sm:text-base text-[#45556C] leading-relaxed mt-3">
            Platform ini menjembatani para pencari kerja disabilitas dengan perusahaan yang telah terverifikasi ramah disabilitas, siap menyediakan lingkungan kerja yang aksesibel, suportif, dan adil.
          </p>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            </div>
            <h3 className="font-bold text-lg text-[#0F172B] mb-2">Visi Kami</h3>
            <p className="text-sm text-[#45556C] leading-relaxed">
              Menjadi ekosistem karier IT nomor satu di Indonesia yang inklusif, menghapus segala stigma, dan membuka pintu kesempatan karier tanpa batas bagi talenta disabilitas.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 className="font-bold text-lg text-[#0F172B] mb-2">Misi Kami</h3>
            <p className="text-sm text-[#45556C] leading-relaxed">
              Memfasilitasi penempatan kerja yang aman dan adil, menyediakan pelatihan keterampilan digital adaptif, serta mendorong perusahaan menerapkan budaya inklusi dan aksesibilitas fasilitas.
            </p>
          </div>
        </div>
      </section>

      {/* Masalah yang Diselesaikan */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172B]">Tantangan yang Kami Selesaikan</h2>
          <p className="text-sm text-[#62748E] mt-1">Kami hadir untuk meruntuhkan hambatan yang selama ini dihadapi talenta disabilitas.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-red-50/60 border border-red-100">
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            </div>
            <h4 className="font-bold text-sm text-[#1D293D] mb-1">Aksesibilitas Terbatas</h4>
            <p className="text-xs text-[#62748E] leading-relaxed">Banyak platform kerja yang tidak ramah screen reader atau pengguna dengan kebutuhan khusus.</p>
          </div>

          <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-100">
            <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <h4 className="font-bold text-sm text-[#1D293D] mb-1">Stigma & Bias Rekrutmen</h4>
            <p className="text-xs text-[#62748E] leading-relaxed">Keraguan perusahaan terhadap potensi penyandang disabilitas akibat minimnya pemahaman.</p>
          </div>

          <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-100">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h4 className="font-bold text-sm text-[#1D293D] mb-1">Ketiadaan Jembatan</h4>
            <p className="text-xs text-[#62748E] leading-relaxed">Sulitnya perusahaan menemukan talenta berkualifikasi yang sesuai dengan kebutuhan industri.</p>
          </div>
        </div>
      </section>

      {/* Nilai & Keunggulan */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172B]">Nilai & Keunggulan Utama</h2>
          <p className="text-sm text-[#62748E] mt-1">Mengapa DiffaTech menjadi pilihan terpercaya bagi profesional dan perusahaan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: '01', title: '100% Aksesibel', desc: 'Situs dirancang ramah disabilitas sesuai pedoman aksesibilitas digital WCAG.' },
            { num: '02', title: 'Perusahaan Terverifikasi', desc: 'Mitra perusahaan terkurasi dengan komitmen kuat pada inklusi dan fasilitas kerja.' },
            { num: '03', title: 'Pelatihan Terarah', desc: 'Program upskilling untuk meningkatkan kesiapan kerja para kandidat.' },
            { num: '04', title: 'Komunitas Solid', desc: 'Ruang interaksi, berbagi pengalaman, dan saling dukung antar sesama talenta.' },
          ].map((item) => (
            <div key={item.num} className="p-5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs mb-3">
                  {item.num}
                </span>
                <h4 className="font-bold text-sm text-[#1D293D] mb-1.5">{item.title}</h4>
                <p className="text-xs text-[#62748E] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer info */}
      <footer className="py-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#90A1B9]">
        <p>© 2025 DiffaTech. Hak Cipta Dilindungi.</p>
        <div className="flex items-center gap-2 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          WCAG 2.1 AA Compliant & Inklusif
        </div>
      </footer>
    </div>
  );

  // 1. Logged in as Company -> Use CompanySidebar
  if (isLoggedIn && isCompany) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex">
        <CompanySidebar />
        <main className="flex-1 ml-64 p-8">
          <AboutContent />
        </main>
      </div>
    );
  }

  // 2. Logged in as Job Seeker -> Use ChatSidebar and Navbar
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
        {/* Sidebar Platform on the left */}
        <ChatSidebar />

        {/* Right Content Area with Navbar */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="pt-[68px] w-full max-w-[1024px] mx-auto px-6 py-8">
            <AboutContent />
          </main>
        </div>
      </div>
    );
  }

  // 3. Not logged in -> Full Public Layout with Navbar
  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex flex-col">
      <Navbar />
      <main className="pt-[68px] w-full max-w-[1024px] mx-auto px-6 py-10 flex-grow">
        <AboutContent />
      </main>
    </div>
  );
}
