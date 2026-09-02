import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { jobsData } from '../data/jobsData';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Calendar, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  Send, 
  ExternalLink,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Find job or fallback to first
  const job = jobsData.find((j) => j.id === parseInt(id)) || jobsData[0];

  const [hasApplied, setHasApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan lowongan berhasil disalin ke clipboard!');
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowApplyModal(false);
      setHasApplied(true);
      showToast('Lamaran berhasil dikirim! Anda dapat memantau statusnya di Lamaran Saya.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      {/* Fixed Sidebar */}
      <ChatSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />

        <main className="pt-[68px] w-full max-w-[1060px] mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Back Link */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors w-fit group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar Lowongan
          </Link>

          {/* Job Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                {/* Company Logo / Letter */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-sm">
                  {job.companyLogo}
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#0F172B] tracking-tight">
                      {job.title}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {job.jobType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-semibold text-[#45556C] flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {job.company}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Terverifikasi Inklusif
                    </span>
                  </div>

                  {/* Meta Tags */}
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#62748E] mt-3 flex-wrap">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      {job.salary}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.workType}
                    </span>
                  </div>

                  {/* Disability Friendly Highlight */}
                  <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dukungan Aksesibilitas: <strong>{job.disabilitySupport}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                {hasApplied ? (
                  <div className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Lamaran Terkirim
                  </div>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Lamar Sekarang
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/chat')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    Chat HRD
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                    title="Bagikan Lowongan"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Job Details (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Deskripsi Pekerjaan */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
                <h2 className="text-base font-bold text-[#0F172B] mb-3">
                  Deskripsi Pekerjaan
                </h2>
                <p className="text-sm text-[#45556C] leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Tanggung Jawab Utama */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
                <h2 className="text-base font-bold text-[#0F172B] mb-4">
                  Tanggung Jawab Utama
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#45556C]">
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kualifikasi & Persyaratan */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
                <h2 className="text-base font-bold text-[#0F172B] mb-4">
                  Kualifikasi & Persyaratan
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#45556C]">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        •
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fasilitas & Aksesibilitas Khusus Disabilitas */}
              <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-2xl border border-blue-200 p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-blue-950">
                      Fasilitas & Dukungan Aksesibilitas
                    </h2>
                    <p className="text-xs text-blue-700">
                      Perusahaan ini berkomitmen penuh mendukung lingkungan kerja ramah disabilitas
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-4">
                  {job.accessibilityPerks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-blue-900 font-medium">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Meta & Company Info (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Ringkasan Lowongan Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-[#0F172B] pb-3 border-b border-slate-100 mb-4">
                  Ringkasan Lowongan
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-400">Diposting</p>
                      <p className="font-semibold text-slate-800">{job.postedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-400">Batas Lamaran</p>
                      <p className="font-semibold text-slate-800">{job.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-400">Pengalaman</p>
                      <p className="font-semibold text-slate-800">{job.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-400">Pendidikan</p>
                      <p className="font-semibold text-slate-800">{job.education}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-400">Kuota Penerimaan</p>
                      <p className="font-semibold text-slate-800">{job.quota}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tentang Perusahaan Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-[#0F172B] pb-3 border-b border-slate-100 mb-4">
                  Tentang Perusahaan
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-slate-400">Nama Perusahaan</p>
                    <p className="font-semibold text-slate-800 mt-0.5">{job.companyInfo.name}</p>
                  </div>

                  <div>
                    <p className="text-slate-400">Industri</p>
                    <p className="font-semibold text-slate-800 mt-0.5">{job.companyInfo.industry}</p>
                  </div>

                  <div>
                    <p className="text-slate-400">Ukuran Perusahaan</p>
                    <p className="font-semibold text-slate-800 mt-0.5">{job.companyInfo.size}</p>
                  </div>

                  <div>
                    <p className="text-slate-400">Alamat</p>
                    <p className="font-medium text-slate-700 mt-0.5 leading-relaxed">{job.companyInfo.address}</p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={job.companyInfo.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Kunjungi Website
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Card */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white text-center flex flex-col items-center">
                <Sparkles className="w-8 h-8 text-blue-400 mb-2" />
                <h4 className="font-bold text-sm">Tertarik dengan posisi ini?</h4>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                  Kirim lamaran Anda sekarang sebelum tanggal {job.deadline}.
                </p>
                {hasApplied ? (
                  <Link
                    to="/my-applications"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Lihat di Lamaran Saya
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Lamar Sekarang
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative">
            <h3 className="text-lg font-bold text-[#0F172B]">
              Lamar Posisi {job.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Perusahaan: <strong className="text-slate-800">{job.company}</strong>
            </p>

            <form onSubmit={handleSubmitApplication} className="mt-5 flex flex-col gap-4">
              {/* User Confirmation Info */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-xs flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Pelamar:</span>
                  <span className="font-semibold text-slate-800">{user?.user_metadata?.full_name || 'Profil Kamu'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-800">{user?.email || 'email@contoh.com'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CV Terlampir:</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    CV Profil Utama Aktif
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Pesan Pembuka / Cover Note (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Tuliskan pesan singkat tentang motivasi dan kesesuaian keahlian Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Mengirim...' : 'Kirim Lamaran'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
