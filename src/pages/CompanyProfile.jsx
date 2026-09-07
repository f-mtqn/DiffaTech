import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import CompanySidebar from '../components/CompanySidebar';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Eye,
  Save,
  LogOut
} from 'lucide-react';

// Toast notification
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-blue-600 text-white px-6 py-3.5 rounded-2xl shadow-xl animate-fade-in border border-blue-400">
      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
      <span className="font-semibold text-sm">{message}</span>
    </div>
  );
};

export default function CompanyProfile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const [companyName, setCompanyName] = useState('');
  const [emailField, setEmailField] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [industries, setIndustries] = useState(['', '']);
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Load existing data from user metadata
  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setCompanyName(meta.company_name || '');
      setEmailField(user.email || '');
      setDescription(meta.description || '');
      setAddress(meta.address || '');
      setWebsite(meta.website || '');
      setLogoUrl(meta.logo_url || '');
      setIndustries(meta.industries?.length ? meta.industries : ['Teknologi Informasi', 'Rekrutmen']);
      setLinkedin(meta.social_media?.linkedin || '');
      setYoutube(meta.social_media?.youtube || '');
      setInstagram(meta.social_media?.instagram || '');
      setTwitter(meta.social_media?.twitter || '');
    }
  }, [user]);

  const handleAddIndustry = () => setIndustries([...industries, '']);
  const handleRemoveIndustry = (index) => {
    const updated = industries.filter((_, idx) => idx !== index);
    setIndustries(updated.length ? updated : ['']);
  };
  const handleIndustryChange = (index, value) => {
    const updated = [...industries];
    updated[index] = value;
    setIndustries(updated);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const cleanIndustries = industries.map((i) => i.trim()).filter(Boolean);
      const { error } = await supabase.auth.updateUser({
        data: {
          company_name: companyName,
          description,
          address,
          website,
          logo_url: logoUrl,
          industries: cleanIndustries,
          social_media: { linkedin, youtube, instagram, twitter },
        },
      });
      if (error) throw error;
      setToast('Profil perusahaan berhasil disimpan!');
    } catch {
      setToast('Gagal menyimpan profil. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  // Calculate profile completeness score
  const activeIndustries = industries.filter((i) => i.trim().length > 0);
  const completenessItems = [
    Boolean(companyName),
    Boolean(description),
    Boolean(address),
    Boolean(website),
    Boolean(logoUrl),
    activeIndustries.length > 0,
    Boolean(linkedin || instagram || twitter || youtube),
  ];
  const completedCount = completenessItems.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / completenessItems.length) * 100);

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400';

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-6 lg:p-10 max-w-[1500px]">
        {/* Page Top Banner */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Kelola Akun Perusahaan
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Profil Perusahaan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Atur informasi lengkap perusahaan agar dipercaya oleh talenta disabilitas berkualitas.
            </p>
          </div>

          {/* Quick Action buttons at top */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-gray-200 hover:border-red-200 rounded-xl font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              title="Keluar dari akun perusahaan"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Keluar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editable Form Cards (7 Cols) */}
          <div className="xl:col-span-7 flex flex-col gap-6">
            {/* Card 1: Informasi Utama */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Informasi Utama Perusahaan</h3>
                  <p className="text-xs text-gray-500">Nama resmi, logo, dan email kontak utama</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700">Nama Perusahaan *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={inputClass}
                      placeholder="Contoh: PT Teknologi Inklusif Nusantara"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700">Email Akun (Terdaftar)</label>
                    <input
                      type="email"
                      value={emailField}
                      disabled
                      className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700">Website Perusahaan</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className={`${inputClass} pl-10`}
                        placeholder="https://perusahaan.co.id"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700">URL Logo Perusahaan</label>
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className={inputClass}
                      placeholder="https://.../logo.png"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Deskripsi Perusahaan *</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Ceritakan tentang profil, visi, dan komitmen inklusivitas perusahaan Anda..."
                  />
                  <span className="text-[11px] text-gray-400">Deskripsi ini akan dibaca oleh kandidat sebelum melamar.</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Alamat Kantor</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`${inputClass} pl-10`}
                      placeholder="Gedung Cyber 2 Lt. 12, Jakarta Selatan"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Bidang Industri */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">Bidang Industri</h3>
                    <p className="text-xs text-gray-500">Kategori sektor bisnis yang dijalankan</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddIndustry}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Bidang
                </button>
              </div>

              <div className="space-y-3">
                {industries.map((ind, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={ind}
                      onChange={(e) => handleIndustryChange(idx, e.target.value)}
                      className={inputClass}
                      placeholder={`Contoh: ${idx === 0 ? 'Software & IT' : idx === 1 ? 'E-Commerce' : 'Bidang Industri'}`}
                    />
                    {industries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveIndustry(idx)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                        title="Hapus bidang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Media Sosial */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Media Sosial & Kanal Publik</h3>
                  <p className="text-xs text-gray-500">Membantu pelamar mengenal budaya kerja perusahaan Anda</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">LinkedIn</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={inputClass}
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Instagram</label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className={inputClass}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">YouTube</label>
                  <input
                    type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    className={inputClass}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Twitter / X</label>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className={inputClass}
                    placeholder="https://x.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer self-start sm:self-auto"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                Keluar dari Akun Perusahaan
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Menyimpan...' : 'Simpan Profil'}
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview & Badges (5 Cols) */}
          <div className="xl:col-span-5 flex flex-col gap-6 xl:sticky xl:top-8">
            {/* Live Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-500">
                    Pratinjau Kartu Perusahaan
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live View
                </span>
              </div>

              {/* Company Preview Content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-16 h-16 rounded-2xl object-cover border border-gray-100 shadow-sm shrink-0 bg-white"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-sm">
                      {(companyName || 'P').charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-lg text-gray-900 truncate">
                        {companyName || 'Nama Perusahaan Anda'}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 truncate">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {emailField || 'email@perusahaan.com'}
                    </p>
                  </div>
                </div>

                {/* Location & Web */}
                <div className="flex flex-col gap-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{address || 'Lokasi kantor belum diisi'}</span>
                  </div>
                  {website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <a
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline truncate inline-flex items-center gap-1"
                      >
                        {website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 bg-gray-50/70 p-3 rounded-xl border border-gray-100 italic">
                  "{description || 'Deskripsi singkat perusahaan Anda akan tampil di sini untuk menarik perhatian kandidat berprestasi...'}"
                </p>

                {/* Industries */}
                {activeIndustries.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeIndustries.map((ind, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Completeness Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-sm text-gray-900">Kelengkapan Profil</span>
                </div>
                <span className="font-bold text-sm text-blue-600">{progressPercent}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                {progressPercent === 100
                  ? '🎉 Luar biasa! Profil perusahaan Anda telah terisi lengkap 100%.'
                  : 'Profil yang lengkap meningkatkan minat pelamar disabilitas hingga 2x lipat.'}
              </p>
            </div>

            {/* Inclusivity & Verification Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Standar Inklusif DiffaTech</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Komitmen Lingkungan Kerja Setara</p>
                </div>
              </div>

              <ul className="text-xs text-gray-600 space-y-2 pt-2 border-t border-blue-100/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  Fasilitas & aksesibilitas yang memadai
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  Perlakuan adil dalam proses interview & tes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  Mendukung talenta tunarungu, tunadaksa & disleksia
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
